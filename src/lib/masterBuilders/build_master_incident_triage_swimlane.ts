export function buildIncidentTriageSwimlaneXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="incident_triage_escalation" name="SRE Incident Triage &amp; Escalation Swimlane (P5-GOV-L-04)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🚨&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud SRE OPERATIONS: INCIDENT TRIAGE &amp;amp; MULTI-TIER ESCALATION SWIMLANE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Day-2 Operational Playbook: L1 Automated Alerting &amp;amp; Gemini Cloud Assist $\rightarrow$ L2 Auto-Remediation $\rightarrow$ L3 Incident Commander War Room&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Assist RCA&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Swimlane 1: L1 Automated Alert & AI Root-Cause Diagnostic -->
        <mxCell id="lane1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="1335" height="175" as="geometry"/>
        </mxCell>
        <mxCell id="lane1_tab" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🟡 L1: Automated Telemetry Ingest &amp;amp; AI Root-Cause Triage (MTTD &amp;lt; 1 min)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="600" height="28" as="geometry"/>
        </mxCell>

        <mxCell id="node_telemetry_trigger" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Cloud Monitoring Uptime Breach&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;P99 Latency &amp;gt; 800ms / HTTP 503 Surge&lt;br&gt;Pub/Sub Alert Delivery Hook&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="110" width="260" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_assist_rca" value="&lt;b style=&quot;font-size:10px;color:#1D4ED8;&quot;&gt;Gemini 3.7 Flash Cloud Assist RCA&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Multi-Log Cross-Correlation (GKE + Cloud SQL)&lt;br&gt;Synthetic Trace Analysis &amp;amp; Blast Radius Estimation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="370" y="110" width="280" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_itsm_ticket" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;ITSM Incident Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Auto-Populated ServiceNow / Jira Incident&lt;br&gt;Severity Scoring (P1 Critical vs P2 Major)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="710" y="110" width="270" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_l1_decision" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Auto-Remediable?&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Known Pattern in Runbook DB&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1040" y="110" width="260" height="100" as="geometry"/>
        </mxCell>

        <!-- Swimlane 2: L2 Operations & Automated Self-Healing Runbooks -->
        <mxCell id="lane2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="255" width="1335" height="175" as="geometry"/>
        </mxCell>
        <mxCell id="lane2_tab" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🟢 L2: Self-Healing Runbook Execution &amp;amp; Controlled Mitigation (MTTR &amp;lt; 5 min)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="25" y="255" width="600" height="28" as="geometry"/>
        </mxCell>

        <mxCell id="node_runbook_engine" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Cloud Run Remediation Functions&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• GKE Pod Rolling Restart&lt;br&gt;• Cloud SQL Read Replica Promotion&lt;br&gt;• Cloud Armor WAF IP Block Rule Injection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="300" width="280" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_traffic_drain" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Global Load Balancer Traffic Drain&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Gracefully Shift Ingress to Secondary Region&lt;br&gt;Cloud DNS Latency Routing Re-Weighting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="300" width="270" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_verify_health" value="&lt;b style=&quot;font-size:10px;color:#15803D;&quot;&gt;Synthetic Health Check Verification&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Uptime Checks Green (HTTP 200 OK)&lt;br&gt;Latency Returns to &amp;lt; 120ms Baseline&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="300" width="260" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_l2_escalate_gate" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Resolved?&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Check Health Indicators&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1040" y="300" width="260" height="100" as="geometry"/>
        </mxCell>

        <!-- Swimlane 3: L3 Incident Commander & War Room -->
        <mxCell id="lane3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="445" width="1335" height="195" as="geometry"/>
        </mxCell>
        <mxCell id="lane3_tab" value="&lt;b style=&quot;font-size:11px;color:#991B1B;&quot;&gt;🔴 L3: Incident Commander, War Room Bridge &amp;amp; Post-Mortem RCA&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="25" y="445" width="600" height="28" as="geometry"/>
        </mxCell>

        <mxCell id="node_pagerduty_oncall" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;PagerDuty / Opsgenie High-Urgency Page&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Primary &amp;amp; Secondary SRE Leads Awakened&lt;br&gt;Instant Slack / Google Meet War Room Created&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="490" width="280" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_war_room_console" value="&lt;b style=&quot;font-size:10px;color:#B91C1C;&quot;&gt;Incident Commander War Room Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Real-Time SLO &amp;amp; Error Budget Dashboard&lt;br&gt;• Cloud Deploy Emergency Rollback Button&lt;br&gt;• Customer Status Page External Broadcast&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="490" width="280" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_blameless_postmortem" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Gemini-Assisted Blameless Post-Mortem&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated Timeline Synthesis from Cloud Audit Logs&lt;br&gt;Action Items Assigned to Jira with SLA Gating&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="730" y="490" width="280" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_cicd_prevent_fix" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Preventative CI/CD Policy Update&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;New Integration Test Added to Cloud Build&lt;br&gt;Zero-Recurrence Architecture Hardening&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1070" y="490" width="260" height="105" as="geometry"/>
        </mxCell>

        <!-- Connecting Orthogonal Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_telemetry_trigger" target="node_gemini_assist_rca">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_gemini_assist_rca" target="node_itsm_ticket">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_itsm_ticket" target="node_l1_decision">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_l1_decision" target="node_runbook_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1170" y="235"/>
              <mxPoint x="190" y="235"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_runbook_engine" target="node_traffic_drain">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_traffic_drain" target="node_verify_health">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_verify_health" target="node_l2_escalate_gate">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;" edge="1" parent="1" source="node_l2_escalate_gate" target="node_pagerduty_oncall">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1170" y="425"/>
              <mxPoint x="190" y="425"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;" edge="1" parent="1" source="node_pagerduty_oncall" target="node_war_room_console">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge10" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;" edge="1" parent="1" source="node_war_room_console" target="node_blameless_postmortem">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge11" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;" edge="1" parent="1" source="node_blameless_postmortem" target="node_cicd_prevent_fix">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Escalation Matrix:&lt;/b&gt; 🔵 L1 Auto-Telemetry &amp;amp; Gemini Triage &amp;nbsp;|&amp;nbsp; 🟢 L2 Automated Remediation &amp;nbsp;|&amp;nbsp; 🔴 L3 SRE War Room &amp;amp; Post-Mortem &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
