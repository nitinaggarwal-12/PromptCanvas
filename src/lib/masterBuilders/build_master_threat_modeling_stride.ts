export function buildThreatModelingStrideXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="threat_modeling_stride" name="STRIDE Zero-Trust Threat Model &amp; Attack Vector Boundary Map (SEC-THRT-08)">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🛡️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;ZERO-TRUST SECURITY: STRIDE THREAT MODEL &amp;amp; ATTACK VECTOR BOUNDARY MAP&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;STRIDE Analysis: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege &amp;amp; Cloud Defenses&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1150" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:16px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;SecOps Threat AI&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1420" y="8" width="150" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 1: UNTRUSTED THREAT VECTORS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="340" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#991B1B;&quot;&gt;🔴 Untrusted Zone: Threat Vectors&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="68" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_threat_actors" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Adversary &amp;amp; Threat Actors&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#991B1B;&quot;&gt;• Malicious Botnets (DDoS Flood)&lt;br&gt;• Credential Stuffing &amp;amp; Phishing&lt;br&gt;• Adversarial Prompt Injection / Jailbreaks&lt;/span&gt;" style="shape=actor;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="98" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_stride_spoofing" value="&lt;b style=&quot;font-size:10.5px;color:#B91C1C;&quot;&gt;[S] Spoofing Attack Vector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Forged JWT Tokens &amp;amp; Fake IP Headers&lt;br&gt;&lt;b style=&quot;color:#15803D;&quot;&gt;Mitigation:&lt;/b&gt; mTLS 1.3 &amp;amp; BeyondCorp IdP&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_stride_tampering" value="&lt;b style=&quot;font-size:10.5px;color:#B91C1C;&quot;&gt;[T] Tampering Attack Vector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Man-in-the-Middle (MitM) Payload Alteration&lt;br&gt;&lt;b style=&quot;color:#15803D;&quot;&gt;Mitigation:&lt;/b&gt; Signed Payloads &amp;amp; Cloud KMS&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="325" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_stride_dos" value="&lt;b style=&quot;font-size:10.5px;color:#B91C1C;&quot;&gt;[D] Denial of Service (DoS)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;L7 HTTP Flood &amp;amp; LLM Token Drain Attacks&lt;br&gt;&lt;b style=&quot;color:#15803D;&quot;&gt;Mitigation:&lt;/b&gt; Cloud Armor &amp;amp; Apigee Quotas&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#B91C1C;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="440" width="310" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 2: DMZ & PERIMETER SHIELD ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="360" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🛡️ DMZ Edge &amp;amp; Model Armor Shield&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="400" y="68" width="340" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_armor_defense" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Armor WAF &amp;amp; DDoS Shield&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Adaptive Protection ML Throttling&lt;br&gt;OWASP Top 10 Injection Mitigation Rules&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="98" width="330" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_model_armor_prompt" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;Google Cloud Model Armor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time Prompt Injection Interceptor&lt;br&gt;Red Teaming Filters &amp;amp; Sensitive Data Shield&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="210" width="330" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_iap_zero_trust" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Identity-Aware Proxy (IAP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Context-Aware Device &amp;amp; Geo Posture Checks&lt;br&gt;Zero Open Inbound Ports on Compute&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="325" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_stride_repudiation" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;[R] Non-Repudiation Logging&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Audit Logs + WORM Storage&lt;br&gt;Digitally Signed E-Signatures (21 CFR Part 11)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="440" width="330" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 3: TRUST BOUNDARY ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="775" y="60" width="380" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;⚙️ Trust Boundary: Sandboxed Compute&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="785" y="68" width="360" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gke_gvisor_mesh" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;GKE Autopilot (gVisor Enclave)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Kernel Isolation to Prevent Container Escape&lt;br&gt;mTLS 1.3 Service Mesh Authentication&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="98" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_workload_identity" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;Workload Identity Federation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Short-Lived OIDC Tokens (No Long-Lived Secret Keys)&lt;br&gt;Least-Privilege Fine-Grained Service Accounts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="210" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_stride_eop" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;[E] Elevation of Privilege Guard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Binary Authorization Policy Enforcement&lt;br&gt;Blocks Unsigned / Tampered Images in Production&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="325" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_secret_mgr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Secret Manager&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Dynamic Ephemeral Database Credentials (KMS CMEK)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="440" width="350" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== ZONE 4: DATA ENCLAVE & VPC-SC ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="60" width="395" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🔒 Data Enclave &amp;amp; VPC-SC Perimeter&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="68" width="375" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_stride_info_disc" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;[I] Information Disclosure Guard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;VPC Service Controls (VPC-SC) Outer Perimeter Wall&lt;br&gt;Zero Data Exfiltration to Unauthorized External Accounts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="98" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_kms_hsm" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud KMS HSM (CMEK Key Vault)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;FIPS 140-2 Level 3 Hardware Root of Trust&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="210" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_scc_gemini_threat" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Security Command Center (SCC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Gemini 3.7 AI Threat Analysis &amp;amp; Chronicle SecOps Ingest&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="325" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_assured_workloads" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;Assured Workloads (FedRAMP / HIPAA)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Data Sovereignty &amp;amp; Resident Personnel Access Guard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="440" width="375" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] Threat Actor -> Cloud Armor -->
        <mxCell id="edge1" value="&lt;b style=&quot;font-size:7px;color:#EF4444;&quot;&gt;[1] L7 Inbound Vectors&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#EF4444;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_threat_actors" target="node_cloud_armor_defense">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [2] Cloud Armor -> Model Armor -->
        <mxCell id="edge2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[2] WAF &amp;amp; DDoS Sanitized&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_cloud_armor_defense" target="node_model_armor_prompt">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] Model Armor -> IAP -->
        <mxCell id="edge3" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[3] Prompt Injection Intercept&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_model_armor_prompt" target="node_iap_zero_trust">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] IAP -> GKE gVisor -->
        <mxCell id="edge4" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[4] Context-Aware Identity Auth&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_iap_zero_trust" target="node_gke_gvisor_mesh">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] GKE -> Workload Identity -->
        <mxCell id="edge5" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[5] Short-Lived OIDC Tokens&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_gke_gvisor_mesh" target="node_workload_identity">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] Workload Identity -> VPC-SC -->
        <mxCell id="edge6" value="&lt;b style=&quot;font-size:7px;color:#9333EA;&quot;&gt;[6] VPC-SC Perimeter Wall Check&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_workload_identity" target="node_stride_info_disc">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] VPC-SC -> KMS HSM -->
        <mxCell id="edge7" value="&lt;b style=&quot;font-size:7px;color:#9333EA;&quot;&gt;[7] FIPS 140-2 Key Decrypt&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_stride_info_disc" target="node_cloud_kms_hsm">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;STRIDE Security Framework:&lt;/b&gt; [S] Spoofing $\rightarrow$ mTLS &amp;nbsp;|&amp;nbsp; [T] Tampering $\rightarrow$ KMS &amp;nbsp;|&amp;nbsp; [R] Repudiation $\rightarrow$ Audit Logs &amp;nbsp;|&amp;nbsp; [I] Disclosure $\rightarrow$ VPC-SC &amp;nbsp;|&amp;nbsp; [D] DoS $\rightarrow$ Armor &amp;nbsp;|&amp;nbsp; [E] Elevation $\rightarrow$ Binary Auth &amp;nbsp;|&amp;nbsp; ── [1]-[7] Protocol Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="658" width="1550" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
