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
  rect("num_badge", "24", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>RAG / Knowledge Flow Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Regulatory Q&amp;A with Internal &amp; External Knowledge &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Provide accurate, traceable, and context-aware answers by combining LLMs with enterprise and external knowledge using Retrieval-Augmented Generation (RAG).</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: 1. KNOWLEDGE SOURCES (x=20..115, y=72..410)
  rect("box_sources", "", 20, 72, 95, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_sources", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>1. KNOWLEDGE<br/>SOURCES</span>", 20, 75, 95, 18, "strokeColor=none;fillColor=none;align=center;");

  rect("src_int", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;'>Internal Sources</div><div style='font-size:10px;line-height:1.3;color:#0F172A;margin-top:2px;'>📑 Regulatory Documents<br/>📜 SOPs &amp; Policies<br/>🔬 Research Reports<br/>📨 Email / Tickets<br/>🗄️ Databases (SQL, BQ)</div>", 25, 96, 85, 140, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("src_ext", "<div style='font-size:9px;font-weight:800;color:#7C3AED;'>External Sources</div><div style='font-size:10px;line-height:1.3;color:#0F172A;margin-top:2px;'>🏛️ Public Regs (FDA, EMA)<br/>📋 Standards (ICH, ISO)<br/>🌐 Public Websites<br/>🩺 Clinical Registries<br/>📚 Scientific Literature</div>", 25, 242, 85, 160, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. MAIN RAG / KNOWLEDGE FLOW PIPELINE (x=122..1310, y=72..410)
  rect("box_pipeline_main", "", 122, 72, 1180, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_pipeline_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>RAG / KNOWLEDGE FLOW PIPELINE</span>", 122, 74, 1180, 12, "strokeColor=none;fillColor=none;align=center;");

  // 7 Stages (2..8)
  const stages = [
    { n: "2. INGEST & CONNECT", items: ["🔌 Connectors (APIs, DB)", "⚡ Batch / Streaming", "🔄 Change Data Capture"] },
    { n: "3. PREPROCESS & PARSE", items: ["📑 Document Parsing", "✂️ Text Chunking", "🏷️ Metadata Extraction", "🔒 PII Detection"] },
    { n: "4. EMBED & INDEX", items: ["🧠 Embedding Model", "🔢 Vectorization", "🗄️ Indexing & Upsert", "📋 Metadata Index"] },
    { n: "5. RETRIEVE", items: ["👤 User Query", "🔍 Query Understanding", "⚡ Hybrid Search", "🔝 Top-K Retrieval"] },
    { n: "6. AUGMENT", items: ["🧩 Context Assembly", "✂️ Deduplication", "📑 Citations & Source", "✍️ Prompt Construction"] },
    { n: "7. GENERATE", items: ["🧠 LLM (Gemini)", "🛠️ Tool / Function Calls", "🛡️ Guardrails & Safety", "💬 Answer + Citations"] },
    { n: "8. FEEDBACK & LEARN", items: ["👍 User Feedback", "📊 Answer Evaluation", "📑 Logs & Analytics", "🔄 Continuous Impr"] }
  ];

  stages.forEach((st, idx) => {
    const sx = 128 + idx * 167;
    rect(`st_p_${idx}`, "", sx, 88, 160, 118, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
    rect(`st_plbl_${idx}`, `<div style='font-size:8px;font-weight:800;color:#1E3A8A;'>${st.n}</div>`, sx, 90, 160, 10, "strokeColor=none;fillColor=none;align=center;");

    st.items.forEach((it, itIdx) => {
      const iy = 102 + itIdx * 25;
      rect(`st_pit_${idx}_${itIdx}`, `<div style='font-size:8px;color:#0F172A;'>${it}</div>`, sx + 4, iy, 152, 22, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=2;");
    });
  });

  // Knowledge Stores & Indexes Strip (y=210..260)
  rect("box_stores", "", 128, 210, 1168, 50, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;");
  rect("lbl_stores", "<span style='font-size:9px;font-weight:800;color:#7C3AED;'>KNOWLEDGE STORES &amp; INDEXES</span>", 128, 212, 1168, 10, "strokeColor=none;fillColor=none;align=center;");

  const kstores = [
    { t: "Raw Document Store", sub: "(Cloud Storage)", icon: "🗃️" },
    { t: "Processed Text Store", sub: "(Cloud Storage)", icon: "📑" },
    { t: "Vector Database", sub: "(Vertex Matching Engine)", icon: "🧠" },
    { t: "Search Index", sub: "(Elastic / OpenSearch)", icon: "🔍" },
    { t: "Graph Database", sub: "(Neo4j / AlloyDB)", icon: "🕸️" },
    { t: "Relational DB", sub: "(Metadata &amp; Lineage)", icon: "🗄️" }
  ];
  kstores.forEach((ks, idx) => {
    const kx = 134 + idx * 193;
    rect(`ks_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${ks.icon} ${ks.t}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${ks.sub}</div>`, kx, 224, 186, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=1;");
  });

  // Cross-Cutting Capabilities
  rect("box_cross_rag", "<div style='font-size:9px;font-weight:800;color:#2563EB;text-align:center;'>🛡️ Security &amp; IAM &nbsp;|&nbsp; 📋 Data Governance &nbsp;|&nbsp; 🔒 PII &amp; Masking &nbsp;|&nbsp; 📑 Audit Logging &nbsp;|&nbsp; 🩺 Quality Monitoring &nbsp;|&nbsp; 💰 Cost &amp; Performance &nbsp;|&nbsp; 🏢 Multi-tenancy</div>", 128, 263, 1168, 16, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // RAG Patterns & Response Example (y=282..405)
  rect("box_patterns", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>RAG ARCHITECTURE PATTERNS</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'><b>Naive RAG</b><br/><span style='color:#64748B;'>Simple retrieve + gen</span></div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'><b>Advanced RAG</b><br/><span style='color:#64748B;'>Re-rank for relevance</span></div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'><b>Multi-Query</b><br/><span style='color:#64748B;'>Query expansion</span></div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'><b>Sub-Question</b><br/><span style='color:#64748B;'>Break complex queries</span></div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'><b>Graph RAG</b><br/><span style='color:#64748B;'>Use graph context</span></div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'><b>Agentic RAG</b><br/><span style='color:#64748B;'>Multi-step agent plan</span></div></div>", 128, 282, 700, 120, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=3;");

  rect("box_example", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:2px;'>RAG RESPONSE EXAMPLE</div><div style='font-size:8px;line-height:1.25;color:#0F172A;'><b>Q:</b> What are the requirements for eCTD submissions?<br/><b>A:</b> eCTD submissions must follow ICH M4 guidelines and include Module 1 (Regional), Module 2 (CTD Summaries), Module 3 (Quality), Module 4 (Nonclinical), and Module 5 (Clinical)...<br/><b>Sources:</b><br/>❶ ICH M4 Guideline v2.0 (2023) – Section 2.1<br/>❷ SOP-REG-017 eCTD Submissions – Rev 4.1<br/>❸ FDA eCTD Technical Conformance Guide – v1.0</div>", 834, 282, 462, 120, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 4. FAR RIGHT: DESIGN PRINCIPLES, RETRIEVAL, GUARDRAILS, RISKS (x=1316..1560, y=72..410)
  rect("box_r_prin", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;'>RAG DESIGN PRINCIPLES</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>✔ Retrieve only relevant context<br/>✔ Maximize answer accuracy &amp; traceability<br/>✔ Minimize hallucinations with grounding<br/>✔ Citations for every factual claim<br/>✔ Optimize latency &amp; cost</div>", 1316, 72, 244, 76, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_ret_strat", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:1px;'>RETRIEVAL STRATEGIES</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>🔢 <b>Vector Similarity Search</b> (Semantic)<br/>🔤 <b>Keyword / BM25 Search</b> (Lexical)<br/>⚡ <b>Hybrid Search</b> (Vector + Lexical)<br/>🔝 <b>Reranking</b> (Cross-Encoder / LLM)<br/>🏷️ <b>Metadata Filters</b> (Date, Source, Type)</div>", 1316, 152, 244, 82, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_guard", "<div style='font-size:9px;font-weight:800;color:#7C3AED;margin-bottom:1px;'>GUARDRAILS &amp; CONTROLS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>🛡️ <b>Prompt Injection Detection</b><br/>☣️ <b>Toxicity &amp; Safety Filters</b><br/>🩺 <b>Groundness Check</b> (Answer vs Context)<br/>📑 <b>Citation Validation</b><br/>🔒 <b>Data Access Policy Enforcement</b></div>", 1316, 238, 244, 82, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_risks", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>KEY RISKS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>⚠️ Irrelevant or outdated context<br/>⚠️ Hallucinations / Incorrect answers<br/>⚠️ Sensitive data leakage<br/>⚠️ Poor chunking / embedding quality<br/>⚠️ High latency / cost<br/>⚠️ Missing citations / low traceability</div>", 1316, 324, 244, 86, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 5. LOWER TOOLS & TECHNOLOGIES STRIP (x=20..1560, y=416..470)
  rect("box_tools_rag", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>TOOLS &amp; TECHNOLOGIES (Google Cloud)</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>🗃️ Cloud Storage</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>📊 Dataflow</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>📑 Document AI</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>🧠 Vertex AI Embeddings</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>⚡ Matching Engine</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>🗄️ AlloyDB</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>📊 BigQuery</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>⚡ Cloud Functions</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>📦 Cloud Run</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>🔗 LangChain / LlamaIndex</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>🧠 Vertex AI (Gemini)</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>📊 Looker Studio</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 6px;border-radius:3px;'>📑 Cloud Logging</div></div>", 20, 416, 1540, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");

  // 6. BOTTOM ROW: EVAL, DATA FLOW, OBS, GOV, LEGEND, NOTES (x=20..1560, y=470..740)
  rect("bot_eval", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>QUALITY &amp; EVALUATION METRICS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Answer Relevance (Precision@K)<br/>✔ Context Precision &amp; Recall<br/>✔ Groundedness Score<br/>✔ Hallucination Rate<br/>✔ User Satisfaction (Thumbs Up / Down)<br/>⏱️ Latency (P50 / P95 / P99)</div>", 20, 470, 280, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_dataflow", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:6px;text-align:center;'>RAG DATA FLOW (HIGH LEVEL)</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:20px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📚<br/>Sources</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📥<br/>Ingest</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>✂️<br/>Parse &amp; Chunk</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🧠<br/>Embed &amp; Index</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔍<br/>Retrieve</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🧩<br/>Augment</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>✨<br/>Generate</div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:4px;'>👤<br/>User</div></div>", 310, 470, 480, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("bot_obs", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>OBSERVABILITY &amp; MONITORING</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>⏱️ <b>Query Logs &amp; Traces</b><br/>📊 <b>Retriever Performance</b><br/>💰 <b>LLM Usage &amp; Costs</b><br/>🩺 <b>Quality Drift Alerts</b><br/>🚨 <b>Error &amp; Timeout Tracking</b></div>", 800, 470, 240, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_gov", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>GOVERNANCE &amp; COMPLIANCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🏷️ <b>Data Classification &amp; Handling</b><br/>📑 <b>Retention &amp; Deletion Policies</b><br/>🔒 <b>Access Control &amp; Audit</b><br/>🩺 <b>Regulatory Compliance (GxP, HIPAA)</b><br/>📋 <b>Model Cards &amp; Documentation</b></div>", 1050, 470, 240, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.4;color:#64748B;'>• All data encrypted at rest and in transit.<br/>• Access controlled via IAM and least privilege.<br/>• Design for idempotency, retries, and resilience.<br/>• Citations are mandatory for all factual claims.<br/>• Continuously improve retriever, prompts, and evaluation.</div>", 1300, 470, 260, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_24_rag_knowledge_flow_architecture" name="Template 24: RAG / Knowledge Flow Architecture">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
