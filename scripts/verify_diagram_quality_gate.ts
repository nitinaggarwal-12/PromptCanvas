import { CANONICAL_TEMPLATES } from '../src/lib/canonical/canonicalTemplates';
import { OmniQcChief } from '../src/lib/omniDirector/OmniQcChief';

export function runDiagramQualityGate(options: { fullScan?: boolean; targetId?: string } = {}): {
  success: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  console.log('🛡️  [Quality Gate] Running Universal Diagram Quality Gate...');

  const templatesToAudit = options.targetId
    ? CANONICAL_TEMPLATES.filter(t => t.id === options.targetId)
    : CANONICAL_TEMPLATES;

  console.log(`[Quality Gate] Auditing ${templatesToAudit.length} canonical blueprint(s)...`);

  for (const t of templatesToAudit) {
    try {
      const xml = t.generateXml('biopharma', 'light');
      const edgeCount = (xml.match(/<mxCell[^>]+edge="1"/gi) || []).length;
      const vertexCount = (xml.match(/<mxCell[^>]+vertex="1"/gi) || []).length;

      // Rule 1: Zero Disconnected Graph Law (Minimum 3 edges for diagrams >= 10 vertices)
      if (vertexCount >= 10 && edgeCount < 3) {
        errors.push(
          `Template ${t.id} (${t.name}): DISCONNECTED GRAPH! Emits ${vertexCount} vertices but only ${edgeCount} connectors. Minimum required: 3.`
        );
      }

      // Rule 2: Strict Ban on Raw Emojis
      const rawEmojiMatches = xml.match(/(?:⚙️|🤖|☁️|📦|🔧|🔒|📊|⚡|🛡️|💡|🔍|📱|💻|🖥️|🗄️|🏛️|💵|📈|📉|🧾|👤|🎯|🌐|📄|👥|📰|💳|📁|📬|🧠|📜|👁️|📑|☸️|🔄|🚀|🔐|💾)/gu);
      if (rawEmojiMatches && rawEmojiMatches.length > 0) {
        const unique = Array.from(new Set(rawEmojiMatches));
        errors.push(
          `Template ${t.id} (${t.name}): RAW EMOJI DEFECT! Found ${rawEmojiMatches.length} raw emojis (${unique.join(' ')}). Replace with vector SVGs or native stencils.`
        );
      }

      // Rule 3: Omni QC Dimension 14 (Dangling Edge Sources / Targets)
      const allKnownIds = new Set<string>();
      for (const cm of xml.matchAll(/<mxCell[^>]+id="([^"]+)"/gi)) {
        allKnownIds.add(cm[1]);
      }
      for (const em of xml.matchAll(/<mxCell[^>]+id="([^"]+)"[^>]+edge="1"[^>]*>/gi)) {
        const edgeId = em[1];
        const fullTag = em[0];
        const srcMatch = fullTag.match(/source="([^"]+)"/i);
        const tgtMatch = fullTag.match(/target="([^"]+)"/i);
        if (srcMatch && !allKnownIds.has(srcMatch[1])) {
          errors.push(`Template ${t.id} (${t.name}): Dangling edge source "${srcMatch[1]}" in edge "${edgeId}".`);
        }
        if (tgtMatch && !allKnownIds.has(tgtMatch[1])) {
          errors.push(`Template ${t.id} (${t.name}): Dangling edge target "${tgtMatch[1]}" in edge "${edgeId}".`);
        }
      }

    } catch (err: any) {
      errors.push(`Template ${t.id} (${t.name}): Threw unexpected error during XML generation: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n🚨 [Quality Gate] Quality gate detected ${errors.length} defect(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    return { success: false, errors };
  }

  console.log('✅ [Quality Gate] All blueprints passed connectivity, icon, and structural checks.\n');
  return { success: true, errors: [] };
}

// CLI execution
if (process.argv[1]?.endsWith('verify_diagram_quality_gate.ts')) {
  const targetId = process.argv[2];
  const res = runDiagramQualityGate({ targetId });
  if (!res.success) {
    process.exit(1);
  }
  process.exit(0);
}
