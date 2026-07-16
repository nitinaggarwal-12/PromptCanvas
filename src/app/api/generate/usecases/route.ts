import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getDiagramVersion, updateDiagramVersionUseCases } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { versionId } = body;

    if (!versionId) {
      return NextResponse.json({ error: 'versionId is required' }, { status: 400 });
    }

    const version = await getDiagramVersion(versionId);
    if (!version) {
      return NextResponse.json({ error: 'Diagram version not found' }, { status: 404 });
    }

    const contents = `
Analyze this system architecture Draw.io XML and generate two distinct sections in Markdown:

### Business Use Case
Generate a restructured, executive-style brief using this exact format, headings, and layout:

Product: [Resolve name of product/system based on XML diagram title/nodes]
Scope: Strategic goals, target stakeholders, value propositions, and success KPIs

[Write a concise 2-sentence introductory paragraph explaining the main business challenge and how this workspace architecture addresses it.]

### 1. Business Objectives & Strategic Goals
- **[Objective/Goal 1 Name]**: [Provide a thorough 1-2 sentence business description].
- **[Objective/Goal 2 Name]**: [Provide a thorough 1-2 sentence business description].
- **[Objective/Goal 3 Name]**: [Provide a thorough 1-2 sentence business description].
- **[Objective/Goal 4 Name]**: [Provide a thorough 1-2 sentence business description].
[Add 4-5 total key objectives relevant to this specific architecture]

### 2. Key Stakeholders & Personas
| Target Persona | Core Focus & Value Driver |
|:---|:---|
| **[Persona 1 Name (Primary)]** | [Explain their need for this architecture and how it helps them] |
| **[Persona 2 Name]** | [Explain their need for this architecture and how it helps them] |
| **[Persona 3 Name]** | [Explain their need for this architecture and how it helps them] |
| **[Persona 4 Name]** | [Explain their need for this architecture and how it helps them] |
| ... | ... |

### 3. Expected Value & Commercial Impact
[Write a brief sentence intro on commercial advantages.]

- **[Value 1 Name (e.g., Time Savings)]**: [Explanation of value].
- **[Value 2 Name (e.g., Competitive Advantage)]**: [Explanation of value].
- **[Value 3 Name (e.g., Revenue Streams)]**: [Explanation of value].

**Projected Return on Investment (ROI)**
- **Quantitative**: [Provide a clear financial projection statement based on hours saved, resources optimized, or cost reductions].
- **Qualitative**: [Describe qualitative metrics such as employee satisfaction, decision quality, or brand trust].

### 4. Core Performance KPIs
[Write a brief sentence intro on measuring operational health.]

| KPI Category | Measurement Criteria |
|:---|:---|
| **[KPI 1 Category]** | [Measurement criteria description] |
| **[KPI 2 Category]** | [Measurement criteria description] |
| **[KPI 3 Category]** | [Measurement criteria description] |
| **[KPI 4 Category]** | [Measurement criteria description] |
| ... | ... |

### Technical Use Case
Generate a restructured, executive-style technical brief using this exact format, headings, and layout:

Scope: Sequential messaging flow, technical APIs, configurations, and fault tolerance

[Write a concise 2-sentence introductory paragraph explaining the main technical architecture patterns and the core data lifecycle flow.]

### 1. System Execution Flow
The system processes documents through a highly decoupled, [N]-step asynchronous pipeline:
1. **[Flow Step 1 Name]**: [Provide a thorough 1-2 sentence description, referencing the specific component number like [1] Component Name].
2. **[Flow Step 2 Name]**: [Provide a thorough 1-2 sentence description].
3. **[Flow Step 3 Name]**: [Provide a thorough 1-2 sentence description].
4. **[Flow Step 4 Name]**: [Provide a thorough 1-2 sentence description].
[Detail all N sequential flow steps sequentially, matching the diagram's layout and connections]

### 2. Technical Integration & APIs
The platform utilizes a microservices architecture, communicating primarily via internal gRPC/REST and external HTTP/HTTPS protocols.

| Component | Protocols & Auth | Gateway Endpoints | Data Formats |
|:---|:---|:---|:---|
| **[Component 1 Name]** | [Protocols and Auth mechanisms] | \`[Endpoint 1]\` <br> \`[Endpoint 2]\` | **In**: [Format details] <br><br> **Out**: [Format details] |
| **[Component 2 Name]** | [Protocols and Auth] | \`[Endpoint]\` | **In**: [Format] <br><br> **Out**: [Format] |
| **[Component 3 Name]** | [Protocols and Auth] | \`[Endpoint]\` | **In**: [Format] <br><br> **Out**: [Format] |
| ... | ... | ... | ... |

### 3. Error Handling & Resilience Strategies
To ensure fault tolerance and uninterrupted user experience, each microservice implements specific reliability guardrails:
- **[Component 1 Name]**: [Describe specific reliability guardrail, e.g., validation, retry mechanisms].
- **[Component 2 Name]**: [Describe specific reliability guardrail, e.g., Dead-Letter Queues (DLQs)].
- **[Component 3 Name]**: [Describe specific reliability guardrail, e.g., circuit breakers, auto-scaling].

**Global System Resilience Infrastructure**
- **Observability**: [Distributed tracing, centralized dashboards, metrics, logs].
- **Orchestration**: [Containerized deployments, replica counts, automated scaling, self-healing, node fault tolerance].
- **Graceful Degradation**: [Behavior of the system when peripheral or optional services go offline].

### Draw.io XML:
\`\`\`xml
${version.xml_content}
\`\`\`
`.trim();

    const ai = new GoogleGenAI({});
    console.log(`Generating in-place metadata for version ${versionId}...`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    const responseText = response.text || '';

    // Parse sections
    let business = '';
    let technical = '';

    const businessHeader = "### Business Use Case";
    const technicalHeader = "### Technical Use Case";

    if (responseText.includes(businessHeader) && responseText.includes(technicalHeader)) {
      const bStart = responseText.indexOf(businessHeader) + businessHeader.length;
      const tStart = responseText.indexOf(technicalHeader);
      business = responseText.substring(bStart, tStart).trim();
      technical = responseText.substring(tStart + technicalHeader.length).trim();
    } else {
      // Fallback split
      const parts = responseText.split(/###\s+Technical\s+Use\s+Case/i);
      business = parts[0]?.replace(/###\s+Business\s+Use\s+Case/i, '').trim() || '';
      technical = parts[1]?.trim() || '';
    }

    if (!business || !technical) {
      business = `### Business Value Plan\n\nDerived from diagram architecture version ${version.version_number}.\n\n` + responseText;
      technical = `### Technical Architecture Overview\n\nWalkthrough based on version ${version.version_number}.\n\n` + responseText;
    }

    await updateDiagramVersionUseCases(versionId, business, technical);
    return NextResponse.json({ success: true, business_usecase: business, technical_usecase: technical });

  } catch (error) {
    console.error('Failed to generate in-place metadata:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
