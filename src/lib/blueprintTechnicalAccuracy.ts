/**
 * Phase 1 / Phase 3.2+ — high-confidence terminology/claim corrections plus narrowly
 * scoped render repairs for legacy builders that still need them.
 */
const HIGH_CONFIDENCE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cloud Source Repositories/gi, 'Secure Source Manager'],
  [/Cloud Source Repos/gi, 'Secure Source Manager'],
  [/Dataplex Universal Catalog/gi, 'Knowledge Catalog'],
  [/Dataplex Data Catalog/gi, 'Knowledge Catalog'],
  [/Dataplex Policy Controller/gi, 'Knowledge Catalog & data policy'],
  [/DATAPLEX INTEGRATED DATAOPS CONTROL PLANE\s*&\s*ANOMALY DETECTION ENGINE/gi, 'DATAOPS GOVERNANCE, QUALITY & ANOMALY CONTROL PLANE'],
  [/Cloud DLP/gi, 'Sensitive Data Protection'],
  [/Vertex AI Matching Engine/gi, 'Vertex AI Vector Search'],
  [/Anthos Service Mesh/gi, 'Cloud Service Mesh'],
  [/Cloud Functions/gi, 'Cloud Run functions'],
  [/Global L7 HTTPS Load Balancing/gi, 'Cloud Load Balancing'],
  [/Global HTTPS Load Balancer/gi, 'Cloud Load Balancing'],
  [/Global HTTP\(S\) Load Balancer/gi, 'Cloud Load Balancing'],
  [/Cloud Global Load Balancer/gi, 'Cloud Load Balancing'],
  [/SIEM\s*&\s*Chronicle/gi, 'Google Security Operations'],
  [/Google Chronicle/gi, 'Google Security Operations'],
  [/\bChronicle\b/gi, 'Google Security Operations'],
  [/Gemini 3\.7 Pro Vision/gi, 'Gemini multimodal model'],
  [/Gemini 3\.7 Flash\s*\/\s*Pro/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7 Flash/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7/gi, 'Gemini'],
  [/Gemini 2\.5 Pro Multimodal Synthesizer/gi, 'Gemini (approved multimodal model)'],
  [/Gemini Bio Foundation Models/gi, 'Approved biopharma foundation models'],
  [/GCS Secure Bucket/gi, 'Cloud Storage corpus'],
  [/Vertex AI Search\s*&\s*RAG/gi, 'Agent Search / RAG Engine'],
  [/\bTHOUGHT\s*:/gi, 'Planner decision:'],
  [/GCP Sovereign Region/gi, 'Google Cloud region with sovereign controls'],
  [/Vertex AI Local Sovereign Inference/gi, 'Vertex AI inference (approved region)'],
  [/AGENTIC PSC HUB/gi, 'PRIVATE SERVICE CONNECTIVITY'],
  [/Transitively Routing Mesh/gi, 'Private service endpoints (non-transitive)'],
  [/GKE Spot\s*&\s*TPU Compute Cluster\s*\(GATK Variant Calling\)/gi, 'GKE / Batch variant-calling compute (GATK)'],
  [/Automated Tax-Loss Harvester/gi, 'Tax-Loss Harvesting Recommendation'],
  [/100%\s+Compliant/gi, 'Compliance status: validate'],
  [/100%\s+Validated/gi, 'Validation target: workload-defined'],
  [/100%\s+Traceable(?:\s+Embeddings)?/gi, 'Traceability target: workload-defined'],
  [/0\s+Incidents/gi, 'Incident target: workload-defined'],
  [/0\s+Blocked/gi, 'Policy violations: monitor'],
  [/0\s+Errors\s*\/\s*Alerts/gi, 'Errors/alerts: monitor'],
  [/SOC\s*2\s*&\s*CSV\s+Certified\s+Gold\s+Tier/gi, 'SOC 2 / validation evidence: verify requirements'],
  [/cost[- ]optimized spot provisioning saving up to 80%/gi, 'cost optimization target validated from workload benchmarks'],
  [/up to 80%\s+cost reduction/gi, 'workload-validated cost optimization target'],
  [/80%\s+cost reduction/gi, 'workload-validated cost optimization target'],
  [/sub[- ]100\s*ms/gi, 'workload-defined latency target'],
  [/<\s*100\s*ms/gi, 'workload-defined latency target'],
];

type RenderPatch = { id: string; x: number; y: number; width: number; height: number; fillColor?: string; strokeColor?: string };
function setStyleValue(style:string,key:string,value:string):string{const re=new RegExp(`((?:^|;)${key}=)[^;]*`,'i');if(re.test(style))return style.replace(re,(_f,p:string)=>`${p}${value}`);return`${style}${style&&!style.endsWith(';')?';':''}${key}=${value};`;}
function setGeometryValue(attrs:string,key:string,value:number):string{const re=new RegExp(`(\\b${key}=")[^"]*(")`,'i');if(re.test(attrs))return attrs.replace(re,(_f,p:string,s:string)=>`${p}${value}${s}`);return`${attrs} ${key}="${value}"`;}
function patchVertex(xml:string,patch:RenderPatch):string{const re=new RegExp(`<mxCell\\b([^>]*\\bid="${patch.id}"[^>]*\\bvertex="1"[^>]*)>([\\s\\S]*?)<\\/mxCell>`,'i');return xml.replace(re,(_f,attrs:string,body:string)=>{let a=attrs;const sm=a.match(/style="([^"]*)"/i);if(sm){let st=sm[1];if(patch.fillColor)st=setStyleValue(st,'fillColor',patch.fillColor);if(patch.strokeColor)st=setStyleValue(st,'strokeColor',patch.strokeColor);a=a.replace(sm[0],`style="${st}"`);}const gm=body.match(/<mxGeometry\b([^>]*?)(?:\/)?\s*>/i);if(!gm)return`<mxCell${a}>${body}</mxCell>`;let ga=(gm[1]||'').trimEnd();ga=setGeometryValue(ga,'x',patch.x);ga=setGeometryValue(ga,'y',patch.y);ga=setGeometryValue(ga,'width',patch.width);ga=setGeometryValue(ga,'height',patch.height);if(!/\bas="geometry"/i.test(ga))ga+=' as="geometry"';return`<mxCell${a}>${body.replace(gm[0],`<mxGeometry ${ga.trim()}/>` )}</mxCell>`;});}

/** These are only for still-legacy builders. New Phase-1 builders must fix geometry at source.
 * In particular #39 is intentionally absent: its Phase-1 `ops` is a right-side column, and
 * applying the old footer repair would create the giant empty panel seen in rendered QA. */
const KNOWN_RENDER_REPAIRS: Record<string, RenderPatch[]> = {
  tech_data_lakehouse_gcp:[
    {id:'consume',x:25,y:680,width:1710,height:245,fillColor:'#F8FAFC',strokeColor:'#334155'},
    {id:'consume_n',x:39,y:695,width:30,height:30,fillColor:'#334155',strokeColor:'#334155'},
    {id:'consume_h',x:79,y:690,width:1642,height:45},
  ],
  tech_ai_trism_guardrails:[
    {id:'ops',x:25,y:680,width:1710,height:255,fillColor:'#F8FAFC',strokeColor:'#334155'},
    {id:'ops_n',x:39,y:695,width:30,height:30,fillColor:'#334155',strokeColor:'#334155'},
    {id:'ops_h',x:79,y:690,width:1642,height:45},
  ],
  tech_multimodal_ingestion:[
    {id:'controls',x:25,y:680,width:1710,height:245,fillColor:'#F8FAFC',strokeColor:'#334155'},
    {id:'controls_n',x:39,y:695,width:30,height:30,fillColor:'#334155',strokeColor:'#334155'},
    {id:'controls_h',x:79,y:690,width:1642,height:44},
  ],
  tech_llm_capacity_quota:[
    {id:'patterns',x:25,y:660,width:1710,height:260,fillColor:'#F5F3FF',strokeColor:'#6554C0'},
    {id:'patterns_n',x:39,y:675,width:30,height:30,fillColor:'#6554C0',strokeColor:'#6554C0'},
    {id:'patterns_h',x:79,y:670,width:1642,height:44},
  ],
  smart_factory_iot:[
    {id:'ops',x:25,y:690,width:1700,height:230,fillColor:'#F8FAFC',strokeColor:'#334155'},
    {id:'ops_n',x:39,y:705,width:30,height:30,fillColor:'#334155',strokeColor:'#334155'},
    {id:'ops_h',x:79,y:700,width:1632,height:45},
  ],
};

export function applyKnownBlueprintRenderRepairs(xml:string,architectureId?:string|null):string{if(!xml)return xml;const id=String(architectureId||'').toLowerCase();const patches=KNOWN_RENDER_REPAIRS[id];if(!patches?.length)return xml;let next=patches.reduce((current,patch)=>patchVertex(current,patch),xml);if(!next.includes(`pc-known-render-repair:${id}`))next=next.replace(/(<mxGraphModel\b)/,`<!-- pc-known-render-repair:${id} -->\n$1`);return next;}
export function findInvalidNumericDrawioColors(xml:string):string[]{return Array.from(xml.matchAll(/(?:fillColor|strokeColor)=([0-9]{2,6})(?=;|\")/gi),m=>m[0]);}
export function applyBlueprintTechnicalAccuracy(xml:string):string{if(!xml||xml.includes('pc-technical-accuracy-3-2'))return xml;let next=HIGH_CONFIDENCE_REPLACEMENTS.reduce((current,[pattern,replacement])=>current.replace(pattern,replacement),xml);const canonicalId=next.match(/pc-catalog-id:([a-z0-9_]+)/i)?.[1]||null;next=applyKnownBlueprintRenderRepairs(next,canonicalId);return next.replace(/(<mxGraphModel\b)/,'<!-- pc-technical-accuracy-3-2 -->\n$1');}
