import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';
import { findInvalidNumericDrawioColors } from '../src/lib/blueprintTechnicalAccuracy';

type Expected = {
  id: string;
  cellId: string;
  y: number;
  width: number;
  height: number;
};

const EXPECTED: Expected[] = [
  { id: 'tech_ai_trism_guardrails', cellId: 'ops', y: 680, width: 1710, height: 255 },
  { id: 'tech_llm_capacity_quota', cellId: 'patterns', y: 660, width: 1710, height: 260 },
  { id: 'tech_supply_chain', cellId: 'ops', y: 675, width: 1700, height: 235 },
];

function attr(source: string, name: string): string {
  return source.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] || '';
}

function getCell(xml: string, cellId: string): { style: string; geometry: string } | null {
  const match = xml.match(new RegExp(`<mxCell\\b([^>]*\\bid="${cellId}"[^>]*)>([\\s\\S]*?)<\\/mxCell>`, 'i'));
  if (!match) return null;
  const geometry = match[2].match(/<mxGeometry\b([^>]*)\/?\s*>/i)?.[1] || '';
  return { style: attr(match[1], 'style'), geometry };
}

const failures: string[] = [];

for (const target of EXPECTED) {
  const xml = getDefaultXmlForArchitecture(target.id);
  if (!xml) {
    failures.push(`${target.id}: no XML resolved`);
    continue;
  }

  const badColors = findInvalidNumericDrawioColors(xml);
  if (badColors.length) {
    failures.push(`${target.id}: invalid numeric Draw.io colors remain: ${badColors.join(', ')}`);
  }

  const cell = getCell(xml, target.cellId);
  if (!cell) {
    failures.push(`${target.id}: expected cell ${target.cellId} missing`);
    continue;
  }

  const y = Number(attr(cell.geometry, 'y'));
  const width = Number(attr(cell.geometry, 'width'));
  const height = Number(attr(cell.geometry, 'height'));
  if (y !== target.y || width !== target.width || height !== target.height) {
    failures.push(
      `${target.id}/${target.cellId}: geometry ${width}x${height} @ y=${y}; expected ${target.width}x${target.height} @ y=${target.y}`,
    );
  }

  console.log(`PASS ${target.id}: ${target.cellId} ${width}x${height} @ y=${y}`);
}

if (failures.length) {
  console.error('\nBlueprint render-safety gate failed:');
  failures.forEach((failure) => console.error(` - ${failure}`));
  process.exit(1);
}

console.log('\nBlueprint render-safety gate passed for #22, #33 and #39.');
