import { NextRequest, NextResponse } from 'next/server';
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { getArchetype, ArchetypeId } from '../../../lib/compose/archetypes';
import { extractSystemModel } from '../../../lib/compose/extract';
import { MAPPER_REGISTRY } from '../../../lib/compose/mappers';
import { fillInferredSections } from '../../../lib/compose/infer';
import { renderMarkdown } from '../../../lib/compose/renderMd';
import { renderDocx } from '../../../lib/compose/renderDocx';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      archetypeId,
      format = 'docx',
      diagramVersionIds = [],
      xml: directXml,
      graph_json: directGraphJson,
      title,
      domain,
    } = body;

    if (!archetypeId) {
      return NextResponse.json({ error: 'archetypeId is required' }, { status: 400 });
    }

    const archetype = getArchetype(archetypeId as ArchetypeId);

    // Load graph or XML from DB if diagramVersionIds provided
    let xmlToUse = directXml;
    let graphJsonToUse = directGraphJson;
    let titleToUse = title;

    if (Array.isArray(diagramVersionIds) && diagramVersionIds.length > 0) {
      try {
        const dbPath = path.join(process.cwd(), 'dev.db');
        const db = new DatabaseSync(dbPath);
        const placeholders = diagramVersionIds.map(() => '?').join(',');
        const rows = db
          .prepare(
            `SELECT id, diagram_id, version_number, graph_json, mxgraph_xml FROM diagram_versions WHERE id IN (${placeholders})`
          )
          .all(...diagramVersionIds) as any[];

        if (rows.length > 0) {
          const first = rows[0];
          titleToUse = titleToUse || `Diagram ${first.diagram_id} v${first.version_number}`;
          if (first.graph_json) {
            try {
              graphJsonToUse = JSON.parse(first.graph_json);
            } catch {
              // ignore parse error
            }
          }
          xmlToUse = xmlToUse || first.mxgraph_xml;
        }
      } catch (dbErr) {
        console.warn('[Compose API] DB lookup warning:', dbErr);
      }
    }

    // 1. Extract SystemModel
    const model = extractSystemModel({
      graph_json: graphJsonToUse,
      xml: xmlToUse,
      title: titleToUse,
      domain,
    });

    // 2. Map Derived Sections
    const derivedSections: Record<string, any> = {};
    for (const spec of archetype.sections) {
      if (spec.provenance === 'derived' && spec.mapper) {
        const mapperFn = MAPPER_REGISTRY[spec.mapper] || MAPPER_REGISTRY.componentDescriptions;
        derivedSections[spec.id] = mapperFn(model, spec.id);
      }
    }

    // 3. Infer Inferred Sections
    const inferredSpecs = archetype.sections.filter((s) => s.provenance === 'inferred');
    const inferredMap = await fillInferredSections(model, inferredSpecs);

    const composeInput = {
      archetype,
      model,
      sections: derivedSections,
      inferredMap,
    };

    if (format === 'md') {
      const mdContent = renderMarkdown(composeInput);
      return new NextResponse(mdContent, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="${archetype.id}_${Date.now()}.md"`,
        },
      });
    }

    const docxBuffer = await renderDocx(composeInput);
    return new NextResponse(new Uint8Array(docxBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${archetype.id}_${Date.now()}.docx"`,
      },
    });
  } catch (err: any) {
    console.error('[Compose API] Error composing document:', err);
    return NextResponse.json({ error: err.message || 'Failed to compose document' }, { status: 500 });
  }
}
