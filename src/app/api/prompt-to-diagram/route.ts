import { NextRequest, NextResponse } from 'next/server';
import {
  enforceGeminiRouteGuard,
  checkConversationalOrNonMutationIntent,
} from '@/lib/geminiRouteGuard';
import {
  runCompoundPromptToDiagram,
  type CompoundArchitectureGraph,
} from '@/lib/freeform/compoundPromptToDiagramEngine';

export const dynamic = 'force-dynamic';
export const maxDuration = 180;

export async function POST(req: NextRequest) {
  const guard = await enforceGeminiRouteGuard(req, { endpoint: 'api/prompt-to-diagram' });
  if (!guard.allowed) return guard.errorResponse!;

  try {
    const body = await req.json();
    const action: 'create' | 'modify' = body.action === 'modify' ? 'modify' : 'create';
    const currentGraph: CompoundArchitectureGraph | null =
      body.currentGraph && typeof body.currentGraph === 'object' ? body.currentGraph : null;
    const rawUserPrompt = typeof body.userPrompt === 'string' ? body.userPrompt.trim() : '';
    const userPrompt = rawUserPrompt || currentGraph?.title || '';
    const modificationPrompt =
      typeof body.modificationPrompt === 'string' ? body.modificationPrompt.trim() : undefined;
    const modificationHistory = Array.isArray(body.modificationHistory)
      ? body.modificationHistory.map(String)
      : [];
    const currentXml = typeof body.currentXml === 'string' ? body.currentXml : undefined;

    if (!userPrompt) {
      return NextResponse.json(
        { error: 'Please provide a non-empty architecture prompt.' },
        { status: 400 }
      );
    }

    if (action === 'modify' && !modificationPrompt) {
      return NextResponse.json(
        { error: 'Please provide a follow-up modification prompt.' },
        { status: 400 }
      );
    }

    const activePromptText = action === 'modify' ? modificationPrompt! : userPrompt;
    const intentCheck = checkConversationalOrNonMutationIntent(activePromptText);
    if (intentCheck.isNonMutation) {
      return NextResponse.json(
        {
          conversationalOnly: true,
          mutationApplied: false,
          error: intentCheck.replyMessage,
          replyMessage: intentCheck.replyMessage,
        },
        { status: 400 }
      );
    }

    const result = await runCompoundPromptToDiagram({
      action,
      userPrompt,
      modificationPrompt,
      modificationHistory,
      currentGraph,
      currentXml,
      explicitApiKey: guard.effectiveApiKey,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[/api/prompt-to-diagram] Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to synthesize architecture diagram from prompt.',
      },
      { status: 500 }
    );
  }
}
