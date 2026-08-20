// Blueprint 61: Enterprise AI Document Assistant Platform
// Final identity adapter around the immutable review-approved diagram payload.
// The payload was first generated under a provisional number; this adapter guarantees
// Blueprint 61 identity without coupling to the independently-developed 51-60 series.
import { getApprovedEnterpriseAiDocumentAssistantBlueprintXml as getImmutablePayloadXml } from './approvedBlueprint61Payload';

export const BLUEPRINT_61_CANONICAL_ID = 'enterprise_ai_document_assistant';
export const BLUEPRINT_61_NUMBER = 61 as const;

function stampBlueprint61Identity(xml: string): string {
  const normalized = xml
    .replace(/PromptCanvas Blueprint 51/g, 'PromptCanvas Blueprint 61')
    .replace(/enterprise_ai_doc_assistant_51/g, 'enterprise_ai_doc_assistant_61')
    .replace(/Blueprint 51 - Enterprise AI Document Assistant/g, 'Blueprint 61 - Enterprise AI Document Assistant');

  if (/Blueprint 51|enterprise_ai_doc_assistant_51/.test(normalized)) {
    throw new Error('Blueprint 61 identity normalization failed: provisional Blueprint 51 marker remains.');
  }
  return normalized;
}

export function getApprovedEnterpriseAiDocumentAssistantBlueprintXml(): string {
  return stampBlueprint61Identity(getImmutablePayloadXml());
}
