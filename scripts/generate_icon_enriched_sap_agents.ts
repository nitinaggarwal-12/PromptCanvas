import * as fs from 'fs';
import * as path from 'path';
import { getGcpDataUri } from '../src/lib/gcpIcons';
import { getSapDataUri } from '../src/lib/sapIcons';

function generateIconEnrichedTechnicalXml(): string {
  const iconVertex = getGcpDataUri('vertex_ai');
  const iconGemini = getGcpDataUri('gemini');
  const iconAgentBuilder = getGcpDataUri('agent_builder');
  const iconCloudRun = getGcpDataUri('cloud_run');
  const iconBigQuery = getGcpDataUri('bigquery');
  const iconVectorSearch = getGcpDataUri('vertex_vector_search');
  const iconPubSub = getGcpDataUri('pubsub');
  const iconArmor = getGcpDataUri('cloud_armor');
  const iconGclb = getGcpDataUri('cloud_load_balancing');
  const iconIam = getGcpDataUri('cloud_iam');
  const iconOps = getGcpDataUri('cloud_monitoring');
  const iconArmorSec = getGcpDataUri('model_armor');
  const iconDataFusion = getGcpDataUri('dataflow');
  const iconGcs = getGcpDataUri('cloud_storage');
  const iconScc = getGcpDataUri('scc');
  
  const iconSapLogo = getSapDataUri('sap_logo');
  const iconJoule = getSapDataUri('sap_joule');
  const iconBtp = getSapDataUri('sap_btp');
  const iconApim = getSapDataUri('sap_integration_suite');
  const iconDatasphere = getSapDataUri('sap_datasphere');
  const iconSapScc = getSapDataUri('sap_cloud_connector');
  const iconS4 = getSapDataUri('sap_s4hana');
  const iconHana = getSapDataUri('sap_hana');
  const iconSf = getSapDataUri('sap_successfactors');
  const iconConcur = getSapDataUri('sap_concur');
  const iconAriba = getSapDataUri('sap_ariba');
  const iconSac = getSapDataUri('sap_sac');

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T15:45:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="icon_enriched_technical_sap_agents" name="Technical &amp; Network Infrastructure Architecture">
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
          <mxGeometry x="42" y="118" width="156" height="126" as="geometry" />
        </mxCell>
        <mxCell id="u_icon" value="👤" style="shape=ellipse;fillColor=#2563EB;strokeColor=none;fontColor=#FFFFFF;fontSize=18;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="100" y="126" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="u_lbl" value="Enterprise Client Apps&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B;&quot;&gt;Web SPA / Workspace / Fiori&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="46" y="168" width="148" height="26" as="geometry" />
        </mxCell>
        <mxCell id="u_auth_pill" value="OAuth 2.0 / OIDC / WIF" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=8;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="198" width="140" height="20" as="geometry" />
        </mxCell>

        <!-- Cloud Armor (with Icon) -->
        <mxCell id="box_cloud_armor" value="Cloud Armor (WAF)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;OWASP Top 10 + Rate Limit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;image=${iconArmor};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="254" width="156" height="52" as="geometry" />
        </mxCell>

        <!-- Global External HTTPS LB (with Icon) -->
        <mxCell id="box_gclb" value="External HTTPS LB&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;Anycast IP :443 / TLS 1.3&lt;br&gt;Identity-Aware Proxy (IAP)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconGclb};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="316" width="156" height="66" as="geometry" />
        </mxCell>

        <!-- Security & IAM (with Icon) -->
        <mxCell id="box_security_iam" value="IAM &amp; KMS Secrets&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Workload Identity Pool&lt;br&gt;• Cloud KMS (mTLS Keys)&lt;br&gt;• SAP BTP Token Secrets&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconIam};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="392" width="156" height="74" as="geometry" />
        </mxCell>

        <!-- Observability & Telemetry (with Icon) -->
        <mxCell id="box_observability" value="Cloud Operations&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Logging &amp; Audit Logs&lt;br&gt;• Cloud Trace (OTel Spans)&lt;br&gt;• Token &amp; Latency Metrics&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconOps};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="476" width="156" height="74" as="geometry" />
        </mxCell>

        <!-- Zero Trust & Model Guardrails (with Icon) -->
        <mxCell id="box_zero_trust_policy" value="Model Armor&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Prompt Injection Defense&lt;br&gt;• Sensitive Data / DLP Filter&lt;br&gt;• Continuous Session Audit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconArmorSec};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="560" width="156" height="74" as="geometry" />
        </mxCell>

        <!-- Network Firewall Policy -->
        <mxCell id="box_firewall" value="Hierarchical Firewalls&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Egress Port :443 Lock&lt;br&gt;• Strict VPC-SC Perimeter&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="644" width="156" height="54" as="geometry" />
        </mxCell>

        <!-- Certificate Manager & mTLS Keys -->
        <mxCell id="box_cert_manager" value="Certificate Manager&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Managed SSL/TLS Certs&lt;br&gt;• Cloud KMS mTLS Key Rings&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="42" y="708" width="156" height="54" as="geometry" />
        </mxCell>

        <!-- Security Command Center (with SCC Icon) -->
        <mxCell id="box_scc_edge" value="Security Command Center&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;Threat Detection &amp; Compliance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=38;verticalAlign=middle;image=${iconScc};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="772" width="156" height="52" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 2: GOOGLE CLOUD REGION (VPC: 10.128.0.0/16) ==================== -->
        <mxCell id="vpc_gcp" value="Google Cloud VPC — Region: us-central1 (10.128.0.0/16 | VPC-SC Security Perimeter)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="240" y="85" width="600" height="780" as="geometry" />
        </mxCell>

        <!-- Subnet 1: AI Agent & Reasoning Runtime Subnet -->
        <mxCell id="subnet_agents" value="Subnet: ai-agent-runtime (10.128.10.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="255" y="122" width="270" height="428" as="geometry" />
        </mxCell>

        <!-- Vertex AI Reasoning Engine (with Vertex Icon) -->
        <mxCell id="node_reasoning_engine" value="Vertex AI Reasoning Engine&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Run / GKE Autopilot (Container)&lt;br&gt;• Python ADK / LangGraph Engine&lt;br&gt;• Gemini 1.5 Pro (002) Instance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconVertex};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="150" width="244" height="70" as="geometry" />
        </mxCell>

        <!-- Vertex AI Agent Builder (with Agent Builder Icon) -->
        <mxCell id="node_agent_builder" value="Vertex AI Agent Builder&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Gemini 1.5 Flash (Managed)&lt;br&gt;• Multimodal Intent Routing&lt;br&gt;• Enterprise Session Store&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconAgentBuilder};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="232" width="244" height="70" as="geometry" />
        </mxCell>

        <!-- BYO MCP Server Gateway (with Cloud Run Icon) -->
        <mxCell id="node_mcp_host" value="BYO MCP Server (Cloud Run)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• JSON-RPC 2.0 over SSE / Stdio&lt;br&gt;• Tool Schema Reflection &amp; Execution&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=40;verticalAlign=middle;lineHeight=1.2;image=${iconCloudRun};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="314" width="244" height="54" as="geometry" />
        </mxCell>

        <!-- S/4HANA OData Client Adapter -->
        <mxCell id="node_s4_adapter" value="S/4HANA OData Client Adapter&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CSRF Token Management &amp; Replay Guard&lt;br&gt;• OData v2/v4 Batch Invocation&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="268" y="380" width="244" height="54" as="geometry" />
        </mxCell>

        <!-- Direct VPC Egress Interface -->
        <mxCell id="node_vpc_connector" value="Direct VPC Egress Interface&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;High-Throughput Private VPC Networking&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="446" width="244" height="40" as="geometry" />
        </mxCell>

        <!-- WIF Token Exchange Client -->
        <mxCell id="node_wif_client" value="Workload Identity Federation (WIF)&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Short-Lived OIDC Token Exchange Client&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="496" width="244" height="40" as="geometry" />
        </mxCell>

        <!-- Subnet 2: Enterprise Data & Analytics Subnet -->
        <mxCell id="subnet_data" value="Subnet: data-lakehouse &amp; RAG (10.128.20.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="540" y="122" width="285" height="428" as="geometry" />
        </mxCell>

        <!-- Cortex Framework Engine -->
        <mxCell id="node_cortex" value="Cortex Framework Engine&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Pre-packaged SAP Operational Models&lt;br&gt;• Dataform SQL Pipelines / Workflows&lt;br&gt;• Materialized Analytical Views&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="553" y="150" width="258" height="66" as="geometry" />
        </mxCell>

        <!-- BigQuery & ScaNN (with BigQuery Icon) -->
        <mxCell id="node_bigquery" value="BigQuery Lakehouse &amp; ScaNN&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• BigLake Managed Tables (Parquet)&lt;br&gt;• ScaNN Vector Embeddings Index&lt;br&gt;• BigQuery Storage Read API (gRPC :443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconBigQuery};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="553" y="230" width="258" height="74" as="geometry" />
        </mxCell>

        <!-- Vertex Vector Search PSC (with Vector Search Icon) -->
        <mxCell id="node_vector_psc" value="Vertex Vector Search (PSC)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Private Service Connect :10000 IP&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=40;verticalAlign=middle;image=${iconVectorSearch};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="553" y="320" width="258" height="50" as="geometry" />
        </mxCell>

        <!-- Cloud Pub/Sub & GCS (with Pub/Sub Icon) -->
        <mxCell id="node_pubsub_staging" value="Cloud Pub/Sub Ingestion Bus&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Real-time Ingestion for SAP /GOOG/ SDK&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=40;verticalAlign=middle;image=${iconPubSub};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="553" y="384" width="258" height="50" as="geometry" />
        </mxCell>

        <mxCell id="node_lakehouse_catalog" value="Dataplex Universal Catalog &amp; Lineage&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Automated Metadata &amp; Data Governance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="553" y="446" width="258" height="40" as="geometry" />
        </mxCell>

        <mxCell id="node_gemini_rag_grounding" value="Gemini Semantic RAG Grounding&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Fact Verification &amp; Attribution Engine&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="553" y="496" width="258" height="40" as="geometry" />
        </mxCell>

        <!-- Subnet 3: Hybrid Ingestion & Integration Subnet -->
        <mxCell id="subnet_ingest" value="Subnet: data-ingestion-hybrid (10.128.30.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="255" y="565" width="570" height="280" as="geometry" />
        </mxCell>

        <!-- Cloud Data Fusion / SLT (with Dataflow Icon) -->
        <mxCell id="node_data_fusion" value="Cloud Data Fusion / SLT Replication&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CDAP Native Pipelines / Private IP Peering (:443)&lt;br&gt;• SAP SLT Real-time Change Data Capture (CDC) Receiver&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.25;image=${iconDataFusion};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="595" width="544" height="56" as="geometry" />
        </mxCell>

        <!-- Cloud Storage Staging (with GCS Icon) -->
        <mxCell id="node_gcs_lakehouse" value="Cloud Storage (GCS) BigLake Staging Bucket (Multi-Region / Dual-Region)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Raw Delta Parquet Staging &amp; Micro-batch Streaming Buffer&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconGcs};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="660" width="544" height="46" as="geometry" />
        </mxCell>

        <!-- Dedicated Cloud Interconnect (with Cloud Load Balancing / Network Icon) -->
        <mxCell id="node_cloud_interconnect" value="Dedicated Cloud Interconnect &amp; Cloud Router (BGP ASN 64512 | 10 Gbps HA Redundant VLAN Attachments)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#EA580C;strokeColor=#C2410C;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconGclb};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="716" width="544" height="52" as="geometry" />
        </mxCell>

        <!-- SAP SLT Replication Server & CDC Pipeline -->
        <mxCell id="node_sap_slt_receiver" value="SAP SLT CDC Trigger Receiver &amp; Delta Pipeline (Real-Time Ingestion Buffer)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="778" width="544" height="52" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 3: SAP BTP PLATFORM (TOP RIGHT) ==================== -->
        <mxCell id="zone_sap_btp" value="SAP BTP Platform (Cloud Foundry / Kyma Runtime: cf-us10)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="385" height="430" as="geometry" />
        </mxCell>

        <!-- SAP Joule (with SAP Joule Spark Icon) -->
        <mxCell id="node_sap_joule" value="SAP Joule / Generative AI Hub&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Foundation Model Gateway&lt;br&gt;• Joule Business Context Engine&lt;br&gt;• A2A Token Exchange Endpoint&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconJoule};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="122" width="355" height="68" as="geometry" />
        </mxCell>

        <!-- SAP Integration Suite (with SAP APIM Icon) -->
        <mxCell id="node_sap_apimgmt" value="SAP Integration Suite (API Mgmt)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• OAuth 2.0 / SAML Assertion Token Translator&lt;br&gt;• Cloud Connector mTLS Ingress Tunnel (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconApim};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="200" width="355" height="64" as="geometry" />
        </mxCell>

        <!-- SAP MCP Gateway on Kyma -->
        <mxCell id="node_sap_mcpgw" value="SAP MCP Gateway (Kyma K8s Runtime)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol (MCP) Server Container&lt;br&gt;• BTP Open Tool Registry &amp; JSON-RPC Dispatcher&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;lineHeight=1.2;image=${iconBtp};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="274" width="355" height="62" as="geometry" />
        </mxCell>

        <!-- SAP Datasphere (with Datasphere Icon) -->
        <mxCell id="node_sap_datasphere" value="SAP Datasphere (Business Data Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• FedSQL Zero-Copy Federation with BigQuery&lt;br&gt;• Delta Sharing Protocol / Semantic Data Fabric&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconDatasphere};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="346" width="355" height="62" as="geometry" />
        </mxCell>

        <mxCell id="node_btp_eventmesh" value="SAP Event Mesh / BTP Connectivity Hub&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Event-Driven Architecture &amp; Webhook Router (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=left;spacingLeft=36;verticalAlign=middle;image=${iconBtp};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="418" width="355" height="42" as="geometry" />
        </mxCell>

        <mxCell id="node_btp_audit" value="SAP BTP Audit Log &amp; Security Services (SOC 2 Type II / ISO 27001)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="468" width="355" height="34" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 4: SAP SAAS APPS (TOP RIGHT) ==================== -->
        <mxCell id="zone_sap_saas" value="SAP SaaS Suite (Public Endpoints)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1420" y="85" width="370" height="430" as="geometry" />
        </mxCell>

        <mxCell id="saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;HR Agent Tools / OData v4 REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSf};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="120" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Expense Agent Tools / REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconConcur};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="176" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_cx" value="SAP Customer Experience (Commerce Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Customer Service Agent / OCC REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconBtp};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="232" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_biznet" value="SAP Ariba / Business Network&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Procurement Agent / cXML &amp; Supplier Gateway&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconAriba};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="288" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_s4pub" value="S/4HANA Cloud (Public Edition)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Clean Core OData v4 / GraphQL APIs (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconS4};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="344" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_analytics" value="SAP Analytics Cloud (SAC)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Executive Dashboarding &amp; Enterprise Planning (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSac};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="400" width="340" height="44" as="geometry" />
        </mxCell>
        <mxCell id="saas_fiori" value="SAP Fiori / Horizon Design System Gateway (:443)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="452" width="340" height="34" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 5: SAP RISE / ON-PREMISE CORE (BOTTOM RIGHT) ==================== -->
        <mxCell id="zone_sap_onprem" value="SAP RISE / Any-Cloud / On-Premise Core Data Center (172.16.0.0/16)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1000" y="530" width="790" height="335" as="geometry" />
        </mxCell>

        <!-- SAP Cloud Connector HA Pair -->
        <mxCell id="node_scc_ha" value="SAP Cloud Connector (SCC High Availability Cluster)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Outbound-only TLS Reverse Tunnel to BTP (:443) / No open inbound ports&lt;br&gt;• Principal Propagation Engine: SAML 2.0 / X.509 Short-Lived Certificate Generator&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconSapScc};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="562" width="760" height="58" as="geometry" />
        </mxCell>

        <!-- NetWeaver AS ABAP with ABAP SDK Inside -->
        <mxCell id="node_as_abap" value="SAP NetWeaver AS ABAP 7.58+ (S/4HANA 2023 / ECC 6.0 EHP8)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Internet Communication Manager (ICM) — HTTPS OData Port :44300&lt;br&gt;• ABAP Gateway Dispatcher / RFC &amp; BAPI Gateway Port :3300 (SNC Encryption)&lt;br&gt;• &lt;b style=&quot;color: #FEF08A;&quot;&gt;ABAP SDK for Google Cloud (/GOOG/ Package)&lt;/b&gt;: Direct Outbound HTTPS to Vertex &amp; BigQuery&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=44;verticalAlign=middle;lineHeight=1.25;image=${iconS4};imageWidth=28;imageHeight=28;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="632" width="760" height="88" as="geometry" />
        </mxCell>

        <!-- SAP HANA In-Memory Database (with HANA Icon) -->
        <mxCell id="node_sap_hana" value="SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB Port :30015 | Multi-AZ High Availability System Replication)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=left;spacingLeft=42;verticalAlign=middle;image=${iconHana};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="730" width="760" height="42" as="geometry" />
        </mxCell>

        <!-- Lower Production Infrastructure Stack (HSR & Web Dispatcher) -->
        <mxCell id="node_sap_hsr" value="HANA System Replication (HSR Active/Standby HA)&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Sync Replication Port :40002 / Auto-Failover&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconHana};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="784" width="372" height="60" as="geometry" />
        </mxCell>

        <mxCell id="node_sap_webdisp" value="SAP Web Dispatcher &amp; Gateway SNC Cluster&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Software Load Balancing (:44300) &amp; SSO PSE Security&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconBtp};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1403" y="784" width="372" height="60" as="geometry" />
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
              <mxPoint x="228" y="349" />
              <mxPoint x="228" y="185" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_gclb_to_nocode" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="box_gclb" target="node_agent_builder">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="228" y="349" />
              <mxPoint x="228" y="267" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- INTERNAL RAG & GROUNDING BUS (Clean Vertical Channel) -->
        <mxCell id="e_agent_to_rag" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;dashed=1;dashPattern=3 3;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_vector_psc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="530" y="185" />
              <mxPoint x="530" y="345" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_reason_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="530" y="185" />
              <mxPoint x="530" y="267" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_fusion_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0;entryY=0.75;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_data_fusion" target="node_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="530" y="623" />
              <mxPoint x="530" y="285" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ==================== CROSS-TIER PRIVATE HIGHWAYS ==================== -->

        <!-- HIGHWAY 1: Vertex Reasoning Engine to SAP Joule (A2A Protocol) - Inter-card channel at y=223 -->
        <mxCell id="e_agent_to_joule" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2.2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_sap_joule">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="530" y="195" />
              <mxPoint x="530" y="223" />
              <mxPoint x="930" y="223" />
              <mxPoint x="930" y="156" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- A2A Protocol Pill Badge -->
        <mxCell id="badge_a2a" value="A2A: JSON-RPC over mTLS / OIDC" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="815" y="170" width="200" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 2: Agent Runtime to SAP Integration Suite (APIM) -->
        <mxCell id="e_agent_to_apim" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_s4_adapter" target="node_sap_apimgmt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="830" y="407" />
              <mxPoint x="830" y="232" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- APIM Highway Badge -->
        <mxCell id="badge_apim" value="HTTPS :443 / OAuth2 Bearer" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="835" y="248" width="180" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 3: BYO MCP Server / Agent to SAP MCP Gateway on Kyma (Routed below RAG engine at y=542 in open inter-subnet channel) -->
        <mxCell id="e_nocode_to_mcpgw" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_mcp_host" target="node_sap_mcpgw">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="530" y="341" />
              <mxPoint x="530" y="546" />
              <mxPoint x="940" y="546" />
              <mxPoint x="940" y="305" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- MCP Protocol Badge -->
        <mxCell id="badge_mcp" value="MCP v1.0: JSON-RPC over SSE" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="534" width="190" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 4: Zero-Copy Bi-Directional Federation (BigQuery &lt;-&gt; Datasphere) -->
        <mxCell id="e_bq_datasphere_zerocopy" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2.2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_bigquery" target="node_sap_datasphere">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="880" y="269" />
              <mxPoint x="880" y="377" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Zero Copy Badge -->
        <mxCell id="badge_zerocopy" value="Zero-Copy: FedSQL / Delta Sharing" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#047857;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="365" width="190" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 5: Outbound ABAP SDK Call to Pub/Sub -->
        <mxCell id="e_abap_to_gcp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;dashed=1;dashPattern=5 3;entryX=1;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_as_abap" target="node_pubsub_staging">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="910" y="676" />
              <mxPoint x="910" y="408" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- ABAP SDK Outbound Badge -->
        <mxCell id="badge_abap_sdk_call" value="Outbound HTTPS :443 (/GOOG/ SDK via PSC/Interconnect)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7DD3FC;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#0369A1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="475" width="220" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 6: Dedicated Interconnect Line -->
        <mxCell id="e_interconnect_line" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_cloud_interconnect" target="node_as_abap">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="895" y="742" />
              <mxPoint x="895" y="676" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="badge_ingest_rfc" value="Dedicated Interconnect (Private IP :44300 / :3300)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDBA74;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#C2410C;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="695" width="200" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 7: SAP BTP API Mgmt to Cloud Connector -->
        <mxCell id="e_btp_to_scc" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=4 4;entryX=0.9;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_sap_apimgmt" target="node_scc_ha">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1405" y="232" />
              <mxPoint x="1405" y="520" />
              <mxPoint x="1700" y="520" />
              <mxPoint x="1700" y="562" />
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

        <!-- HANA DB to HSR & Web Dispatcher -->
        <mxCell id="e_hana_to_hsr" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#3B82F6;strokeWidth=1.5;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_sap_hana" target="node_sap_hsr">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e_hana_to_webdisp" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#3B82F6;strokeWidth=1.5;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_sap_hana" target="node_sap_webdisp">
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
  const xml = generateIconEnrichedTechnicalXml();
  const outXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  fs.writeFileSync(outXmlPath, xml, 'utf8');
  console.log(`Successfully generated icon-enriched technical diagram XML at: ${outXmlPath}`);
}

run();
