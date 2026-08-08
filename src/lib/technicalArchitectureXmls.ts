/**
 * 🎨 Technical Cloud Architecture 2D Network Topology XML Catalog (Zero-Defect Enterprise Rebuild)
 * All 12 Technical Enterprise Cloud Architecture diagrams built with:
 * - Authentic Cloud Network Topologies (VPC CIDRs, Private Subnets, Cloud Armor WAF, Private Service Connect, Cloud NAT, Security Groups)
 * - Spacious 3-Column Spatial Grid (x = 100, 560, 1020) with zero visual overlap
 * - Dedicated orthogonal waypoint routing corridors (y = 225, 335, 480, 595)
 * - Pure White Label Background Text Pills for 100% legibility
 */
import { getExactServerlessGcpReferenceXml, getExactMultiRegionDrReferenceXml, getExactLegacyDependencyMapXml } from './newEnterpriseReferenceXmls';

// 1. GCP Serverless Web Application Architecture
const TECH_XML_SERVERLESS_GCP = getExactServerlessGcpReferenceXml();

// 1.1 GCP Multi-Region Active-Passive Disaster Recovery Topology
const TECH_XML_MULTI_REGION_DR = getExactMultiRegionDrReferenceXml();

// 1.2 Legacy Data & System Dependency Map (Strangler Fig Transition Architecture)
const TECH_XML_LEGACY_DEPENDENCY_MAP = getExactLegacyDependencyMapXml();



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

// 13. C4 Architecture Level 1 & Level 2 Enterprise Context & Container Model (MULTI-PAGE BOARDROOM BLUEPRINT: Page 1 Blueprint + Page 2 Strategic Playbook)
const TECH_XML_C4_SYSTEM_CONTEXT = `<mxfile host="embed.diagrams.net">
  <diagram id="c4_system_context" name="Page 1: C4 System Context Blueprint">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1380" pageHeight="680" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TOP MAIN TITLE BANNER -->
        <mxCell id="title_banner" value="<b>McKinsey-Grade C4 Enterprise System Context &amp;amp; Container Model (L1 &amp;amp; L2) - 1340px Widescreen Boardroom Layout</b>" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="10" width="1320" height="28" as="geometry" />
        </mxCell>

        <!-- HORIZONTAL TIER BACKGROUND SWIMLANE STRIPES -->
        <mxCell id="t1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=1;strokeColor=#CBD5E1;fillColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="30" y="65" width="1320" height="155" as="geometry" />
        </mxCell>

        <mxCell id="t2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=1;strokeColor=#BFDBFE;fillColor=#EFF6FF;" vertex="1" parent="1">
          <mxGeometry x="30" y="245" width="1320" height="185" as="geometry" />
        </mxCell>

        <mxCell id="t3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=1;strokeColor=#E2E8F0;fillColor=#F1F5F9;" vertex="1" parent="1">
          <mxGeometry x="30" y="455" width="1320" height="185" as="geometry" />
        </mxCell>

        <!-- LEFT TIER LABELS -->
        <mxCell id="t1_lbl" value="<b>TIER 1</b>&lt;br&gt;&lt;span style=&quot;font-size:11px;font-weight:normal;&quot;&gt;(External Access&lt;br&gt;&amp;amp; Zero-Trust&lt;br&gt;Ingress&lt;br&gt;Boundary)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="40" y="78" width="180" height="125" as="geometry" />
        </mxCell>

        <mxCell id="t2_lbl" value="<b>TIER 2</b>&lt;br&gt;&lt;span style=&quot;font-size:11px;font-weight:normal;&quot;&gt;C4 Container&lt;br&gt;Architecture &amp;amp;&lt;br&gt;Autonomous&lt;br&gt;Agent Mesh&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="40" y="268" width="180" height="140" as="geometry" />
        </mxCell>

        <mxCell id="t3_lbl" value="<b>TIER 3</b>&lt;br&gt;&lt;span style=&quot;font-size:11px;font-weight:normal;&quot;&gt;State&lt;br&gt;Persistence &amp;amp;&lt;br&gt;Vector Memory&lt;br&gt;Foundation&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="40" y="478" width="180" height="140" as="geometry" />
        </mxCell>

        <!-- TIER 1 BOARDROOM CARDS WITH HTML TABLE FILLED COLORED HEADERS -->
        <mxCell id="card_1_1" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:7px 10px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;[1.1] Global B2B Enterprise Users &amp;amp; Partner Apps&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#334155&quot; style=&quot;font-size:11px;&quot;&gt;HTTPS / TLS 1.3 &amp;amp; Hardware mTLS auth&lt;br&gt;&lt;br&gt;&lt;span style=&quot;font-size:16px;&quot;&gt;🌐 &amp;nbsp;📱 &amp;nbsp;💻&lt;/span&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0F172A;fillColor=#FFFFFF;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="245" y="78" width="320" height="130" as="geometry" />
        </mxCell>

        <mxCell id="card_1_2" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0284C7;padding:7px 10px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;🛡️ [1.2] Cloud Armor WAF &amp;amp; Identity-Aware Proxy&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;OWASP Top 10 DDoS defense + Entra ID OIDC&lt;br&gt;issuing 15-minute short-lived JWT token vaults &amp;nbsp;&lt;span style=&quot;font-size:15px;&quot;&gt;🔐 💠&lt;/span&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0284C7;fillColor=#F0F9FF;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="625" y="78" width="320" height="130" as="geometry" />
        </mxCell>

        <mxCell id="card_1_3" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:7px 10px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;[1.3] Enterprise Envoy / Kong API Gateway Cluster ⬡&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#334155&quot; style=&quot;font-size:11px;&quot;&gt;☁️ &lt;b&gt;VPC Subnet 10.128.0.0/20&lt;/b&gt; &amp;nbsp;|&amp;nbsp; 99.999% SLA Uptime&lt;br&gt;&lt;br&gt;&lt;span style=&quot;font-size:16px;&quot;&gt;⚡ &amp;nbsp;☁️ &amp;nbsp;🌐&lt;/span&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0F172A;fillColor=#FFFFFF;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="995" y="78" width="330" height="130" as="geometry" />
        </mxCell>

        <!-- TIER 2 CARDS -->
        <!-- [2.1] GKE Autopilot Microservices Cluster Container Frame -->
        <mxCell id="card_2_1" value="&lt;font color=&quot;#1D4ED8&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;[2.1] GKE Autopilot Microservices Cluster&lt;/b&gt;&lt;/font&gt; &amp;nbsp;&lt;font color=&quot;#475569&quot; style=&quot;font-size:10px;&quot;&gt;(Autoscaling 10 to 800 pods with Istio mTLS)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#2563EB;fillColor=#FFFFFF;verticalAlign=top;spacing=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="245" y="260" width="320" height="155" as="geometry" />
        </mxCell>
        <mxCell id="pod_order" value="Container&lt;br&gt;&lt;b&gt;Order Service&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;strokeWidth=1;strokeColor=#94A3B8;fillColor=#F8FAFC;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="260" y="306" width="140" height="46" as="geometry" />
        </mxCell>
        <mxCell id="pod_billing" value="Container&lt;br&gt;&lt;b&gt;Billing Service&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;strokeWidth=1;strokeColor=#94A3B8;fillColor=#F8FAFC;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="410" y="306" width="140" height="46" as="geometry" />
        </mxCell>
        <mxCell id="pod_inv" value="Container&lt;br&gt;&lt;b&gt;Inventory Service&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;strokeWidth=1;strokeColor=#94A3B8;fillColor=#F8FAFC;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="260" y="358" width="140" height="46" as="geometry" />
        </mxCell>
        <mxCell id="pod_acc" value="Container&lt;br&gt;&lt;b&gt;Account Service&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;strokeWidth=1;strokeColor=#94A3B8;fillColor=#F8FAFC;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="410" y="358" width="140" height="46" as="geometry" />
        </mxCell>

        <!-- [2.2] Distributed Apache Kafka Event Mesh Frame -->
        <mxCell id="card_2_2" value="&lt;font color=&quot;#1D4ED8&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;[2.2] Distributed Apache Kafka Event Mesh&lt;/b&gt;&lt;/font&gt; &amp;nbsp;&lt;font color=&quot;#475569&quot; style=&quot;font-size:10px;&quot;&gt;(Multi-region event backbone)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#2563EB;fillColor=#FFFFFF;verticalAlign=top;spacing=8;align=left;" vertex="1" parent="1">
          <mxGeometry x="625" y="260" width="320" height="155" as="geometry" />
        </mxCell>
        <mxCell id="kb_1" value="⚙️ &lt;b&gt;Kafka Broker&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;strokeWidth=1;strokeColor=#64748B;fillColor=#F8FAFC;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="640" y="308" width="135" height="48" as="geometry" />
        </mxCell>
        <mxCell id="kb_2" value="⚙️ &lt;b&gt;Kafka Broker&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;strokeWidth=1;strokeColor=#64748B;fillColor=#F8FAFC;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="795" y="308" width="135" height="48" as="geometry" />
        </mxCell>
        <mxCell id="avro_reg" value="&lt;b&gt;Avro Schema Registry&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;strokeWidth=1;strokeColor=#2563EB;fillColor=#EFF6FF;fontSize=10;fontColor=#1D4ED8;" vertex="1" parent="1">
          <mxGeometry x="770" y="368" width="160" height="34" as="geometry" />
        </mxCell>

        <!-- [2.3] Autonomous Agent Orchestration Kernel EXACT DEEP OBSIDIAN GLASSMORPHIC CARD (#090D16) -->
        <mxCell id="card_2_3" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#090D16;padding:7px 10px;border-bottom:1px solid #1E293B;&quot;&gt;&lt;font color=&quot;#38BDF8&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;[2.3] Autonomous Agent Orchestration Kernel&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#F8FAFC&quot; style=&quot;font-size:11.5px;&quot;&gt;&lt;b&gt;LangGraph Directed State Machine&lt;/b&gt;&lt;br&gt;executing sub-15ms agent tools&lt;br&gt;&lt;br&gt;&lt;span style=&quot;color:#38BDF8;font-size:11px;font-weight:bold;&quot;&gt;📈 Sub-15ms Agent Tool Execution &amp;amp; Orchestration 📈&lt;/span&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#38BDF8;fillColor=#090D16;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="995" y="260" width="330" height="155" as="geometry" />
        </mxCell>

        <!-- TIER 3 BOARDROOM CARDS WITH HTML TABLE FILLED COLORED HEADERS -->
        <mxCell id="card_3_1" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:7px 10px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;🛢️ [3.1] AlloyDB HA PostgreSQL Core Ledger&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#334155&quot; style=&quot;font-size:11px;&quot;&gt;Active-Active multi-region database over GCP Private Service Connect&lt;br&gt;&lt;b&gt;IP: 10.128.64.10&lt;/b&gt; &amp;nbsp;|&amp;nbsp; 🛢️ &amp;nbsp;🌐&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0F172A;fillColor=#FFFFFF;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="245" y="470" width="320" height="145" as="geometry" />
        </mxCell>

        <mxCell id="card_3_2" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#2563EB;padding:7px 10px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;🧠 [3.2] pgvector Semantic Memory Store&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;HNSW ANN vector index saving &lt;b&gt;-90% redundant LLM token compute OPEX&lt;/b&gt;&lt;br&gt;&lt;br&gt;🧠 &amp;nbsp;🔍 &amp;nbsp;🐘&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#2563EB;fillColor=#EFF6FF;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="625" y="470" width="320" height="145" as="geometry" />
        </mxCell>

        <mxCell id="card_3_3" value="&lt;table style=&quot;width:100%;border-collapse:collapse;margin:0;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:7px 10px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;📊 [3.3] BigQuery / Apache Iceberg Analytical Lakehouse&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:10px;&quot;&gt;&lt;font color=&quot;#334155&quot; style=&quot;font-size:11px;&quot;&gt;Governed warehouse with immutable WORM retention for &lt;b&gt;SOC2 Type II &amp;amp; ISO 27001&lt;/b&gt;&lt;br&gt;&lt;br&gt;🌐 &amp;nbsp;✅&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0F172A;fillColor=#FFFFFF;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="995" y="470" width="330" height="145" as="geometry" />
        </mxCell>

        <!-- ORTHOGONAL CONNECTORS ROUTED THROUGH DEDICATED COLLISION-FREE AIRSPACE CORRIDORS WITH CONCISE LABELS -->
        <mxCell id="e1" value="HTTPS / mTLS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_1_1" target="card_1_2">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="405" y="45" />
              <mxPoint x="785" y="45" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="e2" value="OWASP &amp;amp; JWT" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_1_2" target="card_1_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="785" y="45" />
              <mxPoint x="1160" y="45" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Direct Tier 1 -> Tier 2 Ingress Route -->
        <mxCell id="e3" value="gRPC / Istio mTLS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_1_3" target="card_2_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dx="-28" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="e4" value="Kafka Outbox Events" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#2563EB;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_2_1" target="card_2_2">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="405" y="235" />
              <mxPoint x="785" y="235" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="e5" value="Sub-15ms Agent Calls" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_2_2" target="card_2_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="785" y="235" />
              <mxPoint x="1160" y="235" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Vertical Tier 2 to Tier 3 Flow routed through Open Channel at y = 442 -->
        <mxCell id="e6" value="Transactional SQL State" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_2_1" target="card_3_1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dx="28" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="e7" value="HNSW ANN Vector Recall" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#2563EB;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_2_2" target="card_3_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dx="28" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="e8" value="Analytical Iceberg Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="card_2_3" target="card_3_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dx="-28" as="offset" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
  <diagram id="c4_executive_guide" name="Page 2: Executive Playbook &amp; Governance Profile">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1380" pageHeight="680" background="#FFFFFF">
      <root>
        <mxCell id="0_p2" />
        <mxCell id="1_p2" parent="0_p2" />

        <!-- PAGE 2 HEADER BANNER -->
        <mxCell id="p2_hdr" value="<b>EXECUTIVE ARCHITECTURE PLAYBOOK &amp;amp; GOVERNANCE METADATA PROFILE — DIAGRAM 11: C4 SYSTEM CONTEXT</b>" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="10" width="1310" height="28" as="geometry" />
        </mxCell>
        <mxCell id="p2_line" value="" style="line;strokeWidth=2;strokeColor=#0F172A;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="38" width="1310" height="4" as="geometry" />
        </mxCell>

        <!-- KPI SUMMARY BAR WITH STRATEGIC IMPORTANCE 5/5 STARS -->
        <mxCell id="kpi_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;ARCHITECTURE NAME&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;C4 Enterprise System Context (L1 &amp;amp; L2)&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0F172A;fillColor=#F8FAFC;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <mxCell id="kpi_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;STRATEGIC IMPORTANCE SCORE&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#D97706&quot; style=&quot;font-size:16px;&quot;&gt;&lt;b&gt;★★★★★ &amp;nbsp;5.0 / 5.0&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;strokeColor=#D97706;fillColor=#FEFCE8;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="375" y="55" width="290" height="55" as="geometry" />
        </mxCell>

        <mxCell id="kpi_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;PRODUCT JOURNEY TIMING&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0D9488&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;Phase 0–1 Greenfield RFC &amp;amp; Scale Migration&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0D9488;fillColor=#F0FDFA;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="695" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <mxCell id="kpi_4" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;TARGET ARTIFACT DOCUMENT&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#2563EB&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;RFC / PRD, SOC2 Audit Deck &amp;amp; Board Review&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#2563EB;fillColor=#EFF6FF;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="1035" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <!-- PERSONA MATRIX ROW -->
        <mxCell id="per_card_1" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👤 PRIMARY CREATOR PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Principal Staff Cloud / Security Architect&lt;/b&gt; (&lt;i&gt;Staff Engineer L7+ at Google; Partner Enterprise Architect at Consulting&lt;/i&gt;)&lt;br&gt;&lt;br&gt;Responsible for establishing trust boundaries, mTLS encryption SLAs, and network blast-radius containment before production code authorization.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0F172A;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="130" width="630" height="115" as="geometry" />
        </mxCell>

        <mxCell id="per_card_2" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0284C7;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👔 PRIMARY CONSUMER PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#F0F9FF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Chief Information Security Officer (CISO), VP of Engineering &amp;amp; External SOC2/ISO Auditors&lt;/b&gt;&lt;br&gt;&lt;br&gt;Uses this visual diagram to verify Zero-Trust security governance, identity-aware ingress policies, and active-active multi-region fault tolerance.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0284C7;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="695" y="130" width="650" height="115" as="geometry" />
        </mxCell>

        <!-- TWO-COLUMN DEEP STRATEGIC PERSPECTIVE COMPARISON: GOOGLE PRODUCT STANDPOINT vs MCKINSEY CONSULTING STANDPOINT -->
        <mxCell id="lens_google" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#1D4ED8;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;🚀 BIG TECH &amp;amp; PRODUCT COMPANY STANDPOINT (e.g. Google / Stripe / Meta)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;1. Internal Lifecycle &amp;amp; RFC Enforcement:&lt;/b&gt; At Google/Stripe, a C4 System Context &amp;amp; Container blueprint is mandatory inside every Architectural RFC before design freeze. It serves as the authoritative boundary contract between product teams.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;2. Zero-Trust Perimeter Governance:&lt;/b&gt; Visualizes BeyondCorp Identity-Aware Proxy (IAP) access policies and GCP Private Service Connect boundaries so that zero production containers expose direct public internet IPs.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;3. Site Reliability Engineering (SRE) Blameless Postmortems:&lt;/b&gt; During major incidents, SRE teams overlay telemetry hotspots onto this exact C4 Container topology to trace dependency failure cascading.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#1D4ED8;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="265" width="630" height="380" as="geometry" />
        </mxCell>

        <mxCell id="lens_mckinsey" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;💼 TIER-1 MANAGEMENT CONSULTING STANDPOINT (e.g. McKinsey / BCG / Deloitte)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#F8FAFC;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;1. Billable Client Transformation Anchor:&lt;/b&gt; In multi-million-dollar Enterprise Cloud Modernization engagements, consultants present this visual as the Executive Boardroom Baseline comparing &amp;quot;As-Is Monolith&amp;quot; vs &amp;quot;To-Be Cloud Native System Context&amp;quot;.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;2. Application Portfolio Rationalization (APM):&lt;/b&gt; Helps client C-Suite stakeholders identify duplicate business services, legacy mainframe dependencies, and compliance gaps within 60 minutes.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;3. RFP &amp;amp; Post-Merger Integration (PMI):&lt;/b&gt; Serves as the primary security architecture exhibit proving compliance with federal regulatory frameworks and enabling seamless corporate entity integration.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0F172A;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="695" y="265" width="650" height="380" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 14. Modern Data Stack with CDC, Data Contracts & Reverse ETL (MULTI-PAGE BOARDROOM BLUEPRINT: Page 1 Blueprint + Page 2 Strategic Playbook)
const TECH_XML_MODERN_DATA_STACK = `<mxfile host="embed.diagrams.net">
  <diagram id="modern_data_stack" name="Page 1: Modern Data Stack Blueprint">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1380" pageHeight="680" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TOP EXECUTIVE BOARDROOM TITLE BANNER WITH UNDERLINE -->
        <mxCell id="title_banner" value="<b>MODERN DATA STACK ARCHITECTURE BLUEPRINT with CDC, DATA CONTRACTS, MEDALLION LAKEHOUSE, and REVERSE ETL</b>" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=14;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="35" y="10" width="1310" height="24" as="geometry" />
        </mxCell>
        <mxCell id="title_line" value="" style="line;strokeWidth=2;strokeColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="35" y="34" width="1310" height="4" as="geometry" />
        </mxCell>

        <!-- ==================== TIER 1 ROW (y=48 .. 215) ==================== -->
        <!-- TIER 1 CHEVRON BADGE + FULL-WIDTH TEAL HEADER STRIP -->
        <mxCell id="mt1_chev" value="<b>TIER 1</b>" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;strokeWidth=0;fillColor=#0D9488;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;" vertex="1" parent="1">
          <mxGeometry x="35" y="48" width="110" height="28" as="geometry" />
        </mxCell>
        <mxCell id="mt1_bar" value="&amp;nbsp;&amp;nbsp;<b>OPERATIONAL SOURCES, CDC INGESTION &amp;amp; DATA CONTRACT GATE</b>" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=0;fillColor=#0D9488;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=left;" vertex="1" parent="1">
          <mxGeometry x="150" y="48" width="1195" height="28" as="geometry" />
        </mxCell>

        <!-- TIER 1 CARDS MATCHING EXACT REFERENCE EXHIBIT CONTENT -->
        <!-- [1.1] Production Operational OLTP Core -->
        <mxCell id="mn1_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[1.1] Production Operational OLTP Core&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;PostgreSQL &amp;amp; Cloud Spanner&lt;/b&gt;&lt;br&gt;transactional ledgers&lt;br&gt;&lt;br&gt;Visualizing real-time WAL log streams &amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;🐘 🛢️&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0D9488;fillColor=#FFFFFF;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="35" y="86" width="410" height="120" as="geometry" />
        </mxCell>

        <!-- [1.2] Debezium / Fivetran Log-Based CDC -->
        <mxCell id="mn1_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[1.2] Debezium / Fivetran Log-Based CDC&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;Real-time Change Data Capture engine&lt;br&gt;Processing 85,000 CDC&lt;br&gt;mutations/sec under sub-1.8s SLA &amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;⚡ 🌐&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0D9488;fillColor=#E0F2FE;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="485" y="86" width="410" height="120" as="geometry" />
        </mxCell>

        <!-- [1.3] Data Contract & PII Compliance Gate -->
        <mxCell id="mn1_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[1.3] Data Contract &amp;amp; PII Compliance Gate&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;Soda.io &amp;amp; Great Expectations&lt;/b&gt;&lt;br&gt;automated quality rules&lt;br&gt;• Blocks Schema Drift &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;✅ 🔒&lt;/span&gt;&lt;br&gt;• Redacts PII&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#0D9488;fillColor=#FFFFFF;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="935" y="86" width="410" height="120" as="geometry" />
        </mxCell>

        <!-- ==================== TIER 2 ROW (y=242 .. 415) ==================== -->
        <!-- TIER 2 CHEVRON BADGE + FULL-WIDTH PURPLE HEADER STRIP -->
        <mxCell id="mt2_chev" value="<b>TIER 2</b>" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;strokeWidth=0;fillColor=#D97706;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;" vertex="1" parent="1">
          <mxGeometry x="35" y="242" width="110" height="28" as="geometry" />
        </mxCell>
        <mxCell id="mt2_bar" value="&amp;nbsp;&amp;nbsp;<b>MEDALLION LAKEHOUSE ARCHITECTURE &amp;amp; dbt TRANSFORMATION</b>" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=0;fillColor=#7C3AED;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=left;" vertex="1" parent="1">
          <mxGeometry x="150" y="242" width="1195" height="28" as="geometry" />
        </mxCell>

        <!-- TIER 2 EXACT MEDALLION CARDS MATCHING REFERENCE EXHIBIT COLOR PALETTE -->
        <!-- [2.1] Bronze Raw Ingestion Lake Zone (#FFF7ED peach fill, #D97706 brown border) -->
        <mxCell id="mn2_1" value="&lt;font color=&quot;#78350F&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[2.1] Bronze Raw Ingestion Lake Zone&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#78350F&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;Apache Iceberg&lt;/b&gt; immutable table format&lt;br&gt;• Z-Order spatial indexing &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;❄️ 🌐&lt;/span&gt;&lt;br&gt;• Time-travel audit capability&lt;br&gt;&lt;br&gt;🥉 &lt;b&gt;Enterprise Medallion Badge: Bronze&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#D97706;fillColor=#FFF7ED;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="35" y="280" width="410" height="135" as="geometry" />
        </mxCell>

        <!-- [2.2] Silver Cleansed Enterprise Marts (#F8FAFC white/silver fill, #64748B border) -->
        <mxCell id="mn2_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[2.2] Silver Cleansed Enterprise Marts&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;dbt Core&lt;/b&gt; incremental transformations&lt;br&gt;Performing cross-system&lt;br&gt;golden record deduplication &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;⚙️ &lt;b style=&quot;color:#EA580C;&quot;&gt;dbt&lt;/b&gt;&lt;/span&gt;&lt;br&gt;&lt;br&gt;🥈 &lt;b&gt;Enterprise Medallion Badge: Silver&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#64748B;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="485" y="280" width="410" height="135" as="geometry" />
        </mxCell>

        <!-- [2.3] Gold Executive Boardroom Warehouse (#FEFCE8 soft gold fill, #EAB308 gold border) -->
        <mxCell id="mn2_3" value="&lt;font color=&quot;#713F12&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[2.3] Gold Executive Boardroom Warehouse&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#713F12&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;BigQuery / Snowflake&lt;/b&gt; star-schema&lt;br&gt;Serving sub-second C-Suite&lt;br&gt;BI &amp;amp; financial reporting &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;🔍 ❄️ 📊&lt;/span&gt;&lt;br&gt;&lt;br&gt;🥇 &lt;b&gt;Enterprise Medallion Badge: Gold&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#EAB308;fillColor=#FEFCE8;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="935" y="280" width="410" height="135" as="geometry" />
        </mxCell>

        <!-- ==================== TIER 3 ROW (y=440 .. 610) ==================== -->
        <!-- TIER 3 CHEVRON BADGE + FULL-WIDTH SLATE HEADER STRIP -->
        <mxCell id="mt3_chev" value="<b>TIER 3</b>" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;strokeWidth=0;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;" vertex="1" parent="1">
          <mxGeometry x="35" y="440" width="110" height="28" as="geometry" />
        </mxCell>
        <mxCell id="mt3_bar" value="&amp;nbsp;&amp;nbsp;<b>REVERSE ETL, ML FEATURE STORE &amp;amp; OPERATIONAL CRM ACTIVATION</b>" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=0;fillColor=#1E293B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=left;" vertex="1" parent="1">
          <mxGeometry x="150" y="440" width="1195" height="28" as="geometry" />
        </mxCell>

        <!-- EXACT TIER 2 -> TIER 3 HORIZONTAL BUS LINE MATCHING EXHIBIT media_1786031979694.png -->
        <mxCell id="t3_bus" value="" style="line;strokeWidth=2;strokeColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="240" y="432" width="900" height="4" as="geometry" />
        </mxCell>

        <!-- TIER 3 CARDS MATCHING REFERENCE EXHIBIT -->
        <!-- [3.1] Reverse ETL Operational Router -->
        <mxCell id="mn3_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[3.1] Reverse ETL Operational Router&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;Hightouch / Census&lt;/b&gt; sync controller&lt;br&gt;• Running 5-minute idempotent&lt;br&gt;upserts of Gold customer scores &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;🔄 ⇄&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#1E293B;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="35" y="480" width="410" height="125" as="geometry" />
        </mxCell>

        <!-- [3.2] Vertex AI Low-Latency ML Feature Store -->
        <mxCell id="mn3_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[3.2] Vertex AI Low-Latency ML Feature Store&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;Sub-10ms online &amp;amp; offline feature serving&lt;br&gt;• For LLM agents and&lt;br&gt;real-time fraud models &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:16px;&quot;&gt;🤖 🧠&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#1E293B;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="485" y="480" width="410" height="125" as="geometry" />
        </mxCell>

        <!-- [3.3] Activated Operational SaaS & CRM Core -->
        <mxCell id="mn3_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[3.3] Activated Operational SaaS &amp;amp; CRM Core&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;Salesforce, Looker Studio &amp;amp; Zendesk&lt;/b&gt; acting&lt;br&gt;on real-time customer LTV and churn risk&lt;br&gt;&lt;br&gt;&lt;span style=&quot;font-size:17px;&quot;&gt;☁️ &amp;nbsp;📊 &amp;nbsp;💬 &amp;nbsp;⚙️&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#1E293B;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="935" y="480" width="410" height="125" as="geometry" />
        </mxCell>

        <!-- ==================== EXACT ARROW ROUTING IN DEDICATED AIRSPACE ==================== -->
        <!-- Tier 1 Horizontal Flow -->
        <mxCell id="me1" value="Real-time WAL Log Streams" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0D9488;labelBackgroundColor=#FFFFFF;labelBorderColor=#0D9488;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn1_1" target="mn1_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="me2" value="CDC Mutations" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0D9488;labelBackgroundColor=#FFFFFF;labelBorderColor=#0D9488;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn1_2" target="mn1_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 1 -> Tier 2 Cleansed Raw Ingestion Drop from Bottom of [1.3] to [2.1] along Open Corridor y=228 -->
        <mxCell id="me3" value="Cleansed Raw Ingestion" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0D9488;labelBackgroundColor=#FFFFFF;labelBorderColor=#0D9488;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn1_3" target="mn2_1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1140" y="228" />
              <mxPoint x="240" y="228" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 2 Horizontal Medallion Transformation Flow -->
        <mxCell id="me4" value="Transform Raw Data" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#D97706;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_1" target="mn2_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="me5" value="Build Executive Marts" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_2" target="mn2_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 2 -> Tier 3 Bus & Activation Routing via Open Corridor at y=426 -->
        <mxCell id="me6" value="Gold Customer Scores" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#1E293B;labelBackgroundColor=#FFFFFF;labelBorderColor=#1E293B;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn2_3" target="t3_bus">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dx="-150" dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Horizontal Operational Sync Tier 3 in Open Airspace -->
        <mxCell id="me7" value="Synchronized Gold Scores" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#1E293B;labelBackgroundColor=#FFFFFF;labelBorderColor=#1E293B;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn3_1" target="mn3_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="me8" value="Real-time Customer LTV &amp;amp; Churn Risk" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#1E293B;labelBackgroundColor=#FFFFFF;labelBorderColor=#1E293B;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="mn3_2" target="mn3_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
  <diagram id="mds_executive_guide" name="Page 2: Executive Playbook &amp; Governance Profile">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1380" pageHeight="680" background="#FFFFFF">
      <root>
        <mxCell id="0_mdsp2" />
        <mxCell id="1_mdsp2" parent="0_mdsp2" />

        <!-- PAGE 2 HEADER BANNER -->
        <mxCell id="mdsp2_hdr" value="<b>EXECUTIVE ARCHITECTURE PLAYBOOK &amp;amp; GOVERNANCE METADATA PROFILE — DIAGRAM 12: MODERN DATA STACK (CDC &amp;amp; MEDALLION)</b>" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="35" y="10" width="1310" height="28" as="geometry" />
        </mxCell>
        <mxCell id="mdsp2_line" value="" style="line;strokeWidth=2;strokeColor=#0F172A;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="35" y="38" width="1310" height="4" as="geometry" />
        </mxCell>

        <!-- KPI SUMMARY BAR WITH STRATEGIC IMPORTANCE 5/5 STARS -->
        <mxCell id="mdskpi_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;ARCHITECTURE NAME&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;Modern Data Stack, Medallion &amp;amp; Reverse ETL&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0F172A;fillColor=#F8FAFC;align=center;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="35" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <mxCell id="mdskpi_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;STRATEGIC IMPORTANCE SCORE&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#D97706&quot; style=&quot;font-size:16px;&quot;&gt;&lt;b&gt;★★★★★ &amp;nbsp;5.0 / 5.0&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;strokeColor=#D97706;fillColor=#FEFCE8;align=center;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="375" y="55" width="290" height="55" as="geometry" />
        </mxCell>

        <mxCell id="mdskpi_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;PRODUCT JOURNEY TIMING&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0D9488&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;Series B+ Scale &amp;amp; AI Monetization Phase&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0D9488;fillColor=#F0FDFA;align=center;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="695" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <mxCell id="mdskpi_4" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;TARGET ARTIFACT DOCUMENT&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#2563EB&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;Data Engineering Blueprint &amp;amp; C-Suite Deck&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#2563EB;fillColor=#EFF6FF;align=center;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="1035" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <!-- PERSONA MATRIX ROW -->
        <mxCell id="mdsper_1" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0D9488;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👤 PRIMARY CREATOR PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Principal Staff Data Architect / Analytics Engineer&lt;/b&gt; (&lt;i&gt;Staff Data Engineer at Google/Snowflake; Principal Data &amp;amp; AI Architect at Consulting&lt;/i&gt;)&lt;br&gt;&lt;br&gt;Responsible for CDC WAL synchronization, Medallion Lakehouse schema contracts (dbt Core), and Reverse ETL operational activation SLAs.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0D9488;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="35" y="130" width="630" height="115" as="geometry" />
        </mxCell>

        <mxCell id="mdsper_2" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#7C3AED;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👔 PRIMARY CONSUMER PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#F5F3FF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Chief Data Officer (CDO), VP of Business Intelligence, VP of Revenue Operations &amp;amp; AI Leads&lt;/b&gt;&lt;br&gt;&lt;br&gt;Uses this architecture to guarantee sub-second executive reporting, eliminate data schema drift incidents, and power real-time ML feature serving.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#7C3AED;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="695" y="130" width="650" height="115" as="geometry" />
        </mxCell>

        <!-- TWO-COLUMN DEEP STRATEGIC PERSPECTIVE COMPARISON: GOOGLE PRODUCT STANDPOINT vs MCKINSEY CONSULTING STANDPOINT -->
        <mxCell id="mdslens_google" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0D9488;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;🚀 BIG TECH &amp;amp; PRODUCT COMPANY STANDPOINT (e.g. Google / Snowflake / Stripe)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#0D9488;&quot;&gt;1. Real-Time Telemetry &amp;amp; AI Feature Activation:&lt;/b&gt; At Google/Stripe, production transactional databases (OLTP) feed continuous CDC WAL events directly into BigQuery and low-latency Vertex AI feature stores without impacting production database CPU.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#0D9488;&quot;&gt;2. Data Contracts &amp;amp; PII Automated Gates:&lt;/b&gt; Soda.io &amp;amp; Great Expectations act as automated CI/CD PR guardrails blocking non-compliant schema changes before they break downstream reporting models.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#0D9488;&quot;&gt;3. Idempotent Reverse ETL Loops:&lt;/b&gt; Gold analytical scores (LTV, Churn Risk) are operationalized back into production SaaS apps via Hightouch/Census to trigger automated product intervention workflows.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0D9488;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="35" y="265" width="630" height="380" as="geometry" />
        </mxCell>

        <mxCell id="mdslens_mckinsey" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#7C3AED;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;💼 TIER-1 MANAGEMENT CONSULTING STANDPOINT (e.g. McKinsey / Accenture / Slalom)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#F5F3FF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;1. Enterprise Data &amp;amp; AI Billable Engagement Blueprint:&lt;/b&gt; Consultants use the 3 Medallion Lakehouse Zones (Bronze Raw, Silver Cleansed, Gold Boardroom) to structure enterprise data warehouse migrations (Teradata/Oracle to BigQuery/Snowflake).&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;2. Demonstrating Immediate Business ROI:&lt;/b&gt; By linking Reverse ETL to Salesforce/Zendesk in Tier 3, consultants prove direct top-line revenue uplift rather than presenting a silent internal data warehouse.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;3. Data Governance &amp;amp; Regulatory Assurance:&lt;/b&gt; Establishes immutable WORM audit logs and cryptographic provenance required for banking, healthcare, and insurance enterprise clients.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#7C3AED;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_mdsp2">
          <mxGeometry x="695" y="265" width="650" height="380" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

// 15. Enterprise Event-Driven Microservices Architecture (EDA) (MULTI-PAGE BOARDROOM BLUEPRINT: Page 1 Blueprint + Page 2 Strategic Playbook)
const TECH_XML_EVENT_DRIVEN_EDA = `<mxfile host="embed.diagrams.net">
  <diagram id="event_driven_eda" name="Page 1: Event-Driven EDA Blueprint">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1380" pageHeight="680" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TOP EXECUTIVE BOARDROOM TITLE BANNER & SUBTITLE -->
        <mxCell id="title_banner" value="<b>McKinsey-Grade Enterprise Event-Driven Microservices Architecture (EDA) Blueprint</b>" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=16;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="30" y="8" width="1320" height="26" as="geometry" />
        </mxCell>
        <mxCell id="title_sub" value="Designed for Widescreen Boardroom Presentation Layout (1340px width)" style="text;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="30" y="32" width="1320" height="18" as="geometry" />
        </mxCell>

        <!-- ==================== TIER 1 ROW (y=55 .. 220) ==================== -->
        <!-- TIER 1 FULL-WIDTH GREY SWIMLANE HEADER BANNER -->
        <mxCell id="et1_hdr" value="&amp;nbsp;&amp;nbsp;<b>TIER 1</b> &amp;nbsp;&lt;span style=&quot;font-weight:normal;&quot;&gt;(Transaction Producers, PCI-DSS Ledger &amp;amp; Schema Registry Gate)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#CBD5E1;fillColor=#F1F5F9;fontColor=#0F172A;fontStyle=1;fontSize=12;align=left;" vertex="1" parent="1">
          <mxGeometry x="30" y="55" width="1320" height="26" as="geometry" />
        </mxCell>

        <!-- TIER 1 CARD [1.1] Order & Checkout Microservices Pods -->
        <mxCell id="en1_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[1.1] Order &amp;amp; Checkout Microservices Pods&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;br&gt;&lt;font color=&quot;#1E293B&quot; style=&quot;font-size:11px;&quot;&gt;Emitting events&lt;br&gt;into Transactional&lt;br&gt;Outbox tables&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="30" y="90" width="410" height="135" as="geometry" />
        </mxCell>
        <!-- Stacked Pods Icon inside [1.1] -->
        <mxCell id="p1_1_pod1" value="🛒" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#64748B;fillColor=#EFF6FF;fontSize=16;" vertex="1" parent="1">
          <mxGeometry x="175" y="122" width="65" height="50" as="geometry" />
        </mxCell>
        <mxCell id="p1_1_lbl" value="&lt;b&gt;OrderPlaced&lt;br&gt;&amp;amp; FraudScreened&lt;/b&gt;" style="text;html=1;align=center;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="160" y="176" width="95" height="28" as="geometry" />
        </mxCell>
        <!-- AlloyDB Transactional Outbox Box inside [1.1] -->
        <mxCell id="p1_1_db" value="&lt;b style=&quot;color:#1D4ED8;&quot;&gt;AlloyDB&lt;/b&gt;&lt;br&gt;🛢️&lt;br&gt;Transactional&lt;br&gt;Outbox" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#2563EB;fillColor=#EFF6FF;fontSize=10;fontColor=#0F172A;align=center;" vertex="1" parent="1">
          <mxGeometry x="300" y="122" width="125" height="75" as="geometry" />
        </mxCell>
        <mxCell id="p1_1_arr" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;" edge="1" parent="1" source="p1_1_pod1" target="p1_1_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- TIER 1 CARD [1.2] Payment Settlement & Ledger Pods (with PCI-DSS Badge & CLEAR 25px BREATHING ROOM) -->
        <mxCell id="en1_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[1.2] Payment Settlement &amp;amp; Ledger Pods&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;br&gt;&lt;font color=&quot;#1E293B&quot; style=&quot;font-size:11px;&quot;&gt;Generates &lt;b&gt;Settlement Events&lt;/b&gt;&lt;br&gt;Protected by cryptographic HMAC payload signatures&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="485" y="90" width="410" height="135" as="geometry" />
        </mxCell>
        <!-- PCI-DSS Badge inside [1.2] -->
        <mxCell id="p1_2_pci" value="&lt;b style=&quot;color:#059669;&quot;&gt;PCI&lt;/b&gt;-DSS 🛡️" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#059669;fillColor=#ECFDF5;fontSize=10;fontColor=#065F46;" vertex="1" parent="1">
          <mxGeometry x="805" y="100" width="75" height="24" as="geometry" />
        </mxCell>
        <!-- Pods Visual inside [1.2] shifted down to y=152 for 25px clear breathing space -->
        <mxCell id="p1_2_pod" value="💳 &lt;b&gt;Payment Pods&lt;/b&gt;&amp;nbsp;|&amp;nbsp; &lt;span style=&quot;font-size:10px;&quot;&gt;HMAC-SHA256 Signatures&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#64748B;fillColor=#EFF6FF;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="505" y="152" width="370" height="52" as="geometry" />
        </mxCell>

        <!-- TIER 1 CARD [1.3] Apache Avro / Protobuf Schema Registry -->
        <mxCell id="en1_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[1.3] Apache Avro / Protobuf Schema Registry&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;&lt;b&gt;Backward &amp;amp; forward schema contract gate&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="935" y="90" width="415" height="135" as="geometry" />
        </mxCell>
        <!-- Schema decision gate visual inside [1.3] -->
        <mxCell id="p1_3_sub1" value="Automatically&lt;br&gt;rejects malformed&lt;br&gt;payloads" style="text;html=1;align=center;fontSize=10;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="945" y="150" width="115" height="40" as="geometry" />
        </mxCell>
        <mxCell id="p1_3_gate" value="✓" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;strokeColor=#059669;fillColor=#ECFDF5;fontSize=16;fontColor=#059669;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="1100" y="146" width="46" height="46" as="geometry" />
        </mxCell>
        <mxCell id="p1_3_sub2" value="Valid&lt;br&gt;payloads ✅" style="text;html=1;align=center;fontSize=11;fontColor=#065F46;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="1225" y="150" width="90" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p1_3_a1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#059669;" edge="1" parent="1" source="p1_3_gate" target="p1_3_sub2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ==================== TIER 2 ROW (y=245 .. 415) ==================== -->
        <!-- TIER 2 FULL-WIDTH GREY SWIMLANE HEADER BANNER -->
        <mxCell id="et2_hdr" value="&amp;nbsp;&amp;nbsp;<b>TIER 2</b> &amp;nbsp;&lt;span style=&quot;font-weight:normal;&quot;&gt;(Distributed Kafka Event Mesh &amp;amp; Automated DLQ Replay Controller)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#CBD5E1;fillColor=#F1F5F9;fontColor=#0F172A;fontStyle=1;fontSize=12;align=left;" vertex="1" parent="1">
          <mxGeometry x="30" y="245" width="1320" height="26" as="geometry" />
        </mxCell>

        <!-- TIER 2 CARD [2.2] Automated DLQ Self-Healing Replay Controller (ON THE LEFT MATCHING EXHIBIT!) -->
        <mxCell id="en2_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[2.2] Automated DLQ Self-Healing Replay Controller&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="30" y="280" width="410" height="135" as="geometry" />
        </mxCell>
        <!-- DLQ Hexagon Badge inside [2.2] -->
        <mxCell id="p2_2_dlq" value="&lt;b style=&quot;color:#FFFFFF;&quot;&gt;DLQ&lt;/b&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;strokeWidth=0;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="45" y="325" width="54" height="38" as="geometry" />
        </mxCell>
        <!-- Dedicated description text cell next to DLQ badge inside [2.2] -->
        <mxCell id="p2_2_desc" value="&lt;font color=&quot;#1E293B&quot; style=&quot;font-size:11px;&quot;&gt;Isolation of Poison-pill events, keeping unique interface&lt;br&gt;• Exponential backoff logic&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="108" y="320" width="155" height="85" as="geometry" />
        </mxCell>
        <!-- Operator Replay Console UI Widget inside [2.2] -->
        <mxCell id="p2_2_ui" value="&lt;b style=&quot;color:#1E293B;font-size:10px;&quot;&gt;Operator replay console&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Console interface&lt;/span&gt;&lt;hr style=&quot;border:0;border-top:1px solid #CBD5E1;margin:4px 0;&quot;&gt;🔴 &amp;nbsp;⚙️ &amp;nbsp;🔄" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#94A3B8;fillColor=#FFFFFF;fontSize=10;align=center;" vertex="1" parent="1">
          <mxGeometry x="270" y="325" width="155" height="75" as="geometry" />
        </mxCell>

        <!-- TIER 2 CARD [2.1] Multi-Region Apache Kafka Broker Mesh (IN THE MIDDLE MATCHING EXHIBIT!) -->
        <mxCell id="en2_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[2.1] Multi-Region Apache Kafka Broker Mesh&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="485" y="280" width="410" height="135" as="geometry" />
        </mxCell>
        <!-- Kafka Logo top-right inside [2.1] -->
        <mxCell id="p2_1_logo" value="⚙️ &lt;b&gt;kafka&lt;/b&gt;" style="text;html=1;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="825" y="288" width="65" height="22" as="geometry" />
        </mxCell>
        <!-- Kafka Internal Mesh Flow inside [2.1] -->
        <mxCell id="p2_1_b1" value="&lt;b&gt;Brokers&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#64748B;fillColor=#EFF6FF;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="500" y="322" width="65" height="38" as="geometry" />
        </mxCell>
        <mxCell id="p2_1_topic" value="&lt;b&gt;Partitioned core topics&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#1D4ED8;font-size:10px;&quot;&gt;orders.v2 &amp;amp; payments.v1&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#3B82F6;fillColor=#DBEAFE;fontSize=10;align=center;" vertex="1" parent="1">
          <mxGeometry x="585" y="318" width="205" height="46" as="geometry" />
        </mxCell>
        <mxCell id="p2_1_b2" value="&lt;b&gt;Brokers&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#64748B;fillColor=#EFF6FF;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="810" y="322" width="65" height="38" as="geometry" />
        </mxCell>
        <!-- Zstandard compression badge inside [2.1] -->
        <mxCell id="p2_1_zstd" value="⚡ &lt;b&gt;Zstandard&lt;/b&gt; &amp;nbsp;|&amp;nbsp; &lt;span style=&quot;font-size:10px;&quot;&gt;-75% egress compression&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#2563EB;fillColor=#EFF6FF;fontSize=11;fontColor=#1E4ED8;" vertex="1" parent="1">
          <mxGeometry x="565" y="372" width="250" height="30" as="geometry" />
        </mxCell>

        <!-- TIER 2 CARD [2.3] Decoupled Downstream Consumer Workers (ON THE RIGHT MATCHING EXHIBIT!) -->
        <mxCell id="en2_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[2.3] Decoupled Downstream Consumer Workers&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="935" y="280" width="415" height="135" as="geometry" />
        </mxCell>
        <!-- Stacked Containers inside [2.3] -->
        <mxCell id="p2_3_stack" value="🚚 &lt;b&gt;Shipping Carrier &amp;amp; Inventory Allocation&lt;/b&gt; 📦" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#3B82F6;fillColor=#EFF6FF;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="955" y="316" width="375" height="45" as="geometry" />
        </mxCell>
        <!-- Distributed Redis Mutex locks inside [2.3] -->
        <mxCell id="p2_3_redis" value="🔴 &lt;b&gt;Distributed Redis mutex locks&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;&quot;&gt;ensuring events consistency across replicas&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#DC2626;fillColor=#FEF2F2;fontSize=10;fontColor=#991B1B;" vertex="1" parent="1">
          <mxGeometry x="975" y="368" width="335" height="38" as="geometry" />
        </mxCell>

        <!-- ==================== TIER 3 ROW (y=440 .. 610) ==================== -->
        <!-- TIER 3 FULL-WIDTH GREY SWIMLANE HEADER BANNER -->
        <mxCell id="et3_hdr" value="&amp;nbsp;&amp;nbsp;<b>TIER 3</b> &amp;nbsp;&lt;span style=&quot;font-weight:normal;&quot;&gt;(Immutable Event Ledger, CQRS Read Models &amp;amp; Real-Time CEP Fraud Engine)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#CBD5E1;fillColor=#F1F5F9;fontColor=#0F172A;fontStyle=1;fontSize=12;align=left;" vertex="1" parent="1">
          <mxGeometry x="30" y="440" width="1320" height="26" as="geometry" />
        </mxCell>

        <!-- TIER 3 CARD [3.1] Cloud Spanner Global Immutable Event Ledger -->
        <mxCell id="en3_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[3.1] Cloud Spanner Global Immutable Event Ledger&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="30" y="478" width="410" height="135" as="geometry" />
        </mxCell>
        <!-- Spanner TrueTime Atomic Append-Only Store inside [3.1] -->
        <mxCell id="p3_1_spanner" value="☁️ &lt;b&gt;TrueTime atomic&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;&quot;&gt;append-only store&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#2563EB;fillColor=#EFF6FF;fontSize=10;fontColor=#1E4ED8;" vertex="1" parent="1">
          <mxGeometry x="45" y="515" width="165" height="85" as="geometry" />
        </mxCell>
        <!-- Audit Trail & Replay Gantt visual inside [3.1] -->
        <mxCell id="p3_1_audit" value="📜 &lt;b&gt;Log Audit trail&lt;/b&gt;&lt;br&gt;📊 Full historical audit&lt;br&gt;&amp;amp; replay engine" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#059669;fillColor=#ECFDF5;fontSize=10;fontColor=#065F46;" vertex="1" parent="1">
          <mxGeometry x="235" y="515" width="190" height="85" as="geometry" />
        </mxCell>

        <!-- TIER 3 CARD [3.2] CQRS Elasticsearch Materialized Read Views -->
        <mxCell id="en3_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[3.2] CQRS Elasticsearch Materialized Read Views&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="485" y="478" width="410" height="135" as="geometry" />
        </mxCell>
        <!-- Read projections chart inside [3.2] -->
        <mxCell id="p3_2_chart" value="📊 &lt;b&gt;Read projections&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;&quot;&gt;sub-5ms query latency&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#D97706;fillColor=#FFFBEB;fontSize=10;fontColor=#92400E;" vertex="1" parent="1">
          <mxGeometry x="500" y="515" width="185" height="85" as="geometry" />
        </mxCell>
        <!-- Executive Dashboard Browser UI Widget inside [3.2] -->
        <mxCell id="p3_2_dash" value="💻 &lt;b&gt;Executive dashboard&lt;/b&gt;&lt;br&gt;&amp;amp; search API&lt;br&gt;🔍 Sub-second BI" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#2563EB;fillColor=#EFF6FF;fontSize=10;fontColor=#1E4ED8;" vertex="1" parent="1">
          <mxGeometry x="700" y="515" width="180" height="85" as="geometry" />
        </mxCell>

        <!-- TIER 3 CARD [3.3] Real-Time CEP Fraud & Risk Engine (EXACT HORIZONTAL PIPELINE CHAIN MATCHING media_1786033044522.png) -->
        <mxCell id="en3_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12.5px;&quot;&gt;&lt;b&gt;[3.3] Real-Time CEP Fraud &amp;amp; Risk Engine&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;strokeWidth=2;strokeColor=#94A3B8;fillColor=#F8FAFC;verticalAlign=top;spacing=10;align=left;" vertex="1" parent="1">
          <mxGeometry x="935" y="478" width="415" height="135" as="geometry" />
        </mxCell>
        <!-- Red Risk Flash Badge top-right inside [3.3] -->
        <mxCell id="p3_3_risk" value="⚡ &lt;b style=&quot;color:#DC2626;&quot;&gt;risk&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#DC2626;fillColor=#FEF2F2;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="1275" y="488" width="65" height="24" as="geometry" />
        </mxCell>
        <!-- CEP Red Octagon badge inside [3.3] -->
        <mxCell id="p3_3_cep" value="&lt;b style=&quot;color:#FFFFFF;font-size:12px;&quot;&gt;CEP&lt;/b&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;strokeWidth=0;fillColor=#DC2626;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="950" y="525" width="65" height="50" as="geometry" />
        </mxCell>
        <!-- Stream analytics box inside [3.3] -->
        <mxCell id="p3_3_stream" value="Stream analytics&lt;br&gt;&lt;b&gt;in &amp;lt;12ms&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1;strokeColor=#DC2626;fillColor=#FEF2F2;fontSize=10;fontColor=#991B1B;" vertex="1" parent="1">
          <mxGeometry x="1030" y="525" width="115" height="50" as="geometry" />
        </mxCell>
        <!-- Red Clock Time Stamp icon inside [3.3] -->
        <mxCell id="p3_3_clock" value="⏰ &lt;b&gt;Time stamp&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#DC2626;fillColor=#FEF2F2;fontSize=9;fontColor=#991B1B;" vertex="1" parent="1">
          <mxGeometry x="1160" y="522" width="60" height="56" as="geometry" />
        </mxCell>
        <!-- Automatic freeze of compromised accounts text inside [3.3] -->
        <mxCell id="p3_3_freeze" value="&lt;b style=&quot;color:#991B1B;&quot;&gt;Automatic freeze of compromised&lt;br&gt;accounts in &amp;lt;12ms SLA&lt;/b&gt;" style="text;html=1;align=center;fontSize=10;fontColor=#991B1B;" vertex="1" parent="1">
          <mxGeometry x="1010" y="582" width="250" height="28" as="geometry" />
        </mxCell>

        <!-- ==================== EXACT ARROW ROUTING IN DEDICATED AIRSPACE ==================== -->
        <!-- Tier 1 Horizontal Flow connecting dead-center at entryY=0.5 -->
        <mxCell id="ee1" value="Order &amp;amp; Settlement Events" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="en1_1" target="en1_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="ee2" value="Schema Verification Gate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="en1_2" target="en1_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 1 [1.3] -> Tier 2 Kafka Brokers drop -->
        <mxCell id="ee3" value="Ingress Verified Events" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#2563EB;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en1_3" target="en2_1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1140" y="232" />
              <mxPoint x="690" y="232" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 2 Flow: [2.1] Brokers -> [2.2] DLQ Self-Healing & [2.1] -> [2.3] Downstream Consumers -->
        <mxCell id="ee4" value="Event events" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#7C3AED;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_1" target="en2_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="ee5" value="Event events" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#2563EB;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_1" target="en2_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 2 Kafka Brokers -> Tier 3 Event Store & Read Views drop along Open Corridor y=426 -->
        <mxCell id="ee6" value="Kafka Event Stream Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#059669;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en2_1" target="en3_1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="690" y="426" />
              <mxPoint x="235" y="426" />
            </Array>
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Tier 3 Flow: [3.1] Spanner Immutable Event Ledger -> [3.2] CQRS Read Views -> [3.3] Real-Time CEP Fraud Engine -->
        <mxCell id="ee7" value="Atomic Write Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en3_1" target="en3_2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="ee8" value="Real-Time Fraud Evaluation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#DC2626;labelBackgroundColor=#FFFFFF;labelBorderColor=#DC2626;fontColor=#0F172A;fontStyle=1;fontSize=10;" edge="1" parent="1" source="en3_2" target="en3_3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint dy="-14" as="offset" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
  <diagram id="eda_executive_guide" name="Page 2: Executive Playbook &amp; Governance Profile">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1380" pageHeight="680" background="#FFFFFF">
      <root>
        <mxCell id="0_edap2" />
        <mxCell id="1_edap2" parent="0_edap2" />

        <!-- PAGE 2 HEADER BANNER -->
        <mxCell id="edap2_hdr" value="<b>EXECUTIVE ARCHITECTURE PLAYBOOK &amp;amp; GOVERNANCE METADATA PROFILE — DIAGRAM 13: ENTERPRISE EVENT-DRIVEN EDA</b>" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1_edap2">
          <mxGeometry x="35" y="10" width="1310" height="28" as="geometry" />
        </mxCell>
        <mxCell id="edap2_line" value="" style="line;strokeWidth=2;strokeColor=#0F172A;" vertex="1" parent="1_edap2">
          <mxGeometry x="35" y="38" width="1310" height="4" as="geometry" />
        </mxCell>

        <!-- KPI SUMMARY BAR WITH STRATEGIC IMPORTANCE 4.9/5 STARS -->
        <mxCell id="edakpi_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;ARCHITECTURE NAME&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;Enterprise Event-Driven Microservices (EDA)&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0F172A;fillColor=#F8FAFC;align=center;" vertex="1" parent="1_edap2">
          <mxGeometry x="35" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <mxCell id="edakpi_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;STRATEGIC IMPORTANCE SCORE&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#D97706&quot; style=&quot;font-size:16px;&quot;&gt;&lt;b&gt;★★★★★ &amp;nbsp;4.9 / 5.0&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;strokeColor=#D97706;fillColor=#FEFCE8;align=center;" vertex="1" parent="1_edap2">
          <mxGeometry x="375" y="55" width="290" height="55" as="geometry" />
        </mxCell>

        <mxCell id="edakpi_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;PRODUCT JOURNEY TIMING&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#0D9488&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;High-Concurrency Scale-Out &amp;amp; Resiliency Phase&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0D9488;fillColor=#F0FDFA;align=center;" vertex="1" parent="1_edap2">
          <mxGeometry x="695" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <mxCell id="edakpi_4" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;TARGET ARTIFACT DOCUMENT&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#2563EB&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;High-Availability RFC, SRE Runbook &amp;amp; Audit Deck&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#2563EB;fillColor=#EFF6FF;align=center;" vertex="1" parent="1_edap2">
          <mxGeometry x="1035" y="55" width="310" height="55" as="geometry" />
        </mxCell>

        <!-- PERSONA MATRIX ROW -->
        <mxCell id="edaper_1" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#7C3AED;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👤 PRIMARY CREATOR PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Principal Distributed Systems Architect / Event-Driven Architect&lt;/b&gt; (&lt;i&gt;Staff Infrastructure Engineer at Google Cloud Pub/Sub; Managing Director at Consulting&lt;/i&gt;)&lt;br&gt;&lt;br&gt;Responsible for Transactional Outbox patterns, Avro schema compatibility gates, DLQ exponential backoff isolation, and Kafka cluster Zstandard compression.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#7C3AED;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_edap2">
          <mxGeometry x="35" y="130" width="630" height="115" as="geometry" />
        </mxCell>

        <mxCell id="edaper_2" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#DC2626;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👔 PRIMARY CONSUMER PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#FEF2F2;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;CTO, Head of SRE &amp;amp; Site Reliability Engineering, Chief Fraud &amp;amp; Risk Officer&lt;/b&gt;&lt;br&gt;&lt;br&gt;Uses this architecture to verify zero database lock contention under peak traffic, automated poison-pill DLQ self-healing, and sub-12ms CEP fraud mitigation.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#DC2626;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_edap2">
          <mxGeometry x="695" y="130" width="650" height="115" as="geometry" />
        </mxCell>

        <!-- TWO-COLUMN DEEP STRATEGIC PERSPECTIVE COMPARISON: GOOGLE PRODUCT STANDPOINT vs MCKINSEY CONSULTING STANDPOINT -->
        <mxCell id="edalens_google" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#1D4ED8;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;🚀 BIG TECH &amp;amp; PRODUCT COMPANY STANDPOINT (e.g. Google Cloud / Shopify / Uber)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;1. Non-Blocking High Concurrency &amp;amp; Peak Scale:&lt;/b&gt; Decouples core payment settlement from heavy downstream consumers (Inventory/Shipping). Prevents cascading outages during Black Friday traffic surges.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;2. Transactional Outbox Reliability Pattern:&lt;/b&gt; Guarantees At-Least-Once event emission from AlloyDB/PostgreSQL ledgers without distributed 2PC lock overhead.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;3. Automated Self-Healing DLQ Replays:&lt;/b&gt; Isolates malformed &amp;quot;poison-pill&amp;quot; events into automated dead-letter queues with exponential backoff and operator replay UI capability.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#1D4ED8;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_edap2">
          <mxGeometry x="35" y="265" width="630" height="380" as="geometry" />
        </mxCell>

        <mxCell id="edalens_mckinsey" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#DC2626;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;💼 TIER-1 MANAGEMENT CONSULTING STANDPOINT (e.g. McKinsey / Bain / PwC)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#FEF2F2;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#DC2626;&quot;&gt;1. Digital Core Banking &amp;amp; Fintech Modernization:&lt;/b&gt; Used by Tier-1 consultants to demonstrate compliance with PCI-DSS regulatory auditing, cryptographic HMAC payload integrity, and audit traceability.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#DC2626;&quot;&gt;2. Sub-12ms Complex Event Processing (CEP) Fraud Engine:&lt;/b&gt; Demonstrates immediate financial fraud reduction ROI to banking boardrooms by automatically freezing compromised customer accounts in &amp;lt;12ms.&lt;br&gt;&lt;br&gt;&lt;b style=&quot;color:#DC2626;&quot;&gt;3. Operational Risk Mitigation Dossier:&lt;/b&gt; Serves as the technical proof exhibit for regulatory authorities (FED, ECB, MAS) showing fault-tolerant ledger append persistence.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#DC2626;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_edap2">
          <mxGeometry x="695" y="265" width="650" height="380" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

export function getTechnicalArchitectureXml(archId: string): string {
  const id = (archId || '').toLowerCase();
  if (id.includes('multi_region_dr') || id.includes('active_passive') || id.includes('disaster_recovery') || id === 'dr' || id.includes('multi_region')) {
    return TECH_XML_MULTI_REGION_DR;
  }
  if (id.includes('serverless') || id.includes('cloud_run') || id === 'tech_serverless_gcp' || id === 'serverless_gcp') {
    return TECH_XML_SERVERLESS_GCP;
  }
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
  if (id.includes('legacy') || id.includes('dependency_map') || id.includes('strangler') || id === 'legacy_dependency_map') {
    return TECH_XML_LEGACY_DEPENDENCY_MAP;
  }
  if (id.includes('harness') || id.includes('agent_runtime') || id.includes('agent_harness')) {
    const { getExactAgentHarnessRuntimeReferenceXml } = require('./newEnterpriseReferenceXmls');
    return getExactAgentHarnessRuntimeReferenceXml();
  }
  return TECH_XML_SERVERLESS_GCP;
}

export const TECH_XML_AGENT_HARNESS_RUNTIME = '';

export {
  TECH_XML_SERVERLESS_GCP,
  TECH_XML_MULTI_REGION_DR,
  TECH_XML_LEGACY_DEPENDENCY_MAP,
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

