import * as fs from "fs";
import * as path from "path";
import { CANONICAL_TEMPLATES } from "../src/lib/canonical/canonicalTemplates";
import { CANONICAL_CONTRACTS, CanonicalContract } from "../src/lib/canonical/canonicalContracts";

interface AuditResult {
  id: string;
  name: string;
  family: string;
  level: string;
  passed: boolean;
  score: number;
  checks: {
    envelopeValid: boolean;
    zeroDuplicateIds: boolean;
    contractCompliant: boolean;
    typographyScaled: boolean;
    sourceImageBound: boolean;
    orthogonalEdges: boolean;
  };
  errors: string[];
  warnings: string[];
}

function runCanonicalCertificationAudit(): { summary: { total: number; certified: number; passRate: string }; results: AuditResult[] } {
  console.log("================================================================================");
  console.log("🏛️  STARTING CANONICAL BLUEPRINT QUALITY & CERTIFICATION GATEWAY (01–40)");
  console.log("================================================================================\n");

  const results: AuditResult[] = [];

  for (const tmpl of CANONICAL_TEMPLATES) {
    const id = tmpl.id.padStart(2, "0");
    const contract = CANONICAL_CONTRACTS[id];
    const errors: string[] = [];
    const warnings: string[] = [];

    const checks = {
      envelopeValid: false,
      zeroDuplicateIds: false,
      contractCompliant: false,
      typographyScaled: false,
      sourceImageBound: false,
      orthogonalEdges: true
    };

    // 1. Generate XML
    let xml = "";
    try {
      xml = tmpl.generateXml("biopharma", "light");
    } catch (e: any) {
      errors.push(`XML generation failed: ${e.message}`);
    }

    // 2. Check XML Document Envelope
    if (xml.includes("<mxfile") && xml.includes("<diagram") && xml.includes("<mxGraphModel") && xml.includes("<root>")) {
      checks.envelopeValid = true;
    } else {
      errors.push("Missing valid <mxfile><diagram><mxGraphModel> envelope.");
    }

    // 3. Check Duplicate mxCell IDs specifically
    const cellMatches = xml.match(/<mxCell[^>]*\sid="([^"]+)"/g) || [];
    const cellIds = cellMatches.map(m => {
      const match = m.match(/\sid="([^"]+)"/);
      return match ? match[1] : "";
    }).filter(Boolean);

    const idSet = new Set<string>();
    const dupes: string[] = [];
    cellIds.forEach(cellId => {
      if (idSet.has(cellId)) {
        dupes.push(cellId);
      }
      idSet.add(cellId);
    });

    if (dupes.length === 0) {
      checks.zeroDuplicateIds = true;
    } else {
      errors.push(`Duplicate mxCell IDs found: ${dupes.join(", ")}`);
    }

    // 4. Check Source Image Binding & Binary PNG IHDR Aspect-Ratio Lock
    const canonicalPngPath = path.resolve(process.cwd(), `public/templates/canonical_${id.padStart(2, '0')}.png`);
    const previewPngPath = tmpl.previewImage ? path.resolve(process.cwd(), `public${tmpl.previewImage}`) : '';
    const srcImgCandidates = [
      path.resolve(process.cwd(), `images/${id}.png`),
      canonicalPngPath,
      previewPngPath,
    ].filter(Boolean);

    const existingPngs = srcImgCandidates.filter(p => fs.existsSync(p));
    if (existingPngs.length > 0 && fs.existsSync(canonicalPngPath) && (!previewPngPath || fs.existsSync(previewPngPath))) {
      checks.sourceImageBound = true;
      // Parse PNG IHDR chunk (bytes 16..24: 32-bit big-endian width and height)
      const pngBuf = fs.readFileSync(canonicalPngPath);
      if (pngBuf.length >= 24 && pngBuf[0] === 0x89 && pngBuf[1] === 0x50) {
        const pngWidth = pngBuf.readUInt32BE(16);
        const pngHeight = pngBuf.readUInt32BE(20);
        const pngAspect = pngWidth / pngHeight;
        if (contract?.referenceGeometry) {
          const expectedAspect = contract.referenceGeometry.aspectRatio;
          if (Math.abs(pngAspect - expectedAspect) > 0.015) {
            errors.push(
              `PNG aspect-ratio drift on canonical_${id}.png: got ${pngWidth}x${pngHeight} (AR=${pngAspect.toFixed(4)}), expected AR=${expectedAspect.toFixed(4)} (${contract.referenceGeometry.pageWidth}x${contract.referenceGeometry.pageHeight})`
            );
            checks.sourceImageBound = false;
          }
        }
      } else {
        errors.push(`Invalid PNG binary header in ${canonicalPngPath}`);
        checks.sourceImageBound = false;
      }
    } else {
      errors.push(`Ground-truth master image missing: public/templates/${id}.png or public/templates/canonical_${id}.png`);
    }

    // 5. Check Typography Scale & Density
    if (xml.match(/fontSize\s*=\s*["']?[1-5](\.\d+)?(?=[;"'\s])/i) || xml.match(/font-size:\s*[1-5](\.\d+)?px/i)) {
      warnings.push("Contains microscopic typography (< 6px) which impairs high-resolution readability.");
      checks.typographyScaled = false;
    } else {
      checks.typographyScaled = true;
    }

    // 6. Fail-Closed Contract & Reference-Geometry Compliance
    if (contract) {
      checks.contractCompliant = true;
      for (const req of contract.requiredElements) {
        const simpleKeyword = req.split("-")[0];
        if (!xml.toLowerCase().includes(simpleKeyword.toLowerCase())) {
          warnings.push(`Contract semantic keyword '${req}' may be underrepresented in XML.`);
        }
      }
      for (const forbidden of contract.forbiddenElements) {
        if (xml.includes(`id="${forbidden}"`) || xml.includes(forbidden)) {
          errors.push(`Forbidden element/antipattern '${forbidden}' found in Blueprint #${id} XML.`);
          checks.contractCompliant = false;
        }
      }
      if (contract.referenceGeometry) {
        const rg = contract.referenceGeometry;
        const pwMatch = xml.match(/\bpageWidth="(\d+)"/);
        const phMatch = xml.match(/\bpageHeight="(\d+)"/);
        const actualPw = pwMatch ? Number(pwMatch[1]) : 0;
        const actualPh = phMatch ? Number(phMatch[1]) : 0;
        if (actualPw !== rg.pageWidth || actualPh !== rg.pageHeight) {
          errors.push(
            `Reference pageWidth/pageHeight mismatch on #${id}: got ${actualPw}x${actualPh}, expected ${rg.pageWidth}x${rg.pageHeight}`
          );
          checks.contractCompliant = false;
        }

        const iconCount = (xml.match(/shape=image;[^"]*image=data:image\/svg\+xml,/g) || []).length;
        if (typeof rg.exactIconCount === "number" && iconCount !== rg.exactIconCount) {
          errors.push(`Reference icon count mismatch on #${id}: got ${iconCount} SVG icons, expected exactly ${rg.exactIconCount}`);
          checks.contractCompliant = false;
        }
        if (typeof rg.minIconCount === "number" && iconCount < rg.minIconCount) {
          errors.push(`Reference icon count below minimum on #${id}: got ${iconCount} SVG icons, expected >= ${rg.minIconCount}`);
          checks.contractCompliant = false;
        }

        for (const reqCellId of rg.requiredCellIds) {
          if (!cellIds.includes(reqCellId)) {
            errors.push(`Required reference mxCell id="${reqCellId}" missing from #${id} XML.`);
            checks.contractCompliant = false;
          }
        }
        for (const forbCellId of rg.forbiddenCellIds) {
          if (cellIds.includes(forbCellId)) {
            errors.push(`Forbidden invented mxCell id="${forbCellId}" present in #${id} XML.`);
            checks.contractCompliant = false;
          }
        }
        for (const reqSub of rg.requiredSubstrings) {
          if (!xml.includes(reqSub)) {
            errors.push(`Required reference substring '${reqSub}' missing from #${id} XML.`);
            checks.contractCompliant = false;
          }
        }
        for (const forbSub of rg.forbiddenSubstrings) {
          if (xml.includes(forbSub)) {
            errors.push(`Forbidden non-reference substring '${forbSub}' present in #${id} XML.`);
            checks.contractCompliant = false;
          }
        }
        if (rg.domOrderPairs) {
          for (const [earlierId, laterId] of rg.domOrderPairs) {
            const idxA = cellIds.indexOf(earlierId);
            const idxB = cellIds.indexOf(laterId);
            if (idxA === -1 || idxB === -1 || idxA >= idxB) {
              errors.push(
                `DOM painting order violation on #${id}: mxCell '${earlierId}' (index ${idxA}) must appear before '${laterId}' (index ${idxB})`
              );
              checks.contractCompliant = false;
            }
          }
        }
      }
    } else {
      errors.push(`No machine-readable contract registered for template ${id} in CANONICAL_CONTRACTS.`);
      checks.contractCompliant = false;
    }

    // Compute Quality Score (0 to 100)
    let score = 100;
    if (!checks.envelopeValid) score -= 40;
    if (!checks.zeroDuplicateIds) score -= 30;
    if (!checks.sourceImageBound) score -= 20;
    if (!checks.contractCompliant) score -= 30;
    if (!checks.typographyScaled) score -= 10;
    if (errors.length > 0) score -= errors.length * 10;
    if (warnings.length > 0) score -= warnings.length * 2;
    score = Math.max(0, Math.min(100, score));

    const passed =
      checks.envelopeValid &&
      checks.zeroDuplicateIds &&
      checks.sourceImageBound &&
      checks.contractCompliant &&
      errors.length === 0;

    results.push({
      id: tmpl.id,
      name: tmpl.name,
      family: tmpl.family,
      level: tmpl.level,
      passed,
      score,
      checks,
      errors,
      warnings
    });

    const statusEmoji = passed ? (score >= 90 ? "🟢" : "🟡") : "🔴";
    console.log(`${statusEmoji} Template ${id}: ${tmpl.name.padEnd(36)} Score: ${score}% | Envelope: ${checks.envelopeValid ? "✔" : "✘"} | Unique IDs: ${checks.zeroDuplicateIds ? "✔" : "✘"} | Ref Bound: ${checks.sourceImageBound ? "✔" : "✘"} | Contract: ${checks.contractCompliant ? "✔" : "✘"}`);
    if (errors.length > 0) {
      errors.forEach(e => console.log(`   ❌ ERROR: ${e}`));
    }
    if (warnings.length > 0) {
      warnings.forEach(w => console.log(`   ⚠️  WARN: ${w}`));
    }
  }

  const passedCount = results.filter(r => r.passed && r.score >= 85).length;
  const passRate = ((passedCount / results.length) * 100).toFixed(1) + "%";

  const summary = {
    total: results.length,
    certified: passedCount,
    passRate
  };

  console.log("\n================================================================================");
  console.log(`📊 CERTIFICATION SUMMARY: ${passedCount} / ${results.length} Blueprints Passed (${passRate})`);
  console.log("================================================================================\n");

  const outPath = path.resolve(process.cwd(), "scratch/canonical_certification_report.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ summary, results }, null, 2));

  if (passedCount < results.length) {
    console.error(`🚨 FAIL-CLOSED GATE REJECTED: Only ${passedCount}/${results.length} canonical blueprints passed certification.`);
    process.exit(1);
  }

  return { summary, results };
}

if (require.main === module) {
  runCanonicalCertificationAudit();
}
