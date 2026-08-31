import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiModel, getGenConfig } from '@/lib/geminiConfig';
import { normalizeStudio1Graph, renderStudio1GraphXml, Studio1SemanticGraph } from '@/lib/studio1HybridEngine';
import { applyStudio1Patch, diffStudio1Graphs, embedStudio1State, Studio1ChangePlan, Studio1DecisionLedger, Studio1GenerationContext, Studio1PatchOperation, validateStudio1Change } from '@/lib/studio1ArchitectureCore';

function extractJson(text: string): unknown {
  const cleaned = text.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/i, '').trim();
  try { return JSON.parse(cleaned); } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('The architecture model did not return valid structured JSON.');
    return JSON.parse(match[0]);
  }
}

const allowed = <T extends string>(value: unknown, values: readonly T[], fallback: T): T => values.includes(value as T) ? value as T : fallback;

function normalizeContext(value: unknown): Studio1GenerationContext {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    action: allowed(raw.action, ['auto', 'create', 'incremental_edit', 'guided_refactor', 'full_refactor'] as const, 'auto'),
    persona: allowed(raw.persona, ['auto', 'executive', 'product_manager', 'solution_architect', 'developer', 'data_engineer', 'network_engineer', 'security_architect', 'sre', 'mixed'] as const, 'auto'),
    level: allowed(raw.level, ['auto', 'executive', 'conceptual', 'logical', 'technical', 'operational', 'implementation'] as const, 'auto'),
    viewpoint: allowed(raw.viewpoint, ['auto', 'end_to_end', 'user_flow', 'application', 'integration', 'network', 'security', 'data', 'ai_ml', 'deployment', 'observability', 'migration'] as const, 'auto'),
    depth: allowed(raw.depth, ['auto', 'standard', 'detailed', 'exhaustive'] as const, 'auto'),
    lifecycleState: allowed(raw.lifecycleState, ['current', 'transition', 'target'] as const, 'target'),
    platform: allowed(raw.platform, ['auto', 'gcp', 'aws', 'azure', 'hybrid', 'vendor_neutral'] as const, 'auto'),
    purpose: typeof raw.purpose === 'string' ? raw.purpose.slice(0, 160) : undefined,
    industry: typeof raw.industry === 'string' ? raw.industry.slice(0, 80) : undefined,
  };
}

function normalizeLedger(value: unknown): Studio1DecisionLedger {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const strings = (item: unknown) => Array.isArray(item) ? item.map(String).map(v => v.trim()).filter(Boolean).slice(0, 40) : [];
  return { confirmedRequirements: strings(raw.confirmedRequirements), constraints: strings(raw.constraints), lockedNodeIds: strings(raw.lockedNodeIds), rejectedOptions: strings(raw.rejectedOptions), assumptions: strings(raw.assumptions), openQuestions: strings(raw.openQuestions) };
}

function normalizePlan(value: unknown): Studio1ChangePlan {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const validOps = new Set(['add_node', 'update_node', 'remove_node', 'add_edge', 'update_edge', 'remove_edge', 'insert_between', 'change_patterns']);
  const operations = (Array.isArray(raw.operations) ? raw.operations : []).filter(item => item && typeof item === 'object' && validOps.has(String((item as Record<string, unknown>).op))).slice(0, 24) as Studio1PatchOperation[];
  return {
    intent: allowed(raw.intent, ['discuss', 'clarify', 'propose_change', 'apply_change', 'refactor', 'validate', 'revert'] as const, 'clarify'),
    summary: typeof raw.summary === 'string' ? raw.summary.slice(0, 240) : 'Review the requested architecture change.',
    rationale: typeof raw.rationale === 'string' ? raw.rationale.slice(0, 500) : '',
    operations,
    preservedNodeIds: Array.isArray(raw.preservedNodeIds) ? raw.preservedNodeIds.map(String).slice(0, 60) : [],
    requiresConfirmation: raw.requiresConfirmation === true,
    clarificationQuestion: typeof raw.clarificationQuestion === 'string' ? raw.clarificationQuestion.slice(0, 300) : undefined,
    options: Array.isArray(raw.options) ? raw.options.slice(0, 4).map((item, index) => { const option = item && typeof item === 'object' ? item as Record<string, unknown> : {}; return { id: String(option.id || `option_${index + 1}`), label: String(option.label || `Option ${index + 1}`), recommended: option.recommended === true }; }) : undefined,
  };
}

function enforceDepth(graph: Studio1SemanticGraph, context: Studio1GenerationContext): void {
  const minimumNodes = context.depth === 'exhaustive' ? 14 : context.depth === 'detailed' ? 10 : 6;
  const minimumEdges = Math.max(5, minimumNodes - 1);
  if (graph.nodes.length < minimumNodes) throw new Error(`Architecture is incomplete for ${context.depth === 'auto' ? 'standard' : context.depth} depth: expected at least ${minimumNodes} components.`);
  if (graph.edges.length < minimumEdges) throw new Error(`Architecture is incomplete: expected at least ${minimumEdges} meaningful flows.`);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const theme = body.theme === 'dark' ? 'dark' : 'light';
    const previousGraph = body.previousGraph && typeof body.previousGraph === 'object' ? body.previousGraph as Studio1SemanticGraph : null;
    const context = normalizeContext(body.context);
    const ledger = normalizeLedger(body.decisionLedger);
    const baseVersionId = typeof body.baseVersionId === 'string' ? body.baseVersionId : null;
    if (prompt.length < 8) return NextResponse.json({ success: false, error: 'Describe the architecture or question in at least eight characters.' }, { status: 400 });
    if (previousGraph && !baseVersionId) return NextResponse.json({ success: false, error: 'Incremental Studio 1 requests require a baseVersionId.' }, { status: 409 });
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ success: false, error: 'Studio 1 requires GEMINI_API_KEY. No static template was returned.', generationSource: 'none' }, { status: 503 });

    const model = getGeminiModel('pro');
    const ai = new GoogleGenAI({ apiKey });
    const isRefinement = Boolean(previousGraph);
    const isRefactor = Boolean(previousGraph) && (context.action === 'guided_refactor' || context.action === 'full_refactor');
    const systemInstruction = isRefactor
      ? `You are Studio 1, a principal architect performing a ${context.action}. Produce a complete target semantic graph, not patch operations. Preserve every locked component exactly. For guided refactoring also preserve valid unaffected capabilities and constraints; for full refactoring preserve only explicit requirements, constraints, and locks. Correct technical weaknesses, make trade-offs explicit, and keep stable IDs for retained components. Use 10-30 components for detailed depth and at least 14 for exhaustive. Return JSON only: {"context":${JSON.stringify(context)},"assistantMessage":"summary and trade-offs","refactorPlan":{"problems":[],"majorChanges":[],"migrationConsiderations":[],"requiresConfirmation":true},"graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}`
      : isRefinement
      ? `You are Studio 1, a conversational principal architect. Classify the message as discuss, clarify, propose_change, apply_change, refactor, validate, or revert. Questions and hypotheticals MUST NOT mutate the graph. If ambiguous or technically infeasible, explain the conflict and ask one targeted question with 2-4 viable options. For incremental edits return ONLY controlled patch operations against exact existing IDs. Preserve unrelated components and flows. Never return a replacement graph. Supported operations: add_node, update_node, remove_node, add_edge, update_edge, remove_edge, insert_between, change_patterns. New nodes/edges require complete fields. A request affecting roughly more than 35% of the graph is a refactor requiring confirmation. Return JSON only: {"context":${JSON.stringify(context)},"changePlan":{"intent":"discuss|clarify|propose_change|apply_change|refactor|validate|revert","summary":"","rationale":"","operations":[],"preservedNodeIds":[],"requiresConfirmation":false,"clarificationQuestion":"optional","options":[{"id":"x","label":"choice","recommended":true}]},"assistantMessage":"concise response"}`
      : `You are Studio 1, a principal enterprise and cloud architect. Generate a fresh, detailed semantic architecture, never a canned template. Respect persona, level, viewpoint, lifecycle, depth and platform. Include relevant user/process, network, data, security, failure and observability semantics without irrelevant clutter. Use stable snake_case IDs, explicit decisions, typed flows and ordered steps. Use 6-30 components for standard depth, at least 10 for detailed, and at least 14 for exhaustive. Allowed patterns: layered, event-driven, hub-spoke, network-topology, swimlane, sequence. Node kinds: actor, service, process, decision, datastore, queue, security, observability, external. Flow types: synchronous, asynchronous, data, network, ai, governance, feedback. Allowed GCP serviceKey values: gemini, vertex_ai, vertex_vector_search, document_ai, agent_builder, model_armor, gke, gke_autopilot, cloud_run, cloud_functions, compute_engine, bigquery, spanner, memorystore, cloud_storage, pubsub, dataflow, cloud_armor, iap, cloud_dlp, cloud_iam, vpc_sc, scc, cloud_load_balancing, cloud_cdn, user_ingress, cloud_monitoring, cloud_logging, cloud_deploy, artifact_registry. Return JSON only: {"context":${JSON.stringify(context)},"assistantMessage":"what was inferred","graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}`;

    const userMessage = `${isRefinement ? `BASE VERSION: ${baseVersionId}\nCURRENT GRAPH:\n${JSON.stringify(previousGraph)}\nDECISION LEDGER:\n${JSON.stringify(ledger)}` : `PROJECT CONTEXT:\n${JSON.stringify(context)}`}\n\nUSER MESSAGE:\n${prompt}`;
    const response = await ai.models.generateContent({ model, contents: [{ role: 'user', parts: [{ text: userMessage }] }], config: { ...getGenConfig(isRefinement ? 'edit' : 'generate'), systemInstruction: { parts: [{ text: systemInstruction }] }, responseMimeType: 'application/json', temperature: isRefinement ? 0.1 : 0.2 } });
    const raw = extractJson(response.text || '') as Record<string, unknown>;
    const resolvedContext = normalizeContext(raw.context || context);
    const assistantMessage = typeof raw.assistantMessage === 'string' ? raw.assistantMessage.slice(0, 1200) : '';
    const ledgerForGraph = (graph: Studio1SemanticGraph): Studio1DecisionLedger => ({
      ...ledger,
      confirmedRequirements: Array.from(new Set([...ledger.confirmedRequirements, prompt])).slice(-40),
      assumptions: Array.from(new Set([...ledger.assumptions, ...graph.assumptions])).slice(-40),
      openQuestions: [],
    });

    if (isRefactor && previousGraph) {
      const semanticGraph = normalizeStudio1Graph(raw.graph, prompt);
      enforceDepth(semanticGraph, { ...resolvedContext, depth: resolvedContext.depth === 'auto' ? 'detailed' : resolvedContext.depth });
      const refactorDiff = diffStudio1Graphs(previousGraph, semanticGraph);
      if (refactorDiff.meaningfulChangeCount === 0) return NextResponse.json({ success: false, error: 'The proposed refactor did not materially change the architecture.' }, { status: 422 });
      for (const lockedId of ledger.lockedNodeIds) {
        const before = previousGraph.nodes.find(node => node.id === lockedId);
        const after = semanticGraph.nodes.find(node => node.id === lockedId);
        if (!before || !after || JSON.stringify(before) !== JSON.stringify(after)) return NextResponse.json({ success: false, error: `Locked component ${lockedId} was changed by the refactor.` }, { status: 422 });
      }
      const refactorCriticModel = getGeminiModel('critic');
      const refactorCriticResponse = await ai.models.generateContent({ model: refactorCriticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nMODE:\n${context.action}\nLOCKS:\n${JSON.stringify(ledger.lockedNodeIds)}\nBEFORE:\n${JSON.stringify(previousGraph)}\nTARGET:\n${JSON.stringify(semanticGraph)}\nDIFF:\n${JSON.stringify(refactorDiff)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Review the target architecture for requirement coverage, technical feasibility, preserved locks, security, reliability, operability, migration risk, and unjustified change. Return JSON only: {"approved":true,"score":95,"issues":[],"missingRequirements":[],"invalidServices":[]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
      const refactorCritic = extractJson(refactorCriticResponse.text || '') as Record<string, unknown>;
      if (refactorCritic.approved !== true || Number(refactorCritic.score) < 85 || (Array.isArray(refactorCritic.invalidServices) && refactorCritic.invalidServices.length)) return NextResponse.json({ success: false, error: 'The independent architecture critic rejected the refactor candidate.', semanticCritic: refactorCritic, refactorDiff }, { status: 422 });
      const nextLedger = ledgerForGraph(semanticGraph);
      const rendered = renderStudio1GraphXml(semanticGraph, theme);
      const xml = embedStudio1State(rendered.xml, semanticGraph, resolvedContext, nextLedger);
      return NextResponse.json({ success: true, mutationApplied: true, xml, semanticGraph, context: resolvedContext, decisionLedger: nextLedger, refactorPlan: raw.refactorPlan, refactorDiff, semanticCritic: refactorCritic, certification: rendered.certification, generationSource: 'gemini-semantic-refactor', model, baseVersionId, summary: `${context.action === 'full_refactor' ? 'Full' : 'Guided'} refactor candidate: ${refactorDiff.meaningfulChangeCount} semantic changes`, targetTier: semanticGraph.nodes.map(node => node.zone).filter((zone, index, zones) => zones.indexOf(zone) === index).join(' → '), changedComponents: [...refactorDiff.addedNodeIds, ...refactorDiff.modifiedNodeIds, ...refactorDiff.removedNodeIds].slice(0, 16), reasoning: assistantMessage || 'Created a separately reviewable refactor candidate.' });
    }

    if (isRefinement && previousGraph) {
      const plan = normalizePlan(raw.changePlan);
      if (['discuss', 'clarify', 'validate'].includes(plan.intent) || plan.operations.length === 0) return NextResponse.json({ success: true, mutationApplied: false, interaction: { ...plan, message: assistantMessage || plan.rationale }, context: resolvedContext, generationSource: 'gemini-conversation', model, baseVersionId });
      if (plan.intent === 'refactor' || context.action === 'guided_refactor' || context.action === 'full_refactor') return NextResponse.json({ success: true, mutationApplied: false, interaction: { ...plan, requiresConfirmation: true, message: assistantMessage || 'This request exceeds a safe incremental change. Start a refactor branch to continue.' }, context: resolvedContext, generationSource: 'gemini-change-planner', model, baseVersionId });
      const semanticGraph = normalizeStudio1Graph(applyStudio1Patch(previousGraph, plan.operations), prompt);
      const changeValidation = validateStudio1Change(previousGraph, semanticGraph, plan, ledger);
      if (!changeValidation.valid) return NextResponse.json({ success: false, error: changeValidation.violations.join(' '), changeValidation, interaction: { ...plan, message: assistantMessage }, generationSource: 'rejected-patch' }, { status: 422 });
      if (changeValidation.risk === 'high' && !body.confirmHighImpact) return NextResponse.json({ success: true, mutationApplied: false, interaction: { ...plan, requiresConfirmation: true, message: `${assistantMessage || plan.summary} This affects ${changeValidation.diff.blastRadiusPercent}% of the current graph.`, options: [{ id: 'confirm_high_impact', label: 'Apply high-impact change' }, { id: 'guided_refactor', label: 'Use guided refactor', recommended: true }, { id: 'cancel', label: 'Cancel' }] }, changeValidation, context: resolvedContext, generationSource: 'gemini-change-planner', model, baseVersionId });

      const criticModel = getGeminiModel('critic');
      const criticResponse = await ai.models.generateContent({ model: criticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nPLAN:\n${JSON.stringify(plan)}\nBEFORE:\n${JSON.stringify(previousGraph)}\nAFTER:\n${JSON.stringify(semanticGraph)}\nDIFF:\n${JSON.stringify(changeValidation.diff)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Independently verify that the requested incremental change occurred, unrelated architecture was preserved, connections are technically coherent, and no locked constraint was violated. Return JSON only: {"approved":true,"score":95,"issues":[],"missingRequirements":[],"invalidServices":[]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
      const criticRaw = extractJson(criticResponse.text || '') as Record<string, unknown>;
      if (criticRaw.approved !== true || Number(criticRaw.score) < 85 || (Array.isArray(criticRaw.invalidServices) && criticRaw.invalidServices.length)) return NextResponse.json({ success: false, error: 'The independent architecture critic rejected the incremental candidate.', semanticCritic: criticRaw, changeValidation }, { status: 422 });
      const nextLedger = ledgerForGraph(semanticGraph);
      const rendered = renderStudio1GraphXml(semanticGraph, theme);
      const xml = embedStudio1State(rendered.xml, semanticGraph, resolvedContext, nextLedger);
      const changedIds = [...changeValidation.diff.addedNodeIds, ...changeValidation.diff.modifiedNodeIds, ...changeValidation.diff.removedNodeIds];
      const changedComponents = changedIds.map(id => semanticGraph.nodes.find(node => node.id === id)?.label || previousGraph.nodes.find(node => node.id === id)?.label || id);
      return NextResponse.json({ success: true, mutationApplied: true, xml, semanticGraph, context: resolvedContext, decisionLedger: nextLedger, changePlan: plan, changeValidation, semanticCritic: criticRaw, certification: rendered.certification, generationSource: 'gemini-semantic-patch', model, baseVersionId, summary: plan.summary, targetTier: semanticGraph.nodes.map(node => node.zone).filter((zone, index, zones) => zones.indexOf(zone) === index).join(' → '), changedComponents, reasoning: assistantMessage || plan.rationale });
    }

    const semanticGraph = normalizeStudio1Graph(raw.graph, prompt);
    enforceDepth(semanticGraph, resolvedContext);
    const createCriticModel = getGeminiModel('critic');
    const createCriticResponse = await ai.models.generateContent({ model: createCriticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nCONTEXT:\n${JSON.stringify(resolvedContext)}\nPROPOSED GRAPH:\n${JSON.stringify(semanticGraph)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Independently assess requirement coverage, abstraction-level fit, service compatibility, actors, data, security, operations, decision branches, typed flows, and unjustified assumptions. Return JSON only: {"approved":true,"score":95,"issues":[],"missingRequirements":[],"invalidServices":[]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
    const createCritic = extractJson(createCriticResponse.text || '') as Record<string, unknown>;
    if (createCritic.approved !== true || Number(createCritic.score) < 80 || (Array.isArray(createCritic.invalidServices) && createCritic.invalidServices.length)) return NextResponse.json({ success: false, error: 'The independent architecture critic rejected the generated architecture.', semanticCritic: createCritic }, { status: 422 });
    const nextLedger = ledgerForGraph(semanticGraph);
    const rendered = renderStudio1GraphXml(semanticGraph, theme);
    const xml = embedStudio1State(rendered.xml, semanticGraph, resolvedContext, nextLedger);
    return NextResponse.json({ success: true, mutationApplied: true, xml, semanticGraph, context: resolvedContext, decisionLedger: nextLedger, certification: rendered.certification, semanticCritic: createCritic, generationSource: 'gemini-semantic-graph-v2', model, summary: `${semanticGraph.patterns.join(' + ')} architecture with ${semanticGraph.nodes.length} components and ${semanticGraph.edges.length} typed flows`, targetTier: semanticGraph.nodes.map(node => node.zone).filter((zone, index, zones) => zones.indexOf(zone) === index).join(' → '), changedComponents: semanticGraph.nodes.map(node => node.label).slice(0, 10), reasoning: assistantMessage || `Generated a ${resolvedContext.level} ${resolvedContext.viewpoint} architecture for ${resolvedContext.persona}.` });
  } catch (error: any) {
    console.error('[studio1/generate] Studio 1 transaction failed:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Studio 1 request failed.', generationSource: 'none' }, { status: 500 });
  }
}
