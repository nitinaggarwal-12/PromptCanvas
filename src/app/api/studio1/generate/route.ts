import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiModel, getGenConfig } from '@/lib/geminiConfig';
import { normalizeStudio1Graph, renderStudio1GraphXml, Studio1SemanticGraph } from '@/lib/studio1HybridEngine';
import {
  applyStudio1Patch,
  assessStudio1InitialPrompt,
  diffStudio1Graphs,
  embedStudio1State,
  inferStudio1RequiredCapabilities,
  Studio1ChangePlan,
  Studio1DecisionLedger,
  Studio1GenerationContext,
  Studio1PatchOperation,
  validateStudio1CandidateDiversity,
  validateStudio1Change,
  validateStudio1ArchitectureQuality,
  validateStudio1GraphCompleteness,
} from '@/lib/studio1ArchitectureCore';

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
  const completeness = validateStudio1GraphCompleteness(graph, context.depth);
  if (!completeness.valid) throw new Error(completeness.violations.join(' '));
}

const stringList = (value: unknown, maximum = 6): string[] => Array.isArray(value)
  ? value.map(String).map(item => item.trim()).filter(Boolean).slice(0, maximum)
  : [];

interface RawStudio1Alternative {
  id: string;
  name: string;
  strategy: string;
  optimizeFor: string[];
  tradeoffs: string[];
  recommended: boolean;
  graph: Studio1SemanticGraph;
}

function normalizeAlternative(value: unknown, index: number, prompt: string): RawStudio1Alternative {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const defaults = [
    { id: 'lean', name: 'Lean & Managed' },
    { id: 'balanced', name: 'Balanced Production' },
    { id: 'enterprise', name: 'Resilient Enterprise' },
  ];
  const fallback = defaults[index] || { id: `option_${index + 1}`, name: `Option ${index + 1}` };
  return {
    id: String(raw.id || fallback.id).toLowerCase().replace(/[^a-z0-9_-]+/g, '_').slice(0, 40),
    name: String(raw.name || fallback.name).slice(0, 80),
    strategy: String(raw.strategy || 'A distinct architecture strategy for the stated requirements.').slice(0, 360),
    optimizeFor: stringList(raw.optimizeFor, 5),
    tradeoffs: stringList(raw.tradeoffs, 5),
    recommended: raw.recommended === true,
    graph: normalizeStudio1Graph(raw.graph, prompt),
  };
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
    const initialPromptAssessment = !previousGraph ? assessStudio1InitialPrompt(prompt) : null;
    if (initialPromptAssessment?.disposition === 'clarify') {
        return NextResponse.json({
          success: true,
          mutationApplied: false,
          promptAssessment: initialPromptAssessment,
          context,
          interaction: {
            intent: initialPromptAssessment.disposition,
            message: initialPromptAssessment.reason,
            clarificationQuestion: initialPromptAssessment.question,
            options: initialPromptAssessment.options,
            requiresConfirmation: false,
          },
          generationSource: 'studio1-deterministic-intent-gate',
        });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ success: false, error: 'Studio 1 requires GEMINI_API_KEY. No static template was returned.', generationSource: 'none' }, { status: 503 });

    const model = getGeminiModel('pro');
    const ai = new GoogleGenAI({ apiKey });
    if (initialPromptAssessment?.disposition === 'discuss') {
      const discussion = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          ...getGenConfig('edit'),
          systemInstruction: { parts: [{ text: 'You are Studio 1, a concise principal architect. Answer the question accurately without creating or changing a diagram. End with one useful question about whether the user wants a conceptual or technical architecture. Return JSON only: {"assistantMessage":"","clarificationQuestion":"","options":[{"id":"create_conceptual","label":"Create conceptual diagram"},{"id":"create_technical","label":"Create technical diagram"}]}.' }] },
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });
      const discussed = extractJson(discussion.text || '') as Record<string, unknown>;
      return NextResponse.json({
        success: true,
        mutationApplied: false,
        promptAssessment: initialPromptAssessment,
        context,
        interaction: {
          intent: 'discuss',
          message: typeof discussed.assistantMessage === 'string' ? discussed.assistantMessage.slice(0, 1200) : initialPromptAssessment.reason,
          clarificationQuestion: typeof discussed.clarificationQuestion === 'string' ? discussed.clarificationQuestion.slice(0, 300) : initialPromptAssessment.question,
          options: Array.isArray(discussed.options) ? discussed.options.slice(0, 3) : initialPromptAssessment.options?.filter(option => option.id !== 'explain_only'),
          requiresConfirmation: false,
        },
        generationSource: 'gemini-initial-discussion',
        model,
      });
    }
    const isRefinement = Boolean(previousGraph);
    const isRefactor = Boolean(previousGraph) && (context.action === 'guided_refactor' || context.action === 'full_refactor');
    const requiredCapabilities = inferStudio1RequiredCapabilities(context, prompt);
    const systemInstruction = isRefactor
      ? `You are Studio 1, a principal architect performing a ${context.action}. Produce a complete target semantic graph, not patch operations. Preserve every locked component exactly. For guided refactoring also preserve valid unaffected capabilities and constraints; for full refactoring preserve only explicit requirements, constraints, and locks. Correct technical weaknesses, make trade-offs explicit, and keep stable IDs for retained components. Use 10-30 components for detailed depth and at least 14 for exhaustive. Return JSON only: {"context":${JSON.stringify(context)},"assistantMessage":"summary and trade-offs","refactorPlan":{"problems":[],"majorChanges":[],"migrationConsiderations":[],"requiresConfirmation":true},"graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}`
      : isRefinement
      ? `You are Studio 1, a conversational principal architect. Classify the message as discuss, clarify, propose_change, apply_change, refactor, validate, or revert. Questions and hypotheticals MUST NOT mutate the graph. If ambiguous or technically infeasible, explain the conflict and ask one targeted question with 2-4 viable options. For incremental edits return ONLY controlled patch operations against exact existing IDs. Preserve unrelated components and flows. Never return a replacement graph. Supported operations: add_node, update_node, remove_node, add_edge, update_edge, remove_edge, insert_between, change_patterns. New nodes/edges require complete fields. A request affecting roughly more than 35% of the graph is a refactor requiring confirmation. Return JSON only: {"context":${JSON.stringify(context)},"changePlan":{"intent":"discuss|clarify|propose_change|apply_change|refactor|validate|revert","summary":"","rationale":"","operations":[],"preservedNodeIds":[],"requiresConfirmation":false,"clarificationQuestion":"optional","options":[{"id":"x","label":"choice","recommended":true}]},"assistantMessage":"concise response"}`
      : `You are Studio 1, a principal enterprise and cloud architect. Generate exactly THREE technically viable and meaningfully different semantic architecture alternatives for the same requirements. Never return canned templates or cosmetic rearrangements. Tailor the strategies to the workload; common strategies are lean/managed, balanced production, and resilient enterprise, but use more relevant alternatives when appropriate. Mark exactly one recommended option and explain why. Respect persona, level, viewpoint, lifecycle, depth and platform. The deterministic quality contract requires these capabilities in every option: ${requiredCapabilities.join(', ')}. Represent each required capability with workload-relevant components and flows, not filler. Every component must participate in one connected end-to-end topology. Relationships must use unique IDs, coherent direction, a unique contiguous step sequence, and correct flow types. Backward paths must be feedback or governance. Use decision nodes only for real branching, with at least two uniquely labelled conditional outcomes. Include explicit assumptions. Each standard graph uses 6-30 components, detailed at least 10, exhaustive at least 14. Allowed patterns: layered, event-driven, hub-spoke, network-topology, swimlane, sequence. Node kinds: actor, service, process, decision, datastore, queue, security, observability, external. Flow types: synchronous, asynchronous, data, network, ai, governance, feedback. Allowed GCP serviceKey values: gemini, vertex_ai, vertex_vector_search, document_ai, agent_builder, model_armor, gke, gke_autopilot, cloud_run, cloud_functions, compute_engine, bigquery, spanner, memorystore, cloud_storage, pubsub, dataflow, cloud_armor, iap, cloud_dlp, cloud_iam, vpc_sc, scc, cloud_load_balancing, cloud_cdn, user_ingress, cloud_monitoring, cloud_logging, cloud_deploy, artifact_registry. Return JSON only: {"context":${JSON.stringify(context)},"assistantMessage":"inferred workload, audience, level, platform and major assumptions","alternatives":[{"id":"lean","name":"Lean & Managed","strategy":"","optimizeFor":[],"tradeoffs":[],"recommended":false,"graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}},{"id":"balanced","name":"Balanced Production","strategy":"","optimizeFor":[],"tradeoffs":[],"recommended":true,"graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}},{"id":"enterprise","name":"Resilient Enterprise","strategy":"","optimizeFor":[],"tradeoffs":[],"recommended":false,"graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}]}`;

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

    const rawAlternatives = Array.isArray(raw.alternatives) ? raw.alternatives : [];
    if (rawAlternatives.length !== 3) return NextResponse.json({ success: false, error: 'Studio 1 requires exactly three architecture alternatives for a new design.' }, { status: 422 });
    let alternatives = rawAlternatives.map((item, index) => normalizeAlternative(item, index, prompt));
    if (new Set(alternatives.map(candidate => candidate.id)).size !== alternatives.length) return NextResponse.json({ success: false, error: 'Architecture alternatives returned duplicate candidate IDs.' }, { status: 422 });
    let qualityContracts = alternatives.map(candidate => ({
      id: candidate.id,
      ...validateStudio1ArchitectureQuality(candidate.graph, resolvedContext, prompt),
    }));
    const incompleteIds = new Set(qualityContracts.filter(result => !result.valid).map(result => result.id));
    if (incompleteIds.size > 0) {
      try {
        const requirements = qualityContracts.find(result => !result.valid)!;
        const repairResponse = await ai.models.generateContent({
          model,
          contents: [{
            role: 'user',
            parts: [{
              text: `ORIGINAL REQUEST:\n${prompt}\nCONTEXT:\n${JSON.stringify(resolvedContext)}\nINCOMPLETE CANDIDATES:\n${JSON.stringify(alternatives.filter(candidate => incompleteIds.has(candidate.id)))}\nDETERMINISTIC QUALITY FAILURES:\n${JSON.stringify(qualityContracts.filter(result => !result.valid))}`,
            }],
          }],
          config: {
            ...getGenConfig('generate'),
            systemInstruction: { parts: [{ text: `Repair only the rejected architecture candidates against every deterministic failure supplied. Every repaired graph must contain at least ${requirements.completeness.minimumNodes} meaningful, workload-relevant components and ${requirements.completeness.minimumEdges} coherent typed flows. It must represent all required capabilities: ${requirements.requiredCapabilities.join(', ')}. Every component must participate in one connected end-to-end topology; flows must be unique, directed, typed, and ordered; backward flows must be feedback or governance; decisions need two uniquely named conditional outcomes. Add ingress, processing, data, security, reliability, failure handling, and observability only when required by the request and controls—never filler. Preserve candidate ID, strategy, and optimization objective. Return JSON only: {"repaired":[{"id":"candidate_id","graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}]}.` }] },
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        });
        const repairRaw = extractJson(repairResponse.text || '') as Record<string, unknown>;
        const repairedRows = Array.isArray(repairRaw.repaired) ? repairRaw.repaired : [];
        const repairedById = new Map(repairedRows.map(item => {
          const row = item && typeof item === 'object' ? item as Record<string, unknown> : {};
          return [String(row.id || ''), row] as const;
        }));
        alternatives = alternatives.map((candidate, index) => {
          if (!incompleteIds.has(candidate.id)) return candidate;
          const repaired = repairedById.get(candidate.id);
          return repaired?.graph
            ? normalizeAlternative({ ...candidate, graph: repaired.graph }, index, prompt)
            : candidate;
        });
        qualityContracts = alternatives.map(candidate => ({
          id: candidate.id,
          ...validateStudio1ArchitectureQuality(candidate.graph, resolvedContext, prompt),
        }));
      } catch (repairError) {
        console.error('[studio1/generate] Candidate completeness repair failed:', repairError);
      }
    }
    const unresolvedCompleteness = qualityContracts.filter(result => !result.valid);
    if (unresolvedCompleteness.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Studio 1 could not produce three complete and structurally correct architecture alternatives after an automatic repair pass. Your canvas was not changed. Please retry or clarify the workload, users, scale, reliability, and security expectations.',
        candidateQuality: qualityContracts,
        generationSource: 'candidate-quality-rejected',
      }, { status: 422 });
    }
    const diversity = validateStudio1CandidateDiversity(alternatives);
    if (!diversity.valid) return NextResponse.json({ success: false, error: 'The generated options were too similar to represent meaningful architecture alternatives.', candidateDiversity: diversity }, { status: 422 });

    const createCriticModel = getGeminiModel('critic');
    const createCriticResponse = await ai.models.generateContent({ model: createCriticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nCONTEXT:\n${JSON.stringify(resolvedContext)}\nCANDIDATES:\n${JSON.stringify(alternatives)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Independently compare all candidate architectures. Assess requirement coverage, abstraction-level fit, service compatibility, actors, data, security, reliability, operations, decision branches, typed flows, unjustified assumptions, and whether the strategies are meaningfully distinct. Do not reward complexity by itself. Return JSON only: {"recommendedId":"balanced","comparisonSummary":"","candidates":[{"id":"lean","approved":true,"score":90,"issues":[],"missingRequirements":[],"invalidServices":[]},{"id":"balanced","approved":true,"score":94,"issues":[],"missingRequirements":[],"invalidServices":[]},{"id":"enterprise","approved":true,"score":88,"issues":[],"missingRequirements":[],"invalidServices":[]}]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
    const createCritic = extractJson(createCriticResponse.text || '') as Record<string, unknown>;
    const criticRows = Array.isArray(createCritic.candidates) ? createCritic.candidates : [];
    const criticById = new Map(criticRows.map(item => {
      const row = item && typeof item === 'object' ? item as Record<string, unknown> : {};
      return [String(row.id || ''), row] as const;
    }));
    const rejected = alternatives.filter(alternative => {
      const review = criticById.get(alternative.id);
      return !review || review.approved !== true || Number(review.score) < 80 || stringList(review.invalidServices, 20).length > 0;
    });
    if (rejected.length > 0) return NextResponse.json({ success: false, error: `The independent architecture critic rejected ${rejected.map(item => item.name).join(', ')}. No weak option was shown.`, semanticCritic: createCritic, candidateDiversity: diversity }, { status: 422 });

    const recommendedId = alternatives.some(item => item.id === String(createCritic.recommendedId))
      ? String(createCritic.recommendedId)
      : alternatives.slice().sort((a, b) => Number(criticById.get(b.id)?.score || 0) - Number(criticById.get(a.id)?.score || 0))[0].id;
    const candidates = alternatives.map(alternative => {
      const graph = alternative.graph;
      const nextLedger = ledgerForGraph(graph);
      const rendered = renderStudio1GraphXml(graph, theme);
      const xml = embedStudio1State(rendered.xml, graph, resolvedContext, nextLedger);
      return {
        ...alternative,
        recommended: alternative.id === recommendedId,
        xml,
        semanticGraph: graph,
        context: resolvedContext,
        decisionLedger: nextLedger,
        certification: rendered.certification,
        qualityContract: qualityContracts.find(contract => contract.id === alternative.id),
        semanticCritic: criticById.get(alternative.id),
        summary: `${graph.patterns.join(' + ')} with ${graph.nodes.length} components and ${graph.edges.length} typed flows`,
        targetTier: graph.nodes.map(node => node.zone).filter((zone, index, zones) => zones.indexOf(zone) === index).join(' → '),
        changedComponents: graph.nodes.map(node => node.label).slice(0, 12),
      };
    });
    return NextResponse.json({
      success: true,
      mutationApplied: false,
      candidateSet: {
        title: 'Choose the architecture strategy to use as your baseline',
        message: assistantMessage || `Generated three validated alternatives for a ${resolvedContext.level} ${resolvedContext.viewpoint} architecture.`,
        comparisonSummary: typeof createCritic.comparisonSummary === 'string' ? createCritic.comparisonSummary.slice(0, 800) : '',
        recommendedId,
        diversity,
        candidates,
      },
      context: resolvedContext,
      promptAssessment: assessStudio1InitialPrompt(prompt),
      generationSource: 'gemini-semantic-candidate-tournament-v1',
      model,
    });
  } catch (error: any) {
    console.error('[studio1/generate] Studio 1 transaction failed:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Studio 1 request failed.', generationSource: 'none' }, { status: 500 });
  }
}
