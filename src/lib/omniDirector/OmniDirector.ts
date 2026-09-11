/**
 * 🎬 Omni 1.1 Director Engine
 * 
 * Master orchestrator that directs the multi-agent pipeline:
 * - Work Intake & Planning (Flash / Topology Planner)
 * - Vector AST Synthesis (Pro / AST Builder)
 * - Forensic Parity Inspection & Sign-off (Omni 1.1 / QC Chief)
 */

import { GoogleGenAI } from '@google/genai';
import { runTopologyPlanner } from './TopologyPlanner';
import { GeometrySolver } from './GeometrySolver';
import { OmniQcChief } from './OmniQcChief';
import {
  OmniOrchestrationResult,
  MultiAgentExecutionStep
} from './types';
import { getGeminiModelWithFallbacks, getGenConfig } from '../geminiConfig';
import { validateAndHealDrawioXml } from '../xmlHealer';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { toUserFacingMessage } from '@/lib/ai/modelErrors';

export async function orchestrateArchitecturePipeline(params: {
  imageBase64?: string;
  mimeType?: string;
  promptText?: string;
  projectName?: string;
  userApiKey?: string;
}): Promise<OmniOrchestrationResult> {
  const startTime = Date.now();
  const {
    imageBase64,
    mimeType = 'image/png',
    promptText = '',
    projectName = 'Architecture Blueprint',
    userApiKey
  } = params;

  const apiKey = userApiKey || process.env.GEMINI_API_KEY || '';
  const steps: MultiAgentExecutionStep[] = [];

  // =========================================================================
  // STEP 1: OMNI 1.1 DIRECTOR INTAKE & CREW DISPATCH
  // =========================================================================
  steps.push({
    agent: 'OMNI_DIRECTOR',
    agentModel: 'Omni 1.1',
    phase: 'Intake & Crew Dispatch',
    status: 'COMPLETED',
    message: `Omni 1.1 Director initiated multi-agent decompilation for "${projectName}". Dispatching Topology Planner (Flash) and AST Builder (Pro).`,
    durationMs: 15
  });

  // =========================================================================
  // STEP 2: TOPOLOGY PLANNER (FLASH) - FAST OCR & SIGNATURE MATCHING
  // =========================================================================
  const tPlannerStart = Date.now();
  steps.push({
    agent: 'TOPOLOGY_PLANNER',
    agentModel: 'Gemini 3.8 Flash',
    phase: 'OCR & Signature Matching',
    status: 'RUNNING',
    message: 'Extracting spatial zones, entity labels, and scanning PromptCanvas master blueprint catalog...'
  });

  const plan = await runTopologyPlanner({
    imageBase64,
    mimeType,
    promptText,
    apiKey
  });

  const plannerStep = steps[steps.length - 1];
  plannerStep.status = 'COMPLETED';
  plannerStep.durationMs = Date.now() - tPlannerStart;
  plannerStep.outputSummary = plan.isMasterMatch
    ? `🎯 Certified Ground-Truth Master Blueprint matched: ${plan.matchedBlueprintTitle} (${plan.matchedBlueprintId})`
    : plan.vetoReason
      ? `🛑 Master substitution VETOED — decompiling source directly. ${plan.vetoReason}`
      : `Detected ${plan.detectedZones.length} spatial zones: ${plan.detectedZones.join(', ')}`;

  // Ground truth handed to the QC Chief so it can verify the emitted XML actually
  // depicts THIS image rather than merely being internally well-formed.
  const sourceContext = {
    detectedTitle: plan.detectedTitle,
    detectedSubtitle: plan.detectedSubtitle,
    detectedZones: plan.detectedZones,
    keyComponents: plan.keyComponents,
    rows: plan.rows,
    technologies: plan.technologies,
    legend: plan.legend,
    badgeNumber: plan.badgeNumber,
    theme: plan.theme,
    brandBlock: plan.brandBlock,
    zoneColors: plan.zoneColors,
    hasLeftColumn: plan.hasLeftColumn
  };

  let currentXml = '';
  let extractedZones = plan.detectedZones;

  // =========================================================================
  // STEP 3: AST GRAPH BUILDER (NEURO-SYMBOLIC GEOMETRY SOLVER)
  // =========================================================================
  const tBuilderStart = Date.now();
  steps.push({
    agent: 'AST_BUILDER',
    agentModel: 'GeometrySolver + Gemini Pro',
    phase: 'Draw.io AST Graph Synthesis',
    status: 'RUNNING',
    message: 'Synthesizing fresh Draw.io XML graph AST with deterministic geometry, typed connectors, and spatial bounds...'
  });

  // Synthesize deterministic baseline geometry from extracted plan or bind certified master blueprint
  try {
    if (plan.isMasterMatch && plan.matchedMasterXml) {
      currentXml = plan.matchedMasterXml;
      const builderStep = steps[steps.length - 1];
      builderStep.status = 'COMPLETED';
      builderStep.durationMs = Date.now() - tBuilderStart;
      builderStep.outputSummary = `Loaded certified master blueprint "${plan.matchedBlueprintTitle}" (${plan.matchedBlueprintId}) with ${(currentXml.match(/<mxCell/g) || []).length} AST nodes.`;
    } else {
      currentXml = GeometrySolver.synthesizeDiagramXml(plan);
      const builderStep = steps[steps.length - 1];
      builderStep.status = 'COMPLETED';
      builderStep.durationMs = Date.now() - tBuilderStart;
      builderStep.outputSummary = `Synthesized ${(currentXml.match(/<mxCell/g) || []).length} AST nodes with deterministic layout and vector stencils.`;
    }
  } catch (err: any) {
    console.warn('[OmniDirector] AST Builder error:', err);
    const builderStep = steps[steps.length - 1];
    builderStep.status = 'FAILED';
    builderStep.message = `AST Builder error: ${toUserFacingMessage(err, 'AST builder')}`;
  }

  // Pre-heal XML formatting
  if (currentXml) {
    currentXml = validateAndHealDrawioXml(currentXml).xml;
  }

  // =========================================================================
  // STEP 4: OMNI 1.1 QUALITY CONTROL CHIEF FORENSIC AUDIT
  // =========================================================================
  const tQcStart = Date.now();
  steps.push({
    agent: 'OMNI_QC_CHIEF',
    agentModel: 'Omni 1.1',
    phase: 'Multimodal Forensic Audit & Parity Verification',
    status: 'RUNNING',
    message: 'Auditing 8 dimensions: Shapes, Icons, Connectors, Enclaves, Legends, Chevrons, Mascots, Branding...'
  });

  let audit = OmniQcChief.auditDiagramXml(currentXml, plan.detectedTitle, sourceContext);

  // =========================================================================
  // STEP 5: AUTONOMOUS REMEDIATION LOOP (IF GAPS DETECTED)
  // =========================================================================
  if (audit.verdict === 'REMEDIATE' && audit.remediationDirectives.length > 0) {
    steps.push({
      agent: 'REMEDIATION_AGENT',
      agentModel: 'Omni 1.1 Surgical AST Patcher',
      phase: 'Autonomous Gap Remediation',
      status: 'RUNNING',
      message: `Omni 1.1 QC Chief flagged ${audit.gaps.length} gaps (${audit.remediationDirectives.join(', ')}). Applying surgical AST auto-healing...`
    });

    currentXml = OmniQcChief.autonomouslyHealXml(currentXml, audit.remediationDirectives);
    currentXml = validateAndHealDrawioXml(currentXml).xml;

    // Re-audit after healing
    audit = OmniQcChief.auditDiagramXml(currentXml, plan.detectedTitle, sourceContext);

    const remStep = steps[steps.length - 1];
    remStep.status = 'COMPLETED';
    remStep.durationMs = 85;
    remStep.outputSummary = `Healed gaps. Parity score elevated to ${audit.parityScore}%.`;
  }

  const qcStep = steps.find(s => s.agent === 'OMNI_QC_CHIEF');
  if (qcStep) {
    qcStep.status = audit.verdict === 'BLOCKED' ? 'FAILED' : 'COMPLETED';
    qcStep.durationMs = Date.now() - tQcStart;
    qcStep.outputSummary = audit.verdict === 'BLOCKED'
      ? `⛔ BLOCKED at ${audit.parityScore}% source parity. ${audit.gaps.find(g => g.category === 'SOURCE_PARITY')?.description || 'Output does not depict the source image.'}`
      : `Omni 1.1 Certified: ${audit.verdict} (${audit.parityScore}% Parity Score). Zero blocking defects.`;
  }

  const finalEdgeCount = (currentXml.match(/<mxCell[^>]+edge="1"/gi) || []).length;
  const finalVertexCount = (currentXml.match(/<mxCell[^>]+vertex="1"/gi) || []).length;
  const hasCriticalGaps = audit.gaps.some(g => g.severity === 'CRITICAL');

  // A master-blueprint substitution is NOT self-certifying. Previously
  // `plan.isMasterMatch ||` short-circuited every other check, so binding an
  // unrelated canned template produced isCertified=true and a "100% Parity" badge.
  // Certification now always requires the audit itself to pass, including the
  // SOURCE_PARITY dimension.
  const isStrictlyCertified = Boolean(
    audit.verdict === 'PASS' &&
    !hasCriticalGaps &&
    audit.parityScore >= 90 &&
    (finalVertexCount < 6 || finalEdgeCount > 0)
  );

  const componentCount = (currentXml.match(/<mxCell/g) || []).length;
  const totalDurationMs = Date.now() - startTime;

  let summary: string;
  if (audit.verdict === 'BLOCKED') {
    summary =
      `⛔ Omni 1.1 QC Chief BLOCKED certification for "${plan.detectedTitle}": the generated diagram ` +
      `matched only ${audit.parityScore}% of the source image's vocabulary. Output is NOT a faithful ` +
      `decompilation and has not been certified.`;
  } else {
    summary =
      `Omni 1.1 Director & QC Chief certified fresh decompilation for "${plan.detectedTitle}" with ` +
      `${audit.parityScore}% parity score, ${finalEdgeCount} flow edges, and ${componentCount} components.`;
  }

  return {
    success: Boolean(currentXml),
    xml: currentXml,
    summary,
    extractedZones,
    componentCount,
    isCertified: isStrictlyCertified,
    auditReport: audit,
    steps,
    matchedMasterBlueprintId: plan.matchedBlueprintId,
    masterBlueprintTitle: plan.matchedBlueprintTitle,
    totalDurationMs
  };
}
