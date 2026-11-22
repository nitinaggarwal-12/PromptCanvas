import { GoogleGenAI } from '@google/genai';
import { generateLogicalGraph, editLogicalGraph } from '../graph/generator';
import { computeElkLayout } from '../layout/elk-layout';
import { renderGraphToDrawioXml } from '../render/drawio-xml';
import { validateDrawioXml, ValidationResult } from '../validate/validator';
import { ArchitectureGraph } from '../graph/schema';
import {
  GEMINI_FLASH_MODEL_ID,
  GEMINI_MODEL_ID,
  createGeminiClient,
  getDistinctJudgeModel,
} from '../geminiConfig';

interface V2PipelineTelemetry {
  modelId: string;
  repairModelId?: string;
  latencyMs: number;
  inputTokens?: number;
  outputTokens?: number;
  thinkingTokens?: number;
  validationPassed: boolean;
  repairAttempts: number;
  errorsCount: number;
  warningsCount: number;
}

interface V2PipelineResult {
  xml: string;
  graph: ArchitectureGraph;
  validationReport: ValidationResult;
  telemetry: V2PipelineTelemetry;
}

/**
 * Repairs structural validation issues at the compact ArchitectureGraph IR level (never by asking
 * an LLM to rewrite 25KB of raw Draw.io XML with inline base64/SVG data URIs), then deterministically
 * recomputes layout and re-renders XML.
 */
async function repairGraphIfInvalid(
  initialGraph: ArchitectureGraph,
  initialXml: string,
  initialValidation: ValidationResult,
  repairModelId: string,
  ai: GoogleGenAI | null
): Promise<{
  graph: ArchitectureGraph;
  xml: string;
  validation: ValidationResult;
  repairAttempts: number;
}> {
  let graph = initialGraph;
  let xml = initialXml;
  let validation = initialValidation;
  let repairAttempts = 0;

  if (validation.valid || validation.errors.length === 0) {
    return { graph, xml, validation, repairAttempts };
  }

  // Only attempt compact IR-level repair when an AI client is available (1 fast bounded pass)
  if (ai) {
    repairAttempts++;
    const errorSummary = validation.errors
      .slice(0, 8)
      .map((e) => `${e.code}: ${e.detail}`)
      .join('\n');
    try {
      const repairedLogical = await editLogicalGraph(
        graph,
        `Fix these structural graph validation errors while preserving all user-requested components:\n${errorSummary}`,
        repairModelId,
        ai
      );
      const relaid = await computeElkLayout(repairedLogical);
      const rerendered = renderGraphToDrawioXml(relaid);
      const reval = validateDrawioXml(rerendered);
      if (reval.errors.length <= validation.errors.length) {
        graph = relaid;
        xml = rerendered;
        validation = reval;
      }
    } catch (repairErr) {
      console.warn('[Pipeline V2 IR Repair Failed]:', repairErr);
    }
  }

  return { graph, xml, validation, repairAttempts };
}

export async function runV2Pipeline(
  userPrompt: string,
  modelId: string = GEMINI_FLASH_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<V2PipelineResult> {
  const startTime = Date.now();
  const effectiveModel = modelId || GEMINI_FLASH_MODEL_ID;
  const ai = aiClient || createGeminiClient();
  const repairModelId = getDistinctJudgeModel(effectiveModel);

  // 1. Generate Logical Graph JSON (uses unified client or clean deterministic fallback if offline)
  const logicalGraph = await generateLogicalGraph(userPrompt, effectiveModel, ai || undefined);

  // 2. Compute Deterministic Uniform-Tier Layout + Collision-Free Orthogonal Edge Waypoints
  const laidOutGraph = await computeElkLayout(logicalGraph);

  // 3. Render Draw.io XML (Light Theme, per-service official SVGs, zero inline JS)
  const renderedXml = renderGraphToDrawioXml(laidOutGraph);

  // 4. Pre-Render Validation
  const initialValidation = validateDrawioXml(renderedXml);

  // 5. Compact IR-level repair ONLY if hard validation errors exist (zero 180s raw-XML timeout loops)
  const repaired = await repairGraphIfInvalid(
    laidOutGraph,
    renderedXml,
    initialValidation,
    repairModelId,
    ai
  );

  const latencyMs = Date.now() - startTime;
  const telemetry: V2PipelineTelemetry = {
    modelId: effectiveModel,
    repairModelId,
    latencyMs,
    validationPassed: repaired.validation.valid,
    repairAttempts: repaired.repairAttempts,
    errorsCount: repaired.validation.errors.length,
    warningsCount: repaired.validation.warnings.length,
  };

  console.log('[Pipeline V2 Telemetry]:', telemetry);

  return {
    xml: repaired.xml,
    graph: repaired.graph,
    validationReport: repaired.validation,
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
  const effectiveModel = modelId || GEMINI_FLASH_MODEL_ID;
  const ai = aiClient || createGeminiClient();
  const repairModelId = getDistinctJudgeModel(effectiveModel);

  // 1. Edit Logical Graph JSON (layout coords automatically stripped inside editLogicalGraph)
  const updatedGraph = await editLogicalGraph(currentGraph, userChangePrompt, effectiveModel, ai || undefined);

  // 2. Re-layout deterministically
  const laidOutGraph = await computeElkLayout(updatedGraph);

  // 3. Render Draw.io XML
  const renderedXml = renderGraphToDrawioXml(laidOutGraph);

  // 4. Pre-Render Validation
  const initialValidation = validateDrawioXml(renderedXml);

  // 5. Compact IR-level repair ONLY if hard validation errors remain
  const repaired = await repairGraphIfInvalid(
    laidOutGraph,
    renderedXml,
    initialValidation,
    repairModelId,
    ai
  );

  const latencyMs = Date.now() - startTime;
  const telemetry: V2PipelineTelemetry = {
    modelId: effectiveModel,
    repairModelId,
    latencyMs,
    validationPassed: repaired.validation.valid,
    repairAttempts: repaired.repairAttempts,
    errorsCount: repaired.validation.errors.length,
    warningsCount: repaired.validation.warnings.length,
  };

  return {
    xml: repaired.xml,
    graph: repaired.graph,
    validationReport: repaired.validation,
    telemetry,
  };
}
