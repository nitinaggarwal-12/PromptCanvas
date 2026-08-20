/**
 * Blueprint 21 — Agent Evaluation, Safety & Runtime Assurance.
 * Phase 3.2 rebuild: separates pre-release evaluation, runtime security,
 * online quality monitoring, and controlled improvement.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) =>
  v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const zone = (id: string, n: number, title: string, sub: string, x: number, y: number, w: number, h: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 13, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', x + 54, y + 8, w - 68, 44),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`, x, y, w, h),
  img(`${id}_i`, GCP, x + 13, y + Math.max(10, (h - 34) / 2), 34, 34),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;', x + 58, y + 6, w - 68, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') =>
  v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) =>
  `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildEvalSafetyXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  c.push(v('principle', '<b>AGENT EVALUATION, SAFETY & RUNTIME ASSURANCE</b>   Pre-release evaluation proves expected behavior; runtime security screens live interactions; online monitoring detects quality drift; improvements return through controlled engineering—not autonomous prompt mutation.', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;', 25, 15, 1710, 40));

  c.push(zone('inputs', 1, 'EVALUATION INPUTS', 'Evidence must represent the real task and its risks', 25, 80, 285, 570, '#1A73E8', '#EFF6FF'));
  c.push(card('candidate', 'Versioned agent candidate', 'Agent source/config • prompt/model policy • tools • grounding • permissions', 45, 145, 245, 82, '#1A73E8'));
  c.push(mini('golden', 'Representative test cases', 'Normal user journeys • expected results • references when available', 45, 247, 245, 78, '#1A73E8'));
  c.push(mini('edgecases', 'Edge & failure cases', 'Missing data • tool failure • ambiguity • long context • timeout • partial results', 45, 345, 245, 82, '#1A73E8'));
  c.push(mini('adversarial', 'Adversarial / misuse cases', 'Prompt injection • jailbreak • tool abuse • sensitive-data leakage • malicious URLs/content', 45, 447, 245, 94, '#D93025', '#FFF7F7'));
  c.push(mini('risk_profile', 'Risk profile', 'Business impact • autonomy • data sensitivity • external actions • regulatory obligations', 45, 561, 245, 64, '#1A73E8'));

  c.push(zone('offline', 2, 'PRE-RELEASE EVALUATION', 'Measure task quality and regression before release', 335, 80, 365, 570, '#7B61A8', '#F7F4FF'));
  c.push(card('rapid', 'Rapid Evaluation', 'Frequent development feedback when agent logic, tools or model configuration changes', 355, 145, 325, 82, '#7B61A8'));
  c.push(card('testcase', 'Test Case Evaluation', 'Repeatable regression against a defined dataset in CI/CD or release qualification', 355, 247, 325, 82, '#7B61A8'));
  c.push(mini('metrics', 'Use-case metrics', 'Task success • groundedness/relevance • tool-call correctness • structured-output validity • latency/cost where needed', 355, 349, 325, 92, '#7B61A8'));
  c.push(mini('judge', 'Rubric / model-based evaluators', 'Use adaptive or static rubrics where appropriate; preserve human review for consequential judgments.', 355, 461, 325, 88, '#7B61A8'));
  c.push(mini('quality_gate', 'Policy-defined release gate', 'Compare against approved baselines/objectives. Do not hardcode a universal 95% score for every use case.', 355, 569, 325, 56, '#0F8B82', '#ECFDF5'));

  c.push(zone('safety', 3, 'SECURITY & SAFETY TESTING', 'Test enforcement—not just model behavior', 725, 80, 335, 570, '#D93025', '#FEF2F2'));
  c.push(card('armor_templates', 'Model Armor templates', 'Configure applicable filters and organization-specific confidence thresholds', 745, 145, 295, 82, '#D93025'));
  c.push(mini('pi', 'Prompt injection / jailbreak', 'Positive and negative cases, indirect malicious content, unsafe instruction override attempts', 745, 247, 295, 84, '#D93025'));
  c.push(mini('sdp', 'Sensitive data protection', 'PII/credentials/custom sensitive types • allow/block/redaction behavior where configured', 745, 351, 295, 84, '#D93025'));
  c.push(mini('toolsec', 'Tool & agent abuse', 'Unauthorized destination • toxic tool combinations • schema/parameter manipulation • identity misuse', 745, 455, 295, 84, '#D93025'));
  c.push(mini('blockpath', 'Enforcement verification', 'Confirm ALLOW/BLOCK behavior, client error path, audit evidence and safe failure before production.', 745, 559, 295, 66, '#D93025', '#FFF7F7'));

  c.push(zone('release', 4, 'CONTROLLED RELEASE', 'Promote only the evaluated version', 1085, 80, 275, 570, '#0F8B82', '#ECFDF5'));
  c.push(card('registry', 'Agent Registry', 'Register the approved agent, endpoints/tools and identity context', 1105, 145, 235, 82, '#0F8B82'));
  c.push(mini('gateway', 'Agent Gateway', 'Apply approved ingress/egress authorization and optional Model Armor policies', 1105, 247, 235, 88, '#0F8B82'));
  c.push(mini('pilot', 'Staged exposure', 'Development → test/pilot → production cohort/canary when risk and architecture warrant it', 1105, 355, 235, 84, '#0F8B82'));
  c.push(mini('evidence', 'Release evidence', 'Source revision • evaluation runs • safety tests • policy config • approval • rollback target', 1105, 459, 235, 84, '#0F8B82'));
  c.push(mini('rollback_ready', 'Rollback / disable ready', 'Known-good version and a tested disable/quarantine path before exposure grows', 1105, 563, 235, 62, '#0F8B82'));

  c.push(zone('runtime', 5, 'PRODUCTION ASSURANCE', 'Observe quality and security independently', 1385, 80, 350, 570, '#334155', '#F8FAFC'));
  c.push(card('observe', 'Agent Observability', 'Trace agent/tool/MCP activity • latency • errors • dependencies • failures', 1405, 145, 310, 82, '#334155'));
  c.push(card('online', 'Online Monitoring', 'Asynchronously score live traces with configured quality metrics to detect drift', 1405, 247, 310, 82, '#334155'));
  c.push(mini('alerts', 'Quality alerts', 'Cloud Monitoring incidents/notifications when configured monitor metrics breach policy thresholds', 1405, 349, 310, 82, '#334155'));
  c.push(mini('runtime_security', 'Runtime security events', 'Model Armor / gateway policy violations, blocked content, sensitive-data or authorization events', 1405, 451, 310, 82, '#D93025', '#FFF7F7'));
  c.push(mini('incident', 'Incident action', 'Limit traffic • disable/quarantine • investigate traces/evidence • restore known-good state', 1405, 553, 310, 72, '#D93025', '#FFF7F7'));

  c.push(edge('e12', 'candidate', 'rapid', 'candidate', '#2563EB'));
  c.push(edge('e23', 'testcase', 'armor_templates', 'safety suite', '#7B61A8'));
  c.push(edge('e34', 'blockpath', 'registry', 'qualified version', '#0F8B82'));
  c.push(edge('e45', 'pilot', 'observe', 'production', '#334155'));
  c.push(edge('e_online_incident', 'online', 'incident', 'quality regression', '#D93025', true, .5, 1, .5, 0));
  c.push(edge('e_security_incident', 'runtime_security', 'incident', 'security violation', '#D93025', true, .5, 1, .5, 0));
  c.push(edge('e_rework', 'incident', 'candidate', 'controlled remediation', '#7B61A8', true, 0, .65, 0, .8));

  c.push(zone('evidence_plane', 6, 'EVIDENCE & ACCOUNTABILITY', 'Auditable proof across the lifecycle', 25, 680, 1710, 190, '#6554C0', '#F5F3FF'));
  c.push(mini('eval_store', 'Evaluation results', 'Test-case inputs • evaluator configuration • scores/findings • baseline comparison', 50, 745, 300, 82, '#6554C0'));
  c.push(mini('policy_store', 'Policy configuration', 'Model Armor template/version • gateway/IAM policy • risk-specific thresholds', 370, 745, 300, 82, '#6554C0'));
  c.push(mini('release_store', 'Release record', 'Source/config version • approved evidence • deployment target • rollout cohort • rollback target', 690, 745, 300, 82, '#6554C0'));
  c.push(mini('runtime_store', 'Runtime telemetry', 'Agent traces • blocked/allowed decisions • monitor metrics • incidents • user feedback', 1010, 745, 300, 82, '#6554C0'));
  c.push(mini('owners', 'Named owners', 'Product • engineering • security • data/privacy • operations • governance reviewers as required', 1330, 745, 380, 82, '#6554C0'));

  c.push(v('legend', '<b>FLOW</b>  <span style="color:#2563EB">━━ candidate</span>  <span style="color:#7B61A8">━━ evaluation/remediation</span>  <span style="color:#0F8B82">━━ qualified release</span>  <span style="color:#334155">━━ production telemetry</span>  <span style="color:#D93025">┄┄ incident trigger</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;', 25, 890, 1710, 38));
  c.push(v('guardrail_note', '<b>GUARDRAIL:</b> Online monitoring is asynchronous quality evaluation, not an inline security filter. Runtime security belongs in Model Armor / gateway / IAM policy enforcement. Quality thresholds are use-case specific and should be configured—not invented globally.', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.2;align=center;verticalAlign=middle;', 25, 944, 1710, 42));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="agentic_eval_safety_platform" name="Agent Evaluation Safety and Runtime Assurance"><mxGraphModel dx="1760" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="1000" background="#FFFFFF" math="0" shadow="0"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
