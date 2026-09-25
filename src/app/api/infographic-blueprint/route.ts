import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { getEffectiveGeminiApiKey } from '@/lib/geminiConfig';
import {
  INFOGRAPHIC_BLUEPRINTS_LIST,
  DynamicInfographicSpec,
  generateInfographicBlueprintXmlById
} from '@/lib/canonical/infographicBlueprints52to66';

export async function POST(req: NextRequest) {
  const startMs = Date.now();
  try {
    const body = await req.json();
    const blueprintId = String(body?.blueprintId || '52');
    const userPrompt = String(body?.prompt || 'Enterprise Cloud AI Architecture').trim();
    const level = String(body?.level || 'L2');
    const userApiKey = typeof body?.userApiKey === 'string' ? body.userApiKey : undefined;

    const meta =
      INFOGRAPHIC_BLUEPRINTS_LIST.find((b) => b.id === blueprintId) || INFOGRAPHIC_BLUEPRINTS_LIST[0];

    const apiKey = getEffectiveGeminiApiKey(userApiKey);
    let dynamicSpec: DynamicInfographicSpec | undefined;
    let engineUsed = 'gemini-2.5-flash-live';

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const itemCount =
          blueprintId === '52' || blueprintId === '62' || blueprintId === '65' || blueprintId === '66'
            ? 4
            : blueprintId === '56' || blueprintId === '57' || blueprintId === '61'
            ? 5
            : 6;

        const sysPrompt = `You are a Principal Cloud & Enterprise Infographic Architect.
Customize Infographic Blueprint #${meta.id} ("${meta.shortType}") for the user's prompt at abstraction level ${level}.
User Prompt: "${userPrompt}"
Blueprint Structure: ${meta.subtitle}
Generate exactly ${itemCount} high-impact items tailored specifically to "${userPrompt}".
Do NOT use generic placeholder text. Use concrete technologies, metrics, SLAs, and domain-specific terms matching "${userPrompt}".`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: sysPrompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                leftHeader: { type: Type.STRING },
                rightHeader: { type: Type.STRING },
                takeaway: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      code: { type: Type.STRING },
                      title: { type: Type.STRING },
                      badge: { type: Type.STRING },
                      description: { type: Type.STRING },
                      secondaryTitle: { type: Type.STRING },
                      secondaryBadge: { type: Type.STRING },
                      secondaryDescription: { type: Type.STRING },
                      metricOrScore: { type: Type.STRING }
                    },
                    required: ['code', 'title', 'badge', 'description']
                  }
                }
              },
              required: ['title', 'subtitle', 'takeaway', 'items']
            }
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed && parsed.title && Array.isArray(parsed.items) && parsed.items.length > 0) {
          dynamicSpec = {
            blueprintId: meta.id,
            title: parsed.title,
            subtitle: parsed.subtitle || meta.subtitle,
            leftHeader: parsed.leftHeader,
            rightHeader: parsed.rightHeader,
            takeaway: parsed.takeaway,
            items: parsed.items
          };
        }
      } catch (geminiErr: any) {
        console.warn('[/api/infographic-blueprint] Gemini fallback:', geminiErr?.message);
        engineUsed = 'deterministic-fallback';
      }
    } else {
      engineUsed = 'deterministic-no-key';
    }

    const xml = generateInfographicBlueprintXmlById(meta.id, userPrompt, dynamicSpec);

    return NextResponse.json({
      success: true,
      blueprintId: meta.id,
      shortType: meta.shortType,
      title: dynamicSpec?.title || `${meta.shortType}: ${userPrompt}`,
      subtitle: dynamicSpec?.subtitle || meta.subtitle,
      takeaway: dynamicSpec?.takeaway,
      itemCount: dynamicSpec?.items?.length || meta.keyComponents.length,
      engineUsed,
      latencyMs: Date.now() - startMs,
      spec: dynamicSpec,
      xml
    });
  } catch (err: any) {
    console.error('[/api/infographic-blueprint] Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate Infographic Blueprint via Gemini API.' },
      { status: 500 }
    );
  }
}
