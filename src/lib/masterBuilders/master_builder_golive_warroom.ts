export function buildGoLiveWarRoomRunbookXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="golive_warroom_runbook" name="Go-Live Cutover &amp; War Room Runbook">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🚨 🚀&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;GO-LIVE CUTOVER, WAR ROOM RUNBOOK &amp;amp; AUTOMATED ROLLBACK PROTOCOL&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Day-1 Cutover Execution: Pre-Flight Gate Signoffs $\rightarrow$ Active War Room Comms $\rightarrow$ 5-Step Minute-by-Minute Sequence $\rightarrow$ Automated SRE Rollback Script&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;War Room Lead&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Day-1 Cutover&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: PRE-FLIGHT PREPARATION ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;📋 1. PRE-FLIGHT PREPARATION &amp;amp; CAB GATES&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="box_cicd_prep" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;🚀 Verified CI/CD Release Pipeline&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Tagged SemVer Release &amp;amp; Cosign Attestation&lt;br&gt;• Cloud Deploy Multi-Target Manifests Frozen&lt;br&gt;• Point-in-Time Database Snapshot Verified&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="box_decision_gate" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;⚖️ CAB Go / No-Go Decision Gate&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Change Advisory Board (CAB) Unanimous Sign-Off&lt;br&gt;• Jira / Confluence Minute-by-Minute Runbook Active&lt;br&gt;• SLA Freeze &amp;amp; Escalation Tree Pre-Notified&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="260" width="340" height="125" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: WAR ROOM COMMAND & COMMS ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:12px;color:#B45309;&quot;&gt;🚨 2. LIVE WAR ROOM COMMAND HUB&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="box_war_room_banner" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;🎙️ Live War Room Audio/Video Bridge&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• Continuous Google Meet / Zoom Conference Bridge&lt;br&gt;• Dedicated Slack #cutover-warroom Channel&lt;br&gt;• SRE, DevSecOps &amp;amp; DBA Leads Synchronized&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_monitoring_cockpit" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;📊 Real-Time Cutover Telemetry Dashboard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• Live Request Latency, 5xx Error Rate Gauges&lt;br&gt;• Synthetic Ingress Health Probe Monitors&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="265" width="360" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: MINUTE-BY-MINUTE EXECUTION ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:12px;color:#166534;&quot;&gt;⚡ 3. MINUTE-BY-MINUTE CUTOVER SEQUENCE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="step_sequence_card" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;5-Phase Execution Sequence&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.5;padding-top:4px;&quot;&gt;• &lt;b&gt;T-00:30:&lt;/b&gt; Freeze Legacy DB Writes &amp;amp; Verify CDC Sync&lt;br&gt;• &lt;b&gt;T-00:15:&lt;/b&gt; Reduce Cloud DNS TTL to 60 Seconds&lt;br&gt;• &lt;b&gt;T-00:00:&lt;/b&gt; Flip Global Load Balancer Traffic to Cloud&lt;br&gt;• &lt;b&gt;T+00:10:&lt;/b&gt; Enable Vertex AI Live Inference Endpoints&lt;br&gt;• &lt;b&gt;T+00:30:&lt;/b&gt; Final SRE Production SLO Verification Signoff&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="150" as="geometry"/>
        </mxCell>

        <mxCell id="step_day2_ops" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Day-2 Operational Handover&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Stand Down War Room &amp;amp; Transfer to 24/7 Tier-2 Ops&lt;br&gt;• Archive Cutover Telemetry Logs to BigQuery Sink&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="295" width="370" height="105" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: AUTOMATED ROLLBACK PROTOCOL ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:12px;color:#991B1B;&quot;&gt;🛑 4. AUTOMATED ROLLBACK PROTOCOL&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="box_rollback_triggers" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#991B1B;&quot;&gt;Automated Rollback Triggers&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#7F1D1D;line-height:1.4;padding-top:4px;&quot;&gt;• 5xx Error Rate &amp;gt; 0.5% over 3-minute sliding window&lt;br&gt;• P99 Latency &amp;gt; 2,500ms or DB Lock Contention Alert&lt;br&gt;• Unanimous War Room Commander Abort Call&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_rollback_script" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#991B1B;&quot;&gt;🛑 1-Click Rollback Script Execution&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#7F1D1D;line-height:1.4;padding-top:4px;&quot;&gt;• Cloud DNS Instant Failback to Legacy IP Pool&lt;br&gt;• Cloud Deploy Rollback to Previous Deployment Hash&lt;br&gt;• Restore Database to Pre-Cutover Snapshot&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="265" width="345" height="125" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. Pre-Flight Approval" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_cicd_prep" target="box_decision_gate">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. Convene War Room" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_decision_gate" target="box_war_room_banner">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Stream Metrics" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_war_room_banner" target="box_monitoring_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Execute Sequence" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_war_room_banner" target="step_sequence_card">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Day-2 Handover" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="step_sequence_card" target="step_day2_ops">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="[Abort / Breach]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DC2626;strokeWidth=2;strokeDashed=1;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="step_sequence_card" target="box_rollback_triggers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e7" value="Trigger Rollback" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DC2626;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_rollback_triggers" target="box_rollback_script">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
