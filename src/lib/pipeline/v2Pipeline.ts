import { GoogleGenAI } from '@google/genai';
import { generateLogicalGraph, editLogicalGraph } from '../graph/generator';
import { computeElkLayout } from '../layout/elk-layout';
import { renderGraphToDrawioXml } from '../render/drawio-xml';
import { validateDrawioXml, ValidationResult } from '../validate/validator';
import { ArchitectureGraph } from '../graph/schema';
import { REPAIR_XML_SYSTEM_PROMPT, buildRepairXmlPrompt } from '../../prompts/repairXml';
import { GEMINI_MODEL_ID, getGenConfig } from '../geminiConfig';

export interface V2PipelineTelemetry {
  modelId: string;
  latencyMs: number;
  inputTokens?: number;
  outputTokens?: number;
  thinkingTokens?: number;
  validationPassed: boolean;
  repairAttempts: number;
  errorsCount: number;
  warningsCount: number;
}

export interface V2PipelineResult {
  xml: string;
  graph: ArchitectureGraph;
  validationReport: ValidationResult;
  telemetry: V2PipelineTelemetry;
}

export async function runV2Pipeline(
  userPrompt: string,
  modelId: string = GEMINI_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<V2PipelineResult> {
  const startTime = Date.now();
  const ai = aiClient || new GoogleGenAI({});

  let repairAttempts = 0;

  // 1. Generate Logical Graph JSON
  const logicalGraph = await generateLogicalGraph(userPrompt, modelId, ai);

  // 2. Compute ELK.js Layout
  const laidOutGraph = await computeElkLayout(logicalGraph);

  // 3. Render Draw.io XML
  let currentXml = renderGraphToDrawioXml(laidOutGraph);

  // 4. Pre-Render Validation
  let validation = validateDrawioXml(currentXml);

  // 5. Automated Repair Loop (if invalid, max 2 attempts)
  if (!validation.valid) {
    while (repairAttempts < 2 && !validation.valid) {
      repairAttempts++;
      const repairPrompt = buildRepairXmlPrompt(
        JSON.stringify(validation.errors, null, 2),
        currentXml
      );

      try {
        const response = await ai.models.generateContent({
          model: modelId,
          contents: repairPrompt,
          config: {
            systemInstruction: REPAIR_XML_SYSTEM_PROMPT,
            ...getGenConfig('repair'),
          },
        });

        let repairedText = response.text || '';
        const match = repairedText.match(/```xml\s*([\s\S]*?)\s*```/) || repairedText.match(/```\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          repairedText = match[1].trim();
        }

        if (repairedText && repairedText.includes('<mxfile')) {
          const testValidation = validateDrawioXml(repairedText);
          currentXml = repairedText;
          validation = testValidation;
        }
      } catch (repairErr) {
        console.error(`[Pipeline V2 Repair Attempt ${repairAttempts} Failed]:`, repairErr);
      }
    }
  }

  const latencyMs = Date.now() - startTime;
  const telemetry: V2PipelineTelemetry = {
    modelId,
    latencyMs,
    validationPassed: validation.valid,
    repairAttempts,
    errorsCount: validation.errors.length,
    warningsCount: validation.warnings.length,
  };

  console.log('[Pipeline V2 Telemetry]:', telemetry);

  return {
    xml: currentXml,
    graph: laidOutGraph,
    validationReport: validation,
    telemetry,
  };
}

export async function runV2EditPipeline(
  currentGraph: ArchitectureGraph,
  userChangePrompt: string,
  modelId: string = GEMINI_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<V2PipelineResult> {
  const startTime = Date.now();
  const ai = aiClient || new GoogleGenAI({});

  let repairAttempts = 0;

  // 1. Edit Logical Graph JSON
  const updatedGraph = await editLogicalGraph(currentGraph, userChangePrompt, modelId, ai);

  // 2. Re-layout with ELK
  const laidOutGraph = await computeElkLayout(updatedGraph);

  // 3. Render Draw.io XML
  let currentXml = renderGraphToDrawioXml(laidOutGraph);

  // 4. Pre-Render Validation
  let validation = validateDrawioXml(currentXml);

  // 5. Repair Loop if needed
  if (!validation.valid) {
    while (repairAttempts < 2 && !validation.valid) {
      repairAttempts++;
      const repairPrompt = buildRepairXmlPrompt(
        JSON.stringify(validation.errors, null, 2),
        currentXml
      );

      try {
        const response = await ai.models.generateContent({
          model: modelId,
          contents: repairPrompt,
          config: {
            systemInstruction: REPAIR_XML_SYSTEM_PROMPT,
            ...getGenConfig('repair'),
          },
        });

        let repairedText = response.text || '';
        const match = repairedText.match(/```xml\s*([\s\S]*?)\s*```/) || repairedText.match(/```\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          repairedText = match[1].trim();
        }

        if (repairedText && repairedText.includes('<mxfile')) {
          const testValidation = validateDrawioXml(repairedText);
          currentXml = repairedText;
          validation = testValidation;
        }
      } catch (repairErr) {
        console.error(`[Pipeline V2 Repair Attempt ${repairAttempts} Failed]:`, repairErr);
      }
    }
  }

  const latencyMs = Date.now() - startTime;
  const telemetry: V2PipelineTelemetry = {
    modelId,
    latencyMs,
    validationPassed: validation.valid,
    repairAttempts,
    errorsCount: validation.errors.length,
    warningsCount: validation.warnings.length,
  };

  return {
    xml: currentXml,
    graph: laidOutGraph,
    validationReport: validation,
    telemetry,
  };
}
