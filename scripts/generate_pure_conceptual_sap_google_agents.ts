import * as fs from "fs";
import * as path from "path";
import puppeteer from "puppeteer";
import { getGcpDataUri } from "../src/lib/gcpIcons";
import { getSapDataUri } from "../src/lib/sapIcons";

// 1. Vector Icon URIs (Clean authentic vector SVGs)
const iconGemini = getGcpDataUri("gemini");
const iconVertexAi = getGcpDataUri("vertex_ai");
const iconVectorSearch = getGcpDataUri("vertex_vector_search");
const iconCloudRun = getGcpDataUri("cloud_run");
const iconPubSub = getGcpDataUri("pubsub");
const iconBigQuery = getGcpDataUri("bigquery");

const iconSapLogo = getSapDataUri("sap_logo");
const iconSapJoule = getSapDataUri("sap_joule");
const iconSapBtp = getSapDataUri("sap_btp");
const iconSapIntegration = getSapDataUri("sap_integration_suite");
const iconSapApim = getSapDataUri("sap_apim");
const iconSapDatasphere = getSapDataUri("sap_datasphere");
const iconSapS4Hana = getSapDataUri("sap_s4hana");
const iconSapSuccessFactors = getSapDataUri("sap_successfactors");
const iconSapAriba = getSapDataUri("sap_ariba");
const iconSapCx = getSapDataUri("sap_cx");

// Specific domain vector SVGs
const iconUser = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" fill="#2563EB"/><path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>')}`;
const iconMcp = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#7C3AED"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#A855F7"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#A855F7"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#7C3AED"/><path d="M10 6.5H14M6.5 10V14M17.5 10V14M10 17.5H14" stroke="#7C3AED" stroke-width="1.8"/></svg>')}`;
const iconCortex = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2563EB"/><path d="M2 17L12 22L22 17" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')}`;
const iconAbap = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0070F2" stroke-width="1.8" fill="#EFF6FF"/><path d="M7 9L10 12L7 15M12 15H16" stroke="#0070F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')}`;
const iconConcur = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#0070F2" stroke-width="1.8" fill="#EBF3FC"/><path d="M8 12L11 15L16 9" stroke="#0070F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')}`;
const iconPublicCloud = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 19C4.34 19 3 17.66 3 16C3 14.48 4.13 13.23 5.6 13.04C6.08 10.18 8.56 8 11.5 8C14.07 8 16.27 9.68 17.06 12.04C18.72 12.35 20 13.79 20 15.5C20 17.43 18.43 19 16.5 19H6Z" fill="#0070F2"/></svg>')}`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T20:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="pure_conceptual_sap_agents" name="Conceptual Architecture: Holistic SAP Multi-Agent AI on Google Cloud">
    <mxGraphModel dx="1840" dy="1040" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1840" pageHeight="1040" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Title & Subtitle -->
        <mxCell id="hdr_title" value="Conceptual Architecture: Holistic SAP Multi-Agent AI on Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=23;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="hdr_sub" value="End-to-End Conceptual Framework: End User Personas, Google Cloud Agentic Platform (Pro-Code &amp; No-Code), MCP &amp; A2A Interoperability, Cortex Data Foundation, and SAP Enterprise Ecosystem." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="30" y="46" width="1350" height="20" as="geometry" />
        </mxCell>

        <!-- Top Right Category Legend -->
        <mxCell id="top_leg_1" value="■ User Personas" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#2563EB;" vertex="1" parent="1">
          <mxGeometry x="1170" y="24" width="105" height="18" as="geometry" />
        </mxCell>
        <mxCell id="top_leg_2" value="■ Google Cloud Agents" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1D4ED8;" vertex="1" parent="1">
          <mxGeometry x="1280" y="24" width="130" height="18" as="geometry" />
        </mxCell>
        <mxCell id="top_leg_3" value="■ Agent Protocols (MCP/A2A)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#7C3AED;" vertex="1" parent="1">
          <mxGeometry x="1415" y="24" width="165" height="18" as="geometry" />
        </mxCell>
        <mxCell id="top_leg_4" value="■ SAP BTP &amp; Joule" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#0070F2;" vertex="1" parent="1">
          <mxGeometry x="1585" y="24" width="115" height="18" as="geometry" />
        </mxCell>
        <mxCell id="top_leg_5" value="■ SAP Systems of Record" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1705" y="24" width="85" height="18" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 1: END USER & INTERACTION LAYER (x=30, w=165, y=76, h=680)         -->
        <!-- ========================================================================= -->
        <mxCell id="col_user_bg" value="" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="76" width="165" height="680" as="geometry" />
        </mxCell>
        <mxCell id="col_user_hdr" value="End User &amp; Channels" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=12;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="30" y="84" width="165" height="18" as="geometry" />
        </mxCell>
        <mxCell id="col_user_sub" value="Multimodal client interaction" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="30" y="99" width="165" height="14" as="geometry" />
        </mxCell>

        <!-- Persona Box -->
        <mxCell id="user_box" value="" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="195" width="145" height="230" as="geometry" />
        </mxCell>
        <mxCell id="user_avatar_bg" value="" style="shape=ellipse;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="75" y="210" width="74" height="74" as="geometry" />
        </mxCell>
        <mxCell id="user_avatar_icon" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;imageAspect=0;aspect=fixed;image=${iconUser};" vertex="1" parent="1">
          <mxGeometry x="90" y="225" width="44" height="44" as="geometry" />
        </mxCell>
        <mxCell id="user_lbl_title" value="End User" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=14;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="44" y="294" width="137" height="22" as="geometry" />
        </mxCell>
        <mxCell id="user_lbl_desc" value="• Business Operators&lt;br&gt;• Enterprise Developers&lt;br&gt;• Process Specialists" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=0;fontColor=#64748B;lineHeight=1.35;" vertex="1" parent="1">
          <mxGeometry x="44" y="320" width="137" height="42" as="geometry" />
        </mxCell>
        <mxCell id="user_modality_pill" value="Web · Chat · Workspace · IDE" style="rounded=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="46" y="372" width="133" height="22" as="geometry" />
        </mxCell>

        <!-- User Channel Features (Bottom Cards) -->
        <mxCell id="user_card_chat" value="Conversational Copilot&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Natural language query dispatch&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="455" width="145" height="54" as="geometry" />
        </mxCell>
        <mxCell id="user_card_wf" value="Workflow Automation&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Human-in-the-loop approvals&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="525" width="145" height="54" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 2: GOOGLE CLOUD (x=215, w=700, y=76, h=680)                        -->
        <!-- ========================================================================= -->
        <mxCell id="col_gcp_bg" value="" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="215" y="76" width="700" height="680" as="geometry" />
        </mxCell>
        <mxCell id="col_gcp_hdr" value="Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=14;fontStyle=1;fontColor=#1E3A8A;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="225" y="82" width="200" height="20" as="geometry" />
        </mxCell>
        <mxCell id="col_gcp_sub" value="Agentic AI Platform, Orchestration &amp; Semantic Data Fabric" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=0;fontColor=#64748B;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="225" y="99" width="400" height="14" as="geometry" />
        </mxCell>

        <!-- SUB-TIER 2A: GE AGENT PLATFORM (PRO-CODE) (x=230, y=118, w=670, h=95) -->
        <mxCell id="box_ge_platform" value="" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="230" y="118" width="670" height="95" as="geometry" />
        </mxCell>
        <mxCell id="lbl_ge_platform" value="GE Agent Platform (Pro-Code Orchestration)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="235" y="122" width="300" height="16" as="geometry" />
        </mxCell>

        <!-- Pro-Code Agents Card -->
        <mxCell id="c_agents_pro" value="Agents (Pro-code - ADK etc.)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Autonomous agent planning, tool selection &amp; multi-agent collaboration&lt;br&gt;• Python Agent Development Kit (ADK), LangGraph &amp; Vertex AI Agent Builder&lt;br&gt;• Enterprise session memory, state persistence &amp; policy guardrails&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E3A8A;align=left;verticalAlign=middle;spacingLeft=46;image=${iconGemini};imageWidth=24;imageHeight=24;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="245" y="142" width="640" height="60" as="geometry" />
        </mxCell>

        <!-- SUB-TIER 2B: GEMINI ENTERPRISE APP (NO-CODE & CONNECTORS) (x=230, y=228, w=415, h=510) -->
        <mxCell id="box_gemini_app" value="" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="230" y="228" width="415" height="510" as="geometry" />
        </mxCell>
        <mxCell id="lbl_gemini_app" value="Gemini Enterprise App (No-Code &amp; Connectors)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="235" y="232" width="300" height="16" as="geometry" />
        </mxCell>

        <!-- No-Code Agents Card (Left inside Gemini Enterprise App) -->
        <mxCell id="c_agents_nocode" value="Agents&lt;br&gt;(No Code)&lt;br&gt;&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Natural language copilot&lt;br&gt;• Enterprise search grounding&lt;br&gt;• Business user assistants&lt;br&gt;• Multimodal interaction&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#1E3A8A;align=center;verticalAlign=middle;image=${iconVertexAi};imageWidth=22;imageHeight=22;imageAlign=top;imageVerticalAlign=top;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="242" y="258" width="145" height="465" as="geometry" />
        </mxCell>

        <!-- Agentic Connectors Sub-box (Right inside Gemini Enterprise App) -->
        <mxCell id="box_agentic_connectors" value="" style="rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;dashed=1;dashPattern=3 3;" vertex="1" parent="1">
          <mxGeometry x="400" y="258" width="235" height="465" as="geometry" />
        </mxCell>
        <mxCell id="lbl_agentic_connectors" value="Agentic Connectors" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#475569;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="405" y="262" width="160" height="16" as="geometry" />
        </mxCell>

        <!-- Connector 1: Bring your own MCP -->
        <mxCell id="c_conn_mcp" value="Bring your own MCP&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;• Model Context Protocol client&lt;br&gt;• Dynamic tool schema discovery&lt;br&gt;• Secure tool execution sandbox&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=38;image=${iconMcp};imageWidth=20;imageHeight=20;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="410" y="288" width="215" height="125" as="geometry" />
        </mxCell>

        <!-- Connector 2: BigQuery Connector -->
        <mxCell id="c_conn_bq" value="BigQuery Connector&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;• Automated SQL query generation&lt;br&gt;• Real-time semantic vector retrieval&lt;br&gt;• Petabyte analytical aggregations&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=38;image=${iconBigQuery};imageWidth=20;imageHeight=20;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="410" y="428" width="215" height="125" as="geometry" />
        </mxCell>

        <!-- Connector 3: S/4HANA Connector -->
        <mxCell id="c_conn_s4" value="S/4HANA Connector&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;• OData v2/v4 client adapter&lt;br&gt;• Transactional RFC &amp; BAPI bridge&lt;br&gt;• Document read &amp; state mutation&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=38;image=${iconSapS4Hana};imageWidth=20;imageHeight=20;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="410" y="568" width="215" height="125" as="geometry" />
        </mxCell>

        <!-- SUB-TIER 2C: DATA & SEMANTIC FOUNDATION (RIGHT SIDE OF GOOGLE CLOUD) (x=660, y=228, w=240, h=510) -->
        <!-- Top: Cortex Framework & BigQuery Box -->
        <mxCell id="c_cortex_bq" value="Cortex Framework&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Pre-packaged SAP data models &amp; views&lt;/span&gt;&lt;br&gt;&lt;br&gt;&lt;b style=&quot;font-size: 11px; color: #1E3A8A;&quot;&gt;BigQuery&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Enterprise Analytical Engine &amp; Storage&lt;br&gt;• Vector Search &amp; Vertex AI ML models&lt;br&gt;• Petabyte-scale operational analytics&lt;br&gt;• Zero-Copy bidirectional data federation&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E3A8A;align=center;verticalAlign=middle;spacingLeft=8;spacingRight=8;image=${iconCortex};imageWidth=22;imageHeight=22;imageAlign=top;imageVerticalAlign=top;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="660" y="248" width="240" height="230" as="geometry" />
        </mxCell>

        <!-- Bottom: ABAP SDK / BQ Toolkit & BQ Connector Box -->
        <mxCell id="c_abap_sdk" value="ABAP SDK / BQ Toolkit &amp;amp;&lt;br&gt;BQ Connector&lt;br&gt;&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Google Cloud SDK for ABAP native integration&lt;br&gt;• High-throughput Change Data Capture (CDC)&lt;br&gt;• Real-time streaming from SAP tables&lt;br&gt;• Direct ABAP invocation of Vertex AI APIs&lt;br&gt;• Bidirectional data pipeline acceleration&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E3A8A;align=center;verticalAlign=middle;spacingLeft=8;spacingRight=8;image=${iconAbap};imageWidth=22;imageHeight=22;imageAlign=top;imageVerticalAlign=top;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="660" y="500" width="240" height="190" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 3: SAP JOULE & SAP BTP (x=940, w=335, y=76, h=545)                 -->
        <!-- ========================================================================= -->
        <!-- SAP Joule Container (Top) -->
        <mxCell id="box_sap_joule" value="" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="940" y="118" width="335" height="95" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sap_joule" value="SAP Joule" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#D97706;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="945" y="122" width="120" height="16" as="geometry" />
        </mxCell>
        <mxCell id="c_joule_agents" value="SAP Joule Agents&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Generative AI copilot natively embedded in SAP apps&lt;br&gt;• Business context understanding &amp; intent recognition&lt;br&gt;• Agent-to-Agent (A2A) cross-platform collaboration&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#92400E;align=left;verticalAlign=middle;spacingLeft=38;image=${iconSapJoule};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="950" y="142" width="315" height="60" as="geometry" />
        </mxCell>

        <!-- SAP BTP Container (Middle) -->
        <mxCell id="box_sap_btp" value="" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0070F2;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="940" y="228" width="335" height="235" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sap_btp" value="SAP BTP" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0070F2;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="945" y="232" width="150" height="16" as="geometry" />
        </mxCell>

        <!-- SAP API Mgmt. Card -->
        <mxCell id="c_sap_apim" value="SAP API Mgmt.&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Enterprise API gateway, throttling &amp; traffic policy&lt;br&gt;• OAuth2 / mTLS authentication &amp; token propagation&lt;br&gt;• REST / OData unified endpoints exposition&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EBF3FC;strokeColor=#0070F2;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#005B94;align=left;verticalAlign=middle;spacingLeft=38;image=${iconSapApim};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="950" y="255" width="315" height="90" as="geometry" />
        </mxCell>

        <!-- SAP MCP Gateway Card -->
        <mxCell id="c_sap_mcp_gw" value="SAP MCP Gateway&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Model Context Protocol server exposing SAP tools&lt;br&gt;• Standardized JSON-RPC tool schemas &amp; actions&lt;br&gt;• Dynamic capability discovery for AI agents&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EBF3FC;strokeColor=#0070F2;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#005B94;align=left;verticalAlign=middle;spacingLeft=38;image=${iconMcp};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="950" y="360" width="315" height="90" as="geometry" />
        </mxCell>

        <!-- SAP BDC Container (Lower Middle) -->
        <mxCell id="box_sap_bdc" value="" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0070F2;strokeWidth=1;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="940" y="478" width="335" height="145" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sap_bdc" value="SAP BDC" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0070F2;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="945" y="482" width="120" height="16" as="geometry" />
        </mxCell>
        <mxCell id="c_sap_bdc" value="SAP BDC (Datasphere)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Business semantic data fabric &amp; data catalog&lt;br&gt;• Unified business context preservation&lt;br&gt;• Zero-Copy bidirectional federation with BigQuery&lt;br&gt;• Cross-system analytics without data replication&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EBF3FC;strokeColor=#0070F2;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#005B94;align=left;verticalAlign=middle;spacingLeft=38;image=${iconSapDatasphere};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="950" y="505" width="315" height="105" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 4: SAP SAAS SUITE (x=1300, w=490, y=76, h=545)                     -->
        <!-- ========================================================================= -->
        <mxCell id="box_sap_saas" value="" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1300" y="76" width="490" height="545" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sap_saas" value="SAP SaaS" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=12;fontStyle=1;fontColor=#1E3A8A;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1305" y="82" width="200" height="20" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sap_saas_sub" value="Enterprise Line-of-Business Cloud Solutions" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=0;fontColor=#64748B;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1305" y="99" width="300" height="14" as="geometry" />
        </mxCell>

        <!-- SaaS Card 1: SAP SuccessFactors -->
        <mxCell id="c_saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Core HR, Global Talent Management &amp; Employee Central&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=40;image=${iconSapSuccessFactors};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1315" y="128" width="460" height="68" as="geometry" />
        </mxCell>

        <!-- SaaS Card 2: SAP Concur -->
        <mxCell id="c_saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Travel, Corporate Expense &amp; Invoice Management&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=40;image=${iconConcur};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1315" y="210" width="460" height="68" as="geometry" />
        </mxCell>

        <!-- SaaS Card 3: SAP Customer Exp. -->
        <mxCell id="c_saas_cx" value="SAP Customer Exp.&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Omnichannel Commerce, CRM &amp; Customer Service Cloud&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=40;image=${iconSapCx};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1315" y="292" width="460" height="68" as="geometry" />
        </mxCell>

        <!-- SaaS Card 4: SAP Business Networks -->
        <mxCell id="c_saas_bn" value="SAP Business Networks&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Ariba Procurement, Supplier Network &amp; Logistics Collaboration&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=40;image=${iconSapAriba};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1315" y="374" width="460" height="68" as="geometry" />
        </mxCell>

        <!-- SaaS Card 5: S/4HANA Public Cloud -->
        <mxCell id="c_saas_s4pub" value="S/4HANA Public Cloud&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Cloud-Native ERP, Clean Core &amp; Standardized Best Practices&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=40;image=${iconPublicCloud};imageWidth=22;imageHeight=22;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1315" y="456" width="460" height="68" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 5: SAP RISE / ANY-CLOUD / ON-PREMISE (x=940, w=850, y=635, h=121)    -->
        <!-- ========================================================================= -->
        <mxCell id="box_sap_rise" value="" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=4 3;" vertex="1" parent="1">
          <mxGeometry x="940" y="635" width="850" height="121" as="geometry" />
        </mxCell>
        <mxCell id="lbl_sap_rise" value="SAP RISE / Any-Cloud / On-Premise" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#0F172A;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="945" y="640" width="300" height="18" as="geometry" />
        </mxCell>

        <!-- S/4HANA Core Card -->
        <mxCell id="c_sap_s4core" value="SAP S/4HANA (NW Gateway)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #475569; line-height: 1.4;&quot;&gt;• Core Transactional ERP System of Record (Finance &amp; Operations) · Mission-Critical Enterprise Ledger&lt;br&gt;• SAP NetWeaver Gateway (OData v2/v4, RFC, BAPI Services) · High-Availability Transaction Execution&lt;br&gt;• Direct Integration with Google Cloud ABAP SDK (/GOOG/ Package) &amp; Enterprise Change Data Capture&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#1E40AF;strokeWidth=1.5;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=11;fontStyle=1;fontColor=#1E3A8A;align=left;verticalAlign=middle;spacingLeft=46;image=${iconSapS4Hana};imageWidth=26;imageHeight=26;imageAlign=left;imageVerticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="955" y="665" width="820" height="78" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- INTERACTION CONNECTORS WITH HIGH-CONTRAST LABELS & ZERO SLICING           -->
        <!-- ========================================================================= -->

        <!-- 1. End User -> Google Cloud Agents (Pro-Code) -->
        <mxCell id="edge_user_pro" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=1.8;exitX=1;exitY=0.25;entryX=0;entryY=0.5;" edge="1" parent="1" source="user_box" target="c_agents_pro">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="200" y="252" />
              <mxPoint x="200" y="172" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 2. End User -> Google Cloud Agents (No Code) -->
        <mxCell id="edge_user_nocode" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=1.8;exitX=1;exitY=0.75;entryX=0;entryY=0.5;" edge="1" parent="1" source="user_box" target="c_agents_nocode">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="200" y="367" />
              <mxPoint x="200" y="490" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. Agents (No Code) -> Agentic Connectors -->
        <mxCell id="edge_nocode_conn" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#3B82F6;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c_agents_nocode" target="box_agentic_connectors">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. Agents (Pro-code) -[A2A]-> SAP Joule Agents -->
        <mxCell id="edge_pro_joule" value="A2A" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;" edge="1" parent="1" source="c_agents_pro" target="c_joule_agents">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 5. Agents (Pro-code) -[REST]-> SAP API Mgmt. -->
        <mxCell id="edge_pro_apim" value="REST" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0070F2;strokeWidth=1.8;exitX=1;exitY=0.75;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#005B94;" edge="1" parent="1" source="c_agents_pro" target="c_sap_apim">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="925" y="187" />
              <mxPoint x="925" y="300" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 6. Agents (Pro-code) -[MCP]-> SAP MCP Gateway -->
        <mxCell id="edge_pro_mcpgw" value="MCP" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#059669;strokeWidth=1.8;exitX=1;exitY=0.85;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#047857;" edge="1" parent="1" source="c_agents_pro" target="c_sap_mcp_gw">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="915" y="193" />
              <mxPoint x="915" y="405" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 7. Agents (Pro-code) down to Cortex / BigQuery -->
        <mxCell id="edge_pro_cortex" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#3B82F6;strokeWidth=1.5;exitX=0.84;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c_agents_pro" target="c_cortex_bq">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 8. BigQuery Connector -> BigQuery (Direct Straight Horizontal Line) -->
        <mxCell id="edge_conn_bq" value="" style="edgeStyle=none;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=2;exitX=1;exitY=0.2;entryX=0;entryY=0.89;" edge="1" parent="1" source="c_conn_bq" target="c_cortex_bq">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 9. S/4HANA Connector -[REST]-> SAP S/4HANA (NW Gateway) (Routes cleanly below ABAP SDK) -->
        <mxCell id="edge_s4_conn_core" value="REST" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0070F2;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#005B94;" edge="1" parent="1" source="c_conn_s4" target="c_sap_s4core">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="640" y="630" />
              <mxPoint x="640" y="715" />
            </Array>
            <mxPoint x="125" y="0" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- 10. BigQuery -[Zero Copy]-> SAP BDC (Direct Clean Channel) -->
        <mxCell id="edge_bq_bdc" value="Zero Copy" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;dashed=1;dashPattern=5 3;exitX=1;exitY=0.75;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;labelPadding=3;fontSize=8.5;fontStyle=1;fontColor=#B45309;" edge="1" parent="1" source="c_cortex_bq" target="c_sap_bdc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="925" y="420" />
              <mxPoint x="925" y="558" />
            </Array>
            <mxPoint x="0" y="15" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- 11. ABAP SDK up to BigQuery (Upward arrow from user reference diagram) -->
        <mxCell id="edge_abap_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="c_abap_sdk" target="c_cortex_bq">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 12. SAP Joule <-> SAP SaaS -->
        <mxCell id="edge_joule_saas" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#CBD5E1;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c_joule_agents" target="c_saas_sf">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 13. SAP BTP <-> SAP SaaS -->
        <mxCell id="edge_btp_saas" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#CBD5E1;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="box_sap_btp" target="c_saas_cx">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 14. SAP BDC <-> SAP SaaS -->
        <mxCell id="edge_bdc_saas" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#CBD5E1;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c_sap_bdc" target="c_saas_s4pub">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 15. SAP BDC <-> SAP S/4HANA Core (Vertical arrow from user reference diagram) -->
        <mxCell id="edge_bdc_s4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#CBD5E1;strokeWidth=1.8;exitX=0.5;exitY=1;entryX=0.2;entryY=0;" edge="1" parent="1" source="c_sap_bdc" target="c_sap_s4core">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 6: END-TO-END CONCEPTUAL SCENARIO FLOWS (y=770, h=165)             -->
        <!-- ========================================================================= -->
        <mxCell id="domain_scenario" value="End-to-End Conceptual Value &amp; Interaction Flows" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=20;spacingTop=10;fontFamily=Google Sans, sans-serif;fontSize=12.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="770" width="1760" height="165" as="geometry" />
        </mxCell>

        <!-- Step 1 Card -->
        <mxCell id="sc_card_1" value="Flow 1: User Request &amp; Cognitive Dispatch&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• End User initiates inquiry via Natural Language Chat or IDE.&lt;br&gt;• Intent parsing determines whether No-Code assistant or Pro-Code agent handles the request.&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="45" y="805" width="415" height="110" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_1" value="Initiate User Request" style="rounded=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#1D4ED8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="145" y="880" width="215" height="22" as="geometry" />
        </mxCell>

        <!-- Step 2 Card -->
        <mxCell id="sc_card_2" value="Flow 2: A2A Collaboration &amp; Dynamic MCP Tools&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Pro-Code Agent negotiates with SAP Joule via Agent-to-Agent (A2A).&lt;br&gt;• Agentic Connectors call SAP MCP Gateway via Model Context Protocol to discover live ERP tools.&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="480" y="805" width="415" height="110" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_2" value="Execute Agent Interoperability" style="rounded=1;arcSize=50;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="580" y="880" width="215" height="22" as="geometry" />
        </mxCell>

        <!-- Step 3 Card -->
        <mxCell id="sc_card_3" value="Flow 3: Zero-Copy Analytics &amp; Cortex Grounding&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• BigQuery and SAP Datasphere (BDC) share telemetry via Zero-Copy federation.&lt;br&gt;• Cortex Framework models enrich agent prompts with verified semantic operational context.&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="915" y="805" width="415" height="110" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_3" value="Ground in Semantic Context" style="rounded=1;arcSize=50;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#D97706;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="880" width="215" height="22" as="geometry" />
        </mxCell>

        <!-- Step 4 Card -->
        <mxCell id="sc_card_4" value="Flow 4: Action Execution &amp; Core ERP Settlement&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #475569; line-height: 1.35;&quot;&gt;• Validated actions executed via REST/OData onto SAP S/4HANA and Line-of-Business SaaS.&lt;br&gt;• ABAP SDK and BigQuery Connector stream live confirmation events for continuous audit.&lt;/span&gt;" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;verticalAlign=middle;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1350" y="805" width="425" height="110" as="geometry" />
        </mxCell>
        <mxCell id="sc_btn_4" value="Commit Transaction to Core" style="rounded=1;arcSize=50;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#059669;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1455" y="880" width="215" height="22" as="geometry" />
        </mxCell>

        <!-- Flow Connectors -->
        <mxCell id="sc_edge_1_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sc_card_1" target="sc_card_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="sc_edge_2_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sc_card_2" target="sc_card_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="sc_edge_3_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=1.8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sc_card_3" target="sc_card_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- DOMAIN 7: BOTTOM LEGEND BAR (x=30, y=948, w=1760, h=36)                   -->
        <!-- ========================================================================= -->
        <mxCell id="leg_bg" value="" style="rounded=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="948" width="1760" height="36" as="geometry" />
        </mxCell>
        <mxCell id="leg_lbl_legend" value="Protocols &amp; Data Fabric:" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="45" y="956" width="140" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_1" value="■ A2A (Agent-to-Agent)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#7C3AED;" vertex="1" parent="1">
          <mxGeometry x="200" y="956" width="160" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_2" value="■ MCP (Model Context Protocol)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#059669;" vertex="1" parent="1">
          <mxGeometry x="380" y="956" width="200" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_3" value="■ REST / OData Gateway" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#0070F2;" vertex="1" parent="1">
          <mxGeometry x="600" y="956" width="170" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_4" value="--- Zero Copy Data Federation" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#D97706;" vertex="1" parent="1">
          <mxGeometry x="790" y="956" width="190" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_item_5" value="■ ABAP SDK / High-Speed CDC" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="1000" y="956" width="200" height="20" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`;

async function main() {
  const outDir = path.resolve(process.cwd(), "diagrams/sap_multi_agent_ecosystem");
  fs.mkdirSync(outDir, { recursive: true });

  const xmlPath = path.resolve(outDir, "01_pure_conceptual_sap_agents.drawio.xml");
  const pngPath = path.resolve(outDir, "01_pure_conceptual_sap_agents.png");

  fs.writeFileSync(xmlPath, xml.trim(), "utf-8");
  console.log(`Saved Pure Conceptual XML to ${xmlPath}`);

  // Also save to scratch
  const scratchDir = path.resolve(process.cwd(), "scratch/sap_google_agents");
  fs.mkdirSync(scratchDir, { recursive: true });
  fs.writeFileSync(path.resolve(scratchDir, "pure_conceptual_sap_agents.drawio.xml"), xml.trim(), "utf-8");

  // Read local viewer-static.min.js
  const viewerJsPath = path.join(process.cwd(), "public/viewer-static.min.js");
  const viewerJs = fs.readFileSync(viewerJsPath, "utf8");

  const configObj = {
    highlight: "#0000ff",
    nav: false,
    resize: true,
    toolbar: null,
    edit: null,
    xml: xml.trim(),
  };

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 20px; background: #FFFFFF; display: flex; justify-content: center; }
    .mxgraph { width: 1840px; height: 1040px; }
  </style>
</head>
<body>
  <div class="mxgraph" id="diagram-container" style="max-width:100%;border:1px solid #E2E8F0;"></div>
  <script>
    ${viewerJs}
  </script>
  <script>
    try {
      const el = document.getElementById('diagram-container');
      el.setAttribute('data-mxgraph', JSON.stringify(${JSON.stringify(configObj)}));
      if (window.GraphViewer && window.GraphViewer.processElements) {
        window.GraphViewer.processElements();
      }
    } catch(e) {
      console.error("Initialization error:", e);
    }
  </script>
</body>
</html>`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1100, deviceScaleFactor: 2 });
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (err) => console.log("PAGE ERROR:", String(err)));

    await page.setContent(html, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 2500));

    const svgExists = await page.evaluate(() => {
      const svg = document.querySelector("svg");
      return !!svg && svg.childNodes.length > 0;
    });
    console.log("SVG successfully rendered inside DOM:", svgExists);

    const container = await page.$(".mxgraph");
    if (container) {
      await container.screenshot({ path: pngPath });
      console.log(`Rendered PNG to ${pngPath}`);
    } else {
      await page.screenshot({ path: pngPath, fullPage: true });
      console.log(`Rendered fallback PNG to ${pngPath}`);
    }

    // Also copy to scratch
    fs.copyFileSync(pngPath, path.resolve(scratchDir, "pure_conceptual_sap_agents.png"));
    const scratchScreenshot = path.resolve(process.cwd(), "scratch/screenshots_conceptual_refactor/16_pure_conceptual_architecture.png");
    fs.copyFileSync(pngPath, scratchScreenshot);

    await browser.close();
  } catch (e) {
    console.error("Puppeteer rendering error:", e);
  }
}

main().catch(console.error);
