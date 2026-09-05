const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'lib', 'gcpDialectA.ts');

const content = `/**
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
    return \`<div style="display:inline-flex;align-items:center;justify-content:center;width:\${size}px;height:\${size}px;border-radius:4px;background:#EFF6FF;color:#1A73E8;"><svg width="\${Math.round(size * 0.75)}" height="\${Math.round(size * 0.75)}" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg></div>\`;
  }
  return \`<div style="display:inline-flex;align-items:center;justify-content:center;width:\${size}px;height:\${size}px;">\${icon.svg.replace('<svg ', \`<svg width="\${size}" height="\${size}" \`)}</div>\`;
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
}

function renderCleanEdge(edge: EdgeDef, isDark = false): string {
  const color = edge.color || '#1A73E8';
  const pillBg = isDark ? '#1E293B' : '#FFFFFF';
  const pillBorder = isDark ? '#475569' : '#CBD5E1';
  const labelTextColor = isDark ? '#F8FAFC' : '#1E293B';

  let labelHtml = '';
  if (edge.step && edge.label) {
    labelHtml =
      \`<div style="font-family:'Google Sans',Roboto,sans-serif;display:inline-flex;align-items:center;gap:4px;background:\${pillBg};padding:2px 6px;border-radius:12px;border:1px solid \${pillBorder};box-shadow:0 1px 3px rgba(0,0,0,0.08);white-space:nowrap;">\` +
      \`<span style="color:#FFFFFF;background:\${color};font-size:9px;font-weight:800;width:16px;height:16px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;line-height:1;">\${encodeXml(edge.step)}</span>\` +
      \`<span style="color:\${labelTextColor};font-size:9px;font-weight:700;">\${encodeXml(edge.label)}</span>\` +
      \`</div>\`;
  } else if (edge.step) {
    labelHtml =
      \`<div style="font-family:'Google Sans',Roboto,sans-serif;background:\${color};color:#FFFFFF;font-size:10px;font-weight:800;width:18px;height:18px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;border:1.5px solid #FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,0.12);">\${encodeXml(edge.step)}</div>\`;
  } else if (edge.label) {
    labelHtml =
      \`<div style="font-family:'Google Sans',Roboto,sans-serif;background:\${pillBg};color:\${labelTextColor};font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;border:1px solid \${pillBorder};white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.06);">\${encodeXml(edge.label)}</div>\`;
  }

  let geomInner = '';
  if (edge.waypoints && edge.waypoints.length > 0) {
    geomInner += \`<Array as="points">\${edge.waypoints.map((p) => \`<mxPoint x="\${p.x}" y="\${p.y}"/>\`).join('')}</Array>\`;
  }

  const offX = edge.labelOffsetX !== undefined ? edge.labelOffsetX : 0;
  const offY = edge.labelOffsetY !== undefined ? edge.labelOffsetY : 0;
  if (offX !== 0 || offY !== 0) {
    geomInner += \`<mxPoint x="\${offX}" y="\${offY}" as="offset"/>\`;
  }

  const exitX = edge.exitX !== undefined ? edge.exitX : 0.5;
  const exitY = edge.exitY !== undefined ? edge.exitY : 1;
  const entryX = edge.entryX !== undefined ? edge.entryX : 0.5;
  const entryY = edge.entryY !== undefined ? edge.entryY : 0;
  const dashStyle = edge.dashed ? 'dashed=1;dashPattern=5 4;' : 'dashed=0;';
  const edgeStyle = edge.waypoints && edge.waypoints.length > 0
    ? 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;'
    : 'edgeStyle=none;';

  const valAttr = labelHtml ? \`value="\${encodeXml(labelHtml)}"\` : \`value=""\`;

  return (
    \`<mxCell id="\${edge.id}" \${valAttr} style="\${edgeStyle}html=1;exitX=\${exitX};exitY=\${exitY};entryX=\${entryX};entryY=\${entryY};strokeColor=\${color};strokeWidth=1.75;\${dashStyle}verticalAlign=middle;labelBackgroundColor=none;" edge="1" parent="1" source="\${edge.source}" target="\${edge.target}">\` +
    \`<mxGeometry relative="1" as="geometry">\${geomInner}</mxGeometry>\` +
    \`</mxCell>\`
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

    return \`<mxfile host="embed.diagrams.net">
  <diagram id="gcp_multiagent_core" name="Multi-Agent AI System in Google Cloud">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="\${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- 1. TOP ACTORS (Outside Google Cloud Box with generous 50px top margin) -->
        <mxCell id="actor_users" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">👥</div><div><div style="font-size:12px;font-weight:800;color:\${textColor};">Application users</div><div style="font-size:8px;color:\${subtextColor};">Chat UI / SDK Client</div></div></div>\`)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="120" y="50" width="180" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="actor_devs" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">💻</div><div><div style="font-size:12px;font-weight:800;color:\${textColor};">AI developers</div><div style="font-size:8px;color:#1A73E8;font-weight:700;">ADK Authors</div></div></div>\`)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="710" y="50" width="160" height="55" as="geometry"/>
        </mxCell>

        <!-- 2. GOOGLE CLOUD OUTER CONTAINER -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${gcpBoxBorder};strokeWidth=2.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="950" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Multi-Agent AI System</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Architecture Center Official</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- Region Label -->
        <mxCell id="label_region" value="Region" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=\${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="85" y="190" width="60" height="20" as="geometry"/>
        </mxCell>

        <!-- Frontend Cloud Run service -->
        <mxCell id="frontend_svc" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('cloud_run', 28)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Frontend</div><div style="font-size:9px;color:\${subtextColor};">Cloud Run service</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="110" y="215" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- 3. AGENTS CONTAINER (Soft Green #E6F4EA) -->
        <mxCell id="agents_enclave" value="\${encodeXml(\`<div style="padding:10px 14px;font-family:'Google Sans',sans-serif;font-size:15px;font-weight:800;color:#0D5F3A;">Agents</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B20' : '#E6F4EA'};strokeColor=#12B76A;strokeWidth=2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="80" y="310" width="700" height="530" as="geometry"/>
        </mxCell>

        <!-- Coordinator Agent -->
        <mxCell id="coordinator_agent" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('vertex_ai', 26)}<div><div style="font-size:12.5px;font-weight:800;color:\${textColor};">Coordinator</div><div style="font-size:9px;color:#0D5F3A;font-weight:700;">Agent</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#12B76A;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="110" y="345" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Sequence Sub-Enclave -->
        <mxCell id="box_sequence" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11.5px;font-weight:800;color:#0D5F3A;">Sequence</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="450" width="200" height="230" as="geometry"/>
        </mxCell>

        <!-- Task-A Subagent -->
        <mxCell id="subagent_task_a" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Task-A</div><div style="font-size:8.5px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="485" width="170" height="55" as="geometry"/>
        </mxCell>

        <!-- Task-A.1 Subagent -->
        <mxCell id="subagent_task_a1" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Task-A.1</div><div style="font-size:8.5px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="595" width="170" height="55" as="geometry"/>
        </mxCell>

        <!-- Iterative Refinement Sub-Enclave -->
        <mxCell id="box_iterative" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:flex-end;"><span style="font-size:11.5px;font-weight:800;color:#0D5F3A;">Iterative refinement</span></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=right;" vertex="1" parent="1">
          <mxGeometry x="320" y="450" width="440" height="230" as="geometry"/>
        </mxCell>

        <!-- Task-B Subagent -->
        <mxCell id="subagent_task_b" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Task-B</div><div style="font-size:8.5px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="485" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Quality Evaluator Subagent -->
        <mxCell id="subagent_evaluator" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Quality evaluator</div><div style="font-size:8.5px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="595" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Prompt Enhancer Subagent -->
        <mxCell id="subagent_enhancer" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Prompt enhancer</div><div style="font-size:8.5px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="570" y="540" width="175" height="55" as="geometry"/>
        </mxCell>

        <!-- Response Generator Subagent -->
        <mxCell id="response_generator_agent" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('gemini', 24)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Response Generator</div><div style="font-size:9px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#12B76A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="140" y="720" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- 4. ADK, MODEL ARMOR & AI MODEL COLUMN -->
        <mxCell id="node_adk" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:\${textColor};">ADK</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="310" width="60" height="140" as="geometry"/>
        </mxCell>

        <!-- Model Armor -->
        <mxCell id="node_model_armor" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_armor', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Model Armor</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="870" y="355" width="150" height="55" as="geometry"/>
        </mxCell>

        <!-- AI Model (e.g., Gemini) -->
        <mxCell id="node_ai_model" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('gemini', 28)}<div><div style="font-size:12px;font-weight:800;color:#1A73E8;">AI model</div><div style="font-size:8.5px;color:\${subtextColor};">(e.g., Gemini)</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1060" y="355" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Model Runtime Column (Vertical Stack on Right) -->
        <mxCell id="label_model_runtime" value="Model runtime:" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=\${textColor};" vertex="1" parent="1">
          <mxGeometry x="1265" y="310" width="120" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="runtime_gemini" value="\${encodeXml(\`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:6px;height:100%;">\${getIconSvgHtml('gemini', 22)}<div style="font-size:10px;font-weight:700;color:\${textColor};line-height:1.2;">Gemini Enterprise<br/>Agent Platform</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1265" y="340" width="200" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="text_or_1" value="or" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=10;fontStyle=2;fontColor=\${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1350" y="390" width="30" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="runtime_cloudrun" value="\${encodeXml(\`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:6px;height:100%;">\${getIconSvgHtml('cloud_run', 22)}<div style="font-size:10.5px;font-weight:700;color:\${textColor};">Cloud Run</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1265" y="410" width="200" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="text_or_2" value="or" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=10;fontStyle=2;fontColor=\${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1350" y="455" width="30" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="runtime_gke" value="\${encodeXml(\`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:6px;height:100%;">\${getIconSvgHtml('gke_autopilot', 22)}<div style="font-size:10.5px;font-weight:700;color:\${textColor};">GKE</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1265" y="475" width="200" height="42" as="geometry"/>
        </mxCell>

        <!-- 5. BOTTOM RUNTIMES & OBSERVABILITY -->
        <mxCell id="label_agents_runtime" value="Agents runtime:" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=\${textColor};" vertex="1" parent="1">
          <mxGeometry x="85" y="865" width="100" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="agents_runtime_box" value="\${encodeXml(\`<div style="display:flex;align-items:center;gap:8px;padding:0 8px;height:100%;font-family:'Google Sans',sans-serif;font-size:9.5px;font-weight:700;color:\${textColor};"><div style="display:flex;align-items:center;gap:4px;">\${getIconSvgHtml('cloud_run', 18)}<span>Cloud Run</span></div><span style="color:#94A3B8;font-weight:400;">or</span><div style="display:flex;align-items:center;gap:4px;">\${getIconSvgHtml('gemini', 18)}<span>Agent Runtime on Gemini Enterprise Agent Platform</span></div><span style="color:#94A3B8;font-weight:400;">or</span><div style="display:flex;align-items:center;gap:4px;">\${getIconSvgHtml('gke_autopilot', 18)}<span>GKE</span></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="190" y="855" width="460" height="45" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Observability -->
        <mxCell id="node_observability" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_logging', 22)}<div style="font-size:11px;font-weight:800;color:\${textColor};">Google Cloud Observability</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="670" y="855" width="220" height="45" as="geometry"/>
        </mxCell>

        <!-- 6. MCP CLIENTS & TOOLS ENCLAVES -->
        <mxCell id="node_mcp_clients" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:\${textColor};">MCP clients</div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="700" width="100" height="45" as="geometry"/>
        </mxCell>

        <!-- Tools within Google Cloud Container -->
        <mxCell id="box_tools_gcp" value="\${encodeXml(\`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">Tools within Google Cloud</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#1E3A8A20' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=bottom;align=left;" vertex="1" parent="1">
          <mxGeometry x="890" y="695" width="260" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="tool_databases" value="\${encodeXml(\`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="display:flex;gap:4px;">\${getIconSvgHtml('bigquery', 20)}\${getIconSvgHtml('spanner', 20)}</div><div style="font-size:10.5px;font-weight:800;color:\${textColor};margin-top:4px;">Databases</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="905" y="710" width="105" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_apis" value="\${encodeXml(\`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="font-size:18px;">&lt; &gt;</div><div style="font-size:10.5px;font-weight:800;color:\${textColor};margin-top:4px;">APIs</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1025" y="710" width="75" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_dots_internal" value="..." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=18;fontStyle=1;fontColor=\${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1105" y="740" width="30" height="20" as="geometry"/>
        </mxCell>

        <!-- 7. BOTTOM ACTORS & EXTERNAL TOOLS -->
        <mxCell id="actor_devops" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">👥</div><div><div style="font-size:11px;font-weight:800;color:\${textColor};">Platform administrators</div><div style="font-size:8.5px;color:\${subtextColor};">DevOps engineers</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="1115" width="220" height="55" as="geometry"/>
        </mxCell>

        <!-- External Tools Container -->
        <mxCell id="box_external_tools" value="\${encodeXml(\`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#475569;">External tools</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=bottom;align=left;" vertex="1" parent="1">
          <mxGeometry x="1220" y="850" width="240" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="tool_ext_services" value="\${encodeXml(\`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="font-size:18px;">📦</div><div style="font-size:10px;font-weight:800;color:\${textColor};margin-top:2px;">Services</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1235" y="865" width="85" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_ext_files" value="\${encodeXml(\`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><div style="font-size:18px;">📄</div><div style="font-size:10px;font-weight:800;color:\${textColor};margin-top:2px;">Files</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1335" y="865" width="75" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_dots_ext" value="..." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=18;fontStyle=1;fontColor=\${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="1415" y="895" width="30" height="20" as="geometry"/>
        </mxCell>

        <!-- 8. CONNECTORS (100% COLLISION-FREE & OFFSET-CALCULATED) -->
        \${renderCleanEdge({ id: 'e1', source: 'actor_users', target: 'frontend_svc', step: '1', label: 'Prompt', labelOffsetX: 35, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e2', source: 'frontend_svc', target: 'coordinator_agent', step: '2', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e_hitl', source: 'frontend_svc', target: 'actor_users', label: 'Human-in-the-loop interaction', labelOffsetY: -12, color: '#475569', exitX: 1, exitY: 0.5, entryX: 1, entryY: 0.5, waypoints: [{ x: 360, y: 245 }, { x: 360, y: 77 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_devs', source: 'actor_devs', target: 'node_adk', color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e3_split', source: 'coordinator_agent', target: 'subagent_task_a', step: '3', label: 'Subagent invocation', labelOffsetX: 55, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 210, y: 425 }, { x: 200, y: 425 }] }, isDark)}
        \${renderCleanEdge({ id: 'e3_b', source: 'coordinator_agent', target: 'subagent_task_b', color: '#0F5132', exitX: 0.9, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 290, y: 425 }, { x: 422, y: 425 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_seq', source: 'subagent_task_a', target: 'subagent_task_a1', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e_iter_down', source: 'subagent_task_b', target: 'subagent_evaluator', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e_iter_rework', source: 'subagent_evaluator', target: 'subagent_enhancer', label: 'If rework is required', labelOffsetY: 12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 530, y: 622 }, { x: 657, y: 622 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_iter_update', source: 'subagent_enhancer', target: 'subagent_task_b', label: 'Updated prompt', labelOffsetY: -12, color: '#0F5132', exitX: 0.5, exitY: 0, entryX: 1, entryY: 0.5, waypoints: [{ x: 657, y: 512 }] }, isDark)}

        \${renderCleanEdge({ id: 'e4_a', source: 'subagent_task_a1', target: 'response_generator_agent', step: '4', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.3, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e4_b', source: 'subagent_evaluator', target: 'response_generator_agent', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.8, entryY: 0, waypoints: [{ x: 422, y: 690 }, { x: 316, y: 690 }] }, isDark)}

        \${renderCleanEdge({ id: 'e5_return', source: 'response_generator_agent', target: 'coordinator_agent', step: '5', label: 'Response', labelOffsetY: -12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 1, entryY: 0.5, waypoints: [{ x: 745, y: 750 }, { x: 745, y: 375 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_inf_req', source: 'node_adk', target: 'node_ai_model', label: 'Inference requests', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.25, entryX: 0.5, entryY: 0, waypoints: [{ x: 1142, y: 345 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_armor_model', source: 'node_model_armor', target: 'node_ai_model', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        \${renderCleanEdge({ id: 'e_inf_resp', source: 'node_ai_model', target: 'node_adk', label: 'Inference responses', labelOffsetY: 12, color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 1, entryY: 0.85, waypoints: [{ x: 1142, y: 460 }, { x: 840, y: 460 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_obs', source: 'node_adk', target: 'node_observability', color: '#475569', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 790, y: 550 }, { x: 780, y: 550 }] }, isDark)}

        <!-- MCP Bus Lines (High Waypoint Routing Above Tools, Zero Card Slicing) -->
        \${renderCleanEdge({ id: 'e_mcp_db', source: 'node_mcp_clients', target: 'tool_databases', label: 'MCP servers', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 957, y: 660 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_mcp_api', source: 'node_mcp_clients', target: 'tool_apis', label: 'MCP servers', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1062, y: 660 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_mcp_ext_svc', source: 'node_mcp_clients', target: 'tool_ext_services', label: 'MCP servers', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1277, y: 660 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_mcp_ext_files', source: 'node_mcp_clients', target: 'tool_ext_files', label: 'MCP servers', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1372, y: 660 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_devops_obs', source: 'actor_devops', target: 'node_observability', color: '#475569', exitX: 0.5, exitY: 0, entryX: 0.2, entryY: 1, waypoints: [{ x: 230, y: 980 }, { x: 714, y: 980 }] }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>\`;
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

    return \`<mxfile host="embed.diagrams.net">
  <diagram id="gcp_multimodal_classify" name="Classify Multimodal Data with Multi-Agent System">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="\${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Outer Google Cloud Boundary -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${outerBorder};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="990" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Classify Multimodal Data with Multi-Agent System</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Architecture Center Official</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- Web Application (Cloud Run) at Top -->
        <mxCell id="web_application" value="\${encodeXml(\`<div style="padding:6px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('cloud_run', 30)}<div><div style="font-size:13px;font-weight:800;color:\${textColor};">Web application</div><div style="font-size:9.5px;color:\${subtextColor};">Cloud Run</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="380" y="135" width="240" height="65" as="geometry"/>
        </mxCell>

        <!-- Agent Runtime (Cloud Run) Container -->
        <mxCell id="agent_runtime_box" value="\${encodeXml(\`<div style="padding:10px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;">\${getIconSvgHtml('cloud_run', 24)}<div><div style="font-size:13px;font-weight:800;color:\${textColor};">Agent runtime</div><div style="font-size:9.5px;color:\${subtextColor};">Cloud Run</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.75;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="245" width="880" height="490" as="geometry"/>
        </mxCell>

        <!-- Root Agent (Coordinator) -->
        <mxCell id="root_agent_coord" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('vertex_ai', 26)}<div><div style="font-size:12.5px;font-weight:800;color:\${textColor};">Root agent</div><div style="font-size:9.5px;color:\${subtextColor};">Coordinator</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="380" y="270" width="240" height="65" as="geometry"/>
        </mxCell>

        <!-- Parallel Agent Execution Enclave (Warm Yellow/Orange) -->
        <mxCell id="parallel_execution_enclave" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:700;color:#92400E;">Parallel agent execution</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#78350F20' : '#FEF3C7'};strokeColor=#F59E0B;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="120" y="380" width="840" height="325" as="geometry"/>
        </mxCell>

        <!-- Image Analyst Subagent -->
        <mxCell id="analyst_image" value="\${encodeXml(\`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('vertex_ai', 24)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Image analyst</div><div style="font-size:9px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="145" y="430" width="230" height="70" as="geometry"/>
        </mxCell>

        <!-- Video Analyst Subagent -->
        <mxCell id="analyst_video" value="\${encodeXml(\`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('vertex_ai', 24)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Video analyst</div><div style="font-size:9px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="425" y="430" width="230" height="70" as="geometry"/>
        </mxCell>

        <!-- Structured Data Analyst Subagent -->
        <mxCell id="analyst_structured" value="\${encodeXml(\`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('vertex_ai', 24)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Structured<br/>data analyst</div><div style="font-size:9px;color:\${subtextColor};">Subagent</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="705" y="430" width="230" height="70" as="geometry"/>
        </mxCell>

        <!-- ADK Adapter Box -->
        <mxCell id="adk_box_multi" value="\${encodeXml(\`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;"><div style="font-size:20px;">🤖</div><div style="font-size:11.5px;font-weight:800;color:\${textColor};margin-top:2px;">ADK</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="245" width="70" height="85" as="geometry"/>
        </mxCell>

        <!-- Gemini Platform Box -->
        <mxCell id="gemini_platform_card" value="\${encodeXml(\`<div style="padding:8px 14px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:12px;height:100%;">\${getIconSvgHtml('gemini', 34)}<div><div style="font-size:13px;font-weight:800;color:#1A73E8;">Gemini</div><div style="font-size:9.5px;color:\${subtextColor};">Gemini Enterprise Agent Platform</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1130" y="250" width="260" height="75" as="geometry"/>
        </mxCell>

        <!-- Custom MCP Server (Cloud Run) -->
        <mxCell id="custom_mcp_server" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('cloud_run', 26)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Custom MCP server</div><div style="font-size:9px;color:\${subtextColor};">Cloud Run</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="240" y="765" width="280" height="65" as="geometry"/>
        </mxCell>

        <!-- BigQuery MCP Server -->
        <mxCell id="bq_mcp_server" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('bigquery', 26)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">BigQuery MCP server</div><div style="font-size:9px;color:\${subtextColor};">Google-managed MCP server</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="660" y="765" width="280" height="65" as="geometry"/>
        </mxCell>

        <!-- Agent Tools Enclave (Soft Blue) -->
        <mxCell id="agent_tools_enclave" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">Agent tools</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#1E3A8A20' : '#DBEAFE'};strokeColor=#3B82F6;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="120" y="870" width="840" height="135" as="geometry"/>
        </mxCell>

        <!-- Multimodal Data (Cloud Storage) -->
        <mxCell id="tool_multimodal_gcs" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('cloud_storage', 26)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Multimodal data</div><div style="font-size:9px;color:\${subtextColor};">Cloud Storage</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="250" y="905" width="260" height="65" as="geometry"/>
        </mxCell>

        <!-- Observational Data (BigQuery) -->
        <mxCell id="tool_observational_bq" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('bigquery', 26)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Observational data</div><div style="font-size:9px;color:\${subtextColor};">BigQuery</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="670" y="905" width="260" height="65" as="geometry"/>
        </mxCell>

        <!-- Connectors (Offset calculated to prevent label overlap) -->
        \${renderCleanEdge({ id: 'e1', source: 'web_application', target: 'root_agent_coord', step: '1', label: 'Request to classify data', labelOffsetX: -75, color: '#1A73E8', exitX: 0.35, exitY: 1, entryX: 0.35, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e5', source: 'root_agent_coord', target: 'web_application', step: '5', label: 'Final classification', labelOffsetX: 65, color: '#1A73E8', exitX: 0.65, exitY: 0, entryX: 0.65, entryY: 1 }, isDark)}

        \${renderCleanEdge({ id: 'e2', source: 'root_agent_coord', target: 'parallel_execution_enclave', step: '2', label: 'Request to analyze multimodal data', labelOffsetX: -90, color: '#1A73E8', exitX: 0.35, exitY: 1, entryX: 0.40, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e4', source: 'parallel_execution_enclave', target: 'root_agent_coord', step: '4', label: 'Suggested classification and confidence level', labelOffsetX: 95, color: '#1A73E8', exitX: 0.52, exitY: 0, entryX: 0.65, entryY: 1 }, isDark)}

        <!-- 3a: Image & Video subagents meeting at central bus before dropping to Custom MCP -->
        \${renderCleanEdge({ id: 'e3a', source: 'analyst_video', target: 'custom_mcp_server', step: '3a', label: 'Agent-tool interactions', labelOffsetX: 65, color: '#1A73E8', exitX: 0.3, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 494, y: 555 }, { x: 380, y: 555 }] }, isDark)}
        \${renderCleanEdge({ id: 'e3a_img', source: 'analyst_image', target: 'custom_mcp_server', color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 260, y: 555 }, { x: 380, y: 555 }] }, isDark)}

        <!-- 3b: Structured data analyst straight down into BigQuery MCP server -->
        \${renderCleanEdge({ id: 'e3b', source: 'analyst_structured', target: 'bq_mcp_server', step: '3b', label: 'Agent-tool interactions', labelOffsetX: 65, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e_gcs_fetch', source: 'tool_multimodal_gcs', target: 'custom_mcp_server', label: 'Fetch raw unstructured data (e.g. images, videos)', labelOffsetX: -115, color: '#1E293B', exitX: 0.5, exitY: 0, entryX: 0.5, entryY: 1 }, isDark)}
        \${renderCleanEdge({ id: 'e_bq_fetch', source: 'tool_observational_bq', target: 'bq_mcp_server', label: 'Fetch structured, tabular data', labelOffsetX: 85, color: '#1E293B', exitX: 0.5, exitY: 0, entryX: 0.5, entryY: 1 }, isDark)}

        \${renderCleanEdge({ id: 'e_adk_req', source: 'adk_box_multi', target: 'gemini_platform_card', label: 'Inference requests', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.3, entryX: 0, entryY: 0.3 }, isDark)}
        \${renderCleanEdge({ id: 'e_adk_resp', source: 'gemini_platform_card', target: 'agent_runtime_box', label: 'Inference responses', labelOffsetY: 12, color: '#1E293B', exitX: 0, exitY: 0.8, entryX: 1, entryY: 0.25 }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>\`;
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

    return \`<mxfile host="embed.diagrams.net">
  <diagram id="gcp_multitenant_agentic" name="Multi-Tenant Agentic AI System in Google Cloud">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="\${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Outer Boundary -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${outerBorder};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="1000" as="geometry"/>
        </mxCell>

        <!-- Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Multi-Tenant Agentic AI System (VPC-SC Perimeter)</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Architecture Center Official</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="70" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- External Tenant Users Top -->
        <mxCell id="actor_tenant_users" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">🏢</div><div><div style="font-size:12px;font-weight:800;color:\${textColor};">Tenant Users</div><div style="font-size:8.5px;color:\${subtextColor};">Corporate Identity</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="130" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- Ingress Column: Load Balancer, Armor, IAP, Frontend -->
        <mxCell id="zone_ingress" value="\${encodeXml(\`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#1E40AF;">Central Ingress Hub</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#1E3A8A20' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="235" width="340" height="510" as="geometry"/>
        </mxCell>

        <mxCell id="node_gclb" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11.5px;font-weight:800;color:\${textColor};">External App Load Balancer</div><div style="font-size:8.5px;color:\${subtextColor};">Global L7 Anycast</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="120" y="275" width="300" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_armor_edge" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Cloud Armor &amp; Model Armor</div><div style="font-size:8.5px;color:\${subtextColor};">DDoS &amp; Edge Prompt Scrubbing</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="380" width="300" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_iap" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('iap', 24)}<div><div style="font-size:11.5px;font-weight:800;color:\${textColor};">Identity-Aware Proxy (IAP)</div><div style="font-size:8.5px;color:\${subtextColor};">Zero Trust Identity Verification</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="120" y="485" width="300" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_frontend_portal" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_run', 24)}<div><div style="font-size:11.5px;font-weight:800;color:\${textColor};">Frontend Routing Engine</div><div style="font-size:8.5px;color:\${subtextColor};">Cloud Run (Tenant Dispatcher)</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="590" width="300" height="60" as="geometry"/>
        </mxCell>

        <!-- Tenant Spokes Enclave -->
        <mxCell id="zone_tenants" value="\${encodeXml(\`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#0D5F3A;">Isolated Tenant Spokes (Principal Access Boundary Enforced)</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B20' : '#E6F4EA'};strokeColor=#12B76A;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="480" y="235" width="580" height="510" as="geometry"/>
        </mxCell>

        <!-- Tenant A Project Box -->
        <mxCell id="box_tenant_a" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#0D5F3A;">Tenant Project A (Finance)</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#12B76A;strokeWidth=1.2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="500" y="280" width="540" height="195" as="geometry"/>
        </mxCell>

        <mxCell id="agent_tenant_a" value="\${encodeXml(\`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">\${getIconSvgHtml('vertex_ai', 20)}<div style="font-size:10.5px;font-weight:800;color:\${textColor};margin-top:2px;">Agent Runtime</div><div style="font-size:8px;color:\${subtextColor};">ADK Finance Worker</div></div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="520" y="325" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="armor_tenant_a" value="\${encodeXml(\`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">\${getIconSvgHtml('cloud_armor', 20)}<div style="font-size:10.5px;font-weight:800;color:#6B21A8;margin-top:2px;">Model Armor</div><div style="font-size:8px;color:\${subtextColor};">DLP PII Redaction</div></div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="695" y="325" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="db_tenant_a" value="\${encodeXml(\`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">\${getIconSvgHtml('bigquery', 20)}<div style="font-size:10.5px;font-weight:800;color:#0369A1;margin-top:2px;">BigQuery Finance</div><div style="font-size:8px;color:\${subtextColor};">Sovereign Dataset</div></div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="870" y="325" width="150" height="75" as="geometry"/>
        </mxCell>

        <!-- Tenant B Project Box -->
        <mxCell id="box_tenant_b" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#0D5F3A;">Tenant Project B (Healthcare)</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#12B76A;strokeWidth=1.2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="500" y="505" width="540" height="195" as="geometry"/>
        </mxCell>

        <mxCell id="agent_tenant_b" value="\${encodeXml(\`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">\${getIconSvgHtml('vertex_ai', 20)}<div style="font-size:10.5px;font-weight:800;color:\${textColor};margin-top:2px;">Agent Runtime</div><div style="font-size:8px;color:\${subtextColor};">ADK Clinical Worker</div></div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="520" y="550" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="armor_tenant_b" value="\${encodeXml(\`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">\${getIconSvgHtml('cloud_armor', 20)}<div style="font-size:10.5px;font-weight:800;color:#6B21A8;margin-top:2px;">Model Armor</div><div style="font-size:8px;color:\${subtextColor};">HIPAA PHI Redaction</div></div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="695" y="550" width="150" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="db_tenant_b" value="\${encodeXml(\`<div style="padding:6px 8px;font-family:'Google Sans',sans-serif;">\${getIconSvgHtml('spanner', 20)}<div style="font-size:10.5px;font-weight:800;color:#0369A1;margin-top:2px;">AlloyDB Healthcare</div><div style="font-size:8px;color:\${subtextColor};">Sovereign Dataset</div></div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${cardStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="870" y="550" width="150" height="75" as="geometry"/>
        </mxCell>

        <!-- Right Column: Governance Hub -->
        <mxCell id="zone_governance" value="\${encodeXml(\`<div style="padding:8px 12px;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:#475569;">Central Governance &amp; Security Hub</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#33415520' : '#F8FAFC'};strokeColor=#64748B;strokeWidth=1.5;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="1100" y="235" width="380" height="510" as="geometry"/>
        </mxCell>

        <mxCell id="node_scc" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('scc', 24)}<div><div style="font-size:11.5px;font-weight:800;color:\${textColor};">Security Command Center</div><div style="font-size:8.5px;color:\${subtextColor};">Threat Detection &amp; Compliance</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1125" y="285" width="330" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_logging" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_logging', 24)}<div><div style="font-size:11.5px;font-weight:800;color:\${textColor};">Central Cloud Logging</div><div style="font-size:8.5px;color:\${subtextColor};">Aggregated Audit Trails</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1125" y="390" width="330" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="node_iam" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_armor', 24)}<div><div style="font-size:11.5px;font-weight:800;color:\${textColor};">Cloud IAM &amp; PAB Policies</div><div style="font-size:8.5px;color:\${subtextColor};">Principal Access Boundary</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1125" y="495" width="330" height="60" as="geometry"/>
        </mxCell>

        <!-- Bottom Model Platform Box -->
        <mxCell id="bottom_gemini_platform" value="\${encodeXml(\`<div style="padding:8px 16px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:space-between;height:100%;"><div style="display:flex;align-items:center;gap:12px;">\${getIconSvgHtml('gemini', 36)}<div><div style="font-size:13px;font-weight:800;color:#1A73E8;">Gemini Enterprise Agent Platform (Shared Multi-Tenant Inference Core)</div><div style="font-size:8.5px;color:\${subtextColor};">Dedicated per-tenant quota allocation with zero cross-tenant learning or logging</div></div></div><div style="display:flex;gap:8px;"><span style="background:#EFF6FF;color:#1D4ED8;font-size:8.5px;font-weight:700;padding:3px 8px;border-radius:4px;border:1px solid #93C5FD;">Zero Data Logging</span><span style="background:#EFF6FF;color:#1D4ED8;font-size:8.5px;font-weight:700;padding:3px 8px;border-radius:4px;border:1px solid #93C5FD;">Dedicated Quotas</span></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#1E293B' : '#F0F9FF'};strokeColor=#38BDF8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="100" y="785" width="1380" height="85" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        \${renderCleanEdge({ id: 'e1', source: 'actor_tenant_users', target: 'node_gclb', step: '1', label: 'HTTPS request', labelOffsetX: 40, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e2', source: 'node_gclb', target: 'node_armor_edge', step: '2', label: 'Edge inspection', labelOffsetX: 40, color: '#9333EA', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e3', source: 'node_armor_edge', target: 'node_iap', step: '3', label: 'Verify identity', labelOffsetX: 40, color: '#1E40AF', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e4', source: 'node_iap', target: 'node_frontend_portal', step: '4', label: 'Tenant identification', labelOffsetX: 45, color: '#2563EB', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e5_a', source: 'node_frontend_portal', target: 'agent_tenant_a', step: '5a', label: 'Route Tenant A', labelOffsetY: -12, color: '#12B76A', exitX: 1, exitY: 0.3, entryX: 0, entryY: 0.5, waypoints: [{ x: 455, y: 608 }, { x: 455, y: 362 }] }, isDark)}
        \${renderCleanEdge({ id: 'e5_b', source: 'node_frontend_portal', target: 'agent_tenant_b', step: '5b', label: 'Route Tenant B', labelOffsetY: -12, color: '#12B76A', exitX: 1, exitY: 0.7, entryX: 0, entryY: 0.5, waypoints: [{ x: 455, y: 632 }, { x: 455, y: 587 }] }, isDark)}

        \${renderCleanEdge({ id: 'e6_a', source: 'agent_tenant_a', target: 'armor_tenant_a', step: '6', label: 'DLP scrub', labelOffsetY: -12, color: '#9333EA', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        \${renderCleanEdge({ id: 'e7_a', source: 'armor_tenant_a', target: 'db_tenant_a', step: '7', label: 'MCP query', labelOffsetY: -12, color: '#0284C7', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        \${renderCleanEdge({ id: 'e6_b', source: 'agent_tenant_b', target: 'armor_tenant_b', step: '6', label: 'PHI scrub', labelOffsetY: -12, color: '#9333EA', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        \${renderCleanEdge({ id: 'e7_b', source: 'armor_tenant_b', target: 'db_tenant_b', step: '7', label: 'MCP query', labelOffsetY: -12, color: '#0284C7', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}

        <!-- Collision-Free Route to Gemini Platform (Routes down left open channel, completely bypassing Tenant B) -->
        \${renderCleanEdge({ id: 'e8_a', source: 'agent_tenant_a', target: 'bottom_gemini_platform', step: '8', label: 'Model inference', labelOffsetX: -45, color: '#1A73E8', exitX: 0.1, exitY: 1, entryX: 0.28, entryY: 0, waypoints: [{ x: 465, y: 440 }, { x: 465, y: 770 }] }, isDark)}
        \${renderCleanEdge({ id: 'e8_b', source: 'agent_tenant_b', target: 'bottom_gemini_platform', color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.36, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e_audit', source: 'zone_tenants', target: 'node_logging', label: 'Audit logs', color: '#64748B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5, dashed: true }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>\`;
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

    return \`<mxfile host="embed.diagrams.net">
  <diagram id="gcp_deepsea_agentic" name="Autonomous Deep-Sea Robotic Fleet in Google Cloud">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" background="\${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Actors (Outside GCP with generous 50px top margin) -->
        <mxCell id="actor_fleet_cmd" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">🚢</div><div><div style="font-size:12px;font-weight:800;color:\${textColor};">Fleet Operations</div><div style="font-size:8px;color:\${subtextColor};">Mission Scientists</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="50" width="180" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="actor_auv_swarm" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;"><div style="font-size:22px;">🤖</div><div><div style="font-size:12px;font-weight:800;color:\${textColor};">AUV Swarm Fleet</div><div style="font-size:8px;color:#2563EB;font-weight:700;">Acoustic Modem</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="710" y="50" width="180" height="55" as="geometry"/>
        </mxCell>

        <!-- Outer Google Cloud Boundary -->
        <mxCell id="gcp_outer_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${bgCanvas};strokeColor=\${outerBorder};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="950" as="geometry"/>
        </mxCell>

        <!-- Header Ribbon -->
        <mxCell id="gcp_header_ribbon" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:100%;font-family:'Google Sans',Roboto,sans-serif;color:#FFFFFF;"><div style="display:flex;align-items:center;gap:10px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF"/></svg><span style="font-size:16px;font-weight:700;">Google Cloud</span><span style="font-size:11px;font-weight:400;opacity:0.9;margin-left:8px;">| Solution Architecture: Autonomous Deep-Sea Robotic Fleet (Closed-Loop Agentic Mesh)</span></div><div style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:12px;">Dialect A Solution Standard</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=none;align=left;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="1480" height="42" as="geometry"/>
        </mxCell>

        <!-- Satellite Ingress Gateway -->
        <mxCell id="ingress_pubsub" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('cloud_run', 28)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Satellite Ingress</div><div style="font-size:9px;color:\${subtextColor};">Cloud Pub/Sub Stream</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="110" y="215" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Agents Enclave -->
        <mxCell id="agents_enclave" value="\${encodeXml(\`<div style="padding:10px 14px;font-family:'Google Sans',sans-serif;font-size:15px;font-weight:800;color:#0D5F3A;">Agents (Mission Control &amp; Swarm Mesh)</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B20' : '#E6F4EA'};strokeColor=#12B76A;strokeWidth=2;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="80" y="310" width="700" height="530" as="geometry"/>
        </mxCell>

        <!-- Mission Coordinator Agent -->
        <mxCell id="mission_coordinator_agent" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('vertex_ai', 26)}<div><div style="font-size:12.5px;font-weight:800;color:\${textColor};">Mission coordinator</div><div style="font-size:9px;color:#0D5F3A;font-weight:700;">Agent</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#12B76A;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="110" y="345" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Sequence: Telemetry Processing -->
        <mxCell id="box_sequence_deepsea" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;font-size:11.5px;font-weight:800;color:#0D5F3A;">Sequential telemetry processing</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;" vertex="1" parent="1">
          <mxGeometry x="100" y="450" width="200" height="230" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_telemetry_intake" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Telemetry intake</div><div style="font-size:8.5px;color:\${subtextColor};">Acoustic Decoder</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="485" width="170" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="subagent_anomaly_detector" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Anomaly detector</div><div style="font-size:8.5px;color:\${subtextColor};">Plume Scanner</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="115" y="595" width="170" height="55" as="geometry"/>
        </mxCell>

        <!-- Iterative Navigation Refinement Pattern -->
        <mxCell id="box_iterative_deepsea" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;justify-content:flex-end;"><span style="font-size:11.5px;font-weight:800;color:#0D5F3A;">Iterative navigation refinement</span></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#064E3B30' : '#F0FDF4'};strokeColor=#12B76A;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=right;" vertex="1" parent="1">
          <mxGeometry x="320" y="450" width="440" height="230" as="geometry"/>
        </mxCell>

        <!-- Trajectory Planner Subagent -->
        <mxCell id="subagent_trajectory" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Trajectory planner</div><div style="font-size:8.5px;color:\${subtextColor};">3D Kinematic Path</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="485" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Safety Sandbox Critic -->
        <mxCell id="subagent_safety_critic" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Safety sandbox</div><div style="font-size:8.5px;color:\${subtextColor};">Collision Critic</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="595" width="165" height="55" as="geometry"/>
        </mxCell>

        <!-- Path Refiner Subagent -->
        <mxCell id="subagent_path_refiner" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('vertex_ai', 22)}<div><div style="font-size:11px;font-weight:800;color:\${textColor};">Path refiner</div><div style="font-size:8.5px;color:\${subtextColor};">Obstacle Avoidance</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="570" y="540" width="175" height="55" as="geometry"/>
        </mxCell>

        <!-- Downlink Dispatcher Subagent -->
        <mxCell id="downlink_dispatcher_agent" value="\${encodeXml(\`<div style="padding:6px 12px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:10px;height:100%;">\${getIconSvgHtml('gemini', 24)}<div><div style="font-size:12px;font-weight:800;color:\${textColor};">Downlink Dispatcher</div><div style="font-size:9px;color:\${subtextColor};">Actuation Telecommand</div></div></div>\`)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#12B76A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="140" y="720" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- ADK & Model Armor -->
        <mxCell id="node_adk_deepsea" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:\${textColor};">ADK</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="310" width="60" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="node_armor_deepsea" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('cloud_armor', 26)}<div><div style="font-size:11.5px;font-weight:800;color:#6B21A8;">Model Armor Kinematics</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="870" y="355" width="180" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_deepsea" value="\${encodeXml(\`<div style="padding:6px 10px;font-family:'Google Sans',sans-serif;display:flex;align-items:center;gap:8px;height:100%;">\${getIconSvgHtml('gemini', 28)}<div><div style="font-size:12px;font-weight:800;color:#1A73E8;">Gemini 2.5 Pro</div><div style="font-size:8.5px;color:\${subtextColor};">Multimodal Sonar Engine</div></div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1090" y="355" width="180" height="55" as="geometry"/>
        </mxCell>

        <!-- Subsea Tools & MCP -->
        <mxCell id="node_mcp_deepsea" value="\${encodeXml(\`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:'Google Sans',sans-serif;font-size:12px;font-weight:800;color:\${textColor};">Subsea MCP</div>\`)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="700" width="100" height="45" as="geometry"/>
        </mxCell>

        <mxCell id="box_subsea_tools" value="\${encodeXml(\`<div style="padding:4px 8px;font-family:'Google Sans',sans-serif;font-size:11px;font-weight:800;color:#1E40AF;">Subsea Tools &amp; Datastores</div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${isDark ? '#1E3A8A20' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=bottom;align=left;" vertex="1" parent="1">
          <mxGeometry x="890" y="695" width="340" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="tool_spanner_subsea" value="\${encodeXml(\`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">\${getIconSvgHtml('spanner', 22)}<div style="font-size:10.5px;font-weight:800;color:\${textColor};margin-top:2px;">Cloud Spanner nam3</div><div style="font-size:8px;color:\${subtextColor};">Bathymetric Graph</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="905" y="710" width="145" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="tool_bq_subsea" value="\${encodeXml(\`<div style="padding:6px;font-family:'Google Sans',sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">\${getIconSvgHtml('bigquery', 22)}<div style="font-size:10.5px;font-weight:800;color:\${textColor};margin-top:2px;">BigQuery Lakehouse</div><div style="font-size:8px;color:\${subtextColor};">Sensor Telemetry</div></div>\`)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=\${cardFill};strokeColor=\${cardStroke};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1065" y="710" width="145" height="85" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        \${renderCleanEdge({ id: 'e1', source: 'actor_auv_swarm', target: 'ingress_pubsub', step: '1', label: 'Burst acoustic telemetry', labelOffsetY: -12, color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 800, y: 120 }, { x: 210, y: 120 }] }, isDark)}
        \${renderCleanEdge({ id: 'e2', source: 'ingress_pubsub', target: 'mission_coordinator_agent', step: '2', color: '#1A73E8', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e3_split', source: 'mission_coordinator_agent', target: 'subagent_telemetry_intake', step: '3', label: 'Subagent dispatch', labelOffsetX: 50, color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 210, y: 425 }, { x: 200, y: 425 }] }, isDark)}
        \${renderCleanEdge({ id: 'e3_b', source: 'mission_coordinator_agent', target: 'subagent_trajectory', color: '#0F5132', exitX: 0.9, exitY: 1, entryX: 0.5, entryY: 0, waypoints: [{ x: 290, y: 425 }, { x: 422, y: 425 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_seq', source: 'subagent_telemetry_intake', target: 'subagent_anomaly_detector', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}

        \${renderCleanEdge({ id: 'e_iter_down', source: 'subagent_trajectory', target: 'subagent_safety_critic', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e_iter_rework', source: 'subagent_safety_critic', target: 'subagent_path_refiner', label: 'Obstacle detected', labelOffsetY: 12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 530, y: 622 }, { x: 657, y: 622 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_iter_update', source: 'subagent_path_refiner', target: 'subagent_trajectory', label: 'Recalculate route', labelOffsetY: -12, color: '#0F5132', exitX: 0.5, exitY: 0, entryX: 1, entryY: 0.5, waypoints: [{ x: 657, y: 512 }] }, isDark)}

        \${renderCleanEdge({ id: 'e4_a', source: 'subagent_anomaly_detector', target: 'downlink_dispatcher_agent', step: '4', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.3, entryY: 0 }, isDark)}
        \${renderCleanEdge({ id: 'e4_b', source: 'subagent_safety_critic', target: 'downlink_dispatcher_agent', color: '#0F5132', exitX: 0.5, exitY: 1, entryX: 0.8, entryY: 0, waypoints: [{ x: 422, y: 690 }, { x: 316, y: 690 }] }, isDark)}

        \${renderCleanEdge({ id: 'e5_return', source: 'downlink_dispatcher_agent', target: 'mission_coordinator_agent', step: '5', label: 'Flight clearance', labelOffsetY: -12, color: '#0F5132', exitX: 1, exitY: 0.5, entryX: 1, entryY: 0.5, waypoints: [{ x: 745, y: 750 }, { x: 745, y: 375 }] }, isDark)}

        \${renderCleanEdge({ id: 'e_inf_req', source: 'node_adk_deepsea', target: 'node_armor_deepsea', label: 'Kinematic check', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        \${renderCleanEdge({ id: 'e_armor_model', source: 'node_armor_deepsea', target: 'node_gemini_deepsea', color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5 }, isDark)}
        \${renderCleanEdge({ id: 'e_inf_resp', source: 'node_gemini_deepsea', target: 'node_adk_deepsea', label: 'Inference response', labelOffsetY: 12, color: '#1E293B', exitX: 0.5, exitY: 1, entryX: 1, entryY: 0.85, waypoints: [{ x: 1180, y: 460 }, { x: 840, y: 460 }] }, isDark)}

        <!-- MCP Bus Lines for Subsea MCP (High Waypoint Routing Above Tools, Zero Card Slicing) -->
        \${renderCleanEdge({ id: 'e_mcp_spanner', source: 'node_mcp_deepsea', target: 'tool_spanner_subsea', label: 'MCP', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 977, y: 660 }] }, isDark)}
        \${renderCleanEdge({ id: 'e_mcp_bq', source: 'node_mcp_deepsea', target: 'tool_bq_subsea', label: 'MCP', labelOffsetY: -12, color: '#1E293B', exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 0, waypoints: [{ x: 875, y: 722 }, { x: 875, y: 660 }, { x: 1137, y: 660 }] }, isDark)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>\`;
  }
};

export const ALL_GCP_DIALECT_A_ARCHITECTURES: GcpArchitectureDef[] = [
  GCP_MULTIAGENT_CORE,
  GCP_MULTIMODAL_CLASSIFY,
  GCP_MULTITENANT_AGENTIC,
  GCP_DEEPSEA_AGENTIC
];

export function getGcpArchitectureById(id: string): GcpArchitectureDef | undefined {
  return ALL_GCP_DIALECT_A_ARCHITECTURES.find((arch) => arch.id === id);
}
`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('✅ Successfully wrote clean, collision-free src/lib/gcpDialectA.ts');
