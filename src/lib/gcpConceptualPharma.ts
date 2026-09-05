/**
 * Conceptual Architecture: Pharma Drug Discovery Agentic AI Platform
 * 
 * Complies with Architectural Tenet & Rule 22:
 * - Capability & Boundary-Level Abstraction: Zero low-level infrastructure mechanics (VPCs, CIDRs, session cookies, port numbers).
 * - Google Cloud Architecture Center Public Documentation Standards & Branding:
 *   - Official Header Banner with Google Cloud platform icon, title, subtitle & standard metadata chips.
 *   - Official Google Cloud vector icons (Gemini, BigQuery, Vertex AI, GKE Autopilot, Compute Engine HPC).
 *   - 140px column pitch between cognitive mesh and biocompute foundation, ensuring 100% open channel label clearance.
 *   - Closed-loop causal lineage: Iterative SAR scaffold refinement loop, qualified lead synthesis handoff, and right-margin GxP audit trail ingress.
 *   - Zero empty space / voids across all 4 domain columns.
 * - The 4 Canonical Conceptual Flows (User Journey, Business Process, Domain Data, Enterprise Integration).
 */

import type { GcpArchitectureDef } from './gcpDialectA';
import { getGcpDataUri } from "./gcpIcons";

// 1. Google Cloud & DeepMind Official Vector Icons
const iconGemini = getGcpDataUri("gemini");
const iconVertexAi = getGcpDataUri("vertex_ai");
const iconBigQuery = getGcpDataUri("bigquery");
const iconGke = getGcpDataUri("gke_autopilot");
const iconCompute = getGcpDataUri("compute_engine");
const iconStorage = getGcpDataUri("cloud_storage");

// 2. Specialized Life Sciences Vector Icons (Crisp Inline SVGs)
const iconGcpCloud = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z" fill="#1A73E8"/></svg>')}`;
const iconChemist = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3H15M10 3V8L4 18C3.3 19.1 4.1 20.5 5.4 20.5H18.6C19.9 20.5 20.7 19.1 20 18L14 8V3" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 15H17.5" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="17.5" r="1" fill="#2563EB"/><circle cx="14" cy="17.5" r="1" fill="#2563EB"/></svg>')}`;
const iconBiologist = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8 6 8 10 12 14C16 18 16 22 12 22M12 2C16 6 16 10 12 14C8 18 8 22 12 22" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="8" r="2" fill="#0D9488"/><circle cx="12" cy="16" r="2" fill="#0D9488"/></svg>')}`;
const iconDirector = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z" fill="#EFF6FF" stroke="#1E40AF" stroke-width="1.8"/><path d="M9 12L11 14L15 10" stroke="#1E40AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')}`;
const iconStudioHub = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#2563EB" stroke-width="1.8"/><path d="M3 9H21M9 21V9" stroke="#3B82F6" stroke-width="1.5"/></svg>')}`;

const iconDnaHelix = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 3C8 6 16 6 20 3M4 21C8 18 16 18 20 21M4 9C8 12 16 12 20 9M4 15C8 12 16 12 20 15" stroke="#7C3AED" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="2.5" fill="#7C3AED"/></svg>')}`;
const iconProteinPocket = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#0284C7" stroke-width="1.8" fill="#F0F9FF"/><path d="M8 9C8 11.2 9.8 13 12 13C14.2 13 16 11.2 16 9" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="10" r="1.5" fill="#0284C7"/></svg>')}`;
const iconMoleculeChem = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="5" r="2.5" fill="#2563EB"/><circle cx="5" cy="9" r="2.5" fill="#2563EB"/><circle cx="5" cy="16" r="2.5" fill="#2563EB"/><circle cx="12" cy="20" r="2.5" fill="#2563EB"/><circle cx="19" cy="16" r="2.5" fill="#2563EB"/><circle cx="19" cy="9" r="2.5" fill="#2563EB"/><path d="M12 7.5L5 11.5M5 13.5L5 16M12 17.5L19 13.5M19 11.5L19 9M5 9L12 5L19 9" stroke="#2563EB" stroke-width="1.5"/></svg>')}`;
const iconAdmetShield = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5V11C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11V5L12 2Z" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/><path d="M9 12H15M12 9V15" stroke="#D97706" stroke-width="2" stroke-linecap="round"/></svg>')}`;

const iconRoboticArm = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="19" width="18" height="3" rx="1.5" fill="#059669"/><path d="M6 19V14L10 8L15 11L18 7" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="8" r="2" fill="#059669"/><circle cx="15" cy="11" r="2" fill="#059669"/><path d="M17 5L20 8" stroke="#059669" stroke-width="2" stroke-linecap="round"/></svg>')}`;
const iconGxpSeal = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#DC2626" stroke-width="1.8" fill="#FEF2F2"/><path d="M8 12L11 15L16 9" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="6" stroke="#EF4444" stroke-width="1" stroke-dasharray="2 2"/></svg>')}`;
const iconFeedbackLoop = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12A8 8 0 0 1 18.5 7.5M18.5 7.5V4M18.5 7.5H15M20 12A8 8 0 0 1 5.5 16.5M5.5 16.5V20M5.5 16.5H9" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')}`;

export function generateConceptualPharmaXml(isDark: boolean = false): string {
  const bgFill = isDark ? "#0B111E" : "#FFFFFF";
  const domainFill = isDark ? "#111827" : "#F8FAFC";
  const borderStroke = isDark ? "#334155" : "#CBD5E1";
  const titleColor = isDark ? "#F8FAFC" : "#0F172A";
  const subtitleColor = isDark ? "#94A3B8" : "#64748B";
  const cardFill = isDark ? "#1E293B" : "#FFFFFF";

  // Google Cloud Public Doc Banner Colors
  const bannerBg = isDark ? "#1E293B" : "#F0F7FF";
  const bannerBorder = isDark ? "#3B82F6" : "#1A73E8";

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-05T12:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="pharma_conceptual_master" name="Conceptual Architecture - Pharma Drug Discovery Agentic AI Platform">
    <mxGraphModel dx="1810" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1040" background="${bgFill}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- OFFICIAL GOOGLE CLOUD ARCHITECTURE CENTER TOP HEADER BANNER               -->
        <!-- ========================================================================= -->
        <mxCell id="hdr_banner_box" value="" style="rounded=1;arcSize=4;fillColor=${bannerBg};strokeColor=${bannerBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="14" width="1740" height="64" as="geometry" />
        </mxCell>

        <!-- Left: Official GCP Logo Icon -->
        <mxCell id="hdr_gcp_icon" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;imageAspect=0;aspect=fixed;image=${iconGcpCloud};" vertex="1" parent="1">
          <mxGeometry x="46" y="24" width="44" height="44" as="geometry" />
        </mxCell>

        <!-- Center-Left: Architecture Center Breadcrumb, Title & Subtitle -->
        <mxCell id="hdr_tag" value="GOOGLE CLOUD ARCHITECTURE CENTER • LIFE SCIENCES &amp; DEEPMIND HEALTH COE" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1A73E8;spacingLeft=0;" vertex="1" parent="1">
          <mxGeometry x="102" y="20" width="800" height="14" as="geometry" />
        </mxCell>
        <mxCell id="hdr_title" value="Pharma Drug Discovery Agentic AI Platform on Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=16;fontStyle=1;fontColor=${titleColor};spacingLeft=0;" vertex="1" parent="1">
          <mxGeometry x="102" y="34" width="800" height="22" as="geometry" />
        </mxCell>
        <mxCell id="hdr_sub" value="Conceptual Architecture • Capability &amp; Boundary Level: Autonomous Target-to-Lead, Biocompute &amp; Wet-Lab Workcell" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=0;fontColor=${subtitleColor};spacingLeft=0;" vertex="1" parent="1">
          <mxGeometry x="102" y="55" width="800" height="16" as="geometry" />
        </mxCell>

        <!-- Right: Official Google Cloud Specification Badges -->
        <mxCell id="chip_gxp" value="⚖️ GxP 21 CFR Part 11 Validated" style="rounded=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1100" y="32" width="185" height="28" as="geometry" />
        </mxCell>
        <mxCell id="chip_standards" value="⚡ A2A + SiLA 2 Protocol Standards" style="rounded=1;arcSize=50;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1295" y="32" width="195" height="28" as="geometry" />
        </mxCell>
        <mxCell id="chip_official" value="🏛️ Official Dialect A Architecture" style="rounded=1;arcSize=50;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#065F46;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1500" y="32" width="190" height="28" as="geometry" />
        </mxCell>
        <mxCell id="chip_mesh" value="🧬 In Silico &amp; Wet-Lab" style="rounded=1;arcSize=50;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#92400E;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1700" y="32" width="60" height="28" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 1: DISCOVERY PERSONAS & LEADERSHIP (x=30, w=190, y=90, h=655)      -->
        <!-- ========================================================================= -->
        <mxCell id="col_user_bg" value="" style="rounded=1;arcSize=4;fillColor=${domainFill};strokeColor=${borderStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="90" width="190" height="655" as="geometry" />
        </mxCell>
        <mxCell id="col_user_hdr" value="GOOGLE CLOUD DISCOVERY STUDIO" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;spacingLeft=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="96" width="190" height="14" as="geometry" />
        </mxCell>
        <mxCell id="col_user_sub" value="Discovery Personas &amp; Leadership" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=12;fontStyle=1;fontColor=${titleColor};" vertex="1" parent="1">
          <mxGeometry x="30" y="108" width="190" height="16" as="geometry" />
        </mxCell>

        <!-- Persona Card 1: Computational Chemists (y=128, h=135) -->
        <mxCell id="card_persona_chemist" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="40" y="128" width="170" height="135" as="geometry" />
        </mxCell>
        <mxCell id="ico_chem_bg" value="" style="shape=ellipse;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="105" y="136" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="ico_chem" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;imageAspect=0;aspect=fixed;image=${iconChemist};" vertex="1" parent="1">
          <mxGeometry x="114" y="145" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="lbl_chem_title" value="Computational Chemist" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="42" y="178" width="166" height="16" as="geometry" />
        </mxCell>
        <mxCell id="lbl_chem_desc" value="Hypothesis design, generative candidate review, SAR inspection." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="44" y="194" width="162" height="30" as="geometry" />
        </mxCell>
        <mxCell id="pill_chem_tool" value="Target Dossier Definition" style="rounded=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=1;fontColor=#1D4ED8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="232" width="154" height="22" as="geometry" />
        </mxCell>

        <!-- Persona Card 2: Structural Biologists (y=273, h=135) -->
        <mxCell id="card_persona_bio" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#99F6E4;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="40" y="273" width="170" height="135" as="geometry" />
        </mxCell>
        <mxCell id="ico_bio_bg" value="" style="shape=ellipse;fillColor=#F0FDFA;strokeColor=#99F6E4;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="105" y="281" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="ico_bio" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;imageAspect=0;aspect=fixed;image=${iconBiologist};" vertex="1" parent="1">
          <mxGeometry x="114" y="290" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="lbl_bio_title" value="Structural Biologist" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="42" y="323" width="166" height="16" as="geometry" />
        </mxCell>
        <mxCell id="lbl_bio_desc" value="Cryo-EM density analysis, cryptic pocket curation, binding pose triage." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="44" y="339" width="162" height="30" as="geometry" />
        </mxCell>
        <mxCell id="pill_bio_tool" value="Cavity Curation • ChimeraX" style="rounded=1;arcSize=50;fillColor=#F0FDFA;strokeColor=#99F6E4;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=1;fontColor=#0D9488;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="377" width="154" height="22" as="geometry" />
        </mxCell>

        <!-- Persona Card 3: Discovery Directors (y=418, h=135) -->
        <mxCell id="card_persona_dir" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#DDD6FE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="40" y="418" width="170" height="135" as="geometry" />
        </mxCell>
        <mxCell id="ico_dir_bg" value="" style="shape=ellipse;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="105" y="426" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="ico_dir" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;imageAspect=0;aspect=fixed;image=${iconDirector};" vertex="1" parent="1">
          <mxGeometry x="114" y="435" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="lbl_dir_title" value="Discovery Director" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="42" y="468" width="166" height="16" as="geometry" />
        </mxCell>
        <mxCell id="lbl_dir_desc" value="Milestone decision gates, Part 11 sign-off, wet-lab campaign greenlight." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="44" y="484" width="162" height="30" as="geometry" />
        </mxCell>
        <mxCell id="pill_dir_tool" value="GxP Regulatory Sign-Off" style="rounded=1;arcSize=50;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="522" width="154" height="22" as="geometry" />
        </mxCell>

        <!-- Persona Card 4: Shared Collaborative Workspace (y=563, h=165) - Utilizes bottom space -->
        <mxCell id="card_persona_hub" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="40" y="563" width="170" height="165" as="geometry" />
        </mxCell>
        <mxCell id="ico_hub_bg" value="" style="shape=ellipse;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="105" y="571" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="ico_hub" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;imageAspect=0;aspect=fixed;image=${iconStudioHub};" vertex="1" parent="1">
          <mxGeometry x="114" y="580" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="lbl_hub_title" value="Discovery Studio Hub" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="42" y="613" width="166" height="16" as="geometry" />
        </mxCell>
        <mxCell id="lbl_hub_desc" value="Live multi-user molecular session store, compound triage dossiers &amp; PyMOL bridges." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="44" y="629" width="162" height="40" as="geometry" />
        </mxCell>
        <mxCell id="pill_hub_spec" value="Shared PyMOL / PDB Session" style="rounded=1;arcSize=50;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=1;fontColor=#475569;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="694" width="154" height="22" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 2: COGNITIVE DISCOVERY AGENTS & AI MESH (x=245, w=430, y=90, h=655) -->
        <!-- ========================================================================= -->
        <mxCell id="col_agents_bg" value="" style="rounded=1;arcSize=4;fillColor=${domainFill};strokeColor=${borderStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="245" y="90" width="430" height="655" as="geometry" />
        </mxCell>
        <mxCell id="col_agents_tag" value="GOOGLE CLOUD — AGENTIC DISCOVERY MESH" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1A73E8;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="245" y="96" width="380" height="14" as="geometry" />
        </mxCell>
        <mxCell id="col_agents_hdr" value="Cognitive Discovery Agents &amp; AI Mesh" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=13;fontStyle=1;fontColor=#1E3A8A;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="245" y="108" width="380" height="16" as="geometry" />
        </mxCell>

        <!-- Row 0: Coordinator Agent (y=128, h=52) -->
        <mxCell id="c_coordinator_agent" value="Lead Discovery Coordinator Agent (ReAct Master Orchestrator)" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#1E3A8A;align=left;verticalAlign=middle;spacingLeft=42;image=${iconGemini};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="260" y="128" width="400" height="52" as="geometry" />
        </mxCell>

        <!-- Sub-tier 2B: Specialized Discovery Workers (Mesh) Enclave -->
        <mxCell id="box_subagents_mesh" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;dashed=1;dashPattern=3 3;" vertex="1" parent="1">
          <mxGeometry x="260" y="195" width="400" height="535" as="geometry" />
        </mxCell>
        <!-- Subagent Header shifted right to x=390 to leave x=260..370 completely clear for Step ❶ Drop Line -->
        <mxCell id="lbl_subagents_mesh" value="Domain-Specialized Subagent Mesh (A2A Protocol)" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#475569;spacingRight=12;" vertex="1" parent="1">
          <mxGeometry x="360" y="199" width="290" height="16" as="geometry" />
        </mxCell>

        <!-- Row 1: Target Validation Agent (y=222, h=95) -->
        <mxCell id="c_sub_target" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#1E3A8A;&quot;&gt;Target Validation &amp;amp; Biology Agent&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#64748B;line-height:1.3;&quot;&gt;GWAS genetic evidence • Target tractability scoring • Biomedical literature synthesis&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=42;spacingTop=8;image=${iconDnaHelix};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="270" y="222" width="380" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_sub_target" value="UniProt • ChEMBL • PubMed Literature RAG" style="rounded=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="280" y="285" width="360" height="22" as="geometry" />
        </mxCell>

        <!-- Row 2: Pocket Druggability Agent (y=352, h=95) -->
        <mxCell id="c_sub_pocket" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#0369A1;&quot;&gt;Pocket Druggability &amp;amp; Structural Agent&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#64748B;line-height:1.3;&quot;&gt;Cryptic allosteric pocket discovery • Cavity volume analysis • Hydration energetics&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=42;spacingTop=8;image=${iconProteinPocket};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="270" y="352" width="380" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_sub_pocket" value="AlphaFold 3 • ESMFold 3D Co-Folding Dispatch" style="rounded=1;arcSize=50;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#0284C7;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="280" y="415" width="360" height="22" as="geometry" />
        </mxCell>

        <!-- Row 3: De Novo Molecule Generator (y=482, h=95) -->
        <mxCell id="c_sub_generative" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#7C3AED;&quot;&gt;De Novo Molecule Generator (Generative Chem)&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#64748B;line-height:1.3;&quot;&gt;Diffusion &amp;amp; autoregressive chemistry models • Valid SMILES / SELFIES generation&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=42;spacingTop=8;image=${iconMoleculeChem};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="270" y="482" width="380" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_sub_generative" value="Stereocenter Sanitization • SAScore Retrosynthesis Filter" style="rounded=1;arcSize=50;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="280" y="545" width="360" height="22" as="geometry" />
        </mxCell>

        <!-- Row 4: ADMET Critic & Affinity Optimizer (y=612, h=95) -->
        <mxCell id="c_sub_admet" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#92400E;&quot;&gt;ADMET Critic &amp;amp; Binding Affinity Optimizer&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#64748B;line-height:1.3;&quot;&gt;Lipinski Rule-of-5 • hERG &amp;amp; CYP450 toxicity • Docking pose free energy (ΔG)&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=42;spacingTop=8;image=${iconAdmetShield};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="270" y="612" width="380" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_sub_admet" value="HPC Free Energy Perturbation (FEP+) • Iterative SAR Loop" style="rounded=1;arcSize=50;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#92400E;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="280" y="675" width="360" height="22" as="geometry" />
        </mxCell>


        <!-- ========================================================================================================= -->
        <!-- THE 140PX HIGHWAY PITCH (x=675..815, w=140): ALL GROUNDING LABELS FLOAT IN 100% OPEN SPACE WITH ZERO OVERLAPS -->
        <!-- ========================================================================================================= -->


        <!-- ========================================================================= -->
        <!-- DOMAIN 3: STRUCTURAL & CHEMICAL FOUNDATION (x=815, w=465, y=90, h=655)    -->
        <!-- ========================================================================= -->
        <mxCell id="col_struct_bg" value="" style="rounded=1;arcSize=4;fillColor=${domainFill};strokeColor=${borderStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="815" y="90" width="465" height="655" as="geometry" />
        </mxCell>
        <mxCell id="col_struct_tag" value="GOOGLE CLOUD — BIOINFORMATICS &amp; STRUCTURAL FOUNDATION" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1A73E8;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="815" y="96" width="400" height="14" as="geometry" />
        </mxCell>
        <mxCell id="col_struct_hdr" value="Structural &amp; Chemical Foundation" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=13;fontStyle=1;fontColor=#1E3A8A;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="815" y="108" width="400" height="16" as="geometry" />
        </mxCell>

        <!-- Row 0: Vertex AI Gemini Foundation Model (y=128, h=52) -->
        <mxCell id="c_gemini_model" value="Vertex AI Gemini 1.5 Pro (Multimodal Chemical Reasoning &amp; SMILES)" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#1A73E8;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#1E40AF;align=left;verticalAlign=middle;spacingLeft=42;image=${iconGemini};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="128" width="420" height="52" as="geometry" />
        </mxCell>

        <!-- Row 1 Foundation: Molecular Knowledge Graph & Lakehouse (y=222, h=95) -->
        <mxCell id="c_mol_graph_card" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#0F766E;&quot;&gt;Global Molecular Knowledge Graph &amp;amp; Bioactivity Lakehouse&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#0D9488;line-height:1.3;margin-top:2px;&quot;&gt;Billions of target-disease-compound edges • ChEMBL • UniProt • HTS assays&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconBigQuery};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="830" y="222" width="420" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_mol_graph_spec" value="BigQuery Substructure Search • Vector Embeddings RAG" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#99F6E4;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#0F766E;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="845" y="285" width="390" height="22" as="geometry" />
        </mxCell>

        <!-- Row 2 Foundation: AlphaFold 3 & ESMFold Runtimes (y=352, h=95) -->
        <mxCell id="c_alphafold_runtime" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#0369A1;&quot;&gt;AlphaFold 3 &amp;amp; ESMFold 3D Co-Folding Runtimes&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#0284C7;line-height:1.3;margin-top:2px;&quot;&gt;Sub-Angstrom protein-ligand co-folding • Multimeric complex conformation&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconVertexAi};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="830" y="352" width="420" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_alphafold_spec" value="High Confidence (pLDDT &gt; 85) • Predicted Aligned Error (PAE) Alignment" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#0369A1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="845" y="415" width="390" height="22" as="geometry" />
        </mxCell>

        <!-- Row 3 Foundation: Cheminformatics & Retrosynthesis Route Planner (y=482, h=95) -->
        <mxCell id="c_cheminformatics_card" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#15803D;&quot;&gt;RDKit Conformer Ensemble &amp;amp; Retrosynthesis Route Planner&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#16A34A;line-height:1.3;margin-top:2px;&quot;&gt;Forward reaction prediction • Disconnection trees • Precursor inventory • SAScore&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#ECFDF5;strokeColor=#16A34A;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconGke};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="830" y="482" width="420" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_chem_spec" value="Reaction Step Yield Calculation • Automated Reagent BOM Generation" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#15803D;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="845" y="545" width="390" height="22" as="geometry" />
        </mxCell>

        <!-- Row 4 Foundation: HPC Molecular Dynamics & FEP+ Simulation (y=612, h=95) -->
        <mxCell id="c_hpc_md" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#92400E;&quot;&gt;All-Atom Molecular Dynamics &amp;amp; FEP+ Simulation Engine&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#B45309;line-height:1.3;margin-top:2px;&quot;&gt;Solvent thermodynamic integration • Absolute &amp;amp; relative binding free energy (ΔΔG)&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconCompute};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="830" y="612" width="420" height="95" as="geometry" />
        </mxCell>
        <mxCell id="pill_hpc_spec" value="Rigorous Statistical Mechanics • GKE TPU/GPU Accelerated Sampling" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#FDE68A;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#92400E;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="845" y="675" width="390" height="22" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 4: COMPLIANCE & WET-LAB EXECUTION (x=1305, w=465, y=90, h=655)     -->
        <!-- ========================================================================= -->
        <mxCell id="col_wetlab_bg" value="" style="rounded=1;arcSize=4;fillColor=${domainFill};strokeColor=${borderStroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1305" y="90" width="465" height="655" as="geometry" />
        </mxCell>
        <mxCell id="col_wetlab_tag" value="TRANSLATIONAL EXECUTION &amp; REGULATORY VAULT" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1A73E8;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1305" y="96" width="400" height="14" as="geometry" />
        </mxCell>
        <mxCell id="col_wetlab_hdr" value="Compliance &amp; Wet-Lab Execution" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=13;fontStyle=1;fontColor=#1E3A8A;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1305" y="108" width="400" height="16" as="geometry" />
        </mxCell>

        <!-- Sub-box 0: GxP 21 CFR Part 11 Regulatory Compliance Vault (y=128, h=110) -->
        <mxCell id="box_gxp_vault" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#DC2626;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="1320" y="128" width="435" height="110" as="geometry" />
        </mxCell>
        <mxCell id="lbl_gxp_vault" value="Regulatory &amp; Quality Governance (GxP Compliance)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#DC2626;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1325" y="132" width="310" height="16" as="geometry" />
        </mxCell>
        <mxCell id="c_gxp_vault_card" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#991B1B;&quot;&gt;GxP 21 CFR Part 11 Audit Vault &amp;amp; Provenance Ledger&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#DC2626;line-height:1.3;margin-top:2px;&quot;&gt;Cryptographic compound provenance • Immutable execution ledger • Electronic signatures&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconGxpSeal};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="1330" y="150" width="415" height="80" as="geometry" />
        </mxCell>
        <mxCell id="pill_gxp_spec" value="Tamper-Proof Audit Trail • FDA/EMA IND Dossier Package Export" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#FECACA;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#991B1B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1345" y="202" width="385" height="20" as="geometry" />
        </mxCell>

        <!-- Sub-box 1: Synthesis Protocol Dispatcher (y=248, h=105) -->
        <mxCell id="box_sila_dispatcher" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="1320" y="248" width="435" height="105" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sila_dispatcher" value="Laboratory Standards &amp; Protocol Formulation" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#2563EB;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1325" y="252" width="300" height="16" as="geometry" />
        </mxCell>
        <mxCell id="c_sila_dispatcher_card" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#1E40AF;&quot;&gt;SiLA 2 Lab Automation Protocol Dispatcher&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#2563EB;line-height:1.3;margin-top:2px;&quot;&gt;Translates in silico leads into standardized SiLA 2 XML robotic execution files&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconStorage};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="1330" y="270" width="415" height="75" as="geometry" />
        </mxCell>
        <mxCell id="pill_sila_spec" value="SiLA 2 Protocol Commands • Liquid Dispense Script Engine" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1345" y="318" width="385" height="20" as="geometry" />
        </mxCell>

        <!-- Sub-box 2: Automated Wet-Lab Workcell & Robotics (y=365, h=170) -->
        <mxCell id="box_robotic_workcell" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#059669;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="1320" y="365" width="435" height="170" as="geometry" />
        </mxCell>
        <mxCell id="lbl_robotic_workcell" value="Physical Robotic Synthesis &amp; Bioassay Workcell" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#059669;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1325" y="369" width="320" height="16" as="geometry" />
        </mxCell>
        <mxCell id="c_robotic_workcell_card" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#065F46;&quot;&gt;Automated Synthesis &amp;amp; In Vitro Bioassay Platforms&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#059669;line-height:1.3;margin-top:2px;&quot;&gt;Acoustic liquid handlers • Continuous flow synthesis • SPR binding kinetics&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconRoboticArm};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="1330" y="387" width="415" height="135" as="geometry" />
        </mxCell>
        <mxCell id="pill_workcell_spec" value="Nanoscale Microplate Assay • Automated Compound QC • Flow Chemistry" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#065F46;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1345" y="492" width="385" height="22" as="geometry" />
        </mxCell>

        <!-- Sub-box 3: Closed Empirical Feedback Loop (y=548, h=182) - Fills bottom space -->
        <mxCell id="box_active_learning" value="" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#D97706;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="1320" y="548" width="435" height="182" as="geometry" />
        </mxCell>
        <mxCell id="lbl_active_learning" value="Closed Empirical Feedback Loop (Active Learning)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#D97706;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1325" y="552" width="320" height="16" as="geometry" />
        </mxCell>
        <mxCell id="c_active_learning_card" value="&lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#92400E;&quot;&gt;Empirical Bioactivity Telemetry Return (IC50 / Kd)&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#D97706;line-height:1.3;margin-top:2px;&quot;&gt;Feeds empirical assay results back to Generative Chem &amp;amp; Discovery Coordinator&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=44;spacingTop=8;image=${iconFeedbackLoop};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=top;imageSpacing=8;" vertex="1" parent="1">
          <mxGeometry x="1330" y="570" width="415" height="75" as="geometry" />
        </mxCell>
        <mxCell id="pill_learning_spec" value="Automated Assay Calibration • Active Learning Loss Functions" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#FDE68A;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=1;fontColor=#92400E;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1345" y="618" width="385" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c_active_ingestion_subcard" value="&lt;div style=&quot;font-size:10px;font-weight:bold;color:#475569;&quot;&gt;Real-Time Telemetry Streaming &amp;amp; Surrogate Model Retraining&lt;/div&gt;&lt;div style=&quot;font-size:8px;color:#64748B;&quot;&gt;Pub/Sub streaming bus ingestion with BigQuery assay ground-truth delta updates&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1330" y="654" width="415" height="66" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- PRISTINE DETERMINISTIC CONNECTORS (Zero Jogs, Zero Collisions)             -->
        <!-- ========================================================================= -->

        <!-- Ingress 1: Chemist -> Coordinator Agent -->
        <mxCell id="edge_chemist_coord" value="Initiate Campaign" style="edgeStyle=none;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8;fontStyle=1;fontColor=#1E40AF;" edge="1" parent="1" source="card_persona_chemist" target="c_coordinator_agent">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="232" y="195" />
              <mxPoint x="232" y="154" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Ingress 2: Structural Biologist -> Pocket Druggability -->
        <mxCell id="edge_bio_pocket" value="Curate Binding Pockets" style="edgeStyle=none;rounded=1;html=1;strokeColor=#0D9488;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8;fontStyle=1;fontColor=#0D9488;" edge="1" parent="1" source="card_persona_bio" target="c_sub_pocket">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="232" y="340" />
              <mxPoint x="232" y="400" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Ingress 3: Discovery Director -> Part 11 Audit Vault & Wet-Lab Release -->
        <mxCell id="edge_dir_gxp" value="Milestone Part 11 Electronic Sign-Off" style="edgeStyle=none;rounded=1;dashed=1;dashPattern=4 3;html=1;strokeColor=#7C3AED;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8;fontStyle=1;fontColor=#6D28D9;" edge="1" parent="1" source="card_persona_dir" target="c_sub_generative">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="232" y="485" />
              <mxPoint x="232" y="530" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Ingress 4: Discovery Studio Hub -> De Novo Molecule Generator (Shared 3D Session) -->
        <mxCell id="edge_hub_mesh" value="Shared 3D Triage &amp; PyMOL Bridges" style="edgeStyle=none;rounded=1;dashed=1;dashPattern=4 3;html=1;strokeColor=#2563EB;strokeWidth=1.8;exitX=1;exitY=0.25;entryX=0;entryY=0.85;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=2.5;fontSize=8;fontStyle=1;fontColor=#1E40AF;" edge="1" parent="1" source="card_persona_hub" target="c_sub_generative">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="226" y="604" />
              <mxPoint x="226" y="563" />
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- Domain 2 Internal Flow: Vertical Step Pipeline (❶..❹) -->
        <!-- Step 1: Coordinator -> Target Validation (At x=310, completely clear of lbl_subagents_mesh at x=390) -->
        <mxCell id="edge_coord_target" value="❶ Goal Decomposition" style="edgeStyle=none;rounded=0;html=1;strokeColor=#3B82F6;strokeWidth=2;exitX=0.15;exitY=1;entryX=0.15;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#1D4ED8;" edge="1" parent="1" source="c_coordinator_agent" target="c_sub_target">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 2: Target Validation -> Pocket Druggability -->
        <mxCell id="edge_target_pocket" value="❷ Validated Target Cavity" style="edgeStyle=none;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#0369A1;" edge="1" parent="1" source="c_sub_target" target="c_sub_pocket">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 3: Pocket Druggability -> Generative Molecule -->
        <mxCell id="edge_pocket_gen" value="❸ 3D Pocket Conformation" style="edgeStyle=none;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;" edge="1" parent="1" source="c_sub_pocket" target="c_sub_generative">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 4: Generative Molecule -> ADMET Critic -->
        <mxCell id="edge_gen_admet" value="❹ De Novo SMILES Stream" style="edgeStyle=none;rounded=0;html=1;strokeColor=#D97706;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#92400E;" edge="1" parent="1" source="c_sub_generative" target="c_sub_admet">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- RECOVERED MISSING ARROW B: In Silico Iterative SAR Feedback Loop (ADMET -> De Novo Chem) -->
        <mxCell id="edge_sar_feedback" value="↺ Iterative SAR Scaffold Refinement Loop" style="edgeStyle=none;rounded=1;dashed=1;dashPattern=5 3;html=1;strokeColor=#9333EA;strokeWidth=2;exitX=0;exitY=0.35;entryX=0;entryY=0.65;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;labelPadding=3;fontSize=8;fontStyle=1;fontColor=#7E22CE;" edge="1" parent="1" source="c_sub_admet" target="c_sub_generative">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="254" y="645" />
              <mxPoint x="254" y="544" />
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- THE 140PX HIGHWAY PITCH: BI-DIRECTIONAL GROUNDING EXCHANGES                -->
        <!-- (startArrow=classic; endArrow=classic; labels float 100% in open space)   -->
        <!-- ========================================================================= -->

        <!-- Tier 0: Coordinator <-> Gemini Model (y=154) -->
        <mxCell id="edge_coord_gemini" value="Reasoning &amp; SMILES Parsing" style="edgeStyle=none;rounded=0;html=1;startArrow=classic;endArrow=classic;strokeColor=#1A73E8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;" edge="1" parent="1" source="c_coordinator_agent" target="c_gemini_model">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Tier 1: Target Validation <-> Molecular Knowledge Graph (y=269) -->
        <mxCell id="edge_target_graph" value="Multi-Omics &amp; Bioactivity Grounding" style="edgeStyle=none;rounded=0;html=1;startArrow=classic;endArrow=classic;strokeColor=#0D9488;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#0F766E;" edge="1" parent="1" source="c_sub_target" target="c_mol_graph_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Tier 2: Pocket Druggability <-> AlphaFold 3 (y=399) -->
        <mxCell id="edge_pocket_alphafold" value="AlphaFold 3 / ESMFold Co-Folding" style="edgeStyle=none;rounded=0;html=1;startArrow=classic;endArrow=classic;strokeColor=#0284C7;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#0369A1;" edge="1" parent="1" source="c_sub_pocket" target="c_alphafold_runtime">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Tier 3: De Novo Generator <-> Cheminformatics Retrosynthesis (y=529) -->
        <mxCell id="edge_gen_chem" value="Retrosynthetic Feasibility (SAScore)" style="edgeStyle=none;rounded=0;html=1;startArrow=classic;endArrow=classic;strokeColor=#16A34A;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#15803D;" edge="1" parent="1" source="c_sub_generative" target="c_cheminformatics_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Tier 4: ADMET Critic <-> HPC Molecular Dynamics (y=659) -->
        <mxCell id="edge_admet_hpc" value="FEP+ Binding Free Energy (ΔΔG)" style="edgeStyle=none;rounded=0;html=1;startArrow=classic;endArrow=classic;strokeColor=#D97706;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#92400E;" edge="1" parent="1" source="c_sub_admet" target="c_hpc_md">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- RECOVERED MISSING ARROW A: VETTED LEAD HANDOFF (ADMET -> RETROSYNTHESIS)  -->
        <!-- ========================================================================= -->
        <mxCell id="edge_admet_retro" value="❺ Vetted Candidate Lead Handoff for Route Planning" style="edgeStyle=none;rounded=1;html=1;strokeColor=#059669;strokeWidth=2.2;exitX=1;exitY=0.25;entryX=0;entryY=0.85;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#065F46;" edge="1" parent="1" source="c_sub_admet" target="c_cheminformatics_card">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="745" y="636" />
              <mxPoint x="745" y="563" />
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 3 -> DOMAIN 4 TRANSLATIONAL EXECUTION (❻..❾)                       -->
        <!-- ========================================================================= -->

        <!-- Step 6: Retrosynthesis -> SiLA 2 Protocol Dispatcher (y=529 -> y=307) -->
        <mxCell id="edge_chem_sila" value="❻ Reaction Route &amp; Dispense Manifest" style="edgeStyle=none;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;" edge="1" parent="1" source="c_cheminformatics_card" target="c_sila_dispatcher_card">
          <mxGeometry x="0.5" relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1295" y="529" />
              <mxPoint x="1295" y="307" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- GxP Synthesis Release: GxP Vault -> SiLA 2 Protocol Dispatcher -->
        <mxCell id="edge_gxp_release_sila" value="GxP Batch Release &amp; Electronic Signature" style="edgeStyle=none;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.8;dashed=1;dashPattern=4 3;exitX=0.82;exitY=1;entryX=0.82;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#FECACA;labelPadding=2.5;fontSize=8;fontStyle=1;fontColor=#991B1B;" edge="1" parent="1" source="c_gxp_vault_card" target="c_sila_dispatcher_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 7: SiLA 2 Dispatcher -> Robotic Workcell -->
        <mxCell id="edge_sila_workcell" value="❼ SiLA 2 Command Stream" style="edgeStyle=none;rounded=0;html=1;strokeColor=#059669;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#065F46;" edge="1" parent="1" source="c_sila_dispatcher_card" target="c_robotic_workcell_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 8: Robotic Workcell -> Bioactivity Telemetry -->
        <mxCell id="edge_workcell_telemetry" value="❽ Microplate Readout" style="edgeStyle=none;rounded=0;html=1;strokeColor=#D97706;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#92400E;" edge="1" parent="1" source="c_robotic_workcell_card" target="c_active_learning_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 8b: Telemetry Return -> Real-Time Streaming Subcard -->
        <mxCell id="edge_telemetry_streaming" value="Pub/Sub Assay Streaming Bus" style="edgeStyle=none;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.8;dashed=1;dashPattern=3 3;exitX=0.82;exitY=1;entryX=0.82;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#FED7AA;labelPadding=2;fontSize=7.5;fontStyle=1;fontColor=#92400E;" edge="1" parent="1" source="c_active_learning_card" target="c_active_ingestion_subcard">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Step 8c: Real-Time Streaming Subcard -> BigQuery Bioactivity Lakehouse Ingestion -->
        <mxCell id="edge_streaming_lakehouse" value="BigQuery Delta Ingestion Stream" style="edgeStyle=none;rounded=1;dashed=1;dashPattern=5 3;html=1;strokeColor=#0D9488;strokeWidth=1.8;exitX=0;exitY=0.5;entryX=1;entryY=0.75;labelBackgroundColor=#FFFFFF;labelBorderColor=#99F6E4;labelPadding=2.5;fontSize=8;fontStyle=1;fontColor=#0F766E;" edge="1" parent="1" source="c_active_ingestion_subcard" target="c_mol_graph_card">
          <mxGeometry x="-0.38" y="-10" relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1275" y="687" />
              <mxPoint x="1275" y="293" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Step 9: Closed Feedback Highway: Bioactivity Telemetry -> ADMET Critic (Along Bottom Open Highway y=738) -->
        <mxCell id="edge_feedback_highway" value="❾ Active Learning Feedback (Empirical IC50 / Kd Ground Truth)" style="edgeStyle=none;rounded=1;dashed=1;dashPattern=6 4;html=1;strokeColor=#D97706;strokeWidth=2.2;exitX=0;exitY=0.5;entryX=0.5;entryY=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#92400E;" edge="1" parent="1" source="c_active_learning_card" target="c_sub_admet">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1295" y="607" />
              <mxPoint x="1295" y="738" />
              <mxPoint x="460" y="738" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Step 10: Top Governance Audit Trail: Clean exit from Coordinator top shoulder across ceiling margin -->
        <mxCell id="edge_audit_trail" value="❿ 21 CFR Part 11 Cryptographic Audit Trail &amp; Provenance Ledger" style="edgeStyle=none;rounded=1;dashed=1;dashPattern=4 3;html=1;strokeColor=#DC2626;strokeWidth=2;exitX=0.9;exitY=0;entryX=1;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#991B1B;" edge="1" parent="1" source="c_coordinator_agent" target="c_gxp_vault_card">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="620" y="80" />
              <mxPoint x="1755" y="80" />
              <mxPoint x="1755" y="190" />
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 5: THE 4 CANONICAL CONCEPTUAL FLOWS (y=765, h=165)                 -->
        <!-- ========================================================================= -->
        <mxCell id="domain_scenario" value="The 4 Canonical Conceptual Flows: Experience, Value Stream, Domain Data &amp; Enterprise Integration" style="rounded=1;arcSize=4;fillColor=${domainFill};strokeColor=${borderStroke};strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=20;spacingTop=10;fontFamily=Google Sans, sans-serif;fontSize=12.5;fontStyle=1;fontColor=${titleColor};" vertex="1" parent="1">
          <mxGeometry x="30" y="765" width="1740" height="165" as="geometry" />
        </mxCell>

        <!-- Step 1 Card: User Journey Flow (Experience Flow) -->
        <mxCell id="sc_card_1" value="&lt;div style=&quot;font-size: 11px; font-weight: bold; color: #1D4ED8; margin-bottom: 2px;&quot;&gt;User Journey Flow (Experience Flow)&lt;/div&gt;&lt;div style=&quot;font-size: 8.5px; font-weight: 600; color: #0F172A; margin-bottom: 3px;&quot;&gt;Persona interaction &amp; clinical objective definition without infrastructure mechanics&lt;/div&gt;&lt;div style=&quot;font-size: 8px; color: #64748B; line-height: 1.3;&quot;&gt;Chemists and biologists engage via Discovery Studio to configure kinase targets, set selectivity profiles, review generated leads, and grant 21 CFR Part 11 sign-off.&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=14;spacingRight=14;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="800" width="410" height="112" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_1" value="Campaign Intake &amp; Scientist Review" style="rounded=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#1D4ED8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="135" y="879" width="230" height="22" as="geometry" />
        </mxCell>

        <!-- Step 2 Card: Business Process Flow (Value Stream) -->
        <mxCell id="sc_card_2" value="&lt;div style=&quot;font-size: 11px; font-weight: bold; color: #7C3AED; margin-bottom: 2px;&quot;&gt;Business Process Flow (Value Stream)&lt;/div&gt;&lt;div style=&quot;font-size: 8.5px; font-weight: 600; color: #0F172A; margin-bottom: 3px;&quot;&gt;Target-to-lead milestone progression &amp; autonomous capability coordination&lt;/div&gt;&lt;div style=&quot;font-size: 8px; color: #64748B; line-height: 1.3;&quot;&gt;Orchestrates sequential value stream: Target Identification &#8594; Cryptic Pocket Discovery &#8594; De Novo Generative Chemistry &#8594; ADMET Screening &#8594; Wet-Lab Workcell.&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=14;spacingRight=14;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="475" y="800" width="410" height="112" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_2" value="Target-to-Lead Milestones" style="rounded=1;arcSize=50;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="565" y="879" width="230" height="22" as="geometry" />
        </mxCell>

        <!-- Step 3 Card: Domain Data Flow -->
        <mxCell id="sc_card_3" value="&lt;div style=&quot;font-size: 11px; font-weight: bold; color: #D97706; margin-bottom: 2px;&quot;&gt;Domain Data Flow&lt;/div&gt;&lt;div style=&quot;font-size: 8.5px; font-weight: 600; color: #0F172A; margin-bottom: 3px;&quot;&gt;Macroscopic information movement across bounded biomedical contexts&lt;/div&gt;&lt;div style=&quot;font-size: 8px; color: #64748B; line-height: 1.3;&quot;&gt;Traces information transformation: Target Genomics Dossier &#8594; Molecular Knowledge Graph &#8594; 3D Protein Structures &#8594; Candidate SMILES &#8594; In Vitro Readouts.&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=14;spacingRight=14;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="905" y="800" width="410" height="112" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_3" value="Macroscopic Chemical Data Flow" style="rounded=1;arcSize=50;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#D97706;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="995" y="879" width="230" height="22" as="geometry" />
        </mxCell>

        <!-- Step 4 Card: Enterprise Integration Flow -->
        <mxCell id="sc_card_4" value="&lt;div style=&quot;font-size: 11px; font-weight: bold; color: #059669; margin-bottom: 2px;&quot;&gt;Enterprise Integration Flow&lt;/div&gt;&lt;div style=&quot;font-size: 8.5px; font-weight: 600; color: #0F172A; margin-bottom: 3px;&quot;&gt;Coarse-grained boundary handoffs to external registries &amp; laboratory robotics&lt;/div&gt;&lt;div style=&quot;font-size: 8px; color: #64748B; line-height: 1.3;&quot;&gt;Standards-based interoperability: Agent-to-Agent (A2A), MCP tool servers, UniProt/PDB external repositories, and SiLA 2 standard for liquid handler execution.&lt;/div&gt;" style="rounded=1;arcSize=6;fillColor=${cardFill};strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;align=left;verticalAlign=top;spacingLeft=14;spacingRight=14;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1335" y="800" width="420" height="112" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_4" value="SiLA 2 Lab Robotics &amp; Registries" style="rounded=1;arcSize=50;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#059669;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1430" y="879" width="230" height="22" as="geometry" />
        </mxCell>

        <!-- 4-Flow Interconnecting Edges -->
        <mxCell id="sc_edge_1_2" value="" style="edgeStyle=none;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sc_card_1" target="sc_card_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="sc_edge_2_3" value="" style="edgeStyle=none;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sc_card_2" target="sc_card_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="sc_edge_3_4" value="" style="edgeStyle=none;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sc_card_3" target="sc_card_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 6: INTEGRATED PROTOCOLS & INTEGRATION FABRIC FOOTER                -->
        <!-- ========================================================================= -->
        <mxCell id="leg_bg" value="" style="rounded=1;arcSize=50;fillColor=${cardFill};strokeColor=${borderStroke};strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="945" width="1740" height="36" as="geometry" />
        </mxCell>
        <mxCell id="leg_lbl_legend" value="Protocols &amp; Integration Fabric:" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${titleColor};" vertex="1" parent="1">
          <mxGeometry x="45" y="953" width="170" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_1" value="■ A2A (Agent-to-Agent Mesh)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#7C3AED;" vertex="1" parent="1">
          <mxGeometry x="230" y="953" width="180" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_2" value="■ SiLA 2 (Standard in Lab Automation)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="420" y="953" width="220" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_3" value="■ Model Context Protocol (MCP)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#0D9488;" vertex="1" parent="1">
          <mxGeometry x="650" y="953" width="190" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_4" value="--- Closed-Loop Active Learning Feedback" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#D97706;" vertex="1" parent="1">
          <mxGeometry x="850" y="953" width="250" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_5" value="■ GxP 21 CFR Part 11 Audit Trail" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#DC2626;" vertex="1" parent="1">
          <mxGeometry x="1110" y="953" width="200" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_6" value="■ Google Cloud Architecture Center Verified" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1A73E8;" vertex="1" parent="1">
          <mxGeometry x="1320" y="953" width="250" height="20" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const GCP_PHARMA_CONCEPTUAL: GcpArchitectureDef = {
  id: "gcp-pharma-conceptual",
  title: "Pharma Drug Discovery: Conceptual Architecture",
  subtitle: "Operating at Capability & Boundary Level: 4-Flow Conceptual Taxonomy & Life Sciences Governance",
  category: "Life Sciences & Healthcare",
  badge: "CONCEPTUAL BLUEPRINT",
  officialDocUrl: "https://docs.cloud.google.com/architecture/life-sciences-deepmind",
  author: "Google Cloud Life Sciences & DeepMind Health Architecture CoE",
  overview:
    "A capability and boundary-level conceptual architecture for enterprise pharmaceutical drug discovery. Governed by the 4-Flow Conceptual Taxonomy Law: User Journey Flow (Experience), Business Process Flow (Value Stream), Domain Data Flow, and Enterprise Integration Flow. Eliminates low-level infrastructure mechanics (VPCs, CIDRs, session cookies, port numbers) in favor of crisp macroscopic domain boundaries: Discovery Personas, Cognitive Agents & AI Mesh, Structural & Chemical Foundation, and Wet-Lab Execution & Governance under 21 CFR Part 11.",
  designPatterns: [
    "The 4-Flow Conceptual Taxonomy (Experience, Value Stream, Domain Data, Integration)",
    "Capability & Boundary-Level Domain Partitioning",
    "Cognitive Agent Mesh Orchestration (A2A Protocol)",
    "Multimodal Foundation Chemical Grounding (Gemini 1.5 Pro + AlphaFold 3)",
    "In Silico Iterative SAR Refinement Feedback Loop (ADMET -> De Novo)",
    "Vetted Lead Candidate Synthesis Handoff (ADMET -> Retrosynthesis)",
    "Closed-Loop Active Learning Telemetry Feedback (Assay IC50 -> SAR Optimization)",
    "Cryptographic GxP 21 CFR Part 11 Electronic Signature & Audit Provenance"
  ],
  productsUsed: [
    "Gemini 1.5 Pro (Vertex AI Multimodal Chemical Foundation Model)",
    "AlphaFold 3 & ESMFold (Structural Co-Folding Runtimes)",
    "Molecular Knowledge Graph & Bioactivity Lakehouse (BigQuery)",
    "Agent Development Kit & A2A Interoperability Mesh",
    "RDKit Conformer Ensemble & Retrosynthesis Route Planner (GKE Autopilot)",
    "All-Atom MD & FEP+ Free Energy Simulation Engine (Compute Engine HPC)",
    "SiLA 2 Lab Automation Protocol Dispatcher",
    "GxP 21 CFR Part 11 Audit Vault & Provenance Ledger"
  ],
  components: [
    {
      name: "Discovery Personas & Studio Hub",
      type: "Actor Domain",
      role: "Computational Chemists, Structural Biologists, and Discovery Directors steering campaign objectives, reviewing leads, and granting GxP Part 11 sign-offs.",
      iconKey: "gemini",
      spec: "Scientific & Executive Personas",
      category: "actor"
    },
    {
      name: "Lead Discovery Coordinator Agent",
      type: "Root Controller",
      role: "ReAct master orchestrator decomposing kinase target goals into discrete bioinformatic, structural, and generative sub-tasks.",
      iconKey: "vertex_ai",
      spec: "A2A Root Controller",
      category: "agent"
    },
    {
      name: "Target Validation & Biology Agent",
      type: "Domain Subagent",
      role: "Synthesizes multi-omics, GWAS genetic evidence, and PubMed literature to establish target tractability dossiers.",
      iconKey: "vertex_ai",
      spec: "A2A Sequential Worker",
      category: "agent"
    },
    {
      name: "Pocket Druggability & Structural Agent",
      type: "Domain Subagent",
      role: "Identifies cryptic allosteric pockets and dispatches AlphaFold 3 / ESMFold co-folding coordinate runs.",
      iconKey: "vertex_ai",
      spec: "A2A Structural Worker",
      category: "agent"
    },
    {
      name: "De Novo Molecule Generator",
      type: "Generative Worker",
      role: "Diffusion and autoregressive chemistry models generating stereochemically valid SMILES / SELFIES candidate pools.",
      iconKey: "vertex_ai",
      spec: "A2A Generative Worker",
      category: "agent"
    },
    {
      name: "ADMET Critic & Optimizer",
      type: "Critic & Gatekeeper",
      role: "Multi-parameter optimization evaluating Lipinski Rule-of-5, hERG/CYP450 toxicity, and FEP+ binding free energies with an iterative SAR refinement loop.",
      iconKey: "vertex_ai",
      spec: "A2A Critic Worker",
      category: "agent"
    },
    {
      name: "Vertex AI Gemini 1.5 Pro",
      type: "Foundation Model",
      role: "Multimodal LLM serving chemical reasoning, SMILES parsing, and cross-domain bioinformatic dossier synthesis.",
      iconKey: "gemini",
      spec: "Multimodal Foundation Core",
      category: "model"
    },
    {
      name: "Molecular Knowledge Graph & Bioactivity Lakehouse",
      type: "Biomedical Lakehouse",
      role: "Billions of target-disease-compound edges, ChEMBL bioassays, and vectorized substructure chemical fingerprint indices.",
      iconKey: "bigquery",
      spec: "BigQuery / Vector Search",
      category: "storage"
    },
    {
      name: "AlphaFold 3 & ESMFold Co-Folding Runtimes",
      type: "Structural Co-Folding",
      role: "Predicts sub-Angstrom protein-ligand complexes, PAE alignment matrices, and multimeric conformations.",
      iconKey: "vertex_ai",
      spec: "Vertex AI Co-Folding Cluster",
      category: "model"
    },
    {
      name: "RDKit Conformer Ensemble & Retrosynthesis Planner",
      type: "Cheminformatics Engine",
      role: "Computes forward reaction feasibility, disconnection trees, building block inventories, and SAScores.",
      iconKey: "gke_autopilot",
      spec: "GKE Autopilot Cheminformatics",
      category: "tool"
    },
    {
      name: "All-Atom MD & FEP+ Simulation Engine",
      type: "HPC Biocompute",
      role: "GPU-accelerated solvent thermodynamic integration and absolute/relative binding free energy calculation.",
      iconKey: "compute_engine",
      spec: "HPC Cloud TPU/GPU Mesh",
      category: "tool"
    },
    {
      name: "GxP 21 CFR Part 11 Audit Vault",
      type: "Regulatory Compliance",
      role: "Immutable cryptographic ledger recording model lineage, prompt hashes, electronic approvals, and FDA IND export packages.",
      iconKey: "cloud_armor",
      spec: "Cryptographic Provenance Vault",
      category: "security"
    },
    {
      name: "SiLA 2 Lab Automation Protocol Dispatcher",
      type: "Translational Dispatcher",
      role: "Formulates standardized SiLA 2 XML robotic execution files from verified in silico chemical leads.",
      iconKey: "cloud_run",
      spec: "SiLA 2 Protocol Gateway",
      category: "tool"
    },
    {
      name: "Automated Synthesis & In Vitro Bioassay Workcell",
      type: "Translational Workcell",
      role: "Physical wet-lab robotic platforms executing acoustic liquid dispensing, continuous flow chemistry, and SPR binding assays.",
      iconKey: "gke_autopilot",
      spec: "Physical Robotic Workcell",
      category: "tool"
    },
    {
      name: "Empirical Bioactivity Telemetry Return",
      type: "Closed-Loop Feedback",
      role: "Streams empirical IC50/Kd assay kinetics back into the active learning bus to refine generative rewards and docking scores.",
      iconKey: "pubsub",
      spec: "Active Learning Loop",
      category: "tool"
    }
  ],
  flowSteps: [
    {
      step: "❶",
      from: "Lead Discovery Coordinator",
      to: "Target Validation Agent",
      title: "Goal Decomposition",
      desc: "Coordinator decomposes disease target hypothesis into bioinformatic and tractability validation criteria.",
      protocol: "A2A Protocol"
    },
    {
      step: "❷",
      from: "Target Validation Agent",
      to: "Pocket Druggability Agent",
      title: "Validated Target Cavity",
      desc: "Genetic evidence and tractability dossiers transfer to structural agent for cryptic allosteric pocket discovery.",
      protocol: "A2A Protocol"
    },
    {
      step: "❸",
      from: "Pocket Druggability Agent",
      to: "De Novo Molecule Generator",
      title: "3D Pocket Conformation",
      desc: "AlphaFold 3 co-folded coordinates and cavity grid specifications dispatch to generative chemistry models.",
      protocol: "A2A Protocol"
    },
    {
      step: "❹",
      from: "De Novo Molecule Generator",
      to: "ADMET Critic & Optimizer",
      title: "De Novo SMILES Stream",
      desc: "Synthetically tractable SMILES candidates stream to ADMET agent for multi-parameter toxicity and affinity screening.",
      protocol: "A2A Protocol"
    },
    {
      step: "↺",
      from: "ADMET Critic & Optimizer",
      to: "De Novo Molecule Generator",
      title: "In Silico SAR Refinement Loop",
      desc: "Sub-optimal compounds failing hERG or solubility gates loop back to Generative Chem for scaffold decoration and property tuning.",
      protocol: "SAR Feedback Loop"
    },
    {
      step: "❺",
      from: "ADMET Critic & Optimizer",
      to: "Retrosynthesis Route Planner",
      title: "Vetted Candidate Lead Handoff",
      desc: "Molecules satisfying drug-likeness and low ΔΔG hand off to RDKit disconnection engine for synthetic route planning.",
      protocol: "SMILES / JSON"
    },
    {
      step: "❻",
      from: "RDKit Retrosynthesis Planner",
      to: "SiLA 2 Protocol Dispatcher",
      title: "Reaction Route & Dispense Manifest",
      desc: "Disconnection trees and precursor BOMs transfer to protocol formulation engine for robotic script generation.",
      protocol: "SMILES / JSON"
    },
    {
      step: "❼",
      from: "SiLA 2 Protocol Dispatcher",
      to: "Robotic Synthesis Workcell",
      title: "SiLA 2 Command Stream",
      desc: "Standardized SiLA 2 XML sequences drive acoustic liquid handlers and continuous flow microreactors.",
      protocol: "SiLA 2 over mTLS"
    },
    {
      step: "❽",
      from: "Robotic Synthesis Workcell",
      to: "Bioactivity Telemetry Return",
      title: "Microplate Readout",
      desc: "High-throughput surface plasmon resonance (SPR) and cellular bioassay telemetry capture empirical binding kinetics.",
      protocol: "Lab Telemetry"
    },
    {
      step: "❾",
      from: "Bioactivity Telemetry Return",
      to: "ADMET Critic & SAR Loop",
      title: "Active Learning Feedback",
      desc: "Empirical IC50 and Kd readouts return along open feedback highway to refine reward models and SAR gradients.",
      protocol: "Active Learning"
    },
    {
      step: "❿",
      from: "Lead Discovery Coordinator",
      to: "GxP 21 CFR Part 11 Vault",
      title: "Cryptographic Audit Trail",
      desc: "Overarching governance envelope commits immutable execution ledgers, model hashes, and electronic signatures with zero header collision.",
      protocol: "21 CFR Part 11"
    }
  ],
  generateXml: (isDark: boolean = false) => generateConceptualPharmaXml(isDark)
};
