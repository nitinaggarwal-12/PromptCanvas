import { NextResponse } from 'next/server';
import { customizeDiagramTemplateWithGemini } from '@/lib/geminiDiagramCustomizer';
import { getDefaultXmlForArchitecture, getArchitectureTypeById } from '@/lib/architectureTypes';
import { getDiagram, saveDiagramVersion, updateDiagramArchitectureType } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { diagramId, architectureType, prompt, useCaseContext } = body;

    if (!architectureType) {
      return NextResponse.json({ error: 'Missing architectureType' }, { status: 400 });
    }

    let effectivePrompt = prompt;
    if (!effectivePrompt && diagramId) {
      const diagram = await getDiagram(diagramId, user?.id);
      if (diagram) {
        const dAny = diagram as any;
        effectivePrompt = dAny.prompt || diagram.name || dAny.business_usecase || dAny.technical_usecase;
      }
    }

    if (!effectivePrompt) {
      effectivePrompt = getArchitectureTypeById(architectureType)?.name || architectureType;
    }

    // 1. Get the pristine collision-free base XML for this architecture type
    const baseXml = getDefaultXmlForArchitecture(architectureType);
    if (!baseXml) {
      return NextResponse.json({ error: `No base template found for architecture: ${architectureType}` }, { status: 404 });
    }

    // 2. Prompt Gemini 3.6 to dynamically customize all nodes, lifelines, queues, databases and metadata
    console.log(`[Customize Route] Tailoring ${architectureType} for prompt: "${effectivePrompt.slice(0, 50)}"...`);
    const customized = await customizeDiagramTemplateWithGemini(baseXml, effectivePrompt, architectureType);

    let savedVersion = null;
    if (diagramId) {
      const archMeta = getArchitectureTypeById(architectureType);
      const archName = archMeta?.name || architectureType;
      const comment = `${archName} (Tailored for: ${effectivePrompt.slice(0, 45)}...)`;

      savedVersion = await saveDiagramVersion(
        diagramId,
        customized.xml,
        comment,
        'AI',
        effectivePrompt,
        customized.reasoning,
        customized.businessUsecase,
        customized.technicalUsecase,
        architectureType
      );

      await updateDiagramArchitectureType(diagramId, architectureType);
    }

    return NextResponse.json({
      success: true,
      architectureType,
      xml: customized.xml,
      reasoning: customized.reasoning,
      businessUsecase: customized.businessUsecase,
      technicalUsecase: customized.technicalUsecase,
      version: savedVersion
    });
  } catch (error) {
    console.error('Failed to customize diagram architecture:', error);
    return NextResponse.json(
      { error: 'Failed to customize architecture', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
