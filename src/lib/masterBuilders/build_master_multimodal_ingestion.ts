export function buildMultimodalIngestionXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="multimodal_ingestion_pipeline" name="Multi-Modal Ingestion &amp; Unstructured Vector RAG Pipeline (WBS 3.1.5)">
    <mxGraphModel dx="1200" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1150" pageHeight="920" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- 1. MAIN TITLE BANNER -->
        <mxCell id="main_title_banner" value="&lt;b style=&quot;font-size:14px;letter-spacing:0.2px;color:#0F172A;&quot;&gt;Enterprise Multi-Modal Ingestion &amp;amp; Unstructured Vector RAG Pipeline (WBS 3.1.5)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="14" width="1055" height="38" as="geometry"/>
        </mxCell>

        <!-- 2. ZONE 1: UNSTRUCTURED SOURCES & INGRESS (x = 30 .. 245) -->
        <mxCell id="lbl_zone1_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;1. UNSTRUCTURED SOURCES &amp;amp; INGRESS&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="60" width="210" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="box_zone1" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="215" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="card_pdf" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;📄&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;font-weight:bold;color:#0F172A;&quot;&gt;PDFs, Contracts &amp;amp;&lt;br&gt;Scanned Invoices&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="100" width="190" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_audio" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🎙️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;font-weight:bold;color:#0F172A;&quot;&gt;Contact Center Audio&lt;br&gt;&amp;amp; Call Recordings (.WAV)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="165" width="190" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_video" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🎬&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;font-weight:bold;color:#0F172A;&quot;&gt;Video Surveillance &amp;amp;&lt;br&gt;Webinar Recordings (.MP4)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="230" width="190" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_schematics" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🖼️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;font-weight:bold;color:#0F172A;&quot;&gt;Technical Diagrams &amp;amp;&lt;br&gt;Schematic Blueprints&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="295" width="190" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_gcs_raw" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;🛢️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Storage (GCS)&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#2563EB;&quot;&gt;Multi-Region Bronze Raw Lake&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;Object Versioning • CMEK Encryption&lt;br&gt;Eventarc Change Notifications&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="380" width="190" height="105" as="geometry"/>
        </mxCell>
        <mxCell id="card_eventarc_btn" value="&lt;span style=&quot;font-size:8px;font-weight:bold;color:#6B21A8;&quot;&gt;⚡ Eventarc Cloud Events&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="505" width="190" height="26" as="geometry"/>
        </mxCell>

        <!-- Edges Zone 1 -->
        <mxCell id="e_sources_gcs" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_schematics" target="card_gcs_raw"/>
        <mxCell id="e_gcs_eventarc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_gcs_raw" target="card_eventarc_btn"/>

        <!-- 3. ZONE 2: PARSING, OCR & CHUNKING ENGINES (x = 265 .. 525) -->
        <mxCell id="lbl_zone2_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;2. PARSING, OCR &amp;amp; CHUNKING ENGINES&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="270" y="60" width="250" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="box_zone2" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="265" y="85" width="260" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="card_docai" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;📄&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Document AI (Custom OCR)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Extracts layout hierarchy, tables, key-values, and form structures&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="277" y="100" width="236" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_chirp" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;🎙️&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Speech-to-Text v2 (Chirp)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Diarization, timestamps, phoneme alignment &amp;amp; multi-lingual transcription&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="277" y="170" width="236" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_vid_ai" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;🎬&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Video Intelligence API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Shot change detection, OCR on frames &amp;amp; visual entity label annotations&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="277" y="240" width="236" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_chunking" value="&lt;div style=&quot;margin-bottom:2px;&quot;&gt;&lt;span style=&quot;font-size:18px;&quot;&gt;🧩&lt;/span&gt;&lt;/div&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Cloud Run Semantic Chunking&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;Auto-Scaling Stateless Container&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;• Sliding Window Tokenization (512 tokens)&lt;br&gt;• 15% Overlap &amp;amp; Header Injection&lt;br&gt;• Cross-Modal Temporal Alignment&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="277" y="320" width="236" height="105" as="geometry"/>
        </mxCell>
        <mxCell id="card_dlp" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;🔒&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Cloud DLP (PII Masking)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Inspects &amp;amp; redacts SSN, HIPAA data, and API keys before vectorization&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#EAB308;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="277" y="445" width="236" height="55" as="geometry"/>
        </mxCell>

        <!-- Edges Zone 2 -->
        <mxCell id="e_docai_chunk" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_docai" target="card_chunking"/>
        <mxCell id="e_chirp_chunk" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_chirp" target="card_chunking"/>
        <mxCell id="e_vid_chunk" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_vid_ai" target="card_chunking"/>
        <mxCell id="e_chunk_dlp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_chunking" target="card_dlp"/>

        <!-- 4. ZONE 3: VECTORIZATION & INDEX STORE (x = 545 .. 805) -->
        <mxCell id="lbl_zone3_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;3. VECTORIZATION &amp;amp; INDEX STORE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="550" y="60" width="250" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="box_zone3" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="545" y="85" width="260" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="card_embeddings" value="&lt;div style=&quot;margin-bottom:2px;&quot;&gt;&lt;span style=&quot;font-size:18px;font-weight:900;background:linear-gradient(90deg,#4285F4,#9B72CB,#D96570);-webkit-background-clip:text;-webkit-text-fill-color:transparent;color:#4285F4;&quot;&gt;Vertex AI&lt;/span&gt;&lt;/div&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Multimodal Embeddings API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#2563EB;font-weight:bold;&quot;&gt;text-embedding-005 &amp;amp; multimodalembedding&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;1408-dimension joint semantic space for cross-modal text/image/audio search&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="557" y="100" width="236" height="95" as="geometry"/>
        </mxCell>
        <mxCell id="card_vector_search" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;🔍&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Vertex AI Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;ScaNN Tree-AH ANN Indexing&lt;br&gt;Sub-10ms P99 latency @ 100k QPS&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="557" y="215" width="236" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_alloydb" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;🗄️&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;AlloyDB Omni (pgvector)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Hybrid relational + HNSW vector index&lt;br&gt;ACID transactional state &amp;amp; filter engine&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="557" y="295" width="236" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_bq_meta" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:28px;font-size:20px;vertical-align:middle;text-align:center;&quot;&gt;📊&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;BigQuery Attribution Lake&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Source URLs, timestamps, page #s,&lt;br&gt;bounding boxes, and lineage audit logs&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="557" y="375" width="236" height="60" as="geometry"/>
        </mxCell>

        <!-- Edges Zone 3 -->
        <mxCell id="e_embed_vec" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_embeddings" target="card_vector_search"/>
        <mxCell id="e_embed_alloy" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_embeddings" target="card_alloydb"/>
        <mxCell id="e_embed_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_embeddings" target="card_bq_meta"/>

        <!-- 5. ZONE 4: AGENTIC REASONING & DELIVERY (x = 825 .. 1085) -->
        <mxCell id="lbl_zone4_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;4. AGENTIC REASONING &amp;amp; DELIVERY&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="60" width="250" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="box_zone4" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="825" y="85" width="260" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="card_gemini_reasoner" value="&lt;div style=&quot;margin-bottom:2px;&quot;&gt;&lt;span style=&quot;font-size:18px;font-weight:900;background:linear-gradient(90deg,#4285F4,#9B72CB,#D96570);-webkit-background-clip:text;-webkit-text-fill-color:transparent;color:#4285F4;&quot;&gt;Gemini 1.5 Pro&lt;/span&gt;&lt;/div&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Multimodal Agent Reasoner&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#7C3AED;font-weight:bold;&quot;&gt;2M Token Long-Context Window&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Context Ingestion • Grounded Synthesis&lt;br&gt;Source Attribution &amp;amp; Fact Verification&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="837" y="100" width="236" height="105" as="geometry"/>
        </mxCell>
        <mxCell id="card_model_armor" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:26px;font-size:18px;vertical-align:middle;text-align:center;&quot;&gt;🛡️&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Model Armor &amp;amp; Guardrails&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Jailbreak filtering, hallucination check&lt;br&gt;&amp;amp; confidence threshold gating&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="837" y="220" width="236" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_chat_copilot" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:26px;font-size:18px;vertical-align:middle;text-align:center;&quot;&gt;💬&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;GenAI Copilot &amp;amp; Chat UI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Interactive multimodal Q&amp;amp;A with inline PDF preview &amp;amp; audio playback&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="837" y="290" width="236" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_looker_intel" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:26px;font-size:18px;vertical-align:middle;text-align:center;&quot;&gt;📈&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Looker Enterprise Intelligence&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Topic trending, sentiment heatmaps &amp;amp; executive summaries&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="837" y="360" width="236" height="55" as="geometry"/>
        </mxCell>

        <!-- Cross-Zone Inter-Connector Edges with Label Pills -->
        <mxCell id="e_eventarc_docai" value="1. Parse" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontSize=8;fontStyle=1;" edge="1" parent="1" source="card_eventarc_btn" target="card_docai">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="255" y="518"/>
              <mxPoint x="255" y="130"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_dlp_embed" value="2. Embed" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontSize=8;fontStyle=1;" edge="1" parent="1" source="card_dlp" target="card_embeddings">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="535" y="472"/>
              <mxPoint x="535" y="147"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_vec_gemini" value="3. ScaNN Context" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontSize=8;fontStyle=1;" edge="1" parent="1" source="card_vector_search" target="card_gemini_reasoner">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="815" y="245"/>
              <mxPoint x="815" y="152"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_gemini_armor" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_gemini_reasoner" target="card_model_armor"/>
        <mxCell id="e_armor_chat" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_model_armor" target="card_chat_copilot"/>
        <mxCell id="e_chat_looker" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_chat_copilot" target="card_looker_intel"/>

        <!-- 6. BOTTOM TIMELINE & STAGE PROGRESSION -->
        <mxCell id="st_ingest_1" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;1. MULTIMODAL INGESTION&lt;br&gt;&amp;amp; GCS BRONZE LAKE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="760" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="arr_in1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="225" y="773" as="sourcePoint"/>
            <mxPoint x="255" y="773" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="st_ingest_2" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;2. DOCUMENT AI &amp;amp; CHIRP&lt;br&gt;SEMANTIC CHUNKING&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="265" y="760" width="250" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="arr_in2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="520" y="773" as="sourcePoint"/>
            <mxPoint x="550" y="773" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="st_ingest_3" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;3. VERTEX VECTOR SEARCH&lt;br&gt;&amp;amp; ALLOYDB PGVECTOR&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="555" y="760" width="240" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="arr_in3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="800" y="773" as="sourcePoint"/>
            <mxPoint x="830" y="773" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="st_ingest_4" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;4. GEMINI 1.5 PRO&lt;br&gt;GROUNDED SYNTHESIS&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="835" y="760" width="245" height="26" as="geometry"/>
        </mxCell>

        <!-- Bottom Governance Bar -->
        <mxCell id="bar_governance" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;End-to-End Governance:&lt;/b&gt; &lt;span style=&quot;font-size:8.5px;color:#334155;&quot;&gt;Dataplex unified cataloging, Cloud DLP automated PII redaction, CMEK encryption &amp;amp; full source chunk lineage attribution&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="800" width="1055" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}