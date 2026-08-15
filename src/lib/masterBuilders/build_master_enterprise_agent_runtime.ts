export function buildEnterpriseAgentRuntimeXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="enterprise_agent_runtime_platform" name="Enterprise Agent Runtime Platform (P4-AI-P-03)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🤖&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud PHYSICAL RUNTIME: ENTERPRISE AGENT EXECUTION PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Physical Compute Infrastructure: GKE Autopilot Sandboxed Pods, Agent Gateway, MCP Tool Workers, Model Armor &amp;amp; Vertex AI TPU Serving&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Inference Core&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: Client Ingress & Agent Gateway -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🚪 Ingress &amp;amp; Agent Gateway Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_user_clients" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Enterprise Clients &amp;amp; IDEs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Web App, Slack/Teams Bots, REST/gRPC&lt;br&gt;BeyondCorp Context-Aware Access&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_agent_gateway" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Google Cloud Agent Gateway&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#1D4ED8;&quot;&gt;Apigee AI Gateway + Envoy Ingress&lt;br&gt;Token Bucket Rate Limiter &amp;amp; Auth Token Validation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="225" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_model_armor_filter" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Model Armor Security Interceptor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Prompt Injection &amp;amp; Jailbreak Blocking&lt;br&gt;Real-Time PII Masking via Cloud DLP&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="345" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_session_state" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Memorystore Redis Cluster&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Short-Term Conversation Scratchpad&lt;br&gt;Session State TTL &amp;amp; ReAct Scratchpad Cache&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="455" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: GKE Autopilot Sandboxed Agent Runtime Core -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;⚙️ GKE Autopilot Sandboxed Agent Mesh&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_orchestrator_pod" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Parent Orchestrator Pod (ADK 2.0)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#15803D;&quot;&gt;Agentic Plan-and-Solve Loop Coordinator&lt;br&gt;Dynamic Sub-Agent Task Dispatcher&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_domain_subagents" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Domain Sub-Agent Workers (gVisor)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;• SQL Query Synthesis Agent&lt;br&gt;• Deep Research &amp;amp; Retrieval Agent&lt;br&gt;• Action &amp;amp; Ticket Execution Agent&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="235" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_mcp_host_containers" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Model Context Protocol (MCP) Host&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Normalized Tool Invocation RPC Bus&lt;br&gt;Secret Manager Token Injector&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="355" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_critic_reflection" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Critic &amp;amp; Reflection Verification Pod&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Output Quality Scoring &amp;amp; Hallucination Check&lt;br&gt;Re-Prompt Loop on Low Confidence Score&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="465" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Vertex AI Model Serving & Hardware Acceleration -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="685" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;⚡ Vertex AI TPU / GPU Acceleration Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="695" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_flash_endpoint" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Gemini 3.7 Flash Private Endpoint&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#7E22CE;&quot;&gt;High-Throughput Sub-100ms Inference&lt;br&gt;1M+ Token Context Window with System Prompt&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="115" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_vector_search" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Vector Search (ScaNN)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Billion-Scale Embeddings Index&lt;br&gt;Dense/Sparse Hybrid Semantic Search&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="235" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_tpu_v5e_slice" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud TPU v5e Dedicated Slices&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Custom Fine-Tuned Embedding Serving&lt;br&gt;Lowest Cost-per-Token Inference Ratio&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="345" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_feature_store" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Feature Store &amp;amp; Grounding&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time Entity State Retrieval&lt;br&gt;Google Search &amp;amp; Enterprise DB Grounding&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="455" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: Enterprise Tool Proxies & Data Lakehouse -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1040" y="65" width="320" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;🔌 Enterprise Tools &amp;amp; Persistence&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="72" width="300" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_saas_tools" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Enterprise Action Proxies&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;• Salesforce / SAP ERP Connectors&lt;br&gt;• Jira / ServiceNow ITSM Actions&lt;br&gt;• GitHub / GitLab CI/CD Triggers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="115" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_lakehouse" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;BigQuery Enterprise Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Audit Logs, Token Costs &amp;amp; Execution Traces&lt;br&gt;Vector Embedding Grounding Store&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="235" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_spanner_graph" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Spanner Graph&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Persistent Long-Term Semantic Memory&lt;br&gt;Multi-Tenant Graph Topology &amp;amp; RLS&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="345" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_artifact_registry" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;Artifact Registry &amp;amp; Binary Auth&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Digitally Signed Agent Container Images&lt;br&gt;Vulnerability Scanning on Push&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="455" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_user_clients" target="node_agent_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_agent_gateway" target="node_orchestrator_pod">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_orchestrator_pod" target="node_domain_subagents">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=2;" edge="1" parent="1" source="node_domain_subagents" target="node_gemini_flash_endpoint">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_domain_subagents" target="node_mcp_host_containers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_mcp_host_containers" target="node_saas_tools">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#15803D;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_critic_reflection" target="node_orchestrator_pod">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Platform Architecture:&lt;/b&gt; 🔵 Agent Gateway &amp;amp; Model Armor &amp;nbsp;|&amp;nbsp; 🟢 GKE Sandboxed Microservice Runtime &amp;nbsp;|&amp;nbsp; 🟣 Vertex AI Gemini 3.7 Flash Inference &amp;nbsp;|&amp;nbsp; 🟡 MCP Normalized Tool Execution &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
