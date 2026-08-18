import { NextRequest, NextResponse } from 'next/server';
import { getArchetype, ArchetypeId } from '../../../lib/compose/archetypes';
import { extractSystemModel } from '../../../lib/compose/extract';
import { MAPPER_REGISTRY } from '../../../lib/compose/mappers';
import { fillInferredSections } from '../../../lib/compose/infer';
import { renderMarkdown } from '../../../lib/compose/renderMd';
import { renderDocx } from '../../../lib/compose/renderDocx';
import { getDiagramVersion, listDiagrams } from '@/lib/db';

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
        for (const vid of diagramVersionIds) {
          const version = await getDiagramVersion(vid);
          if (version) {
            titleToUse = titleToUse || `Diagram ${version.diagram_id} v${version.version_number}`;
            if (version.graph_json) {
              try {
                graphJsonToUse = typeof version.graph_json === 'string' ? JSON.parse(version.graph_json) : version.graph_json;
              } catch {
                // ignore parse error
              }
            }
            xmlToUse = xmlToUse || version.xml_content;
            break;
          }
        }
      } catch (dbErr) {
        console.warn('[Compose API] DB lookup warning:', dbErr);
      }
    }

    // Load all diagrams present for this workspace / usecase from db
    const diagramRepository: Record<string, { id: string; architecture_type: string; graph_json?: any; xml?: string; prompt?: string }> = {};
    try {
      const allDiagrams = await listDiagrams();
      for (const diag of allDiagrams) {
        const archType = diag.architecture_type || 'conceptual_diagram';
        if (!diagramRepository[archType]) {
          diagramRepository[archType] = {
            id: diag.id,
            architecture_type: archType,
            graph_json: null,
            xml: diag.xml_content,
            prompt: diag.prompt || undefined,
          };
        }
      }
    } catch (dbErr) {
      console.warn('[Compose API] DB repository lookup warning:', dbErr);
    }

    // 1. Extract SystemModel
    const model = extractSystemModel({
      graph_json: directGraphJson || Object.values(diagramRepository)[0]?.graph_json,
      xml: directXml || Object.values(diagramRepository)[0]?.xml,
      title: title || 'Enterprise Governed Architecture Platform',
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
      diagramRepository,
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
