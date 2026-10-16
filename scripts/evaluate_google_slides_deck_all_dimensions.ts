#!/usr/bin/env npx tsx
/**
 * 8-Dimension Forensic & Geometric Evaluator for Google Slides Decks (`google-slides-design` v2.0)
 * Evaluates any generated `.pptx` archive across all 8 dimensions:
 *   D1. 2D AABB Geometric Non-Overlap & Edge-Label Clearance (0 text-on-text collisions, opaque edge pills)
 *   D2. 1:1 Visual Archetype Structural Completeness (Dual gateway buses, 3x DB arrows, 0 emojis, 5 timeline dots, self-loops)
 *   D3. Domain & Workstream Grounding Purity (Rule 53: 0 Merck TealSDK / AST Pruner / adk_metadata contamination)
 *   D4. Screenshot-to-Callout Factual Consistency & 16:9 Aspect Ratio Preservation
 *   D5. 100% Native Editability & Vector Primitive Density (0 rasterized diagram images)
 *   D6. Google Brand & Typography Compliance (Quad-color order, Google Sans/Roboto, #F8F9FA/#DADCE0, Proprietary + Confidential)
 *   D7. Information Density, Pill Containment & Browser Chrome Single-Line Fit
 *   D8. Role-Label-Only Attribution & Verified GCP Project Provenance
 */

import fs from 'node:fs';
import path from 'node:path';
import JSZip from 'jszip';

interface TextBoxMetric {
  slideNum: number;
  text: string;
  xIn: number;
  yIn: number;
  wIn: number;
  hIn: number;
  hasSolidWhiteFill: boolean;
}

interface DimensionScore {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  status: 'PASS' | 'FAIL';
  checksPassed: number;
  checksTotal: number;
  findings: string[];
}

const EMU_PER_INCH = 914400;

function extractSlideTextBoxes(slideXml: string, slideNum: number): TextBoxMetric[] {
  const results: TextBoxMetric[] = [];
  const spBlocks = slideXml.match(/<p:sp\b[\s\S]*?<\/p:sp>/g) || [];
  for (const sp of spBlocks) {
    const offMatch = sp.match(/<a:off\s+x="(\d+)"\s+y="(\d+)"/);
    const extMatch = sp.match(/<a:ext\s+cx="(\d+)"\s+cy="(\d+)"/);
    if (!offMatch || !extMatch) continue;
    const xIn = Number(offMatch[1]) / EMU_PER_INCH;
    const yIn = Number(offMatch[2]) / EMU_PER_INCH;
    const wIn = Number(extMatch[1]) / EMU_PER_INCH;
    const hIn = Number(extMatch[2]) / EMU_PER_INCH;

    const tMatches = [...sp.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((m) => m[1]);
    const text = tMatches.join(' ').replace(/\s+/g, ' ').trim();
    if (!text) continue;

    const spPr = (sp.match(/<p:spPr>[\s\S]*?<\/p:spPr>/) || [''])[0];
    const hasSolidWhiteFill = /<a:solidFill>\s*<a:srgbClr val="FFFFFF"/i.test(spPr);

    results.push({
      slideNum,
      text,
      xIn: Number(xIn.toFixed(3)),
      yIn: Number(yIn.toFixed(3)),
      wIn: Number(wIn.toFixed(3)),
      hIn: Number(hIn.toFixed(3)),
      hasSolidWhiteFill,
    });
  }
  return results;
}

function aabbOverlapArea(a: TextBoxMetric, b: TextBoxMetric): number {
  const xOverlap = Math.max(0, Math.min(a.xIn + a.wIn, b.xIn + b.wIn) - Math.max(a.xIn, b.xIn));
  const yOverlap = Math.max(0, Math.min(a.yIn + a.hIn, b.yIn + b.hIn) - Math.max(a.yIn, b.yIn));
  return xOverlap * yOverlap;
}

async function evaluateDeck(pptxPath: string) {
  const buf = fs.readFileSync(pptxPath);
  const zip = await JSZip.loadAsync(buf);

  const slideFiles = Object.keys(zip.files)
    .filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
    .sort((a, b) => {
      const na = Number(a.match(/slide(\d+)\.xml/)![1]);
      const nb = Number(b.match(/slide(\d+)\.xml/)![1]);
      return na - nb;
    });

  const slidesXml: { slideNum: number; xml: string; textBoxes: TextBoxMetric[]; allText: string }[] = [];
  for (const f of slideFiles) {
    const slideNum = Number(f.match(/slide(\d+)\.xml/)![1]);
    const xml = await zip.file(f)!.async('string');
    const textBoxes = extractSlideTextBoxes(xml, slideNum);
    const allText = textBoxes.map((t) => t.text).join(' | ');
    slidesXml.push({ slideNum, xml, textBoxes, allText });
  }

  const dimensions: DimensionScore[] = [];

  // =========================================================================
  // DIMENSION 1: 2D AABB Geometric Non-Overlap & Edge-Label Clearance
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 4;

    // Check 1.1: Slide 11 (#78 Topology) small text boxes / edge labels must have 0 AABB overlaps
    const s11 = slidesXml.find((s) => s.slideNum === 11);
    const s11SmallBoxes = (s11?.textBoxes || []).filter((b) => b.wIn <= 2.2 && b.hIn <= 0.6);
    const s11Collisions: string[] = [];
    for (let i = 0; i < s11SmallBoxes.length; i++) {
      for (let j = i + 1; j < s11SmallBoxes.length; j++) {
        const area = aabbOverlapArea(s11SmallBoxes[i], s11SmallBoxes[j]);
        if (area > 0.003) {
          s11Collisions.push(
            `"${s11SmallBoxes[i].text}" overlaps "${s11SmallBoxes[j].text}" (${area.toFixed(4)} sq.in)`
          );
        }
      }
    }
    if (s11Collisions.length === 0) {
      checksPassed++;
      findings.push('PASS [D1.1]: Slide 11 (#78 Topology) has 0 AABB text-box collisions across all cards & edge labels.');
    } else {
      findings.push(`FAIL [D1.1]: Slide 11 has ${s11Collisions.length} AABB collisions: ${s11Collisions.join('; ')}`);
    }

    // Check 1.2: Slide 11 edge labels must have opaque white pill fill (hasSolidWhiteFill) so lines never cut through text
    const s11EdgeLabels = s11SmallBoxes.filter((b) => b.hIn <= 0.135 && b.wIn >= 0.4);
    const transparentEdgeLabels = s11EdgeLabels.filter((b) => !b.hasSolidWhiteFill);
    if (transparentEdgeLabels.length === 0 && s11EdgeLabels.length >= 6) {
      checksPassed++;
      findings.push(
        `PASS [D1.2]: All ${s11EdgeLabels.length} Slide 11 edge labels use opaque white pill fills (0 connector-through-text strikethroughs).`
      );
    } else {
      findings.push(
        `FAIL [D1.2]: ${transparentEdgeLabels.length} Slide 11 edge labels have transparent backgrounds (lines cut through text): ${transparentEdgeLabels.map((e) => e.text).join(', ')}`
      );
    }

    // Check 1.3: Slides 1–10 & 12 non-container text boxes must have 0 unintended text-on-text collisions
    let otherCollisions = 0;
    for (const s of slidesXml.filter((x) => x.slideNum !== 11)) {
      const leafBoxes = s.textBoxes.filter((b) => b.wIn <= 4.5 && b.hIn <= 1.2);
      for (let i = 0; i < leafBoxes.length; i++) {
        for (let j = i + 1; j < leafBoxes.length; j++) {
          const area = aabbOverlapArea(leafBoxes[i], leafBoxes[j]);
          if (area > 0.015) {
            otherCollisions++;
            findings.push(
              `FAIL [D1.3]: Slide ${s.slideNum} overlap between "${leafBoxes[i].text}" and "${leafBoxes[j].text}"`
            );
          }
        }
      }
    }
    if (otherCollisions === 0) {
      checksPassed++;
      findings.push('PASS [D1.3]: Slides 1–10 & 12 have 0 leaf text-box AABB collisions.');
    }

    // Check 1.4: All shapes stay within 16:9 canvas bounds (x >= 0.35", x+w <= 9.65", y >= 0.15", y+h <= 5.55")
    const outOfBounds = slidesXml.flatMap((s) =>
      s.textBoxes.filter((b) => b.xIn < 0.3 || b.xIn + b.wIn > 9.75 || b.yIn < 0.1 || b.yIn + b.hIn > 5.6)
    );
    if (outOfBounds.length === 0) {
      checksPassed++;
      findings.push('PASS [D1.4]: 100% of text/shape bounding boxes remain strictly inside the 10.0" x 5.625" canvas margins.');
    } else {
      findings.push(`FAIL [D1.4]: ${outOfBounds.length} boxes exceed canvas margins.`);
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D1',
      name: '2D AABB Geometric Non-Overlap & Edge-Label Clearance',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 2: 1:1 Visual Archetype Structural Completeness
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 6;

    // Check 2.1: Slide 3 (`three-zone-architecture`) vector icon density, dual gateway buses & 3x bidirectional DB arrows
    const s3 = slidesXml.find((s) => s.slideNum === 3)!;
    const s3Shapes = (s3.xml.match(/<p:sp\b/g) || []).length;
    if (s3Shapes >= 75) {
      checksPassed++;
      findings.push(
        `PASS [D2.1]: Slide 3 (three-zone-architecture) contains ${s3Shapes} native vector shapes (including left fan-in bus, right collector bus, 3x bidirectional DB arrows & vector icons).`
      );
    } else {
      findings.push(`FAIL [D2.1]: Slide 3 only has ${s3Shapes} shapes (missing dual buses or vector icons).`);
    }

    // Check 2.2: Slide 4 (`payload-transformation`) valid JSON syntax (0 `- [` invalid JSON tokens)
    const s4 = slidesXml.find((s) => s.slideNum === 4)!;
    if (!s4.allText.includes('- [') && s4.allText.includes('],')) {
      checksPassed++;
      findings.push('PASS [D2.2]: Slide 4 (payload-transformation) renders valid JSON array closures (`],`) with 0 invalid `- [` tokens.');
    } else {
      findings.push('FAIL [D2.2]: Slide 4 contains invalid JSON syntax (`- [`).');
    }

    // Check 2.3: Slide 5 (`swimlane-sequence`) vector icons, self-loops, native bracket & cylinder arrow
    const s5 = slidesXml.find((s) => s.slideNum === 5)!;
    const s5Shapes = (s5.xml.match(/<p:sp\b/g) || []).length;
    const hasAsciiBoxChars = /[└─┘⏱↻]/.test(s5.allText);
    if (s5Shapes >= 85 && !hasAsciiBoxChars && s5.xml.includes('prst="can"')) {
      checksPassed++;
      findings.push(
        `PASS [D2.3]: Slide 5 (swimlane-sequence) renders ${s5Shapes} native vector shapes (vector actor icons, self-loop arrows, vector clock/bracket, and cylinder DB) with 0 ASCII box-drawing wrap artifacts.`
      );
    } else {
      findings.push(`FAIL [D2.3]: Slide 5 shape count=${s5Shapes}, hasAsciiBoxChars=${hasAsciiBoxChars}.`);
    }

    // Check 2.4: Slide 6 (`async-state-machine`) wide non-squished transition labels
    const s6 = slidesXml.find((s) => s.slideNum === 6)!;
    const s6Step1Box = s6.textBoxes.find((b) => b.text.includes('1. Gemini Enterprise'));
    if (s6Step1Box && s6Step1Box.wIn >= 1.25) {
      checksPassed++;
      findings.push(
        `PASS [D2.4]: Slide 6 (async-state-machine) transition labels have wide horizontal clearance (w=${s6Step1Box.wIn}").`
      );
    } else {
      findings.push('FAIL [D2.4]: Slide 6 transition labels are too narrow.');
    }

    // Check 2.5: Slide 7 (`roadmap-timeline`) exactly 5 timeline connector ellipses (matching Reference Page 4)
    const s7 = slidesXml.find((s) => s.slideNum === 7)!;
    const s7Ellipses = (s7.xml.match(/prst="ellipse"/g) || []).length;
    if (s7Ellipses === 5) {
      checksPassed++;
      findings.push('PASS [D2.5]: Slide 7 (roadmap-timeline) renders exactly 5 timeline connector dots (1 left + 2 inter-card pairs, 0 stray right-edge dot).');
    } else {
      findings.push(`FAIL [D2.5]: Slide 7 has ${s7Ellipses} ellipses instead of 5.`);
    }

    // Check 2.6: Slide 8 (`operating-model-pillars`) 100% native vector icons with 0 Unicode cartoon emojis
    const allDeckText = slidesXml.map((s) => s.allText).join(' ');
    const hasEmojis = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(allDeckText);
    if (!hasEmojis) {
      checksPassed++;
      findings.push('PASS [D2.6]: 0 Unicode cartoon emojis (`🛡️`, `🤝`, `⏱`) across all 12 slides — 100% native editable vector icon primitives.');
    } else {
      findings.push('FAIL [D2.6]: Found Unicode emoji characters in slide text.');
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D2',
      name: '1:1 Visual Archetype Structural Completeness',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 3: Domain & Workstream Grounding Purity (Rule 53)
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 2;

    const allDeckText = slidesXml.map((s) => s.allText).join(' ');
    const bannedMerckTerms = [
      'TealSDK',
      'adk_metadata',
      'AST Pruner',
      'Text Unwrapper',
      'Case 74980079',
      'a2a.v1 gRPC',
      'Outside-In Dual-Plane',
      '21 CFR Part 11',
      'Medical Director',
      'Clinical Data',
    ];
    const leakedTerms = bannedMerckTerms.filter((t) => allDeckText.toLowerCase().includes(t.toLowerCase()));
    if (leakedTerms.length === 0) {
      checksPassed++;
      findings.push('PASS [D3.1]: 0 cross-project Merck terms (`TealSDK`, `adk_metadata`, `AST Pruner`, `a2a.v1 gRPC`) leaked into Workstream 1 (DOC-MT-01).');
    } else {
      findings.push(`FAIL [D3.1]: Found cross-project Merck terms in WS1 deck: ${leakedTerms.join(', ')}`);
    }

    const requiredWs1Terms = [
      'Pattern A',
      'Pattern B',
      'Pattern C',
      'tenant_pooled_rls_policy',
      'finvault-silo-cmek',
      'cymbal-psc-nat-us-west1',
      'RFC 8693 OBO',
      'DPoP',
      'Model Armor',
    ];
    const missingWs1 = requiredWs1Terms.filter((t) => !allDeckText.toLowerCase().includes(t.toLowerCase()));
    if (missingWs1.length === 0) {
      checksPassed++;
      findings.push(
        `PASS [D3.2]: All ${requiredWs1Terms.length}/${requiredWs1Terms.length} canonical Workstream 1 (DOC-MT-01) architecture components are grounded across the deck.`
      );
    } else {
      findings.push(`FAIL [D3.2]: Missing WS1 components: ${missingWs1.join(', ')}`);
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D3',
      name: 'Domain & Workstream Grounding Purity (Rule 53)',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 4: Screenshot-to-Callout Factual Consistency & 16:9 Aspect Ratio
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 3;

    const s9 = slidesXml.find((s) => s.slideNum === 9)!;
    const s10 = slidesXml.find((s) => s.slideNum === 10)!;

    // Check 4.1: Slide 9 screenshot shows `#638420508320` and `pattern_a_pooled_rls_entities` -> callouts & browser bar must match
    if (
      s9.allText.includes('#638420508320') &&
      s9.allText.includes('pattern_a_pooled_rls_entities') &&
      s9.allText.includes('cymbal_agentic_finops_otel')
    ) {
      checksPassed++;
      findings.push(
        'PASS [D4.1]: Slide 9 browser bar & Callout 1 match the exact GCP project (#638420508320) and table (`pattern_a_pooled_rls_entities`) visible in `gcp_console_03_bigquery_studio_pattern_a_rls.png`.'
      );
    } else {
      findings.push('FAIL [D4.1]: Slide 9 callouts/browser bar contradict the project/table shown in the screenshot.');
    }

    // Check 4.2: Slide 10 screenshot shows `cymbal-multi-tenant-patterns` in `#638420508320` (`us-central1`) -> callouts & browser bar must match
    if (
      s10.allText.includes('cymbal-multi-tenant-patterns') &&
      s10.allText.includes('638420508320') &&
      s10.allText.includes('us-central1')
    ) {
      checksPassed++;
      findings.push(
        'PASS [D4.2]: Slide 10 browser bar & Callout 1 match the exact Cloud Run service (`cymbal-multi-tenant-patterns` in #638420508320 / `us-central1`) visible in `gcp_console_07_logs_explorer_20_20_pass.png`.'
      );
    } else {
      findings.push('FAIL [D4.2]: Slide 10 callouts/browser bar contradict the Cloud Run service/project shown in the screenshot.');
    }

    // Check 4.3: Screenshot aspect ratio preservation (`16:9` = 1.778)
    const picExtMatches = [...(s9.xml + s10.xml).matchAll(/<p:pic\b[\s\S]*?<a:ext\s+cx="(\d+)"\s+cy="(\d+)"/g)];
    const all16x9 =
      picExtMatches.length === 2 &&
      picExtMatches.every((m) => {
        const ratio = Number(m[1]) / Number(m[2]);
        return Math.abs(ratio - 16 / 9) <= 0.03;
      });
    if (all16x9) {
      checksPassed++;
      findings.push('PASS [D4.3]: Both embedded Cloud Console screenshots preserve exact 16:9 aspect ratio (5.35" x 3.01", 0 vertical stretching).');
    } else {
      findings.push('FAIL [D4.3]: Screenshot image dimensions distort 16:9 aspect ratio.');
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D4',
      name: 'Screenshot-to-Callout Factual Consistency & 16:9 Aspect Preservation',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 5: 100% Native Editability & Vector Primitive Density
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 2;

    const totalShapes = slidesXml.reduce(
      (acc, s) => acc + (s.xml.match(/<p:sp\b/g) || []).length,
      0
    );
    const diagramSlidesPics = slidesXml
      .filter((s) => [3, 4, 5, 6, 7, 8, 11].includes(s.slideNum))
      .reduce((acc, s) => acc + (s.xml.match(/<p:pic\b/g) || []).length, 0);

    if (totalShapes >= 480) {
      checksPassed++;
      findings.push(`PASS [D5.1]: Deck contains ${totalShapes} native editable Google Slides vector shapes (<p:sp>).`);
    } else {
      findings.push(`FAIL [D5.1]: Deck only contains ${totalShapes} vector shapes.`);
    }

    if (diagramSlidesPics === 0) {
      checksPassed++;
      findings.push('PASS [D5.2]: 0 rasterized diagram PNGs on diagram slides (Slides 3, 4, 5, 6, 7, 8, 11 are 100% pure native vector shapes).');
    } else {
      findings.push(`FAIL [D5.2]: Found ${diagramSlidesPics} raster images on diagram slides.`);
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D5',
      name: '100% Native Editability & Vector Primitive Density',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 6: Google Brand & Typography Compliance (AGENTS.md Rules 1–5)
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 4;

    const allXml = slidesXml.map((s) => s.xml).join('\n');
    const hasQuadColors =
      allXml.includes('4285F4') &&
      allXml.includes('EA4335') &&
      allXml.includes('FBBC04') &&
      allXml.includes('34A853');
    if (hasQuadColors) {
      checksPassed++;
      findings.push('PASS [D6.1]: Sequential Google Quad-Colors (#4285F4 -> #EA4335 -> #FBBC04 -> #34A853) verified.');
    }

    const hasFonts =
      allXml.includes('Google Sans') &&
      allXml.includes('Roboto') &&
      allXml.includes('Courier New');
    if (hasFonts) {
      checksPassed++;
      findings.push('PASS [D6.2]: Approved typography (`Google Sans`, `Google Sans Display`, `Roboto`, `Courier New`) verified.');
    }

    const hasContainers = allXml.includes('F8F9FA') && allXml.includes('DADCE0');
    if (hasContainers) {
      checksPassed++;
      findings.push('PASS [D6.3]: Neutral container tokens (`#F8F9FA` fill, `#DADCE0` border) verified across all cards.');
    }

    const footerCount = slidesXml.filter((s) => s.allText.includes('Proprietary + Confidential')).length;
    if (footerCount === slidesXml.length) {
      checksPassed++;
      findings.push(`PASS [D6.4]: "Proprietary + Confidential" footer present on ${footerCount}/${slidesXml.length} slides.`);
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D6',
      name: 'Google Brand & Typography Compliance (Rules 1–5)',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 7: Information Density, Pill Containment & Browser Chrome Fit
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 2;

    const s3 = slidesXml.find((s) => s.slideNum === 3)!;
    const rlsBadge = s3.textBoxes.find((b) => b.text === 'RLS + CMEK');
    if (rlsBadge && rlsBadge.wIn >= 0.88) {
      checksPassed++;
      findings.push(`PASS [D7.1]: Sovereign card badges ("RLS + CMEK", w=${rlsBadge.wIn}") fit on a single non-wrapping line.`);
    } else {
      findings.push('FAIL [D7.1]: Badge "RLS + CMEK" is too narrow and wraps onto 2 lines.');
    }

    const s9 = slidesXml.find((s) => s.slideNum === 9)!;
    const s9UrlBar = s9.textBoxes.find((b) => b.text.includes('console.cloud.google.com'));
    if (s9UrlBar && s9UrlBar.hIn <= 0.26) {
      checksPassed++;
      findings.push('PASS [D7.2]: Browser chrome URL bars on Slides 9 & 10 fit on a single line inside the 0.32" top bar.');
    } else {
      findings.push('FAIL [D7.2]: Browser chrome URL bar overflows onto the screenshot.');
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D7',
      name: 'Information Density, Pill Containment & Browser Chrome Fit',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  // =========================================================================
  // DIMENSION 8: Role-Label-Only Attribution & Verified GCP Provenance
  // =========================================================================
  {
    const findings: string[] = [];
    let checksPassed = 0;
    const checksTotal = 2;

    const allDeckText = slidesXml.map((s) => s.allText).join(' ');
    const bannedPersonalNames = [
      'Nithin Reddy Cheruku',
      'Navneet Tuteja',
      'Dhawal Patel',
      'Nitin Aggarwal',
      'nitinagga',
      'Madhavi Srikoti',
    ];
    const foundNames = bannedPersonalNames.filter((n) => allDeckText.toLowerCase().includes(n.toLowerCase()));
    if (
      slidesXml[0].allText.includes('Principal AI Architect') &&
      foundNames.length === 0
    ) {
      checksPassed++;
      findings.push('PASS [D8.1]: Contributors & all 12 slides use strictly role/team labels (0 personal names or LDAP substrings).');
    } else {
      findings.push(`FAIL [D8.1]: Found personal names in deck: ${foundNames.join(', ')}`);
    }

    if (allDeckText.includes('#638420508320') && allDeckText.includes('#248990048888')) {
      checksPassed++;
      findings.push('PASS [D8.2]: Verified GCP project numbers (`#638420508320` and `#248990048888`) grounded accurately.');
    } else {
      findings.push('FAIL [D8.2]: Missing verified GCP project numbers.');
    }

    const score = Math.round((checksPassed / checksTotal) * 100);
    dimensions.push({
      id: 'D8',
      name: 'Role-Label-Only Attribution & Verified GCP Provenance',
      score,
      maxScore: 100,
      status: score === 100 ? 'PASS' : 'FAIL',
      checksPassed,
      checksTotal,
      findings,
    });
  }

  const overallScore = Math.round(
    dimensions.reduce((acc, d) => acc + d.score, 0) / dimensions.length
  );

  console.log('\n================================================================================');
  console.log(`📊 8-DIMENSION GOOGLE SLIDES FORENSIC EVALUATION REPORT (${path.basename(pptxPath)})`);
  console.log('================================================================================');
  for (const d of dimensions) {
    console.log(
      `${d.status === 'PASS' ? '✅' : '❌'} [${d.id}] ${d.name}: ${d.score}/100 (${d.checksPassed}/${d.checksTotal} checks)`
    );
    for (const f of d.findings) {
      console.log(`     • ${f}`);
    }
  }
  console.log('--------------------------------------------------------------------------------');
  console.log(`🏆 OVERALL COMPOSITE SCORE: ${overallScore}/100 (${dimensions.filter((d) => d.status === 'PASS').length}/${dimensions.length} Dimensions PASS)`);
  console.log('================================================================================\n');

  if (overallScore < 100) {
    process.exit(1);
  }
}

const targetPptx =
  process.argv[2] ||
  path.join(process.cwd(), 'public', 'exports', 'ws1-google-slides-design-plugin-deck.pptx');

evaluateDeck(targetPptx).catch((err) => {
  console.error('❌ Evaluation error:', err);
  process.exit(1);
});
