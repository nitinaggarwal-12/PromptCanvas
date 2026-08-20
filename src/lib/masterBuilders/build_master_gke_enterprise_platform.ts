export function buildGkeEnterprisePlatformXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="gke_enterprise_platform" name="GKE / Kubernetes Enterprise Platform Architecture (NEW-PLAT-02)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;GKE Enterprise Platform &amp;amp; Multi-Cluster Service Mesh Architecture (NEW-PLAT-02 / #52)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Google Cloud GKE Enterprise Fleet • Anthos Service Mesh • Cilium eBPF CNI • Workload Identity Federation &amp;amp; Policy Controller&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#2563EB;&quot;&gt;GKE Enterprise Fleet&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Multi-Cluster Mesh Platform&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: FLEET & CLUSTER GOVERNANCE -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🌐 FLEET MANAGEMENT &amp;amp; GIT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gitops_config" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;📦 Config Sync (GitOps)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Declarative K8s Manifests in Git&lt;br&gt;• Root &amp;amp; Tenant Namespace Sync&lt;br&gt;• Automated Drift Detection &amp;amp; Correction&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_policy_controller" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🛡️ Policy Controller (Gatekeeper)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• CIS K8s Benchmarks Enforced&lt;br&gt;• Pod Security Standards (Restricted)&lt;br&gt;• Admission Controller Webhook Gate&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="225" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_artifact_reg" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🗄️ Artifact Registry &amp;amp; BinAuthz&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Signed Immutable Container Images&lt;br&gt;• Binary Authorization Attestations&lt;br&gt;• Automatic Vulnerability Scanning&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="315" width="210" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: INGRESS & MULTI-CLUSTER GATEWAY -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚖️ MULTI-CLUSTER GATEWAY&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gke_gateway" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌐 GKE Multi-Cluster Ingress (MCI)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Global External HTTPS LB&lt;br&gt;• Cross-Cluster Active/Active Routing&lt;br&gt;• Sub-Second Regional Failover&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="135" width="210" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_asm_ingress" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🚪 Anthos Service Mesh (ASM)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Managed Envoy Ingress Proxy&lt;br&gt;• Strict mTLS 1.3 Service Mesh&lt;br&gt;• JWT Auth &amp;amp; Canary Traffic Splitting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="235" width="210" height="80" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: GKE CLUSTER RUNTIME CORE -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="590" y="85" width="440" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;☸️ GKE ENTERPRISE RUNTIME PODS &amp;amp; NAMESPACES&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="85" width="440" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_prod_namespace" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;📁 Tenant Namespace: prod-payment-mesh&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• App Pods with Envoy Sidecar Proxy&lt;br&gt;• Workload Identity bound to K8s ServiceAccount&lt;br&gt;• Cilium eBPF Network Policies (L3/L4/L7 Isolation)&lt;br&gt;• Ephemeral Local SSDs for Scratch Work&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="130" width="410" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="card_ai_agent_namespace" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;📁 AI Agent Namespace: prod-agent-runtime&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• GKE Autopilot gVisor Sandboxed MicroVM Pods&lt;br&gt;• MCP Tool Worker Pods &amp;amp; Agent Protocol Executors&lt;br&gt;• GPU/TPU Accelerator Node Pools (v5e Slices)&lt;br&gt;• Dynamic Horizontal Pod Autoscaler (HPA + KEDA)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="245" width="410" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="card_node_autoscaler" value="&lt;b style=&quot;font-size:9.5px;color:#166534;&quot;&gt;⚙️ Cluster Autoscaler &amp;amp; Node Auto-Provisioning (NAP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Dynamic Spot Instances, Multi-Zone Balancing &amp;amp; Zero-Downtime Blue/Green Node Upgrades&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="605" y="360" width="410" height="55" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: SECURITY & WORKLOAD IDENTITY -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🔒 IDENTITY &amp;amp; SECRETS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_workload_id" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🔑 Workload Identity Federation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Zero Static Service Account Keys,&lt;br&gt;Short-lived OIDC Token Exchange&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1085" y="135" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_secret_manager" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🔐 Secret Manager CSI Driver&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Encrypted Volumes Mounted Directly,&lt;br&gt;CMEK Hardware Key Protection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1085" y="230" width="210" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 5: OBSERVABILITY & TELEMETRY -->
        <mxCell id="col5_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1350" y="85" width="220" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📊 SRE &amp;amp; OBSERVABILITY&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1350" y="85" width="220" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_ops" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;📈 Google Cloud Managed Prometheus&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cluster health metrics, Pod CPU/RAM, SLO dashboards &amp;amp; alerting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1360" y="135" width="200" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_trace" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🔍 Cloud Trace &amp;amp; Logging&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Istio/Envoy distributed tracing spans with BigQuery telemetry export&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1360" y="230" width="200" height="75" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_git_to_cluster" value="1. GitOps Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#334155;fontColor=#1E293B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_gitops_config" target="card_gke_gateway"/>
        <mxCell id="edge_gw_to_pods" value="2. mTLS Service Mesh" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_asm_ingress" target="card_prod_namespace"/>
        <mxCell id="edge_pods_to_iam" value="3. Token Exchange" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#DC2626;fontColor=#991B1B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_ai_agent_namespace" target="card_workload_id"/>
        <mxCell id="edge_pods_to_telemetry" value="4. Metrics / Logs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=9.5;dashed=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_node_autoscaler" target="card_cloud_ops"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
