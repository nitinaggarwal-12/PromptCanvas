export function buildGraphragKnowledgeGraphXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="graphrag_knowledge_graph" name="GraphRAG / Knowledge Graph Architecture (NEW-AI-08)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;GraphRAG &amp;amp; Enterprise Knowledge Graph Architecture (NEW-AI-08 / #58)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Gemini 2.5 Entity/Relation Extractor • Spanner Graph / Neo4j • Vertex AI Vector Search • Hybrid Graph+Vector RAG Reasoning&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#7E22CE;&quot;&gt;GraphRAG Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Hybrid Graph + Vector Search&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: MULTI-SOURCE INGESTION & DOCUMENT EXTRACTION -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="250" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📄 SOURCES &amp;amp; INGESTION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="250" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_unstructured_docs" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;📚 Unstructured Knowledge Corpus&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• PDFs, Financial Statements &amp;amp; Medical Records&lt;br&gt;• Cloud Storage Object Buckets (CMEK)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="220" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_doc_ai_extract" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;⚙️ Document AI &amp;amp; Chunking Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#334155;&quot;&gt;• Layout-aware Semantic Hierarchy Parser&lt;br&gt;• Overlapping Sliding Window Chunking&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="230" width="220" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: ENTITY EXTRACTION & GRAPH BUILDER -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="330" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🤖 ENTITY &amp;amp; RELATIONSHIP EXTRACTOR&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="330" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gemini_ner" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🧠 Gemini 2.5 Pro Schema Extractor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Extracts Named Entities (Organizations, Products, People)&lt;br&gt;• Resolves Semantic Relationships (OWNS, PARTNER_OF, MANUFACTURED_BY)&lt;br&gt;• Co-reference resolution &amp;amp; Entity Disambiguation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="135" width="300" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_embedding_model" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🔢 Vertex AI text-embedding-005&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Generates 768-dim dense embeddings for chunks&lt;br&gt;• Generates node &amp;amp; edge property embeddings&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="240" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: DUAL GRAPH & VECTOR STORAGE -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="670" y="85" width="370" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🗄️ DUAL KNOWLEDGE GRAPH &amp;amp; VECTOR STORE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="670" y="85" width="370" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_spanner_graph" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🕸️ Cloud Spanner Graph / Neo4j Enterprise&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• ISO GQL Standard Graph Query Engine&lt;br&gt;• Multi-hop traversal (k-hop neighbors, community clusters)&lt;br&gt;• Graph algorithms (PageRank, Louvain Community Detection)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="685" y="135" width="340" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_vector_search" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;⚡ Vertex AI Vector Search (ScaNN Index)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Billion-scale approximate nearest neighbor (ANN)&lt;br&gt;• Hybrid sparse-dense lexical + semantic filtering&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="685" y="240" width="340" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: HYBRID QUERY PLANNER & REASONING -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="500" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🧠 HYBRID GRAPHRAG REASONING &amp;amp; PROVENANCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="500" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_query_planner" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🔀 Hybrid Graph+Vector Query Planner Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Deconstructs complex multi-hop enterprise inquiries into sub-queries&lt;br&gt;• Executes parallel Vector ANN search + GQL graph path discovery&lt;br&gt;• Re-ranks combined context using Cross-Encoder / Gemini Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1090" y="135" width="460" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_grounded_synthesis" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;✨ Gemini 2.5 Grounded Synthesis Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Generates comprehensive strategic response with verifiable citations&lt;br&gt;• Returns Interactive Knowledge Graph Subgraph visualization payload&lt;br&gt;• Zero Hallucination Guardrail verification via Vertex Model Armor&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1090" y="240" width="460" height="85" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_doc_to_ner" value="1. Chunk Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_doc_ai_extract" target="card_gemini_ner"/>
        <mxCell id="edge_ner_to_graph" value="2. Ingest Nodes &amp; Edges" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_gemini_ner" target="card_spanner_graph"/>
        <mxCell id="edge_emb_to_vec" value="3. Vector Upsert" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_embedding_model" target="card_vector_search"/>
        <mxCell id="edge_planner_to_synthesis" value="4. Grounded Subgraph" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_query_planner" target="card_grounded_synthesis"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
