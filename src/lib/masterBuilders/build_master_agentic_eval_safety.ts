export function buildEvalSafetyXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="agentic_eval_safety_platform" name="Agentic AI Evaluation, Safety &amp; Optimization Platform (P4-GOV-L-04)">
    <mxGraphModel dx="1720" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1740" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="16" width="1660" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Agentic AI Evaluation, Safety &amp;amp; Optimization Platform (P4-GOV-L-04)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Continuous Safety Guardrails • Automated LLM-as-a-Judge • Closed-Loop Model Calibration • Google Cloud Reference Architecture&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="55" y="18" width="1630" height="50" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: END USER & CLIENT CONTEXT ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="85" width="340" height="880" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:12px;color:#1E3A8A;&quot;&gt;💻 USER &amp;amp; CLIENT CONTEXT&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="92" width="330" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_multimodal_in" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;🎙️&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Multi-modal User Ingress&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;Voice, Text &amp;amp; High-Frequency Telemetry&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="60" y="130" width="300" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="card_ge_app_user" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:4px;&quot;&gt;🌐 Industrial &amp;amp; Field Client&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:26px;width:44px;text-align:center;&quot;&gt;👩‍💼&lt;/td&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;&quot;&gt;• Field Operations Assistant&lt;br&gt;• Real-Time Edge Analytics&lt;br&gt;• Session Token &amp;amp; Device Proofs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="235" width="300" height="130" as="geometry"/>
        </mxCell>

        <mxCell id="card_user_context" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;🛡️&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Armor &amp;amp; LB Ingress Gate&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#64748B;font-weight:normal;&quot;&gt;L7 DDoS Shield • TLS 1.3 Termination&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="60" y="390" width="300" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="card_col1_bottom_telemetry" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;📶&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Device Context Engine&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;Location, Role &amp;amp; Ephemeral JWT Binding&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="60" y="495" width="300" height="85" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: AGENT REGISTRY & SCHEMAS ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="460" y="85" width="340" height="880" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:12px;color:#166534;&quot;&gt;🗄️ AGENT REGISTRY &amp;amp; SCHEMAS&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="465" y="92" width="330" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="box_data_sources" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;📁 Configs &amp;amp; Benchmark Datasets&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• GCS Agent Specs &amp;amp; Tool Manifests&lt;br&gt;• Golden Benchmark Eval Datasets&lt;br&gt;• Schema Registry &amp;amp; Semantic Governance&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="480" y="130" width="300" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="box_agent_registry" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;border-bottom:1px solid #BBF7D0;padding-bottom:4px;&quot;&gt;🗄️ Enterprise Agent Registry&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:6px;&quot;&gt;• Agent Semantic Descriptions &amp;amp; Schemas&lt;br&gt;• Declared Safety Policies &amp;amp; Boundaries&lt;br&gt;• Grounding Knowledge Graph Links&lt;br&gt;• Immutable Version History &amp;amp; Rollback&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="480" y="255" width="300" height="150" as="geometry"/>
        </mxCell>

        <mxCell id="card_reg_update" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;🔄 Version Sync &amp;amp; Calibration&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.3;padding-top:2px;&quot;&gt;Automated Prompt Tuning &amp;amp; Model Registry Updates&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="480" y="430" width="300" height="80" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: VERTEX AI AGENT PLATFORM ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="880" y="85" width="400" height="880" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:12px;color:#92400E;&quot;&gt;✨ VERTEX AI AGENT PLATFORM&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="885" y="92" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_orchestrator" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;🎛️ Multi-Agent Orchestrator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;padding-top:4px;&quot;&gt;Planning, Context Grounding &amp;amp; Tool Execution Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="900" y="130" width="360" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="box_intel_core" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:12px;font-weight:bold;color:#92400E;border-bottom:1px solid #FEF08A;padding-bottom:4px;&quot;&gt;✨ Gemini Intelligence Core&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:6px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Gemini 3.7 Pro&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Deep Reasoning&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:6px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;High Throughput&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:6px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Model Garden&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Domain OSS&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="900" y="240" width="360" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_vertex_search" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 Vertex AI Search &amp;amp; Function Calling&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#2563EB;padding-top:2px;&quot;&gt;Internal Vector Knowledge • External MCP Services&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="900" y="375" width="360" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="card_exec_logs" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;&quot;&gt;📋 Execution Traces &amp;amp; Telemetry Streams&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;padding-top:2px;&quot;&gt;Cloud Logging • OpenTelemetry Spans • Pub/Sub Buffer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="900" y="475" width="360" height="75" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: EVALUATION & SAFETY OPERATIONS ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1360" y="85" width="340" height="880" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;🛡️ EVALUATION, SAFETY &amp;amp; SRE OPS&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1365" y="92" width="330" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_eval_engine" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;⚖️ LLM-as-a-Judge Eval Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.3;padding-top:2px;&quot;&gt;• Factuality, Toxicity &amp;amp; Bias Scoring&lt;br&gt;• Golden Benchmark Automated Evals&lt;br&gt;• Latency &amp;amp; Token Cost Analytics&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1380" y="130" width="300" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_guardrails" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;🛡️ Real-Time Safety Guardrails&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.3;padding-top:2px;&quot;&gt;• Prompt Injection &amp;amp; Jailbreak Defense&lt;br&gt;• Sensitive Data (DLP) Auto-Masking&lt;br&gt;• Real-Time Output Interceptor&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1380" y="265" width="300" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_sre_monitoring" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;📊 SRE &amp;amp; Continuous Telemetry&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.3;padding-top:2px;&quot;&gt;• Cloud Monitoring Dashboards&lt;br&gt;• Automated Rollback Alerts&lt;br&gt;• SLO/SLI Drift Detection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1380" y="400" width="300" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== CLEAN ORTHOGONAL CONNECTORS ==================== -->
        <mxCell id="edge_user_to_ingress" value="1. Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_ge_app_user" target="card_user_context">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_ingress_to_orchestrator" value="2. Validated Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_user_context" target="card_orchestrator">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_registry_to_orchestrator" value="3. Policy &amp; Schema" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_agent_registry" target="card_orchestrator">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_orchestrator_to_core" value="4. Model Inference" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_orchestrator" target="box_intel_core">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_core_to_logs" value="5. Telemetry Logs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_intel_core" target="card_exec_logs">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_logs_to_eval" value="6. Evaluation &amp; Audit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_exec_logs" target="card_eval_engine">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_eval_to_calibration" value="7. Closed-Loop Auto-Tune" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;dashed=1;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_eval_engine" target="card_reg_update">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1530" y="600"/>
              <mxPoint x="630" y="600"/>
            </Array>
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export function buildAgenticEvalSafetyXml(): string {
  return buildEvalSafetyXml();
}
