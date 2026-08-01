import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} from 'docx';
import { ComposeRenderInput } from './renderMd';
import { NON_GOALS_DISCLAIMER } from './archetypes';

export async function renderDocx(input: ComposeRenderInput): Promise<Buffer> {
  const { archetype, model, sections, inferredMap } = input;
  const children: (Paragraph | Table)[] = [];

  // 1. Executive Document Title Banner
  children.push(
    new Paragraph({
      text: archetype.name.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `System Architecture: `, bold: true, color: '0F172A' }),
        new TextRun({ text: model.title, bold: true, color: '0D9488' }),
        new TextRun({ text: `  |  Domain: `, bold: true, color: '475569' }),
        new TextRun({ text: model.domain || 'Enterprise Software Architecture', color: '334155' }),
      ],
      spacing: { after: 360 },
    })
  );

  // 2. Executive Provenance & Extraction Audit Matrix
  children.push(
    new Paragraph({
      text: 'EXECUTIVE PROVENANCE & EXTRACTION FIDELITY MATRIX',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
    })
  );

  const summaryHeaderRow = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Deliverable Section', bold: true, color: 'FFFFFF' })] })],
        width: { size: 30, type: WidthType.PERCENTAGE },
        shading: { fill: '0F172A' },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Specification Title', bold: true, color: 'FFFFFF' })] })],
        width: { size: 35, type: WidthType.PERCENTAGE },
        shading: { fill: '0F172A' },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Source Provenance', bold: true, color: 'FFFFFF' })] })],
        width: { size: 18, type: WidthType.PERCENTAGE },
        shading: { fill: '0F172A' },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Fidelity Detail', bold: true, color: 'FFFFFF' })] })],
        width: { size: 17, type: WidthType.PERCENTAGE },
        shading: { fill: '0F172A' },
      }),
    ],
  });

  const summaryRows: TableRow[] = [summaryHeaderRow];

  for (const spec of archetype.sections) {
    let detail = '';
    if (spec.provenance === 'derived') {
      const s = sections[spec.id];
      const count = (s?.paragraphs.length || 0) + (s?.bullets.length || 0) + (s?.table?.rows.length || 0);
      detail = `${count} verified items`;
    } else if (spec.provenance === 'inferred') {
      const inf = inferredMap[spec.id];
      detail = `${(inf?.paragraphs.length || 0)} executive paragraphs`;
    } else {
      const isScope = spec.id === 'scope_non_goals';
      detail = isScope ? 'Scope & Non-Goals Notice' : 'Human Review Gate';
    }

    summaryRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: spec.id, font: 'Consolas' })] })] }),
          new TableCell({ children: [new Paragraph({ text: spec.title })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: spec.provenance.toUpperCase(), bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ text: detail })] }),
        ],
      })
    );
  }

  children.push(
    new Table({
      rows: summaryRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Graph Extraction Summary: Parsed ${model.components.length} operational components and ${model.flows.length} flow channels across ${model.tiers.length} architectural containers.`,
          italics: true,
          color: '475569',
        }),
      ],
      spacing: { before: 120, after: 360 },
    })
  );

  // 3. Render Formatted Document Sections
  for (const spec of archetype.sections) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${spec.title}  `, bold: true }),
          new TextRun({
            text: `[${spec.provenance.toUpperCase()}]`,
            size: 18,
            bold: true,
            color: spec.provenance === 'derived' ? '0D9488' : spec.provenance === 'inferred' ? '2563EB' : 'D97706',
          }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 360, after: 140 },
      })
    );

    if (spec.provenance === 'human') {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `📌 ARCHITECTURAL BOUNDARY & SCOPE NOTICE\n`, bold: true, color: '92400E' }),
            new TextRun({ text: `Guidance: ${spec.guidance || 'Provide human judgment and scope boundaries.'}\n\n`, italics: true }),
            ...(spec.id === 'scope_non_goals'
              ? [new TextRun({ text: `EXPLICIT NON-GOALS DISCLAIMER:\n${NON_GOALS_DISCLAIMER}`, bold: true, color: '991B1B' })]
              : []),
          ],
          shading: { fill: 'FFFBEB' },
          spacing: { after: 240 },
        })
      );
      continue;
    }

    if (spec.provenance === 'inferred') {
      const inf = inferredMap[spec.id];
      if (inf) {
        for (const p of inf.paragraphs) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: p })],
              spacing: { after: 140 },
            })
          );
        }
        for (const b of inf.bullets) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `• ${b}` })],
              spacing: { after: 80 },
            })
          );
        }
      }
      continue;
    }

    // derived section
    const sec = sections[spec.id];
    if (sec) {
      for (const p of sec.paragraphs) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: p.text })],
            spacing: { after: 140 },
          })
        );
      }

      if (sec.table && sec.table.rows.length > 0) {
        const headerRow = new TableRow({
          children: sec.table.headers.map(
            (h) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF' })] })],
                shading: { fill: '1E293B' },
              })
          ),
        });

        const dataRows = sec.table.rows.map(
          (r, idx) =>
            new TableRow({
              children: r.cells.map(
                (cellText) =>
                  new TableCell({
                    children: [new Paragraph({ text: cellText })],
                    shading: { fill: idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
                  })
              ),
            })
        );

        children.push(
          new Table({
            rows: [headerRow, ...dataRows],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: '', spacing: { after: 160 } })
        );
      }

      for (const b of sec.bullets) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `• ${b.text}` })],
            spacing: { after: 80 },
          })
        );
      }
    }
  }

  const doc = new Document({
    sections: [{ children }],
  });

  return await Packer.toBuffer(doc);
}
