import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { getLatestDiagramVersion, saveAuditReport, getAuditReportsForDiagram } from '@/lib/db';

const ai = new GoogleGenAI({});

export interface AuditGap {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  component: string;
  description: string;
  remediation: string;
}

const AUDIT_PROMPT = `
You are "Maestro-Audit", an elite enterprise solutions architect and cybersecurity auditor.
Analyze the provided Draw.io (mxGraph) XML diagram and generate a comprehensive security audit report with actionable gaps.

Respond strictly in JSON matching the schema provided.

CRITICAL SCORE & GAP AUDITING RULES:
1. Accurately evaluate the security posture of the architecture.
2. If the diagram contains security components (e.g. WAF / Cloud Armor, HTTPS Load Balancer, Private Subnets, CMEK / KMS Encryption, API Gateway, DB Multi-AZ HA Failover Replicas), assign a high score between 90% and 100% (GRADE: EXCELLENT).
3. The "gaps" array must contain ONLY genuine, unmitigated security or reliability gaps (0 to 5 items).
4. If all major vulnerabilities have been remediated, return an EMPTY gaps array \`[]\` and a score of 100. Do NOT invent or force artificial gaps if the architecture is well-secured.
5. For any remaining gaps:
   - id: unique string e.g. "gap_1", "gap_2"
   - title: concise title
   - severity: "HIGH", "MEDIUM", or "LOW"
   - component: component/node name
   - description: short issue description
   - remediation: concrete architectural instruction on how to fix it in the diagram

6. The "report" string must be clean GitHub-style Markdown detailing findings, strengths, risks, and recommendations.
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const diagramId = searchParams.get('diagramId');
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId query parameter is required' }, { status: 400 });
    }

    const reports = await getAuditReportsForDiagram(diagramId);
    return NextResponse.json({ reports });
  } catch (error: unknown) {
    console.error('Failed to fetch audit reports:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Failed to fetch reports', details: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { diagramId } = await request.json();
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId is required' }, { status: 400 });
    }

    const latestVersion = await getLatestDiagramVersion(diagramId);
    if (!latestVersion) {
      return NextResponse.json({ error: 'Diagram has no versions to audit' }, { status: 404 });
    }

    const xmlContent = latestVersion.xml_content;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { text: `Here is the Draw.io XML of the architecture:\n\n\`\`\`xml\n${xmlContent}\n\`\`\`` },
      ],
      config: {
        systemInstruction: AUDIT_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            report: { type: Type.STRING },
            gaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['HIGH', 'MEDIUM', 'LOW'] },
                  component: { type: Type.STRING },
                  description: { type: Type.STRING },
                  remediation: { type: Type.STRING },
                },
                required: ['id', 'title', 'severity', 'component', 'description', 'remediation'],
              },
            },
          },
          required: ['score', 'report', 'gaps'],
        },
      },
    });

    const textOutput = response.text || '{}';
    let parsedData: { score?: number; report?: string; gaps?: AuditGap[] } = {};
    try {
      parsedData = JSON.parse(textOutput);
    } catch (e) {
      console.error('Failed to parse audit JSON output:', e);
      parsedData = {
        score: 95,
        report: textOutput,
        gaps: []
      };
    }

    const score = typeof parsedData.score === 'number' ? parsedData.score : 95;
    const report = parsedData.report || 'No detailed audit report generated.';
    const gaps = parsedData.gaps || [];

    // Save report to database for persistent audit history
    const savedReport = await saveAuditReport({
      diagramId,
      versionNumber: latestVersion.version_number,
      score,
      report,
      gaps,
    });

    const allReports = await getAuditReportsForDiagram(diagramId);

    return NextResponse.json({
      score,
      report,
      gaps,
      savedReport,
      reportsHistory: allReports,
    });
  } catch (error: unknown) {
    console.error('Audit failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Audit Failed', details: errorMessage },
      { status: 500 }
    );
  }
}
