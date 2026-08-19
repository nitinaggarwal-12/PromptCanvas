/**
 * Phase 3.2 — high-confidence technical terminology corrections.
 *
 * Keep this intentionally conservative. Architecture-specific modernization belongs in
 * the relevant master builder; this layer only changes product names whose customer-
 * facing naming is unambiguous across the blueprint catalog.
 */
const HIGH_CONFIDENCE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cloud Source Repositories/g, 'Secure Source Manager'],
  [/Cloud Source Repos/g, 'Secure Source Manager'],
  [/Dataplex Universal Catalog/g, 'Knowledge Catalog'],
  [/Dataplex Data Catalog/g, 'Knowledge Catalog'],
  [/Cloud DLP/g, 'Sensitive Data Protection'],
  [/Vertex AI Matching Engine/g, 'Vertex AI Vector Search'],
  [/Anthos Service Mesh/g, 'Cloud Service Mesh'],
  [/Cloud Functions/g, 'Cloud Run functions'],
  [/Global HTTPS Load Balancer/g, 'Cloud Load Balancing'],
  [/Global HTTP\(S\) Load Balancer/g, 'Cloud Load Balancing'],
  [/Cloud Global Load Balancer/g, 'Cloud Load Balancing'],
  [/Gemini 3\.7 Pro Vision/g, 'Gemini multimodal model'],
  [/Gemini 3\.7 Flash\s*\/\s*Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Flash/g, 'Gemini (approved model)'],
  [/Gemini 3\.7/g, 'Gemini'],
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
