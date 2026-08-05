/**
 * 🎨 Technical Architecture 2D Network Topology XML Catalog
 * Contains the original, high-craft 2D technical cloud architecture diagrams
 * created before Business Architecture swimlane models were introduced.
 * These represent pure technical system/cloud network topology without swimlane tables.
 */

const TECH_XML_SERVERLESS_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="serverless-gcp-web-app" name="Page-1">
    <mxGraphModel dx="1920" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1400" pageHeight="1600" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Tier 1: Ingestion & Client UI Layer -->
        <mxCell id="node_1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🌐&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[1] User Client&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Web Browser / Mobile App&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="450" y="80" width="220" height="65" as="geometry" />
        </mxCell>

        <!-- Tier 2: API Gateways & Auth / IAM Security -->
        <mxCell id="node_2" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛡️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[2] Cloud Armor&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;WAF &amp;amp; DDoS Protection&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="230" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="node_3" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[3] Global HTTPS Load Balancer&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Traffic Distribution &amp;amp; SSL Offload&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="230" width="260" height="65" as="geometry" />
        </mxCell>

        <!-- Tier 3: Core Orchestration & UI Layer -->
        <mxCell id="node_4" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[4] Cloud CDN&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Content Delivery Network&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="380" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="node_5" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🎨&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[5] Cloud Run Frontend&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;User Interface (React/Vue/Angular)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="380" width="260" height="65" as="geometry" />
        </mxCell>

        <!-- Tier 4: Data & Context Storage Layer -->
        <mxCell id="node_8" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🪣&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[8] Cloud Storage&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Static Media Assets &amp;amp; Files&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="220" y="540" width="220" height="80" as="geometry" />
        </mxCell>
        <mxCell id="node_6" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚙️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[6] Cloud Run Backend API&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Business Logic &amp;amp; Microservices&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="540" width="260" height="65" as="geometry" />
        </mxCell>

        <!-- Tier 5: Relational & Secret Storage -->
        <mxCell id="node_9" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔑&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[9] Secret Manager&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Secure Credential &amp;amp; Key Storage&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="700" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="node_7" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛢️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[7] Cloud SQL&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Managed PostgreSQL Database&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="550" y="700" width="260" height="80" as="geometry" />
        </mxCell>

        <!-- Tier 6: Event Bus & Observability -->
        <mxCell id="node_10" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📦&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[10] Cloud Pub/Sub&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Asynchronous Event Bus&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="860" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="node_11" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📊&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[11] Cloud Logging &amp;amp; Monitoring&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Application Health &amp;amp; Metrics&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="860" width="260" height="65" as="geometry" />
        </mxCell>

        <!-- Tier 7: Security & Tracing -->
        <mxCell id="node_12" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📈&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[12] Cloud Trace &amp;amp; Debugger&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Performance Profiling&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="1020" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="node_13" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔒&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[13] Security Command Center&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Threat Detection &amp;amp; Compliance&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="1020" width="260" height="65" as="geometry" />
        </mxCell>

        <!-- Tier 8: CI/CD & IAM -->
        <mxCell id="node_15" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🚀&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[15] CI/CD Pipeline&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Automated Deployments (Cloud Build)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="1180" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="node_14" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔐&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[14] Google Cloud IAM&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Access Control &amp;amp; Permissions&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="1180" width="260" height="65" as="geometry" />
        </mxCell>

        <!-- Collision-Free Connectors -->
        <mxCell id="edge_1" value="HTTPS Request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_1" target="node_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2" value="Traffic Filtering" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_2" target="node_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="495" y="245" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_3" value="Static Content" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_3" target="node_4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="495" y="262" />
              <mxPoint x="495" y="412" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_4" value="Dynamic Content" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_3" target="node_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_5" value="Origin Pull / Cache Miss" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_4" target="node_8">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_6" value="API Calls" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_5" target="node_6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- Dynamic Asset Access routed cleanly via outer left waypoint x=110 -->
        <mxCell id="edge_7" value="Dynamic Asset Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_5" target="node_8">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="830" y="412" />
              <mxPoint x="870" y="412" />
              <mxPoint x="870" y="500" />
              <mxPoint x="110" y="500" />
              <mxPoint x="110" y="580" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_8" value="Data Operations (CRUD)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_6" target="node_7">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_9" value="Retrieve Credentials" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_6" target="node_9">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="550" y="572" />
              <mxPoint x="480" y="572" />
              <mxPoint x="480" y="732" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_10" value="Publish Events" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_6" target="node_10">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="680" y="650" />
              <mxPoint x="330" y="650" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_12" value="Logs &amp;amp; Metrics" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_6" target="node_11">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_13" value="Audit &amp;amp; Trace Data" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_11" target="node_12">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="680" y="980" />
              <mxPoint x="330" y="980" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_14" value="Security Findings" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_11" target="node_13">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_15" value="Deployments" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_15" target="node_5">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="140" y="1212" />
              <mxPoint x="140" y="412" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_18" value="Automated WAF Rule Updates" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;dashed=1;dashPattern=8 8;labelBackgroundColor=#FFFFFF;fontColor=#B91C1C;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_13" target="node_2">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="880" y="1052" />
              <mxPoint x="880" y="262" />
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_STREAMING_ANALYTICS = "<mxfile host=\"embed.diagrams.net\">\n  <diagram id=\"ecommerce_supply_chain\" name=\"E-Commerce Supply Chain Pipeline\">\n    <mxGraphModel dx=\"1446\" dy=\"728\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageEnabled=\"0\" pageScale=\"1\" pageWidth=\"850\" pageHeight=\"1100\" math=\"0\" shadow=\"0\">\n      <root>\n        <mxCell id=\"0\"/>\n        <mxCell id=\"1\" parent=\"0\"/>\n        <mxCell id=\"node1\" value=\"&lt;img src=&quot;https://api.iconify.design/material-symbols:phone-android-outline-rounded.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[1] Customer Mobile App&lt;/b&gt;&lt;br&gt;&lt;i&gt;User-facing E-Commerce Interface&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"150\" y=\"100\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node2\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:cloudflare.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[2] Cloudflare WAF Gateway&lt;/b&gt;&lt;br&gt;&lt;i&gt;Edge Security &amp; DDoS Protection&lt;/i&gt;\" style=\"rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;width=340;height=115;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"550\" y=\"70\" width=\"240\" height=\"90\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node3\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:stripe.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[3] Stripe Payment Processor&lt;/b&gt;&lt;br&gt;&lt;i&gt;Secure Payment Gateway &amp; API&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"150\" y=\"260\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node4\" value=\"&lt;img src=&quot;https://api.iconify.design/material-symbols:deployed-code-outline.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[4] Order Fulfillment Service&lt;/b&gt;&lt;br&gt;&lt;i&gt;Core Order Logic &amp; Orchestration&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"550\" y=\"260\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node5\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:kafka-icon.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[5] Kafka Event Stream&lt;/b&gt;&lt;br&gt;&lt;i&gt;Distributed Event Bus &amp; Messaging&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"150\" y=\"420\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node6\" value=\"&lt;img src=&quot;https://api.iconify.design/material-symbols:warehouse-outline.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[6] Inventory Warehouse Service&lt;/b&gt;&lt;br&gt;&lt;i&gt;Stock Management &amp; Availability&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"550\" y=\"420\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node9\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:fedex.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[9] FedEx Logistics API Sync&lt;/b&gt;&lt;br&gt;&lt;i&gt;Shipping &amp; Tracking Integration&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"350\" y=\"580\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node7\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:postgresql.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[7] PostgreSQL Order DB&lt;/b&gt;&lt;br&gt;&lt;i&gt;Primary Relational Order Data&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"150\" y=\"740\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node8\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:redis.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[8] Redis Stock Cache&lt;/b&gt;&lt;br&gt;&lt;i&gt;High-Speed Inventory Cache&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"550\" y=\"740\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node10\" value=\"&lt;img src=&quot;https://api.iconify.design/material-symbols:receipt-long-outline.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[10] Automated Audit Trail Ledger&lt;/b&gt;&lt;br&gt;&lt;i&gt;Immutable Transaction &amp; Event Log&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"950\" y=\"740\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge1_2\" value=\"&lt;i&gt;E-Commerce Request&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node1\" target=\"node2\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge2_4\" value=\"&lt;i&gt;Validated Order&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node2\" target=\"node4\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge4_3\" value=\"&lt;i&gt;Process Payment&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node4\" target=\"node3\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge3_4_reply\" value=\"&lt;i&gt;Payment Confirmation&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node3\" target=\"node4\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge4_5\" value=\"&lt;i&gt;Order Placed Event&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node4\" target=\"node5\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge5_6\" value=\"&lt;i&gt;Stock Update Request&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node5\" target=\"node6\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge6_8\" value=\"&lt;i&gt;Cache Read/Write&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node6\" target=\"node8\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge6_5_feedback\" value=\"&lt;i&gt;Inventory Updated Event&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node6\" target=\"node5\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge4_7\" value=\"&lt;i&gt;Save Order Details&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node4\" target=\"node7\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge4_9\" value=\"&lt;i&gt;Shipping Request&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node4\" target=\"node9\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge9_4_reply\" value=\"&lt;i&gt;Tracking Update&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node9\" target=\"node4\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge5_10\" value=\"&lt;i&gt;Persist All Events&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;\" edge=\"1\" parent=\"1\" source=\"node5\" target=\"node10\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>";

const TECH_XML_MICROSERVICES_AWS = "<mxfile host=\"embed.diagrams.net\">\n  <diagram id=\"aws_enterprise_arch\" name=\"AWS Enterprise Cloud Architecture\">\n    <mxGraphModel dx=\"1434\" dy=\"799\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageEnabled=\"0\" pageScale=\"1\" pageWidth=\"850\" pageHeight=\"1100\" math=\"0\" shadow=\"0\">\n      <root>\n        <mxCell id=\"0\"/>\n        <mxCell id=\"1\" parent=\"0\"/>\n        <mxCell id=\"node_waf\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[1] AWS WAF &amp; Shield&lt;/b&gt;&lt;br&gt;&lt;i&gt;DDoS Protection &amp; Web Firewall&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"100\" y=\"100\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_alb\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[2] AWS Application Load Balancer&lt;/b&gt;&lt;br&gt;&lt;i&gt;HTTP/S Traffic Distribution&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"450\" y=\"100\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_apigw\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[3] Amazon API Gateway&lt;/b&gt;&lt;br&gt;&lt;i&gt;Managed API Endpoints&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"800\" y=\"100\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_ecs\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[4] Amazon ECS Fargate Cluster&lt;/b&gt;&lt;br&gt;&lt;i&gt;Serverless Containerized Services&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"280\" y=\"280\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_lambda\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[5] AWS Lambda Microservices&lt;/b&gt;&lt;br&gt;&lt;i&gt;Event-Driven Functions&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#E1D5E7;strokeColor=#9673A6;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"680\" y=\"280\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_dynamodb\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[6] Amazon DynamoDB NoSQL&lt;/b&gt;&lt;br&gt;&lt;i&gt;Key-Value &amp; Document Database&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"100\" y=\"460\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_aurora\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[7] Amazon Aurora PostgreSQL&lt;/b&gt;&lt;br&gt;&lt;i&gt;Managed Relational Database&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"450\" y=\"460\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_opensearch\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[8] AWS OpenSearch Vector Index&lt;/b&gt;&lt;br&gt;&lt;i&gt;Search, Analytics &amp; Vector DB&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#E1D5E7;strokeColor=#9673A6;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"800\" y=\"460\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_s3\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[9] Amazon S3 Data Lake&lt;/b&gt;&lt;br&gt;&lt;i&gt;Raw &amp; Processed Data Storage&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"280\" y=\"640\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_cloudwatch\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:aws.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[10] AWS CloudWatch &amp; X-Ray&lt;/b&gt;&lt;br&gt;&lt;i&gt;Monitoring, Logs &amp; Tracing&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"680\" y=\"640\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_user_waf\" value=\"User Request\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\">\n          <mxGeometry relative=\"1\" as=\"geometry\">\n            <mxPoint x=\"210\" y=\"50\" as=\"sourcePoint\"/>\n            <mxPoint x=\"210\" y=\"100\" as=\"targetPoint\"/>\n          </mxGeometry>\n        </mxCell>\n        <mxCell id=\"edge_waf_alb\" value=\"Protected HTTP/S\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_waf\" target=\"node_alb\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_waf_apigw\" value=\"Protected API Calls\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_waf\" target=\"node_apigw\">\n          <mxGeometry relative=\"1\" as=\"geometry\">\n            <Array as=\"points\">\n              <mxPoint x=\"210\" y=\"200\"/>\n              <mxPoint x=\"910\" y=\"200\"/>\n            </Array>\n          </mxGeometry>\n        </mxCell>\n        <mxCell id=\"edge_alb_ecs\" value=\"Application Traffic\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_alb\" target=\"node_ecs\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_apigw_lambda\" value=\"API Invocation\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_apigw\" target=\"node_lambda\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_ecs_dynamodb\" value=\"NoSQL Operations\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_ecs\" target=\"node_dynamodb\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_ecs_aurora\" value=\"Relational Queries\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_ecs\" target=\"node_aurora\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_ecs_opensearch\" value=\"Search &amp; Indexing\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_ecs\" target=\"node_opensearch\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_lambda_dynamodb\" value=\"Event Persistence\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_lambda\" target=\"node_dynamodb\">\n          <mxGeometry relative=\"1\" as=\"geometry\">\n            <Array as=\"points\">\n              <mxPoint x=\"790\" y=\"340\"/>\n              <mxPoint x=\"790\" y=\"400\"/>\n              <mxPoint x=\"210\" y=\"400\"/>\n            </Array>\n          </mxGeometry>\n        </mxCell>\n        <mxCell id=\"edge_lambda_aurora\" value=\"Microservice Data\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_lambda\" target=\"node_aurora\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_lambda_opensearch\" value=\"Vector Operations\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_lambda\" target=\"node_opensearch\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_dynamodb_s3\" value=\"Archival &amp; Analytics\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_dynamodb\" target=\"node_s3\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_aurora_s3\" value=\"Data Warehousing\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_aurora\" target=\"node_s3\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_ecs_cloudwatch\" value=\"Logs &amp; Traces\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_ecs\" target=\"node_cloudwatch\">\n          <mxGeometry relative=\"1\" as=\"geometry\">\n            <Array as=\"points\">\n              <mxPoint x=\"390\" y=\"740\"/>\n              <mxPoint x=\"790\" y=\"740\"/>\n            </Array>\n          </mxGeometry>\n        </mxCell>\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>";

const TECH_XML_DATA_LAKEHOUSE = "<mxfile host=\"embed.diagrams.net\">\n  <diagram id=\"gcp_microservice_diagram\" name=\"Page-1\">\n    <mxGraphModel dx=\"1434\" dy=\"854\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageEnabled=\"0\" pageScale=\"1\" pageWidth=\"850\" pageHeight=\"1100\" math=\"0\" shadow=\"0\">\n      <root>\n        <mxCell id=\"0\"/>\n        <mxCell id=\"1\" parent=\"0\"/>\n        <mxCell id=\"node_1\" value=\"&lt;b&gt;[1] External API Clients&lt;/b&gt;&lt;br&gt;&lt;i&gt;Web, Mobile &amp; Partner Apps&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"100\" y=\"100\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_2\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[2] GCP Global Load Balancer&lt;/b&gt;&lt;br&gt;&lt;i&gt;HTTPS L7 Traffic Management&lt;/i&gt;\" style=\"rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"380\" y=\"85\" width=\"240\" height=\"90\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_3\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[3] Cloud Endpoints (API Gateway)&lt;/b&gt;&lt;br&gt;&lt;i&gt;API Security, AuthN/AuthZ, Routing&lt;/i&gt;\" style=\"rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"380\" y=\"245\" width=\"240\" height=\"90\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_4\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[4] Cloud Run Microservice&lt;/b&gt;&lt;br&gt;&lt;i&gt;Auto-scaling Containerized Service&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"400\" y=\"420\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_5\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[5] Cloud Tasks Queue&lt;/b&gt;&lt;br&gt;&lt;i&gt;Managed Asynchronous Task Queue&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"700\" y=\"420\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_6\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[6] Cloud SQL (PostgreSQL)&lt;/b&gt;&lt;br&gt;&lt;i&gt;Managed Relational Database&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"400\" y=\"580\" width=\"200\" height=\"80\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_7\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[7] Cloud Memorystore (Redis)&lt;/b&gt;&lt;br&gt;&lt;i&gt;High-Performance Caching Layer&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"700\" y=\"580\" width=\"200\" height=\"80\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_8\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[8] Cloud Logging&lt;/b&gt;&lt;br&gt;&lt;i&gt;Centralized Log Management&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"100\" y=\"740\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_9\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[9] Cloud Monitoring&lt;/b&gt;&lt;br&gt;&lt;i&gt;Metrics, Tracing &amp; Alerting&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"400\" y=\"740\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_10\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:github-icon.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[10] Cloud Source Repositories&lt;/b&gt;&lt;br&gt;&lt;i&gt;Git-based Code Management&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"700\" y=\"740\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_11\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[11] Cloud Build (CI/CD Pipeline)&lt;/b&gt;&lt;br&gt;&lt;i&gt;Automated Build, Test &amp; Deploy&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"1000\" y=\"740\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_12\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[12] Artifact Registry&lt;/b&gt;&lt;br&gt;&lt;i&gt;Container Image Storage&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"1000\" y=\"900\" width=\"200\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_1\" value=\"API Request\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_1\" target=\"node_2\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_2\" value=\"Routes Traffic\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_2\" target=\"node_3\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_3\" value=\"Invokes Service\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_3\" target=\"node_4\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_4\" value=\"Database Read/Write\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_4\" target=\"node_6\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_5\" value=\"Cache Access\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_4\" target=\"node_7\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_6\" value=\"Sends Async Tasks\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_4\" target=\"node_5\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_7\" value=\"Processes Tasks\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_5\" target=\"node_4\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_8\" value=\"Emits Logs\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_4\" target=\"node_8\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_9\" value=\"Sends Metrics &amp; Traces\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_4\" target=\"node_9\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_10\" value=\"Logs DB Events\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_6\" target=\"node_8\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_11\" value=\"Monitors DB Health\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_6\" target=\"node_9\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_12\" value=\"Code Push Trigger\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_10\" target=\"node_11\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_13\" value=\"Build &amp; Push Image\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_11\" target=\"node_12\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_14\" value=\"Deploys New Revision\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_12\" target=\"node_4\">\n          <mxGeometry relative=\"1\" as=\"geometry\">\n            <Array as=\"points\">\n              <mxPoint x=\"1100\" y=\"990\"/>\n              <mxPoint x=\"300\" y=\"990\"/>\n              <mxPoint x=\"300\" y=\"450\"/>\n            </Array>\n          </mxGeometry>\n        </mxCell>\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>";

const TECH_XML_RAG_GCP = `<mxfile host="embed.diagrams.net">
  <diagram id="rag_system_diagram" name="Multi-Agent RAG System">
    <mxGraphModel dx="2400" dy="1800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="2400" pageHeight="1800" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Tier 1: Ingestion & Client UI Layer (Y=80) -->
        <mxCell id="node_1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🌐&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[1] Secure Client Web Portal&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;User Interface for Queries &amp;amp; Interactions&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFE6CC;strokeColor=#D79B00;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="80" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 2: API Gateways & Auth / IAM Security (Y=240) -->
        <mxCell id="node_2" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛡️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[2] Apigee API Gateway&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;JWT Auth, PII Filters, Rate Limiting&lt;/i&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#D7B900;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="240" width="340" height="85" as="geometry" />
        </mxCell>

        <!-- Tier 3: Core Orchestration & LLM Engines (Y=400) -->
        <mxCell id="node_3" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🤖&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[3] Master Orchestrator Agent&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;LangChain / Vertex AI AgentCore Workflow&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="400" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 4: Data, RAG & Context Storage Layer (Y=580) -->
        <mxCell id="node_4" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[4] Dynamic Context Store&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Redis Cache for Session Grounding&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;padding=8;" vertex="1" parent="1">
          <mxGeometry x="140" y="580" width="280" height="85" as="geometry" />
        </mxCell>
        <mxCell id="node_5" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛢️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[5] Vertex AI Vector Search&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;High-Scale Vector Embeddings Database&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;padding=8;" vertex="1" parent="1">
          <mxGeometry x="540" y="580" width="340" height="85" as="geometry" />
        </mxCell>
        <mxCell id="node_6" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📚&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[6] Enterprise Knowledge Base&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Veeva Vault, SharePoint, Confluence&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#CCCCCC;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="580" width="300" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 5: 1:N Fan-Out & Execution Engine (Y=760) -->
        <mxCell id="node_7" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📦&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[7] Pub/Sub Event Bus&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Asynchronous Processing &amp;amp; Fan-out&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="760" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 6: Tactical Sub-Agents (Y=940) -->
        <mxCell id="node_8" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;✂️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[8] Document Chunking Agent&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Text Segmentation (LlamaIndex)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#CCCCCC;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="140" y="940" width="280" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_9" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔤&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[9] Embedding Agent&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Vectorization (Vertex AI Text)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#CCCCCC;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="940" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 7: Quality Control & Self-Healing Loops (Y=1120) -->
        <mxCell id="node_10" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛡️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[10] Compliance &amp;amp; QC Agent&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Output Monitoring, Bias &amp;amp; PII Detection&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="1120" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Zero-Collision Outer-Waypoint Connectors -->
        <mxCell id="edge_1_2" value="API Calls (HTTPS)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_1" target="node_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_3" value="Route Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_2" target="node_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_4" value="Context Read/Write" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_3" target="node_4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="490" y="440" />
              <mxPoint x="490" y="500" />
              <mxPoint x="280" y="500" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_3_5" value="Vector Query / RAG Retrieval" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_3" target="node_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_6_5" value="Knowledge Retrieval (Secure)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_6" target="node_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_6_7" value="Document Processing Request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_6" target="node_7">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1110" y="700" />
              <mxPoint x="710" y="700" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_7_8" value="Document Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_7" target="node_8">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="490" y="800" />
              <mxPoint x="490" y="870" />
              <mxPoint x="280" y="870" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_8_9" value="Processed Chunks" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_8" target="node_9">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_9_7" value="Embedding Generation Request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_9" target="node_7">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_9_5" value="Store Embeddings" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node_9" target="node_5">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="930" y="975" />
              <mxPoint x="930" y="700" />
              <mxPoint x="710" y="700" />
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_EVENT_DRIVEN_AWS = `<mxfile host="embed.diagrams.net">
  <diagram id="event_driven_aws" name="Event-Driven Microservices AWS">
    <mxGraphModel dx="2400" dy="1800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="2400" pageHeight="1800" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Tier 1: Ingestion (Y=80) -->
        <mxCell id="node1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📱&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[1] Web/Mobile Clients&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;E-Commerce Storefront Apps for Order Placement&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="80" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 2: API Gateway & Auth (Y=240) -->
        <mxCell id="node2" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[2] API Gateway&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Request Routing &amp;amp; Policy Enforcement&lt;/i&gt;" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="240" width="340" height="85" as="geometry" />
        </mxCell>
        <mxCell id="node2a" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔐&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[2a] Authentication Service&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;OAuth2 / JWT Token Validation&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="245" width="280" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 3: Saga Pattern Orchestration (Y=400) -->
        <mxCell id="node3" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚙️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[3] Saga Pattern Orchestrator&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Distributed Transaction Management&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="400" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 4: Event Bus & Dead-Letter Queue (Y=560) -->
        <mxCell id="node4a" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📮&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[4a] Dead-Letter Queue&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Failed Message Holding &amp;amp; Alerting&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="140" y="560" width="280" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node4" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📦&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[4] Kafka Event Broker&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Asynchronous Event Stream Bus&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="560" width="340" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 5: Spacious 4-Column Microservices Layer (Y=740) -->
        <mxCell id="node5" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛒&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[5] Order Service&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Manages Order Lifecycle&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="140" y="740" width="280" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node6" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;💳&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[6] Payment Service&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;PCI-DSS Compliant Gateway&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="740" width="340" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node7" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🏬&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[7] Inventory Service&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Stock Management &amp;amp; Reservation&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="740" width="280" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node8" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔔&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[8] Customer Notification Service&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Email/SMS Order Updates&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="740" width="280" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 6: Databases & External Services (Y=920) -->
        <mxCell id="node5a" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛢️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[5a] Orders Database&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;PostgreSQL / NoSQL DB&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="140" y="920" width="280" height="85" as="geometry" />
        </mxCell>
        <mxCell id="node6a" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛡️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[6a] Fraud Detection &amp;amp; Compliance&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Real-Time Risk Assessment&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="920" width="340" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node7a" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛢️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[7a] Inventory Database&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;PostgreSQL / NoSQL DB&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="960" y="920" width="280" height="85" as="geometry" />
        </mxCell>
        <mxCell id="node8a" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🚚&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[8a] Shipping &amp;amp; Logistics API&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Carrier Integration&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="920" width="280" height="75" as="geometry" />
        </mxCell>

        <!-- Zero-Collision Connectors with White Background Pills -->
        <mxCell id="edge1_2" value="Place Order Request (HTTPS)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node1" target="node2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge2_2a" value="Auth Token / Decision" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node2" target="node2a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge2_3" value="Validated Order Request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node2" target="node3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge3_4" value="Publish Order Placed Event" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node3" target="node4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge4_4a" value="Failed Messages" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#B91C1C;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node4" target="node4a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge4_5" value="Consume Order Events" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node4" target="node5">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="490" y="600" />
              <mxPoint x="490" y="700" />
              <mxPoint x="280" y="700" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_6" value="Payment Processed Event" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node4" target="node6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge4_7" value="Consume Inventory Events" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node4" target="node7">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="930" y="600" />
              <mxPoint x="930" y="700" />
              <mxPoint x="1100" y="700" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge4_8" value="Consume Order Status Events" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node4" target="node8">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="930" y="600" />
              <mxPoint x="1500" y="600" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge5_5a" value="Persist Order Data" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node5" target="node5a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge6_6a" value="Fraud Check &amp;amp; Risk Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node6" target="node6a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge7_7a" value="Reserve Stock Levels" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node7" target="node7a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge8_8a" value="Initiate Shipment / Track" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;" edge="1" parent="1" source="node8" target="node8a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_MULTI_REGION_DR = "<mxfile host=\"embed.diagrams.net\">\n  <diagram id=\"gW4x2z3y4z5a6b7c8d9e\" name=\"Page-1\">\n    <mxGraphModel dx=\"1440\" dy=\"1029\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1100\" pageHeight=\"850\" math=\"0\" shadow=\"0\">\n      <root>\n        <mxCell id=\"0\"/>\n        <mxCell id=\"1\" parent=\"0\"/>\n        <mxCell id=\"node_1\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:data-center.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[1] On-Premises Data Center&lt;/b&gt;&lt;br&gt;&lt;i&gt;Enterprise Hybrid Connectivity&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"100\" y=\"100\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_2\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[2] Google Global HTTP(S) LB&lt;/b&gt;&lt;br&gt;&lt;i&gt;Intelligent Traffic Routing&lt;/i&gt;\" style=\"rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;width=340;height=115;padding=10;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"500\" y=\"85\" width=\"240\" height=\"90\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_3\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[3] Cloud Interconnect&lt;/b&gt;&lt;br&gt;&lt;i&gt;Dedicated 10Gbps Link&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"100\" y=\"260\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_4\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[4] Cloud Armor WAF&lt;/b&gt;&lt;br&gt;&lt;i&gt;DDoS &amp; Web Attack Protection&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"510\" y=\"260\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_5\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[5] Primary Shared VPC Network&lt;/b&gt;&lt;br&gt;&lt;i&gt;Centralized Network Control&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"300\" y=\"420\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_6\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[6] Private Service Connect Endpoint&lt;/b&gt;&lt;br&gt;&lt;i&gt;Secure Internal API Access&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"600\" y=\"420\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_7\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[7] DR Shared VPC Network&lt;/b&gt;&lt;br&gt;&lt;i&gt;DR Centralized Network Control&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"900\" y=\"420\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_8\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:kubernetes.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[8] Primary GKE Cluster&lt;/b&gt;&lt;br&gt;&lt;i&gt;Multi-Zone Application Deployment&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"300\" y=\"580\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_9\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:kubernetes.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[9] DR GKE Cluster&lt;/b&gt;&lt;br&gt;&lt;i&gt;DR Region Disaster Recovery Apps&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"700\" y=\"580\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_10\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:postgresql.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[10] Primary Cloud SQL&lt;/b&gt;&lt;br&gt;&lt;i&gt;Managed PostgreSQL Instance&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"300\" y=\"740\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_11\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:postgresql.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[11] DR Cloud SQL&lt;/b&gt;&lt;br&gt;&lt;i&gt;Replicated PostgreSQL Instance&lt;/i&gt;\" style=\"shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"700\" y=\"740\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"node_12\" value=\"&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;float:left;margin-right:8px;vertical-align:middle;&quot; onerror=&quot;this.style.display=&apos;none&apos;&quot;&gt;&lt;b&gt;[12] DR Failover Orchestration&lt;/b&gt;&lt;br&gt;&lt;i&gt;DNS &amp; LB Route Updates&lt;/i&gt;\" style=\"rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#E1D5E7;strokeColor=#9673A6;fontColor=#000000;\" vertex=\"1\" parent=\"1\">\n          <mxGeometry x=\"1000\" y=\"580\" width=\"220\" height=\"60\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_1\" value=\"&lt;i&gt;Private Connectivity (BGP)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_1\" target=\"node_3\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_2\" value=\"&lt;i&gt;Dedicated Link (VPN)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_3\" target=\"node_5\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_3\" value=\"&lt;i&gt;Internal API Access (gRPC)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_1\" target=\"node_6\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_4\" value=\"&lt;i&gt;Public Traffic (HTTPS)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_2\" target=\"node_4\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_5\" value=\"&lt;i&gt;Filtered Requests (HTTPS)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_4\" target=\"node_8\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_6\" value=\"&lt;i&gt;Network Peering&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_5\" target=\"node_8\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_7\" value=\"&lt;i&gt;Database Queries (TCP/5432)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_8\" target=\"node_10\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_8\" value=\"&lt;i&gt;Cross-Region Data Replication&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;endArrow=classic;startArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_10\" target=\"node_11\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_9\" value=\"&lt;i&gt;Activate DR Services&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_12\" target=\"node_9\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_10\" value=\"&lt;i&gt;Database Queries (TCP/5432)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_9\" target=\"node_11\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_11\" value=\"&lt;i&gt;Network Peering&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_7\" target=\"node_9\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_12\" value=\"&lt;i&gt;Outbound Internal APIs&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_8\" target=\"node_6\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_13\" value=\"&lt;i&gt;Internal VPC Access&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#94A3B8;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_6\" target=\"node_5\">\n          <mxGeometry relative=\"1\" as=\"geometry\"/>\n        </mxCell>\n        <mxCell id=\"edge_14\" value=\"&lt;i&gt;DR Reroute (DNS/LB Update)&lt;/i&gt;\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;strokeWidth=2;strokeColor=#EF4444;dashed=1;dashPattern=8 8;startArrow=classic;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;\" edge=\"1\" parent=\"1\" source=\"node_12\" target=\"node_2\">\n          <mxGeometry relative=\"1\" as=\"geometry\">\n            <Array as=\"points\">\n              <mxPoint x=\"1050\" y=\"550\"/>\n              <mxPoint x=\"1050\" y=\"125\"/>\n              <mxPoint x=\"750\" y=\"125\"/>\n            </Array>\n          </mxGeometry>\n        </mxCell>\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>";

const TECH_XML_VPC_INFRA = `<mxfile host="embed.diagrams.net">
  <diagram id="aws_vpc_secret_network" name="Page-1">
    <mxGraphModel dx="1920" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1400" pageHeight="1600" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master VPC Boundary Container (Y=110, H=860) -->
        <mxCell id="aws_vpc_container" value="&lt;b style='font-size:13px;color:#0F172A;'&gt;[2] AWS Virtual Private Cloud (VPC)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:11px;color:#475569;'&gt;Highly Secure Zero-Trust Network Boundary&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;strokeWidth=2;fillColor=#F8FAFC;strokeColor=#0284C7;dashed=1;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=16;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="40" y="110" width="1320" height="860" as="geometry" />
        </mxCell>

        <!-- Tier 1: Ingestion & External Connectivity (Y=30) -->
        <mxCell id="external_user" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;👤&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[1] External User / On-Premise&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Secure Connectivity via VPN / Direct Connect&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="480" y="30" width="280" height="65" as="geometry" />
        </mxCell>

        <!-- Public Subnet Containers & Gateways (Y=200) -->
        <mxCell id="public_subnet_az1" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;[2b] Public Subnet&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;dashed=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="200" width="620" height="150" as="geometry" />
        </mxCell>
        <mxCell id="internet_gateway" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🌐&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[2a] Internet Gateway (IGW)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;VPC Ingress / Egress&lt;/i&gt;" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D6B656;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="90" y="235" width="220" height="85" as="geometry" />
        </mxCell>
        <mxCell id="nat_gateway_az1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[3] NAT Gateway (AZ1)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Private Subnet Egress&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D6B656;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="380" y="235" width="260" height="80" as="geometry" />
        </mxCell>

        <mxCell id="public_subnet_az2" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;[2c] Public Subnet&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;dashed=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="720" y="200" width="260" height="150" as="geometry" />
        </mxCell>
        <mxCell id="bastion_host_az1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;💻&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[4] Bastion Host (EC2)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Secure Jump Server&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="680" y="235" width="260" height="80" as="geometry" />
        </mxCell>

        <!-- Private Application Tier (Y=390) -->
        <mxCell id="internal_alb" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚖️&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[7] Internal ALB&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Internal App Balancing&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="425" width="190" height="80" as="geometry" />
        </mxCell>
        <mxCell id="private_app_subnet_az1" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;[5] Private App Subnet&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;dashed=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="370" y="390" width="260" height="150" as="geometry" />
        </mxCell>
        <mxCell id="ec2_app_az1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🐳&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[8] EC2 Auto Scaling (AZ1)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Containerized Microservices&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="380" y="425" width="240" height="80" as="geometry" />
        </mxCell>

        <mxCell id="private_app_subnet_az2" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;[6] Private App Subnet&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;dashed=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="660" y="390" width="260" height="150" as="geometry" />
        </mxCell>
        <mxCell id="ec2_app_az2" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🐳&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[9] EC2 Auto Scaling (AZ2)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Containerized Microservices&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="670" y="425" width="240" height="80" as="geometry" />
        </mxCell>

        <!-- Isolated Database Tier (Y=610) -->
        <mxCell id="isolated_db_subnet_az1" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;[10] Isolated DB Subnet&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;dashed=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="370" y="610" width="260" height="150" as="geometry" />
        </mxCell>
        <mxCell id="rds_aurora" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛢️&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[12] Amazon RDS / Aurora&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Managed PostgreSQL DB&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="380" y="645" width="240" height="95" as="geometry" />
        </mxCell>

        <mxCell id="isolated_db_subnet_az2" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;[11] Isolated DB Subnet&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;dashed=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontColor=#000000;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="660" y="610" width="260" height="150" as="geometry" />
        </mxCell>

        <!-- Right Side Security & Observability Services (X=1000) -->
        <mxCell id="aws_iam" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔑&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[17] AWS IAM&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Role-Based Access Control&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="200" width="260" height="75" as="geometry" />
        </mxCell>
        <mxCell id="kms_encryption" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔐&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[13] AWS KMS&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;KMS Data Key Management&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="320" width="260" height="75" as="geometry" />
        </mxCell>
        <mxCell id="vpc_flow_logs_cloudwatch" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📊&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[14] VPC Flow Logs &amp;amp; CloudWatch&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Traffic Monitoring &amp;amp; Audit&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="440" width="260" height="75" as="geometry" />
        </mxCell>
        <mxCell id="aws_guardduty" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛡️&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[15] AWS GuardDuty&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Intelligent Threat Detection&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="560" width="260" height="75" as="geometry" />
        </mxCell>
        <mxCell id="vpc_endpoints" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔌&lt;/span&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;[16] VPC Endpoints&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Private AWS Service Access&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1000" y="680" width="260" height="75" as="geometry" />
        </mxCell>

        <!-- Connectors with Zero-Collision Waypoints -->
        <mxCell id="edge_1_2a" value="HTTPS/VPN Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;startArrow=classic;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;entryX=0.25;entryY=0.25;" edge="1" parent="1" source="external_user" target="internet_gateway">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-12" as="offset" />
            <Array as="points">
              <mxPoint x="620" y="160" />
              <mxPoint x="140" y="160" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_2a_3" value="Outbound Internet Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="internet_gateway" target="nat_gateway_az1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-12" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_2a_4" value="Admin SSH Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;exitX=0.85;exitY=0.25;entryX=0.85;entryY=0;" edge="1" parent="1" source="internet_gateway" target="bastion_host_az1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-12" as="offset" />
            <Array as="points">
              <mxPoint x="284" y="160" />
              <mxPoint x="900" y="160" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_3_7" value="Application Outbound" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="nat_gateway_az1" target="internal_alb">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="480" y="370" />
              <mxPoint x="155" y="370" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_4_8_9" value="SSH Admin Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;exitX=0.85;exitY=1;entryX=0.85;entryY=0;" edge="1" parent="1" source="bastion_host_az1" target="ec2_app_az2">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="900" y="360" />
              <mxPoint x="874" y="360" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_7_8_9" value="HTTPS App&lt;br&gt;Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;startArrow=classic;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="internal_alb" target="ec2_app_az1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_7_8_9_az2" value="HA App Traffic" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;startArrow=classic;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="internal_alb" target="ec2_app_az2">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="165" y="570" />
              <mxPoint x="790" y="570" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_8_12" value="Secure DB Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;exitX=0.2;exitY=1;entryX=0.2;entryY=0;" edge="1" parent="1" source="ec2_app_az1" target="rds_aurora">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="-65" y="0" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_9_12" value="HA DB Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;exitX=0.2;exitY=1;entryX=0.8;entryY=0;" edge="1" parent="1" source="ec2_app_az2" target="rds_aurora">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="718" y="570" />
              <mxPoint x="562" y="570" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_12_13" value="Key Management" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;exitX=0.85;exitY=0.9;entryX=1;entryY=0.5;" edge="1" parent="1" source="rds_aurora" target="kms_encryption">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-12" as="offset" />
            <Array as="points">
              <mxPoint x="574" y="835" />
              <mxPoint x="1300" y="835" />
              <mxPoint x="1300" y="357" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_12_14" value="DB Activity Logs" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;exitX=0.85;exitY=0.7;entryX=0;entryY=0.5;" edge="1" parent="1" source="rds_aurora" target="vpc_flow_logs_cloudwatch">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-12" as="offset" />
            <Array as="points">
              <mxPoint x="574" y="765" />
              <mxPoint x="970" y="765" />
              <mxPoint x="970" y="477" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_ec2_vpc_endpoints" value="Private S3/ECR Access" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;entryX=0;entryY=0.5;" edge="1" parent="1" source="ec2_app_az1" target="vpc_endpoints">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-12" as="offset" />
            <Array as="points">
              <mxPoint x="490" y="800" />
              <mxPoint x="970" y="800" />
              <mxPoint x="970" y="717" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_threat_remediation" value="Threat Alerts &amp;amp; Remediation" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;dashed=1;dashPattern=8 8;startArrow=classic;endArrow=classic;labelBackgroundColor=#FFFFFF;fontColor=#B91C1C;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="aws_guardduty" target="internal_alb">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1000" y="535" />
              <mxPoint x="165" y="535" />
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_IOT_TELEMETRY = `<mxfile host="embed.diagrams.net">
  <diagram id="iot-telemetry-ingestion" name="Page-1">
    <mxGraphModel dx="1920" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1400" pageHeight="1600" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Tier 1: Field Devices & Gateways -->
        <mxCell id="node_1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[1] Industrial IoT Sensors&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Telemetry &amp;amp; Sensor Nodes&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="80" width="220" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_2" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[2] MQTT / HTTPS Gateway&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Edge Protocol Translation&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="80" width="260" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 2: Cloud Ingress Stream -->
        <mxCell id="node_3" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📦&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[3] Cloud Pub/Sub Telemetry Stream&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;High-Throughput Ingestion Bus&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="380" y="240" width="280" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 3: Real-Time Stream Processing -->
        <mxCell id="node_4" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🌊&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[4] Cloud Dataflow (Apache Beam)&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Real-time Windowing &amp;amp; Enrichment&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="400" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_5" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[5] Cloud Functions Evaluator&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Instant Anomaly Triggering&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="400" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 4: Time-Series & Historical Storage -->
        <mxCell id="node_6" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🛢️&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[6] Cloud Bigtable&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Low-Latency Time-Series DB&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="220" y="560" width="220" height="95" as="geometry" />
        </mxCell>
        <mxCell id="node_7" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📊&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[7] Google BigQuery Data Lake&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Historical Analytics &amp;amp; SQL Warehouse&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="550" y="560" width="260" height="95" as="geometry" />
        </mxCell>

        <!-- Tier 5: Predictive Analytics & Monitoring -->
        <mxCell id="node_8" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🤖&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[8] Vertex AI Model Monitoring&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Predictive Maintenance ML&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="220" y="730" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_9" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🚨&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[9] Cloud Monitoring Alerting&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;PagerDuty &amp;amp; Operational Push&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="550" y="730" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- Connectors -->
        <mxCell id="edge_1" value="Sensor Streams" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_1" target="node_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2" value="Publish Telemetry" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_2" target="node_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3" value="Stream Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_3" target="node_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_4" value="Real-time Evaluation" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_3" target="node_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_5" value="Write Time-Series" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_4" target="node_6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_6" value="Stream Batch Archive" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_4" target="node_7">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="345" y="515" />
              <mxPoint x="680" y="515" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_7" value="Trigger Operational Alert" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;labelBackgroundColor=#FFFFFF;fontColor=#B91C1C;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_5" target="node_9">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="835" y="437" />
              <mxPoint x="835" y="767" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_8" value="Train Anomaly Models" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_7" target="node_8">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const TECH_XML_CICD_PIPELINE = `<mxfile host="embed.diagrams.net">
  <diagram id="cicd-pipeline-architecture" name="Page-1">
    <mxGraphModel dx="1920" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="1400" pageHeight="1600" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Tier 1: Source Control & Developer Push -->
        <mxCell id="node_1" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;💻&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[1] GitHub / GitLab Polyrepo&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Source Code &amp;amp; PR Rules&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="150" y="80" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_2" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;⚡&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[2] Webhook Pipeline Trigger&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Event Payload Dispatcher&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#FFF2CC;strokeColor=#D79B00;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="80" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 2: CI Build & Security Scanning -->
        <mxCell id="node_3" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔨&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[3] Cloud Build Runner&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Unit Testing &amp;amp; Linting Jobs&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="150" y="240" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_4" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔒&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[4] SonarQube &amp;amp; Snyk SAST&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Static Code Security Audit&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="240" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 3: Artifact Build & Vulnerability Registry -->
        <mxCell id="node_5" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🐳&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[5] Docker Container Compiler&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Multi-Arch Image Building&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="150" y="400" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_6" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;📦&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[6] Artifact Registry Scanner&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Container Vulnerability Scan&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=8;" vertex="1" parent="1">
          <mxGeometry x="540" y="400" width="260" height="95" as="geometry" />
        </mxCell>

        <!-- Tier 4: GitOps Orchestration & Staging -->
        <mxCell id="node_7" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🐙&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[7] ArgoCD / Flux Controller&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Declarative K8s Manifest Sync&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F5F5F5;strokeColor=#CCCCCC;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="150" y="560" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_8" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🚀&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[8] Staging GKE Cluster&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Automated Integration Testing&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="560" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- Tier 5: Canary Production & Rollback Control -->
        <mxCell id="node_9" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🌟&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[9] Production GKE Cluster&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Canary Deployment &amp;amp; Traffic Shift&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="150" y="730" width="250" height="75" as="geometry" />
        </mxCell>
        <mxCell id="node_10" value="&lt;span style='font-size:24px;float:left;margin-right:8px;'&gt;🔄&lt;/span&gt;&lt;b style='font-size:12px;color:#0F172A;'&gt;[10] Automated Canary Rollback&lt;/b&gt;&lt;br&gt;&lt;i style='font-size:10px;color:#475569;'&gt;Telemetry Health Gatekeeper&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=2;fillColor=#F8CECC;strokeColor=#B85450;fontColor=#000000;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="730" width="260" height="75" as="geometry" />
        </mxCell>

        <!-- Connectors with Channel Waypoints -->
        <mxCell id="edge_1" value="Push Commit" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_1" target="node_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2" value="Trigger Build" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_2" target="node_3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="830" y="117" />
              <mxPoint x="830" y="195" />
              <mxPoint x="80" y="195" />
              <mxPoint x="80" y="277" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_3" value="Execute SAST Scan" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_3" target="node_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_4" value="Build Container" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_3" target="node_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_5" value="Push Image &amp;amp; Scan" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_5" target="node_6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_6" value="Sync GitOps Manifest" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_6" target="node_7">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="830" y="447" />
              <mxPoint x="830" y="525" />
              <mxPoint x="80" y="525" />
              <mxPoint x="80" y="597" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_7" value="Deploy Staging" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_7" target="node_8">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_8" value="Promote to Production" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_8" target="node_9">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="830" y="597" />
              <mxPoint x="830" y="685" />
              <mxPoint x="80" y="685" />
              <mxPoint x="80" y="767" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_9" value="Canary Fail -&amp;gt; Auto Rollback" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;dashed=1;dashPattern=8 8;labelBackgroundColor=#FFFFFF;fontColor=#B91C1C;fontStyle=1;fontSize=10;padding=4;" edge="1" parent="1" source="node_9" target="node_10">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

import {
  getExactItacsReferenceXml,
  getExactSequenceDiagramReferenceXml,
  getExactMacroSequenceDiagramReferenceXml,
  getExactDataAiPipelineReferenceXml,
  getExactSecureDeploymentMapReferenceXml,
  getExactDevopsCicdPipelineReferenceXml,
  getExactGovernanceStateMachineReferenceXml,
  getExactUnifiedSystemViewReferenceXml,
  getExactDarkModeUnifiedSystemViewReferenceXml,
  getExactEvalSafetyBenchmarkingReferenceXml
} from './diagramCompiler';

export function getTechnicalArchitectureXml(archId: string): string {
  if (!archId) return getExactItacsReferenceXml();
  const id = archId.toLowerCase();

  // Business Architecture Master Reference Mappings
  if (id === 'eval_safety_benchmarking' || id.includes('monitex') || id.includes('safety_benchmarking') || id.includes('red-teaming')) {
    return getExactEvalSafetyBenchmarkingReferenceXml();
  }
  if (id === 'conceptual_diagram' || id === 'conceptual' || id.includes('conceptual')) {
    return getExactItacsReferenceXml();
  }
  if (id === 'sequence_diagram' || id.includes('micro dynamic sequence')) {
    return getExactSequenceDiagramReferenceXml();
  }
  if (id === 'macro_sequence_diagram' || id.includes('macro dynamic sequence')) {
    return getExactMacroSequenceDiagramReferenceXml();
  }
  if (id === 'data_ai_pipeline' || id.includes('data & ai pipeline')) {
    return getExactDataAiPipelineReferenceXml();
  }
  if (id === 'secure_deployment_map' || id.includes('secure deployment')) {
    return getExactSecureDeploymentMapReferenceXml();
  }
  if (id === 'devops_cicd_pipeline' || id.includes('devops & ci/cd') || id.includes('operational flow')) {
    return getExactDevopsCicdPipelineReferenceXml();
  }
  if (id === 'governance_state_machine' || id.includes('governance') || id.includes('state machine')) {
    return getExactGovernanceStateMachineReferenceXml();
  }
  if (id === 'unified_system_view' || id.includes('unified system view')) {
    return getExactUnifiedSystemViewReferenceXml();
  }
  if (id === 'dark_mode_unified_system_view' || id.includes('architecture')) {
    return getExactDarkModeUnifiedSystemViewReferenceXml();
  }

  // Technical Topology Mappings
  if (id === 'tech_serverless_gcp' || id === 'serverless_gcp' || id === 'gcp_serverless_web_app' || id === 'gcp_project_itacs_production') return TECH_XML_SERVERLESS_GCP;
  if (id === 'tech_streaming_analytics' || id === 'streaming_pipeline' || id === 'gcp_realtime_streaming_pipeline') return TECH_XML_STREAMING_ANALYTICS;
  if (id === 'tech_microservices_aws' || id === 'k8s_mesh' || id === 'aws_eks_microservices_mesh') return TECH_XML_MICROSERVICES_AWS;
  if (id === 'tech_data_lakehouse' || id === 'data_lakehouse' || id === 'aws_modern_data_lakehouse') return TECH_XML_DATA_LAKEHOUSE;
  if (id === 'tech_rag_gcp' || id === 'rag_gcp' || id === 'gcp_ai_cognitive_rag') return TECH_XML_RAG_GCP;
  if (id === 'tech_event_driven_aws' || id === 'event_driven_aws' || id === 'aws_serverless_event_driven') return TECH_XML_EVENT_DRIVEN_AWS;
  if (id === 'tech_multi_region_dr' || id === 'multi_region_dr') return TECH_XML_MULTI_REGION_DR;
  if (id === 'tech_vpc_infra' || id === 'zero_trust' || id === 'aws_zerotrust_vpc_network') return TECH_XML_VPC_INFRA;
  if (id === 'tech_iot_telemetry' || id === 'hybrid_interconnect' || id === 'gcp_industrial_iot') return TECH_XML_IOT_TELEMETRY;
  if (id === 'tech_cicd_pipeline' || id === 'cicd_pipeline' || id === 'enterprise_devsecops_polyrepo') return TECH_XML_CICD_PIPELINE;
  
  return getExactUnifiedSystemViewReferenceXml();
}
