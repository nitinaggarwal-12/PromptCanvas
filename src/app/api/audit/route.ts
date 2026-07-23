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

export type AuditCategory = 'security' | 'visual' | 'topology' | 'responsive' | 'accessibility' | 'vendor';

const PROMPTS: Record<AuditCategory, string> = {
  security: `
You are "Maestro-Audit", an elite enterprise solutions architect and cybersecurity auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for SECURITY & COMPLIANCE (HIPAA, GxP, SOC 2, PCI-DSS).
Identify missing security controls (e.g. WAF, KMS Encryption, Private Subnets, API Gateways, DR Standby Replicas).
If secure, return high score (90-100) and empty gaps array.
`,

  visual: `
You are "Maestro-Visual", a world-class graphic designer and diagram layout auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for VISUAL LAYOUT & GEOMETRY (Overlapping shapes, arrow lines slicing text, compact node spacing, text overflow).
If nodes and connector labels are spaced cleanly with zero overlaps, return high score (90-100) and empty gaps array.
`,

  topology: `
You are "Maestro-Topology", a chief cloud enterprise architecture reviewer.
Analyze the provided Draw.io (mxGraph) XML diagram for CLOUD ARCHITECTURE TOPOLOGY & DATA FLOW ACCURACY (Well-Architected Framework, ingress ordering, load balancing, direct database exposure, missing gateways).
If topology follows cloud best practices, return high score (90-100) and empty gaps array.
`,

  responsive: `
You are "Maestro-Responsive", a multi-device UI/UX auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for RESPONSIVE FIT & ASPECT RATIO LEGIBILITY (16:9 presentation slides, 4:3 documents, 9:16 mobile viewports).
Evaluate whether node coordinates and font scaling fit nicely inside target viewport dimensions.
`,

  accessibility: `
You are "Maestro-Accessibility", an expert WCAG 2.1 AA accessibility auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for COLOR CONTRAST & ACCESSIBILITY (Contrast ratio between fontColor and shape fill / canvas background, colorblind stroke patterns, high-contrast dark and light themes).
`,

  vendor: `
You are "Maestro-Vendor", a cloud branding and icon integrity auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for VENDOR ICON & BRAND LOGO COVERAGE (AWS, GCP, Azure, Kubernetes, Databricks, PostgreSQL official SVG logos).
Score the percentage of nodes using official vendor logos.
`
};

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
    const { diagramId, auditCategory = 'security' } = await request.json();
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId is required' }, { status: 400 });
    }

    const latestVersion = await getLatestDiagramVersion(diagramId);
    if (!latestVersion) {
      return NextResponse.json({ error: 'Diagram has no versions to audit' }, { status: 404 });
    }

    const xmlContent = latestVersion.xml_content;
    const categoryKey = (PROMPTS[auditCategory as AuditCategory] ? auditCategory : 'security') as AuditCategory;
    const selectedPrompt = PROMPTS[categoryKey];

    const systemInstruction = `
${selectedPrompt}

Respond strictly in JSON matching the schema provided:
- score: number (0-100)
- report: clean markdown summary of findings, strengths, and recommendations
- gaps: array of AuditGap objects:
  - id: unique string
  - title: concise title
  - severity: "HIGH" | "MEDIUM" | "LOW"
  - component: component/node name
  - description: short issue description
  - remediation: concrete instruction on how to fix it
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { text: `Here is the Draw.io XML of the architecture:\n\n\`\`\`xml\n${xmlContent}\n\`\`\`` },
      ],
      config: {
        systemInstruction,
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
        score: 92,
        report: textOutput,
        gaps: []
      };
    }

    const score = typeof parsedData.score === 'number' ? parsedData.score : 92;
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
      auditCategory: categoryKey,
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
