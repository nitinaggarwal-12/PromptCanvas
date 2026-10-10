import { NextResponse } from 'next/server';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { analyzePromptWithGeminiArchitect } from '@/lib/geminiArchitecturalDecisionEngine';
import { runTruthfulnessAndGroundingCertification } from '@/lib/truthfulnessGroundingEngine';

export async function POST(request: Request) {
  const guard = await enforceGeminiRouteGuard(request, { endpoint: 'api/architect-decision' });
  if (!guard.allowed) return guard.errorResponse!;

  try {
    const body = await request.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const blueprintId = typeof body.blueprintId === 'string' ? body.blueprintId : '00';
    const xmlContent = typeof body.xmlContent === 'string' ? body.xmlContent : '';

    const [decision, truthfulnessDossier] = await Promise.all([
      analyzePromptWithGeminiArchitect(prompt, guard.effectiveApiKey),
      runTruthfulnessAndGroundingCertification({
        prompt,
        xmlContent,
        blueprintId,
        explicitApiKey: guard.effectiveApiKey,
      }),
    ]);

    return NextResponse.json({
      success: true,
      decision,
      truthfulnessDossier,
    });
  } catch (error) {
    console.error('[/api/architect-decision] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze prompt with Gemini Architect',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

