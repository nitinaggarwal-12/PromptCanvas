/**
 * Blueprint 23 — AI Agent Approval & Governance Workflow.
 * Phase 3.2 rebuild: risk-tiered evidence gates for Gemini Enterprise Agent Platform
 * and Gemini Enterprise agents. No invented universal thresholds or fake product gates.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const GITHUB = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/default.svg';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) => `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) => v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const stage = (id: string, n: number, title: string, sub: string, x: number, w: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, 30, w, 600),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, 45, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.3;', x + 54, 40, w - 68, 45),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`, x, y, w, h),
  img(`${id}_i`, icon, x + 13, y + Math.max(10, (h - 34) / 2), 34, 34),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11;', x + 58, y + 6, w - 68, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') => v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) => `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildAiAgentApprovalWorkflowXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  c.push(stage('s1', 1, 'REGISTER CANDIDATE', 'Define ownership, scope and material change', 25, 270, '#1A73E8', '#EFF6FF'));
  c.push(card('candidate', 'Agent candidate', 'Agent Designer, Agent Studio / ADK, or registered third-party/custom agent', 45, 105, 230, 88, '#1A73E8'));
  c.push(card('source', 'Versioned source', 'Agent config/code, prompts, tool contracts and policy inputs under change control', 45, 215, 230, 82, '#1A73E8', GITHUB));
  c.push(mini('owner', 'Accountability', 'Named product owner • technical owner • risk owner • support owner', 45, 320, 230, 72, '#1A73E8'));
  c.push(mini('scope', 'Declared scope', 'Users • data classes • tools/actions • regions • intended autonomy • expected outcomes', 45, 415, 230, 96, '#1A73E8'));
  c.push(mini('change', 'Change trigger', 'New agent or material change to model, prompt, tool, data, permissions or behavior', 45, 535, 230, 68, '#1A73E8'));

  c.push(stage('s2', 2, 'AUTOMATED EVIDENCE', 'Test behavior, security and access before review', 315, 320, '#E87900', '#FFF7ED'));
  c.push(mini('eval', 'Task & quality evaluation', 'Representative datasets • task success • groundedness/relevance • regression tests', 335, 105, 280, 82, '#E87900'));
  c.push(mini('safety', 'Safety & adversarial testing', 'Model Armor policy tests • prompt-injection/jailbreak tests • unsafe-output cases', 335, 207, 280, 82, '#E87900'));
  c.push(mini('access', 'Access & tool verification', 'Agent Identity/IAM • Agent Registry destinations • MCP/API schema • least privilege', 335, 309, 280, 82, '#E87900'));
  c.push(mini('data', 'Data handling review', 'Sensitivity • retention • residency • grounding provenance • logging/redaction policy', 335, 411, 280, 82, '#E87900'));
  c.push(mini('failure', 'Failure & recovery tests', 'Timeouts • retries • denial path • dependency failure • safe rollback / disable path', 335, 513, 280, 82, '#E87900'));

  c.push(stage('s3', 3, 'RISK-TIER DECISION', 'Policy determines required gates—not a universal score', 655, 255, '#7B61A8', '#F7F4FF'));
  c.push(v('risk_diamond', '<b>Risk tier & evidence meet policy?</b><br><span style="font-size:9px;color:#64748B">Impact • autonomy • data • external actions • regulation</span>', 'shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#7B61A8;strokeWidth=1.6;fontColor=#0F172A;fontSize=11;align=center;verticalAlign=middle;', 690, 150, 185, 135));
  c.push(mini('low_risk', 'Low-risk policy path', 'May use automated approval only when organization policy explicitly allows it.', 680, 330, 205, 82, '#0F8B82', '#ECFDF5'));
  c.push(mini('review_req', 'Review required', 'Medium/high risk or regulated use cases proceed to named human approvers.', 680, 440, 205, 82, '#D93025', '#FFF7F7'));
  c.push(mini('reject', 'Not ready', 'Evidence gaps return the candidate to engineering with findings and required remediation.', 680, 550, 205, 54, '#D93025', '#FFF7F7'));

  c.push(stage('s4', 4, 'HUMAN AUTHORITY', 'Approval responsibilities follow risk and jurisdiction', 930, 330, '#D93025', '#FEF2F2'));
  c.push(mini('business', 'Business / product owner', 'Confirms intended outcome, user impact, operating model and fallback.', 950, 105, 290, 74, '#D93025'));
  c.push(mini('security', 'Security / AppSec', 'Threat model, identities, tool access, external interfaces and security evidence.', 950, 199, 290, 74, '#D93025'));
  c.push(mini('data_review', 'Data / privacy owner', 'Purpose, access, sensitive-data controls, retention, residency and auditability.', 950, 293, 290, 74, '#D93025'));
  c.push(mini('ai_gov', 'AI governance / model risk', 'Evaluation sufficiency, safety controls, transparency and ongoing monitoring.', 950, 387, 290, 74, '#D93025'));
  c.push(mini('regulatory', 'Legal / regulatory — if applicable', 'Required only where policy, contract or regulated process demands this sign-off.', 950, 481, 290, 74, '#D93025'));
  c.push(mini('approval_record', 'Approval record', 'Decision • approver • scope • exceptions • expiry/review date • evidence references', 950, 575, 290, 34, '#D93025'));

  c.push(stage('s5', 5, 'CONTROLLED RELEASE', 'Deploy/publish the approved version and preserve evidence', 1280, 250, '#0F8B82', '#ECFDF5'));
  c.push(card('registry', 'Agent Registry', 'Register/discover approved production agent, tools and endpoints with identity context', 1300, 105, 210, 86, '#0F8B82'));
  c.push(mini('release', 'Release pipeline', 'Promote the reviewed version to Agent Runtime or publish the governed Gemini Enterprise agent.', 1300, 215, 210, 86, '#0F8B82'));
  c.push(mini('progressive', 'Progressive exposure', 'Pilot/cohort/canary controls when architecture and risk justify staged rollout.', 1300, 325, 210, 78, '#0F8B82'));
  c.push(mini('evidence_pack', 'Evidence pack', 'Version • evaluations • threat tests • access matrix • approvals • deployment record', 1300, 427, 210, 86, '#0F8B82'));
  c.push(mini('rollback', 'Rollback / disable', 'Known-good version or disable/quarantine mechanism with clear operator ownership.', 1300, 537, 210, 66, '#0F8B82'));

  c.push(stage('s6', 6, 'RUNTIME ASSURANCE', 'Observe behavior and trigger re-review on material drift', 1550, 185, '#334155', '#F8FAFC'));
  c.push(mini('observe', 'Agent Observability', 'Behavior • tool calls • failures • latency • safety events • user feedback', 1570, 105, 145, 92, '#334155'));
  c.push(mini('runtime_eval', 'Continuous / scheduled evaluation', 'Regression against policy-defined quality and safety objectives', 1570, 221, 145, 92, '#334155'));
  c.push(mini('incident', 'Incident / anomaly', 'Pause, limit or disable the agent when predefined operational or safety conditions fire.', 1570, 337, 145, 92, '#D93025', '#FFF7F7'));
  c.push(mini('reapprove', 'Re-approval triggers', 'Material model/prompt/tool/data/permission change • incident • new geography/regulation', 1570, 453, 145, 112, '#7B61A8', '#F7F4FF'));

  c.push(edge('e12', 'candidate', 'eval', 'candidate', '#2563EB'));
  c.push(edge('e23', 'failure', 'risk_diamond', 'evidence pack', '#E87900'));
  c.push(edge('e34', 'risk_diamond', 'business', 'human review', '#D93025'));
  c.push(edge('e35', 'low_risk', 'registry', 'policy-approved', '#0F8B82'));
  c.push(edge('e45', 'approval_record', 'registry', 'approved scope', '#0F8B82'));
  c.push(edge('e56', 'release', 'observe', 'production', '#334155'));
  c.push(edge('e6back', 'reapprove', 'candidate', 'material change / re-review', '#7B61A8', true, 0, .5, 0, .78));
  c.push(edge('ereject', 'risk_diamond', 'reject', 'evidence gap', '#D93025', true, .5, 1, .5, 0));

  c.push(v('footer', '<b>GOVERNANCE PRINCIPLE:</b> Approval criteria are organization- and risk-specific. Do not encode invented universal percentages. Every production agent should have an accountable owner, reproducible evidence, scoped permissions, a disable/rollback path, and explicit re-review triggers.', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;', 25, 660, 1710, 58));
  c.push(v('legend', '<b>FLOW</b>  <span style="color:#2563EB">━━ candidate</span>  <span style="color:#E87900">━━ automated evidence</span>  <span style="color:#D93025">━━ human/risk gate</span>  <span style="color:#0F8B82">━━ approved release</span>  <span style="color:#7B61A8">┄┄ re-review loop</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;', 25, 735, 1710, 38));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="ai_agent_approval_workflow" name="AI Agent Approval and Governance Workflow"><mxGraphModel dx="1760" dy="820" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="800" background="#FFFFFF" math="0" shadow="0"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
