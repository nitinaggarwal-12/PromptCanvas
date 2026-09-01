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

// Temporary Studio 1 recovery mode: validators report diagnostics but never block a renderable result.
const ENFORCE_STUDIO1_GATES = false;

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
      ? `You are Studio 1, a principal architect performing a ${context.action}. Produce a complete target semantic graph, not patch operations. Preserve every locked component exactly. For guided refactoring also preserve valid unaffected capabilities and constraints; for full refactoring preserve only explicit requirements, constraints, and locks. Correct technical weaknesses, make trade-offs explicit, and keep stable IDs for retained components. For GCP, use official Google Cloud product names and serviceKey values and model policy/control relationships correctly: Cloud Armor protects Cloud Load Balancing, IAM authorizes workloads, observability observes workloads, publishers publish to Pub/Sub topics, and subscribers consume through Pub/Sub subscriptions. Use relationType invokes|routes|protects|publishes|subscribes|processes|writes|observes|authorizes|contains|replicates|feedback on every edge. Use 10-30 components for detailed depth and at least 14 for exhaustive. Return JSON only: {"context":${JSON.stringify(context)},"assistantMessage":"summary and trade-offs","refactorPlan":{"problems":[],"majorChanges":[],"migrationConsiderations":[],"requiresConfirmation":true},"graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}`
      : isRefinement
      ? `You are Studio 1, a conversational principal architect. Classify the message as discuss, clarify, propose_change, apply_change, refactor, validate, or revert. Questions and hypotheticals MUST NOT mutate the graph. If ambiguous or technically infeasible, explain the conflict and ask one targeted question with 2-4 viable options. For incremental edits return ONLY controlled patch operations against exact existing IDs. Preserve unrelated components and flows. Never return a replacement graph. Supported operations: add_node, update_node, remove_node, add_edge, update_edge, remove_edge, insert_between, change_patterns. New nodes/edges require complete fields. A request affecting roughly more than 35% of the graph is a refactor requiring confirmation. Return JSON only: {"context":${JSON.stringify(context)},"changePlan":{"intent":"discuss|clarify|propose_change|apply_change|refactor|validate|revert","summary":"","rationale":"","operations":[],"preservedNodeIds":[],"requiresConfirmation":false,"clarificationQuestion":"optional","options":[{"id":"x","label":"choice","recommended":true}]},"assistantMessage":"concise response"}`
      : [
          'You are Studio 1, a principal enterprise and cloud architect.',
          'Generate exactly THREE technically viable and meaningfully different semantic architecture alternatives for the same requirements.',
          'Never return canned templates, cosmetic rearrangements, incomplete samples, or dangling references.',
          'Tailor every strategy to the workload. Mark exactly one recommended option and explain why.',
          `Respect this context: ${JSON.stringify(context)}.`,
          `Every option must implement these capabilities: ${requiredCapabilities.join(', ')}.`,
          'Represent each capability with workload-relevant components and flows, not filler. Every component must participate in one connected end-to-end topology.',
          'Relationships require unique IDs, coherent direction, contiguous step numbers, and correct flow types. Backward paths must be feedback or governance.',
          'For GCP, follow Google Cloud Architecture Center conventions: use official product names and service keys, explicit Google Cloud/project/region boundaries, restrained Google colors, and cross-cutting identity, security, and operations controls.',
          'Model semantics rather than drawing order: Cloud Armor protects Cloud Load Balancing as a policy relationship; IAM authorizes workloads; Monitoring and Logging observe workloads; publishers publish to Pub/Sub topics; subscribers consume through Pub/Sub subscriptions; processing writes to durable data services.',
          'For a GCP streaming request, the Balanced Production option MUST contain 14-18 meaningful components and explicitly include: external producer, Cloud Armor, Cloud Load Balancing, a Cloud Run or GKE ingestion runtime, Pub/Sub event topic, separate Pub/Sub subscription, a schema/data-quality decision diamond with valid and invalid outcomes, Dataflow, a distinct Pub/Sub dead-letter topic with retry/replay flow, Cloud Storage raw archive/quarantine, BigQuery analytical sink, Identity and Access Management, Cloud Logging, and Cloud Monitoring. Use this exact semantic path: producer → load balancer → ingestion → topic → subscription → Dataflow → schema decision; valid → BigQuery; invalid → Cloud Storage quarantine. Model subscription delivery exhaustion separately as subscription → dead-letter topic, then replay dead-letter topic → main topic. The primary flow must remain left-to-right. Cloud Armor, IAM, Logging, and Monitoring are cross-cutting policy/telemetry relationships and must not be inserted inline in the data path.',
          'Use decision nodes only for real branching and give them at least two uniquely labelled conditional outcomes. Include explicit assumptions.',
          'Standard graphs use 6-30 components, detailed graphs at least 10, and exhaustive graphs at least 14.',
          'Allowed patterns: layered, event-driven, hub-spoke, network-topology, swimlane, sequence.',
          'Every node MUST use exactly: {"id":"stable_snake_case_id","label":"specific product or architectural capability name","description":"specific responsibility","kind":"actor|service|process|decision|datastore|queue|security|observability|external","stage":1,"zone":"meaningful domain name","provider":"GCP or external","serviceKey":"official key when applicable","technology":"protocol, runtime, or implementation detail"}.',
          'Never use generic labels such as Component 1, Service 2, Process 3, or placeholder descriptions.',
          'Every edge MUST use exactly: {"id":"unique_edge_id","source":"exact_node_id","target":"exact_node_id","label":"specific action, protocol, event, or data movement","flowType":"synchronous|asynchronous|data|network|ai|governance|feedback","relationType":"invokes|routes|protects|publishes|subscribes|processes|writes|observes|authorizes|contains|replicates|feedback","step":1,"condition":"required only for decision outcomes"}.',
          'Allowed GCP serviceKey values: gemini, vertex_ai, vertex_vector_search, document_ai, agent_builder, model_armor, gke, gke_autopilot, cloud_run, cloud_functions, compute_engine, bigquery, spanner, memorystore, cloud_storage, pubsub, dataflow, cloud_armor, iap, cloud_dlp, cloud_iam, vpc_sc, scc, cloud_load_balancing, cloud_cdn, user_ingress, cloud_monitoring, cloud_logging, cloud_deploy, artifact_registry.',
          'Return JSON only with this top-level shape: {"context":{},"assistantMessage":"","alternatives":[{"id":"lean","name":"Lean & Managed","strategy":"","optimizeFor":[],"tradeoffs":[],"recommended":false,"graph":{"title":"","subtitle":"","patterns":[],"assumptions":[],"nodes":[],"edges":[]}},{"id":"balanced","name":"Balanced Production","strategy":"","optimizeFor":[],"tradeoffs":[],"recommended":true,"graph":{"title":"","subtitle":"","patterns":[],"assumptions":[],"nodes":[],"edges":[]}},{"id":"enterprise","name":"Resilient Enterprise","strategy":"","optimizeFor":[],"tradeoffs":[],"recommended":false,"graph":{"title":"","subtitle":"","patterns":[],"assumptions":[],"nodes":[],"edges":[]}}]}.',
        ].join(' ');

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
      if (ENFORCE_STUDIO1_GATES && refactorDiff.meaningfulChangeCount === 0) return NextResponse.json({ success: false, error: 'The proposed refactor did not materially change the architecture.' }, { status: 422 });
      for (const lockedId of ledger.lockedNodeIds) {
        const before = previousGraph.nodes.find(node => node.id === lockedId);
        const after = semanticGraph.nodes.find(node => node.id === lockedId);
        if (ENFORCE_STUDIO1_GATES && (!before || !after || JSON.stringify(before) !== JSON.stringify(after))) return NextResponse.json({ success: false, error: `Locked component ${lockedId} was changed by the refactor.` }, { status: 422 });
      }
      const refactorCriticModel = getGeminiModel('critic');
      const refactorCriticResponse = await ai.models.generateContent({ model: refactorCriticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nMODE:\n${context.action}\nLOCKS:\n${JSON.stringify(ledger.lockedNodeIds)}\nBEFORE:\n${JSON.stringify(previousGraph)}\nTARGET:\n${JSON.stringify(semanticGraph)}\nDIFF:\n${JSON.stringify(refactorDiff)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Review the target architecture for requirement coverage, technical feasibility, preserved locks, security, reliability, operability, migration risk, and unjustified change. Return JSON only: {"approved":true,"score":95,"issues":[],"missingRequirements":[],"invalidServices":[]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
      const refactorCritic = extractJson(refactorCriticResponse.text || '') as Record<string, unknown>;
      if (ENFORCE_STUDIO1_GATES && (refactorCritic.approved !== true || Number(refactorCritic.score) < 85 || (Array.isArray(refactorCritic.invalidServices) && refactorCritic.invalidServices.length))) return NextResponse.json({ success: false, error: 'The independent architecture critic rejected the refactor candidate.', semanticCritic: refactorCritic, refactorDiff }, { status: 422 });
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
      if (ENFORCE_STUDIO1_GATES && !changeValidation.valid) return NextResponse.json({ success: false, error: changeValidation.violations.join(' '), changeValidation, interaction: { ...plan, message: assistantMessage }, generationSource: 'rejected-patch' }, { status: 422 });
      if (changeValidation.risk === 'high' && !body.confirmHighImpact) return NextResponse.json({ success: true, mutationApplied: false, interaction: { ...plan, requiresConfirmation: true, message: `${assistantMessage || plan.summary} This affects ${changeValidation.diff.blastRadiusPercent}% of the current graph.`, options: [{ id: 'confirm_high_impact', label: 'Apply high-impact change' }, { id: 'guided_refactor', label: 'Use guided refactor', recommended: true }, { id: 'cancel', label: 'Cancel' }] }, changeValidation, context: resolvedContext, generationSource: 'gemini-change-planner', model, baseVersionId });

      const criticModel = getGeminiModel('critic');
      const criticResponse = await ai.models.generateContent({ model: criticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nPLAN:\n${JSON.stringify(plan)}\nBEFORE:\n${JSON.stringify(previousGraph)}\nAFTER:\n${JSON.stringify(semanticGraph)}\nDIFF:\n${JSON.stringify(changeValidation.diff)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Independently verify that the requested incremental change occurred, unrelated architecture was preserved, connections are technically coherent, and no locked constraint was violated. Return JSON only: {"approved":true,"score":95,"issues":[],"missingRequirements":[],"invalidServices":[]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
      const criticRaw = extractJson(criticResponse.text || '') as Record<string, unknown>;
      if (ENFORCE_STUDIO1_GATES && (criticRaw.approved !== true || Number(criticRaw.score) < 85 || (Array.isArray(criticRaw.invalidServices) && criticRaw.invalidServices.length))) return NextResponse.json({ success: false, error: 'The independent architecture critic rejected the incremental candidate.', semanticCritic: criticRaw, changeValidation }, { status: 422 });
      const nextLedger = ledgerForGraph(semanticGraph);
      const rendered = renderStudio1GraphXml(semanticGraph, theme);
      const xml = embedStudio1State(rendered.xml, semanticGraph, resolvedContext, nextLedger);
      const changedIds = [...changeValidation.diff.addedNodeIds, ...changeValidation.diff.modifiedNodeIds, ...changeValidation.diff.removedNodeIds];
      const changedComponents = changedIds.map(id => semanticGraph.nodes.find(node => node.id === id)?.label || previousGraph.nodes.find(node => node.id === id)?.label || id);
      return NextResponse.json({ success: true, mutationApplied: true, xml, semanticGraph, context: resolvedContext, decisionLedger: nextLedger, changePlan: plan, changeValidation, semanticCritic: criticRaw, certification: rendered.certification, generationSource: 'gemini-semantic-patch', model, baseVersionId, summary: plan.summary, targetTier: semanticGraph.nodes.map(node => node.zone).filter((zone, index, zones) => zones.indexOf(zone) === index).join(' → '), changedComponents, reasoning: assistantMessage || plan.rationale });
    }

    const rawAlternatives = Array.isArray(raw.alternatives) ? raw.alternatives : [];
    if (rawAlternatives.length === 0) return NextResponse.json({ success: false, error: 'The architecture model returned no renderable alternatives.' }, { status: 422 });
    let alternatives = rawAlternatives.slice(0, 3).map((item, index) => normalizeAlternative(item, index, prompt));
    if (ENFORCE_STUDIO1_GATES && new Set(alternatives.map(candidate => candidate.id)).size !== alternatives.length) return NextResponse.json({ success: false, error: 'Architecture alternatives returned duplicate candidate IDs.' }, { status: 422 });
    let qualityContracts = alternatives.map(candidate => ({
      id: candidate.id,
      ...validateStudio1ArchitectureQuality(candidate.graph, resolvedContext, prompt),
    }));
    const incompleteIds = new Set(qualityContracts.filter(result => !result.valid).map(result => result.id));
    // Quality repair is always attempted before weak candidates are exposed.
    // ENFORCE_STUDIO1_GATES only controls whether a still-invalid result is
    // rejected after recovery; it must not disable the recovery itself.
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
            systemInstruction: { parts: [{ text: `Repair only the rejected architecture candidates against every deterministic failure supplied. Every repaired graph must contain at least ${requirements.completeness.minimumNodes} meaningful, workload-relevant components and ${requirements.completeness.minimumEdges} coherent typed flows. It must represent all required capabilities: ${requirements.requiredCapabilities.join(', ')}. Every component must participate in one connected end-to-end topology; flows must be unique, directed, typed, ordered, and include relationType; backward flows must be feedback or governance; decisions need two uniquely named conditional outcomes. For GCP streaming, use at least 14 components and explicitly represent producer, Cloud Armor protecting Cloud Load Balancing, ingestion runtime, Pub/Sub topic, separate Pub/Sub subscription, Dataflow, schema validation decision, Pub/Sub dead-letter topic, Cloud Storage, BigQuery, IAM, Cloud Logging, and Cloud Monitoring. Enforce topic → subscription → Dataflow → schema decision; valid → BigQuery; invalid → Cloud Storage quarantine; subscription delivery exhaustion → dead-letter topic; dead-letter topic → main topic for replay. Keep the primary path left-to-right; render policies and telemetry as cross-cutting relationships. Preserve candidate ID, strategy, and optimization objective. Return JSON only: {"repaired":[{"id":"candidate_id","graph":{"title":"","subtitle":"","patterns":["layered"],"assumptions":[],"nodes":[],"edges":[]}}]}.` }] },
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
    if (ENFORCE_STUDIO1_GATES && unresolvedCompleteness.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Studio 1 could not produce three complete and structurally correct architecture alternatives after an automatic repair pass. Your canvas was not changed. Please retry or clarify the workload, users, scale, reliability, and security expectations.',
        candidateQuality: qualityContracts,
        generationSource: 'candidate-quality-rejected',
      }, { status: 422 });
    }
    const diversity = validateStudio1CandidateDiversity(alternatives);
    if (ENFORCE_STUDIO1_GATES && !diversity.valid) return NextResponse.json({ success: false, error: 'The generated options were too similar to represent meaningful architecture alternatives.', candidateDiversity: diversity }, { status: 422 });

    const createCriticModel = getGeminiModel('critic');
    const createCriticResponse = await ai.models.generateContent({ model: createCriticModel, contents: [{ role: 'user', parts: [{ text: `REQUEST:\n${prompt}\nCONTEXT:\n${JSON.stringify(resolvedContext)}\nCANDIDATES:\n${JSON.stringify(alternatives)}` }] }], config: { ...getGenConfig('audit'), systemInstruction: { parts: [{ text: 'Independently compare all candidate architectures. Assess requirement coverage, abstraction-level fit, service compatibility, actors, data, security, reliability, operations, decision branches, typed flows, unjustified assumptions, and whether the strategies are meaningfully distinct. Do not reward complexity by itself. For GCP streaming, never score above 80 if the graph lacks any of: secure ingress with Cloud Armor as a policy on Cloud Load Balancing, distinct Pub/Sub topic and subscription, schema validation decision with valid/invalid branches, Dataflow, dead-letter and retry/replay semantics, Cloud Storage raw archive, BigQuery sink, IAM, Cloud Logging, or Cloud Monitoring. Return JSON only: {"recommendedId":"balanced","comparisonSummary":"","candidates":[{"id":"lean","approved":true,"score":90,"issues":[],"missingRequirements":[],"invalidServices":[]},{"id":"balanced","approved":true,"score":94,"issues":[],"missingRequirements":[],"invalidServices":[]},{"id":"enterprise","approved":true,"score":88,"issues":[],"missingRequirements":[],"invalidServices":[]}]}.' }] }, responseMimeType: 'application/json', temperature: 0.05 } });
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
    if (ENFORCE_STUDIO1_GATES && rejected.length > 0) return NextResponse.json({ success: false, error: `The independent architecture critic rejected ${rejected.map(item => item.name).join(', ')}. No weak option was shown.`, semanticCritic: createCritic, candidateDiversity: diversity }, { status: 422 });

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
        message: assistantMessage || `Generated ${candidates.length} renderable architecture option${candidates.length === 1 ? '' : 's'} for a ${resolvedContext.level} ${resolvedContext.viewpoint} architecture. Quality findings are advisory while recovery mode is active.`,
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
