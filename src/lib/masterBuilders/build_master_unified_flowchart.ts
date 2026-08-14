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
  return `<mxGraphModel dx="1460" dy="1420" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1460" pageHeight="1420" background="#FFFFFF">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- ========================================================================= -->
    <!-- CANVAS FRAME & HEADER BANNER (PERFECT EDGE-TO-EDGE SYMMETRY)              -->
    <!-- ========================================================================= -->
    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="20" y="15" width="1420" height="1380" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="40" y="25" width="1380" height="60" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${SVG_GCP_LOGO};" vertex="1" parent="1">
      <mxGeometry x="58" y="37" width="36" height="36" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:16px;color:#0F172A;'&gt;Google Cloud | Unified 7-Layer Enterprise Operational Flowchart&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#475569;'&gt;Sequential End-to-End Execution Flow: Ingress &amp;rarr; Apigee &amp;rarr; Orchestrator &amp;rarr; Vertex AI &amp;rarr; Pub/Sub &amp;rarr; Persistence &amp;amp; SRE Hub&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="110" y="32" width="840" height="46" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#E0F2FE;color:#0369A1;border:1px solid #7DD3FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;SOC2 Type II&lt;/span&gt; &lt;span style='background-color:#DCFCE7;color:#15803D;border:1px solid #86EFAC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;PCI-DSS 4.0&lt;/span&gt; &lt;span style='background-color:#EEF2FF;color:#4338CA;border:1px solid #A5B4FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;HA 99.99%&lt;/span&gt; &lt;span style='background-color:#F3E8FF;color:#7E22CE;border:1px solid #D8B4FE;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;Zero-Trust&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="960" y="37" width="440" height="36" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- 7 BALANCED HORIZONTAL LAYER SWIMLANES (1380px WIDTH, PASTEL LIGHT)        -->
    <!-- ========================================================================= -->

    <!-- Tier 1: Client & Ingress Layer -->
    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F0F9FF;fillOpacity=40;strokeColor=#BAE6FD;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="100" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:10px;color:#0369A1;'&gt;TIER 1: USER INTERACTION &amp;amp; GLOBAL EDGE INGRESS LAYER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="106" width="370" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 2: API Management & Policy Gate -->
    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFFBEB;fillOpacity=40;strokeColor=#FDE68A;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="280" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:10px;color:#B45309;'&gt;TIER 2: API GATEWAY &amp;amp; ZERO-TRUST POLICY GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="850" y="286" width="310" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 3: Core Orchestration & AI Reasoning -->
    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FAF5FF;fillOpacity=40;strokeColor=#E9D5FF;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="470" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:10px;color:#7E22CE;'&gt;TIER 3: CORE ORCHESTRATOR &amp;amp; AI REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="476" width="360" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 4: In-Memory Caching & Vector Memory -->
    <mxCell id="tier_4_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#ECFDF5;fillOpacity=40;strokeColor=#A7F3D0;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="665" width="1380" height="150" as="geometry" />
    </mxCell>
    <mxCell id="tier_4_tab" value="&lt;b style='font-size:10px;color:#047857;'&gt;TIER 4: IN-MEMORY CACHE, VECTOR STORE &amp;amp; ACID PERSISTENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#D1FAE5;strokeColor=#10B981;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="671" width="390" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 5: Distributed Event Bus -->
    <mxCell id="tier_5_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#EFF6FF;fillOpacity=40;strokeColor=#BFDBFE;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="865" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_5_tab" value="&lt;b style='font-size:10px;color:#1D4ED8;'&gt;TIER 5: ASYNCHRONOUS EVENT BUS &amp;amp; RESILIENCE QUEUE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="871" width="370" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 6: Async Background Agents & Lakehouse -->
    <mxCell id="tier_6_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFF1F2;fillOpacity=40;strokeColor=#FECDD3;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="1050" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_6_tab" value="&lt;b style='font-size:10px;color:#BE123C;'&gt;TIER 6: ASYNC INGESTION AGENTS &amp;amp; ANALYTICAL LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FFE4E6;strokeColor=#F43F5E;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="1056" width="380" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 7: Observability & Telemetry -->
    <mxCell id="tier_7_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;fillOpacity=40;strokeColor=#CBD5E1;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="1240" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_7_tab" value="&lt;b style='font-size:10px;color:#334155;'&gt;TIER 7: ENTERPRISE SRE OBSERVABILITY &amp;amp; INCIDENT MANAGEMENT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="1246" width="410" height="20" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 1: USER INTERACTION & INGRESS (4 EQUAL 220px UNITS, 140px GAPS)      -->
    <!-- ========================================================================= -->
    <mxCell id="node_1_client" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[1] Client Portal&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;React 19 SPA &amp;bull; Mobile SDK&lt;br&gt;mTLS Mutual Auth &amp;bull; FIDO2&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.8;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="80" y="136" width="220" height="80" as="geometry" />
    </mxCell>

    <mxCell id="node_1a_dns" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1a] Cloud DNS Anycast&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Global Anycast Edge PoPs&lt;br&gt;DNSSEC &amp;amp; Geo-Latency Routing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="440" y="136" width="220" height="80" as="geometry" />
    </mxCell>

    <mxCell id="node_1b_waf" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1b] Cloud Armor WAF&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;OWASP Top 10 &amp;bull; DDoS Mitigation&lt;br&gt;Adaptive ML Layer 7 Rate Limiting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="800" y="136" width="220" height="80" as="geometry" />
    </mxCell>

    <mxCell id="node_1c_gslb" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1c] Global External LB&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;HTTPS Anycast VIP&lt;br&gt;SSL Offload &amp;amp; HTTP/3 Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1160" y="136" width="220" height="80" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 2: API GATEWAY & POLICY INSPECTION (160px WIDE GAPS)                 -->
    <!-- ========================================================================= -->
    <mxCell id="node_2b_reject" value="&lt;b style='font-size:12.5px;color:#991B1B;'&gt;[2b] SIEM Rejection&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#B91C1C;'&gt;401 / 429 Spike Limit&lt;br&gt;Audit Payload to SecOps Chronicle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="80" y="316" width="220" height="80" as="geometry" />
    </mxCell>

    <mxCell id="node_2_apigee" value="&lt;b style='font-size:13px;color:#92400E;'&gt;[2] API Gateway (Apigee Enterprise)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;OAuth2 / OIDC JWT Auth &amp;bull; Dynamic PII Masking&lt;br&gt;Spike Arrest &amp;amp; Token Quotas&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=15;spacingRight=15;" vertex="1" parent="1">
      <mxGeometry x="460" y="298" width="520" height="115" as="geometry" />
    </mxCell>

    <mxCell id="node_2a_kms" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[2a] Cloud KMS &amp;amp; HSM Vault&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;FIPS 140-2 L3 Hardware Security&lt;br&gt;Token Cryptographic Sign &amp;amp; Verify&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1140" y="316" width="240" height="80" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 3: ORCHESTRATION & REASONING MESH (TWO 500px/520px UNITS, 280px GAP) -->
    <!-- ========================================================================= -->
    <mxCell id="node_3_orchestrator" value="&lt;b style='font-size:13.5px;color:#6B21A8;'&gt;[3] Router / GKE Master Orchestrator&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#581C87;'&gt;LangGraph Multi-Agent State Machine &amp;bull; GKE Autopilot Pod Mesh &amp;bull; Execution Controller&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="80" y="506" width="500" height="88" as="geometry" />
    </mxCell>

    <mxCell id="node_3a_gemini" value="&lt;b style='font-size:13.5px;color:#9D174D;'&gt;[3a] Vertex AI Gemini 1.5 Pro (Reasoning Engine)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#831843;'&gt;Cognitive Multi-Modal Reasoning &amp;bull; Dynamic Context Grounding &amp;bull; Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="860" y="506" width="520" height="88" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 4: CACHE, VECTOR STORE & ACID PERSISTENCE (160px WIDE GAPS)          -->
    <!-- ========================================================================= -->
    <mxCell id="node_4_vector" value="&lt;b style='font-size:12.5px;color:#065F46;'&gt;[4] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;ScaNN Approx Nearest Neighbor&lt;br&gt;768-dim Embeddings &amp;bull; Sub-5ms Recall&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="80" y="706" width="220" height="88" as="geometry" />
    </mxCell>

    <mxCell id="node_5_redis" value="&lt;b style='font-size:13px;color:#065F46;'&gt;[5] Redis MemoryStore&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;Distributed Session Cache &amp;bull; Sub-ms Idempotency Token Engine&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="460" y="706" width="520" height="88" as="geometry" />
    </mxCell>

    <mxCell id="node_6_cloudsql" value="&lt;b style='font-size:12.5px;color:#1E40AF;'&gt;[6] Cloud SQL (PostgreSQL HA)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Multi-AZ Standby ACID Ledger&lt;br&gt;Financial Immutability&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1140" y="706" width="240" height="88" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 5: ASYNCHRONOUS EVENT BUS & QUEUING (CENTERED 520px, 160px DLQ GAP)  -->
    <!-- ========================================================================= -->
    <mxCell id="node_7_pubsub" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;[7] Google Cloud Pub/Sub Distributed Event Mesh&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Topic: orders.created.v1 &amp;bull; Partitioned High-Throughput Event Stream for Agent Coordination&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="460" y="905" width="520" height="75" as="geometry" />
    </mxCell>

    <mxCell id="node_7a_dlq" value="&lt;b style='font-size:12px;color:#6B21A8;'&gt;[7a] Dead-Letter Queue (DLQ)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#581C87;'&gt;Poison-Pill Quarantine Bus&lt;br&gt;Exponential Backoff Replay&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1140" y="905" width="200" height="75" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 6: ASYNC AGENTS & LAKEHOUSE (BALANCED 4-COLUMN UNITS)                -->
    <!-- ========================================================================= -->
    <mxCell id="node_8_chunking" value="&lt;b style='font-size:12.5px;color:#9F1239;'&gt;[8] Document Chunking Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#881337;'&gt;OCR Document Parser&lt;br&gt;Token Sliding Window Normalization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="80" y="1086" width="220" height="88" as="geometry" />
    </mxCell>

    <mxCell id="node_9_embedding" value="&lt;b style='font-size:13px;color:#9F1239;'&gt;[9] Embedding &amp;amp; Fraud Scoring Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#881337;'&gt;Vertex AI Text-Embedding-004 Worker &amp;bull; Real-Time Risk Anomaly &amp;amp; Fraud Scorer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="460" y="1086" width="520" height="88" as="geometry" />
    </mxCell>

    <mxCell id="node_10_bigquery" value="&lt;b style='font-size:12.5px;color:#155E75;'&gt;[10] BigQuery Lakehouse &amp;amp; GCS&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#0E7490;'&gt;Partitioned Analytics Lakehouse&lt;br&gt;WORM Immutable Cold Storage&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#CFFAFE;strokeColor=#0891B2;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1140" y="1086" width="240" height="88" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 7: SRE OBSERVABILITY & INCIDENT HUB (FULL 1380px SYMMETRIC SPREAD)   -->
    <!-- ========================================================================= -->
    <mxCell id="node_11_telemetry" value="&lt;b style='font-size:13px;color:#1E293B;'&gt;[11] Cloud Operations Suite (SRE Telemetry Hub)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;OpenTelemetry Collector &amp;bull; Cloud Trace Distributed APM &amp;bull; Cloud Logging Unified Sink&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="80" y="1276" width="640" height="75" as="geometry" />
    </mxCell>

    <mxCell id="node_12_sre" value="&lt;b style='font-size:12.5px;color:#1E293B;'&gt;[12] PagerDuty SRE Hub&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;SLO Error Budget Monitoring&lt;br&gt;Automated Incident Escalation &amp;amp; Pager&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="960" y="1276" width="420" height="75" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- FLOW ARROWS & LABELS (ZERO-COLLISION IN OPEN AIR CHANNELS)                -->
    <!-- ========================================================================= -->

    <!-- Flow 1: Client -> DNS (140px Open Gap) -->
    <mxCell id="flow_1" value="&lt;b style='color:#0284C7;'&gt;1. Resolve VIP&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1_client" target="node_1a_dns">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 1a: DNS -> WAF (140px Open Gap) -->
    <mxCell id="flow_1a" value="&lt;b style='color:#0284C7;'&gt;1a. DDoS Filter&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1a_dns" target="node_1b_waf">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 1b: WAF -> GSLB (140px Open Gap) -->
    <mxCell id="flow_1b" value="&lt;b style='color:#0284C7;'&gt;1b. Route Ingress&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1b_waf" target="node_1c_gslb">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 2: GSLB -> Apigee (Open Inter-Tier Channel at y=255) -->
    <mxCell id="flow_2" value="&lt;b style='color:#B45309;'&gt;2. HTTPS User Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_1c_gslb" target="node_2_apigee">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1270" y="255" />
          <mxPoint x="720" y="255" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 2a: Apigee -> KMS (160px Open Gap) -->
    <mxCell id="flow_2a" value="&lt;b style='color:#B45309;'&gt;2a. Verify JWT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2a_kms">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 2b: Apigee -> SIEM Reject (160px Open Gap) -->
    <mxCell id="flow_2b" value="&lt;b style='color:#B91C1C;'&gt;2b. Invalid Token (401/429)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EF4444;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2b_reject">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 3: Apigee -> Orchestrator (Open Inter-Tier Channel at y=448) -->
    <mxCell id="flow_3" value="&lt;b style='color:#6B21A8;'&gt;3. Auth'd &amp;amp; PII-Scrubbed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.68;entryY=0;" edge="1" parent="1" source="node_2_apigee" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="720" y="448" />
          <mxPoint x="420" y="448" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 4: Orchestrator <-> Gemini 1.5 Pro (280px Wide Open Corridor) -->
    <mxCell id="flow_4_fwd" value="&lt;b style='color:#9D174D;'&gt;4. Context Prompt&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=1;exitY=0.32;entryX=0;entryY=0.32;" edge="1" parent="1" source="node_3_orchestrator" target="node_3a_gemini">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_4_back" value="&lt;b style='color:#9D174D;'&gt;4a. CoT Synthesis&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0;exitY=0.68;entryX=1;entryY=0.68;" edge="1" parent="1" source="node_3a_gemini" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 5: Orchestrator -> Vector Search (Open Vertical Drop at y=638) -->
    <mxCell id="flow_5" value="&lt;b style='color:#065F46;'&gt;5. Vector Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.22;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_4_vector">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 6: Orchestrator -> Redis (Open Vertical Drop at y=638) -->
    <mxCell id="flow_6" value="&lt;b style='color:#065F46;'&gt;6. Read/Write State&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.84;exitY=1;entryX=0.12;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_5_redis">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 7: Orchestrator -> Cloud SQL (Open Inter-Tier Channel at y=638) -->
    <mxCell id="flow_7" value="&lt;b style='color:#1E40AF;'&gt;7. ACID Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.94;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_6_cloudsql">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="550" y="638" />
          <mxPoint x="1260" y="638" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 8: Redis -> Pub/Sub (Straight Vertical Drop at x=720) -->
    <mxCell id="flow_8" value="&lt;b style='color:#1E40AF;'&gt;8. Publish tasks for Agents&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_5_redis" target="node_7_pubsub">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 8a: Pub/Sub -> DLQ (160px Open Gap) -->
    <mxCell id="flow_8a" value="&lt;b style='color:#6B21A8;'&gt;8a. DLQ Quarantine&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=9.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_7_pubsub" target="node_7a_dlq">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 9: Pub/Sub -> Chunking Agent (Label centered on vertical drop at y=1035) -->
    <mxCell id="flow_9" value="&lt;b style='color:#9F1239;'&gt;9. Ingest Task&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_8_chunking">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="190" y="942" />
        </Array>
        <mxPoint x="0" y="45" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 10: Pub/Sub -> Embedding Agent (Straight Vertical Drop at x=720) -->
    <mxCell id="flow_10" value="&lt;b style='color:#9F1239;'&gt;10. Embed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_9_embedding">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 11: Cloud SQL -> BigQuery (100% UNINTERRUPTED HIGHWAY AT x=1260) -->
    <mxCell id="flow_11" value="&lt;b style='color:#155E75;'&gt;11. Datastream CDC Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0891B2;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0891B2;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_6_cloudsql" target="node_10_bigquery">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="0" y="-85" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 12: Embedding Agent -> Vector Search (Dedicated Highway at x=380, Label at y=800 in Tier 4/5 Open Gap) -->
    <mxCell id="flow_12" value="&lt;b style='color:#065F46;'&gt;12. Upsert 768d Vectors&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_9_embedding" target="node_4_vector">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="380" y="1130" />
          <mxPoint x="380" y="750" />
        </Array>
        <mxPoint x="0" y="-120" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 13: Orchestrator -> Telemetry Hub (Dedicated Leftmost Corridor at x=55) -->
    <mxCell id="flow_13" value="&lt;b style='color:#1E293B;'&gt;13. OTel Traces &amp;amp; Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.8;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_11_telemetry">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="55" y="576" />
          <mxPoint x="55" y="1313" />
        </Array>
        <mxPoint x="0" y="340" as="offset" />
      </mxGeometry>
    </mxCell>

    <!-- Flow 14: Telemetry -> PagerDuty SRE (240px Wide Open Space) -->
    <mxCell id="flow_14" value="&lt;b style='color:#1E293B;'&gt;14. SLO Breach Alert&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_11_telemetry" target="node_12_sre">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 15: Response Back to Client (Routes via Left Margin at x=65, Label squarely in Open Channel at y=248) -->
    <mxCell id="flow_15_return" value="&lt;b style='color:#15803D;'&gt;15. Signed 200 OK Response&lt;br&gt;(Sub-45ms SLA)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.35;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_3_orchestrator" target="node_1_client">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="65" y="537" />
          <mxPoint x="65" y="248" />
          <mxPoint x="190" y="248" />
        </Array>
        <mxPoint x="67" y="-69" as="offset" />
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel>`;
}
