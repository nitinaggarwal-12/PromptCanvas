import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID, getGenConfig } from '../geminiConfig';
import { SystemModel } from './extract';
import { buildInferredPrompt } from '../../prompts/compose/prompts';

export interface InferredSectionOutput {
  paragraphs: string[];
  bullets: string[];
}

export async function fillInferredSections(
  model: SystemModel,
  sections: { id: string; title: string; inferPrompt?: string }[]
): Promise<Record<string, InferredSectionOutput>> {
  const result: Record<string, InferredSectionOutput> = {};

  // Default fallback if no Gemini key or call fails
  for (const s of sections) {
    result[s.id] = {
      paragraphs: [`[inferred — generation unavailable: confirm ${s.title} against engineering model]`],
      bullets: [],
    };
  }

  if (sections.length === 0) return result;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return result;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = buildInferredPrompt(model, sections);
    const config = getGenConfig('narrative');

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_ID,
      contents: prompt,
      config,
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    for (const s of sections) {
      if (parsed[s.id] && Array.isArray(parsed[s.id].paragraphs)) {
        result[s.id] = {
          paragraphs: parsed[s.id].paragraphs.map((p: string) =>
            p.includes('[Confirm') || p.includes('Likely') || p.includes('Presumed')
              ? p
              : `${p} [Likely/Presumed: confirm against model]`
          ),
          bullets: Array.isArray(parsed[s.id].bullets) ? parsed[s.id].bullets : [],
        };
      }
    }
  } catch (err) {
    console.warn('[Compose Infer] Gemini inference call failed, using graceful TODO fallback:', err);
  }

  return result;
}
