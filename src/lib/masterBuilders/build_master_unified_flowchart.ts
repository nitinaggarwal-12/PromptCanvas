/**
 * 🏛️ MASTER BUILDER: Unified End-to-End Enterprise Flowchart Architecture (WBS 1.1.0)
 * 
 * FULL-WIDTH 4-COLUMN BALANCED DISTRIBUTION (NO EMPTY RIGHT SIDE, ZERO CLUTTER):
 * - Col 1 (x=80..350):   Client Portal [1] &bull; SIEM Reject [2b] &bull; Vector Search [4] &bull; Chunking Agent [8]
 * - Col 2/3 (x=420..910): DNS [1a] &bull; WAF [1b] &bull; Apigee Gateway [2] &bull; Orchestrator [3] &bull; Redis Cache [5] &bull; Pub/Sub Mesh [7] &bull; Embedding Agent [9] &bull; SRE Suite [11]
 * - Col 4 (x=1010..1290): GSLB [1c] &bull; Cloud KMS [2a] &bull; Gemini 1.5 Pro [3a] &bull; Cloud SQL HA [6] &bull; DLQ Bus [7a] &bull; BigQuery Lakehouse [10] &bull; PagerDuty SRE [12]
 * 
 * 100% Zero-Collision 2D Coordinates with Solid White Contrast Pills and Dedicated Routing Channels.
 */

const SVG_GCP_LOGO = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%20width%3D%2236%22%20height%3D%2236%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E";

export function buildMasterUnifiedFlowchartXml(): string {
  return `<mxGraphModel dx="1680" dy="1450" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="1450" background="#FFFFFF">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- ========================================================================= -->
    <!-- CANVAS FRAME & HEADER BANNER (SPACIOUS LIGHT THEME)                       -->
    <!-- ========================================================================= -->
    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="30" y="20" width="1620" height="1400" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="50" y="35" width="1580" height="65" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${SVG_GCP_LOGO};" vertex="1" parent="1">
      <mxGeometry x="68" y="47" width="40" height="40" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:17px;color:#0F172A;'&gt;Google Cloud | Unified 7-Layer Enterprise Operational Flowchart&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:12px;color:#475569;'&gt;Sequential End-to-End Execution Flow: Client Ingress &amp;rarr; Apigee Gate &amp;rarr; GKE Orchestrator &amp;rarr; Vertex AI &amp;rarr; Pub/Sub Mesh &amp;rarr; Persistence &amp;amp; SRE Hub&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="125" y="43" width="1050" height="48" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#E0F2FE;color:#0369A1;border:1px solid #7DD3FC;padding:4px 10px;border-radius:6px;font-weight:bold;font-size:10.5px;'&gt;SOC2 Type II&lt;/span&gt; &lt;span style='background-color:#DCFCE7;color:#15803D;border:1px solid #86EFAC;padding:4px 10px;border-radius:6px;font-weight:bold;font-size:10.5px;'&gt;PCI-DSS 4.0&lt;/span&gt; &lt;span style='background-color:#EEF2FF;color:#4338CA;border:1px solid #A5B4FC;padding:4px 10px;border-radius:6px;font-weight:bold;font-size:10.5px;'&gt;Active-Active HA 99.99%&lt;/span&gt; &lt;span style='background-color:#F3E8FF;color:#7E22CE;border:1px solid #D8B4FE;padding:4px 10px;border-radius:6px;font-weight:bold;font-size:10.5px;'&gt;Zero-Trust Perimeter&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="1180" y="47" width="440" height="40" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- 7 BALANCED HORIZONTAL LAYER SWIMLANES (FULL-WIDTH 1580px, PASTEL LIGHT)   -->
    <!-- ========================================================================= -->

    <!-- Tier 1: Client & Ingress Layer -->
    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F0F9FF;fillOpacity=50;strokeColor=#BAE6FD;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="115" width="1580" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:11px;color:#0369A1;'&gt;TIER 1: USER INTERACTION &amp;amp; GLOBAL EDGE INGRESS LAYER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="103" width="460" height="24" as="geometry" />
    </mxCell>

    <!-- Tier 2: API Management & Policy Gate -->
    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFFBEB;fillOpacity=50;strokeColor=#FDE68A;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="285" width="1580" height="160" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:11px;color:#B45309;'&gt;TIER 2: API GATEWAY &amp;amp; ZERO-TRUST POLICY GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="273" width="440" height="24" as="geometry" />
    </mxCell>

    <!-- Tier 3: Core Orchestration & AI Reasoning -->
    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FAF5FF;fillOpacity=50;strokeColor=#E9D5FF;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="475" width="1580" height="160" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:11px;color:#7E22CE;'&gt;TIER 3: CORE ORCHESTRATOR &amp;amp; AI REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="463" width="460" height="24" as="geometry" />
    </mxCell>

    <!-- Tier 4: In-Memory Caching & Vector Memory -->
    <mxCell id="tier_4_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#ECFDF5;fillOpacity=50;strokeColor=#A7F3D0;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="665" width="1580" height="165" as="geometry" />
    </mxCell>
    <mxCell id="tier_4_tab" value="&lt;b style='font-size:11px;color:#047857;'&gt;TIER 4: IN-MEMORY CACHE, VECTOR STORE &amp;amp; ACID PERSISTENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#D1FAE5;strokeColor=#10B981;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="653" width="490" height="24" as="geometry" />
    </mxCell>

    <!-- Tier 5: Distributed Event Bus -->
    <mxCell id="tier_5_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#EFF6FF;fillOpacity=50;strokeColor=#BFDBFE;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="860" width="1580" height="150" as="geometry" />
    </mxCell>
    <mxCell id="tier_5_tab" value="&lt;b style='font-size:11px;color:#1D4ED8;'&gt;TIER 5: ASYNCHRONOUS EVENT BUS &amp;amp; RESILIENCE QUEUE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="848" width="470" height="24" as="geometry" />
    </mxCell>

    <!-- Tier 6: Async Background Agents & Lakehouse -->
    <mxCell id="tier_6_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFF1F2;fillOpacity=50;strokeColor=#FECDD3;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="1040" width="1580" height="165" as="geometry" />
    </mxCell>
    <mxCell id="tier_6_tab" value="&lt;b style='font-size:11px;color:#BE123C;'&gt;TIER 6: ASYNC INGESTION AGENTS &amp;amp; ANALYTICAL LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FFE4E6;strokeColor=#F43F5E;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="1028" width="480" height="24" as="geometry" />
    </mxCell>

    <!-- Tier 7: Observability & Telemetry -->
    <mxCell id="tier_7_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;fillOpacity=50;strokeColor=#CBD5E1;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="50" y="1235" width="1580" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_7_tab" value="&lt;b style='font-size:11px;color:#334155;'&gt;TIER 7: ENTERPRISE SRE OBSERVABILITY &amp;amp; INCIDENT MANAGEMENT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="70" y="1223" width="510" height="24" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 1: USER INTERACTION & INGRESS (PASTEL LIGHT SHADES, CRISP DARK TEXT) -->
    <!-- ========================================================================= -->
    <mxCell id="node_1_client" value="&lt;b style='font-size:13.5px;color:#92400E;'&gt;[1] Enterprise Client Portal&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#78350F;'&gt;React 19 Web SPA &amp;amp; Mobile SDK&lt;br&gt;mTLS Mutual Auth &amp;bull; WebAuthn FIDO2&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.8;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="145" width="270" height="85" as="geometry" />
    </mxCell>

    <mxCell id="node_1a_dns" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[1a] Cloud DNS Anycast&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#075985;'&gt;Global Anycast Edge PoPs&lt;br&gt;DNSSEC &amp;amp; Geo-Latency Routing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="420" y="145" width="270" height="85" as="geometry" />
    </mxCell>

    <mxCell id="node_1b_waf" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[1b] Cloud Armor WAF&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#075985;'&gt;OWASP Top 10 &amp;bull; DDoS Mitigation&lt;br&gt;Adaptive ML Layer 7 Rate Limiting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="730" y="145" width="310" height="85" as="geometry" />
    </mxCell>

    <mxCell id="node_1c_gslb" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[1c] Global External LB (GSLB)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#075985;'&gt;Cross-Region HTTPS Anycast VIP&lt;br&gt;SSL Offload &amp;amp; HTTP/3 QUIC Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1080" y="145" width="310" height="85" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 2: API GATEWAY & POLICY INSPECTION (LIGHT SHADE SHAPES)              -->
    <!-- ========================================================================= -->
    <mxCell id="node_2b_reject" value="&lt;b style='font-size:13px;color:#991B1B;'&gt;[2b] Security SIEM Rejection&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#B91C1C;'&gt;401 Unauthorized / 429 Spike Limit&lt;br&gt;Audit Payload to SecOps Chronicle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="320" width="270" height="85" as="geometry" />
    </mxCell>

    <mxCell id="node_2_apigee" value="&lt;b style='font-size:13.5px;color:#92400E;'&gt;[2] API Gateway (Apigee Enterprise)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#78350F;'&gt;OAuth2 / OIDC JWT Auth &amp;bull; Dynamic PII Masking&lt;br&gt;Spike Arrest &amp;amp; Token Quotas&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=15;spacingRight=15;" vertex="1" parent="1">
      <mxGeometry x="460" y="300" width="500" height="125" as="geometry" />
    </mxCell>

    <mxCell id="node_2a_kms" value="&lt;b style='font-size:13px;color:#92400E;'&gt;[2a] Cloud KMS &amp;amp; HSM Vault&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#78350F;'&gt;FIPS 140-2 L3 Hardware Security&lt;br&gt;Token Cryptographic Sign &amp;amp; Verify&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1040" y="320" width="310" height="85" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 3: ORCHESTRATION & REASONING MESH (EXPANDED DUAL COLUMNS)            -->
    <!-- ========================================================================= -->
    <mxCell id="node_3_orchestrator" value="&lt;b style='font-size:14.5px;color:#6B21A8;'&gt;[3] Router / GKE Master Orchestrator&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#581C87;'&gt;LangGraph Multi-Agent State Machine &amp;bull; GKE Autopilot Pod Mesh &amp;bull; Execution Controller&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="505" width="580" height="100" as="geometry" />
    </mxCell>

    <mxCell id="node_3a_gemini" value="&lt;b style='font-size:14.5px;color:#9D174D;'&gt;[3a] Vertex AI Gemini 1.5 Pro (Reasoning Engine)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#831843;'&gt;Cognitive Multi-Modal Reasoning &amp;bull; Dynamic Context Grounding &amp;bull; Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="740" y="505" width="610" height="100" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 4: CACHE, VECTOR STORE & ACID PERSISTENCE (PASTEL GREEN & BLUE)      -->
    <!-- ========================================================================= -->
    <mxCell id="node_4_vector" value="&lt;b style='font-size:13.5px;color:#065F46;'&gt;[4] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#047857;'&gt;ScaNN Approximate Nearest Neighbor&lt;br&gt;768-dim Embeddings &amp;bull; Sub-5ms Recall&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="695" width="270" height="105" as="geometry" />
    </mxCell>

    <mxCell id="node_5_redis" value="&lt;b style='font-size:13.5px;color:#065F46;'&gt;[5] Redis MemoryStore&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#047857;'&gt;Distributed Session &amp;amp; Context Outbox Cache &amp;bull; Sub-ms Idempotency Token Engine&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="420" y="695" width="580" height="105" as="geometry" />
    </mxCell>

    <mxCell id="node_6_cloudsql" value="&lt;b style='font-size:13.5px;color:#1E40AF;'&gt;[6] Cloud SQL (PostgreSQL 16 HA)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#1D4ED8;'&gt;Multi-AZ Standby ACID Ledger&lt;br&gt;Financial Transaction Immutability&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1080" y="695" width="310" height="105" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 5: ASYNCHRONOUS EVENT BUS & QUEUING (PASTEL BLUE & PURPLE)           -->
    <!-- ========================================================================= -->
    <mxCell id="node_7_pubsub" value="&lt;b style='font-size:14px;color:#1E40AF;'&gt;[7] Google Cloud Pub/Sub Distributed Event Mesh&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#1D4ED8;'&gt;Topic: orders.created.v1 &amp;bull; Partitioned High-Throughput Event Stream for Agent Coordination&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="890" width="790" height="90" as="geometry" />
    </mxCell>

    <mxCell id="node_7a_dlq" value="&lt;b style='font-size:13px;color:#6B21A8;'&gt;[7a] Dead-Letter Queue (DLQ)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#581C87;'&gt;Poison-Pill Quarantine Bus&lt;br&gt;Exponential Backoff Replay&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="980" y="890" width="220" height="90" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 6: ASYNC AGENTS & LAKEHOUSE (PASTEL ROSE & CYAN)                     -->
    <!-- ========================================================================= -->
    <mxCell id="node_8_chunking" value="&lt;b style='font-size:13.5px;color:#9F1239;'&gt;[8] Document Chunking Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#881337;'&gt;OCR Document Parser&lt;br&gt;Token Sliding Window Normalization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="1070" width="270" height="105" as="geometry" />
    </mxCell>

    <mxCell id="node_9_embedding" value="&lt;b style='font-size:13.5px;color:#9F1239;'&gt;[9] Embedding &amp;amp; Fraud Scoring Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#881337;'&gt;Vertex AI Text-Embedding-004 Worker &amp;bull; Real-Time Risk Anomaly &amp;amp; Fraud Scorer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="420" y="1070" width="580" height="105" as="geometry" />
    </mxCell>

    <mxCell id="node_10_bigquery" value="&lt;b style='font-size:13.5px;color:#155E75;'&gt;[10] BigQuery Lakehouse &amp;amp; GCS&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#0E7490;'&gt;Partitioned Analytics Lakehouse&lt;br&gt;WORM Immutable Cold Storage Vault&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#CFFAFE;strokeColor=#0891B2;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1080" y="1070" width="310" height="105" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 7: SRE OBSERVABILITY & INCIDENT HUB (PASTEL SLATE)                   -->
    <!-- ========================================================================= -->
    <mxCell id="node_11_telemetry" value="&lt;b style='font-size:13.5px;color:#1E293B;'&gt;[11] Cloud Operations Suite (SRE Telemetry Hub)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#334155;'&gt;OpenTelemetry Collector &amp;bull; Cloud Trace Distributed APM &amp;bull; Cloud Logging Unified Sink&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="110" y="1265" width="930" height="85" as="geometry" />
    </mxCell>

    <mxCell id="node_12_sre" value="&lt;b style='font-size:13.5px;color:#1E293B;'&gt;[12] PagerDuty SRE Hub&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#334155;'&gt;SLO Error Budget Monitoring&lt;br&gt;Automated Incident Escalation &amp;amp; Pager&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1080" y="1265" width="310" height="85" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- FLOW ARROWS & HIGH-CONTRAST LABELS (ZERO COLLISION, WHITE PILLS)          -->
    <!-- ========================================================================= -->

    <!-- Flow 1: Client -> DNS (Tier 1 Horizontal) -->
    <mxCell id="flow_1" value="&lt;b style='color:#0284C7;'&gt;1. Resolve VIP&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;" edge="1" parent="1" source="node_1_client" target="node_1a_dns">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 1a: DNS -> WAF (Tier 1 Horizontal) -->
    <mxCell id="flow_1a" value="&lt;b style='color:#0284C7;'&gt;1a. DDoS Filter&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;" edge="1" parent="1" source="node_1a_dns" target="node_1b_waf">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 1b: WAF -> GSLB (Tier 1 Horizontal) -->
    <mxCell id="flow_1b" value="&lt;b style='color:#0284C7;'&gt;1b. Route Ingress&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;" edge="1" parent="1" source="node_1b_waf" target="node_1c_gslb">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 2: GSLB -> Apigee (Tier 1 -> Tier 2 Open Space Channel at y=265) -->
    <mxCell id="flow_2" value="&lt;b style='color:#B45309;'&gt;2. HTTPS User Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=11;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_1c_gslb" target="node_2_apigee">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1235" y="265" />
          <mxPoint x="710" y="265" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 2a: Apigee -> KMS (Tier 2 Right Token Verify - Direct Open Line) -->
    <mxCell id="flow_2a" value="&lt;b style='color:#B45309;'&gt;2a. Verify JWT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2a_kms">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 2b: Apigee -> SIEM Reject (Tier 2 Left Branch - Direct Open Line) -->
    <mxCell id="flow_2b" value="&lt;b style='color:#B91C1C;'&gt;2b. Invalid Token (401/429)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EF4444;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2b_reject">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 3: Apigee -> Orchestrator (Tier 2 -> Tier 3 Open Space Channel at y=455) -->
    <mxCell id="flow_3" value="&lt;b style='color:#6B21A8;'&gt;3. Auth'd &amp;amp; PII-Scrubbed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=11;exitX=0.5;exitY=1;entryX=0.75;entryY=0;" edge="1" parent="1" source="node_2_apigee" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="710" y="455" />
          <mxPoint x="545" y="455" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 4: Orchestrator <-> Gemini 1.5 Pro (Tier 3 Horizontal Bidirectional) -->
    <mxCell id="flow_4_fwd" value="&lt;b style='color:#9D174D;'&gt;4. Context Prompt&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=1;exitY=0.35;entryX=0;entryY=0.35;" edge="1" parent="1" source="node_3_orchestrator" target="node_3a_gemini">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_4_back" value="&lt;b style='color:#9D174D;'&gt;4a. CoT Synthesis&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0;exitY=0.65;entryX=1;entryY=0.65;" edge="1" parent="1" source="node_3a_gemini" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 5: Orchestrator -> Vector Search (Tier 3 -> Tier 4 Left Branch) -->
    <mxCell id="flow_5" value="&lt;b style='color:#065F46;'&gt;5. Vector Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0.23;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_4_vector">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 6: Orchestrator -> Redis (Tier 3 -> Tier 4 Center Downward) -->
    <mxCell id="flow_6" value="&lt;b style='color:#065F46;'&gt;6. Read/Write State&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0.75;exitY=1;entryX=0.35;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_5_redis">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 7: Orchestrator -> Cloud SQL (Tier 3 -> Tier 4 Right Branch via Open Channel at y=645) -->
    <mxCell id="flow_7" value="&lt;b style='color:#1E40AF;'&gt;7. ACID Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0.9;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_6_cloudsql">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="632" y="645" />
          <mxPoint x="1235" y="645" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 8: Redis -> Pub/Sub Event Mesh (Tier 4 -> Tier 5 Center Downward) -->
    <mxCell id="flow_8" value="&lt;b style='color:#1E40AF;'&gt;8. Publish tasks for Agents&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=11;exitX=0.5;exitY=1;entryX=0.62;entryY=0;" edge="1" parent="1" source="node_5_redis" target="node_7_pubsub">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 8a: Pub/Sub -> DLQ (Tier 5 Right Branch) -->
    <mxCell id="flow_8a" value="&lt;b style='color:#6B21A8;'&gt;8a. DLQ Quarantine (Poison)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_7_pubsub" target="node_7a_dlq">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 9: Pub/Sub -> Chunking Agent (Tier 5 -> Tier 6 Left Branch) -->
    <mxCell id="flow_9" value="&lt;b style='color:#9F1239;'&gt;9. Ingest Task&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0.16;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_8_chunking">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 10: Pub/Sub -> Embedding Agent (Tier 5 -> Tier 6 Center Downward) -->
    <mxCell id="flow_10" value="&lt;b style='color:#9F1239;'&gt;10. Embed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0.68;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_9_embedding">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 11: Cloud SQL -> BigQuery (Tier 4 -> Tier 6 Right Vertical CDC - 100% UNINTERRUPTED HIGHWAY) -->
    <mxCell id="flow_11" value="&lt;b style='color:#155E75;'&gt;11. Datastream CDC Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0891B2;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0891B2;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_6_cloudsql" target="node_10_bigquery">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="0" y="-55" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 12: Embedding Agent -> Vector Search (Tier 6 -> Tier 4 High-Clearance Open Channel at y=1015) -->
    <mxCell id="flow_12" value="&lt;b style='color:#065F46;'&gt;12. Upsert 768d Vectors&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0;exitY=0.25;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_9_embedding" target="node_4_vector">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="400" y="1095" />
          <mxPoint x="400" y="1015" />
          <mxPoint x="245" y="1015" />
        </Array>
        <mxPoint x="25" y="0" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 13: Orchestrator -> Telemetry Hub (Dedicated Leftmost Telemetry Corridor at x=60) -->
    <mxCell id="flow_13" value="&lt;b style='color:#1E293B;'&gt;13. OTel Traces &amp;amp; Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=0;exitY=0.75;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_11_telemetry">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="65" y="580" />
          <mxPoint x="65" y="1307" />
        </Array>
        <mxPoint x="0" y="320" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 14: Telemetry -> PagerDuty SRE (Tier 7 Horizontal Alert) -->
    <mxCell id="flow_14" value="&lt;b style='color:#1E293B;'&gt;14. SLO Breach Alert&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=10.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_11_telemetry" target="node_12_sre">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 15: Response Back to Client (Left Channel Return Highway at x=85 with Top Placement) -->
    <mxCell id="flow_15_return" value="&lt;b style='color:#15803D;'&gt;15. Signed 200 OK Response (Sub-45ms SLA)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;spacingTop=3;spacingBottom=3;spacingLeft=6;spacingRight=6;fontFamily=Arial;fontSize=11;exitX=0;exitY=0.25;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_1_client">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="85" y="530" />
          <mxPoint x="85" y="187" />
        </Array>
        <mxPoint x="0" y="-120" as="offset" />
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel>`;
}
