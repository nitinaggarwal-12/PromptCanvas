import { GoogleGenAI } from '@google/genai';
import { generateLogicalGraph, editLogicalGraph, loadPromptTemplate } from '../graph/generator';
import { computeElkLayout } from '../layout/elk-layout';
import { renderGraphToDrawioXml } from '../render/drawio-xml';
import { validateDrawioXml, ValidationResult } from '../validate/validator';
import { ArchitectureGraph } from '../graph/schema';

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
  modelId: string = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
  aiClient?: GoogleGenAI
): Promise<V2PipelineResult> {
  const startTime = Date.now();
  const ai = aiClient || new GoogleGenAI({});

  let repairAttempts = 0;

  // 1. Generate Logical Graph JSON (schema validation retry <= 1 inside generateLogicalGraph)
  const logicalGraph = await generateLogicalGraph(userPrompt, modelId, ai);

  // 2. Compute ELK.js Layout
  const laidOutGraph = await computeElkLayout(logicalGraph);

  // 3. Render Draw.io XML
  let currentXml = renderGraphToDrawioXml(laidOutGraph);

  // 4. Pre-Render Validation
  let validation = validateDrawioXml(currentXml);

  // 5. Automated Repair Loop (if invalid, max 2 attempts)
  if (!validation.valid) {
    const repairTemplate = loadPromptTemplate('repair_xml.md');

    while (repairAttempts < 2 && !validation.valid) {
      repairAttempts++;
      const repairPrompt = repairTemplate
        .replace('{validation_report_json}', JSON.stringify(validation.errors, null, 2))
        .replace('{current_xml}', currentXml);

      try {
        const response = await ai.models.generateContent({
          model: modelId,
          contents: repairPrompt,
        });

        let repairedText = response.text || '';
        // Strip markdown code fences if model output wrapped in ```xml
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
  modelId: string = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash',
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
    const repairTemplate = loadPromptTemplate('repair_xml.md');

    while (repairAttempts < 2 && !validation.valid) {
      repairAttempts++;
      const repairPrompt = repairTemplate
        .replace('{validation_report_json}', JSON.stringify(validation.errors, null, 2))
        .replace('{current_xml}', currentXml);

      try {
        const response = await ai.models.generateContent({
          model: modelId,
          contents: repairPrompt,
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
