/**
 * 🎨 Master XML Builder: Google Cloud Federated IAM & SSO Architecture (Zero-Trust BeyondCorp & Workload Identity)
 * Ultra-advanced, hyper-precise mirror replica of media_1786386183328.png with official vendor icons & deep technical specs
 */

export function buildFederatedIamSsoXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="2026-08-10T19:15:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="federated_iam_sso_zerotrust" name="Google Cloud Federated IAM &amp; SSO Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="920" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- MAIN GOOGLE CLOUD CONTAINER (RIGHT: X: 370, Y: 18, W: 1165, H: 865) -->
        <!-- ========================================================================= -->
        <mxCell id="box_gcp_container" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="370" y="18" width="1165" height="865" as="geometry" />
        </mxCell>

        <!-- Google Cloud Header Logo + Title inside GCP Container -->
        <mxCell id="gcp_hdr" value="&lt;table style=&quot;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:10px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;38&quot; height=&quot;30&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:24px;font-weight:500;color:#3C4043;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Google Cloud&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="28" width="220" height="42" as="geometry" />
        </mxCell>

        <!-- Technical Badges in Header -->
        <mxCell id="hdr_tech_badges" value="&lt;div style=&quot;font-size:9.5px;color:#3C4043;font-family:Roboto,sans-serif;&quot;&gt;&lt;span style=&quot;background:#E8F0FE;color:#1A73E8;padding:2px 6px;border-radius:4px;font-weight:bold;&quot;&gt;BeyondCorp Enterprise&lt;/span&gt; &lt;span style=&quot;background:#E6F4EA;color:#137333;padding:2px 6px;border-radius:4px;font-weight:bold;&quot;&gt;Workload Identity Federation&lt;/span&gt; &lt;span style=&quot;background:#FEF7E0;color:#B06000;padding:2px 6px;border-radius:4px;font-weight:bold;&quot;&gt;Zero-Trust IAP Ingress&lt;/span&gt;&lt;/div&gt;" style="text;html=1;align=right;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="930" y="28" width="580" height="35" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 1. EXTERNAL IDENTITY SOURCES (FEDERATED IDP) (TOP LEFT: X: 30, Y: 18, W: 310) -->
        <!-- ========================================================================= -->
        <mxCell id="box_ext_sources" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#94A3B8;strokeWidth=1.5;strokeDashed=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="18" width="310" height="235" as="geometry" />
        </mxCell>
        <mxCell id="lbl_ext_sources_title" value="&lt;b style=&quot;font-size:15px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;External Identity Sources&lt;br&gt;(Federated IdP)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="26" width="290" height="38" as="geometry" />
        </mxCell>

        <!-- External Directory Inner Card (Active Directory / Okta) -->
        <mxCell id="card_ext_directory" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:users.svg&quot; width=&quot;44&quot; height=&quot;44&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;font-weight:bold;color:#202124;padding-top:4px;&quot;&gt;External Directory&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;color:#5F6368;&quot;&gt;(e.g., Active Directory, Okta)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#78909C;padding-top:2px;&quot;&gt;SAML 2.0 / OIDC IdP • SCIM 2.0 Sync&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B0BEC5;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="50" y="78" width="270" height="155" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 2. USER CLIENT (BROWSER/DEVICE) (BOTTOM LEFT: X: 60, Y: 390, W: 240) -->
        <!-- ========================================================================= -->
        <mxCell id="node_user_client" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:laptop.svg&quot; width=&quot;40&quot; height=&quot;40&quot; style=&quot;color:#37474F;&quot;/&gt; &lt;img src=&quot;https://api.iconify.design/lucide:smartphone.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#37474F;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14.5px;font-weight:bold;color:#202124;padding-top:4px;&quot;&gt;User Client&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;color:#5F6368;&quot;&gt;(Browser/Device)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#78909C;&quot;&gt;Managed Workstation • FIDO2 Keys&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="390" width="230" height="115" as="geometry" />
        </mxCell>

        <!-- Arrow: User Client <-> External Directory (1. SSO Authenticate) -->
        <mxCell id="edge_sso_authenticate" value="1. SSO Authenticate" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;startArrow=classic;endArrow=classic;fontColor=#202124;fontSize=12;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="node_user_client" target="card_ext_directory">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="180" y="380" as="sourcePoint" />
            <mxPoint x="180" y="240" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 3. TOP GCP: GOOGLE CLOUD IDENTITY & CONTEXT-AWARE ACCESS (BEYONDCORP) -->
        <!-- ========================================================================= -->
        <!-- Google Cloud Identity Card -->
        <mxCell id="card_cloud_identity" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:10px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:shield-check.svg&quot; width=&quot;38&quot; height=&quot;38&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:16px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Google Cloud Identity&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#5F6368;font-weight:normal;&quot;&gt;Cloud Identity Premium • Directory API (IdP Core)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=8;" vertex="1" parent="1">
          <mxGeometry x="460" y="90" width="280" height="80" as="geometry" />
        </mxCell>

        <!-- Arrow: External Directory <-> Google Cloud Identity (SAML 2.0 or OIDC) -->
        <mxCell id="edge_saml_oidc" value="SAML 2.0 or OIDC" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;startArrow=classic;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_ext_directory" target="card_cloud_identity">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="390" y="130" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Context-Aware Access (BeyondCorp Policies) Large Container (Top Right) -->
        <mxCell id="box_beyondcorp" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EEF6FE;strokeColor=#AECBFA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="780" y="80" width="730" height="350" as="geometry" />
        </mxCell>
        <mxCell id="lbl_beyondcorp_title" value="&lt;b style=&quot;font-size:17px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Context-Aware Access&lt;br&gt;&lt;span style=&quot;font-size:13.5px;color:#3C4043;font-weight:normal;&quot;&gt;(BeyondCorp Policies)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="86" width="630" height="42" as="geometry" />
        </mxCell>

        <!-- 3. Context & Policy Check Card (Inside BeyondCorp) -->
        <mxCell id="card_context_check" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:shield-check.svg&quot; width=&quot;42&quot; height=&quot;42&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:13.5px;font-weight:bold;color:#202124;padding-top:4px;&quot;&gt;3. Context &amp;amp;&lt;br&gt;Policy Check&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;padding-top:2px;&quot;&gt;Access Context&lt;br&gt;Manager (ACM)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="805" y="210" width="155" height="185" as="geometry" />
        </mxCell>

        <!-- 2. Device Context (Right inside BeyondCorp) -->
        <mxCell id="card_device_context" value="&lt;div style=&quot;font-size:13px;font-weight:bold;color:#202124;&quot;&gt;2. Device Context&lt;/div&gt;&lt;div style=&quot;font-size:10px;color:#5F6368;margin-top:2px;&quot;&gt;e.g. Device encryption status,&lt;br&gt;management state,&lt;br&gt;Endpoint Verification signal&lt;/div&gt;&lt;div style=&quot;font-size:7.5px;color:#78909C;margin-top:2px;&quot;&gt;Chrome Enterprise Core • Jamf / Intune MDM Integration&lt;/div&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=10;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="160" width="480" height="80" as="geometry" />
        </mxCell>

        <!-- 3. Network Context (Right inside BeyondCorp) -->
        <mxCell id="card_network_context" value="&lt;div style=&quot;font-size:13px;font-weight:bold;color:#202124;&quot;&gt;3. Network Context&lt;/div&gt;&lt;div style=&quot;font-size:10px;color:#5F6368;margin-top:2px;&quot;&gt;e.g. Source IP address,&lt;br&gt;geographic location&lt;/div&gt;&lt;div style=&quot;font-size:7.5px;color:#78909C;margin-top:2px;&quot;&gt;Trusted CIDR Subnets • Geo-IP Risk &amp;amp; Impossible Travel Engine&lt;/div&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=10;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="275" width="480" height="80" as="geometry" />
        </mxCell>

        <!-- Connector: Device Context -> Context & Policy Check -->
        <mxCell id="edge_device_to_check" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_device_context" target="card_context_check">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Connector: Network Context -> Context & Policy Check -->
        <mxCell id="edge_network_to_check" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_network_context" target="card_context_check">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Connector: Google Cloud Identity -> BeyondCorp Box (1. User Identity & Group Membership) -->
        <mxCell id="edge_identity_to_beyondcorp_top" value="1. User Identity &amp;amp;&lt;br&gt;Group Membership" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_cloud_identity" target="box_beyondcorp">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="750" y="110" />
              <mxPoint x="750" y="110" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Connector: Google Cloud Identity -> 3. Context & Policy Check (1. User Identity & Group Membership) -->
        <mxCell id="edge_identity_to_context_check" value="1. User Identity &amp;amp; Group Membership" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;startArrow=classic;fontColor=#202124;fontSize=11;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_cloud_identity" target="card_context_check">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="600" y="245" />
              <mxPoint x="750" y="245" />
              <mxPoint x="750" y="245" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 4. MIDDLE GCP: IDENTITY-AWARE PROXY (IAP) & TARGET WORKLOADS -->
        <!-- ========================================================================= -->
        <!-- Identity-Aware Proxy Card -->
        <mxCell id="card_iap" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:8px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;32&quot; height=&quot;32&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:13.5px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Identity-&lt;br&gt;Aware&lt;br&gt;Proxy&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;font-weight:normal;&quot;&gt;Envoy L7 Interceptor&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="400" y="375" width="175" height="100" as="geometry" />
        </mxCell>

        <!-- Arrow: User Client -> Identity-Aware Proxy (2. Access Request) -->
        <mxCell id="edge_user_to_iap" value="2. Access Request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=12;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="node_user_client" target="card_iap">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Arrow: Identity-Aware Proxy -> Google Cloud Identity (User and group synchronization) -->
        <mxCell id="edge_iap_to_cloud_identity" value="User and group&lt;br&gt;synchronization" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=10.5;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_iap" target="card_cloud_identity">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="487" y="270" />
              <mxPoint x="550" y="270" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3 Workload Target Cards (Stacked vertically) -->
        <!-- 1. App Engine App -->
        <mxCell id="card_app_engine" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:gauge.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;App Engine&lt;br&gt;App&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;font-weight:normal;&quot;&gt;Serverless Web App&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="610" y="320" width="190" height="60" as="geometry" />
        </mxCell>

        <!-- 2. Cloud Run Service -->
        <mxCell id="card_cloud_run" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud-run.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Cloud Run&lt;br&gt;Service&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;font-weight:normal;&quot;&gt;Microservices Container&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="610" y="395" width="190" height="60" as="geometry" />
        </mxCell>

        <!-- 3. Compute Engine instance (via Load Balancer) -->
        <mxCell id="card_compute_engine" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cpu.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Compute Engine&lt;br&gt;instance&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#5F6368;font-weight:normal;&quot;&gt;(via Load Balancer / IAP TCP)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="595" y="470" width="215" height="68" as="geometry" />
        </mxCell>

        <!-- Connectors: IAP -> App Engine, Cloud Run, Compute Engine -->
        <mxCell id="edge_iap_to_appengine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_iap" target="card_app_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="585" y="415" />
              <mxPoint x="585" y="350" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_iap_to_cloudrun" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_iap" target="card_cloud_run">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_iap_to_gce" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_iap" target="card_compute_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="585" y="445" />
              <mxPoint x="585" y="504" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Arrow: 3. Context & Policy Check -> Workloads (Allow/Deny Access) -->
        <mxCell id="edge_check_to_workloads" value="Allow/Deny&lt;br&gt;Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_context_check" target="card_app_engine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="825" y="350" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 5. MIDDLE RIGHT GCP: CLOUD IAM & IAM POLICY -->
        <!-- ========================================================================= -->
        <!-- Cloud IAM Card -->
        <mxCell id="card_cloud_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:shield.svg&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:14px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Cloud IAM&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;font-weight:normal;&quot;&gt;Fine-Grained RBAC&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="895" y="470" width="155" height="68" as="geometry" />
        </mxCell>

        <!-- Arrow: Compute Engine -> Cloud IAM (4. IAM) -->
        <mxCell id="edge_gce_to_iam" value="4. IAM" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_compute_engine" target="card_cloud_iam">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- IAM Policy Document Shape (Folded Corner Note) -->
        <mxCell id="card_iam_policy" value="&lt;div style=&quot;font-size:12.5px;font-weight:bold;color:#202124;margin-bottom:6px;&quot;&gt;IAM policy&lt;/div&gt;&lt;div style=&quot;font-size:9.5px;color:#37474F;font-family:Roboto Mono,monospace;&quot;&gt;Roles:&lt;br&gt;roles/iap.groups app&lt;br&gt;roles/iap.httpsResourceAccessor&lt;br&gt;roles/compute.viewer&lt;br&gt;roles/iam.workloadIdentityUser&lt;/div&gt;" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;align=left;spacingLeft=8;spacingTop=6;fillColor=#FFFFFF;strokeColor=#B0BEC5;strokeWidth=1.5;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1145" y="445" width="260" height="125" as="geometry" />
        </mxCell>

        <!-- Arrow: Cloud IAM -> IAM Policy (5. Backend Access) -->
        <mxCell id="edge_iam_to_policy" value="5. Backend&lt;br&gt;Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_cloud_iam" target="card_iam_policy">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 6. BOTTOM LAYER: GKE & WORKLOAD IDENTITY -->
        <!-- ========================================================================= -->
        <!-- Workload Identity Large Container (Bottom Right) -->
        <mxCell id="box_workload_identity" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EEF6FE;strokeColor=#AECBFA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="385" y="615" width="1135" height="245" as="geometry" />
        </mxCell>
        <mxCell id="lbl_workload_identity_top" value="&lt;b style=&quot;font-size:16px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Workload Identity&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="640" y="622" width="400" height="25" as="geometry" />
        </mxCell>
        <mxCell id="lbl_workload_identity_bot" value="&lt;b style=&quot;font-size:14.5px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Workload Identity&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="640" y="815" width="400" height="25" as="geometry" />
        </mxCell>

        <!-- GKE: Application Workload Running Card (Left Bottom) -->
        <mxCell id="card_gke_workload" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:kubernetes.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Application workload&lt;br&gt;running&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;font-weight:normal;&quot;&gt;Pod / Deployment Container&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="685" width="225" height="70" as="geometry" />
        </mxCell>
        <mxCell id="lbl_gke_footer" value="&lt;b style=&quot;font-size:14px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Google Kubernetes&lt;br&gt;Engine (GKE)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="85" y="765" width="225" height="40" as="geometry" />
        </mxCell>

        <!-- Arrow: Identity-Aware Proxy -> GKE (Context-Aware Access BeyondCorp Policies) -->
        <mxCell id="edge_iap_to_gke" value="Context-Aware Access&lt;br&gt;(BeyondCorp Policies)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_iap" target="card_gke_workload">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="487" y="550" />
              <mxPoint x="197" y="550" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Kubernetes Service Account (KSA) Card -->
        <mxCell id="card_ksa" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:kubernetes.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Kubernetes&lt;br&gt;Service&lt;br&gt;Account (KSA)&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#5F6368;font-weight:normal;&quot;&gt;k8s-sa-identity&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="415" y="680" width="190" height="78" as="geometry" />
        </mxCell>

        <!-- Arrow: GKE Workload -> KSA -->
        <mxCell id="edge_workload_to_ksa" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_gke_workload" target="card_ksa">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Workload Identity Link Badge (Chain Icon & Bindings) -->
        <mxCell id="badge_chain_link" value="&lt;img src=&quot;https://api.iconify.design/lucide:link.svg&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;color:#1A73E8;&quot;/&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="695" width="70" height="48" as="geometry" />
        </mxCell>
        <mxCell id="lbl_bound_binding" value="&lt;span style=&quot;font-size:11px;font-weight:bold;color:#202124;&quot;&gt;Bound&lt;br&gt;binding&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=bottom;" vertex="1" parent="1">
          <mxGeometry x="615" y="655" width="70" height="35" as="geometry" />
        </mxCell>
        <mxCell id="lbl_iam_bindings" value="&lt;span style=&quot;font-size:11px;font-weight:bold;color:#202124;&quot;&gt;IAM policy&lt;br&gt;bindings&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=bottom;" vertex="1" parent="1">
          <mxGeometry x="770" y="655" width="90" height="35" as="geometry" />
        </mxCell>

        <!-- Google Service Account (GSA) Card -->
        <mxCell id="card_gsa" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:key.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Google Service&lt;br&gt;Account (GSA)&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#5F6368;font-weight:normal;&quot;&gt;sa@project.iam.gserviceaccount.com&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="870" y="680" width="195" height="78" as="geometry" />
        </mxCell>

        <!-- Connections through Link Badge: KSA -> Link -> GSA -->
        <mxCell id="edge_ksa_to_link" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_ksa" target="badge_chain_link">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_link_to_gsa" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="badge_chain_link" target="card_gsa">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Target GCP Resources (Cloud Storage & BigQuery) -->
        <mxCell id="card_cloud_storage" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud-storage.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;Cloud&lt;br&gt;Storage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1200" y="660" width="165" height="54" as="geometry" />
        </mxCell>

        <mxCell id="card_bigquery" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-bigquery.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#202124;text-align:left;&quot;&gt;BigQuery&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1200" y="735" width="165" height="54" as="geometry" />
        </mxCell>

        <!-- Arrow: GSA -> Cloud Storage & BigQuery (IAM) -->
        <mxCell id="edge_gsa_to_storage" value="IAM" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_gsa" target="card_cloud_storage">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1130" y="719" />
              <mxPoint x="1130" y="687" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_gsa_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_gsa" target="card_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1130" y="719" />
              <mxPoint x="1130" y="762" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Long Control Arrows for Workload Identity: -->
        <!-- 1. Top long line: 6. Workload Identity API Call from GKE Workload to GSA -->
        <mxCell id="edge_workload_api_call" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_gke_workload" target="card_gsa">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="197" y="645" />
              <mxPoint x="967" y="645" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 2. Bottom long line: 6. Short-lived credentials from GSA to GKE Workload -->
        <mxCell id="edge_short_lived_creds" value="6. Workload Identity API Call &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; 6. Short-lived credentials" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=classic;fontColor=#202124;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;align=center;" edge="1" parent="1" source="card_gsa" target="card_gke_workload">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="967" y="795" />
              <mxPoint x="197" y="795" />
            </Array>
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
