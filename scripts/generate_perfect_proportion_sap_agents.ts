import * as fs from 'fs';
import * as path from 'path';

function generatePerfectProportionXml(): string {
  // Let's compute a mathematically balanced, beautifully proportioned layout:
  //
  // Master Dimensions: 1820 x 890 (16:9 widescreen canvas, zero bottom voids)
  //
  // Top Title: y=20, h=32
  // Subtitle: y=50, h=20
  //
  // Top Y for all Tiers: y=85
  // Bottom Y for all Tiers: y=865 (Total Tier Height: 780px)
  //
  // COLUMN GRID (Balanced pitch with proportional gaps):
  // Tier 1: Client Ingress & Zero-Trust Edge
  //   x=30, y=85, w=180, h=780
  //   Gap 1-2: 30px -> Tier 2 starts at x=240
  //
  // Tier 2: Google Cloud VPC (10.128.0.0/16)
  //   x=240, y=85, w=600, h=780
  //   Internal Subnets:
  //     Subnet 1 (AI Agent Runtime): x=255, y=120, w=270, h=430
  //       - Reasoning Engine: y=150, h=72 (x=268, w=244)
  //       - Agent Builder: y=235, h=72
  //       - BYO MCP Server: y=320, h=55
  //       - S/4 OData Adapter: y=388, h=55
  //       - Direct VPC Egress: y=455, h=40
  //       (Total cards fill y=150 to y=495 nicely in 430px box from y=120 to y=550)
  //
  //     Subnet 2 (Data Lakehouse & RAG): x=540, y=120, w=285, h=430
  //       - Cortex Framework Engine: y=150, h=72 (x=553, w=258)
  //       - BigQuery Enterprise & ScaNN: y=235, h=80
  //       - Vertex Vector Search (PSC): y=330, h=55
  //       - Cloud Pub/Sub & GCS Ingestion: y=400, h=55
  //       - RAG & Grounding Interface: y=468, h=40
  //       (Total cards fill y=150 to y=508 in 430px box from y=120 to y=550)
  //
  //     Subnet 3 (Hybrid Ingestion & Interconnect): x=255, y=565, w=570, h=215
  //       - Data Fusion / SLT Replication Workers: y=600, h=65 (x=268, w=544)
  //       - Cloud Storage Lakehouse Staging: y=678, h=42 (x=268, w=544)
  //       - Cloud Router & Dedicated Interconnect (BGP ASN 64512): y=732, h=36 (x=268, w=544)
  //       (Fills y=600 to y=768 in box ending at y=780, with VPC ending at y=865)
  //
  // Gap 2-3: 160px open highway channel (x=840 to x=1000)
  //
  // Tier 3: SAP BTP Platform (Region: cf-us10)
  //   x=1000, y=85, w=385, h=430
  //   - SAP Joule AI / Context Engine: y=125, h=68 (x=1015, w=355)
  //   - SAP Integration Suite (API Mgmt): y=205, h=65 (x=1015, w=355)
  //   - SAP MCP Gateway (Kyma K8s): y=282, h=62 (x=1015, w=355)
  //   - SAP Datasphere (FedSQL): y=356, h=62 (x=1015, w=355)
  //   - SAP Event Mesh & Connectivity: y=430, h=45 (x=1015, w=355)
  //
  // Gap 3-4: 35px -> Tier 4 starts at x=1420
  //
  // Tier 4: SAP SaaS Suite (Public Endpoints)
  //   x=1420, y=85, w=370, h=430
  //   - SuccessFactors (HR Tools): y=125, h=52 (x=1435, w=340)
  //   - Concur (Expense Tools): y=188, h=52
  //   - Customer Experience / Commerce: y=251, h=52
  //   - Ariba / Business Network: y=314, h=52
  //   - S/4HANA Cloud (Public Clean Core): y=377, h=52
  //   - SAP Analytics Cloud (SAC): y=440, h=42
  //
  // Tier 5: SAP RISE / On-Premise Core Data Center (172.16.0.0/16)
  //   x=1000, y=530, w=790, h=335 (ends at y=865, matching Tier 1 & Tier 2 bottom exactly!)
  //   - SAP Cloud Connector HA Cluster (mTLS Tunnel + SAML/X.509 Principal Propagation): y=565, h=65 (x=1015, w=760)
  //   - SAP NetWeaver AS ABAP 7.58+ (ICM :44300, RFC :3300, /GOOG/ SDK): y=645, h=95 (x=1015, w=760)
  //   - SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB :30015, Multi-AZ HSR): y=755, h=50 (x=1015, w=760)
  //
  // ZERO-SLICING & PROPORTIONAL ROUTING:
  // 1. Data Fusion -> BigQuery: Route along right-side of Subnet 1 / left margin of Subnet 2 in open vertical channel (x=532), enter BigQuery from left. ZERO collision with ScaNN or PubSub!
  // 2. Reasoning Engine -> Vector Search (RAG): Clean horizontal jog with badge.
  // 3. Subnet 1 -> BTP Highways: Route cleanly through horizontal corridors.
  // 4. BTP -> SCC Reverse Tunnel: Drops cleanly at x=1405 into SCC right side, avoiding all header text.

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T14:15:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="perfect_technical_sap_agents" name="Technical &amp; Network Infrastructure Architecture">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1820" pageHeight="890" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Title & Subtitle -->
        <mxCell id="title" value="Technical &amp; Infrastructure Architecture: SAP Multi-Agent Ecosystem on Google Cloud" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=23;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1300" height="30" as="geometry" />
        </mxCell>
        <mxCell id="subtitle" value="Production Deployment Topology: VPC Subnetting (10.128.0.0/16), Direct VPC Egress, Private Service Connect (PSC), Internal RAG Grounding, Cloud Connector HA Tunnel, &amp; On-Prem AS ABAP (/GOOG/ SDK)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=0;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="30" y="46" width="1500" height="20" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 1: CLIENT INGRESS & ZERO TRUST EDGE ==================== -->
        <mxCell id="zone_ingress" value="Client Ingress &amp; Zero-Trust Edge" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=top;spacingTop=8;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="180" height="780" as="geometry" />
        </mxCell>

        <!-- End User Persona -->
        <mxCell id="box_user_client" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="42" y="120" width="156" height="135" as="geometry" />
        </mxCell>
        <mxCell id="u_icon" value="👤" style="shape=ellipse;fillColor=#2563EB;strokeColor=none;fontColor=#FFFFFF;fontSize=20;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="98" y="130" width="44" height="44" as="geometry" />
        </mxCell>
        <mxCell id="u_lbl" value="Enterprise Client Apps&lt;br&gt;&lt;span style=&quot;font-size: 8.5px; font-weight: normal; color: #64748B;&quot;&gt;Web SPA / Workspace / Fiori&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="46" y="178" width="148" height="28" as="geometry" />
        </mxCell>
        <mxCell id="u_auth_pill" value="OAuth 2.0 / OIDC / WIF" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="215" width="140" height="22" as="geometry" />
        </mxCell>

        <!-- Cloud Armor & External HTTPS Load Balancer -->
        <mxCell id="box_cloud_armor" value="Cloud Armor (DDoS / WAF)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;OWASP Top 10 + Rate Limiting&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="275" width="156" height="55" as="geometry" />
        </mxCell>

        <mxCell id="box_gclb" value="Global External HTTPS LB&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;Anycast IP :443 / TLS 1.3&lt;br&gt;Identity-Aware Proxy (IAP)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="350" width="156" height="70" as="geometry" />
        </mxCell>

        <!-- Security & IAM Infrastructure -->
        <mxCell id="box_security_iam" value="Cloud IAM &amp; Secret Manager&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Workload Identity Pool&lt;br&gt;• Cloud KMS (mTLS Keys)&lt;br&gt;• SAP BTP Token Secrets&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="440" width="156" height="78" as="geometry" />
        </mxCell>

        <!-- Observability & Telemetry Stack -->
        <mxCell id="box_observability" value="Cloud Operations Suite&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Logging &amp; Audit Logs&lt;br&gt;• Cloud Trace (OTel Spans)&lt;br&gt;• LLM Token &amp; Latency Metrics&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="538" width="156" height="78" as="geometry" />
        </mxCell>

        <!-- Zero Trust & Model Guardrails -->
        <mxCell id="box_zero_trust_policy" value="Model Armor &amp; Guardrails&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Prompt Injection Defense&lt;br&gt;• Sensitive Data / DLP Filter&lt;br&gt;• Continuous Session Audit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="636" width="156" height="78" as="geometry" />
        </mxCell>

        <!-- Network Firewall Policy -->
        <mxCell id="box_firewall" value="Hierarchical Firewall Policies&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Egress Lockdown (Port :443 only)&lt;br&gt;• Strict VPC Service Controls&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="734" width="156" height="58" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 2: GOOGLE CLOUD REGION (VPC: 10.128.0.0/16) ==================== -->
        <mxCell id="vpc_gcp" value="Google Cloud VPC — Region: us-central1 (10.128.0.0/16 | VPC-SC Security Perimeter)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="240" y="85" width="600" height="780" as="geometry" />
        </mxCell>

        <!-- Subnet 1: AI Agent & Reasoning Runtime Subnet -->
        <mxCell id="subnet_agents" value="Subnet: ai-agent-runtime (10.128.10.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="255" y="118" width="270" height="430" as="geometry" />
        </mxCell>

        <mxCell id="node_reasoning_engine" value="Vertex AI Reasoning Engine&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Run / GKE Autopilot (Container)&lt;br&gt;• Python ADK / LangGraph Engine&lt;br&gt;• Gemini 1.5 Pro (002) Instance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="268" y="148" width="244" height="72" as="geometry" />
        </mxCell>

        <mxCell id="node_agent_builder" value="Vertex AI Agent Builder&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Gemini 1.5 Flash (Managed)&lt;br&gt;• Multimodal Intent Routing&lt;br&gt;• Enterprise Session Store&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="268" y="232" width="244" height="72" as="geometry" />
        </mxCell>

        <mxCell id="node_mcp_host" value="BYO MCP Server Gateway (Cloud Run)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• JSON-RPC 2.0 over SSE / Stdio&lt;br&gt;• Tool Schema Reflection &amp; Execution&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="268" y="316" width="244" height="55" as="geometry" />
        </mxCell>

        <mxCell id="node_s4_adapter" value="S/4HANA OData Client Adapter&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CSRF Token Management &amp; Replay Guard&lt;br&gt;• OData v2/v4 Batch Invocation&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="268" y="383" width="244" height="55" as="geometry" />
        </mxCell>

        <mxCell id="node_vpc_connector" value="Direct VPC Egress Interface&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;High-Throughput Private VPC Networking&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="450" width="244" height="40" as="geometry" />
        </mxCell>

        <!-- Subnet 2: Enterprise Data & Analytics Subnet (Expanded & Proportional) -->
        <mxCell id="subnet_data" value="Subnet: data-lakehouse &amp; RAG (10.128.20.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="540" y="118" width="285" height="430" as="geometry" />
        </mxCell>

        <mxCell id="node_cortex" value="Cortex Framework Engine&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Pre-packaged SAP Operational Models&lt;br&gt;• Dataform SQL Pipelines / Workflows&lt;br&gt;• Materialized Analytical Views&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="553" y="148" width="258" height="72" as="geometry" />
        </mxCell>

        <mxCell id="node_bigquery" value="BigQuery Enterprise &amp; ScaNN&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• BigLake Managed Tables (Parquet)&lt;br&gt;• ScaNN Vector Embeddings Index&lt;br&gt;• BigQuery Storage Read API (gRPC :443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="553" y="232" width="258" height="78" as="geometry" />
        </mxCell>

        <mxCell id="node_vector_psc" value="Vertex Vector Search (PSC Endpoint)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Private Service Connect :10000 IP (10.128.20.50)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="553" y="322" width="258" height="52" as="geometry" />
        </mxCell>

        <mxCell id="node_pubsub_staging" value="Cloud Pub/Sub &amp; GCS Ingestion Bus&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Real-time Ingestion Staging for SAP /GOOG/ SDK&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="553" y="386" width="258" height="52" as="geometry" />
        </mxCell>

        <mxCell id="node_lakehouse_catalog" value="Dataplex Universal Catalog &amp; Lineage&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Automated Metadata &amp; Data Governance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="553" y="450" width="258" height="40" as="geometry" />
        </mxCell>

        <!-- Subnet 3: Hybrid Ingestion & Integration Subnet (Fills Bottom Perfectly) -->
        <mxCell id="subnet_ingest" value="Subnet: data-ingestion-hybrid (10.128.30.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="255" y="565" width="570" height="280" as="geometry" />
        </mxCell>

        <mxCell id="node_data_fusion" value="Cloud Data Fusion / SLT Replication Workers&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CDAP Native Pipelines / Private IP Peering (:443)&lt;br&gt;• SAP SLT Real-time Change Data Capture (CDC) Receiver&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="268" y="595" width="544" height="60" as="geometry" />
        </mxCell>

        <mxCell id="node_gcs_lakehouse" value="Cloud Storage (GCS) BigLake Staging Bucket (Multi-Region / Dual-Region)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Raw Delta Parquet Staging &amp; Micro-batch Streaming Buffer&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="670" width="544" height="48" as="geometry" />
        </mxCell>

        <mxCell id="node_cloud_interconnect" value="Cloud Router &amp; Dedicated Interconnect / HA VPN Gateway (BGP ASN: 64512 / 10.250.0.0/30)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="732" width="544" height="38" as="geometry" />
        </mxCell>

        <!-- Zero Egress Bandwidth Policy Box -->
        <mxCell id="node_egress_policy" value="Private Google Access &amp; VPC Service Controls (VPC-SC) Perimeter Enforced" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="784" width="544" height="32" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 3: SAP BTP SUB-ACCOUNT (REGION: cf-us10) ==================== -->
        <mxCell id="zone_sap_btp" value="SAP BTP Platform (Cloud Foundry / Kyma Runtime: cf-us10)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=14;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="385" height="430" as="geometry" />
        </mxCell>

        <mxCell id="node_sap_joule" value="SAP Joule / Generative AI Hub&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Foundation Model Gateway&lt;br&gt;• Joule Business Context Engine&lt;br&gt;• A2A Token Exchange Endpoint&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="122" width="355" height="68" as="geometry" />
        </mxCell>

        <mxCell id="node_sap_apimgmt" value="SAP Integration Suite (API Management)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• OAuth 2.0 / SAML Assertion Token Translator&lt;br&gt;• Cloud Connector mTLS Ingress Tunnel (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="202" width="355" height="64" as="geometry" />
        </mxCell>

        <mxCell id="node_sap_mcpgw" value="SAP MCP Gateway (Kyma K8s Runtime)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol (MCP) Server Container&lt;br&gt;• BTP Open Tool Registry &amp; JSON-RPC Dispatcher&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="278" width="355" height="62" as="geometry" />
        </mxCell>

        <mxCell id="node_sap_datasphere" value="SAP Datasphere (Business Data Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• FedSQL Zero-Copy Federation with BigQuery&lt;br&gt;• Delta Sharing Protocol / Semantic Data Fabric&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="352" width="355" height="62" as="geometry" />
        </mxCell>

        <mxCell id="node_btp_eventmesh" value="SAP Event Mesh / BTP Connectivity Hub&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Event-Driven Architecture &amp; Webhook Router (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="426" width="355" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 4: SAP SAAS APPS (TOP RIGHT) ==================== -->
        <mxCell id="zone_sap_saas" value="SAP SaaS Suite (Public Endpoints)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1420" y="85" width="370" height="430" as="geometry" />
        </mxCell>

        <mxCell id="saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;HR Agent Tools / OData v4 REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="122" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Expense Agent Tools / REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="180" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_cx" value="SAP Customer Experience (Commerce Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Customer Service Agent / OCC REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="238" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_biznet" value="SAP Ariba / Business Network&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Procurement Agent / cXML &amp; Supplier Gateway&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="296" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_s4pub" value="S/4HANA Cloud (Public Edition)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Clean Core OData v4 / GraphQL APIs (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="354" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_analytics" value="SAP Analytics Cloud (SAC)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Executive Dashboarding &amp; Enterprise Planning (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="412" width="340" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 5: SAP RISE / ON-PREMISE CORE (BOTTOM RIGHT) ==================== -->
        <mxCell id="zone_sap_onprem" value="SAP RISE / Any-Cloud / On-Premise Core Data Center (172.16.0.0/16)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1000" y="530" width="790" height="335" as="geometry" />
        </mxCell>

        <!-- SAP Cloud Connector HA Pair with Principal Propagation -->
        <mxCell id="node_scc_ha" value="SAP Cloud Connector (SCC High Availability Cluster)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Outbound-only TLS Reverse Tunnel to BTP (:443) / No open inbound ports&lt;br&gt;• Principal Propagation Engine: SAML 2.0 / X.509 Short-Lived Certificate Generator&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="565" width="760" height="60" as="geometry" />
        </mxCell>

        <!-- NetWeaver AS ABAP with ABAP SDK Inside -->
        <mxCell id="node_as_abap" value="SAP NetWeaver AS ABAP 7.58+ (S/4HANA 2023 / ECC 6.0 EHP8)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Internet Communication Manager (ICM) — HTTPS OData Port :44300&lt;br&gt;• ABAP Gateway Dispatcher / RFC &amp; BAPI Gateway Port :3300 (SNC Encryption)&lt;br&gt;• &lt;b style=&quot;color: #FEF08A;&quot;&gt;ABAP SDK for Google Cloud (/GOOG/ Package)&lt;/b&gt;: Direct Outbound HTTPS to Vertex &amp; BigQuery&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="1015" y="640" width="760" height="92" as="geometry" />
        </mxCell>

        <!-- SAP HANA In-Memory Database -->
        <mxCell id="node_sap_hana" value="SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB Port :30015 | Multi-AZ High Availability System Replication)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="748" width="760" height="42" as="geometry" />
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
              <mxPoint x="228" y="385" />
              <mxPoint x="228" y="184" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_gclb_to_nocode" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="box_gclb" target="node_agent_builder">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="228" y="385" />
              <mxPoint x="228" y="268" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- INTERNAL RAG & GROUNDING BUS (Subnet 1 -> Subnet 2: Vector Search & BigQuery) -->
        <mxCell id="e_agent_to_rag" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;dashed=1;dashPattern=3 3;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_vector_psc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="532" y="184" />
              <mxPoint x="532" y="348" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- RAG Grounding Badge (Clean placement inside channel) -->
        <mxCell id="badge_rag_grounding" value="RAG / gRPC Search" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.2;fontFamily=Roboto Mono, monospace;fontSize=7.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="462" y="295" width="138" height="20" as="geometry" />
        </mxCell>

        <!-- INTERNAL INGESTION PIPELINE (Subnet 3 Data Fusion -> BigQuery via vertical open channel x=532) -->
        <mxCell id="e_fusion_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_data_fusion" target="node_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="532" y="625" />
              <mxPoint x="532" y="271" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- HIGHWAY 1: Reasoning Engine -> SAP Joule (A2A Protocol) OVER TOP CHANNEL (Zero Slicing) -->
        <mxCell id="e_pro_to_joule" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_joule">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="390" y="100" />
              <mxPoint x="920" y="100" />
              <mxPoint x="920" y="156" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- A2A Badge -->
        <mxCell id="badge_a2a" value="A2A: JSON-RPC over mTLS / OIDC" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="835" y="144" width="180" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 2: Reasoning Engine -> SAP Integration Suite via Inter-Card Gap (y=226) -->
        <mxCell id="e_pro_to_apimgmt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_apimgmt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="520" y="195" />
              <mxPoint x="520" y="226" />
              <mxPoint x="830" y="226" />
              <mxPoint x="830" y="234" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- REST Badge -->
        <mxCell id="badge_rest_btp" value="HTTPS :443 / OAuth2 Bearer" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="222" width="170" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 3: BYO MCP -> SAP MCP Gateway via Gap (y=378) (Zero Slicing) -->
        <mxCell id="e_mcp_to_gw" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_mcp_host" target="node_sap_mcpgw">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="520" y="343" />
              <mxPoint x="520" y="378" />
              <mxPoint x="830" y="378" />
              <mxPoint x="830" y="309" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- MCP Badge -->
        <mxCell id="badge_mcp" value="MCP v1.0: JSON-RPC over SSE" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="297" width="170" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 4: BigQuery <-> SAP Datasphere Zero Copy (Direct Horizontal) -->
        <mxCell id="e_bq_to_datasphere" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_bigquery" target="node_sap_datasphere">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="820" y="271" />
              <mxPoint x="930" y="271" />
              <mxPoint x="930" y="383" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Zero Copy Badge -->
        <mxCell id="badge_zerocopy" value="Zero-Copy: FedSQL / Delta Sharing" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#047857;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="371" width="190" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 5: Outbound ABAP SDK Call to Pub/Sub & GCS via clean channel -->
        <mxCell id="e_abap_to_gcp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;dashed=1;dashPattern=5 3;entryX=1;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_as_abap" target="node_pubsub_staging">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="910" y="686" />
              <mxPoint x="910" y="412" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- ABAP SDK Outbound Badge -->
        <mxCell id="badge_abap_sdk_call" value="Outbound HTTPS :443 (/GOOG/ SDK via PSC/Interconnect)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7DD3FC;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#0369A1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="815" y="550" width="220" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 6: Dedicated Interconnect Line (Straight Horizontal) -->
        <mxCell id="e_interconnect_line" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_cloud_interconnect" target="node_as_abap">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="895" y="751" />
              <mxPoint x="895" y="686" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="badge_ingest_rfc" value="Dedicated Interconnect (Private IP :44300 / :3300)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDBA74;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#C2410C;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="825" y="674" width="200" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 7: SAP BTP API Mgmt to Cloud Connector (Offset from Header Text) -->
        <mxCell id="e_btp_to_scc" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0.9;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_sap_apimgmt" target="node_scc_ha">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1405" y="234" />
              <mxPoint x="1405" y="520" />
              <mxPoint x="1700" y="520" />
              <mxPoint x="1700" y="565" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- SCC Reverse Tunnel Badge -->
        <mxCell id="badge_scc_tunnel" value="mTLS Reverse Tunnel (:443)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;fontFamily=Roboto Mono, monospace;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="508" width="145" height="22" as="geometry" />
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
  const xml = generatePerfectProportionXml();
  const outXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  fs.writeFileSync(outXmlPath, xml, 'utf8');
  console.log(`Successfully generated perfectly proportioned technical diagram XML at: ${outXmlPath}`);
}

run();
