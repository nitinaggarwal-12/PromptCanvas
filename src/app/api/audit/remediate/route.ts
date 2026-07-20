import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

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
Modify the Draw.io XML to fully remediate and resolve all of the following security gaps:

${remediationInstructions}

### Strict Rules:
1. Preserve the overall structure and existing nodes of the architecture.
2. Add explicit visual security component nodes in the Draw.io XML for each remediation:
   - For WAF: Add "Cloud Armor WAF Security Policy" node in front of Load Balancer.
   - For API Gateway: Add "API Gateway & Authentication" node in front of backend microservices.
   - For Disaster Recovery / Database HA: Add "Cloud SQL Multi-AZ Regional Standby Replica" node wired to primary database.
   - For Storage CMEK: Add "Cloud KMS (Customer-Managed Encryption Keys)" node connected to Cloud Storage bucket.
3. Wire all newly added security nodes to adjacent components using proper directional arrows (<mxCell edge="1".../>).
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

    // Validate & Auto-Heal XML via AST Schema Healer
    const healResult = validateAndHealDrawioXml(rawXml);
    rawXml = healResult.xml;

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
