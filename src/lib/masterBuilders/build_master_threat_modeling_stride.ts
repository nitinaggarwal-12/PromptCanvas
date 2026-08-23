export function buildThreatModelingStrideXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="threat_modeling_stride" name="STRIDE Zero-Trust Threat Model &amp; Attack Vector Boundary Map (SEC-THRT-08)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🛡️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;ZERO-TRUST SECURITY: STRIDE THREAT MODEL &amp;amp; ATTACK VECTOR BOUNDARY MAP&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1250" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10px;color:#475569;font-weight:700;letter-spacing:0.3px;&quot;&gt;ANALYSIS: Spoofing (S), Tampering (T), Repudiation (R), Information Disclosure (I), Denial of Service (D), Elevation of Privilege (E)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="34" width="1250" height="18" as="geometry"/>
        </mxCell>
        
        <!-- Gemini Security Analyst Badge (Dark HUD Glassmorphic Pill) -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Security Analyst&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1425" y="8" width="150" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: UNTRUSTED ZONE: THREAT VECTORS ==================== -->
        <!-- x = 25 .. 380 (width = 355, height = 715) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFF5F5;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="355" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#991B1B;&quot;&gt;🛡️ Untrusted Zone: Threat Vectors&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="335" height="20" as="geometry"/>
        </mxCell>

        <!-- 1. Adversary & Threat Actors Box -->
        <mxCell id="box_threat_actors" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FECACA;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="35" y="98" width="335" height="112" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_threat_actors_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Adversary &amp;amp; Threat Actors&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="40" y="102" width="325" height="16" as="geometry"/>
        </mxCell>

        <!-- 4 Threat Actor Cards -->
        <mxCell id="card_malware" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;👾&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#991B1B;&quot;&gt;Malware&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="124" width="72" height="76" as="geometry"/>
        </mxCell>
        <mxCell id="card_phishing" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🎣&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#991B1B;&quot;&gt;Spear&lt;br&gt;Phishing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="122" y="124" width="72" height="76" as="geometry"/>
        </mxCell>
        <mxCell id="card_harvesting" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🪪&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#991B1B;&quot;&gt;Credential&lt;br&gt;Harvesting&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="202" y="124" width="76" height="76" as="geometry"/>
        </mxCell>
        <mxCell id="card_prompt_inj" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;💉&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#991B1B;&quot;&gt;Prompt&lt;br&gt;Injection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="286" y="124" width="76" height="76" as="geometry"/>
        </mxCell>

        <!-- 2. [S] Spoofing Attack Vector -->
        <mxCell id="box_stride_s" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="35" y="218" width="335" height="114" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_stride_s_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#B91C1C;&quot;&gt;[S] Spoofing Attack Vector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Forged JWT Tokens &amp;amp; Fake IP Headers&lt;br&gt;&lt;b style=&quot;color:#15803D;&quot;&gt;Mitigation:&lt;/b&gt; mTLS 1.3 &amp;amp; BeyondCorp / IdP&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="40" y="222" width="325" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="card_spoof_pkt" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;✉️ ⚠️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#991B1B;font-weight:bold;&quot;&gt;Tampered&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="45" y="270" width="95" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="card_spoof_mit" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#0F172A;font-weight:bold;&quot;&gt;MITIGATION&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#15803D;font-weight:bold;&quot;&gt;🔒 mTLS&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="235" y="270" width="125" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="arr_spoof_flow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#DC2626;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_spoof_pkt" target="card_spoof_mit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 3. [T] Tampering Attack Vector -->
        <mxCell id="box_stride_t" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="35" y="342" width="335" height="114" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_stride_t_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#B91C1C;&quot;&gt;[T] Tampering Attack Vector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Man-in-the-Middle (MitM) / Poisoned Payloads&lt;br&gt;&lt;b style=&quot;color:#15803D;&quot;&gt;Mitigation:&lt;/b&gt; Signed Payloads &amp;amp; Cloud KMS&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="40" y="346" width="325" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="card_tamp_pkt" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;📦 ⚡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#991B1B;font-weight:bold;&quot;&gt;Altered Payload&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="45" y="394" width="95" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="card_tamp_mit" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#0F172A;font-weight:bold;&quot;&gt;MITIGATION&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#15803D;font-weight:bold;&quot;&gt;🔏 KMS Sign&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="235" y="394" width="125" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="arr_tamp_flow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#DC2626;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_tamp_pkt" target="card_tamp_mit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 4. [D] Denial of Service (DoS) -->
        <mxCell id="box_stride_d" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="35" y="466" width="335" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_stride_d_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#B91C1C;&quot;&gt;[D] Denial of Service (DoS)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;L7 HTTP Floods &amp;amp; Distributed Botnet Waves&lt;br&gt;&lt;b style=&quot;color:#15803D;&quot;&gt;Mitigation:&lt;/b&gt; Cloud Armor &amp;amp; Anycast Security&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="40" y="470" width="325" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="card_dos_flood" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:13px;&quot;&gt;🌊 🌊 🌊&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#991B1B;font-weight:bold;&quot;&gt;HTTP Flood&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="45" y="520" width="95" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="card_dos_mit" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#0F172A;font-weight:bold;&quot;&gt;MITIGATION&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#15803D;font-weight:bold;&quot;&gt;🛡️ BeyondCorp&lt;br&gt;&amp;amp; Armor Rate&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="235" y="520" width="125" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="arr_dos_flow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#DC2626;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_dos_flood" target="card_dos_mit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Column 1 Footer Indicator -->
        <mxCell id="lbl_col1_status" value="&lt;span style=&quot;font-size:8px;color:#991B1B;font-weight:bold;&quot;&gt;🔴 Ingress Perimeter Gated: 4 STRIDE Vectors Mitigated&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="750" width="335" height="20" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: DMZ EDGE & MODEL ARMOR SHARD ==================== -->
        <!-- x = 395 .. 755 (width = 360, height = 715) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="395" y="65" width="360" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🛡️ DMZ Edge &amp;amp; Model Armor Shard&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="72" width="340" height="20" as="geometry"/>
        </mxCell>

        <!-- 1. Cloud Armor WAF & DDoS Shield -->
        <mxCell id="box_cloud_armor" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:35px;font-size:24px;text-align:center;&quot;&gt;🛡️&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:6px;&quot;&gt;&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Armor WAF &amp;amp; DDoS Shield&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;• Adaptive Protection ML Throttling&lt;br&gt;• OWASP Top 10 Injection Mitigation Rules&lt;br&gt;• Rate Limiting &amp;amp; Geographic IP Defense&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="405" y="98" width="340" height="105" as="geometry"/>
        </mxCell>

        <!-- In-transit Badge [2] -->
        <mxCell id="pill_transit_2" value="&lt;b style=&quot;font-size:7.5px;color:#1E40AF;&quot;&gt;[2] WAF &amp;amp; DDoS Sanitized&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="500" y="210" width="150" height="18" as="geometry"/>
        </mxCell>

        <!-- 2. Google Cloud Model Armor -->
        <mxCell id="box_model_armor" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:35px;font-size:24px;text-align:center;&quot;&gt;🤖&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:6px;&quot;&gt;&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;Google Cloud Model Armor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;• Real-Time Prompt Injection Interceptor&lt;br&gt;• Red Teaming Filters &amp;amp; Jailbreak Defense&lt;br&gt;• Sensitive Data &amp;amp; Token Sanitization&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="405" y="235" width="340" height="105" as="geometry"/>
        </mxCell>
        <mxCell id="pill_prompt_defense" value="&lt;b style=&quot;font-size:7px;color:#1D4ED8;&quot;&gt;[S] Prompt Poisoning Defense&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="575" y="322" width="160" height="16" as="geometry"/>
        </mxCell>

        <!-- In-transit Badge [3] -->
        <mxCell id="pill_transit_3" value="&lt;b style=&quot;font-size:7.5px;color:#1E40AF;&quot;&gt;[3] Prompt Sanitized / Filtered&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="500" y="347" width="150" height="18" as="geometry"/>
        </mxCell>

        <!-- 3. Identity-Aware Proxy (IAP) -->
        <mxCell id="box_iap" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="405" y="372" width="340" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_iap_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Identity-Aware Proxy (IAP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Context-Aware Device &amp;amp; User Posture Checks&lt;br&gt;Zero Open Inbound Ports on Compute&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="410" y="376" width="330" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="card_iap_signals" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;width:24px;text-align:center;&quot;&gt;🌐&lt;/td&gt;&lt;td style=&quot;font-size:7px;color:#0F172A;&quot;&gt;&lt;b&gt;Contextual Signals:&lt;/b&gt;&lt;br&gt;• Device ID &amp;amp; Security Posture&lt;br&gt;• User Geo-position &amp;amp; MFA Token&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="415" y="416" width="175" height="78" as="geometry"/>
        </mxCell>
        <mxCell id="card_iap_backend" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🔒 🖥️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Backend&lt;br&gt;Instance&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="645" y="416" width="90" height="78" as="geometry"/>
        </mxCell>
        <mxCell id="arr_iap_to_be" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_iap_signals" target="card_iap_backend">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 4. [R] Non-Repudiation Logging -->
        <mxCell id="box_stride_r" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="405" y="520" width="340" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_stride_r_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;[R] Non-Repudiation Logging&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Cloud Audit Logs &amp;amp; WORM Storage (Bucket Lock)&lt;br&gt;Digitally Signed Signatures (21 CFR Part 11 / ISO 27001)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="410" y="524" width="330" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="card_audit_trail" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;📑 ✔&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Audit Trail&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="415" y="585" width="145" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="card_audit_keys" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🔑 🔐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Key Management&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="590" y="585" width="145" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="arr_audit_flow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_audit_trail" target="card_audit_keys">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: TRUST BOUNDARY: SANDBOXED COMPUTE ==================== -->
        <!-- x = 770 .. 1140 (width = 370, height = 715) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#4ADE80;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="770" y="65" width="370" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;⚙️ Trust Boundary: Sandboxed Compute&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="780" y="72" width="350" height="20" as="geometry"/>
        </mxCell>

        <!-- 1. GKE Autopilot (gVisor Enclave) -->
        <mxCell id="box_gke_gvisor" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="780" y="98" width="350" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gke_gvisor_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;GKE Autopilot (gVisor Enclave)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Kernel Isolation to Prevent Container Escape&lt;br&gt;mTLS 1.3 Service Mesh Authentication&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="785" y="102" width="220" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="card_gvisor_diagram" value="&lt;table style=&quot;width:100%;font-size:7px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#DCFCE7;border:1px solid #16A34A;font-weight:bold;color:#15803D;&quot;&gt;gVisor Sandbox&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#FFFFFF;border:1px solid #CBD5E1;color:#0F172A;&quot;&gt;Container App&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#FEE2E2;border:1px solid #EF4444;color:#991B1B;&quot;&gt;Host Kernel Isolated&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1005" y="106" width="115" height="112" as="geometry"/>
        </mxCell>

        <!-- In-transit Badge [4] -->
        <mxCell id="pill_transit_4" value="&lt;b style=&quot;font-size:7.5px;color:#15803D;&quot;&gt;[4] mTLS 1.3 - gRPC&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="895" y="238" width="130" height="18" as="geometry"/>
        </mxCell>

        <!-- 2. Workload Identity Federation -->
        <mxCell id="box_workload_id" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="780" y="262" width="350" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_workload_id_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;Workload Identity Federation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Short-Lived OIDC Tokens (No Long-Lived Secret Keys)&lt;br&gt;Least-Privilege Fine-Grained Service Accounts&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="785" y="264" width="340" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="card_identity_mesh" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;🔄 🪪&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#15803D;font-weight:bold;&quot;&gt;OIDC Dynamic STS&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="790" y="308" width="125" height="64" as="geometry"/>
        </mxCell>
        <mxCell id="card_sa_key" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;❌ 🔑&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#991B1B;font-weight:bold;&quot;&gt;Keys Eliminated&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="980" y="308" width="140" height="64" as="geometry"/>
        </mxCell>
        <mxCell id="arr_sa_key_flow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_identity_mesh" target="card_sa_key">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- In-transit Badge [5] -->
        <mxCell id="pill_transit_5" value="&lt;b style=&quot;font-size:7.5px;color:#15803D;&quot;&gt;[5] HTTP/2 - TLS 1.3&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="895" y="390" width="130" height="18" as="geometry"/>
        </mxCell>

        <!-- 3. [E] Elevation of Privilege Guard -->
        <mxCell id="box_stride_e" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="780" y="415" width="350" height="140" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_stride_e_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;[E] Elevation of Privilege Guard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Binary Authorization Policy Enforcement&lt;br&gt;Strictly Blocks Unsigned / Tampered Images in Production&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="785" y="418" width="340" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="card_img_verif" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🖼️ ✔&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#15803D;&quot;&gt;Image Verification&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="790" y="462" width="145" height="82" as="geometry"/>
        </mxCell>
        <mxCell id="card_code_commit" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🔏 🏷️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Secure Code Commit&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="980" y="462" width="140" height="82" as="geometry"/>
        </mxCell>
        <mxCell id="arr_eop_flow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_img_verif" target="card_code_commit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 4. Cloud Secret Manager -->
        <mxCell id="box_secret_mgr" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="780" y="565" width="350" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_secret_mgr_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Secret Manager&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Automatic Ephemeral Rotation Framework (CMEK-backed)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="785" y="570" width="340" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="icon_key_rot" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:32px;&quot;&gt;🔄&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;🔑&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="905" y="605" width="100" height="100" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: DATA ENCLAVE & VPC-SC PERIMETER ==================== -->
        <!-- x = 1155 .. 1575 (width = 420, height = 715) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1155" y="65" width="420" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🔒 Data Enclave &amp;amp; VPC-SC Perimeter&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1165" y="72" width="400" height="20" as="geometry"/>
        </mxCell>

        <!-- Floating Badge [6] IAM Validation -->
        <mxCell id="pill_transit_6" value="&lt;b style=&quot;font-size:7.5px;color:#15803D;&quot;&gt;[6]&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1141" y="351" width="12" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. [I] Information Disclosure Guard (VPC-SC) -->
        <mxCell id="box_stride_i" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1165" y="98" width="400" height="152" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_stride_i_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;[I] Information Disclosure Guard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;VPC Service Controls (VPC-SC) Outer Perimeter Wall&lt;br&gt;Zero Data Exfiltration to Unauthorized External Accounts&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1170" y="102" width="390" height="38" as="geometry"/>
        </mxCell>

        <!-- VPC-SC Wall & Perimeter Architecture Diagram -->
        <mxCell id="card_outer_wall" value="&lt;b style=&quot;font-size:7px;color:#475569;&quot;&gt;Outer Perimeter Wall&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:18px;&quot;&gt;🧱&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1175" y="148" width="75" height="92" as="geometry"/>
        </mxCell>
        <mxCell id="card_service_perimeters" value="&lt;div style=&quot;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:7.5px;color:#7E22CE;&quot;&gt;Service Perimeters&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;(Data, Compute, AI Models)&lt;/span&gt;&lt;br&gt;&lt;div style=&quot;margin-top:4px;&quot;&gt;&lt;span style=&quot;background:#E9D5FF;border:1px solid #C084FC;border-radius:4px;padding:2px 4px;font-size:7px;&quot;&gt;🗄️ BigQuery&lt;/span&gt; &lt;span style=&quot;background:#E9D5FF;border:1px solid #C084FC;border-radius:4px;padding:2px 4px;font-size:7px;&quot;&gt;🪣 GCS&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1275" y="148" width="175" height="92" as="geometry"/>
        </mxCell>
        <mxCell id="card_blocked_ext" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;❌ 👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;color:#991B1B;font-weight:bold;&quot;&gt;Blocked Ext&lt;br&gt;Account&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1475" y="148" width="80" height="92" as="geometry"/>
        </mxCell>
        <mxCell id="arr_wall_to_perim" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_outer_wall" target="card_service_perimeters">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr_perim_blocked" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_service_perimeters" target="card_blocked_ext">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 2. Cloud KMS -->
        <mxCell id="box_cloud_kms" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:35px;font-size:24px;text-align:center;&quot;&gt;🔑&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:6px;&quot;&gt;&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud KMS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Key hierarchy: Master Key (MK) → KEK → DEK&lt;br&gt;Physical HSM Root of Trust&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1165" y="258" width="400" height="92" as="geometry"/>
        </mxCell>
        <mxCell id="badge_hsm_pill" value="&lt;b style=&quot;font-size:7.5px;color:#FFFFFF;&quot;&gt;HSM&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1440" y="292" width="38" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="badge_fips_pill" value="&lt;b style=&quot;font-size:7.5px;color:#7E22CE;&quot;&gt;FIPS 140-3 L3&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1484" y="292" width="72" height="22" as="geometry"/>
        </mxCell>

        <!-- 3. Security Command Center (SCC) Enterprise -->
        <mxCell id="box_scc_enterprise" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1165" y="360" width="400" height="158" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_scc_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Security Command Center&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Gemini (mock) continuously synced dashboard widgets&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1170" y="364" width="390" height="28" as="geometry"/>
        </mxCell>

        <!-- Mock Dashboard Card -->
        <mxCell id="card_scc_mock_dashboard" value="&lt;table style=&quot;width:100%;color:#FFFFFF;font-family:sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;font-weight:bold;color:#38BDF8;&quot;&gt;293&lt;/td&gt;&lt;td style=&quot;font-size:8px;text-align:right;color:#94A3B8;&quot;&gt;🟢 Clean &amp;nbsp; 🟠 2 High &amp;nbsp; 🔴 0 Crit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:7px;color:#CBD5E1;border-top:1px solid #334155;padding-top:4px;&quot;&gt;• VPC-SC Perimeter Status: Active (0 Violations)&lt;br&gt;• Cloud Armor DDoS Mitigation: 100% Gated&lt;br&gt;• Model Armor Jailbreak Block Rate: 99.8%&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1175" y="394" width="225" height="114" as="geometry"/>
        </mxCell>
        <mxCell id="card_chronicle_secops" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🛰️ 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Chronicle Maps&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;SCC Enterprise&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1425" y="394" width="130" height="114" as="geometry"/>
        </mxCell>
        <mxCell id="arr_scc_to_chron" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_scc_mock_dashboard" target="card_chronicle_secops">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 4. Cloud Data Loss Prevention (DLP) -->
        <mxCell id="box_cloud_dlp" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:18px;text-align:center;&quot;&gt;🛡️&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Cloud Data Loss Prevention&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;Detect and mask sensitive data (SSN, PAN)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1165" y="530" width="195" height="68" as="geometry"/>
        </mxCell>

        <!-- 5. Chronicle SOAR -->
        <mxCell id="box_chronicle_soar" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:18px;text-align:center;&quot;&gt;⚡&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Chronicle SOAR&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;Automated response playbooks&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1370" y="530" width="195" height="68" as="geometry"/>
        </mxCell>


        <!-- ==================== INTER-ZONE CONNECTORS ==================== -->
        <!-- [1] Threat Actors -> Cloud Armor WAF -->
        <mxCell id="arr_col1_to_col2" value="&lt;b style=&quot;font-size:7px;color:#991B1B;&quot;&gt;[1] Ingress Threat Vectors&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#EF4444;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#F87171;padding=2;" edge="1" parent="1" source="box_threat_actors" target="box_cloud_armor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- DMZ IAP Backend -> Sandboxed Compute GKE -->
        <mxCell id="arr_col2_to_col3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_iap_backend" target="box_stride_e">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Workload Identity -> VPC-SC Data Enclave -->
        <mxCell id="arr_col3_to_col4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_sa_key" target="pill_transit_6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER STRIDE SECURITY FRAMEWORK BANNER ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 34) -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:8.5px;color:#334155;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;STRIDE Security Framework:&lt;/b&gt; &amp;nbsp;🔴 &lt;b&gt;[S] Spoofing (S):&lt;/b&gt; BeyondCorp &amp;amp; mTLS 1.3 &amp;nbsp;|&amp;nbsp; 🟠 &lt;b&gt;[T] Tampering (T):&lt;/b&gt; KMS &amp;amp; Attestation &amp;nbsp;|&amp;nbsp; 🟡 &lt;b&gt;[R] Repudiation (R):&lt;/b&gt; Audit Logs &amp;amp; WORM &amp;nbsp;|&amp;nbsp; 🟣 &lt;b&gt;[I] Disclosure (I):&lt;/b&gt; VPC-SC Perimeter &amp;nbsp;|&amp;nbsp; 🔵 &lt;b&gt;[D] DoS (D):&lt;/b&gt; Cloud Armor &amp;amp; Quotas &amp;nbsp;|&amp;nbsp; 🟢 &lt;b&gt;[E] Elevation (E):&lt;/b&gt; Binary Auth &amp;nbsp;|&amp;nbsp; ── &lt;b&gt;(1/r):&lt;/b&gt; Protocol Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="792" width="1550" height="34" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="828" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
