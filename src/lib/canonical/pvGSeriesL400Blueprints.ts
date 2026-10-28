/**
 * PV Case Processing L400 G-Series Reference Blueprints (#94..#98 = G-01-L400..G-08-L400)
 * 1:1 Draw.io mxGraphModel XML compiled from user-uploaded L400 reference images:
 *   - #94 (G-01-L400): G-01: L400 C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform
 *   - #95 (G-02-L400): G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane — ICSR Adverse Event Lifecycle
 *   - #96 (G-03-L400): G-03: L400 Multi-Persona User Journey, OpenTelemetry & Gemini Enterprise Touchpoint Blueprint
 *   - #97 (G-04-L400): G-04: L400 UML Use Case, IAM/PAM & Agent Identity Separation-of-Duties (SoD) Boundary
 *   - #98 (G-08-L400): G-08: L400 UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle
 *
 * Canvas Geometry: 1536 x 858 (1.5x scale of 1024 x 572 binary PNGs, aspect ratio 1.7902)
 */
import { GOOGLE_CLOUD_OFFICIAL_SVG } from '@/lib/gcpOfficialSvgAssets';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function gcpIconUri(key: keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG): string {
  const raw = GOOGLE_CLOUD_OFFICIAL_SVG[key] || GOOGLE_CLOUD_OFFICIAL_SVG.vertex_ai;
  return `data:image/svg+xml,${encodeURIComponent(raw).replace(/;/g, '%3B')}`;
}

function wrapDrawioEnvelope(diagramId: string, name: string, cells: string[]): string {
  return `<mxfile host="PromptCanvas" modified="2026-10-27T00:00:00.000Z" agent="PromptCanvas G-Series L400 Reference Compiler v1.0" version="24.7.8" type="device">
  <diagram id="${diagramId}" name="${esc(name)}">
    <mxGraphModel dx="1536" dy="858" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="858" math="0" shadow="0" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="g01_root" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;container=1;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="4" y="4" width="1528" height="850" as="geometry"/>
        </mxCell>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

function topTitleCell(id: string, title: string): string {
  const html = `<table style="width:1490px;border-collapse:collapse;font-family:Inter,system-ui,sans-serif;"><tr><td style="text-align:center;font-size:21px;font-weight:800;color:#0F172A;letter-spacing:-0.01em;">${esc(title)}</td></tr></table>`;
  return `<mxCell id="${id}" value="${esc(html)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="22" y="12" width="1492" height="40" as="geometry"/></mxCell>`;
}

/**
 * #94 (G-01-L400): G-01: L400 C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform
 * Reference: media_1793073398410.png (1536x858)
 */
export function generateTemplate94G01L400C4ContextXml(): string {
  const cells: string[] = [];
  cells.push(
    topTitleCell(
      'g01_l400_title',
      'G-01: L400 C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform'
    )
  );

  // Left Column Container (Light Gray #ECEFF1)
  cells.push(
    `<mxCell id="g01_l400_left_col" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="26" y="64" width="312" height="726" as="geometry"/></mxCell>`
  );
  const leftHdr = `<table style="width:288px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#0F172A;font-size:14px;font-weight:800;line-height:1.25;">EXTERNAL ACTORS &amp;<br/>UPSTREAM SOURCES</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_l400_left_hdr" value="${esc(leftHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="38" y="76" width="288" height="44" as="geometry"/></mxCell>`
  );

  const leftCards = [
    {
      id: 'g01_l400_l1',
      y: 136,
      h: 138,
      title: 'External AE Reporters',
      sub: '(Patients/HCPs via Web/Mobile Portal, OAuth 2.1 DPoP, mTLS 1.3)',
      pillId: 'g01_l400_p1',
      pillText: 'AE Case\nIngestion',
    },
    {
      id: 'g01_l400_l2',
      y: 298,
      h: 142,
      title: 'Internal Clinical Safety & QPPV Reviewers',
      sub: '(BeyondCorp Enterprise, FIDO2 WebAuthn 21 CFR Part 11 Dual e-Sign)',
      pillId: 'g01_l400_p2',
      pillText: 'Identity &\nVocab Sync',
    },
    {
      id: 'g01_l400_l3',
      y: 464,
      h: 142,
      title: 'Clinical Trial EDC & Hospital EHR Systems',
      sub: '(HL7 FHIR R4 Bundles, Enterprise Clinical & ERP SoR over Partner Interconnect)',
      pillId: 'g01_l400_p3',
      pillText: 'Audit\nStream',
    },
    {
      id: 'g01_l400_l4',
      y: 630,
      h: 142,
      title: 'Corporate IdP & Controlled Vocabularies',
      sub: '(Cloud Identity / WIF OIDC, MedDRA v27.1 & WHODrug Global B3/C3 Releases)',
      pillId: '',
      pillText: '',
    },
  ];

  for (const c of leftCards) {
    const html =
      `<table style="width:264px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:14px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(c.title)}</div>` +
      `<div style="font-size:11.5px;font-weight:500;color:#1E293B;line-height:1.3;margin-top:4px;">${esc(c.sub)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${c.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="42" y="${c.y}" width="280" height="${c.h}" as="geometry"/></mxCell>`
    );

    const cy = Math.round(c.y + c.h / 2);
    cells.push(
      `<mxCell id="${c.id}_edge" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.6;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="322" y="${cy}" as="sourcePoint"/><mxPoint x="484" y="${cy}" as="targetPoint"/></mxGeometry></mxCell>`
    );
    if (c.pillId) {
      const pillHtml = `<table style="width:94px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#0F172A;font-size:11px;font-weight:700;line-height:1.2;">${esc(c.pillText).replace(/\n/g, '<br/>')}</td></tr></table>`;
      cells.push(
        `<mxCell id="${c.pillId}" value="${esc(pillHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.3;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="352" y="${cy - 21}" width="104" height="42" as="geometry"/></mxCell>`
      );
    }
  }

  // Center Column Container
  cells.push(
    `<mxCell id="g01_l400_center_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="464" y="64" width="608" height="726" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g01_l400_gc_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('vertex_ai')};" vertex="1" parent="1"><mxGeometry x="490" y="78" width="42" height="42" as="geometry"/></mxCell>`
  );
  const gcHdrHtml = `<table style="width:260px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:24px;font-weight:700;color:#475569;">Google Cloud</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_l400_gc_txt" value="${esc(gcHdrHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="542" y="78" width="280" height="42" as="geometry"/></mxCell>`
  );

  // Blue System Box
  cells.push(
    `<mxCell id="g01_l400_sys" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#4A86E8;strokeColor=#1E3A8A;strokeWidth=1.8;" vertex="1" parent="1"><mxGeometry x="484" y="136" width="568" height="638" as="geometry"/></mxCell>`
  );
  const sysHdr =
    `<table style="width:540px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;">` +
    `<div style="font-size:18px;font-weight:800;">Pharmacovigilance &amp; AE AI Platform</div>` +
    `<div style="font-size:12px;font-weight:600;margin-top:3px;">(Google Cloud VPC-SC restricted.googleapis.com | Gemini Enterprise ADK)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_l400_sys_hdr" value="${esc(sysHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="498" y="146" width="540" height="52" as="geometry"/></mxCell>`
  );

  const centerCards = [
    {
      id: 'g01_l400_c1',
      y: 214,
      h: 132,
      title: 'Multimodal AE Intake & Triage',
      sub: '(Apigee X FHIR/AS2 Gateway, Document AI Custom Extractor, Model Armor)',
      icon: 'apigee' as const,
    },
    {
      id: 'g01_l400_c2',
      y: 368,
      h: 132,
      title: 'Gemini 2.5 Pro Agentic Extraction & MedDRA Coding',
      sub: '(Google ADK Runtime, A2A Registry, AlloyDB AI ScaNN Vector RAG)',
      icon: 'alloydb' as const,
    },
    {
      id: 'g01_l400_c3',
      y: 522,
      h: 132,
      title: 'ICH E2B(R3) Compliance & Causality Engine',
      sub: '(OPA Rego XSD Validator, 21 CFR Part 11 Cryptographic Signer)',
      icon: 'scc' as const,
    },
  ];

  for (const cc of centerCards) {
    const html =
      `<table style="width:420px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:15px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(cc.title)}</div>` +
      `<div style="font-size:12px;font-weight:500;color:#1E293B;line-height:1.35;margin-top:5px;">${esc(cc.sub)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${cc.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;spacingLeft=56;" vertex="1" parent="1"><mxGeometry x="504" y="${cc.y}" width="528" height="${cc.h}" as="geometry"/></mxCell>`
    );
    cells.push(
      `<mxCell id="${cc.id}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(cc.icon)};" vertex="1" parent="1"><mxGeometry x="528" y="${cc.y + 42}" width="48" height="48" as="geometry"/></mxCell>`
    );
  }

  // Trust & Governance Invariants Bar at bottom of blue container
  const govHtml =
    `<table style="width:548px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
    `<div style="font-size:14.5px;font-weight:800;color:#0F172A;">Trust &amp; Governance Invariants</div>` +
    `<div style="font-size:11.5px;font-weight:600;color:#0F172A;margin-top:3px;line-height:1.3;">(VPC Service Controls | Cloud KMS FIPS 140-3 Level 3 HSM CMEK | Cloud DLP CryptoHash/FPE | Cloud Monitoring Alerting | GAMP 5 Cat 4/5)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_l400_gov" value="${esc(govHtml)}" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#1E3A8A;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="484" y="676" width="568" height="98" as="geometry"/></mxCell>`
  );

  // Right Column Container
  cells.push(
    `<mxCell id="g01_l400_right_col" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="1198" y="64" width="312" height="726" as="geometry"/></mxCell>`
  );
  const rightHdr = `<table style="width:288px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#0F172A;font-size:14px;font-weight:800;line-height:1.25;">DOWNSTREAM SYSTEMS<br/>&amp; REGULATORS</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_l400_right_hdr" value="${esc(rightHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1210" y="76" width="288" height="44" as="geometry"/></mxCell>`
  );

  const rightCards = [
    {
      id: 'g01_l400_r1',
      y: 136,
      h: 176,
      title: 'Safety Database of Record',
      sub: '(Enterprise Regulatory Vault SoR — Idempotent Dedup & Case Commit)',
      pillId: '',
      pillText: '',
    },
    {
      id: 'g01_l400_r2',
      y: 348,
      h: 186,
      title: 'Global Regulatory Gateways',
      sub: '(FDA FAERS / EMA EudraVigilance / PMDA — AS2 MDN Signed ICH E2B(R3) XML)',
      pillId: 'g01_l400_rp2',
      pillText: 'Regulatory\nE2B(R3)',
    },
    {
      id: 'g01_l400_r3',
      y: 572,
      h: 196,
      title: 'Immutable Audit & SIEM Archive',
      sub: '(Google SecOps Chronicle & GCS WORM Retention Lock 21 CFR Part 11)',
      pillId: 'g01_l400_rp3',
      pillText: 'Safety Case\nDelivery',
    },
  ];

  for (const rc of rightCards) {
    const html =
      `<table style="width:264px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:15px;font-weight:800;color:#0F172A;line-height:1.25;">${esc(rc.title)}</div>` +
      `<div style="font-size:12px;font-weight:500;color:#1E293B;line-height:1.35;margin-top:6px;">${esc(rc.sub)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${rc.id}" value="${esc(html)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1214" y="${rc.y}" width="280" height="${rc.h}" as="geometry"/></mxCell>`
    );

    const cy = Math.round(rc.y + rc.h / 2);
    cells.push(
      `<mxCell id="${rc.id}_edge" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.6;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1052" y="${cy}" as="sourcePoint"/><mxPoint x="1214" y="${cy}" as="targetPoint"/></mxGeometry></mxCell>`
    );
    if (rc.pillId) {
      const pillHtml = `<table style="width:98px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#0F172A;font-size:11px;font-weight:700;line-height:1.2;">${esc(rc.pillText).replace(/\n/g, '<br/>')}</td></tr></table>`;
      cells.push(
        `<mxCell id="${rc.pillId}" value="${esc(pillHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#0F172A;strokeWidth=1.3;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1078" y="${cy - 21}" width="108" height="42" as="geometry"/></mxCell>`
      );
    }
  }

  // Bottom C4 Legend Bar (x=26, y=800, w=1484, h=44; fits inside pageHeight=858 with 14px bottom margin and 0 clipping)
  const ftrHtml =
    `<table style="width:1460px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr>` +
    `<td style="text-align:left;padding-left:10px;font-size:12.5px;font-weight:800;color:#0F172A;white-space:nowrap;">C4 Legend &amp; Architectural Invariants:</td>` +
    `<td style="text-align:right;padding-right:10px;font-size:11.5px;font-weight:600;color:#1E293B;white-space:nowrap;">` +
    `<span style="display:inline-block;width:10px;height:10px;background:#4A86E8;border:1px solid #1E3A8A;border-radius:2px;vertical-align:middle;margin-right:5px;"></span>Target System (VPC-SC)` +
    `&nbsp;&nbsp;&bull;&nbsp;&nbsp;` +
    `<span style="display:inline-block;width:10px;height:10px;background:#FFFFFF;border:1.5px solid #0F172A;border-radius:2px;vertical-align:middle;margin-right:5px;"></span>External Actor / Enterprise SoR` +
    `&nbsp;&nbsp;&bull;&nbsp;&nbsp;` +
    `<span style="display:inline-block;width:10px;height:10px;background:#E2E8F0;border:1px solid #0F172A;border-radius:5px;vertical-align:middle;margin-right:5px;"></span>mTLS 1.3 / AS2 MDN Contract` +
    `&nbsp;&nbsp;&bull;&nbsp;&nbsp;` +
    `<span style="display:inline-block;width:10px;height:10px;background:#93C5FD;border:1px solid #1E3A8A;border-radius:2px;vertical-align:middle;margin-right:5px;"></span>FIPS 140-3 CMEK &amp; 21 CFR Part 11 WORM` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g01_l400_ftr" value="${esc(ftrHtml)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.3;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="26" y="800" width="1484" height="44" as="geometry"/></mxCell>`
  );

  return wrapDrawioEnvelope(
    'canonical_94_g01_l400',
    'G-01: L400 C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform',
    cells
  );
}

/**
 * #95 (G-02-L400): G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane — ICSR Adverse Event Lifecycle
 * Reference: media_1793073407905.png (1536x858)
 */
export function generateTemplate95G02L400BpmnSwimlaneXml(): string {
  const cells: string[] = [];
  cells.push(
    topTitleCell(
      'g02_l400_title',
      'G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane — ICSR Adverse Event Lifecycle'
    )
  );

  // ==================== TOP POOL: AS-IS LEGACY MANUAL ICSR WORKFLOW ====================
  cells.push(
    `<mxCell id="g02_l400_asis_pool" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.6;" vertex="1" parent="1"><mxGeometry x="24" y="64" width="1488" height="316" as="geometry"/></mxCell>`
  );
  const asisHdr = `<table style="width:1460px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13.5px;font-weight:800;color:#0F172A;">AS-IS LEGACY MANUAL ICSR WORKFLOW (P99 Cycle: 7.4 Days | Touch Time: 185m | Error Rate: 14.2%)</td></tr></table>`;
  cells.push(
    `<mxCell id="g02_l400_asis_hdr" value="${esc(asisHdr)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="24" y="64" width="1488" height="34" as="geometry"/></mxCell>`
  );

  // Left vertical label "Swimlane"
  const asisVtabHtml = `<div style="writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:12px;font-weight:800;color:#0F172A;letter-spacing:0.04em;">Swimlane</div>`;
  cells.push(
    `<mxCell id="g02_l400_asis_vtab" value="${esc(asisVtabHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="24" y="98" width="34" height="282" as="geometry"/></mxCell>`
  );

  // 4 Vertical Columns in As-Is Pool
  const asisCols = [
    {
      id: 'asis_c1',
      x: 58,
      w: 242,
      title: 'AE Reporter',
      sub: '(Fax/PDF/Email Intake)',
    },
    {
      id: 'asis_c2',
      x: 300,
      w: 318,
      title: 'Triage & Data Entry',
      sub: '(Manual Case Booking ->\n72h SLA Timer Escalation)',
    },
    {
      id: 'asis_c3',
      x: 618,
      w: 584,
      title: 'Medical Reviewer',
      sub: '(Manual MedDRA Coding & Narrative Drafting -> Exclusive XOR Gateway:\nMissing Info 38% Rework Loop -> Dual-Control Manual Sign-Off)',
    },
    {
      id: 'asis_c4',
      x: 1202,
      w: 310,
      title: 'Safety DB Batch',
      sub: '(Overnight SFTP E2B XML\nTransmission -> Case Closed)',
    },
  ];

  for (const col of asisCols) {
    cells.push(
      `<mxCell id="${col.id}_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#0F172A;strokeWidth=1.1;" vertex="1" parent="1"><mxGeometry x="${col.x}" y="98" width="${col.w}" height="282" as="geometry"/></mxCell>`
    );
    const chHtml =
      `<table style="width:${col.w - 16}px;table-layout:fixed;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;word-wrap:break-word;overflow-wrap:break-word;">` +
      `<div style="font-size:12px;font-weight:800;color:#0F172A;">${esc(col.title)}</div>` +
      `<div style="font-size:10px;font-weight:500;color:#1E293B;line-height:1.22;">${esc(col.sub).replace(/\n/g, '<br/>')}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${col.id}_hdr" value="${esc(chHtml)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${col.x + 8}" y="102" width="${col.w - 16}" height="52" as="geometry"/></mxCell>`
    );
  }

  // As-Is BPMN Shapes
  cells.push(
    `<mxCell id="l400_asis_start" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#D9EAD3;strokeColor=#274E13;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="128" y="232" width="44" height="44" as="geometry"/></mxCell>`
  );
  const startCap = `<table style="width:120px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:600;color:#0F172A;">Fax/PDF/Email<br/>Intake</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_start_lbl" value="${esc(startCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="90" y="280" width="120" height="34" as="geometry"/></mxCell>`
  );

  const bookHtml = `<table style="width:120px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:700;color:#0F172A;">Manual Case<br/>Booking</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_book" value="${esc(bookHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="332" y="214" width="132" height="80" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="l400_asis_timer" value="⏱" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFF2CC;strokeColor=#B45309;strokeWidth=2;fontSize=22;" vertex="1" parent="1"><mxGeometry x="514" y="232" width="44" height="44" as="geometry"/></mxCell>`
  );
  const timerCap = `<table style="width:120px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:600;color:#0F172A;">72h SLA Timer<br/>Escalation</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_timer_lbl" value="${esc(timerCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="476" y="280" width="120" height="34" as="geometry"/></mxCell>`
  );

  const codeHtml = `<table style="width:142px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:700;color:#0F172A;">Manual MedDRA<br/>Coding &amp; Narrative<br/>Drafting</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_code" value="${esc(codeHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="664" y="214" width="152" height="80" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="l400_asis_xor" value="&lt;b style=&quot;font-size:20px;color:#0F172A;&quot;&gt;X&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#B45309;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="886" y="226" width="56" height="56" as="geometry"/></mxCell>`
  );
  const xorCap = `<table style="width:136px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:600;color:#0F172A;">Missing Info<br/>38% Rework Loop?</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_xor_lbl" value="${esc(xorCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="846" y="284" width="136" height="34" as="geometry"/></mxCell>`
  );

  const signHtml = `<table style="width:128px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:700;color:#0F172A;">Dual-Control<br/>Manual Sign-Off</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_sign" value="${esc(signHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1020" y="214" width="138" height="80" as="geometry"/></mxCell>`
  );

  const sftpHtml = `<table style="width:132px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:700;color:#0F172A;">Overnight SFTP<br/>E2B XML<br/>Transmission</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_sftp" value="${esc(sftpHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1244" y="214" width="142" height="80" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="l400_asis_end" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F4CCCC;strokeColor=#0F172A;strokeWidth=4;" vertex="1" parent="1"><mxGeometry x="1428" y="232" width="44" height="44" as="geometry"/></mxCell>`
  );
  const endCap = `<table style="width:94px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:700;color:#0F172A;">Case Closed</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_asis_end_lbl" value="${esc(endCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1403" y="280" width="94" height="24" as="geometry"/></mxCell>`
  );

  // As-Is Edges
  const eStyle = 'endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;';
  cells.push(`<mxCell id="e_l400_a1" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="172" y="254" as="sourcePoint"/><mxPoint x="332" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_a2" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="464" y="254" as="sourcePoint"/><mxPoint x="514" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_a3" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="558" y="254" as="sourcePoint"/><mxPoint x="664" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_a4" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="816" y="254" as="sourcePoint"/><mxPoint x="886" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_a5" value="No" style="${eStyle}fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="942" y="254" as="sourcePoint"/><mxPoint x="1020" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_a6" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1158" y="254" as="sourcePoint"/><mxPoint x="1244" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_a7" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1386" y="254" as="sourcePoint"/><mxPoint x="1428" y="254" as="targetPoint"/></mxGeometry></mxCell>`);
  // Top & Bottom Rework Loop Arrows
  cells.push(
    `<mxCell id="e_l400_rework_top" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="914" y="226" as="sourcePoint"/><mxPoint x="398" y="214" as="targetPoint"/><Array as="points"><mxPoint x="914" y="182"/><mxPoint x="398" y="182"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_l400_rework_bot" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="914" y="320" as="sourcePoint"/><mxPoint x="398" y="294" as="targetPoint"/><Array as="points"><mxPoint x="914" y="346"/><mxPoint x="398" y="346"/></Array></mxGeometry></mxCell>`
  );

  // ==================== BOTTOM POOL: TO-BE GEMINI ENTERPRISE ADK AUTOMATED WORKFLOW ====================
  cells.push(
    `<mxCell id="g02_l400_tobe_pool" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.6;" vertex="1" parent="1"><mxGeometry x="24" y="400" width="1488" height="442" as="geometry"/></mxCell>`
  );
  const tobeHdr = `<table style="width:1460px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13.5px;font-weight:800;color:#0F172A;">TO-BE GEMINI ENTERPRISE ADK AUTOMATED WORKFLOW (P99 Cycle: 9.8s | Straight-Through Processing: 92.4% | Error Rate: 0.08%)</td></tr></table>`;
  cells.push(
    `<mxCell id="g02_l400_tobe_hdr" value="${esc(tobeHdr)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="24" y="400" width="1488" height="34" as="geometry"/></mxCell>`
  );

  const tobeVtabHtml = `<div style="writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:12px;font-weight:800;color:#0F172A;letter-spacing:0.04em;">Swim Pool</div>`;
  cells.push(
    `<mxCell id="g02_l400_tobe_vtab" value="${esc(tobeVtabHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="24" y="434" width="34" height="408" as="geometry"/></mxCell>`
  );

  // 5 Vertical Columns in To-Be Pool
  const tobeCols = [
    {
      id: 'tobe_c1',
      x: 58,
      w: 238,
      title: 'Eventarc & Apigee X Ingress',
      sub: '(Cloud Storage Object Finalize &\nFHIR R4 Webhook Start ->\nParallel AND Gateway)',
    },
    {
      id: 'tobe_c2',
      x: 296,
      w: 312,
      title: 'Gemini Enterprise ADK & Document AI',
      sub: '(Parallel Tasks: Document AI Layout OCR +\nAlloyDB ScaNN MedDRA v27.1 Auto-Coding +\nGemini 3.0 Pro Clinical Narrative Synthesis)',
    },
    {
      id: 'tobe_c3',
      x: 608,
      w: 332,
      title: 'Model Armor, Cloud DLP & OPA Gate',
      sub: '(De-Identification FPE + ICH E2B(R3) XSD\nValidation -> Parallel Join -> Exclusive XOR:\nLogprob >= 0.96 & Seriousness == False)',
    },
    {
      id: 'tobe_c4',
      x: 940,
      w: 282,
      title: 'Transactional Outbox & AS2 Gateway',
      sub: '(Yes 92.4%: AlloyDB Outbox Commit ->\nPub/Sub Emit -> Signed E2B(R3)\nAuto-Submit -> Case Closed STP)',
    },
    {
      id: 'tobe_c5',
      x: 1222,
      w: 290,
      title: 'QPPV Clinical HITL Exception Queue',
      sub: '(No 7.6%: 2h Boundary SLA Timer +\nFIDO2 21 CFR Part 11 Dual e-Signature +\nSaga Compensation -> Case Closed HITL)',
    },
  ];

  for (const col of tobeCols) {
    cells.push(
      `<mxCell id="${col.id}_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#0F172A;strokeWidth=1.1;" vertex="1" parent="1"><mxGeometry x="${col.x}" y="434" width="${col.w}" height="408" as="geometry"/></mxCell>`
    );
    const chHtml =
      `<table style="width:${col.w - 16}px;table-layout:fixed;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;word-wrap:break-word;overflow-wrap:break-word;">` +
      `<div style="font-size:11.5px;font-weight:800;color:#0F172A;">${esc(col.title)}</div>` +
      `<div style="font-size:9.5px;font-weight:500;color:#1E293B;line-height:1.2;">${esc(col.sub).replace(/\n/g, '<br/>')}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${col.id}_hdr" value="${esc(chHtml)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${col.x + 8}" y="438" width="${col.w - 16}" height="68" as="geometry"/></mxCell>`
    );
  }

  // To-Be Nodes
  cells.push(
    `<mxCell id="l400_tobe_start" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#D9EAD3;strokeColor=#274E13;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="108" y="642" width="44" height="44" as="geometry"/></mxCell>`
  );
  const tbStartCap = `<table style="width:136px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:600;color:#0F172A;line-height:1.25;">Cloud Storage<br/>Object Finalize<br/>&amp; FHIR R4<br/>Webhook Start</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tobe_start_lbl" value="${esc(tbStartCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="62" y="692" width="136" height="68" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="l400_tobe_split" value="&lt;b style=&quot;font-size:22px;color:#0F172A;&quot;&gt;+&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#B45309;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="210" y="636" width="56" height="56" as="geometry"/></mxCell>`
  );

  const tbParallel = [
    { id: 'l400_tb_p1', y: 540, text: 'Document AI\nLayout OCR' },
    { id: 'l400_tb_p2', y: 632, text: 'AlloyDB ScaNN\nMedDRA v27.1\nAuto-Coding' },
    { id: 'l400_tb_p3', y: 726, text: 'Gemini 3.0 Pro\nClinical Narrative\nSynthesis' },
  ];
  for (const p of tbParallel) {
    const pHtml = `<table style="width:122px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;line-height:1.22;">${esc(p.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${p.id}" value="${esc(pHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="376" y="${p.y}" width="132" height="76" as="geometry"/></mxCell>`
    );
  }

  const deidHtml = `<table style="width:128px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;line-height:1.22;">De-Identification<br/>FPE &amp;<br/>ICH E2B(R3)<br/>XSD Validation</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_deid" value="${esc(deidHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="618" y="626" width="136" height="84" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="l400_tb_join" value="&lt;b style=&quot;font-size:22px;color:#0F172A;&quot;&gt;+&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#B45309;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="784" y="640" width="56" height="56" as="geometry"/></mxCell>`
  );

  cells.push(
    `<mxCell id="l400_tb_xor" value="&lt;b style=&quot;font-size:20px;color:#0F172A;&quot;&gt;X&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#B45309;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="872" y="640" width="56" height="56" as="geometry"/></mxCell>`
  );
  const tbXorCap = `<table style="width:126px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:600;color:#0F172A;line-height:1.2;">Logprob &gt;= 0.96<br/>&amp; Seriousness<br/>== False?</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_xor_lbl" value="${esc(tbXorCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="835" y="700" width="128" height="44" as="geometry"/></mxCell>`
  );

  // Top Yes branch (STP)
  const stp1Html = `<table style="width:104px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">AlloyDB<br/>Outbox<br/>Commit</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_stp1" value="${esc(stp1Html)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="996" y="546" width="112" height="78" as="geometry"/></mxCell>`
  );
  const stp2Html = `<table style="width:96px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">Pub/Sub<br/>Emit</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_stp2" value="${esc(stp2Html)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1142" y="546" width="108" height="78" as="geometry"/></mxCell>`
  );
  const stp3Html = `<table style="width:106px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:700;color:#0F172A;">Signed<br/>E2B(R3)<br/>Auto-Submit</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_stp3" value="${esc(stp3Html)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1284" y="546" width="116" height="78" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="l400_tb_end_stp" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F4CCCC;strokeColor=#0F172A;strokeWidth=4;" vertex="1" parent="1"><mxGeometry x="1438" y="563" width="44" height="44" as="geometry"/></mxCell>`
  );
  const endStpCap = `<table style="width:90px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:700;color:#0F172A;">Case Closed<br/>STP</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_end_stp_lbl" value="${esc(endStpCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1413" y="611" width="92" height="32" as="geometry"/></mxCell>`
  );

  // Bottom No branch (HITL)
  const hitlHtml = `<table style="width:168px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:700;color:#0F172A;line-height:1.22;">FIDO2 21 CFR Part 11<br/>Dual e-Signature &amp;<br/>Saga Compensation<br/>Handler</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_hitl" value="${esc(hitlHtml)}" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1014" y="712" width="178" height="86" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="l400_tb_timer" value="⏱" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFF2CC;strokeColor=#B45309;strokeWidth=2;fontSize=22;" vertex="1" parent="1"><mxGeometry x="1256" y="733" width="44" height="44" as="geometry"/></mxCell>`
  );
  const tbTimerCap = `<table style="width:108px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:600;color:#0F172A;">2h Boundary<br/>SLA Timer</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_timer_lbl" value="${esc(tbTimerCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1223" y="781" width="110" height="32" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="l400_tb_end_hitl" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F4CCCC;strokeColor=#0F172A;strokeWidth=4;" vertex="1" parent="1"><mxGeometry x="1438" y="733" width="44" height="44" as="geometry"/></mxCell>`
  );
  const endHitlCap = `<table style="width:90px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11px;font-weight:700;color:#0F172A;">Case Closed<br/>HITL</td></tr></table>`;
  cells.push(
    `<mxCell id="l400_tb_end_hitl_lbl" value="${esc(endHitlCap)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1413" y="781" width="92" height="32" as="geometry"/></mxCell>`
  );

  // To-Be Edges (explicit corridor routing)
  cells.push(`<mxCell id="e_l400_tb_s" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="152" y="664" as="sourcePoint"/><mxPoint x="210" y="664" as="targetPoint"/></mxGeometry></mxCell>`);
  for (const p of tbParallel) {
    const cy = p.y + 38;
    cells.push(
      `<mxCell id="e_l400_sp_${p.id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="266" y="664" as="sourcePoint"/><mxPoint x="376" y="${cy}" as="targetPoint"/><Array as="points"><mxPoint x="336" y="664"/><mxPoint x="336" y="${cy}"/></Array></mxGeometry></mxCell>`
    );
    cells.push(
      `<mxCell id="e_l400_jn_${p.id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="508" y="${cy}" as="sourcePoint"/><mxPoint x="618" y="668" as="targetPoint"/><Array as="points"><mxPoint x="554" y="${cy}"/><mxPoint x="554" y="668"/></Array></mxGeometry></mxCell>`
    );
  }
  cells.push(`<mxCell id="e_l400_deid_jn" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="754" y="668" as="sourcePoint"/><mxPoint x="784" y="668" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_jn_xor" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="840" y="668" as="sourcePoint"/><mxPoint x="872" y="668" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(
    `<mxCell id="e_l400_xor_yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="900" y="640" as="sourcePoint"/><mxPoint x="996" y="585" as="targetPoint"/><Array as="points"><mxPoint x="900" y="585"/></Array></mxGeometry></mxCell>`
  );
  cells.push(`<mxCell id="e_l400_stp1_2" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1108" y="585" as="sourcePoint"/><mxPoint x="1142" y="585" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_stp2_3" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1250" y="585" as="sourcePoint"/><mxPoint x="1284" y="585" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_stp3_end" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1400" y="585" as="sourcePoint"/><mxPoint x="1438" y="585" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(
    `<mxCell id="e_l400_xor_no" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="928" y="668" as="sourcePoint"/><mxPoint x="1014" y="755" as="targetPoint"/><Array as="points"><mxPoint x="974" y="668"/><mxPoint x="974" y="755"/></Array></mxGeometry></mxCell>`
  );
  cells.push(`<mxCell id="e_l400_hitl_tm" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1192" y="755" as="sourcePoint"/><mxPoint x="1256" y="755" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_l400_tm_end" value="" style="${eStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1300" y="755" as="sourcePoint"/><mxPoint x="1438" y="755" as="targetPoint"/></mxGeometry></mxCell>`);

  return wrapDrawioEnvelope(
    'canonical_95_g02_l400',
    'G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane — ICSR Adverse Event Lifecycle',
    cells
  );
}

/**
 * #96 (G-03-L400): G-03: L400 Multi-Persona User Journey, OpenTelemetry & Gemini Enterprise Touchpoint Blueprint
 * Reference: media_1793073413944.png (1536x858)
 */
export function generateTemplate96G03L400UserJourneyXml(): string {
  const cells: string[] = [];
  cells.push(
    topTitleCell(
      'g03_l400_title',
      'G-03: L400 Multi-Persona User Journey, OpenTelemetry & Gemini Enterprise Touchpoint Blueprint'
    )
  );

  // 5 Top Chevron Stage Headers
  const stages = [
    { id: 'g03_l400_s1', x: 228, text: '1. Zero-Trust\nAuth & Intake' },
    { id: 'g03_l400_s2', x: 486, text: '2. Multimodal FHIR\n& Doc Ingestion' },
    { id: 'g03_l400_s3', x: 744, text: '3. Gemini ADK &\nMedDRA ScaNN Triage' },
    { id: 'g03_l400_s4', x: 1002, text: '4. QPPV Clinical Diff\n& Part 11 e-Sign' },
    { id: 'g03_l400_s5', x: 1260, text: '5. AS2 E2B(R3)\nRelease & WORM Audit' },
  ];
  for (const st of stages) {
    const html = `<table style="width:236px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;color:#FFFFFF;font-size:13px;font-weight:800;line-height:1.25;">${esc(st.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${st.id}" value="${esc(html)}" style="shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=18;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.4;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${st.x}" y="70" width="252" height="66" as="geometry"/></mxCell>`
    );
  }

  // 5 Swimlane Rows
  const lanes = [
    {
      id: 'g03_l400_r1',
      y: 150,
      h: 136,
      label: 'Patient / HCP\nReporter\nPersona',
      items: [
        { title: 'OIDC/Passkey\nPortal\n(p99: 75ms)', fg: '#1D4ED8', icon: 'iam' as const },
        { title: 'Chunked Resumable\nAE Upload\n(p99: 290ms)', fg: '#0F172A', icon: 'cloud_storage' as const },
        { title: 'Real-Time\nAck Receipt', fg: '#0F172A' },
        { title: 'Follow-Up\nQuery Prompt', fg: '#0F172A' },
        { title: 'Final\nConfirmation', fg: '#0F172A' },
      ],
    },
    {
      id: 'g03_l400_r2',
      y: 286,
      h: 136,
      label: 'Drug Safety\nAssociate (DSA)\nPersona',
      items: [
        { title: 'BeyondCorp\nSSO', fg: '#0F172A', icon: 'iap' as const },
        { title: 'Priority Queue\nClaim\n(gRPC-Web Stream)', fg: '#0F172A', icon: 'pubsub' as const },
        { title: 'Side-by-Side\nMedDRA PT/LLT Diff\n& Bounding-Box\nInspection', fg: '#0F172A', icon: 'document_ai' as const },
        { title: 'Clinical Narrative\nOverride', fg: '#0F172A' },
        { title: 'Audit Trail View', fg: '#0F172A' },
      ],
    },
    {
      id: 'g03_l400_r3',
      y: 422,
      h: 136,
      label: 'QPPV Medical\nReviewer\nPersona',
      items: [
        { title: 'PAM JIT\nElevation', fg: '#0F172A', icon: 'secret_manager' as const },
        { title: 'Seriousness &\nListedness Triage', fg: '#0F172A' },
        { title: 'Causality\nAssessment\n(WHO-UMC Scale)', fg: '#0F172A' },
        { title: 'FIDO2 WebAuthn\n21 CFR Part 11\nDual e-Signature', fg: '#0F172A', icon: 'cloud_kms' as const },
        { title: 'FDA FAERS /\nEMA Release', fg: '#0F172A' },
      ],
    },
    {
      id: 'g03_l400_r4',
      y: 558,
      h: 136,
      label: 'Frontstage\nEdge &\nAPI Mesh',
      items: [
        { title: 'Cloud CDN +\nCloud Armor WAF', fg: '#0F172A', icon: 'cloud_armor' as const },
        { title: 'Apigee X FHIR R4\n& Managed MCP\nServer', fg: '#0F172A', icon: 'apigee' as const },
        { title: 'gRPC-Web /\nServer-Sent Events\n(SSE) Token Stream', fg: '#0F172A', icon: 'cloud_load_balancing' as const },
        { title: 'If-Match ETag\nOptimistic\nConcurrency Control', fg: '#0F172A' },
        { title: 'AS2 mTLS\nGateway', fg: '#0F172A', icon: 'cloud_nat' as const },
      ],
    },
    {
      id: 'g03_l400_r5',
      y: 694,
      h: 142,
      label: 'Backstage\nGemini ADK &\nOpenTelemetry',
      items: [
        { title: 'W3C\ntraceparent\nPropagation', fg: '#0F172A', icon: 'cloud_monitoring' as const },
        { title: 'Cloud DLP\nCryptoHash +\nDocument AI OCR\n(p99: 410ms)', fg: '#0F172A', icon: 'document_ai' as const },
        { title: 'Gemini 3.0 Pro +\nAlloyDB AI ScaNN\nCosine Lookup\n(p99: 1.1s)', fg: '#0F172A', icon: 'alloydb' as const },
        { title: 'Cloud KMS\nFIPS 140-3\nAsymmetric Sign\n(EC-P384)', fg: '#0F172A', icon: 'cloud_kms' as const },
        { title: 'BigQuery OTel\nTrace & Token\nFinOps Sink\n(p99: 60ms)', fg: '#0F172A', icon: 'bigquery' as const },
      ],
    },
  ];

  for (let rIdx = 0; rIdx < lanes.length; rIdx++) {
    const ln = lanes[rIdx];
    cells.push(
      `<mxCell id="${ln.id}_bg" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1"><mxGeometry x="16" y="${ln.y}" width="1500" height="${ln.h}" as="geometry"/></mxCell>`
    );
    const hdrHtml = `<table style="width:196px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:15px;font-weight:700;color:#0F172A;line-height:1.25;">${esc(ln.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${ln.id}_hdr" value="${esc(hdrHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="16" y="${ln.y}" width="208" height="${ln.h}" as="geometry"/></mxCell>`
    );

    for (let cIdx = 0; cIdx < ln.items.length; cIdx++) {
      const it = ln.items[cIdx];
      const cellId = `${ln.id}_c${cIdx + 1}`;
      const cx = stages[cIdx].x + 14;
      const cy = ln.y + 18;
      const cw = 218;
      const ch = ln.h - 36;

      const tHtml = `<table style="width:${it.icon ? cw - 44 : cw - 10}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:600;color:${it.fg};line-height:1.22;">${esc(it.title).replace(/\n/g, '<br/>')}</td></tr></table>`;
      cells.push(
        `<mxCell id="${cellId}" value="${esc(tHtml)}" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;align=center;verticalAlign=middle;${it.icon ? 'spacingLeft=34;' : ''}" vertex="1" parent="1"><mxGeometry x="${cx}" y="${cy}" width="${cw}" height="${ch}" as="geometry"/></mxCell>`
      );
      if (it.icon) {
        cells.push(
          `<mxCell id="${cellId}_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri(it.icon)};" vertex="1" parent="1"><mxGeometry x="${cx + 8}" y="${cy + Math.round((ch - 32) / 2)}" width="32" height="32" as="geometry"/></mxCell>`
        );
      }

      if (cIdx > 0) {
        const prevX = stages[cIdx - 1].x + 232;
        const midY = Math.round(ln.y + ln.h / 2);
        cells.push(
          `<mxCell id="${cellId}_he" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.5;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${prevX}" y="${midY}" as="sourcePoint"/><mxPoint x="${cx}" y="${midY}" as="targetPoint"/></mxGeometry></mxCell>`
        );
      }
    }
  }

  // Vertical Touchpoint Arrows routed through dedicated inter-stage corridors so they connect
  // Stage 1/2 Reporter & Stage 3 DSA & Stage 4/5 QPPV cleanly into Frontstage & Backstage without crossing text cards
  const vStyle = 'edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=block;endFill=1;html=1;strokeColor=#2563EB;strokeWidth=1.5;';
  // Stage 1: Reporter (OIDC/Passkey Portal) -> Frontstage (Cloud CDN + WAF) -> Backstage (W3C traceparent) via corridor x=468
  cells.push(
    `<mxCell id="g03_l400_v1a" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="460" y="218" as="sourcePoint"/><mxPoint x="460" y="626" as="targetPoint"/><Array as="points"><mxPoint x="472" y="218"/><mxPoint x="472" y="626"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="g03_l400_v1b" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="351" y="676" as="sourcePoint"/><mxPoint x="351" y="712" as="targetPoint"/></mxGeometry></mxCell>`
  );
  // Stage 2: Reporter (Chunked Resumable AE Upload) -> Frontstage (Apigee X FHIR R4) -> Backstage (Cloud DLP + Doc AI) via corridor x=730
  cells.push(
    `<mxCell id="g03_l400_v2a" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="718" y="218" as="sourcePoint"/><mxPoint x="718" y="626" as="targetPoint"/><Array as="points"><mxPoint x="730" y="218"/><mxPoint x="730" y="626"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="g03_l400_v2b" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="609" y="676" as="sourcePoint"/><mxPoint x="609" y="712" as="targetPoint"/></mxGeometry></mxCell>`
  );
  // Stage 3: DSA (MedDRA PT/LLT Diff) <-> Frontstage (gRPC-Web SSE) -> Backstage (Gemini 3.0 Pro + AlloyDB ScaNN) via corridor x=988
  cells.push(
    `<mxCell id="g03_l400_v3a" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="976" y="354" as="sourcePoint"/><mxPoint x="976" y="626" as="targetPoint"/><Array as="points"><mxPoint x="988" y="354"/><mxPoint x="988" y="626"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="g03_l400_v3b" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="867" y="676" as="sourcePoint"/><mxPoint x="867" y="712" as="targetPoint"/></mxGeometry></mxCell>`
  );
  // Stage 4: QPPV (FIDO2 Part 11 Dual e-Signature) -> Frontstage (If-Match ETag) -> Backstage (Cloud KMS EC-P384)
  cells.push(
    `<mxCell id="g03_l400_v4a" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1125" y="540" as="sourcePoint"/><mxPoint x="1125" y="576" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="g03_l400_v4b" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1125" y="676" as="sourcePoint"/><mxPoint x="1125" y="712" as="targetPoint"/></mxGeometry></mxCell>`
  );
  // Stage 5: QPPV (FDA FAERS / EMA Release) -> Frontstage (AS2 mTLS Gateway) -> Backstage (BigQuery OTel Sink)
  cells.push(
    `<mxCell id="g03_l400_v5a" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1383" y="540" as="sourcePoint"/><mxPoint x="1383" y="576" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="g03_l400_v5b" value="" style="${vStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1383" y="676" as="sourcePoint"/><mxPoint x="1383" y="712" as="targetPoint"/></mxGeometry></mxCell>`
  );

  return wrapDrawioEnvelope(
    'canonical_96_g03_l400',
    'G-03: L400 Multi-Persona User Journey, OpenTelemetry & Gemini Enterprise Touchpoint Blueprint',
    cells
  );
}

/**
 * #97 (G-04-L400): G-04: L400 UML Use Case, IAM/PAM & Agent Identity Separation-of-Duties (SoD) Boundary
 * Reference: media_1793073419754.png (1536x858)
 */
export function generateTemplate97G04L400UmlUseCaseSodXml(): string {
  const cells: string[] = [];
  cells.push(
    topTitleCell(
      'g04_l400_title',
      'G-04: L400 UML Use Case, IAM/PAM & Agent Identity Separation-of-Duties (SoD) Boundary'
    )
  );

  // 5 Left Stick-Figure Actors positioned so their horizontal association arrows leave the stick-figure torso
  // at y = cy (28px above the text label), guaranteeing 0.0px text intersection with SPIFFE / IAM role subtitles!
  const actors = [
    { id: 'g04_l400_a1', cy: 224, title: 'External AE Reporter', role: '(roles/pv.reporter)' },
    { id: 'g04_l400_a2', cy: 368, title: 'Autonomous ADK Triage Agent', role: '(spiffe://gcp.pv.prod/ns/adk/sa/meddra-coder)' },
    { id: 'g04_l400_a3', cy: 472, title: 'Drug Safety Associate', role: '(roles/pv.dsa)' },
    { id: 'g04_l400_a4', cy: 614, title: 'QPPV Medical Approver', role: '(roles/pv.qppv + PAM JIT 1h TTL)' },
    { id: 'g04_l400_a5', cy: 752, title: 'QA GxP Compliance Auditor', role: '(roles/logging.viewer)' },
  ];

  for (const act of actors) {
    const figY = act.cy - 24;
    cells.push(
      `<mxCell id="${act.id}_fig" value="" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;" vertex="1" parent="1"><mxGeometry x="172" y="${figY}" width="28" height="48" as="geometry"/></mxCell>`
    );
    const lblHtml =
      `<table style="width:340px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;">` +
      `<div style="font-size:12px;font-weight:700;color:#0F172A;line-height:1.15;">${esc(act.title)}</div>` +
      `<div style="font-size:10.5px;font-weight:500;color:#1E293B;line-height:1.15;">${esc(act.role)}</div>` +
      `</td></tr></table>`;
    cells.push(
      `<mxCell id="${act.id}_lbl" value="${esc(lblHtml)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="16" y="${figY + 50}" width="344" height="34" as="geometry"/></mxCell>`
    );
  }

  // Center System Boundary Box (Dashed)
  cells.push(
    `<mxCell id="g04_l400_sys" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.6;dashed=1;dashPattern=5 4;" vertex="1" parent="1"><mxGeometry x="392" y="92" width="684" height="732" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g04_l400_sys_ico" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('cloud_run')};" vertex="1" parent="1"><mxGeometry x="404" y="102" width="36" height="36" as="geometry"/></mxCell>`
  );
  const sysHdrHtml = `<table style="width:600px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:14px;font-weight:800;color:#0F172A;line-height:1.25;">Pharmacovigilance Case Platform (VPC-SC Perimeter +<br/>GCP IAM Deny Policies)</td></tr></table>`;
  cells.push(
    `<mxCell id="g04_l400_sys_hdr" value="${esc(sysHdrHtml)}" style="text;whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="444" y="98" width="608" height="42" as="geometry"/></mxCell>`
  );

  // 4 Security Zones inside Center Boundary
  const zones = [
    { id: 'g04_l400_z1', y: 156, h: 132, fill: '#DCE8FA', stroke: '#6C8EBF', title: '1) INTAKE ZONE' },
    { id: 'g04_l400_z2', y: 304, h: 222, fill: '#D5E8D4', stroke: '#82B366', title: '2) Zone 2 AGENTIC & DSA TRIAGE ZONE' },
    { id: 'g04_l400_z3', y: 546, h: 132, fill: '#FFF2CC', stroke: '#D6B656', title: 'ZONE 3 QPPV APPROVAL ZONE' },
    { id: 'g04_l400_z4', y: 692, h: 120, fill: '#F8CECC', stroke: '#B85450', title: 'ZONE 4 GX-P AUDIT ZONE' },
  ];
  for (const z of zones) {
    const zHtml = `<table style="width:620px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;padding:6px 10px;font-size:12.5px;font-weight:800;color:#0F172A;">${esc(z.title)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${z.id}" value="${esc(zHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${z.fill};strokeColor=${z.stroke};strokeWidth=1.4;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="416" y="${z.y}" width="636" height="${z.h}" as="geometry"/></mxCell>`
    );
  }

  // Use Case Ellipses
  const ellipses = [
    { id: 'uc_l400_1a', x: 452, y: 186, w: 204, h: 76, text: 'Submit AE / FHIR\nBundle', fill: '#E2E8F0', stroke: '#0F172A' },
    { id: 'uc_l400_1b', x: 804, y: 186, w: 224, h: 76, text: 'Cloud DLP FPE\nTokenize & KMS\nCMEK Encrypt', fill: '#E2E8F0', stroke: '#0F172A' },
    { id: 'uc_l400_2a', x: 452, y: 332, w: 204, h: 72, text: 'Execute A2A MedDRA\nAuto-Coding', fill: '#D5E8D4', stroke: '#0F172A' },
    { id: 'uc_l400_2b', x: 804, y: 332, w: 224, h: 72, text: 'Model Armor\nPrompt/Output Guardrail', fill: '#D5E8D4', stroke: '#0F172A' },
    { id: 'uc_l400_3a', x: 452, y: 436, w: 204, h: 72, text: 'Draft Clinical Narrative\n& Request Override', fill: '#D5E8D4', stroke: '#0F172A' },
    { id: 'uc_l400_3b', x: 804, y: 436, w: 224, h: 72, text: 'Trigger SecOps\nChronicle Alert', fill: '#D5E8D4', stroke: '#0F172A' },
    { id: 'uc_l400_4a', x: 452, y: 576, w: 204, h: 76, text: 'Approve & Release\nICH E2B(R3) XML', fill: '#FFF2CC', stroke: '#B45309' },
    { id: 'uc_l400_4b', x: 804, y: 576, w: 228, h: 76, text: 'Verify FIDO2 21 CFR\nPart 11 Dual e-Signature\n& PAM Dual-Custody', fill: '#FFF2CC', stroke: '#B45309' },
    { id: 'uc_l400_5a', x: 452, y: 716, w: 204, h: 72, text: 'Inspect SHA-256\nChained WORM\nAudit Trail', fill: '#F8CECC', stroke: '#991B1B' },
  ];
  for (const u of ellipses) {
    const uHtml = `<table style="width:${u.w - 20}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12px;font-weight:600;color:#0F172A;line-height:1.25;">${esc(u.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${u.id}" value="${esc(uHtml)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${u.fill};strokeColor=${u.stroke};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${u.x}" y="${u.y}" width="${u.w}" height="${u.h}" as="geometry"/></mxCell>`
    );
  }

  // Actor -> Left Use Case Arrows (horizontal at act.cy, strictly above actor text labels)
  const a2uc: Array<[string, number]> = [
    ['e_l400_au1', 224],
    ['e_l400_au2', 368],
    ['e_l400_au3', 472],
    ['e_l400_au4', 614],
    ['e_l400_au5', 752],
  ];
  for (const [eid, ay] of a2uc) {
    cells.push(
      `<mxCell id="${eid}" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="206" y="${ay}" as="sourcePoint"/><mxPoint x="452" y="${ay}" as="targetPoint"/></mxGeometry></mxCell>`
    );
  }

  // <<include>> / <<extend>> UML dashed arrows with explicit stereotype pills
  const incPairs: Array<[string, number, string]> = [
    ['e_l400_inc1', 224, '«include»'],
    ['e_l400_inc2', 368, '«include»'],
    ['e_l400_inc3', 472, '«extend»'],
    ['e_l400_inc4', 614, '«include»'],
  ];
  for (const [iid, iy, lbl] of incPairs) {
    cells.push(
      `<mxCell id="${iid}" value="" style="endArrow=open;endFill=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=5 4;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="656" y="${iy}" as="sourcePoint"/><mxPoint x="804" y="${iy}" as="targetPoint"/></mxGeometry></mxCell>`
    );
    const stHtml = `<table style="width:76px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;">${esc(lbl)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${iid}_pill" value="${esc(stHtml)}" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="690" y="${iy - 11}" width="80" height="22" as="geometry"/></mxCell>`
    );
  }

  // Red Dashed SoD Constraint Lines & Markers
  const redConstraintLine = 'dashed=1;dashPattern=4 4;strokeColor=#DC2626;strokeWidth=1.6;endArrow=none;html=1;';
  cells.push(
    `<mxCell id="sod_line_1" value="" style="${redConstraintLine}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="664" y="246" as="sourcePoint"/><mxPoint x="664" y="586" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="sod_x1" value="&lt;b style=&quot;color:#DC2626;font-size:15px;&quot;&gt;✕&lt;/b&gt;&lt;span style=&quot;color:#B91C1C;font-size:10.5px;font-weight:700;&quot;&gt; SoD Invariant 1&lt;br/&gt;Constraint&lt;/span&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;strokeColor=#FCA5A5;fillColor=#FEF2F2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="668" y="274" width="118" height="34" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="sod_line_2" value="" style="${redConstraintLine}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="664" y="396" as="sourcePoint"/><mxPoint x="664" y="592" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="sod_x2" value="&lt;b style=&quot;color:#DC2626;font-size:15px;&quot;&gt;✕&lt;/b&gt;&lt;span style=&quot;color:#B91C1C;font-size:10.5px;font-weight:700;&quot;&gt; SoD Invariant 2&lt;br/&gt;Constraint&lt;/span&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;strokeColor=#FCA5A5;fillColor=#FEF2F2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="668" y="514" width="118" height="34" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="sod_line_3" value="" style="${redConstraintLine}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1124" y="368" as="sourcePoint"/><mxPoint x="1124" y="752" as="targetPoint"/></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="sod_x3" value="&lt;b style=&quot;color:#DC2626;font-size:15px;&quot;&gt;✕&lt;/b&gt;&lt;div style=&quot;color:#B91C1C;font-size:10.5px;font-weight:700;&quot;&gt;SoD Invariant 3&lt;br/&gt;Constraint&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;strokeColor=#FCA5A5;fillColor=#FEF2F2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1064" y="482" width="120" height="44" as="geometry"/></mxCell>`
  );

  // Right Box: OPA Rego & GCP IAM CEL Policy Enforcement Point (PEP)
  cells.push(
    `<mxCell id="g04_l400_pep_shield" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;aspect=fixed;imageAspect=0;image=${gcpIconUri('iap')};" vertex="1" parent="1"><mxGeometry x="1328" y="138" width="52" height="52" as="geometry"/></mxCell>`
  );
  const pepHtml =
    `<table style="width:304px;border-collapse:collapse;font-family:Inter,sans-serif;">` +
    `<tr><td style="padding:12px 12px 10px 12px;border-bottom:1.5px solid #0F172A;text-align:center;">` +
    `<div style="font-size:14.5px;font-weight:800;color:#0F172A;line-height:1.25;">OPA Rego &amp; GCP IAM CEL<br/>Policy Enforcement Point (PEP)</div>` +
    `</td></tr>` +
    `<tr><td style="padding:16px 14px;text-align:left;font-size:12px;color:#0F172A;line-height:1.45;">` +
    `<div style="margin-bottom:16px;">• <b>SoD Invariant 1:</b><br/>request.auth.principal !=<br/>resource.intake_submitter_principal<br/>(Submitter != Approver)</div>` +
    `<div style="margin-bottom:16px;">• <b>SoD Invariant 2:</b><br/>SPIFFE Agent Identity Denied<br/>Direct Regulatory Release<br/>(spiffe://*/sa/* != roles/pv.qppv)</div>` +
    `<div>• <b>SoD Invariant 3:</b><br/>Mutually Exclusive IAM Group<br/>Binding<br/>(DSA Operator != QA GxP Auditor)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g04_l400_pep" value="${esc(pepHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.8;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1198" y="204" width="322" height="620" as="geometry"/></mxCell>`
  );

  // Validation arrows from each zone to PEP
  for (const vy of [224, 368, 614, 752]) {
    cells.push(
      `<mxCell id="e_l400_val_${vy}" value="Validation" style="endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.6;fontSize=11.5;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1052" y="${vy}" as="sourcePoint"/><mxPoint x="1198" y="${vy}" as="targetPoint"/></mxGeometry></mxCell>`
    );
  }

  return wrapDrawioEnvelope(
    'canonical_97_g04_l400',
    'G-04: L400 UML Use Case, IAM/PAM & Agent Identity Separation-of-Duties (SoD) Boundary',
    cells
  );
}

/**
 * #98 (G-08-L400): G-08: L400 UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle
 * Reference: media_1793073461237.png (1536x858)
 */
export function generateTemplate98G08L400StateMachineSlaXml(): string {
  const cells: string[] = [];
  cells.push(
    topTitleCell(
      'g08_l400_title',
      'G-08: L400 UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle'
    )
  );

  // Top Frame
  cells.push(
    `<mxCell id="g08_l400_top_bg" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="16" y="68" width="1504" height="584" as="geometry"/></mxCell>`
  );
  const subHdr = `<table style="width:620px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:19px;font-weight:800;color:#0F172A;">Formal UML 2.5 Hierarchical ICSR Statechart</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_subhdr" value="${esc(subHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="30" y="78" width="640" height="34" as="geometry"/></mxCell>`
  );

  // Initial State [*]
  cells.push(
    `<mxCell id="g08_l400_init_lbl" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;[*]&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="28" y="182" width="30" height="22" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_l400_init" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#CFE2F3;strokeColor=#1E3A8A;strokeWidth=1.8;" vertex="1" parent="1"><mxGeometry x="30" y="210" width="28" height="28" as="geometry"/></mxCell>`
  );

  // INGESTED
  const ingHtml =
    `<table style="width:242px;border-collapse:collapse;font-family:Inter,sans-serif;">` +
    `<tr><td style="background:#3B78E7;color:#FFFFFF;font-size:12.5px;font-weight:800;text-align:center;padding:6px;">INGESTED</td></tr>` +
    `<tr><td style="padding:8px 10px;font-size:11px;font-weight:700;color:#0F172A;line-height:1.3;">entry /<br/>initSLATimer(7d_fatal_or_15d_serious);<br/>emit IcsrReceivedEvent</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_ingested" value="${esc(ingHtml)}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DCE8FA;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=top;overflow=fill;" vertex="1" parent="1"><mxGeometry x="86" y="176" width="248" height="96" as="geometry"/></mxCell>`
  );

  // VALIDATED
  const valHtml = `<table style="width:96px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:12.5px;font-weight:800;color:#0F172A;">VALIDATED</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_validated" value="${esc(valHtml)}" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#60A5FA;strokeColor=#1E3A8A;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="480" y="196" width="104" height="58" as="geometry"/></mxCell>`
  );

  // Composite Superstate: AGENTIC_PROCESSING
  const compHdr =
    `<table style="width:520px;border-collapse:collapse;font-family:Inter,sans-serif;">` +
    `<tr><td style="text-align:center;font-size:12.5px;font-weight:800;color:#0F172A;padding-top:6px;">AGENTIC_PROCESSING</td></tr>` +
    `<tr><td style="text-align:left;padding:6px 14px;font-size:11px;font-weight:700;color:#0F172A;line-height:1.35;">do / executeADKPipeline();<br/>exit / recordTokenTelemetry();</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_comp" value="${esc(compHdr)}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FDE68A;strokeColor=#D97706;strokeWidth=1.8;dashed=1;dashPattern=5 4;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="616" y="152" width="530" height="164" as="geometry"/></mxCell>`
  );

  // 4 Substates inside AGENTIC_PROCESSING (2x2 row flow matching reference image)
  const subPills = [
    { id: 'g08_l400_sp1', x: 630, y: 226, w: 120, text: '1. DOC_AI_OCR' },
    { id: 'g08_l400_sp2', x: 768, y: 226, w: 248, text: '2. ALLOYDB_SCANN_MEDDRA_RAG' },
    { id: 'g08_l400_sp3', x: 656, y: 268, w: 214, text: '3. GEMINI_3_CAUSALITY_EVAL' },
    { id: 'g08_l400_sp4', x: 888, y: 268, w: 204, text: '4. OPA_E2B_R3_XSD_CHECK' },
  ];
  for (const sp of subPills) {
    const pHtml = `<table style="width:${sp.w - 10}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10.5px;font-weight:700;color:#0F172A;">${esc(sp.text)}</td></tr></table>`;
    cells.push(
      `<mxCell id="${sp.id}" value="${esc(pHtml)}" style="rounded=1;arcSize=30;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#B45309;strokeWidth=1.3;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${sp.x}" y="${sp.y}" width="${sp.w}" height="32" as="geometry"/></mxCell>`
    );
  }

  // Middle Row States: WAITING_CLINICAL_HITL (Yellow) -> SLA_ESCALATED_QPPV (Amber)
  const waitHtml = `<table style="width:166px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:800;color:#0F172A;line-height:1.25;">WAITING_CLINICAL_HITL<br/>(Yellow)</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_wait" value="${esc(waitHtml)}" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FACC15;strokeColor=#A16207;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="644" y="398" width="176" height="56" as="geometry"/></mxCell>`
  );
  const escHtml = `<table style="width:162px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:800;color:#0F172A;line-height:1.25;">SLA_ESCALATED_QPPV<br/>(Amber)</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_esc" value="${esc(escHtml)}" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F59E0B;strokeColor=#92400E;strokeWidth=1.6;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="988" y="398" width="172" height="56" as="geometry"/></mxCell>`
  );

  // Right Column Final States (4 stacked on the right with zero vertical lines crossing them!)
  const finals = [
    { id: 'g08_l400_f1', y: 196, label: 'AUTO_SUBMITTED_E2B\n(Green)', fill: '#6AA84F', fg: '#0F172A', stroke: '#274E13' },
    { id: 'g08_l400_f2', y: 396, label: 'QPPV_SIGNED_SUBMITTED\n(Green)', fill: '#6AA84F', fg: '#0F172A', stroke: '#274E13' },
    { id: 'g08_l400_f3', y: 498, label: 'NULLIFIED_COMPENSATED', fill: '#E06666', fg: '#FFFFFF', stroke: '#7F1D1D' },
    { id: 'g08_l400_f4', y: 594, label: 'DLQ_QUARANTINED\n(Red)', fill: '#990000', fg: '#FFFFFF', stroke: '#450A0A' },
  ];
  for (const fn of finals) {
    const fHtml = `<table style="width:186px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:11.5px;font-weight:800;color:${fn.fg};line-height:1.25;">${esc(fn.label).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${fn.id}" value="${esc(fHtml)}" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=${fn.fill};strokeColor=${fn.stroke};strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1302" y="${fn.y}" width="198" height="58" as="geometry"/></mxCell>`
    );
  }

  // Clean Non-Overlapping State Transitions & Guard Labels
  const tStyle = 'endArrow=block;endFill=1;html=1;strokeColor=#0F172A;strokeWidth=1.5;';
  cells.push(`<mxCell id="e_g08_l400_1" value="" style="${tStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="58" y="224" as="sourcePoint"/><mxPoint x="86" y="224" as="targetPoint"/></mxGeometry></mxCell>`);
  cells.push(`<mxCell id="e_g08_l400_2" value="" style="${tStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="334" y="224" as="sourcePoint"/><mxPoint x="480" y="224" as="targetPoint"/></mxGeometry></mxCell>`);
  const gValHtml = `<table style="width:144px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.2;">[fhirValid &amp;&amp; dlpTokenized<br/>&amp;&amp; modelArmorSafe] /<br/>persistRawVault()</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_2" value="${esc(gValHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1"><mxGeometry x="336" y="168" width="144" height="50" as="geometry"/></mxCell>`);

  cells.push(`<mxCell id="e_g08_l400_3" value="" style="${tStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="584" y="224" as="sourcePoint"/><mxPoint x="616" y="224" as="targetPoint"/></mxGeometry></mxCell>`);

  // AGENTIC_PROCESSING -> AUTO_SUBMITTED_E2B
  cells.push(`<mxCell id="e_g08_l400_auto" value="" style="${tStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1146" y="224" as="sourcePoint"/><mxPoint x="1302" y="224" as="targetPoint"/></mxGeometry></mxCell>`);
  const gAutoHtml = `<table style="width:152px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.2;">[confidence &gt;= 0.96 &amp;&amp;<br/>!seriousUnexpected] /<br/>stopSLATimer();<br/>commitOutbox()</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_auto" value="${esc(gAutoHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1"><mxGeometry x="1148" y="156" width="152" height="62" as="geometry"/></mxCell>`);

  // AGENTIC_PROCESSING -> WAITING_CLINICAL_HITL
  cells.push(
    `<mxCell id="e_g08_l400_wait" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="616" y="316" as="sourcePoint"/><mxPoint x="644" y="426" as="targetPoint"/><Array as="points"><mxPoint x="616" y="426"/></Array></mxGeometry></mxCell>`
  );
  const gWaitHtml = `<table style="width:236px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;font-size:10px;font-weight:700;color:#0F172A;line-height:1.25;">[confidence &lt; 0.96 || seriousUnexpected] /<br/>pauseSLATimer(HOLD_REPORTER_QUERY)</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_wait" value="${esc(gWaitHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="622" y="328" width="240" height="36" as="geometry"/></mxCell>`);

  // WAITING_CLINICAL_HITL -> SLA_ESCALATED_QPPV
  cells.push(`<mxCell id="e_g08_l400_esc" value="" style="${tStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="820" y="426" as="sourcePoint"/><mxPoint x="988" y="426" as="targetPoint"/></mxGeometry></mxCell>`);
  const gEscHtml = `<table style="width:164px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.2;">when(T_active &gt;= 80% SLA) /<br/>triggerQppvPagerDutyP1();<br/>resumeEscalationTimer()</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_esc" value="${esc(gEscHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1"><mxGeometry x="822" y="370" width="164" height="52" as="geometry"/></mxCell>`);

  // Dashed error/exception paths into SLA_ESCALATED_QPPV
  cells.push(
    `<mxCell id="e_g08_l400_err1" value="error/exception" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.4;dashed=1;dashPattern=5 4;endArrow=block;endFill=1;fontSize=10.5;fontStyle=1;labelBackgroundColor=#FAFAFA;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="732" y="454" as="sourcePoint"/><mxPoint x="1050" y="454" as="targetPoint"/><Array as="points"><mxPoint x="732" y="498"/><mxPoint x="1050" y="498"/></Array></mxGeometry></mxCell>`
  );
  cells.push(
    `<mxCell id="e_g08_l400_err2" value="error/exception" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.4;dashed=1;dashPattern=5 4;endArrow=block;endFill=1;fontSize=10.5;fontStyle=1;labelBackgroundColor=#FAFAFA;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="532" y="254" as="sourcePoint"/><mxPoint x="1058" y="454" as="targetPoint"/><Array as="points"><mxPoint x="532" y="544"/><mxPoint x="1058" y="544"/></Array></mxGeometry></mxCell>`
  );

  // SLA_ESCALATED_QPPV -> QPPV_SIGNED_SUBMITTED
  cells.push(`<mxCell id="e_g08_l400_qppv" value="" style="${tStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1160" y="426" as="sourcePoint"/><mxPoint x="1302" y="426" as="targetPoint"/></mxGeometry></mxCell>`);
  const gQppvHtml = `<table style="width:154px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.2;">[fido2Part11DualSign == true] /<br/>stopSLATimer()</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_qppv" value="${esc(gQppvHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1"><mxGeometry x="1150" y="384" width="154" height="36" as="geometry"/></mxCell>`);

  // SLA_ESCALATED_QPPV -> NULLIFIED_COMPENSATED (clean L-corridor at x=1114)
  cells.push(
    `<mxCell id="e_g08_l400_null" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1114" y="454" as="sourcePoint"/><mxPoint x="1302" y="527" as="targetPoint"/><Array as="points"><mxPoint x="1114" y="527"/></Array></mxGeometry></mxCell>`
  );
  const gNullHtml = `<table style="width:146px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.2;">[duplicateOrInvalid] /<br/>runSagaCompensation()</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_null" value="${esc(gNullHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1"><mxGeometry x="1136" y="486" width="146" height="36" as="geometry"/></mxCell>`);

  // AGENTIC_PROCESSING -> DLQ_QUARANTINED (clean bottom corridor at y=623)
  cells.push(
    `<mxCell id="e_g08_l400_dlq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="616" y="316" as="sourcePoint"/><mxPoint x="1302" y="623" as="targetPoint"/><Array as="points"><mxPoint x="616" y="623"/></Array></mxGeometry></mxCell>`
  );
  const gDlqHtml = `<table style="width:230px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:10px;font-weight:700;color:#0F172A;line-height:1.2;">[retryCount &gt;= 5 || xsdFatalPoisonPill] /<br/>freezeSLATimer();<br/>routeToDLQ()</td></tr></table>`;
  cells.push(`<mxCell id="lbl_g08_l400_dlq" value="${esc(gDlqHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;" vertex="1" parent="1"><mxGeometry x="832" y="566" width="234" height="52" as="geometry"/></mxCell>`);

  // Bottom Synchronized Regulatory SLA Clock Formula & State Bar
  cells.push(
    `<mxCell id="g08_l400_sla_bg" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="16" y="668" width="1504" height="174" as="geometry"/></mxCell>`
  );
  const slaHdr =
    `<table style="width:1460px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:left;">` +
    `<div style="font-size:18px;font-weight:800;color:#0F172A;">Synchronized Regulatory SLA Clock Formula &amp; State Bar</div>` +
    `<div style="font-size:14.5px;font-weight:700;color:#1E3A8A;margin-top:4px;">Formula: T_regulatory_sla = sum(T_intake + T_agent_inference + T_clinical_review) - sum(T_external_reporter_clock_stop_hold)</div>` +
    `</td></tr></table>`;
  cells.push(
    `<mxCell id="g08_l400_sla_hdr" value="${esc(slaHdr)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="30" y="676" width="1468" height="56" as="geometry"/></mxCell>`
  );

  // 4 Segmented Gauge Bars
  cells.push(
    `<mxCell id="g08_l400_b1" value="" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#6AA84F;strokeColor=#274E13;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="30" y="742" width="546" height="32" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_l400_b2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FACC15;strokeColor=#A16207;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="576" y="742" width="320" height="32" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_l400_b3" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F59E0B;strokeColor=#92400E;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="896" y="742" width="276" height="32" as="geometry"/></mxCell>`
  );
  cells.push(
    `<mxCell id="g08_l400_b4" value="" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#E06666;strokeColor=#991B1B;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="1172" y="742" width="328" height="32" as="geometry"/></mxCell>`
  );

  // 4 Labels under the 4 segments
  const barCaps = [
    { id: 'g08_l400_bc1', x: 30, w: 546, text: 'Green: 0-80% Active Processing' },
    { id: 'g08_l400_bc2', x: 576, w: 320, text: 'Yellow: Paused (Clock-Stop\nReporter Query)' },
    { id: 'g08_l400_bc3', x: 896, w: 276, text: 'Amber: 80% Soft Warning\nEscalation' },
    { id: 'g08_l400_bc4', x: 1172, w: 328, text: 'Red: 100% FDA/EMA SLA Breach\n(emit SLABreachedEvent)' },
  ];
  for (const bc of barCaps) {
    const bcHtml = `<table style="width:${bc.w}px;border-collapse:collapse;font-family:Inter,sans-serif;"><tr><td style="text-align:center;font-size:13px;font-weight:600;color:#0F172A;line-height:1.25;">${esc(bc.text).replace(/\n/g, '<br/>')}</td></tr></table>`;
    cells.push(
      `<mxCell id="${bc.id}" value="${esc(bcHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${bc.x}" y="782" width="${bc.w}" height="46" as="geometry"/></mxCell>`
    );
  }

  return wrapDrawioEnvelope(
    'canonical_98_g08_l400',
    'G-08: L400 UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle',
    cells
  );
}
