export function buildWorkloadIdentityAuthorizationXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="workload_identity_auth" name="Workload Identity &amp; Service-to-Service Authorization Architecture (NEW-SEC-05)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Workload Identity &amp;amp; Service-to-Service Authorization Architecture (NEW-SEC-05 / #55)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Workload Identity Federation (WIF) • Short-Lived OIDC Tokens • SPIFFE/SPIRE Service Mesh • Zero Static Keys&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#DC2626;&quot;&gt;Zero Static Keys&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;OIDC Token Federation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: EXTERNAL & WORKLOAD CLIENTS -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="260" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;💻 CALLER WORKLOAD IDENTITIES&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="260" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_k8s_sa" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;☸️ GKE Kubernetes ServiceAccount (KSA)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Pod Projected OIDC Service Account Token&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="230" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_github_actions" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🐙 GitHub Actions / GitLab CI Runner&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OpenID Connect (OIDC) JWT Token Provider&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="220" width="230" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_multicloud_aws" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;☁️ AWS IAM Role / Azure Managed Identity&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cross-Cloud Federated Caller Credentials&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="305" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: WORKLOAD IDENTITY POOL & STS -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="85" width="310" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🛡️ SECURITY TOKEN SERVICE (STS)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="330" y="85" width="310" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_wif_pool" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🏊 Workload Identity Pool &amp;amp; Provider&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Attribute Mapping: google.subject=assertion.sub,&lt;br&gt;attribute.repository=assertion.repository&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="135" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_sts_exchange" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🔄 STS Token Exchange (RFC 8693)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Exchanges 3rd-party OIDC JWT for a&lt;br&gt;Federated Google Access Token (15-min TTL)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="230" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: IAM SERVICE ACCOUNT IMPERSONATION -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="680" y="85" width="350" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🔑 IAM SERVICE ACCOUNT IMPERSONATION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="85" width="350" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gsa" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;👤 Google Service Account (GSA)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;PrincipalSet Binding:&lt;br&gt;principalSet://iam.googleapis.com/projects/.../attribute.repository/my-org/my-repo&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="695" y="135" width="320" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_iam_credentials_api" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;⚡ IAM Credentials API (generateAccessToken)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Issues scoped Google OAuth token with least-privilege IAM roles&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="695" y="230" width="320" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: PROTECTED TARGET RESOURCES -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="500" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🛡️ PROTECTED GOOGLE CLOUD RESOURCES &amp;amp; AUDIT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="500" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_secrets_access" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🔐 Secret Manager (Secret Accessor Role)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Payload decryption with VPC Service Control perimeter check&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1090" y="135" width="460" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_bigquery_access" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🏛️ BigQuery &amp;amp; Vertex AI Model Endpoints&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Scoped dataset querying &amp;amp; model prediction invocation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1090" y="220" width="460" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_audit" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;👁️ Cloud Audit Logs &amp;amp; Security Command Center&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Tracks caller identity, IP, principalSet, service account &amp;amp; API calls in real time&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1090" y="305" width="460" height="65" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_k8s_to_wif" value="1. Send OIDC JWT" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#334155;fontColor=#1E293B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_k8s_sa" target="card_wif_pool"/>
        <mxCell id="edge_wif_to_gsa" value="2. Validate &amp; Exchange" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#DC2626;fontColor=#991B1B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_sts_exchange" target="card_gsa"/>
        <mxCell id="edge_gsa_to_resource" value="3. Scoped Short-lived Token" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_iam_credentials_api" target="card_secrets_access"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
