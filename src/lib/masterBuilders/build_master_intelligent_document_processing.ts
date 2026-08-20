export function buildIntelligentDocumentProcessingXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="intelligent_doc_processing" name="Intelligent Document Processing (IDP) Platform (NEW-AI-10)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Intelligent Document Processing (IDP) &amp;amp; Extraction Platform (NEW-AI-10 / #60)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Document AI (Custom Extractor) • Gemini 2.5 Flash Multimodal OCR • Confidence-Gated Human-in-the-Loop (HITL) • BigQuery &amp;amp; Search Indexing&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#16A34A;&quot;&gt;Document AI + HITL&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Confidence Gated Extraction&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: MULTI-CHANNEL INGESTION -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="230" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📥 MULTI-CHANNEL INTAKE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="230" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_intake_email" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;✉️ Email &amp;amp; Fax Attachments&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated PDF/TIFF parsing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="200" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_intake_portal" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🌐 Customer Web &amp;amp; Mobile Upload&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Camera capture &amp;amp; scanned claims&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="220" width="200" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_intake_api" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;⚡ Batch SFTP &amp;amp; REST API Ingest&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;High-volume enterprise bulk intake&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="305" width="200" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: OCR & CLASSIFICATION -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="290" y="85" width="290" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚙️ CLASSIFICATION &amp;amp; OCR&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="290" y="85" width="290" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_docai_classifier" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;📄 Document AI Custom Classifier&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Identifies document type: Invoice, W2, Medical Claim, KYC ID&lt;br&gt;• Splits multi-page bundled PDF packages&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="305" y="135" width="260" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_docai_extractor" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🔍 Specialized Extractor &amp;amp; OCR&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Key-Value pair extraction (Tax ID, Total Amount, Due Date)&lt;br&gt;• Nested Table extraction (Line items, quantities, prices)&lt;br&gt;• Handwritten signature detection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="305" y="235" width="260" height="85" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: GEMINI REASONING & VALIDATION -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="610" y="85" width="350" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🧠 GEMINI VALIDATION &amp;amp; CONFIDENCE GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="610" y="85" width="350" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gemini_crossval" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🧠 Gemini 2.5 Flash Cross-Validation Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Mathematical checksum validation (Sum of items = Total)&lt;br&gt;• Business rule validation against CRM / ERP records&lt;br&gt;• Confidence scoring per extracted field (0.00 to 1.00)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="625" y="135" width="320" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_confidence_gate" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;⚖️ Confidence Threshold Gate (&amp;gt; 95%)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• High Confidence (&amp;gt; 95%): Straight-Through Processing (STP)&lt;br&gt;• Low Confidence / Exception: Routes to HITL Review Queue&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="625" y="240" width="320" height="80" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: HUMAN-IN-THE-LOOP (HITL) EXCEPTION REVIEW -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="990" y="85" width="260" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;👥 HUMAN-IN-THE-LOOP (HITL)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="990" y="85" width="260" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_hitl_ui" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🖥️ Document AI Review Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Side-by-side visual bounding box correction&lt;br&gt;• Specialist approval &amp;amp; exception override&lt;br&gt;• Active Learning human feedback loop&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1005" y="135" width="230" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_active_learning" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🔁 Model Continuous Fine-Tuning&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Corrections automatically update custom extractor dataset for next training cycle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1005" y="240" width="230" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 5: DOWNSTREAM CONSUMPTION & LAKEHOUSE -->
        <mxCell id="col5_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1280" y="85" width="290" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🏛️ ENTERPRISE CONSUMPTION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1280" y="85" width="290" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_bigquery_export" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🏛️ BigQuery Normalized Tables&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Clean schema mapped to enterprise data warehouse&lt;br&gt;• Looker dashboards for operational KPI reporting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1295" y="135" width="260" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_erp_integration" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;⚡ ERP / Core System Auto-Post&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• SAP / Salesforce automated invoice payment execution&lt;br&gt;• Pub/Sub event notification to downstream microservices&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1295" y="230" width="260" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_vector_rag_search" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🔍 Vertex AI Search &amp;amp; RAG Index&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Full-text semantic search &amp;amp; conversational Q&amp;A over all processed documents&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1295" y="335" width="260" height="75" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_intake_to_ocr" value="1. Stream Ingest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_intake_email" target="card_docai_classifier"/>
        <mxCell id="edge_ocr_to_gemini" value="2. Extracted Entities" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_docai_extractor" target="card_gemini_crossval"/>
        <mxCell id="edge_gate_to_hitl" value="3a. Low Confidence / Review" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#DC2626;fontColor=#991B1B;fontSize=9.5;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_confidence_gate" target="card_hitl_ui"/>
        <mxCell id="edge_gate_to_erp" value="3b. Straight-Through (>95%)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_confidence_gate" target="card_erp_integration"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
