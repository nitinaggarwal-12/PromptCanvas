import { getDefaultXmlForArchitecture, getArchitectureTypeById } from './architectureTypes';
import { customizeDiagramTemplateWithGemini, CustomizationResult } from './geminiDiagramCustomizer';
import { injectUseCaseFlavor } from './diagramCleaner';
import { validateAndHealDrawioXml } from './xmlHealer';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from './preflightAuditEngine';
import { applyBlueprintVisualSystem } from './blueprintVisualSystem';
import { createDiagram, saveDiagramVersion, getLatestDiagramVersion, updateDiagramArchitectureType } from './db';

export interface UnifiedDiagramRequest {
  prompt: string;
  diagramId?: string;
  architectureType?: string;
  name?: string;
  isPrivate?: boolean;
  userId?: string | null;
  existingXml?: string;
  phaseName?: string;
  domain?: string;
  abstractionLevel?: string;
  stackLayer?: string;
  layoutDirection?: string;
  salesStage?: string;
  lifecyclePhase?: string;
}

export interface UnifiedDiagramResponse {
  success: boolean;
  diagram?: any;
  version?: any;
  xml: string;
  architectureType: string;
  reasoning: string;
  businessUsecase: string;
  technicalUsecase: string;
}

/**
 * 🏛️ SINGLE UNIFIED DIAGRAM ENGINE (ONE CONSOLIDATED PATH FOR ALL ACTIONS)
 * Handles:
 * 1. New Diagram Creation
 * 2. Blueprint Tab Switching
 * 3. Chat / Iterative Version Refinement (V1 -> V2 -> V3 -> V4 -> V5...)
 * 4. Force Fresh Rebuild
 */
export async function executeUnifiedDiagramPipeline(
  req: UnifiedDiagramRequest
): Promise<UnifiedDiagramResponse> {
  const { prompt, diagramId, name, isPrivate, userId } = req;
  let effectiveArchType = req.architectureType || 'conceptual_diagram';

  const cleanPrompt = (prompt || '').trim();
  const isTrivialPrompt = !cleanPrompt || 
    cleanPrompt.length < 5 || 
    /^nitin\s*\d*$/i.test(cleanPrompt) || 
    /^canvas\s*\d*$/i.test(cleanPrompt) || 
    /^default$/i.test(cleanPrompt) ||
    cleanPrompt === effectiveArchType ||
    cleanPrompt.startsWith('WBS') ||
    cleanPrompt.includes('Blueprint ID');

  // If user started with a blank canvas or unseeded arch, but provided a real prompt, synthesize full architecture!
  const isBlankCanvasType = effectiveArchType === 'blank_canvas' || effectiveArchType === 'arch_blank_canvas';
  if (isBlankCanvasType && !isTrivialPrompt) {
    const promptLower = cleanPrompt.toLowerCase();
    if (/rag|vector|retriev|agent|llm|generative|prompt|model|embedding|grounding|sales intelligence/i.test(promptLower)) {
      effectiveArchType = 'agentic_rag';
    } else if (/event|kafka|pubsub|queue|microservice|async|eda/i.test(promptLower)) {
      effectiveArchType = 'enterprise_event_driven';
    } else if (/data|etl|lakehouse|warehouse|pipeline|bigquery|snowflake|analytics/i.test(promptLower)) {
      effectiveArchType = 'modern_data_stack';
    } else if (/security|zero trust|vpc|perimeter|firewall|waf|iam|identity/i.test(promptLower)) {
      effectiveArchType = 'secure_deployment_map';
    } else if (/cloud|aws|gcp|azure|landing zone|subnet/i.test(promptLower)) {
      effectiveArchType = 'gcp_landing_zone_vpc';
    } else {
      effectiveArchType = 'conceptual_diagram';
    }
  }

  const classificationTag = [
    req.phaseName ? `Phase: ${req.phaseName}` : '',
    req.domain ? `Domain: ${req.domain}` : '',
    req.abstractionLevel ? `Level: ${req.abstractionLevel}` : '',
    req.stackLayer ? `Layer: ${req.stackLayer}` : '',
    req.layoutDirection ? `Direction: ${req.layoutDirection}` : '',
    req.salesStage ? `Sales Stage: ${req.salesStage}` : '',
    req.lifecyclePhase ? `Lifecycle: ${req.lifecyclePhase}` : ''
  ].filter(Boolean).join(' | ');

  const contextualPrompt = classificationTag ? `[${classificationTag}]\n${prompt}` : prompt;

  // 1. Resolve pristine 1400x800 base reference template
  let baseTemplateXml = getDefaultXmlForArchitecture(effectiveArchType, contextualPrompt, contextualPrompt);
  const isBaseBlank = !baseTemplateXml || baseTemplateXml.includes('<root><mxCell id="0"/><mxCell id="1" parent="0"/></root>');
  if (isBaseBlank && !isTrivialPrompt) {
    baseTemplateXml = getDefaultXmlForArchitecture('conceptual_diagram', contextualPrompt, contextualPrompt);
  }

  // 2. Determine target XML to customize (existing version XML if refining same architecture, or base reference template)
  let targetXml = req.existingXml || baseTemplateXml;
  let existingPrompt = prompt;

  if (diagramId && !req.existingXml) {
    const latestVersion = await getLatestDiagramVersion(diagramId, effectiveArchType);
    const isExistingXmlBlank = !latestVersion?.xml_content || 
      latestVersion.xml_content.includes('<root><mxCell id="0"/><mxCell id="1" parent="0"/></root>') ||
      !latestVersion.xml_content.includes('vertex="1"');

    if (latestVersion && latestVersion.xml_content && !isExistingXmlBlank) {
      targetXml = latestVersion.xml_content;
      existingPrompt = latestVersion.prompt || prompt;
      if (!req.architectureType && latestVersion.architecture_type) {
        effectiveArchType = latestVersion.architecture_type;
      }
    } else {
      targetXml = baseTemplateXml;
    }
  }

  const isAestheticPrompt = /^(?:make it (?:look )?(?:beautiful|clean|better|nice|modern|pretty|gorgeous|good|clear|sharp|crisp)|beautify|clean up|polish|improve styling|style it|fix layout|clean|prettier|crisp)[!.\s]*$/i.test(cleanPrompt);

  let customResult: CustomizationResult;
  if (isTrivialPrompt) {
    customResult = {
      xml: baseTemplateXml || '',
      reasoning: `Master Reference Architecture Blueprint for ${effectiveArchType}.`,
      businessUsecase: `Canonical enterprise architecture model for ${effectiveArchType}.`,
      technicalUsecase: `Zero-collision calibrated widescreen 1400x800 2D layout.`
    };
  } else if (isAestheticPrompt) {
    const polished = applyBlueprintVisualSystem(targetXml || baseTemplateXml || '', effectiveArchType);
    customResult = {
      xml: polished,
      reasoning: `Applied boardroom-grade visual styling, typography scaling, and high-contrast styling.`,
      businessUsecase: `Preserved all domain architecture entities with enhanced executive presentation aesthetics.`,
      technicalUsecase: `Zero-distortion 2D bounding box layout with calibrated contrast and stroke hierarchy.`
    };
  } else {
    // 3. Prompt Gemini with Structured AST Schema to customize domain entities & text
    const compositePrompt = diagramId && prompt !== existingPrompt 
      ? `Target Domain: ${existingPrompt} | Specific Refinement Request: ${prompt}` 
      : prompt;

    console.log(`[Unified Diagram Engine] Processing ${effectiveArchType} for prompt: "${compositePrompt.slice(0, 60)}"...`);

    try {
      customResult = await customizeDiagramTemplateWithGemini(targetXml || baseTemplateXml || '', compositePrompt, effectiveArchType);
    } catch (err) {
      console.warn('[Unified Diagram Engine Fallback] Gemini customizer failed, applying visual polish:', err);
      const fallbackXml = targetXml || baseTemplateXml || '';
      const safeXml = diagramId ? fallbackXml : injectUseCaseFlavor(fallbackXml, prompt, prompt);
      const healed = preflightVerifyAndHealXmlAcrossAll6Audits(safeXml, effectiveArchType);
      customResult = {
        xml: healed,
        reasoning: `Preserved and refined ${effectiveArchType} architecture for "${prompt}".`,
        businessUsecase: `Consolidated enterprise architecture model for ${effectiveArchType}.`,
        technicalUsecase: `Zero-collision 2D layout with domain entity alignment.`
      };
    }
  }

  // 4. Validate & Heal AST
  const validated = validateAndHealDrawioXml(customResult.xml, effectiveArchType);
  const finalXml = validated.xml;

  // 5. Persist to Database
  let diagramRecord = null;
  let versionRecord = null;

  if (diagramId) {
    await updateDiagramArchitectureType(diagramId, effectiveArchType);
    const comment = `${getArchitectureTypeById(effectiveArchType)?.name || effectiveArchType} (Tailored for: ${prompt.slice(0, 40)}...)`;
    versionRecord = await saveDiagramVersion(
      diagramId,
      finalXml,
      comment,
      'AI',
      prompt,
      customResult.reasoning,
      customResult.businessUsecase,
      customResult.technicalUsecase,
      effectiveArchType
    );
  } else {
    const diagramName = name || (prompt.length > 45 ? `${prompt.slice(0, 40)}...` : prompt);
    const comment = `Initial ${getArchitectureTypeById(effectiveArchType)?.name || effectiveArchType}`;
    const result = await createDiagram(
      diagramName,
      finalXml,
      comment,
      prompt,
      customResult.reasoning,
      customResult.businessUsecase,
      customResult.technicalUsecase,
      userId || null,
      effectiveArchType,
      Boolean(isPrivate)
    );
    diagramRecord = result.diagram;
    versionRecord = result.version;
  }

  return {
    success: true,
    diagram: diagramRecord,
    version: versionRecord,
    xml: finalXml,
    architectureType: effectiveArchType,
    reasoning: customResult.reasoning,
    businessUsecase: customResult.businessUsecase,
    technicalUsecase: customResult.technicalUsecase
  };
}
