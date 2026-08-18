export function buildIncidentTriageSwimlaneXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="incident_triage_escalation" name="SRE Incident Triage &amp; Escalation Swimlane (P5-GOV-L-04)">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🚨&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;GOOGLE CLOUD SRE OPERATIONS: INCIDENT TRIAGE &amp;amp; ESCALATION SWIMLANE (P5-GOV-L-04)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Day-2 Operational Playbook: L1 Telemetry Ingest &amp;amp; Gemini Cloud Assist $\rightarrow$ L2 Self-Healing Runbooks $\rightarrow$ L3 Incident Commander War Room&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Cloud Assist RCA&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- Swimlane 1: L1 Automated Alert & AI Root-Cause Diagnostic -->
        <mxCell id="lane1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="1685" height="280" as="geometry"/>
        </mxCell>
        <mxCell id="lane1_tab" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;🟡 L1: Automated Telemetry Ingest &amp;amp; AI Root-Cause Triage (MTTD &amp;lt; 1 min)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="85" width="1665" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="node_telemetry_trigger" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Monitoring Uptime Breach&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• P99 Latency &amp;gt; 800ms / HTTP 503 Surge&lt;br&gt;• Cloud Pub/Sub High-Priority Alert Hook&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="340" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_assist_rca" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;✨ Gemini 3.7 Cloud Assist RCA&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Multi-Log Cross-Correlation (GKE + Cloud SQL)&lt;br&gt;• Synthetic Trace Analysis &amp;amp; Blast Radius Map&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="460" y="140" width="360" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_itsm_ticket" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;ITSM Incident Dispatcher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Auto-Populated ServiceNow / Jira Incident&lt;br&gt;• Severity Scoring (P1 Critical vs P2 Major)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="880" y="140" width="340" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_l1_decision" value="&lt;b style=&quot;font-size:14px;color:#0F172A;&quot;&gt;Auto-Remediable?&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Known Pattern in Runbook DB&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1300" y="140" width="180" height="110" as="geometry"/>
        </mxCell>

        <!-- Swimlane 2: L2 Operations & Automated Self-Healing Runbooks -->
        <mxCell id="lane2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="380" width="1685" height="280" as="geometry"/>
        </mxCell>
        <mxCell id="lane2_tab" value="&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;🟢 L2: Self-Healing Runbook Execution &amp;amp; Controlled Mitigation (MTTR &amp;lt; 5 min)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="390" width="1665" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="node_runbook_engine" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Cloud Run Remediation Functions&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• GKE Pod Rolling Restart &amp;amp; Node Recycle&lt;br&gt;• Cloud SQL Read Replica Promotion&lt;br&gt;• Cloud Armor Dynamic IP Block Rule Injection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="445" width="360" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_traffic_drain" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Global Load Balancer Traffic Drain&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Gracefully Shift Ingress to Secondary Region&lt;br&gt;• Cloud DNS Latency Routing Re-Weighting&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="480" y="445" width="360" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_verify_health" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Synthetic Health Check Verification&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Uptime Checks Green (HTTP 200 OK)&lt;br&gt;• Latency Returns to &amp;lt; 120ms Baseline&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="900" y="445" width="340" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_l2_escalate_gate" value="&lt;b style=&quot;font-size:14px;color:#0F172A;&quot;&gt;Resolved?&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Check Health Indicators&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1300" y="445" width="180" height="115" as="geometry"/>
        </mxCell>

        <!-- Swimlane 3: L3 Incident Commander & War Room -->
        <mxCell id="lane3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="685" width="1685" height="280" as="geometry"/>
        </mxCell>
        <mxCell id="lane3_tab" value="&lt;b style=&quot;font-size:12px;color:#991B1B;&quot;&gt;🔴 L3: Incident Commander, War Room Bridge &amp;amp; Post-Mortem RCA&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="695" width="1665" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="node_pagerduty_oncall" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;PagerDuty / On-Call High-Urgency Page&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Primary &amp;amp; Secondary SRE Leads Awakened&lt;br&gt;• Instant Slack / Google Meet War Room Created&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="750" width="360" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_war_room_console" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#B91C1C;&quot;&gt;Incident Commander War Room Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-Time SLO &amp;amp; Error Budget Dashboard&lt;br&gt;• Cloud Deploy Emergency Rollback Button&lt;br&gt;• Customer Status Page External Broadcast&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="480" y="750" width="360" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_blameless_postmortem" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Gemini-Assisted Blameless Post-Mortem&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Automated Timeline Synthesis from Audit Logs&lt;br&gt;• Action Items Assigned to Jira with SLA Gating&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="900" y="750" width="340" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_cicd_prevent_fix" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Preventative CI/CD Policy Hardening&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Integration Test Added to Cloud Build Matrix&lt;br&gt;• Zero-Recurrence Architecture Verification&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1300" y="750" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- Connecting Orthogonal Edges -->
        <mxCell id="edge1" value="1. Alert" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_telemetry_trigger" target="node_gemini_assist_rca">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge2" value="2. Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_gemini_assist_rca" target="node_itsm_ticket">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge3" value="3. Check Runbook" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_itsm_ticket" target="node_l1_decision">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge4" value="[Yes: Auto-Heal]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_l1_decision" target="node_runbook_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1390" y="360"/>
              <mxPoint x="240" y="360"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="edge5" value="4. Shift Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_runbook_engine" target="node_traffic_drain">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge6" value="5. Verify OK" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_traffic_drain" target="node_verify_health">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge7" value="6. Gate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_verify_health" target="node_l2_escalate_gate">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge8" value="[Unresolved: Page L3]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DC2626;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_l2_escalate_gate" target="node_pagerduty_oncall">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1390" y="660"/>
              <mxPoint x="240" y="660"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="edge9" value="7. War Room" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DC2626;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_pagerduty_oncall" target="node_war_room_console">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge10" value="8. Post-Mortem" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DC2626;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_war_room_console" target="node_blameless_postmortem">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge11" value="9. Policy Hardening" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DC2626;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_blameless_postmortem" target="node_cicd_prevent_fix">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
