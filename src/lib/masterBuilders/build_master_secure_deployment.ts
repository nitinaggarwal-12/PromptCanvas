export function buildSecureDeploymentTopologyXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="secure_deployment_topology_map" name="Secure Deployment Topology Map (P4-SEC-P-01)">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🛡️ 🚀&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD END-TO-END SECURE DEPLOYMENT TOPOLOGY (P4-SEC-P-01)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Zero-Trust Software Supply Chain: Gemini Code Assist $\rightarrow$ Cloud Build Vulnerability Scanning $\rightarrow$ Artifact Registry Binary Authorization $\rightarrow$ Cloud Deploy Multi-Target VPC&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini Code Assist&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;DevSecOps AI&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: DEVELOPER WORKSTATION & SCM ==================== -->
        <mxCell id="sec1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="sec1_hdr" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;💻 1. DEVELOPER WORKSTATION &amp;amp; SCM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_dev_copilot" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Developer Workstation + Gemini Code Assist&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• IDE In-Line Security Vulnerability Scanning&lt;br&gt;• Real-time SAST &amp;amp; Secrets Leak Prevention&lt;br&gt;• Signed Git Commits with FIDO2 Hardware Key&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="card_csr" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;🌿 Cloud Source Repositories / GitHub Enterprise&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Protected Main Branch with Multi-Party Approval&lt;br&gt;• Cloud Pub/Sub Webhook Trigger to CI Pipeline&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="260" width="340" height="105" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: SECURE BUILD & ATTESTATION ==================== -->
        <mxCell id="sec2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="sec2_hdr" value="&lt;b style=&quot;font-size:12px;color:#B45309;&quot;&gt;📦 2. CLOUD BUILD &amp;amp; ATTESTATION&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloud_build" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;Cloud Build Private Worker Pool&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• Ephemeral VPC-Peered Build Nodes (No Public IP)&lt;br&gt;• Automated Container Image Hermetic Build&lt;br&gt;• SLSA Level 3 Provenance Metadata Generation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="card_artifact_registry" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;Artifact Registry + Vulnerability Scanner&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• Automated CVE Deep Inspection &amp;amp; SBOM Generation&lt;br&gt;• Binary Authorization Attestor Signs Image with KMS Key&lt;br&gt;• Zero-Trust Policy: Unsigned Images Cannot Deploy&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="260" width="360" height="130" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: CLOUD DEPLOY & PROGRESSIVE ROLLOUT ==================== -->
        <mxCell id="sec3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="sec3_hdr" value="&lt;b style=&quot;font-size:12px;color:#166534;&quot;&gt;🚀 3. CLOUD DEPLOY &amp;amp; TARGET PROMOTION&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloud_deploy" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Google Cloud Deploy Delivery Pipeline&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Declarative Multi-Target Pipeline (Skaffold)&lt;br&gt;• Progressive Canary Verification (10% -&gt; 50% -&gt; 100%)&lt;br&gt;• 1-Click Automated Instant Rollback on Health Alarm&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="card_binauth_enforce" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Binary Authorization Admission Controller&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Intercepts GKE Kubernetes Kube-API Pod Deployment&lt;br&gt;• Validates Cryptographic KMS Attestation Signature&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="265" width="370" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: PRODUCTION VPC & RUNTIME MESH ==================== -->
        <mxCell id="sec4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="sec4_hdr" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;🏢 4. PRODUCTION VPC &amp;amp; HARDENED RUNTIME&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_gke_prod" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;GKE Enterprise Production Cluster&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Shielded GKE Nodes &amp;amp; Workload Identity&lt;br&gt;• Istio Strict mTLS Mesh with Calico Network Policies&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_scc_audit" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;Security Command Center (SCC) Premium&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Container Threat Detection&lt;br&gt;• Automated Compliance Posture Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="260" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. Git Push" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_dev_copilot" target="card_csr">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. Trigger CI" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_csr" target="card_cloud_build">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Push &amp; Sign" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_cloud_build" target="card_artifact_registry">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Release Manifest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_artifact_registry" target="card_cloud_deploy">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Check Attestation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_cloud_deploy" target="card_binauth_enforce">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Deploy Pods" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_binauth_enforce" target="card_gke_prod">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e7" value="7. Audit Posture" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_gke_prod" target="card_scc_audit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
