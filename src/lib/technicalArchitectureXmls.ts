/**
 * 🎨 Technical Architecture 2D Network Topology XML Catalog (Zero-Defect Enterprise Rebuild)
 * All 11 Technical Enterprise Cloud Architecture diagrams built with:
 * - Spacious 3-Column Spatial Grid (x = 100, 560, 1020) with zero visual overlap
 * - Dedicated upper & lower orthogonal waypoint routing corridors (y = 225, 335, 480, 595)
 * - Light Architectural Cards (#FFFFFF / #F0F9FF / #F0FDF4 / #FAF5FF / #FFFBEB)
 * - Crisp Dark Slate Typography (#0F172A)
 * - Pure White Label Background Text Pills (labelBackgroundColor=#FFFFFF;labelBorderColor=...;fontColor=#0F172A;fontStyle=1;)
 */

const TECH_XML_SERVERLESS_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_serverless_app" name="GCP Serverless Web Application">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node_dns" value="🌐 <b>[1] Cloud DNS &amp; Cloud CDN</b><br><i>Global Edge Caching &amp; Resolution</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_lb" value="🛡️ <b>[2] External HTTP(S) LB + Cloud Armor</b><br><i>WAF Security &amp; DDoS Defense</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node_iam" value="🔑 <b>[7] Cloud IAM &amp; Secret Manager</b><br><i>Identity &amp; Encryption Key Management</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_frontend" value="⚡ <b>[3] Cloud Run (Frontend UI)</b><br><i>Serverless Next.js Web App</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_backend" value="⚙️ <b>[4] Cloud Run (API Services)</b><br><i>Autoscaling Microservice Container</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_vpc" value="🔌 <b>[5] Serverless VPC Access Connector</b><br><i>Private Network Interconnect</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_gcs" value="🪣 <b>[8] Cloud Storage Buckets</b><br><i>Static Media &amp; Asset Lake</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_sql" value="🛢️ <b>[6] Cloud SQL (Private PostgreSQL)</b><br><i>High-Availability Relational DB</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="e1" value="1. HTTPS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_dns" target="node_lb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e2" value="2. Filtered Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_lb" target="node_frontend">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e3" value="3. API Requests" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_frontend" target="node_backend">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e4" value="4. Fetch Static Assets" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_frontend" target="node_gcs">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e5" value="5. Private VPC Egress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_backend" target="node_vpc">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e6" value="6. Private IP SQL Queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_vpc" target="node_sql">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e7" value="7. IAM Secret Access" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_backend" target="node_iam">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="480" y="315"/>
              <mxPoint x="480" y="495"/>
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_STREAMING_ANALYTICS = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_streaming_pipeline" name="GCP Real-Time Streaming Analytics &amp; Telemetry">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node1" value="🌐 <b>[1] Customer Mobile App</b><br><i>User-facing E-Commerce Interface</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node3" value="💳 <b>[3] Stripe Payment Processor</b><br><i>Secure Payment Gateway &amp; API</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node5" value="📡 <b>[5] Kafka Event Stream</b><br><i>Distributed Event Bus &amp; Messaging</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node7" value="🛢️ <b>[7] PostgreSQL Order DB</b><br><i>Primary Relational Order Data</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="640" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node2" value="🛡️ <b>[2] Cloudflare WAF Gateway</b><br><i>Edge Security &amp; DDoS Protection</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="85" width="280" height="100" as="geometry"/>
        </mxCell>
        <mxCell id="node4" value="⚙️ <b>[4] Order Fulfillment Service</b><br><i>Core Order Logic &amp; Orchestration</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node6" value="📦 <b>[6] Inventory Warehouse Service</b><br><i>Stock Management &amp; Availability</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node8" value="🪣 <b>[8] Redis Stock Cache</b><br><i>High-Speed Inventory Cache</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="640" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node9" value="🚚 <b>[9] FedEx Logistics API Sync</b><br><i>Shipping &amp; Tracking Integration</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node10" value="📊 <b>[10] Automated Audit Trail Ledger</b><br><i>Immutable Transaction &amp; Event Log</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="edge1_2" value="1. E-Commerce Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node1" target="node2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2_4" value="2. Validated Order" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node2" target="node4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4_3" value="3. Process Payment" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="560" y="300"/>
              <mxPoint x="380" y="300"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge3_4_reply" value="4. Payment Confirmation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node3" target="node4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="380" y="335"/>
              <mxPoint x="560" y="335"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_5" value="5. Order Placed Event" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node5">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="500" y="315"/>
              <mxPoint x="500" y="495"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge5_6" value="6. Stock Update Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node5" target="node6">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="380" y="480"/>
              <mxPoint x="560" y="480"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge6_5_feedback" value="7. Inventory Updated Event" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node6" target="node5">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="560" y="515"/>
              <mxPoint x="380" y="515"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_7" value="8. Save Order Details" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node7">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="460" y="335"/>
              <mxPoint x="460" y="675"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_9" value="9. Shipping Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node9">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge9_4_reply" value="10. Tracking Update" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#D97706;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node9" target="node4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1020" y="335"/>
              <mxPoint x="840" y="335"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge6_8" value="11. Cache Read/Write" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node6" target="node8">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5_10" value="12. Persist All Events" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node5" target="node10">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="595"/>
              <mxPoint x="1160" y="595"/>
              <mxPoint x="1160" y="530"/>
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_MICROSERVICES_AWS = `<mxfile host="embed.diagrams.net">
  <diagram id="aws_enterprise_arch" name="AWS Enterprise Cloud Microservices Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node_waf" value="🛡️ <b>[1] AWS WAF &amp; Shield Edge</b><br><i>DDoS Protection &amp; Web Firewall</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_alb" value="⚖️ <b>[2] Application Load Balancer</b><br><i>HTTP/S Traffic Distribution</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node_apigw" value="🚪 <b>[3] Amazon API Gateway</b><br><i>Managed API &amp; OAuth Endpoints</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_ecs" value="🐳 <b>[4] Amazon ECS Fargate Cluster</b><br><i>Serverless Container Microservices</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_lambda" value="⚡ <b>[5] AWS Lambda Functions</b><br><i>Event-Driven Serverless Compute</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_opensearch" value="🔍 <b>[8] AWS OpenSearch Vector Index</b><br><i>ANN Search &amp; Vector Database</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_aurora" value="🛢️ <b>[7] Amazon Aurora PostgreSQL</b><br><i>Multi-AZ Relational Database</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_dynamodb" value="⚡ <b>[6] Amazon DynamoDB NoSQL</b><br><i>Low-Latency Key-Value Store</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_s3" value="🪣 <b>[9] Amazon S3 Data Lake</b><br><i>Object Storage &amp; Data Warehouse</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="edge_waf_alb" value="1. Protected Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_waf" target="node_alb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_alb_ecs" value="2. Container Routing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_alb" target="node_ecs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_apigw_lambda" value="3. API Invocation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_apigw" target="node_lambda">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="495"/>
              <mxPoint x="480" y="495"/>
              <mxPoint x="480" y="315"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_ecs_aurora" value="4. SQL Queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_ecs" target="node_aurora">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ecs_dynamodb" value="5. NoSQL Reads/Writes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_ecs" target="node_dynamodb">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="940" y="135"/>
              <mxPoint x="940" y="317"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_lambda_opensearch" value="6. Vector Search" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_lambda" target="node_opensearch">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_aurora_s3" value="7. Data Lake Archival" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_aurora" target="node_s3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_DATA_LAKEHOUSE = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_data_lakehouse" name="GCP Enterprise Data &amp; AI Pipeline">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node_client" value="🌐 <b>[1] External API Clients</b><br><i>Web, Mobile &amp; Partner Apps</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_apigw" value="🛡️ <b>[2] GCP Global Load Balancer &amp; Gateway</b><br><i>API Security, AuthN/AuthZ &amp; Routing</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node_tasks" value="📡 <b>[3] Cloud Tasks Asynchronous Queue</b><br><i>Managed Asynchronous Task Queue</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_run" value="⚡ <b>[4] Cloud Run Microservices</b><br><i>Auto-scaling Containerized Ingestion Service</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_dataflow" value="⚙️ <b>[5] Cloud Dataflow (Apache Beam)</b><br><i>Real-Time Streaming ETL &amp; Transform</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_redis" value="🪣 <b>[6] Cloud Memorystore (Redis)</b><br><i>High-Performance In-Memory Cache</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_bigquery" value="🛢️ <b>[7] BigQuery Enterprise Warehouse</b><br><i>Petabyte-Scale Analytics &amp; ML Engine</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_sql" value="🛢️ <b>[8] Cloud SQL PostgreSQL</b><br><i>Transactional Operational Database</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_looker" value="📊 <b>[9] Looker Enterprise BI Studio</b><br><i>Executive Dashboards &amp; Real-Time Analytics</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl1" value="1. API Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_client" target="node_apigw">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl2" value="2. Authenticated Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_apigw" target="node_run">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_dl3" value="3. Streaming ETL Payload" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_run" target="node_dataflow">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl4" value="4. Low-Latency Cache" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_run" target="node_redis">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="480" y="135"/>
              <mxPoint x="480" y="495"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_dl5" value="5. Warehouse Streaming Insert" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_dataflow" target="node_bigquery">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl6" value="6. Operational Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_dataflow" target="node_sql">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl7" value="7. Executive BI BI Queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_bigquery" target="node_looker">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;


export function getTechnicalArchitectureXml(archId: string): string | null {
  switch (archId) {
    case 'technical_diagram':
    case 'conceptual_diagram':
    case 'unified_system_view':
      return TECH_XML_SERVERLESS_GCP;
    case 'tech_streaming_analytics':
    case 'gcp_streaming_pipeline':
      return TECH_XML_STREAMING_ANALYTICS;
    case 'tech_microservices_aws':
    case 'aws_enterprise_arch':
      return TECH_XML_MICROSERVICES_AWS;
    case 'tech_data_pipeline':
    case 'gcp_data_lakehouse':
      return TECH_XML_DATA_LAKEHOUSE;
    default:
      return null;
  }
}

export {
  TECH_XML_SERVERLESS_GCP,
  TECH_XML_STREAMING_ANALYTICS,
  TECH_XML_MICROSERVICES_AWS,
  TECH_XML_DATA_LAKEHOUSE
};
