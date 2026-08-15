export function buildBpmnWorkflowXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="bpmn_process_workflow" name="BPMN 2.0 Enterprise Business Process &amp; Autonomous Workflow">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🔄&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;BPMN 2.0 STANDARD: ENTERPRISE BUSINESS PROCESS &amp;amp; AGENTIC WORKFLOW&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Business Process Model and Notation (BPMN 2.0): User Tasks, Service Tasks, XOR Gateways, Timer Boundary Events &amp;amp; Autonomous Sub-Processes&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Process Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Pool / Outer Participant -->
        <mxCell id="bpmn_pool" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="1335" height="580" as="geometry"/>
        </mxCell>

        <!-- Lane 1: Customer / Business User Lane -->
        <mxCell id="lane1_header" value="&lt;b style=&quot;font-size:11px;color:#1E293B;&quot;&gt;👤 Customer / User Persona Lane&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="30" y="70" width="1325" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="lane1_body" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="100" width="1325" height="160" as="geometry"/>
        </mxCell>

        <mxCell id="bpmn_start_event" value="&lt;b style=&quot;font-size:9.5px;color:#15803D;&quot;&gt;Order Placed&lt;br&gt;(Start Event)&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="60" y="145" width="80" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="task_user_submit" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;👤 User Task: Submit Claim&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Upload Invoice &amp;amp; Fill Form Details&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="190" y="145" width="200" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="task_user_hitl" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;👥 User Task: Manager Review&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;High-Value Claim Manual Approval&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="145" width="220" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="bpmn_end_event" value="&lt;b style=&quot;font-size:9.5px;color:#991B1B;&quot;&gt;Claim Closed&lt;br&gt;(End Event)&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=3;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1230" y="145" width="80" height="80" as="geometry"/>
        </mxCell>

        <!-- Lane 2: Autonomous Agentic Orchestrator Lane -->
        <mxCell id="lane2_header" value="&lt;b style=&quot;font-size:11px;color:#1E293B;&quot;&gt;🤖 Autonomous AI &amp;amp; Gemini 3.7 Orchestrator Lane&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="30" y="270" width="1325" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="lane2_body" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FDF4FF;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="300" width="1325" height="160" as="geometry"/>
        </mxCell>

        <mxCell id="task_gemini_ocr" value="&lt;b style=&quot;font-size:10px;color:#7E22CE;&quot;&gt;⚙️ Service Task: Document AI OCR&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Extract Line Items, Totals &amp;amp; Tax IDs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="190" y="340" width="210" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="task_gemini_fraud" value="&lt;b style=&quot;font-size:10px;color:#7E22CE;&quot;&gt;⚙️ Service Task: Gemini 3.7 Flash Scorer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Fraud Confidence Scoring &amp;amp; Policy Match&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="450" y="340" width="220" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="xor_gateway_risk" value="&lt;b style=&quot;font-size:14px;color:#0F172A;&quot;&gt;✕&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Risk &amp;gt; $5k?&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="340" width="80" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="task_auto_settle" value="&lt;b style=&quot;font-size:10px;color:#15803D;&quot;&gt;⚙️ Service Task: Auto-Approve&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Instant Settlement &amp;amp; ACH Transfer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="340" width="210" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="xor_join_gateway" value="&lt;b style=&quot;font-size:14px;color:#0F172A;&quot;&gt;✕&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1130" y="340" width="60" height="60" as="geometry"/>
        </mxCell>

        <!-- Lane 3: Core Enterprise Systems & ERP Lane -->
        <mxCell id="lane3_header" value="&lt;b style=&quot;font-size:11px;color:#1E293B;&quot;&gt;🏢 Enterprise Backend &amp;amp; ERP Systems Lane&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="30" y="470" width="1325" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="lane3_body" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFDF5;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="500" width="1325" height="135" as="geometry"/>
        </mxCell>

        <mxCell id="task_sap_posting" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;⚙️ Service Task: SAP ERP Financial Post&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;General Ledger AP Journal Entry (BAPI)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="530" width="220" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="task_notification_dispatcher" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Send Task: Notification Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Email Confirmation &amp;amp; Push Notification&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1130" y="530" width="200" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting BPMN Sequence Flows -->
        <mxCell id="flow1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="bpmn_start_event" target="task_user_submit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="task_user_submit" target="task_gemini_ocr">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=2;" edge="1" parent="1" source="task_gemini_ocr" target="task_gemini_fraud">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=2;" edge="1" parent="1" source="task_gemini_fraud" target="xor_gateway_risk">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow5_yes" value="&lt;span style=&quot;font-size:8.5px;color:#B91C1C;font-weight:bold;&quot;&gt;High Risk&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;" edge="1" parent="1" source="xor_gateway_risk" target="task_user_hitl">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow5_no" value="&lt;span style=&quot;font-size:8.5px;color:#15803D;font-weight:bold;&quot;&gt;Low Risk&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="xor_gateway_risk" target="task_auto_settle">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="task_user_hitl" target="task_auto_settle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="830" y="185"/>
              <mxPoint x="830" y="380"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="flow7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="task_auto_settle" target="task_sap_posting">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="task_sap_posting" target="task_notification_dispatcher">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="flow9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="task_notification_dispatcher" target="bpmn_end_event">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;BPMN 2.0 Standard:&lt;/b&gt; 🟢 Start Event &amp;nbsp;|&amp;nbsp; 👤 User Task &amp;nbsp;|&amp;nbsp; ⚙️ Service Task (Gemini 3.7 AI) &amp;nbsp;|&amp;nbsp; ✕ XOR Gateway Split/Join &amp;nbsp;|&amp;nbsp; 🔴 End Event &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
