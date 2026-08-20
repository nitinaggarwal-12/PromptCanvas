/** Blueprint 40 — Pharma Genomics & Drug Discovery Pipeline with Agentic AI. */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={bigquery:`${BASE}bigquery-512-color.svg`,storage:`${BASE}cloud-storage-512-color.svg`,vertex:`${BASE}vertexai-512-color.svg`,gke:`${BASE}gke-512-color.svg`};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;`,x,70,w,610),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;`,x+14,84,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.3;',x+55,78,w-68,46)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon?:string,fill='#FFFFFF')=>{const i=icon?img(`${id}_icon`,icon,x+13,y+Math.max(10,(h-34)/2),34,34):'';const tx=icon?x+57:x+14,tw=icon?w-69:w-28;return [v(id,'',`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;`,x,y,w,h),i,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');};
const edge=(id:string,s:string,t:string,label:string,color='#2563EB',dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.7;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildPharmaGenomicsPhase1Xml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>PHARMA GENOMICS & DRUG DISCOVERY WITH AGENTIC AI</b>   Sequencing/clinical/literature/assay data → reproducible bioinformatics → governed evidence → AI/agent-assisted hypothesis generation → scientist review → wet-lab/clinical feedback.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.3;align=center;verticalAlign=middle;',30,20,1700,38));

 c.push(zone('sources',1,'SCIENTIFIC & CLINICAL SOURCES','Preserve original evidence and consent/provenance context',30,250,'#1A73E8','#EFF6FF'));
 c.push(card('seq','Sequencing data','FASTQ / BAM / CRAM / VCF from approved sequencing and analysis workflows',50,142,210,84,'#1A73E8'));
 c.push(card('clinical','Clinical / phenotype data','De-identified or appropriately governed patient/phenotype/response data with consent/use controls',50,248,210,96,'#1A73E8'));
 c.push(card('literature','Literature & knowledge sources','PubMed / internal research / target evidence / curated databases according to license and policy',50,366,210,96,'#1A73E8'));
 c.push(card('assay','Compound & assay data','Screening results • structures • potency • ADME/tox • experimental metadata',50,484,210,88,'#1A73E8'));
 c.push(card('source_policy','Required source envelope','Study/project • owner • source/version • consent/use purpose • classification • lineage • retention',50,594,210,52,'#D93025',undefined,'#FFF7F7'));

 c.push(zone('bio',2,'BIOINFORMATICS & COMPUTE','Reproducible pipelines—not a fictitious TPU/GATK product',300,300,'#0F8B82','#ECFDF5'));
 c.push(card('raw','Cloud Storage raw/curated zones','Versioned original and derived scientific files with retention/immutability policy as required',320,142,260,86,'#0F8B82',ICON.storage));
 c.push(card('gatk','GKE / Batch variant-calling compute','GATK and approved bioinformatics containers on CPU/GPU resources appropriate to the tool; no blanket TPU assumption.',320,250,260,96,'#0F8B82',ICON.gke));
 c.push(card('workflow','Workflow orchestration','Nextflow/Cromwell/Workflows or approved orchestration • retries • provenance • deterministic parameters',320,368,260,92,'#0F8B82'));
 c.push(card('qc','QC & reproducibility gate','Sample identity • sequencing QC • reference build • tool/container version • checksums • failure/quarantine path',320,482,260,94,'#0F8B82'));
 c.push(card('cost','Compute strategy','Spot/accelerator choices are workload-benchmarked; no universal cost-reduction claim.',320,598,260,48,'#E87900','#FFF7ED'));

 c.push(zone('knowledge',3,'CLINICO-GENOMIC & DISCOVERY FOUNDATION','Link variants, phenotype, literature and experiment evidence',620,300,'#6554C0','#F5F3FF'));
 c.push(card('bq','BigQuery clinico-genomic lakehouse','Curated variants • annotations • phenotype/response links • cohort/assay marts • governed analytical features',640,142,260,96,'#6554C0',ICON.bigquery));
 c.push(card('annotations','Variant & target annotation','Approved annotation sources • gene/variant/target identifiers • evidence strength • versioned reference data',640,260,260,94,'#6554C0'));
 c.push(card('retrieval','Literature / knowledge retrieval','Agent Search / RAG Engine or approved retrieval pattern with citations and source licensing controls',640,376,260,94,'#6554C0'));
 c.push(card('protein','Protein-structure workload','Approved structure-prediction/design workload (for example AlphaFold where licensed/appropriate); record model/version/input provenance.',640,492,260,104,'#6554C0'));
 c.push(card('share','Data products','Curated evidence tables/APIs for research teams with project/role-based access and lineage.',640,618,260,28,'#6554C0'));

 c.push(zone('ai',4,'AI & AGENTIC DISCOVERY','Generate hypotheses with evidence, tools and explicit uncertainty',940,300,'#B83280','#FDF2F8'));
 c.push(card('models','Vertex AI / approved models','Use Model Garden or institution-approved custom/domain models; do not present “Gemini Bio” as a Google product.',960,142,260,98,'#B83280',ICON.vertex));
 c.push(card('agents','Research agent workflow','Target evidence • literature synthesis • cohort query • compound prioritization through explicit governed tools',960,262,260,96,'#B83280'));
 c.push(card('mcp','MCP / APIs — governed tools','Registered tools expose BigQuery, retrieval, scientific services and approved enterprise systems with least privilege.',960,380,260,94,'#B83280'));
 c.push(card('score','Hypothesis / candidate scoring','Evidence-backed ranking with uncertainty, source attribution and deterministic calculation/tool results where appropriate',960,496,260,94,'#B83280'));
 c.push(card('eval','Evaluation & traceability','Task success • citation/grounding quality • reproducibility • model/tool versions • failure analysis',960,612,260,34,'#B83280'));

 c.push(zone('review',5,'SCIENTIST REVIEW & EXPERIMENT','Humans retain scientific authority before wet-lab or consequential actions',1260,270,'#D93025','#FEF2F2'));
 c.push(card('reviewer','Scientist / translational review','Review evidence, biological plausibility, uncertainty, conflicting sources and experimental feasibility.',1280,142,230,98,'#D93025','#FFF7F7'));
 c.push(card('approve','Decision gate','APPROVE experiment • REQUEST MORE EVIDENCE • REVISE hypothesis • REJECT. Record reviewer and rationale.',1280,262,230,100,'#D93025','#FFF7F7'));
 c.push(card('experiment','Wet-lab / experimental workflow','Approved assay/design request enters laboratory/LIMS workflow; agent does not autonomously command experiments.',1280,384,230,98,'#E87900','#FFF7ED'));
 c.push(card('results','Experimental results','Measured outcomes, negative results and protocol metadata return with lineage to the originating hypothesis.',1280,504,230,94,'#E87900','#FFF7ED'));
 c.push(card('learn','Controlled learning loop','Update evidence/model/evaluation dataset through governed lifecycle—not uncontrolled self-modification.',1280,620,230,26,'#0F8B82','#ECFDF5'));

 c.push(zone('controls',6,'SECURITY, GOVERNANCE & VALIDATION','Cross-cutting regulated research controls',1550,180,'#334155','#F8FAFC'));
 c.push(card('identity','Identity & access','IAM • least privilege • project/study boundaries • service/workload identities',1570,142,140,96,'#334155'));
 c.push(card('privacy','Privacy & data protection','Sensitive Data Protection where applicable • de-identification policy • consent/use-purpose controls',1570,260,140,108,'#334155'));
 c.push(card('network','Network & exfiltration','Private connectivity / VPC Service Controls only for supported services • controlled egress • audit',1570,390,140,100,'#334155'));
 c.push(card('modelgov','Model & software validation','Versioned containers/models/prompts/tools • qualification/validation evidence appropriate to intended use',1570,512,140,108,'#334155'));
 c.push(card('records','Records & audit','Source/result lineage • approvals • experiment linkage • retention • change history',1570,642,140,28,'#334155'));

 c.push(edge('e1','seq','raw','scientific files')); c.push(edge('e2','qc','bq','validated variants','#0F8B82')); c.push(edge('e3','bq','agents','governed evidence','#6554C0')); c.push(edge('e4','retrieval','agents','cited literature','#6554C0')); c.push(edge('e5','score','reviewer','ranked hypothesis','#B83280')); c.push(edge('e6','approve','experiment','approved experiment','#E87900')); c.push(edge('e7','results','bq','labeled outcomes','#0F8B82',true,0,.5,1,.85)); c.push(edge('e8','results','eval','evaluation signal','#0F8B82',true,0,.7,1,.75));
 c.push(v('footer','<b>PRIVATE CONNECTIVITY NOTE:</b> Private Service Connect is used only for supported private service endpoints; it is not a transitive routing mesh. Any cross-project/network access must be explicitly designed and authorized.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;',30,710,1700,54));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="pharma_genomics_drug_discovery_phase1" name="Pharma-Specific Genomics & Drug Discovery Pipeline with Agentic AI"><mxGraphModel dx="1760" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="790" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
