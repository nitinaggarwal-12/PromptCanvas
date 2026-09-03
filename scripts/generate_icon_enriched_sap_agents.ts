import * as fs from 'fs';
import * as path from 'path';
import { getGcpDataUri } from '../src/lib/gcpIcons';

// Vector SVGs for SAP tools & components
const SAP_JOULE_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#F59E0B"/><circle cx="12" cy="12" r="3" fill="#FFFFFF"/></svg>`;
const SAP_INTEGRATION_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="12" r="3" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><circle cx="18" cy="6" r="3" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><circle cx="18" cy="18" r="3" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><path d="M9 12H12M12 12L15 6M12 12L15 18" stroke="#0070F2" stroke-width="2" stroke-linecap="round"/></svg>`;
const SAP_DATASPHERE_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="#0070F2" stroke-width="1.8" fill="#EBF3FC"/><path d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6" stroke="#0070F2" stroke-width="1.8"/><path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" stroke="#0070F2" stroke-width="1.8"/><circle cx="12" cy="12" r="2" fill="#0070F2"/></svg>`;
const SAP_HANA_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#38BDF8" stroke-width="2" fill="#0F172A"/><path d="M7 9H17M7 12H17M7 15H13" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const SAP_SAAS_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" rx="2" fill="#0070F2"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#3B82F6"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#60A5FA"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#93C5FD"/></svg>`;

function getSapDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
}

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
  
  const iconJoule = getSapDataUri(SAP_JOULE_SVG);
  const iconApim = getSapDataUri(SAP_INTEGRATION_SVG);
  const iconDatasphere = getSapDataUri(SAP_DATASPHERE_SVG);
  const iconHana = getSapDataUri(SAP_HANA_SVG);
  const iconSaas = getSapDataUri(SAP_SAAS_SVG);

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-09-03T14:30:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
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

        <!-- Cloud Armor (with Icon) -->
        <mxCell id="box_cloud_armor" value="Cloud Armor (WAF)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;OWASP Top 10 + Rate Limit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;image=${iconArmor};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="275" width="156" height="55" as="geometry" />
        </mxCell>

        <!-- Global External HTTPS LB (with Icon) -->
        <mxCell id="box_gclb" value="External HTTPS LB&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;Anycast IP :443 / TLS 1.3&lt;br&gt;Identity-Aware Proxy (IAP)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconGclb};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="350" width="156" height="70" as="geometry" />
        </mxCell>

        <!-- Security & IAM (with Icon) -->
        <mxCell id="box_security_iam" value="IAM &amp; KMS Secrets&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Workload Identity Pool&lt;br&gt;• Cloud KMS (mTLS Keys)&lt;br&gt;• SAP BTP Token Secrets&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconIam};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="440" width="156" height="78" as="geometry" />
        </mxCell>

        <!-- Observability & Telemetry (with Icon) -->
        <mxCell id="box_observability" value="Cloud Operations&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Logging &amp; Audit Logs&lt;br&gt;• Cloud Trace (OTel Spans)&lt;br&gt;• Token &amp; Latency Metrics&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconOps};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="538" width="156" height="78" as="geometry" />
        </mxCell>

        <!-- Zero Trust & Model Guardrails (with Icon) -->
        <mxCell id="box_zero_trust_policy" value="Model Armor&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Prompt Injection Defense&lt;br&gt;• Sensitive Data / DLP Filter&lt;br&gt;• Continuous Session Audit&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconArmorSec};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="42" y="636" width="156" height="78" as="geometry" />
        </mxCell>

        <!-- Network Firewall Policy -->
        <mxCell id="box_firewall" value="Hierarchical Firewalls&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #64748B; font-family: Roboto Mono, monospace;&quot;&gt;• Egress Port :443 Lock&lt;br&gt;• Strict VPC-SC Perimeter&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#0F172A;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
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

        <!-- Vertex AI Reasoning Engine (with Vertex Icon) -->
        <mxCell id="node_reasoning_engine" value="Vertex AI Reasoning Engine&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Cloud Run / GKE Autopilot (Container)&lt;br&gt;• Python ADK / LangGraph Engine&lt;br&gt;• Gemini 1.5 Pro (002) Instance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconVertex};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="148" width="244" height="72" as="geometry" />
        </mxCell>

        <!-- Vertex AI Agent Builder (with Agent Builder Icon) -->
        <mxCell id="node_agent_builder" value="Vertex AI Agent Builder&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Gemini 1.5 Flash (Managed)&lt;br&gt;• Multimodal Intent Routing&lt;br&gt;• Enterprise Session Store&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconAgentBuilder};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="232" width="244" height="72" as="geometry" />
        </mxCell>

        <!-- BYO MCP Server Gateway (with Cloud Run Icon) -->
        <mxCell id="node_mcp_host" value="BYO MCP Server (Cloud Run)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• JSON-RPC 2.0 over SSE / Stdio&lt;br&gt;• Tool Schema Reflection &amp; Execution&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=40;verticalAlign=middle;lineHeight=1.2;image=${iconCloudRun};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="316" width="244" height="55" as="geometry" />
        </mxCell>

        <!-- S/4HANA OData Client Adapter -->
        <mxCell id="node_s4_adapter" value="S/4HANA OData Client Adapter&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CSRF Token Management &amp; Replay Guard&lt;br&gt;• OData v2/v4 Batch Invocation&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="268" y="383" width="244" height="55" as="geometry" />
        </mxCell>

        <!-- Direct VPC Egress Interface -->
        <mxCell id="node_vpc_connector" value="Direct VPC Egress Interface&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;High-Throughput Private VPC Networking&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="450" width="244" height="40" as="geometry" />
        </mxCell>

        <!-- Subnet 2: Enterprise Data & Analytics Subnet -->
        <mxCell id="subnet_data" value="Subnet: data-lakehouse &amp; RAG (10.128.20.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="540" y="118" width="285" height="430" as="geometry" />
        </mxCell>

        <!-- Cortex Framework Engine -->
        <mxCell id="node_cortex" value="Cortex Framework Engine&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Pre-packaged SAP Operational Models&lt;br&gt;• Dataform SQL Pipelines / Workflows&lt;br&gt;• Materialized Analytical Views&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="553" y="148" width="258" height="72" as="geometry" />
        </mxCell>

        <!-- BigQuery & ScaNN (with BigQuery Icon) -->
        <mxCell id="node_bigquery" value="BigQuery Lakehouse &amp; ScaNN&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• BigLake Managed Tables (Parquet)&lt;br&gt;• ScaNN Vector Embeddings Index&lt;br&gt;• BigQuery Storage Read API (gRPC :443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconBigQuery};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="553" y="232" width="258" height="78" as="geometry" />
        </mxCell>

        <!-- Vertex Vector Search PSC (with Vector Search Icon) -->
        <mxCell id="node_vector_psc" value="Vertex Vector Search (PSC)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Private Service Connect :10000 IP&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=40;verticalAlign=middle;image=${iconVectorSearch};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="553" y="322" width="258" height="52" as="geometry" />
        </mxCell>

        <!-- Cloud Pub/Sub & GCS (with Pub/Sub Icon) -->
        <mxCell id="node_pubsub_staging" value="Cloud Pub/Sub Ingestion Bus&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Real-time Ingestion for SAP /GOOG/ SDK&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=40;verticalAlign=middle;image=${iconPubSub};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="553" y="386" width="258" height="52" as="geometry" />
        </mxCell>

        <mxCell id="node_lakehouse_catalog" value="Dataplex Universal Catalog &amp; Lineage&lt;br&gt;&lt;span style=&quot;font-size: 7.5px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Automated Metadata &amp; Data Governance&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="553" y="450" width="258" height="40" as="geometry" />
        </mxCell>

        <!-- Subnet 3: Hybrid Ingestion & Integration Subnet -->
        <mxCell id="subnet_ingest" value="Subnet: data-ingestion-hybrid (10.128.30.0/24)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="255" y="565" width="570" height="280" as="geometry" />
        </mxCell>

        <!-- Cloud Data Fusion / SLT (with Dataflow Icon) -->
        <mxCell id="node_data_fusion" value="Cloud Data Fusion / SLT Replication&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• CDAP Native Pipelines / Private IP Peering (:443)&lt;br&gt;• SAP SLT Real-time Change Data Capture (CDC) Receiver&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.25;image=${iconDataFusion};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="595" width="544" height="60" as="geometry" />
        </mxCell>

        <!-- Cloud Storage Staging (with GCS Icon) -->
        <mxCell id="node_gcs_lakehouse" value="Cloud Storage (GCS) BigLake Staging Bucket (Multi-Region / Dual-Region)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Raw Delta Parquet Staging &amp; Micro-batch Streaming Buffer&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconGcs};imageWidth=24;imageHeight=24;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="268" y="670" width="544" height="48" as="geometry" />
        </mxCell>

        <!-- Cloud Router & Dedicated Interconnect -->
        <mxCell id="node_cloud_interconnect" value="Cloud Router &amp; Dedicated Interconnect / HA VPN Gateway (BGP ASN: 64512 / 10.250.0.0/30)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="732" width="544" height="38" as="geometry" />
        </mxCell>

        <mxCell id="node_egress_policy" value="Private Google Access &amp; VPC Service Controls (VPC-SC) Perimeter Enforced" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="268" y="784" width="544" height="32" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 3: SAP BTP SUB-ACCOUNT (REGION: cf-us10) ==================== -->
        <mxCell id="zone_sap_btp" value="SAP BTP Platform (Cloud Foundry / Kyma Runtime: cf-us10)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=14;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="385" height="430" as="geometry" />
        </mxCell>

        <!-- SAP Joule (with SAP Joule Spark Icon) -->
        <mxCell id="node_sap_joule" value="SAP Joule / Generative AI Hub&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Foundation Model Gateway&lt;br&gt;• Joule Business Context Engine&lt;br&gt;• A2A Token Exchange Endpoint&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconJoule};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="122" width="355" height="68" as="geometry" />
        </mxCell>

        <!-- SAP Integration Suite (with SAP APIM Icon) -->
        <mxCell id="node_sap_apimgmt" value="SAP Integration Suite (API Mgmt)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• OAuth 2.0 / SAML Assertion Token Translator&lt;br&gt;• Cloud Connector mTLS Ingress Tunnel (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconApim};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="202" width="355" height="64" as="geometry" />
        </mxCell>

        <!-- SAP MCP Gateway on Kyma -->
        <mxCell id="node_sap_mcpgw" value="SAP MCP Gateway (Kyma K8s Runtime)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Model Context Protocol (MCP) Server Container&lt;br&gt;• BTP Open Tool Registry &amp; JSON-RPC Dispatcher&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="278" width="355" height="62" as="geometry" />
        </mxCell>

        <!-- SAP Datasphere (with Datasphere Icon) -->
        <mxCell id="node_sap_datasphere" value="SAP Datasphere (Business Data Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• FedSQL Zero-Copy Federation with BigQuery&lt;br&gt;• Delta Sharing Protocol / Semantic Data Fabric&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=42;verticalAlign=middle;lineHeight=1.2;image=${iconDatasphere};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1015" y="352" width="355" height="62" as="geometry" />
        </mxCell>

        <mxCell id="node_btp_eventmesh" value="SAP Event Mesh / BTP Connectivity Hub&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;Event-Driven Architecture &amp; Webhook Router (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="426" width="355" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 4: SAP SAAS APPS (TOP RIGHT) ==================== -->
        <mxCell id="zone_sap_saas" value="SAP SaaS Suite (Public Endpoints)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=11.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1420" y="85" width="370" height="430" as="geometry" />
        </mxCell>

        <mxCell id="saas_sf" value="SAP SuccessFactors&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;HR Agent Tools / OData v4 REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSaas};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="122" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_concur" value="SAP Concur&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Expense Agent Tools / REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSaas};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="180" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_cx" value="SAP Customer Experience (Commerce Cloud)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Customer Service Agent / OCC REST API (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSaas};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="238" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_biznet" value="SAP Ariba / Business Network&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Procurement Agent / cXML &amp; Supplier Gateway&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSaas};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="296" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_s4pub" value="S/4HANA Cloud (Public Edition)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Clean Core OData v4 / GraphQL APIs (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSaas};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="354" width="340" height="48" as="geometry" />
        </mxCell>
        <mxCell id="saas_analytics" value="SAP Analytics Cloud (SAC)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;Executive Dashboarding &amp; Enterprise Planning (:443)&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=9.5;fontStyle=1;fontColor=#FFFFFF;align=left;spacingLeft=38;verticalAlign=middle;image=${iconSaas};imageWidth=22;imageHeight=22;imageAlign=left;spacing=8;" vertex="1" parent="1">
          <mxGeometry x="1435" y="412" width="340" height="42" as="geometry" />
        </mxCell>


        <!-- ==================== TIER 5: SAP RISE / ON-PREMISE CORE (BOTTOM RIGHT) ==================== -->
        <mxCell id="zone_sap_onprem" value="SAP RISE / Any-Cloud / On-Premise Core Data Center (172.16.0.0/16)" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=16;spacingTop=10;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=12;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1000" y="530" width="790" height="335" as="geometry" />
        </mxCell>

        <!-- SAP Cloud Connector HA Pair -->
        <mxCell id="node_scc_ha" value="SAP Cloud Connector (SCC High Availability Cluster)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #1E3A8A; font-family: Roboto Mono, monospace;&quot;&gt;• Outbound-only TLS Reverse Tunnel to BTP (:443) / No open inbound ports&lt;br&gt;• Principal Propagation Engine: SAML 2.0 / X.509 Short-Lived Certificate Generator&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10;fontStyle=1;fontColor=#1E40AF;align=center;verticalAlign=middle;lineHeight=1.2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="565" width="760" height="60" as="geometry" />
        </mxCell>

        <!-- NetWeaver AS ABAP with ABAP SDK Inside -->
        <mxCell id="node_as_abap" value="SAP NetWeaver AS ABAP 7.58+ (S/4HANA 2023 / ECC 6.0 EHP8)&lt;br&gt;&lt;span style=&quot;font-size: 8px; font-weight: normal; color: #DBEAFE; font-family: Roboto Mono, monospace;&quot;&gt;• Internet Communication Manager (ICM) — HTTPS OData Port :44300&lt;br&gt;• ABAP Gateway Dispatcher / RFC &amp; BAPI Gateway Port :3300 (SNC Encryption)&lt;br&gt;• &lt;b style=&quot;color: #FEF08A;&quot;&gt;ABAP SDK for Google Cloud (/GOOG/ Package)&lt;/b&gt;: Direct Outbound HTTPS to Vertex &amp; BigQuery&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontFamily=Google Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;fontSize=10.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;lineHeight=1.25;" vertex="1" parent="1">
          <mxGeometry x="1015" y="640" width="760" height="92" as="geometry" />
        </mxCell>

        <!-- SAP HANA In-Memory Database (with HANA Icon) -->
        <mxCell id="node_sap_hana" value="SAP HANA In-Memory Database 2.0 SPS07+ (SQL HDB Port :30015 | Multi-AZ High Availability System Replication)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1;fontFamily=Roboto Mono, monospace;fontSize=9.5;fontStyle=1;fontColor=#38BDF8;align=left;spacingLeft=42;verticalAlign=middle;image=${iconHana};imageWidth=26;imageHeight=26;imageAlign=left;spacing=8;" vertex="1" parent="1">
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

        <!-- INTERNAL RAG & GROUNDING BUS -->
        <mxCell id="e_agent_to_rag" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;dashed=1;dashPattern=3 3;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_reasoning_engine" target="node_vector_psc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="532" y="184" />
              <mxPoint x="532" y="348" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- RAG Grounding Badge -->
        <mxCell id="badge_rag_grounding" value="RAG / gRPC Search" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.2;fontFamily=Roboto Mono, monospace;fontSize=7.5;fontStyle=1;fontColor=#6D28D9;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="462" y="295" width="138" height="20" as="geometry" />
        </mxCell>

        <!-- INTERNAL INGESTION PIPELINE -->
        <mxCell id="e_fusion_to_bq" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.8;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;endFill=1;" edge="1" parent="1" source="node_data_fusion" target="node_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="532" y="625" />
              <mxPoint x="532" y="271" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- HIGHWAY 1: Reasoning Engine -> SAP Joule (A2A Protocol) OVER TOP CHANNEL -->
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

        <!-- HIGHWAY 2: Reasoning Engine -> SAP Integration Suite -->
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

        <!-- HIGHWAY 3: BYO MCP -> SAP MCP Gateway -->
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

        <!-- HIGHWAY 4: BigQuery <-> SAP Datasphere Zero Copy -->
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

        <!-- HIGHWAY 5: Outbound ABAP SDK Call to Pub/Sub -->
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
          <mxGeometry x="800" y="480" width="220" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 6: Dedicated Interconnect Line -->
        <mxCell id="e_interconnect_line" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;entryX=0;entryY=0.5;entryDx=0;entryDy=0;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="node_cloud_interconnect" target="node_as_abap">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="895" y="751" />
              <mxPoint x="895" y="686" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="badge_ingest_rfc" value="Dedicated Interconnect (Private IP :44300 / :3300)" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDBA74;strokeWidth=1.5;fontFamily=Roboto Mono, monospace;fontSize=8.5;fontStyle=1;fontColor=#C2410C;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="700" width="200" height="24" as="geometry" />
        </mxCell>

        <!-- HIGHWAY 7: SAP BTP API Mgmt to Cloud Connector -->
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
  const xml = generateIconEnrichedTechnicalXml();
  const outXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  fs.writeFileSync(outXmlPath, xml, 'utf8');
  console.log(`Successfully generated icon-enriched technical diagram XML at: ${outXmlPath}`);
}

run();
