/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 24: RAG / Knowledge Flow Architecture
 * Matches 100% of images/24.png:
 * - Knowledge Sources (Internal + External)
 * - 7-stage RAG Pipeline (Ingest, Preprocess, Embed, Retrieve, Augment, Generate, Feedback)
 * - 6 Knowledge Stores & Indexes (Raw, Processed, Vector DB, Search Index, Graph DB, Relational DB)
 * - Cross-Cutting Capabilities bar (7 controls)
 * - 6 RAG Patterns (Naive, Advanced, Multi-Query, Sub-Question, Graph, Agentic) + RAG Response Example
 * - Right Sidebar: RAG Principles, Retrieval Strategies, Guardrails, Key Risks
 * - Tools & Technologies (12 Google Cloud tools)
 * - Bottom Row: Metrics, High-Level Flow (8 connected nodes), Observability, Compliance, Notes
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate24RagKnowledgeFlowXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "24", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>RAG / Knowledge Flow Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Regulatory Q&amp;A with Internal &amp; External Knowledge</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Provide accurate, traceable, and context-aware answers by combining LLMs with enterprise and external knowledge using Retrieval-Augmented Generation (RAG).
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. LEFT COLUMN: 1. KNOWLEDGE SOURCES (x=16..170, y=78..504, w=154) ====================
  cell("box_sources", "", 16, 78, 154, 426, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_sources", "1. KNOWLEDGE SOURCES", 16, 80, 154, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Internal Sources Box
  cell("box_src_int", "", 22, 102, 142, 186, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  cell("lbl_src_int", "Internal Sources", 22, 104, 142, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=left;padding=2;");
  const intSources = [
    { t: "Regulatory Documents<br/><span style='color:#64748B;'>(PDF, Word, eCTD)</span>", icon: "📑" },
    { t: "SOPs &amp; Policies<br/><span style='color:#64748B;'>(Confluence, SharePoint)</span>", icon: "📜" },
    { t: "Research Reports<br/><span style='color:#64748B;'>&amp; Whitepapers</span>", icon: "🔬" },
    { t: "Email / Tickets / Notes", icon: "✉️" },
    { t: "Databases<br/><span style='color:#64748B;'>(SQL, Oracle, BQ)</span>", icon: "🗄️" }
  ];
  intSources.forEach((is, idx) => {
    const isy = 120 + idx * 32;
    cell(`is_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:11px;">${is.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;">${is.t}</span></div>`, 26, isy, 134, 28, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // External Sources Box
  cell("box_src_ext", "", 22, 296, 142, 200, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
  cell("lbl_src_ext", "External Sources", 22, 298, 142, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=7.5;fontStyle=1;align=left;padding=2;");
  const extSources = [
    { t: "Public Regulations<br/><span style='color:#64748B;'>(FDA, EMA, PMDA)</span>", icon: "🏛️" },
    { t: "Standards &amp; Guidelines<br/><span style='color:#64748B;'>(ICH, ISO, GxP)</span>", icon: "⚖️" },
    { t: "Public Websites &amp; Portals", icon: "🌐" },
    { t: "Clinical Trial Registries", icon: "🏥" },
    { t: "Scientific Literature<br/><span style='color:#64748B;'>(PubMed, arXiv)</span>", icon: "📚" }
  ];
  extSources.forEach((es, idx) => {
    const esy = 314 + idx * 34;
    cell(`es_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:11px;">${es.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;">${es.t}</span></div>`, 26, esy, 134, 30, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Pure 0° Horizontal edge from Sources to Pipeline
  edge("e_src_to_pipe", "box_sources", "box_rag_pipe", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 3. CENTER: RAG PIPELINE (7 STAGES: 2..8) (x=180..1220, y=78..390, w=1040) ====================
  cell("box_rag_pipe", "", 180, 78, 1040, 312, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_rag_pipe", "RAG / KNOWLEDGE FLOW PIPELINE", 180, 80, 1040, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const ragStages = [
    {
      num: "2", name: "INGEST &amp; CONNECT",
      cards: [
        { t: "Connectors<br/><span style='color:#64748B;'>(APIs, DB, Web)</span>", icon: "🔌" },
        { t: "Batch / Streaming<br/>Ingestion", icon: "🔄" },
        { t: "Change Data<br/>Capture (CDC)", icon: "⚡" }
      ]
    },
    {
      num: "3", name: "PREPROCESS &amp; PARSE",
      cards: [
        { t: "Document Parsing<br/><span style='color:#64748B;'>(OCR, Layout)</span>", icon: "📑" },
        { t: "Text Chunking<br/><span style='color:#64748B;'>(Semantic / Token)</span>", icon: "✂️" },
        { t: "Metadata Extraction<br/><span style='color:#64748B;'>(Entities, Tags)</span>", icon: "🏷️" },
        { t: "PII Detection &amp; Redaction", icon: "🔒" }
      ]
    },
    {
      num: "4", name: "EMBED &amp; INDEX",
      cards: [
        { t: "Embedding Model<br/><span style='color:#64748B;'>(Vertex Embeddings)</span>", icon: "🧠" },
        { t: "Vectorization", icon: "⚙️" },
        { t: "Indexing &amp; Upsert<br/><span style='color:#64748B;'>(Vector DB)</span>", icon: "🗄️" },
        { t: "Metadata Index<br/><span style='color:#64748B;'>(Search Index)</span>", icon: "📊" }
      ]
    },
    {
      num: "5", name: "RETRIEVE",
      cards: [
        { t: "User Query", icon: "🔍" },
        { t: "Query Understanding<br/><span style='color:#64748B;'>(Rewrite, Expand)</span>", icon: "✨" },
        { t: "Hybrid Search<br/><span style='color:#64748B;'>(Vector + Keyword)</span>", icon: "🔄" },
        { t: "Top-K Retrieval<br/><span style='color:#64748B;'>(Re-rank)</span>", icon: "🎯" }
      ]
    },
    {
      num: "6", name: "AUGMENT",
      cards: [
        { t: "Context Assembly<br/><span style='color:#64748B;'>(Chunks + Metadata)</span>", icon: "📋" },
        { t: "Deduplication &amp;<br/>Filtering", icon: "🧹" },
        { t: "Citations &amp; Source<br/>Attribution", icon: "📑" },
        { t: "Prompt Construction<br/><span style='color:#64748B;'>(System + Context)</span>", icon: "✍️" }
      ]
    },
    {
      num: "7", name: "GENERATE",
      cards: [
        { t: "LLM (Gemini)<br/><span style='color:#64748B;'>(Answer Generation)</span>", icon: "🧠" },
        { t: "Tool / Function Calls<br/><span style='color:#64748B;'>(If needed)</span>", icon: "🛠️" },
        { t: "Guardrails &amp; Safety<br/>Checks", icon: "🛡️" },
        { t: "Answer with Citations<br/>&amp; Confidence", icon: "✔" }
      ]
    },
    {
      num: "8", name: "FEEDBACK &amp; LEARN",
      cards: [
        { t: "User Feedback<br/><span style='color:#64748B;'>(Helpful / Not)</span>", icon: "👍" },
        { t: "Answer Evaluation<br/><span style='color:#64748B;'>(LLM-as-a-Judge)</span>", icon: "⚖️" },
        { t: "Logs &amp; Analytics", icon: "📊" },
        { t: "Continuous Improve<br/><span style='color:#64748B;'>(Prompts / Retr)</span>", icon: "🔄" }
      ]
    }
  ];

  ragStages.forEach((stg, sIdx) => {
    const sx = 190 + sIdx * 146;
    cell(`stg_box_${sIdx}`, "", sx, 100, 138, 280, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
    cell(`stg_hdr_${sIdx}`, `<div style="font-size:7px;font-weight:900;color:#1E40AF;text-align:center;">${stg.num}. ${stg.name}</div>`, sx, 104, 138, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    stg.cards.forEach((cd, cIdx) => {
      const cy = 124 + cIdx * 62;
      cell(`stg_${sIdx}_c_${cIdx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:13px;">${cd.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${cd.t}</span></div>`, sx + 4, cy, 130, 56, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=2;");
    });

    if (sIdx > 0) {
      // Pure 0° Horizontal edge between adjacent stages
      edge(`e_stg_${sIdx}`, `stg_box_${sIdx - 1}`, `stg_box_${sIdx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // ==================== 4. CENTER: KNOWLEDGE STORES & INDEXES (x=180..1220, y=398..470, w=1040) ====================
  cell("box_k_stores", "", 180, 398, 1040, 72, "rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_k_stores", "KNOWLEDGE STORES &amp; INDEXES", 180, 400, 1040, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const kStores = [
    { t: "Raw Document Store<br/><span style='color:#64748B;'>(Cloud Storage)</span>", icon: "🗄️" },
    { t: "Processed Text Store<br/><span style='color:#64748B;'>(Cloud Storage)</span>", icon: "📑" },
    { t: "Vector Database<br/><span style='color:#64748B;'>(Vertex Matching Engine)</span>", icon: "🧠" },
    { t: "Search Index<br/><span style='color:#64748B;'>(Elastic / OpenSearch)</span>", icon: "🔍" },
    { t: "Graph Database<br/><span style='color:#64748B;'>(Neo4j / AlloyDB)</span>", icon: "🕸️" },
    { t: "Relational DB<br/><span style='color:#64748B;'>(Metadata &amp; Lineage)</span>", icon: "📊" }
  ];
  kStores.forEach((ks, idx) => {
    const kx = 190 + idx * 170;
    cell(`ks_${idx}`, `<div style="display:flex;align-items:center;gap:4px;padding:0 2px;"><span style="font-size:14px;">${ks.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;">${ks.t}</span></div>`, kx, 418, 162, 46, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Pure 90° Vertical dashed droplines from Pipeline Stages down to Knowledge Stores
  edge("e_p_to_k1", "stg_box_0", "ks_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_p_to_k2", "stg_box_1", "ks_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_p_to_k3", "stg_box_2", "ks_2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_p_to_k4", "stg_box_3", "ks_3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // Cross-Cutting Capabilities bar (y=476..504, h=28)
  const crossCaps = ["🔒 Security &amp; IAM (Least Privilege)", "📑 Data Governance", "🛡️ PII &amp; Confidentiality", "📜 Audit Logging", "⚖️ Quality Monitoring", "💰 Cost &amp; Perf", "👥 Multi-tenancy"];
  cell("bar_cross_caps", crossCaps.join(" &nbsp;|&nbsp; "), 180, 476, 1040, 26, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor=#1E40AF;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  // ==================== 5. MIDDLE ROW: 6 RAG ARCHITECTURES + RESPONSE CARD (x=16..1220, y=510..634, h=124) ====================
  // 6 Patterns (w=850)
  cell("box_rag_patts", "", 16, 510, 850, 124, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  
  const ragPatterns = [
    { title: "Naive RAG", flow: "🔍 ➔ 📑 ➔ 🧠", sub: "Simple retrieval + gen" },
    { title: "Advanced RAG", flow: "🔍 ➔ 📑 ➔ 🎯 ➔ 🧠", sub: "Rerank for relevance" },
    { title: "Multi-Query RAG", flow: "🔍 ➔ 🔀 ➔ 📑 ➔ 🧠", sub: "Query expansion" },
    { title: "Sub-Question RAG", flow: "🔍 ➔ ✂️ ➔ 📑 ➔ 🧠", sub: "Break complex Qs" },
    { title: "Graph RAG", flow: "🔍 ➔ 🕸️ ➔ 🧠", sub: "Relationship context" },
    { title: "Agentic RAG", flow: "🔍 ➔ 🤖 ➔ 🛠️ ➔ 🧠", sub: "Agents &amp; tools" }
  ];
  ragPatterns.forEach((rp, idx) => {
    const rpx = 26 + idx * 138;
    cell(`rp_${idx}`, `<div style="font-size:7.5px;font-weight:900;color:#1E40AF;text-align:center;">${rp.title}</div><div style="font-size:12px;text-align:center;margin:4px 0;">${rp.flow}</div><div style="font-size:8px;color:#64748B;text-align:center;">${rp.sub}</div>`, rpx, 526, 128, 96, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=top;padding=3;");
  });

  // RAG Response Example (w=346, x=874)
  cell("box_resp_ex", "", 874, 510, 346, 124, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_resp_ex", "RAG RESPONSE EXAMPLE", 874, 512, 346, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const respExHtml = `<div style="font-size:8px;line-height:1.3;color:#0F172A;padding:2px 6px;">
    <b>Q:</b> What are the requirements for eCTD submissions?<br/>
    <b>A:</b> eCTD submissions must follow ICH M4 guidelines and include Module 1 (Regional), Module 2 (CTD Summaries), Module 3 (Quality)...<br/>
    <b style="color:#1E40AF;">Sources:</b><br/>
    ❶ ICH M4 Guideline v2.0 (2023) – Section 2.1<br/>
    ❷ SOP-REG-017 eCTD Submissions – Rev 4.1<br/>
    ❸ FDA eCTD Technical Conformance Guide
  </div>`;
  cell("txt_resp_ex", respExHtml, 876, 528, 342, 102, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 6. RIGHT SIDEBAR (x=1230..1520, y=78..634, w=290, h=556) ====================
  // 1. RAG Design Principles
  cell("box_r_princ", "", 1230, 78, 290, 134, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_r_princ", "RAG DESIGN PRINCIPLES", 1230, 80, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const rPrincHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    ✔ <b>Retrieve only relevant context</b><br/>
    ✔ <b>Maximize accuracy &amp; traceability</b><br/>
    ✔ <b>Minimize hallucinations</b> with grounding<br/>
    ✔ <b>Citations for every factual claim</b><br/>
    ✔ <b>Optimize latency &amp; cost</b>
  </div>`;
  cell("txt_r_princ", rPrincHtml, 1232, 98, 286, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Retrieval Strategies
  cell("box_r_strat", "", 1230, 218, 290, 134, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("lbl_r_strat", "RETRIEVAL STRATEGIES", 1230, 220, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const rStratHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🧠 <b>Vector Similarity Search</b> (Semantic)<br/>
    📑 <b>Keyword / BM25 Search</b> (Lexical)<br/>
    🔄 <b>Hybrid Search</b> (Vector + Lexical)<br/>
    🎯 <b>Reranking</b> (Cross-Encoder / LLM)<br/>
    🏷️ <b>Metadata Filters</b> (Date, Source, Type)
  </div>`;
  cell("txt_r_strat", rStratHtml, 1232, 238, 286, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Guardrails & Controls
  cell("box_r_guards", "", 1230, 358, 290, 134, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_r_guards", "GUARDRAILS &amp; CONTROLS", 1230, 360, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const rGuardsHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🛡️ <b>Prompt Injection Detection</b><br/>
    🛡️ <b>Toxicity &amp; Safety Filters</b><br/>
    ✔ <b>Groundedness Check</b> (Answer vs Context)<br/>
    📑 <b>Citation Validation</b><br/>
    🔒 <b>Data Access Policy Enforcement</b>
  </div>`;
  cell("txt_r_guards", rGuardsHtml, 1232, 378, 286, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 4. Key Risks
  cell("box_r_risks", "", 1230, 498, 290, 136, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_r_risks", "⚠️ KEY RISKS", 1230, 500, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const rRisksHtml = `<div style="font-size:8px;line-height:1.3;color:#0F172A;padding:2px 6px;">
    🔴 <b>Irrelevant or outdated context</b><br/>
    🔴 <b>Hallucinations / Incorrect answers</b><br/>
    🔴 <b>Sensitive data leakage</b><br/>
    🔴 <b>Poor chunking / embedding quality</b><br/>
    🔴 <b>High latency / cost</b><br/>
    🔴 <b>Missing citations / low traceability</b>
  </div>`;
  cell("txt_r_risks", rRisksHtml, 1232, 518, 286, 112, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 7. TOOLS & TECHNOLOGIES BAR (y=642..718, h=76) ====================
  cell("box_tools_row", "", 16, 642, 1504, 76, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_tools_row", "TOOLS &amp; TECHNOLOGIES (Google Cloud)", 20, 646, 150, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=left;verticalAlign=middle;");

  const ragTechs = [
    { t: "Cloud Storage", icon: "📦" },
    { t: "Dataflow", icon: "🔄" },
    { t: "Document AI", icon: "📑" },
    { t: "Vertex AI<br/>(Embeddings)", icon: "🧠" },
    { t: "Vertex Matching<br/>Engine", icon: "🗄️" },
    { t: "AlloyDB / PG", icon: "🗄️" },
    { t: "BigQuery", icon: "📊" },
    { t: "Cloud Functions", icon: "⚡" },
    { t: "Cloud Run", icon: "🚀" },
    { t: "LangChain", icon: "🦜" },
    { t: "Vertex AI<br/>(Gemini)", icon: "🧠" },
    { t: "Looker Studio", icon: "📈" }
  ];
  ragTechs.forEach((rt, idx) => {
    const rtx = 180 + idx * 110;
    cell(`rt_${idx}`, `<div style="text-align:center;"><span style="font-size:14px;">${rt.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:1px;">${rt.t}</div></div>`, rtx, 650, 104, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 8. BOTTOM ROW: 5 CARDS (y=726..954, h=228) ====================
  // 1. Quality & Evaluation Metrics (w=230)
  cell("box_b_metrics", "", 16, 726, 230, 228, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_metrics", "QUALITY &amp; EVALUATION", 16, 728, 230, 18, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bMetricsHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    ✔ <b>Answer Relevance (Precision@K)</b><br/>
    ✔ <b>Context Precision &amp; Recall</b><br/>
    ✔ <b>Groundedness Score</b><br/>
    ✔ <b>Hallucination Rate</b><br/>
    ✔ <b>User Satisfaction (Thumbs Up)</b><br/>
    ✔ <b>Latency (P50 / P95 / P99)</b>
  </div>`;
  cell("txt_b_metrics", bMetricsHtml, 18, 748, 226, 202, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. RAG Data Flow (High Level) (w=480)
  cell("box_b_flow", "", 254, 726, 480, 228, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_flow", "RAG DATA FLOW (HIGH LEVEL)", 254, 728, 480, 18, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const highFlow = [
    { t: "Sources", icon: "🗄️" },
    { t: "Ingest", icon: "☁️" },
    { t: "Parse &amp;<br/>Chunk", icon: "📑" },
    { t: "Embed<br/>&amp; Index", icon: "🧠" },
    { t: "Retrieve", icon: "🔍" },
    { t: "Augment", icon: "📋" },
    { t: "Generate", icon: "🤖" },
    { t: "User", icon: "👤" }
  ];
  highFlow.forEach((hf, idx) => {
    const hfx = 262 + idx * 58;
    cell(`hf_${idx}`, `<div style="font-size:14px;text-align:center;">${hf.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${hf.t}</div>`, hfx, 780, 52, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      // Pure 0° Horizontal edge between flow nodes
      edge(`e_hf_${idx}`, `hf_${idx - 1}`, `hf_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // 3. Observability & Monitoring (w=230)
  cell("box_b_obs", "", 742, 726, 230, 228, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_obs", "OBSERVABILITY &amp; MONITORING", 742, 728, 230, 18, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bObsHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    🔍 <b>Query Logs &amp; Traces</b><br/>
    ⚙️ <b>Retriever Performance</b><br/>
    💰 <b>LLM Usage &amp; Costs</b><br/>
    🔔 <b>Quality Drift Alerts</b><br/>
    🚨 <b>Error &amp; Timeout Tracking</b>
  </div>`;
  cell("txt_b_obs", bObsHtml, 744, 748, 226, 202, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Governance & Compliance (w=230)
  cell("box_b_gov", "", 980, 726, 230, 228, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_gov", "GOVERNANCE &amp; COMPLIANCE", 980, 728, 230, 18, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bGovHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    📑 <b>Data Classification &amp; Handling</b><br/>
    🔒 <b>Retention &amp; Deletion Policies</b><br/>
    🛡️ <b>Access Control &amp; Audit</b><br/>
    ⚖️ <b>Regulatory Compliance (GxP, GDPR)</b><br/>
    📜 <b>Model Cards &amp; Documentation</b>
  </div>`;
  cell("txt_b_gov", bGovHtml, 982, 748, 226, 202, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 5. Notes (w=302)
  cell("box_b_notes", "", 1218, 726, 302, 228, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_notes", "NOTES", 1218, 728, 302, 18, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bNotesHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px 8px;">
    • All data encrypted at rest and in transit.<br/>
    • Access controlled via IAM and least privilege.<br/>
    • Design for idempotency, retries, and resilience.<br/>
    • Citations are mandatory for all factual claims.<br/>
    • Continuously improve retriever, prompts, and evaluation.
  </div>`;
  cell("txt_b_notes", bNotesHtml, 1220, 748, 298, 202, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 9. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>RAG PIPELINE:</b> Vertex AI + Embeddings + Gemini &nbsp;|&nbsp; <b>GROUNDING:</b> Citations Required &nbsp;|&nbsp; <b>SECURITY:</b> Least Privilege IAM</div>
    <div>Enterprise Knowledge &amp; GenAI Architecture &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_24_rag_knowledge_flow" name="Template 24: RAG / Knowledge Flow Architecture">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
