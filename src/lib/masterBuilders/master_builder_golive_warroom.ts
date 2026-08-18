/**
 * 🏛️ MASTER BLUEPRINT: GO-LIVE CUTOVER & WAR ROOM RUNBOOK
 * Pixel-Perfect Replica of Go-Live Cutover & War Room Runbook (Day-1 Cutover Phase / To-Be State)
 */

export function buildGoLiveWarRoomRunbookXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="golive_warroom_runbook" name="Go-Live Cutover &amp; War Room Runbook">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- MAIN TITLE (TOP LEFT) -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;Go-Live Cutover &amp;amp; War Room Runbook (Day-1 Cutover Phase / To-Be State)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Enterprise Pre-Flight Checks • Minute-by-Minute Execution • Automated Rollback &amp;amp; Day-2 Operations&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== LAYER 1 (TOP): PREPARATION & APPROVAL PHASE ==================== -->
        <!-- Container across full width x = 30 .. 1560, y = 85 .. 270 (height = 185) -->
        <mxCell id="layer1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1530" height="185" as="geometry"/>
        </mxCell>
        <mxCell id="layer1_bar" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;LAYER 1: PREPARATION &amp;amp; APPROVAL PHASE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1530" height="30" as="geometry"/>
        </mxCell>

        <!-- 1. CI/CD Release Pipeline -->
        <mxCell id="box_cicd_prep" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;🚀 Verified CI/CD Release Pipeline&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Tagged Git Release Commit &amp;amp; SemVer Validation&lt;br&gt;• Container Digest Verification (Artifact Registry / Cosign)&lt;br&gt;• Cloud Deploy Multi-Target Target Manifests Frozen&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="125" width="340" height="130" as="geometry"/>
        </mxCell>

        <!-- 2. Go-Live Prep Checklist & Storage Callout -->
        <mxCell id="box_prep_checklist" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📋 Go-Live Pre-Flight Checklist&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• GCS WORM Storage Compliance Lock Active&lt;br&gt;• Database Backup &amp;amp; Point-in-Time Snapshot Taken&lt;br&gt;• Third-Party Vendor Notification &amp;amp; SLA Freeze Confirmed&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="415" y="125" width="340" height="130" as="geometry"/>
        </mxCell>

        <!-- 3. Go / No-Go Decision Gate -->
        <mxCell id="box_decision_gate" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;⚖️ 👥&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Go / No-Go Decision Gate&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Release Manager &amp;amp; App Owner Sign-Off&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="785" y="125" width="340" height="130" as="geometry"/>
        </mxCell>

        <!-- 4. Approved Jira Ticket & Confluence Draft -->
        <mxCell id="box_docs_right" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🎟️ Confluence &amp;amp; Jira Cutover Ticket&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Change Advisory Board (CAB) Approved Status&lt;br&gt;• Minute-by-Minute Runbook Version 3.4 Frozen&lt;br&gt;• Emergency Escalation Contact Tree Pre-Verified&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1155" y="125" width="390" height="130" as="geometry"/>
        </mxCell>

        <!-- Connectors across Layer 1 -->
        <mxCell id="e_c1_c2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_cicd_prep" target="box_prep_checklist"/>
        <mxCell id="e_c2_c3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_prep_checklist" target="box_decision_gate"/>
        <mxCell id="e_c3_c4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_decision_gate" target="box_docs_right"/>


        <!-- ==================== LAYER 2: THE WAR ROOM & LIVE EXECUTION ==================== -->
        <!-- x = 30 .. 1560, y = 285 .. 585 (height = 300) -->
        <mxCell id="layer2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="285" width="1530" height="300" as="geometry"/>
        </mxCell>
        <mxCell id="layer2_bar" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;LAYER 2: LIVE WAR ROOM COMMAND &amp;amp; MINUTE-BY-MINUTE EXECUTION SCRIPT&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1D4ED8;strokeColor=#1E40AF;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="285" width="1530" height="30" as="geometry"/>
        </mxCell>

        <!-- Live War Room Comms & Personas (Left) -->
        <mxCell id="box_war_room_banner" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;🚨 Active War Room Comms Hub&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Live Zoom / Google Meet Bridge Open&lt;br&gt;• Dedicated Slack / Teams #cutover-warroom&lt;br&gt;• SRE, DevSecOps &amp;amp; Database Leads Synced&lt;br&gt;• Opsgenie Live On-Call Alert Escalation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="330" width="280" height="235" as="geometry"/>
        </mxCell>

        <!-- 5-Step Minute-by-Minute Execution Sequence (Center) -->
        <mxCell id="step1_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🔍 🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Step 1: Data Migration&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;ETL Verification &amp;amp; Row-Count Validation Check&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="345" y="330" width="135" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="step2_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🌐 ⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Step 2: Cloud DNS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;TTL Reduction &amp;amp; Global Load Balancer Flip&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="495" y="330" width="135" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="step3_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;⚛️ 📦&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Step 3: MFE Mount&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Live Micro-Frontend Orchestration &amp;amp; CDN Inval&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="645" y="330" width="135" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="step4_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🧠 ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Step 4: AI Online&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Vertex AI Agents &amp;amp; Inference Endpoints Active&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="795" y="330" width="135" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="step5_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;📈 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Step 5: SRE Audit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;SLO Verification, Error Rate &amp;amp; Latency Guard&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="945" y="330" width="135" height="235" as="geometry"/>
        </mxCell>

        <!-- Automated Rollback Decision & Script (Right) -->
        <mxCell id="box_rollback_frame" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#991B1B;border-bottom:1px solid #FECACA;padding-bottom:2px;&quot;&gt;🛑 Automated Rollback Script Execution&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• &lt;b&gt;Trigger:&lt;/b&gt; 5xx error spike &amp;gt; 0.5% or SLO breach&lt;br&gt;• Instant Cloud DNS Fallback to legacy IP pool&lt;br&gt;• Cloud Deploy 1-Click Rollback to previous hash&lt;br&gt;• Disable Vertex AI live inference endpoints&lt;br&gt;• Restore Database to pre-cutover snapshot&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1100" y="330" width="445" height="235" as="geometry"/>
        </mxCell>

        <!-- Step to Step Arrows -->
        <mxCell id="e_s1_s2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="step1_card" target="step2_card"/>
        <mxCell id="e_s2_s3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="step2_card" target="step3_card"/>
        <mxCell id="e_s3_s4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="step3_card" target="step4_card"/>
        <mxCell id="e_s4_s5" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="step4_card" target="step5_card"/>
        <mxCell id="e_s5_rb" value="" style="edgeStyle=none;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=classic;dashed=1;" edge="1" parent="1" source="step5_card" target="box_rollback_frame"/>


        <!-- ==================== LAYER 3: POST-LAUNCH DAY-2 OPERATIONS ==================== -->
        <!-- x = 30 .. 1560, y = 600 .. 840 (height = 240) -->
        <mxCell id="layer3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="600" width="1530" height="240" as="geometry"/>
        </mxCell>
        <mxCell id="layer3_bar" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;LAYER 3: POST-LAUNCH DAY-2 OPERATIONS &amp;amp; METRICS SCORECARD&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#15803D;strokeColor=#166534;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="600" width="1530" height="30" as="geometry"/>
        </mxCell>

        <!-- Dynamic Day-2 Dashboard Mockups -->
        <mxCell id="box_dyn_dash" value="&lt;table style="width:100%;padding:4px;"&gt;&lt;tr&gt;&lt;td colspan=&quot;4&quot; style=&quot;font-size:11px;font-weight:bold;color:#166534;border-bottom:1px solid #BBF7D0;padding-bottom:2px;&quot;&gt;📊 Post-Cutover Live Health Metrics&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Data Freshness&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;⚡ Optimal (&amp;lt; 200ms)&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Schema Drift&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;🟢 0 Incompatibilities&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Volume Anomalies&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;🟢 0 Critical Alerts&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Launch Readiness Score&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#16A34A;font-weight:bold;&quot;&gt;100 / 100 PASS&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="645" width="885" height="180" as="geometry"/>
        </mxCell>

        <!-- Go-Live Scorecard & Legend (Right) -->
        <mxCell id="box_scorecard" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;border-bottom:1px solid #CBD5E1;padding-bottom:2px;&quot;&gt;📋 Enterprise Go-Live Verification Sign-Off&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Orchestrated Minute-by-Minute Cutover verified nominal.&lt;br&gt;• 24/7 Day-2 hypercare rotation active with secondary on-call.&lt;br&gt;• Automated rollback harness standby decommissioned after 48h.&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="950" y="645" width="595" height="180" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;War Room Runbook Protocol:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Pre-Flight Preparation&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔷 &lt;b&gt;Minute-by-Minute Execution&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🛑 &lt;b&gt;Rollback Safeguard&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Day-2 Operational Health&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Enterprise Reliability Standard&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="860" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
