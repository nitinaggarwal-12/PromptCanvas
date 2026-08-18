export function buildMultiFlowZeroTrustPlatformXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="multiflow_zerotrust_platform" name="Enterprise Multi-Flow Zero-Trust &amp; Cognitive Platform Architecture">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🛡️ 🔒&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;ENTERPRISE MULTI-FLOW ZERO-TRUST &amp;amp; COGNITIVE PLATFORM ARCHITECTURE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Multi-Layer Network Flow: BeyondCorp Device Attestation, Cloud Armor WAF, Private GKE Istio Mesh, Model Armor &amp;amp; Confidential BigQuery Lakehouse&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Pro&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Cognitive Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: INGRESS & EDGE PERIMETER ==================== -->
        <mxCell id="box_tier1" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_tier1_hdr" value="&lt;b style=&quot;font-size:12px;color:#991B1B;&quot;&gt;🛡️ TIER 1: ZERO-TRUST INGRESS &amp;amp; EDGE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_clients" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;[1.1] Client &amp;amp; Partner Ingress&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Managed Workstations (FIDO2 Keys)&lt;br&gt;• Partner B2B API Clients (TLS 1.3)&lt;br&gt;• Mobile Enterprise SDKs (mTLS :443)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="diamond_posture" value="&lt;b style=&quot;font-size:13px;color:#991B1B;&quot;&gt;BeyondCorp Attested?&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Endpoint Verification Check&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="115" y="255" width="220" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_armor" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;[1.2] Cloud Armor WAF &amp;amp; Global LB&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Layer 7 DDoS Mitigation &amp;amp; Geo-Fencing&lt;br&gt;• OWASP Top 10 Pre-configured Rules&lt;br&gt;• Global Anycast Ingress VIP&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="365" width="340" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: PRIVATE GKE & SERVICE MESH ==================== -->
        <mxCell id="box_tier2" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_tier2_hdr" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;🔒 TIER 2: PRIVATE GKE &amp;amp; ISTIO MESH&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_envoy" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;[2.1] Istio Envoy Ingress Gateway&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Strict mTLS 1.3 Termination (Port 8443)&lt;br&gt;• SPIFFE Workload ID Verification&lt;br&gt;• Default Deny-All AuthorizationPolicy&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.8;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="diamond_model_armor" value="&lt;b style=&quot;font-size:13px;color:#4C1D95;&quot;&gt;Model Armor Safe?&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Injection &amp;amp; PII Leak Screening&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="545" y="265" width="220" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="node_gke_pods" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;[2.2] GKE Shielded Workload Pods&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Binary Authorization Signed Containers&lt;br&gt;• Read-Only Root Filesystems &amp;amp; Seccomp Profiles&lt;br&gt;• Workload Identity Federation (Zero Secret Keys)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="375" width="360" height="115" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: VERTEX AI & GEMINI REASONING ==================== -->
        <mxCell id="box_tier3" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FDE047;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_tier3_hdr" value="&lt;b style=&quot;font-size:12px;color:#A16207;&quot;&gt;✨ TIER 3: VERTEX AI &amp;amp; GEMINI REASONING&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_pro" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#854D0E;&quot;&gt;✨ Gemini 3.7 Pro Reasoning Cluster&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#713F12;line-height:1.4;padding-top:4px;&quot;&gt;• Multi-Turn Complex Cognitive Synthesis&lt;br&gt;• Strict JSON Schema Validation &amp;amp; Function Calling&lt;br&gt;• ReAct Multi-Step Tool Invocation Loop&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF08A;strokeColor=#EAB308;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="node_rag_pgvector" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#854D0E;&quot;&gt;AlloyDB pgvector Enterprise Knowledge RAG&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#713F12;line-height:1.4;padding-top:4px;&quot;&gt;• 768-dim Vector Embeddings with ScaNN Index&lt;br&gt;• Real-time Context Retrieval &amp;amp; Hybrid Search&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#EAB308;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="270" width="370" height="115" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: SECURE DATA LAKEHOUSE & AUDIT ==================== -->
        <mxCell id="box_tier4" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_tier4_hdr" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;🗄️ TIER 4: CONFIDENTIAL DATA &amp;amp; SIEM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_confidential" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;BigQuery Confidential Lakehouse (CMEK)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Hardware HSM Key Encryption (Cloud KMS)&lt;br&gt;• Row-Level &amp;amp; Column-Level Security Policies&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_chronicle_siem" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;Chronicle SIEM &amp;amp; Security Command Center&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Anomaly Detection &amp;amp; Threat Graph&lt;br&gt;• Automated Incident Response Playbooks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="260" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. TLS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_clients" target="diamond_posture">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. [Valid Posture]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="diamond_posture" target="node_cloud_armor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. mTLS Gateway" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_cloud_armor" target="node_envoy">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Screen Prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_envoy" target="diamond_model_armor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. [Passed Safety]" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="diamond_model_armor" target="node_gke_pods">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Invoke Reasoner" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_gke_pods" target="node_gemini_pro">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e7" value="7. Vector Context" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_gemini_pro" target="node_rag_pgvector">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e8" value="8. Query Data" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_gemini_pro" target="node_bigquery_confidential">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e9" value="9. Audit Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_gke_pods" target="node_chronicle_siem">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
