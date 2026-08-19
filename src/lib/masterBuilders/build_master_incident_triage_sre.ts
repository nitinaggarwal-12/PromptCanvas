export function buildIncidentTriageSreXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="enterprise_sre_observability" name="Enterprise Site Reliability Engineering (SRE) &amp; Observability on Google Cloud Platform (P5-GOV-L-04)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Enterprise Site Reliability Engineering (SRE) &amp;amp; Incident Triage (P5-GOV-L-04)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Operations Suite • Automated RCA • Real-Time War Room &amp;amp; Error Budget Policy&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== TOP: DEVSECOPS CI/CD PIPELINE (x = 30 .. 980) ==================== -->
        <mxCell id="box_devsecops" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="950" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_devsecops_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;🔄 DevSecOps Continuous Delivery Pipeline (Code to Cloud Deploy)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="45" y="90" width="400" height="16" as="geometry"/>
        </mxCell>

        <!-- 6 Pipeline Steps -->
        <mxCell id="pipe_code" value="&lt;b style=&quot;font-size:9px;&quot;&gt;&amp;lt;/&amp;gt; 1. Code&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="115" width="135" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="pipe_build" value="&lt;b style=&quot;font-size:9px;&quot;&gt;🔨 2. Build&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="195" y="115" width="135" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="pipe_test" value="&lt;b style=&quot;font-size:9px;&quot;&gt;🧪 3. Test&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="135" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="pipe_scan" value="&lt;b style=&quot;font-size:9px;&quot;&gt;🛡️ 4. SAST/DAST Scan&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="495" y="115" width="145" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="pipe_release" value="&lt;b style=&quot;font-size:9px;&quot;&gt;📦 5. Release Tag&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="655" y="115" width="135" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="pipe_deploy" value="&lt;b style=&quot;font-size:9px;&quot;&gt;🚀 6. Prod Deploy&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="115" width="155" height="34" as="geometry"/>
        </mxCell>

        <!-- Pipeline Internal Connectors -->
        <mxCell id="e_p1_2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1;endArrow=classic;" edge="1" parent="1" source="pipe_code" target="pipe_build"/>
        <mxCell id="e_p2_3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1;endArrow=classic;" edge="1" parent="1" source="pipe_build" target="pipe_test"/>
        <mxCell id="e_p3_4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1;endArrow=classic;" edge="1" parent="1" source="pipe_test" target="pipe_scan"/>
        <mxCell id="e_p4_5" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1;endArrow=classic;" edge="1" parent="1" source="pipe_scan" target="pipe_release"/>
        <mxCell id="e_p5_6" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1;endArrow=classic;" edge="1" parent="1" source="pipe_release" target="pipe_deploy"/>


        <!-- ==================== LEFT: MONITORED INFRASTRUCTURE RESOURCES ==================== -->
        <!-- x = 30 .. 210 (width = 180) -->
        <mxCell id="box_resources" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="175" width="180" height="570" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_resources_hdr" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🏢 MULTI-CLOUD &amp;amp; GCP RESOURCES&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="175" width="180" height="34" as="geometry"/>
        </mxCell>

        <!-- 6 Resource Cards -->
        <mxCell id="res_gke" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;☸️ GKE Enterprise&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Autopilot Clusters&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="225" width="156" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="res_gce" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🖥️ Compute Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;MIGs &amp;amp; Bare Metal VMs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="295" width="156" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="res_gae" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🏃 Cloud Run / App Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Serverless Microservices&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="365" width="156" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="res_pubsub" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;💠 Cloud Pub/Sub&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Event Streams &amp;amp; Queues&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="435" width="156" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="res_db" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud SQL / Spanner&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Transactional Databases&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="505" width="156" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="res_onprem" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🏢 On-Premise / Edge&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Google Distributed Cloud&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="575" width="156" height="55" as="geometry"/>
        </mxCell>


        <!-- ==================== CENTER LEFT: INTEGRATED OBSERVABILITY PLATFORM ==================== -->
        <!-- x = 230 .. 680 (width = 450) -->
        <mxCell id="box_observability" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="230" y="175" width="450" height="570" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_observability_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📊 GOOGLE CLOUD OPERATIONS SUITE (OBSERVABILITY)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="230" y="175" width="450" height="34" as="geometry"/>
        </mxCell>

        <!-- Layer 1: Cloud Monitoring -->
        <mxCell id="box_layer_mon" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;📈 1. Cloud Monitoring &amp;amp; SLI/SLO Management&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Global Uptime Probes &amp;amp; Synthetic Canary Transactions&lt;br&gt;• Real-time Service Level Indicator (SLI) telemetry &amp;amp; Error Budget burn&lt;br&gt;• Multi-Metric PromQL / MQL query correlation engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="245" y="225" width="420" height="95" as="geometry"/>
        </mxCell>

        <!-- Layer 2: Cloud Logging -->
        <mxCell id="box_layer_log" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;📑 2. Cloud Logging &amp;amp; Real-Time Log Analytics&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Petabyte-scale centralized Log Router with BigQuery sync&lt;br&gt;• Automated Error Reporting grouping stack traces with deduplication&lt;br&gt;• Security Log Sinks for audit compliance (HIPAA / PCI / FedRAMP)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="245" y="335" width="420" height="95" as="geometry"/>
        </mxCell>

        <!-- Layer 3: Cloud Trace & Profiler -->
        <mxCell id="box_layer_trace" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;⚡ 3. Distributed Cloud Trace &amp;amp; Profiler&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• End-to-End latency breakdown across microservices&lt;br&gt;• Continuous in-production CPU / memory heap allocation profiling&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="245" y="445" width="420" height="80" as="geometry"/>
        </mxCell>

        <!-- Layer 4: Gemini AI Root Cause Analysis -->
        <mxCell id="box_layer_ai" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#047857;&quot;&gt;🧠 4. Gemini AI Automated Root Cause Analysis (RCA)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Cross-log multi-hop correlation powered by Vertex AI&lt;br&gt;• Automated triage recommendation generation &amp;amp; blast radius isolation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="245" y="540" width="420" height="85" as="geometry"/>
        </mxCell>


        <!-- ==================== CENTER RIGHT: INCIDENT MANAGEMENT WORKFLOW ==================== -->
        <!-- x = 700 .. 980 (width = 280) -->
        <mxCell id="box_incident_wf" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="700" y="175" width="280" height="570" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_incident_wf" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🚨 INCIDENT RESPONSE WORKFLOW&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EF4444;strokeColor=#DC2626;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="175" width="280" height="34" as="geometry"/>
        </mxCell>

        <!-- Trigger Card -->
        <mxCell id="card_trigger" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#991B1B;&quot;&gt;⚡ 1. Alert Trigger Triggered&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;SLO burn-rate spike / Critical threshold&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="715" y="225" width="250" height="60" as="geometry"/>
        </mxCell>

        <!-- Automated Notification Card -->
        <mxCell id="card_notify" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📟 2. On-Call Notification Dispatch&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;PagerDuty / Slack / MS Teams War Room&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="715" y="300" width="250" height="60" as="geometry"/>
        </mxCell>

        <!-- Live Diagnosis Card -->
        <mxCell id="card_analysis" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;&quot;&gt;🔍 3. Live Triage &amp;amp; Trace Inspection&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Correlated dashboards &amp;amp; Gemini RCA advice&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="715" y="375" width="250" height="60" as="geometry"/>
        </mxCell>

        <!-- Automated Mitigation Card -->
        <mxCell id="card_mitigation" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛠️ 4. Automated Canary Rollback&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Deploy rollback / Traffic shedding&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="715" y="450" width="250" height="60" as="geometry"/>
        </mxCell>

        <!-- Post-Mortem & Feedback Card -->
        <mxCell id="card_feedback_loop" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#166534;&quot;&gt;🔄 5. Blameless Post-Mortem &amp;amp; Policy Loop&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Auto-generates action items for CI/CD gates&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="715" y="525" width="250" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== RIGHT: DASHBOARDS & SRE ARTIFACTS ==================== -->
        <!-- x = 1000 .. 1560 (width = 560) -->
        <mxCell id="box_dashboards_if" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="560" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_dashboards_if" value="&lt;b style=&quot;font-size:11px;color:#38BDF8;&quot;&gt;🖥️ SRE WAR ROOM COMMAND CONSOLE &amp;amp; METRICS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="560" height="34" as="geometry"/>
        </mxCell>

        <!-- 4 Dark Operational Dashboard Mockup Cards -->
        <mxCell id="dash_health" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#4ADE80;&quot;&gt;🟢 Global Cluster Fleet Health&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;GKE: 99.995% | Cloud SQL: 100% | Ingress: 0 errors&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="130" width="255" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="dash_slo" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#38BDF8;&quot;&gt;📊 SLO &amp;amp; Error Budget Monitor&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;Remaining Budget: 88.4% | Burn Rate: 0.12x (Safe)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1285" y="130" width="255" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="dash_perf" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#FBBF24;&quot;&gt;⚡ Application Latency (p99)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;p50: 8ms | p95: 16ms | p99: 42ms | RPS: 48,200&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="215" width="255" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="dash_logs" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#A78BFA;&quot;&gt;🔍 Real-Time Error Stream Log&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;5xx Error Spike: 0.001% (Target &amp;lt; 0.01%)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1285" y="215" width="255" height="75" as="geometry"/>
        </mxCell>

        <!-- Incident Command Console Mockup Card -->
        <mxCell id="card_incident_command" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:8px;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr style=&quot;background:#1E293B;border-bottom:1px solid #334155;&quot;&gt;&lt;td style=&quot;padding:4px;font-size:10px;font-weight:bold;color:#F87171;&quot;&gt;🚨 Active War Room Console (Incident #INC-8921)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:6px;font-size:8.5px;color:#CBD5E1;line-height:1.4;&quot;&gt;• &lt;b&gt;Severity:&lt;/b&gt; P1 High-Priority • &lt;b&gt;Status:&lt;/b&gt; Mitigated (Canary Rolled Back)&lt;br&gt;• &lt;b&gt;Incident Commander:&lt;/b&gt; Lead SRE On-Call (PagerDuty Escalation #1)&lt;br&gt;• &lt;b&gt;AI Hypothesis:&lt;/b&gt; Database connection pool exhaustion during rolling deploy.&lt;br&gt;• &lt;b&gt;Action Taken:&lt;/b&gt; Auto-scaled max pool size &amp;amp; rolled back artifact to v2.4.1.&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#020617;strokeColor=#334155;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="305" width="525" height="140" as="geometry"/>
        </mxCell>

        <!-- SRE Artifacts Box -->
        <mxCell id="art_policies" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#38BDF8;&quot;&gt;📄 Error Budget Policy&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#94A3B8;&quot;&gt;Freeze deploy gates on SLO burn&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="460" width="255" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="art_playbooks" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#38BDF8;&quot;&gt;▶️ Automated Playbooks&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#94A3B8;&quot;&gt;Runbooks &amp;amp; Cloud Workflows&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1285" y="460" width="255" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="art_templates" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#38BDF8;&quot;&gt;📑 Blameless Post-Mortem&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#94A3B8;&quot;&gt;Root cause &amp;amp; remediation log&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1015" y="520" width="255" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="art_slislo" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#38BDF8;&quot;&gt;📋 SLI / SLO Catalog&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#94A3B8;&quot;&gt;Formal enterprise availability SLAs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1285" y="520" width="255" height="50" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_res_obs" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_resources" target="box_observability"/>
        <mxCell id="e_obs_inc" value="" style="edgeStyle=none;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_observability" target="box_incident_wf"/>


        <!-- ==================== BOTTOM FOOTER LEGEND ==================== -->
        <mxCell id="box_legend" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Enterprise SRE Mesh:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Infrastructure Telemetry Stream&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📊 &lt;b&gt;Cloud Operations Suite&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Automated Incident Response&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;DevSecOps Closed-Loop Feedback&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud Operations&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="760" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
