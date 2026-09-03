import * as fs from 'fs';
import * as path from 'path';

function generateCertifiedTechnicalXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T13:45:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="true_technical_sap_agents" name="Technical &amp; Network Infrastructure Architecture">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1820" pageHeight="980" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Title & Subtitle -->
        <mxCell id="title" value="Technical &amp; Infrastructure Architecture: SAP Multi-Agent Ecosystem on Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=24;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="20" width="1300" height="32" as="geometry" />
        </mxCell>
        <mxCell id="subtitle" value="Physical &amp; Network Topology: VPC Subnetting (10.128.0.0/16), Serverless VPC Access, Private Service Connect (PSC), Cloud Connector HA Tunnel, &amp; On-Prem AS ABAP (/GOOG/ SDK)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="30" y="50" width="1400" height="20" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 1: CLIENT INGRESS & ZERO TRUST EDGE ==================== -->
        <mxCell id="zone_ingress" value="Client Ingress &amp; Zero-Trust Edge" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=top;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="95" width="180" height="840" as="geometry" />
        </mxCell>

        <!-- End User Persona -->
        <mxCell id="box_user_client" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="42" y="130" width="156" height="150" as="geometry" />
        </mxCell>
        <mxCell id="u_icon" value="👤" style="shape=ellipse;fillColor=#2563EB;strokeColor=none;fontColor=#FFFFFF;fontSize=22;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="96" y="143" width="48" height="48" as="geometry" />
        </mxCell>
        <mxCell id="u_lbl" value="Enterprise Client Apps&lt;br&gt;&lt;span style=&quot;font-size: 9px; font-weight: normal; color: #64748B;&quot;&gt;Web SPA / Workspace Add-on&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="46" y="197" width="148" height="30" as="geometry" />
        </mxCell>
        <mxCell id="u_auth_pill" value="OAuth 2.0 / OIDC / WIF" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="237" width="140" height="22" as="geometry" />
        </mxCell>

        <!-- Cloud Armor & External HTTPS Load Balancer -->
        <mxCell id="box_cloud_armor" value="Cloud Armor (DDoS / WAF)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;OWASP Top 10 + Rate Limit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="315" width="156" height="60" as="geometry" />
        </mxCell>

        <mxCell id="box_gclb" value="Global External HTTPS LB&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;Anycast IP :443 / TLS 1.3&lt;br&gt;Identity-Aware Proxy (IAP)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="405" width="156" height="75" as="geometry" />
        </mxCell>

        <!-- Security & IAM Infrastructure -->
        <mxCell id="box_security_iam" value="Cloud IAM &amp; Secret Manager&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Workload Identity Pool&lt;br&gt;• Cloud KMS (mTLS Keys)&lt;br&gt;• SAP BTP Token Secrets&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="515" width="156" height="85" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 2: GOOGLE CLOUD REGION (VPC: 10.128.0.0/16) ==================== -->
        <mxCell id="vpc_gcp" value="Google Cloud VPC — Region: us-central1 (10.128.0.0/16 | VPC-SC Security Perimeter)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="250" y="95" width="600" height="840" as="geometry" />
        </mxCell>

        <!-- Subnet 1: AI Agent & Reasoning Runtime Subnet -->
        <mxCell id="subnet_agents" value="Subnet: ai-agent-runtime (10.128.10.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=12;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="268" y="130" width="275" height="470" as="geometry" />
        </mxCell>

        <!-- Pro-Code Vertex AI Reasoning Engine / Cloud Run -->
        <mxCell id="node_reasoning_engine" value="Vertex AI Reasoning Engine&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Run / GKE Autopilot (Container)&lt;br&gt;• Python ADK / LangGraph Engine&lt;br&gt;• Gemini 1.5 Pro (002) Instance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="283" y="165" width="245" height="75" as="geometry" />
        </mxCell>

        <!-- No-Code Agent Builder Managed Service -->
        <mxCell id="node_agent_builder" value="Vertex AI Agent Builder&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Gemini 1.5 Flash (Managed)&lt;br&gt;• Multimodal Intent Routing&lt;br&gt;• Enterprise Session Store&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="283" y="260" width="245" height="75" as="geometry" />
        </mxCell>

        <!-- Agentic Connectors Sub-Group -->
        <mxCell id="node_mcp_host" value="BYO MCP Server Gateway (Cloud Run)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• JSON-RPC 2.0 over SSE / Stdio&lt;br&gt;• Tool Schema Reflection &amp; Execution&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="283" y="355" width="245" height="60" as="geometry" />
        </mxCell>

        <mxCell id="node_s4_adapter" value="S/4HANA OData Client Adapter&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CSRF Token Management &amp; Replay Guard&lt;br&gt;• OData v2/v4 Batch Invocation&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="283" y="430" width="245" height="60" as="geometry" />
        </mxCell>

        <mxCell id="node_vpc_connector" value="Serverless VPC Access Connector&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Direct Private Egress to VPC &amp; Interconnect&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="283" y="505" width="245" height="45" as="geometry" />
        </mxCell>

        <!-- Subnet 2: Enterprise Data & Analytics Subnet -->
        <mxCell id="subnet_data" value="Subnet: data-lakehouse (10.128.20.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=12;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="558" y="130" width="275" height="470" as="geometry" />
        </mxCell>

        <!-- Cortex Framework / Dataform Engine -->
        <mxCell id="node_cortex" value="Cortex Framework Engine&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Pre-packaged SAP Operational Models&lt;br&gt;• Dataform SQL Pipelines / Workflows&lt;br&gt;• Materialized Analytical Views&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="573" y="165" width="245" height="75" as="geometry" />
        </mxCell>

        <!-- BigQuery & ScaNN Vector Search -->
        <mxCell id="node_bigquery" value="BigQuery Enterprise &amp; ScaNN&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• BigLake Managed Tables (Parquet)&lt;br&gt;• ScaNN Vector Embeddings Index&lt;br&gt;• BigQuery Storage Read API (gRPC :443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="573" y="260" width="245" height="85" as="geometry" />
        </mxCell>

        <!-- Vertex Vector Search PSC Endpoint -->
        <mxCell id="node_vector_psc" value="Vertex Vector Search (PSC Endpoint)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Private Service Connect :10000 IP (10.128.20.50)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="573" y="365" width="245" height="50" as="geometry" />
        </mxCell>

        <mxCell id="node_pubsub_staging" value="Cloud Pub/Sub &amp; Cloud Storage (GCS)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Target endpoints for SAP ABAP SDK Ingestion&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="573" y="435" width="245" height="50" as="geometry" />
        </mxCell>

        <!-- Subnet 3: Hybrid Ingestion & Integration Subnet -->
        <mxCell id="subnet_ingest" value="Subnet: data-ingestion-hybrid (10.128.30.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=12;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="268" y="620" width="565" height="150" as="geometry" />
        </mxCell>

        <!-- Cloud Data Fusion & SLT Ingestion Workers -->
        <mxCell id="node_data_fusion" value="Cloud Data Fusion / SLT Replication Workers&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CDAP Native Pipelines / Private IP Peering (:443)&lt;br&gt;• SAP SLT Real-time Change Data Capture (CDC) Receiver&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="283" y="655" width="535" height="55" as="geometry" />
        </mxCell>

        <!-- Cloud Interconnect / HA VPN Gateway sitting at border -->
        <mxCell id="node_cloud_interconnect" value="Cloud Router &amp; Dedicated Interconnect / HA VPN Gateway (BGP ASN: 64512 / 10.250.0.0/30)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="283" y="722" width="535" height="32" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 3: SAP BTP SUB-ACCOUNT (REGION: cf-us10) ==================== -->
        <mxCell id="zone_sap_btp" value="SAP BTP Platform (Cloud Foundry / Kyma Runtime: cf-us10)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1070" y="95" width="340" height="470" as="geometry" />
        </mxCell>

        <!-- SAP Joule AI Runtime -->
        <mxCell id="node_sap_joule" value="SAP Joule / Generative AI Hub&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Foundation Model Gateway&lt;br&gt;• Joule Business Context Engine&lt;br&gt;• A2A Token Exchange Endpoint&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1085" y="135" width="310" height="75" as="geometry" />
        </mxCell>

        <!-- SAP Integration Suite / API Mgmt -->
        <mxCell id="node_sap_apimgmt" value="SAP Integration Suite (API Management)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• OAuth 2.0 / SAML Assertion Token Translator&lt;br&gt;• Cloud Connector mTLS Ingress Tunnel (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1085" y="230" width="310" height="68" as="geometry" />
        </mxCell>

        <!-- SAP MCP Gateway on Kyma -->
        <mxCell id="node_sap_mcpgw" value="SAP MCP Gateway (Kyma K8s Runtime)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol (MCP) Server Container&lt;br&gt;• BTP Open Tool Registry &amp; JSON-RPC Dispatcher&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1085" y="318" width="310" height="65" as="geometry" />
        </mxCell>

        <!-- SAP Datasphere / Business Data Cloud -->
        <mxCell id="node_sap_datasphere" value="SAP Datasphere (Business Data Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• FedSQL Zero-Copy Federation with BigQuery&lt;br&gt;• Delta Sharing Protocol / Semantic Data Fabric&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1085" y="402" width="310" height="65" as="geometry" />
        </mxCell>

        <!-- BTP ABAP Environment (Optional Cloud ABAP SDK) -->
        <mxCell id="node_btp_abap" value="SAP BTP ABAP Environment (Steampunk)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;ABAP SDK for Google Cloud (BTP Edition) Integration&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1085" y="485" width="310" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 4: SAP SAAS APPS (TOP RIGHT) ==================== -->
        <mxCell id="zone_sap_saas" value="SAP SaaS Suite (Public Endpoints)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1450" y="95" width="340" height="470" as="geometry" />
        </mxCell>

        <mxCell id="saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;OData v4 REST API (:443) / User Identity Store&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1465" y="135" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Expense v4 REST API (:443) / OAuth2 Token Bearer&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1465" y="200" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_cx" value="SAP Customer Experience (Commerce Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;OCC REST API (:443) / Headless Storefront Service&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1465" y="265" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_biznet" value="SAP Business Network (Ariba Network)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;cXML / EDI Integration / Supplier Gateway&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1465" y="330" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_s4pub" value="S/4HANA Cloud (Public Edition)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Clean Core OData v4 / GraphQL APIs (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1465" y="395" width="310" height="52" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 5: SAP RISE / ON-PREMISE CORE (BOTTOM RIGHT) ==================== -->
        <mxCell id="zone_sap_onprem" value="SAP RISE / Any-Cloud / On-Premise Core Data Center (172.16.0.0/16)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1070" y="600" width="720" height="335" as="geometry" />
        </mxCell>

        <!-- SAP Cloud Connector HA Pair with Principal Propagation -->
        <mxCell id="node_scc_ha" value="SAP Cloud Connector (SCC High Availability Cluster)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Outbound-only TLS Reverse Tunnel to BTP (:443) / No open inbound ports&lt;br&gt;• Principal Propagation Engine: SAML 2.0 / X.509 Short-Lived Certificate Generator&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1085" y="635" width="690" height="55" as="geometry" />
        </mxCell>

        <!-- NetWeaver AS ABAP with ABAP SDK Inside -->
        <mxCell id="node_as_abap" value="SAP NetWeaver AS ABAP 7.58+ (S/4HANA 2023 / ECC 6.0 EHP8)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Internet Communication Manager (ICM) — HTTPS OData Port :44300&lt;br&gt;• ABAP Gateway Dispatcher / RFC &amp; BAPI Gateway Port :3300 (SNC Encryption)&lt;br&gt;• &lt;b style=&quot;color: #FEF08A;&quot;&gt;ABAP SDK for Google Cloud (/GOOG/ Package)&lt;/b&gt;: Direct Outbound HTTPS to Vertex &amp; BigQuery&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="1085" y="710" width="690" height="90" as="geometry" />
        </mxCell>

        <!-- SAP HANA In-Memory Database -->
        <mxCell id="node_sap_hana" value="SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB Port :30015 | Multi-AZ High Availability System Replication)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1085" y="820" width="690" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== FLOW CONNECTORS & OPEN CHANNEL PROTOCOL PILLS ==================== -->

        <!-- Client to LB -->
        <mxCell id="e_client_to_armor" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="box_user_client" target="box_cloud_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_armor_to_gclb" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="box_cloud_armor" target="box_gclb">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- GCLB to Reasoning Engine & Agent Builder -->
        <mxCell id="e_gclb_to_agents" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="box_gclb" target="node_reasoning_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="235" y="442" />
              <mxPoint x="235" y="202" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_gclb_to_nocode" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="box_gclb" target="node_agent_builder">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="235" y="442" />
              <mxPoint x="235" y="297" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Agent Reasoning Engine -> SAP Joule (A2A Protocol) -->
        <mxCell id="e_pro_to_joule" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_joule">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="960" y="172" />
              <mxPoint x="960" y="172" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- A2A Badge -->
        <mxCell id="badge_a2a" value="A2A: JSON-RPC over mTLS / OIDC" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="160" width="180" height="24" as="geometry" />
        </mxCell>

        <!-- Agent Reasoning Engine -> SAP API Management -->
        <mxCell id="e_pro_to_apimgmt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_apimgmt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="540" y="202" />
              <mxPoint x="540" y="264" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- REST Badge -->
        <mxCell id="badge_rest_btp" value="HTTPS :443 / OAuth2 Bearer" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="875" y="252" width="170" height="24" as="geometry" />
        </mxCell>

        <!-- BYO MCP -> SAP MCP Gateway -->
        <mxCell id="e_mcp_to_gw" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_mcp_host" target="node_sap_mcpgw">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="960" y="385" />
              <mxPoint x="960" y="350" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- MCP Badge -->
        <mxCell id="badge_mcp" value="MCP v1.0: JSON-RPC over SSE" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="875" y="338" width="170" height="24" as="geometry" />
        </mxCell>

        <!-- BigQuery <-> SAP Datasphere Zero Copy -->
        <mxCell id="e_bq_to_datasphere" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_bigquery" target="node_sap_datasphere">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="960" y="302" />
              <mxPoint x="960" y="434" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Zero Copy Badge -->
        <mxCell id="badge_zerocopy" value="Zero-Copy: FedSQL / Delta Sharing" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#047857;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="865" y="422" width="190" height="24" as="geometry" />
        </mxCell>

        <!-- Outbound ABAP SDK Call to Google Cloud Services (PubSub / BigQuery / Vertex) -->
        <mxCell id="e_abap_to_gcp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;dashed=1;dashPattern=5 3;entryX=1;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_as_abap" target="node_pubsub_staging">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="950" y="755" />
              <mxPoint x="950" y="460" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- ABAP SDK Outbound Badge -->
        <mxCell id="badge_abap_sdk_call" value="Outbound HTTPS :443 (/GOOG/ SDK via PSC/Interconnect)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7DD3FC;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#0369A1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="605" width="220" height="24" as="geometry" />
        </mxCell>

        <!-- Direct Cloud Interconnect / VPN Line between VPC and On-Prem -->
        <mxCell id="e_interconnect_line" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_cloud_interconnect" target="node_as_abap">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="930" y="738" />
              <mxPoint x="930" y="755" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Ingestion Tunnel Badge -->
        <mxCell id="badge_ingest_rfc" value="Dedicated Interconnect (Private IP :44300 / :3300)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDBA74;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#C2410C;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="850" y="726" width="205" height="24" as="geometry" />
        </mxCell>

        <!-- SAP BTP API Mgmt to Cloud Connector (mTLS Reverse Tunnel) -->
        <mxCell id="e_btp_to_scc" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_sap_apimgmt" target="node_scc_ha">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1430" y="264" />
              <mxPoint x="1430" y="635" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- SCC Reverse Tunnel Badge -->
        <mxCell id="badge_scc_tunnel" value="mTLS Outbound Reverse Tunnel (:443)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;fontFamily=Roboto Mono, monospace;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1340" y="580" width="180" height="20" as="geometry" />
        </mxCell>

        <!-- Cloud Connector to AS ABAP ICM -->
        <mxCell id="e_scc_to_icm" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_scc_ha" target="node_as_abap">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- AS ABAP to HANA DB -->
        <mxCell id="e_abap_to_hana" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.5;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_as_abap" target="node_sap_hana">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- BTP to SaaS Apps -->
        <mxCell id="e_btp_to_saas" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="zone_sap_btp" target="zone_sap_saas">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

function run() {
  const xml = generateCertifiedTechnicalXml();
  const outXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  fs.writeFileSync(outXmlPath, xml, 'utf8');
  console.log(`Successfully written certified technical diagram to: ${outXmlPath}`);
}

run();
