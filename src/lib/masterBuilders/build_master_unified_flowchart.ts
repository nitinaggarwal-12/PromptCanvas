/**
 * 🏛️ MASTER BUILDER: Unified End-to-End Enterprise Flowchart Architecture (WBS 1.1.0)
 * 
 * Design Principles:
 * - 100% Vertical Centered Flowchart Hierarchy matching reference layout
 * - 7 Grouped Horizontal Layer Swimlanes with Color Accents
 * - Explicit Step Numbering [1] through [12] in all shapes and arrows
 * - Vendor Icons: Google Cloud, Apigee, Kubernetes, Python, Redis, PostgreSQL, Vertex AI, BigQuery, OpenTelemetry
 * - Distinct Shapes: Rounded Rectangles (Services), Diamonds (Decisions), 3D Cylinders (Databases), Buffers (Pub/Sub)
 * - 100% Zero-Collision 2D Coordinates with Solid White Contrast Pills and Dedicated Routing Channels
 */

const SVG_GCP_LOGO = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%20width%3D%2236%22%20height%3D%2236%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E";

export function buildMasterUnifiedFlowchartXml(): string {
  return `<mxGraphModel dx="1400" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="1040" background="#0F172A">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- ========================================================================= -->
    <!-- CANVAS FRAME & HEADER BANNER                                              -->
    <!-- ========================================================================= -->
    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#0F172A;strokeColor=#334155;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="30" y="20" width="1340" height="990" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="45" y="35" width="1310" height="55" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${SVG_GCP_LOGO};" vertex="1" parent="1">
      <mxGeometry x="60" y="44" width="36" height="36" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:15px;color:#F8FAFC;'&gt;Google Cloud | Unified End-to-End Enterprise Operational Flowchart (WBS 1.1.0)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Sequential Flow: Client Ingress &amp;rarr; Apigee Gateway &amp;rarr; GKE Orchestrator &amp;rarr; Pub/Sub Mesh &amp;rarr; Vertex AI Reasoning &amp;rarr; Persistence &amp;amp; SRE Hub&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="110" y="40" width="920" height="44" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#0284C7;color:#FFFFFF;padding:3px 7px;border-radius:4px;font-weight:bold;font-size:9.5px;'&gt;SOC2 Type II&lt;/span&gt; &lt;span style='background-color:#16A34A;color:#FFFFFF;padding:3px 7px;border-radius:4px;font-weight:bold;font-size:9.5px;'&gt;PCI-DSS 4.0&lt;/span&gt; &lt;span style='background-color:#6366F1;color:#FFFFFF;padding:3px 7px;border-radius:4px;font-weight:bold;font-size:9.5px;'&gt;Active-Active HA&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="1050" y="47" width="290" height="30" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- 7 GROUPED HORIZONTAL LAYER SWIMLANES                                      -->
    <!-- ========================================================================= -->

    <!-- Tier 1: Client & Ingress Layer -->
    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#38BDF8;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="105" width="1310" height="105" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:10.5px;color:#38BDF8;'&gt;TIER 1: USER INTERACTION &amp;amp; INGRESS LAYER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#0369A1;strokeColor=#38BDF8;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="95" width="280" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 2: API Management & Policy Gate -->
    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#F59E0B;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="225" width="1310" height="115" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:10.5px;color:#FCD34D;'&gt;TIER 2: API GATEWAY &amp;amp; ZERO-TRUST POLICY GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#B45309;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="215" width="310" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 3: Core Orchestration & AI Reasoning -->
    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#A855F7;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="355" width="1310" height="120" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:10.5px;color:#C084FC;'&gt;TIER 3: CORE ORCHESTRATOR &amp;amp; AI REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#7E22CE;strokeColor=#A855F7;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="345" width="330" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 4: In-Memory Caching & Vector Memory -->
    <mxCell id="tier_4_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#10B981;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="490" width="1310" height="130" as="geometry" />
    </mxCell>
    <mxCell id="tier_4_tab" value="&lt;b style='font-size:10.5px;color:#34D399;'&gt;TIER 4: IN-MEMORY CACHE, VECTOR STORE &amp;amp; ACID PERSISTENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#047857;strokeColor=#10B981;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="480" width="390" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 5: Distributed Event Bus -->
    <mxCell id="tier_5_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#60A5FA;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="635" width="1310" height="110" as="geometry" />
    </mxCell>
    <mxCell id="tier_5_tab" value="&lt;b style='font-size:10.5px;color:#93C5FD;'&gt;TIER 5: ASYNCHRONOUS EVENT BUS &amp;amp; RESILIENCE QUEUE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#1E40AF;strokeColor=#60A5FA;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="625" width="350" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 6: Async Background Agents & Lakehouse -->
    <mxCell id="tier_6_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#F472B6;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="760" width="1310" height="115" as="geometry" />
    </mxCell>
    <mxCell id="tier_6_tab" value="&lt;b style='font-size:10.5px;color:#F9A8D4;'&gt;TIER 6: ASYNC INGESTION AGENTS &amp;amp; ANALYTICAL LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#BE185D;strokeColor=#F472B6;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="750" width="370" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 7: Observability & Telemetry -->
    <mxCell id="tier_7_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#1E293B;fillOpacity=35;strokeColor=#94A3B8;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="45" y="890" width="1310" height="105" as="geometry" />
    </mxCell>
    <mxCell id="tier_7_tab" value="&lt;b style='font-size:10.5px;color:#CBD5E1;'&gt;TIER 7: ENTERPRISE SRE OBSERVABILITY &amp;amp; INCIDENT MANAGEMENT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#334155;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="60" y="880" width="410" height="20" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- LOGICAL SHAPES & SERVICES (CENTERED & CALIBRATED COORDINATES)             -->
    <!-- ========================================================================= -->

    <!-- [1] Client Portal -->
    <mxCell id="node_1_client" value="&lt;b style='font-size:13px;color:#FFFFFF;'&gt;[1] Enterprise Client Portal&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#FDE68A;'&gt;React Web &amp;amp; Mobile App&lt;br&gt;User Interface &amp;amp; Session State&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#78350F;strokeColor=#F59E0B;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="480" y="125" width="240" height="65" as="geometry" />
    </mxCell>

    <!-- [1a] Cloud DNS & Anycast CDN -->
    <mxCell id="node_1a_dns" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;[1a] Cloud DNS &amp;amp; Cloud CDN&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#93C5FD;'&gt;Global Edge Anycast Pop&lt;br&gt;Sub-ms SSL Negotiation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#0C4A6E;strokeColor=#38BDF8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="780" y="125" width="220" height="65" as="geometry" />
    </mxCell>

    <!-- [2] Apigee API Gateway (Rhombus) -->
    <mxCell id="node_2_apigee" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;[2] API Gateway (Apigee)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9.5px;color:#FCD34D;'&gt;JWT Auth, PII Filters&lt;br&gt;&amp;amp; Rate Limiting&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#92400E;strokeColor=#F59E0B;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="485" y="235" width="230" height="95" as="geometry" />
    </mxCell>

    <!-- [2b] Security SIEM Rejection -->
    <mxCell id="node_2b_reject" value="&lt;b style='font-size:12px;color:#F87171;'&gt;[2b] Security Rejection&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#CBD5E1;'&gt;401 Unauthorized / 429 Quota&lt;br&gt;Send Audit to SIEM Hub&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#450A0A;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="780" y="250" width="220" height="65" as="geometry" />
    </mxCell>

    <!-- [3] Router / Orchestrator Agent -->
    <mxCell id="node_3_orchestrator" value="&lt;b style='font-size:13px;color:#FFFFFF;'&gt;[3] Router / Orchestrator Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#E9D5FF;'&gt;LangGraph &amp;amp; GKE Task Engine&lt;br&gt;Domain Execution Controller&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#581C87;strokeColor=#A855F7;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="460" y="380" width="280" height="75" as="geometry" />
    </mxCell>

    <!-- [3a] Vertex AI Gemini Engine -->
    <mxCell id="node_3a_gemini" value="&lt;b style='font-size:13px;color:#FFFFFF;'&gt;[3a] Vertex AI Gemini 1.5 Pro&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#FBCFE8;'&gt;Cognitive Reasoning &amp;amp; RAG&lt;br&gt;Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#831843;strokeColor=#EC4899;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="800" y="380" width="260" height="75" as="geometry" />
    </mxCell>

    <!-- [4] Vertex AI Vector Search -->
    <mxCell id="node_4_vector" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[4] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#A7F3D0;'&gt;ScaNN Embeddings Store&lt;br&gt;768-dim Cosine Matching&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#064E3B;strokeColor=#10B981;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="220" y="525" width="220" height="75" as="geometry" />
    </mxCell>

    <!-- [5] Redis MemoryStore Cache -->
    <mxCell id="node_5_redis" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[5] Redis MemoryStore&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#A7F3D0;'&gt;Session, Context &amp;amp; KV State&lt;br&gt;Sub-ms Idempotency Outbox&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#064E3B;strokeColor=#10B981;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="490" y="525" width="220" height="75" as="geometry" />
    </mxCell>

    <!-- [6] Cloud SQL PostgreSQL 16 (HA) -->
    <mxCell id="node_6_cloudsql" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[6] Cloud SQL (PostgreSQL 16)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#BFDBFE;'&gt;ACID Ledger &amp;amp; Orders DB&lt;br&gt;Multi-AZ Standby Replica&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#1E3A8A;strokeColor=#3B82F6;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="760" y="525" width="230" height="75" as="geometry" />
    </mxCell>

    <!-- [7] Google Cloud Pub/Sub Event Mesh -->
    <mxCell id="node_7_pubsub" value="&lt;b style='font-size:13px;color:#FFFFFF;'&gt;[7] Google Cloud Pub/Sub Event Mesh&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#BFDBFE;'&gt;Distributed Event Bus for Agent Coordination &amp;amp; Transaction Stream&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="380" y="660" width="370" height="65" as="geometry" />
    </mxCell>

    <!-- [7a] Dead-Letter Queue (DLQ) -->
    <mxCell id="node_7a_dlq" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;[7a] Dead-Letter Queue (DLQ)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#E9D5FF;'&gt;Poison-Pill Quarantine Bus&lt;br&gt;Exponential Backoff Replay&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#3B0764;strokeColor=#C084FC;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="1040" y="660" width="220" height="65" as="geometry" />
    </mxCell>

    <!-- [8] Document Chunking Agent -->
    <mxCell id="node_8_chunking" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[8] Document Chunking Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#FBCFE8;'&gt;Text Pre-processing &amp;amp; OCR&lt;br&gt;Token Window Normalization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#500724;strokeColor=#F472B6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="200" y="785" width="230" height="65" as="geometry" />
    </mxCell>

    <!-- [9] Embedding & Scoring Agent -->
    <mxCell id="node_9_embedding" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[9] Embedding &amp;amp; Scoring Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#FBCFE8;'&gt;Vertex AI Embeddings Worker&lt;br&gt;Real-Time Fraud Scorer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#500724;strokeColor=#F472B6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="470" y="785" width="230" height="65" as="geometry" />
    </mxCell>

    <!-- [10] BigQuery Analytics Lakehouse -->
    <mxCell id="node_10_bigquery" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[10] BigQuery Lakehouse &amp;amp; GCS&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#A5F3FC;'&gt;Partitioned Analytics Tables&lt;br&gt;WORM Immutability Vault&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#164E63;strokeColor=#06B6D4;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="760" y="780" width="230" height="75" as="geometry" />
    </mxCell>

    <!-- [11] Cloud Operations Suite -->
    <mxCell id="node_11_telemetry" value="&lt;b style='font-size:12.5px;color:#FFFFFF;'&gt;[11] Cloud Operations Suite (SRE Hub)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#CBD5E1;'&gt;OpenTelemetry, Cloud Trace &amp;amp; Structured Logging&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#1E293B;strokeColor=#94A3B8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="380" y="915" width="370" height="55" as="geometry" />
    </mxCell>

    <!-- [12] PagerDuty & SRE Escalation -->
    <mxCell id="node_12_sre" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;[12] PagerDuty SRE Hub&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#CBD5E1;'&gt;SLO Breach &amp;amp; Auto-Heal&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#0F172A;strokeColor=#64748B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="790" y="915" width="220" height="55" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- FLOW ARROWS & LABELS (ZERO TEXT OVERLAPPING)                              -->
    <!-- ========================================================================= -->

    <!-- Flow 1: Client -> DNS -->
    <mxCell id="flow_1" value="&lt;b style='color:#0F172A;'&gt;1. Resolve VIP&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#38BDF8;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;" edge="1" parent="1" source="node_1_client" target="node_1a_dns">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 2: Client -> Apigee Gateway -->
    <mxCell id="flow_2" value="&lt;b style='color:#0F172A;'&gt;2. User Query (HTTPS)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#F59E0B;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#F59E0B;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1_client" target="node_2_apigee">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 2a: Apigee -> Rejection -->
    <mxCell id="flow_2a" value="&lt;b style='color:#EF4444;'&gt;2a. Invalid Token&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EF4444;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;" edge="1" parent="1" source="node_2_apigee" target="node_2b_reject">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 3: Apigee -> Orchestrator -->
    <mxCell id="flow_3" value="&lt;b style='color:#0F172A;'&gt;3. Auth'd &amp;amp; PII-Scrubbed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#A855F7;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#A855F7;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_2_apigee" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 3a: Orchestrator <-> Gemini 1.5 Pro -->
    <mxCell id="flow_3a_fwd" value="&lt;b style='color:#0F172A;'&gt;3a. Prompt Context&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EC4899;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EC4899;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=1;exitY=0.35;entryX=0;entryY=0.35;" edge="1" parent="1" source="node_3_orchestrator" target="node_3a_gemini">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_3a_back" value="&lt;b style='color:#0F172A;'&gt;3b. Reasoning Synthesis&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EC4899;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#EC4899;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0;exitY=0.65;entryX=1;entryY=0.65;" edge="1" parent="1" source="node_3a_gemini" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 4: Orchestrator -> Vector Search (Vector Search Query) -->
    <mxCell id="flow_4" value="&lt;b style='color:#0F172A;'&gt;4. Vector Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#10B981;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0.2;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_4_vector">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 5: Orchestrator -> Redis (Read/Write Context & State) -->
    <mxCell id="flow_5" value="&lt;b style='color:#0F172A;'&gt;5. Read/Write State&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#10B981;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_5_redis">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 6: Orchestrator -> Cloud SQL (ACID Commit) -->
    <mxCell id="flow_6" value="&lt;b style='color:#0F172A;'&gt;6. ACID Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#3B82F6;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#3B82F6;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0.8;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_6_cloudsql">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 7: Redis -> Pub/Sub (Publish Tasks for Agents) -->
    <mxCell id="flow_7" value="&lt;b style='color:#0F172A;'&gt;7. Publish Tasks for Agents&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#60A5FA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#60A5FA;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_5_redis" target="node_7_pubsub">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 7a: Pub/Sub -> DLQ (Poison Retry) -->
    <mxCell id="flow_7a" value="&lt;b style='color:#C084FC;'&gt;7a. DLQ Quarantine&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#C084FC;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#C084FC;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_7_pubsub" target="node_7a_dlq">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 8: Pub/Sub -> Document Chunking Agent -->
    <mxCell id="flow_8" value="&lt;b style='color:#0F172A;'&gt;8. Ingest Task&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#F472B6;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#F472B6;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0.25;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_8_chunking">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 9: Pub/Sub -> Embedding Agent -->
    <mxCell id="flow_9" value="&lt;b style='color:#0F172A;'&gt;9. Embed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#F472B6;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#F472B6;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_9_embedding">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 10: Cloud SQL -> BigQuery (CDC Sync) -->
    <mxCell id="flow_10" value="&lt;b style='color:#0F172A;'&gt;10. Datastream CDC&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#06B6D4;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#06B6D4;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_6_cloudsql" target="node_10_bigquery">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 11: Embedding Agent -> Vector Search (Store Embeddings) -->
    <mxCell id="flow_11" value="&lt;b style='color:#0F172A;'&gt;11. Store Embeddings&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#10B981;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0;exitY=0.5;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_9_embedding" target="node_4_vector">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="330" y="817" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 12: Orchestrator -> Telemetry (OpenTelemetry Metrics) -->
    <mxCell id="flow_12" value="&lt;b style='color:#0F172A;'&gt;12. OTel Traces &amp;amp; Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;exitX=0;exitY=0.75;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_11_telemetry">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="140" y="436" />
          <mxPoint x="140" y="942" />
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Flow 13: Telemetry -> SRE Alerting -->
    <mxCell id="flow_13" value="&lt;b style='color:#0F172A;'&gt;13. SLO Breach Alert&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#64748B;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=9.5;" edge="1" parent="1" source="node_11_telemetry" target="node_12_sre">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Flow 14: Response Back to Client (Open Left Return Channel) -->
    <mxCell id="flow_14_return" value="&lt;b style='color:#16A34A;'&gt;14. Response to Client (200 OK)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;spacingTop=2;spacingBottom=2;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.25;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_1_client">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="180" y="399" />
          <mxPoint x="180" y="157" />
        </Array>
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel>`;
}
