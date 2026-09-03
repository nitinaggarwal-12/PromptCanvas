import * as fs from 'fs';
import * as path from 'path';

function generateProductionTechnicalXml(): string {
  // Let's create the ultimate, architecturally complete, high-craft Draw.io XML:
  // Viewport: 1880 x 980
  // Tier 1: Client Ingress & Zero-Trust Edge (x=30, y=95, w=180, h=840)
  //   - End User Client Apps (Web SPA / Workspace Add-on / Fiori)
  //   - Cloud Armor (WAF/DDoS)
  //   - Global External HTTPS LB + IAP
  //   - Cloud IAM, KMS & Secret Manager
  //   - Cloud Operations Suite (Cloud Logging, Monitoring & OpenTelemetry Trace)
  //
  // Tier 2: Google Cloud VPC (Region: us-central1 - 10.128.0.0/16 | VPC-SC Perimeter) (x=245, y=95, w=620, h=840)
  //   Subnet 1: Subnet: ai-agent-runtime (10.128.10.0/24) (x=260, y=130, w=280, h=470)
  //     - Vertex AI Reasoning Engine (Cloud Run / GKE Autopilot - Python ADK / LangGraph)
  //     - Vertex AI Agent Builder & Gemini 1.5 Flash Intent Router
  //     - BYO MCP Server Gateway (Cloud Run - JSON-RPC SSE)
  //     - S/4HANA OData Client Adapter & Replay Guard
  //     - Direct VPC Egress (Zero-Egress-VM Native Interface)
  //
  //   Subnet 2: Subnet: data-lakehouse & RAG (10.128.20.0/24) (x=565, y=130, w=280, h=470)
  //     - Cortex Framework Engine (Operational Data Models & Dataform DAGs)
  //     - BigQuery Enterprise & ScaNN Vector Search (Parquet / gRPC Read API)
  //     - Vertex Vector Search (PSC Endpoint :10000 / IP: 10.128.20.50)
  //     - Cloud Pub/Sub Streaming Bus & Cloud Storage (GCS)
  //     - Internal RAG & Grounding Bus (Fast private link from Subnet 1)
  //
  //   Subnet 3: Subnet: data-ingestion-hybrid (10.128.30.0/24) (x=260, y=620, w=585, h=150)
  //     - Cloud Data Fusion / SLT Replication Workers (CDC Receiver) -> feeds BigQuery!
  //     - Cloud Router & Dedicated Interconnect / HA VPN Gateway (BGP ASN 64512)
  //
  // Tier 3: SAP BTP Platform (Cloud Foundry / Kyma: cf-us10) (x=1090, y=95, w=350, h=470)
  //   - SAP Joule / Generative AI Hub (Foundation Model Gateway & Context Engine)
  //   - SAP Integration Suite (API Management - Token Translator & mTLS Ingress)
  //   - SAP MCP Gateway (Kyma K8s Runtime - Open Tool Registry)
  //   - SAP Datasphere (Business Data Cloud - FedSQL & Semantic Fabric)
  //   - SAP Event Mesh / BTP Core Connectivity (clean replacement for dead steampunk box)
  //
  // Tier 4: SAP SaaS Suite (Public Endpoints) (x=1475, y=95, w=350, h=470)
  //   - SAP SuccessFactors (HR Agent Skills / OData v4)
  //   - SAP Ariba / Business Network (Procurement Agent Skills / cXML)
  //   - SAP S/4HANA Cloud (Public Edition / Clean Core APIs)
  //   - SAP Concur & Commerce Cloud (Expense & OCC APIs)
  //   - SAP Analytics Cloud (SAC) (Executive Dashboards)
  //
  // Tier 5: SAP RISE / On-Premise Core Data Center (172.16.0.0/16) (x=1090, y=600, w=735, h=335)
  //   - SAP Cloud Connector HA Cluster (Outbound mTLS Tunnel + Principal Propagation SAML/X.509)
  //   - SAP NetWeaver AS ABAP 7.58+ (ICM :44300, RFC :3300, ABAP SDK for Google Cloud /GOOG/)
  //   - SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB :30015, Multi-AZ HSR)

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T14:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="production_technical_sap_agents" name="Technical &amp; Network Infrastructure Architecture (Production-Grade)">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1880" pageHeight="980" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Title & Subtitle -->
        <mxCell id="title" value="Technical &amp; Infrastructure Architecture: SAP Multi-Agent Ecosystem on Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=24;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="20" width="1300" height="32" as="geometry" />
        </mxCell>
        <mxCell id="subtitle" value="Production Deployment Topology: VPC Subnetting (10.128.0.0/16), Direct VPC Egress, Private Service Connect (PSC), Internal RAG Grounding, Cloud Connector HA Tunnel, &amp; On-Prem AS ABAP (/GOOG/ SDK)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="30" y="50" width="1500" height="20" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 1: CLIENT INGRESS & ZERO TRUST EDGE ==================== -->
        <mxCell id="zone_ingress" value="Client Ingress &amp; Zero-Trust Edge" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=top;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="95" width="180" height="840" as="geometry" />
        </mxCell>

        <!-- End User Persona -->
        <mxCell id="box_user_client" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="42" y="130" width="156" height="145" as="geometry" />
        </mxCell>
        <mxCell id="u_icon" value="👤" style="shape=ellipse;fillColor=#2563EB;strokeColor=none;fontColor=#FFFFFF;fontSize=22;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="96" y="140" width="48" height="48" as="geometry" />
        </mxCell>
        <mxCell id="u_lbl" value="Enterprise Client Apps&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #64748B;&quot;&gt;Web SPA / Workspace / Fiori&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="46" y="192" width="148" height="30" as="geometry" />
        </mxCell>
        <mxCell id="u_auth_pill" value="OAuth 2.0 / OIDC / WIF" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="232" width="140" height="22" as="geometry" />
        </mxCell>

        <!-- Cloud Armor & External HTTPS Load Balancer -->
        <mxCell id="box_cloud_armor" value="Cloud Armor (DDoS / WAF)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;OWASP Top 10 + Rate Limiting&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="305" width="156" height="55" as="geometry" />
        </mxCell>

        <mxCell id="box_gclb" value="Global External HTTPS LB&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;Anycast IP :443 / TLS 1.3&lt;br&gt;Identity-Aware Proxy (IAP)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="385" width="156" height="70" as="geometry" />
        </mxCell>

        <!-- Security & IAM Infrastructure -->
        <mxCell id="box_security_iam" value="Cloud IAM &amp; Secret Manager&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Workload Identity Pool&lt;br&gt;• Cloud KMS (mTLS Keys)&lt;br&gt;• SAP BTP Token Secrets&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="480" width="156" height="80" as="geometry" />
        </mxCell>

        <!-- Observability & Telemetry Stack (New) -->
        <mxCell id="box_observability" value="Cloud Operations Suite&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Logging &amp; Audit Logs&lt;br&gt;• Cloud Trace (OTel Spans)&lt;br&gt;• LLM Token &amp; Latency Metrics&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="585" width="156" height="80" as="geometry" />
        </mxCell>

        <!-- Zero Trust & Model Guardrails -->
        <mxCell id="box_zero_trust_policy" value="Model Armor &amp; Guardrails&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Prompt Injection Defense&lt;br&gt;• Sensitive Data / DLP Filter&lt;br&gt;• Continuous Session Audit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="690" width="156" height="80" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 2: GOOGLE CLOUD REGION (VPC: 10.128.0.0/16) ==================== -->
        <mxCell id="vpc_gcp" value="Google Cloud VPC — Region: us-central1 (10.128.0.0/16 | VPC-SC Security Perimeter)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="245" y="95" width="620" height="840" as="geometry" />
        </mxCell>

        <!-- Subnet 1: AI Agent & Reasoning Runtime Subnet -->
        <mxCell id="subnet_agents" value="Subnet: ai-agent-runtime (10.128.10.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=12;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="260" y="130" width="280" height="470" as="geometry" />
        </mxCell>

        <!-- Pro-Code Vertex AI Reasoning Engine / Cloud Run -->
        <mxCell id="node_reasoning_engine" value="Vertex AI Reasoning Engine&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Run / GKE Autopilot (Container)&lt;br&gt;• Python ADK / LangGraph Engine&lt;br&gt;• Gemini 1.5 Pro (002) Instance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="275" y="165" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- No-Code Agent Builder Managed Service -->
        <mxCell id="node_agent_builder" value="Vertex AI Agent Builder&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Gemini 1.5 Flash (Managed)&lt;br&gt;• Multimodal Intent Routing&lt;br&gt;• Enterprise Session Store&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="275" y="260" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- Agentic Connectors Sub-Group -->
        <mxCell id="node_mcp_host" value="BYO MCP Server Gateway (Cloud Run)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• JSON-RPC 2.0 over SSE / Stdio&lt;br&gt;• Tool Schema Reflection &amp; Execution&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="275" y="355" width="250" height="60" as="geometry" />
        </mxCell>

        <mxCell id="node_s4_adapter" value="S/4HANA OData Client Adapter&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CSRF Token Management &amp; Replay Guard&lt;br&gt;• OData v2/v4 Batch Invocation&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="275" y="430" width="250" height="60" as="geometry" />
        </mxCell>

        <!-- Modern Direct VPC Egress -->
        <mxCell id="node_vpc_connector" value="Direct VPC Egress Interface&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;High-Throughput Private VPC Networking&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="275" y="505" width="250" height="45" as="geometry" />
        </mxCell>

        <!-- Subnet 2: Enterprise Data & Analytics Subnet -->
        <mxCell id="subnet_data" value="Subnet: data-lakehouse &amp; RAG (10.128.20.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=12;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="565" y="130" width="280" height="470" as="geometry" />
        </mxCell>

        <!-- Cortex Framework / Dataform Engine -->
        <mxCell id="node_cortex" value="Cortex Framework Engine&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Pre-packaged SAP Operational Models&lt;br&gt;• Dataform SQL Pipelines / Workflows&lt;br&gt;• Materialized Analytical Views&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="580" y="165" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- BigQuery & ScaNN Vector Search -->
        <mxCell id="node_bigquery" value="BigQuery Enterprise &amp; ScaNN&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• BigLake Managed Tables (Parquet)&lt;br&gt;• ScaNN Vector Embeddings Index&lt;br&gt;• BigQuery Storage Read API (gRPC :443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="580" y="260" width="250" height="85" as="geometry" />
        </mxCell>

        <!-- Vertex Vector Search PSC Endpoint -->
        <mxCell id="node_vector_psc" value="Vertex Vector Search (PSC Endpoint)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Private Service Connect :10000 IP (10.128.20.50)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="580" y="365" width="250" height="50" as="geometry" />
        </mxCell>

        <mxCell id="node_pubsub_staging" value="Cloud Pub/Sub &amp; Cloud Storage (GCS)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Ingestion Staging for SAP /GOOG/ SDK&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="580" y="435" width="250" height="50" as="geometry" />
        </mxCell>

        <!-- Subnet 3: Hybrid Ingestion & Integration Subnet -->
        <mxCell id="subnet_ingest" value="Subnet: data-ingestion-hybrid (10.128.30.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=12;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="260" y="620" width="585" height="150" as="geometry" />
        </mxCell>

        <!-- Cloud Data Fusion & SLT Ingestion Workers -->
        <mxCell id="node_data_fusion" value="Cloud Data Fusion / SLT Replication Workers&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CDAP Native Pipelines / Private IP Peering (:443)&lt;br&gt;• SAP SLT Real-time Change Data Capture (CDC) Receiver&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="275" y="655" width="555" height="55" as="geometry" />
        </mxCell>

        <!-- Cloud Interconnect / HA VPN Gateway sitting at border -->
        <mxCell id="node_cloud_interconnect" value="Cloud Router &amp; Dedicated Interconnect / HA VPN Gateway (BGP ASN: 64512 / 10.250.0.0/30)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="275" y="722" width="555" height="32" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 3: SAP BTP SUB-ACCOUNT (REGION: cf-us10) ==================== -->
        <mxCell id="zone_sap_btp" value="SAP BTP Platform (Cloud Foundry / Kyma Runtime: cf-us10)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=14;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1090" y="95" width="350" height="470" as="geometry" />
        </mxCell>

        <!-- SAP Joule AI Runtime -->
        <mxCell id="node_sap_joule" value="SAP Joule / Generative AI Hub&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Foundation Model Gateway&lt;br&gt;• Joule Business Context Engine&lt;br&gt;• A2A Token Exchange Endpoint&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1105" y="135" width="320" height="75" as="geometry" />
        </mxCell>

        <!-- SAP Integration Suite / API Mgmt -->
        <mxCell id="node_sap_apimgmt" value="SAP Integration Suite (API Management)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• OAuth 2.0 / SAML Assertion Token Translator&lt;br&gt;• Cloud Connector mTLS Ingress Tunnel (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1105" y="230" width="320" height="68" as="geometry" />
        </mxCell>

        <!-- SAP MCP Gateway on Kyma -->
        <mxCell id="node_sap_mcpgw" value="SAP MCP Gateway (Kyma K8s Runtime)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol (MCP) Server Container&lt;br&gt;• BTP Open Tool Registry &amp; JSON-RPC Dispatcher&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1105" y="318" width="320" height="65" as="geometry" />
        </mxCell>

        <!-- SAP Datasphere / Business Data Cloud -->
        <mxCell id="node_sap_datasphere" value="SAP Datasphere (Business Data Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• FedSQL Zero-Copy Federation with BigQuery&lt;br&gt;• Delta Sharing Protocol / Semantic Data Fabric&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1105" y="402" width="320" height="65" as="geometry" />
        </mxCell>

        <!-- SAP Event Mesh / BTP Connectivity (Clean, Active Node) -->
        <mxCell id="node_btp_eventmesh" value="SAP Event Mesh / BTP Connectivity&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Event-Driven Architecture &amp; Webhook Router (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1105" y="485" width="320" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 4: SAP SAAS APPS (TOP RIGHT) ==================== -->
        <mxCell id="zone_sap_saas" value="SAP SaaS Suite (Public Endpoints)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1480" y="95" width="340" height="470" as="geometry" />
        </mxCell>

        <mxCell id="saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;HR Agent Tools / OData v4 REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1495" y="135" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Expense Agent Tools / REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1495" y="200" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_cx" value="SAP Customer Experience (Commerce Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Customer Service Agent / OCC REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1495" y="265" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_biznet" value="SAP Ariba / Business Network&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Procurement Agent / cXML &amp; Supplier Gateway&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1495" y="330" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_s4pub" value="S/4HANA Cloud (Public Edition)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Clean Core OData v4 / GraphQL APIs (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1495" y="395" width="310" height="52" as="geometry" />
        </mxCell>
        <mxCell id="saas_analytics" value="SAP Analytics Cloud (SAC)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Executive Dashboarding &amp; Enterprise Planning (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1495" y="460" width="310" height="45" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 5: SAP RISE / ON-PREMISE CORE (BOTTOM RIGHT) ==================== -->
        <mxCell id="zone_sap_onprem" value="SAP RISE / Any-Cloud / On-Premise Core Data Center (172.16.0.0/16)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=18;spacingTop=12;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1090" y="600" width="730" height="335" as="geometry" />
        </mxCell>

        <!-- SAP Cloud Connector HA Pair with Principal Propagation -->
        <mxCell id="node_scc_ha" value="SAP Cloud Connector (SCC High Availability Cluster)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Outbound-only TLS Reverse Tunnel to BTP (:443) / No open inbound ports&lt;br&gt;• Principal Propagation Engine: SAML 2.0 / X.509 Short-Lived Certificate Generator&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1105" y="635" width="700" height="55" as="geometry" />
        </mxCell>

        <!-- NetWeaver AS ABAP with ABAP SDK Inside -->
        <mxCell id="node_as_abap" value="SAP NetWeaver AS ABAP 7.58+ (S/4HANA 2023 / ECC 6.0 EHP8)&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Internet Communication Manager (ICM) — HTTPS OData Port :44300&lt;br&gt;• ABAP Gateway Dispatcher / RFC &amp; BAPI Gateway Port :3300 (SNC Encryption)&lt;br&gt;• &lt;b style=&quot;color: #FEF08A;&quot;&gt;ABAP SDK for Google Cloud (/GOOG/ Package)&lt;/b&gt;: Direct Outbound HTTPS to Vertex &amp; BigQuery&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="1105" y="710" width="700" height="90" as="geometry" />
        </mxCell>

        <!-- SAP HANA In-Memory Database -->
        <mxCell id="node_sap_hana" value="SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB Port :30015 | Multi-AZ High Availability System Replication)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1105" y="820" width="700" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== FLOW CONNECTORS & OPEN CHANNEL HIGHWAYS (ZERO SLICING) ==================== -->

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
              <mxPoint x="230" y="420" />
              <mxPoint x="230" y="202" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_gclb_to_nocode" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="box_gclb" target="node_agent_builder">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="230" y="420" />
              <mxPoint x="230" y="297" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- INTERNAL RAG & GROUNDING BUS (Subnet 1 -> Subnet 2: Vector Search & BigQuery) -->
        <mxCell id="e_agent_to_rag" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;dashed=1;dashPattern=3 3;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_vector_psc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="552" y="202" />
              <mxPoint x="552" y="390" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- RAG Grounding Badge -->
        <mxCell id="badge_rag_grounding" value="Internal RAG / gRPC Search" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.2;fontFamily=Roboto Mono, monospace;fontSize=7.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="330" width="145" height="20" as="geometry" />
        </mxCell>

        <!-- INTERNAL INGESTION PIPELINE (Subnet 3 SLT/Fusion & PubSub -> BigQuery BigLake) -->
        <mxCell id="e_fusion_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0.5;entryY=1;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_data_fusion" target="node_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="705" y="655" />
              <mxPoint x="705" y="345" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- HIGHWAY 1: Reasoning Engine -> SAP Joule (A2A Protocol) OVER TOP CHANNEL (Zero Slicing) -->
        <mxCell id="e_pro_to_joule" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_joule">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="400" y="112" />
              <mxPoint x="980" y="112" />
              <mxPoint x="980" y="172" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- A2A Badge -->
        <mxCell id="badge_a2a" value="A2A: JSON-RPC over mTLS / OIDC" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="880" y="160" width="185" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 2: Reasoning Engine -> SAP Integration Suite via Inter-Card Gap (y=248) -->
        <mxCell id="e_pro_to_apimgmt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_apimgmt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="552" y="215" />
              <mxPoint x="552" y="250" />
              <mxPoint x="880" y="250" />
              <mxPoint x="880" y="264" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- REST Badge -->
        <mxCell id="badge_rest_btp" value="HTTPS :443 / OAuth2 Bearer" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="885" y="252" width="175" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 3: BYO MCP -> SAP MCP Gateway via Gap (y=425) (Zero Slicing) -->
        <mxCell id="e_mcp_to_gw" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_mcp_host" target="node_sap_mcpgw">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="552" y="385" />
              <mxPoint x="552" y="425" />
              <mxPoint x="880" y="425" />
              <mxPoint x="880" y="350" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- MCP Badge -->
        <mxCell id="badge_mcp" value="MCP v1.0: JSON-RPC over SSE" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="885" y="338" width="175" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 4: BigQuery <-> SAP Datasphere Zero Copy (Direct Horizontal) -->
        <mxCell id="e_bq_to_datasphere" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_bigquery" target="node_sap_datasphere">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="840" y="302" />
              <mxPoint x="980" y="302" />
              <mxPoint x="980" y="434" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Zero Copy Badge -->
        <mxCell id="badge_zerocopy" value="Zero-Copy: FedSQL / Delta Sharing" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#047857;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="875" y="422" width="195" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 5: Outbound ABAP SDK Call to Pub/Sub & GCS via clean channel -->
        <mxCell id="e_abap_to_gcp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;dashed=1;dashPattern=5 3;entryX=1;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_as_abap" target="node_pubsub_staging">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="955" y="755" />
              <mxPoint x="955" y="460" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- ABAP SDK Outbound Badge -->
        <mxCell id="badge_abap_sdk_call" value="Outbound HTTPS :443 (/GOOG/ SDK via PSC/Interconnect)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7DD3FC;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#0369A1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="850" y="605" width="225" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 6: Dedicated Interconnect Line (Straight Horizontal) -->
        <mxCell id="e_interconnect_line" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_cloud_interconnect" target="node_as_abap">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="935" y="738" />
              <mxPoint x="935" y="755" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="badge_ingest_rfc" value="Dedicated Interconnect (Private IP :44300 / :3300)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDBA74;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#C2410C;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="860" y="726" width="210" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 7: SAP BTP API Mgmt to Cloud Connector (Offset from Header Text) -->
        <mxCell id="e_btp_to_scc" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0.9;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_sap_apimgmt" target="node_scc_ha">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1455" y="264" />
              <mxPoint x="1455" y="585" />
              <mxPoint x="1735" y="585" />
              <mxPoint x="1735" y="635" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- SCC Reverse Tunnel Badge -->
        <mxCell id="badge_scc_tunnel" value="mTLS Reverse Tunnel (:443)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;fontFamily=Roboto Mono, monospace;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1375" y="573" width="150" height="22" as="geometry" />
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
  const xml = generateProductionTechnicalXml();
  const outXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  fs.writeFileSync(outXmlPath, xml, 'utf8');
  console.log(`Successfully generated production technical diagram XML at: ${outXmlPath}`);
}

run();
