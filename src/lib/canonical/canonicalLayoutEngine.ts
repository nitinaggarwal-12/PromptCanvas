/**
 * Canonical Architecture Declarative Layout Engine
 * Provides clean, robust, mathematical primitives to build 100% ground-truth
 * architecture blueprints with balanced zones, proportional typography, and 0 empty voids.
 */

export interface BlueprintHeaderConfig {
  number: number | string;
  title: string;
  useCase: string;
  environment?: string;
  region?: string;
  lastUpdated?: string;
  brandTitle?: string;
  brandSubtitle?: string;
  objective: string;
}

export interface PodCardConfig {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  icon?: string;
  title: string;
  subtitle?: string;
  badge?: { text: string; color?: string; bg?: string };
  items?: string[];
  protocols?: string;
  format?: string;
  borderColor?: string;
  fillColor?: string;
  fontSize?: number;
}

export interface BottomPanelConfig {
  id: string;
  title: string;
  titleColor?: string;
  icon?: string;
  contentHtml?: string;
  items?: string[];
  badgeText?: string;
}

export class CanonicalBlueprintBuilder {
  private cells: string[] = [];
  private idCounter = 1000;
  private width = 1600;
  private height = 960;
  private theme: "dark" | "light";

  constructor(theme: "dark" | "light" = "light", width = 1600, height = 960) {
    this.theme = theme;
    this.width = width;
    this.height = height;
  }

  private escape(str: string): string {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  public nextId(prefix = "c"): string {
    return `${prefix}_${this.idCounter++}`;
  }

  public addRawCell(id: string, value: string, x: number, y: number, w: number, h: number, style: string): void {
    this.cells.push(
      `<mxCell id="${id}" value="${this.escape(value)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  }

  public addEdge(
    id: string,
    value: string,
    src: string,
    tgt: string,
    style: string,
    points: Array<{ x: number; y: number }> = []
  ): void {
    let ptsXml = "";
    if (points.length > 0) {
      ptsXml = `<Array as="points">${points.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    this.cells.push(
      `<mxCell id="${id}" value="${this.escape(value)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  }

  /**
   * 1. TOP HEADER ZONE (y = 16..68)
   */
  public addHeader(config: BlueprintHeaderConfig): void {
    // Number Badge
    this.addRawCell(
      "hdr_num",
      String(config.number),
      20,
      16,
      50,
      50,
      "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;"
    );

    // Title & Metadata
    const env = config.environment || "Production";
    const reg = config.region || "us-central1";
    const upd = config.lastUpdated || "May 8, 2025";
    const metaHtml =
      `<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>${config.title}</div>` +
      `<div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>` +
      `Use Case: ${config.useCase} &nbsp;|&nbsp; Environment: ${env} &nbsp;|&nbsp; Region: ${reg} &nbsp;|&nbsp; Last Updated: ${upd}` +
      `</div>`;
    this.addRawCell("hdr_title", metaHtml, 80, 16, 840, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=8;");

    // Brand Block
    const bTitle = config.brandTitle || "🧬 NOVACURA";
    const bSub = config.brandSubtitle || "AI-Powered Regulatory Intelligence Platform";
    const brandHtml =
      `<div style='text-align:right;'>` +
      `<span style='font-size:20px;font-weight:800;color:#0284C7;'>${bTitle}</span><br/>` +
      `<span style='font-size:9.5px;color:#64748B;font-style:italic;'>${bSub}</span>` +
      `</div>`;
    this.addRawCell("hdr_brand", brandHtml, 930, 16, 290, 50, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

    // Objective Card
    const objHtml =
      `<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div>` +
      `<div style='font-size:7.5px;line-height:1.35;color:#0F172A;'>${config.objective}</div>`;
    this.addRawCell(
      "hdr_obj",
      objHtml,
      1230,
      16,
      350,
      50,
      "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;"
    );
  }

  /**
   * 2. POD / MICROSERVICE CARD
   */
  public addPodCard(config: PodCardConfig): void {
    const bCol = config.borderColor || "#CBD5E1";
    const fCol = config.fillColor || "#FFFFFF";
    const icon = config.icon ? `<span style='font-size:14px;margin-right:3px;'>${config.icon}</span> ` : "";
    const badge = config.badge
      ? `<div style='text-align:center;margin-top:2px;'><span style='background:${config.badge.bg || "#EFF6FF"};border:1px solid ${config.badge.color || "#2563EB"};color:${config.badge.color || "#2563EB"};font-size:7px;padding:1px 4px;border-radius:2px;font-weight:700;'>${config.badge.text}</span></div>`
      : "";

    let bodyHtml = "";
    if (config.subtitle) {
      bodyHtml += `<div style='font-size:7.5px;color:#64748B;text-align:center;margin-bottom:2px;'>${config.subtitle}</div>`;
    }
    if (config.protocols) {
      bodyHtml += `<div style='background:#EFF6FF;border:1px solid #2563EB;padding:3px;border-radius:3px;font-size:7.5px;margin-bottom:2px;'><b>Protocols:</b><br/>${config.protocols}</div>`;
    }
    if (config.format) {
      bodyHtml += `<div style='background:#F8FAFC;border:1px solid #CBD5E1;padding:3px;border-radius:3px;font-size:7.5px;margin-bottom:2px;'><b>Format:</b><br/>${config.format}</div>`;
    }
    if (config.items && config.items.length > 0) {
      bodyHtml += `<div style='font-size:7.5px;line-height:1.3;color:#0F172A;margin-top:2px;'>${config.items.map(i => `• ${i}`).join("<br/>")}</div>`;
    }

    const val =
      `<div style='font-size:9px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:2px;'>${icon}${config.title}</div>` +
      bodyHtml +
      badge;

    this.addRawCell(
      config.id,
      val,
      config.x,
      config.y,
      config.w,
      config.h,
      `fillColor=${fCol};strokeColor=${bCol};strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;`
    );
  }

  /**
   * 3. BOTTOM ROW FEATURE GRID (y = 630..910)
   */
  public addBottomGrid(panels: BottomPanelConfig[], y = 630, height = 280): void {
    const count = panels.length;
    const startX = 20;
    const totalW = 1560;
    const gap = 12;
    const panelW = (totalW - (count - 1) * gap) / count;

    panels.forEach((p, idx) => {
      const px = startX + idx * (panelW + gap);
      const titleCol = p.titleColor || "#1E3A8A";
      const icon = p.icon ? `${p.icon} ` : "";
      let inner = `<div style='font-size:10px;font-weight:800;color:${titleCol};margin-bottom:4px;'>${icon}${p.title}</div>`;

      if (p.contentHtml) {
        inner += `<div style='font-size:8px;line-height:1.4;color:#0F172A;'>${p.contentHtml}</div>`;
      } else if (p.items) {
        inner += `<div style='font-size:8px;line-height:1.4;color:#0F172A;'>${p.items.map(it => `✔ ${it}`).join("<br/>")}</div>`;
      }

      this.addRawCell(
        p.id,
        inner,
        px,
        y,
        panelW,
        height,
        "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;"
      );
    });
  }

  /**
   * 4. FOOTER STATUS BAR (y = 920..945)
   */
  public addFooter(version = "1.0", date = "May 2025", extraText?: string): void {
    const extra = extraText ? ` &nbsp;|&nbsp; ${extraText}` : "";
    const html = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;'><div>Version: ${version} &nbsp;|&nbsp; Classification: Confidential${extra}</div><div>Enterprise Architecture Team</div></div>`;
    this.addRawCell(
      "footer_status",
      html,
      20,
      this.height - 35,
      this.width - 40,
      25,
      "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;"
    );
  }

  /**
   * EXPORT FULL DRAWIO XML ENVELOPE
   */
  public toXml(diagramId: string, diagramName: string): string {
    return `<mxfile host="embed.diagrams.net">
  <diagram id="${this.escape(diagramId)}" name="${this.escape(diagramName)}">
    <mxGraphModel dx="${this.width}" dy="${this.height}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${this.width}" pageHeight="${this.height}" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${this.cells.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }
}
