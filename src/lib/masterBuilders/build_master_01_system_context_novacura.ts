/**
 * 🏛️ Master Blueprint: System Context & Conceptual Architecture
 * Delegates to Canonical Blueprint #00 (Google Cloud & Gemini Enterprise Conceptual Architecture).
 */

import { generateTemplate00ConceptualXml } from '../canonical/template00GcpEnterpriseArch';

export function buildEnterpriseSystemContextXml(): string {
  return generateTemplate00ConceptualXml('GCP ENTERPRISE', 'light');
}
