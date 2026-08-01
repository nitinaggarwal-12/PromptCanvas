import { GoogleGenAI, Type } from '@google/genai';
import {
  ArchitectureGraph,
  validateGraphJson,
} from './schema';
import { GENERATE_GRAPH_SYSTEM_PROMPT } from '../../prompts/generateGraph';
import { EDIT_GRAPH_SYSTEM_PROMPT, buildEditGraphPrompt } from '../../prompts/editGraph';

export async function generateLogicalGraph(
  userPrompt: string,
  modelId: string = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const ai = aiClient || new GoogleGenAI({});

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = `USER REQUEST:\n${userPrompt}`;

  while (attempts < 2) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: currentContents,
        config: {
          systemInstruction: GENERATE_GRAPH_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              cloud: { type: Type.STRING },
              tiers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    order: { type: Type.INTEGER },
                  },
                },
              },
              nodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    tier: { type: Type.STRING },
                    type: { type: Type.STRING },
                    product: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                },
              },
              edges: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    source: { type: Type.STRING },
                    target: { type: Type.STRING },
                    label: { type: Type.STRING },
                    style: { type: Type.STRING },
                    protocol: { type: Type.STRING },
                  },
                },
              },
              narrative: {
                type: Type.OBJECT,
                properties: {
                  reasoning: { type: Type.STRING },
                  businessUsecase: { type: Type.STRING },
                  technicalUsecase: { type: Type.STRING },
                },
              },
            },
          },
        },
      });

      const responseText = response.text || '';
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const val = validateGraphJson(parsed);
      if (val.valid && val.graph) {
        return val.graph;
      } else {
        lastErrorText = val.errors.join('; ');
        currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED SCHEMA VALIDATION:\n${lastErrorText}\nPLEASE FIX THE ERRORS AND RETURN VALID JSON MATCHING THE SCHEMA.`;
      }
    } catch (apiErr: any) {
      lastErrorText = `API Call Error: ${apiErr?.message || String(apiErr)}`;
      currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH API ERROR:\n${lastErrorText}\nPLEASE RETRY.`;
    }
  }

  throw new Error(`Failed to generate a valid architecture graph JSON after 2 attempts: ${lastErrorText}`);
}

export async function editLogicalGraph(
  currentGraph: ArchitectureGraph,
  userChangePrompt: string,
  modelId: string = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const ai = aiClient || new GoogleGenAI({});
  const currentGraphJson = JSON.stringify(currentGraph, null, 2);

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = buildEditGraphPrompt(currentGraphJson, userChangePrompt);

  while (attempts < 2) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: currentContents,
        config: {
          systemInstruction: EDIT_GRAPH_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const val = validateGraphJson(parsed);
      if (val.valid && val.graph) {
        return val.graph;
      } else {
        lastErrorText = val.errors.join('; ');
        currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED SCHEMA VALIDATION:\n${lastErrorText}\nPLEASE FIX THE ERRORS AND RETURN VALID JSON MATCHING THE SCHEMA.`;
      }
    } catch (apiErr: any) {
      lastErrorText = `API Call Error: ${apiErr?.message || String(apiErr)}`;
      currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED WITH API ERROR:\n${lastErrorText}\nPLEASE RETRY.`;
    }
  }

  throw new Error(`Failed to update architecture graph JSON after 2 attempts: ${lastErrorText}`);
}
