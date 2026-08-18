export function buildLegacyDataDependencyMapXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="legacy_data_dependency_map" name="Google Cloud Discovery &amp; Assessment: Legacy Silos to Modern Cloud Migration Architecture (P1-APP-L-01)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🔍&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:16.5px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD DISCOVERY &amp;amp; ASSESSMENT: LEGACY SILOS TO MODERN MIGRATION WAVES&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9px;color:#475569;font-weight:700;letter-spacing:0.1px;&quot;&gt;StratoZone Collector Appliance, Google Cloud Migration Center, Sensitive Data Protection (DLP), &amp;amp; Gemini 3.7 Flash Architecture Reasoning&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Gemini 3.7 Flash Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Discovery &amp;amp; Migration Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: ON-PREM LEGACY SILOS & MONOLITHS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="360" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:10.5px;color:#991B1B;&quot;&gt;🏢 On-Prem Legacy Silos &amp;amp; Monoliths&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="64" width="340" height="20" as="geometry"/>
        </mxCell>

        <!-- 1.1 IBM z/OS Mainframe -->
        <mxCell id="card_mainframe" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;🖥️ IBM z/OS MAINFRAME&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• High CPU During Peak&lt;br&gt;• Schema Drift&lt;br&gt;• Hardcoded Credentials, LAR&lt;br&gt;• Legacy NAS/SFTP Shares&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="88" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- 1.2 Oracle 11g RAC Cluster -->
        <mxCell id="card_oracle" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;🗄️ ORACLE 11g RAC CLUSTER&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Oracle 11g RAC Cluster (Dual Node)&lt;br&gt;• 3,400+ Unindexed Stored Procedures&lt;br&gt;• Storage Legacy &amp;amp; Fragmented DB Clones&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="215" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- 1.3 SAP ECC 6.0 On-Prem -->
        <mxCell id="card_sap" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;📦 SAP ECC 6.0 On-Prem&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Compact 6.0.0 Monolith Core&lt;br&gt;• SAP ECC On-Prem ABAP Custom Modules&lt;br&gt;• Shadow Access &amp;amp; Legacy DB Locks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="342" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- 1.4 Shadow Access & MS SQL DBs -->
        <mxCell id="card_shadow_sql" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;⚠️ Shadow Access &amp;amp; MS SQL DBs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Complex Direct Query Paths&lt;br&gt;• Schema Drift &amp;amp; Unmonitored PII Data&lt;br&gt;• Hardcoded Credentials &amp;amp; Shared DB Locks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="470" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- 1.5 Legacy NAS/SFTP File Shares -->
        <mxCell id="card_nas_shares" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;📁 Legacy NAS/SFTP File Shares&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Legacy NAS/Shares, SAP File Shares&lt;br&gt;• Hardcoded Credentials &amp;amp; Unencrypted Cron Scripts&lt;br&gt;• Nightly Batch CSV Extracts &amp;amp; Raw XML Transfers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="598" width="340" height="162" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: LEGACY SPAGHETTI INTEGRATION MATRIX ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="405" y="60" width="355" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:10.5px;color:#B45309;&quot;&gt;🍝 Legacy Spaghetti Integration Matrix&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="64" width="335" height="20" as="geometry"/>
        </mxCell>

        <!-- 2.1 TIBCO / IBM MQ ESB BUS -->
        <mxCell id="card_tibco_bus" value="&lt;b style=&quot;font-size:9px;color:#B45309;&quot;&gt;TIBCO / IBM MQ ESB BUS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;High Peak CPU Load&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="92" width="160" height="110" as="geometry"/>
        </mxCell>

        <!-- 2.2 Informatica PowerCenter ETL -->
        <mxCell id="card_informatica_etl" value="&lt;b style=&quot;font-size:9px;color:#B45309;&quot;&gt;Informatica&lt;br&gt;PowerCenter ETL&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;Nightly Batch Bottleneck&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="222" width="160" height="110" as="geometry"/>
        </mxCell>

        <!-- 2.3 Point-to-Point Shell Scripts (1,200+) -->
        <mxCell id="card_shell_scripts" value="&lt;b style=&quot;font-size:9px;color:#B45309;&quot;&gt;Point-to-Point&lt;br&gt;Shell Scripts (1,200+)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;Unmonitored Cron Jobs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="352" width="160" height="110" as="geometry"/>
        </mxCell>

        <!-- 2.4 Cognos / Crystal Reports BI -->
        <mxCell id="card_cognos_bi" value="&lt;b style=&quot;font-size:9px;color:#B45309;&quot;&gt;Cognos / Crystal&lt;br&gt;Reports BI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;Direct Production DB Query&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="482" width="160" height="110" as="geometry"/>
        </mxCell>

        <!-- Floating Problem Callout Pills inside Spaghetti Matrix -->
        <mxCell id="pill_prob_cpu" value="&lt;b style=&quot;font-size:7px;color:#B91C1C;&quot;&gt;High CPU During Peak&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="600" y="115" width="145" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="pill_prob_schema" value="&lt;b style=&quot;font-size:7px;color:#B91C1C;&quot;&gt;Schema Drift Risk&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="600" y="245" width="145" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="pill_prob_cred" value="&lt;b style=&quot;font-size:7px;color:#B91C1C;&quot;&gt;Hardcoded Credentials&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="600" y="375" width="145" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="pill_prob_locks" value="&lt;b style=&quot;font-size:7px;color:#B91C1C;&quot;&gt;Read-Only DB Locks&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="600" y="505" width="145" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="pill_prob_unmanaged" value="&lt;b style=&quot;font-size:7px;color:#B91C1C;&quot;&gt;Unmanaged Shadow Data&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="450" y="660" width="260" height="42" as="geometry"/>
        </mxCell>

        <!-- Complex Spaghetti Interconnect Lines -->
        <mxCell id="spag_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_mainframe" target="card_tibco_bus">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="spag_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#DC2626;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_oracle" target="card_informatica_etl">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="spag_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_sap" target="card_shell_scripts">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="spag_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#DC2626;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_shadow_sql" target="card_cognos_bi">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="spag_5" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#D97706;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_tibco_bus" target="pill_prob_cpu">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="spag_6" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#D97706;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_informatica_etl" target="pill_prob_schema">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="spag_7" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;endArrow=none;strokeColor=#D97706;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_shell_scripts" target="pill_prob_cred">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: GOOGLE CLOUD STRATOZONE & DISCOVERY CENTER ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="780" y="60" width="395" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;☁️ Google Cloud StratoZone &amp;amp; Discovery Center&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="64" width="375" height="20" as="geometry"/>
        </mxCell>

        <!-- Central Globe / Circle: UNIFIED MIGRATION CATALOG -->
        <mxCell id="card_unified_catalog" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌐 GOOGLE CLOUD DISCOVERY &amp;amp; ASSESSMENT&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;font-weight:bold;&quot;&gt;UNIFIED MIGRATION CATALOG&lt;/span&gt;" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="92" width="185" height="185" as="geometry"/>
        </mxCell>

        <!-- Concentric Lifecycle Process Badges -->
        <mxCell id="badge_disc" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;🔍 Discovering...&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="295" width="185" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="badge_prof" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;📊 Profiling...&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="340" width="185" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="badge_class" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;🏷️ Classifying...&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="385" width="185" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="badge_rat" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;⚡ Rationalizing...&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="430" width="185" height="35" as="geometry"/>
        </mxCell>

        <!-- Right Side Discovery Core Cards inside Column 3 -->
        <!-- 3.1 StratoZone Collector Appliance -->
        <mxCell id="card_stratozone" value="&lt;b style=&quot;font-size:9.5px;color:#1E40AF;&quot;&gt;🖥️ StratoZone&lt;br&gt;Collector Appliance&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Automated WMI &amp;amp; SSH Discovery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="990" y="88" width="170" height="110" as="geometry"/>
        </mxCell>

        <!-- 3.2 Google Cloud Migration Center -->
        <mxCell id="card_migration_center" value="&lt;b style=&quot;font-size:9.5px;color:#1E40AF;&quot;&gt;☁️ Google Cloud&lt;br&gt;Migration Center&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Central TCO &amp;amp; Asset Inventory&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="990" y="215" width="170" height="115" as="geometry"/>
        </mxCell>

        <!-- 3.3 Sensitive Data Protection (DLP) -->
        <mxCell id="card_dlp_inspect" value="&lt;b style=&quot;font-size:9.5px;color:#1E40AF;&quot;&gt;🛡️ Sensitive Data&lt;br&gt;Protection (DLP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Automated PII Masking &amp;amp; Audit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="990" y="345" width="170" height="120" as="geometry"/>
        </mxCell>

        <!-- 3.4 Gemini 3.7 Flash Architecture Reasoning -->
        <mxCell id="card_gemini_reasoning" value="&lt;b style=&quot;font-size:10.5px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;br&gt;Architecture Reasoning&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;• Automated 6Rs Migration Track Classification&lt;br&gt;• Wave Schedule &amp;amp; Dependency Optimization&lt;br&gt;• Legacy Monolith Code Refactoring Plan&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="790" y="485" width="370" height="275" as="geometry"/>
        </mxCell>

        <!-- Flow Arrows from Stages to Tools -->
        <mxCell id="arr_st_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="badge_disc" target="card_stratozone">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr_st_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="badge_prof" target="card_migration_center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr_st_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="badge_class" target="card_dlp_inspect">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr_st_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="badge_rat" target="card_gemini_reasoning">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: TARGET MODERN STATE & WAVE PLAN ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1195" y="60" width="380" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;🎯 Target Modern State &amp;amp; Wave Plan&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1205" y="64" width="360" height="20" as="geometry"/>
        </mxCell>

        <!-- 4.1 Wave 1: Lift & Shift (Rehost) -->
        <mxCell id="card_wave1" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#15803D;&quot;&gt;☁️ WAVE 1: LIFT &amp;amp; SHIFT (Rehost)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Optimized Transformation (Compute Engine / Migrate to VMs)&lt;br&gt;• Defaulted Low-Risk Dependencies&lt;br&gt;• Outcome: Decommission &amp;amp; Retire On-Prem Hardware&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1205" y="88" width="360" height="115" as="geometry"/>
        </mxCell>

        <!-- 4.2 Wave 2: Modernize DBs (Replatform) -->
        <mxCell id="card_wave2" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#15803D;&quot;&gt;🗄️ WAVE 2: MODERNIZE DBs (Replatform)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Optimized Database Migration Service (DMS)&lt;br&gt;• Cloud SQL for PostgreSQL / AlloyDB Enterprise&lt;br&gt;• Outcome: Eliminate Oracle Licensing &amp;amp; Hardware Locks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1205" y="215" width="360" height="115" as="geometry"/>
        </mxCell>

        <!-- 4.3 Wave 3: Event-Driven & AI (Refactor) -->
        <mxCell id="card_wave3" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#15803D;&quot;&gt;⚡ WAVE 3: EVENT-DRIVEN &amp;amp; AI (Refactor)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Cloud Run Serverless Microservices &amp;amp; Pub/Sub EDA&lt;br&gt;• BigQuery Serverless Analytics &amp;amp; Vertex AI Models&lt;br&gt;• Outcome: Sub-100ms Microservices &amp;amp; AI Cognitive Features&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1205" y="342" width="360" height="115" as="geometry"/>
        </mxCell>

        <!-- 4.4 Wave 4: Decommission & Retire -->
        <mxCell id="card_wave4" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#15803D;&quot;&gt;♻️ WAVE 4: DECOMMISSION &amp;amp; RETIRE&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Full Datacenter Lease Termination&lt;br&gt;• Complete Archival to Cloud Storage Archive Class&lt;br&gt;• Outcome: 42% TCO OpEx Savings &amp;amp; Zero Technical Debt&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1205" y="470" width="360" height="290" as="geometry"/>
        </mxCell>


        <!-- ==================== CROSS-COLUMN INTER-TIER CONNECTORS ==================== -->
        <!-- StratoZone -> Wave 1 -->
        <mxCell id="arr_strato_wave1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_stratozone" target="card_wave1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Migration Center -> Wave 2 -->
        <mxCell id="arr_mig_wave2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_migration_center" target="card_wave2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- DLP -> Wave 3 -->
        <mxCell id="arr_dlp_wave3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_dlp_inspect" target="card_wave3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Gemini Reasoning -> Wave 4 -->
        <mxCell id="arr_gem_wave4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_gemini_reasoning" target="card_wave4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 36) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Migration Architecture Legend:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;On-Prem Legacy Silos &amp;amp; Monoliths&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟠 &lt;b&gt;Legacy Non-Deterministic Monoliths&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟡 &lt;b&gt;Legacy Spaghetti Integration Matrix&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Sensitive Data Protection (DLP) &amp;amp; Discovery&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Clear, Optimized Transformation Waves&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Gemini 3.7 Flash&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="785" width="1550" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="825" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
