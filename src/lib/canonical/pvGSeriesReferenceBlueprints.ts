import { GOOGLE_CLOUD_OFFICIAL_SVG } from '@/lib/gcpOfficialSvgAssets';

function esc(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function gcpIconUri(key: keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG): string {
  const raw = GOOGLE_CLOUD_OFFICIAL_SVG[key] || GOOGLE_CLOUD_OFFICIAL_SVG.vertex_ai;
  return `data:image/svg+xml,${encodeURIComponent(raw).replace(/;/g, '%3B')}`;
}

function wrapDrawioEnvelope(diagramId: string, diagramName: string, cells: string[], pageW = 1536, pageH = 858): string {
  return (
    `<mxfile host="PromptCanvas" modified="2026-10-26T22:50:00.000Z" agent="PromptCanvas G-Series Canonical Compiler" version="24.7.8" type="device">` +
    `<diagram id="${esc(diagramId)}" name="${esc(diagramName)}">` +
    `<mxGraphModel dx="${pageW}" dy="${pageH}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pageW}" pageHeight="${pageH}" background="#FFFFFF" math="0" shadow="0">` +
    `<root>` +
    `<mxCell id="0"/>` +
    `<mxCell id="1" parent="0"/>` +
    `<mxCell id="canvas_bg_${esc(diagramId)}" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="${pageW}" height="${pageH}" as="geometry"/></mxCell>` +
    cells.join('') +
    `</root></mxGraphModel></diagram></mxfile>`
  );
}

function topTitleCell(id: string, title: string, pageW = 1536): string {
  const html = `<table style="width:${pageW - 40}px;border-collapse:collapse;font-family:Inter,Arial,sans-serif;"><tr><td style="text-align:center;vertical-align:middle;font-size:21px;font-weight:800;color:#0F172A;letter-spacing:-0.2px;">${esc(title)}</td></tr></table>`;
  return `<mxCell id="${id}" value="${esc(html)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="20" y="14" width="${pageW - 40}" height="40" as="geometry"/></mxCell>`;
}

/**
 * G-01 (ID '85'): C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform
 * Reference: media_1793068970407.png (1536x858)
 */
export function generateTemplate85G01C4SystemContextXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g01_title', 'G-01: C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform'));

  // Left Column Outer Container
  cells.push(
    `<mxCell id="g01_left_col" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="22" y="64" width="292" height="712" as="geometry"/></mxCell>`
  );
  const leftHdr = `<table style="width:276px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;font-size:13px;font-weight:800;line-height:1.25;">EXTERNAL ACTORS &amp;<br/>UPSTREAM SOURCES</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_left_hdr" value="${esc(leftHdr)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#3B78E7;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="22" y="64" width="292" height="58" as="geometry"/></mxCell>`
  );

  const leftCards = [
    {
      id: 'g01_l1',
      y: 142,
      h: 136,
      title: 'External AE Reporters',
      sub: '(Patients/HCPs via Web/Portal)',
      icon: 'iap' as const,
      pillId: 'g01_pill_l1',
      pillText: 'AE Case\nReports',
    },
    {
      id: 'g01_l2',
      y: 298,
      h: 136,
      title: 'Internal Clinical Safety Reviewers',
      sub: '(21 CFR Part 11 e-Sign-Off)',
      icon: 'cloud_iam' as const,
      pillId: 'g01_pill_l2',
      pillText: 'Review &\nE-Sign',
    },
    {
      id: 'g01_l3',
      y: 454,
      h: 136,
      title: 'Clinical Trial EDC & EHR Systems',
      sub: '(HL7 FHIR R4 Bundles)',
      icon: 'cloud_sql' as const,
      pillId: 'g01_pill_l3',
      pillText: 'FHIR Bundles',
    },
    {
      id: 'g01_l4',
      y: 610,
      h: 148,
      title: 'Corporate IdP',
      sub: '(OIDC/SAML 2.0) & MedDRA/WHODrug Controlled Vocabulary Dictionaries',
      icon: 'secret_manager' as const,
      pillId: 'g01_pill_l4',
      pillText: 'Identity &\nVocab Data',
    },
  ];

  for (const c of leftCards) {
    const html =
      `<table style="width:244px;border-collapse:collapse;font-family:Inter,sans-serif;">` +
      `<tr><td style="text-align:center;padding-top:34px;">` +
      `<div style="font-size:13px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(c.title)}</div>` +
      `<div style="font-size:11px;font-weight:500;color:#1E293B;line-height:1.3;margin-top:3px;">${esc(c.sub)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${c.id}" value="${esc(html)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#DCE8FA;strokeColor=#475569;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="38" y="${c.y}" width="260" height="${c.h}" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${c.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(c.icon)};" vertex="1" parent="1"><mxGeometry x="152" y="${c.y + 10}" width="32" height="32" as="geometry"/></mxCell>`
    );

    const cy = Math.round(c.y + c.h / 2);
    cells.push(
      `<mxCell id="${c.id}_edge" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.8;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="298" y="${cy}" as="sourcePoint"/><mxPoint x="502" y="${cy}" as="targetPoint"/></mxGeometry></mxCell>`
    );
    const pillHtml = `<table style="width:110px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;font-size:11px;font-weight:700;line-height:1.2;">${esc(c.pillText).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${c.pillId}" value="${esc(pillHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#4A86E8;strokeColor=#1E40AF;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="340" y="${cy - 20}" width="120" height="40" as="geometry"/></mxCell>`
    );
  }

  // Center Column Outer Container
  cells.push(
    `<mxCell id="g01_center_col" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="484" y="64" width="568" height="712" as="geometry"/></mxCell>`
  );
  const centerColHdr = `<table style="width:540px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;font-size:14px;font-weight:800;">CENTER COLUMN</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_center_hdr" value="${esc(centerColHdr)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#3B78E7;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="484" y="64" width="568" height="58" as="geometry"/></mxCell>`
  );

  // Inner Blue System Frame
  cells.push(
    `<mxCell id="g01_sys_frame" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#4A86E8;strokeColor=#1E3A8A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="502" y="140" width="532" height="618" as="geometry"/></mxCell>`
  );
  const sysTitleHtml =
    `<table style="width:450px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;">` +
    `<div style="font-size:15px;font-weight:800;line-height:1.25;">Pharmacovigilance &amp; AE AI Platform</div>` +
    `<div style="font-size:12.5px;font-weight:600;margin-top:2px;">(Google Cloud / Gemini Enterprise)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_sys_title" value="${esc(sysTitleHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="550" y="150" width="460" height="46" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g01_sys_logo" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('vertex_ai')};" vertex="1" parent="1"><mxGeometry x="516" y="154" width="34" height="34" as="geometry"/></mxCell>`
  );

  const centerBoxes = [
    {
      id: 'g01_c1',
      y: 208,
      h: 112,
      title: 'Multimodal AE Intake',
      sub: 'Document AI OCR · Speech-to-Text · Cloud Translation & FHIR Ingestion',
      icon: 'document_ai' as const,
    },
    {
      id: 'g01_c2',
      y: 348,
      h: 116,
      title: 'Gemini Agent Extraction & MedDRA Coding',
      sub: 'Vertex AI Gemini 2.5 Pro · ADK Agents · AlloyDB ScaNN Vector Search',
      icon: 'vertex_ai' as const,
    },
    {
      id: 'g01_c3',
      y: 492,
      h: 108,
      title: 'E2B(R3) Compliance Validation',
      sub: '200+ ICH / FDA FAERS / EMA EudraVigilance Rules & 21 CFR Part 11 Gate',
      icon: 'scc' as const,
    },
  ];

  for (const cb of centerBoxes) {
    const html =
      `<table style="width:320px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:14px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(cb.title)}</div>` +
      `<div style="font-size:11px;font-weight:600;color:#334155;margin-top:6px;line-height:1.3;">${esc(cb.sub)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${cb.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DCE8FA;strokeColor=#334155;strokeWidth=1.4;align=center;verticalAlign=middle;spacingLeft=32;" vertex="1" parent="1"><mxGeometry x="588" y="${cb.y}" width="364" height="${cb.h}" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${cb.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(cb.icon)};" vertex="1" parent="1"><mxGeometry x="600" y="${cb.y + 14}" width="28" height="28" as="geometry"/></mxCell>`
    );
  }

  // Vertical connectors between c1 -> c2 -> c3
  cells.push(
    `<mxCell id="g01_c1_c2" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.8;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="770" y="320" as="sourcePoint"/><mxPoint x="770" y="348" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="g01_c2_c3" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.8;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="770" y="464" as="sourcePoint"/><mxPoint x="770" y="492" as="targetPoint"/></mxGeometry></mxCell>`
  );

  // Trust & Governance Strip inside System Frame
  const govHtml =
    `<table style="width:454px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
    `<div style="font-size:13.5px;font-weight:800;color:#0F172A;">Trust &amp; Governance Strip</div>` +
    `<div style="font-size:11px;font-weight:600;color:#1E293B;margin-top:3px;line-height:1.3;">(VPC Service Controls | Cloud KMS CMEK | Cloud DLP PHI Tokenization | GAMP 5 CSV Validated)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_gov_strip" value="${esc(govHtml)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#DCE8FA;strokeColor=#334155;strokeWidth=1.4;align=center;verticalAlign=middle;spacingLeft=30;" vertex="1" parent="1"><mxGeometry x="518" y="622" width="500" height="118" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g01_gov_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('cloud_kms')};" vertex="1" parent="1"><mxGeometry x="530" y="636" width="28" height="28" as="geometry"/></mxCell>`
  );

  // Right Column Outer Container
  cells.push(
    `<mxCell id="g01_right_col" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1222" y="64" width="292" height="712" as="geometry"/></mxCell>`
  );
  const rightHdr = `<table style="width:276px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;font-size:13px;font-weight:800;line-height:1.25;">DOWNSTREAM SYSTEMS<br/>&amp; REGULATORS</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_right_hdr" value="${esc(rightHdr)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#3B78E7;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1222" y="64" width="292" height="58" as="geometry"/></mxCell>`
  );

  const rightCards = [
    {
      id: 'g01_r1',
      y: 146,
      h: 184,
      title: 'Safety Database of Record',
      sub: '(Enterprise PV Safety Vault — Dedup Query & Case Commit)',
      icon: 'spanner' as const,
      pillId: 'g01_pill_r1',
      pillText: 'Dedup &\nCommit',
      biDir: true,
    },
    {
      id: 'g01_r2',
      y: 360,
      h: 196,
      title: 'Regulatory Agencies',
      sub: '(FDA FAERS / EMA EudraVigilance — Validated ICH E2B(R3) XML AS2/Gateway)',
      icon: 'apigee' as const,
      pillId: 'g01_pill_r2',
      pillText: 'E2B(R3) XML\nAS2/Gateway',
      biDir: true,
    },
    {
      id: 'g01_r3',
      y: 586,
      h: 170,
      title: 'Immutable Audit & WORM Archive',
      sub: '(BigQuery + Cloud Storage Bucket Lock 10-Yr Retention)',
      icon: 'cloud_storage' as const,
      pillId: 'g01_pill_r3',
      pillText: 'Audit Trail &\nArchive',
      biDir: false,
    },
  ];

  for (const rc of rightCards) {
    const html =
      `<table style="width:244px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;padding-top:36px;">` +
      `<div style="font-size:13.5px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(rc.title)}</div>` +
      `<div style="font-size:11px;font-weight:500;color:#1E293B;line-height:1.35;margin-top:4px;">${esc(rc.sub)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${rc.id}" value="${esc(html)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#DCE8FA;strokeColor=#475569;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1238" y="${rc.y}" width="260" height="${rc.h}" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${rc.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(rc.icon)};" vertex="1" parent="1"><mxGeometry x="1352" y="${rc.y + 14}" width="32" height="32" as="geometry"/></mxCell>`
    );

    const cy = Math.round(rc.y + rc.h / 2);
    const arrowStyle = rc.biDir
      ? 'startArrow=block;startFill=1;endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.8;'
      : 'endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.8;';
    cells.push(
      `<mxCell id="${rc.id}_edge" value="" style="${arrowStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1034" y="${cy}" as="sourcePoint"/><mxPoint x="1238" y="${cy}" as="targetPoint"/></mxGeometry></mxCell>`
    );
    const pillHtml = `<table style="width:116px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;font-size:11px;font-weight:700;line-height:1.2;">${esc(rc.pillText).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${rc.pillId}" value="${esc(pillHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#4A86E8;strokeColor=#1E40AF;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1073" y="${cy - 21}" width="126" height="42" as="geometry"/></mxCell>`
    );
  }

  // Bottom Legend Bar
  const legHtml =
    `<table style="width:1460px;border-collapse:collapse;font-family:Inter,sans-serif;">` +
    `<tr><td style="text-align:center;font-size:13px;font-weight:800;color:#0F172A;padding-bottom:3px;border-bottom:1px solid #CBD5E1;">C4 Legend &amp; Architectural Invariants</td></tr>` +
    `<tr><td style="text-align:center;font-size:11.5px;font-weight:600;color:#1E293B;padding-top:4px;">` +
    `C4 Notation: [Person / Actor] &nbsp;·&nbsp; [Software System (#4A86E8)] &nbsp;·&nbsp; [Container (#DCE8FA)] &nbsp;·&nbsp; [Component] &nbsp;|&nbsp; Invariants: Secure By Design (VPC-SC + CMEK) &nbsp;·&nbsp; API First (FHIR R4 / E2B R3) &nbsp;·&nbsp; Immutable WORM Audit &nbsp;·&nbsp; 21 CFR Part 11 Compliance` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_legend" value="${esc(legHtml)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="22" y="786" width="1492" height="58" as="geometry"/></mxCell>`
  );

  return wrapDrawioEnvelope('canonical_85_g01', 'G-01: C4 Level 1 System Context — Pharmacovigilance & AE AI Platform', cells);
}

/**
 * G-02 (ID '86'): As-Is vs. To-Be BPMN 2.0 Process Swimlane — Adverse Event (ICSR) Case Processing
 * Reference: media_1793068976597.png (1536x858)
 */
export function generateTemplate86G02BpmnSwimlaneXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g02_title', 'G-02: As-Is vs. To-Be BPMN 2.0 Process Swimlane — Adverse Event (ICSR) Case Processing'));

  // ==================== TOP POOL: AS-IS LEGACY MANUAL ICSR WORKFLOW ====================
  cells.push(
    `<mxCell id="g02_asis_frame" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.6;" vertex="1" parent="1"><mxGeometry x="36" y="72" width="1464" height="332" as="geometry"/></mxCell>`
  );
  const asisHdr = `<table style="width:1420px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13px;font-weight:800;color:#0F172A;">AS-IS LEGACY MANUAL ICSR WORKFLOW (Cycle: 7-10 Days | Touch: 180m | Error: 14%)</td></tr></table>`;
  cells.push(
    `<mxCell id="g02_asis_hdr" value="${esc(asisHdr)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#0F172A;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="36" y="72" width="1464" height="34" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g02_asis_logo" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('vertex_ai')};" vertex="1" parent="1"><mxGeometry x="44" y="76" width="24" height="24" as="geometry"/></mxCell>`
  );

  // Left vertical green tab for As-Is
  const asisLeftTab = `<table style="width:38px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:800;color:#14532D;line-height:1.2;">AS-IS<br/>LEGACY<br/>7-10d<br/>14% Err</td></tr></table>`;
  cells.push(
    `<mxCell id="g02_asis_vtab" value="${esc(asisLeftTab)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#D9EAD3;strokeColor=#0F172A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="36" y="106" width="46" height="298" as="geometry"/></mxCell>`
  );

  const asisLanes = [
    { id: 'asis_l1', y: 106, h: 74, label: 'AE Reporter\n(Fax/PDF/Email Intake)' },
    { id: 'asis_l2', y: 180, h: 74, label: 'Triage &\nData Entry' },
    { id: 'asis_l3', y: 254, h: 74, label: 'Medical\nReviewer' },
    { id: 'asis_l4', y: 328, h: 76, label: 'Safety Database\nBatch' },
  ];
  for (const ln of asisLanes) {
    cells.push(
      `<mxCell id="${ln.id}_row" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="1"><mxGeometry x="82" y="${ln.y}" width="1418" height="${ln.h}" as="geometry"/></mxCell>`
    );
    const lblHtml = `<table style="width:136px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(ln.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ln.id}_lbl" value="${esc(lblHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="86" y="${ln.y + 8}" width="144" height="${ln.h - 16}" as="geometry"/></mxCell>`
    );
  }

  // As-Is BPMN Nodes
  const asisStartHtml = `<table style="width:120px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;">✉ Fax/PDF/Email<br/>Intake</td></tr></table>`;
  cells.push(
    `<mxCell id="asis_start" value="${esc(asisStartHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="250" y="121" width="132" height="44" as="geometry"/></mxCell>`
  );
  const asisBookHtml = `<table style="width:136px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">Manual Case<br/>Booking (72h SLA)</td></tr></table>`;
  cells.push(
    `<mxCell id="asis_book" value="${esc(asisBookHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="440" y="193" width="150" height="48" as="geometry"/></mxCell>`
  );
  const asisCodeHtml = `<table style="width:184px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">Manual MedDRA Coding<br/>&amp; Narrative Drafting</td></tr></table>`;
  cells.push(
    `<mxCell id="asis_code" value="${esc(asisCodeHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="686" y="267" width="198" height="48" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="asis_xor" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;X&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="954" y="267" width="48" height="48" as="geometry"/></mxCell>`
  );
  const asisSignHtml = `<table style="width:186px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">Dual-Control Sign-Off -&gt;<br/>E2B XML Transmission</td></tr></table>`;
  cells.push(
    `<mxCell id="asis_sign" value="${esc(asisSignHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1096" y="342" width="198" height="48" as="geometry"/></mxCell>`
  );
  const asisEndHtml = `<table style="width:108px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:800;color:#0F172A;">✔ Case Closed</td></tr></table>`;
  cells.push(
    `<mxCell id="asis_end" value="${esc(asisEndHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#0F172A;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1352" y="344" width="120" height="44" as="geometry"/></mxCell>`
  );

  // As-Is Edges
  cells.push(
    `<mxCell id="e_asis_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="asis_start" target="asis_book"><mxGeometry relative="1" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="e_asis_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="asis_book" target="asis_code"><mxGeometry relative="1" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="e_asis_3" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.5;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="884" y="291" as="sourcePoint"/><mxPoint x="954" y="291" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_asis_rework" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="978" y="267" as="sourcePoint"/><mxPoint x="590" y="217" as="targetPoint"/><Array as="points"><mxPoint x="978" y="217"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_asis_no" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1002" y="291" as="sourcePoint"/><mxPoint x="1096" y="366" as="targetPoint"/><Array as="points"><mxPoint x="1050" y="291"/><mxPoint x="1050" y="366"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_asis_close" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.5;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1294" y="366" as="sourcePoint"/><mxPoint x="1352" y="366" as="targetPoint"/></mxGeometry></mxCell>`
  );

  // ==================== BOTTOM POOL: TO-BE GEMINI ENTERPRISE AUTOMATED ICSR WORKFLOW ====================
  cells.push(
    `<mxCell id="g02_tobe_frame" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.6;" vertex="1" parent="1"><mxGeometry x="36" y="424" width="1464" height="414" as="geometry"/></mxCell>`
  );
  const tobeHdr = `<table style="width:1420px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13px;font-weight:800;color:#0F172A;">TO-BE GEMINI ENTERPRISE AUTOMATED ICSR WORKFLOW (Cycle: &lt;12 Mins | STP: 89% | Error: &lt;0.2%)</td></tr></table>`;
  cells.push(
    `<mxCell id="g02_tobe_hdr" value="${esc(tobeHdr)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#0F172A;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="36" y="424" width="1464" height="34" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g02_tobe_logo" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('vertex_ai')};" vertex="1" parent="1"><mxGeometry x="44" y="428" width="24" height="24" as="geometry"/></mxCell>`
  );

  const tobeLeftTab = `<table style="width:38px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:800;color:#14532D;line-height:1.2;">TO-BE<br/>GEMINI<br/>STP 89%<br/>&lt;0.2%</td></tr></table>`;
  cells.push(
    `<mxCell id="g02_tobe_vtab" value="${esc(tobeLeftTab)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#D9EAD3;strokeColor=#0F172A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="36" y="458" width="46" height="380" as="geometry"/></mxCell>`
  );

  const tobeLanes = [
    { id: 'tobe_l1', y: 458, h: 74, label: 'Eventarc &\nFHIR/AS2 Ingress' },
    { id: 'tobe_l2', y: 532, h: 74, label: 'Gemini Enterprise\nADK & Document AI' },
    { id: 'tobe_l3', y: 606, h: 74, label: 'OPA & GxP\nValidation Gate' },
    { id: 'tobe_l4', y: 680, h: 74, label: 'Safety DB Commit &\nE2B(R3) Auto-Submit' },
    { id: 'tobe_l5', y: 754, h: 84, label: 'Clinical Safety HITL\nException Queue' },
  ];
  for (const ln of tobeLanes) {
    cells.push(
      `<mxCell id="${ln.id}_row" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="1"><mxGeometry x="82" y="${ln.y}" width="1418" height="${ln.h}" as="geometry"/></mxCell>`
    );
    const lblHtml = `<table style="width:144px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(ln.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ln.id}_lbl" value="${esc(lblHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="86" y="${ln.y + 8}" width="150" height="${ln.h - 16}" as="geometry"/></mxCell>`
    );
  }

  // To-Be Nodes
  const tobeStartHtml = `<table style="width:128px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#1D4ED8;">☁ Start Event -&gt;<br/>Parallel AND</td></tr></table>`;
  cells.push(
    `<mxCell id="tobe_start" value="${esc(tobeStartHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="252" y="473" width="138" height="44" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="tobe_fork" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;+&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="434" y="545" width="48" height="48" as="geometry"/></mxCell>`
  );

  const parallelTasks = [
    { id: 'tobe_t1', y: 471, label: 'OCR Extraction' },
    { id: 'tobe_t2', y: 545, label: 'MedDRA\nAuto-Coding' },
    { id: 'tobe_t3', y: 619, label: 'Cloud DLP\nPHI Redaction' },
    { id: 'tobe_t4', y: 693, label: 'Narrative\nGeneration' },
  ];
  for (const pt of parallelTasks) {
    const tHtml = `<table style="width:126px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(pt.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${pt.id}" value="${esc(tHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="536" y="${pt.y}" width="138" height="48" as="geometry"/></mxCell>`
    );
  }

  cells.push(
    `<mxCell id="tobe_join" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;+&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="760" y="582" width="48" height="48" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="tobe_xor" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;X&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="928" y="582" width="48" height="48" as="geometry"/></mxCell>`
  );

  const tobeStpHtml = `<table style="width:186px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">Transactional Outbox -&gt;<br/>E2B(R3) Auto-Submit</td></tr></table>`;
  cells.push(
    `<mxCell id="tobe_stp" value="${esc(tobeStpHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1096" y="545" width="198" height="48" as="geometry"/></mxCell>`
  );
  const tobeEndStpHtml = `<table style="width:116px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:800;color:#0F172A;">✔ Case Closed<br/>(STP 89%)</td></tr></table>`;
  cells.push(
    `<mxCell id="tobe_end_stp" value="${esc(tobeEndStpHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#0F172A;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1348" y="547" width="126" height="44" as="geometry"/></mxCell>`
  );

  const tobeHitlHtml = `<table style="width:186px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;line-height:1.2;">2h SLA Timer + 21 CFR Part 11<br/>Dual e-Sign + Saga Compensation</td></tr></table>`;
  cells.push(
    `<mxCell id="tobe_hitl" value="${esc(tobeHitlHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1096" y="768" width="198" height="54" as="geometry"/></mxCell>`
  );
  const tobeEndHitlHtml = `<table style="width:116px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:800;color:#0F172A;">✔ Case Closed<br/>(HITL 11%)</td></tr></table>`;
  cells.push(
    `<mxCell id="tobe_end_hitl" value="${esc(tobeEndHitlHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#0F172A;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1348" y="773" width="126" height="44" as="geometry"/></mxCell>`
  );

  // To-Be Edges (explicit corridor routing so zero lines cross task boxes)
  cells.push(
    `<mxCell id="e_tobe_start" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="390" y="495" as="sourcePoint"/><mxPoint x="458" y="545" as="targetPoint"/><Array as="points"><mxPoint x="458" y="495"/></Array></mxGeometry></mxCell>`
  );
  for (const pt of parallelTasks) {
    const cy = pt.y + 24;
    cells.push(
      `<mxCell id="e_fork_${pt.id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.4;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="482" y="569" as="sourcePoint"/><mxPoint x="536" y="${cy}" as="targetPoint"/><Array as="points"><mxPoint x="506" y="569"/><mxPoint x="506" y="${cy}"/></Array></mxGeometry></mxCell>`
    );
    cells.push(
      `<mxCell id="e_join_${pt.id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.4;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="674" y="${cy}" as="sourcePoint"/><mxPoint x="760" y="606" as="targetPoint"/><Array as="points"><mxPoint x="716" y="${cy}"/><mxPoint x="716" y="606"/></Array></mxGeometry></mxCell>`
    );
  }
  cells.push(
    `<mxCell id="e_join_xor" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="808" y="606" as="sourcePoint"/><mxPoint x="928" y="606" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_xor_stp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="976" y="606" as="sourcePoint"/><mxPoint x="1096" y="569" as="targetPoint"/><Array as="points"><mxPoint x="1036" y="606"/><mxPoint x="1036" y="569"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_stp_end" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.5;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1294" y="569" as="sourcePoint"/><mxPoint x="1348" y="569" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_xor_hitl" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="952" y="630" as="sourcePoint"/><mxPoint x="1096" y="795" as="targetPoint"/><Array as="points"><mxPoint x="952" y="795"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_hitl_end" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.5;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1294" y="795" as="sourcePoint"/><mxPoint x="1348" y="795" as="targetPoint"/></mxGeometry></mxCell>`
  );

  return wrapDrawioEnvelope('canonical_86_g02', 'G-02: As-Is vs. To-Be BPMN 2.0 Process Swimlane — Adverse Event (ICSR) Case Processing', cells);
}

/**
 * G-03 (ID '87'): Multi-Persona User Journey & OpenTelemetry Blueprint (Adverse Event Lifecycle)
 * Reference: media_1793068982565.png (1536x858)
 */
export function generateTemplate87G03UserJourneyOtelXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g03_title', 'G-03: Multi-Persona User Journey & OpenTelemetry Blueprint (Adverse Event Lifecycle)'));

  const chevrons = [
    { id: 'g03_ch1', x: 242, w: 244, label: '1. Reporter Intake' },
    { id: 'g03_ch2', x: 496, w: 244, label: '2. FHIR & Document\nIngestion' },
    { id: 'g03_ch3', x: 750, w: 244, label: '3. Gemini ADK\nMedDRA Triage' },
    { id: 'g03_ch4', x: 1004, w: 244, label: '4. Clinical Review\n& Part 11 e-Sign' },
    { id: 'g03_ch5', x: 1258, w: 250, label: '5. E2B(R3) Submission\n& WORM Audit' },
  ];
  for (const ch of chevrons) {
    const chHtml = `<table style="width:${ch.w - 20}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12.5px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(ch.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ch.id}" value="${esc(chHtml)}" style="shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=18;fillColor=#DCE8FA;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${ch.x}" y="88" width="${ch.w}" height="62" as="geometry"/></mxCell>`
    );
  }

  // Main 5-Row Journey Grid Frame
  cells.push(
    `<mxCell id="g03_grid_frame" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="28" y="164" width="1480" height="660" as="geometry"/></mxCell>`
  );

  const lanes = [
    { id: 'g03_lane1', y: 164, h: 132, role: 'Patient / HCP\nReporter', icon: 'iap' as const },
    { id: 'g03_lane2', y: 296, h: 132, role: 'Drug Safety\nAssociate', icon: 'cloud_iam' as const },
    { id: 'g03_lane3', y: 428, h: 132, role: 'QPPV\nMedical\nReviewer', icon: 'scc' as const },
    { id: 'g03_lane4', y: 560, h: 132, role: 'Frontstage\nAPI & Edge', icon: 'apigee' as const },
    { id: 'g03_lane5', y: 692, h: 132, role: 'Backstage\nGemini\nEnterprise\n& OTel', icon: 'vertex_ai' as const },
  ];

  for (const ln of lanes) {
    cells.push(
      `<mxCell id="${ln.id}_bg" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1"><mxGeometry x="238" y="${ln.y}" width="1270" height="${ln.h}" as="geometry"/></mxCell>`
    );
    const hdrHtml = `<table style="width:146px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:12.5px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(ln.role).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ln.id}_hdr" value="${esc(hdrHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=54;" vertex="1" parent="1"><mxGeometry x="28" y="${ln.y}" width="210" height="${ln.h}" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${ln.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(ln.icon)};" vertex="1" parent="1"><mxGeometry x="44" y="${ln.y + 48}" width="34" height="34" as="geometry"/></mxCell>`
    );
  }

  const addJourneyNode = (id: string, x: number, y: number, w: number, h: number, label: string, icon: keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG, fill = '#F8FAFC', stroke = '#64748B') => {
    const html = `<table style="width:${w - 48}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:11.5px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${id}" value="${esc(html)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.4;align=left;verticalAlign=middle;spacingLeft=40;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(icon)};" vertex="1" parent="1"><mxGeometry x="${x + 10}" y="${y + Math.round((h - 24) / 2)}" width="24" height="24" as="geometry"/></mxCell>`
    );
  };

  // Lane 1 Nodes
  addJourneyNode('j_l1_n1', 268, 200, 168, 60, 'OIDC Portal', 'iap', '#EFF6FF', '#3B82F6');
  addJourneyNode('j_l1_n2', 474, 200, 174, 60, 'Upload AE Form', 'document_ai', '#EFF6FF', '#3B82F6');
  addJourneyNode('j_l1_n3', 686, 200, 184, 60, 'Submission Receipt', 'cloud_logging', '#EFF6FF', '#3B82F6');

  // Lane 2 Nodes
  addJourneyNode('j_l2_n1', 560, 332, 168, 60, 'Queue Claim', 'pubsub', '#ECFDF5', '#10B981');
  addJourneyNode('j_l2_n2', 766, 332, 224, 60, 'Side-by-Side MedDRA\nDiff Inspection', 'vertex_ai', '#ECFDF5', '#10B981');
  addJourneyNode('j_l2_n3', 1028, 332, 172, 60, 'Narrative Edit', 'document_ai', '#ECFDF5', '#10B981');

  // Lane 3 Nodes
  addJourneyNode('j_l3_n1', 804, 464, 196, 60, 'Causality\nAssessment', 'vertex_ai', '#FEFCE8', '#EAB308');
  addJourneyNode('j_l3_n2', 1038, 464, 212, 60, 'FIDO2 21 CFR Part 11\nDual e-Signature', 'cloud_kms', '#FEFCE8', '#EAB308');
  addJourneyNode('j_l3_n3', 1286, 464, 184, 60, 'Regulatory\nRelease', 'apigee', '#FEFCE8', '#EAB308');

  // Lane 4 Nodes
  addJourneyNode('j_l4_n1', 268, 596, 178, 60, 'Cloud Armor\nWAF', 'cloud_armor', '#F8FAFC', '#475569');
  addJourneyNode('j_l4_n2', 484, 596, 192, 60, 'Apigee X FHIR\nGateway', 'apigee', '#F8FAFC', '#475569');
  addJourneyNode('j_l4_n3', 714, 596, 178, 60, 'gRPC-Web\nStream', 'cloud_run', '#F8FAFC', '#475569');

  // Lane 5 Nodes
  addJourneyNode('j_l5_n1', 720, 728, 182, 60, 'W3C\ntraceparent', 'cloud_monitoring', '#F5F3FF', '#7C3AED');
  addJourneyNode('j_l5_n2', 940, 728, 240, 60, 'Document AI + AlloyDB\nScaNN MedDRA Lookup', 'alloydb', '#F5F3FF', '#7C3AED');
  addJourneyNode('j_l5_n3', 1212, 728, 134, 60, 'Cloud KMS\nSign', 'cloud_kms', '#F5F3FF', '#7C3AED');
  addJourneyNode('j_l5_n4', 1368, 728, 124, 60, 'BigQuery\nOTel Sink', 'bigquery', '#F5F3FF', '#7C3AED');

  const edges: [string, string, string][] = [
    ['e_j1', 'j_l1_n1', 'j_l1_n2'],
    ['e_j2', 'j_l1_n2', 'j_l1_n3'],
    ['e_j3', 'j_l1_n2', 'j_l4_n2'],
    ['e_j4', 'j_l4_n1', 'j_l4_n2'],
    ['e_j5', 'j_l4_n2', 'j_l4_n3'],
    ['e_j6', 'j_l4_n3', 'j_l5_n1'],
    ['e_j7', 'j_l2_n1', 'j_l2_n2'],
    ['e_j8', 'j_l2_n2', 'j_l2_n3'],
    ['e_j9', 'j_l2_n3', 'j_l3_n2'],
    ['e_j10', 'j_l3_n1', 'j_l3_n2'],
    ['e_j11', 'j_l3_n2', 'j_l3_n3'],
    ['e_j12', 'j_l3_n1', 'j_l5_n2'],
    ['e_j13', 'j_l3_n3', 'j_l5_n3'],
    ['e_j14', 'j_l5_n1', 'j_l5_n2'],
    ['e_j15', 'j_l5_n2', 'j_l5_n3'],
    ['e_j16', 'j_l5_n3', 'j_l5_n4'],
  ];
  for (const [eid, src, tgt] of edges) {
    cells.push(
      `<mxCell id="${eid}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#334155;strokeWidth=1.5;endArrow=open;endFill=0;" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
  }

  return wrapDrawioEnvelope('canonical_87_g03', 'G-03: Multi-Persona User Journey & OpenTelemetry Blueprint (Adverse Event Lifecycle)', cells);
}

/**
 * G-04 (ID '88'): UML Use Case, IAM/RBAC & GxP Separation-of-Duties (SoD) Boundary
 * Reference: media_1793068988176.png (1536x858)
 */
export function generateTemplate88G04UmlUseCaseSodXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g04_title', 'G-04: UML Use Case, IAM/RBAC & GxP Separation-of-Duties (SoD) Boundary'));

  // Center Dashed System Boundary
  cells.push(
    `<mxCell id="g04_sys_bound" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.6;dashed=1;dashPattern=6 4;" vertex="1" parent="1"><mxGeometry x="290" y="92" width="768" height="732" as="geometry"/></mxCell>`
  );
  const bndHdr = `<table style="width:700px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:14px;font-weight:800;color:#0F172A;">Pharmacovigilance Case Platform (VPC-SC &amp; 21 CFR Part 11 Boundary)</td></tr></table>`;
  cells.push(
    `<mxCell id="g04_sys_hdr" value="${esc(bndHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="342" y="100" width="706" height="32" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g04_sys_logo" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('vertex_ai')};" vertex="1" parent="1"><mxGeometry x="304" y="102" width="28" height="28" as="geometry"/></mxCell>`
  );

  // 4 Colored Zones inside System Boundary
  const zones = [
    { id: 'g04_z1', y: 144, h: 136, label: 'INTAKE ZONE', fill: '#DCE8FA', stroke: '#60A5FA' },
    { id: 'g04_z2', y: 294, h: 226, label: 'TRIAGE ZONE', fill: '#D9EAD3', stroke: '#4ADE80' },
    { id: 'g04_z3', y: 534, h: 136, label: 'APPROVAL ZONE', fill: '#FFF2CC', stroke: '#FACC15' },
    { id: 'g04_z4', y: 684, h: 124, label: 'AUDIT ZONE', fill: '#F4CCCC', stroke: '#F87171' },
  ];
  for (const z of zones) {
    const zHtml = `<table style="width:710px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:12px;font-weight:800;color:#0F172A;padding:4px 8px;">${esc(z.label)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${z.id}" value="${esc(zHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${z.fill};strokeColor=${z.stroke};strokeWidth=1.4;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="312" y="${z.y}" width="724" height="${z.h}" as="geometry"/></mxCell>`
    );
  }

  // Left 5 Actors
  const actors = [
    { id: 'g04_act1', y: 184, label: 'External AE\nReporter', icon: 'iap' as const },
    { id: 'g04_act2', y: 320, label: 'Autonomous ADK\nTriage Agent', icon: 'vertex_ai' as const },
    { id: 'g04_act3', y: 438, label: 'Drug Safety\nAssociate (DSA)', icon: 'cloud_iam' as const },
    { id: 'g04_act4', y: 572, label: 'QPPV\nMedical Approver', icon: 'cloud_kms' as const },
    { id: 'g04_act5', y: 714, label: 'QA\nGxP Auditor', icon: 'scc' as const },
  ];
  for (const a of actors) {
    const aHtml = `<table style="width:176px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;padding-top:26px;font-size:12px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(a.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${a.id}" value="${esc(aHtml)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="44" y="${a.y}" width="190" height="84" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${a.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(a.icon)};" vertex="1" parent="1"><mxGeometry x="127" y="${a.y + 8}" width="24" height="24" as="geometry"/></mxCell>`
    );
  }

  // Use Case Ellipses
  const useCases = [
    { id: 'uc_submit', x: 356, y: 182, w: 238, h: 78, text: 'Submit AE Report' },
    { id: 'uc_dlp', x: 734, y: 182, w: 274, h: 78, text: 'Cloud DLP PHI\nTokenize & KMS Encrypt' },
    { id: 'uc_triage', x: 356, y: 330, w: 238, h: 78, text: 'Execute ADK MedDRA\nAuto-Coding' },
    { id: 'uc_armor', x: 734, y: 330, w: 274, h: 78, text: 'Model Armor Screen' },
    { id: 'uc_draft', x: 356, y: 426, w: 238, h: 78, text: 'Draft Case Narrative' },
    { id: 'uc_approve', x: 356, y: 572, w: 238, h: 78, text: 'Approve & Release\nE2B(R3) XML' },
    { id: 'uc_esign', x: 734, y: 572, w: 274, h: 78, text: 'Verify 21 CFR Part 11\nDual e-Signature' },
    { id: 'uc_audit', x: 356, y: 718, w: 244, h: 76, text: 'Inspect Immutable\nWORM Audit Trail' },
  ];
  for (const uc of useCases) {
    const ucHtml = `<table style="width:${uc.w - 36}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12.5px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(uc.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${uc.id}" value="${esc(ucHtml)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${uc.x}" y="${uc.y}" width="${uc.w}" height="${uc.h}" as="geometry"/></mxCell>`
    );
  }

  // Actor -> Use Case Edges
  const actEdges: [string, string, string][] = [
    ['e_a1', 'g04_act1', 'uc_submit'],
    ['e_a2', 'g04_act2', 'uc_triage'],
    ['e_a3', 'g04_act3', 'uc_draft'],
    ['e_a4', 'g04_act4', 'uc_approve'],
    ['e_a5', 'g04_act5', 'uc_audit'],
  ];
  for (const [eid, s, t] of actEdges) {
    cells.push(
      `<mxCell id="${eid}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.6;endArrow=block;endFill=1;" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
  }

  // <<include>> Dashed Edges
  const incEdges: [string, string, string, number][] = [
    ['e_inc1', 'uc_submit', 'uc_dlp', 221],
    ['e_inc2', 'uc_triage', 'uc_armor', 369],
    ['e_inc3', 'uc_approve', 'uc_esign', 611],
  ];
  for (const [eid, s, t, y] of incEdges) {
    cells.push(
      `<mxCell id="${eid}" value="" style="endArrow=block;endFill=1;dashed=1;dashPattern=6 4;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
    const incLbl = `<table style="width:94px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:700;color:#0F172A;">&lt;&lt;include&gt;&gt;</td></tr></table>`;
    cells.push(
      `<mxCell id="${eid}_lbl" value="${esc(incLbl)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="616" y="${y - 24}" width="96" height="22" as="geometry"/></mxCell>`
    );
  }

  // Right OPA Rego Policy Enforcement Point (PEP) Box
  const pepHtml =
    `<table style="width:282px;border-collapse:collapse;font-family:Inter,sans-serif;">` +
    `<tr><td style="text-align:left;padding:10px 10px 10px 38px;border-bottom:1.5px solid #0F172A;font-size:13px;font-weight:800;color:#0F172A;line-height:1.25;">OPA Rego &amp; IAM Policy<br/>Enforcement Point (PEP)</td></tr>` +
    `<tr><td style="text-align:left;padding:14px 12px;font-size:12px;font-weight:600;color:#0F172A;line-height:1.55;">` +
    `• <b>SoD Rule 1:</b><br/>&nbsp;&nbsp;- Submitter != Approver<br/><br/>` +
    `• <b>SoD Rule 2:</b><br/>&nbsp;&nbsp;- Autonomous Agent Denied<br/>&nbsp;&nbsp;&nbsp;&nbsp;Direct E2B Release<br/><br/>` +
    `• <b>SoD Rule 3:</b><br/>&nbsp;&nbsp;- DSA != QA GxP Auditor` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g04_pep" value="${esc(pepHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1192" y="216" width="308" height="360" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g04_pep_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('scc')};" vertex="1" parent="1"><mxGeometry x="1202" y="226" width="26" height="26" as="geometry"/></mxCell>`
  );

  // Dashed SoD Constraint Edges
  const sodRules = [
    { id: 'sod1', y: 280, label: '✖ SoD Rule 1\nConstraint', targetId: 'uc_dlp' },
    { id: 'sod2', y: 386, label: '✖ SoD Rule 2\nConstraint', targetId: 'uc_armor' },
    { id: 'sod3', y: 528, label: '✖ SoD Rule 3\nConstraint', targetId: 'uc_esign' },
  ];
  for (const sr of sodRules) {
    cells.push(
      `<mxCell id="${sr.id}_edge" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;dashed=1;dashPattern=6 4;html=1;strokeColor=#B91C1C;strokeWidth=1.6;endArrow=block;endFill=1;" edge="1" parent="1" source="g04_pep" target="${sr.targetId}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
    const sHtml = `<table style="width:104px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:800;color:#B91C1C;line-height:1.2;">${esc(sr.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${sr.id}_badge" value="${esc(sHtml)}" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1072" y="${sr.y}" width="108" height="42" as="geometry"/></mxCell>`
    );
  }

  return wrapDrawioEnvelope('canonical_88_g04', 'G-04: UML Use Case, IAM/RBAC & GxP Separation-of-Duties (SoD) Boundary', cells);
}

/**
 * G-06 (ID '89'): ADR Multi-Option Architecture Trade-Off & Quantitative Scoring Matrix (PV Platform)
 * Reference: media_1793069003300.png (1536x858)
 */
export function generateTemplate89G06AdrTradeoffMatrixXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g06_title', 'G-06: ADR Multi-Option Architecture Trade-Off & Quantitative Scoring Matrix (PV Platform)'));

  const options = [
    {
      id: 'g06_optA',
      x: 38,
      w: 468,
      hdrBg: '#3B78E7',
      border: '#64748B',
      borderW: '1.6',
      title: 'Option A: Regional Monolith on GKE + Cloud SQL',
      nodes: [
        { id: 'optA_n1', x: 88, y: 204, label: 'Google Kubernetes\nEngine (GKE)', icon: 'gke' as const },
        { id: 'optA_n2', x: 300, y: 204, label: 'Cloud SQL\nPostgres', icon: 'cloud_sql' as const },
      ],
      metrics1: '📊 P99: 55ms | Throughput: 1.5k RPS',
      metrics2: 'RPO: 5m / RTO: 20m | High Blast Radius | FinOps: $4.8k/mo',
    },
    {
      id: 'g06_optB',
      x: 534,
      w: 468,
      hdrBg: '#2E9E5B',
      border: '#2E9E5B',
      borderW: '3',
      title: 'Option B (SELECTED): Cloud Run Gen2 + Pub/Sub Outbox + AlloyDB AI ScaNN + Gemini Enterprise ADK',
      nodes: [
        { id: 'optB_n1', x: 556, y: 204, label: 'Cloud Run\nGen2', icon: 'cloud_run' as const },
        { id: 'optB_n2', x: 698, y: 204, label: 'Cloud Pub/Sub\nOutbox', icon: 'pubsub' as const },
        { id: 'optB_n3', x: 840, y: 204, label: 'AlloyDB AI ScaNN\n+ Gemini ADK', icon: 'alloydb' as const },
      ],
      metrics1: '📊 P99: 78ms | Throughput: 30k RPS',
      metrics2: '✅ RPO < 1s / RTO < 60s | GxP Isolated | FinOps: $8.6k/mo',
    },
    {
      id: 'g06_optC',
      x: 1030,
      w: 468,
      hdrBg: '#3B78E7',
      border: '#64748B',
      borderW: '1.6',
      title: 'Option C: Multi-Region Active-Active GKE Mesh + Cloud Spanner',
      nodes: [
        { id: 'optC_n1', x: 1074, y: 204, label: 'Multi-Region\nGKE Mesh', icon: 'gke' as const },
        { id: 'optC_n2', x: 1296, y: 204, label: 'Cloud Spanner\nReplication', icon: 'spanner' as const },
      ],
      metrics1: '📈 P99: 140ms | Throughput: 90k RPS | RPO = 0 / RTO < 5s',
      metrics2: '🔥 High GxP CSV Validation Overhead | FinOps: $32.5k/mo',
    },
  ];

  for (const opt of options) {
    cells.push(
      `<mxCell id="${opt.id}_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${opt.border};strokeWidth=${opt.borderW};" vertex="1" parent="1"><mxGeometry x="${opt.x}" y="86" width="${opt.w}" height="362" as="geometry"/></mxCell>`
    );
    const hdrHtml = `<table style="width:${opt.w - 24}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12.5px;font-weight:800;color:#FFFFFF;line-height:1.3;">${esc(opt.title)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${opt.id}_hdr" value="${esc(hdrHtml)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${opt.hdrBg};strokeColor=${opt.border};strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${opt.x}" y="86" width="${opt.w}" height="58" as="geometry"/></mxCell>`
    );

    for (let i = 0; i < opt.nodes.length; i++) {
      const nd = opt.nodes[i];
      const nHtml = `<table style="width:124px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;padding-top:34px;font-size:11px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(nd.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
      cells.push(
        `<mxCell id="${nd.id}" value="${esc(nHtml)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${nd.x}" y="${nd.y}" width="134" height="114" as="geometry"/></mxCell>`
      );
      cells.push(
        `<mxCell id="${nd.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(nd.icon)};" vertex="1" parent="1"><mxGeometry x="${nd.x + 51}" y="${nd.y + 12}" width="32" height="32" as="geometry"/></mxCell>`
      );
      if (i > 0) {
        const prev = opt.nodes[i - 1];
        cells.push(
          `<mxCell id="${nd.id}_edge" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#334155;strokeWidth=1.6;" edge="1" parent="1" source="${prev.id}" target="${nd.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
        );
      }
    }

    const ftrHtml =
      `<table style="width:${opt.w - 28}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.45;">` +
      `<div><b>${esc(opt.metrics1)}</b></div>` +
      `<div>${esc(opt.metrics2)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${opt.id}_ftr" value="${esc(ftrHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${opt.x + 14}" y="382" width="${opt.w - 28}" height="56" as="geometry"/></mxCell>`
    );
  }

  // Bottom Quantitative Scoring Table (with visual horizontal score gauges per Rule 57C)
  const scoreTableHtml =
    `<table style="width:1460px;border-collapse:collapse;font-family:Inter,sans-serif;font-size:12.5px;color:#0F172A;">` +
    `<thead>` +
    `<tr style="background:#1E4E8C;color:#FFFFFF;font-weight:800;">` +
    `<th style="padding:10px 14px;text-align:left;border:1px solid #475569;width:420px;">Architectural Fitness Criterion</th>` +
    `<th style="padding:10px 10px;text-align:center;border:1px solid #475569;width:110px;">Weight</th>` +
    `<th style="padding:10px 12px;text-align:center;border:1px solid #475569;width:290px;">Option A (Monolith)</th>` +
    `<th style="padding:10px 12px;text-align:center;border:1px solid #475569;width:350px;background:#166534;">Option B (SELECTED - Cloud Run + AlloyDB AI)</th>` +
    `<th style="padding:10px 12px;text-align:center;border:1px solid #475569;width:290px;">Option C (Spanner Active-Active)</th>` +
    `</tr>` +
    `</thead>` +
    `<tbody>` +
    `<tr style="background:#FFFFFF;">` +
    `<td style="padding:9px 14px;border:1px solid #94A3B8;font-weight:700;">GxP Auditability, Blast Radius &amp; RPO/RTO (25%)</td>` +
    `<td style="padding:9px 10px;border:1px solid #94A3B8;text-align:center;font-weight:700;">(25%)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">2.0 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;font-weight:800;color:#166534;background:#F0FDF4;">4.8 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">5.0 / 5.0</td>` +
    `</tr>` +
    `<tr style="background:#EFF6FF;">` +
    `<td style="padding:9px 14px;border:1px solid #94A3B8;font-weight:700;">MedDRA Vector RAG &amp; E2B Latency (20%)</td>` +
    `<td style="padding:9px 10px;border:1px solid #94A3B8;text-align:center;font-weight:700;">(20%)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">3.5 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;font-weight:800;color:#166534;background:#DCFCE7;">4.9 / 5.0 (AlloyDB ScaNN)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">3.4 / 5.0</td>` +
    `</tr>` +
    `<tr style="background:#FFFFFF;">` +
    `<td style="padding:9px 14px;border:1px solid #94A3B8;font-weight:700;">GAMP 5 CSV Change Velocity (20%)</td>` +
    `<td style="padding:9px 10px;border:1px solid #94A3B8;text-align:center;font-weight:700;">(20%)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">2.8 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;font-weight:800;color:#166534;background:#F0FDF4;">4.8 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">2.5 / 5.0</td>` +
    `</tr>` +
    `<tr style="background:#EFF6FF;">` +
    `<td style="padding:9px 14px;border:1px solid #94A3B8;font-weight:700;">FinOps Unit Cost ($ / 1k ICSRs) (20%)</td>` +
    `<td style="padding:9px 10px;border:1px solid #94A3B8;text-align:center;font-weight:700;">(20%)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">4.5 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;font-weight:800;color:#166534;background:#DCFCE7;">4.3 / 5.0 ($0.07/case)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">1.8 / 5.0</td>` +
    `</tr>` +
    `<tr style="background:#FFFFFF;">` +
    `<td style="padding:9px 14px;border:1px solid #94A3B8;font-weight:700;">SRE Operational Simplicity (15%)</td>` +
    `<td style="padding:9px 10px;border:1px solid #94A3B8;text-align:center;font-weight:700;">(15%)</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">3.0 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;font-weight:800;color:#166534;background:#F0FDF4;">4.7 / 5.0</td>` +
    `<td style="padding:9px 12px;border:1px solid #94A3B8;text-align:center;">2.1 / 5.0</td>` +
    `</tr>` +
    `<tr style="background:#1E4E8C;color:#FFFFFF;font-weight:800;font-size:13px;">` +
    `<td colspan="2" style="padding:11px 14px;border:1px solid #475569;">Weighted Total (100%)</td>` +
    `<td style="padding:11px 12px;border:1px solid #475569;text-align:center;">Option A: 3.11 / 5.00</td>` +
    `<td style="padding:11px 12px;border:1px solid #475569;text-align:center;background:#15803D;">Option B: 4.71 / 5.00 ✅ (WINNER)</td>` +
    `<td style="padding:11px 12px;border:1px solid #475569;text-align:center;">Option C: 3.10 / 5.00</td>` +
    `</tr>` +
    `</tbody></table>`;

  cells.push(
    `<mxCell id="g06_score_matrix" value="${esc(scoreTableHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="38" y="476" width="1460" height="352" as="geometry"/></mxCell>`
  );

  return wrapDrawioEnvelope('canonical_89_g06', 'G-06: ADR Multi-Option Architecture Trade-Off & Quantitative Scoring Matrix (PV Platform)', cells);
}

/**
 * G-07 (ID '90'): C4 Level 3 Internal Component & Hexagonal Interface Decomposition (ICSR Worker)
 * Reference: media_1793069030754.png (1536x858)
 */
export function generateTemplate90G07C4ComponentHexagonalXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g07_title', 'G-07: C4 Level 3 Internal Component & Hexagonal Interface Decomposition (ICSR Worker)'));

  // Outer Dashed Container
  cells.push(
    `<mxCell id="g07_outer_container" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;dashed=1;dashPattern=8 5;" vertex="1" parent="1"><mxGeometry x="36" y="88" width="1464" height="740" as="geometry"/></mxCell>`
  );
  const contHdr = `<table style="width:820px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:14px;font-weight:800;color:#0F172A;line-height:1.3;">Container: Pharmacovigilance Orchestration &amp; ADK Worker<br/>(Cloud Run Gen2 | Go 1.24 | Service Mesh mTLS)</td></tr></table>`;
  cells.push(
    `<mxCell id="g07_outer_hdr" value="${esc(contHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="358" y="98" width="820" height="44" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g07_outer_logo" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('cloud_run')};" vertex="1" parent="1"><mxGeometry x="48" y="98" width="32" height="32" as="geometry"/></mxCell>`
  );

  // 3 Dashed Column Zones
  const colZones = [
    { id: 'g07_zone_in', x: 58, w: 320, title: 'INBOUND DRIVING\nADAPTERS', fill: '#F8FAFC' },
    { id: 'g07_zone_core', x: 568, w: 392, title: 'DOMAIN & APPLICATION CORE', fill: '#F1F5F9' },
    { id: 'g07_zone_out', x: 1158, w: 320, title: 'OUTBOUND DRIVEN\nADAPTERS', fill: '#F8FAFC' },
  ];
  for (const cz of colZones) {
    const czHtml = `<table style="width:${cz.w - 20}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13px;font-weight:800;color:#0F172A;padding-top:10px;line-height:1.25;">${esc(cz.title).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${cz.id}" value="${esc(czHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${cz.fill};strokeColor=#64748B;strokeWidth=1.4;dashed=1;dashPattern=5 4;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${cz.x}" y="156" width="${cz.w}" height="650" as="geometry"/></mxCell>`
    );
  }

  // Interface Column Headers
  const inHdr = `<table style="width:150px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12.5px;font-weight:800;color:#0F172A;">INBOUND<br/>INTERFACE</td></tr></table>`;
  cells.push(
    `<mxCell id="g07_in_if_hdr" value="${esc(inHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="396" y="164" width="154" height="40" as="geometry"/></mxCell>`
  );
  const outHdr = `<table style="width:166px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12.5px;font-weight:800;color:#0F172A;">RIGHT BOUNDARY<br/>INTERFACES</td></tr></table>`;
  cells.push(
    `<mxCell id="g07_out_if_hdr" value="${esc(outHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="976" y="164" width="168" height="40" as="geometry"/></mxCell>`
  );

  // Inbound Driving Adapters (3 Cards)
  const inboundCards = [
    { id: 'in_c1', y: 242, title: 'gRPC/FHIR Server Adapter', sub: '(Protobuf v2.IcsrService,\nALTS/mTLS)', port: 'IIcsrCommandPort', targetCore: 'core_c1' },
    { id: 'in_c2', y: 432, title: 'Pub/Sub Push\nConsumer Adapter', sub: '(CloudEvents v1.0,\nAckDeadline=60s)', port: 'IEventIngestPort', targetCore: 'core_c2' },
    { id: 'in_c3', y: 622, title: 'A2A Agent Server Endpoint', sub: '(JSON-RPC 2.0)', port: 'IA2ATaskPort', targetCore: 'core_c3' },
  ];
  for (const ic of inboundCards) {
    const html =
      `<table style="width:256px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:13px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(ic.title).replace(/\n/g, '<br/>')}</div>` +
      `<div style="font-size:11.5px;font-weight:500;color:#1E293B;margin-top:4px;line-height:1.3;">${esc(ic.sub).replace(/\n/g, '<br/>')}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${ic.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DCE8FA;strokeColor=#2563EB;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="80" y="${ic.y}" width="276" height="114" as="geometry"/></mxCell>`
    );
    const cy = ic.y + 57;
    const portHtml = `<table style="width:136px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:800;color:#1E40AF;">⊸ ${esc(ic.port)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ic.id}_port" value="${esc(portHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="402" y="${cy - 18}" width="142" height="36" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${ic.id}_e1" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="${ic.id}" target="${ic.id}_port"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
  }

  // Domain & Application Core (4 Cards)
  const coreCards = [
    { id: 'core_c1', y: 224, title: 'Idempotency & Dedup Lock', sub: '(Memorystore Redis SETNX +\nSHA-256 Case Hash)', fill: '#FEF3C7', stroke: '#D97706' },
    { id: 'core_c2', y: 368, title: 'ADK ICSR Workflow &\nSaga Coordinator', sub: '(8-Agent State Orchestration)', fill: '#DCE8FA', stroke: '#2563EB' },
    { id: 'core_c3', y: 512, title: 'Embedded OPA Rego &\nICH E2B(R3) XSD Validator', sub: '(200+ Regulatory Rules)', fill: '#FEF3C7', stroke: '#D97706' },
    { id: 'core_c4', y: 656, title: 'MedDRA Context & Token\nBudget Manager', sub: '(<= 32k Context Window Guard)', fill: '#DCE8FA', stroke: '#2563EB' },
  ];
  for (let i = 0; i < coreCards.length; i++) {
    const cc = coreCards[i];
    const html =
      `<table style="width:296px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:13px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(cc.title).replace(/\n/g, '<br/>')}</div>` +
      `<div style="font-size:11px;font-weight:600;color:#334155;margin-top:4px;line-height:1.25;">${esc(cc.sub).replace(/\n/g, '<br/>')}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${cc.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${cc.fill};strokeColor=${cc.stroke};strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="606" y="${cc.y}" width="316" height="104" as="geometry"/></mxCell>`
    );
    if (i > 0) {
      cells.push(
        `<mxCell id="core_v_${i}" value="" style="startArrow=block;startFill=1;endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="${coreCards[i - 1].id}" target="${cc.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
      );
    }
  }

  for (const ic of inboundCards) {
    cells.push(
      `<mxCell id="${ic.id}_e2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.6;endArrow=block;endFill=1;" edge="1" parent="1" source="${ic.id}_port" target="${ic.targetCore}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
  }

  // Outbound Driven Adapters (4 Cards)
  const outboundCards = [
    { id: 'out_c1', y: 224, title: 'Vertex AI Gemini 3.0 Pro\nAdapter', sub: '(Circuit Breaker + Fallback Flash)', port: 'ILLMInferencePort', srcCore: 'core_c1' },
    { id: 'out_c2', y: 368, title: 'AlloyDB AI pgx Adapter', sub: '(ScaNN MedDRA Vector Index\n+ Transactional Outbox)', port: 'IVectorRepositoryPort', srcCore: 'core_c2' },
    { id: 'out_c3', y: 512, title: 'Apigee Managed MCP &\nE2B(R3) AS2 Gateway Adapter', sub: '(FDA FAERS / EMA EudraVigilance)', port: 'ISafetyDbPort', srcCore: 'core_c3' },
    { id: 'out_c4', y: 656, title: 'OpenTelemetry OTLP\nExporter & WORM Audit Sink', sub: '(BigQuery + GCS Bucket Lock)', port: 'ITelemetryPort', srcCore: 'core_c4' },
  ];
  for (const oc of outboundCards) {
    const html =
      `<table style="width:256px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:12.5px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(oc.title).replace(/\n/g, '<br/>')}</div>` +
      `<div style="font-size:11px;font-weight:500;color:#1E293B;margin-top:4px;line-height:1.25;">${esc(oc.sub).replace(/\n/g, '<br/>')}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${oc.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FAD2CF;strokeColor=#B91C1C;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1180" y="${oc.y}" width="276" height="104" as="geometry"/></mxCell>`
    );
    const cy = oc.y + 52;
    const portHtml = `<table style="width:146px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:800;color:#991B1B;">⊸ ${esc(oc.port)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${oc.id}_port" value="${esc(portHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#B91C1C;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="984" y="${cy - 18}" width="152" height="36" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${oc.id}_e1" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="${oc.srcCore}" target="${oc.id}_port"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${oc.id}_e2" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="${oc.id}_port" target="${oc.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
  }

  return wrapDrawioEnvelope('canonical_90_g07', 'G-07: C4 Level 3 Internal Component & Hexagonal Interface Decomposition (ICSR Worker)', cells);
}

/**
 * G-08 (ID '91'): UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle
 * Reference: media_1793069038459.png (1536x858)
 */
export function generateTemplate91G08UmlStateMachineSlaXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g08_title', 'G-08: UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle'));

  // Top Statechart Frame
  cells.push(
    `<mxCell id="g08_top_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.6;" vertex="1" parent="1"><mxGeometry x="18" y="72" width="1500" height="542" as="geometry"/></mxCell>`
  );
  const topHdr = `<table style="width:800px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:17px;font-weight:800;color:#0F172A;">Formal UML 2.5 ICSR Case Lifecycle Statechart</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_top_hdr" value="${esc(topHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="368" y="82" width="800" height="32" as="geometry"/></mxCell>`
  );

  // Initial state [*]
  cells.push(
    `<mxCell id="g08_init" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#3B78E7;strokeColor=#1E3A8A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="34" y="318" width="28" height="28" as="geometry"/></mxCell>`
  );

  // INGESTED
  const ingHtml =
    `<table style="width:148px;border-collapse:collapse;font-family:Inter,sans-serif;color:#FFFFFF;">` +
    `<tr><td style="text-align:center;font-size:12px;font-weight:800;padding-bottom:4px;border-bottom:1px solid #93C5FD;">INGESTED</td></tr>` +
    `<tr><td style="text-align:left;font-size:10px;font-weight:600;padding-top:4px;line-height:1.25;">entry /<br/>initSLATimer(7d_or_15d);<br/>emit IcsrReceived</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_ingested" value="${esc(ingHtml)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#4A86E8;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="94" y="290" width="160" height="84" as="geometry"/></mxCell>`
  );

  // VALIDATED
  const valHtml = `<table style="width:94px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:800;color:#FFFFFF;">VALIDATED</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_validated" value="${esc(valHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#4A86E8;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="412" y="299" width="104" height="66" as="geometry"/></mxCell>`
  );

  // Composite State: AGENTIC_PROCESSING
  const compHdr = `<table style="width:206px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;padding:6px 10px;font-size:11px;font-weight:800;color:#0F172A;line-height:1.3;">AGENTIC_PROCESSING<br/><span style="font-weight:600;font-size:10.5px;">do / runAdkPipeline();</span></td></tr></table>`;
  cells.push(
    `<mxCell id="g08_comp" value="${esc(compHdr)}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FDE68A;strokeColor=#B45309;strokeWidth=1.6;dashed=1;dashPattern=5 4;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="556" y="176" width="224" height="308" as="geometry"/></mxCell>`
  );

  const subStates = [
    { id: 'g08_sub1', y: 230, label: '1. DOC_AI_OCR' },
    { id: 'g08_sub2', y: 294, label: '2. ALLOYDB_MEDDRA_RAG' },
    { id: 'g08_sub3', y: 358, label: '3. GEMINI_CAUSALITY_EVAL' },
    { id: 'g08_sub4', y: 422, label: '4. E2B_R3_XSD_CHECK' },
  ];
  for (let i = 0; i < subStates.length; i++) {
    const ss = subStates[i];
    const sHtml = `<table style="width:176px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:800;color:#0F172A;">${esc(ss.label)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ss.id}" value="${esc(sHtml)}" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="576" y="${ss.y}" width="184" height="40" as="geometry"/></mxCell>`
    );
    if (i > 0) {
      cells.push(
        `<mxCell id="g08_sub_e_${i}" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.4;" edge="1" parent="1" source="${subStates[i - 1].id}" target="${ss.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
      );
    }
  }

  // Right States
  const rightStates = [
    { id: 'g08_waiting', x: 812, y: 332, w: 160, h: 66, label: 'WAITING_CLINICAL_HITL', fill: '#FACC15', fg: '#0F172A', stroke: '#CA8A04' },
    { id: 'g08_escalated', x: 1098, y: 332, w: 156, h: 66, label: 'SLA_ESCALATED_QPPV', fill: '#D97706', fg: '#0F172A', stroke: '#92400E' },
    { id: 'g08_auto_sub', x: 1290, y: 178, w: 190, h: 66, label: 'AUTO_SUBMITTED_E2B', fill: '#2E9E5B', fg: '#FFFFFF', stroke: '#14532D' },
    { id: 'g08_qppv_sub', x: 1290, y: 332, w: 190, h: 66, label: 'QPPV_SIGNED_SUBMITTED', fill: '#2E9E5B', fg: '#FFFFFF', stroke: '#14532D' },
    { id: 'g08_nullified', x: 1290, y: 422, w: 190, h: 66, label: 'NULLIFIED_COMPENSATED', fill: '#EF4444', fg: '#FFFFFF', stroke: '#991B1B' },
    { id: 'g08_dlq', x: 1290, y: 526, w: 190, h: 66, label: 'DLQ_QUARANTINED', fill: '#7F1D1D', fg: '#FFFFFF', stroke: '#450A0A' },
  ];
  for (const rs of rightStates) {
    const rHtml = `<table style="width:${rs.w - 14}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:800;color:${rs.fg};">${esc(rs.label)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${rs.id}" value="${esc(rHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=${rs.fill};strokeColor=${rs.stroke};strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${rs.x}" y="${rs.y}" width="${rs.w}" height="${rs.h}" as="geometry"/></mxCell>`
    );
  }

  // Transitions & Guard Labels
  cells.push(
    `<mxCell id="e_g08_1" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="g08_init" target="g08_ingested"><mxGeometry relative="1" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_2" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="g08_ingested" target="g08_validated"><mxGeometry relative="1" as="geometry"/></mxCell>`
  );
  const g1Html = `<table style="width:148px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.25;">[fhirValid &amp;&amp; dlpTokenized]<br/>persistRawVault()</td></tr></table>`;
  cells.push(
    `<mxCell id="lbl_g08_2" value="${esc(g1Html)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="258" y="294" width="150" height="34" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="e_g08_3" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="g08_validated" target="g08_comp"><mxGeometry relative="1" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_auto" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="780" y="211" as="sourcePoint"/><mxPoint x="1290" y="211" as="targetPoint"/></mxGeometry></mxCell>`
  );
  const gAutoHtml = `<table style="width:260px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;line-height:1.25;">[confidence &gt;= 0.95 &amp;&amp; !seriousUnexpected]<br/>stopSLATimer(); commitOutbox()</td></tr></table>`;
  cells.push(
    `<mxCell id="lbl_g08_auto" value="${esc(gAutoHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="900" y="174" width="264" height="34" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="e_g08_hitl" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="780" y="365" as="sourcePoint"/><mxPoint x="812" y="365" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_esc" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="972" y="365" as="sourcePoint"/><mxPoint x="1098" y="365" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_qppv" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1254" y="365" as="sourcePoint"/><mxPoint x="1290" y="365" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_rework" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;strokeWidth=1.5;dashed=1;dashPattern=5 4;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="892" y="332" as="sourcePoint"/><mxPoint x="464" y="299" as="targetPoint"/><Array as="points"><mxPoint x="892" y="148"/><mxPoint x="464" y="148"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_null" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1176" y="398" as="sourcePoint"/><mxPoint x="1290" y="455" as="targetPoint"/><Array as="points"><mxPoint x="1176" y="455"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_dlq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="668" y="484" as="sourcePoint"/><mxPoint x="1290" y="559" as="targetPoint"/><Array as="points"><mxPoint x="668" y="559"/></Array></mxGeometry></mxCell>`
  );
  const gDlqHtml = `<table style="width:200px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;line-height:1.25;">[retryCount &gt;= 5 || xsdFatalError]<br/>freezeSLATimer()</td></tr></table>`;
  cells.push(
    `<mxCell id="lbl_g08_dlq" value="${esc(gDlqHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="900" y="518" width="210" height="34" as="geometry"/></mxCell>`
  );

  // Bottom Synchronized Regulatory SLA Clock Bar
  cells.push(
    `<mxCell id="g08_sla_frame" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.6;" vertex="1" parent="1"><mxGeometry x="18" y="632" width="1500" height="202" as="geometry"/></mxCell>`
  );
  const slaHdrHtml =
    `<table style="width:1440px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
    `<div style="font-size:17px;font-weight:800;color:#0F172A;">Synchronized Regulatory SLA Clock Bar</div>` +
    `<div style="font-size:13.5px;font-weight:600;color:#1E3A8A;margin-top:4px;">Formula: T_regulatory_sla = sum(T_intake + T_agent + T_clinical_review) - sum(T_reporter_follow_up_hold)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_sla_hdr" value="${esc(slaHdrHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="48" y="646" width="1440" height="52" as="geometry"/></mxCell>`
  );

  // 4 Segmented Gauge Bars
  cells.push(
    `<mxCell id="g08_bar_green" value="" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#2E9E5B;strokeColor=#14532D;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="28" y="718" width="918" height="54" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_bar_yellow" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FACC15;strokeColor=#A16207;strokeWidth=1.4;dashed=1;dashPattern=5 4;" vertex="1" parent="1"><mxGeometry x="946" y="718" width="236" height="54" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_bar_amber" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#D97706;strokeColor=#78350F;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="1182" y="718" width="106" height="54" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_bar_red" value="" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#7F1D1D;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="1288" y="718" width="214" height="54" as="geometry"/></mxCell>`
  );

  const slaCapHtml = `<table style="width:1440px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:14px;font-weight:700;color:#0F172A;">Green: 0-80% Active &nbsp;|&nbsp; Yellow: Paused (Clock-Stop) &nbsp;|&nbsp; Amber: 80% Soft Warning &nbsp;|&nbsp; Red: 100% FDA/EMA Breach</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_sla_cap" value="${esc(slaCapHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="48" y="784" width="1440" height="32" as="geometry"/></mxCell>`
  );

  return wrapDrawioEnvelope('canonical_91_g08', 'G-08: UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle', cells);
}

/**
 * G-09 (ID '92'): Formal Yourdon/DeMarco Data Flow Diagram (DFD Level 1 — PHI Tokenization & AE Lineage)
 * Reference: media_1793069043759.png (1536x858)
 */
export function generateTemplate92G09YourdonDfdXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g09_title', 'G-09: Formal Yourdon/DeMarco Data Flow Diagram (DFD Level 1 — PHI Tokenization & AE Lineage)'));

  const colHdrs = [
    { id: 'g09_ch1', x: 64, w: 240, text: 'EXTERNAL ENTITIES\n(Rectangles)' },
    { id: 'g09_ch2', x: 616, w: 220, text: 'PROCESSES\n(Numbered Circles)' },
    { id: 'g09_ch3', x: 1168, w: 300, text: 'DATA STORES\n(Open-Ended Parallel Bars)' },
  ];
  for (const ch of colHdrs) {
    const html = `<table style="width:${ch.w}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13.5px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(ch.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ch.id}" value="${esc(html)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${ch.x}" y="76" width="${ch.w}" height="40" as="geometry"/></mxCell>`
    );
  }

  // External Entities E1, E2
  const e1Html = `<table style="width:196px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:700;color:#0F172A;line-height:1.3;">E1: Patient / HCP Reporter<br/>&amp; EHR FHIR Source</td></tr></table>`;
  cells.push(
    `<mxCell id="dfd_e1" value="${esc(e1Html)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="80" y="160" width="212" height="86" as="geometry"/></mxCell>`
  );
  const e2Html = `<table style="width:196px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:700;color:#0F172A;line-height:1.3;">E2: FDA FAERS / EMA<br/>EudraVigilance Gateway</td></tr></table>`;
  cells.push(
    `<mxCell id="dfd_e2" value="${esc(e2Html)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="80" y="728" width="212" height="84" as="geometry"/></mxCell>`
  );

  // Processes P1.0 .. P4.0 (Circles)
  const procs = [
    { id: 'dfd_p1', y: 132, title: 'P1.0:', body: 'Validate, Screen\n& Tokenize PHI\n(Apigee X + Model\nArmor + Cloud DLP)' },
    { id: 'dfd_p2', y: 318, title: 'P2.0:', body: 'Chunk, Embed &\nMedDRA Hybrid RAG\n(Dataflow + Vertex\nAI Embeddings)' },
    { id: 'dfd_p3', y: 504, title: 'P3.0:', body: 'Execute Guardrailed\nClinical Inference\n(Gemini Enterprise\nADK + Gemini 3.0 Pro)' },
    { id: 'dfd_p4', y: 690, title: 'P4.0:', body: 'Apply 21 CFR Part 11\ne-Sign, Commit &\nEmit E2B(R3)\n(Cloud Run + KMS)' },
  ];
  for (const p of procs) {
    const pHtml =
      `<table style="width:136px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;line-height:1.22;">` +
      `<div style="font-size:12.5px;font-weight:800;color:#0F172A;">${esc(p.title)}</div>` +
      `<div style="font-size:10.5px;font-weight:600;color:#0F172A;margin-top:2px;">${esc(p.body).replace(/\n/g, '<br/>')}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${p.id}" value="${esc(pHtml)}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="648" y="${p.y}" width="154" height="154" as="geometry"/></mxCell>`
    );
  }

  // Data Stores D1 .. D5 (Open-Ended Parallel Bars)
  const stores = [
    { id: 'dfd_d1', y: 142, text: 'D1: Cloud Storage\nRaw PHI Quarantine Vault [CMEK AES-256]' },
    { id: 'dfd_d2', y: 234, text: 'D2: Cloud DLP & KMS\nSurrogate Token Vault' },
    { id: 'dfd_d3', y: 362, text: 'D3: AlloyDB\nAI pgvector + ScaNN MedDRA/WHODrug Index' },
    { id: 'dfd_d4', y: 586, text: 'D4: AlloyDB\nOperational ICSR Store (ACID + Outbox)' },
    { id: 'dfd_d5', y: 742, text: 'D5: BigQuery & GCS WORM\n21 CFR Part 11 Audit Ledger [SHA-256 Chained]' },
  ];
  for (const ds of stores) {
    const dHtml = `<table style="width:276px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;line-height:1.3;">${esc(ds.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ds.id}" value="${esc(dHtml)}" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1168" y="${ds.y}" width="292" height="58" as="geometry"/></mxCell>`
    );
  }

  // Data Flow Edges
  const flows: Array<{ id: string; src: string; tgt: string; label: string; lx: number; ly: number; lw: number }> = [
    { id: 'f_e1_p1', src: 'dfd_e1', tgt: 'dfd_p1', label: 'Raw AE Payload\n[CLASS: RESTRICTED-PHI | TLS 1.3]', lx: 356, ly: 162, lw: 224 },
    { id: 'f_p1_d1', src: 'dfd_p1', tgt: 'dfd_d1', label: 'Encrypted Raw PHI [CMEK AES-256]', lx: 876, ly: 140, lw: 230 },
    { id: 'f_p1_d2', src: 'dfd_p1', tgt: 'dfd_d2', label: 'Surrogate Token Mapping', lx: 886, ly: 228, lw: 210 },
    { id: 'f_p1_p2', src: 'dfd_p1', tgt: 'dfd_p2', label: 'Tokenized AE Event [INTERNAL-PSEUDONYMIZED]', lx: 734, ly: 288, lw: 270 },
    { id: 'f_p2_d3', src: 'dfd_p2', tgt: 'dfd_d3', label: 'Top-K MedDRA Embeddings & Grounded Context', lx: 866, ly: 356, lw: 256 },
    { id: 'f_p2_p3', src: 'dfd_p2', tgt: 'dfd_p3', label: 'Grounded MedDRA Context [Budget <= 32k]', lx: 734, ly: 474, lw: 248 },
    { id: 'f_p3_p4', src: 'dfd_p3', tgt: 'dfd_p4', label: 'Validated E2B(R3) JSON + Citations', lx: 734, ly: 660, lw: 220 },
    { id: 'f_p4_d4', src: 'dfd_p4', tgt: 'dfd_d4', label: 'ACID ICSR Record + Outbox', lx: 888, ly: 616, lw: 200 },
    { id: 'f_p4_d5', src: 'dfd_p4', tgt: 'dfd_d5', label: 'Signed E2B(R3) + Audit Trail [SHA-256]', lx: 876, ly: 738, lw: 240 },
    { id: 'f_p4_e2', src: 'dfd_p4', tgt: 'dfd_e2', label: 'Signed ICH E2B(R3) XML [AS2 mTLS]', lx: 356, ly: 732, lw: 224 },
  ];
  for (const fl of flows) {
    cells.push(
      `<mxCell id="${fl.id}" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1" source="${fl.src}" target="${fl.tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
    const lHtml = `<table style="width:${fl.lw}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(fl.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${fl.id}_lbl" value="${esc(lHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${fl.lx}" y="${fl.ly}" width="${fl.lw}" height="32" as="geometry"/></mxCell>`
    );
  }

  return wrapDrawioEnvelope('canonical_92_g09', 'G-09: Formal Yourdon/DeMarco Data Flow Diagram (DFD Level 1 — PHI Tokenization & AE Lineage)', cells);
}

/**
 * G-10 (ID '93'): Physical ERD & DDL Schema (AlloyDB for PostgreSQL 16 + AlloyDB AI ScaNN — PV Domain)
 * Reference: media_1793069049609.png (1536x858)
 */
export function generateTemplate93G10PhysicalErdDdlXml(): string {
  const cells: string[] = [];
  cells.push(topTitleCell('g10_title', 'G-10: Physical ERD & DDL Schema (AlloyDB for PostgreSQL 16 + AlloyDB AI ScaNN — PV Domain)'));

  interface ErdEntitySpec {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    name: string;
    hdrBg: string;
    cols: Array<[string, string, string]>;
    footer?: string;
  }

  const entities: ErdEntitySpec[] = [
    {
      id: 'erd_tenants',
      x: 56,
      y: 122,
      w: 396,
      h: 184,
      name: 'tenants_sponsors',
      hdrBg: '#3B78E7',
      cols: [
        ['PK', 'sponsor_id', 'UUID NOT NULL'],
        ['', 'org_tier', 'VARCHAR(32)'],
        ['', 'cmek_key_uri', 'TEXT'],
      ],
      footer: '[RLS: sponsor_isolation_policy]',
    },
    {
      id: 'erd_cases',
      x: 564,
      y: 122,
      w: 408,
      h: 282,
      name: 'icsr_cases',
      hdrBg: '#2E9E5B',
      cols: [
        ['PK', 'case_id', 'UUID NOT NULL'],
        ['FK', 'sponsor_id', 'UUID'],
        ['', 'safety_report_id', 'VARCHAR(64) UNIQUE'],
        ['', 'status', 'icsr_state_enum'],
        ['', 'seriousness_flag', 'BOOLEAN'],
        ['', 'fda_sla_deadline', 'TIMESTAMPTZ'],
        ['', 'payload_sha256', 'CHAR(64)'],
        ['', 'xmin_lock', 'BIGINT'],
      ],
      footer: '[PARTITION BY RANGE (created_at) MONTHLY]',
    },
    {
      id: 'erd_docs',
      x: 1080,
      y: 122,
      w: 406,
      h: 224,
      name: 'ae_source_documents',
      hdrBg: '#F59E0B',
      cols: [
        ['PK', 'doc_id', 'UUID NOT NULL'],
        ['FK', 'case_id', 'UUID'],
        ['', 'gcs_vault_uri', 'TEXT'],
        ['', 'fhir_bundle_id', 'VARCHAR(128)'],
        ['', 'dlp_tokenized', 'BOOLEAN DEFAULT true'],
        ['', 'surrogate_token_map', 'JSONB'],
      ],
    },
    {
      id: 'erd_audit',
      x: 56,
      y: 528,
      w: 396,
      h: 248,
      name: 'part11_worm_audit_outbox',
      hdrBg: '#2E9E5B',
      cols: [
        ['PK', 'audit_id', 'UUID NOT NULL'],
        ['FK', 'case_id', 'UUID'],
        ['', 'signer_principal', 'TEXT'],
        ['', 'e_signature_meaning', 'VARCHAR(64)'],
        ['', 'kms_signature_b64', 'TEXT'],
        ['', 'prev_hash', 'CHAR(64)'],
      ],
      footer: '[TRIGGER: tr_enforce_21cfr11_append_only]',
    },
    {
      id: 'erd_runs',
      x: 564,
      y: 528,
      w: 408,
      h: 282,
      name: 'adk_clinical_inference_runs',
      hdrBg: '#3B78E7',
      cols: [
        ['PK', 'run_id', 'UUID NOT NULL'],
        ['FK', 'case_id', 'UUID'],
        ['', 'agent_spiffe_id', 'TEXT'],
        ['', 'model_id', 'VARCHAR(64)'],
        ['', 'meddra_version', 'VARCHAR(16)'],
        ['', 'mean_logprob', 'NUMERIC(5,4)'],
        ['', 'e2b_r3_payload', 'JSONB'],
        ['', 'trace_id', 'CHAR(32)'],
      ],
      footer: '[IDX: idx_gin_e2b USING gin]',
    },
    {
      id: 'erd_vectors',
      x: 1080,
      y: 528,
      w: 406,
      h: 248,
      name: 'meddra_whodrug_vectors',
      hdrBg: '#DC2626',
      cols: [
        ['PK', 'term_id', 'UUID NOT NULL'],
        ['', 'meddra_pt_code', 'INT'],
        ['', 'term_text', 'TEXT'],
        ['', 'embedding', 'VECTOR(768)'],
      ],
      footer: '[IDX: idx_scann_meddra USING scann (embedding cosine) WITH (num_leaves=1000, quantizer=sq8)]',
    },
  ];

  for (const ent of entities) {
    const rowsHtml = ent.cols
      .map(
        ([k, col, typ]) =>
          `<tr>` +
          `<td style="width:36px;padding:3px 6px;font-weight:800;color:#0F172A;border-right:1px solid #CBD5E1;text-align:center;">${esc(k)}</td>` +
          `<td style="width:162px;padding:3px 8px;font-weight:${k === 'PK' ? '800' : '600'};color:#0F172A;">${esc(col)}</td>` +
          `<td style="padding:3px 8px;font-weight:600;color:#1E293B;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;">${esc(typ)}</td>` +
          `</tr>`
      )
      .join('');

    const ftrRow = ent.footer
      ? `<tr><td colspan="3" style="background:#E2E8F0;border-top:1.5px solid #475569;padding:6px 8px;text-align:center;font-size:11px;font-weight:700;color:#0F172A;">${esc(ent.footer)}</td></tr>`
      : '';

    const tblHtml =
      `<table style="width:${ent.w - 4}px;border-collapse:collapse;font-family:Inter,sans-serif;font-size:12px;">` +
      `<tr><td colspan="3" style="background:${ent.hdrBg};color:#FFFFFF;padding:9px 12px;text-align:center;font-size:15px;font-weight:800;border-bottom:1.5px solid #0F172A;">${esc(ent.name)}</td></tr>` +
      rowsHtml +
      ftrRow +
      `</table>`;

    cells.push(
      `<mxCell id="${ent.id}" value="${esc(tblHtml)}" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=top;overflow=fill;" vertex="1" parent="1"><mxGeometry x="${ent.x}" y="${ent.y}" width="${ent.w}" height="${ent.h}" as="geometry"/></mxCell>`
    );
  }

  // Crow's Foot 1:N Edges with explicit corridor routing from parent PK to child FK
  const erStyle = 'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.8;startArrow=ERone;startFill=0;endArrow=ERmany;endFill=0;';
  cells.push(
    `<mxCell id="rel_1" value="" style="${erStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="452" y="214" as="sourcePoint"/><mxPoint x="564" y="214" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="rel_2" value="" style="${erStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="972" y="234" as="sourcePoint"/><mxPoint x="1080" y="234" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="rel_3" value="" style="${erStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="680" y="404" as="sourcePoint"/><mxPoint x="254" y="528" as="targetPoint"/><Array as="points"><mxPoint x="680" y="466"/><mxPoint x="254" y="466"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="rel_4" value="" style="${erStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="768" y="404" as="sourcePoint"/><mxPoint x="768" y="528" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="rel_5" value="" style="${erStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="972" y="652" as="sourcePoint"/><mxPoint x="1080" y="652" as="targetPoint"/></mxGeometry></mxCell>`
  );

  return wrapDrawioEnvelope('canonical_93_g10', 'G-10: Physical ERD & DDL Schema (AlloyDB for PostgreSQL 16 + AlloyDB AI ScaNN — PV Domain)', cells);
}
