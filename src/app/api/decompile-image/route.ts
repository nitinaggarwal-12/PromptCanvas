import { NextRequest, NextResponse } from 'next/server';
import { decompileArchitectureImageWithDeepMind } from '@/lib/deepmindVisionDecompiler';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, projectName, useCaseName, userApiKey } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid imageBase64 payload.' },
        { status: 400 }
      );
    }

    const result = await decompileArchitectureImageWithDeepMind({
      imageBase64,
      mimeType: mimeType || 'image/png',
      projectName: projectName || 'Decompiled Architecture',
      useCaseName: useCaseName || 'DeepMind Multimodal Extraction',
      userApiKey,
    });

    return NextResponse.json({
      success: true,
      xml: result.xml,
      summary: result.summary,
      extractedZones: result.extractedZones,
      componentCount: result.componentCount,
    });
  } catch (error: any) {
    console.error('API Error in /api/decompile-image:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to decompile architecture image.' },
      { status: 500 }
    );
  }
}
