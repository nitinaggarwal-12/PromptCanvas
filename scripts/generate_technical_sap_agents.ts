import * as fs from "fs";
import * as path from "path";
import puppeteer from "puppeteer";
import * as http from "http";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T13:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="technical_sap_google_agents" name="Technical Architecture - SAP Agents on Google Cloud">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1580" pageHeight="880" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Title & Tech Metadata -->
        <mxCell id="title" value="Technical Architecture: SAP Multi-Agent Integration on Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=24;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="20" width="1050" height="32" as="geometry" />
        </mxCell>
        <mxCell id="subtitle" value="Implementation Blueprint: Runtime Services, Model Context Protocol (MCP), A2A Orchestration, Zero-ETL Federation &amp; Network Protocols" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="30" y="50" width="1050" height="20" as="geometry" />
        </mxCell>


        <!-- ==================== LEFT: CLIENT TIER & SECURITY INGRESS ==================== -->
        <mxCell id="tier_client" value="Client Ingress &amp; Identity" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=top;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="25" y="270" width="165" height="250" as="geometry" />
        </mxCell>
        <mxCell id="user_icon_bg" value="" style="shape=ellipse;fillColor=#2563EB;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="80" y="302" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="user_avatar" value="👤" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=24;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="80" y="302" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="client_label" value="End User Client" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="35" y="362" width="145" height="20" as="geometry" />
        </mxCell>
        <mxCell id="client_specs" value="• Web App / React (SPA)&lt;br&gt;• Google Workspace Add-in&lt;br&gt;• MS Teams / Slack Bot&lt;br&gt;&lt;span style=&quot;color: #2563EB; font-weight: bold;&quot;&gt;Auth:&lt;/span&gt; OIDC / SAML 2.0 / WIF" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9;fontColor=#334155;align=left;verticalAlign=middle;spacingLeft=8;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="33" y="388" width="148" height="64" as="geometry" />
        </mxCell>
        <mxCell id="client_ingress_badge" value="TLS 1.3 / HTTPS :443" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="33" y="460" width="148" height="20" as="geometry" />
        </mxCell>


        <!-- ==================== CENTER: GOOGLE CLOUD SECURITY PERIMETER (VPC-SC) ==================== -->
        <mxCell id="gcp_boundary" value="Google Cloud (VPC-SC Perimeter &amp; Vertex AI Services)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=13;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="235" y="85" width="515" height="665" as="geometry" />
        </mxCell>

        <!-- GE Agent Platform Sub-Container -->
        <mxCell id="ge_platform_box" value="GE Agent Platform (Vertex AI Reasoning Engine / Cloud Run)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=bottom;spacingBottom=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="315" y="130" width="220" height="115" as="geometry" />
        </mxCell>
        <mxCell id="card_pro_code" value="Agents (Pro-Code / ADK)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• LangGraph / Python ADK&lt;br&gt;• Gemini 1.5 Pro / Vertex RAG&lt;br&gt;• Async Task Planning &amp; Eval&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="328" y="142" width="194" height="68" as="geometry" />
        </mxCell>

        <!-- Gemini Enterprise App Container -->
        <mxCell id="gemini_app_box" value="Gemini Enterprise App (Vertex AI Agent Builder &amp; Search)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=bottom;spacingBottom=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="250" y="260" width="285" height="465" as="geometry" />
        </mxCell>

        <!-- Agents (No Code) -->
        <mxCell id="card_nocode" value="Agents&lt;br&gt;(No Code)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Agent Builder&lt;br&gt;• Gemini Flash&lt;br&gt;• UI Grounding&lt;br&gt;• Session RBAC&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="260" y="380" width="92" height="145" as="geometry" />
        </mxCell>

        <!-- Agentic Connectors Inner Sub-box -->
        <mxCell id="box_connectors" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;dashed=1;dashPattern=2 2;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="382" y="278" width="142" height="400" as="geometry" />
        </mxCell>
        <mxCell id="lbl_conn" value="Agentic Connectors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;(Tool Execution SDK)&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;lineHeight=1.1;" vertex="1" parent="1">
          <mxGeometry x="385" y="640" width="136" height="28" as="geometry" />
        </mxCell>

        <!-- 3 Technical Connector Cards -->
        <mxCell id="card_byo_mcp" value="Bring your own MCP&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol&lt;br&gt;• JSON-RPC over SSE/Stdio&lt;br&gt;• Custom Tool Schema / Auth&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="390" y="290" width="126" height="90" as="geometry" />
        </mxCell>

        <mxCell id="card_bq_conn" value="BigQuery Connector&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Storage Read API&lt;br&gt;• Vector Search ScaNN&lt;br&gt;• NL2SQL LLM Engine&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="390" y="395" width="126" height="80" as="geometry" />
        </mxCell>

        <mxCell id="card_s4_conn" value="S/4HANA Connector&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• OData v2/v4 Client&lt;br&gt;• CSRF / OAuth2 Token&lt;br&gt;• BAPI / RFC Proxy Bridge&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="390" y="490" width="126" height="85" as="geometry" />
        </mxCell>

        <!-- Right Side inside Google Cloud: Cortex Framework & BigQuery -->
        <mxCell id="card_cortex_hdr" value="Cortex Framework&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal;&quot;&gt;SAP CDC &amp; Dataform Semantic Views&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.1;" vertex="1" parent="1">
          <mxGeometry x="580" y="360" width="150" height="42" as="geometry" />
        </mxCell>
        <mxCell id="card_bq_engine" value="BigQuery&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Enterprise Data Warehouse&lt;br&gt;• BigQuery ML / Embeddings&lt;br&gt;• BigLake Object Tables&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="580" y="402" width="150" height="75" as="geometry" />
        </mxCell>

        <!-- ABAP SDK / BQ Toolkit & BQ Connector -->
        <mxCell id="card_abap_toolkit" value="ABAP SDK / BQ Toolkit&lt;br&gt;&amp;amp; BQ Connector&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• NetWeaver gcloud Library&lt;br&gt;• Pub/Sub &amp; GCS Ingestion&lt;br&gt;• SAP SLT Real-time CDC&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="580" y="525" width="150" height="95" as="geometry" />
        </mxCell>


        <!-- ==================== RIGHT SIDE: SAP ENTERPRISE ECOSYSTEM ==================== -->

        <!-- SAP Joule Container -->
        <mxCell id="sap_joule_box" value="SAP Joule (Generative AI Hub)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=top;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="910" y="85" width="150" height="110" as="geometry" />
        </mxCell>
        <mxCell id="card_sap_joule" value="SAP Joule Agents&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Joule Business Agents&lt;br&gt;• LLM Grounding on BTP&lt;br&gt;• A2A Token Exchange&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="920" y="115" width="130" height="68" as="geometry" />
        </mxCell>

        <!-- SAP BTP Container -->
        <mxCell id="sap_btp_box" value="SAP BTP (Integration Suite)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=top;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="910" y="210" width="150" height="205" as="geometry" />
        </mxCell>
        <mxCell id="card_sap_apimgmt" value="SAP API Mgmt.&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• API Gateway &amp; OAuth 2.0&lt;br&gt;• Cloud Connector mTLS Tunnel&lt;br&gt;• Rate Limiting &amp; Telemetry&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="920" y="238" width="130" height="74" as="geometry" />
        </mxCell>
        <mxCell id="card_sap_mcpgw" value="SAP MCP Gateway&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol GW&lt;br&gt;• BTP Open Tool Registry&lt;br&gt;• Kyma / CF Runtime&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="920" y="322" width="130" height="78" as="geometry" />
        </mxCell>

        <!-- SAP BDC Container -->
        <mxCell id="sap_bdc_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="910" y="430" width="150" height="100" as="geometry" />
        </mxCell>
        <mxCell id="card_sap_bdc" value="SAP BDC&lt;br&gt;(Business Data Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• SAP Datasphere Federation&lt;br&gt;• Zero-ETL FedSQL Virtualization&lt;br&gt;• Delta Sharing Protocol&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="920" y="442" width="130" height="78" as="geometry" />
        </mxCell>

        <!-- SAP SaaS Far Right Container -->
        <mxCell id="sap_saas_box" value="SAP SaaS Portfolio (Cloud)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=top;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1110" y="85" width="155" height="445" as="geometry" />
        </mxCell>
        <mxCell id="saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;OData v4 / HCM Core API&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.15;" vertex="1" parent="1">
          <mxGeometry x="1122" y="118" width="130" height="60" as="geometry" />
        </mxCell>
        <mxCell id="saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;REST v4 / Spend &amp; Travel API&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.15;" vertex="1" parent="1">
          <mxGeometry x="1122" y="190" width="130" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_cx" value="SAP Customer Exp.&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Commerce &amp; Sales Cloud API&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.15;" vertex="1" parent="1">
          <mxGeometry x="1122" y="254" width="130" height="60" as="geometry" />
        </mxCell>
        <mxCell id="saas_biznet" value="SAP Business Networks&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Ariba / cXML / EDI Logistics&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.15;" vertex="1" parent="1">
          <mxGeometry x="1122" y="326" width="130" height="60" as="geometry" />
        </mxCell>
        <mxCell id="saas_s4pub" value="S/4HANA Public Cloud&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Clean Core OData / GraphQL&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.15;" vertex="1" parent="1">
          <mxGeometry x="1122" y="398" width="130" height="60" as="geometry" />
        </mxCell>

        <!-- SAP RISE / S/4HANA (Bottom Right) -->
        <mxCell id="sap_rise_box" value="SAP RISE / Any-Cloud / On-Premise Core" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=top;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="910" y="555" width="355" height="110" as="geometry" />
        </mxCell>
        <mxCell id="card_s4_onprem" value="SAP S/4HANA (NetWeaver Gateway)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• AS ABAP 7.58+ / SAP GUI &amp; Fiori Launchpad&lt;br&gt;• OData Services (:44300) / RFC Gateway (:3300) / SAP HANA In-Memory DB&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="925" y="582" width="325" height="65" as="geometry" />
        </mxCell>


        <!-- ==================== TECHNICAL CONNECTORS, PROTOCOLS & NETWORK PILLS ==================== -->

        <!-- Client to Pro-Code Agents -->
        <mxCell id="t_edge_client_to_pro" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="tier_client" target="card_pro_code">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="215" y="395" />
              <mxPoint x="215" y="176" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Client <-> No-Code Agents -->
        <mxCell id="t_edge_client_to_nocode" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1" source="tier_client" target="card_nocode">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="220" y="452" />
              <mxPoint x="220" y="452" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- No-Code Agents <-> Agentic Connectors -->
        <mxCell id="t_edge_nocode_to_conn" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1" source="card_nocode" target="box_connectors">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Pro-Code Agents -> SAP Joule Agents (A2A Protocol) -->
        <mxCell id="t_edge_pro_to_joule" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_pro_code" target="card_sap_joule">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="760" y="149" />
              <mxPoint x="760" y="149" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- A2A Protocol Pill -->
        <mxCell id="t_pill_a2a" value="A2A (mTLS / OIDC)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="762" y="137" width="128" height="24" as="geometry" />
        </mxCell>

        <!-- Pro-Code Agents -> SAP API Mgmt (REST / OData) -->
        <mxCell id="t_edge_pro_to_apimgmt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_pro_code" target="card_sap_apimgmt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="765" y="176" />
              <mxPoint x="765" y="275" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- REST Protocol Pill -->
        <mxCell id="t_pill_rest_top" value="REST / OData (OAuth2)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="754" y="263" width="144" height="24" as="geometry" />
        </mxCell>

        <!-- BYO MCP -> SAP MCP Gateway (Model Context Protocol) -->
        <mxCell id="t_edge_mcp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_byo_mcp" target="card_sap_mcpgw">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="765" y="335" />
              <mxPoint x="765" y="361" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- MCP Protocol Pill -->
        <mxCell id="t_pill_mcp" value="MCP (JSON-RPC / SSE)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="756" y="349" width="140" height="24" as="geometry" />
        </mxCell>

        <!-- Pro-Code Agents down to Cortex Framework -->
        <mxCell id="t_edge_pro_to_cortex" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_pro_code" target="card_cortex_hdr">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="655" y="176" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- BigQuery Connector to BigQuery Engine -->
        <mxCell id="t_edge_bqconn_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_bq_conn" target="card_bq_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="550" y="435" />
              <mxPoint x="550" y="439" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- S/4HANA Connector down to ABAP SDK -->
        <mxCell id="t_edge_s4conn_to_abap" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_s4_conn" target="card_abap_toolkit">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="550" y="532" />
              <mxPoint x="550" y="572" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ABAP SDK UP to BigQuery -->
        <mxCell id="t_edge_abap_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0.5;entryY=1;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_abap_toolkit" target="card_bq_engine">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- BigQuery <-> SAP BDC (Zero Copy Federation) -->
        <mxCell id="t_edge_bq_to_bdc" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1" source="card_bq_engine" target="card_sap_bdc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="765" y="439" />
              <mxPoint x="765" y="481" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Zero Copy Pill -->
        <mxCell id="t_pill_zerocopy" value="Zero Copy (FedSQL / Delta)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="740" y="469" width="158" height="24" as="geometry" />
        </mxCell>

        <!-- ABAP SDK -> SAP S/4HANA (REST / RFC Tunnel) -->
        <mxCell id="t_edge_abap_to_s4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="card_abap_toolkit" target="card_s4_onprem">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="555" y="572" />
              <mxPoint x="555" y="615" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- REST Bottom Pill (Channel Space) -->
        <mxCell id="t_pill_rest_bottom" value="REST / RFC (:44300 / :3300)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="725" y="603" width="180" height="24" as="geometry" />
        </mxCell>

        <!-- Right Side Cross Connectors to SAP SaaS -->
        <mxCell id="t_edge_joule_to_saas" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1" source="sap_joule_box" target="sap_saas_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1085" y="140" />
              <mxPoint x="1085" y="140" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t_edge_btp_to_saas" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1" source="sap_btp_box" target="sap_saas_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1085" y="312" />
              <mxPoint x="1085" y="312" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t_edge_bdc_to_saas" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1" source="sap_bdc_box" target="sap_saas_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1085" y="480" />
              <mxPoint x="1085" y="480" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t_edge_saas_to_s4" style="edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;startSize=5;endSize=5;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1090" y="530" as="sourcePoint" />
            <mxPoint x="1090" y="555" as="targetPoint" />
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`;

async function main() {
  const outDir = path.resolve(process.cwd(), "scratch/sap_google_agents");
  fs.mkdirSync(outDir, { recursive: true });

  const xmlPath = path.resolve(outDir, "technical_sap_agents_google_cloud.drawio.xml");
  const pngPath = path.resolve(outDir, "technical_sap_agents_google_cloud.png");

  fs.writeFileSync(xmlPath, xml.trim(), "utf-8");
  console.log(`Saved XML to ${xmlPath}`);

  const cfg = {
    xml: xml.trim(),
    lightbox: false,
    nav: false,
    resize: true,
    toolbar: "zoom",
    edit: "_blank",
    border: 20,
    transparent: false,
    fit: true,
    "max-scale": 2.0
  };

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:100%;height:100%;background:#FFF;overflow:hidden;display:flex;align-items:center;justify-content:center;}.mxgraph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}.mxgraph>svg{width:100%!important;height:auto!important;margin:0 auto;}</style></head><body><div class="mxgraph" id="diagram-container"></div><script src="/viewer-static.min.js"></script><script>const cfg=${JSON.stringify(cfg)};const cont=document.getElementById("diagram-container");cont.setAttribute("data-mxgraph",JSON.stringify(cfg));if(window.GraphViewer&&window.GraphViewer.processElements){window.GraphViewer.processElements();}</script></body></html>`;

  const server = http.createServer((req, res) => {
    if (req.url === "/viewer-static.min.js") {
      const p = path.resolve(process.cwd(), "public/viewer-static.min.js");
      if (fs.existsSync(p)) {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(fs.readFileSync(p));
        return;
      }
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });

  await new Promise<void>(resolve => server.listen(3107, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1580, height: 880, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3107", { waitUntil: "networkidle0", timeout: 20000 });
  await new Promise(r => setTimeout(r, 1500));

  const svgElem = (await page.$(".mxgraph > svg")) || (await page.$("#diagram-container"));
  if (svgElem) {
    await svgElem.screenshot({ path: pngPath });
    console.log(`Rendered PNG to ${pngPath}`);
  }

  await browser.close();
  server.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
