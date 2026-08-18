export function buildAgenticRagWidescreenXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="agentic_rag_master" name="Cognitive Architecture (Agentic RAG)">
    <mxGraphModel dx="1740" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="top_cloud_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🧠 ☁️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;ENTERPRISE COGNITIVE ARCHITECTURE &amp;amp; AGENTIC RAG PLATFORM (P4-AI-L-01)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Production Architecture: Multimodal Ingress, Vertex AI Multi-Agent ReAct Reasoner, Hybrid Vector/Graph RAG Mesh, Sandboxed MCP Tools &amp;amp; Enterprise Governance&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="top_gemini_brand" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Pro&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Reasoning &amp;amp; Tool Core&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="180" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 1: THE INTERFACE (USER INTERACTION) ==================== -->
        <mxCell id="zone_1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="340" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="zone_1_hdr" value="&lt;b style=&quot;font-size:12px;color:#1E3A8A;&quot;&gt;Zone 1: The Interface &amp;amp; User Ingress&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="330" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_ui_channels" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;📱&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Multi-Channel Ingress Client&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;Web App, Mobile SDK, Slack/Teams Bot, Voice SDK&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="300" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="user_chat" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:26px;width:44px;text-align:center;color:#2563EB;&quot;&gt;💬&lt;/td&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Agentic Copilot Workspace&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#334155;line-height:1.4;&quot;&gt;• Real-time SSE Token Streaming&lt;br&gt;• Multimodal Uploads (PDF, CSV, Audio)&lt;br&gt;• Dynamic Citations &amp;amp; XAI Tree&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="225" width="300" height="140" as="geometry"/>
        </mxCell>

        <mxCell id="card_ui_sanitization" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;🛡️&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Client-Side Input Sanitizer&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;Prompt Injection Filter, Rate Limiter &amp;amp; DLP Pre-Check&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="55" y="385" width="300" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="card_ui_session_mgr" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;🔑&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Session &amp;amp; Identity Manager&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;OAuth2 / OIDC Token Exchange &amp;amp; Ephemeral State&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="55" y="485" width="300" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="card_ui_feedback" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;👍&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Active User Feedback Collector&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;Inline Rating &amp;amp; RLHF Annotation Dispatcher&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="55" y="585" width="300" height="80" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 2: THE AGENTIC CORE (ORCHESTRATION) ==================== -->
        <mxCell id="zone_2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="415" y="75" width="460" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="zone_2_hdr" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Zone 2: The Agentic Core &amp;amp; Reasoning Engine&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="420" y="82" width="450" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_orchestrator_core" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;border-bottom:1px solid #BFDBFE;padding-bottom:4px;&quot;&gt;☁️ Vertex AI Multi-Agent ReAct Reasoner&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Step-by-Step Chain-of-Thought Decomposition&lt;br&gt;• Dynamic Query Planner &amp;amp; Hybrid Routing&lt;br&gt;• Multi-Agent Collaboration &amp;amp; Consensus Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="435" y="125" width="420" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_memory_subsystem" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:12px;font-weight:bold;color:#0F172A;border-bottom:1px solid #CBD5E1;padding-bottom:4px;&quot;&gt;🧠 Multi-Tier Contextual Memory Subsystem&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;padding:4px;&quot;&gt;&lt;b&gt;Short-Term Working Memory:&lt;/b&gt;&lt;br&gt;In-Memory Window &amp;amp; Entity Scratchpad&lt;/td&gt;&lt;td style=&quot;font-size:10px;color:#334155;padding:4px;&quot;&gt;&lt;b&gt;Long-Term Episodic Memory:&lt;/b&gt;&lt;br&gt;Redis Memorystore / Spanner Graph Store&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="435" y="255" width="420" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_gemini_models" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:12px;font-weight:bold;color:#2563EB;border-bottom:1px solid #BFDBFE;padding-bottom:4px;&quot;&gt;✨ Gemini Foundation Intelligence Grid&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;text-align:center;padding:4px;&quot;&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Gemini 3.7 Pro&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Complex Reasoning&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;text-align:center;padding:4px;&quot;&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Sub-Second Routing&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;text-align:center;padding:4px;&quot;&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Embeddings v2&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;768d Dense Vectors&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="435" y="385" width="420" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 3: HYBRID RAG & KNOWLEDGE RETRIEVAL MESH ==================== -->
        <mxCell id="zone_3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="915" y="75" width="440" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="zone_3_hdr" value="&lt;b style=&quot;font-size:12px;color:#166534;&quot;&gt;Zone 3: Hybrid RAG &amp;amp; Knowledge Retrieval Mesh&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="920" y="82" width="430" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_vector_search" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;🔍 Vertex AI Vector Search (ScaNN)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Billion-Scale Sub-Millisecond ANN Index&lt;br&gt;• Asymmetric Dense Vector Dot-Product&lt;br&gt;• Metadata Filtering &amp;amp; Partition Sharding&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="935" y="125" width="400" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_graph_rag" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;🕸️ Knowledge Graph &amp;amp; Semantic Spanner RAG&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Multi-Hop Entity Relationship Traversal&lt;br&gt;• GraphRAG Community Summarization&lt;br&gt;• Temporal &amp;amp; Lineage Context Grounding&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="935" y="255" width="400" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_reranker" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;⚡ Cross-Encoder Reranker &amp;amp; Context Compressor&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Precision RRF (Reciprocal Rank Fusion)&lt;br&gt;• Deduplication &amp;amp; Dynamic Token Window Pruning&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="935" y="385" width="400" height="90" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 4: TOOLS, EXECUTION & GOVERNANCE ==================== -->
        <mxCell id="zone_4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1395" y="75" width="330" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="zone_4_hdr" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;Zone 4: Tools, Execution &amp;amp; Guardrails&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1400" y="82" width="320" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_sandboxed_tools" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;🛠️ Sandboxed MCP Tools &amp;amp; APIs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Cloud Run Micro-Agent Executors&lt;br&gt;• BigQuery Analytics Connectors&lt;br&gt;• Enterprise ERP / CRM OpenAPI Tools&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1410" y="125" width="300" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_guardrails_rag" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;🛡️ Model Armor &amp;amp; Safety Filter&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Hallucination &amp;amp; Citation Verification&lt;br&gt;• Automated PII Masking &amp;amp; DLP Redaction&lt;br&gt;• Immutable Audit Log Sink&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1410" y="255" width="300" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== CONNECTORS ==================== -->
        <mxCell id="e_ui_to_orch" value="1. Prompt &amp; Session" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="user_chat" target="card_orchestrator_core">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e_orch_to_rag" value="2. Hybrid Semantic Retrieval" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_orchestrator_core" target="card_vector_search">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e_rag_to_rerank" value="3. Fusion &amp; Rerank" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_vector_search" target="card_reranker">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e_rerank_to_orch" value="4. Grounded Context" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_reranker" target="card_gemini_models">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e_orch_to_tools" value="5. Execute Tool" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_gemini_models" target="card_sandboxed_tools">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e_tools_to_guard" value="6. Validate &amp; Mask" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_sandboxed_tools" target="card_guardrails_rag">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e_guard_to_ui" value="7. Stream Response &amp; Citations" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;dashed=1;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_guardrails_rag" target="user_chat">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1560" y="550"/>
              <mxPoint x="205" y="550"/>
            </Array>
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export function buildCognitiveRagXml(): string {
  return buildAgenticRagWidescreenXml();
}
