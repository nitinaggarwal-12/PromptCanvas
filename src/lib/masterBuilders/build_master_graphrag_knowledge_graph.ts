/**
 * 🎨 Blueprint #58 (NEW-AI-08): GraphRAG & Enterprise Knowledge Graph Architecture
 * Executive Light Theme Master Blueprint
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
  graph: svg('<circle cx="16" cy="16" r="6" fill="#7C3AED"/><circle cx="32" cy="16" r="6" fill="#7C3AED"/><circle cx="24" cy="32" r="6" fill="#7C3AED"/><path d="M16 16l16 0M16 16l8 16M32 16l-8 16" stroke="#7C3AED" stroke-width="2.5"/>'),
  vector: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#2563EB"/><circle cx="18" cy="18" r="3" fill="#fff"/><circle cx="30" cy="18" r="3" fill="#fff"/><circle cx="24" cy="30" r="3" fill="#fff"/><path d="M18 18l12 0M18 18l6 12M30 18l-6 12" stroke="#fff" stroke-width="1.5"/>'),
  docai: svg('<rect x="10" y="6" width="28" height="36" rx="4" fill="#0284C7"/><path d="M16 16h16M16 24h16M16 32h10" stroke="#fff" stroke-width="2.5"/>'),
  embed: svg('<circle cx="24" cy="24" r="16" fill="#1D4ED8"/><path d="M16 24h16M24 16v16" stroke="#fff" stroke-width="2.5"/>'),
  copilot: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/><circle cx="34" cy="32" r="4" fill="#60A5FA"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#059669"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  search: svg('<circle cx="20" cy="20" r="11" fill="none" stroke="#2563EB" stroke-width="4"/><path d="m28 28 11 11" stroke="#2563EB" stroke-width="4" stroke-linecap="round"/>')
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=14;fontStyle=1;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:11.5px;color:#0F172A">${title}</b><br/><span style="font-size:9.5px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.3;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#2563EB', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#059669', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterGraphragKnowledgeGraphXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Unstructured Document & Enterprise Corpus Intake
    lane('intake', 1, 'UNSTRUCTURED DOCUMENT & CORPUS INTAKE', 'Multi-source document parsing, layout extraction & chunking', 20, 20, 1540, 140, '#1E3A8A', '#FFFFFF'),
    card('in_docai', 'Document AI Layout Parser', 'Hierarchical table, header & section OCR extraction', ICON.docai, 45, 75, 450, 70, '#0284C7'),
    card('in_gdrive', 'Enterprise Connectors (GDrive/SharePoint)', 'Continuous webhook sync for updated enterprise SOPs', ICON.copilot, 525, 75, 520, 70, '#2563EB'),
    card('in_chunk', 'Semantic Markdown Chunking', 'Header-preserving sliding window chunker (512 tokens)', ICON.docai, 1075, 75, 460, 70, '#0284C7'),

    // Lane 2: Semantic Extraction & Graph Construction Tier
    lane('extract', 2, 'SEMANTIC EXTRACTION & KNOWLEDGE GRAPH BUILDER', 'LLM-driven entity/relationship extraction & embedding generation', 20, 180, 1540, 150, '#4C1D95', '#FFFFFF'),
    card('ext_gemini', 'Vertex AI Gemini 2.5 (Entity Extractor)', 'Zero-shot entity (Subject-Predicate-Object) triple extraction', ICON.gemini, 45, 235, 450, 75, '#7C3AED'),
    card('ext_embed', 'Vertex AI Text Embeddings (768-dim)', 'Dense semantic vector embeddings for chunk & entity nodes', ICON.embed, 525, 235, 450, 75, '#2563EB'),
    card('ext_schema', 'Ontology & Graph Schema Validator', 'Enforces strict enterprise ontology & domain taxonomy', ICON.shield, 1005, 235, 530, 75, '#059669'),

    // Lane 3: Dual Storage & Indexing Engine (Graph + Vector)
    lane('storage', 3, 'DUAL STORAGE & INDEXING ENGINE (GRAPH + VECTOR)', 'Synchronous hybrid index across property graphs and vector spaces', 20, 350, 1540, 150, '#1D4ED8', '#FFFFFF'),
    card('sto_spanner', 'Cloud Spanner Graph (ISO GQL)', 'ACID property graph with Cypher/GQL multi-hop graph traversal', ICON.spanner, 45, 405, 450, 75, '#1D4ED8'),
    card('sto_vector', 'Vertex AI Vector Search (ScaNN)', 'Sub-millisecond approximate nearest neighbor vector indexing', ICON.vector, 525, 405, 450, 75, '#2563EB'),
    card('sto_sync', 'Dual Index Sync Pipeline', 'Maintains 1:1 parity between graph node IDs & vector embeddings', ICON.graph, 1005, 405, 530, 75, '#7C3AED'),

    // Lane 4: Hybrid Query Planner & Re-Ranking Engine
    lane('retrieval', 4, 'HYBRID QUERY PLANNER & GRAPH RERANKING ENGINE', 'Multi-hop graph traversal combined with vector similarity search', 20, 520, 1540, 150, '#047857', '#FFFFFF'),
    card('ret_planner', 'Hybrid Retrieval Planner', 'Decomposes query into 2-hop graph query + semantic vector search', ICON.gemini, 45, 575, 450, 75, '#7C3AED'),
    card('ret_subgraph', 'Dynamic Subgraph Pruning', 'Extracts connected entity subgraphs with community summary context', ICON.graph, 525, 575, 450, 75, '#7C3AED'),
    card('ret_rerank', 'Vertex AI Cross-Encoder Reranker', 'Cross-scores combined vector chunks & graph entities for precision', ICON.search, 1005, 575, 530, 75, '#2563EB'),

    // Lane 5: Grounded Synthesis & Interactive Citation Interface
    lane('synthesis', 5, 'GROUNDED REASONING & INTERACTIVE CITATIONS', 'Hallucination-free generative responses with clickable entity provenance', 20, 690, 1540, 140, '#D97706', '#FFFFFF'),
    card('syn_gemini', 'Vertex AI Gemini 2.5 Pro Reasoner', 'Synthesizes answer grounded strictly in verified subgraph facts', ICON.gemini, 45, 745, 460, 70, '#7C3AED'),
    card('syn_guard', 'Model Armor & Grounding Gate', 'Validates citation grounding & masks sensitive PII entities', ICON.shield, 545, 745, 450, 70, '#059669'),
    card('syn_ui', 'Enterprise Knowledge Assistant UI', 'Streaming response with interactive knowledge graph visualizer', ICON.copilot, 1035, 745, 500, 70, '#2563EB'),

    // Edges
    edge('e_doc_chunk', 'in_docai', 'in_chunk', 'Structured Text', 'request'),
    edge('e_chunk_gem', 'in_chunk', 'ext_gemini', 'Extract Triples', 'request'),
    edge('e_chunk_emb', 'in_chunk', 'ext_embed', 'Generate Vectors', 'request'),
    edge('e_gem_span', 'ext_gemini', 'sto_spanner', 'Write Nodes & Edges', 'request'),
    edge('e_emb_vec', 'ext_embed', 'sto_vector', 'Write ScaNN Index', 'request'),
    edge('e_plan_span', 'ret_planner', 'sto_spanner', 'GQL 2-Hop Query', 'request'),
    edge('e_plan_vec', 'ret_planner', 'sto_vector', 'KNN Vector Search', 'request'),
    edge('e_span_sub', 'sto_spanner', 'ret_subgraph', 'Return Subgraph', 'response'),
    edge('e_vec_sub', 'sto_vector', 'ret_subgraph', 'Return Chunks', 'response'),
    edge('e_sub_rerank', 'ret_subgraph', 'ret_rerank', 'Candidate Pool', 'request'),
    edge('e_rerank_syn', 'ret_rerank', 'syn_gemini', 'Top-K Facts', 'request'),
    edge('e_syn_guard', 'syn_gemini', 'syn_guard', 'Inspect Grounding', 'governance'),
    edge('e_guard_ui', 'syn_guard', 'syn_ui', 'Stream Response', 'response'),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 58" version="24.7.17" type="device">
  <diagram id="catalog_graphrag_knowledge_graph" name="GraphRAG &amp; Enterprise Knowledge Graph Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_GRAPHRAG_KNOWLEDGE_GRAPH_XML = buildMasterGraphragKnowledgeGraphXml();
