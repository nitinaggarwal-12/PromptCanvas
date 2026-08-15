export function buildLegacyDataDependencyMapXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="legacy_data_dependency_map" name="Legacy Data Dependency Map (P1-APP-L-01)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🔍&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud DISCOVERY &amp;amp; ASSESSMENT: LEGACY DATA DEPENDENCY &amp;amp; SPAGHETTI MAP&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Phase 1 Baseline Assessment: Uncovering On-Prem Spaghetti Integrations, Shadow DBs, PII Hotspots &amp;amp; StratoZone Cloud Migration Catalog&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Discovery Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: On-Premises Legacy Monoliths & Silos -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#991B1B;&quot;&gt;🏢 On-Prem Legacy Silos &amp;amp; Monoliths&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_mainframe" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;IBM z/OS Mainframe&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;COBOL CICS &amp;amp; VSAM Flat Files&lt;br&gt;Core Transaction Ledger&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="105" width="250" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_oracle_monolith" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Oracle 11g RAC Cluster&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;3,400+ Stored Procedures (PL/SQL)&lt;br&gt;Unindexed Heavy Joins &amp;amp; Locks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="195" width="250" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_sap_ecc" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;SAP ECC 6.0 On-Prem&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;ABAP Custom Tables &amp;amp; IDocs&lt;br&gt;Supply Chain &amp;amp; AP/AR Core&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="285" width="250" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_shadow_db" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Shadow Access &amp;amp; MS SQL DBs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#B91C1C;&quot;&gt;⚠️ Unmonitored PII / Credit Cards&lt;br&gt;Direct Departmental Links&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="375" width="250" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_sftp_shares" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Legacy NAS / SFTP File Shares&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Nightly Batch CSVs &amp;amp; Raw XMLs&lt;br&gt;Point-to-Point SSH Cron Jobs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="465" width="250" height="65" as="geometry"/>
        </mxCell>

        <!-- Column 2: The Spaghetti Integration Mesh & Bottlenecks -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;🍝 Legacy Spaghetti Integration Matrix&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_esb_monolith" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;TIBCO / IBM MQ ESB Bus&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Stateful Orchestrations &amp;amp; XML Transforms&lt;br&gt;SPOF: 98.4% CPU During Peak Hour&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_informatica_batch" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Informatica PowerCenter ETL&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;8-Hour Nightly Batch Windows&lt;br&gt;Frequent Deadlocks &amp;amp; Schema Drift&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_point_to_point" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Point-to-Point Shell Scripts (1,200+)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#991B1B;&quot;&gt;Hardcoded IP Addresses &amp;amp; Passwords&lt;br&gt;No Central Lineage or Retry Queues&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="335" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cognos_bi" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cognos / Crystal Reports BI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Direct Read-Only DB Locks on Prod&lt;br&gt;Stale 24h-Old Executive Reports&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="445" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Google Cloud Automated Discovery & Telemetry Probe -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;🔬 Google Cloud StratoZone &amp;amp; Discovery Center&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_stratozone_probe" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;StratoZone Collector Appliance&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Agentless WMI/SSH Discovery Probe&lt;br&gt;Hardware, CPU, RAM &amp;amp; IOPS Profiling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_migration_center" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Google Cloud Migration Center&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Automated Dependency Grouping Engine&lt;br&gt;TCO &amp;amp; Carbon Footprint Estimation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="225" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_dlp_scanner" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Sensitive Data Protection (DLP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Automated PII / PCI-DSS Schema Profiling&lt;br&gt;Flagging Unencrypted High-Risk DB Tables&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="335" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_analysis" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;Gemini 3.7 Flash Architecture Reasoning&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Automated 6Rs Disposition Recommender&lt;br&gt;Refactor vs Rehost vs Replatform Mapping&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="445" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: Modern GCP Target Architecture Handoff -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#4ADE80;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#166534;&quot;&gt;🚀 Target Modern State &amp;amp; Wave Plan&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_wave1_rehost" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Wave 1: Lift &amp;amp; Shift (Rehost)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Migrate to Virtual Machines (Compute Engine)&lt;br&gt;Low-Risk Non-Critical App Servers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_wave2_replatform" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Wave 2: Modernize DBs (Replatform)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Database Migration Service (DMS)&lt;br&gt;Oracle $\rightarrow$ AlloyDB HA / Cloud SQL Postgres&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="225" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_wave3_refactor" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Wave 3: Event-Driven &amp;amp; AI (Refactor)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Cloud Pub/Sub + Cloud Run Microservices&lt;br&gt;BigQuery Lakehouse &amp;amp; Gemini 3.7 Agents&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="335" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_wave4_retire" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Wave 4: Decommission &amp;amp; Retire&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Shut down Legacy On-Prem ESBs &amp;amp; Hardware&lt;br&gt;Estimated 64% Annual OpEx Savings&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="445" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Orthogonal Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;" edge="1" parent="1" source="node_mainframe" target="node_esb_monolith">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;" edge="1" parent="1" source="node_oracle_monolith" target="node_informatica_batch">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;" edge="1" parent="1" source="node_shadow_db" target="node_point_to_point">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_esb_monolith" target="node_stratozone_probe">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_informatica_batch" target="node_migration_center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_point_to_point" target="node_dlp_scanner">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_migration_center" target="node_wave1_rehost">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_dlp_scanner" target="node_wave2_replatform">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_gemini_analysis" target="node_wave3_refactor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Assessment Legend:&lt;/b&gt; 🔴 High Bottleneck / Technical Debt &amp;nbsp;|&amp;nbsp; 🟡 Fragile Batch Coupling &amp;nbsp;|&amp;nbsp; 🔵 Automated Google Cloud Discovery &amp;nbsp;|&amp;nbsp; 🟢 Cloud Modernization Target States &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
