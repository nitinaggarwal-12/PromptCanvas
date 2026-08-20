export function buildEnterpriseMlopsLifecycleXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="enterprise_mlops_lifecycle" name="Enterprise MLOps Lifecycle Architecture (NEW-AI-07)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Enterprise MLOps Lifecycle Architecture (NEW-AI-07 / #57)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Vertex AI Feature Store • Vertex AI Pipelines (Kubeflow) • Model Registry • Canary Serving &amp;amp; Continuous Drift Monitoring&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#7E22CE;&quot;&gt;Vertex AI MLOps&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;End-to-End Automated CI/CD/CT&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- STAGE 1: DATA & FEATURE ENGINEERING -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="260" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;1️⃣ DATA &amp;amp; FEATURE STORE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="260" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_raw_data_lake" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🗄️ BigQuery &amp;amp; Cloud Storage Lake&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Historical Event Logs &amp;amp; Tabular Datasets&lt;br&gt;• Dataplex Data Governance &amp;amp; Quality Gates&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="230" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_feature_store" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌟 Vertex AI Feature Store&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#334155;&quot;&gt;• Centralized Online &amp;amp; Offline Feature Serving&lt;br&gt;• Point-in-time Correctness (Zero Data Leakage)&lt;br&gt;• Low-latency Bigtable Online Cache (&amp;lt;10ms)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="230" width="230" height="85" as="geometry"/>
        </mxCell>

        <!-- STAGE 2: EXPERIMENTATION & TRAINING -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="320" y="85" width="320" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;2️⃣ TRAINING &amp;amp; EXPERIMENTATION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="320" y="85" width="320" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_notebooks" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;📓 Vertex AI Workbench Notebooks&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Interactive Data Exploration &amp;amp; Prototyping&lt;br&gt;• Enterprise IAM &amp;amp; VPC-SC Security Perimeter&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="335" y="135" width="290" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_training_pipeline" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;⚙️ Vertex AI Pipelines (Kubeflow / TFX)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Distributed GPU/TPU Training Jobs (v5e Slices)&lt;br&gt;• Automated Hyperparameter Tuning (Vizier)&lt;br&gt;• Artifact Lineage Tracking &amp;amp; Caching&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="335" y="230" width="290" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_experiments" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;📊 Vertex AI Experiments &amp;amp; TensorBoard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Compare Loss, Accuracy, ROC-AUC Curves&lt;br&gt;• Git Commit Hash &amp;amp; Dataset Snapshot Lineage&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="335" y="335" width="290" height="75" as="geometry"/>
        </mxCell>

        <!-- STAGE 3: MODEL REGISTRY & EVALUATION -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="670" y="85" width="300" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;3️⃣ REGISTRY &amp;amp; VALIDATION GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="670" y="85" width="300" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_model_registry" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🏛️ Vertex AI Model Registry&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Semantic Versioning (v1.0.0 -> v1.1.0)&lt;br&gt;• Model Cards (Explainability, Bias, Metadata)&lt;br&gt;• Artifact Signatures (Container URI + Weights)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="685" y="135" width="270" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_eval_gate" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🛡️ Model Evaluation &amp;amp; Explainability&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Automated Baseline Comparison (Challenger vs Champion)&lt;br&gt;• Explainable AI (Feature Attributions / SHAP)&lt;br&gt;• Human-in-the-Loop Signoff Workflow&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="685" y="240" width="270" height="85" as="geometry"/>
        </mxCell>

        <!-- STAGE 4: SERVING & INFERENCE -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="280" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;4️⃣ DEPLOYMENT &amp;amp; INFERENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="280" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_online_endpoints" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🚀 Vertex AI Online Prediction Endpoints&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Blue/Green &amp;amp; Canary Traffic Splitting (90/10)&lt;br&gt;• Autoscaling GPU/CPU Machine Pools&lt;br&gt;• Sub-50ms p99 Prediction Latency&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1015" y="135" width="250" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_batch_prediction" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;📦 Vertex AI Batch Prediction&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• High-Throughput BigQuery Bulk Scoring&lt;br&gt;• Cost-optimized Preemptible Instances&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1015" y="240" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- STAGE 5: MONITORING & RETRAINING LOOP -->
        <mxCell id="col5_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1310" y="85" width="260" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;5️⃣ CONTINUOUS RETRAINING (CT)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1310" y="85" width="260" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_model_monitoring" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;👁️ Vertex AI Model Monitoring&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Feature Skew &amp;amp; Concept Drift Detection&lt;br&gt;• Real-time Payload Logging to BigQuery&lt;br&gt;• Automated Alerting (Slack/PagerDuty)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1325" y="135" width="230" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_retraining_trigger" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🔁 Eventarc Automated Trigger&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Triggers automated Kubeflow pipeline re-training when drift threshold is breached&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1325" y="240" width="230" height="75" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_fs_to_training" value="1. Training Datasets" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_feature_store" target="card_training_pipeline"/>
        <mxCell id="edge_train_to_reg" value="2. Register Model" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_training_pipeline" target="card_model_registry"/>
        <mxCell id="edge_reg_to_serving" value="3. Canary Deploy" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_eval_gate" target="card_online_endpoints"/>
        <mxCell id="edge_serving_to_mon" value="4. Ingest Payloads" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#DC2626;fontColor=#991B1B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_online_endpoints" target="card_model_monitoring"/>
        <mxCell id="edge_retrain_loop" value="5. Auto-Retraining Loop Arc" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#EF4444;fontColor=#B91C1C;fontSize=9.5;fontStyle=1;dashed=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_retraining_trigger" target="card_training_pipeline"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
