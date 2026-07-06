import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createDiagram, saveDiagramVersion, getLatestDiagramVersion } from '@/lib/db';

const SYSTEM_PROMPT = `
You are "Maestro-Graph", an elite enterprise solutions architect and compiler that translates natural language system descriptions into valid, production-grade Draw.io (mxGraph) XML.

### Output Constraints:
1. Return ONLY a valid XML block wrapped in \`\`\`xml and \`\`\`. No explanations, no markdown introduction, no conversational text.
2. The XML must start with \`<mxfile host="embed.diagrams.net">\` and contain a \`<diagram>\` and \`<mxGraphModel>\`.

### mxGraph XML Structure Rules:
* The root must contain:
  \`<mxCell id="0" />\`
  \`<mxCell id="1" parent="0" />\`
* Every node must have \`parent="1"\`, a unique \`id\` (e.g., \`id="cloud_run"\`), \`vertex="1"\`, a \`style\` attribute, a \`value\` (HTML labels allowed), and a \`<mxGeometry>\` defining \`x\`, \`y\`, \`width\`, and \`height\`.
* Every edge (connector) must have \`parent="1"\`, a unique \`id\`, \`edge="1"\`, \`source\` ID, \`target\` ID, and \`<mxGeometry relative="1" as="geometry" />\`.

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
  * Ensure a minimum spacing of \`100px\` horizontally and \`120px\` vertically between nodes. Never overlap nodes or connectors.

### Node Icon & Image Rules:
* Draw.io supports HTML formatting inside node labels when `html=1` is present in the node's style.
* To render a cloud service or technology icon, you MUST prefix the node's `value` attribute with a native HTML `<img>` tag.
* Format the `value` attribute exactly like this:
  `value="&lt;img src=&quot;ICON_URL&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot;&gt;&lt;b&gt;[NUMBER] NODE_TITLE&lt;/b&gt;&lt;br&gt;&lt;i&gt;NODE_SUBTITLE&lt;/i&gt;"`
* Do NOT use the `image` style property in the node's `style` attribute (e.g., do NOT append `image=...;imageWidth=...` to the style). Keep the style clean (e.g. `rhombus;whiteSpace=wrap;html=1;strokeWidth=2;`).
* Use the following live Iconify SVG URLs for common technologies:
  - Google Cloud Run: `https://api.iconify.design/logos:google-cloud-run.svg`
  - Apigee / API Gateway: `https://api.iconify.design/logos:apigee.svg`
  - Google Cloud Storage / GCS: `https://api.iconify.design/logos:google-cloud.svg`
  - Google Cloud SQL / Cloud Spanner: `https://api.iconify.design/logos:google-cloud.svg`
  - BigQuery: `https://api.iconify.design/logos:google-cloud.svg`
  - Vertex AI: `https://api.iconify.design/logos:google-cloud.svg`
  - Pub/Sub / Event Stream: `https://api.iconify.design/logos:google-cloud.svg`
  - AWS Lambda: `https://api.iconify.design/logos:aws-lambda.svg`
  - AWS API Gateway / AWS Services: `https://api.iconify.design/logos:aws.svg`
  - AWS RDS: `https://api.iconify.design/logos:aws.svg`
  - Kubernetes: `https://api.iconify.design/logos:kubernetes.svg`
  - Generic databases / technologies (e.g., PostgreSQL, MySQL, Redis, Python, Java):
    - PostgreSQL: `https://api.iconify.design/logos:postgresql.svg`
    - MySQL: `https://api.iconify.design/logos:mysql.svg`
    - Redis: `https://api.iconify.design/logos:redis.svg`
    - Python: `https://api.iconify.design/logos:python.svg`
    - Java: `https://api.iconify.design/logos:java.svg`

### Refinement Mode (The Loop):
* If the user provides "Existing XML" and a "Refinement Prompt":
  1. Parse the existing XML.
  2. Modify the diagram (adding/deleting/routing components, or updating formatting/icons) as requested by the prompt.
  3. Retain the existing node IDs, coordinates, and styles for unmodified elements to ensure visual continuity, EXCEPT when the refinement prompt explicitly requests style, coloring, formatting, or icon updates.
  4. Apply the same High-Fidelity Enterprise Style rules to any newly added elements or connectors.
  5. Ensure ALL nodes representing cloud services, databases, or key technologies (both existing and newly added) are prefix-styled with the appropriate `<img>` tag icon inside their `value` attribute as defined in the Node Icon & Image Rules.


`;

// Helper to extract XML from markdown code blocks
function extractXml(text: string): string | null {
  const match = text.match(/```xml\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    return match[1].trim();
  }
  // Fallback if not wrapped in code blocks but contains XML
  if (text.includes('<mxfile') && text.includes('</mxfile>')) {
    const start = text.indexOf('<mxfile');
    const end = text.indexOf('</mxfile>') + 9;
    return text.substring(start, end).trim();
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, diagramId } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "prompt" is required and must be a string' },
        { status: 400 }
      );
    }

    // Initialize Google Gen AI client
    // Note: GoogleGenAI automatically picks up GEMINI_API_KEY or falls back to Google Cloud ADC
    const ai = new GoogleGenAI({});

    let responseText = '';
    let isRefinement = false;
    let existingXml = '';

    if (diagramId) {
      // Refinement Loop
      isRefinement = true;
      const latestVersion = getLatestDiagramVersion(diagramId);
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

    // Extract the XML from the AI response
    const xml = extractXml(responseText);
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
      const version = saveDiagramVersion(
        diagramId,
        xml,
        `AI Refined: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`,
        'AI'
      );
      return NextResponse.json({ version });
    } else {
      // Create a new diagram
      // Generate a short name from the prompt (first 40 characters)
      const diagramName = prompt.length > 45 
        ? `${prompt.slice(0, 40)}...` 
        : prompt;
        
      const { diagram, version } = createDiagram(
        diagramName,
        xml,
        `AI Generated: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`
      );
      return NextResponse.json({ diagram, version }, { status: 201 });
    }

  } catch (error: any) {
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
