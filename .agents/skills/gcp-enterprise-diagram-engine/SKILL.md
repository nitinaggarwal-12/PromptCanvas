---
name: gcp-enterprise-diagram-engine
description: Universal engineering standard and coordinate matrix for generating 100% collision-free, production-grade Google Cloud Enterprise Reference Architecture diagrams in Draw.io XML with zero human back-and-forth.
---

# 📐 GCP Enterprise Architecture Diagram Engine (SKILL.md)

This skill serves as the single source of truth for generating, compiling, styling, and verifying production-grade Google Cloud Platform (GCP) Multi-Tier Enterprise Architecture diagrams in Draw.io XML.

---

## 🏛️ 1. Global Viewport & 6-Zone Spatial Coordinate Matrix

Canvas Dimensions: **$1680 \times 1040\text{px}$** (16:9 widescreen).

```
+------------------------------------------------------------------------------------------------------------------+
| Top Header Banner (X=40, Y=20, W=1600, H=52)                                                                     |
+-------------------+-----------------------------------------+----------------------------------------------------+
| 1. INGRESS & EDGE | 2. APPLICATION CORE MESH (H=360)        | 4. VERTEX AI & INTELLIGENCE HUB (H=360)            |
| (X=40, W=210,     | (X=265, W=560, Y=85)                    | (X=845, W=795, Y=85)                               |
|  Y=85, H=660)     +-----------------------------------------+----------------------------------------------------+
|                   | 3. REAL-TIME EVENT STREAMING (H=280)    | 5. MULTI-REGION LAKEHOUSE & DB (H=280)             |
|                   | (X=265, W=560, Y=465)                   | (X=845, W=795, Y=465)                              |
+-------------------+-----------------------------------------+----------------------------------------------------+
| 6. ZERO-TRUST SECURITY, SRE OBSERVABILITY & GOVERNANCE BASELINE (X=40, Y=760, W=1600, H=140)                     |
+------------------------------------------------------------------------------------------------------------------+
```

### Exact Spatial Bounds

| Zone | Zone Name | X | Y | Width | Height | Inner Card Count & Layout |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Zone 1** | **1. INGRESS & EDGE** | `40` | `85` | `210` | `660` | 4 cards ($W=178, H=105$) at $Y=125, 290, 455, 620$ ($60\text{px}$ equal gaps, 0 void) |
| **Zone 2** | **2. APPLICATION CORE MESH** | `265` | `85` | `560` | `360` | 3 full-width cards ($W=515, H=90$) at $Y=130, 235, 340$ ($15\text{px}$ gaps) |
| **Zone 3** | **3. REAL-TIME EVENT STREAMING**| `265` | `465` | `560` | `280` | Row 1: 2 cards ($W=242, H=95$) at $X=287, 560$; Row 2: 1 card ($W=515, H=105$) at $Y=625$ |
| **Zone 4** | **4. VERTEX AI & INTELLIGENCE** | `845` | `85` | `795` | `360` | Left Col ($W=325$): ScaNN ($H=140$) + Model Armor ($H=145$); **$80\text{px}$ gap**; Right Col: Gemini ($W=350, H=300$) |
| **Zone 5** | **5. MULTI-REGION LAKEHOUSE & DB**| `845` | `465` | `795` | `280` | 3 equal cards ($W=225, H=215$) at $X=865, 1130, 1395$ with **equal $40\text{px}$ gaps** |
| **Zone 6** | **6. ZERO-TRUST BASELINE** | `40` | `760` | `1600` | `140` | 6 horizontal pods ($W=248, H=75$) starting $X=56$ with $17\text{px}$ gaps |

---

## ⚡ 2. Google Cloud Service & Technology Fact Sheet

Never guess or hallucinate outdated version numbers. Adhere strictly to verified Google Cloud facts:

1. **AI & Foundation Models**:
   - **Gemini 3.7 Flash**: Dynamic Thinking & Native Hybrid Reasoning (fast + deep thinking modes in one model).
   - **Gemini 2.5 Pro**: Deep ReAct Planning, Long-Context (2M tokens), Tool Calling AST.
   - **Vertex Vector Search (ScaNN)**: Tree-AH Quantized Vector Indexing, $p99 < 2.5\text{ms}$ at 10M+ vectors.
   - **Model Armor & Sensitive Data Protection (DLP)**: Real-time prompt sanitization, jailbreak mitigation, automated PII redaction.
2. **Ingress & Edge**:
   - Cloud Armor L7 WAF (CRS 3.3, Adaptive DDoS mitigation), External HTTPS Global Anycast Load Balancer (GCLB), Apigee X API Gateway with OIDC/OAuth2 rate-limiting.
3. **Compute Mesh**:
   - GKE Autopilot (c3-standard-8, Cilium eBPF mesh, Workload Identity Federation), Cloud Run Gen2 (Serverless Direct VPC Egress), Memorystore Redis 7.2 (Multi-AZ in-memory session cache $<1\text{ms}$).
4. **Event Streaming**:
   - Cloud Pub/Sub (10M+ msg/s, Avro/Protobuf Schema Registry), Datastream CDC (PostgreSQL/MySQL WAL sync $<1\text{s}$), Cloud Dataflow (Apache Beam, Liquid Sharding, sliding window deduplication).
5. **Storage & Multi-Region Lakehouse**:
   - Cloud Spanner (`nam3` Multi-Region, TrueTime API $<5\text{ms}$, 99.999% SLA), BigQuery Lakehouse (BigLake Iceberg on GCS, BI Engine), Cloud Storage (Dual-Region, CMEK FIPS 140-3, Object Lock WORM).
6. **Zero-Trust Security**:
   - VPC Service Controls (VPC-SC perimeter), Keyless Workload Identity (SPIFFE/OIDC), Cloud KMS HSM (AES-256 auto-rotation), Secret Manager, Dataplex Catalog & Lineage, Cloud SCC Premium SIEM.

---

## 📐 3. Connector Geometry & Collision Avoidance Laws

### Rule 1: Point-to-Point Direct Straightness
When two connected cards have identical horizontal or vertical alignment, ALWAYS enforce direct straight lines:
- **Horizontal Direct Straight**: Set $Y_{\text{exit}} = Y_{\text{entry}}$ and `edgeStyle=none;` (e.g. `⓬a Vector RAG`, `⓭ Clean Prompt`, `⓮ RAG Context`, `⓰ BigLake Sync`, `❼ WAL CDC`).
- **Vertical Direct Straight**: Set $X_{\text{exit}} = X_{\text{entry}}$ and `edgeStyle=none;` (e.g. Ingress pipeline `❶`, `❷`, `❸`).

### Rule 2: Non-Overlapping Inter-Zone Channel Routing
- **CDC Event Publication (`❻`)**: Route through the open inter-zone channel at $X=824\text{px}$, dropping down to $Y=502\text{px}$ (cleanly below the Zone 3 title and above the Pub/Sub card).
- **ReAct Feedback Loop (`⓯`)**: Gemini to GKE loops above the zones along waypoint $Y=78\text{px}$, entering GKE top at $X=520\text{px}$ (in the $100\text{px}$ open gap between "APPLICATION CORE MESH" and the "VPC" subnet badge).
- **Streaming ETL to Lakehouse (`⓫`)**: Exits Dataflow at $Y=677.5\text{px}$, travels down channel $X=835\text{px}$ to $Y=742\text{px}$, and enters BigQuery bottom at $X=1242.5\text{px}$.

### Rule 3: High-Contrast Label Pill Badges
Every edge label MUST be enclosed in an opaque pill badge so text is never intersected by lines:
```html
<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:inline-flex;align-items:center;gap:3.5px;background:#FFFFFF;padding:1.5px 4.5px;border-radius:4px;border:1px solid #CBD5E1;box-shadow:0 1px 2px rgba(0,0,0,0.06);">
  <span style="color:#FFFFFF;background:${color};font-size:7.5px;font-weight:800;padding:1px 3.5px;border-radius:2.5px;">${step}</span>
  <span style="color:#0F172A;font-size:8px;font-weight:750;white-space:nowrap;">${label}</span>
</div>
```

---

## 🎨 4. Typed 6-Color Connector Palette

| Flow Type | Color Code | Style Definition | Example Usage |
| :--- | :--- | :--- | :--- |
| **Ingress & API** | `#0284C7` / `#2563EB` | Solid (`strokeWidth=2`) | HTTPS 443, WAF Terminated, mTLS / gRPC |
| **Event Stream / CDC** | `#EA580C` / `#D97706` | Dashed (`dashed=1;dashPattern=5 4;`) | WAL CDC, Publish CDC, Liquid Sharding |
| **Transactional DB** | `#059669` | Solid (`strokeWidth=2`) | ACID Transact into Cloud Spanner |
| **AI / RAG / Guardrail** | `#7C3AED` / `#6D28D9` | Dashed (`dashed=1;dashPattern=5 4;`) | Vector RAG, Model Armor DLP Filter |
| **ReAct Tool Loop** | `#9333EA` | Dashed (`dashed=1;dashPattern=5 4;`) | Closed-Loop Autonomous Tool Calling |
| **Lakehouse & Evals** | `#0D9488` / `#64748B` | Solid / Dashed | BigLake Metadata Sync, LLM Evals & Tracing |

---

## 🧪 5. Automated Verification & Quality Gate Script

Before declaring any diagram complete, execute this headless Puppeteer script to ensure zero DOM clipping and inspect screenshot outputs:

```javascript
// scratch/verify_diagram.js
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function verifyDiagram(xmlContent, outputPngPath) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1720, height: 1040, deviceScaleFactor: 2 });

  const config = {
    xml: xmlContent,
    lightbox: true,
    nav: true,
    resize: true,
    toolbar: 'zoom layers tags',
    border: 10,
    transparent: false,
    fit: true,
    'max-scale': 4,
  };

  await page.setContent(`<!doctype html>
<html><head><meta charset="utf-8"><style>
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#f8fafc;}
#diagram{width:100%;min-height:100%;display:flex;align-items:center;justify-content:center;}
.mxgraph>svg{width:100%!important;max-width:100%!important;height:auto!important;display:block!important;}
</style></head><body><div id="diagram" class="mxgraph"></div></body></html>`);

  await page.evaluate((cfg) => {
    document.getElementById('diagram').setAttribute('data-mxgraph', cfg);
  }, JSON.stringify(config));

  await page.addScriptTag({ path: path.resolve('public/viewer-static.min.js') });
  await page.waitForSelector('#diagram svg', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: outputPngPath, fullPage: false });
  await browser.close();
  console.log(`Verified visual screenshot: ${outputPngPath}`);
}
```

---

## 🚫 6. Forbidden Anti-Patterns (Zero-Defect Checklist)

- ❌ **No Emoji Placeholders**: Never use `⚡`, `🧠`, `📊`, `🛡️` for GCP services. Always import authentic SVGs from `gcpIcons.ts`.
- ❌ **No Diagonal / Stepped Jogs**: Never connect adjacent cards with default `exitY=0.5;entryY=0.5` without computing matching coordinates.
- ❌ **No Line Slicing Across Text**: Connector paths must never intersect node text, subtitles, or zone headers.
- ❌ **No Trailing White Space**: Vertical card stacks must fill zone height with equal padding.
- ❌ **No Unverified External URLs**: Diagrams must render 100% offline with inline SVG and native fonts.
- ❌ **No Unaddressable Ephemeral State**: Never store version mutations solely in volatile memory. Every snapshot must be synchronized to the URL query string (`?id=...&v=...`) and persist in client storage across browser refreshes.
- ❌ **No Missing Reload Verification**: E2E test scripts must assert `page.url()` and execute `page.reload()` to guarantee state persistence.
