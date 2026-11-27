import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  clusterCompositeCards,
  parseDrawioXmlSpatialState,
  applySpatialMutationPlan,
} from '@/lib/freeform/directDrawioSpatialMutator';
import { computeHonestDiagramHealth } from '@/lib/diagramAstHealth';
import { validateDrawioXml } from '@/lib/validate/validator';
import { runTruthfulnessAndGroundingCertification } from '@/lib/truthfulnessGroundingEngine';

function walkTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__' || entry.name === 'node_modules') continue;
      out.push(...walkTsFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.includes('.test.')) {
      out.push(full);
    }
  }
  return out;
}

describe('Anti-Theatre, Zero-Floor & Multi-Model Judge Mechanical Ratchet', () => {
  const srcRoot = path.resolve(__dirname, '../../src');
  const allSrcFiles = walkTsFiles(srcRoot);

  it('enforces ZERO fake certification stamps, fictional model names, single-demo fixture hacks, or internal codenames across src/', () => {
    const bannedPatterns: Array<{ label: string; rx: RegExp }> = [
      { label: 'Fake data-omni-autofix-certified stamp', rx: /data-omni-autofix-certified/ },
      { label: 'Fake audit_remediated_security_bar injection', rx: /audit_remediated_security_bar/ },
      { label: 'Legacy applyOmniAndGeminiAutoFixRemediation', rx: /applyOmniAndGeminiAutoFixRemediation/ },
      { label: 'Fictional Omni 1.1 label', rx: /Omni\s*1\.1/i },
      { label: 'Hardcoded 3.1 Pro Critic author lie', rx: /Live Gemini Co-Pilot \+ 3\.1 Pro Critic/ },
      { label: 'Fictional Gemini 3.5-3.9 prose claim', rx: /Gemini\s+3\.[56789]/i },
      { label: 'Internal Google codename leak', rx: /\bgemini-4-(?:argon|carbon|hydrogen|neon)\b|\bgantry-pulse\b/i },
      { label: 'Single-demo argo-icon.svg audit hack', rx: /argo-icon\.svg/ },
      { label: 'Single-demo edge_12_3_rollback audit hack', rx: /edge_12_3_rollback/ },
      { label: 'Single-screenshot OCR typo hack', rx: /Poots &|Danaged RiAG|Boslouss Avalytics|Betlict Theoghd/ },
      { label: 'Fictional multiverse checklist node IDs', rx: /universe_alpha\/beta\/gamma_lane/ },
      { label: 'Hallucinated Maestro-Audit engine claim', rx: /Maestro-Audit/i },
      { label: 'Unconditional 100% Collision-Free UI claim', rx: /100%\s+Collision-Free/i },
      { label: 'Unconditional Auto-Fix to 100% claim', rx: /Auto-Fix to 100%|100%\s+Vector Certified/i },
      { label: 'Score-masking || 94..99 or ?? 94..99 fallback', rx: /(?:\|\||\?\?)\s*(?:94|95|96|97|98|99)\b/ },
      { label: 'Unsafe .innerHTML assignment sink', rx: /\.innerHTML\s*=/ },
      { label: 'Unsafe dangerouslySetInnerHTML JSX prop', rx: /\bdangerouslySetInnerHTML\s*=/ },
      { label: 'Unsafe document.write XSS sink', rx: /\.write\s*\(\s*[`'"]\s*<!DOCTYPE|\.document\.write\s*\(/i },
      { label: 'Fabricated ASDE/CASG/Monarch theatre contract', rx: /\b(?:AsdeHarnessContract|phase2CasgCapsuleRbac|woundWaitLeasesGranted|monarchSloBurnRateThreshold|threeArmReviewVerdict)\b/ },
      { label: 'Simulated 2-WAY LIVE SYNC ACTIVE UI badge', rx: /2-WAY LIVE SYNC ACTIVE|Interactive 2-Way Google Sheet Twin/ },
      { label: 'Retired omniDirector import', rx: /omniDirector\/types/ },
    ];

    const violations: string[] = [];
    for (const fp of allSrcFiles) {
      const rel = path.relative(srcRoot, fp);
      const content = fs.readFileSync(fp, 'utf8');
      for (const { label, rx } of bannedPatterns) {
        if (rx.test(content)) {
          violations.push(`${rel}: ${label}`);
        }
      }
      // Block internal codename Nano Banana everywhere outside geminiConfig.ts's explicit blocklist
      if (rel !== path.join('lib', 'geminiConfig.ts') && /nano[\s_-]*banana/i.test(content)) {
        violations.push(`${rel}: Internal codename Nano Banana leak`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('enforces ZERO direct new GoogleGenAI() calls outside src/lib/geminiConfig.ts and ZERO client-side judge executions', () => {
    const directGenAiViolations: string[] = [];
    const clientJudgeViolations: string[] = [];

    for (const fp of allSrcFiles) {
      const rel = path.relative(srcRoot, fp);
      const content = fs.readFileSync(fp, 'utf8');
      if (rel !== path.join('lib', 'geminiConfig.ts') && /\bnew\s+GoogleGenAI\s*\(/.test(content)) {
        directGenAiViolations.push(rel);
      }
      const isUseClient = /^['"]use client['"]/m.test(content.slice(0, 200));
      if (isUseClient && /\brunTruthfulnessAndGroundingCertification\s*\(/.test(content)) {
        clientJudgeViolations.push(rel);
      }
    }

    expect(directGenAiViolations).toEqual([]);
    expect(clientJudgeViolations).toEqual([]);
  });

  it('atomically clusters, renames, moves, and removes multi-primitive flat cards (#118..#157 style)', () => {
    const multiPrimitiveXml = `<mxfile host="app.diagrams.net"><diagram id="d1" name="Exec Visual Test"><mxGraphModel dx="1600" dy="900" pageWidth="1600" pageHeight="900"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="z_col1" value="INGRESS TIER" style="rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="80" width="320" height="360" as="geometry"/></mxCell>
      <mxCell id="c_1_sh" value="" style="rounded=1;fillColor=#E2E8F0;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="94" y="144" width="250" height="92" as="geometry"/></mxCell>
      <mxCell id="c_1" value="" style="rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;" vertex="1" parent="1"><mxGeometry x="90" y="140" width="250" height="92" as="geometry"/></mxCell>
      <mxCell id="c_1_i" value="" style="shape=image;image=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PC9zdmc+;" vertex="1" parent="1"><mxGeometry x="106" y="168" width="32" height="32" as="geometry"/></mxCell>
      <mxCell id="t_1_title" value="&lt;b&gt;Global Cloud Load Balancing&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;" vertex="1" parent="1"><mxGeometry x="148" y="156" width="180" height="22" as="geometry"/></mxCell>
      <mxCell id="t_1_sub" value="Anycast HTTPS + Cloud Armor" style="text;html=1;strokeColor=none;fillColor=none;" vertex="1" parent="1"><mxGeometry x="148" y="182" width="180" height="20" as="geometry"/></mxCell>
      <mxCell id="c_2" value="" style="rounded=1;fillColor=#FFFFFF;strokeColor=#059669;" vertex="1" parent="1"><mxGeometry x="90" y="280" width="250" height="92" as="geometry"/></mxCell>
      <mxCell id="t_2_title" value="&lt;b&gt;GKE Autopilot Runtime&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;" vertex="1" parent="1"><mxGeometry x="110" y="302" width="210" height="22" as="geometry"/></mxCell>
      <mxCell id="e_coord_1" value="mTLS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="215" y="232" as="sourcePoint"/><mxPoint x="215" y="280" as="targetPoint"/></mxGeometry></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const state = parseDrawioXmlSpatialState(multiPrimitiveXml);
    const clustered = clusterCompositeCards(state);

    // 2 composite cards (c_1 and c_2), 0 floating 22px text cells exposed as standalone cards
    expect(clustered.cards.map((c) => c.id)).toEqual(['c_1', 'c_2']);
    expect(clustered.cards[0].label).toContain('Global Cloud Load Balancing');
    expect(clustered.cards[0].label).toContain('Anycast HTTPS + Cloud Armor');

    // Rename + Move c_1, Add c_3 below c_2 (must inherit 92px card height, NOT 22px text height!)
    const renamedAndAdded = applySpatialMutationPlan(state, {
      summaryOfChanges: 'Rename c_1 and add AlloyDB card below c_2',
      modifyCells: [
        { id: 'c_1', newLabel: 'Envoy AI Gateway', newSublabel: 'OIDC + Rate Limiting', movePlacement: 'right_of', moveAnchorId: 'c_2' },
      ],
      addNodes: [
        { id: 'c_3', label: 'AlloyDB Primary', sublabel: 'Regional HA', anchorId: 'c_2', placement: 'below' },
      ],
      addEdges: [{ source: 'c_2', target: 'c_3', label: 'PGAudit' }],
    });

    const afterState = parseDrawioXmlSpatialState(renamedAndAdded.xml);
    const movedC1 = afterState.cells.find((c) => c.id === 'c_1')!;
    const movedTitle = afterState.cells.find((c) => c.id === 't_1_title')!;
    const movedIcon = afterState.cells.find((c) => c.id === 'c_1_i')!;
    const addedC3 = afterState.cells.find((c) => c.id === 'c_3')!;

    expect(movedTitle.plainLabel).toBe('Envoy AI Gateway');
    expect(movedC1.absX).toBeGreaterThan(340);
    // Title & icon shifted in lockstep inside moved c_1!
    expect(movedTitle.absX).toBeGreaterThan(movedC1.absX);
    expect(movedIcon.absX).toBeGreaterThan(movedC1.absX);
    // Added card inherited real card height (>= 80px), NOT 22px floating text height!
    expect(addedC3.h).toBeGreaterThanOrEqual(80);

    // Atomic removal of c_1 removes shell, shadow, icon, floating texts, and touching coordinate-bound edge
    const removed = applySpatialMutationPlan(state, {
      summaryOfChanges: 'Delete c_1 atomically',
      removeCellIds: ['c_1'],
    });
    const afterRemove = parseDrawioXmlSpatialState(removed.xml);
    expect(afterRemove.cells.some((c) => ['c_1', 'c_1_sh', 'c_1_i', 't_1_title', 't_1_sub'].includes(c.id))).toBe(false);
    expect(afterRemove.edges.some((e) => e.id === 'e_coord_1')).toBe(false);
  });

  it('enforces zero artificial 50%/85% score floors on broken XML and fails closed as UNVERIFIED_OFFLINE without credentials', async () => {
    // 6 overlapping cards + broken external image + severe contrast violation (#FFFFFF on #F8FAFC) + dangling edges
    const brokenXml = `<mxfile><diagram name="Broken"><mxGraphModel pageWidth="1600" pageHeight="900"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="b1" value="Card 1" style="rounded=1;fillColor=#F8FAFC;fontColor=#FFFFFF;image=broken-relative.svg;" vertex="1" parent="1"><mxGeometry x="100" y="100" width="200" height="80" as="geometry"/></mxCell>
      <mxCell id="b2" value="Card 2" style="rounded=1;fillColor=#F8FAFC;fontColor=#FFFFFF;image=missing2.png;" vertex="1" parent="1"><mxGeometry x="110" y="110" width="200" height="80" as="geometry"/></mxCell>
      <mxCell id="b3" value="Card 3" style="rounded=1;fillColor=#F8FAFC;fontColor=#FFFFFF;" vertex="1" parent="1"><mxGeometry x="120" y="115" width="200" height="80" as="geometry"/></mxCell>
      <mxCell id="b4" value="Card 4" style="rounded=1;fillColor=#F8FAFC;fontColor=#FFFFFF;" vertex="1" parent="1"><mxGeometry x="125" y="120" width="200" height="80" as="geometry"/></mxCell>
      <mxCell id="e1" style="edgeStyle=none;" edge="1" parent="1" source="b1" target="nonexistent_node"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e2" style="edgeStyle=none;" edge="1" parent="1" source="missing_src" target="b2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e3" style="edgeStyle=none;" edge="1" parent="1" source="b3" target="missing_tgt"><mxGeometry relative="1" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const val = validateDrawioXml(brokenXml);
    expect(val.valid).toBe(false);
    expect(val.errors.some((e) => e.code === 'OVERLAP')).toBe(true);
    expect(val.errors.some((e) => e.code === 'BROKEN_IMAGE_ASSET')).toBe(true);
    expect(val.errors.some((e) => e.code === 'LOW_COLOR_CONTRAST')).toBe(true);
    expect(val.errors.some((e) => e.code === 'EDGE_DANGLING')).toBe(true);

    const health = computeHonestDiagramHealth(brokenXml, 'Cloud Architecture');
    const visualDim = health.dimensions.find((d) => d.category === 'visual')!;
    expect(visualDim.score).toBeLessThan(30);

    const prevKey = process.env.GEMINI_API_KEY;
    try {
      process.env.GEMINI_API_KEY = '';
      const dossier = await runTruthfulnessAndGroundingCertification({
        prompt: 'Cloud Architecture',
        xmlContent: brokenXml,
      });
      expect(dossier.isLiveModelEvaluated).toBe(false);
      expect(dossier.provenanceLedger[2].verdict).toBe('UNVERIFIED_OFFLINE');
      expect(dossier.scores.geometricZeroCollision).toBeLessThan(30);
    } finally {
      if (prevKey !== undefined) process.env.GEMINI_API_KEY = prevKey;
    }
  });

  it('evaluates UML / ERD schemas with domain-appropriate PK/FK invariants instead of demanding Cloud Armor WAF', () => {
    const cleanErdXml = `<mxfile><diagram name="Order Schema ERD"><mxGraphModel pageWidth="1600" pageHeight="900"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="ent_customer" value="customers&lt;br/&gt;PK customer_id UUID&lt;br/&gt;email VARCHAR" style="rounded=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="80" y="120" width="220" height="96" as="geometry"/></mxCell>
      <mxCell id="ent_order" value="orders&lt;br/&gt;PK order_id UUID&lt;br/&gt;FK customer_id UUID" style="rounded=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="420" y="120" width="220" height="96" as="geometry"/></mxCell>
      <mxCell id="ent_item" value="order_items&lt;br/&gt;PK item_id UUID&lt;br/&gt;FK order_id UUID" style="rounded=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="760" y="120" width="220" height="96" as="geometry"/></mxCell>
      <mxCell id="rel_1" value="1:N" style="edgeStyle=orthogonalEdgeStyle;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="ent_customer" target="ent_order"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="rel_2" value="1:N" style="edgeStyle=orthogonalEdgeStyle;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="ent_order" target="ent_item"><mxGeometry relative="1" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const health = computeHonestDiagramHealth(cleanErdXml, 'Crow\'s-Foot Entity Relationship Diagram');
    expect(health.domainKind).toBe('uml_erd_schema');
    const secDim = health.dimensions.find((d) => d.category === 'security')!;
    expect(secDim.score).toBe(100);
    expect(secDim.recommendations.join(' ')).not.toMatch(/Cloud Armor|WAF/i);
  });

  it('preserves responseMimeType and responseSchema for gemma-4-31b-it cross-family judge while stripping unsupported thinkingBudget', () => {
    const retryHelperSrc = fs.readFileSync(path.join(srcRoot, 'lib', 'geminiRetryHelper.ts'), 'utf8');
    const orthoJudgeSrc = fs.readFileSync(path.join(srcRoot, 'lib', 'orthogonalMultiModelJudge.ts'), 'utf8');
    const safeSvgSrc = fs.readFileSync(path.join(srcRoot, 'components', 'SafeSvgMarkup.tsx'), 'utf8');
    expect(retryHelperSrc).not.toMatch(/responseMimeType:\s*_rm/);
    expect(retryHelperSrc).not.toMatch(/responseSchema:\s*_rs/);
    expect(orthoJudgeSrc).toContain("thinkingLevel: 'MINIMAL'");
    expect(orthoJudgeSrc).toContain('responseSchema: sharedResponseSchema');
    expect(safeSvgSrc).toContain("parseFromString(trimmed, 'text/html')");
    expect(safeSvgSrc).toContain('sanitizeParsedDomSubtree(svgEl)');
    expect(safeSvgSrc).toContain('<\\?xml');
  });
});
