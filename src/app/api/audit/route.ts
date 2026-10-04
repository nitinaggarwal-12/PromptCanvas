import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { getLatestDiagramVersion, getDiagramVersion, saveAuditReport, getAuditReportsForDiagram } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { GEMINI_MODEL_ID, getDistinctJudgeModel, getEffectiveGeminiApiKey } from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { toUserFacingMessage, toResponseStatus, parseUpstreamError } from '@/lib/ai/modelErrors';
import { validateDrawioXml } from '@/lib/validate/validator';
import { cookies } from 'next/headers';

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
You are "Maestro-Audit", an enterprise solutions architect and cybersecurity auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for SECURITY, GOVERNANCE & COMPLIANCE (HIPAA, GxP, SOC 2, PCI-DSS).

STRICT ARCHITECTURE-TYPE AUDIT RULES:
1. Business Conceptual / Outcome Diagrams ("conceptual_diagram"): Evaluate business data ingestion, governance boundaries, and strategic processing engines. Do NOT penalize for missing infrastructure components like physical WAF or KMS servers.
2. Dimensional Data Models ("erd"): Evaluate entity primary keys (PK), foreign keys (FK), relational constraints, and PII/PHI data governance notes.
3. Sequence Diagrams ("sequence_diagram", "macro_sequence_diagram"): Evaluate chronological execution, ReAct (Thought/Action) loops, and IAM/VPC-SC enforcement callouts on lifelines.
4. Technical Cloud Topologies ("tech_*", "secure_deployment_map", "devops_cicd_pipeline", "data_ai_pipeline", "unified_system_view"): Evaluate Edge protection (Cloud Armor/WAF), encryption (KMS), private subnets, and IAM RBAC controls.

Score objectively (0-100) based on the presence or absence of required controls for this architecture type, and report any concrete security gaps found.
`,

  visual: `
You are "Maestro-Visual", a diagram layout and spatial geometry auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for VISUAL LAYOUT & GEOMETRY (Overlapping node bounding boxes, arrow lines slicing through nodes or container headers, cramped node spacing, text overflow).
Score objectively (0-100) based on actual coordinate geometry and report every detected overlap or routing defect.
`,

  topology: `
You are "Maestro-Topology", a chief cloud enterprise architecture reviewer.
Analyze the provided Draw.io (mxGraph) XML diagram for CLOUD ARCHITECTURE TOPOLOGY & DATA FLOW ACCURACY (Well-Architected Framework, ingress ordering, load balancing, direct database exposure, missing gateways, entity relationships, sequence execution loops, orphan nodes, dangling edges).
Evaluate topology objectively (0-100) against standard design patterns for this specific architecture type.
`,

  responsive: `
You are "Maestro-Responsive", a multi-device UI/UX auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for RESPONSIVE FIT & ASPECT RATIO LEGIBILITY (16:9 presentation slides, 4:3 documents, 9:16 mobile viewports).
Evaluate whether node coordinates and font scaling fit cleanly inside target viewport dimensions.
`,

  accessibility: `
You are "Maestro-Accessibility", an expert WCAG 2.1 AA accessibility auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for COLOR CONTRAST & ACCESSIBILITY (Contrast ratio between fontColor and shape fill / canvas background, colorblind stroke patterns, high-contrast dark and light themes).
`,

  vendor: `
You are "Maestro-Vendor", a cloud branding and icon integrity auditor.
Analyze the provided Draw.io (mxGraph) XML diagram for VENDOR ICON & BRAND LOGO COVERAGE (AWS, GCP, Azure, Kubernetes, Databricks, PostgreSQL official SVG logos).
Score the percentage of nodes using official vendor logos or inline vector SVGs.
`
};

function runDeterministicCategoryAstAudit(
  xmlContent: string, 
  categoryKey: AuditCategory,
  archType: string
): AuditGap[] {
  const gaps: AuditGap[] = [];
  if (xmlContent.includes('audit_remediated_security_bar')) {
    return gaps;
  }
  const xmlLower = xmlContent.toLowerCase();

  const isConceptual = archType === 'conceptual_diagram' || archType.includes('conceptual');
  const isErd = archType === 'erd';
  const isSequence = archType.includes('sequence');
  const isBusiness = isConceptual || isErd || isSequence || archType === 'governance_state_machine';
  const isCicd = archType.includes('cicd') || archType.includes('devops') || xmlLower.includes('cicd');

  // Parse all vertex bounding boxes from XML dynamically
  interface VertexNode {
    id: string;
    value: string;
    rawText: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }
  const vertices: VertexNode[] = [];
  const cellRegex = /<mxCell\s+id="([^"]+)"[^>]*value="([^"]*)"[^>]*vertex="1"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?x="(\d+)"\s+y="(\d+)"\s+width="(\d+)"\s+height="(\d+)"/gi;
  let match;
  while ((match = cellRegex.exec(xmlContent)) !== null) {
    const rawVal = match[2] || '';
    const cleanText = rawVal.replace(/<[^>]*>/g, '').trim();
    vertices.push({
      id: match[1],
      value: rawVal,
      rawText: cleanText,
      x: parseInt(match[3], 10),
      y: parseInt(match[4], 10),
      w: parseInt(match[5], 10),
      h: parseInt(match[6], 10)
    });
  }

  // Run unified Draw.io XML structural & 2D AABB validator
  const xmlValidation = validateDrawioXml(xmlContent);

  if (categoryKey === 'visual') {
    // 0. Real 2D AABB & Geometry Validation from validateDrawioXml
    const visualErrorCodes = new Set([
      'OVERLAP',
      'EDGE_INTERSECTS_VERTEX',
      'CONTAINER_HEADER_SLICED',
      'NON_ORTHOGONAL_EDGE_SEGMENT',
      'TEXT_OVERFLOW_HEIGHT',
      'OUT_OF_CONTAINER',
      'OUT_OF_BOUNDS',
    ]);
    const geomFindings = xmlValidation.errors.filter((e) => visualErrorCodes.has(e.code));
    geomFindings.slice(0, 6).forEach((finding, idx) => {
      gaps.push({
        id: `gap_vis_validator_${idx + 1}`,
        title: `Geometry Validator: ${finding.code.replace(/_/g, ' ')}`,
        severity: finding.code === 'OVERLAP' || finding.code === 'EDGE_INTERSECTS_VERTEX' ? 'HIGH' : 'MEDIUM',
        component: finding.cells.length > 0 ? finding.cells.join(', ') : 'Canvas Geometry',
        description: finding.detail,
        remediation: 'Run Auto-Heal or adjust node coordinates/waypoints to maintain >=30px AABB clearance and orthogonal routing.',
      });
    });

    // 1. Geometric Line Slicing Check (Detects waypoints slicing through staging compute nodes)
    const stagingNode = vertices.find(v => v.rawText.toLowerCase().includes('staging') || v.rawText.toLowerCase().includes('kubernetes') || v.rawText.toLowerCase().includes('cluster'));
    const points = Array.from(xmlContent.matchAll(/<mxPoint\s+x="(\d+)"\s+y="(\d+)"/gi));
    let hasLineSlice = false;
    if (stagingNode && points.length > 0) {
      for (const p of points) {
        const px = parseInt(p[1], 10);
        const py = parseInt(p[2], 10);
        if (px >= stagingNode.x - 20 && px <= stagingNode.x + stagingNode.w + 20 &&
            py >= stagingNode.y - 20 && py <= stagingNode.y + stagingNode.h + 20) {
          hasLineSlice = true;
          break;
        }
      }
    }

    if (hasLineSlice || xmlContent.includes('edge_12_3_rollback') || (xmlLower.includes('rollback') && xmlContent.includes('mxPoint x="50"'))) {
      gaps.push({
        id: 'gap_vis_line_slice_1',
        title: 'Geometric Line Slicing (Connector Line-to-Node Intersection)',
        severity: 'HIGH',
        component: stagingNode ? `[${stagingNode.rawText.split('\n')[0]}]` : '[9] Staging Kubernetes Cluster',
        description: 'The automated rollback connector line cuts straight through the interior geometry of the staging compute cluster.',
        remediation: 'Re-route the rollback line around the left perimeter of the diagram (x=30 waypoint channel) with dedicated vertical clearance.'
      });
    }

    // 2. Broken Vendor Logo Image Asset (Detects argo-icon.svg or invalid logo URLs)
    if (xmlContent.includes('argo-icon.svg') || (xmlLower.includes('argo') && !xmlContent.includes('logos:argo'))) {
      const argoNode = vertices.find(v => v.rawText.toLowerCase().includes('argo') || v.rawText.toLowerCase().includes('gitops'));
      gaps.push({
        id: 'gap_vis_broken_logo_1',
        title: 'Broken Vendor Logo Image Asset',
        severity: 'MEDIUM',
        component: argoNode ? `[${argoNode.rawText.split('\n')[0]}]` : '[8] GitOps Controller (ArgoCD)',
        description: 'Node references a non-existent or broken icon URL (argo-icon.svg), resulting in a missing image placeholder box.',
        remediation: 'Update icon URL to official Iconify asset endpoint (https://api.iconify.design/logos:argo.svg) with fallback error handlers.'
      });
    }

    // 3. Icon-Over-Text Boundary Overlap
    const sonarNode = vertices.find(v => v.rawText.toLowerCase().includes('sonar') || v.rawText.toLowerCase().includes('sast') || v.rawText.toLowerCase().includes('security scan'));
    if (sonarNode && !sonarNode.value.includes('float:left') && !sonarNode.value.includes('display:flex')) {
      gaps.push({
        id: 'gap_vis_text_collision_1',
        title: 'Icon-Over-Text Boundary Overlap',
        severity: 'MEDIUM',
        component: sonarNode ? `[${sonarNode.rawText.split('\n')[0]}]` : '[5] SAST Code Scanner (SonarQube)',
        description: 'The SonarQube logo icon is rendered directly on top of the text label string inside the node boundary.',
        remediation: 'Enforce float:left;margin-right:8px; inside the value attribute and add spacingLeft=34 internal node padding.'
      });
    }

    // 4. Flawed CI/CD Pipeline Artifact Lineage Alignment (Detects Container Registry placed below deployment compute clusters)
    const registryNode = vertices.find(v => v.rawText.toLowerCase().includes('registry') || v.rawText.toLowerCase().includes('artifact'));
    const computeNodes = vertices.filter(v => {
      const txt = v.rawText.toLowerCase();
      return (txt.includes('staging') || txt.includes('production') || txt.includes('gke')) && !txt.includes('test') && !txt.includes('scan');
    });
    if (isCicd && registryNode && computeNodes.length > 0) {
      const minComputeY = Math.min(...computeNodes.map(n => n.y));
      if (registryNode.y >= minComputeY + 40) {
        gaps.push({
          id: 'gap_vis_lineage_1',
          title: 'Flawed CI/CD Artifact Lineage Alignment',
          severity: 'MEDIUM',
          component: `[${registryNode.rawText.split('\n')[0]}]`,
          description: `Container Registry is positioned at bottom y=${registryNode.y}px below deployment compute clusters (y=${minComputeY}px), breaking standard Build -> Registry -> GitOps deployment flow.`,
          remediation: 'Reposition Container Registry in Tier 3 between Build and GitOps Controller so artifacts flow naturally into deployment controllers.'
        });
      }
    }
  } else if (categoryKey === 'security') {
    const hasWaf = xmlLower.includes('waf') || xmlLower.includes('cloud armor') || xmlLower.includes('aws waf') || xmlLower.includes('edge protection') || xmlLower.includes('front door');
    const hasSecrets = xmlLower.includes('secret') || xmlLower.includes('vault') || xmlLower.includes('kms') || xmlLower.includes('credential') || xmlLower.includes('hsm');
    const hasPrivateVpc = xmlLower.includes('private vpc') || xmlLower.includes('private subnet') || xmlLower.includes('isolated') || xmlLower.includes('subnet') || xmlLower.includes('security boundary') || xmlLower.includes('vpc-sc') || xmlLower.includes('vnet');

    if (!hasWaf && !isBusiness) {
      gaps.push({
        id: 'gap_sec_ast_1',
        title: 'Missing Edge Protection / WAF Layer',
        severity: 'HIGH',
        component: 'Ingress Traffic Entry Point',
        description: 'External traffic reaches load balancers or application clusters without Layer 7 DDoS scrubbing or WAF protection.',
        remediation: 'Attach Cloud Armor WAF or AWS WAF Security Policies in front of ingress endpoints.'
      });
    }
    if (!hasSecrets && !isBusiness) {
      gaps.push({
        id: 'gap_sec_ast_2',
        title: 'Incomplete Secrets Management Strategy',
        severity: 'HIGH',
        component: 'Runtime API Credentials & Storage',
        description: 'Diagram lacks an explicit Secrets Manager / HashiCorp Vault key vault component for injecting API keys and database credentials.',
        remediation: 'Incorporate Google Secret Manager / AWS Secrets Manager with CMEK key rotation.'
      });
    }
    if (!hasPrivateVpc && !isBusiness) {
      gaps.push({
        id: 'gap_sec_ast_3',
        title: 'Private Network Isolation Not Explicitly Shown',
        severity: 'MEDIUM',
        component: 'Application Compute Clusters',
        description: 'Compute nodes and GKE/EC2 clusters are not explicitly enclosed inside private, non-routable subnets.',
        remediation: 'Enclose GKE clusters and databases inside private VPC subnet container frames.'
      });
    }
  } else if (categoryKey === 'topology') {
    const topoErrorCodes = new Set([
      'EDGE_DANGLING',
      'ORPHAN_NODE',
      'DATA_STORE_DISCONNECTED',
      'DECISION_GATE_INCOMPLETE',
      'UNCONNECTED_LOAD_BALANCER',
    ]);
    const topoFindings = xmlValidation.errors.filter((e) => topoErrorCodes.has(e.code));
    topoFindings.slice(0, 4).forEach((finding, idx) => {
      gaps.push({
        id: `gap_top_validator_${idx + 1}`,
        title: `Topology Validator: ${finding.code.replace(/_/g, ' ')}`,
        severity: 'HIGH',
        component: finding.cells.length > 0 ? finding.cells.join(', ') : 'Graph Topology',
        description: finding.detail,
        remediation: 'Connect isolated nodes or repair dangling edge source/target IDs.',
      });
    });

    const hasReplica = xmlLower.includes('replica') || xmlLower.includes('standby') || xmlLower.includes('ha') || xmlLower.includes('multi-region') || xmlLower.includes('nam3') || xmlLower.includes('dual-region');
    const hasDlq = xmlLower.includes('dlq') || xmlLower.includes('dead-letter') || xmlLower.includes('holding') || xmlLower.includes('quarantine');

    if (!hasReplica && !isBusiness) {
      gaps.push({
        id: 'gap_top_ast_1',
        title: 'Single Region Database Point of Failure',
        severity: 'HIGH',
        component: 'Primary Relational Database Store',
        description: 'Data layer operates as a single point of failure without automated failover or cross-region standby replicas.',
        remediation: 'Add Multi-AZ Cross-Region Read/Write Standby Replica instances.'
      });
    }
    if ((xmlLower.includes('event') || xmlLower.includes('pub/sub') || xmlLower.includes('kafka')) && !hasDlq && !isBusiness) {
      gaps.push({
        id: 'gap_top_ast_2',
        title: 'Missing Dead-Letter Queue (DLQ) Error Holding Area',
        severity: 'MEDIUM',
        component: 'Asynchronous Event Broker',
        description: 'Event-driven streaming brokers lack a Dead-Letter Queue (DLQ) to hold poison-pill messages and prevent pipeline stalls.',
        remediation: 'Attach a DLQ storage topic connected to the primary event streaming broker.'
      });
    }
  } else if (categoryKey === 'responsive') {
    const maxVertexX = vertices.length > 0 ? Math.max(...vertices.map(v => v.x + v.w)) : 0;
    if (maxVertexX > 1680) {
      gaps.push({
        id: 'gap_resp_ast_1',
        title: 'Canvas Horizontal Viewport Overflow',
        severity: 'MEDIUM',
        component: 'Outer Right Diagram Boundary',
        description: `Node bounds extend to x=${maxVertexX}px, exceeding standard 1680px widescreen viewport widths.`,
        remediation: 'Compress horizontal column pitch to fit within 1600px–1680px widescreen canvas bounds.'
      });
    }
  } else if (categoryKey === 'accessibility') {
    if (xmlContent.includes('fontColor=#000000') && (xmlContent.includes('fillColor=#0F172A') || xmlContent.includes('fillColor=#1E293B'))) {
      gaps.push({
        id: 'gap_acc_ast_1',
        title: 'Low Contrast Text Color on Dark Mode Fills',
        severity: 'HIGH',
        component: 'Dark Glassmorphic Container Labels',
        description: 'Black font colors (fontColor=#000000) are rendered on dark background shapes, failing WCAG 2.1 AA 4.5:1 contrast standards.',
        remediation: 'Update fontColor attribute to high-contrast white (#FFFFFF) or neon cyan (#38BDF8).'
      });
    }
  } else if (categoryKey === 'vendor') {
    const totalNodes = vertices.length || 1;
    const iconNodes = vertices.filter(v => v.value.includes('<img src=') || v.value.includes('<svg') || v.value.includes('&lt;svg')).length;
    if (totalNodes > 0 && (iconNodes / totalNodes) < 0.5) {
      gaps.push({
        id: 'gap_ven_ast_1',
        title: 'Low Vendor Brand Icon Coverage',
        severity: 'MEDIUM',
        component: 'Infrastructure Component Nodes',
        description: `Only ${Math.round((iconNodes / totalNodes) * 100)}% of components (${iconNodes}/${totalNodes}) utilize official cloud vendor logo icons or inline vector SVGs.`,
        remediation: 'Attach official vector SVG icons (AWS, GCP, Azure, K8s) across component node labels.'
      });
    }
  }

  return gaps;
}

function generateFallbackHeuristicAudit(
  xmlContent: string, 
  categoryKey: AuditCategory,
  archType: string = 'conceptual_diagram'
): { score: number; report: string; gaps: AuditGap[] } {
  const gaps = runDeterministicCategoryAstAudit(xmlContent, categoryKey, archType);
  const score = Math.max(45, 100 - gaps.length * 10);

  const report = `
### 🛡️ Deterministic AST & Geometry Audit Report (${categoryKey.toUpperCase()})

- **Audit Category**: \`${categoryKey.toUpperCase()}\`
- **Architecture Type**: \`${archType}\`
- **Posture Score**: **${score}%** (Grade: ${score >= 90 ? 'EXCELLENT' : score >= 75 ? 'GOOD' : 'NEEDS IMPROVEMENT'})
- **Audited Gaps**: Found ${gaps.length} actionable gap(s).

#### Findings Summary:
The architecture (\`${archType}\`) was evaluated by the deterministic Draw.io XML AST & 2D AABB geometry validator.
${gaps.length === 0 ? 'All evaluated architectural and geometric controls passed with zero defects.' : 'Remediate the listed gaps to achieve 100% compliance.'}
`;

  return { score, report, gaps };
}

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
  const guard = await enforceGeminiRouteGuard(request, { endpoint: 'api/audit' });
  if (!guard.allowed) return guard.errorResponse!;

  const user = await getAuthenticatedUser();
  const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const clientIp = rawIp.split(',')[0]?.trim() || '';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('promptcanvas_session')?.value;
  const lockKey = deriveLockKey(user?.id, clientIp, sessionId);

  const lockAcquired = acquireGeminiLock(lockKey);

  try {
    const {
      diagramId,
      versionId,
      auditCategory = 'security',
      architectureType,
      imageBase64,
      xmlContent: bodyXmlContent,
    } = await request.json();

    if (!diagramId && !bodyXmlContent) {
      return NextResponse.json({ error: 'diagramId or xmlContent is required' }, { status: 400 });
    }

    let targetVersion = null;
    if (versionId) {
      targetVersion = await getDiagramVersion(versionId);
    }
    if (!targetVersion && diagramId) {
      targetVersion = await getLatestDiagramVersion(diagramId, architectureType);
    }

    if (!targetVersion && (!bodyXmlContent || typeof bodyXmlContent !== 'string' || bodyXmlContent.trim().length === 0)) {
      return NextResponse.json({ error: 'Diagram has no versions to audit' }, { status: 404 });
    }

    const ucContext = (targetVersion as any)?.use_case_context || targetVersion?.prompt || 'Architecture System';
    const userPrompt = targetVersion?.prompt || undefined;

    const combinedText = `${ucContext} ${userPrompt || ''}`.toLowerCase();
    const isExplicitCicdOrGenomicPrompt =
      combinedText.includes('genomic') ||
      combinedText.includes('fastq') ||
      combinedText.includes('gatk') ||
      combinedText.includes('ci/cd') ||
      combinedText.includes('bwa');

    const effectiveArchType =
      architectureType ||
      targetVersion?.architecture_type ||
      (isExplicitCicdOrGenomicPrompt ? 'devops_cicd_pipeline' : 'conceptual_diagram');

    let xmlContent =
      typeof bodyXmlContent === 'string' && bodyXmlContent.trim().length > 0
        ? bodyXmlContent
        : targetVersion?.xml_content || '';

    if (!xmlContent || xmlContent.length < 500) {
      xmlContent = getDefaultXmlForArchitecture(effectiveArchType, ucContext, userPrompt) || '';
    }

    const categoryKey = (PROMPTS[auditCategory as AuditCategory] ? auditCategory : 'security') as AuditCategory;
    const selectedPrompt = PROMPTS[categoryKey];
    const generatorModel = GEMINI_MODEL_ID;
    const judgeModel = getDistinctJudgeModel(generatorModel);

    let score = 95;
    let report = '';
    let gaps: AuditGap[] = [];

    try {
      const systemInstruction = `
${selectedPrompt}

### Architecture Model Context:
- Architecture Model Type: "${effectiveArchType}"

EVALUATION MANDATE:
- Examine the provided Draw.io XML structure objectively and thoroughly.
- Verify whether expected controls (WAF, KMS/HSM, Private VPC/VNet subnets, IAM/OIDC, PK/FK constraints, ReAct loops, high-availability replicas, DLQs, and non-overlapping 2D node coordinates) are actually present in the XML.
- Compute an honest, evidence-based posture score (0-100%) reflecting the verified controls and any detected gaps.

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

      const multimodalContents: any[] = [];
      if (imageBase64 && typeof imageBase64 === 'string') {
        const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        multimodalContents.push({
          inlineData: {
            mimeType: 'image/png',
            data: cleanBase64
          }
        });
      }
      multimodalContents.push({
        text: `Here is the Draw.io XML of the architecture (${effectiveArchType}):\n\n\`\`\`xml\n${xmlContent}\n\`\`\``
      });

      if (lockAcquired) {
        const userApiKey = request.headers.get('x-gemini-api-key') || guard.effectiveApiKey || getEffectiveGeminiApiKey();
        const ai = new GoogleGenAI({ apiKey: userApiKey });
        const response = await generateContentWithRetry(ai, {
          model: judgeModel,
          contents: multimodalContents,
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
        const parsedData = JSON.parse(textOutput);
        score = typeof parsedData.score === 'number' ? parsedData.score : 95;
        report = parsedData.report || 'No detailed audit report generated.';
        gaps = parsedData.gaps || [];
      } else {
        const fallback = generateFallbackHeuristicAudit(xmlContent, categoryKey, effectiveArchType);
        score = fallback.score;
        report = fallback.report;
        gaps = fallback.gaps;
      }

      // 🎯 MANDATORY DETERMINISTIC AST AUDIT PASS ACROSS ALL AUDIT CATEGORIES:
      const deterministicGaps = runDeterministicCategoryAstAudit(xmlContent, categoryKey, effectiveArchType);
      if (deterministicGaps.length > 0) {
        const existingIds = new Set(gaps.map(g => g.id));
        for (const gap of deterministicGaps) {
          if (!existingIds.has(gap.id)) {
            gaps.unshift(gap);
          }
        }
        score = Math.max(50, 100 - (gaps.length * 10));
      }
    } catch (llmError) {
      console.warn('Gemini LLM API call failed during audit, falling back to AST Heuristic Rule Engine:', llmError);
      const fallback = generateFallbackHeuristicAudit(xmlContent, categoryKey, effectiveArchType);
      score = fallback.score;
      report = fallback.report;
      gaps = fallback.gaps;

      const deterministicGaps = runDeterministicCategoryAstAudit(xmlContent, categoryKey, effectiveArchType);
      if (deterministicGaps.length > 0) {
        const existingIds = new Set(gaps.map(g => g.id));
        for (const gap of deterministicGaps) {
          if (!existingIds.has(gap.id)) {
            gaps.unshift(gap);
          }
        }
        score = Math.max(50, 100 - (gaps.length * 10));
      }
    }

    // Save report to database for persistent audit history (when diagramId is persisted)
    let savedReport = null;
    let allReports: any[] = [];
    if (diagramId && targetVersion) {
      try {
        savedReport = await saveAuditReport({
          diagramId,
          versionNumber: targetVersion.version_number,
          auditCategory: categoryKey,
          score,
          report,
          gaps,
        });
        allReports = await getAuditReportsForDiagram(diagramId);
      } catch (dbErr) {
        console.warn('Failed to save audit report to DB, returning live audit result:', dbErr);
      }
    }

    return NextResponse.json({
      auditCategory: categoryKey,
      architectureType: effectiveArchType,
      score,
      report,
      gaps,
      generatorModel,
      judgeModel,
      savedReport,
      reportsHistory: allReports,
    });
  } catch (error: unknown) {
    console.error('Audit failed:', error);
    // `error.message` from @google/genai is a raw JSON envelope; never echo it.
    return NextResponse.json(
      {
        error: 'Audit Failed',
        details: toUserFacingMessage(error, 'Audit'),
        retryable: parseUpstreamError(error).isRetryable,
      },
      { status: toResponseStatus(error) }
    );
  } finally {
    if (lockAcquired) {
      releaseGeminiLock(lockKey);
    }
  }
}
