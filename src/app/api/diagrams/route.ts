import { NextResponse } from 'next/server';
import { listDiagrams, createDiagram, clearAllDiagrams, batchDeleteDiagrams } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';

// GET /api/diagrams - List diagrams (user-scoped or public seed, optionally filtered by ?studio=)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studioParam = searchParams.get('studio');
    const user = await getAuthenticatedUser();
    let diagrams = await listDiagrams(user?.id);

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

// POST /api/diagrams - Create a new diagram attached to authenticated user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name;
    const xml = body.xml || body.xmlContent || body.xml_content;
    const comment = body.comment;
    const prompt = body.prompt;
    const aiReasoning = body.aiReasoning || body.ai_reasoning;
    const businessUsecase = body.businessUsecase || body.business_usecase;
    const technicalUsecase = body.technicalUsecase || body.technical_usecase;
    const architectureType = body.architectureType || body.architecture_type;
    const isPrivate = body.isPrivate ?? body.is_private;
    const createdStudio = body.createdStudio || body.created_studio || 'studio1';

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "name" is required and must be a string' },
        { status: 400 }
      );
    }

    const effectiveArchType = architectureType || 'unified_system_view';
    const effectiveXml = xml !== undefined ? xml : (getDefaultXmlForArchitecture(effectiveArchType, businessUsecase || prompt || name, prompt || name) || undefined);

    let user = await getAuthenticatedUser();
    if (!user || !user.id) {
      try {
        const { v4: uuidv4 } = await import('uuid');
        const { createUser, createSession } = await import('@/lib/db');
        const { hashPassword, setSessionCookie, SESSION_MAX_AGE_DAYS } = await import('@/lib/auth');
        const guestEmail = `guest_${uuidv4().slice(0, 8)}@promptcanvas.guest`;
        const { hash, salt } = hashPassword('guest-session-secret');
        const guestUser = await createUser(guestEmail, hash, salt, 'Guest Explorer');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_MAX_AGE_DAYS);
        const session = await createSession(guestUser.id, expiresAt);
        await setSessionCookie(session.id);
        user = guestUser;
      } catch (authErr) {
        console.warn('Failed to auto-provision guest session on diagram create:', authErr);
      }
    }

    const { diagram, version } = await createDiagram(
      name,
      effectiveXml,
      comment || 'Initial version',
      prompt,
      aiReasoning,
      businessUsecase,
      technicalUsecase,
      user?.id || null,
      effectiveArchType,
      Boolean(isPrivate),
      createdStudio
    );

    return NextResponse.json({ diagram, version }, { status: 201 });
  } catch (error) {
    console.error('Failed to create diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/diagrams - Batch delete selected diagrams (?ids= or body.ids), studio-scoped delete (?studio=), or clear all
export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');
    const studioParam = searchParams.get('studio');

    let idsToDelete: string[] = [];
    if (idsParam) {
      idsToDelete = idsParam.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      try {
        const body = await request.json();
        if (Array.isArray(body?.ids)) {
          idsToDelete = body.ids.map((id: unknown) => String(id).trim()).filter(Boolean);
        }
      } catch {
        // No JSON body provided
      }
    }

    if (idsToDelete.length > 0) {
      const deletedCount = await batchDeleteDiagrams(idsToDelete, user?.id, true);
      return NextResponse.json({
        success: true,
        deletedCount,
        message: `Deleted ${deletedCount} selected diagram(s) successfully`
      });
    }

    if (studioParam) {
      const targetStudio = studioParam.toLowerCase();
      const allDiagrams = await listDiagrams(user?.id);
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
        ? await batchDeleteDiagrams(studioIds, user?.id, true)
        : 0;
      return NextResponse.json({
        success: true,
        deletedCount,
        message: `Cleared ${deletedCount} diagram(s) for studio ${targetStudio}`
      });
    }

    if (user && user.id) {
      await clearAllDiagrams(user.id);
    }
    return NextResponse.json({ success: true, message: 'All diagram history cleared successfully' });
  } catch (error) {
    console.error('Failed to delete diagrams:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
