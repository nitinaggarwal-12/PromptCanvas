/**
 * Draw.io XML to 100% Native Editable Word (.docx) & Google Docs Specification Compiler
 * Generates a rich .docx document that can be opened in Google Docs (via docs.google.com/viewer
 * or Google Drive "Open with Google Docs") or Microsoft Word where:
 *  1. Section 1.1 provides a 100% Native Editable Visual Architecture Diagram Canvas built from
 *     WordprocessingML vector cards, enclave containers, color-coded borders, and connector arrows (━━▶)
 *     so every single diagram box, node title, attribute, and flow is directly editable inside Google Docs.
 *  2. An interactive 1-Click Live Draw.io Web Editor Action Bar (ExternalHyperlink) lets the user open
 *     the exact .drawio XML file directly inside Draw.io (app.diagrams.net) in a separate browser tab.
 *  3. Section 1.2 embeds the High-Resolution Visual Architecture Reference Graphic.
 *  4. Sections 2 & 3 provide 100% full-width (9360 DXA) editable Component Inventory & Integration Tables.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  ImageRun,
  ExternalHyperlink,
} from 'docx';
import { parseDrawioXmlForPptx, ParsedMxCell } from './editablePptxCompiler';
import { exportDiagramPng } from './diagramRaster';

function stripHtmlForDocx(html: string): { title: string; details: string } {
  if (!html) return { title: '', details: '' };
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  const noSvg = decoded.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  const lines = noSvg
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  return {
    title: lines[0] || '',
    details: lines.slice(1).join(' • ') || 'Enterprise Cloud Node',
  };
}

function cleanHexColor(colorStr: string | undefined, fallback: string = '0284C7'): string {
  if (!colorStr || colorStr === 'none' || colorStr === 'transparent') return fallback;
  let clean = colorStr.replace('#', '').trim().toUpperCase();
  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  if (/^[0-9A-F]{6}$/.test(clean)) {
    return clean;
  }
  return fallback;
}

function getLightTintHex(strokeHex: string): string {
  const hex = cleanHexColor(strokeHex, '0284C7');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Classify dominant hue to pick an executive high-contrast pastel card fill
  if (b > r + 30 && b > g) return 'EFF6FF'; // Royal / Azure Blue tint
  if (g > r + 20 && b > r + 20) return 'F0F9FF'; // Cyan / Sky tint
  if (g > r + 20 && g > b) return 'F0FDF4'; // Emerald / Green tint
  if (r > b + 40 && g > b + 20) return 'FFFBEB'; // Amber / Gold / Orange tint
  if (r > g + 30 && b > g + 20) return 'FAF5FF'; // Purple / Violet tint
  if (r > g + 40 && r > b + 40) return 'FEF2F2'; // Red / Rose tint
  return 'F8FAFC'; // Clean Slate tint
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array | null {
  try {
    const base64Index = dataUrl.indexOf(';base64,');
    if (base64Index === -1) return null;
    const base64 = dataUrl.substring(base64Index + 8);
    if (typeof Buffer !== 'undefined') {
      return new Uint8Array(Buffer.from(base64, 'base64'));
    }
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    }
    return null;
  } catch (e) {
    console.warn('Failed to convert image dataUrl for docx:', e);
    return null;
  }
}

async function resolveMasterImageBytes(
  masterImageSrc?: string,
  blueprintId?: string,
  xmlContent?: string
): Promise<Uint8Array | null> {
  // First try to rasterize the live Draw.io XML if in browser environment
  if (xmlContent && typeof window !== 'undefined') {
    try {
      const pngDataUrl = await exportDiagramPng(xmlContent, { scale: 2, transparent: false });
      if (pngDataUrl) {
        const bytes = dataUrlToUint8Array(pngDataUrl);
        if (bytes) return bytes;
      }
    } catch {
      // fallback to masterImageSrc below
    }
  }

  let targetSrc = masterImageSrc || null;
  const idLower = (blueprintId || '').toLowerCase();
  if (!targetSrc || targetSrc.includes('azure-landing-zone.png')) {
    if (idLower.includes('9745') || idLower.includes('5965') || idLower.includes('azure')) {
      targetSrc = '/blueprints/azure_application_landing_zone.png';
    }
  }

  if (targetSrc) {
    if (targetSrc.startsWith('data:image/')) {
      const bytes = dataUrlToUint8Array(targetSrc);
      if (bytes) return bytes;
    } else if (typeof window !== 'undefined') {
      try {
        const res = await fetch(targetSrc);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          return new Uint8Array(buf);
        }
      } catch {
        // fallback below
      }
    } else if (typeof Buffer !== 'undefined') {
      try {
        const nodeDynamicImport = new Function('m', 'return import(m)');
        const fs = await nodeDynamicImport('fs');
        const path = await nodeDynamicImport('path');
        const cleanRel = targetSrc.replace(/^\//, '');
        const fullPath = path.join(process.cwd(), 'public', cleanRel);
        if (fs.existsSync(fullPath)) {
          return new Uint8Array(fs.readFileSync(fullPath));
        }
      } catch {
        // fallback below
      }
    }
  }

  return null;
}

/**
 * Builds Section 1.1: 100% Native Editable Draw.io Architecture Diagram Canvas
 * Converts Draw.io XML enclaves, nodes, and edges into styled WordprocessingML Vector Cards & Enclave Grids
 * so every single box, node title, subtitle, and connector arrow is directly editable inside Google Docs.
 */
function buildNativeEditableDrawioCanvasForDocx(
  vertices: ParsedMxCell[],
  edges: ParsedMxCell[],
  overrides: Record<string, { title: string; subtitle: string }>,
  cellTitleMap: Map<string, string>
): any[] {
  const elements: any[] = [];

  // Map outgoing and incoming connectors per vertex ID
  const outgoingMap = new Map<string, { label: string; targetTitle: string }[]>();
  const incomingMap = new Map<string, { label: string; sourceTitle: string }[]>();

  edges.forEach((e) => {
    const rawLabel = stripHtmlForDocx(e.value).title;
    const label = rawLabel || 'Architecture Flow';
    const srcTitle = (e.source && cellTitleMap.get(e.source)) || '';
    const tgtTitle = (e.target && cellTitleMap.get(e.target)) || '';

    if (e.source && tgtTitle) {
      const list = outgoingMap.get(e.source) || [];
      if (list.length < 3) {
        list.push({ label, targetTitle: tgtTitle });
        outgoingMap.set(e.source, list);
      }
    }
    if (e.target && srcTitle) {
      const list = incomingMap.get(e.target) || [];
      if (list.length < 2) {
        list.push({ label, sourceTitle: srcTitle });
        incomingMap.set(e.target, list);
      }
    }
  });

  // Identify Enclave Containers vs Service Nodes
  const containers: ParsedMxCell[] = [];
  const serviceNodes: ParsedMxCell[] = [];

  vertices.forEach((v) => {
    const isContainer =
      v.style.container === '1' ||
      v.style.swimlane === '1' ||
      v.width * v.height >= 55000;
    if (isContainer) {
      containers.push(v);
    } else {
      serviceNodes.push(v);
    }
  });

  // Sort containers top-to-bottom, left-to-right
  containers.sort((a, b) => (Math.abs(a.y - b.y) > 40 ? a.y - b.y : a.x - b.x));

  // Assign each service node to its best enclosing container (smallest enclosing area)
  const containerChildren = new Map<string, ParsedMxCell[]>();
  containers.forEach((c) => containerChildren.set(c.id, []));
  const unassignedNodes: ParsedMxCell[] = [];

  serviceNodes.forEach((node) => {
    let bestContainer: ParsedMxCell | null = null;
    let bestArea = Infinity;

    // Direct parent check first
    const directParent = containers.find((c) => c.id === node.parent);
    if (directParent) {
      bestContainer = directParent;
    } else {
      const cx = node.x + node.width / 2;
      const cy = node.y + node.height / 2;
      for (const c of containers) {
        if (
          cx >= c.x - 15 &&
          cx <= c.x + c.width + 15 &&
          cy >= c.y - 15 &&
          cy <= c.y + c.height + 15
        ) {
          const area = c.width * c.height;
          if (area < bestArea) {
            bestArea = area;
            bestContainer = c;
          }
        }
      }
    }

    if (bestContainer) {
      const arr = containerChildren.get(bestContainer.id) || [];
      arr.push(node);
      containerChildren.set(bestContainer.id, arr);
    } else {
      unassignedNodes.push(node);
    }
  });

  // Build Enclave Groups to render
  interface EnclaveGroup {
    id: string;
    title: string;
    subtitle: string;
    strokeHex: string;
    tintHex: string;
    nodes: ParsedMxCell[];
  }

  const groups: EnclaveGroup[] = [];

  containers.forEach((c) => {
    const children = containerChildren.get(c.id) || [];
    const ov = overrides[c.id];
    const raw = stripHtmlForDocx(c.value);
    const title = ov?.title || raw.title || 'Architecture Enclave';
    const subtitle = ov?.subtitle || raw.details || 'Logical Cloud Boundary & Security Zone';
    const strokeHex = cleanHexColor(c.style.strokeColor || c.style.fillColor, '0284C7');
    const tintHex = getLightTintHex(strokeHex);

    // Sort children spatially: row bands of 80px, then x
    children.sort((a, b) => {
      const rowA = Math.floor(a.y / 80);
      const rowB = Math.floor(b.y / 80);
      if (rowA !== rowB) return rowA - rowB;
      return a.x - b.x;
    });

    groups.push({
      id: c.id,
      title,
      subtitle,
      strokeHex,
      tintHex,
      nodes: children,
    });
  });

  if (unassignedNodes.length > 0) {
    unassignedNodes.sort((a, b) => {
      const rowA = Math.floor(a.y / 90);
      const rowB = Math.floor(b.y / 90);
      if (rowA !== rowB) return rowA - rowB;
      return a.x - b.x;
    });
    groups.push({
      id: 'core-topology-tier',
      title: 'Core Architecture Services & Endpoints',
      subtitle: 'Primary Cloud Topology & Edge Integration Tier',
      strokeHex: '2563EB',
      tintHex: 'EFF6FF',
      nodes: unassignedNodes,
    });
  }

  let globalNodeCounter = 1;

  groups.forEach((group, groupIdx) => {
    // If an enclave has 0 child nodes, treat the enclave itself as an editable card node
    const nodesToRender =
      group.nodes.length > 0
        ? group.nodes
        : [
            {
              id: group.id,
              value: group.title,
              style: { strokeColor: group.strokeHex, fillColor: group.tintHex },
              vertex: true,
              edge: false,
              parent: '1',
              x: 0,
              y: 0,
              absX: 0,
              absY: 0,
              width: 200,
              height: 80,
              depth: 1,
              waypoints: [],
              extractedSvgs: [],
            } as ParsedMxCell,
          ];

    const tableRows: TableRow[] = [];

    // Row 1: Enclave Container Header Bar (Full Width 9360 DXA across 3 columns)
    tableRows.push(
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            width: { size: 9360, type: WidthType.DXA },
            columnSpan: 3,
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            shading: { fill: '0F172A' },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 12, color: group.strokeHex },
              left: { style: BorderStyle.SINGLE, size: 24, color: group.strokeHex },
              bottom: { style: BorderStyle.SINGLE, size: 12, color: group.strokeHex },
              right: { style: BorderStyle.SINGLE, size: 12, color: group.strokeHex },
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `🏛️ ENCLAVE ZONE ${groupIdx + 1}: ${group.title.toUpperCase()}`,
                    bold: true,
                    size: 20,
                    color: '38BDF8',
                    font: 'Arial',
                  }),
                  new TextRun({
                    text: `   |   ${group.subtitle} (${nodesToRender.length} Editable Vector Nodes)`,
                    size: 17,
                    color: 'E2E8F0',
                    font: 'Arial',
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

    // Chunk nodes into rows of 3 vector cards across (3120 DXA x 3 = 9360 DXA)
    const COLS = 3;
    const COL_WIDTH = 3120;

    for (let i = 0; i < nodesToRender.length; i += COLS) {
      const chunk = nodesToRender.slice(i, i + COLS);
      const rowCells: TableCell[] = [];

      for (let cIdx = 0; cIdx < COLS; cIdx++) {
        const node = chunk[cIdx];
        if (!node) {
          // Empty spacer vector cell to maintain strict 9360 DXA grid alignment
          rowCells.push(
            new TableCell({
              width: { size: COL_WIDTH, type: WidthType.DXA },
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              shading: { fill: 'F8FAFC' },
              borders: {
                top: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
                bottom: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
                left: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
                right: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '[ + Click to Add Custom Architecture Node ]',
                      size: 16,
                      color: '94A3B8',
                      italics: true,
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            })
          );
          continue;
        }

        const ov = overrides[node.id];
        const raw = stripHtmlForDocx(node.value);
        const nodeTitle = ov?.title || raw.title || 'Architecture Component';
        const nodeDetails = ov?.subtitle || raw.details || 'Cloud Service Node';
        const nodeStroke = cleanHexColor(
          node.style.strokeColor || node.style.fillColor || group.strokeHex,
          group.strokeHex
        );
        const nodeFill = getLightTintHex(nodeStroke);
        const objBadge = `NODE-${String(globalNodeCounter++).padStart(2, '0')}`;

        const cardParagraphs: Paragraph[] = [
          // Top Badge Line
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `▣ ${objBadge}`,
                bold: true,
                size: 16,
                color: nodeStroke,
                font: 'Arial',
              }),
              new TextRun({
                text: `  •  Editable Vector Box`,
                size: 15,
                color: '64748B',
                font: 'Arial',
              }),
            ],
          }),
          // Node Title (Bold, Editable)
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: nodeTitle,
                bold: true,
                size: 20,
                color: '0F172A',
                font: 'Arial',
              }),
            ],
          }),
          // Node Subtitle / Specs (Editable)
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: nodeDetails,
                size: 17,
                color: '334155',
                font: 'Arial',
              }),
            ],
          }),
        ];

        // Append Outgoing Connectors (━━▶)
        const outs = outgoingMap.get(node.id) || [];
        outs.forEach((flow) => {
          cardParagraphs.push(
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({
                  text: `━━▶ [${flow.label}] ━━▶ `,
                  bold: true,
                  size: 15,
                  color: '0284C7',
                  font: 'Arial',
                }),
                new TextRun({
                  text: flow.targetTitle,
                  bold: true,
                  size: 15,
                  color: '0F172A',
                  font: 'Arial',
                }),
              ],
            })
          );
        });

        // Append Incoming Connectors if no outgoing (or up to 1 incoming)
        const ins = incomingMap.get(node.id) || [];
        if (outs.length === 0 && ins.length > 0) {
          ins.forEach((flow) => {
            cardParagraphs.push(
              new Paragraph({
                spacing: { after: 30 },
                children: [
                  new TextRun({
                    text: `◀━━ [${flow.label}] ◀━━ `,
                    bold: true,
                    size: 15,
                    color: '4F46E5',
                    font: 'Arial',
                  }),
                  new TextRun({
                    text: flow.sourceTitle,
                    bold: true,
                    size: 15,
                    color: '0F172A',
                    font: 'Arial',
                  }),
                ],
              })
            );
          });
        }

        rowCells.push(
          new TableCell({
            width: { size: COL_WIDTH, type: WidthType.DXA },
            margins: { top: 120, bottom: 120, left: 140, right: 140 },
            shading: { fill: nodeFill },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 24, color: nodeStroke }, // Thick 3pt Draw.io left accent border
              top: { style: BorderStyle.SINGLE, size: 8, color: nodeStroke },
              right: { style: BorderStyle.SINGLE, size: 8, color: nodeStroke },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: nodeStroke },
            },
            children: cardParagraphs,
          })
        );
      }

      tableRows.push(new TableRow({ children: rowCells }));
    }

    elements.push(
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3120, 3120, 3120],
        rows: tableRows,
      })
    );

    // Inter-enclave visual flow connector between enclave tables
    if (groupIdx < groups.length - 1) {
      elements.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: '⬇  ━━━  [ Inter-Enclave Architecture Flow • HTTPS / VNet Peering / Private Link ]  ━━━  ⬇',
              bold: true,
              size: 18,
              color: '0284C7',
              font: 'Arial',
            }),
          ],
        })
      );
    } else {
      elements.push(new Paragraph({ spacing: { after: 240 }, children: [] }));
    }
  });

  return elements;
}

export async function exportDrawioToEditableDocx(
  xmlContent: string,
  diagramName: string = 'Architecture Blueprint',
  blueprintId: string = 'VIS-MASTER',
  options?: {
    returnBlob?: boolean;
    returnBase64?: boolean;
    masterImageSrc?: string;
    bridgeId?: string;
    editableOverrides?: Record<string, { title: string; subtitle: string }>;
  }
): Promise<Blob | string | void> {
  const { cells } = parseDrawioXmlForPptx(xmlContent);
  const overrides = options?.editableOverrides || {};
  const vertices = cells.filter((c) => c.vertex && stripHtmlForDocx(c.value).title.length > 0);
  const edges = cells.filter((c) => c.edge);

  const cellTitleMap = new Map<string, string>();
  vertices.forEach((v) => {
    const ov = overrides[v.id];
    cellTitleMap.set(v.id, ov?.title || stripHtmlForDocx(v.value).title);
  });

  // Construct direct Draw.io Web Editor URL and Studio URL
  const cleanBlueprintId = (blueprintId || 'vis5965').toLowerCase().replace(/[^a-z0-9]/g, '');
  const drawioFilename = options?.bridgeId
    ? `${options.bridgeId.replace(/\.(docx|pptx|drawio)$/i, '')}.drawio`
    : `${cleanBlueprintId}_diagram.drawio`;
  const drawioBridgeUrl = `https://promptcanvas.up.railway.app/api/export/cloud-bridge/${drawioFilename}`;
  const drawioWebEditorUrl = `https://app.diagrams.net/?title=${encodeURIComponent(diagramName)}.drawio#U${encodeURIComponent(drawioBridgeUrl)}`;
  const promptCanvasStudioUrl = `https://promptcanvas.up.railway.app/vision?id=${encodeURIComponent(blueprintId)}`;

  // Rasterize or load high-res PNG for reference graphic
  const imageBytes = await resolveMasterImageBytes(options?.masterImageSrc, blueprintId, xmlContent);

  const children: any[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: `${diagramName} — Architecture Specification & Editable Draw.io Blueprint`,
          bold: true,
          size: 34,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Blueprint ID: ${blueprintId}  |  Generated by PromptCanvas Vision Engine  |  Date: ${new Date().toLocaleDateString()}`,
          size: 19,
          color: '475569',
          font: 'Arial',
        }),
      ],
      spacing: { after: 180 },
    }),
    // Interactive 1-Click Draw.io Live Editor & Google Docs Editability Banner Table (9360 DXA)
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [4680, 4680],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4680, type: WidthType.DXA },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              shading: { fill: 'F0F9FF' },
              borders: {
                left: { style: BorderStyle.SINGLE, size: 24, color: '0284C7' },
                top: { style: BorderStyle.SINGLE, size: 8, color: '0284C7' },
                right: { style: BorderStyle.SINGLE, size: 8, color: '0284C7' },
                bottom: { style: BorderStyle.SINGLE, size: 8, color: '0284C7' },
              },
              children: [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new ExternalHyperlink({
                      link: drawioWebEditorUrl,
                      children: [
                        new TextRun({
                          text: '✏️ Open & Edit Diagram Live in Draw.io (app.diagrams.net) ↗',
                          bold: true,
                          size: 20,
                          color: '0284C7',
                          underline: {},
                          font: 'Arial',
                        }),
                      ],
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '1-Click Launch: Opens this exact .drawio XML architecture diagram in the full interactive Draw.io web editor tab.',
                      size: 17,
                      color: '334155',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 4680, type: WidthType.DXA },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              shading: { fill: 'F0FDF4' },
              borders: {
                left: { style: BorderStyle.SINGLE, size: 24, color: '16A34A' },
                top: { style: BorderStyle.SINGLE, size: 8, color: '16A34A' },
                right: { style: BorderStyle.SINGLE, size: 8, color: '16A34A' },
                bottom: { style: BorderStyle.SINGLE, size: 8, color: '16A34A' },
              },
              children: [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new ExternalHyperlink({
                      link: promptCanvasStudioUrl,
                      children: [
                        new TextRun({
                          text: '🎨 Open Interactive Diagram in PromptCanvas Studio ↗',
                          bold: true,
                          size: 20,
                          color: '15803D',
                          underline: {},
                          font: 'Arial',
                        }),
                      ],
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Native Google Docs Editing: Every architecture box, node title, attribute, and connector in Section 1.1 below is 100% directly editable right here in Google Docs!',
                      size: 17,
                      color: '334155',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] }),

    // Section 1.1: 100% Native Editable Draw.io Architecture Diagram Canvas inside Google Docs
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: `1.1 Interactive Editable Draw.io Architecture Diagram Canvas (${vertices.length} Editable Vector Boxes)`,
          bold: true,
          size: 26,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
      spacing: { before: 160, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Click inside any enclave header, architecture card, service title, or connector arrow (━━▶) below to edit text, styling, or node specifications directly inside Google Docs or Microsoft Word:',
          size: 18,
          color: '475569',
          font: 'Arial',
        }),
      ],
      spacing: { after: 160 },
    }),
  ];

  // Append the Native Editable Draw.io Architecture Diagram Canvas Tables
  const editableCanvasElements = buildNativeEditableDrawioCanvasForDocx(
    vertices,
    edges,
    overrides,
    cellTitleMap
  );
  children.push(...editableCanvasElements);

  // Section 1.2: High-Resolution Visual System Architecture Reference Graphic
  if (imageBytes) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: '1.2 High-Resolution Visual Architecture Topology Reference',
            bold: true,
            size: 26,
            color: '0F172A',
            font: 'Arial',
          }),
        ],
        spacing: { before: 200, after: 120 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: imageBytes,
            transformation: {
              width: 620,
              height: 350,
            },
            type: 'png',
          }),
        ],
        spacing: { after: 300 },
      })
    );
  }

  // Section 2: Editable Component Inventory Table
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: `2. Architectural Component Inventory (${vertices.length} Addressable Objects)`,
          bold: true,
          size: 26,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
      spacing: { before: 240, after: 160 },
    })
  );

  const colWidths1 = [1100, 2600, 2200, 3460];
  const cellMargins = { top: 100, bottom: 100, left: 140, right: 140 };

  const componentRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: ['Object ID', 'Component / Enclave Name', 'Category / Role', 'Specifications & Attributes'].map(
        (headerText, colIdx) =>
          new TableCell({
            width: { size: colWidths1[colIdx], type: WidthType.DXA },
            margins: cellMargins,
            shading: { fill: '0F172A' },
            children: [
              new Paragraph({
                children: [new TextRun({ text: headerText, bold: true, color: 'FFFFFF', size: 18, font: 'Arial' })],
              }),
            ],
          })
      ),
    }),
  ];

  vertices.forEach((v, idx) => {
    const raw = stripHtmlForDocx(v.value);
    const ov = overrides[v.id];
    const title = ov?.title || raw.title;
    const details = ov?.subtitle || raw.details;
    const isContainer = v.style.container === '1' || v.width * v.height > 90000;
    const objId = `OBJ-${String(idx + 1).padStart(2, '0')}`;

    componentRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: colWidths1[0], type: WidthType.DXA },
            margins: cellMargins,
            children: [
              new Paragraph({
                children: [new TextRun({ text: objId, bold: true, color: '0284C7', size: 18, font: 'Arial' })],
              }),
            ],
          }),
          new TableCell({
            width: { size: colWidths1[1], type: WidthType.DXA },
            margins: cellMargins,
            children: [
              new Paragraph({
                children: [new TextRun({ text: title, bold: true, color: '0F172A', size: 18, font: 'Arial' })],
              }),
            ],
          }),
          new TableCell({
            width: { size: colWidths1[2], type: WidthType.DXA },
            margins: cellMargins,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: isContainer ? 'Architectural Enclave / Zone' : 'Service Node / Component',
                    color: '475569',
                    size: 18,
                    font: 'Arial',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: colWidths1[3], type: WidthType.DXA },
            margins: cellMargins,
            children: [
              new Paragraph({
                children: [new TextRun({ text: details, color: '334155', size: 18, font: 'Arial' })],
              }),
            ],
          }),
        ],
      })
    );
  });

  children.push(
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: colWidths1,
      rows: componentRows,
    }),
    new Paragraph({ text: '', spacing: { after: 300 } })
  );

  // Section 3: System Integration & Data Flow Matrix
  if (edges.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: `3. System Integration & Data Flow Matrix (${edges.length} Connections)`,
            bold: true,
            size: 26,
            color: '0F172A',
            font: 'Arial',
          }),
        ],
        spacing: { before: 240, after: 160 },
      })
    );

    const colWidths2 = [1100, 2700, 2700, 2860];

    const edgeRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: ['Flow ID', 'Source Component', 'Target Component', 'Protocol / Flow Description'].map(
          (headerText, colIdx) =>
            new TableCell({
              width: { size: colWidths2[colIdx], type: WidthType.DXA },
              margins: cellMargins,
              shading: { fill: '0F172A' },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: headerText, bold: true, color: 'FFFFFF', size: 18, font: 'Arial' })],
                }),
              ],
            })
        ),
      }),
    ];

    edges.forEach((e, idx) => {
      const flowId = `FLOW-${String(idx + 1).padStart(2, '0')}`;
      const sourceName = (e.source && cellTitleMap.get(e.source)) || `Node ${e.source || 'Origin'}`;
      const targetName = (e.target && cellTitleMap.get(e.target)) || `Node ${e.target || 'Destination'}`;
      const label = stripHtmlForDocx(e.value).title || 'Synchronous Data / Control Flow';

      edgeRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: colWidths2[0], type: WidthType.DXA },
              margins: cellMargins,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: flowId, bold: true, color: '0D9488', size: 18, font: 'Arial' })],
                }),
              ],
            }),
            new TableCell({
              width: { size: colWidths2[1], type: WidthType.DXA },
              margins: cellMargins,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: sourceName, bold: true, color: '0F172A', size: 18, font: 'Arial' })],
                }),
              ],
            }),
            new TableCell({
              width: { size: colWidths2[2], type: WidthType.DXA },
              margins: cellMargins,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: targetName, bold: true, color: '0F172A', size: 18, font: 'Arial' })],
                }),
              ],
            }),
            new TableCell({
              width: { size: colWidths2[3], type: WidthType.DXA },
              margins: cellMargins,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: label, color: '334155', size: 18, font: 'Arial' })],
                }),
              ],
            }),
          ],
        })
      );
    });

    children.push(
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: colWidths2,
        rows: edgeRows,
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  if (options?.returnBase64) {
    return await Packer.toBase64String(doc);
  }

  const blob = await Packer.toBlob(doc);

  if (options?.returnBlob) {
    return blob;
  }

  if (typeof window !== 'undefined') {
    const cleanName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanName}_editable_google_docs_spec.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
