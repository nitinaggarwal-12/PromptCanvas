/**
 * Canonical Architecture Template 24: RAG / Knowledge Flow Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/24.png
 */

export function generateTemplate24RagKnowledgeFlowXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts: Array<{x: number, y: number}> = []) => {
    let ptsXml = "";
    if (pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "24", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>RAG / Knowledge Flow Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Regulatory Q&amp;A with Internal &amp; External Knowledge &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Provide accurate, traceable, and context-aware answers by combining LLMs with enterprise and external knowledge using Retrieval-Augmented Generation (RAG).</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: 1. KNOWLEDGE SOURCES (x=20..170, y=78..505)
  rect("box_ks", "", 20, 78, 150, 427, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_ks", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>1. KNOWLEDGE SOURCES</div>", 20, 82, 150, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("ks_int", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>Internal Sources</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>📑 Regulatory Documents<br/>&nbsp;&nbsp;&nbsp;(PDF, Word, eCTD)<br/>📋 SOPs &amp; Policies<br/>&nbsp;&nbsp;&nbsp;(Confluence, SharePoint)<br/>📊 Research Reports<br/>&nbsp;&nbsp;&nbsp;&amp; Whitepapers<br/>✉️ Email / Tickets / Notes<br/>🗄️ Databases (SQL, BQ)</div>", 26, 100, 138, 190, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("ks_ext", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>External Sources</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🌐 Public Regulations<br/>&nbsp;&nbsp;&nbsp;(FDA, EMA, PMDA)<br/>📑 Standards &amp; Guidelines<br/>&nbsp;&nbsp;&nbsp;(ICH, ISO, GxP)<br/>🌐 Public Websites<br/>🩺 Clinical Registries<br/>📚 Scientific Literature</div>", 26, 298, 138, 198, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 3. CENTER OUTER BOX: RAG / KNOWLEDGE FLOW PIPELINE (x=178..1280, y=78..505)
  rect("box_rag", "", 178, 78, 1102, 427, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_rag", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>RAG / KNOWLEDGE FLOW PIPELINE</span>", 178, 82, 1102, 16, "strokeColor=none;fillColor=none;align=center;");

  const rSteps = [
    { n: "2", t: "INGEST &amp; CONNECT", x: 186, w: 145, items: ["🔌 Connectors (APIs, DB)", "📦 Batch / Streaming", "🔄 Change Data Capture"] },
    { n: "3", t: "PREPROCESS &amp; PARSE", x: 337, w: 155, items: ["📑 Document Parsing", "✂️ Text Chunking", "🏷️ Metadata Extraction", "🔒 PII Detection"] },
    { n: "4", t: "EMBED &amp; INDEX", x: 498, w: 150, items: ["🧠 Embedding Model", "🔢 Vectorization", "🗄️ Indexing &amp; Upsert", "📋 Metadata Index"] },
    { n: "5", t: "RETRIEVE", x: 654, w: 150, items: ["🔍 User Query", "🎯 Query Understanding", "⚡ Hybrid Search", "🔝 Top-K Retrieval"] },
    { n: "6", t: "AUGMENT", x: 810, w: 150, items: ["🧩 Context Assembly", "🧹 Deduplication", "📑 Citations &amp; Source", "📝 Prompt Construction"] },
    { n: "7", t: "GENERATE", x: 966, w: 150, items: ["🤖 LLM (Gemini)", "⚙️ Tool/Function Calls", "🛡️ Guardrails &amp; Safety", "✨ Answer + Citations"] },
    { n: "8", t: "FEEDBACK &amp; LEARN", x: 1122, w: 150, items: ["👍 User Feedback", "📊 Answer Evaluation", "📈 Logs &amp; Analytics", "🔄 Continuous Impr"] }
  ];

  rSteps.forEach((rs, idx) => {
    rect(`rs_col_${idx}`, "", rs.x, 102, rs.w, 150, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;");
    rect(`rs_hdr_${idx}`, `<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>${rs.n}. ${rs.t}</div>`, rs.x, 106, rs.w, 14, "strokeColor=none;fillColor=none;align=center;");
    rs.items.forEach((it, itIdx) => {
      rect(`rs_it_${idx}_${itIdx}`, `<div style='font-size:9px;font-weight:700;'>${it}</div>`, rs.x + 4, 124 + itIdx * 30, rs.w - 8, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    });
  });

  // KNOWLEDGE STORES & INDEXES STRIP
  rect("strip_stores", "", 186, 258, 1086, 68, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_stores", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>KNOWLEDGE STORES &amp; INDEXES</span>", 186, 262, 1086, 14, "strokeColor=none;fillColor=none;align=center;");

  const kStores = [
    { icon: "🗄️", t: "Raw Document Store", s: "(Cloud Storage)", x: 196, w: 165 },
    { icon: "📑", t: "Processed Text Store", s: "(Cloud Storage)", x: 375, w: 165 },
    { icon: "🔢", t: "Vector Database", s: "(Vertex Matching Engine)", x: 554, w: 180 },
    { icon: "🔍", t: "Search Index", s: "(Elastic / OpenSearch)", x: 748, w: 165 },
    { icon: "🕸️", t: "Graph Database", s: "(Neo4j / AlloyDB)", x: 927, w: 165 },
    { icon: "📋", t: "Relational DB", s: "(Metadata &amp; Lineage)", x: 1106, w: 156 }
  ];
  kStores.forEach((ks, idx) => {
    rect(`ks_box_${idx}`, `<div style='font-size:10px;font-weight:700;'>${ks.icon} ${ks.t}<br/><span style='font-size:8.5px;color:#64748B;'>${ks.s}</span></div>`, ks.x, 278, ks.w, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // CROSS-CUTTING CAPABILITIES BAR
  rect("bar_cross", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;text-align:center;'>CROSS-CUTTING CAPABILITIES</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🛡️ <b>Security &amp; IAM</b></div>" +
    "<div>📑 <b>Data Governance</b></div>" +
    "<div>🔒 <b>PII &amp; Masking</b></div>" +
    "<div>⏱️ <b>Audit Logging</b></div>" +
    "<div>🩺 <b>Quality Monitoring</b></div>" +
    "<div>💰 <b>Cost &amp; Performance</b></div>" +
    "<div>🏢 <b>Multi-tenancy</b></div>" +
    "</div>", 186, 332, 1086, 40, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  // 6 RAG FLOW SUB-DIAGRAMS (x=186..1000, y=378..498)
  rect("box_rag_flows", "", 186, 378, 620, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_rf", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;display:flex;justify-content:space-around;padding:4px;'><div>Naive RAG</div> <div>Advanced RAG</div> <div>Multi-Query</div> <div>Sub-Question</div> <div>Graph RAG</div> <div>Agentic RAG</div></div>" +
    "<div style='font-size:9px;color:#64748B;text-align:center;margin-top:20px;'>Comprehensive RAG pattern support: Simple retrieval, reranking, query expansion, decomposition, knowledge graph integration, and multi-agent synthesis.</div>", 186, 378, 620, 120, "strokeColor=none;fillColor=none;align=center;verticalAlign=top;");

  // RAG RESPONSE EXAMPLE CARD (x=816..1272, y=378..498)
  rect("card_rag_resp", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>RAG RESPONSE EXAMPLE</div>" +
    "<div style='font-size:9px;line-height:1.4;color:#0F172A;'>" +
    "<b>Q:</b> What are the requirements for eCTD submissions?<br/>" +
    "<b>A:</b> eCTD submissions must follow ICH M4 guidelines and include Module 1 (Regional), Module 2 (CTD Summaries), Module 3 (Quality), Module 4 (Nonclinical), and Module 5 (Clinical)...<br/>" +
    "<b>Sources:</b><br/>" +
    "❶ ICH M4 Guideline v2.0 (2023) – Section 2.1<br/>" +
    "❷ SOP-REG-017 eCTD Submissions – Rev 4.1<br/>" +
    "❸ FDA eCTD Technical Conformance Guide – v1.0" +
    "</div>", 816, 378, 456, 120, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 4. FAR RIGHT COLUMN: PRINCIPLES, STRATEGIES & RISKS (x=1290..1560, y=78..505)
  rect("r_p1", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>RAG DESIGN PRINCIPLES</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>✔ Retrieve only relevant context<br/>✔ Maximize answer accuracy &amp; traceability<br/>✔ Minimize hallucinations with grounding<br/>✔ Citations for every factual claim<br/>✔ Optimize latency &amp; cost</div>", 1290, 78, 270, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("r_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>RETRIEVAL STRATEGIES</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🔢 Vector Similarity Search (Semantic)<br/>🔤 Keyword / BM25 Search (Lexical)<br/>⚡ Hybrid Search (Vector + Lexical)<br/>🔝 Reranking (Cross-Encoder / LLM)<br/>🏷️ Metadata Filters (Date, Source, Type)</div>", 1290, 178, 270, 98, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("r_p3", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>GUARDRAILS &amp; CONTROLS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🛡️ Prompt Injection Detection<br/>☣️ Toxicity &amp; Safety Filters<br/>🎯 Groundedness Check (Answer vs Context)<br/>📑 Citation Validation<br/>🔒 Data Access Policy Enforcement</div>", 1290, 282, 270, 98, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("r_p4", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>⚠️ KEY RISKS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🔴 Irrelevant or outdated context<br/>🔴 Hallucinations / Incorrect answers<br/>🔴 Sensitive data leakage<br/>🔴 Poor chunking / embedding quality<br/>🔴 High latency / cost<br/>🔴 Missing citations / low traceability</div>", 1290, 386, 270, 119, "fillColor=#FEF2F2;strokeColor=#FECACA;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. TOOLS & TECHNOLOGIES BAR (x=20..1560, y=512..572)
  rect("bar_tech", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>TOOLS &amp; TECHNOLOGIES (Google Cloud)</div>" +
    "<div style='font-size:9.5px;line-height:1.4;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🗃️<br/><b>Cloud Storage</b></div>" +
    "<div>🔄<br/><b>Dataflow</b></div>" +
    "<div>📑<br/><b>Document AI</b></div>" +
    "<div>🧠<br/><b>Vertex Embeddings</b></div>" +
    "<div>🔢<br/><b>Vertex Matching Engine</b></div>" +
    "<div>🗄️<br/><b>AlloyDB PG</b></div>" +
    "<div>📊<br/><b>BigQuery</b></div>" +
    "<div>⚡<br/><b>Cloud Functions</b></div>" +
    "<div>☸️<br/><b>Cloud Run</b></div>" +
    "<div>🔗<br/><b>LangChain / LlamaIndex</b></div>" +
    "<div>🤖<br/><b>Vertex AI (Gemini)</b></div>" +
    "<div>📊<br/><b>Looker Studio</b></div>" +
    "<div>📈<br/><b>Cloud Logging</b></div>" +
    "</div>", 20, 512, 1540, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. BOTTOM ROW: 5 PANELS & NOTES (x=20..1560, y=578..775)
  rect("bot_p1", "<div style='font-size:11.5px;font-weight:800;color:#16A34A;margin-bottom:3px;'>QUALITY &amp; EVALUATION METRICS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Answer Relevance (Precision@K)<br/>✔ Context Precision &amp; Recall<br/>✔ Groundedness Score<br/>✔ Hallucination Rate<br/>✔ User Satisfaction (Thumbs Up / Down)<br/>✔ Latency (P50 / P95 / P99)</div>", 20, 578, 240, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p2", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;'>RAG DATA FLOW (HIGH LEVEL)</div><div style='font-size:9.5px;line-height:1.4;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div>🗄️<br/>Sources</div> <div>➔</div> <div>📥<br/>Ingest</div> <div>➔</div> <div>✂️<br/>Parse &amp; Chunk</div> <div>➔</div> <div>🔢<br/>Embed &amp; Index</div> <div>➔</div> <div>🔍<br/>Retrieve</div> <div>➔</div> <div>🧩<br/>Augment</div> <div>➔</div> <div>🤖<br/>Generate</div> <div>➔</div> <div>👤<br/>User</div></div>", 270, 578, 510, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");
  rect("bot_p3", "<div style='font-size:11.5px;font-weight:800;color:#2563EB;margin-bottom:3px;'>OBSERVABILITY &amp; MONITORING</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>⏱️ Query Logs &amp; Traces<br/>📈 Retriever Performance<br/>💰 LLM Usage &amp; Costs<br/>🩺 Quality Drift Alerts<br/>🚨 Error &amp; Timeout Tracking</div>", 790, 578, 240, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p4", "<div style='font-size:11.5px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>GOVERNANCE &amp; COMPLIANCE</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🛡️ Data Classification &amp; Handling<br/>📅 Retention &amp; Deletion Policies<br/>🔒 Access Control &amp; Audit<br/>📋 Regulatory Compliance (GxP, HIPAA)<br/>📑 Model Cards &amp; Documentation</div>", 1040, 578, 250, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p5", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div><div style='font-size:9px;line-height:1.4;color:#64748B;'>• All data encrypted at rest and in transit.<br/>• Access controlled via IAM and least privilege.<br/>• Design for idempotency, retries, and resilience.<br/>• Citations are mandatory for all factual claims.<br/>• Continuously improve retriever, prompts, and evaluation.</div>", 1300, 578, 260, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. FOOTER LEGEND (x=20..1560, y=785..815)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Data / Knowledge Flow</div>" +
    "<div>- - - Control / Feedback Flow</div>" +
    "<div>🟦 Process / Pipeline</div>" +
    "<div>🗄️ Storage / Data Store</div>" +
    "<div>🟩 External Source</div>" +
    "<div>🟥 Risk / Issue</div>" +
    "</div>", 20, 785, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_24_rag_knowledge_flow" name="Template 24: RAG / Knowledge Flow Architecture">
    <mxGraphModel dx="1440" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
