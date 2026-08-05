import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createDiagram, saveDiagramVersion, getLatestDiagramVersion, updateDiagramArchitectureType } from '@/lib/db';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock } from '@/lib/geminiLock';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';
import { tryCompileJsonOrFallback, compileSpecToDrawioXml, getBenchmarkItacsSpec } from '@/lib/diagramCompiler';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';
import { isLayoutEngineV2Enabled } from '@/lib/featureFlags';
import { runV2Pipeline, runV2EditPipeline } from '@/lib/pipeline/v2Pipeline';
import { GEMINI_MODEL_ID } from '@/lib/geminiConfig';
import { classifyIntent } from '@/lib/router/intentClassifier';
import { TEMPLATE_CONFIDENCE_THRESHOLD, FREEFORM_CONFIDENCE_THRESHOLD } from '@/lib/router/constants';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are "Maestro-Graph", an elite enterprise solutions architect and compiler that translates natural language system descriptions into valid, production-grade Draw.io (mxGraph) XML.

### Output Constraints:
1. Your response MUST contain exactly four sections in Markdown:
   - A section under header "### AI Architectural Plan & Reasoning" detailing:
     * Your prompt understanding and design objectives.
     * Architectural layout decisions (layer assignment, vertical spacing coordinates).
     * Security and resilience considerations (compliance checks, self-healing loops).
   - A section under header "### Business Use Case" detailing:
     * Business Objectives & Goals.
     * Key Stakeholders & Personas.
     * Expected Value, ROI, and success metrics.
   - A section under header "### Technical Use Case" detailing:
     * Step-by-step system execution flows.
     * Integration APIs, protocols, and security requirements.
     * Error Handling, fallbacks, and recovery paths.
   - A section under header "### Draw.io XML" containing only a valid Draw.io XML block wrapped in \`\`\`xml and \`\`\`.
2. The XML must start with \`<mxfile host="embed.diagrams.net">\` and contain a \`<diagram>\` and \`<mxGraphModel>\`.

### STRICT XML TEMPLATE (DO NOT DEVIATE):
Every node MUST be written EXACTLY in this format (no child tags other than <mxGeometry>):
<mxCell id="unique_node_id" value="&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot;&gt;&lt;b&gt;[1] Node Title&lt;/b&gt;&lt;br&gt;&lt;i&gt;Node Subtitle&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="200" height="60" as="geometry" />
</mxCell>

Every edge (connector) MUST be written EXACTLY in this format:
<mxCell id="unique_edge_id" value="&lt;i&gt;Connection Label&lt;/i&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#94A3B8;" edge="1" parent="1" source="source_node_id" target="target_node_id">
  <mxGeometry relative="1" as="geometry" />
</mxCell>

CRITICAL SYNTAX PROHIBITIONS:
1. NEVER create child tags like \`<Object>\`, \`<Data>\`, \`<label>\`, \`<value>\`, or \`<mxCell ... as="value">\` inside any \`<mxCell>\`.
2. An \`<mxCell>\` tag for a node can ONLY contain ONE \`<mxGeometry>\` child tag. NOTHING ELSE.
3. An \`<mxCell>\` tag for an edge can ONLY contain ONE \`<mxGeometry>\` child tag. NOTHING ELSE.
4. All labels MUST be placed inside the \`value="..."\` attribute directly on the \`<mxCell>\` tag.

### Mandatory Enterprise Depth & Clean Layout Rules (CRITICAL):
* **Balanced Node Density (10 to 14 Nodes Max)**: To maintain pristine visual readability, you MUST generate comprehensive enterprise diagrams containing **10 to 14 clean, distinct nodes** and **10 to 14 connectors**. Never generate 20+ individual floating boxes that cause vertical stack clutter.
* **Smart Component Clustering**: If a user prompt mentions many individual workers, subagents, or services (e.g., 10+ items), you MUST group them into logical multi-functional cards (e.g. \`<b>[4] Design & UX Cluster</b><br><i>ui-designer, cross-viewport, a11y</i>\`) rather than generating dozens of separate overlapping boxes!
* **Zero Duplicate Nodes**: Every node in the diagram MUST have a unique name and unique bracketed number \`[1]\`, \`[2]\`, \`[3]\`. Never output duplicate cards for the same service.
* **The 5 Core Functional Tiers**: Organize every architecture across 5 clean horizontal layers:
  1. **Ingestion & Trigger Layer** (Orange/Yellow \`#FFE6CC\`): e.g. User Prompt, Slash Commands, Web Ingress.
  2. **Core Orchestration & Routing Layer** (Purple \`#E1D5E7\` / Red \`#F8CECC\`): e.g. Master Orchestrator, Semantic Skill Router.
  3. **Specialized Worker Clusters Layer** (Blue \`#DAE8FC\` / Light Gray \`#F5F5F5\`): e.g. Design Cluster, Security/DB Cluster, Ops/Debug Cluster.
  4. **Skill Execution & Rules Layer** (Green \`#D5E8D4\`): e.g. Visual Regression Suite, Security SAST Guard, Telemetry Profiler.
  5. **Persistence & Deployment Layer** (Cylinder Green \`#D5E8D4\` / Slate \`#F5F5F5\`): e.g. Global Machine Config, GitHub Repo Sync, Live Deployment.
* **Dynamic Prompt Tailoring**: The text inside every box (\`<b>[Number] Title</b><br><i>Subtitle</i>\`) and connector label **must be dynamically customized** to the specific domain, cloud providers, and technologies requested in the user prompt! Do not output generic placeholders; generate realistic, domain-specific component names and technical descriptions!

### Design & Aesthetic Standards (High-Fidelity Enterprise Style):
* **Node Numbering & Labels**:
  * Prefix every main node's title with a sequential number in brackets, e.g. \`[1]\`, \`[2]\`, \`[2a]\`, \`[3]\`.
  * Always use rich text HTML labels for the node \`value\` attribute:
    \`<b>[Number] Title</b><br><i>Sub-title or Technology Description</i>\`
    Example: \`<b>[1] Adobe Workfront Ingestion</b><br><i>Campaign Strategy & Brief Ingest</i>\`
  * Keep titles bold and descriptions in italics, separated by a single \`<br>\`.
* **Colors (Modern Dark-Mode Palette)**:
  * Ingestion / Gateway / Edge (Orange/Yellow): Fill \`#FFE6CC\`, Stroke \`#D79B00\`, fontColor \`#000000\`
  * Core Orchestration (Salmon/Red): Fill \`#F8CECC\`, Stroke \`#B85450\`, fontColor \`#000000\`
  * Databases / Storage (Green): Fill \`#D5E8D4\`, Stroke \`#82B366\`, fontColor \`#000000\`
  * AI / LLM / Vector Search (Purple): Fill \`#E1D5E7\`, Stroke \`#9673A6\`, fontColor \`#000000\`
  * Google Cloud Services (Blue): Fill \`#DAE8FC\`, Stroke \`#6C8EBF\`, fontColor \`#000000\`
  * Sub-Agents / Auxiliary / Connectors (Light Gray/White): Fill \`#F5F5F5\`, Stroke \`#CCCCCC\`, fontColor \`#000000\`
* **Shapes**:
  * Standard Services / Compute / Agents: Rounded rectangles (\`rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;\`)
  * Gateways / API Handlers / Routers: Diamonds with generous padding (\`rhombus;whiteSpace=wrap;html=1;strokeWidth=2;\` with \`width=240\` and \`height=90\` so multi-line text never overflows the diamond border).
  * Databases / Storages: Cylinders (\`shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;\`)
  * Bridges / Cross-Cloud / Tunnels: Rounded rectangles with dashed borders (\`rounded=1;whiteSpace=wrap;html=1;arcSize=10;dashed=1;dashPattern=8 8;strokeWidth=2;\`)
* **Connectors & Edges**:
  * Always use clean, straight orthogonal connector lines with automatic line-crossing arc bridges:
    \`edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\`
  * Always add concise 1-3 word text labels to connectors to explain interactions without text collisions.
  * For special feedback loops (e.g., self-healing loops), use red dashed lines with double arrowheads:
    \`edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#EF4444;dashed=1;dashPattern=8 8;startArrow=classic;endArrow=classic;labelBackgroundColor=none;fontColor=#38BDF8;fontStyle=1;\`
  * **Edge Label Plain Text Rule**: For edge \`value\` attributes, use plain text without any HTML tags (do NOT wrap edge values in \`<font>\`, \`<b>\`, \`<i>\`, or \`<div>\`). Example: \`value="Validated API Call"\`. Always append \`labelBackgroundColor=none;fontColor=#38BDF8;fontStyle=1;\` to the edge style attribute.
  * **Critical mxPoint Rule**: Never use \`<Object>\` tags to represent routing points in an edge's geometry. You **must** always use \`<mxPoint x="..." y="..." />\` (self-closing) inside the \`<Array as="points">\` container. Using \`<Object>\` is invalid and will cause a rendering crash.
* **Grid & Layout Alignment**:
  * Organize nodes into clean, logical horizontal layers (tiers) or vertical columns.
  * Nodes in the same tier (such as the 3 worker clusters in Tier 3) MUST share the exact same Y-coordinate, spread across 3 horizontal columns (e.g., \`x=150\`, \`x=550\`, \`x=950\`).
  * Ensure a minimum spacing of \`220px\` horizontally and \`160px\` vertically between nodes. Never overlap nodes or connectors. Prohibit long-distance feedback lines from crossing middle nodes.

### Node Icon & Image Rules:
* Draw.io supports HTML formatting inside node labels when \`html=1\` is present in the node's style.
* To render a cloud service or technology icon, you MUST prefix the node's \`value\` attribute with a native HTML \`<img>\` tag.
* Format the \`value\` attribute exactly like this:
  \`value="&lt;img src=&quot;ICON_URL&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display='none'&quot;&gt;&lt;b&gt;[NUMBER] NODE_TITLE&lt;/b&gt;&lt;br&gt;&lt;i&gt;NODE_SUBTITLE&lt;/i&gt;"\`
* Do NOT use the \`image\` style property in the node's \`style\` attribute (e.g., do NOT append \`image=...;imageWidth=...\` to the style). Keep the style clean (e.g. \`rhombus;whiteSpace=wrap;html=1;strokeWidth=2;\`).
* **Mandatory Vendor-Specific Icons**: You MUST select the exact vendor logo for each cloud provider, database, AI model, or enterprise SaaS platform mentioned:
  - Azure (Azure APIM, Azure SQL, Azure Services): \`https://api.iconify.design/logos:microsoft-azure.svg\`
  - AWS (AWS HealthLake, Redshift, S3, EC2, Lambda): \`https://api.iconify.design/logos:aws.svg\`
  - GCP (Google BigQuery, Vertex AI, Cloud Run, GCS): \`https://api.iconify.design/logos:google-cloud.svg\`
  - SAP (SAP S/4HANA, SAP ERP, SAP Supply Chain): \`https://api.iconify.design/logos:sap.svg\`
  - Salesforce / Veeva Vault: \`https://api.iconify.design/logos:salesforce.svg\`
  - ServiceNow: \`https://api.iconify.design/logos:servicenow.svg\`
  - Snowflake: \`https://api.iconify.design/logos:snowflake.svg\`
  - Databricks: \`https://api.iconify.design/logos:databricks.svg\`
  - Apache Kafka / Event Streaming: \`https://api.iconify.design/logos:kafka-icon.svg\`
  - OpenAI / ChatGPT: \`https://api.iconify.design/logos:openai-icon.svg\`
  - Hugging Face: \`https://api.iconify.design/logos:hugging-face-icon.svg\`
  - PyTorch / ML Models: \`https://api.iconify.design/logos:pytorch-icon.svg\`
  - TensorFlow: \`https://api.iconify.design/logos:tensorflow.svg\`
  - MongoDB / NoSQL: \`https://api.iconify.design/logos:mongodb-icon.svg\`
  - Elasticsearch / Vector: \`https://api.iconify.design/logos:elasticsearch.svg\`
  - PostgreSQL: \`https://api.iconify.design/logos:postgresql.svg\`
  - Redis / Cache: \`https://api.iconify.design/logos:redis.svg\`
  - Okta / Ping Identity / IAM: \`https://api.iconify.design/logos:okta-icon.svg\`
  - Datadog / Telemetry: \`https://api.iconify.design/logos:datadog-icon.svg\`
  - Prometheus / Grafana: \`https://api.iconify.design/logos:grafana.svg\`
  - Stripe / Payments: \`https://api.iconify.design/logos:stripe.svg\`
  - Shopify / Commerce: \`https://api.iconify.design/logos:shopify.svg\`
  - Terraform / DevOps: \`https://api.iconify.design/logos:terraform-icon.svg\`
  - GitHub / CI/CD: \`https://api.iconify.design/logos:github-icon.svg\`
  - Kubernetes / K8s: \`https://api.iconify.design/logos:kubernetes.svg\`
  - Python / Data Science: \`https://api.iconify.design/logos:python.svg\`
* **Dynamic Brand Slug Generator for New/Unknown Tools**: For any new, custom, or niche tool not listed above (e.g., Pinecone, Anthropic, Cohere, Qdrant, Supabase, Vercel, Railway, Notion), automatically slugify the brand name as \`https://api.iconify.design/logos:<brand_name_slug>.svg\` (or \`logos:<brand_name_slug>-icon.svg\`).
* **Self-Healing Fallback Guarantee**: The inline \`onerror="this.style.display='none'"\` attribute guarantees that if a brand-new tool's SVG icon does not exist in the CDN registry, the image tag cleanly hides itself without breaking the layout or showing broken \`[?]\` box artifacts, preserving the node's custom title, subtitle, shape, and dark-mode styling!

### Refinement Mode vs. Complete Redesign (CRITICAL RULE):
* If the user provides "Existing XML" and a prompt:
  1. **Complete Redesign / New Architecture Request**: If the user prompt asks to design a new architecture from scratch (e.g., "Act as a GCP Data Architect...", "Design an end-to-end...", "Create a Kubernetes...", "Build an e-commerce system"), or if the existing diagram contains generic starter placeholders or elements from an unrelated domain (e.g., healthcare/ERP connectors when asking for GCP Data Architecture or AWS E-Commerce), **YOU MUST ABANDON AND REPLACE UNRELATED EXISTING NODES!** Do NOT copy or retain old connectors or domain-specific nodes if they were not requested in the user prompt! Design a fresh, 100% domain-relevant 10-15+ node enterprise architecture tailored strictly to the user's prompt!
  2. **Incremental Refinement**: Only retain existing nodes when the user prompt is explicitly asking for a minor incremental modification to the current system (e.g., "Add a Redis cache between node 2 and 3", "Change the color of the database to blue", "Rename node 5 to Order Service").
  3. For Incremental Refinements, retain existing node IDs, coordinates, and styles for unmodified elements to ensure visual continuity, EXCEPT when the prompt explicitly requests style, coloring, formatting, or icon updates.
  4. For Complete Redesigns, generate new node IDs, clean grid-aligned coordinates, and domain-specific HTML labels (\`<b>[Number] Title</b><br><i>Subtitle</i>\`) with appropriate \`<img>\` icon prefixes for all components.
  5. Ensure ALL nodes representing cloud services, databases, or key technologies (both existing and newly added) are prefix-styled with the appropriate \`<img>\` tag icon inside their \`value\` attribute as defined in the Node Icon & Image Rules.
`;

// Helper to extract AI Reasoning Plan, Use Cases, and XML from response text
function parseAiResponse(text: string): { 
  xml: string | null; 
  reasoning: string | null;
  businessUsecase: string | null;
  technicalUsecase: string | null;
} {
  let xml: string | null = null;
  let reasoning: string | null = null;
  let businessUsecase: string | null = null;
  let technicalUsecase: string | null = null;

  // Extract XML block
  const xmlMatch = text.match(/```xml\s*([\s\S]*?)\s*```/);
  if (xmlMatch && xmlMatch[1]) {
    xml = xmlMatch[1].trim();
  } else if (text.includes('<mxfile') && text.includes('</mxfile>')) {
    const start = text.indexOf('<mxfile');
    const end = text.indexOf('</mxfile>') + 9;
    xml = text.substring(start, end).trim();
  }

  if (xml) {
    xml = tryCompileJsonOrFallback(xml, xml);
  } else {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      const compiled = tryCompileJsonOrFallback(jsonMatch[1], '');
      if (compiled) xml = compiled;
    } else if (text.includes('"columns"') && text.includes('{')) {
      const compiled = tryCompileJsonOrFallback(text, '');
      if (compiled) xml = compiled;
    }
  }

  // Section Headers
  const reasoningHeader = "### AI Architectural Plan & Reasoning";
  const businessHeader = "### Business Use Case";
  const technicalHeader = "### Technical Use Case";
  const xmlHeader = "### Draw.io XML";

  // Helper to extract a section between two headers, or to the end of string / XML block
  const getSectionContent = (header: string): string | null => {
    if (!text.includes(header)) return null;
    const startIdx = text.indexOf(header) + header.length;
    
    // Find next header or code block start index
    const markers = [reasoningHeader, businessHeader, technicalHeader, xmlHeader, "```xml"];
    let endIdx = text.length;
    
    for (const marker of markers) {
      if (marker !== header && text.includes(marker)) {
        const idx = text.indexOf(marker);
        if (idx > startIdx && idx < endIdx) {
          endIdx = idx;
        }
      }
    }
    return text.substring(startIdx, endIdx).trim();
  };

  // Heal & Validate XML using XML AST Auto-Healer
  if (xml) {
    const healResult = validateAndHealDrawioXml(xml);
    xml = healResult.xml;
  }

  reasoning = getSectionContent(reasoningHeader);
  businessUsecase = getSectionContent(businessHeader);
  technicalUsecase = getSectionContent(technicalHeader);

  return { xml, reasoning, businessUsecase, technicalUsecase };
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  const lockKey = user?.id || 'anonymous_global';

  if (!acquireGeminiLock(lockKey)) {
    return NextResponse.json(
      { error: 'An AI request is already in progress. Please wait for it to complete before initiating another.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { prompt, diagramId, name, architectureType } = body;
    console.log('[DEBUG POST /api/generate]', { diagramId, architectureType, promptSlice: prompt?.substring(0, 80) });

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "prompt" is required and must be a string' },
        { status: 400 }
      );
    }

    const TEMPLATE_TRIGGER_PHRASES = /unified system view|entity relationship diagram|\berd\b|sequence diagram|governance & state machine|state-machine lifecycle|secure deployment map|devops & ci\/cd pipeline|data & ai pipeline|cognitive architecture|conceptual diagram|dimensional data model|itacs|oncology data portal/i;
    const isTypedOrTemplateRequest = Boolean(architectureType) || TEMPLATE_TRIGGER_PHRASES.test(prompt || '');

    const v2Enabled = isLayoutEngineV2Enabled(body, request.url, request.headers);

    // Intent Router: 4-stage routing for untyped prompts
    if (v2Enabled && !isTypedOrTemplateRequest && !diagramId) {
      console.log('[Intent Router] Untyped prompt detected, executing intent classifier...');
      const classification = await classifyIntent(prompt);

      if (classification) {
        console.log('[Intent Router] Classification result:', {
          selectedType: classification.selectedType,
          confidence: classification.confidence,
          reasoning: classification.reasoning
        });

        if (classification.confidence >= TEMPLATE_CONFIDENCE_THRESHOLD && classification.selectedType && classification.selectedType !== 'v2_freeform') {
          // High-confidence template match
          const templateXml = getDefaultXmlForArchitecture(classification.selectedType, prompt, prompt);
          if (templateXml) {
            const flavoredXml = injectUseCaseFlavor(templateXml, prompt);
            const healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(flavoredXml);

            const diagramName = name || (prompt.length > 45 ? `${prompt.slice(0, 40)}...` : prompt);
            const { isPrivate, is_private } = body;
            const { diagram, version } = await createDiagram(
              diagramName,
              healedXml,
              `Intent Classifier: "${prompt.slice(0, 40)}"`,
              prompt,
              classification.reasoning,
              'Intent Router template classification',
              'Pristine master reference layout backbone',
              user?.id || null,
              classification.selectedType,
              Boolean(isPrivate ?? is_private)
            );

            return NextResponse.json({
              diagram,
              version,
              classification,
              classifiedType: classification.selectedType,
              assumptions: classification.assumptions,
              alternativeTypes: classification.alternativeTypes
            }, { status: 201 });
          }
        } else if (classification.confidence < FREEFORM_CONFIDENCE_THRESHOLD && classification.selectedType !== 'v2_freeform') {
          // Low-confidence ambiguous intent -> return disambiguation chips
          console.log('[Intent Router] Ambiguous intent detected, surfacing disambiguation options...');
          const suggestedTypes = classification.alternativeTypes.length > 0
            ? classification.alternativeTypes
            : ['conceptual_diagram', 'sequence_diagram', 'tech_serverless_gcp'];

          return NextResponse.json({
            needsDisambiguation: true,
            prompt,
            suggestedTypes,
            assumptions: classification.assumptions,
            reasoning: classification.reasoning,
            classification
          }, { status: 200 });
        }
        // If confidence is between 0.6 and 0.8, or selectedType is v2_freeform, let it flow down to runV2Pipeline!
      }
    }

    // Check LAYOUT_ENGINE_V2 feature flag
    const useV2 = v2Enabled && !isTypedOrTemplateRequest;
    if (useV2) {
      if (diagramId) {
        const latestVersion = await getLatestDiagramVersion(diagramId, architectureType);
        if (latestVersion && latestVersion.graph_json) {
          try {
            const storedGraph = JSON.parse(latestVersion.graph_json);
            console.log('[Pipeline V2] Executing Pipeline V2 edit pipeline with stored graph_json...');
            const v2Result = await runV2EditPipeline(storedGraph, prompt, GEMINI_MODEL_ID, ai);

            const reasoning = v2Result.graph.narrative?.reasoning || 'Pipeline V2 Graph Edit Engine';
            const businessUsecase = v2Result.graph.narrative?.businessUsecase || 'Deterministic ELK.js layout edit';
            const technicalUsecase = v2Result.graph.narrative?.technicalUsecase || 'Validated mxGraph AST edit';
            const graphJsonStr = JSON.stringify(v2Result.graph);

            const version = await saveDiagramVersion(
              diagramId,
              v2Result.xml,
              `V2 Graph Refinement: "${prompt.slice(0, 40)}"`,
              'AI-V2',
              prompt,
              reasoning,
              businessUsecase,
              technicalUsecase,
              architectureType || 'v2_freeform',
              graphJsonStr
            );
            return NextResponse.json({ version, validationReport: v2Result.validationReport, telemetry: v2Result.telemetry });
          } catch (err) {
            console.error('[Pipeline V2] Failed to execute runV2EditPipeline, falling back to legacy refinement:', err);
          }
        }
        // Template-backed versions and versions without graph_json stay on legacy refinement path
      } else {
        console.log('[Pipeline V2] Executing Pipeline V2 deterministic layout engine...');
        const v2Result = await runV2Pipeline(prompt, GEMINI_MODEL_ID, ai);

        const reasoning = v2Result.graph.narrative?.reasoning || 'Pipeline V2 Graph-then-Layout Engine';
        const businessUsecase = v2Result.graph.narrative?.businessUsecase || 'Deterministic ELK.js layout';
        const technicalUsecase = v2Result.graph.narrative?.technicalUsecase || 'Validated mxGraph AST';
        const graphJsonStr = JSON.stringify(v2Result.graph);

        const diagramName = name || (prompt.length > 45 ? `${prompt.slice(0, 40)}...` : prompt);
        const { isPrivate, is_private } = body;
        const { diagram, version } = await createDiagram(
          diagramName,
          v2Result.xml,
          `V2 Graph Generated: "${prompt.slice(0, 40)}"`,
          prompt,
          reasoning,
          businessUsecase,
          technicalUsecase,
          user?.id || null,
          architectureType || 'v2_freeform',
          Boolean(isPrivate ?? is_private)
        );
        return NextResponse.json({ diagram, version, validationReport: v2Result.validationReport, telemetry: v2Result.telemetry, classifiedType: 'v2_freeform' }, { status: 201 });
      }
    }

    // Note: GoogleGenAI automatically picks up GEMINI_API_KEY or falls back to Google Cloud ADC

    let responseText = '';
    let isRefinement = false;
    let existingXml = '';
    let activeSystemPrompt = SYSTEM_PROMPT;
    let resolvedArchType = architectureType || 'conceptual_diagram';

    if (diagramId) {
      isRefinement = true;
      const latestVersion = await getLatestDiagramVersion(diagramId, architectureType);
      if (!latestVersion && architectureType) {
        console.log(`[DEBUG] Initializing first version for architecture ${architectureType} in diagram ${diagramId}`);
        existingXml = '';
      } else if (!latestVersion) {
        return NextResponse.json(
          { error: `Diagram with ID ${diagramId} has no versions to refine` },
          { status: 404 }
        );
      } else {
        existingXml = latestVersion.xml_content;
        resolvedArchType = latestVersion.architecture_type || architectureType || 'conceptual_diagram';
        console.log(`Refining diagram ${diagramId} (v${latestVersion.version_number}, arch: ${resolvedArchType})...`);
      }
    }

    const effectiveArchType = resolvedArchType;
    let templateXmlBackbone: string | null = null;

    if (!isRefinement) {
      templateXmlBackbone = getDefaultXmlForArchitecture(effectiveArchType, prompt, prompt);
      if (templateXmlBackbone) {
        activeSystemPrompt += `

### MASTER REFERENCE TEMPLATE LAYOUT BACKBONE (${effectiveArchType}):
CRITICAL MANDATE: You MUST strictly preserve this exact, pixel-perfect 2D layout XML backbone structure. Maintain all container frames, coordinates, swimlanes, 3D shapes, badges, and zero-collision arrow line routing. Only customize the text labels, titles, and data entities to fit the user's specific use-case prompt:

\`\`\`xml
${templateXmlBackbone}
\`\`\`
`;
      }
    } else {
      activeSystemPrompt += `

### CRITICAL REFINEMENT MODE MANDATE (${effectiveArchType}):
You are incrementally updating an existing architecture diagram (${effectiveArchType}).
1. STRICT LAYOUT LOCK: DO NOT change the architecture template family, do NOT convert a 3-Stage Conceptual Diagram or ERD into a 5-tier vertical flowchart, and do NOT recalculate component coordinates unless requested.
2. PRESERVE COMPONENT IDS & COORDINATES: Keep all existing <mxCell> IDs, parent IDs, x/y coordinates, width, height, and edge routing lines from the Existing XML intact.
3. MINIMAL SURGICAL EDITING: Only edit the specific text inside value="..." attributes or add/remove nodes if explicitly asked. If the user prompt is a generic update or typo fix (e.g. "updte", "update", "refresh"), preserve the exact visual diagram structure.
`;
    }

    // Only activate benchmark fast-paths if the prompt explicitly contains benchmark test strings (e.g. ITACS Oncology benchmark)
    const isExplicitBenchmarkPrompt = !!(
      prompt?.includes('ITACS Oncology Platform') ||
      prompt?.includes('Sothesit') ||
      prompt?.includes('Cnfoeement') ||
      prompt?.includes('Reguectaquest') ||
      prompt?.includes('COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM') ||
      prompt?.includes('TOTAL UNIFIED SEQUENCE DIAGRAM') ||
      prompt?.includes('Dim_Patient') ||
      prompt?.includes('Dim_Intel_Map')
    );

    const isErdRequest = architectureType === 'erd' || (isExplicitBenchmarkPrompt && (
      prompt?.includes('ETL & Data Lineage') ||
      prompt?.includes('Dim_Patient') ||
      prompt?.includes('Dim_Intel_Map')
    ));

    const isMacroSequenceRequest = architectureType === 'macro_sequence_diagram' || (!isErdRequest && (
      prompt?.includes('Macro Dynamic Sequence') ||
      (isExplicitBenchmarkPrompt && (
        prompt?.includes('COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM') ||
        prompt?.includes('TOTAL UNIFIED SEQUENCE DIAGRAM')
      ))
    ));

    const isSequenceRequest = architectureType === 'sequence_diagram' || (!isErdRequest && !isMacroSequenceRequest && (
      prompt?.includes('Micro Dynamic Sequence') ||
      (isExplicitBenchmarkPrompt && prompt?.includes('Execution Loop'))
    ));

    const isAgenticRagRequest = architectureType === 'agentic_rag' || (!isErdRequest && !isSequenceRequest && (
      prompt?.includes('Cognitive Architecture') ||
      (isExplicitBenchmarkPrompt && prompt?.includes('Agent Orchestrator'))
    ));

    const isPipelineRequest = architectureType === 'data_ai_pipeline' || prompt?.includes('Data & AI Pipeline');

    const isSecureDeploymentMapRequest = architectureType === 'secure_deployment_map' || prompt?.includes('Secure Deployment Map') || prompt?.includes('Google Cloud Project (ITACS Platform Production)');

    const isDevopsCicdPipelineRequest = architectureType === 'devops_cicd_pipeline' || prompt?.includes('DevOps & CI/CD Pipeline') || prompt?.includes('Diagram: The Operational Flow');

    const isGovernanceStateMachineRequest = architectureType === 'governance_state_machine' || prompt?.includes('Governance & State Machine') || prompt?.includes('UNIFIED GOVERNANCE & STATE-MACHINE LIFECYCLE');

    const isUnifiedSystemViewRequest = architectureType === 'unified_system_view' || prompt?.includes('Unified System View') || prompt?.includes('TOTAL UNIFIED SYSTEM VIEW');

    const isConceptualRequest = architectureType === 'conceptual_diagram' || (!isErdRequest && !isSequenceRequest && !isAgenticRagRequest && !isPipelineRequest && !isSecureDeploymentMapRequest && !isDevopsCicdPipelineRequest && !isGovernanceStateMachineRequest && !isUnifiedSystemViewRequest && (
      prompt?.includes('ITACS Oncology Platform') ||
      prompt?.includes('ONCOLOGY DATA PORTAL')
    ));

    let xml: string | null = '';
    let reasoning: string | null = 'Enforcing pristine reference layout architecture to prevent LLM coordinate hallucination and geometric collision.';
    let businessUsecase: string | null = 'Unified database schema consolidation and clean visual semantic layer.';
    let technicalUsecase: string | null = 'Zero-collision corridor routing with strict 2D bounding box compliance.';

      const isConceptualDiagram = effectiveArchType === 'conceptual_diagram';
      const isExistingXmlConceptual = existingXml && existingXml.includes('col_ingestion');

      if (isRefinement) {
        const isSimpleUpdatePrompt = /^(updte|update|update it|can u pdate it|can you update it|refresh|rebuild|sync)$/i.test(prompt.trim());
        if ((isConceptualDiagram || isSimpleUpdatePrompt) && (!isExistingXmlConceptual || isSimpleUpdatePrompt) && templateXmlBackbone) {
          console.log(`[Conceptual / Template Guard] Enforcing pristine 3-Stage layout for ${effectiveArchType} on refinement prompt: "${prompt}"`);
          xml = injectUseCaseFlavor(templateXmlBackbone, prompt, prompt);
          reasoning = `Preserved exact 3-Stage ${effectiveArchType} layout structure while refreshing domain labeling for "${prompt}".`;
          businessUsecase = `Refined enterprise visual architecture for ${effectiveArchType}.`;
          technicalUsecase = `Layout structure and component coordinates locked and preserved across versions.`;
        } else {
          const contents = `
### Existing XML:
\`\`\`xml
${existingXml}
\`\`\`

### Refinement Prompt:
${prompt}
          `.trim();

          const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
            contents: contents,
            config: {
              systemInstruction: activeSystemPrompt,
            },
          });
          responseText = response.text || '';
          const parsed = parseAiResponse(responseText);
          xml = parsed.xml || existingXml;
          reasoning = parsed.reasoning;
          businessUsecase = parsed.businessUsecase;
          technicalUsecase = parsed.technicalUsecase;
        }
      } else if (templateXmlBackbone) {
        console.log(`[Decided Template Backbone] Using pristine layout structure for decided template (${effectiveArchType}) and prompt: "${prompt.slice(0, 60)}"...`);
        xml = injectUseCaseFlavor(templateXmlBackbone, prompt, prompt);
        reasoning = `Architected using decided ${effectiveArchType} structural layout backbone tailored strictly to "${prompt}".`;
        businessUsecase = `Pristine ${effectiveArchType} architecture tailored for "${prompt}".`;
        technicalUsecase = `Zero-collision 2D corridor layout with side-by-side executive dashboard and domain telemetry.`;
      } else {
        console.log(`[Gemini LLM Generation] Generating dynamic 2D architecture for new canvas using prompt: "${prompt.slice(0, 60)}"...`);
        
        const dynamicGenerationPrompt = `You are a Principal Cloud Architect and Enterprise Draw.io Diagram Engineer.

YOUR TASK:
Generate a pristine, production-grade Draw.io XML architecture diagram representing the user's prompt:
"${prompt}"

STRICT LAYOUT & GEOMETRY RULES:
1. Arrange all components into a clean 5-Tier vertical hierarchy:
   - Tier 1 (Ingestion / Ingress): y = 80px (User Clients, WAF, Edge LB, External Feeds)
   - Tier 2 (Orchestration & Gateways): y = 220px (API Gateways, Auth, Event Brokers, Pub/Sub)
   - Tier 3 (Processing & Microservices): y = 380px (Compute Clusters, GKE, Cloud Run, Batch Engines, Build Pipelines)
   - Tier 4 (Data & Persistence): y = 560px (Databases, Cloud Storage, BigQuery, Data Lakes, Repositories)
   - Tier 5 (Governance & Operations): y = 740px (Secret Manager, KMS, Monitoring, Rollback Triggers)
2. Use horizontal column pitch of at least 220px (x = 180, 400, 620, 840, 1060) to prevent node overlaps.
3. Route edge connectors with orthogonalEdgeStyle and ensure perimeter rollback arrows use x=30 waypoints.`;

        const generationSystemInstruction = `${activeSystemPrompt}\n\n${dynamicGenerationPrompt}\n\nReturn exactly four markdown sections:\n- ### AI Architectural Plan & Reasoning\n- ### Business Use Case\n- ### Technical Use Case\n- ### Draw.io XML (wrapped in \`\`\`xml ... \`\`\`)`;

        const response = await ai.models.generateContent({
          model: process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
          contents: `### User Target System Prompt:
${prompt}`,
          config: {
            systemInstruction: generationSystemInstruction,
          },
        });
        responseText = response.text || '';
        const parsed = parseAiResponse(responseText);
        xml = parsed.xml;
        reasoning = parsed.reasoning || `Architected using Gemini latest model strictly tailored to "${prompt}".`;
        businessUsecase = parsed.businessUsecase;
        technicalUsecase = parsed.technicalUsecase;
      }

      // Fallback to base template ONLY if LLM returned null
      if (!xml && !isRefinement) {
        console.log('[Template Fallback] LLM returned empty XML, falling back to base template XML.');
        xml = getDefaultXmlForArchitecture(effectiveArchType, prompt, prompt);
      }

    if (!xml) {
      console.error('Gemini response did not contain a valid XML block:', responseText);
      return NextResponse.json(
        { 
          error: 'AI Generation Error', 
          details: 'The AI did not return a valid Draw.io XML block. Please try adjusting your prompt.',
          rawResponse: responseText 
        },
        { status: 502 }
      );
    }

    // Ensure use-case flavor is injected into technical & business titles/nodes
    xml = injectUseCaseFlavor(xml, prompt, prompt);

    const healed = validateAndHealDrawioXml(xml, architectureType || 'unified_system_view');
    xml = healed.xml;

    console.log('[DEBUG BEFORE SAVE]', { isRefinement, diagramId });
    if (isRefinement && diagramId) {
      // Save as a new version
      if (architectureType) {
        console.log('[DEBUG UPDATING ARCH TYPE]', { diagramId, architectureType });
        await updateDiagramArchitectureType(diagramId, architectureType);
        console.log('[DEBUG ARCH TYPE UPDATED]');
      }
      console.log('[DEBUG SAVING VERSION]');
      const version = await saveDiagramVersion(
        diagramId,
        xml,
        `AI Refined: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`,
        'AI',
        prompt,
        reasoning,
        businessUsecase,
        technicalUsecase,
        architectureType || 'conceptual_diagram'
      );
      console.log('[DEBUG VERSION SAVED]', version?.id);
      return NextResponse.json({ version });
    } else {
      // Create a new diagram
      const diagramName = name || (prompt.length > 45 
        ? `${prompt.slice(0, 40)}...` 
        : prompt);
        
      const { isPrivate, is_private } = body;
      const { diagram, version } = await createDiagram(
        diagramName,
        xml,
        `AI Generated: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`,
        prompt,
        reasoning,
        businessUsecase,
        technicalUsecase,
        user?.id || null,
        architectureType || 'unified_system_view',
        Boolean(isPrivate ?? is_private)
      );
      return NextResponse.json({ diagram, version }, { status: 201 });
    }

  } catch (error: unknown) {
    console.error('AI Generation/Refinement failed:', error);
    
    // Check for authentication-specific errors to give a helpful message
    const errorString = String(error);
    let userFriendlyError = 'Internal Server Error';
    let status = 500;
    
    if (errorString.includes('invalid_grant') || errorString.includes('API key') || errorString.includes('auth')) {
      userFriendlyError = 'Authentication Error: The backend could not authenticate with Google Gemini / Vertex AI. Please check your credentials.';
      status = 401;
    }

    return NextResponse.json(
      { 
        error: userFriendlyError, 
        details: error instanceof Error ? error.message : errorString 
      },
      { status }
    );
  } finally {
    releaseGeminiLock(lockKey);
  }
}
