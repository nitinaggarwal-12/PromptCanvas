import { NextRequest, NextResponse } from 'next/server';
import { decompileArchitectureImageWithDeepMind } from '@/lib/deepmindVisionDecompiler';
import { createDiagram } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { imageBase64, mimeType, projectName, useCaseName, userApiKey } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid imageBase64 payload.' },
        { status: 400 }
      );
    }

    const resolvedName = projectName || 'Decompiled Architecture';
    const resolvedUseCase = useCaseName || 'DeepMind Multimodal Extraction';

    const result = await decompileArchitectureImageWithDeepMind({
      imageBase64,
      mimeType: mimeType || 'image/png',
      projectName: resolvedName,
      useCaseName: resolvedUseCase,
      userApiKey,
    });

    let persistedId: string | undefined;
    try {
      const saved = await createDiagram(
        resolvedName,
        result.xml,
        `Vision Decompiled: ${result.summary}`,
        resolvedUseCase,
        result.summary,
        resolvedUseCase,
        'DeepMind Vision AST',
        user?.id,
        'conceptual_diagram'
      );
      persistedId = saved?.diagram?.id;
    } catch (dbErr) {
      console.warn('[/api/decompile-image] Could not persist diagram to DB:', dbErr);
    }

    return NextResponse.json({
      success: true,
      id: persistedId,
      diagramId: persistedId,
      xml: result.xml,
      summary: result.summary,
      extractedZones: result.extractedZones,
      componentCount: result.componentCount,
      isFallback: result.isFallback,
      modelUsed: result.modelUsed,
      attribution: result.attribution,
      fallbackReason: result.fallbackReason,
      isCertified: result.isCertified,
      auditReport: result.auditReport,
      steps: result.steps,
      matchedBlueprintId: result.matchedBlueprintId,
      detectedTitle: result.detectedTitle,
    });
  } catch (error: any) {
    console.error('API Error in /api/decompile-image:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to decompile architecture image.' },
      { status: 500 }
    );
  }
}
