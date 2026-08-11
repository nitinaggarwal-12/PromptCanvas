export function buildSecureDeploymentTopologyXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="secure_deployment_topology_map" name="Secure Deployment Topology Map (P4-SEC-P-01)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1360" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:22px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;Google Cloud End-to-End Architecture: Secure Deployment Topology Map&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="10" width="850" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Integrating GCP, Gemini Platform, and GE App&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="36" width="850" height="18" as="geometry"/>
        </mxCell>

        <!-- Top Right Mini Legend & Cloud Logo -->
        <mxCell id="top_legend_box" value="&lt;table style=&quot;font-size:8px;color:#334155;line-height:1.2;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;color:#10B981;&quot;&gt;🟩 Google Coder coding&lt;/td&gt;&lt;td style=&quot;padding-left:12px;color:#DC2626;&quot;&gt;🛑 Vulnerability&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#F59E0B;&quot;&gt;🟨 Context authenticated&lt;/td&gt;&lt;td style=&quot;padding-left:12px;color:#2563EB;&quot;&gt;🛡️ Core&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;color:#475569;&quot;&gt;➡️ Secure and authenticated&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="960" y="8" width="280" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="top_cloud_logo" value="&lt;span style=&quot;font-size:28px;&quot;&gt;☁️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1255" y="10" width="40" height="40" as="geometry"/>
        </mxCell>


        <!-- ==================== TOP CONCEPTUAL FLOW BANNER ==================== -->
        <mxCell id="top_flow_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="1285" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="top_c1_gemini" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;💻 ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Gemini Code Assist&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="65" width="110" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="top_c2_csr" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🌿&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Source Repositories&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="200" y="65" width="130" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="top_c3_chain" value="&lt;b style=&quot;font-size:7.5px;color:#475569;&quot;&gt;CI/CD Chain&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Build  &amp;gt;  Test  &amp;gt;  Scan&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="380" y="70" width="150" height="40" as="geometry"/>
        </mxCell>

        <mxCell id="top_c4_reg" value="&lt;b style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Registry&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Sign &amp;amp; Authorize&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="580" y="70" width="120" height="40" as="geometry"/>
        </mxCell>

        <mxCell id="top_c5_targets" value="&lt;b style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Target Environments&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;[Dev]  [Stage]  [Prod]&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="750" y="70" width="160" height="40" as="geometry"/>
        </mxCell>

        <mxCell id="top_badge_ssc" value="&lt;b style=&quot;font-size:8px;color:#1E3A8A;&quot;&gt;🛡️ Secure Software Supply Chain:&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Conceptual Flow&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="960" y="65" width="220" height="50" as="geometry"/>
        </mxCell>

        <!-- Top Connectors -->
        <mxCell id="top_e1" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="155" y="90" as="sourcePoint"/><mxPoint x="195" y="90" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="top_e2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="90" as="sourcePoint"/><mxPoint x="375" y="90" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="top_e3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="535" y="90" as="sourcePoint"/><mxPoint x="575" y="90" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="top_e4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="705" y="90" as="sourcePoint"/><mxPoint x="745" y="90" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== OUTER GOOGLE CLOUD PROJECT CONTAINER ==================== -->
        <mxCell id="gcp_project_container" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#D1FAE5;strokeColor=#34D399;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="25" y="130" width="1285" height="565" as="geometry"/>
        </mxCell>
        <mxCell id="gcp_project_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;☁️ Google Cloud Project&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="135" width="250" height="20" as="geometry"/>
        </mxCell>


        <!-- ==================== SECTION 1: CODE (DEVELOPER WORKSTATION & SCM) ==================== -->
        <mxCell id="sec1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="165" width="175" height="515" as="geometry"/>
        </mxCell>
        <mxCell id="sec1_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#1E3A8A;&quot;&gt;SECTION 1: CODE&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Developer Workstation &amp;amp; SCM&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="168" width="165" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="sec1_subhdr" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;1: CODE CHECK-IN&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="198" width="165" height="18" as="geometry"/>
        </mxCell>

        <!-- Developer Workstation & Copilot Card -->
        <mxCell id="card_dev_copilot" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;👤 💻 ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Developer&lt;br&gt;Gemini Code Assist AI&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;font-weight:normal;&quot;&gt;(IDE Copilot)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="270" width="115" height="90" as="geometry"/>
        </mxCell>

        <!-- Cloud Source Repositories Node -->
        <mxCell id="card_csr" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🌿&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Git Pull&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;(Cloud Source&lt;br&gt;Repositories)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="125" y="225" width="80" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_sast_check" value="&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;SAST &amp;amp; Code&lt;br&gt;Quality Check&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="440" width="115" height="30" as="geometry"/>
        </mxCell>

        <mxCell id="badge_git_push" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Git Push&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;to secure&lt;br&gt;pipeline&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="120" y="325" width="80" height="40" as="geometry"/>
        </mxCell>

        <!-- Lock Badge 1 -->
        <mxCell id="lock1" value="🔒" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontSize=10;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="195" y="340" width="22" height="22" as="geometry"/>
        </mxCell>


        <!-- ==================== SECTION 2: BUILD & GATING (CLOUD BUILD) ==================== -->
        <mxCell id="sec2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="220" y="165" width="200" height="515" as="geometry"/>
        </mxCell>
        <mxCell id="sec2_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#166534;&quot;&gt;SECTION 2: BUILD &amp;amp; GATING&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;CI/CD Pipeline (Cloud Build)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="225" y="168" width="190" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="sec2_subhdr" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;2: CI/CD SECURE&lt;br&gt;BUILD &amp;amp; GATING&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="225" y="198" width="190" height="24" as="geometry"/>
        </mxCell>

        <!-- Cloud Build Core Icon -->
        <mxCell id="card_cloud_build" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;Build&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="230" y="320" width="55" height="65" as="geometry"/>
        </mxCell>

        <!-- Branch 1: Container Build & SBOM -->
        <mxCell id="card_cbuild_box" value="&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Container&lt;br&gt;Build&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="300" y="240" width="55" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="card_sbom_box" value="&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;SBOM&lt;br&gt;Creation&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="365" y="240" width="50" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="e_cb_sbom" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_cbuild_box" target="card_sbom_box"/>

        <!-- Branch 2: Gemini SAST -->
        <mxCell id="card_gemini_sast" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🛡️ ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Gemini-Assisted&lt;br&gt;Static Scan&lt;br&gt;(SAST)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="300" y="300" width="90" height="65" as="geometry"/>
        </mxCell>

        <!-- Branch 3: DAST & Supply Chain Gating -->
        <mxCell id="card_dast" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Dynamic&lt;br&gt;Analysis (DAST)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="300" y="385" width="90" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_supply_gating" value="&lt;b style=&quot;font-size:7px;color:#166534;&quot;&gt;Secure Supply&lt;br&gt;Chain Gating&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="300" y="450" width="90" height="30" as="geometry"/>
        </mxCell>

        <!-- Connectors Cloud Build -> 3 Gating Branches -->
        <mxCell id="e_cb_b1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="285" y="340" as="sourcePoint"/><mxPoint x="300" y="258" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="e_cb_b2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="285" y="352" as="sourcePoint"/><mxPoint x="300" y="332" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="e_cb_b3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="285" y="365" as="sourcePoint"/><mxPoint x="300" y="412" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== SECTION 3: REGISTRY & BINARY AUTHORIZATION ==================== -->
        <mxCell id="sec3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="428" y="165" width="182" height="515" as="geometry"/>
        </mxCell>
        <mxCell id="sec3_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#92400E;&quot;&gt;SECTION 3: REGISTRY &amp;amp;&lt;br&gt;BINARY AUTHORIZATION&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;font-weight:normal;&quot;&gt;Container Artifacts &amp;amp; Signing&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="430" y="168" width="178" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="sec3_subhdr" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;3: SECURE IMAGE&lt;br&gt;REGISTRY &amp;amp; SIGNING&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="430" y="202" width="178" height="24" as="geometry"/>
        </mxCell>

        <!-- Artifact Registry Node -->
        <mxCell id="card_artifact_reg" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;color:#2563EB;&quot;&gt;📦&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Artifact&lt;br&gt;Registry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="438" y="235" width="65" height="60" as="geometry"/>
        </mxCell>

        <!-- Software Composition Analysis (SCA) -->
        <mxCell id="card_sca_scan" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#DC2626;&quot;&gt;⚠️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Software&lt;br&gt;Composition&lt;br&gt;Analysis (SCA)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#64748B;&quot;&gt;Sign image if clear&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="515" y="235" width="85" height="60" as="geometry"/>
        </mxCell>

        <!-- Secure Image Registry Container Box -->
        <mxCell id="card_sec_img_reg" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;color:#2563EB;&quot;&gt;🛡️ 🔒&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Secure&lt;br&gt;Image&lt;br&gt;Registry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="445" y="325" width="60" height="75" as="geometry"/>
        </mxCell>

        <!-- Binary Authorization Policy Box & Lock -->
        <mxCell id="card_bin_auth_pol" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Binary&lt;br&gt;Authorization&lt;br&gt;policy&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;&quot;&gt;🔒&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Secure Image&lt;br&gt;Promotion&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="515" y="325" width="85" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_sec_reg_btm" value="&lt;b style=&quot;font-size:7px;color:#92400E;&quot;&gt;Secure Image&lt;br&gt;Registry&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="430" y="445" width="178" height="24" as="geometry"/>
        </mxCell>

        <!-- Connectors from Gating into Registry -->
        <mxCell id="e_gating_reg" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="415" y="258" as="sourcePoint"/><mxPoint x="445" y="350" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="e_sast_reg" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="390" y="332" as="sourcePoint"/><mxPoint x="445" y="362" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="e_dast_reg" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="390" y="412" as="sourcePoint"/><mxPoint x="445" y="375" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== SECTION 4: TARGET ENVIRONMENTS & NETWORKING ==================== -->
        <mxCell id="sec4_hdr" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;SECTION 4: TARGET ENVIRONMENTS &amp;amp; NETWORKING&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Production focused&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=right;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="135" width="450" height="24" as="geometry"/>
        </mxCell>

        <!-- Mini Dev & Staging Environments -->
        <mxCell id="card_dev_env" value="&lt;b style=&quot;font-size:7px;color:#475569;&quot;&gt;Development Env:&lt;/b&gt;&lt;br&gt;☸️ &lt;span style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;GKE&lt;/span&gt; ..." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="620" y="165" width="95" height="40" as="geometry"/>
        </mxCell>

        <mxCell id="card_stage_env" value="&lt;b style=&quot;font-size:7px;color:#475569;&quot;&gt;Staging Environment&lt;/b&gt;&lt;br&gt;☸️ &lt;span style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;GKE&lt;/span&gt; ..." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="725" y="165" width="105" height="40" as="geometry"/>
        </mxCell>

        <!-- Promotion Stage 4 Check & Cloud Deploy -->
        <mxCell id="card_stage4_deploy" value="&lt;span style=&quot;font-size:14px;&quot;&gt;🔒&lt;/span&gt;&lt;br&gt;&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Stage 4:&lt;br&gt;Binary&lt;br&gt;Authorization&lt;br&gt;Policy Check&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#1E3A8A;&quot;&gt;4: SECURE&lt;br&gt;DEPLOYMENT&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;(Cloud Deploy)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="235" width="85" height="120" as="geometry"/>
        </mxCell>

        <!-- Internet Gateways & VPC SC -->
        <mxCell id="card_inet_gw1" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🌐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Internet&lt;br&gt;Gateway&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="375" width="45" height="45" as="geometry"/>
        </mxCell>
        <mxCell id="card_inet_gw2" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;☁️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Internet&lt;br&gt;Gateway&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="665" y="375" width="45" height="45" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_vpc_sc" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;VPC Service&lt;br&gt;Controls&lt;br&gt;(VPC SC)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="425" width="95" height="30" as="geometry"/>
        </mxCell>


        <!-- ==================== PRODUCTION ENVIRONMENT CONTAINER ==================== -->
        <mxCell id="prod_env_container" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="715" y="215" width="585" height="465" as="geometry"/>
        </mxCell>
        <mxCell id="prod_env_title" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Production Environment&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="218" width="575" height="18" as="geometry"/>
        </mxCell>


        <!-- ==================== PRODUCTION VPC ==================== -->
        <mxCell id="prod_vpc_box" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="725" y="240" width="375" height="430" as="geometry"/>
        </mxCell>
        <mxCell id="prod_vpc_title" value="&lt;b style=&quot;font-size:9px;color:#1E3A8A;&quot;&gt;PRODUCTION VPC&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="735" y="244" width="150" height="18" as="geometry"/>
        </mxCell>

        <!-- External Load Balancer + Cloud Armor WAF -->
        <mxCell id="card_ext_lb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;External&lt;br&gt;Load&lt;br&gt;Balancer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="735" y="340" width="55" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloud_armor" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Armor&lt;br&gt;WAF&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="730" y="420" width="65" height="50" as="geometry"/>
        </mxCell>


        <!-- Subnet 1: Management Subnet -->
        <mxCell id="mgmt_subnet_box" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="270" width="190" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="mgmt_subnet_title" value="&lt;b style=&quot;font-size:7px;color:#1E3A8A;&quot;&gt;Management Subnet&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="272" width="120" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="card_bastion" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;🖥️ Bastion Host&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="810" y="290" width="75" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="card_iap" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;🛡️ Identity-Aware&lt;br&gt;Proxy (IAP)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="895" y="290" width="90" height="30" as="geometry"/>
        </mxCell>


        <!-- Subnet 2: GKE Production Cluster Subnet -->
        <mxCell id="gke_subnet_box" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="340" width="190" height="155" as="geometry"/>
        </mxCell>
        <mxCell id="gke_subnet_title" value="&lt;b style=&quot;font-size:7px;color:#1E3A8A;&quot;&gt;GKE Production Cluster Subnet&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="342" width="180" height="14" as="geometry"/>
        </mxCell>

        <mxCell id="gke_cluster_box" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="808" y="360" width="174" height="125" as="geometry"/>
        </mxCell>
        <mxCell id="gke_cluster_hdr" value="&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;☸️ GKE Cluster&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="810" y="362" width="170" height="14" as="geometry"/>
        </mxCell>

        <!-- Internal Load Balancer -->
        <mxCell id="card_int_lb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Internal&lt;br&gt;Load&lt;br&gt;Balancer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="815" y="385" width="45" height="55" as="geometry"/>
        </mxCell>

        <!-- GE App Workload Microservices -->
        <mxCell id="card_ge_microservices" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;📦&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Workload:&lt;br&gt;&quot;GE App&quot;&lt;br&gt;Microservices&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="875" y="385" width="95" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_mtls" value="&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Encrypted Communication (mTLS)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="815" y="445" width="155" height="15" as="geometry"/>
        </mxCell>
        <mxCell id="e_intlb_ge" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_int_lb" target="card_ge_microservices"/>


        <!-- Subnet 3: Data Subnet & Private Service Connect -->
        <mxCell id="data_subnet_box" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="505" width="190" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="data_subnet_title" value="&lt;b style=&quot;font-size:7px;color:#1E3A8A;&quot;&gt;Data Subnet&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="508" width="120" height="14" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloudsql" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud SQL&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#64748B;&quot;&gt;(Private Database)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="810" y="525" width="60" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_gcs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🪣&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;Storage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="930" y="525" width="50" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="e_sql_psc_gcs" value="&lt;span style=&quot;font-size:5px;color:#0F172A;font-weight:bold;&quot;&gt;Private Service&lt;br&gt;Connect&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="870" y="552" as="sourcePoint"/>
            <mxPoint x="930" y="552" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- Connectors External LB -> Subnets -->
        <mxCell id="e_extlb_mgmt" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="790" y="355" as="sourcePoint"/><mxPoint x="800" y="300" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="e_extlb_gke" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="790" y="372" as="sourcePoint"/><mxPoint x="815" y="412" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="e_extlb_data" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="790" y="390" as="sourcePoint"/><mxPoint x="810" y="552" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Cloud NAT Egress -->
        <mxCell id="card_cloud_nat" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🌐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;NAT&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1005" y="390" width="45" height="45" as="geometry"/>
        </mxCell>
        <mxCell id="e_ge_nat" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_ge_microservices" target="card_cloud_nat"/>


        <!-- ==================== RIGHT SIDE: PRODUCTION SECURITY & COMPLIANCE ==================== -->
        <mxCell id="lbl_firewalls" value="&lt;b style=&quot;font-size:7px;color:#475569;&quot;&gt;Firewalls&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1060" y="245" width="45" height="15" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_audit_logs" value="&lt;b style=&quot;font-size:7px;color:#475569;&quot;&gt;Cloud Audit Logs&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;rotation=-90;" vertex="1" parent="1">
          <mxGeometry x="1040" y="380" width="80" height="20" as="geometry"/>
        </mxCell>

        <!-- Right Side Security Cards Column -->
        <mxCell id="card_scc_gemini" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🛡️ ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Security&lt;br&gt;Command&lt;br&gt;Center (SCC)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#64748B;&quot;&gt;Gemini-Driven&lt;br&gt;Threat Analysis&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1135" y="250" width="85" height="70" as="geometry"/>
        </mxCell>

        <mxCell id="card_secret_mgr" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🔐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Secret&lt;br&gt;Manager&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1135" y="335" width="85" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="card_iam_log" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;IAM&lt;br&gt;Cloud&lt;br&gt;Logging&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1135" y="395" width="85" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_assured_workloads" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Assured&lt;br&gt;Workloads&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#64748B;&quot;&gt;for compliance&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1135" y="460" width="85" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_stage5_title" value="&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Stage 5:&lt;br&gt;Production&lt;br&gt;Security &amp;amp;&lt;br&gt;Compliance&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1135" y="195" width="85" height="40" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
