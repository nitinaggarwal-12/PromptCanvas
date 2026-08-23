import { generateTemplate04ValueStreamXml } from "../canonical/template04ValueStream";

/**
 * Enterprise Value Stream Map (VSM) Builder
 * Delegates to canonical Template 04 matching 100% of images/04.png
 */
export function buildValueStreamMapXml(): string {
  return generateTemplate04ValueStreamXml("biopharma", "light");
}
