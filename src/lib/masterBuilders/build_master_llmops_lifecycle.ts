/**
 * Blueprint 35 — LLMOps & AgentOps Delivery Lifecycle.
 * Phase 3.2 rebuild aligned to Gemini Enterprise Agent Platform delivery practices.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON = {
  github: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/default.svg',
  cloudRun: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-run/default.svg',
};
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) => `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) => v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const stage = (id: string, n: number, title: string, sub: string, x: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, 60, 250, 560),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, 75, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.3px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.2;', x + 54, 70, 180, 44),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;`, x, y, w, h),
  img(`${id}_i`, icon, x + 12, y + Math.max(10, (h - 34) / 2), 34, 34),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.8;', x + 56, y + 6, w - 66, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') => v(id, `<b>${title}</b><br><span style="font-size:8.9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1;fontColor=#0F172A;fontSize=10.5;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) => `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.7;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildLlmopsLifecycleXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];
  c.push(v('purpose', '<b>LLMOps & AgentOps DELIVERY LIFECYCLE</b>   Govern prompts, models and agent behavior as testable/versioned assets; promote only evidence-backed releases; observe production quality and roll back safely.', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;', 25, 15, 1710, 34));

  c.push(stage('design', 1, 'DESIGN & EXPERIMENT', 'Create a reproducible candidate', 25, '#1A73E8', '#EFF6FF'));
  c.push(card('studio', 'Agent Studio / development environment', 'Prototype model, prompt, grounding and agent behavior using approved models', 45, 130, 210, 82, '#1A73E8'));
  c.push(mini('agent_code', 'Agent source & config', 'ADK/framework code • instructions • tool schemas • routing • policies', 45, 232, 210, 82, '#1A73E8'));
  c.push(mini('prompt_asset', 'Prompt / model configuration', 'Templates • model alias/version policy • generation settings • grounding configuration', 45, 334, 210, 82, '#1A73E8'));
  c.push(mini('dataset', 'Evaluation dataset', 'Representative prompts/conversations • references where available • risk/adversarial cases', 45, 436, 210, 82, '#1A73E8'));
  c.push(mini('repro', 'Reproducibility record', 'Source revision • dependency lock • data/eval version • environment configuration', 45, 538, 210, 58, '#1A73E8'));

  c.push(stage('version', 2, 'VERSION & REVIEW', 'Make every production change traceable', 305, '#E87900', '#FFF7ED'));
  c.push(card('repo', 'GitHub / Secure Source Manager', 'Pull request • protected branch • reviewers • signed/reviewed change history', 325, 130, 210, 86, '#E87900', ICON.github));
  c.push(mini('diff', 'Semantic change review', 'Prompt/agent/tool/data/config diff with owner and rationale—not an opaque binary artifact', 325, 238, 210, 86, '#E87900'));
  c.push(mini('secrets', 'Secret & policy checks', 'No embedded credentials • dependency/security scan • IaC/policy checks as applicable', 325, 346, 210, 82, '#E87900'));
  c.push(mini('approval', 'Change approval', 'Risk-proportional reviewer set; material agent changes may invoke the dedicated approval workflow', 325, 450, 210, 92, '#E87900'));

  c.push(stage('verify', 3, 'BUILD & VERIFY', 'CI must produce evidence, not just an artifact', 585, '#7B61A8', '#F7F4FF'));
  c.push(card('cloud_build', 'Cloud Build / CI', 'Automated test pipeline; Agents CLI can support scaffold → evaluate → deploy workflows', 605, 130, 210, 82, '#7B61A8'));
  c.push(mini('tests', 'Deterministic tests', 'Schema • tool/function contract • unit/integration • permission/error-path tests', 605, 232, 210, 82, '#7B61A8'));
  c.push(mini('gen_eval', 'Gen AI Evaluation', 'Task quality • adaptive/static rubrics • tool-call metrics • regression comparisons', 605, 334, 210, 92, '#7B61A8'));
  c.push(mini('safety_eval', 'Safety & red-team suite', 'Model Armor policy cases • prompt injection • unsafe output • sensitive-data scenarios', 605, 446, 210, 92, '#D93025', '#FFF7F7'));
  c.push(mini('quality_gate', 'Policy-defined quality gate', 'Promote only when required technical, quality, safety and governance checks pass', 605, 558, 210, 38, '#0F8B82', '#ECFDF5'));

  c.push(stage('release', 4, 'PACKAGE & RELEASE', 'Immutable version plus deployment metadata', 865, '#0F8B82', '#ECFDF5'));
  c.push(card('artifact', 'Artifact Registry — when containerized', 'Store approved BYOC/container images and provenance for deployable runtime artifacts', 885, 130, 210, 86, '#0F8B82'));
  c.push(mini('source_deploy', 'Source-based deployment', 'Agent Runtime can deploy from source/Git or other supported methods; containerization is optional', 885, 238, 210, 92, '#0F8B82'));
  c.push(mini('release_record', 'Release manifest', 'Version • source revision • eval evidence • configuration • approver • target environment', 885, 352, 210, 86, '#0F8B82'));
  c.push(mini('progressive', 'Progressive rollout', 'Dev/test → pilot/canary/cohort → production when the workload and risk warrant it', 885, 460, 210, 86, '#0F8B82'));

  c.push(stage('deploy', 5, 'DEPLOY & PUBLISH', 'Runtime and user-facing publication are separate', 1145, '#4285F4', '#EFF6FF'));
  c.push(card('agent_runtime', 'Agent Runtime', 'Managed production runtime for ADK and supported agent frameworks', 1165, 130, 210, 82, '#4285F4'));
  c.push(card('cloud_run', 'Cloud Run — alternative workload', 'Use when the solution is an application/service pattern rather than managed Agent Runtime', 1165, 232, 210, 82, '#4285F4', ICON.cloudRun));
  c.push(mini('register', 'Register & govern', 'Agent Registry • Agent Identity • Agent Gateway • IAM • Model Armor as required', 1165, 334, 210, 92, '#4285F4'));
  c.push(mini('publish_ge', 'Gemini Enterprise publication', 'Register/share eligible custom agents for the Gemini Enterprise app as a distinct admin action', 1165, 446, 210, 92, '#B83280', '#FDF2F8'));
  c.push(mini('skill_note', 'Skills are a separate content lifecycle', 'A skill package extends the Gemini Enterprise assistant; it is not deployed to Agent Runtime or used inside agents.', 1165, 558, 210, 38, '#B83280', '#FDF2F8'));

  c.push(stage('operate', 6, 'OBSERVE, EVALUATE & IMPROVE', 'Production feedback closes the loop', 1425, '#334155', '#F8FAFC'));
  c.push(card('observability', 'Agent Observability', 'Traces • tool calls • latency • errors • dependencies • MCP/agent behavior', 1445, 130, 210, 86, '#334155'));
  c.push(mini('online_eval', 'Online / scheduled evaluation', 'Continuous quality monitors and regression evaluation on representative production behavior', 1445, 238, 210, 92, '#334155'));
  c.push(mini('quality_alert', 'Quality & safety alerts', 'Alert on defined regressions, abnormal failures, policy violations or risk signals', 1445, 352, 210, 86, '#D93025', '#FFF7F7'));
  c.push(mini('rollback', 'Rollback / disable', 'Known-good release • disable/quarantine path • incident owner • evidence preservation', 1445, 460, 210, 86, '#334155'));
  c.push(mini('feedback', 'Improve', 'Feed failure clusters, user feedback and value signals into the next controlled design iteration', 1445, 568, 210, 28, '#0F8B82', '#ECFDF5'));

  c.push(edge('e12', 'repro', 'repo', 'candidate revision', '#2563EB'));
  c.push(edge('e23', 'approval', 'cloud_build', 'approved change', '#E87900'));
  c.push(edge('e34', 'quality_gate', 'release_record', 'evidence-backed release', '#7B61A8'));
  c.push(edge('e45', 'release_record', 'agent_runtime', 'deploy', '#0F8B82'));
  c.push(edge('e56', 'agent_runtime', 'observability', 'runtime telemetry', '#334155'));
  c.push(edge('eloop', 'feedback', 'studio', 'controlled improvement', '#0F8B82', true, 0, .5, 0, .8));
  c.push(edge('erollback', 'quality_alert', 'release_record', 'rollback / redeploy known-good', '#D93025', true, 0, .5, 1, .7));

  c.push(v('controls', '<b>CROSS-CUTTING RELEASE CONTROLS</b>   IAM & agent identity • secrets • data classification/residency • evaluation evidence • Model Armor policy • audit logs • quotas/cost • change ownership • rollback readiness', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;', 25, 650, 1660, 46));
  c.push(v('metrics', '<b>QUALITY SIGNALS — CONFIGURE FOR THE USE CASE</b><br><span style="font-size:9.4px;color:#64748B">Task success • groundedness/relevance • tool-call correctness • latency • error rate • safety/policy violations • cost per successful task • user feedback. Avoid universal pass percentages; thresholds belong to the product risk policy.</span>', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10.8;align=center;verticalAlign=middle;', 25, 715, 1660, 62));
  c.push(v('legend', '<b>FLOW</b>  <span style="color:#2563EB">━━ source/version</span>  <span style="color:#E87900">━━ reviewed change</span>  <span style="color:#7B61A8">━━ verification</span>  <span style="color:#0F8B82">━━ release/deploy</span>  <span style="color:#D93025">┄┄ rollback</span>  <span style="color:#0F8B82">┄┄ improvement loop</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;', 25, 796, 1660, 38));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="llmops_prompt_config_lifecycle" name="LLMOps and AgentOps Delivery Lifecycle"><mxGraphModel dx="1760" dy="880" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1710" pageHeight="860" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
