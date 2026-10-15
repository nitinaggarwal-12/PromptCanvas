import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { getEffectiveGeminiApiKey, GEMINI_PRO_MODEL_ID, getDistinctJudgeModel } from '@/lib/geminiConfig';
import { enforceGeminiRouteGuard, checkConversationalOrNonMutationIntent } from '@/lib/geminiRouteGuard';
import {
  BLOG_FORMATS,
  BlogFormatId,
  getAllBlogUseCasePresets,
  buildUseCasePresetFromCustomInput,
  generateBlogForUseCase,
} from '@/lib/blogs/useCaseBlogEngine';

export async function POST(req: NextRequest) {
  try {
    const guard = await enforceGeminiRouteGuard(req, { endpoint: 'api/blogs/generate' });
    if (!guard.allowed) return guard.errorResponse!;

    const body = await req.json();
    const {
      useCaseId,
      useCaseTitle,
      useCasePrompt,
      domainId = 'enterprise',
      templateId = '78',
      formatId = 'cloud-arch-center',
      authorName,
      authorRole,
      coAuthorName,
      coAuthorRole,
      customFocusNotes,
      enhanceWithAi = false,
    } = body;

    const inputTextForCheck = `${useCaseTitle || ''} ${useCasePrompt || ''} ${customFocusNotes || ''}`.trim();
    if (inputTextForCheck) {
      const intentCheck = checkConversationalOrNonMutationIntent(inputTextForCheck);
      if (intentCheck.isNonMutation) {
        return NextResponse.json({
          success: true,
          conversationalOnly: true,
          replyMessage: intentCheck.replyMessage,
        });
      }
    }

    const validFormatId: BlogFormatId = BLOG_FORMATS.some((f) => f.id === formatId)
      ? (formatId as BlogFormatId)
      : 'cloud-arch-center';

    const allPresets = getAllBlogUseCasePresets();
    let targetUseCase = allPresets.find((p) => p.id === useCaseId);

    if (!targetUseCase) {
      if (!useCaseTitle) {
        targetUseCase = allPresets[0];
      } else {
        targetUseCase = buildUseCasePresetFromCustomInput({
          id: useCaseId || `custom-${Date.now()}`,
          title: useCaseTitle,
          prompt: useCasePrompt || useCaseTitle,
          domainId,
          templateId,
          defaultFormatId: validFormatId,
        });
      }
    }

    const baseBlog = generateBlogForUseCase(targetUseCase, validFormatId, {
      authorName,
      authorRole,
      coAuthorName,
      coAuthorRole,
      customFocusNotes,
    });

    const generatorModel = GEMINI_PRO_MODEL_ID;
    const judgeModel = getDistinctJudgeModel(generatorModel);
    const apiKey = guard.effectiveApiKey || getEffectiveGeminiApiKey();

    if (!enhanceWithAi || !apiKey) {
      return NextResponse.json({
        success: true,
        blog: baseBlog,
        markdown: baseBlog.fullMarkdown,
        okfSynthesis: baseBlog.okfSynthesis,
        generatorModel,
        judgeModel,
        aiEnhanced: false,
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const formatMeta = BLOG_FORMATS.find((f) => f.id === validFormatId) || BLOG_FORMATS[0];
      const prompt = `You are a Principal Google Cloud Architecture & Developer Relations Technical Writer.
Enhance the Executive TL;DR and the first section ("${baseBlog.sections[0]?.heading}") for the following technical blog post:
- Blog Publication Style: ${formatMeta.name} (${formatMeta.referenceUrl})
- Use Case Title: ${targetUseCase.title}
- Domain: ${targetUseCase.domainName}
- Summary Scope: ${targetUseCase.summaryPrompt}
- Primary Data Store: ${targetUseCase.primaryDataStore}
- Root Agent: ${targetUseCase.rootAgentName}
- Sub-Agents: ${targetUseCase.subAgents.map((s) => `${s.name} (${s.role})`).join('; ')}
${customFocusNotes ? `- Custom Architectural Focus: ${customFocusNotes}` : ''}

Return a JSON object with exactly two string keys:
1. "enhancedTldr": A crisp 2-sentence executive TL;DR grounded in Google Cloud architecture.
2. "enhancedIntroMarkdown": 2-3 paragraphs of deeply technical markdown introducing the architecture, problem statement, and why this multi-agent pattern solves it without unprompted assumptions.`;

      const result = await generateContentWithRetry(ai, {
        model: generatorModel,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.25,
          responseMimeType: 'application/json',
        },
      });

      const rawText = result.text || '';
      const parsed = JSON.parse(rawText);
      if (parsed.enhancedTldr && typeof parsed.enhancedTldr === 'string') {
        baseBlog.tldrSummary = parsed.enhancedTldr;
        baseBlog.subtitle = parsed.enhancedTldr;
      }
      if (parsed.enhancedIntroMarkdown && typeof parsed.enhancedIntroMarkdown === 'string' && baseBlog.sections.length > 0) {
        baseBlog.sections[0] = {
          ...baseBlog.sections[0],
          markdown: parsed.enhancedIntroMarkdown,
        };
      }
      return NextResponse.json({
        success: true,
        blog: baseBlog,
        markdown: baseBlog.fullMarkdown,
        okfSynthesis: baseBlog.okfSynthesis,
        generatorModel,
        judgeModel,
        aiEnhanced: true,
      });
    } catch {
      return NextResponse.json({
        success: true,
        blog: baseBlog,
        markdown: baseBlog.fullMarkdown,
        okfSynthesis: baseBlog.okfSynthesis,
        generatorModel,
        judgeModel,
        aiEnhanced: false,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to generate technical blog' },
      { status: 500 }
    );
  }
}
