import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import {
  ArchitectureGraph,
  validateGraphJson,
  ARCHITECTURE_GRAPH_JSON_SCHEMA,
} from './schema';

export function loadPromptTemplate(filename: string): string {
  const filePath = path.join(process.cwd(), 'prompts', filename);
  return fs.readFileSync(filePath, 'utf-8');
}

export async function generateLogicalGraph(
  userPrompt: string,
  modelId: string = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const ai = aiClient || new GoogleGenAI({});
  const template = loadPromptTemplate('generate_graph.md');
  const schemaStr = JSON.stringify(ARCHITECTURE_GRAPH_JSON_SCHEMA, null, 2);

  const fullPrompt = template
    .replace('{schema_json}', schemaStr)
    .replace('{user_prompt}', userPrompt);

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = fullPrompt;

  while (attempts < 2) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: currentContents,
        config: {
          responseMimeType: 'application/json',
          // Use structured outputs schema if supported by the SDK version
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
        currentContents = `${fullPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const val = validateGraphJson(parsed);
      if (val.valid && val.graph) {
        return val.graph;
      } else {
        lastErrorText = val.errors.join('; ');
        currentContents = `${fullPrompt}\n\nPREVIOUS ATTEMPT FAILED SCHEMA VALIDATION:\n${lastErrorText}\nPLEASE FIX THE ERRORS AND RETURN VALID JSON MATCHING THE SCHEMA.`;
      }
    } catch (apiErr: any) {
      lastErrorText = `API Call Error: ${apiErr?.message || String(apiErr)}`;
      currentContents = `${fullPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH API ERROR:\n${lastErrorText}\nPLEASE RETRY.`;
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
  const template = loadPromptTemplate('edit_graph.md');

  const fullPrompt = template
    .replace('{current_graph_json}', JSON.stringify(currentGraph, null, 2))
    .replace('{user_prompt}', userChangePrompt);

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = fullPrompt;

  while (attempts < 2) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: currentContents,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `${fullPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const val = validateGraphJson(parsed);
      if (val.valid && val.graph) {
        return val.graph;
      } else {
        lastErrorText = val.errors.join('; ');
        currentContents = `${fullPrompt}\n\nPREVIOUS ATTEMPT FAILED SCHEMA VALIDATION:\n${lastErrorText}\nPLEASE FIX THE ERRORS AND RETURN VALID JSON MATCHING THE SCHEMA.`;
      }
    } catch (apiErr: any) {
      lastErrorText = `API Call Error: ${apiErr?.message || String(apiErr)}`;
      currentContents = `${fullPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH API ERROR:\n${lastErrorText}\nPLEASE RETRY.`;
    }
  }

  throw new Error(`Failed to update architecture graph JSON after 2 attempts: ${lastErrorText}`);
}
