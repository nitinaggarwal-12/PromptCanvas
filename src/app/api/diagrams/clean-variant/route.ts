import { NextResponse } from 'next/server';
import { getDiagram, getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';
import { createMinimalistCleanVariant } from '@/lib/diagramCleaner';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { diagramId, architectureType } = await request.json();
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId is required' }, { status: 400 });
    }

    const diagram = await getDiagram(diagramId, user?.id);
    if (!diagram) {
      return NextResponse.json({ error: `Diagram with ID ${diagramId} not found or access denied` }, { status: 404 });
    }

    if (diagram.access_level === 'Viewer') {
      return NextResponse.json({ error: 'Forbidden: You have read-only access to this diagram.' }, { status: 403 });
    }

    const latestVersion = await getLatestDiagramVersion(diagramId, architectureType);
    if (!latestVersion) {
      return NextResponse.json({ error: 'Diagram has no versions to clean' }, { status: 404 });
    }

    const currentXml = latestVersion.xml_content;

    // Transform into Option 2: Minimalist Clean Variant
    const { cleanedXml, modifiedNodesCount } = createMinimalistCleanVariant(currentXml);

    // Apply AST Schema Validation & Auto-Healing
    const healResult = validateAndHealDrawioXml(cleanedXml);

    const comment = `Option 2: Minimalist Clean Variant (Simplified ${modifiedNodesCount} nodes with hover tooltips)`;

    const newVersion = await saveDiagramVersion(
      diagramId,
      healResult.xml,
      comment,
      'Option 2 Generator',
      null,
      null,
      null,
      null,
      architectureType || latestVersion.architecture_type || 'unified_system_view'
    );

    return NextResponse.json({
      success: true,
      newVersion,
      comment,
      message: `Successfully generated Option 2 Minimalist Clean Variant!`
    });
  } catch (error: unknown) {
    console.error('Failed to generate clean variant:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Clean Variant Generation Failed', details: errorMessage },
      { status: 500 }
    );
  }
}
