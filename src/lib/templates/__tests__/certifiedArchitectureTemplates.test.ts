import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  CERTIFIED_ARCHITECTURE_TEMPLATES,
  ARCHITECTURE_TEMPLATE_LEVELS,
  ARCHITECTURE_TEMPLATE_TYPES,
  ARCHITECTURE_TEMPLATE_KINDS,
  ARCHITECTURE_TEMPLATE_USE_CASES,
  filterCertifiedArchitectureTemplates,
  computeDynamicFacetCounts,
  getCertifiedArchitectureTemplateById,
} from '../certifiedArchitectureTemplates';
import { loadImmutableServerTemplateXml } from '../serverTemplateXmlLoader';
import {
  parseDrawioXmlSpatialState,
  applySpatialMutationPlan,
} from '@/lib/freeform/directDrawioSpatialMutator';

describe('Certified Architecture Templates (L200-L400, Zero-Bento, Immutable Clone-on-Lock)', () => {
  it('contains all 84 non-infographic templates (53 Tier 1 Primary · 31 Tier 2 Restyled) with 0 L100 and 0 Infographics', () => {
    expect(CERTIFIED_ARCHITECTURE_TEMPLATES.length).toBe(84);
    expect(ARCHITECTURE_TEMPLATE_LEVELS).toEqual(['L200', 'L300', 'L400']);

    const levels = new Set(CERTIFIED_ARCHITECTURE_TEMPLATES.map((t) => t.level as string));
    expect(levels.has('L100')).toBe(false);
    expect(CERTIFIED_ARCHITECTURE_TEMPLATES.filter((t) => t.level === 'L200').length).toBe(16);
    expect(CERTIFIED_ARCHITECTURE_TEMPLATES.filter((t) => t.level === 'L300').length).toBe(38);
    expect(CERTIFIED_ARCHITECTURE_TEMPLATES.filter((t) => t.level === 'L400').length).toBe(30);

    // #94 & #100 at L200; #84 & non-Bento Airy V4 #81 at L400; retired #69 aliases to #67
    const tpl94 = getCertifiedArchitectureTemplateById('94');
    expect(tpl94?.level).toBe('L200');
    expect(tpl94?.headerTag).toBe('Conceptual - L200 - C4 System Context & Boundary - GCP');
    expect(getCertifiedArchitectureTemplateById('100')?.level).toBe('L200');
    expect(getCertifiedArchitectureTemplateById('84')?.level).toBe('L400');
    expect(getCertifiedArchitectureTemplateById('81')?.level).toBe('L400');
    expect(getCertifiedArchitectureTemplateById('69')?.id).toBe('69');
    expect(getCertifiedArchitectureTemplateById('12')?.level).toBe('L200');
    expect(getCertifiedArchitectureTemplateById('116')?.level).toBe('L300');
    expect(getCertifiedArchitectureTemplateById('117')?.level).toBe('L300');

    // Infographics #52-#66 live on /infographics, never in /templates
    for (let id = 52; id <= 66; id++) {
      expect(getCertifiedArchitectureTemplateById(String(id))).toBeUndefined();
    }
  });

  it('enforces all 4 mandatory tags (Level, Type, Kind, Usecase) and deep Object.freeze immutability', () => {
    expect(Object.isFrozen(CERTIFIED_ARCHITECTURE_TEMPLATES)).toBe(true);
    for (const tpl of CERTIFIED_ARCHITECTURE_TEMPLATES) {
      expect(Object.isFrozen(tpl)).toBe(true);
      expect(ARCHITECTURE_TEMPLATE_LEVELS).toContain(tpl.level);
      expect(ARCHITECTURE_TEMPLATE_TYPES).toContain(tpl.type);
      expect(ARCHITECTURE_TEMPLATE_KINDS).toContain(tpl.kind);
      expect(ARCHITECTURE_TEMPLATE_USE_CASES).toContain(tpl.useCase);
      expect(tpl.previewImage).toMatch(/^\/architecture-templates\/template_[a-z0-9]+\.png$/);
      expect(tpl.thumbnailImage).toMatch(/^\/architecture-templates\/thumbs\/template_[a-z0-9]+\.png$/);
      expect(tpl.svgUrl).toMatch(/^\/architecture-templates\/svg\/template_[a-z0-9]+\.svg$/);
      expect(tpl.drawioUrl).toMatch(/^\/architecture-templates\/xml\/template_[a-z0-9]+\.drawio$/);
    }
  });

  it('computes dynamic cascading dropdown counts accurately across Level, Type, Kind, and UseCase', () => {
    const baseCounts = computeDynamicFacetCounts({
      level: 'All',
      type: 'All',
      kind: 'All',
      useCase: 'All',
    });
    expect(baseCounts.levels.All).toBe(84);
    expect(baseCounts.levels.L200).toBe(16);
    expect(baseCounts.levels.L300).toBe(38);
    expect(baseCounts.levels.L400).toBe(30);

    // Filtering by Type = Process dynamically narrows Level & Kind counts
    const processCounts = computeDynamicFacetCounts({
      level: 'All',
      type: 'Process',
      kind: 'All',
      useCase: 'All',
    });
    expect(processCounts.levels.All).toBe(11);
    expect(processCounts.levels.L200).toBe(4);
    expect(processCounts.levels.L300).toBe(4);
    expect(processCounts.levels.L400).toBe(3);
    expect(processCounts.kinds['BPMN 2.0 Swimlane']).toBe(3);
    expect(processCounts.kinds['UML State Machine']).toBe(2);

    const matching = filterCertifiedArchitectureTemplates({
      level: 'L300',
      type: 'Technical',
      kind: 'Flowchart / Pipeline DAG',
      useCase: 'Agentic AI, RAG & MLOps',
    });
    expect(matching.map((m) => m.id)).toEqual(['115', '67', '106', '69']);
    expect(baseCounts.tiers['Tier 1 · Primary Recommended']).toBe(53);
    expect(baseCounts.tiers['Tier 2 · Alternative Variant']).toBe(31);
  });

  it('resolves all 84 server-side XML templates safely with 0 legacy/AWS/corrupted terms, 0 Tailwind or Material purple, 0 swallowed HTML generics, and 100% level-badge parity', () => {
    const legacyRe = /\b(Apigee\s*X|BeyondCorp|Chronicle|Cloud\s+DLP|dlpTokenized|Sandbox\s+VM|PrivateLink|Private\s+Link|Vertex\s+AI\s+Gateway|Bento|L100|ALB|FIPS\s*140-3|Dataplex\s+Governance|GCS\s+WORM)\b/i;
    const purpleRe = /#(7C3AED|9333EA|6D28D9|FAF5FF|F3E8FF|EDE9FE|7B1FA2|6A1B9A|5E248C|C99CE8|EFE3FA|F3E8FD)/i;
    for (const tpl of CERTIFIED_ARCHITECTURE_TEMPLATES) {
      const xmlA = loadImmutableServerTemplateXml(tpl.id);
      const xmlB = loadImmutableServerTemplateXml(`arch_tpl_${tpl.id}`);
      expect(xmlA).toBeTruthy();
      expect(xmlA).toContain('<mxCell');
      expect(xmlA).toMatch(/<diagram\b[^>]*><mxGraphModel\b/);
      expect(xmlB).toBe(xmlA);
      expect(xmlA, `Legacy/AWS/corrupted branding in #${tpl.id}`).not.toMatch(legacyRe);
      expect(xmlA, `Tailwind or Material purple in #${tpl.id}`).not.toMatch(purpleRe);
      expect(`${tpl.headerTag} ${tpl.title} ${tpl.pattern} ${tpl.summary}`, `Legacy metadata in #${tpl.id}`).not.toMatch(legacyRe);
      // Guard against html=1 swallowing single-escaped UpperCamelCase generic type parameters like &lt;ToolSpec&gt;
      expect(xmlA, `Unescaped generic type swallowed by html=1 in #${tpl.id}`).not.toMatch(/value="[^"]*&lt;[A-Z][A-Za-z0-9_]*&gt;[^"]*"[^>]*style="[^"]*html=1/);
      const badgeM = xmlA!.match(/(?:TECHNICAL|LOGICAL|PROCESS|CONCEPTUAL|AGENTIC AI|CLOUD INFRA|SECURITY|DATA|FINOPS|FLOW|INFRA)[^<]{0,50}\b(L[1-4]00)\b/);
      if (badgeM) {
        expect(badgeM[1], `Badge level mismatch on #${tpl.id}`).toBe(tpl.level);
      }
    }
    expect(loadImmutableServerTemplateXml('../package.json')).toBeNull();
    expect(loadImmutableServerTemplateXml('../../etc/passwd')).toBeNull();
    expect(loadImmutableServerTemplateXml('52')).toBeNull();
  });

  it('verifies all 84/84 templates have True 4K UHD PNGs (3840x2160), 1280x720 grid thumbnails, and standalone Vector SVGs', () => {
    const pubRoot = path.resolve(process.cwd(), 'public');
    for (const tpl of CERTIFIED_ARCHITECTURE_TEMPLATES) {
      const pngPath = path.join(pubRoot, tpl.previewImage.replace(/^\//, ''));
      const thumbPath = path.join(pubRoot, tpl.thumbnailImage.replace(/^\//, ''));
      const svgPath = path.join(pubRoot, tpl.svgUrl.replace(/^\//, ''));

      const pngBuf = fs.readFileSync(pngPath);
      expect(pngBuf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
      expect(pngBuf.readUInt32BE(16), `4K width on #${tpl.id}`).toBe(3840);
      expect(pngBuf.readUInt32BE(20), `4K height on #${tpl.id}`).toBe(2160);

      const thumbBuf = fs.readFileSync(thumbPath);
      expect(thumbBuf.readUInt32BE(16), `Thumb width on #${tpl.id}`).toBe(1280);
      expect(thumbBuf.readUInt32BE(20), `Thumb height on #${tpl.id}`).toBe(720);

      const svgTxt = fs.readFileSync(svgPath, 'utf8');
      expect(svgTxt.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<svg ')).toBe(true);
      expect(svgTxt).toContain('width="3840" height="2160"');
      expect(svgTxt, `Residual light-dark() in #${tpl.id} SVG`).not.toContain('light-dark(');
    }
  });

  it('preserves point-to-point connectors and emits zero-whitespace <diagram><mxGraphModel> during spatial mutation', () => {
    const xml94 = loadImmutableServerTemplateXml('94')!;
    const parsed = parseDrawioXmlSpatialState(xml94);
    expect(parsed.edges.length).toBeGreaterThanOrEqual(8);

    const mutated = applySpatialMutationPlan(
      parsed,
      {
        summaryOfChanges: 'Added EU AI Act Compliance & Risk Gate inside target boundary',
        addNodes: [
          {
            id: 'node_eu_ai_act_gate',
            label: 'EU AI Act Compliance & Risk Gate',
            sublabel: 'Article 12 Conformity Logging & HITL Oversight',
            parentZoneId: 'sys_box',
            placement: 'below',
            anchorId: 'sys_gov',
            fillHex: '#FEF3C7',
            strokeHex: '#D97706',
          },
        ],
        modifyCells: [
          {
            id: 'sys_gov',
            newLabel: 'Trust, Security & EU AI Act Governance',
            newSublabel: 'VPC-SC + Cloud KMS HSM + DLP + Article 12 Telemetry',
          },
        ],
        addEdges: [
          {
            source: 'mc2',
            target: 'node_eu_ai_act_gate',
            label: 'Agent telemetry & reasoning audit',
            strokeHex: '#D97706',
          },
          {
            source: 'mc3',
            target: 'node_eu_ai_act_gate',
            label: 'Pre-execution policy check',
            strokeHex: '#D97706',
          },
          {
            source: 'node_eu_ai_act_gate',
            target: 'sys_gov',
            label: 'Immutable conformity logs',
            strokeHex: '#D97706',
          },
          {
            source: 'node_eu_ai_act_gate',
            target: 'l2',
            label: 'HITL Article 14',
            dashed: true,
            strokeHex: '#D97706',
          },
        ],
      },
      'gemini-2.5-flash',
      'Add EU AI Act Protection'
    );

    // Zero whitespace text nodes between <diagram ...> and <mxGraphModel ...>
    expect(mutated.xml).toMatch(/<diagram\b[^>]*><mxGraphModel\b/);
    // Redundant 3 vertical skip-loops collapsed into 1 clean adjacent vertical stack step, and duplicate boundary connector to l2 suppressed
    expect(mutated.stats.edgeCount).toBe(parsed.edges.length + 1);
    expect(mutated.xml).toContain('id="node_eu_ai_act_gate"');
    expect(mutated.xml).toContain('id="node_eu_ai_act_gate_i"');

    const reparsed = parseDrawioXmlSpatialState(mutated.xml);
    const byId = new Map(reparsed.cells.map((c) => [c.id, c]));
    const euNode = byId.get('node_eu_ai_act_gate')!;
    const sysBox = byId.get('sys_box')!;
    const colMid = byId.get('col_mid')!;
    const colLeft = byId.get('col_left')!;
    const colRight = byId.get('col_right')!;
    const ftrC4 = byId.get('ftr_c4')!;
    const bgFrame = byId.get('bg_frame')!;

    // New EU AI Act card sits cleanly inside sys_box & col_mid, above ftr_c4, and inside bg_frame
    expect(euNode.absY + euNode.h).toBeLessThan(sysBox.absY + sysBox.h);
    expect(sysBox.absY + sysBox.h).toBeLessThan(colMid.absY + colMid.h);
    expect(colLeft.h).toBe(colMid.h);
    expect(colRight.h).toBe(colMid.h);
    expect(colMid.absY + colMid.h).toBeLessThan(ftrC4.absY);
    expect(ftrC4.absY + ftrC4.h).toBeLessThan(bgFrame.absY + bgFrame.h);
  });

  it('backfills a 5-version saved diagram under its exact explicit Unique ID and serves all 5 versions to any colleague', async () => {
    const { createDiagram, getDiagram, deleteDiagram } = await import('@/lib/db');
    const explicitId = `draft_fork_unit_share_${Date.now()}`;
    const fiveVersions = [1, 2, 3, 4, 5].map((n) => ({
      version_number: n,
      xml: `<mxfile><diagram name="v${n}"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="n${n}" value="Version ${n}" vertex="1" parent="1"><mxGeometry x="40" y="40" width="160" height="60" as="geometry"/></mxCell></root></mxGraphModel></diagram></mxfile>`,
      comment: `v1.0.${n - 1} — Snapshot ${n}`,
      prompt: 'Walmart point of sales pricing intelligence and update',
      created_by: 'Author',
    }));

    try {
      const created = await createDiagram(
        'Google Cloud Enterprise Architecture (v1.0.4)',
        fiveVersions[4].xml,
        fiveVersions[4].comment,
        fiveVersions[4].prompt,
        undefined,
        undefined,
        undefined,
        'author-user-1',
        'gcp_enterprise_reference',
        false,
        'dashboard',
        null,
        explicitId,
        fiveVersions
      );
      expect(created.diagram.id).toBe(explicitId);

      // Colleague with zero session (undefined) AND colleague with separate userId both receive all 5 versions
      const anonColleagueView = await getDiagram(explicitId, undefined);
      expect(anonColleagueView).not.toBeNull();
      expect(anonColleagueView?.id).toBe(explicitId);
      expect(anonColleagueView?.versions?.length).toBe(5);
      expect(anonColleagueView?.versions?.[0]?.version_number).toBe(5);
      expect(anonColleagueView?.versions?.[4]?.version_number).toBe(1);

      const authedColleagueView = await getDiagram(explicitId, 'colleague-user-2');
      expect(authedColleagueView).not.toBeNull();
      expect(authedColleagueView?.versions?.length).toBe(5);
    } finally {
      await deleteDiagram(explicitId, 'author-user-1', true);
    }
  });

  it('blocks non-owner colleagues from deleting a public shared diagram and blocks Viewer/stranger ID hijacking', async () => {
    const { createDiagram, getDiagram, deleteDiagram } = await import('@/lib/db');
    const protectedId = `protected_owner_guard_${Date.now()}`;
    const v1Xml = '<mxfile><diagram name="v1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>';

    try {
      await createDiagram(
        'Protected Public Architecture',
        v1Xml,
        'Initial v1',
        'Protected architecture prompt',
        undefined,
        undefined,
        undefined,
        'owner-user-alpha',
        'gcp_enterprise_reference',
        false,
        'dashboard',
        null,
        protectedId
      );

      // Non-owner colleague CANNOT delete the owner's public diagram
      await expect(deleteDiagram(protectedId, 'colleague-user-beta', false)).rejects.toThrow(/Forbidden:/);

      // Anonymous / Viewer caller CANNOT hijack or overwrite the existing ID via createDiagram
      await expect(
        createDiagram(
          'Hijacked Title',
          v1Xml,
          'Hijack attempt',
          null,
          undefined,
          undefined,
          undefined,
          undefined,
          'gcp_enterprise_reference',
          false,
          'dashboard',
          null,
          protectedId
        )
      ).rejects.toThrow(/Forbidden:/);

      // Diagram remains intact and owned by owner-user-alpha
      const intact = await getDiagram(protectedId, 'owner-user-alpha');
      expect(intact).not.toBeNull();
      expect(intact?.name).toBe('Protected Public Architecture');
      expect(intact?.user_id).toBe('owner-user-alpha');
    } finally {
      await deleteDiagram(protectedId, 'owner-user-alpha', false);
    }
  });

  it('enforces anti-overwrite & notation ratchet: Tier 1/2 integrity, rich #WS1 & Official #78, stick-figure-free UML Use Case (#161), and true ERmany Crow\'s Foot (#162)', () => {
    for (const tpl of CERTIFIED_ARCHITECTURE_TEMPLATES) {
      expect(['Tier 1 · Primary Recommended', 'Tier 2 · Alternative Variant']).toContain(tpl.tier);
      if (tpl.tier === 'Tier 2 · Alternative Variant') {
        expect(tpl.primaryAlternativeRef, `Missing primaryAlternativeRef on Tier-2 #${tpl.id}`).toMatch(/^Alt to #/);
      }
    }

    const ws1 = getCertifiedArchitectureTemplateById('WS1')!;
    expect(ws1.tier).toBe('Tier 1 · Primary Recommended');
    const ws1Xml = loadImmutableServerTemplateXml('WS1')!;
    expect(ws1Xml).toContain('WHO RUNS WHAT IN WS1');
    expect(ws1Xml).toContain('Agent Gateway');

    const t78 = getCertifiedArchitectureTemplateById('78')!;
    expect(t78.tier).toBe('Tier 1 · Primary Recommended');
    const xml78 = loadImmutableServerTemplateXml('78')!;
    expect(xml78).toContain('GOOGLE CLOUD ARCHITECTURE CENTER');
    expect(xml78).toContain('Global Ingress');

    // Non-destructive Tier-2 preservation of Airy #WS1 (#158), 3-Spoke PSC (#159), 5-Col Flow (#69), 6-Zone (#160), UML Use Case (#161), 6-Table ERD (#162), 3-Lane OTel (#163), CIDR Spec (#164)
    for (const id of ['158', '159', '69', '160', '161', '162', '163', '164']) {
      const t = getCertifiedArchitectureTemplateById(id);
      expect(t, `Missing preserved Tier-2 template #${id}`).toBeDefined();
      expect(t?.tier).toBe('Tier 2 · Alternative Variant');
    }

    // Genuine UML 2.5 Use Case (#161): must have ellipse use cases and ZERO crude umlActor stick figures
    const xml161 = loadImmutableServerTemplateXml('161')!;
    expect(getCertifiedArchitectureTemplateById('161')?.kind).toBe('UML Use Case');
    expect(xml161).toContain('style="ellipse;');
    expect(xml161).not.toContain('shape=umlActor');

    // Genuine 6-Table Crow's Foot Physical ERD (#162): must have ERmandOne + ERmany markers
    const xml162 = loadImmutableServerTemplateXml('162')!;
    expect(xml162).toContain('startArrow=ERmandOne');
    expect(xml162).toContain('endArrow=ERmany');
  });
});
