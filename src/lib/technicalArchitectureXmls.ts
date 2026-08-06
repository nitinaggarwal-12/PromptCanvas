/**
 * 🎨 Technical Cloud Architecture 2D Network Topology XML Catalog (Zero-Defect Enterprise Rebuild)
 * All 12 Technical Enterprise Cloud Architecture diagrams built with:
 * - Authentic Cloud Network Topologies (VPC CIDRs, Private Subnets, Cloud Armor WAF, Private Service Connect, Cloud NAT, Security Groups)
 * - Spacious 3-Column Spatial Grid (x = 100, 560, 1020) with zero visual overlap
 * - Dedicated orthogonal waypoint routing corridors (y = 225, 335, 480, 595)
 * - Pure White Label Background Text Pills for 100% legibility
 */

// 1. GCP Serverless Web Application Architecture
const TECH_XML_SERVERLESS_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_serverless_app" name="GCP Serverless Web Application (Production VPC 10.128.0.0/16)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node_dns" value="🌐 <b>[1] Cloud DNS &amp; Cloud CDN</b><br><i>Global Edge Anycast &amp; Anycast Caching</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_lb" value="🛡️ <b>[2] External HTTPS LB + Cloud Armor</b><br><i>WAF Rules (SQLi/XSS Block + 1000 req/m Rate Limit)</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node_iam" value="🔑 <b>[7] Cloud IAM &amp; Secret Manager</b><br><i>KMEK Encryption Keys &amp; Least-Privilege SA</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_frontend" value="⚡ <b>[3] Cloud Run UI (Private App Subnet)</b><br><i>Serverless Next.js Web App (10.128.10.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_backend" value="⚙️ <b>[4] Cloud Run API Microservices</b><br><i>Autoscaling Go/Node API (10.128.10.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_vpc" value="🔌 <b>[5] Serverless VPC Access Connector</b><br><i>Dedicated Egress Range (10.8.0.0/28)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_gcs" value="🪣 <b>[8] Cloud Storage Buckets (CMEK)</b><br><i>Static Media Lake &amp; Private Assets</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_sql" value="🛢️ <b>[6] Cloud SQL HA PostgreSQL (10.128.20.5)</b><br><i>Private IP Only + Regional Multi-AZ Replica</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="e1" value="1. HTTPS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_dns" target="node_lb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e2" value="2. WAF Filtered Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_lb" target="node_frontend">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e3" value="3. gRPC/HTTP API Requests" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_frontend" target="node_backend">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e4" value="4. Private Google Access Asset Load" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_frontend" target="node_gcs">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e5" value="5. Private VPC Egress (10.8.0.0/28)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_backend" target="node_vpc">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e6" value="6. Private IP SQL Query (10.128.20.5)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_vpc" target="node_sql">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e7" value="7. IAM Secret Access &amp; CMEK" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_backend" target="node_iam">
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

// 2. GCP Real-Time Streaming Analytics & Telemetry Pipeline (Authentic Streaming Architecture)
const TECH_XML_STREAMING_ANALYTICS = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_streaming_pipeline" name="GCP Real-Time Streaming Analytics &amp; Telemetry Pipeline">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node1" value="🌐 <b>[1] IoT Devices &amp; App Telemetry</b><br><i>MQTT / HTTPS Event Producers</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node2" value="🛡️ <b>[2] Global External LB + Cloud Armor</b><br><i>Edge Token Validation &amp; DDoS Protection</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node3" value="📡 <b>[3] Cloud Pub/Sub Streaming Topics</b><br><i>High-Throughput Global Event Bus (10.128.5.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node4" value="⚙️ <b>[4] Cloud Dataflow Apache Beam Workers</b><br><i>Private Subnet Stream ETL (10.128.15.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node5" value="🧠 <b>[5] Vertex AI Feature Store (Online)</b><br><i>Low-Latency Real-Time Feature Ingestion</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node6" value="🛢️ <b>[6] Cloud Bigtable (10.128.25.5)</b><br><i>Sub-10ms Time-Series Telemetry Store</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node7" value="🛢️ <b>[7] BigQuery Enterprise Warehouse</b><br><i>Partitioned Telemetry Lakehouse &amp; SQL Engine</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node8" value="📊 <b>[8] Looker Enterprise Real-Time BI</b><br><i>Executive Operational Dashboards &amp; Alerting</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="edge1_2" value="1. Telemetry Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node1" target="node2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2_3" value="2. Validated Pub/Sub Publish" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node2" target="node3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3_4" value="3. Streaming Pull Subscription" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node3" target="node4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="480" y="495"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_5" value="4. Online Feature Writes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4_6" value="5. Time-Series Row Insertion" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node6">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="480" y="135"/>
              <mxPoint x="480" y="495"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_7" value="6. Storage Write API (BigQuery)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node7">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7_8" value="7. BI SQL Query Execution" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node7" target="node8">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 3. AWS Production Kubernetes & Zero-Trust VPC Infrastructure
const TECH_XML_MICROSERVICES_AWS = `<mxfile host="embed.diagrams.net">
  <diagram id="aws_enterprise_arch" name="AWS Production Kubernetes &amp; Zero-Trust VPC Infrastructure (10.0.0.0/16)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node_waf" value="🛡️ <b>[1] Route 53 DNS &amp; AWS WAF + Shield</b><br><i>Edge DDoS Inspection &amp; Web Security</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_alb" value="⚖️ <b>[2] Application Load Balancer (Public Subnet)</b><br><i>ALB Ingress Controller (10.0.1.0/24, 10.0.2.0/24)</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node_nat" value="🚪 <b>[3] NAT Gateway &amp; Transit Gateway</b><br><i>Multi-AZ Outbound Egress &amp; VPC Peering</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_ecs" value="🐳 <b>[4] AWS EKS Kubernetes Cluster (Private App Subnet)</b><br><i>Istio mTLS Service Mesh (10.0.10.0/24 Multi-AZ)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_lambda" value="⚡ <b>[5] AWS Lambda Async Worker Pool</b><br><i>VPC Lambda Functions for Event Processing</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_opensearch" value="🔍 <b>[8] Amazon OpenSearch Vector Index</b><br><i>PrivateLink VPC Endpoint ANN Search</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_aurora" value="🛢️ <b>[7] Amazon Aurora PostgreSQL (Private Data Subnet)</b><br><i>Multi-AZ Read Replicas (10.0.20.0/24 Isolated)</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_dynamodb" value="⚡ <b>[6] Amazon DynamoDB Global Tables</b><br><i>Gateway VPC Endpoint Access (Zero Internet)</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_s3" value="🪣 <b>[9] Amazon S3 Encrypted Data Lake</b><br><i>KMS CMEK Buckets via Gateway VPC Endpoint</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="edge_waf_alb" value="1. Protected Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_waf" target="node_alb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_alb_ecs" value="2. ALB -> Pod mTLS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_alb" target="node_ecs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_ecs_aurora" value="3. Private Subnet SQL (10.0.20.0/24)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_ecs" target="node_aurora">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ecs_dynamodb" value="4. Gateway VPC Endpoint Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_ecs" target="node_dynamodb">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="940" y="135"/>
              <mxPoint x="940" y="317"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_lambda_opensearch" value="5. PrivateLink Vector Query" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_lambda" target="node_opensearch">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_aurora_s3" value="6. Parquet Snapshot Export" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_aurora" target="node_s3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 4. AWS Data Lakehouse Architecture
const TECH_XML_DATA_LAKEHOUSE = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_data_lakehouse" name="AWS Enterprise Data Lakehouse Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node_client" value="🌐 <b>[1] Batch &amp; Streaming Sources</b><br><i>CDC Databases, IoT &amp; SaaS APIs</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_apigw" value="🛡️ <b>[2] AWS Lake Formation &amp; Glue Catalog</b><br><i>Centralized Security &amp; Column-Level Governance</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node_tasks" value="📡 <b>[3] Amazon Kinesis Data Streams</b><br><i>Real-Time Event Ingestion Engine</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_run" value="⚡ <b>[4] Amazon S3 Raw Landing Tier</b><br><i>Immutable Object Storage Lake Zone</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_dataflow" value="⚙️ <b>[5] AWS Glue &amp; EMR Serverless ETL</b><br><i>Apache Iceberg Table Transformation</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node_redis" value="🪣 <b>[6] Amazon S3 Curated Gold Lake Tier</b><br><i>High-Performance Queryable Parquet Zone</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="460" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_bigquery" value="🛢️ <b>[7] Amazon Redshift Serverless Warehouse</b><br><i>Petabyte-Scale Analytics &amp; Federated Query</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_sql" value="🛢️ <b>[8] Amazon Athena Serverless SQL</b><br><i>Zero-ETL Ad-Hoc Analytics Engine</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node_looker" value="📊 <b>[9] Amazon QuickSight BI Dashboards</b><br><i>Executive Enterprise Insights Studio</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="460" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl1" value="1. Data Pipeline Feed" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_client" target="node_apigw">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl2" value="2. Governed S3 Landing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_apigw" target="node_run">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_dl3" value="3. Glue ETL Compaction" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_run" target="node_dataflow">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl5" value="4. Redshift Spectrum Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_dataflow" target="node_bigquery">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl6" value="5. Athena Zero-ETL Query" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_dataflow" target="node_sql">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_dl7" value="6. QuickSight Dashboard Connect" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node_bigquery" target="node_looker">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 5. GCP Enterprise Vertex AI Vector Search & RAG Infrastructure
const TECH_XML_RAG_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_rag_infrastructure" name="GCP Enterprise Vertex AI Vector Search &amp; RAG Infrastructure (VPC Service Controls)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="node1" value="🌐 <b>[1] Enterprise Document Lake</b><br><i>PDF, Docx, &amp; BigQuery Corporate Corpus</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node2" value="🛡️ <b>[2] VPC Service Controls Perimeter</b><br><i>Air-Gapped Data Perimeter &amp; CMEK Encryption</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="node3" value="⚡ <b>[3] Cloud Run Document Parser</b><br><i>Private Subnet Ingestion (10.130.10.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node4" value="🧠 <b>[4] Vertex AI Text Embeddings API</b><br><i>768-Dim Dense Vector Generator</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="node5" value="🔍 <b>[5] Vertex AI Vector Search (PSC Endpoint)</b><br><i>ScaNN Ultra-Low-Latency ANN Index</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="node6" value="🤖 <b>[6] Gemini 2.5 Pro Reasoner LLM</b><br><i>Grounded RAG Generation &amp; Hallucination Audit</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="e1" value="1. Document Ingestion" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node1" target="node2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e2" value="2. VPC-SC Protected Parsing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node2" target="node3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="225"/>
              <mxPoint x="480" y="225"/>
              <mxPoint x="480" y="135"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e3" value="3. Chunk Embedding Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node3" target="node4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e4" value="4. Private Service Connect Vector Index" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node4" target="node5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e5" value="5. Grounded LLM Inference" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="node5" target="node6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 6. GCP Enterprise DevSecOps CI/CD & Artifact Registry
const TECH_XML_DEVSECOPS_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_devsecops" name="GCP Enterprise DevSecOps CI/CD &amp; Binary Authorization Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="n1" value="💻 <b>[1] Polyrepo Git Commits</b><br><i>GitHub Enterprise PR Protection Rules</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="n2" value="⚙️ <b>[2] Cloud Build Private Pool (10.140.10.0/24)</b><br><i>Air-Gapped Private VPC Build Worker</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="n3" value="🔍 <b>[3] Container Analysis SAST &amp; CVE Scan</b><br><i>Automated SLSA Level 3 Provenance Attestation</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="n4" value="📦 <b>[4] Artifact Registry (CMEK Encrypted)</b><br><i>Signed Container Images &amp; Helm Charts</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="n5" value="🛡️ <b>[5] Binary Authorization Policy Gate</b><br><i>Strict Cryptographic Attestation Verification</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="n6" value="☸️ <b>[6] GKE Autopilot Canary Subnet</b><br><i>Automated Zero-Downtime Rollback Promotion</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="ed1" value="1. Git Push Webhook" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n1" target="n2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ed2" value="2. SAST Security Scan" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n2" target="n3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ed3" value="3. Sign & Push Image" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n3" target="n4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ed4" value="4. Cryptographic Gate Check" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n4" target="n5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ed5" value="5. Approved Canary Deployment" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n5" target="n6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 7. GCP FinTech PCI-DSS High-Availability Payment Ledger
const TECH_XML_FINTECH_PAYMENTS_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_fintech_payments" name="GCP FinTech PCI-DSS High-Availability Payment Ledger (10.150.0.0/16)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="f1" value="💳 <b>[1] PCI-DSS Cardholder Checkout</b><br><i>Encrypted Client-Side Tokenization</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="f2" value="🛡️ <b>[2] Cloud Armor PCI Shield</b><br><i>OWASP Top 10 + Token Vault Protection</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="f3" value="⚡ <b>[3] Payment Gateway Microservices</b><br><i>CDE Subnet (10.150.10.0/24 Air-Gapped)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="f4" value="🔐 <b>[4] Cloud HSM Hardware Security Module</b><br><i>FIPS 140-3 Level 3 Cryptographic Vault</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="f5" value="🛢️ <b>[5] Cloud Spanner Global Synchronous Ledger</b><br><i>99.999% SLA Distributed ACID Database</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="f6" value="🪣 <b>[6] Immutable Regulatory WORM Audit Vault</b><br><i>Cloud Storage Bucket Lock Compliance Archive</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="ef1" value="1. HTTPS Payment Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="f1" target="f2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ef2" value="2. Ingress to Isolated CDE" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="f2" target="f3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ef3" value="3. HSM Cryptographic Detokenization" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="f3" target="f4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ef4" value="4. Synchronous ACID Ledger Commit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="f3" target="f5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ef5" value="5. WORM Legal Audit Persistence" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="f5" target="f6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 8. GCP Genomics & HIPAA Clinical Bioinformatics Pipeline
const TECH_XML_GENOMICS_CLINICAL_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_genomics_pipeline" name="GCP Genomics &amp; HIPAA Clinical Bioinformatics Pipeline (BAA Protected)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="g1" value="🧬 <b>[1] Illumina NGS Sequencer Ingestion</b><br><i>Raw FastQ / VCF Clinical Samples</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="g2" value="🪣 <b>[2] HIPAA Cloud Storage Genomic Bucket</b><br><i>BAA Protected CMEK Vault (10.160.1.0/24)</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="g3" value="⚙️ <b>[3] GKE Spot Compute Batch Workers</b><br><i>GATK Variant Calling Pipelines (10.160.10.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="g4" value="🏥 <b>[4] GCP Cloud Healthcare API (FHIR Store)</b><br><i>Structured Clinical &amp; Genomic Patient Records</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="g5" value="🛢️ <b>[5] BigQuery Genomic Variant Lakehouse</b><br><i>Population-Scale Clinical Annotation Warehouse</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="g6" value="🧠 <b>[6] Vertex AI Genomic Risk Classification</b><br><i>Oncology Precision Medicine Diagnostic AI</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="eg1" value="1. Sequence File Upload" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="g1" target="g2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="eg2" value="2. Trigger GATK Pipeline" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="g2" target="g3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="eg3" value="3. FHIR Variant Annotation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="g3" target="g4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="eg4" value="4. BigQuery Genomic Load" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="g4" target="g5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="eg5" value="5. Diagnostic Model Inference" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="g5" target="g6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 9. GCP Global Supply Chain Real-Time Logistics & Digital Twin
const TECH_XML_SUPPLY_CHAIN_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_supply_chain" name="GCP Global Supply Chain Real-Time Logistics &amp; Digital Twin (10.170.0.0/16)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="s1" value="🚚 <b>[1] Fleet GPS Telemetry &amp; RFID Scanners</b><br><i>Warehouse Port &amp; Transit Event Streams</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="s2" value="📡 <b>[2] Cloud Pub/Sub High-Frequency Topics</b><br><i>Global Supply Chain Streaming Bus</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="s3" value="⚙️ <b>[3] Cloud Dataflow Digital Twin Simulation</b><br><i>Real-Time Inventory Graph Update (10.170.10.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="s4" value="🛢️ <b>[4] Cloud Spanner Global Inventory Graph</b><br><i>Multi-Region Real-Time Stock Allocations</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="s5" value="🧠 <b>[5] Vertex AI Demand Forecasting Engine</b><br><i>Predictive Disruption &amp; Route Optimization</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="s6" value="📊 <b>[6] Control Tower Logistics Command Center</b><br><i>Executive Real-Time Supply Chain Visibility</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="es1" value="1. Logistics Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="s1" target="s2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="es2" value="2. Pub/Sub Engine Ingest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="s2" target="s3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="es3" value="3. Digital Twin Spanner Commit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="s3" target="s4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="es4" value="4. Predictive AI Routing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="s4" target="s5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="es5" value="5. Control Tower Alert Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="s5" target="s6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 10. Flagship Stateful Multi-Agent Orchestration Engine (LangGraph DAG)
const TECH_XML_MULTI_AGENT_LANGGRAPH = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_langgraph_dag" name="Flagship Stateful Multi-Agent Orchestration Engine (LangGraph DAG)">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="l1" value="🌐 <b>[1] Multimodal User Ingress (2M+ Tokens)</b><br><i>WebRTC Voice, Vision, &amp; System Prompt Caching</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="l2" value="🧠 <b>[2] Master Supervisor Directed Graph Agent</b><br><i>LangGraph DAG State Machine &amp; Checkpoint Store</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="l3" value="🤖 <b>[3] Research &amp; Vector Retrieval Agent</b><br><i>pgvector Long-Term Memory &amp; Semantic Grounding</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="l4" value="💻 <b>[4] Sandboxed Code &amp; GUI Computer Use Agent</b><br><i>gRPC Tool Gateway &amp; OS Execution Kernel</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="l5" value="🛡️ <b>[5] Safety Critic &amp; HITL Approval Gate</b><br><i>Human Interrupt Approval (requires_action Gate)</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="l6" value="⚡ <b>[6] Grounded Enterprise Response Synthesizer</b><br><i>Distributed Trace Observability &amp; Audit Log</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="el1" value="1. User Prompt + Ephemeral Prompt Cache" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="l1" target="l2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="el2" value="2. Supervisor Routes Research Sub-Goal" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="l2" target="l3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="el3" value="3. Parallel Code/GUI Tool Execution" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="l3" target="l4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="el4" value="4. State Machine Verification &amp; HITL Gate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="l4" target="l5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="el5" value="5. Approved Grounded Synthesis" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="l5" target="l6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 11. GCP Enterprise AI Safety, NLI Claim Benchmarking & Red-Teaming Flow
const TECH_XML_EVAL_SAFETY_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_eval_safety" name="GCP Enterprise AI Safety, NLI Claim Benchmarking &amp; Red-Teaming Flow">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="v1" value="🚀 <b>[1] CI/CD Model Checkpoint Ingress</b><br><i>Candidate LLM &amp; Reference Benchmark Dataset</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="v2" value="📊 <b>[2] Automated Evaluation Harness (Ragas / G-Eval)</b><br><i>Context Relevance, Faithfulness &amp; Answer Metrics</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="v3" value="🔍 <b>[3] NLI Factual Claim Verification Engine</b><br><i>Isolate Atomic Claims -> Entailed / Contradicted</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="v4" value="🛡️ <b>[4] Adversarial Safety Red-Teaming Flow</b><br><i>Jailbreak Attacks, Prompt Injection &amp; Toxicity Screening</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="v5" value="⚖️ <b>[5] Automated Safety Decision Gate</b><br><i>Quality &gt; 95% AND Zero Contradicted Claims</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="v6" value="🚀 <b>[6] Production Endpoint Deployment</b><br><i>Model Promoted to Enterprise Serving Cluster</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="ev1" value="1. Checkpoint Trigger" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="v1" target="v2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ev2" value="2. Execute NLI Entailment Test" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="v2" target="v3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ev3" value="3. Execute Adversarial Jailbreak Harness" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="v3" target="v4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ev4" value="4. Evaluate Safety Decision Gate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="v4" target="v5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="ev5" value="5. Passed -> Production Promotion" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="v5" target="v6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 12. GCP Enterprise Agentic Service Mesh & Multi-Cloud Interconnect
const TECH_XML_AGENTIC_MESH_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_agentic_mesh" name="GCP Enterprise Agentic Service Mesh &amp; Private Service Connect Interconnect">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="m1" value="🌐 <b>[1] Multi-Cloud &amp; Hybrid Gateway</b><br><i>Anthos Service Mesh mTLS Gateway</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FFFFFF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="m2" value="🛡️ <b>[2] Private Service Connect (PSC) Producer Endpoint</b><br><i>Air-Gapped Tenant VPC Interconnect (10.180.1.0/24)</i>" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="280" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="m3" value="⚙️ <b>[3] GKE Private Autopilot Mesh Cluster</b><br><i>Envoy Sidecar Proxy &amp; SPIFFE/SPIRE Identity (10.180.10.0/24)</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="100" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="m4" value="🔑 <b>[4] Cloud Service Mesh Telemetry &amp; Tracing</b><br><i>Distributed OpenTelemetry Agent Observability</i>" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;strokeWidth=2;fillColor=#FAF5FF;strokeColor=#7C3AED;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="560" y="280" width="280" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="m5" value="🛢️ <b>[5] Dedicated Enterprise Data VPC Perimeter</b><br><i>BigQuery &amp; Cloud Spanner via Private Google Access</i>" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="1020" y="100" width="280" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="em1" value="1. Hybrid mTLS Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="m1" target="m2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="em2" value="2. PSC Air-Gapped Egress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="m2" target="m3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="em3" value="3. Envoy Sidecar Tracing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="m3" target="m4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="em4" value="4. Private Google Access Database Query" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#16A34A;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontColor=#0F172A;fontStyle=1;fontSize=11;" edge="1" parent="1" source="m3" target="m5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 13. C4 Architecture Level 1 & Level 2 Enterprise Context & Container Model (McKinsey Zero-Collision Boardroom Blueprint)
const TECH_XML_C4_SYSTEM_CONTEXT = `<mxfile host="embed.diagrams.net">
  <diagram id="c4_system_context" name="C4 Enterprise System Context &amp; Container Model">
    <mxGraphModel dx="1200" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="940" pageHeight="480" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TIER 1: EXTERNAL USERS & INGRESS BOUNDARY (y = 65) -->
        <mxCell id="n1_1" value="👤 <b>[1.1] Global B2B Enterprise Users</b>&lt;br&gt;Web, Mobile &amp;amp; Partner Portals&lt;br&gt;&lt;i&gt;Protocol: HTTPS / TLS 1.3 &amp;amp; mTLS&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="n1_2" value="🛡️ <b>[1.2] Cloud Armor WAF &amp;amp; Federated IdP</b>&lt;br&gt;OWASP Top 10 + Entra ID OIDC Auth&lt;br&gt;&lt;i&gt;JWT Short-Lived Token Vault (15m TTL)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="n1_3" value="⚡ <b>[1.3] Enterprise API Gateway Cluster</b>&lt;br&gt;Envoy / Kong API Router &amp;amp; Schema Gate&lt;br&gt;&lt;i&gt;Subnet: 10.128.0.0/20 (SLA 99.999%)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#ECFDF5;strokeColor=#059669;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- TIER 2: C4 CONTAINER ARCHITECTURE (y = 205) -->
        <mxCell id="n2_1" value="⚙️ <b>[2.1] GKE App Microservices Cluster</b>&lt;br&gt;Order, Billing &amp;amp; Autonomous Agent Pods&lt;br&gt;&lt;i&gt;Autoscaling 10 → 800 Pods (Istio mTLS)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#EEF2FF;strokeColor=#4F46E5;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="n2_2" value="🔄 <b>[2.2] Distributed Kafka Event Mesh</b>&lt;br&gt;Apache Kafka / Cloud Pub-Sub Cluster&lt;br&gt;&lt;i&gt;Avro Schema + Idempotent Outbox Table&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#FFF7ED;strokeColor=#EA580C;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="n2_3" value="🤖 <b>[2.3] Autonomous Agent Orchestrator</b>&lt;br&gt;LangGraph Directed Graph State Machine&lt;br&gt;&lt;i&gt;Sub-15ms Agent &amp;amp; Tool Execution Kernel&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F5F3FF;strokeColor=#7C3AED;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- TIER 3: STATE PERSISTENCE & VECTOR MEMORY (y = 345) -->
        <mxCell id="n3_1" value="🛢️ <b>[3.1] AlloyDB HA PostgreSQL Core</b>&lt;br&gt;Active-Active Multi-Region ACID Database&lt;br&gt;&lt;i&gt;Private Service Connect: 10.128.64.10&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#ECFDF5;strokeColor=#059669;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="345" width="260" height="75" as="geometry" />
        </mxCell>

        <mxCell id="n3_2" value="🧠 <b>[3.2] pgvector Semantic Memory Store</b>&lt;br&gt;ANN Vector Index &amp;amp; LLM Prompt Cache&lt;br&gt;&lt;i&gt;FinOps Cut: -90% Token Compute Cost&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F5F3FF;strokeColor=#7C3AED;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="345" width="260" height="75" as="geometry" />
        </mxCell>

        <mxCell id="n3_3" value="📊 <b>[3.3] BigQuery Enterprise Lakehouse</b>&lt;br&gt;Governed Analytical Warehouse &amp;amp; Audit&lt;br&gt;&lt;i&gt;Immutable WORM Regulatory Compliance&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="345" width="260" height="75" as="geometry" />
        </mxCell>

        <!-- ZERO-COLLISION ORTHOGONAL CONNECTORS -->
        <mxCell id="e1" value="1. HTTPS / TLS 1.3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n1_1" target="n1_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e2" value="2. Workload Token Auth" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#D97706;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n1_2" target="n1_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e3" value="3. Ingress Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#059669;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n1_3" target="n2_1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="770" y="172" />
              <mxPoint x="170" y="172" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e4" value="4. Publish Async Event" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#4F46E5;labelBackgroundColor=#FFFFFF;labelBorderColor=#4F46E5;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n2_1" target="n2_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e5" value="5. Agent Tool Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#EA580C;labelBackgroundColor=#FFFFFF;labelBorderColor=#EA580C;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n2_2" target="n2_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e6" value="6. ACID Pool Commit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#059669;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n2_1" target="n3_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e7" value="7. Semantic Vector Lookup" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n2_3" target="n3_2">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="770" y="312" />
              <mxPoint x="470" y="312" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e8" value="8. Audit Stream Load" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="n2_2" target="n3_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="470" y="312" />
              <mxPoint x="770" y="312" />
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 14. Modern Data Stack with CDC, Data Contracts & Reverse ETL (McKinsey Zero-Collision Boardroom Blueprint)
const TECH_XML_MODERN_DATA_STACK = `<mxfile host="embed.diagrams.net">
  <diagram id="modern_data_stack" name="Modern Data Stack with CDC, Data Contracts &amp; Reverse ETL">
    <mxGraphModel dx="1200" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="940" pageHeight="480" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TIER 1: OPERATIONAL SOURCES, CDC & DATA CONTRACTS (y = 65) -->
        <mxCell id="mn1_1" value="🛢️ <b>[1.1] Production OLTP Core</b>&lt;br&gt;PostgreSQL &amp;amp; Cloud Spanner Ledger&lt;br&gt;&lt;i&gt;WAL Log Stream (Zero Query Overload)&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="65" width="260" height="75" as="geometry" />
        </mxCell>

        <mxCell id="mn1_2" value="⚡ <b>[1.2] Debezium / Fivetran CDC</b>&lt;br&gt;Real-Time Log Ingestion Engine&lt;br&gt;&lt;i&gt;Throughput: 85,000 CDC mut/sec&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="mn1_3" value="🛡️ <b>[1.3] Data Contract SLA Gate</b>&lt;br&gt;Soda.io &amp;amp; Great Expectations Rules&lt;br&gt;&lt;i&gt;Blocks Schema Drift &amp;amp; PII Redaction&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#ECFDF5;strokeColor=#059669;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- TIER 2: MEDALLION LAKEHOUSE & DBT TRANSFORMATION (y = 205) -->
        <mxCell id="mn2_1" value="🥉 <b>[2.1] Bronze Ingestion Lake</b>&lt;br&gt;Apache Iceberg Raw Landing Zone&lt;br&gt;&lt;i&gt;Z-Order Indexing &amp;amp; Time-Travel Queries&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#EEF2FF;strokeColor=#4F46E5;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="mn2_2" value="🥈 <b>[2.2] Silver Cleansed Core Marts</b>&lt;br&gt;dbt Core Incremental Transformation&lt;br&gt;&lt;i&gt;Entity Resolution &amp;amp; Deduplication&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#FFF7ED;strokeColor=#EA580C;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="mn2_3" value="🥇 <b>[2.3] Gold Executive Warehouse</b>&lt;br&gt;BigQuery / Snowflake Star-Schema&lt;br&gt;&lt;i&gt;Sub-Second Executive BI Analytics&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F5F3FF;strokeColor=#7C3AED;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- TIER 3: REVERSE ETL, ACTIVATION & CRM (y = 345) -->
        <mxCell id="mn3_1" value="🔄 <b>[3.1] Reverse ETL Router Engine</b>&lt;br&gt;Hightouch / Census Sync Controller&lt;br&gt;&lt;i&gt;Every 5-min Idempotent Gold Upsert&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#ECFDF5;strokeColor=#059669;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="345" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="mn3_2" value="🤖 <b>[3.2] Vertex AI ML Feature Store</b>&lt;br&gt;Low-Latency Online + Offline Features&lt;br&gt;&lt;i&gt;Sub-10ms Serving for LLMs &amp;amp; Fraud&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F5F3FF;strokeColor=#7C3AED;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="345" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="mn3_3" value="💼 <b>[3.3] Activated CRM &amp;amp; Dashboards</b>&lt;br&gt;Salesforce, Looker Studio &amp;amp; Agents&lt;br&gt;&lt;i&gt;Real-Time Customer LTV &amp;amp; Churn Risk&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="345" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- ZERO-COLLISION ORTHOGONAL CONNECTORS -->
        <mxCell id="me1" value="1. WAL CDC Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn1_1" target="mn1_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="me2" value="2. Contract Verification" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#D97706;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn1_2" target="mn1_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="me3" value="3. Certified Bronze Land" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#059669;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn1_3" target="mn2_1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="770" y="172" />
              <mxPoint x="170" y="172" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="me4" value="4. dbt Silver Cleaning" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#4F46E5;labelBackgroundColor=#FFFFFF;labelBorderColor=#4F46E5;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_1" target="mn2_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="me5" value="5. Build Gold Star-Schema" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#EA580C;labelBackgroundColor=#FFFFFF;labelBorderColor=#EA580C;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_2" target="mn2_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="me6" value="6. Reverse ETL Activation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_3" target="mn3_1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="770" y="312" />
              <mxPoint x="170" y="312" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="me7" value="7. Hydrate ML Feature Store" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#4F46E5;labelBackgroundColor=#FFFFFF;labelBorderColor=#4F46E5;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_2" target="mn3_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="me8" value="8. Operational CRM Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#059669;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn3_1" target="mn3_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="170" y="445" />
              <mxPoint x="770" y="445" />
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 15. Enterprise Event-Driven Microservices Architecture (EDA) (McKinsey Zero-Collision Boardroom Blueprint)
const TECH_XML_EVENT_DRIVEN_EDA = `<mxfile host="embed.diagrams.net">
  <diagram id="event_driven_eda" name="Enterprise Event-Driven Microservices Architecture (EDA)">
    <mxGraphModel dx="1200" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="940" pageHeight="480" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TIER 1: TRANSACTIONAL PRODUCERS & SCHEMA GATE (y = 65) -->
        <mxCell id="en1_1" value="🛒 <b>[1.1] Order &amp;amp; Checkout Pods</b>&lt;br&gt;Emits OrderPlaced &amp;amp; FraudScreened&lt;br&gt;&lt;i&gt;Transactional Outbox Table in AlloyDB&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="en1_2" value="💳 <b>[1.2] Payment &amp;amp; Ledger Pods</b>&lt;br&gt;PCI-DSS Compliant Settlement Events&lt;br&gt;&lt;i&gt;HMAC Signatures on Every Payload&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="en1_3" value="📜 <b>[1.3] Avro Schema Registry</b>&lt;br&gt;Backward &amp;amp; Forward Schema Gate&lt;br&gt;&lt;i&gt;Rejects Malformed Event Payloads&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#ECFDF5;strokeColor=#059669;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="65" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- TIER 2: DISTRIBUTED EVENT MESH & DLQ REPLAY (y = 205) -->
        <mxCell id="en2_1" value="🌩️ <b>[2.1] Multi-Region Kafka Mesh</b>&lt;br&gt;Partitioned Topics (orders.v2, payments.v1)&lt;br&gt;&lt;i&gt;Zstandard Compression (-75% Egress)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#EEF2FF;strokeColor=#4F46E5;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="en2_2" value="🚨 <b>[2.2] Automated DLQ Replay</b>&lt;br&gt;Poison-Pill Isolation &amp;amp; Retry Circuit&lt;br&gt;&lt;i&gt;Zero Unhandled Event Loss SLA&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#FFF7ED;strokeColor=#EA580C;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="en2_3" value="⚙️ <b>[2.3] Decoupled Consumer Groups</b>&lt;br&gt;Shipping Carrier &amp;amp; Inventory Workers&lt;br&gt;&lt;i&gt;Idempotent Processing via Redis Lock&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F5F3FF;strokeColor=#7C3AED;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="205" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- TIER 3: IMMUTABLE LEDGER & CQRS READ MODELS (y = 345) -->
        <mxCell id="en3_1" value="📜 <b>[3.1] Cloud Spanner Event Ledger</b>&lt;br&gt;Global TrueTime Atomic Append-Only Store&lt;br&gt;&lt;i&gt;Supports Full Audit &amp;amp; Historical Replay&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#ECFDF5;strokeColor=#059669;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="345" width="260" height="75" as="geometry" />
        </mxCell>

        <mxCell id="en3_2" value="⚡ <b>[3.2] CQRS Materialized Views</b>&lt;br&gt;Elasticsearch Read Projections&lt;br&gt;&lt;i&gt;Query Latency: &amp;lt;5ms for Boardroom Search&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F5F3FF;strokeColor=#7C3AED;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="340" y="345" width="260" height="72" as="geometry" />
        </mxCell>

        <mxCell id="en3_3" value="🛡️ <b>[3.3] Real-Time CEP Fraud Engine</b>&lt;br&gt;Complex Event Processing &amp;amp; Halt Rules&lt;br&gt;&lt;i&gt;Automated Freeze of Compromised Accounts&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;strokeWidth=2;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=11;spacingLeft=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="640" y="345" width="260" height="72" as="geometry" />
        </mxCell>

        <!-- ZERO-COLLISION ORTHOGONAL CONNECTORS -->
        <mxCell id="ee1" value="1. Transactional Outbox Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en1_1" target="en2_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="ee2" value="2. Contract Verification" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#D97706;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en1_2" target="en1_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="ee3" value="3. Consumer Subscribe" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#4F46E5;labelBackgroundColor=#FFFFFF;labelBorderColor=#4F46E5;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_1" target="en2_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="170" y="312" />
              <mxPoint x="770" y="312" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="ee4" value="4. Poison-Pill DLQ" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#EA580C;labelBackgroundColor=#FFFFFF;labelBorderColor=#EA580C;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_1" target="en2_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="ee5" value="5. Immutable Event Ledger" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#059669;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_1" target="en3_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="ee6" value="6. CQRS Projection Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en3_1" target="en3_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="ee7" value="7. Real-Time CEP Anomaly Check" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0284C7;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_3" target="en3_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

export function getTechnicalArchitectureXml(archId: string): string | null {
  const id = (archId || '').toLowerCase();
  if (id.includes('c4') || id.includes('context_model')) {
    return TECH_XML_C4_SYSTEM_CONTEXT;
  }
  if (id.includes('modern_data_stack') || id.includes('cdc') || id.includes('reverse_etl') || id.includes('fivetran')) {
    return TECH_XML_MODERN_DATA_STACK;
  }
  if (id.includes('event_driven') || id.includes('eda') || id.includes('kafka_mesh')) {
    return TECH_XML_EVENT_DRIVEN_EDA;
  }
  if (id.includes('multi_agent') || id.includes('langgraph')) {
    return TECH_XML_MULTI_AGENT_LANGGRAPH;
  }
  if (id.includes('streaming') || id.includes('telemetry') || id.includes('iot')) {
    return TECH_XML_STREAMING_ANALYTICS;
  }
  if (id.includes('microservices') || id.includes('kubernetes') || id.includes('eks') || id.includes('aws')) {
    return TECH_XML_MICROSERVICES_AWS;
  }
  if (id.includes('lakehouse')) {
    return TECH_XML_DATA_LAKEHOUSE;
  }
  if (id.includes('rag_gcp') || id.includes('vector_search')) {
    return TECH_XML_RAG_GCP;
  }
  if (id.includes('devsecops') || id.includes('cicd')) {
    return TECH_XML_DEVSECOPS_GCP;
  }
  if (id.includes('fintech') || id.includes('payments')) {
    return TECH_XML_FINTECH_PAYMENTS_GCP;
  }
  if (id.includes('genomics') || id.includes('clinical')) {
    return TECH_XML_GENOMICS_CLINICAL_GCP;
  }
  if (id.includes('supply_chain') || id.includes('logistics')) {
    return TECH_XML_SUPPLY_CHAIN_GCP;
  }
  if (id.includes('eval_safety') || id.includes('benchmarking')) {
    return TECH_XML_EVAL_SAFETY_GCP;
  }
  if (id.includes('agentic_mesh') || id.includes('mesh')) {
    return TECH_XML_AGENTIC_MESH_GCP;
  }
  return TECH_XML_SERVERLESS_GCP;
}

export {
  TECH_XML_SERVERLESS_GCP,
  TECH_XML_STREAMING_ANALYTICS,
  TECH_XML_MICROSERVICES_AWS,
  TECH_XML_DATA_LAKEHOUSE,
  TECH_XML_RAG_GCP,
  TECH_XML_DEVSECOPS_GCP,
  TECH_XML_FINTECH_PAYMENTS_GCP,
  TECH_XML_GENOMICS_CLINICAL_GCP,
  TECH_XML_SUPPLY_CHAIN_GCP,
  TECH_XML_MULTI_AGENT_LANGGRAPH,
  TECH_XML_EVAL_SAFETY_GCP,
  TECH_XML_AGENTIC_MESH_GCP,
  TECH_XML_C4_SYSTEM_CONTEXT,
  TECH_XML_MODERN_DATA_STACK,
  TECH_XML_EVENT_DRIVEN_EDA
};
