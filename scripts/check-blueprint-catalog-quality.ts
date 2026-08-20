import { createHash } from 'crypto';
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '../src/lib/blueprintKnowledgeMatrixNormalized';
import { getDefaultXmlForArchitecture, normalizeArchitectureId } from '../src/lib/architectureTypesCertified';
import { CATALOG_CANONICAL_IDS } from '../src/lib/blueprintExactResolver';
import { findInvalidNumericDrawioColors } from '../src/lib/blueprintTechnicalAccuracy';

const NOTATION_SENSITIVE = new Set(['erd','sequence_diagram','tech_c4_system_context','c4_component_lld','bpmn_process_workflow','threat_modeling_stride','data_lineage_provenance']);
const RENDER_REPAIR_IDS = new Set(['tech_data_lakehouse_gcp','tech_ai_trism_guardrails','tech_multimodal_ingestion','tech_llm_capacity_quota','smart_factory_iot']);
const STALE_PATTERNS: Array<[string, RegExp]> = [
  ['Gemini 3.7', /Gemini\s+3\.7/i],['Cloud Source Repositories', /Cloud Source Repositories/i],['Dataplex Data Catalog', /Dataplex Data Catalog/i],['Dataplex Universal Catalog', /Dataplex Universal Catalog/i],['Cloud DLP', /Cloud DLP/i],['Anthos Service Mesh', /Anthos Service Mesh/i],['Global HTTPS Load Balancer', /Global HTTPS Load Balancer/i],
];
const EMOJI_RE=/\p{Extended_Pictographic}/gu;
const GENERIC_BRAND_IMAGE_PATTERNS:Array<[string,RegExp]>=[
  ['generic Google/GCP renaissance image',/MultiPath_Bottom_2X_Centered_static\.png/i],
];
const hash=(xml:string)=>createHash('sha256').update(xml).digest('hex');
const diagramId=(xml:string)=>xml.match(/<diagram\b[^>]*\bid="([^"]+)"/i)?.[1]||'';
const fontSizes=(xml:string)=>[...Array.from(xml.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi),m=>Number(m[1])),...Array.from(xml.matchAll(/fontSize=(\d+(?:\.\d+)?)/gi),m=>Number(m[1]))].filter(Number.isFinite);
function assertContains(xml:string,tokens:string[],label:string,failures:string[]){const lower=xml.toLowerCase(),missing=tokens.filter(t=>!lower.includes(t.toLowerCase()));if(missing.length)failures.push(`${label}: missing ${missing.join(', ')}`);}
function vertexGeometry(xml:string,id:string){const cell=xml.match(new RegExp(`<mxCell\\b[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<mxGeometry\\b([^>]*)`,'i'));if(!cell)return null;const attrs=cell[1]||'',num=(name:string)=>Number(attrs.match(new RegExp(`\\b${name}="([^"]+)"`,'i'))?.[1]);return{x:num('x'),y:num('y'),width:num('width'),height:num('height')};}
function assertFooterZone(xml:string,id:string,label:string,failures:string[]){const g=vertexGeometry(xml,id);if(!g){failures.push(`${label}: missing footer vertex ${id}`);return;}if(!Number.isFinite(g.x)||!Number.isFinite(g.y)||!Number.isFinite(g.width)||!Number.isFinite(g.height)){failures.push(`${label}: non-numeric footer geometry`);return;}if(g.x<0||g.x>80)failures.push(`${label}: footer x out of range (${g.x})`);if(g.y<500)failures.push(`${label}: footer is too high on canvas (${g.y})`);if(g.width<1500)failures.push(`${label}: footer is too narrow (${g.width})`);if(g.height<160||g.height>340)failures.push(`${label}: footer height out of range (${g.height})`);}
function assertRightOpsColumn(xml:string,id:string,label:string,failures:string[]){const g=vertexGeometry(xml,id);if(!g){failures.push(`${label}: missing operations vertex ${id}`);return;}if(g.x<1450||g.y>120||g.width<150||g.width>260||g.height<500||g.height>680)failures.push(`${label}: expected right-side operations column, got ${g.width}x${g.height} @ (${g.x},${g.y})`);}
function countGenericGeneratedCardIcons(xml:string):number{return Array.from(xml.matchAll(/<mxCell\b[^>]*\bid="[^"]+_i"[^>]*\bstyle="[^"]*shape=image;[^"]*image=data:image\/svg\+xml/gi)).length;}

const failures:string[]=[],advisories:string[]=[];
if(BLUEPRINT_KNOWLEDGE_MATRIX.length!==50)failures.push(`catalog size: expected 50, got ${BLUEPRINT_KNOWLEDGE_MATRIX.length}`);
if(CATALOG_CANONICAL_IDS.length!==50||new Set(CATALOG_CANONICAL_IDS).size!==50)failures.push('canonical resolver: expected 50 unique IDs');
const canonicalIds=BLUEPRINT_KNOWLEDGE_MATRIX.map(item=>normalizeArchitectureId(item.combinedId));
if(new Set(canonicalIds).size!==50)failures.push(`canonical normalization collision: got ${new Set(canonicalIds).size} unique IDs`);
const diagramIds=new Map<string,number[]>(),hashes=new Map<string,number[]>(),outputs=new Map<number,string>();

BLUEPRINT_KNOWLEDGE_MATRIX.forEach((item,index)=>{
 const number=index+1,canonicalId=canonicalIds[index],notationSensitive=NOTATION_SENSITIVE.has(canonicalId),xml=getDefaultXmlForArchitecture(item.combinedId)||'';outputs.set(number,xml);
 if(!xml||!/<mxGraphModel\b/i.test(xml)||!/<root>/i.test(xml)||!/<\/root>/i.test(xml)){failures.push(`#${number} ${canonicalId}: unresolved/invalid XML`);return;}
 if(/\/\/>/.test(xml))failures.push(`#${number} ${canonicalId}: malformed self-closing XML token //>`);
 if(RENDER_REPAIR_IDS.has(canonicalId)){const invalidColors=findInvalidNumericDrawioColors(xml);if(invalidColors.length)failures.push(`#${number} ${canonicalId}: invalid numeric Draw.io colors: ${invalidColors.join(', ')}`);if(!xml.includes(`pc-known-render-repair:${canonicalId}`))failures.push(`#${number} ${canonicalId}: known render repair marker missing`);}
 const id=diagramId(xml);if(id)diagramIds.set(id,[...(diagramIds.get(id)||[]),number]);const fp=hash(xml);hashes.set(fp,[...(hashes.get(fp)||[]),number]);
 if(canonicalId!=='unified_system_view'&&!xml.includes(`pc-catalog-id:${canonicalId}`))failures.push(`#${number} ${canonicalId}: canonical identity marker missing`);
 const stale=STALE_PATTERNS.filter(([,p])=>p.test(xml)).map(([name])=>name);if(stale.length)failures.push(`#${number} ${canonicalId}: stale ${stale.join(', ')}`);
 const badBrand=GENERIC_BRAND_IMAGE_PATTERNS.filter(([,p])=>p.test(xml)).map(([name])=>name);if(badBrand.length)failures.push(`#${number} ${canonicalId}: forbidden generic service branding: ${badBrand.join(', ')}`);
 if(!notationSensitive){
   if(!xml.includes('pc-text-containment-v1'))failures.push(`#${number} ${canonicalId}: containment missing`);
   if(!xml.includes('pc-semantic-icons-v1'))failures.push(`#${number} ${canonicalId}: semantic-icons missing`);
   if(!xml.includes('pc-final-catalog-sanitize-v1'))failures.push(`#${number} ${canonicalId}: final readability sanitizer missing`);
   if((xml.match(EMOJI_RE)||[]).length)failures.push(`#${number} ${canonicalId}: emoji placeholder remains`);
   const tiny=fontSizes(xml).filter(size=>size<9.5);if(tiny.length)failures.push(`#${number} ${canonicalId}: ${tiny.length} font declarations below 9.5px`);
   const genericCardIcons=countGenericGeneratedCardIcons(xml);if(genericCardIcons)failures.push(`#${number} ${canonicalId}: ${genericCardIcons} generated card(s) still use an inline generic GCP mark`);
   const vertices=Array.from(xml.matchAll(/<mxCell\b[^>]*\bvertex="1"/gi)).length,edges=Array.from(xml.matchAll(/<mxCell\b[^>]*\bedge="1"/gi)).length;
   if(vertices<6)advisories.push(`#${number} ${canonicalId}: visually sparse (${vertices} vertices); inspect intentionally`);
   if(edges===0&&!['cloud_finops_chargeback','six_rs_migration_matrix','ai_coe_operating_model'].includes(canonicalId))advisories.push(`#${number} ${canonicalId}: no explicit flow edge; verify this is intentional`);
 }else{
   if(xml.includes('pc-semantic-icons-v1'))failures.push(`#${number} ${canonicalId}: notation was icon-card transformed`);
   if(xml.includes('pc-text-containment-v1'))failures.push(`#${number} ${canonicalId}: notation was containment transformed`);
   if(xml.includes('pc-final-catalog-sanitize-v1'))failures.push(`#${number} ${canonicalId}: notation was final-sanitizer transformed`);
 }
});
for(const[id,nums]of diagramIds)if(nums.length>1)failures.push(`duplicate diagram id ${id}: ${nums.join(', ')}`);for(const[fp,nums]of hashes)if(nums.length>1)failures.push(`duplicate XML ${fp.slice(0,12)}: ${nums.join(', ')}`);
const bp6=outputs.get(6)||'';assertContains(bp6,['Connectors','Gemini Notebook','Skills','Agent Gallery','Agent Platform'],'#6 capability portfolio',failures);
const bp9=outputs.get(9)||'';assertFooterZone(bp9,'consume','#9 lakehouse analytics/AI/data-products plane',failures);
const bp20=outputs.get(20)||'';assertContains(bp20,['Network Connectivity Center','Cloud Interconnect','HA VPN','Cross-Cloud Interconnect','Workforce Identity Federation','Workload Identity Federation'],'#20 hybrid multi-cloud',failures);
const bp22=outputs.get(22)||'';assertFooterZone(bp22,'ops','#22 TRiSM operations plane',failures);
const bp26=outputs.get(26)||'';assertContains(bp26,['Eventarc','Pub/Sub','Cloud Run','Cloud Tasks','idempotency'],'#26 serverless EDA',failures);
const bp27=outputs.get(27)||'';assertFooterZone(bp27,'controls','#27 multimodal controls plane',failures);
const bp33=outputs.get(33)||'';assertFooterZone(bp33,'patterns','#33 capacity resilience plane',failures);
const bp34=outputs.get(34)||'';assertContains(bp34,['Assistant','Connectors','Gemini Notebook','Skills','Agent Gallery','Agent Designer','Agent Runtime'],'#34 capability portfolio',failures);
const bp39=outputs.get(39)||'';assertRightOpsColumn(bp39,'ops','#39 predictive maintenance operations',failures);
const bp42=outputs.get(42)||'';assertFooterZone(bp42,'ops','#42 smart factory operations plane',failures);
if(hash(bp39)===hash(bp42))failures.push('#39/#42 resolved identically');assertContains(bp39,['Predictive Maintenance','Manufacturing Connect','Maintenance'],'#39 predictive maintenance',failures);assertContains(bp42,['Digital Twin','ISA-95','OEE'],'#42 smart factory',failures);
const bp50=outputs.get(50)||'';assertContains(bp50,['MCP Gateway','MCP Client','Remote MCP','Cloud Run'],'#50 MCP gateway',failures);
const report={catalogCount:BLUEPRINT_KNOWLEDGE_MATRIX.length,canonicalCount:new Set(canonicalIds).size,resolvedCount:outputs.size,uniqueDiagramIds:diagramIds.size,uniqueFingerprints:hashes.size,failures,advisories};console.log(JSON.stringify(report,null,2));
if(failures.length){console.error(`\nBlueprint final certification FAILED with ${failures.length} release-blocking issue(s).`);process.exit(1);}console.log(`\nBlueprint final certification PASSED for ${BLUEPRINT_KNOWLEDGE_MATRIX.length} blueprints.`);if(advisories.length)console.log(`${advisories.length} non-blocking visual advisory item(s) remain in the report for intentional review.`);
