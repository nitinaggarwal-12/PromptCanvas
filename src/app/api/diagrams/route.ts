import { NextResponse } from 'next/server';
import { listDiagrams, createDiagram, clearAllDiagrams, batchDeleteDiagrams } from '@/lib/db';
import { getAuthenticatedUser, ensureAuthenticatedOrGuestUser } from '@/lib/auth';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { getCertifiedArchitectureTemplateById } from '@/lib/templates/certifiedArchitectureTemplates';
import { loadImmutableServerTemplateXml } from '@/lib/templates/serverTemplateXmlLoader';

// GET /api/diagrams - List diagrams (user-scoped or public seed, optionally filtered by ?studio=)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studioParam = searchParams.get('studio');
    const user = await getAuthenticatedUser();
    let diagrams = await listDiagrams(user?.id);

    const seenIds = new Set<string>();
    diagrams = diagrams
      .map((d: any) => {
        const resolvedTitle = String(d.name || '').replace(/&amp;/g, '&').trim() || 'Untitled Architecture';
        return {
          ...d,
          name: resolvedTitle,
          latest_prompt: String(d.latest_prompt || '').replace(/&amp;/g, '&'),
          latest_xml: d.latest_xml,
          xml_content: d.xml_content,
        };
      })
      .filter((d: any) => {
        const idKey = String(d.id || '').trim();
        if (!idKey || seenIds.has(idKey)) return false;
        seenIds.add(idKey);
        return true;
      });

    if (studioParam) {
      const targetStudio = studioParam.toLowerCase();
      diagrams = diagrams.filter((d) => {
        const itemStudio = (d.created_studio || 'studio1').toLowerCase();
        if (targetStudio === 'vision') {
          return itemStudio === 'vision' || d.architecture_type === 'vision_decompiled';
        }
        return itemStudio === targetStudio;
      });
    }

    return NextResponse.json(diagrams, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    console.error('Failed to list diagrams:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/diagrams - Create a new diagram (or immutable template clone) with a fresh unique UUID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawExplicitId = typeof body.id === 'string' ? body.id.trim() : undefined;
    const rawName = typeof body.name === 'string' ? body.name.trim() : '';
    const rawTemplateId = typeof body.templateId === 'string' ? body.templateId.trim() : undefined;
    const xml = body.xml || body.xmlContent || body.xml_content;
    const comment = body.comment;
    const prompt = body.prompt;
    const aiReasoning = body.aiReasoning || body.ai_reasoning;
    const businessUsecase = body.businessUsecase || body.business_usecase;
    const technicalUsecase = body.technicalUsecase || body.technical_usecase;
    const architectureType = body.architectureType || body.architecture_type;
    const isPrivate = body.isPrivate ?? body.is_private;
    const createdStudio = body.createdStudio || body.created_studio || 'dashboard';

    // Resolve immutable Certified Architecture Template if templateId or arch_tpl_<id> is passed
    const certTpl = getCertifiedArchitectureTemplateById(
      rawTemplateId ||
        (typeof architectureType === 'string' && architectureType.startsWith('arch_tpl_')
          ? architectureType
          : undefined)
    );
    if (rawTemplateId && !certTpl) {
      return NextResponse.json(
        { error: `Invalid request: unknown certified templateId "${rawTemplateId}"` },
        { status: 400 }
      );
    }

    const name = rawName || certTpl?.title || '';
    if (!name) {
      return NextResponse.json(
        { error: 'Invalid request: "name" is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    const effectiveArchType = certTpl
      ? `arch_tpl_${certTpl.id}`
      : architectureType || 'unified_system_view';

    // Clone a fresh copy of the frozen template XML when locking in a Certified Architecture Template.
    // Original template files in public/architecture-templates/xml/ remain 100% untouched.
    const serverClonedTemplateXml = certTpl ? loadImmutableServerTemplateXml(certTpl.id) : null;
    const rawEffectiveXml =
      xml !== undefined
        ? xml
        : serverClonedTemplateXml !== null
        ? serverClonedTemplateXml
        : getDefaultXmlForArchitecture(
            effectiveArchType,
            businessUsecase || prompt || name,
            prompt || name
          ) || undefined;
    const effectiveXml = rawEffectiveXml ? String(rawEffectiveXml) : rawEffectiveXml;

    const user = await ensureAuthenticatedOrGuestUser();
    const rawVersions = Array.isArray(body.versions)
      ? body.versions.map((v: any, idx: number) => ({
          version_number: Number(v?.version_number || idx + 1),
          xml: String(v?.xml || v?.xml_content || v?.xmlContent || ''),
          comment: v?.comment ? String(v.comment) : undefined,
          prompt: v?.prompt ? String(v.prompt) : undefined,
          created_by: v?.created_by || v?.createdBy || 'User',
          created_at: v?.created_at || v?.createdAt || undefined,
        }))
      : null;

    const { diagram, version } = await createDiagram(
      name,
      effectiveXml,
      comment || (certTpl ? `Cloned from immutable Template #${certTpl.id} (${certTpl.headerTag})` : 'Initial version'),
      prompt || certTpl?.summary,
      aiReasoning ||
        (certTpl
          ? `Cloned from Certified Template #${certTpl.id} (${certTpl.level} • ${certTpl.type} • ${certTpl.kind} • ${certTpl.useCase}). Original template remains intact.`
          : undefined),
      businessUsecase || certTpl?.useCase,
      technicalUsecase || (certTpl ? `${certTpl.type} · ${certTpl.kind}` : undefined),
      user?.id || null,
      effectiveArchType,
      Boolean(isPrivate),
      createdStudio,
      null,
      rawExplicitId || null,
      rawVersions
    );

    return NextResponse.json({ diagram, version }, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.startsWith('Forbidden:')) {
      return NextResponse.json({ error: msg }, { status: 403 });
    }
    console.error('Failed to create diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: msg },
      { status: 500 }
    );
  }
}

// DELETE /api/diagrams - Batch delete selected diagrams (?ids= or body.ids), studio-scoped delete (?studio=), or clear all
export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required to delete diagrams.' },
        { status: 401 }
      );
    }
    const isSuperAdmin = Boolean(user.is_super_admin || user.global_role === 'Super-Admin');
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');
    const studioParam = searchParams.get('studio');

    const clearAllFlag = searchParams.get('clearAll') === 'true';
    let idsToDelete: string[] = [];
    let explicitIdsProvided = Boolean(idsParam !== null);
    let bodyClearAll = false;
    if (idsParam) {
      idsToDelete = idsParam.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      try {
        const body = await request.json();
        if (Array.isArray(body?.ids)) {
          explicitIdsProvided = true;
          idsToDelete = body.ids.map((id: unknown) => String(id).trim()).filter(Boolean);
        }
        if (body?.clearAll === true) {
          bodyClearAll = true;
        }
      } catch {
        // No JSON body provided
      }
    }

    if (idsToDelete.length > 0) {
      const deletedCount = await batchDeleteDiagrams(idsToDelete, user.id, isSuperAdmin);
      return NextResponse.json({
        success: true,
        deletedCount,
        message: `Deleted ${deletedCount} selected diagram(s) successfully`
      });
    }

    if (explicitIdsProvided) {
      return NextResponse.json({
        success: true,
        deletedCount: 0,
        message: 'No diagram IDs selected for deletion'
      });
    }

    if (studioParam) {
      const targetStudio = studioParam.toLowerCase();
      const allDiagrams = await listDiagrams(user.id);
      const studioIds = allDiagrams
        .filter((d) => {
          const itemStudio = (d.created_studio || 'studio1').toLowerCase();
          if (targetStudio === 'vision') {
            return itemStudio === 'vision' || d.architecture_type === 'vision_decompiled';
          }
          return itemStudio === targetStudio;
        })
        .map((d) => d.id);

      const deletedCount = studioIds.length > 0
        ? await batchDeleteDiagrams(studioIds, user.id, isSuperAdmin)
        : 0;
      return NextResponse.json({
        success: true,
        deletedCount,
        message: `Cleared ${deletedCount} diagram(s) for studio ${targetStudio}`
      });
    }

    if (!clearAllFlag && !bodyClearAll) {
      return NextResponse.json(
        { error: 'Specify ids=[...], ?studio=<name>, or ?clearAll=true to delete diagrams.' },
        { status: 400 }
      );
    }

    await clearAllDiagrams(user.id);
    return NextResponse.json({ success: true, message: 'All diagram history cleared successfully' });
  } catch (error) {
    console.error('Failed to delete diagrams:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
