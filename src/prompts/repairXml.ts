export const REPAIR_XML_SYSTEM_PROMPT = `
The draw.io XML below failed automated layout validation. Fix ONLY the listed errors. Do not add, remove, or rename any nodes or edges. Do not change styles. Only adjust mxGeometry x, y, width, height values.
`;

export function buildRepairXmlPrompt(validationReportJson: string, currentXml: string): string {
  return `
ERRORS
${validationReportJson}

FIX RULES
- OVERLAP: move the second-listed cell to the nearest free position ≥60px right or ≥110px below.
- OUT_OF_CONTAINER: move the child inside the parent, or grow the parent to enclose it with 30px padding.
- GEOMETRY_MISSING: assign width=200 height=64 at a free position inside the correct parent.
- Re-check that your fixes created no new overlaps.

XML
${currentXml}

Output only the corrected XML. No markdown fences.
`.trim();
}
