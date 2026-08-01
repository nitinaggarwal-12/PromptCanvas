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

  // Title Page / Banner
  children.push(
    new Paragraph({
      text: archetype.name.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `System Model Title: `, bold: true }),
        new TextRun({ text: model.title }),
        new TextRun({ text: `  |  Domain: `, bold: true }),
        new TextRun({ text: model.domain || 'Enterprise Software System' }),
      ],
      spacing: { after: 400 },
    })
  );

  // Provenance Summary Table
  children.push(
    new Paragraph({
      text: 'DOCUMENT PROVENANCE & EXTRACTION FIDELITY SUMMARY',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
    })
  );

  const summaryHeaderRow = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Section ID', bold: true })] })],
        width: { size: 20, type: WidthType.PERCENTAGE },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Section Title', bold: true })] })],
        width: { size: 40, type: WidthType.PERCENTAGE },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Provenance Class', bold: true })] })],
        width: { size: 20, type: WidthType.PERCENTAGE },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Extraction Detail', bold: true })] })],
        width: { size: 20, type: WidthType.PERCENTAGE },
      }),
    ],
  });

  const summaryRows: TableRow[] = [summaryHeaderRow];

  for (const spec of archetype.sections) {
    let detail = '';
    if (spec.provenance === 'derived') {
      const s = sections[spec.id];
      const count = (s?.paragraphs.length || 0) + (s?.bullets.length || 0) + (s?.table?.rows.length || 0);
      detail = `${count} derived items`;
    } else if (spec.provenance === 'inferred') {
      const inf = inferredMap[spec.id];
      detail = `${(inf?.paragraphs.length || 0)} inferred paragraphs`;
    } else {
      detail = 'Human TODO Block';
    }

    summaryRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ text: spec.id })] }),
          new TableCell({ children: [new Paragraph({ text: spec.title })] }),
          new TableCell({ children: [new Paragraph({ text: spec.provenance.toUpperCase() })] }),
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
          text: `Fidelity Report: ${model.components.length} components, ${model.flows.length} flows across ${model.tiers.length} tiers (${model.unmapped.length} unmapped cells).`,
          italics: true,
        }),
      ],
      spacing: { before: 120, after: 300 },
    })
  );

  // Render Sections
  for (const spec of archetype.sections) {
    children.push(
      new Paragraph({
        text: `${spec.title} [${spec.provenance.toUpperCase()}]`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
      })
    );

    if (spec.provenance === 'human') {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `📌 TODO [HUMAN ACTION REQUIRED — DO NOT AUTO-FILL]\n`, bold: true, color: 'B45309' }),
            new TextRun({ text: `Guidance: ${spec.guidance || 'Provide human judgment and scope boundaries.'}\n`, italics: true }),
            ...(spec.id === 'scope_non_goals'
              ? [new TextRun({ text: `\nMandatory Scope Notice: ${NON_GOALS_DISCLAIMER}`, bold: true, color: '991B1B' })]
              : []),
          ],
          shading: { fill: 'FFFBEB' },
          spacing: { after: 200 },
        })
      );
      continue;
    }

    if (spec.provenance === 'inferred') {
      const inf = inferredMap[spec.id];
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `⚠️ AI-INFERRED SECTION — CONFIRM WITH ENGINEERING\n`, bold: true, color: '0369A1' }),
          ],
          shading: { fill: 'F0F9FF' },
          spacing: { after: 100 },
        })
      );

      if (inf) {
        for (const p of inf.paragraphs) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: p })],
              shading: { fill: 'F0F9FF' },
              spacing: { after: 100 },
            })
          );
        }
        for (const b of inf.bullets) {
          children.push(
            new Paragraph({
              text: `• ${b}`,
              shading: { fill: 'F0F9FF' },
              spacing: { after: 60 },
            })
          );
        }
      }
      continue;
    }

    // derived
    const sec = sections[spec.id];
    if (sec) {
      for (const p of sec.paragraphs) {
        const refs = p.sourceRefs.length > 0 ? ` [sourceRef: ${p.sourceRefs.join(', ')}]` : '';
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: p.text }),
              new TextRun({ text: refs, size: 18, color: '64748B', italics: true }),
            ],
            spacing: { after: 100 },
          })
        );
      }

      if (sec.table) {
        const tableRows: TableRow[] = [
          new TableRow({
            children: sec.table.headers.map(
              (h) =>
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
                })
            ),
          }),
          ...sec.table.rows.map(
            (r) =>
              new TableRow({
                children: r.cells.map(
                  (cellText) => new TableCell({ children: [new Paragraph({ text: cellText })] })
                ),
              })
          ),
        ];

        children.push(
          new Table({
            rows: tableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: '', spacing: { after: 100 } })
        );
      }

      for (const b of sec.bullets) {
        const refs = b.sourceRefs.length > 0 ? ` [sourceRef: ${b.sourceRefs.join(', ')}]` : '';
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `• ${b.text}` }),
              new TextRun({ text: refs, size: 18, color: '64748B', italics: true }),
            ],
            spacing: { after: 60 },
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
