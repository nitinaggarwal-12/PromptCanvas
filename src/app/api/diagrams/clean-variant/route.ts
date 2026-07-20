import { NextResponse } from 'next/server';
import { getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';
import { createMinimalistCleanVariant } from '@/lib/diagramCleaner';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

export async function POST(request: Request) {
  try {
    const { diagramId } = await request.json();
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId is required' }, { status: 400 });
    }

    const latestVersion = await getLatestDiagramVersion(diagramId);
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
      'Option 2 Generator'
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
