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
  rebuildGeneratedBlogFullMarkdown,
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
Enhance the Executive TL;DR, the Introduction section ("${baseBlog.sections[0]?.heading}"), and the Use Case & Workflow section ("${baseBlog.sections[2]?.heading || 'Use Case & Execution Flow'}") for the following technical blog post:
- Blog Publication Style: ${formatMeta.name} (${formatMeta.referenceUrl})
- Use Case Title: ${targetUseCase.title}
- Domain: ${targetUseCase.domainName}
- Summary Scope: ${targetUseCase.summaryPrompt}
- Primary Data Store: ${targetUseCase.primaryDataStore}
- Secondary Data Store: ${targetUseCase.secondaryDataStore}
- Root Agent: ${targetUseCase.rootAgentName}
- Sub-Agents: ${targetUseCase.subAgents.map((s) => `${s.name} (${s.role})`).join('; ')}
${customFocusNotes ? `- Custom Architectural Focus: ${customFocusNotes}` : ''}

Return a JSON object with string keys:
1. "enhancedTldr": A crisp 2-sentence executive TL;DR grounded in Google Cloud architecture.
2. "problemSummary": 1-2 sentences stating the concrete domain & architectural problem.
3. "solutionSummary": 1-2 sentences stating the Google Cloud ADK + Agent Engine + data plane solution.
4. "outcomeSummary": 1-2 sentences stating the measurable latency, security, and governance outcomes.
5. "enhancedIntroMarkdown": 2-3 paragraphs of deeply technical markdown introducing the architecture, problem statement, and why this multi-agent pattern solves it without unprompted assumptions.
6. "enhancedUseCaseMarkdown": 2-3 paragraphs explaining the end-to-end execution workflow across ${targetUseCase.rootAgentName} and its specialist sub-agents.`;

      const fallbackModels = Array.from(
        new Set([generatorModel, 'gemini-2.5-pro', 'gemini-2.5-flash'])
      );
      let rawText = '';
      let activeModelUsed = generatorModel;
      for (const candidateModel of fallbackModels) {
        try {
          const result = await generateContentWithRetry(ai, {
            model: candidateModel,
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
              temperature: 0.25,
              responseMimeType: 'application/json',
            },
          });
          if (result?.text) {
            rawText = result.text;
            activeModelUsed = candidateModel;
            break;
          }
        } catch {
          // Proceed to next fallback model in cascade
        }
      }

      if (!rawText) {
        throw new Error('All Gemini models in fallback cascade failed to return JSON');
      }

      const parsed = JSON.parse(rawText);
      if (parsed.enhancedTldr && typeof parsed.enhancedTldr === 'string') {
        baseBlog.tldrSummary = parsed.enhancedTldr;
        baseBlog.subtitle = parsed.enhancedTldr;
      }
      if (baseBlog.tldrStructured) {
        if (parsed.problemSummary && typeof parsed.problemSummary === 'string') {
          baseBlog.tldrStructured.problem = parsed.problemSummary;
        }
        if (parsed.solutionSummary && typeof parsed.solutionSummary === 'string') {
          baseBlog.tldrStructured.solution = parsed.solutionSummary;
        }
        if (parsed.outcomeSummary && typeof parsed.outcomeSummary === 'string') {
          baseBlog.tldrStructured.outcome = parsed.outcomeSummary;
        }
      }
      if (parsed.enhancedIntroMarkdown && typeof parsed.enhancedIntroMarkdown === 'string' && baseBlog.sections.length > 0) {
        baseBlog.sections[0] = {
          ...baseBlog.sections[0],
          markdown: parsed.enhancedIntroMarkdown,
        };
      }
      if (parsed.enhancedUseCaseMarkdown && typeof parsed.enhancedUseCaseMarkdown === 'string' && baseBlog.sections.length > 2) {
        baseBlog.sections[2] = {
          ...baseBlog.sections[2],
          markdown: `${parsed.enhancedUseCaseMarkdown}\n\n${baseBlog.sections[2].markdown}`,
        };
      }
      rebuildGeneratedBlogFullMarkdown(baseBlog, targetUseCase.domainName);
      return NextResponse.json({
        success: true,
        blog: baseBlog,
        markdown: baseBlog.fullMarkdown,
        okfSynthesis: baseBlog.okfSynthesis,
        generatorModel: activeModelUsed,
        judgeModel: getDistinctJudgeModel(activeModelUsed),
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
