/**
 * Phase 3.2+ — high-confidence technical terminology corrections.
 *
 * Keep this intentionally conservative. Architecture-specific modernization belongs in
 * the relevant master builder; this layer only changes product names whose customer-
 * facing naming is unambiguous across the blueprint catalog.
 */
const HIGH_CONFIDENCE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cloud Source Repositories/gi, 'Secure Source Manager'],
  [/Cloud Source Repos/gi, 'Secure Source Manager'],
  [/Dataplex Universal Catalog/gi, 'Knowledge Catalog'],
  [/Dataplex Data Catalog/gi, 'Knowledge Catalog'],
  [/Cloud DLP/gi, 'Sensitive Data Protection'],
  [/Vertex AI Matching Engine/gi, 'Vertex AI Vector Search'],
  [/Anthos Service Mesh/gi, 'Cloud Service Mesh'],
  [/Cloud Functions/gi, 'Cloud Run functions'],
  [/Global L7 HTTPS Load Balancing/gi, 'Cloud Load Balancing'],
  [/Global HTTPS Load Balancer/gi, 'Cloud Load Balancing'],
  [/Global HTTP\(S\) Load Balancer/gi, 'Cloud Load Balancing'],
  [/Cloud Global Load Balancer/gi, 'Cloud Load Balancing'],
  [/Gemini 3\.7 Pro Vision/gi, 'Gemini multimodal model'],
  [/Gemini 3\.7 Flash\s*\/\s*Pro/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7 Flash/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7/gi, 'Gemini'],
];

export function applyBlueprintTechnicalAccuracy(xml: string): string {
  if (!xml || xml.includes('pc-technical-accuracy-3-2')) return xml;

  const next = HIGH_CONFIDENCE_REPLACEMENTS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    xml,
  );

  return next.replace(
    /(<mxGraphModel\b)/,
    '<!-- pc-technical-accuracy-3-2 -->\n$1',
  );
}
