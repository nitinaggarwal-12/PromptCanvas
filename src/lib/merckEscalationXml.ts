import fs from 'fs';
import path from 'path';

let cachedXml: string | null = null;

export function getMerckEscalationXml(): string {
  if (cachedXml) return cachedXml;
  try {
    const filePath = path.resolve(process.cwd(), 'scratch/merck_ge_escalation/merck_google_ge_escalation.drawio');
    if (fs.existsSync(filePath)) {
      cachedXml = fs.readFileSync(filePath, 'utf8');
      return cachedXml;
    }
  } catch (err) {
    console.warn('[merckEscalationXml] Error reading cached XML:', err);
  }
  // Fallback XML
  return `<mxfile host="embed.diagrams.net"><diagram id="merck_ge" name="Escalation"><mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>`;
}
