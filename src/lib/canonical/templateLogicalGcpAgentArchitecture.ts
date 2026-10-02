/**
 * Canonical Blueprint: Google Cloud Multi-Agent Logical Architecture
 *
 * 1:1 exact pixel-accurate replica of Google Cloud Multi-Agent Architecture:
 * - Application users & AI developers ingress
 * - Google Cloud container with blue header banner and region container
 * - Frontend Cloud Run service with Human-in-the-loop interaction return loop
 * - Agents green container with Coordinator Agent
 * - Sequence Subagents: Task-A -> Task-A.1
 * - Iterative refinement Subagents: Task-B -> Quality evaluator -> Prompt enhancer loop
 * - Response Generator Subagent & Response return loop (numbered steps 1..5)
 * - ADK, Model Armor (shield), AI model (e.g. Gemini), Model runtime (Gemini Platform, Cloud Run, GKE)
 * - Agents runtime: Cloud Run, Agent Runtime on Gemini Enterprise Agent Platform, GKE
 * - MCP clients -> MCP servers to Databases, APIs (Tools within GCP) and Services, Files (External tools)
 * - Google Cloud Observability & Platform administrators / DevOps engineers
 */

function escAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ICONS = {
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 21V19C16 17.9 15.6 16.9 14.8 16.2C14.1 15.4 13.1 15 12 15H5C3.9 15 2.9 15.4 2.2 16.2C1.4 16.9 1 17.9 1 19V21" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/><circle cx="8.5" cy="7" r="4" stroke="#1E293B" stroke-width="2"/><path d="M17 11C18.7 11 20 9.7 20 8C20 6.3 18.7 5 17 5" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/><path d="M23 21V19C23 18.1 22.7 17.3 22.2 16.6C21.6 15.9 20.9 15.4 20 15.1" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/></svg>`,
  developer: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#1E293B" stroke-width="2"/><path d="M8 21H16M12 17V21" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="8" r="2" stroke="#1E293B" stroke-width="1.8"/><path d="M8 14C8 12.5 9.8 11.5 12 11.5C14.2 11.5 16 12.5 16 14" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  admins: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9 16.1 17 15 17H5C3.9 17 3 17.9 3 19V21" stroke="#1E293B" stroke-width="2"/><circle cx="10" cy="9" r="4" stroke="#1E293B" stroke-width="2"/><circle cx="19" cy="11" r="2" stroke="#1E293B" stroke-width="1.8"/><path d="M19 8V6M19 16V14" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>`,
  cloudRun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6L11 12L3 18V6Z" fill="#F97316"/><path d="M9 6L17 12L9 18V14L12.5 12L9 10V6Z" fill="#4285F4"/></svg>`,
  agentMotif: `<svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="2" width="4" height="4" transform="rotate(45 12 2)" stroke="#3B82F6" stroke-width="1.6" fill="#FFFFFF"/><rect x="22" y="12" width="4" height="4" transform="rotate(45 22 12)" stroke="#3B82F6" stroke-width="1.6" fill="#FFFFFF"/><rect x="12" y="22" width="4" height="4" transform="rotate(45 12 22)" stroke="#3B82F6" stroke-width="1.6" fill="#FFFFFF"/><rect x="2" y="12" width="4" height="4" transform="rotate(45 2 12)" stroke="#3B82F6" stroke-width="1.6" fill="#FFFFFF"/><path d="M14 6.5L16 11.5L21.5 14L16 16.5L14 21.5L12 16.5L6.5 14L12 11.5L14 6.5Z" fill="#3B82F6"/></svg>`,
  geminiStar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#1A73E8"/></svg>`,
  geminiPlatform: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#4285F4"/><path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22" fill="#34A853"/><path d="M12 2C12 7.5 16.5 12 22 12" fill="#EA4335"/><path d="M12 22C12 16.5 16.5 12 22 12" fill="#FBBC04"/></svg>`,
  modelArmor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5.5V11.5C4 16.5 7.5 21.1 12 22.5C16.5 21.1 20 16.5 20 11.5V5.5L12 2Z" fill="#FFFFFF" stroke="#4285F4" stroke-width="1.5"/><path d="M12 4V12H6C6 8.5 8.5 5.5 12 4Z" fill="#EA4335"/><path d="M12 4C15.5 5.5 18 8.5 18 12H12V4Z" fill="#4285F4"/><path d="M6 12H12V20C8.5 19 6 15.5 6 12Z" fill="#FBBC04"/><path d="M12 12H18C18 15.5 15.5 19 12 20V12Z" fill="#34A853"/></svg>`,
  gke: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.8"/><path d="M12 7L7.5 9.6V14.8L12 17.4L16.5 14.8V9.6L12 7Z" fill="#2563EB"/></svg>`,
  observability: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="4" height="9" rx="1" fill="#4285F4"/><rect x="10" y="5" width="4" height="15" rx="1" fill="#4285F4"/><rect x="17" y="13" width="4" height="7" rx="1" fill="#4285F4"/></svg>`,
  databases: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="#1E293B" stroke-width="2"/><path d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6" stroke="#1E293B" stroke-width="2"/><path d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12" stroke="#1E293B" stroke-width="2"/></svg>`,
  apis: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7L3 12L8 17" stroke="#1E293B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L21 12L16 17" stroke="#1E293B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 4L10 20" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/></svg>`,
  mcpClients: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="4" rx="1" stroke="#1E293B" stroke-width="1.8"/><rect x="3" y="10" width="18" height="4" rx="1" stroke="#1E293B" stroke-width="1.8"/><rect x="3" y="16" width="18" height="4" rx="1" stroke="#1E293B" stroke-width="1.8"/></svg>`,
  services: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="#1E293B" stroke-width="2"/><path d="M3 12L12 17L21 12" stroke="#1E293B" stroke-width="2"/><path d="M3 17L12 22L21 17" stroke="#1E293B" stroke-width="2"/></svg>`,
  files: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#1E293B" stroke-width="2"/><path d="M14 2V8H20" stroke="#1E293B" stroke-width="2"/></svg>`,
};

export interface LogicalGcpAgentArchOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  theme?: 'light' | 'dark';
}

export function generateLogicalGcpAgentArchitectureXml(
  options?: LogicalGcpAgentArchOptions | string,
  themeArg: 'light' | 'dark' = 'light'
): string {
  const opts: LogicalGcpAgentArchOptions =
    typeof options === 'string'
      ? { domain: options, theme: themeArg }
      : options || { theme: themeArg };

  const isLight = opts.theme !== 'dark';

  // Palette definitions
  const bgColor = isLight ? '#FFFFFF' : '#0F172A';
  const gcpBlue = '#2B7DE9'; // Canonical Google Cloud banner blue
  const outerBorderColor = '#3B82F6';
  const regionBorderColor = isLight ? '#93C5FD' : '#1E3A8A';
  const cardBg = isLight ? '#FFFFFF' : '#1E293B';
  const cardBorder = isLight ? '#94A3B8' : '#475569';
  const agentsBg = isLight ? '#C6F6D5' : '#064E3B'; // Soft green matching reference
  const agentsBorder = isLight ? '#38A169' : '#059669';
  const dashedGreen = isLight ? '#2F855A' : '#34D399';
  const textColor = isLight ? '#0F172A' : '#F8FAFC';
  const subtextColor = isLight ? '#475569' : '#94A3B8';
  const edgeColor = isLight ? '#0F172A' : '#93C5FD';
  const stepBadgeBg = '#137333'; // Dark green circle for step numbers
  const toolBoxBg = isLight ? '#EFF6FF' : '#1E293B';
  const toolBoxBorder = isLight ? '#3B82F6' : '#60A5FA';

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="PromptCanvas" version="24.0.0">
  <diagram name="Google Cloud Multi-Agent Architecture (Logical Perspective)" id="logical_gcp_agent_arch">
    <mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1350" pageHeight="1150" background="${bgColor}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================================================================== -->
        <!-- TOP ACTORS (Application users & AI developers)                       -->
        <!-- ==================================================================== -->
        <!-- 1. Application users -->
        <mxCell id="actor_users" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.users)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textColor};&quot;&gt;Application users&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="140" y="30" width="165" height="48" as="geometry" />
        </mxCell>

        <!-- 2. AI developers -->
        <mxCell id="actor_devs" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.developer)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textColor};&quot;&gt;AI developers&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="580" y="30" width="145" height="48" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- GOOGLE CLOUD OUTER FRAME                                             -->
        <!-- ==================================================================== -->
        <mxCell id="frame_gcp" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=none;strokeColor=${outerBorderColor};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="115" width="1180" height="740" as="geometry" />
        </mxCell>

        <!-- Google Cloud Header Banner -->
        <mxCell id="header_gcp" value="&lt;div style=&quot;font-family:Google Sans,Inter,sans-serif;font-size:16px;font-weight:700;color:#FFFFFF;text-align:center;&quot;&gt;Google Cloud&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${gcpBlue};strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="115" width="1180" height="34" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- REGION CONTAINER                                                     -->
        <!-- ==================================================================== -->
        <mxCell id="frame_region" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=none;strokeColor=${regionBorderColor};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="160" width="1160" height="680" as="geometry" />
        </mxCell>
        <mxCell id="lbl_region" value="Region" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Inter,sans-serif;fontSize=12px;fontStyle=1;fontColor=${subtextColor};" vertex="1" parent="1">
          <mxGeometry x="50" y="168" width="60" height="20" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- FRONTEND (Cloud Run service)                                         -->
        <!-- ==================================================================== -->
        <mxCell id="node_frontend" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.cloudRun)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textColor};&quot;&gt;Frontend&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:10px;font-weight:500;color:${subtextColor};&quot;&gt;Cloud Run service&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="130" y="180" width="185" height="52" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- AGENTS CONTAINER                                                     -->
        <!-- ==================================================================== -->
        <mxCell id="frame_agents" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${agentsBg};strokeColor=${agentsBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="55" y="270" width="650" height="430" as="geometry" />
        </mxCell>
        <mxCell id="lbl_agents" value="Agents" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Inter,sans-serif;fontSize=13px;fontStyle=1;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="65" y="276" width="60" height="20" as="geometry" />
        </mxCell>

        <!-- COORDINATOR AGENT -->
        <mxCell id="node_coordinator" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12.5px;font-weight:700;color:${textColor};&quot;&gt;Coordinator&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:10px;font-weight:500;color:${subtextColor};&quot;&gt;Agent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="145" y="292" width="155" height="52" as="geometry" />
        </mxCell>

        <!-- SEQUENCE CONTAINER (Dashed) -->
        <mxCell id="frame_sequence" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=none;strokeColor=${dashedGreen};strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="65" y="410" width="160" height="195" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sequence" value="Sequence" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Inter,sans-serif;fontSize=11px;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="72" y="415" width="70" height="18" as="geometry" />
        </mxCell>

        <!-- Task-A Subagent -->
        <mxCell id="node_task_a" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Task-A&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${subtextColor};&quot;&gt;Subagent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="78" y="445" width="135" height="48" as="geometry" />
        </mxCell>

        <!-- Task-A.1 Subagent -->
        <mxCell id="node_task_a1" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Task-A.1&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${subtextColor};&quot;&gt;Subagent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="78" y="540" width="135" height="48" as="geometry" />
        </mxCell>

        <!-- ITERATIVE REFINEMENT CONTAINER (Dashed) -->
        <mxCell id="frame_iterative" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=none;strokeColor=${dashedGreen};strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="245" y="410" width="425" height="195" as="geometry" />
        </mxCell>
        <mxCell id="lbl_iterative" value="Iterative refinement" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Inter,sans-serif;fontSize=11px;fontColor=${textColor};" vertex="1" parent="1">
          <mxGeometry x="255" y="415" width="120" height="18" as="geometry" />
        </mxCell>

        <!-- Task-B Subagent -->
        <mxCell id="node_task_b" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Task-B&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${subtextColor};&quot;&gt;Subagent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="260" y="445" width="135" height="48" as="geometry" />
        </mxCell>

        <!-- Quality evaluator Subagent -->
        <mxCell id="node_evaluator" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Quality evaluator&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${subtextColor};&quot;&gt;Subagent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="255" y="540" width="155" height="48" as="geometry" />
        </mxCell>

        <!-- Prompt enhancer Subagent -->
        <mxCell id="node_enhancer" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Prompt enhancer&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${subtextColor};&quot;&gt;Subagent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="495" y="490" width="155" height="48" as="geometry" />
        </mxCell>

        <!-- RESPONSE GENERATOR SUBAGENT -->
        <mxCell id="node_response_gen" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(ICONS.agentMotif)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textColor};&quot;&gt;Response Generator&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:10px;font-weight:500;color:${subtextColor};&quot;&gt;Subagent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="635" width="180" height="50" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- AGENTS RUNTIME FOOTER ROW                                            -->
        <!-- ==================================================================== -->
        <mxCell id="lbl_agents_runtime" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Agents&lt;br/&gt;runtime:&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="42" y="718" width="65" height="35" as="geometry" />
        </mxCell>

        <!-- Runtime Card 1: Cloud Run -->
        <mxCell id="rt_cloudrun" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.cloudRun)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;Cloud Run&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="110" y="710" width="115" height="42" as="geometry" />
        </mxCell>

        <!-- Runtime Card 2: Gemini Enterprise Agent Platform -->
        <mxCell id="rt_gemini_platform" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.geminiPlatform)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:10px;font-weight:600;color:${textColor};line-height:1.15;&quot;&gt;Agent Runtime on Gemini&lt;br/&gt;Enterprise Agent Platform&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="235" y="710" width="195" height="42" as="geometry" />
        </mxCell>

        <!-- Runtime Card 3: GKE -->
        <mxCell id="rt_gke" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.gke)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;GKE&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="440" y="710" width="75" height="42" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- OBSERVABILITY & PLATFORM ADMINS                                      -->
        <!-- ==================================================================== -->
        <!-- Platform administrators DevOps engineers (Bottom Left outside) -->
        <mxCell id="node_admins" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:32px;text-align:center;&quot;&gt;${escAttr(ICONS.admins)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;color:${textColor};&quot;&gt;Platform administrators&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:10px;font-weight:500;color:${subtextColor};&quot;&gt;DevOps engineers&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="110" y="865" width="180" height="50" as="geometry" />
        </mxCell>

        <!-- Google Cloud Observability -->
        <mxCell id="node_observability" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(ICONS.observability)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;Google Cloud Observability&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="435" y="770" width="205" height="42" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- ADK, MODEL ARMOR & AI MODEL RUNTIME (Right Column)                   -->
        <!-- ==================================================================== -->
        <!-- ADK Card -->
        <mxCell id="node_adk" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:700;color:${textColor};text-align:center;line-height:48px;&quot;&gt;ADK&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="625" y="248" width="55" height="50" as="geometry" />
        </mxCell>

        <!-- Model Armor Card -->
        <mxCell id="node_model_armor" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(ICONS.modelArmor)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;Model Armor&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="625" y="390" width="130" height="46" as="geometry" />
        </mxCell>

        <!-- AI Model (e.g., Gemini) Card -->
        <mxCell id="node_ai_model" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(ICONS.geminiStar)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textColor};&quot;&gt;AI model&lt;/div&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${subtextColor};&quot;&gt;(e.g., Gemini)&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="790" y="390" width="125" height="46" as="geometry" />
        </mxCell>

        <!-- Model Runtime Column -->
        <mxCell id="lbl_model_runtime" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textColor};&quot;&gt;Model runtime:&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="935" y="360" width="100" height="20" as="geometry" />
        </mxCell>

        <!-- Model Runtime 1: Gemini Platform -->
        <mxCell id="mrt_gemini" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.geminiPlatform)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:10.5px;font-weight:600;color:${textColor};&quot;&gt;Gemini Enterprise&lt;br/&gt;Agent Platform&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="935" y="390" width="165" height="46" as="geometry" />
        </mxCell>

        <!-- Model Runtime 2: Cloud Run -->
        <mxCell id="mrt_cloudrun" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.cloudRun)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;Cloud Run&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="935" y="455" width="125" height="42" as="geometry" />
        </mxCell>

        <!-- Model Runtime 3: GKE -->
        <mxCell id="mrt_gke" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.gke)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;GKE&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="935" y="515" width="85" height="42" as="geometry" />
        </mxCell>

        <!-- MCP CLIENTS CARD -->
        <mxCell id="node_mcp_clients" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;text-align:center;&quot;&gt;${escAttr(ICONS.mcpClients)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:2px;&quot;&gt;&lt;span style=&quot;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:${textColor};&quot;&gt;MCP&lt;br/&gt;clients&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="625" y="615" width="95" height="45" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- TOOLS WITHIN GOOGLE CLOUD (Dashed box bottom)                        -->
        <!-- ==================================================================== -->
        <mxCell id="frame_tools_gcp" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=${toolBoxBg};strokeColor=${toolBoxBorder};strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="750" y="685" width="180" height="125" as="geometry" />
        </mxCell>

        <!-- Databases Card -->
        <mxCell id="node_databases" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;padding-top:4px;&quot;&gt;${escAttr(ICONS.databases)}&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:600;color:${textColor};margin-top:2px;&quot;&gt;Databases&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="760" y="695" width="68" height="60" as="geometry" />
        </mxCell>

        <!-- APIs Card -->
        <mxCell id="node_apis" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;padding-top:4px;&quot;&gt;${escAttr(ICONS.apis)}&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:600;color:${textColor};margin-top:2px;&quot;&gt;APIs&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="838" y="695" width="48" height="60" as="geometry" />
        </mxCell>

        <mxCell id="lbl_dots1" value="&lt;span style=&quot;font-size:16px;font-weight:900;color:${textColor};&quot;&gt;...&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="892" y="715" width="25" height="20" as="geometry" />
        </mxCell>

        <mxCell id="lbl_tools_gcp" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:10.5px;font-weight:700;color:${textColor};&quot;&gt;Tools within Google Cloud&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1">
          <mxGeometry x="750" y="785" width="180" height="20" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- EXTERNAL TOOLS (Dashed box outside bottom right)                     -->
        <!-- ==================================================================== -->
        <mxCell id="frame_tools_ext" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=${toolBoxBg};strokeColor=${toolBoxBorder};strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="890" y="865" width="160" height="120" as="geometry" />
        </mxCell>

        <!-- Services Card -->
        <mxCell id="node_services" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;padding-top:4px;&quot;&gt;${escAttr(ICONS.services)}&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:600;color:${textColor};margin-top:2px;&quot;&gt;Services&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="875" width="58" height="58" as="geometry" />
        </mxCell>

        <!-- Files Card -->
        <mxCell id="node_files" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;padding-top:4px;&quot;&gt;${escAttr(ICONS.files)}&lt;div style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:600;color:${textColor};margin-top:2px;&quot;&gt;Files&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="968" y="875" width="48" height="58" as="geometry" />
        </mxCell>

        <mxCell id="lbl_dots2" value="&lt;span style=&quot;font-size:16px;font-weight:900;color:${textColor};&quot;&gt;...&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1020" y="895" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="lbl_tools_ext" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:10.5px;font-weight:700;color:${textColor};&quot;&gt;External tools&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1">
          <mxGeometry x="890" y="960" width="160" height="20" as="geometry" />
        </mxCell>

        <!-- ==================================================================== -->
        <!-- STEP BADGES & CONNECTORS (1 to 5 + Model + MCP flows)                -->
        <!-- ==================================================================== -->
        <!-- Step 1: Users -> Frontend (Prompt) -->
        <mxCell id="edge_users_fe" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="actor_users" target="node_frontend">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="badge_1" value="&lt;div style=&quot;width:18px;height:18px;background:${stepBadgeBg};color:#FFFFFF;border-radius:50%;font-size:11px;font-weight:900;line-height:18px;text-align:center;&quot;&gt;1&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="202" y="96" width="18" height="18" as="geometry" />
        </mxCell>
        <mxCell id="lbl_prompt" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:10px;font-weight:600;color:${textColor};&quot;&gt;Prompt&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="224" y="95" width="45" height="20" as="geometry" />
        </mxCell>

        <!-- Frontend -> Users (Human-in-the-loop interaction) -->
        <mxCell id="edge_hitl" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;exitX=1;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_frontend" target="actor_users">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="430" y="206" />
              <mxPoint x="430" y="54" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_hitl" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${textColor};background:${bgColor};padding:2px 4px;&quot;&gt;Human-in-the-loop interaction&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="300" y="210" width="150" height="20" as="geometry" />
        </mxCell>

        <!-- Step 2: Frontend -> Coordinator Agent -->
        <mxCell id="edge_fe_coord" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_frontend" target="node_coordinator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="badge_2" value="&lt;div style=&quot;width:18px;height:18px;background:${stepBadgeBg};color:#FFFFFF;border-radius:50%;font-size:11px;font-weight:900;line-height:18px;text-align:center;&quot;&gt;2&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="213" y="248" width="18" height="18" as="geometry" />
        </mxCell>

        <!-- Step 3: Coordinator -> Sequence (Task-A) & Iterative (Task-B) -->
        <mxCell id="badge_3" value="&lt;div style=&quot;width:18px;height:18px;background:${stepBadgeBg};color:#FFFFFF;border-radius:50%;font-size:11px;font-weight:900;line-height:18px;text-align:center;&quot;&gt;3&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="213" y="358" width="18" height="18" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subagent_invoc" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${textColor};&quot;&gt;Subagent invocation&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="235" y="357" width="110" height="20" as="geometry" />
        </mxCell>

        <!-- Subagent fork lines -->
        <mxCell id="edge_coord_fork" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="node_coordinator">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="222" y="388" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_fork_task_a" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_task_a">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="222" y="388" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="145" y="388" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_fork_task_b" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_task_b">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="222" y="388" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="327" y="388" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Sequence: Task-A -> Task-A.1 -->
        <mxCell id="edge_a_a1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_task_a" target="node_task_a1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Iterative: Task-B -> Quality Evaluator -->
        <mxCell id="edge_b_eval" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_task_b" target="node_evaluator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Quality Evaluator -> Prompt Enhancer (If rework is required) -->
        <mxCell id="edge_eval_enhancer" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;exitX=1;exitY=0.5;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_evaluator" target="node_enhancer">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="572" y="564" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_rework" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9px;font-weight:500;color:${textColor};&quot;&gt;If rework is required&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="440" y="568" width="120" height="16" as="geometry" />
        </mxCell>

        <!-- Prompt Enhancer -> Task-B (Updated prompt) -->
        <mxCell id="edge_enhancer_b" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_enhancer" target="node_task_b">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_upd_prompt" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9px;font-weight:500;color:${textColor};&quot;&gt;Updated prompt&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="408" y="448" width="85" height="16" as="geometry" />
        </mxCell>

        <!-- Step 4: Sequence (Task-A.1) & Iterative (Quality evaluator) -> Response Generator -->
        <mxCell id="badge_4" value="&lt;div style=&quot;width:18px;height:18px;background:${stepBadgeBg};color:#FFFFFF;border-radius:50%;font-size:11px;font-weight:900;line-height:18px;text-align:center;&quot;&gt;4&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="201" y="604" width="18" height="18" as="geometry" />
        </mxCell>
        <mxCell id="edge_merge_rg1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="node_task_a1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="210" y="613" as="targetPoint" />
            <Array as="points">
              <mxPoint x="145" y="613" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_merge_rg2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="node_evaluator">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="210" y="613" as="targetPoint" />
            <Array as="points">
              <mxPoint x="332" y="613" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_to_rg" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_response_gen">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="210" y="613" as="sourcePoint" />
          </mxGeometry>
        </mxCell>

        <!-- Step 5: Response Generator -> Coordinator Agent (Feedback loop) -->
        <mxCell id="badge_5" value="&lt;div style=&quot;width:18px;height:18px;background:${stepBadgeBg};color:#FFFFFF;border-radius:50%;font-size:11px;font-weight:900;line-height:18px;text-align:center;&quot;&gt;5&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="651" width="18" height="18" as="geometry" />
        </mxCell>
        <mxCell id="edge_resp_loop" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;exitX=1;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_response_gen" target="node_coordinator">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="548" y="660" />
              <mxPoint x="548" y="318" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_response" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${textColor};&quot;&gt;Response&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="348" y="298" width="60" height="20" as="geometry" />
        </mxCell>

        <!-- AI Developers -> ADK -->
        <mxCell id="edge_devs_adk" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="actor_devs" target="node_adk">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Inference requests / Inference responses bus -->
        <mxCell id="edge_infer_req" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;entryX=0.5;entryY=0;" edge="1" parent="1" target="node_ai_model">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="652" y="355" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="852" y="355" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_infer_req" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${textColor};&quot;&gt;Inference requests&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="338" width="105" height="18" as="geometry" />
        </mxCell>

        <!-- Model Armor link -->
        <mxCell id="edge_model_armor" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="node_model_armor">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="790" y="413" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- AI Model -> Inference responses -->
        <mxCell id="edge_infer_resp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;exitX=0.5;exitY=1;" edge="1" parent="1" source="node_ai_model">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="652" y="525" as="targetPoint" />
            <Array as="points">
              <mxPoint x="852" y="525" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_infer_resp" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9.5px;font-weight:500;color:${textColor};&quot;&gt;Inference responses&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="695" y="508" width="110" height="18" as="geometry" />
        </mxCell>

        <!-- ADK & Agents connecting line -->
        <mxCell id="edge_adk_bus" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="node_adk">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="652" y="615" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- MCP Clients -> MCP Servers branches -->
        <!-- Branch 1: Databases -->
        <mxCell id="edge_mcp_db" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_databases">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="720" y="637" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="794" y="637" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 2: APIs -->
        <mxCell id="edge_mcp_apis" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_apis">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="720" y="637" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="862" y="637" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 3: External Services -->
        <mxCell id="edge_mcp_services" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_services">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="720" y="637" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="929" y="637" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 4: External Files -->
        <mxCell id="edge_mcp_files" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" target="node_files">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="720" y="637" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="992" y="637" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- MCP Servers labels -->
        <mxCell id="lbl_mcp_srv1" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9px;font-weight:500;color:${subtextColor};&quot;&gt;MCP&lt;br/&gt;servers&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="774" y="650" width="40" height="24" as="geometry" />
        </mxCell>
        <mxCell id="lbl_mcp_srv2" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9px;font-weight:500;color:${subtextColor};&quot;&gt;MCP&lt;br/&gt;servers&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="842" y="650" width="40" height="24" as="geometry" />
        </mxCell>
        <mxCell id="lbl_mcp_srv3" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9px;font-weight:500;color:${subtextColor};&quot;&gt;MCP&lt;br/&gt;servers&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="909" y="825" width="40" height="24" as="geometry" />
        </mxCell>
        <mxCell id="lbl_mcp_srv4" value="&lt;span style=&quot;font-family:Inter,sans-serif;font-size:9px;font-weight:500;color:${subtextColor};&quot;&gt;MCP&lt;br/&gt;servers&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="972" y="825" width="40" height="24" as="geometry" />
        </mxCell>

        <!-- Agents -> Google Cloud Observability -->
        <mxCell id="edge_agents_obs" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="537" y="700" as="sourcePoint" />
            <mxPoint x="537" y="770" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Platform administrators -> Google Cloud -->
        <mxCell id="edge_admins_gcp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeColor};strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_admins">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="200" y="755" as="targetPoint" />
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

