export const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash';

export type ModelTier = 'lite' | 'medium' | 'pro';

/**
 * 🧠 Smart 3-Tier Model Allocation Engine (Gemini 3+ Enforced)
 * - Lite: Fast, cost-efficient Gemini 3 model for simple repairs & basic diagrams
 * - Medium (Flash): Balanced Gemini 3 model for standard technical architectures & sequence flows
 * - Pro: High-reasoning Gemini 3 Pro model for complex multi-tier enterprise systems & stateful agent graphs
 */
export function getGeminiModel(tier: ModelTier = 'medium'): string {
  switch (tier) {
    case 'lite':
      return process.env.GEMINI_LITE_MODEL_ID || 'gemini-3.6-flash';
    case 'pro':
      return process.env.GEMINI_PRO_MODEL_ID || 'gemini-3.6-pro';
    case 'medium':
    default:
      return process.env.GEMINI_FLASH_MODEL_ID || 'gemini-3.6-flash';
  }
}

export function getGeminiModelForArchitecture(archId?: string): string {
  const PRO_ARCHITECTURES = [
    'agentic_rag',
    'unified_system_view',
    'tech_multi_agent_langgraph',
    'tech_rag_gcp',
    'tech_microservices_gcp',
    'tech_microservices_aws',
    'tech_multi_region_dr',
    'tech_agent_harness_runtime',
    'business_agent_gov_hitl',
    'business_agent_governance_hitl'
  ];

  const LITE_ARCHITECTURES = [
    'conceptual_diagram'
  ];

  if (archId && PRO_ARCHITECTURES.includes(archId)) {
    return getGeminiModel('pro');
  }

  if (archId && LITE_ARCHITECTURES.includes(archId)) {
    return getGeminiModel('lite');
  }

  return getGeminiModel('medium');
}

export type GenConfigKind = 'generate' | 'edit' | 'repair' | 'audit' | 'narrative';

export function getGenConfig(kind: GenConfigKind) {
  switch (kind) {
    case 'repair':
      return {
        thinkingConfig: {
          thinkingBudget: 100, // Minimal thinking budget for mechanical repair calls
        },
      };
    case 'generate':
    case 'edit':
    case 'audit':
    case 'narrative':
    default:
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Modest thinking budget for creative architectural generation calls
        },
      };
  }
}
