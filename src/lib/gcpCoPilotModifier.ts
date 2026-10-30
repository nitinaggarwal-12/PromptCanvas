/**
 * Architecture Co-Pilot Spatial Modification Engine
 * Applies structured Gemini modification specs (or clean in-place node deletion/addition)
 * onto Draw.io XML with zero hardcoded template hijacking or vendor rewrites.
 */
import { validateAndHealDrawioXml } from './xmlHealer';
import type { LiveGeminiCopilotModificationSpec } from './geminiArchitecturalDecisionEngine';

export interface GcpVersionSnapshot {
  id: string;
  versionTag: string;
  timestamp: string;
  author: string;
  actionSummary: string;
  canvasDiff: string;
  specDiff: string;
  xml: string;
}

export interface GcpChatSuggestion {
  label: string;
  actionPrompt: string;
  type?: 'add' | 'modify' | 'security' | 'cost' | 'observability';
}

export interface GcpChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionSummary?: {
    versionTag: string;
    canvasDiff: string;
    specDiff: string;
    persona?: string;
  };
  isQuestionAdvisory?: boolean;
  identifiedGaps?: string[];
  suggestions?: GcpChatSuggestion[];
}

function escapeXmlText(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatCleanCardTitle(rawPrompt: string, maxLen = 48): string {
  const stripped = rawPrompt
    .replace(/^[+⚡🛡️🔒📊🤖✉️]+\s*/, '')
    .replace(/^(add|insert|attach|upgrade|implement|enforce|integrate|configure|enable|deploy)\s+/i, '')
    .trim();
  if (stripped.length <= maxLen) return stripped;
  const sliced = stripped.slice(0, maxLen);
  const lastSpace = sliced.lastIndexOf(' ');
  return (lastSpace > 20 ? sliced.slice(0, lastSpace) : sliced).replace(/[&,+/-]+$/, '').trim();
}

export function executeGcpPromptModification(
  currentXml: string,
  promptText: string,
  currentVersionIndex: number | string = 1,
  archId: string = 'blank',
  isDark: boolean = false,
  explicitPersona?: string,
  liveGeminiSpec?: LiveGeminiCopilotModificationSpec | null
): {
  updatedXml: string;
  newVersion: GcpVersionSnapshot;
  assistantMessage: GcpChatMessage;
} {
  const cleanPrompt = (promptText || '').replace(/^\[.*?\]\s*/, '').replace(/^\+\s*/, '').trim();
  const numericIdx =
    typeof currentVersionIndex === 'number'
      ? currentVersionIndex
      : parseInt(String(currentVersionIndex).replace(/[^0-9]/g, ''), 10) || 1;
  const nextVersionTag = `v1.${numericIdx}`;
  const timestamp = new Date().toISOString();
  const detectedPersona = explicitPersona || 'Cloud Architect';

  let baseXml = currentXml && currentXml.includes('<mxGraphModel')
    ? currentXml
    : `<mxfile host="PromptCanvas"><diagram id="d1" name="Architecture"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" page="1" pageScale="1" pageWidth="1600" pageHeight="1000"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>`;

  // Genuine deletion when user asks to remove/delete a component
  const removeMatch = cleanPrompt.match(/^(?:remove|delete|drop)\s+(.+)$/i);
  if (removeMatch && !liveGeminiSpec?.titleText) {
    const targetTerm = removeMatch[1].trim().toLowerCase();
    const removedIds = new Set<string>();
    baseXml = baseXml.replace(
      /<mxCell\s+id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<\/mxCell>|<mxCell\s+id="([^"]+)"[^>]*vertex="1"[^>]*\/>/g,
      (cellBlock, id1, id2) => {
        const cid = id1 || id2;
        if (cid && cid !== '0' && cid !== '1' && cellBlock.toLowerCase().includes(targetTerm)) {
          removedIds.add(cid);
          return '';
        }
        return cellBlock;
      }
    );
    if (removedIds.size > 0) {
      baseXml = baseXml.replace(
        /<mxCell\s+[^>]*edge="1"[^>]*>[\s\S]*?<\/mxCell>|<mxCell\s+[^>]*edge="1"[^>]*\/>/g,
        (edgeBlock) => {
          for (const rid of removedIds) {
            if (edgeBlock.includes(`source="${rid}"`) || edgeBlock.includes(`target="${rid}"`)) {
              return '';
            }
          }
          return edgeBlock;
        }
      );
    }
    const healed = validateAndHealDrawioXml(baseXml, archId).xml;
    const canvasDiff = removedIds.size > 0
      ? `Removed ${removedIds.size} matching component(s) for "${removeMatch[1].trim()}".`
      : `No matching component found for "${removeMatch[1].trim()}".`;
    return {
      updatedXml: healed,
      newVersion: {
        id: `v_${Date.now()}`,
        versionTag: nextVersionTag,
        timestamp,
        author: detectedPersona,
        actionSummary: canvasDiff,
        canvasDiff,
        specDiff: canvasDiff,
        xml: healed,
      },
      assistantMessage: {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: canvasDiff,
        timestamp,
        actionSummary: { versionTag: nextVersionTag, canvasDiff, specDiff: canvasDiff, persona: detectedPersona },
      },
    };
  }

  // Compute non-overlapping placement coordinates from existing vertices
  const vertexGeomRegex = /<mxCell\s+id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<mxGeometry\s+([^/>]+)\/?>/g;
  let maxBottom = 160;
  let anchorId: string | null = null;
  let m: RegExpExecArray | null;
  while ((m = vertexGeomRegex.exec(baseXml)) !== null) {
    const id = m[1];
    if (!id || id === '0' || id === '1') continue;
    const g = m[2];
    const ym = g.match(/\by="(-?\d+(?:\.\d+)?)"/);
    const hm = g.match(/\bheight="(\d+(?:\.\d+)?)"/);
    const wm = g.match(/\bwidth="(\d+(?:\.\d+)?)"/);
    if (ym && hm) {
      const bottom = parseFloat(ym[1]) + parseFloat(hm[1]);
      if (bottom < 1800 && bottom > maxBottom) maxBottom = bottom;
      if (wm && parseFloat(wm[1]) >= 80 && parseFloat(wm[1]) <= 500) anchorId = id;
    }
  }

  const slotIndex = numericIdx;
  const x = 120 + ((slotIndex - 1) % 3) * 320;
  const y = maxBottom + 48;
  const w = 280;
  const h = 76;

  const customTitle = escapeXmlText(liveGeminiSpec?.titleText || formatCleanCardTitle(cleanPrompt, 48));
  const customDesc = escapeXmlText(liveGeminiSpec?.descText || cleanPrompt.slice(0, 90));
  const customEdge = escapeXmlText(liveGeminiSpec?.edgeLabel || 'Connected Flow');
  const stroke = liveGeminiSpec?.accentColor || '#2563EB';
  const fill = isDark ? '#1E293B' : liveGeminiSpec?.fillColor || '#EFF6FF';
  const textColor = isDark ? '#F8FAFC' : '#0F172A';

  const boxId = `copilot_mod_custom_box_${slotIndex}_${Date.now() % 10000}`;
  const edgeId = `copilot_mod_custom_edge_${slotIndex}_${Date.now() % 10000}`;
  const labelHtml = `<b>${customTitle}</b><br/><font style="font-size:10px;color:#475569">${customDesc}</font>`;

  let injected = `<mxCell id="${boxId}" value="${escapeXmlText(labelHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=2;fontColor=${textColor};fontSize=11;align=left;spacingLeft=12;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
  if (anchorId) {
    injected += `<mxCell id="${edgeId}" value="${customEdge}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${stroke};strokeWidth=1.8;fontSize=10;" edge="1" parent="1" source="${anchorId}" target="${boxId}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
  }

  let mutatedXml = baseXml.includes('</root>')
    ? baseXml.replace('</root>', `${injected}\n</root>`)
    : baseXml;
  const updatedXml = validateAndHealDrawioXml(mutatedXml, archId).xml;
  const canvasDiff = liveGeminiSpec?.canvasDiff || `Added "${customTitle}" (${nextVersionTag}).`;
  const specDiff = liveGeminiSpec?.specDiff || `Updated topology for "${cleanPrompt.slice(0, 72)}".`;

  return {
    updatedXml,
    newVersion: {
      id: `v_${Date.now()}`,
      versionTag: nextVersionTag,
      timestamp,
      author: detectedPersona,
      actionSummary: canvasDiff,
      canvasDiff,
      specDiff,
      xml: updatedXml,
    },
    assistantMessage: {
      id: `msg_${Date.now() + 1}`,
      sender: 'assistant',
      text: canvasDiff,
      timestamp,
      actionSummary: { versionTag: nextVersionTag, canvasDiff, specDiff, persona: detectedPersona },
    },
  };
}
