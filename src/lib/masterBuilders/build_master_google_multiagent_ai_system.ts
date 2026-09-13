/**
 * 🏛️ Master Blueprint: Google Cloud Multiagent AI System Architecture
 *
 * Source: https://docs.cloud.google.com/static/architecture/images/multiagent-ai-system-architecture.png
 * Visual Contract: 100% Exact 1:1 Ground-Truth Parity
 * - Google Cloud & Region containers
 * - Application users, AI developers, Platform administrators / DevOps engineers
 * - Step sequence badges ❶, ❷, ❸, ❹, ❺
 * - Cloud Run Frontend & Human-in-the-loop return loop
 * - Agents green container with Coordinator Agent, Sequence enclave, Iterative refinement loop, and Response Generator
 * - Agents runtime: Cloud Run or Agent Runtime on Gemini Enterprise Agent Platform or GKE
 * - Model Armor & AI model (Gemini) with Model runtime options
 * - MCP clients routing to Tools within Google Cloud (Databases, APIs) & External tools (Services, Files)
 * - Google Cloud Observability
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICONS = {
  gcpCloud: svg('<path fill="#4285F4" d="M38.5 24.5a8.5 8.5 0 0 0-14.7-5.8A11.5 11.5 0 0 0 11.5 29H11a7 7 0 0 0 0 14h27a6 6 0 0 0 .5-12z"/>'),
  userGroup: svg('<path fill="#334155" d="M16 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm16 4a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-16 6c-6.6 0-14 3.3-14 10v4h28v-4c0-6.7-7.4-10-14-10zm16 2c-.6 0-1.3.1-2 .2 2.5 1.8 4 4.3 4 7.8v4h12v-4c0-5.3-8-8-14-8z"/>'),
  cloudRun: svg('<path fill="#4285F4" d="M9 10l22 14-22 14 9-14z"/><path fill="#7B61FF" d="M26 10l13 14-13 14 6-14z"/>'),
  sparkleAgent: svg('<path fill="#4285F4" d="M24 6l3.5 10.5L38 20l-10.5 3.5L24 34l-3.5-10.5L10 20l10.5-3.5z"/><circle cx="37" cy="11" r="2.5" fill="#34A853"/><circle cx="11" cy="35" r="2" fill="#EA4335"/><circle cx="35" cy="33" r="2" fill="#FBBC04"/>'),
  gemini: svg('<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#7B61FF"/><stop offset="1" stop-color="#D965C5"/></linearGradient></defs><path fill="url(#g)" d="M24 4c2.2 10.2 9.6 17.6 20 20-10.4 2.4-17.8 9.8-20 20-2.2-10.2-9.6-17.6-20-20C14.4 21.6 21.8 14.2 24 4z"/>'),
  gke: svg('<path fill="#326CE5" d="M24 4l18 10.4v20.8L24 46 6 35.2V14.4z"/><path fill="#fff" d="M24 12l10 5.8v11.6L24 35.2 14 29.4V17.8z"/><circle cx="24" cy="23.6" r="3.5" fill="#326CE5"/>'),
  modelArmor: svg('<path fill="#EA4335" d="M24 4L8 10v12c0 10.5 6.8 20.3 16 22 9.2-1.7 16-11.5 16-22V10L24 4z"/><path fill="#fff" d="M24 14a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-5 8h10M24 17v10" stroke="#EA4335" stroke-width="2.5"/>'),
  database: svg('<ellipse cx="24" cy="12" rx="14" ry="5" fill="#475569"/><path d="M10 12v12c0 2.8 6.3 5 14 5s14-2.2 14-5V12" fill="none" stroke="#475569" stroke-width="3"/><path d="M10 24v12c0 2.8 6.3 5 14 5s14-2.2 14-5V24" fill="none" stroke="#475569" stroke-width="3"/>'),
  apiCode: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#F1F5F9" stroke="#475569" stroke-width="2.5"/><path d="M19 18l-6 6 6 6M29 18l6 6-6 6" fill="none" stroke="#0F172A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
  observability: svg('<rect x="6" y="8" width="36" height="32" rx="4" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><path d="M14 34V22M24 34V16M34 34V26" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>'),
  serviceCube: svg('<path fill="#64748B" d="M24 5l17 9.8v19.4L24 44 7 34.2V14.8z"/><path fill="#94A3B8" d="M24 5l17 9.8L24 24.6 7 14.8z"/><path fill="#475569" d="M7 14.8l17 9.8v19.4L7 34.2z"/><path fill="#334155" d="M24 24.6l17-9.8v19.4L24 44z"/>'),
  fileDoc: svg('<path d="M12 6h16l10 10v26H12z" fill="#F1F5F9" stroke="#64748B" stroke-width="2.5"/><path d="M28 6v10h10" fill="none" stroke="#64748B" stroke-width="2.5"/><path d="M18 24h14M18 30h14M18 36h8" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>')
};

export function generateGoogleMultiagentArchitectureXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>'
  ];

  const add = (c: string) => cells.push(c);

  // 1. ACTORS OUTSIDE GOOGLE CLOUD
  // Top Left: Application users
  add(`
    <mxCell id="actor_app_users" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.userGroup}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-weight:bold;font-size:12px;color:#0F172A&quot;&gt;Application users&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="150" y="20" width="180" height="50" as="geometry"/>
    </mxCell>
  `);

  // Top Center: AI developers
  add(`
    <mxCell id="actor_ai_devs" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.userGroup}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-weight:bold;font-size:12px;color:#0F172A&quot;&gt;AI developers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="690" y="20" width="160" height="50" as="geometry"/>
    </mxCell>
  `);

  // Bottom Left: Platform administrators / DevOps engineers
  add(`
    <mxCell id="actor_platform_admins" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.userGroup}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-weight:bold;font-size:11px;color:#0F172A&quot;&gt;Platform administrators&lt;br/&gt;DevOps engineers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="120" y="1180" width="220" height="56" as="geometry"/>
    </mxCell>
  `);

  // 2. GOOGLE CLOUD OUTER CONTAINER
  add(`
    <mxCell id="gcp_container" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#4285F4;strokeWidth=3;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="40" y="110" width="1340" height="1030" as="geometry"/>
    </mxCell>
    <mxCell id="gcp_badge" value="Google Cloud" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#4285F4;strokeColor=#4285F4;fontColor=#FFFFFF;fontSize=18;fontStyle=1;align=left;spacingLeft=16;" vertex="1" parent="1">
      <mxGeometry x="40" y="110" width="220" height="42" as="geometry"/>
    </mxCell>
  `);

  // 3. REGION CONTAINER
  add(`
    <mxCell id="region_container" value="Region" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#4285F4;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;fontSize=13;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
      <mxGeometry x="55" y="165" width="1310" height="960" as="geometry"/>
    </mxCell>
  `);

  // 4. FRONTEND TIER (Cloud Run service)
  add(`
    <mxCell id="card_frontend" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:44px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.cloudRun}&quot; width=&quot;30&quot; height=&quot;30&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:13px;color:#0F172A&quot;&gt;Frontend&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:11px;color:#475569&quot;&gt;Cloud Run service&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="135" y="195" width="210" height="58" as="geometry"/>
    </mxCell>
  `);

  // 5. AGENTS MAIN CONTAINER (Green)
  add(`
    <mxCell id="agents_container" value="Agents" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=#2E7D32;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=10;fontSize=14;fontStyle=1;fontColor=#1B5E20;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="70" y="315" width="680" height="490" as="geometry"/>
    </mxCell>
  `);

  // Coordinator Agent
  add(`
    <mxCell id="card_coordinator" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:44px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;30&quot; height=&quot;30&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:13px;color:#0F172A&quot;&gt;Coordinator&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:11px;color:#475569&quot;&gt;Agent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="180" y="340" width="180" height="56" as="geometry"/>
    </mxCell>
  `);

  // Sequence Dashed Container
  add(`
    <mxCell id="sequence_container" value="Sequence" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#2E7D32;strokeWidth=1.2;dashed=1;verticalAlign=top;align=left;spacingLeft=10;spacingTop=8;fontSize=12;fontColor=#1B5E20;" vertex="1" parent="1">
      <mxGeometry x="85" y="475" width="170" height="215" as="geometry"/>
    </mxCell>
    <mxCell id="card_task_a" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;Task-A&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:10px;color:#475569&quot;&gt;Subagent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="100" y="515" width="140" height="52" as="geometry"/>
    </mxCell>
    <mxCell id="card_task_a1" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;Task-A.1&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:10px;color:#475569&quot;&gt;Subagent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="100" y="618" width="140" height="52" as="geometry"/>
    </mxCell>
  `);

  // Iterative refinement Dashed Container
  add(`
    <mxCell id="refine_container" value="Iterative refinement" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#2E7D32;strokeWidth=1.2;dashed=1;verticalAlign=top;align=right;spacingRight=12;spacingTop=8;fontSize=12;fontColor=#1B5E20;" vertex="1" parent="1">
      <mxGeometry x="280" y="475" width="455" height="215" as="geometry"/>
    </mxCell>
    <mxCell id="card_task_b" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;Task-B&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:10px;color:#475569&quot;&gt;Subagent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="320" y="515" width="155" height="52" as="geometry"/>
    </mxCell>
    <mxCell id="card_quality_evaluator" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;Quality evaluator&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:10px;color:#475569&quot;&gt;Subagent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="295" y="618" width="205" height="52" as="geometry"/>
    </mxCell>
    <mxCell id="card_prompt_enhancer" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:36px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;Prompt enhancer&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:10px;color:#475569&quot;&gt;Subagent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="510" y="565" width="210" height="52" as="geometry"/>
    </mxCell>
  `);

  // Response Generator Subagent
  add(`
    <mxCell id="card_response_generator" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:44px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.sparkleAgent}&quot; width=&quot;30&quot; height=&quot;30&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:13px;color:#0F172A&quot;&gt;Response Generator&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:11px;color:#475569&quot;&gt;Subagent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="155" y="730" width="230" height="56" as="geometry"/>
    </mxCell>
  `);

  // Attached Agents runtime: footer strip
  add(`
    <mxCell id="agents_runtime_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="70" y="805" width="680" height="58" as="geometry"/>
    </mxCell>
    <mxCell id="agents_runtime_lbl" value="Agents&lt;br/&gt;&lt;b&gt;runtime:&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="78" y="810" width="60" height="48" as="geometry"/>
    </mxCell>
    <mxCell id="rt_cloud_run" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center&quot;&gt;&lt;img src=&quot;${ICONS.cloudRun}&quot; width=&quot;20&quot; height=&quot;20&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;text-align:left&quot;&gt;Cloud Run&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
      <mxGeometry x="145" y="814" width="150" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="rt_or_1" value="or" style="text;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor:#475569;" vertex="1" parent="1">
      <mxGeometry x="298" y="820" width="24" height="28" as="geometry"/>
    </mxCell>
    <mxCell id="rt_gemini_platform" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center&quot;&gt;&lt;img src=&quot;${ICONS.gemini}&quot; width=&quot;20&quot; height=&quot;20&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;text-align:left;line-height:1.1&quot;&gt;Agent Runtime on Gemini&lt;br/&gt;Enterprise Agent Platform&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
      <mxGeometry x="325" y="814" width="250" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="rt_or_2" value="or" style="text;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor:#475569;" vertex="1" parent="1">
      <mxGeometry x="578" y="820" width="24" height="28" as="geometry"/>
    </mxCell>
    <mxCell id="rt_gke" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center&quot;&gt;&lt;img src=&quot;${ICONS.gke}&quot; width=&quot;20&quot; height=&quot;20&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;text-align:left&quot;&gt;GKE&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
      <mxGeometry x="605" y="814" width="135" height="40" as="geometry"/>
    </mxCell>
  `);

  // 6. ADK & MODEL INFERENCE
  add(`
    <mxCell id="card_adk" value="&lt;b style=&quot;font-size:13px;color:#0F172A&quot;&gt;ADK&lt;/b&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="765" y="240" width="60" height="68" as="geometry"/>
    </mxCell>
    <mxCell id="card_model_armor" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:40px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.modelArmor}&quot; width=&quot;28&quot; height=&quot;28&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-weight:bold;font-size:12px;color:#0F172A&quot;&gt;Model Armor&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="765" y="405" width="160" height="54" as="geometry"/>
    </mxCell>
    <mxCell id="card_ai_model" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:40px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.gemini}&quot; width=&quot;28&quot; height=&quot;28&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle&quot;&gt;&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;AI model&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:10px;color:#475569&quot;&gt;(e.g., Gemini)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="965" y="405" width="165" height="54" as="geometry"/>
    </mxCell>
  `);

  // Model runtime: column on the right
  add(`
    <mxCell id="lbl_model_runtime" value="&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;Model runtime:&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="1170" y="375" width="140" height="24" as="geometry"/>
    </mxCell>
    <mxCell id="card_mr_gemini" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center&quot;&gt;&lt;img src=&quot;${ICONS.gemini}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;text-align:left;line-height:1.1&quot;&gt;Gemini Enterprise&lt;br/&gt;Agent Platform&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="1165" y="405" width="200" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="lbl_mr_or_1" value="or" style="text;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor:#475569;" vertex="1" parent="1">
      <mxGeometry x="1255" y="460" width="20" height="20" as="geometry"/>
    </mxCell>
    <mxCell id="card_mr_cloud_run" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center&quot;&gt;&lt;img src=&quot;${ICONS.cloudRun}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;text-align:left&quot;&gt;Cloud Run&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="1165" y="485" width="155" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="lbl_mr_or_2" value="or" style="text;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor:#475569;" vertex="1" parent="1">
      <mxGeometry x="1225" y="540" width="20" height="20" as="geometry"/>
    </mxCell>
    <mxCell id="card_mr_gke" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center&quot;&gt;&lt;img src=&quot;${ICONS.gke}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;text-align:left&quot;&gt;GKE&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="1165" y="565" width="110" height="50" as="geometry"/>
    </mxCell>
  `);

  // 7. MCP CLIENTS & DESTINATION TOOLS
  // MCP clients shape (stacked layer dock)
  add(`
    <mxCell id="card_mcp_clients" value="&lt;b style=&quot;font-size:12px;color:#0F172A&quot;&gt;MCP clients&lt;/b&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="765" y="670" width="110" height="42" as="geometry"/>
    </mxCell>
    <mxCell id="dock_line_1" value="" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="1">
      <mxGeometry x="770" y="710" width="100" height="6" as="geometry"/>
    </mxCell>
    <mxCell id="dock_line_2" value="" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="1">
      <mxGeometry x="775" y="715" width="90" height="6" as="geometry"/>
    </mxCell>
  `);

  // Tools within Google Cloud (Dashed Light Blue Container)
  add(`
    <mxCell id="tools_gcp_container" value="&lt;b style=&quot;font-size:11px;color:#0F172A&quot;&gt;Tools within Google Cloud&lt;/b&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#EBF4FF;strokeColor=#3B82F6;strokeWidth=1.2;dashed=1;verticalAlign=bottom;align=center;spacingBottom=10;" vertex="1" parent="1">
      <mxGeometry x="910" y="745" width="220" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="card_db" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;vertical-align:middle;padding-top:4px&quot;&gt;&lt;img src=&quot;${ICONS.database}&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;br/&gt;&lt;b style=&quot;font-size:10px;color:#0F172A&quot;&gt;Databases&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="925" y="760" width="85" height="75" as="geometry"/>
    </mxCell>
    <mxCell id="card_api" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;vertical-align:middle;padding-top:4px&quot;&gt;&lt;img src=&quot;${ICONS.apiCode}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;br/&gt;&lt;b style=&quot;font-size:10px;color:#0F172A&quot;&gt;APIs&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="1025" y="760" width="48" height="75" as="geometry"/>
    </mxCell>
    <mxCell id="dots_gcp" value="&lt;b style=&quot;font-size:18px;color:#0F172A&quot;&gt;...&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="1080" y="780" width="30" height="24" as="geometry"/>
    </mxCell>
  `);

  // Google Cloud Observability
  add(`
    <mxCell id="card_observability" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:38px;text-align:center;vertical-align:middle&quot;&gt;&lt;img src=&quot;${ICONS.observability}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-weight:bold;font-size:11px;color:#0F172A&quot;&gt;Google Cloud Observability&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="610" y="870" width="270" height="52" as="geometry"/>
    </mxCell>
  `);

  // External tools (Dashed Container outside Google Cloud at bottom right)
  add(`
    <mxCell id="external_tools_container" value="&lt;b style=&quot;font-size:11px;color:#0F172A&quot;&gt;External tools&lt;/b&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#334155;strokeWidth=1.2;dashed=1;verticalAlign=bottom;align=center;spacingBottom=10;" vertex="1" parent="1">
      <mxGeometry x="1130" y="990" width="180" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="card_services" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;vertical-align:middle;padding-top:4px&quot;&gt;&lt;img src=&quot;${ICONS.serviceCube}&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;br/&gt;&lt;b style=&quot;font-size:10px;color:#0F172A&quot;&gt;Services&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="1145" y="1005" width="65" height="75" as="geometry"/>
    </mxCell>
    <mxCell id="card_files" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;vertical-align:middle;padding-top:4px&quot;&gt;&lt;img src=&quot;${ICONS.fileDoc}&quot; width=&quot;22&quot; height=&quot;22&quot;/&gt;&lt;br/&gt;&lt;b style=&quot;font-size:10px;color:#0F172A&quot;&gt;Files&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="1220" y="1005" width="50" height="75" as="geometry"/>
    </mxCell>
    <mxCell id="dots_ext" value="&lt;b style=&quot;font-size:18px;color:#0F172A&quot;&gt;...&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="1275" y="1025" width="24" height="24" as="geometry"/>
    </mxCell>
  `);

  // 8. STEP NUMBER BADGES (Green circles with 1, 2, 3, 4, 5)
  const stepBadge = (id: string, num: string, x: number, y: number) => `
    <mxCell id="${id}" value="${num}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#188038;strokeColor=#188038;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="${x}" y="${y}" width="24" height="24" as="geometry"/>
    </mxCell>
  `;

  add(stepBadge('step_1', '1', 190, 85));
  add(`
    <mxCell id="lbl_prompt" value="Prompt" style="text;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor:#0F172A;fontStyle=1;" vertex="1" parent="1">
      <mxGeometry x="220" y="85" width="50" height="24" as="geometry"/>
    </mxCell>
  `);

  add(stepBadge('step_2', '2', 230, 270));

  add(stepBadge('step_3', '3', 258, 415));
  add(`
    <mxCell id="lbl_subagent_invoc" value="Subagent invocation" style="text;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor:#0F172A;fontStyle=1;" vertex="1" parent="1">
      <mxGeometry x="288" y="415" width="130" height="24" as="geometry"/>
    </mxCell>
  `);

  add(stepBadge('step_4', '4', 260, 695));

  add(stepBadge('step_5', '5', 430, 745));

  // 9. CONNECTORS & EDGE FLOWS
  // Edge 1: Application users -> Frontend
  add(`
    <mxCell id="edge_user_to_frontend" edge="1" parent="1" source="actor_app_users" target="card_frontend" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.3;exitY=1;entryX=0.32;entryY=0;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  // Edge: Frontend -> Application users (Human-in-the-loop return)
  add(`
    <mxCell id="edge_hitl_return" edge="1" parent="1" source="card_frontend" target="actor_app_users" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=1;entryY=0.5;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="575" y="224"/>
          <mxPoint x="575" y="45"/>
        </Array>
        <mxPoint as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_hitl" value="Human-in-the-loop interaction" style="text;html=1;align=left;verticalAlign=bottom;fontSize=11;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="385" y="228" width="180" height="20" as="geometry"/>
    </mxCell>
  `);

  // Edge 2: Frontend -> Coordinator Agent
  add(`
    <mxCell id="edge_frontend_to_coord" edge="1" parent="1" source="card_frontend" target="card_coordinator" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.64;exitY=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  // Edge 3: Coordinator -> Sequence & Iterative refinement split
  add(`
    <mxCell id="edge_coord_to_split" edge="1" parent="1" source="card_coordinator" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=none;exitX=0.5;exitY=1;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="270" y="445" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="edge_split_left" edge="1" parent="1" target="card_task_a" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="270" y="445" as="sourcePoint"/>
        <Array as="points">
          <mxPoint x="170" y="445"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="edge_split_right" edge="1" parent="1" target="card_task_b" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="270" y="445" as="sourcePoint"/>
        <Array as="points">
          <mxPoint x="397" y="445"/>
        </Array>
      </mxGeometry>
    </mxCell>
  `);

  // Sequence: Task-A -> Task-A.1
  add(`
    <mxCell id="edge_task_a_to_a1" edge="1" parent="1" source="card_task_a" target="card_task_a1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  // Iterative refinement: Task-B -> Quality evaluator
  add(`
    <mxCell id="edge_task_b_to_eval" edge="1" parent="1" source="card_task_b" target="card_quality_evaluator" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  // Feedback loop: Quality evaluator -> Prompt enhancer
  add(`
    <mxCell id="edge_eval_to_enhancer" edge="1" parent="1" source="card_quality_evaluator" target="card_prompt_enhancer" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=1;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="615" y="644"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_rework" value="If rework is required" style="text;html=1;align=left;verticalAlign=bottom;fontSize=10;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="515" y="648" width="120" height="18" as="geometry"/>
    </mxCell>
  `);

  // Loop back: Prompt enhancer -> Task-B
  add(`
    <mxCell id="edge_enhancer_to_task_b" edge="1" parent="1" source="card_prompt_enhancer" target="card_task_b" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=0;entryX=1;entryY=0.5;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="615" y="541"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_updated_prompt" value="Updated prompt" style="text;html=1;align=left;verticalAlign=bottom;fontSize=10;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="520" y="520" width="95" height="18" as="geometry"/>
    </mxCell>
  `);

  // Step 4 Convergence into Response Generator
  add(`
    <mxCell id="edge_a1_to_resp" edge="1" parent="1" source="card_task_a1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=none;exitX=0.5;exitY=1;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="272" y="707" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="edge_eval_to_resp" edge="1" parent="1" source="card_quality_evaluator" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=none;exitX=0.5;exitY=1;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="272" y="707" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="edge_converge_down" edge="1" parent="1" target="card_response_generator" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="272" y="707" as="sourcePoint"/>
      </mxGeometry>
    </mxCell>
  `);

  // Step 5 Response Return Loop: Response Generator -> Coordinator Agent
  add(`
    <mxCell id="edge_resp_to_coord" edge="1" parent="1" source="card_response_generator" target="card_coordinator" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=1;entryY=0.5;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="715" y="758"/>
          <mxPoint x="715" y="368"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_response" value="Response" style="text;html=1;align=left;verticalAlign=bottom;fontSize=11;fontColor:#0F172A;fontStyle=1;" vertex="1" parent="1">
      <mxGeometry x="465" y="346" width="60" height="20" as="geometry"/>
    </mxCell>
  `);

  // AI developers -> ADK
  add(`
    <mxCell id="edge_ai_dev_to_adk" edge="1" parent="1" source="actor_ai_devs" target="card_adk" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  // Agents -> Model Armor & Inference Flow
  add(`
    <mxCell id="edge_agents_to_armor" edge="1" parent="1" source="agents_container" target="card_model_armor" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.23;entryX=0;entryY=0.5;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="edge_armor_to_ai" edge="1" parent="1" source="card_model_armor" target="card_ai_model" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.35;entryX=0;entryY=0.35;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="lbl_inference_req" value="Inference requests" style="text;html=1;align=center;verticalAlign=bottom;fontSize=11;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="930" y="340" width="120" height="20" as="geometry"/>
    </mxCell>
    <mxCell id="edge_ai_to_armor_return" edge="1" parent="1" source="card_ai_model" target="card_model_armor" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=1;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1047" y="540"/>
          <mxPoint x="845" y="540"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_inference_resp" value="Inference responses" style="text;html=1;align=center;verticalAlign=bottom;fontSize=11;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="880" y="545" width="130" height="20" as="geometry"/>
    </mxCell>
  `);

  // ADK -> AI model inference line
  add(`
    <mxCell id="edge_adk_to_inf" edge="1" parent="1" source="card_adk" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="1047" y="405" as="targetPoint"/>
        <Array as="points">
          <mxPoint x="795" y="340"/>
          <mxPoint x="1047" y="340"/>
        </Array>
      </mxGeometry>
    </mxCell>
  `);

  // MCP Clients connection & drop lines
  add(`
    <mxCell id="edge_mcp_to_db" edge="1" parent="1" source="card_mcp_clients" target="card_db" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="968" y="691"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_mcp_db" value="MCP&lt;br/&gt;servers" style="text;html=1;align=center;verticalAlign=middle;fontSize=9;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="948" y="705" width="40" height="24" as="geometry"/>
    </mxCell>
    <mxCell id="edge_mcp_to_api" edge="1" parent="1" source="card_mcp_clients" target="card_api" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1049" y="691"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_mcp_api" value="MCP&lt;br/&gt;servers" style="text;html=1;align=center;verticalAlign=middle;fontSize=9;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="1029" y="705" width="40" height="24" as="geometry"/>
    </mxCell>
    <mxCell id="edge_mcp_to_services" edge="1" parent="1" source="card_mcp_clients" target="card_services" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1178" y="691"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_mcp_services" value="MCP&lt;br/&gt;servers" style="text;html=1;align=center;verticalAlign=middle;fontSize=9;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="1158" y="930" width="40" height="24" as="geometry"/>
    </mxCell>
    <mxCell id="edge_mcp_to_files" edge="1" parent="1" source="card_mcp_clients" target="card_files" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1245" y="691"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="lbl_mcp_files" value="MCP&lt;br/&gt;servers" style="text;html=1;align=center;verticalAlign=middle;fontSize=9;fontColor:#0F172A;" vertex="1" parent="1">
      <mxGeometry x="1225" y="930" width="40" height="24" as="geometry"/>
    </mxCell>
    <mxCell id="edge_mcp_to_obs" edge="1" parent="1" source="card_mcp_clients" target="card_observability" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  // Platform administrators -> Google Cloud container
  add(`
    <mxCell id="edge_admins_to_gcp" edge="1" parent="1" source="actor_platform_admins" target="gcp_container" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=0;entryX=0.14;entryY=1;">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  `);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net" modified="2026-09-10T23:45:00.000Z" agent="Mozilla/5.0" version="24.4.0" type="device">
  <diagram id="google_multiagent_system_architecture" name="Google Cloud Multiagent AI System Architecture">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1300" math="0" shadow="0">
      <root>
        ${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  return xmlContent;
}
