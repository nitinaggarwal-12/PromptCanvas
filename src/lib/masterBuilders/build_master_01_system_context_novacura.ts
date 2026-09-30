/**
 * 🏛️ Master Blueprint: 01 — System Context Architecture
 * Delegates to the upgraded canonical C4 Level 1 System Context Blueprint (template01ExactV3).
 */

import { generateTemplate01ExactV3Xml } from '../canonical/template01ExactV3';

export function buildNovacuraSystemContextXml(): string {
  return generateTemplate01ExactV3Xml('biopharma', 'light');
}
