const GCP_LOGO = 'https://www.gstatic.com/cgc/renaissance/image/MultiPath_Bottom_2X_Centered_static.png';

function brandedLabel(name: string, detail: string, extra = ''): string {
  return `&lt;div style=&quot;text-align:center;line-height:1.25;&quot;&gt;&lt;img src=&quot;${GCP_LOGO}&quot; width=&quot;24&quot; height=&quot;18&quot; style=&quot;vertical-align:middle;margin-right:7px;&quot;/&gt;&lt;b&gt;${name}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#52657A;&quot;&gt;${detail}${extra ? `&lt;br&gt;${extra}` : ''}&lt;/span&gt;&lt;/div&gt;`;
}

function card(id: string, value: string, x: number, y: number, w: number, h: number, stroke: string, font = '#24415F'): string {
  return `<mxCell id="${id}" value="${value}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${stroke};strokeWidth=1.4;fontColor=${font};fontSize=13;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}

function edge(id: string, source: string, target: string, value = '', color = '#2563EB', dashed = false, extra = ''): string {
  return `<mxCell id="${id}" value="${value}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=${color};${dashed ? 'dashed=1;' : ''}fontSize=12;fontStyle=1;labelBackgroundColor=#FFFFFF;${extra}" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
}

export function buildServerlessEdaXml(): string {
  return `<mxfile host="embed.diagrams.net" modified="2026-08-19T17:40:00.000Z" agent="PromptCanvas" version="24.7.17">
  <diagram id="serverless_eda_architecture" name="Blueprint 26 - GCP Serverless EDA Architecture">
    <mxGraphModel dx="1780" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="900" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <mxCell id="bp26" value="26" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B3B75;strokeColor=#0B3B75;fontColor=#FFFFFF;fontSize=30;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="20" y="18" width="64" height="64" as="geometry"/></mxCell>
        <mxCell id="title" value="&lt;b&gt;GCP SERVERLESS EDA ARCHITECTURE&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:17px;color:#2563EB;font-weight:600;&quot;&gt;Real-time Event-Driven Architecture on Google Cloud with Gemini AI&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;fontSize=27;fontColor=#0F2747;" vertex="1" parent="1"><mxGeometry x="100" y="12" width="720" height="76" as="geometry"/></mxCell>
        <mxCell id="traits" value="☁ &lt;b&gt;Serverless&lt;/b&gt;     ⚡ &lt;b&gt;Real-time&lt;/b&gt;     ✦ &lt;b&gt;Gemini AI-powered&lt;/b&gt;     🛡 &lt;b&gt;Secure&lt;/b&gt;     $ &lt;b&gt;Cost-optimized&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9FB6D2;strokeWidth=1.4;fontColor=#22354C;fontSize=14;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="845" y="22" width="900" height="54" as="geometry"/></mxCell>

        <mxCell id="sources_bg" value="EVENT SOURCES" style="swimlane;html=1;rounded=1;startSize=38;horizontal=1;fillColor=#F7FAFE;swimlaneFillColor=#F7FAFE;strokeColor=#B9CBE0;fontColor=#17365D;fontStyle=1;fontSize=14;align=center;" vertex="1" parent="1"><mxGeometry x="20" y="105" width="190" height="520" as="geometry"/></mxCell>
        <mxCell id="ingest_bg" value="①  INGESTION" style="swimlane;html=1;rounded=1;startSize=38;horizontal=1;swimlaneFillColor=#EAF1FF;strokeColor=#6E9EE2;fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;fillColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="225" y="105" width="230" height="520" as="geometry"/></mxCell>
        <mxCell id="process_bg" value="②  PROCESSING (SERVERLESS)" style="swimlane;html=1;rounded=1;startSize=38;horizontal=1;swimlaneFillColor=#EDF3FF;strokeColor=#6E9EE2;fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;fillColor=#4F86E8;" vertex="1" parent="1"><mxGeometry x="470" y="105" width="325" height="520" as="geometry"/></mxCell>
        <mxCell id="data_bg" value="③  DATA STORES" style="swimlane;html=1;rounded=1;startSize=38;horizontal=1;swimlaneFillColor=#F4FBF5;strokeColor=#7DAE83;fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;fillColor=#6EAE73;" vertex="1" parent="1"><mxGeometry x="810" y="105" width="250" height="520" as="geometry"/></mxCell>
        <mxCell id="ai_bg" value="④  GEMINI AI / ANALYTICS" style="swimlane;html=1;rounded=1;startSize=38;horizontal=1;swimlaneFillColor=#FBF7FF;strokeColor=#9B78CC;fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;fillColor=#8054BD;" vertex="1" parent="1"><mxGeometry x="1075" y="105" width="295" height="520" as="geometry"/></mxCell>
        <mxCell id="action_bg" value="⑤  ACTIONS &amp; NOTIFICATIONS" style="swimlane;html=1;rounded=1;startSize=38;horizontal=1;swimlaneFillColor=#FFF9F2;strokeColor=#E19C3F;fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;fillColor=#F59E0B;" vertex="1" parent="1"><mxGeometry x="1385" y="105" width="360" height="520" as="geometry"/></mxCell>

        ${card('src_apps', '&lt;b&gt;Applications&lt;/b&gt;&lt;br&gt;Web • Mobile • SaaS', 38, 165, 154, 76, '#B8C8DA', '#26384E')}
        ${card('src_iot', '&lt;b&gt;IoT &amp; Devices&lt;/b&gt;&lt;br&gt;Sensors • Edge gateways', 38, 262, 154, 76, '#B8C8DA', '#26384E')}
        ${card('src_ent', '&lt;b&gt;Enterprise Systems&lt;/b&gt;&lt;br&gt;CRM / ERP • Databases', 38, 359, 154, 76, '#B8C8DA', '#26384E')}
        ${card('src_ext', '&lt;b&gt;External / 3rd Party&lt;/b&gt;&lt;br&gt;APIs • Partners • Feeds', 38, 456, 154, 76, '#B8C8DA', '#26384E')}

        ${card('eventarc', brandedLabel('Eventarc', 'Event routing'), 248, 155, 184, 78, '#8AB0E8', '#1E5DA8')}
        ${card('pubsub', brandedLabel('Cloud Pub/Sub', 'Event bus'), 248, 292, 184, 82, '#5D95E5', '#1E5DA8')}
        ${card('dlq', '&lt;b&gt;Dead Letter Topic&lt;/b&gt;&lt;br&gt;Pub/Sub DLQ • poison-pill isolation', 248, 456, 184, 78, '#E7A5A5', '#9B2C2C')}

        <mxCell id="proc_group" value="Serverless Processing Services" style="swimlane;html=1;rounded=1;startSize=30;horizontal=1;fillColor=#F9FBFE;swimlaneFillColor=#F9FBFE;strokeColor=#B8C8DA;fontColor=#26384E;fontStyle=1;fontSize=13;align=center;" vertex="1" parent="1"><mxGeometry x="492" y="150" width="280" height="308" as="geometry"/></mxCell>
        ${card('run_ingest', brandedLabel('Cloud Run', 'Ingestion Service', 'Stateless • autoscaling'), 508, 187, 238, 72, '#8AB0E8', '#1E5DA8')}
        ${card('run_business', brandedLabel('Cloud Run', 'Business Processing Service'), 508, 275, 238, 72, '#8AB0E8', '#1E5DA8')}
        ${card('run_enrich', brandedLabel('Cloud Run', 'Enrichment Service'), 508, 363, 238, 72, '#8AB0E8', '#1E5DA8')}
        ${card('tasks_retry', brandedLabel('Cloud Tasks', 'Background jobs • retries'), 508, 478, 238, 76, '#9CB5D4', '#355A86')}

        ${card('bigtable', brandedLabel('Cloud Bigtable', 'Low-latency NoSQL'), 832, 170, 206, 80, '#8FBF94', '#2C6D34')}
        ${card('gcs', brandedLabel('Cloud Storage', 'Raw / archive'), 832, 290, 206, 80, '#8FBF94', '#2C6D34')}
        ${card('bigquery', brandedLabel('BigQuery', 'Analytics warehouse'), 832, 439, 206, 80, '#8FBF94', '#2C6D34')}

        <mxCell id="gemini" value="&lt;div style=&quot;text-align:left;line-height:1.3;&quot;&gt;&lt;img src=&quot;${GCP_LOGO}&quot; width=&quot;28&quot; height=&quot;21&quot; style=&quot;vertical-align:middle;margin-right:8px;&quot;/&gt;✦ &lt;b style=&quot;font-size:18px;&quot;&gt;Gemini&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:13px;color:#5E3A8E;&quot;&gt;Predictive insights • anomaly detection&lt;br&gt;Natural-language Q&amp;A • summarization&lt;br&gt;Grounded decision intelligence&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9D78D1;strokeWidth=2.2;fontColor=#6339A1;fontSize=15;align=left;verticalAlign=middle;spacingLeft=14;" vertex="1" parent="1"><mxGeometry x="1100" y="158" width="245" height="165" as="geometry"/></mxCell>
        ${card('vertexai', brandedLabel('Vertex AI', 'Models • pipelines • feature services'), 1100, 352, 245, 78, '#B79BDC', '#6339A1')}
        ${card('looker', brandedLabel('Looker', 'BI &amp; operational dashboards'), 1100, 463, 245, 78, '#B79BDC', '#6339A1')}

        ${card('action_tasks', brandedLabel('Cloud Tasks', 'Workflow trigger'), 1410, 164, 310, 72, '#E3B46E', '#9A5A00')}
        ${card('action_fn', brandedLabel('Cloud Run functions', 'Event-driven actions'), 1410, 258, 310, 72, '#E3B46E', '#9A5A00')}
        ${card('action_api', brandedLabel('Cloud Run', 'Webhooks / APIs'), 1410, 352, 310, 72, '#E3B46E', '#9A5A00')}
        ${card('alerts', brandedLabel('Notifications & Alerts', 'Cloud Monitoring • Email / SMS / Slack', 'PagerDuty / Opsgenie'), 1410, 465, 310, 92, '#E6C794', '#82541B')}

        ${edge('e_src_eventarc', 'src_apps', 'eventarc', '1', '#1F2937')}
        ${edge('e_event_pub', 'eventarc', 'pubsub', '2', '#1F2937', false, 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;')}
        ${edge('e_pub_run', 'pubsub', 'run_business', '3')}
        ${edge('e_pub_dlq', 'pubsub', 'dlq', '2a', '#DC2626', true, 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;')}
        ${edge('e_run_bt', 'run_business', 'bigtable', '4')}
        ${edge('e_run_gcs', 'run_enrich', 'gcs')}
        ${edge('e_run_bq', 'run_enrich', 'bigquery')}
        ${edge('e_bt_gemini', 'bigtable', 'gemini', '5', '#7C3AED')}
        ${edge('e_bq_gemini', 'bigquery', 'gemini', '', '#7C3AED')}
        ${edge('e_gemini_action', 'gemini', 'action_tasks', '7', '#7C3AED')}
        ${edge('e_tasks_fn', 'action_tasks', 'action_fn', '', '#D97706', false, 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;')}
        ${edge('e_fn_api', 'action_fn', 'action_api', '', '#D97706', false, 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;')}
        ${edge('e_api_alerts', 'action_api', 'alerts', '', '#D97706', false, 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;')}
        ${edge('e_retry', 'tasks_retry', 'run_enrich', '6 retry / async', '#6366F1', true)}
        ${edge('e_iot', 'src_iot', 'eventarc', '', '#64748B')}
        ${edge('e_ent', 'src_ent', 'pubsub', '', '#64748B')}
        ${edge('e_ext', 'src_ext', 'pubsub', '', '#64748B')}

        <mxCell id="flow_band" value="&lt;b&gt;DATA FLOW (END-TO-END)&lt;/b&gt;&lt;br&gt;① Sources routed by Eventarc  →  ② events published to Pub/Sub  →  ③ Cloud Run services process  →  ④ persist to Bigtable / Storage / BigQuery  →  ⑤ Gemini + Vertex AI analyze  →  ⑥ long-running work via Cloud Tasks  →  ⑦ actions executed &amp; notifications sent" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C8DA;fontColor=#24364B;fontSize=12;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="185" y="648" width="1420" height="54" as="geometry"/></mxCell>
        ${card('security', '&lt;b&gt;Security &amp; Identity&lt;/b&gt;&lt;br&gt;Cloud IAM • Workload Identity&lt;br&gt;VPC-SC • CMEK', 185, 720, 250, 76, '#B8C8DA', '#26384E')}
        ${card('reliability', '&lt;b&gt;Reliability &amp; Resilience&lt;/b&gt;&lt;br&gt;Multi-zone • autoscaling&lt;br&gt;DLQ • retries', 447, 720, 250, 76, '#B8C8DA', '#26384E')}
        ${card('observability', '&lt;b&gt;Observability&lt;/b&gt;&lt;br&gt;Cloud Monitoring • Logging&lt;br&gt;Trace • Error Reporting', 709, 720, 250, 76, '#B8C8DA', '#26384E')}
        ${card('governance', '&lt;b&gt;Event Governance&lt;/b&gt;&lt;br&gt;Avro / Protobuf schemas&lt;br&gt;Catalog • quality rules', 971, 720, 250, 76, '#B8C8DA', '#26384E')}
        ${card('cost', '&lt;b&gt;Cost Optimization&lt;/b&gt;&lt;br&gt;Pay-per-use • scale-to-zero&lt;br&gt;rightsizing • budgets', 1233, 720, 250, 76, '#B8C8DA', '#26384E')}
        ${card('legend', '&lt;b&gt;LEGEND&lt;/b&gt;&lt;br&gt;━━ Data flow&lt;br&gt;┄┄ Retry / DLQ flow', 1495, 720, 110, 76, '#B8C8DA', '#26384E')}
        <mxCell id="foundation" value="&lt;b&gt;FOUNDATION (GOOGLE CLOUD)&lt;/b&gt;&lt;br&gt;Google Cloud  |  VPC  |  Cloud DNS  |  Cloud Armor  |  Cloud KMS  |  Cloud Audit Logs  |  Organization Policy  |  Cloud Billing" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#AFC3DB;fontColor=#26384E;fontSize=12;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="185" y="814" width="1420" height="52" as="geometry"/></mxCell>
        ${card('benefits', '&lt;b&gt;KEY BENEFITS&lt;/b&gt;&lt;br&gt;✓ Real-time event processing at scale&lt;br&gt;✓ Fully serverless &amp; fault-tolerant&lt;br&gt;✓ Gemini-powered intelligent actions', 1618, 648, 127, 218, '#B8C8DA', '#26384E')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
