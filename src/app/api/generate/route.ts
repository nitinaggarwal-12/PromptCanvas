import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createDiagram, saveDiagramVersion, getLatestDiagramVersion } from '@/lib/db';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

const ai = new GoogleGenAI({});

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
  * Gateways / API Handlers: Diamonds (\`rhombus;whiteSpace=wrap;html=1;strokeWidth=2;\`)
  * Databases / Storages: Cylinders (\`shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;\`)
  * Bridges / Cross-Cloud / Tunnels: Rounded rectangles with dashed borders (\`rounded=1;whiteSpace=wrap;html=1;arcSize=10;dashed=1;dashPattern=8 8;strokeWidth=2;\`)
* **Connectors & Edges**:
  * Always use clean, straight orthogonal connector lines:
    \`edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#94A3B8;\`
  * Always add descriptive text labels to connectors to explain the interaction (e.g. \`value="API Calls"\` or \`value="Context Retrieval"\`).
  * For special feedback loops (e.g., self-healing loops), use red dashed lines with double arrowheads:
    \`edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;dashed=1;dashPattern=8 8;startArrow=classic;endArrow=classic;\`
  * **Critical mxPoint Rule**: Never use \`<Object>\` tags to represent routing points in an edge's geometry. You **must** always use \`<mxPoint x="..." y="..." />\` (self-closing) inside the \`<Array as="points">\` container. Using \`<Object>\` is invalid and will cause a rendering crash.
* **Grid & Layout Alignment**:
  * Organize nodes into clean, logical horizontal layers (tiers) or vertical columns.
  * Nodes in the same tier must share the exact same Y-coordinate, and nodes in the same column must share the exact same X-coordinate.
  * Ensure a minimum spacing of \`220px\` horizontally and \`160px\` vertically between nodes. Never overlap nodes or connectors. Prohibit long-distance feedback lines from crossing middle nodes.

### Node Icon & Image Rules:
* Draw.io supports HTML formatting inside node labels when \`html=1\` is present in the node's style.
* To render a cloud service or technology icon, you MUST prefix the node's \`value\` attribute with a native HTML \`<img>\` tag.
* Format the \`value\` attribute exactly like this:
  \`value="&lt;img src=&quot;ICON_URL&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot;&gt;&lt;b&gt;[NUMBER] NODE_TITLE&lt;/b&gt;&lt;br&gt;&lt;i&gt;NODE_SUBTITLE&lt;/i&gt;"\`
* Do NOT use the \`image\` style property in the node's \`style\` attribute (e.g., do NOT append \`image=...;imageWidth=...\` to the style). Keep the style clean (e.g. \`rhombus;whiteSpace=wrap;html=1;strokeWidth=2;\`).
* Use the following live Iconify SVG URLs for common technologies:
  - Google Cloud Run: \`https://api.iconify.design/logos:google-cloud-run.svg\`
  - Apigee / API Gateway: \`https://api.iconify.design/logos:apigee.svg\`
  - Google Cloud Storage / GCS: \`https://api.iconify.design/logos:google-cloud.svg\`
  - Google Cloud SQL / Cloud Spanner: \`https://api.iconify.design/logos:google-cloud.svg\`
  - BigQuery: \`https://api.iconify.design/logos:google-cloud.svg\`
  - Vertex AI: \`https://api.iconify.design/logos:google-cloud.svg\`
  - Pub/Sub / Event Stream: \`https://api.iconify.design/logos:google-cloud.svg\`
  - AWS Lambda: \`https://api.iconify.design/logos:aws-lambda.svg\`
  - AWS API Gateway / AWS Services: \`https://api.iconify.design/logos:aws.svg\`
  - AWS RDS: \`https://api.iconify.design/logos:aws.svg\`
  - Kubernetes: \`https://api.iconify.design/logos:kubernetes.svg\`
  - Generic databases / technologies (e.g., PostgreSQL, MySQL, Redis, Python, Java):
    - PostgreSQL: \`https://api.iconify.design/logos:postgresql.svg\`
    - MySQL: \`https://api.iconify.design/logos:mysql.svg\`
    - Redis: \`https://api.iconify.design/logos:redis.svg\`
    - Python: \`https://api.iconify.design/logos:python.svg\`
    - Java: \`https://api.iconify.design/logos:java.svg\`

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
  try {
    const body = await request.json();
    const { prompt, diagramId, name } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "prompt" is required and must be a string' },
        { status: 400 }
      );
    }

    // Note: GoogleGenAI automatically picks up GEMINI_API_KEY or falls back to Google Cloud ADC

    let responseText = '';
    let isRefinement = false;
    let existingXml = '';

    if (diagramId) {
      // Refinement Loop
      isRefinement = true;
      const latestVersion = await getLatestDiagramVersion(diagramId);
      if (!latestVersion) {
        return NextResponse.json(
          { error: `Diagram with ID ${diagramId} has no versions to refine` },
          { status: 404 }
        );
      }
      existingXml = latestVersion.xml_content;

      console.log(`Refining diagram ${diagramId} (v${latestVersion.version_number})...`);
      
      const contents = `
### Existing XML:
\`\`\`xml
${existingXml}
\`\`\`

### Refinement Prompt:
${prompt}
      `.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      responseText = response.text || '';
    } else {
      // Initial Generation
      console.log('Generating new diagram from scratch...');
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create a diagram for: ${prompt}`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      responseText = response.text || '';
    }

    // Extract the XML and reasoning from the AI response
    const { xml, reasoning, businessUsecase, technicalUsecase } = parseAiResponse(responseText);
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

    if (isRefinement && diagramId) {
      // Save as a new version
      const version = await saveDiagramVersion(
        diagramId,
        xml,
        `AI Refined: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`,
        'AI',
        prompt,
        reasoning,
        businessUsecase,
        technicalUsecase
      );
      return NextResponse.json({ version });
    } else {
      // Create a new diagram
      const diagramName = name || (prompt.length > 45 
        ? `${prompt.slice(0, 40)}...` 
        : prompt);
        
      const { diagram, version } = await createDiagram(
        diagramName,
        xml,
        `AI Generated: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`,
        prompt,
        reasoning,
        businessUsecase,
        technicalUsecase
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
  }
}
