import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getLatestDiagramVersion } from '@/lib/db';

const AUDIT_PROMPT = `
You are "Maestro-Audit", an elite enterprise solutions architect and cybersecurity auditor.
Analyze the following Draw.io (mxGraph) XML diagram and provide a professional, structured audit report.

### Audit Requirements:
1. Identify potential **Security Risks** (e.g. databases exposed directly to edge/ingress, lack of gateway authorization, insecure communication lines).
2. Identify **Single Points of Failure (SPOF)** or **Reliability Bottlenecks** (e.g. single DB instance without replication, high load orchestrators without autoscaling).
3. Suggest **Cost & Performance Optimizations** (e.g. using caching, decoupling sync calls into async queues).
4. Provide concrete, actionable **Architectural Recommendations** to resolve the identified gaps.

Keep the tone professional, direct, and constructive. Format the output in clean, readable GitHub-style Markdown with emojis for severity levels (🔴 High, 🟡 Medium, 🟢 Low/Info).
`;

export async function POST(request: Request) {
  try {
    const { diagramId } = await request.json();
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId is required' }, { status: 400 });
    }

    const latestVersion = getLatestDiagramVersion(diagramId);
    if (!latestVersion) {
      return NextResponse.json({ error: 'Diagram has no versions to audit' }, { status: 404 });
    }

    const xmlContent = latestVersion.xml_content;

    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { text: `Here is the Draw.io XML of the architecture:\n\n\`\`\`xml\n${xmlContent}\n\`\`\`` },
      ],
      config: {
        systemInstruction: AUDIT_PROMPT,
      },
    });

    const report = response.text || 'No audit report generated.';
    return NextResponse.json({ report });
  } catch (error: any) {
    console.error('Audit failed:', error);
    return NextResponse.json(
      { error: 'Audit Failed', details: error.message || String(error) },
      { status: 500 }
    );
  }
}
