import { getDefaultXmlForArchitecture, getArchitectureTypeById } from './architectureTypes';
import { customizeDiagramTemplateWithGemini, CustomizationResult } from './geminiDiagramCustomizer';
import { injectUseCaseFlavor } from './diagramCleaner';
import { validateAndHealDrawioXml } from './xmlHealer';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from './preflightAuditEngine';
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
  const effectiveArchType = req.architectureType || 'conceptual_diagram';

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
  if (!baseTemplateXml) {
    baseTemplateXml = getDefaultXmlForArchitecture('conceptual_diagram', contextualPrompt, contextualPrompt);
  }

  // 2. Determine target XML to customize (existing version XML if refining same architecture, or base reference template)
  let targetXml = req.existingXml || baseTemplateXml;
  let existingPrompt = prompt;

  if (diagramId && !req.existingXml) {
    const latestVersion = await getLatestDiagramVersion(diagramId, effectiveArchType);
    if (latestVersion && latestVersion.xml_content && (latestVersion.architecture_type || 'conceptual_diagram') === effectiveArchType) {
      targetXml = latestVersion.xml_content;
      existingPrompt = latestVersion.prompt || prompt;
    } else {
      targetXml = baseTemplateXml;
    }
  }

  const cleanPrompt = (prompt || '').trim();
  const isTrivialPrompt = !cleanPrompt || 
    cleanPrompt.length < 5 || 
    /^nitin\s*\d*$/i.test(cleanPrompt) || 
    /^canvas\s*\d*$/i.test(cleanPrompt) || 
    /^default$/i.test(cleanPrompt) ||
    cleanPrompt === effectiveArchType ||
    cleanPrompt.startsWith('WBS') ||
    cleanPrompt.includes('Blueprint ID');

  let customResult: CustomizationResult;
  if (isTrivialPrompt) {
    customResult = {
      xml: baseTemplateXml || '',
      reasoning: `Master Reference Architecture Blueprint for ${effectiveArchType}.`,
      businessUsecase: `Canonical enterprise architecture model for ${effectiveArchType}.`,
      technicalUsecase: `Zero-collision calibrated widescreen 1400x800 2D layout.`
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
      console.warn('[Unified Diagram Engine Fallback] Gemini customizer failed, applying algorithmic injection:', err);
      const flavoredXml = injectUseCaseFlavor(targetXml || baseTemplateXml || '', prompt, prompt);
      const healed = preflightVerifyAndHealXmlAcrossAll6Audits(flavoredXml, effectiveArchType);
      customResult = {
        xml: healed,
        reasoning: `Tailored ${effectiveArchType} architecture for "${prompt}".`,
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
