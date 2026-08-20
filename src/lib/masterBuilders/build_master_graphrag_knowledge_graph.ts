/**
 * 🎨 Blueprint #58 (NEW-AI-08): GraphRAG & Enterprise Knowledge Graph Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Unstructured Document & Enterprise Corpus Intake (PDFs, Confluence, GDrive, Document AI OCR)
 * - Semantic Extraction & Graph Construction (Gemini 2.5 Pro Entity Extractor, text-embedding-005)
 * - Dual Storage & Indexing Engine (Cloud Spanner Graph ISO GQL, Vertex AI Vector Search ScaNN)
 * - Hybrid Query Planner & Re-Ranking Engine (Entity resolution, Subgraph pruning, Cross-Encoder)
 * - Grounded Synthesis & Citation Interface (Gemini 2.5 Pro Grounding, Interactive Citation Graph)
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICON = {
  gemini: svg('<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#7B61FF"/><stop offset="1" stop-color="#D965C5"/></linearGradient></defs><path fill="url(#g)" d="M24 4c2.2 10.2 9.6 17.6 20 20-10.4 2.4-17.8 9.8-20 20-2.2-10.2-9.6-17.6-20-20C14.4 21.6 21.8 14.2 24 4z"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
  graph: svg('<circle cx="16" cy="16" r="6" fill="#7E57C2"/><circle cx="32" cy="16" r="6" fill="#7E57C2"/><circle cx="24" cy="32" r="6" fill="#7E57C2"/><path d="M16 16l16 0M16 16l8 16M32 16l-8 16" stroke="#7E57C2" stroke-width="2.5"/>'),
  vector: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#0284C7"/><circle cx="18" cy="18" r="3" fill="#fff"/><circle cx="30" cy="18" r="3" fill="#fff"/><circle cx="24" cy="30" r="3" fill="#fff"/><path d="M18 18l12 0M18 18l6 12M30 18l-6 12" stroke="#fff" stroke-width="1.5"/>'),
  docai: svg('<rect x="10" y="6" width="28" height="36" rx="4" fill="#0284C7"/><path d="M16 16h16M16 24h16M16 32h10" stroke="#fff" stroke-width="2.5"/>'),
  embed: svg('<circle cx="24" cy="24" r="16" fill="#1D4ED8"/><path d="M16 24h16M24 16v16" stroke="#fff" stroke-width="2.5"/>'),
  copilot: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/><circle cx="34" cy="32" r="4" fill="#60A5FA"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#16A34A"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  search: svg('<circle cx="20" cy="20" r="11" fill="none" stroke="#1669C1" stroke-width="4"/><path d="m28 28 11 11" stroke="#1669C1" stroke-width="4" stroke-linecap="round"/>')
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;shadow=0;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=15;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:12px;color:#0F172A">${title}</b><br/><span style="font-size:10px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#0284C7', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#16A34A', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterGraphragKnowledgeGraphXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Corpus Intake & Chunking
    lane('intake', 1, 'CORPUS INTAKE & CHUNKING', 'Enterprise multi-modal documents, PDF reports, GDrive & Confluence', 20, 20, 260, 680, '#0284C7', '#F0F9FF'),
    card('in_docs', 'Enterprise Corpus Intake', 'PDFs, Word, Confluence, GDrive & regulatory filings', ICON.docai, 38, 85, 224, 85, '#0284C7'),
    card('in_docai', 'Document AI OCR', 'Layout parser & structural table extraction', ICON.docai, 38, 195, 224, 85, '#0284C7'),
    card('in_chunk', 'Semantic Chunking Engine', 'Hierarchical context-aware chunk boundaries', ICON.embed, 38, 305, 224, 85, '#0284C7'),

    // Lane 2: Semantic Extraction & Graph Construction
    lane('extract', 2, 'SEMANTIC EXTRACTION & GRAPH', 'Gemini 2.5 Pro Schema/Entity Extractor & text-embedding-005', 300, 20, 310, 680, '#7E57C2', '#FAF5FF'),
    card('ex_gemini', 'Gemini 2.5 Pro Extractor', 'Ontology mapping, entity resolution & relation mining', ICON.gemini, 318, 85, 274, 90, '#7E57C2'),
    card('ex_embed', 'text-embedding-005', '768-dim dense semantic vector embeddings', ICON.embed, 318, 205, 274, 90, '#1D4ED8'),
    card('ex_co_ref', 'Co-Reference Resolver', 'Disambiguate acronyms & resolve entity aliases', ICON.graph, 318, 325, 274, 90, '#7E57C2'),

    // Lane 3: Dual Storage & Indexing Engine
    lane('storage', 3, 'DUAL STORAGE & INDEXING ENGINE', 'Cloud Spanner Graph (ISO GQL) + Vertex Vector Search (ScaNN)', 630, 20, 320, 680, '#1D4ED8', '#EFF6FF'),
    card('st_spanner', 'Cloud Spanner Graph (ISO GQL)', 'Multi-hop property graph traversals & cyclic queries', ICON.spanner, 648, 85, 284, 95, '#1D4ED8'),
    card('st_vector', 'Vertex AI Vector Search', 'ScaNN millisecond ANN semantic similarity index', ICON.vector, 648, 210, 284, 95, '#0284C7'),
    card('st_hybrid_idx', 'Hybrid Graph-Vector Index', 'Synchronized entity IDs linking nodes to embeddings', ICON.graph, 648, 335, 284, 95, '#7E57C2'),

    // Lane 4: Hybrid Query Planner & Re-Ranking
    lane('planner', 4, 'HYBRID QUERY PLANNER & RERANK', 'Cross-Encoder contextual reranker & subgraph extraction', 970, 20, 300, 680, '#EA580C', '#FFFBEB'),
    card('pl_query', 'Query Entity Extractor', 'Parse user query intent & extract target graph nodes', ICON.search, 988, 85, 264, 90, '#EA580C'),
    card('pl_subgraph', 'Subgraph Extraction & Pruning', '2-hop neighborhood expansion with edge weighting', ICON.graph, 988, 205, 264, 90, '#7E57C2'),
    card('pl_rerank', 'Cross-Encoder Context Reranker', 'Joint lexical + vector + graph relevance scoring', ICON.shield, 988, 325, 264, 90, '#EA580C'),

    // Lane 5: Grounded Synthesis & Citations
    lane('synthesis', 5, 'GROUNDED SYNTHESIS & CITATIONS', 'Gemini 2.5 grounded reasoning with verifiable graph citations', 1290, 20, 270, 680, '#16A34A', '#F0FDF4'),
    card('syn_gemini', 'Gemini 2.5 Grounded Synthesis', 'Multi-hop reasoning with zero hallucination guarantee', ICON.gemini, 1308, 85, 234, 95, '#16A34A'),
    card('syn_citation', 'Interactive Citation Graph', 'Clickable evidence provenance back to source text', ICON.graph, 1308, 210, 234, 95, '#7E57C2'),
    card('syn_copilot', 'Enterprise Copilot UI', 'Chat interface with verifiable subgraph overlays', ICON.copilot, 1308, 335, 234, 95, '#1D4ED8'),

    // Governance & Security Band
    lane('gov', 0, 'GOVERNANCE, FACTUALITY EVALUATION & DATA RESIDENCY PLANE', 'Continuous hallucination scoring with RAG Triad & Cloud IAM', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('gov_eval', 'Factual Consistency Evaluator', 'Automated faithfulness & answer relevance grading', ICON.shield, 45, 785, 470, 95, '#16A34A'),
    card('gov_iam', 'Cloud IAM & Data Access Tags', 'Entity-level security filtering based on user permissions', ICON.shield, 545, 785, 470, 95, '#16A34A'),
    card('gov_audit', 'Cloud Logging & Trace Provenance', 'Complete audit log of every retrieved node and prompt', ICON.log, 1045, 785, 490, 95, '#16A34A'),

    // Edges
    edge('e_doc_ocr', 'in_docs', 'in_docai', 'Raw Content', 'request', 0.5, 1, 0.5, 0),
    edge('e_ocr_chunk', 'in_docai', 'in_chunk', 'Parsed Text', 'request', 0.5, 1, 0.5, 0),
    edge('e_chunk_gem', 'in_chunk', 'ex_gemini', 'Extract Entities', 'request'),
    edge('e_chunk_emb', 'in_chunk', 'ex_embed', 'Generate Vector', 'request', 1, 0.5, 0, 0.5),
    edge('e_gem_span', 'ex_gemini', 'st_spanner', 'Write Nodes & Edges', 'request'),
    edge('e_emb_vec', 'ex_embed', 'st_vector', 'Upsert Embeddings', 'request'),
    edge('e_user_pl', 'pl_query', 'st_spanner', 'ISO GQL Multi-Hop', 'request', 0, 0.25, 1, 0.25),
    edge('e_user_vec', 'pl_query', 'st_vector', 'Vector KNN Search', 'request', 0, 0.75, 1, 0.75),
    edge('e_span_sub', 'st_spanner', 'pl_subgraph', 'Neighborhood Nodes', 'response'),
    edge('e_sub_rerank', 'pl_subgraph', 'pl_rerank', 'Rerank Context', 'request', 0.5, 1, 0.5, 0),
    edge('e_rerank_syn', 'pl_rerank', 'syn_gemini', 'Grounded Context', 'request'),
    edge('e_syn_cite', 'syn_gemini', 'syn_citation', 'Link Citations', 'request', 0.5, 1, 0.5, 0),
    edge('e_cite_ui', 'syn_citation', 'syn_copilot', 'Display Response', 'request', 0.5, 1, 0.5, 0),
    edge('e_gov_gem', 'gov_eval', 'syn_gemini', 'Score Faithfulness', 'governance', 0.5, 0, 0.5, 1, [[280, 710], [1425, 710]]),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_graphrag_knowledge_graph" name="GraphRAG &amp; Enterprise Knowledge Graph Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_GRAPHRAG_KNOWLEDGE_GRAPH_XML = buildMasterGraphragKnowledgeGraphXml();
