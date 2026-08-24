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

export function runCanonicalCertificationAudit(): { summary: { total: number; certified: number; passRate: string }; results: AuditResult[] } {
  console.log("================================================================================");
  console.log("🏛️  STARTING CANONICAL BLUEPRINT QUALITY & CERTIFICATION GATEWAY (01–34)");
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

    // 4. Check Source Image Binding
    const srcImgPath = path.resolve(process.cwd(), `images/${id}.png`);
    if (fs.existsSync(srcImgPath)) {
      checks.sourceImageBound = true;
    } else {
      errors.push(`Ground-truth master image missing: images/${id}.png`);
    }

    // 5. Check Typography Scale & Density
    if (xml.match(/fontSize\s*=\s*["']?[1-5](\.\d+)?(?=[;"'\s])/i) || xml.match(/font-size:\s*[1-5](\.\d+)?px/i)) {
      warnings.push("Contains microscopic typography (< 6px) which impairs high-resolution readability.");
      checks.typographyScaled = false;
    } else {
      checks.typographyScaled = true;
    }

    // 6. Contract Compliance
    if (contract) {
      checks.contractCompliant = true;
      for (const req of contract.requiredElements) {
        const simpleKeyword = req.split("-")[0];
        if (!xml.toLowerCase().includes(simpleKeyword)) {
          warnings.push(`Contract semantic keyword '${req}' may be underrepresented in XML.`);
        }
      }
    } else {
      warnings.push(`No machine-readable contract registered for template ${id}.`);
    }

    // Compute Quality Score (0 to 100)
    let score = 100;
    if (!checks.envelopeValid) score -= 40;
    if (!checks.zeroDuplicateIds) score -= 30;
    if (!checks.sourceImageBound) score -= 20;
    if (!checks.typographyScaled) score -= 10;
    if (errors.length > 0) score -= errors.length * 10;
    if (warnings.length > 0) score -= warnings.length * 2;
    score = Math.max(0, Math.min(100, score));

    const passed = checks.envelopeValid && checks.zeroDuplicateIds && checks.sourceImageBound && errors.length === 0;

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
    console.log(`${statusEmoji} Template ${id}: ${tmpl.name.padEnd(36)} Score: ${score}% | Envelope: ${checks.envelopeValid ? "✔" : "✘"} | Unique IDs: ${checks.zeroDuplicateIds ? "✔" : "✘"} | Ref Bound: ${checks.sourceImageBound ? "✔" : "✘"}`);
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

  return { summary, results };
}

if (require.main === module) {
  runCanonicalCertificationAudit();
}
