export function buildBpmnWorkflowXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="bpmn_process_workflow" name="BPMN 2.0 Enterprise Business Process &amp; Autonomous Workflow">
    <mxGraphModel dx="1740" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🔄&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;BPMN 2.0 STANDARD: ENTERPRISE BUSINESS PROCESS &amp;amp; AGENTIC WORKFLOW (P3-APP-P-03)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Business Process Model and Notation (BPMN 2.0): User Tasks, Service Tasks, XOR Gateways, Timer Boundary Events &amp;amp; Autonomous Sub-Processes&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;BPMN Process Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="180" height="44" as="geometry"/>
        </mxCell>

        <!-- Pool / Outer Participant -->
        <mxCell id="bpmn_pool" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="1685" height="910" as="geometry"/>
        </mxCell>

        <!-- Lane 1: Customer / Business User Lane -->
        <mxCell id="lane1_header" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;👤 Customer / User Persona Lane&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="85" width="1665" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="lane1_body" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="45" y="120" width="1665" height="240" as="geometry"/>
        </mxCell>

        <mxCell id="bpmn_start_event" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;Claim Initiated&lt;br&gt;(Start Event)&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="80" y="185" width="90" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="task_user_submit" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;👤 User Task: Submit Claim&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Upload Scanned Receipts &amp;amp; PDFs&lt;br&gt;• Populate Incident &amp;amp; Policy Meta&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="240" y="185" width="280" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="task_user_hitl" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;👥 User Task: Manager Review Gate&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• High-Value Claim Manual Approval&lt;br&gt;• Fraud Score &amp;amp; Anomaly Inspection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="920" y="185" width="280" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="bpmn_end_event" value="&lt;b style=&quot;font-size:11px;color:#991B1B;&quot;&gt;Claim Settled&lt;br&gt;(End Event)&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=3.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1560" y="185" width="90" height="90" as="geometry"/>
        </mxCell>

        <!-- Lane 2: Autonomous Agentic Orchestrator Lane -->
        <mxCell id="lane2_header" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;🤖 Autonomous AI &amp;amp; Gemini 3.7 Orchestrator Lane&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="380" width="1665" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="lane2_body" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FDF4FF;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="45" y="415" width="1665" height="260" as="geometry"/>
        </mxCell>

        <mxCell id="task_gemini_ocr" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#7E22CE;&quot;&gt;⚙️ Service Task: Document AI OCR&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Extract Line Items, Subtotals &amp;amp; Tax IDs&lt;br&gt;• Form Parser &amp;amp; Schema Validation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="240" y="480" width="280" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="task_gemini_fraud" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#7E22CE;&quot;&gt;⚙️ Service Task: Gemini 3.7 Scorer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Fraud Confidence Scoring (0.0 - 1.0)&lt;br&gt;• Policy Coverage &amp;amp; Limit Verification&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="580" y="480" width="280" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="xor_gateway_risk" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;✕&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Risk &amp;gt; $5k?&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="920" y="480" width="100" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="task_auto_settle" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;⚙️ Service Task: Auto-Approve&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Instant Settlement Dispatch&lt;br&gt;• Automated ACH Payment Trigger&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1110" y="480" width="260" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="xor_join_gateway" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;✕&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1440" y="490" width="80" height="80" as="geometry"/>
        </mxCell>

        <!-- Lane 3: Core Enterprise Systems & ERP Lane -->
        <mxCell id="lane3_header" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;🏢 Enterprise Backend &amp;amp; ERP Systems Lane&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="695" width="1665" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="lane3_body" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFDF5;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="45" y="730" width="1665" height="230" as="geometry"/>
        </mxCell>

        <mxCell id="task_sap_posting" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Service Task: SAP ERP Posting&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• General Ledger AP Journal Entry (BAPI)&lt;br&gt;• Multi-Currency Tax Ledger Reconciliation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1110" y="780" width="280" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="task_notification_dispatcher" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;📨 Send Task: Notification Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Customer Email / SMS Settlement Notice&lt;br&gt;• Cloud Pub/Sub Audit Log Broadcast&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1440" y="780" width="260" height="95" as="geometry"/>
        </mxCell>

        <!-- Connecting BPMN Sequence Flows -->
        <mxCell id="flow1" value="1. Form Submit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="bpmn_start_event" target="task_user_submit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow2" value="2. Trigger OCR" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_user_submit" target="task_gemini_ocr">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow3" value="3. Parse Data" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_gemini_ocr" target="task_gemini_fraud">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow4" value="4. Evaluate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_gemini_fraud" target="xor_gateway_risk">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow5" value="[Risk &gt; $5k]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="xor_gateway_risk" target="task_user_hitl">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow6" value="[Approved]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_user_hitl" target="task_auto_settle">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow7" value="[Low Risk]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="xor_gateway_risk" target="task_auto_settle">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow8" value="5. Auto-Approved" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_auto_settle" target="xor_join_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow9" value="6. Post Ledger" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="xor_join_gateway" target="task_sap_posting">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow10" value="7. Send Alert" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_sap_posting" target="task_notification_dispatcher">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="flow11" value="8. Complete" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="task_notification_dispatcher" target="bpmn_end_event">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
