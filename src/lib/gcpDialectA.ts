/**
 * Google Cloud Solution Architecture (Dialect A) Engine
 * 
 * Implements the official Google Cloud Architecture Center design patterns:
 * - Ground-truth fidelity to docs.cloud.google.com/architecture/multiagent-ai-system
 * - Clean vertical hierarchy: Actors top/bottom, Runtimes & Cores middle, Tools & Storage bottom
 * - Dedicated green Agents enclave (#E6F4EA, border #12B76A) with Coordinator & Subagents
 * - Clockwise collision-free Iterative Refinement loops
 * - Authentic ADK bridging to Model Armor & Gemini Enterprise Agent Platform
 * - MCP clients adapter branching cleanly to internal Google Cloud tools and external SaaS tools
 * - Authentic Google Cloud vector SVGs (Cloud Run, Vertex AI, Gemini, BigQuery, GCS, Spanner, etc.)
 * - Zero line slicing through cards, headers, or runtime strips
 * - Zero external HTTP/CDN icon dependencies
 */

import { GCP_OFFICIAL_ICONS } from './gcpIcons';

export interface GcpComponentDef {
  name: string;
  type: string;
  role: string;
  iconKey: keyof typeof GCP_OFFICIAL_ICONS | string;
  spec: string;
  category: 'actor' | 'ingress' | 'agent' | 'model' | 'tool' | 'storage' | 'security';
}

export interface GcpFlowStep {
  step: string;
  from: string;
  to: string;
  title: string;
  desc: string;
  protocol: string;
}

export interface GcpArchitectureDef {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  officialDocUrl: string;
  author: string;
  overview: string;
  designPatterns: string[];
  productsUsed: string[];
  components: GcpComponentDef[];
  flowSteps: GcpFlowStep[];
  generateXml: (isDark?: boolean) => string;
}

function encodeXml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getIconSvgHtml(iconKey: string, size = 24): string {
  const icon = (GCP_OFFICIAL_ICONS as Record<string, { svg: string }>)[iconKey];
  if (!icon) {
    return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:4px;background:#EFF6FF;color:#1A73E8;"><svg width="${Math.round(size * 0.75)}" height="${Math.round(size * 0.75)}" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg></div>`;
  }
  return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;">${icon.svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</div>`;
}

interface EdgeDef {
  id: string;
  source: string;
  target: string;
  step?: string;
  label?: string;
  labelOffsetX?: number;
  labelOffsetY?: number;
  color?: string;
  dashed?: boolean;
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
  waypoints?: Array<{ x: number; y: number }>;
  edgeStyle?: string;
}

function renderCleanEdge(edge: EdgeDef, isDark = false): string {
  const color = edge.color || '#1A73E8';
  const pillBg = isDark ? '#1E293B' : '#FFFFFF';
  const pillBorder = isDark ? '#475569' : '#CBD5E1';
  const labelTextColor = isDark ? '#F8FAFC' : '#1E293B';

  let labelHtml = '';
  if (edge.step && edge.label) {
    labelHtml =
      `<div style="font-family:'Google Sans',Roboto,sans-serif;display:inline-flex;align-items:center;gap:4px;background:${pillBg};padding:2px 6px;border-radius:12px;border:1px solid ${pillBorder};box-shadow:0 1px 3px rgba(0,0,0,0.08);white-space:nowrap;">` +
      `<span style="color:#FFFFFF;background:${color};font-size:9px;font-weight:800;width:16px;height:16px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;line-height:1;">${encodeXml(edge.step)}</span>` +
      `<span style="color:${labelTextColor};font-size:9px;font-weight:700;">${encodeXml(edge.label)}</span>` +
      `</div>`;
  } else if (edge.step) {
    labelHtml =
      `<div style="font-family:'Google Sans',Roboto,sans-serif;background:${color};color:#FFFFFF;font-size:10px;font-weight:800;width:18px;height:18px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;border:1.5px solid #FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,0.12);">${encodeXml(edge.step)}</div>`;
  } else if (edge.label) {
    labelHtml =
      `<div style="font-family:'Google Sans',Roboto,sans-serif;background:${pillBg};color:${labelTextColor};font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;border:1px solid ${pillBorder};white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.06);">${encodeXml(edge.label)}</div>`;
  }

  let geomInner = '';
  if (edge.waypoints && edge.waypoints.length > 0) {
    geomInner += `<Array as="points">${edge.waypoints.map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array>`;
  }

  const offX = edge.labelOffsetX !== undefined ? edge.labelOffsetX : 0;
  const offY = edge.labelOffsetY !== undefined ? edge.labelOffsetY : 0;
  if (offX !== 0 || offY !== 0) {
    geomInner += `<mxPoint x="${offX}" y="${offY}" as="offset"/>`;
  }

  const exitX = edge.exitX !== undefined ? edge.exitX : 0.5;
  const exitY = edge.exitY !== undefined ? edge.exitY : 1;
  const entryX = edge.entryX !== undefined ? edge.entryX : 0.5;
  const entryY = edge.entryY !== undefined ? edge.entryY : 0;
  const dashStyle = edge.dashed ? 'dashed=1;dashPattern=5 4;' : 'dashed=0;';
  const edgeStyle = edge.edgeStyle || (edge.waypoints && edge.waypoints.length > 0
    ? 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;'
    : 'edgeStyle=none;');

  const valAttr = labelHtml ? `value="${encodeXml(labelHtml)}"` : `value=""`;

  return (
    `<mxCell id="${edge.id}" ${valAttr} style="${edgeStyle}html=1;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};strokeColor=${color};strokeWidth=1.75;${dashStyle}verticalAlign=middle;labelBackgroundColor=none;" edge="1" parent="1" source="${edge.source}" target="${edge.target}">` +
    `<mxGeometry relative="1" as="geometry">${geomInner}</mxGeometry>` +
    `</mxCell>`
  );
}

/**
 * ARCHITECTURE 1: Multi-Agent AI System in Google Cloud
 * Official URL: https://docs.cloud.google.com/architecture/multiagent-ai-system?hl=en
 * 100% fidelity to the published Google Cloud Architecture Center reference diagram
 */
export const GCP_MULTIAGENT_CORE: GcpArchitectureDef = {
  id: 'gcp-multiagent-core',
  title: 'Multi-Agent AI System in Google Cloud',
  subtitle: 'Official Solution Architecture: Coordinator + Sequential & Iterative Refinement Patterns + A2A & MCP',
  category: 'Agentic AI & Orchestration',
  badge: 'OFFICIAL SOLUTION',
  officialDocUrl: 'https://docs.cloud.google.com/architecture/multiagent-ai-system?hl=en',
  author: 'Kumar Dhanagopal | Cross-Product Solution Developer',
  overview:
    'A production reference architecture demonstrating how to design and deploy robust multi-agent AI systems in Google Cloud using the Agent Development Kit (ADK), Agent2Agent (A2A) protocol, Model Context Protocol (MCP), Model Armor, and Gemini Enterprise Agent Platform.',
  designPatterns: [
    'Coordinator Agent Design Pattern',
    'Sequential Subagent Pipeline',
    'Iterative Refinement with Quality Evaluator Feedback Loop',
    'Agent2Agent (A2A) Interoperability Protocol',
    'Model Context Protocol (MCP) Standardized Tool Ingestion',
    'Human-in-the-Loop (HITL) Interaction Path'
  ],
  productsUsed: [
    'Cloud Run (Serverless Agent & MCP Runtime)',
    'Gemini Enterprise Agent Platform',
    'Google Kubernetes Engine (GKE)',
    'Model Armor (Security & Prompt Sanitization)',
    'Agent Development Kit (ADK)',
    'BigQuery MCP Server',
    'Cloud Storage (GCS)',
    'Google Cloud Observability'
  ],
  components: [
    { name: 'Application Users', type: 'Actor', role: 'Submits prompts and interacts with HITL review', iconKey: 'gemini', spec: 'External User', category: 'actor' },
    { name: 'AI Developers', type: 'Actor', role: 'Builds and configures agents using ADK framework', iconKey: 'vertex_ai', spec: 'Developer Persona', category: 'actor' },
    { name: 'Frontend Cloud Run Service', type: 'Serverless App', role: 'Receives user prompts and relays them into the agent system', iconKey: 'cloud_run', spec: 'Cloud Run Service', category: 'ingress' },
    { name: 'Coordinator Agent', type: 'Root Controller', role: 'Root orchestration controller resolving intents and delegating tasks', iconKey: 'vertex_ai', spec: 'ADK Controller', category: 'agent' },
    { name: 'Task-A Subagent', type: 'Domain Worker', role: 'First stage of sequential execution pipeline', iconKey: 'vertex_ai', spec: 'Sequential Worker', category: 'agent' },
    { name: 'Task-A.1 Subagent', type: 'Domain Worker', role: 'Second stage of sequential execution pipeline', iconKey: 'vertex_ai', spec: 'Sequential Worker', category: 'agent' },
    { name: 'Task-B Subagent', type: 'Domain Worker', role: 'Primary generator in iterative refinement loop', iconKey: 'vertex_ai', spec: 'Refinement Worker', category: 'agent' },
    { name: 'Quality Evaluator Subagent', type: 'Critic Agent', role: 'Evaluates task output; routes to Prompt Enhancer if rework is required', iconKey: 'vertex_ai', spec: 'Quality Gate', category: 'agent' },
    { name: 'Prompt Enhancer Subagent', type: 'Correction Agent', role: 'Refines parameters and returns updated prompt back to Task-B', iconKey: 'vertex_ai', spec: 'Prompt Tuner', category: 'agent' },
    { name: 'Response Generator Subagent', type: 'Synthesizer', role: 'Synthesizes final answer from verified subagent outputs', iconKey: 'vertex_ai', spec: 'Grounding Synthesizer', category: 'agent' },
    { name: 'ADK', type: 'Development Kit', role: 'Agent Development Kit coordinating inference requests', iconKey: 'vertex_ai', spec: 'ADK Runtime', category: 'agent' },
    { name: 'Model Armor', type: 'Security Gateway', role: 'Inspects and sanitizes inference requests against prompt injections and leaks', iconKey: 'cloud_armor', spec: 'Security Perimeter', category: 'security' },
    { name: 'AI Model (e.g. Gemini)', type: 'Inference Engine', role: 'Gemini reasoning core serving prompt inferences', iconKey: 'gemini', spec: 'Gemini Platform', category: 'model' },
    { name: 'MCP Clients', type: 'Tool Adapter', role: 'Standardized Model Context Protocol client on agent boundary', iconKey: 'cloud_run', spec: 'MCP Client Adapter', category: 'tool' },
    { name: 'Databases (within Google Cloud)', type: 'Tool Endpoint', role: 'BigQuery / Spanner internal data repositories accessed via MCP', iconKey: 'bigquery', spec: 'Internal DBs', category: 'storage' },
    { name: 'APIs (within Google Cloud)', type: 'Tool Endpoint', role: 'Internal microservice APIs accessed via MCP', iconKey: 'cloud_run', spec: 'Internal APIs', category: 'tool' },
    { name: 'Google Cloud Observability', type: 'Operations', role: 'Cloud Logging, Cloud Monitoring, and Telemetry for agents', iconKey: 'cloud_logging', spec: 'Observability Suite', category: 'tool' },
    { name: 'External Tools (Services & Files)', type: 'External Endpoint', role: 'Third-party SaaS services and partner files outside Google Cloud', iconKey: 'cloud_storage', spec: 'External Systems', category: 'storage' },
    { name: 'Platform Admins / DevOps', type: 'Operations Persona', role: 'Monitors agent performance and manages infrastructure', iconKey: 'cloud_run', spec: 'Operations', category: 'actor' }
  ],
  flowSteps: [
    { step: '1', from: 'Application Users', to: 'Frontend Cloud Run service', title: 'Prompt', desc: 'User submits initial natural language prompt to Cloud Run frontend.', protocol: 'HTTPS' },
    { step: '2', from: 'Frontend Service', to: 'Coordinator Agent', title: 'Forward Prompt', desc: 'Frontend routes prompt down to Coordinator Agent inside the Agents enclave.', protocol: 'gRPC' },
    { step: '3', from: 'Coordinator Agent', to: 'Subagents', title: 'Subagent Invocation', desc: 'Coordinator initiates Sequence (Task-A) and Iterative Refinement (Task-B).', protocol: 'A2A Protocol' },
    { step: '4', from: 'Task-A.1 & Quality Evaluator', to: 'Response Generator', title: 'Convergence', desc: 'Outputs converge at Response Generator subagent for final synthesis.', protocol: 'A2A Protocol' },
    { step: '5', from: 'Response Generator', to: 'Coordinator Agent', title: 'Response', desc: 'Grounded synthesized answer is returned up to Coordinator Agent.', protocol: 'A2A Return' }
  ],
  generateXml: (isDark = false) => {
    const bgCanvas = isDark ? '#0B111E' : '#FFFFFF';
    const gcpBoxBorder = '#1A73E8';
    const cardFill = isDark ? '#1E293B' : '#FFFFFF';
    const cardStroke = isDark ? '#334155' : '#CBD5E1';
    const textColor = isDark ? '#F8FAFC' : '#0F172A';
    const subtextColor = isDark ? '#94A3B8' : '#64748B';

    return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_multiagent_core" name="Multi-Agent AI System in Google Cloud">
    <mxGraphModel dx="1600" dy="1060" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1060" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Canvas Bounds Spacer to guarantee full margin containment -->
        <mxCell id="canvas_bounds_pad" value="" style="strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1600" height="1060" as="geometry"/>
        </mxCell>

        <!-- 1. TOP ACTORS (Outside Google Cloud Box with generous top margin) -->
        <mxCell id="actor_users" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">👥</div><div><div style="font-size:12px;font-weight:800;color:${textColor};">Application users</div><div style="font-size:8px;color:${subtextColor};">Chat UI / SDK Client</div></div></div>`)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="120" y="60" width="180" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="actor_devs" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">💻</div><div><div style="font-size:12px;font-weight:800;color:${textColor};">AI developers</div><div style="font-size:8px;color:#1A73E8;font-weight:700;">ADK Authors</div></div></div>`)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="710" y="60" width="160" height="55" as="geometry"/>
        </mxCell>

        <!-- 2. GOOGLE CLOUD OUTER CONTAINER -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${gcpBoxBorder};strokeWidth=2.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="790" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Multi-Agent AI System</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Architecture Center Official</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- Region Label -->
        <mxCell id="label_region" value="Region" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="85" y="190" width="60" height="20" as="geometry"/>
        </mxCell>

        <!-- Frontend Cloud Run service -->
        <mxCell id="frontend_svc" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_run', 28)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Frontend</div><div style="font-size:9px;color:${subtextColor};">Cloud Run service</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="110" y="215" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- 3. AGENTS CONTAINER (Soft Green #E6F4EA) -->
        <mxCell id="agents_enclave" value="${encodeXml(`<div style="padding:10px 14px;font-family:'Google Sans',sans-serif;font-size:15px;font-weight:800;color:#0D5F3A;">Agents</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B20' : '#E6F4EA'};strokeColor=#12B76A;strokeWidth=2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="80" y="310" width="700" height="530" as="geometry"/>
        </mxCell>

        <!-- Coordinator Agent -->
        <mxCell id="coordinator_agent" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('vertex_ai', 26)}<div><div style="font-size:12.5px;font-weight:800;color:${textColor};">Coordinator</div><div style="font-size:9px;color:#0D5F3A;font-weight:700;">Agent</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="110" y="345" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Sequence Sub-Enclave -->
        <mxCell id="box_sequence" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11.5px;font-weight:800;color:#0D5F3A;">Sequence</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="450" width="200" height="230" as="geometry"/>
        </mxCell>

        <!-- Task-A Subagent -->
        <mxCell id="subagent_task_a" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Task-A</div><div style="font-size:8.5px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="485" width="170" height="55" as="geometry"/>
        </mxCell>

        <!-- Task-A.1 Subagent -->
        <mxCell id="subagent_task_a1" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Task-A.1</div><div style="font-size:8.5px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="595" width="170" height="55" as="geometry"/>
        </mxCell>

        <!-- Iterative Refinement Sub-Enclave -->
        <mxCell id="box_iterative" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:flex-end;"><span style="font-size:11.5px;font-weight:800;color:#0D5F3A;">Iterative refinement</span></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=right;" vertex="1" parent="1">
          <mxGeometry x="320" y="450" width="440" height="230" as="geometry"/>
        </mxCell>

        <!-- Task-B Subagent -->
        <mxCell id="subagent_task_b" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Task-B</div><div style="font-size:8.5px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="485" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Quality Evaluator Subagent -->
        <mxCell id="subagent_evaluator" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Quality evaluator</div><div style="font-size:8.5px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="595" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Prompt Enhancer Subagent -->
        <mxCell id="subagent_enhancer" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Prompt enhancer</div><div style="font-size:8.5px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="570" y="540" width="175" height="55" as="geometry"/>
        </mxCell>

        <!-- Response Generator Subagent -->
        <mxCell id="response_generator_agent" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('gemini', 24)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Response Generator</div><div style="font-size:9px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="140" y="720" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- 4. ADK, MODEL ARMOR & AI MODEL COLUMN -->
        <mxCell id="node_adk" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:${textColor};">ADK</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="310" width="60" height="140" as="geometry"/>
        </mxCell>

        <!-- Model Armor -->
        <mxCell id="node_model_armor" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Model Armor</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="870" y="355" width="150" height="55" as="geometry"/>
        </mxCell>

        <!-- AI Model (e.g., Gemini) -->
        <mxCell id="node_ai_model" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('gemini', 28)}<div><div style="font-size:12px;font-weight:800;color:#1A73E8;">AI model</div><div style="font-size:8.5px;color:${subtextColor};">(e.g., Gemini)</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1060" y="355" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Model Runtime Column (Vertical Stack on Right) -->
        <mxCell id="label_model_runtime" value="Model runtime:" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="1265" y="310" width="120" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="runtime_gemini" value="${encodeXml(`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:6px;height:100%;">${getIconSvgHtml('gemini', 22)}<div style="font-size:10px;font-weight:700;color:${textColor};line-height:1.2;">Gemini Enterprise<br/>Agent Platform</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1265" y="340" width="200" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="text_or_1" value="or" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=10;fontStyle=2;fontColor=${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1350" y="390" width="30" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="runtime_cloudrun" value="${encodeXml(`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:6px;height:100%;">${getIconSvgHtml('cloud_run', 22)}<div style="font-size:10.5px;font-weight:700;color:${textColor};">Cloud Run</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1265" y="410" width="200" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="text_or_2" value="or" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=10;fontStyle=2;fontColor=${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1350" y="455" width="30" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="runtime_gke" value="${encodeXml(`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:6px;height:100%;">${getIconSvgHtml('gke_autopilot', 22)}<div style="font-size:10.5px;font-weight:700;color:${textColor};">GKE</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1265" y="475" width="200" height="42" as="geometry"/>
        </mxCell>

        <!-- 5. BOTTOM RUNTIMES & OBSERVABILITY -->
        <mxCell id="label_agents_runtime" value="Agents runtime:" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="85" y="865" width="100" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="agents_runtime_box" value="${encodeXml(`<div style="display:flex;align-items:center;gap:8px;padding:0 8px;height:100%;font-family:'Google Sans',sans-serif;font-size:9.5px;font-weight:700;color:${textColor};"><div style="display:flex;align-items:center;gap:4px;">${getIconSvgHtml('cloud_run', 18)}<span>Cloud Run</span></div><span style="color:#94A3B8;font-weight:400;">or</span><div style="display:flex;align-items:center;gap:4px;">${getIconSvgHtml('gemini', 18)}<span>Agent Runtime on Gemini Enterprise Agent Platform</span></div><span style="color:#94A3B8;font-weight:400;">or</span><div style="display:flex;align-items:center;gap:4px;">${getIconSvgHtml('gke_autopilot', 18)}<span>GKE</span></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="190" y="855" width="460" height="45" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Observability -->
        <mxCell id="node_observability" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_logging', 22)}<div style="font-size:11px;font-weight:800;color:${textColor};">Google Cloud Observability</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="670" y="855" width="220" height="45" as="geometry"/>
        </mxCell>

        <!-- 6. MCP CLIENTS & TOOLS ENCLAVES -->
        <mxCell id="node_mcp_clients" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:${textColor};">MCP clients</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="700" width="100" height="45" as="geometry"/>
        </mxCell>

        <!-- Tools within Google Cloud Container -->
        <mxCell id="box_tools_gcp" value="${encodeXml(`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">Tools within Google Cloud</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A20' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=bottom;align=left;" vertex="1" parent="1">
          <mxGeometry x="890" y="695" width="260" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="tool_databases" value="${encodeXml(`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="display:flex;gap:4px;">${getIconSvgHtml('bigquery', 20)}${getIconSvgHtml('spanner', 20)}</div><div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:4px;">Databases</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="905" y="710" width="105" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_apis" value="${encodeXml(`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="font-size:18px;">&lt; &gt;</div><div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:4px;">APIs</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1025" y="710" width="75" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_dots_internal" value="..." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=18;fontStyle=1;fontColor=${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1105" y="740" width="30" height="20" as="geometry"/>
        </mxCell>

        <!-- 7. BOTTOM ACTORS & EXTERNAL TOOLS -->
        <mxCell id="actor_devops" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">👥</div><div><div style="font-size:11px;font-weight:800;color:${textColor};">Platform administrators</div><div style="font-size:8.5px;color:${subtextColor};">DevOps engineers</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="955" width="220" height="55" as="geometry"/>
        </mxCell>

        <!-- External Tools Container -->
        <mxCell id="box_external_tools" value="${encodeXml(`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#475569;">External tools</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=bottom;align=left;" vertex="1" parent="1">
          <mxGeometry x="1220" y="850" width="240" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="tool_ext_services" value="${encodeXml(`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="font-size:18px;">📦</div><div style="font-size:10px;font-weight:800;color:${textColor};margin-top:2px;">Services</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1235" y="865" width="85" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_ext_files" value="${encodeXml(`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="font-size:18px;">📄</div><div style="font-size:10px;font-weight:800;color:${textColor};margin-top:2px;">Files</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1335" y="865" width="75" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_dots_ext" value="..." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=18;fontStyle=1;fontColor=${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1415" y="895" width="30" height="20" as="geometry"/>
        </mxCell>

        <!-- 8. CONNECTORS (100% COLLISION-FREE & OFFSET-CALCULATED) -->
        ${renderCleanEdge({ id: 'e1', source: 'actor_users', target: 'frontend_svc', step: '1', label: 'Prompt', labelOffsetX: 35, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e2', source: 'frontend_svc', target: 'coordinator_agent', step: '2', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e_hitl', source: 'frontend_svc', target: 'actor_users', label: 'Human-in-the-loop interaction', labelOffsetY: -12, color: '#475569', exitX: 1, exitY: 0.5, entryX: 0.85, entryY: 1, waypoints: [{ x: 380, y: 245 }, { x: 380, y: 125 }, { x: 273, y: 125 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_devs', source: 'actor_devs', target: 'node_adk', color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'e3_split', source: 'coordinator_agent', target: 'subagent_task_a', step: '3', label: 'Subagent invocation', labelOffsetX: 55, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 210, y: 425 }, { x: 200, y: 425 }] }, isDark)}
        ${renderCleanEdge({ id: 'e3_b', source: 'coordinator_agent', target: 'subagent_task_b', color: '#0F5132', exitX: 0.9, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 290, y: 425 }, { x: 422, y: 425 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_seq', source: 'subagent_task_a', target: 'subagent_task_a1', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'e_iter_down', source: 'subagent_task_b', target: 'subagent_evaluator', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e_iter_rework', source: 'subagent_evaluator', target: 'subagent_enhancer', label: 'If rework is required', labelOffsetY: 12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 530, y: 622 }, { x: 657, y: 622 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_iter_update', source: 'subagent_enhancer', target: 'subagent_task_b', label: 'Updated prompt', labelOffsetY: -12, color: '#0F5132', exitX: 0.5, exitY: 0, entryX: 1, entryY: 0.5, waypoints: [{ x: 657, y: 512 }] }, isDark)}

        ${renderCleanEdge({ id: 'e4_a', source: 'subagent_task_a1', target: 'response_generator_agent', step: '4', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.3, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e4_b', source: 'subagent_evaluator', target: 'response_generator_agent', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.8, entryY: 0, waypoints: [{ x: 422, y: 690 }, { x: 316, y: 690 }] }, isDark)}

        ${renderCleanEdge({ id: 'e5_return', source: 'response_generator_agent', target: 'coordinator_agent', step: '5', label: 'Response', labelOffsetY: -12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 1, entryY: 0.5, waypoints: [{ x: 745, y: 750 }, { x: 745, y: 375 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_inf_req', source: 'node_adk', target: 'node_ai_model', label: 'Inference requests', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.25, entryX: 0.5, entryY: 0, waypoints: [{ x: 1142, y: 345 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_armor_model', source: 'node_model_armor', target: 'node_ai_model', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e_inf_resp', source: 'node_ai_model', target: 'node_adk', label: 'Inference responses', labelOffsetY: 12, color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 1, entryY: 0.85, waypoints: [{ x: 1142, y: 460 }, { x: 840, y: 460 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_obs', source: 'node_adk', target: 'node_observability', color: '#475569', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 790, y: 550 }, { x: 780, y: 550 }] }, isDark)}

        <!-- Discrete Labels Directly Above Tools (Zero Overlapping Text) -->
        <mxCell id="lbl_mcp_db" value="MCP&lt;br/&gt;servers" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=9.5;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="935" y="665" width="45" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mcp_api" value="MCP&lt;br/&gt;servers" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=9.5;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="1040" y="665" width="45" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mcp_svc" value="MCP&lt;br/&gt;servers" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=9.5;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="1255" y="825" width="45" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mcp_files" value="MCP&lt;br/&gt;servers" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=9.5;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="1350" y="825" width="45" height="26" as="geometry"/>
        </mxCell>

        <!-- MCP Bus Lines (High Waypoint Routing Above Tools, Zero Card Slicing) -->
        ${renderCleanEdge({ id: 'e_mcp_db', source: 'node_mcp_clients', target: 'tool_databases', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 957, y: 660 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_mcp_api', source: 'node_mcp_clients', target: 'tool_apis', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1062, y: 660 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_mcp_ext_svc', source: 'node_mcp_clients', target: 'tool_ext_services', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1277, y: 660 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_mcp_ext_files', source: 'node_mcp_clients', target: 'tool_ext_files', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1372, y: 660 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_devops_obs', source: 'actor_devops', target: 'node_observability', color: '#475569', exitX: 0.5, exitY: 0, entryX: 0.3, entryY: 1, waypoints: [{ x: 230, y: 925 }, { x: 736, y: 925 }] }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
};

/**
 * ARCHITECTURE 2: Classify Multimodal Data with Multi-Agent System
 * Official URL: https://docs.cloud.google.com/architecture/agentic-ai-classify-multimodal-data?hl=en
 * 100% fidelity to the published Google Cloud Architecture Center reference diagram
 */
export const GCP_MULTIMODAL_CLASSIFY: GcpArchitectureDef = {
  id: 'gcp-multimodal-classify',
  title: 'Classify Multimodal Data with Multi-Agent System',
  subtitle: 'Official Solution Architecture: Parallel Agent Pattern + Shared Session State + Custom & BigQuery MCP',
  category: 'Multimodal AI & Classification',
  badge: 'OFFICIAL SOLUTION',
  officialDocUrl: 'https://docs.cloud.google.com/architecture/agentic-ai-classify-multimodal-data?hl=en',
  author: 'Samantha He | Technical Writer & Solutions Engineering',
  overview:
    'A specialized multi-agent AI system architecture deploying the parallel agent design pattern to independently analyze images, videos, and structured records. A root coordinator uses shared session state (before_agent_callback) and Gemini multimodal consensus to produce unified, high-confidence classifications.',
  designPatterns: [
    'Parallel Agent Design Pattern',
    'Root Coordinator Pattern on Cloud Run',
    'Shared Session State with before_agent_callback',
    'Specialized Subagents (Image, Video, Structured Data)',
    'Majority Voting Consensus & High-Confidence Fallback',
    'Dual MCP Architecture (Custom MCP Server + BigQuery MCP Server)'
  ],
  productsUsed: [
    'Cloud Run (Root Coordinator & Custom MCP)',
    'Gemini Multimodal Models (Gemini 2.5 Flash / Pro)',
    'Gemini Enterprise Agent Platform',
    'BigQuery (Contextual Logs & Datasets)',
    'Cloud Storage (Raw Multimodal Media Bucket)',
    'Agent Development Kit (ADK)'
  ],
  components: [
    { name: 'Web application', type: 'Ingress Client', role: 'Submits classification requests and receives final confidence outputs', iconKey: 'cloud_run', spec: 'Cloud Run Service', category: 'ingress' },
    { name: 'Root agent (Coordinator)', type: 'Root Controller', role: 'Coordinates parallel subagents and consolidates suggested classifications', iconKey: 'vertex_ai', spec: 'Coordinator', category: 'agent' },
    { name: 'ADK', type: 'Framework', role: 'Agent Development Kit coordinating inference requests', iconKey: 'vertex_ai', spec: 'ADK Adapter', category: 'agent' },
    { name: 'Gemini (Gemini Enterprise Agent Platform)', type: 'Inference Engine', role: 'Multimodal reasoning engine calculating domain confidence', iconKey: 'gemini', spec: 'Enterprise Platform', category: 'model' },
    { name: 'Image analyst (Subagent)', type: 'Specialist Agent', role: 'Analyzes visual textures, artifacts, and image features', iconKey: 'vertex_ai', spec: 'Parallel Worker', category: 'agent' },
    { name: 'Video analyst (Subagent)', type: 'Specialist Agent', role: 'Analyzes temporal video sequences and keyframes', iconKey: 'vertex_ai', spec: 'Parallel Worker', category: 'agent' },
    { name: 'Structured data analyst (Subagent)', type: 'Specialist Agent', role: 'Correlates sensor records and historical tables', iconKey: 'vertex_ai', spec: 'Parallel Worker', category: 'agent' },
    { name: 'Custom MCP server', type: 'Tool Gateway', role: 'Cloud Run remote MCP server fetching raw images and video blobs', iconKey: 'cloud_run', spec: 'Cloud Run Service', category: 'tool' },
    { name: 'BigQuery MCP server', type: 'Tool Gateway', role: 'Google-managed MCP server querying structured datasets', iconKey: 'bigquery', spec: 'Google Managed MCP', category: 'tool' },
    { name: 'Multimodal data (Cloud Storage)', type: 'Media Repository', role: 'Object store housing raw image, video, and audio payloads', iconKey: 'cloud_storage', spec: 'Cloud Storage', category: 'storage' },
    { name: 'Observational data (BigQuery)', type: 'Historical Store', role: 'Contextual tables, audit logs, and timeseries sensor records', iconKey: 'bigquery', spec: 'BigQuery', category: 'storage' }
  ],
  flowSteps: [
    { step: '1', from: 'Web application', to: 'Root agent (Coordinator)', title: 'Request to classify data', desc: 'Web app triggers classification workflow.', protocol: 'HTTPS' },
    { step: '2', from: 'Root agent', to: 'Parallel subagents', title: 'Request to analyze multimodal data', desc: 'Dispatches parallel requests to Image, Video, and Structured analysts.', protocol: 'A2A Protocol' },
    { step: '3a', from: 'Image & Video analysts', to: 'Custom MCP server', title: 'Agent-tool interactions', desc: 'Media analysts query Custom MCP server for raw image/video bytes.', protocol: 'MCP JSON-RPC' },
    { step: '3b', from: 'Structured data analyst', to: 'BigQuery MCP server', title: 'Agent-tool interactions', desc: 'Structured analyst queries BigQuery MCP server for sensor rows.', protocol: 'MCP JSON-RPC' },
    { step: '4', from: 'Parallel subagents', to: 'Root agent', title: 'Suggested classification and confidence level', desc: 'Analysts return suggested labels and confidence distributions.', protocol: 'A2A Return' },
    { step: '5', from: 'Root agent', to: 'Web application', title: 'Final classification', desc: 'Root agent returns winning consensus classification to web app.', protocol: 'JSON Response' }
  ],
  generateXml: (isDark = false) => {
    const bgCanvas = isDark ? '#0B111E' : '#FFFFFF';
    const outerBorder = '#1A73E8';
    const cardFill = isDark ? '#1E293B' : '#FFFFFF';
    const cardStroke = isDark ? '#334155' : '#CBD5E1';
    const textColor = isDark ? '#F8FAFC' : '#0F172A';
    const subtextColor = isDark ? '#94A3B8' : '#64748B';

    return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_multimodal_classify" name="Classify Multimodal Data with Multi-Agent System">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Outer Google Cloud Boundary -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${outerBorder};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="990" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Classify Multimodal Data with Multi-Agent System</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Architecture Center Official</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- Web Application (Cloud Run) at Top -->
        <mxCell id="web_application" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_run', 30)}<div><div style="font-size:13px;font-weight:800;color:${textColor};">Web application</div><div style="font-size:9.5px;color:${subtextColor};">Cloud Run</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="380" y="135" width="240" height="65" as="geometry"/>
        </mxCell>

        <!-- Agent Runtime (Cloud Run) Container -->
        <mxCell id="agent_runtime_box" value="${encodeXml(`<div style="padding:10px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_run', 24)}<div><div style="font-size:13px;font-weight:800;color:${textColor};">Agent runtime</div><div style="font-size:9.5px;color:${subtextColor};">Cloud Run</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.75;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="245" width="880" height="490" as="geometry"/>
        </mxCell>

        <!-- Root Agent (Coordinator) -->
        <mxCell id="root_agent_coord" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('vertex_ai', 26)}<div><div style="font-size:12.5px;font-weight:800;color:${textColor};">Root agent</div><div style="font-size:9.5px;color:${subtextColor};">Coordinator</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="380" y="270" width="240" height="65" as="geometry"/>
        </mxCell>

        <!-- Parallel Agent Execution Enclave (Warm Yellow/Orange) -->
        <mxCell id="parallel_execution_enclave" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:700;color:#92400E;">Parallel agent execution</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#78350F20' : '#FEF3C7'};strokeColor=#F59E0B;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="120" y="380" width="840" height="325" as="geometry"/>
        </mxCell>

        <!-- Image Analyst Subagent -->
        <mxCell id="analyst_image" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('vertex_ai', 24)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Image analyst</div><div style="font-size:9px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="145" y="430" width="230" height="70" as="geometry"/>
        </mxCell>

        <!-- Video Analyst Subagent -->
        <mxCell id="analyst_video" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('vertex_ai', 24)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Video analyst</div><div style="font-size:9px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="425" y="430" width="230" height="70" as="geometry"/>
        </mxCell>

        <!-- Structured Data Analyst Subagent -->
        <mxCell id="analyst_structured" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('vertex_ai', 24)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Structured<br/>data analyst</div><div style="font-size:9px;color:${subtextColor};">Subagent</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="705" y="430" width="230" height="70" as="geometry"/>
        </mxCell>

        <!-- ADK Adapter Box -->
        <mxCell id="adk_box_multi" value="${encodeXml(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;"><div style="font-size:20px;">🤖</div><div style="font-size:11.5px;font-weight:800;color:${textColor};margin-top:2px;">ADK</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="245" width="70" height="85" as="geometry"/>
        </mxCell>

        <!-- Gemini Platform Box -->
        <mxCell id="gemini_platform_card" value="${encodeXml(`<div style="padding:8px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:12px;height:100%;">${getIconSvgHtml('gemini', 34)}<div><div style="font-size:13px;font-weight:800;color:#1A73E8;">Gemini</div><div style="font-size:9.5px;color:${subtextColor};">Gemini Enterprise Agent Platform</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1130" y="250" width="260" height="75" as="geometry"/>
        </mxCell>

        <!-- Custom MCP Server (Cloud Run) -->
        <mxCell id="custom_mcp_server" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_run', 26)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Custom MCP server</div><div style="font-size:9px;color:${subtextColor};">Cloud Run</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="240" y="765" width="280" height="65" as="geometry"/>
        </mxCell>

        <!-- BigQuery MCP Server -->
        <mxCell id="bq_mcp_server" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('bigquery', 26)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">BigQuery MCP server</div><div style="font-size:9px;color:${subtextColor};">Google-managed MCP server</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="660" y="765" width="280" height="65" as="geometry"/>
        </mxCell>

        <!-- Agent Tools Enclave (Soft Blue) -->
        <mxCell id="agent_tools_enclave" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">Agent tools</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A20' : '#DBEAFE'};strokeColor=#3B82F6;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="120" y="870" width="840" height="135" as="geometry"/>
        </mxCell>

        <!-- Multimodal Data (Cloud Storage) -->
        <mxCell id="tool_multimodal_gcs" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_storage', 26)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Multimodal data</div><div style="font-size:9px;color:${subtextColor};">Cloud Storage</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="250" y="905" width="260" height="65" as="geometry"/>
        </mxCell>

        <!-- Observational Data (BigQuery) -->
        <mxCell id="tool_observational_bq" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('bigquery', 26)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Observational data</div><div style="font-size:9px;color:${subtextColor};">BigQuery</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="670" y="905" width="260" height="65" as="geometry"/>
        </mxCell>

        <!-- Connectors (Offset calculated to prevent label overlap) -->
        ${renderCleanEdge({ id: 'e1', source: 'web_application', target: 'root_agent_coord', step: '1', label: 'Request to classify data', labelOffsetX: -75, color: '#1A73E8', exitX: 0.35, exitY: 1, entryX: 0.35, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e5', source: 'root_agent_coord', target: 'web_application', step: '5', label: 'Final classification', labelOffsetX: 65, color: '#1A73E8', exitX: 0.65, exitY: 0, entryX: 0.65, entryY: 1 }, isDark)}

        ${renderCleanEdge({ id: 'e2', source: 'root_agent_coord', target: 'parallel_execution_enclave', step: '2', label: 'Request to analyze multimodal data', labelOffsetX: -90, color: '#1A73E8', exitX: 0.35, exitY: 1, entryX: 0.40, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e4', source: 'parallel_execution_enclave', target: 'root_agent_coord', step: '4', label: 'Suggested classification and confidence level', labelOffsetX: 95, color: '#1A73E8', exitX: 0.52, exitY: 0, entryX: 0.65, entryY: 1 }, isDark)}

        <!-- 3a: Image & Video subagents meeting at central bus before dropping to Custom MCP -->
        ${renderCleanEdge({ id: 'e3a', source: 'analyst_video', target: 'custom_mcp_server', step: '3a', label: 'Agent-tool interactions', labelOffsetX: 65, color: '#1A73E8', exitX: 0.3, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 494, y: 555 }, { x: 380, y: 555 }] }, isDark)}
        ${renderCleanEdge({ id: 'e3a_img', source: 'analyst_image', target: 'custom_mcp_server', color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 260, y: 555 }, { x: 380, y: 555 }] }, isDark)}

        <!-- 3b: Structured data analyst straight down into BigQuery MCP server -->
        ${renderCleanEdge({ id: 'e3b', source: 'analyst_structured', target: 'bq_mcp_server', step: '3b', label: 'Agent-tool interactions', labelOffsetX: 65, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        <!-- Discrete Labels for Fetching Data (Positioned in Open Gap, 0% Collision with Container Border) -->
        <mxCell id="lbl_fetch_gcs" value="Fetch raw unstructured data&lt;br/&gt;E.g images, videos" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=9;fontStyle=0;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="190" y="835" width="175" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_fetch_bq" value="Fetch structured,&lt;br/&gt;tabular data" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=9;fontStyle=0;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="815" y="835" width="145" height="28" as="geometry"/>
        </mxCell>

        ${renderCleanEdge({ id: 'e_gcs_fetch', source: 'tool_multimodal_gcs', target: 'custom_mcp_server', color: '#1E293B', exitX: 0.5, exitY: 0, entryX: 0.5, entryY: 1 }, isDark)}
        ${renderCleanEdge({ id: 'e_bq_fetch', source: 'tool_observational_bq', target: 'bq_mcp_server', color: '#1E293B', exitX: 0.5, exitY: 0, entryX: 0.5, entryY: 1 }, isDark)}

        ${renderCleanEdge({ id: 'e_adk_req', source: 'adk_box_multi', target: 'gemini_platform_card', label: 'Inference requests', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.3, entryX: 0, entryY: 0.3 }, isDark)}
        ${renderCleanEdge({ id: 'e_adk_resp', source: 'gemini_platform_card', target: 'agent_runtime_box', label: 'Inference responses', labelOffsetY: 12, color: '#1E293B', exitX: 0, exitY: 0.8, entryX: 1, entryY: 0.25 }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
};

/**
 * ARCHITECTURE 3: Multi-Tenant Agentic AI System
 * Official URL: https://docs.cloud.google.com/architecture/multi-tenant-agentic-ai-system?hl=en
 */
export const GCP_MULTITENANT_AGENTIC: GcpArchitectureDef = {
  id: 'gcp-multitenant-agentic',
  title: 'Multi-Tenant Agentic AI System in Google Cloud',
  subtitle: 'Official Solution Architecture: Hub-and-Spoke VPC + Service Perimeter + PAB Policies + Tenant Datastores',
  category: 'Enterprise Multi-Tenancy & Zero Trust',
  badge: 'OFFICIAL SOLUTION',
  officialDocUrl: 'https://docs.cloud.google.com/architecture/multi-tenant-agentic-ai-system?hl=en',
  author: 'Google Cloud Architecture Center Team',
  overview:
    'A multi-tenant agentic AI system based on a hub-and-spoke VPC network topology with organization-level VPC Service Controls perimeters. Routes traffic through Cloud Armor, Edge Model Armor, and IAP, isolating each business unit into dedicated tenant projects enforced by Principal Access Boundary (PAB) policies.',
  designPatterns: [
    'Hub-and-Spoke VPC Network Topology',
    'VPC Service Controls (VPC-SC) Organization Perimeter',
    'Edge Inspection: Cloud Armor + Model Armor + IAP',
    'Tenant Isolation via Principal Access Boundary (PAB) Policies',
    'Central Governance, IAM & Security Command Center (SCC)',
    'Tenant-Isolated Datastores with Sovereign RAG Grounding'
  ],
  productsUsed: [
    'External Application Load Balancer (GCLB)',
    'Google Cloud Armor (DDoS, WAF, Bot Defense)',
    'Model Armor (Edge & Tenant-Level Prompt Sanitization)',
    'Identity-Aware Proxy (IAP Zero Trust)',
    'Cloud Run (Frontend Routing Engine)',
    'Security Command Center (SCC Enterprise)',
    'Principal Access Boundary Policies (IAM PAB)',
    'Gemini Enterprise Agent Platform',
    'BigQuery & AlloyDB Tenant Datastores'
  ],
  components: [
    { name: 'External Users & Clients', type: 'Ingress Actor', role: 'Tenant users sending authenticated requests via HTTPS', iconKey: 'gemini', spec: 'TLS 1.3 / mTLS', category: 'actor' },
    { name: 'External App Load Balancer', type: 'Global Ingress', role: 'Layer 7 load balancer with Service Extensions inspecting payloads', iconKey: 'cloud_armor', spec: 'GCLB Anycast', category: 'ingress' },
    { name: 'Cloud Armor & Edge Model Armor', type: 'Edge Defense', role: 'Absorbs DDoS, scrubs OWASP threats, and rejects prompt injections at network edge', iconKey: 'cloud_armor', spec: 'Network Edge Extension', category: 'security' },
    { name: 'Identity-Aware Proxy (IAP)', type: 'Zero-Trust Gate', role: 'Verifies corporate identity, device health, and tenant context', iconKey: 'iap', spec: 'Context-Aware Access', category: 'security' },
    { name: 'Frontend Routing Portal', type: 'Routing Engine', role: 'Extracts tenant ID and routes traffic to target isolated tenant project', iconKey: 'cloud_run', spec: 'Cloud Run Service', category: 'ingress' },
    { name: 'Central Governance Hub', type: 'Security Hub', role: 'Dedicated central project for SCC, IAM, Cloud Logging, and audit monitoring', iconKey: 'scc', spec: 'Org Governance Project', category: 'security' },
    { name: 'Tenant A Project (Finance)', type: 'Isolated Boundary', role: 'Dedicated tenant project isolated by Principal Access Boundary policy', iconKey: 'vertex_ai', spec: 'Tenant Project A', category: 'agent' },
    { name: 'Tenant B Project (Healthcare)', type: 'Isolated Boundary', role: 'Dedicated tenant project isolated by Principal Access Boundary policy', iconKey: 'vertex_ai', spec: 'Tenant Project B', category: 'agent' },
    { name: 'Tenant Model Armor', type: 'Tenant Guardrail', role: 'Inspects tenant prompts and uses Sensitive Data Protection (DLP) for PII masking', iconKey: 'cloud_armor', spec: 'DLP Sensitive Protection', category: 'security' },
    { name: 'Tenant Dedicated Datastores', type: 'Sovereign DB', role: 'AlloyDB / BigQuery maintaining strict data sovereignty with tenant-only access', iconKey: 'spanner', spec: 'Customer-Managed Keys', category: 'storage' },
    { name: 'Gemini Enterprise Platform', type: 'Model Core', role: 'Serves tenant reasoning passes and grounded fact generation', iconKey: 'gemini', spec: 'Gemini 2.5 Pro', category: 'model' }
  ],
  flowSteps: [
    { step: '1', from: 'User Request', to: 'External Load Balancer', title: 'Edge Ingress', desc: 'User request arrives at global External Application Load Balancer.', protocol: 'HTTPS' },
    { step: '2', from: 'GCLB', to: 'Cloud Armor & Edge Model Armor', title: 'Edge Inspection', desc: 'Cloud Armor filters Layer 7 attacks; Model Armor rejects malicious prompt injections.', protocol: 'Service Extension' },
    { step: '3', from: 'Edge Defense', to: 'Identity-Aware Proxy', title: 'Zero-Trust Verification', desc: 'IAP checks user identity, device posture, and role authorization.', protocol: 'Context-Aware' },
    { step: '4', from: 'IAP', to: 'Frontend Routing Portal', title: 'Tenant Identification', desc: 'Frontend portal extracts tenant ID and identifies isolated destination project.', protocol: 'HTTP/2' },
    { step: '5', from: 'Frontend', to: 'Tenant Project (PAB Enforced)', title: 'Isolated Dispatch', desc: 'PAB Policy ensures agent can only access approved tenant resources.', protocol: 'Private Service Connect' },
    { step: '6', from: 'Tenant Agent', to: 'Tenant Model Armor', title: 'PII Masking & DLP', desc: 'Sensitive Data Protection dynamically redacts PII before inference.', protocol: 'mTLS' },
    { step: '7', from: 'Tenant Model Armor', to: 'Gemini & Tenant Datastore', title: 'Grounded Reasoning', desc: 'Gemini queries tenant datastore for factual context.', protocol: 'MCP JSON-RPC' },
    { step: '8', from: 'Tenant Agent', to: 'Frontend & User', title: 'Sanitized Return', desc: 'Final response is scrubbed by Model Armor and returned through GCLB.', protocol: 'HTTPS Streaming' }
  ],
  generateXml: (isDark = false) => {
    const bgCanvas = isDark ? '#0B111E' : '#FFFFFF';
    const outerBorder = '#1A73E8';
    const cardFill = isDark ? '#1E293B' : '#FFFFFF';
    const cardStroke = isDark ? '#334155' : '#CBD5E1';
    const textColor = isDark ? '#F8FAFC' : '#0F172A';
    const subtextColor = isDark ? '#94A3B8' : '#64748B';

    return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_multitenant_agentic" name="Multi-Tenant Agentic AI System in Google Cloud">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Outer Boundary -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${outerBorder};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="1000" as="geometry"/>
        </mxCell>

        <!-- Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Multi-Tenant Agentic AI System (VPC-SC Perimeter)</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Architecture Center Official</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- External Tenant Users Top -->
        <mxCell id="actor_tenant_users" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">🏢</div><div><div style="font-size:12px;font-weight:800;color:${textColor};">Tenant Users</div><div style="font-size:8.5px;color:${subtextColor};">Corporate Identity</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="130" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- Ingress Column: Load Balancer, Armor, IAP, Frontend -->
        <mxCell id="zone_ingress" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#1E40AF;">Central Ingress Hub</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A20' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="235" width="340" height="510" as="geometry"/>
        </mxCell>

        <mxCell id="node_gclb" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">External App Load Balancer</div><div style="font-size:8.5px;color:${subtextColor};">Global L7 Anycast</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="120" y="275" width="300" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_armor_edge" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Cloud Armor &amp; Model Armor</div><div style="font-size:8.5px;color:${subtextColor};">DDoS &amp; Edge Prompt Scrubbing</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="380" width="300" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_iap" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('iap', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Identity-Aware Proxy (IAP)</div><div style="font-size:8.5px;color:${subtextColor};">Zero Trust Identity Verification</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="120" y="485" width="300" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_frontend_portal" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_run', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Frontend Routing Engine</div><div style="font-size:8.5px;color:${subtextColor};">Cloud Run (Tenant Dispatcher)</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="590" width="300" height="60" as="geometry"/>
        </mxCell>

        <!-- Tenant Spokes Enclave -->
        <mxCell id="zone_tenants" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#0D5F3A;">Isolated Tenant Spokes (Principal Access Boundary Enforced)</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B20' : '#E6F4EA'};strokeColor=#12B76A;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="480" y="235" width="580" height="510" as="geometry"/>
        </mxCell>

        <!-- Tenant A Project Box -->
        <mxCell id="box_tenant_a" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#0D5F3A;">Tenant Project A (Finance)</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="500" y="280" width="540" height="195" as="geometry"/>
        </mxCell>

        <mxCell id="agent_tenant_a" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">${getIconSvgHtml('vertex_ai', 20)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">Agent Runtime</div><div style="font-size:8px;color:${subtextColor};">ADK Finance Worker</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="520" y="325" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="armor_tenant_a" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">${getIconSvgHtml('cloud_armor', 20)}<div style="font-size:10.5px;font-weight:800;color:#6B21A8;margin-top:2px;">Model Armor</div><div style="font-size:8px;color:${subtextColor};">DLP PII Redaction</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="695" y="325" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="db_tenant_a" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">${getIconSvgHtml('bigquery', 20)}<div style="font-size:10.5px;font-weight:800;color:#0369A1;margin-top:2px;">BigQuery Finance</div><div style="font-size:8px;color:${subtextColor};">Sovereign Dataset</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="870" y="325" width="150" height="75" as="geometry"/>
        </mxCell>

        <!-- Tenant B Project Box -->
        <mxCell id="box_tenant_b" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#0D5F3A;">Tenant Project B (Healthcare)</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="500" y="505" width="540" height="195" as="geometry"/>
        </mxCell>

        <mxCell id="agent_tenant_b" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">${getIconSvgHtml('vertex_ai', 20)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">Agent Runtime</div><div style="font-size:8px;color:${subtextColor};">ADK Clinical Worker</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="520" y="550" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="armor_tenant_b" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">${getIconSvgHtml('cloud_armor', 20)}<div style="font-size:10.5px;font-weight:800;color:#6B21A8;margin-top:2px;">Model Armor</div><div style="font-size:8px;color:${subtextColor};">HIPAA PHI Redaction</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="695" y="550" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="db_tenant_b" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">${getIconSvgHtml('spanner', 20)}<div style="font-size:10.5px;font-weight:800;color:#0369A1;margin-top:2px;">AlloyDB Healthcare</div><div style="font-size:8px;color:${subtextColor};">Sovereign Dataset</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="870" y="550" width="150" height="75" as="geometry"/>
        </mxCell>

        <!-- Right Column: Governance Hub -->
        <mxCell id="zone_governance" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#475569;">Central Governance &amp; Security Hub</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#33415520' : '#F8FAFC'};strokeColor=#64748B;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="1100" y="235" width="380" height="510" as="geometry"/>
        </mxCell>

        <mxCell id="node_scc" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('scc', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Security Command Center</div><div style="font-size:8.5px;color:${subtextColor};">Threat Detection &amp; Compliance</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1125" y="285" width="330" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_logging" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_logging', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Central Cloud Logging</div><div style="font-size:8.5px;color:${subtextColor};">Aggregated Audit Trails</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1125" y="390" width="330" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_iam" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Cloud IAM &amp; PAB Policies</div><div style="font-size:8.5px;color:${subtextColor};">Principal Access Boundary</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1125" y="495" width="330" height="60" as="geometry"/>
        </mxCell>

        <!-- Bottom Model Platform Box -->
        <mxCell id="bottom_gemini_platform" value="${encodeXml(`<div style="padding:8px 16px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:space-between;height:100%;"><div style="display:flex;align-items:center;gap:12px;">${getIconSvgHtml('gemini', 36)}<div><div style="font-size:13px;font-weight:800;color:#1A73E8;">Gemini Enterprise Agent Platform (Shared Multi-Tenant Inference Core)</div><div style="font-size:8.5px;color:${subtextColor};">Dedicated per-tenant quota allocation with zero cross-tenant learning or logging</div></div></div><div style="display:flex;gap:8px;"><span style="background:#EFF6FF;color:#1D4ED8;font-size:8.5px;font-weight:700;padding:3px 8px;border-radius:4px;border:1px solid #93C5FD;">Zero Data Logging</span><span style="background:#EFF6FF;color:#1D4ED8;font-size:8.5px;font-weight:700;padding:3px 8px;border-radius:4px;border:1px solid #93C5FD;">Dedicated Quotas</span></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E293B' : '#F0F9FF'};strokeColor=#38BDF8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="100" y="785" width="1380" height="85" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        ${renderCleanEdge({ id: 'e1', source: 'actor_tenant_users', target: 'node_gclb', step: '1', label: 'HTTPS request', labelOffsetX: 45, labelOffsetY: -22, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e2', source: 'node_gclb', target: 'node_armor_edge', step: '2', label: 'Edge inspection', labelOffsetX: 40, color: '#9333EA', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e3', source: 'node_armor_edge', target: 'node_iap', step: '3', label: 'Verify identity', labelOffsetX: 40, color: '#1E40AF', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e4', source: 'node_iap', target: 'node_frontend_portal', step: '4', label: 'Tenant identification', labelOffsetX: 45, color: '#2563EB', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'e5_a', source: 'node_frontend_portal', target: 'agent_tenant_a', step: '5a', label: 'Route Tenant A', labelOffsetY: -12, color: '#12B76A', exitX: 1, exitY: 0.3, entryX: 0, entryY: 0.5, waypoints: [{ x: 455, y: 608 }, { x: 455, y: 362 }] }, isDark)}
        ${renderCleanEdge({ id: 'e5_b', source: 'node_frontend_portal', target: 'agent_tenant_b', step: '5b', label: 'Route Tenant B', labelOffsetY: -12, color: '#12B76A', exitX: 1, exitY: 0.7, entryX: 0, entryY: 0.5, waypoints: [{ x: 455, y: 632 }, { x: 455, y: 587 }] }, isDark)}

        ${renderCleanEdge({ id: 'e6_a', source: 'agent_tenant_a', target: 'armor_tenant_a', step: '6', label: 'DLP scrub', labelOffsetY: -12, color: '#9333EA', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e7_a', source: 'armor_tenant_a', target: 'db_tenant_a', step: '7', label: 'MCP query', labelOffsetY: -12, color: '#0284C7', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        ${renderCleanEdge({ id: 'e6_b', source: 'agent_tenant_b', target: 'armor_tenant_b', step: '6', label: 'PHI scrub', labelOffsetY: -12, color: '#9333EA', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e7_b', source: 'armor_tenant_b', target: 'db_tenant_b', step: '7', label: 'MCP query', labelOffsetY: -12, color: '#0284C7', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- Dedicated Private Inference Links to Gemini Enterprise Agent Platform -->
        ${renderCleanEdge({ id: 'e8_a', source: 'agent_tenant_a', target: 'bottom_gemini_platform', color: '#1A73E8', exitX: 0, exitY: 0.8, entryX: 0.25, entryY: 0, waypoints: [{ x: 440, y: 385 }, { x: 440, y: 765 }] }, isDark)}
        ${renderCleanEdge({ id: 'e8_b', source: 'agent_tenant_b', target: 'bottom_gemini_platform', step: '8', label: 'Model inference', labelOffsetX: 55, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.36, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'e_audit', source: 'zone_tenants', target: 'node_logging', label: 'Audit logs', color: '#64748B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5, dashed: true }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
};

/**
 * ARCHITECTURE 4: Autonomous Deep-Sea Robotic Fleet (Dialect A Solution)
 * Strictly grounded in Google Cloud Architecture Center patterns
 */
export const GCP_DEEPSEA_AGENTIC: GcpArchitectureDef = {
  id: 'gcp-deepsea-agentic',
  title: 'Autonomous Deep-Sea Robotic Fleet in Google Cloud',
  subtitle: 'Dialect A Solution: Closed-Loop Agentic Mesh + Acoustic Telemetry + Safety Sandbox & Satellite Downlink',
  category: 'Autonomous Systems & Edge AI',
  badge: 'DIALECT A SOLUTION',
  officialDocUrl: 'https://docs.cloud.google.com/architecture/multiagent-ai-system?hl=en',
  author: 'Antigravity AI Architecture Team (PromptCanvas Dialect A Standard)',
  overview:
    'A mission-critical solution architecture applying the official Google Cloud Architecture Center Dialect A layout to an autonomous deep-sea robotic exploration fleet. Features closed-loop telemetry ingestion, acoustic anomaly detection, iterative navigational trajectory optimization with collision sandbox verification, and autonomous satellite downlink actuation.',
  designPatterns: [
    'Mission Coordinator Agent Pattern',
    'Sequential Ingestion & Telemetry Processing Pipeline',
    'Iterative Refinement: Trajectory Optimizer ⟲ Collision Sandbox Critic',
    'A2A Inter-Agent Protocol for Swarm Coordination',
    'Model Armor Boundary Actuation & Thruster Safety Guards',
    'Model Context Protocol (MCP) Remote Actuation & Spanner Hydrographic Map'
  ],
  productsUsed: [
    'Cloud Pub/Sub (Satellite Acoustic Uplink Stream)',
    'Cloud Run (Mission Coordinator & Custom Subsea MCP)',
    'Gemini 2.5 Pro Multimodal (Acoustic Sonar & Thermal Bathymetry)',
    'Model Armor (Kinematic Boundary & Collision Safeguards)',
    'Cloud Spanner (Global Hydrographic Feature Store nam3)',
    'BigQuery (Subsea Environmental Sensor Lakehouse)'
  ],
  components: [
    { name: 'Fleet Command & Scientists', type: 'Actor', role: 'Oceanographic mission directors providing high-level objectives and review', iconKey: 'gemini', spec: 'Satellite Ops Console', category: 'actor' },
    { name: 'Satellite Ingress (Cloud Pub/Sub)', type: 'Ingress Stream', role: 'Cloud Pub/Sub receiving acoustic and satellite telemetry packets from AUV swarm', iconKey: 'cloud_run', spec: 'Cloud Pub/Sub', category: 'ingress' },
    { name: 'Mission Coordinator Agent', type: 'Root Controller', role: 'Orchestrates swarm missions, verifies health, routes subagent flows', iconKey: 'vertex_ai', spec: 'ADK Coordinator', category: 'agent' },
    { name: 'Telemetry Ingestion Agent', type: 'Domain Worker', role: 'Parses raw acoustic waveforms, CTD sensor data, and IMU inertial telemetry', iconKey: 'vertex_ai', spec: 'Sequential 1', category: 'agent' },
    { name: 'Acoustic Anomaly Detector', type: 'Domain Worker', role: 'Identifies hydrothermal plumes, bathymetric anomalies, and seismic signals', iconKey: 'vertex_ai', spec: 'Sequential 2', category: 'agent' },
    { name: 'Trajectory Planner Subagent', type: 'Domain Worker', role: 'Synthesizes 3D waypoint paths and thruster vectors for autonomous AUVs', iconKey: 'vertex_ai', spec: 'Refinement Worker', category: 'agent' },
    { name: 'Safety Sandbox Critic', type: 'Critic Agent', role: 'Simulates physics collision risks, thermal vent hazards, and battery limits', iconKey: 'vertex_ai', spec: 'Safety Critic', category: 'agent' },
    { name: 'Path Refiner Subagent', type: 'Correction Agent', role: 'Refines thruster vectors and returns updated trajectory to Trajectory Planner', iconKey: 'vertex_ai', spec: 'Path Tuner', category: 'agent' },
    { name: 'Downlink Dispatcher Subagent', type: 'Actuator Synthesizer', role: 'Compiles binary acoustic packets and transmits actuation commands to fleet', iconKey: 'vertex_ai', spec: 'Actuation Generator', category: 'agent' },
    { name: 'Model Armor Kinematics', type: 'Safety Guard', role: 'Enforces kinematic speed limits, depth ceilings, and prevents rogue commands', iconKey: 'cloud_armor', spec: 'Boundary Enforcer', category: 'security' },
    { name: 'Gemini 2.5 Pro Multimodal Core', type: 'Inference Engine', role: 'Cross-modal reasoning over sonar imagery, thermal profiles, and fleet status', iconKey: 'gemini', spec: 'Enterprise Platform', category: 'model' },
    { name: 'Subsea MCP Server', type: 'Tool Gateway', role: 'Model Context Protocol server connecting agents to thruster kinematics API', iconKey: 'cloud_run', spec: 'Cloud Run Remote MCP', category: 'tool' },
    { name: 'Cloud Spanner Hydrographic DB', type: 'Feature Store', role: 'Subsea bathymetric map, seafloor topography, and swarm positioning', iconKey: 'spanner', spec: 'Cloud Spanner nam3', category: 'storage' },
    { name: 'BigQuery Sensor Lakehouse', type: 'Sensor Lakehouse', role: 'Historical timeseries records of benthic currents and salinity', iconKey: 'bigquery', spec: 'BigQuery', category: 'storage' }
  ],
  flowSteps: [
    { step: '1', from: 'AUV Fleet / Satellite', to: 'Cloud Pub/Sub Uplink', title: 'Burst acoustic telemetry', desc: 'Robotic fleet transmits burst acoustic telemetry via surface buoys to satellite.', protocol: 'Iridium / PubSub' },
    { step: '2', from: 'Pub/Sub', to: 'Mission Coordinator', title: 'Eventarc intake', desc: 'Pub/Sub triggers Mission Coordinator running on Cloud Run.', protocol: 'Eventarc' },
    { step: '3', from: 'Coordinator', to: 'Sequential & Refinement Subagents', title: 'Subagent dispatch', desc: 'Coordinator initiates Telemetry Intake and Trajectory Planning.', protocol: 'A2A Protocol' },
    { step: '4', from: 'Anomaly Detector & Sandbox Critic', to: 'Downlink Dispatcher', title: 'Validated routes', desc: 'Cleared trajectories converge at Downlink Dispatcher.', protocol: 'A2A Protocol' },
    { step: '5', from: 'Downlink Dispatcher', to: 'Mission Coordinator', title: 'Flight clearance', desc: 'Mission Coordinator receives verified actuation telecommand.', protocol: 'A2A Return' }
  ],
  generateXml: (isDark = false) => {
    const bgCanvas = isDark ? '#0B111E' : '#FFFFFF';
    const outerBorder = '#1A73E8';
    const cardFill = isDark ? '#1E293B' : '#FFFFFF';
    const cardStroke = isDark ? '#334155' : '#CBD5E1';
    const textColor = isDark ? '#F8FAFC' : '#0F172A';
    const subtextColor = isDark ? '#94A3B8' : '#64748B';

    return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_deepsea_agentic" name="Autonomous Deep-Sea Robotic Fleet in Google Cloud">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Canvas Bounds Spacer to guarantee full margin containment -->
        <mxCell id="canvas_bounds_pad" value="" style="strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1600" height="960" as="geometry"/>
        </mxCell>

        <!-- Top Actors (Outside GCP with generous top margin) -->
        <mxCell id="actor_fleet_cmd" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">🚢</div><div><div style="font-size:12px;font-weight:800;color:${textColor};">Fleet Operations</div><div style="font-size:8px;color:${subtextColor};">Mission Scientists</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="60" width="180" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="actor_auv_swarm" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">🤖</div><div><div style="font-size:12px;font-weight:800;color:${textColor};">AUV Swarm Fleet</div><div style="font-size:8px;color:#2563EB;font-weight:700;">Acoustic Modem</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="710" y="60" width="180" height="55" as="geometry"/>
        </mxCell>

        <!-- Outer Google Cloud Boundary -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${bgCanvas};strokeColor=${outerBorder};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="740" as="geometry"/>
        </mxCell>

        <!-- Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Autonomous Deep-Sea Robotic Fleet (Closed-Loop Agentic Mesh)</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Dialect A Solution Standard</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- Satellite Ingress Gateway -->
        <mxCell id="ingress_pubsub" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_run', 28)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Satellite Ingress</div><div style="font-size:9px;color:${subtextColor};">Cloud Pub/Sub Stream</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="110" y="215" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Agents Enclave -->
        <mxCell id="agents_enclave" value="${encodeXml(`<div style="padding:10px 14px;font-family:'Google Sans',sans-serif;font-size:15px;font-weight:800;color:#0D5F3A;">Agents (Mission Control &amp; Swarm Mesh)</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B20' : '#E6F4EA'};strokeColor=#12B76A;strokeWidth=2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="80" y="310" width="700" height="530" as="geometry"/>
        </mxCell>

        <!-- Mission Coordinator Agent -->
        <mxCell id="mission_coordinator_agent" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('vertex_ai', 26)}<div><div style="font-size:12.5px;font-weight:800;color:${textColor};">Mission coordinator</div><div style="font-size:9px;color:#0D5F3A;font-weight:700;">Agent</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="110" y="345" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Sequence: Telemetry Processing -->
        <mxCell id="box_sequence_deepsea" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11.5px;font-weight:800;color:#0D5F3A;">Sequential telemetry processing</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="450" width="200" height="230" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_telemetry_intake" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Telemetry intake</div><div style="font-size:8.5px;color:${subtextColor};">Acoustic Decoder</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="485" width="170" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_anomaly_detector" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Anomaly detector</div><div style="font-size:8.5px;color:${subtextColor};">Plume Scanner</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="595" width="170" height="55" as="geometry"/>
        </mxCell>

        <!-- Iterative Navigation Refinement Pattern -->
        <mxCell id="box_iterative_deepsea" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:flex-end;"><span style="font-size:11.5px;font-weight:800;color:#0D5F3A;">Iterative navigation refinement</span></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=right;" vertex="1" parent="1">
          <mxGeometry x="320" y="450" width="440" height="230" as="geometry"/>
        </mxCell>

        <!-- Trajectory Planner Subagent -->
        <mxCell id="subagent_trajectory" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Trajectory planner</div><div style="font-size:8.5px;color:${subtextColor};">3D Kinematic Path</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="485" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Safety Sandbox Critic -->
        <mxCell id="subagent_safety_critic" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Safety sandbox</div><div style="font-size:8.5px;color:${subtextColor};">Collision Critic</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="595" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Path Refiner Subagent -->
        <mxCell id="subagent_path_refiner" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Path refiner</div><div style="font-size:8.5px;color:${subtextColor};">Obstacle Avoidance</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="570" y="540" width="175" height="55" as="geometry"/>
        </mxCell>

        <!-- Downlink Dispatcher Subagent -->
        <mxCell id="downlink_dispatcher_agent" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('gemini', 24)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Downlink Dispatcher</div><div style="font-size:9px;color:${subtextColor};">Actuation Telecommand</div></div></div>`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="140" y="720" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- ADK & Model Armor -->
        <mxCell id="node_adk_deepsea" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:${textColor};">ADK</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="310" width="60" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="node_armor_deepsea" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Model Armor Kinematics</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="870" y="355" width="180" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_deepsea" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('gemini', 28)}<div><div style="font-size:12px;font-weight:800;color:#1A73E8;">Gemini 2.5 Pro</div><div style="font-size:8.5px;color:${subtextColor};">Multimodal Sonar Engine</div></div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1090" y="355" width="180" height="55" as="geometry"/>
        </mxCell>

        <!-- Subsea Tools & MCP -->
        <mxCell id="node_mcp_deepsea" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:${textColor};">Subsea MCP</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="700" width="100" height="45" as="geometry"/>
        </mxCell>

        <mxCell id="box_subsea_tools" value="${encodeXml(`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">Subsea Tools &amp; Datastores</div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A20' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=bottom;align=left;" vertex="1" parent="1">
          <mxGeometry x="890" y="695" width="340" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="tool_spanner_subsea" value="${encodeXml(`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">${getIconSvgHtml('spanner', 22)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">Cloud Spanner nam3</div><div style="font-size:8px;color:${subtextColor};">Bathymetric Graph</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="905" y="710" width="145" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_bq_subsea" value="${encodeXml(`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">${getIconSvgHtml('bigquery', 22)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">BigQuery Lakehouse</div><div style="font-size:8px;color:${subtextColor};">Sensor Telemetry</div></div>`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1065" y="710" width="145" height="85" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        ${renderCleanEdge({ id: 'e1', source: 'actor_auv_swarm', target: 'ingress_pubsub', step: '1', label: 'Burst acoustic telemetry', labelOffsetY: -12, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 800, y: 120 }, { x: 210, y: 120 }] }, isDark)}
        ${renderCleanEdge({ id: 'e2', source: 'ingress_pubsub', target: 'mission_coordinator_agent', step: '2', color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'e3_split', source: 'mission_coordinator_agent', target: 'subagent_telemetry_intake', step: '3', label: 'Subagent dispatch', labelOffsetX: 50, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 210, y: 425 }, { x: 200, y: 425 }] }, isDark)}
        ${renderCleanEdge({ id: 'e3_b', source: 'mission_coordinator_agent', target: 'subagent_trajectory', color: '#0F5132', exitX: 0.9, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 290, y: 425 }, { x: 422, y: 425 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_seq', source: 'subagent_telemetry_intake', target: 'subagent_anomaly_detector', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'e_iter_down', source: 'subagent_trajectory', target: 'subagent_safety_critic', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e_iter_rework', source: 'subagent_safety_critic', target: 'subagent_path_refiner', label: 'Obstacle detected', labelOffsetY: 12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 530, y: 622 }, { x: 657, y: 622 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_iter_update', source: 'subagent_path_refiner', target: 'subagent_trajectory', label: 'Recalculate route', labelOffsetY: -12, color: '#0F5132', exitX: 0.5, exitY: 0, entryX: 1, entryY: 0.5, waypoints: [{ x: 657, y: 512 }] }, isDark)}

        ${renderCleanEdge({ id: 'e4_a', source: 'subagent_anomaly_detector', target: 'downlink_dispatcher_agent', step: '4', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.3, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'e4_b', source: 'subagent_safety_critic', target: 'downlink_dispatcher_agent', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.8, entryY: 0, waypoints: [{ x: 422, y: 690 }, { x: 316, y: 690 }] }, isDark)}

        ${renderCleanEdge({ id: 'e5_return', source: 'downlink_dispatcher_agent', target: 'mission_coordinator_agent', step: '5', label: 'Flight clearance', labelOffsetY: -12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 1, entryY: 0.5, waypoints: [{ x: 745, y: 750 }, { x: 745, y: 375 }] }, isDark)}

        ${renderCleanEdge({ id: 'e_inf_req', source: 'node_adk_deepsea', target: 'node_armor_deepsea', label: 'Kinematic check', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e_armor_model', source: 'node_armor_deepsea', target: 'node_gemini_deepsea', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e_inf_resp', source: 'node_gemini_deepsea', target: 'node_adk_deepsea', label: 'Inference response', labelOffsetY: 12, color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 1, entryY: 0.85, waypoints: [{ x: 1180, y: 460 }, { x: 840, y: 460 }] }, isDark)}

        <!-- Discrete Labels Directly Above Subsea Tools (Zero Overlapping Text) -->
        <mxCell id="lbl_subsea_spanner" value="MCP" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=10;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="955" y="665" width="45" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_subsea_bq" value="MCP" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=10;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="1115" y="665" width="45" height="20" as="geometry"/>
        </mxCell>

        <!-- MCP Bus Lines for Subsea MCP (High Waypoint Routing Above Tools, Zero Card Slicing) -->
        ${renderCleanEdge({ id: 'e_mcp_spanner', source: 'node_mcp_deepsea', target: 'tool_spanner_subsea', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 977, y: 660 }] }, isDark)}
        ${renderCleanEdge({ id: 'e_mcp_bq', source: 'node_mcp_deepsea', target: 'tool_bq_subsea', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1137, y: 660 }] }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
};

/**
 * ARCHITECTURE 5: Pharma Drug Discovery Agentic AI Platform on Google Cloud
 * Production-grade solution architecture for enterprise pharmaceutical discovery pipelines.
 * Autonomous In Silico Target-to-Lead Generation: Multi-Agent Mesh, TPU/GPU HPC Simulation & GxP-Compliant Wet Lab Dispatch.
 */
export const GCP_PHARMA_DRUG_DISCOVERY: GcpArchitectureDef = {
  id: 'gcp-pharma-drug-discovery',
  title: 'Pharma Drug Discovery Agentic AI on Google Cloud',
  subtitle: 'Target-to-Lead Generation: Multi-Agent Mesh, TPU/GPU HPC Simulation & GxP-Compliant Wet-Lab Dispatch',
  category: 'Life Sciences & Healthcare',
  badge: 'PRODUCTION BLUEPRINT',
  officialDocUrl: 'https://cloud.google.com/solutions/life-sciences',
  author: 'Google Cloud Life Sciences & DeepMind Health Architecture CoE',
  overview:
    'A production-grade agentic AI architecture engineered for enterprise pharmaceutical discovery pipelines. Implements an autonomous multi-agent mesh combining target validation, pocket druggability, de novo generative chemistry (diffusion/autoregressive SMILES), ADMET-toxicity evaluation, and binding affinity optimization, backed by Cloud TPU v5e AlphaFold 3 / ESMFold runtimes, GROMACS MD on H100 GPUs, Spanner Molecular Graph, BigQuery Lakehouse, and automated wet-lab robotic synthesis dispatch under GxP 21 CFR Part 11 audit compliance.',
  designPatterns: [
    'Autonomous Multi-Agent Orchestration (Coordinator-Worker Mesh)',
    'Sequential Target Validation Pipeline (Genomics -> Structural Pocket)',
    'Iterative Tripartite Generative Chemistry Loop (De Novo Generator <-> ADMET Critic <-> Affinity Optimizer)',
    'HPC Co-Processor Offload (TPU v5e AlphaFold 3 + GPU H100 Molecular Dynamics)',
    'GxP 21 CFR Part 11 Immutable Audit Trail & Cryptographic Provenance',
    'Automated Laboratory Robotics Dispatch (SiLA 2 Protocol over mTLS)'
  ],
  productsUsed: [
    'Vertex AI Gemini 1.5 Pro (Multimodal Chemistry & SMILES Grounding)',
    'Model Armor (Bio-Safety / DURC & Precursor Screening)',
    'Cloud Run (Agent Execution & Discovery Studio Portal)',
    'GKE Autopilot (AlphaFold 3 / ESMFold on Cloud TPU v5e)',
    'Compute Engine HPC (GROMACS MD / Free Energy Perturbation on H100 GPUs)',
    'Cloud Spanner (Global Molecular Knowledge Graph nam3)',
    'BigQuery Lakehouse (HTS Assays & Bioactivity Data)',
    'Cloud Storage (Cryo-EM Densities, PDBs, MD Trajectories)',
    'Cloud Logging & KMS (GxP Part 11 Immutable Audit Trail)',
    'Cloud Pub/Sub (Asynchronous Lab Workcell Event Stream)'
  ],
  components: [
    {
      name: 'Computational Chemists & Biologists',
      type: 'User / Identity',
      role: 'Domain scientists submitting target campaign specifications, review candidate leads, and provide 21 CFR Part 11 electronic sign-off.',
      iconKey: 'user_ingress',
      spec: 'Cloud IAP + BeyondCorp Enterprise Zero Trust with MFA & WebAuthn',
      category: 'actor'
    },
    {
      name: 'Automated Wet-Lab Workcell',
      type: 'Laboratory Hardware',
      role: 'Automated synthesis workstations and liquid handlers executing physical compound synthesis and bioactivity screening assays.',
      iconKey: 'artifact_registry',
      spec: 'SiLA 2 Standard over Private Service Connect & mutual TLS (mTLS)',
      category: 'actor'
    },
    {
      name: 'Discovery Studio Portal Ingress',
      type: 'API Gateway / Web Runtime',
      role: 'Secured entrypoint for discovery campaign intake, target dossier loading, and real-time agent execution telemetry.',
      iconKey: 'cloud_run',
      spec: 'Cloud Run managed container with Cloud Armor WAF & IAP authentication',
      category: 'ingress'
    },
    {
      name: 'Lead Discovery Coordinator Agent',
      type: 'Agentic Coordinator',
      role: 'Master orchestrator managing campaign lifecycle, decomposing goals into subagent tasks, and mediating multi-objective trade-offs.',
      iconKey: 'agent_builder',
      spec: 'Python ADK / ReAct agent runtime on Cloud Run with persistent session state',
      category: 'agent'
    },
    {
      name: 'Target Validation Subagent',
      type: 'Specialized Subagent',
      role: 'Queries GWAS, UniProt, and ChEMBL to validate target biology, genetic evidence, and disease relevance.',
      iconKey: 'vertex_ai',
      spec: 'Sequential worker calling Cloud Spanner Knowledge Graph and PubMed literature RAG',
      category: 'agent'
    },
    {
      name: 'Pocket Druggability Subagent',
      type: 'Specialized Subagent',
      role: 'Analyzes target 3D structures, identifies cryptic allosteric pockets, and dispatches folding jobs to AlphaFold 3.',
      iconKey: 'vertex_ai',
      spec: 'Biophysical analysis worker communicating with GKE Autopilot TPU v5e cluster',
      category: 'agent'
    },
    {
      name: 'De Novo Molecule Generator',
      type: 'Generative Chem Subagent',
      role: 'Generates novel drug-like chemical structures using diffusion and autoregressive models outputting valid canonical SMILES and SELFIES.',
      iconKey: 'vertex_ai',
      spec: 'Generative worker with RDKit stereocenter sanitization and substructure filters',
      category: 'agent'
    },
    {
      name: 'ADMET & Toxicity Critic',
      type: 'Evaluation Subagent',
      role: 'Screens generated candidates against hERG cardiac toxicity, CYP450 inhibition, blood-brain barrier permeability, and oral clearance.',
      iconKey: 'vertex_ai',
      spec: 'Predictive QSAR and GNN models evaluating drug-likeness (Lipinski Rule of 5)',
      category: 'agent'
    },
    {
      name: 'Binding Affinity Optimizer',
      type: 'Optimization Subagent',
      role: 'Calculates binding energy (ΔG), docking poses, and dispatches Free Energy Perturbation (FEP) simulations to H100 GPUs.',
      iconKey: 'vertex_ai',
      spec: 'Iterative lead optimization worker evaluating MM-GBSA and GROMACS trajectories',
      category: 'agent'
    },
    {
      name: 'Synthesis Protocol Dispatcher',
      type: 'Actuation Subagent',
      role: 'Translates validated lead molecules into actionable retrosynthetic pathways and compiles standard SiLA 2 robotic execution scripts.',
      iconKey: 'vertex_ai',
      spec: 'Robotics compiler with automated chemical inventory checking and plate layouts',
      category: 'agent'
    },
    {
      name: 'Vertex AI Gemini 1.5 Pro',
      type: 'Foundation Multimodal Model',
      role: 'Core reasoning engine performing chemistry domain planning, SMILES parsing, and multi-omics scientific literature synthesis.',
      iconKey: 'gemini',
      spec: 'Vertex AI Gemini 1.5 Pro with 2M context window and function calling',
      category: 'model'
    },
    {
      name: 'Model Armor Bio-Safety Guardrail',
      type: 'AI Security Perimeter',
      role: 'Real-time safety guardrail screening prompts and molecular outputs against Dual-Use Research of Concern (DURC) and dangerous toxin lists.',
      iconKey: 'model_armor',
      spec: 'Inline sub-10ms inspection proxy blocking toxic chemical precursors and bioweapon agents',
      category: 'security'
    },
    {
      name: 'AlphaFold 3 & ESMFold Cluster',
      type: 'High-Performance Biocompute',
      role: 'Generates atomic-precision protein-ligand co-folded structures and conformational ensembles.',
      iconKey: 'gke_autopilot',
      spec: 'GKE Autopilot running Google Cloud TPU v5e pods with optimized XLA compilers',
      category: 'tool'
    },
    {
      name: 'GROMACS Molecular Dynamics Cluster',
      type: 'High-Performance Biocompute',
      role: 'Executes high-throughput all-atom molecular dynamics simulations and Free Energy Perturbation (FEP+) for binding affinity scoring.',
      iconKey: 'compute_engine',
      spec: 'Compute Engine HPC cluster with NVIDIA H100 80GB SXM5 GPUs and Slurm orchestrator',
      category: 'tool'
    },
    {
      name: 'Cloud Spanner Molecular Graph',
      type: 'Distributed Database',
      role: 'Stores billion-node target-disease-compound knowledge graph with sub-10ms transactional graph traversals.',
      iconKey: 'spanner',
      spec: 'Cloud Spanner nam3 multi-region with Spanner Graph (ISO GQL)',
      category: 'storage'
    },
    {
      name: 'BigQuery High-Throughput Lakehouse',
      type: 'Analytical Data Lakehouse',
      role: 'Stores petabyte-scale historical bioactivity screening assays, single-cell RNA-seq omics, and virtual docking results.',
      iconKey: 'bigquery',
      spec: 'BigQuery Serverless with BigLake integration and Apache Iceberg open tables',
      category: 'storage'
    },
    {
      name: 'Cloud Storage Structural Repository',
      type: 'Object Storage',
      role: 'Houses cryo-electron microscopy (cryo-EM) density maps, PDB structural coordinates, and trajectory binary trajectories.',
      iconKey: 'cloud_storage',
      spec: 'Dual-Region Cloud Storage (US-CENTRAL1 / US-EAST4) with Turbo Replication',
      category: 'storage'
    },
    {
      name: 'GxP 21 CFR Part 11 Audit Trail',
      type: 'Compliance & Security',
      role: 'Guarantees regulatory compliance through immutable write-once-read-many (WORM) audit logging and cryptographic key signing.',
      iconKey: 'cloud_logging',
      spec: 'Cloud Logging with bucket locks, Cloud Audit Logs, and Cloud KMS customer-managed keys',
      category: 'security'
    }
  ],
  flowSteps: [
    {
      step: '1',
      from: 'actor_chemists',
      to: 'ingress_target_intake',
      title: 'Campaign Initiation',
      desc: 'Computational chemist defines target kinase/protein parameters and initializes discovery campaign in Discovery Studio Portal.',
      protocol: 'HTTPS / TLS 1.3 over Cloud IAP'
    },
    {
      step: '2',
      from: 'ingress_target_intake',
      to: 'agent_coordinator',
      title: 'Campaign Orchestration Kickoff',
      desc: 'Ingress service validates campaign schema and dispatches execution plan to Lead Discovery Coordinator Agent.',
      protocol: 'Internal gRPC / Cloud Run Service-to-Service'
    },
    {
      step: '3',
      from: 'agent_coordinator',
      to: 'subagent_target_val',
      title: 'Target Qualification Dispatch',
      desc: 'Coordinator instructs Target Validation Subagent to query genomic dossiers, UniProt identifiers, and disease associations.',
      protocol: 'Agent2Agent (A2A) Protocol over JSON-RPC'
    },
    {
      step: '4',
      from: 'subagent_target_val',
      to: 'subagent_pocket_druggability',
      title: 'Pocket & Cavity Transfer',
      desc: 'Validated target identifiers and sequence variants are passed to Pocket Druggability Subagent for 3D cavity identification.',
      protocol: 'A2A Protocol with Structural Context'
    },
    {
      step: '5',
      from: 'subagent_pocket_druggability',
      to: 'hpc_alphafold',
      title: 'AlphaFold 3 TPU Inference',
      desc: 'Subagent triggers AlphaFold 3 / ESMFold co-folding run on Cloud TPU v5e to model exact protein-ligand structural ensemble.',
      protocol: 'gRPC over GKE Private Service Connect'
    },
    {
      step: '6',
      from: 'subagent_pocket_druggability',
      to: 'subagent_de_novo',
      title: 'Generative Chemistry Activation',
      desc: 'Binding pocket 3D grid and pharmacophore constraints are transmitted to De Novo Molecule Generator to kick off generative cycles.',
      protocol: 'A2A Protocol / Shared Memory Session'
    },
    {
      step: '7',
      from: 'subagent_de_novo',
      to: 'subagent_admet_critic',
      title: 'Candidate SMILES Ingestion',
      desc: 'Generator synthesizes novel chemical scaffolds (SMILES/SELFIES) and forwards them to ADMET & Toxicity Critic for multi-parameter filtering.',
      protocol: 'A2A Protocol / Batch SMILES Stream'
    },
    {
      step: '8',
      from: 'subagent_admet_critic',
      to: 'subagent_affinity_opt',
      title: 'Affinity & Docking Evaluation',
      desc: 'ADMET-compliant molecules undergo high-precision docking and are dispatched to GROMACS MD cluster on NVIDIA H100 GPUs for ΔΔG scoring.',
      protocol: 'HPC Slurm API / CUDA Acceleration'
    },
    {
      step: '9',
      from: 'subagent_affinity_opt',
      to: 'subagent_de_novo',
      title: 'Iterative SAR Feedback Loop',
      desc: 'Docking clash scores and binding free energy feedback loop back to De Novo Generator for scaffold refinement (Iterative Refinement Loop).',
      protocol: 'Closed-Loop A2A Optimization Stream'
    },
    {
      step: '10',
      from: 'subagent_affinity_opt',
      to: 'agent_lead_selector',
      title: 'Pareto Candidate Ranking',
      desc: 'Converged lead molecules satisfying all affinity and drug-likeness criteria are ranked along a multi-objective Pareto front.',
      protocol: 'A2A Protocol / Candidate Dataframe'
    },
    {
      step: '11',
      from: 'agent_lead_selector',
      to: 'gate_hitl_approval',
      title: 'Human-in-the-Loop Chemist Review',
      desc: 'Top candidates and retrosynthetic routes are presented to the Principal Chemist for 21 CFR Part 11 compliant electronic signature.',
      protocol: 'Discovery Studio UI / 21 CFR Part 11 Sign-Off'
    },
    {
      step: '12',
      from: 'gate_hitl_approval',
      to: 'subagent_synthesis_dispatch',
      title: 'Synthesis Protocol Compilation',
      desc: 'Approved lead compounds are converted into automated liquid handling instructions and plate mapping protocols by Synthesis Dispatcher.',
      protocol: 'SiLA 2 Protocol Definition (XML/JSON)'
    },
    {
      step: '13',
      from: 'subagent_synthesis_dispatch',
      to: 'actor_wet_lab',
      title: 'Wet-Lab Workcell Execution',
      desc: 'SiLA 2 commands are dispatched across Private Service Connect to automated robotic synthesis stations and acoustic dispensing workcells.',
      protocol: 'SiLA 2 Standard over mTLS'
    }
  ],
  generateXml: (isDark = false) => {
    const bgCanvas = isDark ? '#0B1120' : '#FFFFFF';
    const headerFill = isDark ? '#1E293B' : '#F8FAFC';
    const headerStroke = isDark ? '#334155' : '#E2E8F0';
    const agentMeshFill = isDark ? '#064E3B15' : '#E6F4EA';
    const agentMeshStroke = '#12B76A';
    const cardFill = isDark ? '#1E293B' : '#FFFFFF';
    const cardStroke = isDark ? '#334155' : '#D1D5DB';
    const textColor = isDark ? '#F1F5F9' : '#1F2937';
    const subtextColor = isDark ? '#94A3B8' : '#4B5563';

    return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp-pharma-drug-discovery" name="Pharma Drug Discovery Agentic AI on Google Cloud">
    <mxGraphModel dx="1600" dy="1060" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1060" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Canvas Boundary Padding (Prevents Perimeter Clipping) -->
        <mxCell id="canvas_bounds_pad" value="" style="strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1600" height="1060" as="geometry"/>
        </mxCell>

        <!-- Header Banner -->
        <mxCell id="hdr_banner" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;font-family:'Google Sans',Roboto,sans-serif;height:100%;"><div><div style="font-size:18px;font-weight:800;color:${textColor};letter-spacing:-0.02em;">Pharma Drug Discovery Agentic AI Platform on Google Cloud</div><div style="font-size:11.5px;color:${subtextColor};margin-top:2px;">Autonomous In Silico Target-to-Lead Generation: Multi-Agent Mesh, TPU/GPU HPC Simulation &amp; GxP-Compliant Wet Lab Dispatch</div></div><div style="display:flex;align-items:center;gap:12px;"><span style="background:#E0E7FF;color:#3730A3;font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:12px;border:1px solid #C7D2FE;">GxP 21 CFR Part 11 Validated</span><span style="background:#DCFCE7;color:#166534;font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:12px;border:1px solid #BBF7D0;">A2A + SiLA 2 Protocol</span><span style="font-size:11px;font-weight:700;color:#1A73E8;">Google Cloud Architecture Center</span></div></div>`)}" style="rounded=1;arcSize=4;fillColor=${headerFill};strokeColor=${headerStroke};strokeWidth=1.5;html=1;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="40" y="25" width="1520" height="65" as="geometry"/>
        </mxCell>

        <!-- Actor Row: Scientists, DevOps & Wet-Lab Workcell -->
        <mxCell id="actor_chemists" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('user_ingress', 26)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Computational Chemists &amp; Biologists</div><div style="font-size:9px;color:${subtextColor};">Discovery Studio Portal (IAP / WebAuthn)</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="110" width="280" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="actor_devops_bio" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_iam', 24)}<div><div style="font-size:12px;font-weight:800;color:${textColor};">Pharma MLOps &amp; Platform Engineers</div><div style="font-size:9px;color:${subtextColor};">GKE Cloud TPU / HPC Pipelines</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="360" y="110" width="260" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="actor_wet_lab" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('artifact_registry', 26)}<div><div style="font-size:12px;font-weight:800;color:#1E40AF;">Automated Wet-Lab Workcell</div><div style="font-size:9px;color:${subtextColor};">SiLA 2 Robotic Liquid Handlers &amp; Synthesizers</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#3B82F6;strokeWidth=1.75;" vertex="1" parent="1">
          <mxGeometry x="640" y="110" width="290" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="status_banner_gxp" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:space-between;height:100%;"><div><div style="font-size:11.5px;font-weight:800;color:#475569;">GxP 21 CFR Part 11 Regulatory Compliance Perimeter</div><div style="font-size:9px;color:${subtextColor};margin-top:2px;">Electronic Signatures &bull; Immutable Cryptographic Audit Lineage &bull; VPC Service Controls</div></div><div style="background:#E2E8F0;color:#334155;font-size:10px;font-weight:800;padding:4px 8px;border-radius:6px;display:flex;align-items:center;gap:4px;"><span>🔒</span> GxP Certified</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E293B80' : '#F1F5F9'};strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="950" y="110" width="610" height="65" as="geometry"/>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- LEFT TIER: PHARMA DISCOVERY MULTI-AGENT MESH (Google Cloud Run / GKE)     -->
        <!-- ========================================================================= -->
        <mxCell id="box_agents_pharma" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;font-size:12.5px;font-weight:800;color:#027A48;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🧬</span> Pharma Lead Discovery Multi-Agent Mesh (Google Cloud Run / GKE Autopilot)</div>`)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${agentMeshFill};strokeColor=${agentMeshStroke};strokeWidth=2;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="200" width="705" height="825" as="geometry"/>
        </mxCell>

        <!-- Ingress & Master Coordinator -->
        <mxCell id="ingress_target_intake" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_run', 24)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Target Ingestion Service</div><div style="font-size:8.5px;color:${subtextColor};">Cloud Run &bull; Target Dossier Spec</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="240" width="195" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="agent_coordinator" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('agent_builder', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#027A48;">Lead Discovery Coordinator</div><div style="font-size:8.5px;color:${subtextColor};">A2A Mesh &amp; Campaign Planner</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="60" y="325" width="195" height="65" as="geometry"/>
        </mxCell>

        <!-- SUB-CONTAINER 1: Sequential Target & Pocket Qualification -->
        <mxCell id="box_seq_target" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10px;font-weight:800;color:#15803D;">Sequential Target &amp; Pocket Qualification</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B20' : '#F0FDF4'};strokeColor=#16A34A;strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="275" y="235" width="450" height="155" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_target_val" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('vertex_ai', 20)}<span style="font-size:10.5px;font-weight:800;color:${textColor};">Target Validation</span></div><div style="font-size:8px;color:${subtextColor};">GWAS, UniProt, Target Dossier &amp; Genetic Evidence</div><span style="background:#DCFCE7;color:#166534;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Sequential Step 1</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="290" y="270" width="170" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_pocket_druggability" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('vertex_ai', 20)}<span style="font-size:10.5px;font-weight:800;color:${textColor};">Pocket Druggability</span></div><div style="font-size:8px;color:${subtextColor};">AlphaFold DB, Cryptic Allosteric Sites &amp; Cavity Mapping</div><span style="background:#DCFCE7;color:#166534;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Sequential Step 2</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="545" y="270" width="165" height="100" as="geometry"/>
        </mxCell>

        <!-- SUB-CONTAINER 2: Tripartite Iterative Generative Chemistry Loop -->
        <mxCell id="box_iter_chemistry" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10.5px;font-weight:800;color:#15803D;">Tripartite Iterative Generative Chemistry Loop (De Novo &harr; Critic &harr; Affinity)</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B20' : '#F0FDF4'};strokeColor=#16A34A;strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="415" width="665" height="245" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_de_novo" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('vertex_ai', 20)}<span style="font-size:10.5px;font-weight:800;color:${textColor};">De Novo Generator</span></div><div style="font-size:8px;color:${subtextColor};">Diffusion SMILES / SELFIES &bull; Fragment-Based Assembly</div><span style="background:#E0F2FE;color:#0369A1;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Generative Loop 1</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="75" y="455" width="170" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_admet_critic" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('vertex_ai', 20)}<span style="font-size:10.5px;font-weight:800;color:${textColor};">ADMET Toxicity Critic</span></div><div style="font-size:8px;color:${subtextColor};">hERG, CYP450, Clearance, Ames &amp; Blood-Brain Barrier QSAR</div><span style="background:#FEF3C7;color:#B45309;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Critic Loop 2</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="305" y="455" width="175" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_affinity_opt" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('vertex_ai', 20)}<span style="font-size:10px;font-weight:800;color:${textColor};white-space:nowrap;">Binding Affinity Optimizer</span></div><div style="font-size:8px;color:${subtextColor};">MM-GBSA Scoring, Pocket Docking &amp; Scaffold Lead Tuning</div><span style="background:#EDE9FE;color:#6D28D9;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Lead Opt Loop 3</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="540" y="455" width="170" height="105" as="geometry"/>
        </mxCell>

        <!-- SUB-CONTAINER 3: Candidate Selection & Robotic Synthesis Dispatch -->
        <mxCell id="box_synthesis_actuation" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10.5px;font-weight:800;color:#15803D;">Candidate Selection &amp; Robotic Synthesis Dispatch</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B20' : '#F0FDF4'};strokeColor=#16A34A;strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="680" width="665" height="330" as="geometry"/>
        </mxCell>

        <mxCell id="agent_lead_selector" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('agent_builder', 20)}<span style="font-size:10.5px;font-weight:800;color:${textColor};">Lead Candidate Selector</span></div><div style="font-size:8px;color:${subtextColor};">Pareto Front Multi-Objective Optimization (pIC50 &gt; 8.0)</div><span style="background:#DCFCE7;color:#166534;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Pareto Filter</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="75" y="720" width="170" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="gate_hitl_approval" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('iap', 20)}<span style="font-size:10px;font-weight:800;color:#B45309;white-space:nowrap;">Chemist HITL Sign-Off</span></div><div style="font-size:8px;color:${subtextColor};">21 CFR Part 11 Compliant Electronic Signature Gateway</div><span style="background:#FEF3C7;color:#92400E;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">GxP Gate</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="305" y="720" width="180" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_synthesis_dispatch" value="${encodeXml(`<div style="padding:8px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:6px;">${getIconSvgHtml('vertex_ai', 20)}<span style="font-size:10.5px;font-weight:800;color:${textColor};">Synthesis Dispatcher</span></div><div style="font-size:8px;color:${subtextColor};">Retrosynthesis &bull; SiLA 2 Protocol XML Generation</div><span style="background:#E0E7FF;color:#3730A3;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">SiLA 2 Protocol</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="540" y="720" width="170" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_sila_bridge" value="${encodeXml(`<div style="padding:8px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:12px;height:100%;">${getIconSvgHtml('pubsub', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#1E40AF;">SiLA 2 Lab Automation Bridge (Private Service Connect &amp; mTLS)</div><div style="font-size:8.5px;color:${subtextColor};">Dispatches compiled synthesis protocols to robotic liquid handling workcells via Cloud Pub/Sub</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="835" width="635" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_gxp_telemetry" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_logging', 22)}<div><div style="font-size:11px;font-weight:800;color:#DC2626;">GxP Audit Forwarder &amp; Cryptographic Provenance Logger</div><div style="font-size:8.5px;color:${subtextColor};">Captures full prompt lineage, model seeds, and candidate SMILES to Cloud Logging WORM storage</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#EF4444;strokeWidth=1.4;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="75" y="920" width="635" height="60" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- RIGHT TOP: VERTEX AI CORE INTELLIGENCE & BIO-SAFETY PERIMETER             -->
        <!-- ========================================================================= -->
        <mxCell id="box_core_ai_pharma" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#7E22CE;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🧠</span> Vertex AI Core Intelligence &amp; Bio-Safety Perimeter</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E1B4B15' : '#FAF5FF'};strokeColor=#A855F7;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="765" y="200" width="795" height="195" as="geometry"/>
        </mxCell>

        <mxCell id="node_adk_pharma" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;">${getIconSvgHtml('agent_builder', 22)}<div style="font-size:11px;font-weight:800;color:${textColor};margin-top:3px;">A2A Gateway</div><div style="font-size:8px;color:${subtextColor};">ADK Security Proxy</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="785" y="260" width="100" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_armor_pharma" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('model_armor', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Model Armor Bio-Safety</div><div style="font-size:8px;color:${subtextColor};">Dual-Use Research (DURC) &amp; Precursor Filter</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#9333EA;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="950" y="260" width="180" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_pharma" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('gemini', 28)}<div><div style="font-size:12px;font-weight:800;color:#1A73E8;">Vertex AI Gemini 1.5 Pro</div><div style="font-size:8px;color:${subtextColor};">Multimodal Chem &bull; SMILES Parsing &bull; 2M Context</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#1A73E8;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="1160" y="260" width="205" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_chem_rag" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vertex_vector_search', 24)}<div><div style="font-size:11.5px;font-weight:800;color:#4338CA;">Vertex Vector Search</div><div style="font-size:8px;color:${subtextColor};">Patent &amp; ChEMBL Molecular Embeddings</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#6366F1;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="1390" y="260" width="155" height="90" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- RIGHT MIDDLE: HPC SIMULATION & STRUCTURAL BIOCOMPUTE RUNTIMES            -->
        <!-- ========================================================================= -->
        <mxCell id="box_hpc_simulation" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#334155;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">⚡</span> High-Performance Biocompute &amp; Structural Simulation Cluster (Private VPC)</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E293B20' : '#F8FAFC'};strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="765" y="415" width="795" height="240" as="geometry"/>
        </mxCell>

        <mxCell id="hpc_alphafold" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('gke_autopilot', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">GKE Autopilot TPU Cluster</div><div style="font-size:8px;color:#0284C7;font-weight:700;">Cloud TPU v5e Pod Slices</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; AlphaFold 3 / ESMFold Runtimes<br/>&bull; Protein-Ligand Co-Folding<br/>&bull; Sub-Angstrom RMSD Accuracy</div><span style="background:#E0F2FE;color:#0369A1;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">TPU v5e-256</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="785" y="455" width="215" height="175" as="geometry"/>
        </mxCell>

        <mxCell id="hpc_gromacs" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('compute_engine', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Compute Engine HPC</div><div style="font-size:8px;color:#16A34A;font-weight:700;">NVIDIA H100 80GB SXM5</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; GROMACS Molecular Dynamics<br/>&bull; Free Energy Perturbation (FEP+)<br/>&bull; Explicit Solvent Binding &Delta;&Delta;G</div><span style="background:#DCFCE7;color:#166534;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">a3-highgpu-8g</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="1065" y="455" width="215" height="175" as="geometry"/>
        </mxCell>

        <mxCell id="hpc_rdkit" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_run', 24)}<div><div style="font-size:11.5px;font-weight:800;color:${textColor};">Cloud Run GPU Biocompute</div><div style="font-size:8px;color:#9333EA;font-weight:700;">NVIDIA L4 Acceleration</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; RDKit &amp; PyTorch Geometric<br/>&bull; 3D Conformer Ensemble Search<br/>&bull; High-Throughput QSAR Screening</div><span style="background:#F3E8FF;color:#7E22CE;font-size:8px;font-weight:800;padding:2px 6px;border-radius:6px;width:fit-content;">Serverless GPU</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="1340" y="455" width="205" height="175" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- RIGHT BOTTOM: ENTERPRISE PHARMA DATA FABRIC & GXP AUDIT LAKEHOUSE         -->
        <!-- ========================================================================= -->
        <mxCell id="box_data_fabric_pharma" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#1D4ED8;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🗄️</span> Enterprise Pharma Data Fabric &amp; GxP 21 CFR Part 11 Audit Lakehouse</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A15' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="765" y="680" width="795" height="345" as="geometry"/>
        </mxCell>

        <!-- Tool Cards (Row 1) with integrated high-contrast badges -->
        <mxCell id="tool_spanner_kg" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><span style="background:#EFF6FF;color:#1E40AF;font-size:8px;font-weight:800;padding:1px 6px;border-radius:4px;border:1px solid #BFDBFE;margin-bottom:3px;">MCP &bull; Molecular KG</span>${getIconSvgHtml('spanner', 22)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">Cloud Spanner nam3</div><div style="font-size:8px;color:${subtextColor};">Target-Disease Graph</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="785" y="725" width="180" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="tool_bq_assays" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><span style="background:#EFF6FF;color:#1E40AF;font-size:8px;font-weight:800;padding:1px 6px;border-radius:4px;border:1px solid #BFDBFE;margin-bottom:3px;">MCP &bull; HTS Lakehouse</span>${getIconSvgHtml('bigquery', 22)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">BigQuery Lakehouse</div><div style="font-size:8px;color:${subtextColor};">HTS Screening Assays</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="980" y="725" width="180" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="tool_gcs_structures" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><span style="background:#EFF6FF;color:#1E40AF;font-size:8px;font-weight:800;padding:1px 6px;border-radius:4px;border:1px solid #BFDBFE;margin-bottom:3px;">MCP &bull; Cryo-EM / PDB</span>${getIconSvgHtml('cloud_storage', 22)}<div style="font-size:10.5px;font-weight:800;color:${textColor};margin-top:2px;">Cloud Storage Dual-Reg</div><div style="font-size:8px;color:${subtextColor};">Cryo-EM &amp; PDB Files</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="1175" y="725" width="180" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="tool_audit_gxp" value="${encodeXml(`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><span style="background:#FEF2F2;color:#DC2626;font-size:8px;font-weight:800;padding:1px 6px;border-radius:4px;border:1px solid #FECACA;margin-bottom:3px;">GxP Part 11 WORM</span>${getIconSvgHtml('cloud_logging', 22)}<div style="font-size:10.5px;font-weight:800;color:#DC2626;margin-top:2px;">Cloud Logging &amp; KMS</div><div style="font-size:8px;color:${subtextColor};">21 CFR Part 11 Audit</div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#EF4444;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="1370" y="725" width="175" height="110" as="geometry"/>
        </mxCell>

        <!-- Enterprise Integrations (Row 2) -->
        <mxCell id="tool_eln_integration" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('dataflow', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Electronic Lab Notebook (ELN) Connector</div><div style="font-size:8.5px;color:${subtextColor};">Benchling &amp; Dotmatics API via Private Service Connect</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="785" y="860" width="375" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_chembl_pipeline" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('dataplex', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Dataplex Governed Bio-Data Mesh</div><div style="font-size:8.5px;color:${subtextColor};">ChEMBL, PubChem &amp; PDB Automated CDC Ingestion</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="1175" y="860" width="370" height="85" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- CONNECTORS & FLOW EDGES                                                   -->
        <!-- ========================================================================= -->
        ${renderCleanEdge({ id: 'e1_ingress', source: 'actor_chemists', target: 'ingress_target_intake', step: '1', label: 'Target campaign spec', labelOffsetY: -12, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 200, y: 190 }, { x: 157, y: 190 }] }, isDark)}
        ${renderCleanEdge({ id: 'e2_coord', source: 'ingress_target_intake', target: 'agent_coordinator', step: '2', label: 'Dossier load', labelOffsetX: 40, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        <!-- Target Validation & Pocket Druggability: Clean horizontal routing into Step 3 & Step 4 -->
        ${renderCleanEdge({ id: 'e3_target_val', source: 'agent_coordinator', target: 'subagent_target_val', step: '3', label: 'Dispatch target dossier', labelOffsetY: -16, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.85, waypoints: [{ x: 275, y: 357 }] }, isDark)}
        ${renderCleanEdge({ id: 'e4_pocket', source: 'subagent_target_val', target: 'subagent_pocket_druggability', step: '4', label: 'Cavity coords', labelOffsetY: -16, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- AlphaFold HPC Run: Routed cleanly through corridor at x=740 without cutting container borders -->
        ${renderCleanEdge({ id: 'e5_alphafold', source: 'subagent_pocket_druggability', target: 'hpc_alphafold', step: '5', label: 'AlphaFold 3 TPU v5e', labelOffsetY: -16, labelOffsetX: -25, color: '#0284C7', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.25, waypoints: [{ x: 740, y: 320 }, { x: 740, y: 498 }] }, isDark)}

        <!-- Loop Initiation: Pocket -> De Novo Generator -->
        ${renderCleanEdge({ id: 'e6_de_novo', source: 'subagent_pocket_druggability', target: 'subagent_de_novo', step: '6', label: 'Pharmacophore seed', labelOffsetY: -14, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 627, y: 398 }, { x: 160, y: 398 }] }, isDark)}

        <!-- Generative Chemistry Cycle: Widened 60px gaps guarantee zero collision -->
        ${renderCleanEdge({ id: 'e7_critic', source: 'subagent_de_novo', target: 'subagent_admet_critic', step: '7', label: 'Candidate SMILES', labelOffsetY: -16, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e8_opt', source: 'subagent_admet_critic', target: 'subagent_affinity_opt', step: '8', label: 'ADMET-passed leads', labelOffsetY: -16, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- Iterative Feedback Return Loop: Affinity Opt -> De Novo (routed at y=565) -->
        ${renderCleanEdge({ id: 'e_feedback_sar', source: 'subagent_affinity_opt', target: 'subagent_de_novo', label: 'Iterative SAR optimization feedback', labelOffsetY: -12, color: '#0F5132', dashed: true, exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 1, waypoints: [{ x: 625, y: 565 }, { x: 160, y: 565 }] }, isDark)}

        <!-- Candidate Ranking & Pareto Front: Routed at y=645 channel (80px below SAR feedback!) -->
        ${renderCleanEdge({ id: 'e9_ranking', source: 'subagent_affinity_opt', target: 'agent_lead_selector', step: '9', label: 'Top ranked leads (pIC50 &gt; 8.0)', labelOffsetY: -14, color: '#0F5132', exitX: 0.1, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 557, y: 645 }, { x: 160, y: 645 }] }, isDark)}

        <!-- GROMACS MD Simulation Offload: 65px gap between AlphaFold and GROMACS ensures zero slicing -->
        ${renderCleanEdge({ id: 'e_hpc_md', source: 'hpc_alphafold', target: 'hpc_gromacs', label: 'FEP+ / MD on H100', labelOffsetY: -16, color: '#16A34A', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- RDKit Conformer Search: Routed through dedicated channel at y=668, label in open space -->
        ${renderCleanEdge({ id: 'e_rdkit_run', source: 'subagent_de_novo', target: 'hpc_rdkit', label: '3D conformers', labelOffsetY: -14, labelOffsetX: 100, color: '#7E22CE', exitX: 0.85, exitY: 1, entryX: 0.5, entryY: 1, waypoints: [{ x: 220, y: 668 }, { x: 1442, y: 668 }] }, isDark)}

        <!-- HITL Chemist Sign-Off & Synthesis: 60px gaps ensure zero border overlap -->
        ${renderCleanEdge({ id: 'e10_hitl', source: 'agent_lead_selector', target: 'gate_hitl_approval', step: '10', label: 'Pareto candidates', labelOffsetY: -16, color: '#B45309', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e11_dispatch', source: 'gate_hitl_approval', target: 'subagent_synthesis_dispatch', step: '11', label: 'Approved sign-off', labelOffsetY: -16, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e12_sila_compile', source: 'subagent_synthesis_dispatch', target: 'node_sila_bridge', step: '12', label: 'Compile SiLA 2 XML', labelOffsetY: -12, color: '#1E40AF', exitX: 0.5, exitY: 1, entryX: 0.85, entryY: 0, waypoints: [{ x: 625, y: 825 }, { x: 615, y: 825 }] }, isDark)}

        <!-- Wet Lab Workcell Actuation: Routed in open corridor at x=755, label positioned cleanly near actor_wet_lab at y=175 -->
        ${renderCleanEdge({ id: 'e13_wetlab_actuate', source: 'node_sila_bridge', target: 'actor_wet_lab', step: '13', label: 'Robotic execution over mTLS', labelOffsetY: -355, labelOffsetX: 10, color: '#2563EB', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 755, y: 867 }, { x: 755, y: 190 }, { x: 785, y: 190 }] }, isDark)}

        <!-- GxP Audit Log Edge -->
        ${renderCleanEdge({ id: 'e_audit_stream', source: 'node_gxp_telemetry', target: 'tool_audit_gxp', label: 'Immutable WORM audit log', labelOffsetY: 14, color: '#DC2626', dashed: true, exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 755, y: 950 }, { x: 755, y: 950 }, { x: 1457, y: 950 }] }, isDark)}

        <!-- Core AI & Bio-Safety Perimeter Inference Chain: 65px gap ensures zero icon collision -->
        ${renderCleanEdge({ id: 'e_inf_adk_armor', source: 'node_adk_pharma', target: 'node_armor_pharma', label: 'Bio-Safety check', labelOffsetY: -16, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e_inf_armor_gemini', source: 'node_armor_pharma', target: 'node_gemini_pharma', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e_inf_gemini_rag', source: 'node_gemini_pharma', target: 'node_chem_rag', label: 'Bioactive RAG', labelOffsetY: -16, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'e_inf_resp_pharma', source: 'node_gemini_pharma', target: 'node_adk_pharma', label: 'Reasoning &amp; SMILES response', labelOffsetY: 14, color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 1, entryY: 0.85, waypoints: [{ x: 1262, y: 375 }, { x: 885, y: 375 }] }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
};

/**
 * ARCHITECTURE 6: Pharma Drug Discovery Platform - Technical Infrastructure Architecture
 * Production Google Cloud physical/technical deployment blueprint.
 * Multi-Zone VPC Network, Cloud TPU v5e / NVIDIA H100 Slurm Cluster, VPC-SC Perimeter & SiLA 2 Interconnect.
 */
export const GCP_PHARMA_TECHNICAL_INFRASTRUCTURE: GcpArchitectureDef = {
  id: 'gcp-pharma-technical-infrastructure',
  title: 'Pharma Drug Discovery: Technical Infrastructure Blueprint',
  subtitle: 'Production GCP Deployment: Multi-Zone VPC, Cloud TPU v5e/H100 HPC, VPC-SC Perimeter & SiLA 2 Interconnect',
  category: 'Life Sciences & Healthcare',
  badge: 'INFRASTRUCTURE SPEC',
  officialDocUrl: 'https://cloud.google.com/solutions/life-sciences',
  author: 'Google Cloud Life Sciences & DeepMind Infrastructure CoE',
  overview:
    'A concrete production technical infrastructure architecture for enterprise pharmaceutical agentic AI platforms on Google Cloud. Defines the multi-zone VPC network (10.100.0.0/16), Serverless Direct VPC Egress for Cloud Run agent runtimes, GKE Autopilot Cloud TPU v5e pod slices (256 chips), Slurm-orchestrated Compute Engine HPC with 8x NVIDIA H100 GPUs (3.2 Tbps GPUDirect RDMA over RoCEv2), Cloud HSM for GxP 21 CFR Part 11 cryptographic key signing, Private Service Connect endpoints, and 10 Gbps Dedicated Interconnect to on-premises automated robotic wet-lab workcells.',
  designPatterns: [
    'Multi-Zone Private VPC Microsegmentation (Subnet CIDRs 10.100.0.0/16)',
    'VPC Service Controls Perimeter (perimeter-pharma-gxp-prod)',
    'High-Performance GPUDirect RDMA Fabric (3.2 Tbps RoCEv2 on H100 SXM5)',
    'Dedicated TPU v5e Mesh (ct5lp-hightpu-4t OpenXLA Compilation)',
    'GxP 21 CFR Part 11 Cloud HSM Keyrings & CMEK WORM Bucket Lock',
    'Hybrid Robotics Interconnect (10 Gbps Dedicated Interconnect + mTLS)'
  ],
  productsUsed: [
    'VPC Network & Subnets (Multi-Zone CIDRs 10.100.0.0/16)',
    'VPC Service Controls (GxP Security Perimeter)',
    'Global Cloud Load Balancing & Cloud Armor WAF',
    'Cloud Identity & BeyondCorp Enterprise (IAP WebAuthn)',
    'Cloud Run (Serverless VPC Egress Connector)',
    'GKE Autopilot (Cloud TPU v5e Pod Slices, 256 Chips)',
    'Compute Engine HPC (a3-highgpu-8g, 8x H100 80GB SXM5, RoCEv2)',
    'Filestore Enterprise & Cloud Storage FUSE',
    'Cloud Spanner (nam3 Multi-Region, Spanner Graph ISO GQL)',
    'BigQuery Enterprise (Dedicated Slots, BigLake Iceberg)',
    'Cloud Storage Cold Vault (Dual-Region US, WORM Bucket Lock)',
    'Cloud KMS & Cloud HSM (21 CFR Part 11 Electronic Signing)',
    'Cloud Dedicated Interconnect & HA VPN (10 Gbps SiLA 2 mTLS)'
  ],
  components: [
    {
      name: 'Cloud Identity & BeyondCorp Client',
      type: 'Zero Trust Access',
      role: 'Hardware-backed FIDO2 / WebAuthn identity verification for computational chemists and platform administrators.',
      iconKey: 'user_ingress',
      spec: 'BeyondCorp Enterprise with Context-Aware Access and device compliance checking',
      category: 'actor'
    },
    {
      name: 'Global External HTTP(S) Load Balancer',
      type: 'Edge Ingress',
      role: 'Anycast frontend IP terminating client TLS 1.3 / HTTP/3 sessions and routing traffic to IAP.',
      iconKey: 'cloud_armor',
      spec: 'Global Application Load Balancer with Google-managed SSL certificates',
      category: 'ingress'
    },
    {
      name: 'Cloud Armor Enterprise WAF',
      type: 'Edge Security',
      role: 'DDoS mitigation, OWASP Top 10 rule enforcement, rate limiting, and geo-fencing at Google edge.',
      iconKey: 'cloud_armor',
      spec: 'Managed WAF policies with Adaptive Protection ML-based anomaly detection',
      category: 'security'
    },
    {
      name: 'Identity-Aware Proxy (IAP)',
      type: 'Identity Perimeter',
      role: 'Enforces Zero Trust application access and generates signed cryptographic JWT assertion headers.',
      iconKey: 'iap',
      spec: 'IAP with signed header validation and BeyondCorp policy enforcement',
      category: 'security'
    },
    {
      name: 'Serverless VPC Egress Connector',
      type: 'VPC Networking',
      role: 'Enables Cloud Run microservices and agent runtimes to access private VPC IP subnets with zero internet traversal.',
      iconKey: 'cloud_run',
      spec: 'Direct VPC Egress subnet 10.100.30.0/28 with dedicated throughput scaling',
      category: 'ingress'
    },
    {
      name: 'Multi-Agent Orchestrator Runtime',
      type: 'Serverless Compute',
      role: 'Executes Python ADK / LangGraph agent workers in stateless container instances inside private VPC.',
      iconKey: 'agent_builder',
      spec: 'Cloud Run 4 vCPU / 16 GB RAM per instance, min 2 / max 20 autoscaling',
      category: 'agent'
    },
    {
      name: 'Memorystore for Redis Cluster',
      type: 'In-Memory Cache',
      role: 'Low-latency in-memory state store for multi-agent scratchpads, campaign locks, and A2A token streams.',
      iconKey: 'memorystore',
      spec: 'Redis 7.2 Multi-AZ cluster on 10.100.30.32/28 with automated failover',
      category: 'storage'
    },
    {
      name: 'GKE Autopilot TPU v5e Pods',
      type: 'Bio-Computing Cluster',
      role: 'Executes containerized AlphaFold 3 and ESMFold inference workloads on Cloud TPU pod slices.',
      iconKey: 'gke_autopilot',
      spec: 'ct5lp-hightpu-4t nodes (256 TPU v5e chips) with OpenXLA and 16 Gbps ICI mesh',
      category: 'tool'
    },
    {
      name: 'Slurm HPC Cluster (8x H100 SXM5)',
      type: 'High-Performance Computing',
      role: 'Runs all-atom GROMACS molecular dynamics simulations and Free Energy Perturbation (FEP+).',
      iconKey: 'compute_engine',
      spec: 'a3-highgpu-8g instances (8x NVIDIA H100 80GB SXM5, 3.2 Tbps GPUDirect RDMA over RoCEv2)',
      category: 'tool'
    },
    {
      name: 'Filestore Enterprise Tier',
      type: 'High-Speed Shared File System',
      role: 'Shared POSIX NFS file system providing sub-millisecond access to PDB weights and simulation trajectories.',
      iconKey: 'cloud_storage',
      spec: 'Filestore Enterprise on 10.100.12.0/26 with 25 GB/s throughput and 100k IOPS',
      category: 'storage'
    },
    {
      name: 'Cloud Run GPU Conformer Service',
      type: 'GPU Serverless',
      role: 'NVIDIA L4 GPU accelerated microservice running RDKit 3D conformer search and PyTorch Geometric GNNs.',
      iconKey: 'cloud_run',
      spec: 'Cloud Run with NVIDIA L4 (24GB VRAM, g2-standard-8, CUDA 12.2)',
      category: 'tool'
    },
    {
      name: 'Cloud Spanner Molecular Graph nam3',
      type: 'Globally Consistent DB',
      role: 'Enterprise target-disease-compound knowledge graph with Spanner Graph ISO GQL queries.',
      iconKey: 'spanner',
      spec: 'Multi-Region nam3 (Iowa, South Carolina, Northern Virginia) with 4,000 PUs',
      category: 'storage'
    },
    {
      name: 'BigQuery High-Throughput Lakehouse',
      type: 'Analytics Engine',
      role: 'Petabyte-scale analytical storage for high-throughput screening assays, docking poses, and omics.',
      iconKey: 'bigquery',
      spec: 'BigQuery Enterprise Edition with committed reservation slots and BigLake Iceberg tables',
      category: 'storage'
    },
    {
      name: 'Cloud Storage GxP Cold Vault',
      type: 'WORM Object Store',
      role: 'Compliant cryo-EM map and crystallography repository with non-deletable object lock.',
      iconKey: 'cloud_storage',
      spec: 'Dual-Region (US-CENTRAL1 / US-EAST4) with 7-year WORM Bucket Retention Lock',
      category: 'storage'
    },
    {
      name: 'Cloud KMS & Cloud HSM',
      type: 'Cryptographic Security',
      role: 'FIPS 140-2 Level 3 HSM keyrings executing 21 CFR Part 11 compliant digital signatures.',
      iconKey: 'cloud_logging',
      spec: 'Cloud HSM asymmetric RSA-PSS 4096-bit keyrings with non-exportable private keys',
      category: 'security'
    },
    {
      name: 'Dedicated Interconnect & HA VPN',
      type: 'Hybrid Network',
      role: '10 Gbps private fiber connection linking Google Cloud VPC to on-premises wet-lab robotics.',
      iconKey: 'network_services',
      spec: '10 Gbps Cloud Dedicated Interconnect with dual 99.99% SLA BGP peering',
      category: 'ingress'
    },
    {
      name: 'On-Premises SiLA 2 Robotic Workcell',
      type: 'Lab Automation',
      role: 'Automated liquid handling and synthesis workcells actuated via SiLA 2 commands over mTLS.',
      iconKey: 'artifact_registry',
      spec: 'On-Premises Gateway (192.168.100.20) with mTLS client certificate verification',
      category: 'actor'
    }
  ],
  flowSteps: [
    {
      step: '1',
      from: 'actor_scientists',
      to: 'edge_gclb',
      title: 'TLS 1.3 Client Handshake',
      desc: 'Scientist authenticates via BeyondCorp FIDO2 hardware token and establishes TLS 1.3 / HTTP/3 session with GCLB Anycast VIP (34.120.45.10).',
      protocol: 'HTTPS / TLS 1.3 / HTTP/3 QUIC'
    },
    {
      step: '2',
      from: 'edge_gclb',
      to: 'edge_armor',
      title: 'Edge WAF & DDoS Inspection',
      desc: 'Cloud Armor inspects Layer 7 payloads, validates IP reputation, blocks OWASP Top 10 vulnerabilities, and applies rate limiting.',
      protocol: 'Cloud Armor Policy Engine'
    },
    {
      step: '3',
      from: 'edge_armor',
      to: 'edge_iap',
      title: 'Zero-Trust Identity Assertion',
      desc: 'IAP checks user group memberships in Cloud Identity, verifies device compliance, and signs a cryptographic JWT assertion header.',
      protocol: 'OIDC / Signed JWT Header'
    },
    {
      step: '4',
      from: 'edge_iap',
      to: 'node_portal_run',
      title: 'Direct VPC Ingress Dispatch',
      desc: 'Validated traffic routes to Target Ingestion Cloud Run service operating inside Serverless Subnet (10.100.30.0/24).',
      protocol: 'Internal HTTPS over VPC Peering'
    },
    {
      step: '5',
      from: 'node_portal_run',
      to: 'node_orchestrator_pods',
      title: 'Agent Task Decomposition',
      desc: 'Campaign dossier is loaded; Coordinator Agent instantiates specialized worker subagents across Cloud Run instances.',
      protocol: 'gRPC over Serverless VPC Egress'
    },
    {
      step: '6',
      from: 'node_orchestrator_pods',
      to: 'node_redis_cache',
      title: 'A2A State & Scratchpad Caching',
      desc: 'Multi-agent conversation states, scratchpad memories, and tool tokens are persisted in Memorystore Redis (10.100.30.32).',
      protocol: 'RESP3 over TLS on port 6379'
    },
    {
      step: '7',
      from: 'node_orchestrator_pods',
      to: 'node_tpu_slices',
      title: 'AlphaFold 3 TPU v5e Invocation',
      desc: 'Pocket Druggability agent invokes containerized AlphaFold 3 runtime on GKE Cloud TPU v5e pod slices (10.100.10.0/22).',
      protocol: 'gRPC over GKE Service Mesh (Port 50051)'
    },
    {
      step: '8',
      from: 'node_tpu_slices',
      to: 'node_filestore_tpu',
      title: 'PDB Structure & Weights I/O',
      desc: 'AlphaFold models stream structural coordinate tensors and residue distance matrices to Filestore Enterprise at 12 GB/s.',
      protocol: 'POSIX NFSv4.1 over Port 2049'
    },
    {
      step: '9',
      from: 'node_orchestrator_pods',
      to: 'node_slurm_head',
      title: 'Slurm HPC Batch Job Submission',
      desc: 'Binding Affinity Optimizer submits high-precision GROMACS FEP+ simulation batch to Slurm controller (10.100.20.10).',
      protocol: 'Slurmrestd API over HTTPS (Port 6820)'
    },
    {
      step: '10',
      from: 'node_slurm_head',
      to: 'node_h100_cluster',
      title: 'GPUDirect RDMA Molecular Dynamics',
      desc: 'H100 SXM5 GPU worker nodes execute explicit solvent trajectories communicating across 3.2 Tbps RoCEv2 interconnect fabric.',
      protocol: 'GPUDirect RDMA over RoCEv2 Fabric'
    },
    {
      step: '11',
      from: 'node_orchestrator_pods',
      to: 'node_l4_gpu_run',
      title: 'RDKit Conformer Search Acceleration',
      desc: 'De Novo Generator dispatches 3D conformer ensemble search and PyG GNN scoring to serverless NVIDIA L4 GPU instance.',
      protocol: 'gRPC / CUDA 12.2 Runtime'
    },
    {
      step: '12',
      from: 'node_orchestrator_pods',
      to: 'psc_spanner',
      title: 'Spanner Molecular Graph Traversal',
      desc: 'Agents execute ISO GQL queries against multi-region Cloud Spanner knowledge graph via Private Service Connect endpoint (10.100.40.20).',
      protocol: 'gRPC over PSC Endpoint (Port 443)'
    },
    {
      step: '13',
      from: 'node_orchestrator_pods',
      to: 'psc_cloud_hsm',
      title: '21 CFR Part 11 Electronic Signature',
      desc: 'Chemist HITL approval triggers asymmetric signature signing using Cloud HSM FIPS 140-2 Level 3 key, producing immutable PKCS#7 proof.',
      protocol: 'Cloud KMS API / Cloud HSM Signing'
    },
    {
      step: '14',
      from: 'node_orchestrator_pods',
      to: 'node_interconnect',
      title: 'SiLA 2 Protocol Dispatch to Wet-Lab',
      desc: 'Validated retrosynthesis instructions compiled to SiLA 2 XML are routed across 10 Gbps Interconnect over mTLS to robotic liquid handlers.',
      protocol: 'SiLA 2 Standard over mTLS (Port 50051)'
    }
  ],
  generateXml: (isDark = false) => {
    const bgCanvas = isDark ? '#0B1120' : '#FFFFFF';
    const headerFill = isDark ? '#1E293B' : '#F8FAFC';
    const headerStroke = isDark ? '#334155' : '#E2E8F0';
    const cardFill = isDark ? '#1E293B' : '#FFFFFF';
    const cardStroke = isDark ? '#334155' : '#CBD5E1';
    const textColor = isDark ? '#F1F5F9' : '#1F2937';
    const subtextColor = isDark ? '#94A3B8' : '#4B5563';
    const vpcFill = isDark ? '#0F172A40' : '#F8FAFC';
    const vpcStroke = '#6366F1';
    const subnetFill = isDark ? '#1E293B30' : '#F1F5F9';
    const subnetStroke = isDark ? '#475569' : '#94A3B8';
    return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp-pharma-technical-infrastructure" name="Pharma Drug Discovery Platform: Technical Infrastructure Architecture">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="990" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Canvas Boundary Padding -->
        <mxCell id="canvas_bounds_pad" value="" style="strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1600" height="990" as="geometry"/>
        </mxCell>

        <!-- Header Banner -->
        <mxCell id="hdr_banner" value="${encodeXml(`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;font-family:'Google Sans',Roboto,sans-serif;height:100%;"><div><div style="font-size:18px;font-weight:800;color:${textColor};letter-spacing:-0.02em;">Pharma Drug Discovery Platform: Technical Infrastructure Architecture</div><div style="font-size:11.5px;color:${subtextColor};margin-top:2px;">Production GCP Deployment: Multi-Zone VPC Network, Cloud TPU v5e/H100 HPC, VPC-SC Perimeter &amp; On-Prem SiLA 2 Interconnect</div></div><div style="display:flex;align-items:center;gap:12px;"><span style="background:#EEF2FF;color:#4338CA;font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:12px;border:1px solid #C7D2FE;">VPC-SC Enforced</span><span style="background:#ECFDF5;color:#065F46;font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:12px;border:1px solid #A7F3D0;">Terraform / OpenTofu Certified</span><span style="background:#FEF2F2;color:#991B1B;font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:12px;border:1px solid #FECACA;">21 CFR Part 11 Cloud HSM</span></div></div>`)}" style="rounded=1;arcSize=4;fillColor=${headerFill};strokeColor=${headerStroke};strokeWidth=1.5;html=1;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="40" y="25" width="1520" height="65" as="geometry"/>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TOP ROW: EXTERNAL ACCESS, ZERO TRUST & INGRESS PERIMETER (10.100.0.0/24)  -->
        <!-- ========================================================================= -->
        <mxCell id="box_edge_ingress" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">External Ingress &amp; Zero Trust Security Perimeter &bull; BeyondCorp Enterprise &bull; CIDR 10.100.0.0/24</div>`)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A15' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="105" width="1520" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="actor_scientists" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('user_ingress', 24)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">Scientists &amp; Bioinformaticians</div><div style="font-size:8px;color:${subtextColor};">FIDO2 / WebAuthn Hardware Keys</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="55" y="138" width="260" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="edge_gclb" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11px;font-weight:800;color:#1A73E8;">Global Cloud Load Balancer</div><div style="font-size:8px;color:${subtextColor};">Anycast VIP 34.120.45.10 &bull; TLS 1.3 / HTTP/3</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="355" y="138" width="265" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="edge_armor" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11px;font-weight:800;color:#6B21A8;">Cloud Armor Enterprise WAF</div><div style="font-size:8px;color:${subtextColor};">Adaptive DDoS &bull; OWASP Top 10 &bull; Rate Limits</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="660" y="138" width="265" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="edge_iap" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('iap', 24)}<div><div style="font-size:11px;font-weight:800;color:#B45309;">Identity-Aware Proxy (IAP)</div><div style="font-size:8px;color:${subtextColor};">Context-Aware Access &bull; Signed JWT Headers</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="965" y="138" width="265" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="edge_beyondcorp" value="${encodeXml(`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('vpc_sc', 24)}<div><div style="font-size:11px;font-weight:800;color:#0F5132;">BeyondCorp Enterprise Gateway</div><div style="font-size:8px;color:${subtextColor};">Device Certificate Binding &bull; Zero Trust Policy</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1265" y="138" width="280" height="65" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- MAIN VPC NETWORK: vpc-pharma-core-prod (CIDR 10.100.0.0/16)              -->
        <!-- ========================================================================= -->
        <mxCell id="vpc_container" value="${encodeXml(`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#4338CA;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🔒</span> VPC Service Controls Perimeter: perimeter-pharma-gxp-prod &bull; Private VPC Network (vpc-pharma-core-prod &bull; CIDR 10.100.0.0/16)</div>`)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${vpcFill};strokeColor=${vpcStroke};strokeWidth=2;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="245" width="1180" height="730" as="geometry"/>
        </mxCell>

        <!-- SUBNET 1: Serverless & Agent Orchestrator Subnet (10.100.30.0/24 - us-central1) -->
        <mxCell id="subnet_serverless" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10px;font-weight:800;color:#065F46;">Subnet: Serverless Orchestration &bull; 10.100.30.0/24 (us-central1)</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${subnetFill};strokeColor=${subnetStroke};strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="55" y="285" width="545" height="255" as="geometry"/>
        </mxCell>

        <mxCell id="node_vpc_connector" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_run', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Serverless VPC Egress Connector</div><div style="font-size:8px;color:#1A73E8;font-weight:700;">CIDR 10.100.30.0/28 &bull; Direct VPC</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Routes all agent container egress into private VPC with zero public NAT traversal</div><span style="background:#E0F2FE;color:#0369A1;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Throughput: 8 Gbps</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="70" y="320" width="230" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_portal_run" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_run', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Target Ingestion &amp; Discovery Portal</div><div style="font-size:8px;color:#027A48;font-weight:700;">Cloud Run &bull; 4 vCPU / 16GB RAM</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Stateless API gateway validating campaign dossiers &amp; dispatching tasks</div><span style="background:#DCFCE7;color:#166534;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Min 2 &bull; Max 10 Pods</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="345" y="320" width="240" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_orchestrator_pods" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('agent_builder', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Multi-Agent ADK Runtime Mesh</div><div style="font-size:8px;color:#7E22CE;font-weight:700;">Cloud Run &bull; 8 vCPU / 32GB RAM</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Containerized ReAct subagents: Target Val, Druggability, De Novo &amp; Critic</div><span style="background:#F3E8FF;color:#7E22CE;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">A2A Protocol over JSON-RPC</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="70" y="430" width="230" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_redis_cache" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('memorystore', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Memorystore for Redis Cluster</div><div style="font-size:8px;color:#DC2626;font-weight:700;">CIDR 10.100.30.32/28 &bull; Redis 7.2</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Multi-AZ in-memory cache for agent scratchpads, token streams &amp; campaign locks</div><span style="background:#FEF2F2;color:#DC2626;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Sub-Millisecond Read/Write</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="345" y="430" width="240" height="90" as="geometry"/>
        </mxCell>


        <!-- SUBNET 2: GKE Autopilot TPU v5e Cluster Subnet (10.100.10.0/22 - us-central1-a/b) -->
        <mxCell id="subnet_tpu" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10px;font-weight:800;color:#0284C7;">Subnet: GKE Autopilot Cloud TPU v5e Cluster &bull; 10.100.10.0/22 (us-central1-a/b)</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${subnetFill};strokeColor=${subnetStroke};strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="55" y="580" width="545" height="260" as="geometry"/>
        </mxCell>

        <mxCell id="node_gke_cp" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('gke_autopilot', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">GKE Private Control Plane</div><div style="font-size:8px;color:#0284C7;font-weight:700;">CIDR 172.16.0.32/28 &bull; Private Endpoint</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Master node accessible exclusively via authorized VPC networks with mTLS</div><span style="background:#E0F2FE;color:#0369A1;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Kubernetes v1.30+</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="70" y="615" width="230" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_tpu_slices" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('gke_autopilot', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Cloud TPU v5e Pod Slices</div><div style="font-size:8px;color:#0284C7;font-weight:700;">ct5lp-hightpu-4t &bull; 256 TPU Chips</div></div></div><div style="font-size:7.5px;color:${subtextColor};">16 Gbps Inter-Chip Interconnect (ICI) 2D toroidal mesh for multi-device co-folding</div><span style="background:#E0F2FE;color:#0369A1;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Bfloat16 Matrix Core</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="345" y="615" width="240" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_alphafold_pods" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('vertex_ai', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">AlphaFold 3 / ESMFold Pods</div><div style="font-size:8px;color:#16A34A;font-weight:700;">Containerized XLA Runtime</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Sub-angstrom protein-ligand structural co-folding with JAX XLA compiled kernels</div><span style="background:#DCFCE7;color:#166534;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">gRPC Service Port 50051</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="70" y="725" width="230" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_filestore_tpu" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_storage', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Filestore Enterprise NFS Cache</div><div style="font-size:8px;color:#D97706;font-weight:700;">CIDR 10.100.12.0/26 &bull; NFSv4.1</div></div></div><div style="font-size:7.5px;color:${subtextColor};">12 GB/s shared POSIX cache for PDB model weights, MSA databases &amp; tensors</div><span style="background:#FEF3C7;color:#B45309;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">100k IOPS &bull; Multi-Share</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="345" y="725" width="240" height="95" as="geometry"/>
        </mxCell>


        <!-- SUBNET 3: Slurm HPC Molecular Dynamics GPU Subnet (10.100.20.0/23 - us-central1-a) -->
        <mxCell id="subnet_hpc" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10px;font-weight:800;color:#1E293B;">Subnet: Slurm HPC Molecular Dynamics Cluster &bull; 10.100.20.0/23 (us-central1-a)</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${subnetFill};strokeColor=${subnetStroke};strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="615" y="285" width="585" height="255" as="geometry"/>
        </mxCell>

        <mxCell id="node_slurm_head" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('compute_engine', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Slurm Controller (Head Node)</div><div style="font-size:8px;color:#1E40AF;font-weight:700;">c3-standard-16 &bull; Slurm 23.11</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Job scheduler managing simulation queues, node scaling &amp; slurmrestd REST API</div><span style="background:#EFF6FF;color:#1E40AF;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">REST API Port 6820</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="630" y="320" width="230" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_h100_cluster" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('compute_engine', 22)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">NVIDIA H100 80GB SXM5 Pool</div><div style="font-size:8px;color:#16A34A;font-weight:700;">a3-highgpu-8g &bull; 8x H100 per node</div></div></div><div style="font-size:7.5px;color:${subtextColor};">3.2 Tbps GPUDirect RDMA over RoCEv2 fabric &bull; 8x 3.75TB local NVMe SSD RAID0</div><span style="background:#DCFCE7;color:#166534;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">3.35 PFLOPS FP8 Tensor</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="935" y="320" width="250" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_gromacs_workers" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('compute_engine', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">GROMACS MD &amp; FEP+ GPU Workers</div><div style="font-size:8px;color:#16A34A;font-weight:700;">CUDA 12.4 &bull; MPI Communication</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Explicit solvent all-atom dynamics calculating binding free energy differences (&Delta;&Delta;G)</div><span style="background:#DCFCE7;color:#166534;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">High-Throughput Partition</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="630" y="430" width="230" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_l4_gpu_run" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_run', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Serverless GPU Conformer Cluster</div><div style="font-size:8px;color:#7E22CE;font-weight:700;">Cloud Run &bull; NVIDIA L4 24GB</div></div></div><div style="font-size:7.5px;color:${subtextColor};">RDKit 3D conformer generation, PyTorch Geometric GNNs &amp; QSAR scoring</div><span style="background:#F3E8FF;color:#7E22CE;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Autoscales 0 ➔ 30 GPUs</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="935" y="430" width="250" height="90" as="geometry"/>
        </mxCell>


        <!-- SUBNET 4: Private Service Connect Data Fabric (10.100.40.0/24) -->
        <mxCell id="subnet_data_fabric" value="${encodeXml(`<div style="padding:4px 10px;font-family:'Google Sans',sans-serif;font-size:10px;font-weight:800;color:#1D4ED8;">Subnet: Private Service Connect (PSC) Data Fabric &bull; 10.100.40.0/24</div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${subnetFill};strokeColor=${subnetStroke};strokeWidth=1.2;dashed=1;dashPattern=4 3;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="615" y="580" width="585" height="260" as="geometry"/>
        </mxCell>

        <mxCell id="psc_spanner" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('spanner', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Cloud Spanner nam3 Multi-Region</div><div style="font-size:8px;color:#1E40AF;font-weight:700;">PSC 10.100.40.20 &bull; 4,000 PUs</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Spanner Graph (ISO GQL) storing billion-node target-disease knowledge graph with 99.999% SLA</div><span style="background:#EFF6FF;color:#1E40AF;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Multi-Region Quorum</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="630" y="615" width="230" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="psc_bigquery" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('bigquery', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">BigQuery Enterprise Lakehouse</div><div style="font-size:8px;color:#1E40AF;font-weight:700;">PSC 10.100.40.30 &bull; 2,000 Slots</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Dedicated slot commitments &bull; BigLake Apache Iceberg tables &bull; Column-level GxP policy tags</div><span style="background:#EFF6FF;color:#1E40AF;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Zero-Copy Apache Iceberg</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="935" y="615" width="250" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="psc_gcs_worm" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_storage', 20)}<div><div style="font-size:10.5px;font-weight:800;color:${textColor};">Cloud Storage GxP Cold Vault</div><div style="font-size:8px;color:#0284C7;font-weight:700;">PSC 10.100.40.40 &bull; Dual-Reg US</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Cryo-EM maps, PDB coordinates &amp; trajectories locked with 7-year WORM Bucket Retention</div><span style="background:#E0F2FE;color:#0369A1;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">WORM Retention Lock</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="630" y="725" width="230" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="psc_cloud_hsm" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('cloud_logging', 20)}<div><div style="font-size:10.5px;font-weight:800;color:#DC2626;">Cloud KMS &amp; Cloud HSM</div><div style="font-size:8px;color:#DC2626;font-weight:700;">FIPS 140-2 Level 3 &bull; CMEK</div></div></div><div style="font-size:7.5px;color:${subtextColor};">Hardware Security Module managing 21 CFR Part 11 electronic signature keys &amp; non-repudiation</div><span style="background:#FEF2F2;color:#DC2626;font-size:7.5px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">21 CFR Part 11 Keyring</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#EF4444;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="935" y="725" width="250" height="95" as="geometry"/>
        </mxCell>

        <!-- BOTTOM STRIP: Zero-Trust Firewall & GxP Audit Lineage -->
        <mxCell id="node_fw_rules" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_armor', 22)}<div><div style="font-size:11px;font-weight:800;color:${textColor};">VPC Firewall Rules: Zero-Trust Microsegmentation</div><div style="font-size:8px;color:${subtextColor};">fw-allow-iap-ingress (tcp:443) &bull; fw-allow-sila-mtls (tcp:50051) &bull; fw-hpc-rdma (udp:roce) &bull; Deny-All Default Egress</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="55" y="855" width="545" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_sink" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('cloud_logging', 22)}<div><div style="font-size:11px;font-weight:800;color:#DC2626;">Cloud Logging Sink &bull; Immutable Cryptographic Audit Lineage</div><div style="font-size:8px;color:${subtextColor};">Routes all agent turns, prompt seeds, model weights &amp; electronic signatures to GxP WORM Log Bucket</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#EF4444;strokeWidth=1.4;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="615" y="855" width="585" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataplex_lineage" value="${encodeXml(`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">${getIconSvgHtml('dataplex', 22)}<div><div style="font-size:11px;font-weight:800;color:#027A48;">Dataplex Data Governance, Data Quality (DQ) &amp; Automated End-to-End Lineage Catalog</div><div style="font-size:8px;color:${subtextColor};">Continuous metadata scanning across Spanner, BigQuery, GCS &amp; Cloud Pub/Sub with automated data profiling</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="55" y="915" width="1145" height="45" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- RIGHT COLUMN: HYBRID INTERCONNECT & ON-PREM WET-LAB ROBOTICS              -->
        <!-- ========================================================================= -->
        <mxCell id="box_hybrid_robotics" value="${encodeXml(`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;display:flex;align-items:center;gap:6px;"><span style="font-size:13px;">🏭</span> Hybrid Wet-Lab Robotics Interconnect &bull; SiLA 2</div>`)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E3A8A15' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="1240" y="245" width="320" height="730" as="geometry"/>
        </mxCell>

        <mxCell id="node_interconnect" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('network_services', 24)}<div><div style="font-size:11.5px;font-weight:800;color:#1E40AF;">10 Gbps Dedicated Interconnect</div><div style="font-size:8px;color:${subtextColor};">BGP ASN 64514 &bull; Redundant HA VPN</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; Direct fiber connection to on-prem lab<br/>&bull; Sub-5ms private latency<br/>&bull; IPsec IKEv2 automated failover</div><span style="background:#DBEAFE;color:#1E40AF;font-size:8px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">99.99% Enterprise SLA</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1255" y="285" width="290" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_psc_sila_producer" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('pubsub', 24)}<div><div style="font-size:11.5px;font-weight:800;color:#1A73E8;">Private Service Connect (SiLA 2)</div><div style="font-size:8px;color:${subtextColor};">PSC Endpoint 10.100.40.100</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; Private IP access to lab gateway<br/>&bull; Cloud Pub/Sub asynchronous buffer<br/>&bull; Zero exposure to public internet</div><span style="background:#E0F2FE;color:#0369A1;font-size:8px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Unidirectional Egress</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="1255" y="430" width="290" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_onprem_gateway" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('iap', 24)}<div><div style="font-size:11.5px;font-weight:800;color:#B45309;">On-Premises SiLA 2 Gateway</div><div style="font-size:8px;color:${subtextColor};">Internal IP 192.168.100.20</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; Mutual TLS (mTLS) client verification<br/>&bull; Internal enterprise PKI CA certificates<br/>&bull; SiLA 2 XML recipe validator</div><span style="background:#FEF3C7;color:#92400E;font-size:8px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">mTLS Port 50051</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1255" y="580" width="290" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_robotic_workcell" value="${encodeXml(`<div style="padding:10px;font-family:'Google Sans',sans-serif;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;align-items:center;gap:8px;">${getIconSvgHtml('artifact_registry', 26)}<div><div style="font-size:12px;font-weight:800;color:#1E40AF;">Automated Robotic Workcells</div><div style="font-size:8.5px;color:${subtextColor};">Physical Synthesis &amp; Assay Execution</div></div></div><div style="font-size:8px;color:${subtextColor};line-height:1.4;">&bull; Tecan Fluent / Hamilton Star liquid handlers<br/>&bull; Chemspeed automated synthesis workstations<br/>&bull; Echo acoustic dispensing for HTS assays<br/>&bull; Closed-loop LC-MS validation sensors</div><span style="background:#DBEAFE;color:#1E40AF;font-size:8px;font-weight:800;padding:2px 6px;border-radius:4px;width:fit-content;">Physical Wet-Lab Hardware</span></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#3B82F6;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="1255" y="725" width="290" height="150" as="geometry"/>
        </mxCell>

        <mxCell id="node_lab_telemetry" value="${encodeXml(`<div style="padding:8px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">${getIconSvgHtml('dataflow', 22)}<div><div style="font-size:11px;font-weight:800;color:#027A48;">AnIML / SiLA 2 Sensor Telemetry</div><div style="font-size:8px;color:${subtextColor};">Real-time plate readouts &bull; Closed-Loop Return</div></div></div>`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=#12B76A;strokeWidth=1.3;" vertex="1" parent="1">
          <mxGeometry x="1255" y="900" width="290" height="60" as="geometry"/>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- TECHNICAL INFRASTRUCTURE CONNECTORS & PACKET FLOW EDGES                   -->
        <!-- ========================================================================= -->
        ${renderCleanEdge({ id: 'te1_gclb', source: 'actor_scientists', target: 'edge_gclb', step: '1', label: 'TLS 1.3 Handshake', labelOffsetY: -14, color: '#1A73E8', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'te2_armor', source: 'edge_gclb', target: 'edge_armor', step: '2', label: 'Edge WAF inspection', labelOffsetY: -14, color: '#9333EA', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        ${renderCleanEdge({ id: 'te3_iap', source: 'edge_armor', target: 'edge_iap', step: '3', label: 'Zero-Trust JWT verify', labelOffsetY: -14, color: '#F59E0B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- Ingress into Private VPC Subnet -->
        ${renderCleanEdge({ id: 'te4_portal', source: 'edge_iap', target: 'node_portal_run', step: '4', label: 'VPC Ingress (Direct Peering)', labelOffsetX: -80, labelOffsetY: -12, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 1097, y: 232 }, { x: 465, y: 232 }] }, isDark)}

        <!-- Orchestrator to Agent Mesh & Redis -->
        ${renderCleanEdge({ id: 'te5_mesh', source: 'node_portal_run', target: 'node_orchestrator_pods', step: '5', label: 'Agent task dispatch', labelOffsetY: -12, color: '#0F5132', exitX: 0.2, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 393, y: 420 }, { x: 185, y: 420 }] }, isDark)}
        ${renderCleanEdge({ id: 'te6_redis', source: 'node_orchestrator_pods', target: 'node_redis_cache', step: '6', label: 'A2A State Cache', labelOffsetY: -14, color: '#DC2626', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- Cross-Subnet Offloads -->
        ${renderCleanEdge({ id: 'te7_tpu', source: 'node_orchestrator_pods', target: 'node_tpu_slices', step: '7', label: 'AlphaFold 3 gRPC (Port 50051)', labelOffsetY: -12, color: '#0284C7', exitX: 0.25, exitY: 1, entryX: 0.2, entryY: 0, waypoints: [{ x: 127, y: 550 }, { x: 393, y: 550 }], edgeStyle: 'edgeStyle=none;rounded=1;' }, isDark)}
        ${renderCleanEdge({ id: 'te8_nfs', source: 'node_tpu_slices', target: 'node_filestore_tpu', step: '8', label: 'PDB I/O (NFSv4.1 12GB/s)', labelOffsetX: 70, labelOffsetY: 0, color: '#D97706', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        ${renderCleanEdge({ id: 'te9_slurm', source: 'node_orchestrator_pods', target: 'node_slurm_head', step: '9', label: 'Slurmrestd API (Port 6820)', labelOffsetY: -12, color: '#1E40AF', exitX: 0.6, exitY: 0, entryX: 0.3, entryY: 1, waypoints: [{ x: 208, y: 420 }, { x: 700, y: 420 }] }, isDark)}
        ${renderCleanEdge({ id: 'te10_h100', source: 'node_slurm_head', target: 'node_h100_cluster', step: '10', label: 'GPUDirect RDMA 3.2 Tbps', labelOffsetY: -14, color: '#16A34A', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- PSC Data Fabric Endpoints -->
        ${renderCleanEdge({ id: 'te11_spanner', source: 'node_orchestrator_pods', target: 'psc_spanner', step: '11', label: 'Spanner ISO GQL (PSC 10.100.40.20)', labelOffsetX: -45, labelOffsetY: 12, color: '#1E40AF', exitX: 0.4, exitY: 1, entryX: 0, entryY: 0.5, waypoints: [{ x: 162, y: 562 }, { x: 607, y: 562 }, { x: 607, y: 662 }], edgeStyle: 'edgeStyle=none;rounded=1;' }, isDark)}
        ${renderCleanEdge({ id: 'te12_bigquery', source: 'node_orchestrator_pods', target: 'psc_bigquery', step: '12', label: 'BigLake Iceberg (PSC 10.100.40.30)', labelOffsetX: 120, labelOffsetY: -12, color: '#1E40AF', exitX: 0.6, exitY: 1, entryX: 0, entryY: 0.5, waypoints: [{ x: 208, y: 550 }, { x: 905, y: 550 }, { x: 905, y: 662 }], edgeStyle: 'edgeStyle=none;rounded=1;' }, isDark)}
        ${renderCleanEdge({ id: 'te13_hsm', source: 'node_orchestrator_pods', target: 'psc_cloud_hsm', step: '13', label: '21 CFR Part 11 HSM Signature', labelOffsetX: -170, labelOffsetY: -12, color: '#DC2626', exitX: 0.75, exitY: 1, entryX: 0, entryY: 0.5, waypoints: [{ x: 242, y: 550 }, { x: 885, y: 550 }, { x: 885, y: 772 }], edgeStyle: 'edgeStyle=none;rounded=1;' }, isDark)}

        <!-- Hybrid Interconnect to Wet-Lab -->
        ${renderCleanEdge({ id: 'te14_interconnect', source: 'node_orchestrator_pods', target: 'node_interconnect', step: '14', label: 'Dedicated Interconnect 10 Gbps', labelOffsetX: 205, labelOffsetY: -12, color: '#2563EB', exitX: 0.9, exitY: 1, entryX: 0, entryY: 0.5, waypoints: [{ x: 277, y: 550 }, { x: 1235, y: 550 }, { x: 1235, y: 342 }], edgeStyle: 'edgeStyle=none;rounded=1;' }, isDark)}
        ${renderCleanEdge({ id: 'te15_psc_sila', source: 'node_interconnect', target: 'node_psc_sila_producer', color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'te16_onprem', source: 'node_psc_sila_producer', target: 'node_onprem_gateway', label: 'mTLS Handshake (Port 50051)', labelOffsetY: -12, color: '#F59E0B', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'te17_actuate', source: 'node_onprem_gateway', target: 'node_robotic_workcell', label: 'SiLA 2 Command Stream', labelOffsetY: -12, color: '#1E40AF', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        ${renderCleanEdge({ id: 'te18_telemetry_return', source: 'node_robotic_workcell', target: 'node_lab_telemetry', color: '#12B76A', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
};

import { GCP_PHARMA_CONCEPTUAL, generateConceptualPharmaXml } from './gcpConceptualPharma';
export { GCP_PHARMA_CONCEPTUAL, generateConceptualPharmaXml };

export const ALL_GCP_DIALECT_A_ARCHITECTURES: GcpArchitectureDef[] = [
  GCP_MULTIAGENT_CORE,
  GCP_MULTIMODAL_CLASSIFY,
  GCP_MULTITENANT_AGENTIC,
  GCP_DEEPSEA_AGENTIC,
  GCP_PHARMA_CONCEPTUAL,
  GCP_PHARMA_DRUG_DISCOVERY,
  GCP_PHARMA_TECHNICAL_INFRASTRUCTURE
];

export function getGcpArchitectureById(id: string): GcpArchitectureDef | undefined {
  return ALL_GCP_DIALECT_A_ARCHITECTURES.find((arch) => arch.id === id);
}

