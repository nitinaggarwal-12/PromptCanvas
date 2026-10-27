import {
  PV_USE_CASE_OVERVIEW,
  PV_MASTER_DIAGRAM_MATRIX,
  compilePvRowDrawioXml,
  type PvMatrixRow,
  type PvUseCaseOverview,
  type PvDiagramLaneSpec,
  type PvDiagramNodeSpec,
} from './pvMatrixAndOverview';
import {
  PV_DOCS_01_TO_05,
  type PvAssociatedDocument,
  type PvDocSection,
  type PvDocTable,
  type PvDocCodeBlock,
} from './pvDocs01to05';
import { PV_DOCS_06_TO_10 } from './pvDocs06to10';

export const PV_DOCUMENTS: PvAssociatedDocument[] = [
  ...PV_DOCS_01_TO_05,
  ...PV_DOCS_06_TO_10,
];

export {
  PV_USE_CASE_OVERVIEW,
  PV_MASTER_DIAGRAM_MATRIX,
  compilePvRowDrawioXml,
  type PvMatrixRow,
  type PvUseCaseOverview,
  type PvDiagramLaneSpec,
  type PvDiagramNodeSpec,
  type PvAssociatedDocument,
  type PvDocSection,
  type PvDocTable,
  type PvDocCodeBlock,
};

export function getPvDocById(docId: string): PvAssociatedDocument {
  return PV_DOCUMENTS.find((d) => d.docId === docId) || PV_DOCUMENTS[0];
}

export function getPvDocByNum(docNum: number): PvAssociatedDocument {
  return PV_DOCUMENTS.find((d) => d.docNum === docNum) || PV_DOCUMENTS[0];
}

export function getPvRowById(rowId: number): PvMatrixRow {
  return PV_MASTER_DIAGRAM_MATRIX.find((r) => r.rowId === rowId) || PV_MASTER_DIAGRAM_MATRIX[0];
}

export function getPvRowsForDoc(docId: string): PvMatrixRow[] {
  return PV_MASTER_DIAGRAM_MATRIX.filter((r) => r.docId === docId);
}

export function exportPvDocToMarkdown(doc: PvAssociatedDocument): string {
  const lines: string[] = [];
  lines.push(`# Doc ${doc.docNum}: ${doc.title}`);
  lines.push(`> **${doc.subtitle}**`);
  lines.push(
    `> **Document Code**: \`${doc.shortCode}\` · **Owner**: ${doc.owner} · **Level**: ${doc.level} · **Scope**: ${doc.projectType} · **Status**: ${doc.status} (${doc.date})`
  );
  lines.push('');
  lines.push(`## Executive Summary`);
  lines.push(doc.executiveSummary);
  lines.push('');

  for (const sec of doc.sections) {
    lines.push(`## ${sec.number}. ${sec.title}`);
    lines.push('');
    if (sec.paragraphs) {
      for (const p of sec.paragraphs) {
        lines.push(p);
        lines.push('');
      }
    }
    if (sec.bullets && sec.bullets.length > 0) {
      for (const b of sec.bullets) {
        lines.push(`- ${b}`);
      }
      lines.push('');
    }
    if (sec.callout) {
      lines.push(`> **${sec.callout.title}**: ${sec.callout.body}`);
      lines.push('');
    }
    if (sec.diagramRowIds && sec.diagramRowIds.length > 0) {
      for (const rId of sec.diagramRowIds) {
        const row = getPvRowById(rId);
        lines.push(
          `### [Diagram Row #${row.rowId}] ${row.document} — ${row.diagram} (${row.level} · ${row.owner} · ${row.projectType})`
        );
        lines.push(`- **Summary**: ${row.summary}`);
        lines.push(`- **Key Architectural Invariant**: ${row.keyTakeaway}`);
        lines.push('');
      }
    }
    if (sec.tables) {
      for (const tbl of sec.tables) {
        if (tbl.caption) {
          lines.push(`**${tbl.caption}**`);
          lines.push('');
        }
        lines.push(`| ${tbl.headers.join(' | ')} |`);
        lines.push(`| ${tbl.headers.map(() => '---').join(' | ')} |`);
        for (const r of tbl.rows) {
          lines.push(`| ${r.join(' | ')} |`);
        }
        lines.push('');
      }
    }
    if (sec.codeBlocks) {
      for (const cb of sec.codeBlocks) {
        lines.push(`**${cb.title}**`);
        lines.push(`\`\`\`${cb.language}`);
        lines.push(cb.code);
        lines.push('```');
        lines.push('');
      }
    }
  }
  return lines.join('\n');
}
