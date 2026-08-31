import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiModel, getGenConfig } from '@/lib/geminiConfig';
import { normalizeStudio1Graph, renderStudio1GraphXml, Studio1SemanticGraph } from '@/lib/studio1HybridEngine';

function extractJson(text: string): unknown {
  const cleaned = text.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('The architecture model did not return a JSON semantic graph.');
    return JSON.parse(match[0]);
  }
}

function graphSummary(graph: Studio1SemanticGraph): string {
  return `${graph.patterns.join(' + ')} architecture with ${graph.nodes.length} components and ${graph.edges.length} typed flows`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const theme = body.theme === 'dark' ? 'dark' : 'light';
    const previousGraph = body.previousGraph && typeof body.previousGraph === 'object' ? body.previousGraph : null;

    if (prompt.length < 8) {
      return NextResponse.json({ success: false, error: 'Describe the architecture in at least eight characters.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'Studio 1 hybrid generation requires GEMINI_API_KEY. No static template was returned.',
        generationSource: 'none'
      }, { status: 503 });
    }

    const model = getGeminiModel('pro');
    const ai = new GoogleGenAI({ apiKey });
    const isRefinement = Boolean(previousGraph);
    const systemInstruction = `You are a principal enterprise and cloud architect. Convert the user's requirement into a typed semantic architecture graph. You do not draw XML and you do not copy a canned reference architecture.

ARCHITECTURE CONTRACTS
- Select one to three compatible structural patterns: layered, event-driven, hub-spoke, network-topology, swimlane, sequence.
- Every component must have a distinct architectural responsibility derived from the prompt.
- Use stages 1 through 6 for left-to-right flow. Keep 3-6 nodes per stage and no more than 30 nodes overall.
- Distinguish actor, service, process, decision, datastore, queue, security, observability, and external nodes.
- Distinguish synchronous, asynchronous, data, network, ai, governance, and feedback flows.
- Assign sequential step numbers that communicate what happens when.
- Decision nodes require at least two outgoing edges with explicit conditions such as Yes/No, Approved/Rejected, or Match/No match.
- Include closed feedback flows where operational learning, retry, audit, or model evaluation logically returns upstream.
- Include security boundaries, identity, observability, failure handling, and data stores only when relevant.
- For Google Cloud services, use only these exact serviceKey values when applicable: gemini, vertex_ai, vertex_vector_search, document_ai, agent_builder, model_armor, gke, gke_autopilot, cloud_run, cloud_functions, compute_engine, bigquery, spanner, memorystore, cloud_storage, pubsub, dataflow, cloud_armor, iap, cloud_dlp, cloud_iam, vpc_sc, scc, cloud_load_balancing, cloud_cdn, user_ingress, cloud_monitoring, cloud_logging, cloud_deploy, artifact_registry.
- Never invent a serviceKey. Non-GCP or vendor-neutral components must omit serviceKey.
- Record material inferred requirements in assumptions rather than presenting them as user facts.
${isRefinement ? '- This is an iterative refinement. Preserve unaffected accepted nodes and flows from the previous graph while applying the requested change.' : ''}

Return JSON only using this schema:
{
  "title": "string",
  "subtitle": "string",
  "patterns": ["layered"],
  "assumptions": ["string"],
  "nodes": [{
    "id": "stable_snake_case_id",
    "label": "string",
    "description": "concise technical responsibility",
    "kind": "actor|service|process|decision|datastore|queue|security|observability|external",
    "stage": 1,
    "zone": "short stage or trust-zone name",
    "provider": "GCP or vendor name",
    "serviceKey": "optional exact supported key",
    "technology": "protocol, runtime, SLA, or data format"
  }],
  "edges": [{
    "id": "stable_snake_case_id",
    "source": "node_id",
    "target": "node_id",
    "label": "protocol or payload",
    "flowType": "synchronous|asynchronous|data|network|ai|governance|feedback",
    "step": 1,
    "condition": "required for decision branches"
  }]
}`;

    const userMessage = `${isRefinement ? `PREVIOUS ACCEPTED SEMANTIC GRAPH:\n${JSON.stringify(previousGraph)}\n\nREFINEMENT REQUEST` : 'NEW ARCHITECTURE REQUIREMENT'}:\n${prompt}`;
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      config: {
        ...getGenConfig(isRefinement ? 'edit' : 'generate'),
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: 'application/json',
        temperature: isRefinement ? 0.2 : 0.25,
      },
    });

    const rawGraph = extractJson(response.text || '');
    const semanticGraph = normalizeStudio1Graph(rawGraph, prompt);
    const criticModel = getGeminiModel('critic');
    const criticResponse = await ai.models.generateContent({
      model: criticModel,
      contents: [{
        role: 'user',
        parts: [{ text: `USER REQUIREMENT:\n${prompt}\n\nPROPOSED SEMANTIC GRAPH:\n${JSON.stringify(semanticGraph)}` }]
      }],
      config: {
        ...getGenConfig('audit'),
        systemInstruction: { parts: [{ text: `Act as an independent architecture assurance reviewer. Do not redesign the graph. Check requirement coverage, service compatibility, missing actors/data/security/operations, decision branches, typed flow semantics, and unjustified assumptions. Return JSON only: {"approved":true,"score":95,"issues":[],"missingRequirements":[],"invalidServices":[]}. Approve only when score is at least 75 and no critical correctness issue remains.` }] },
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });
    const criticRaw = extractJson(criticResponse.text || '') as Record<string, unknown>;
    const semanticCritic = {
      approved: criticRaw.approved === true,
      score: Math.max(0, Math.min(100, Number(criticRaw.score) || 0)),
      issues: Array.isArray(criticRaw.issues) ? criticRaw.issues.map(String).slice(0, 10) : [],
      missingRequirements: Array.isArray(criticRaw.missingRequirements) ? criticRaw.missingRequirements.map(String).slice(0, 10) : [],
      invalidServices: Array.isArray(criticRaw.invalidServices) ? criticRaw.invalidServices.map(String).slice(0, 10) : [],
    };
    if (!semanticCritic.approved || semanticCritic.score < 75 || semanticCritic.invalidServices.length > 0) {
      const reasons = [...semanticCritic.issues, ...semanticCritic.missingRequirements, ...semanticCritic.invalidServices];
      throw new Error(`Independent architecture review rejected the graph (${semanticCritic.score}/100): ${reasons.join('; ') || 'critical semantic issue'}`);
    }
    const { xml, certification } = renderStudio1GraphXml(semanticGraph, theme);

    return NextResponse.json({
      success: true,
      xml,
      semanticGraph,
      certification,
      semanticCritic,
      generationSource: 'gemini-semantic-graph',
      model,
      summary: graphSummary(semanticGraph),
      targetTier: semanticGraph.nodes.map(node => node.zone).filter((zone, index, zones) => zones.indexOf(zone) === index).join(' → '),
      changedComponents: semanticGraph.nodes.slice(0, 8).map(node => node.label),
      reasoning: `Generated a fresh semantic graph, composed ${semanticGraph.patterns.join(' + ')} pattern contracts, then applied deterministic layout and typed edge routing.`,
      geminiAudit: {
        isValid: certification.certified,
        securityScore: semanticCritic.score,
        topologyScore: certification.score,
        complianceStandard: 'Studio 1 semantic and geometric certification',
        verifiedControls: ['Typed semantic graph', 'Pattern contracts', 'Explicit sequence steps', 'Typed connectors', 'Deterministic layout', 'Independent semantic critic'],
        aiReasoning: `Semantic critic approved at ${semanticCritic.score}/100. Geometric certification validated ${certification.nodeCount} nodes, ${certification.edgeCount} relationships, and ${certification.decisionCount} decision gates.`,
      },
    });
  } catch (error: any) {
    console.error('[studio1/generate] Hybrid generation failed:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Studio 1 hybrid generation failed.',
      generationSource: 'none'
    }, { status: 500 });
  }
}
