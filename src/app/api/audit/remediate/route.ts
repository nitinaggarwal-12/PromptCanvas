import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { diagramId, selectedGaps } = await request.json();
    if (!diagramId || !Array.isArray(selectedGaps) || selectedGaps.length === 0) {
      return NextResponse.json({ error: 'diagramId and selectedGaps array are required' }, { status: 400 });
    }

    const latestVersion = await getLatestDiagramVersion(diagramId);
    if (!latestVersion) {
      return NextResponse.json({ error: 'Diagram has no versions to remediate' }, { status: 404 });
    }

    const currentXml = latestVersion.xml_content;

    const remediationInstructions = selectedGaps.map((gap: { title: string; remediation: string }, idx: number) => 
      `${idx + 1}. [${gap.title}]: ${gap.remediation}`
    ).join('\n');

    const prompt = `
You are an expert enterprise cloud architect and cybersecurity engineer.
You are given an existing Draw.io XML architecture diagram.

### Task:
Modify the Draw.io XML to remediate and fix the following selected security gaps:

${remediationInstructions}

### Strict Rules:
1. Preserve the overall structure and existing nodes of the architecture.
2. Add necessary security components (e.g. Cloud Armor WAF, KMS Encryption, Private Subnet boundary, HA Failover Replica, SSL/TLS gateways) to resolve the gaps.
3. Wire the new security nodes to the existing components with proper directional arrows (<mxCell edge="1".../>).
4. Return ONLY valid, well-formed Draw.io XML wrapped inside <mxfile>...</mxfile>. Do NOT wrap in markdown code blocks or text outside XML.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { text: `Here is the current Draw.io XML:\n\n${currentXml}` },
      ],
      config: {
        systemInstruction: prompt,
      },
    });

    let rawXml = response.text?.trim() || '';

    // Strip markdown code fences if present
    if (rawXml.startsWith('```')) {
      rawXml = rawXml.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim();
    }

    if (!rawXml.includes('<mxfile')) {
      throw new Error('AI output did not contain valid Draw.io XML');
    }

    const comment = `Remediated ${selectedGaps.length} security gap(s) via Gemini`;

    const newVersion = await saveDiagramVersion(
      diagramId,
      rawXml,
      comment,
      'Gemini Audit Remediation'
    );

    return NextResponse.json({
      success: true,
      newVersion,
      comment,
      message: `Successfully remediated ${selectedGaps.length} security gap(s)!`
    });
  } catch (error: unknown) {
    console.error('Audit remediation failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Remediation Failed', details: errorMessage },
      { status: 500 }
    );
  }
}
