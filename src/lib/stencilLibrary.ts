/**
 * 🎨 PromptCanvas Custom Stencil Library & Style Definitions
 * Provides high-fidelity Draw.io shape styles, HTML label generators, and color themes
 * for structured architecture and conceptual diagrams.
 */

export type ColumnTheme = 'slate' | 'blue' | 'green' | 'amber' | 'purple' | 'red';
export type StencilType = 
  | 'standard_card' 
  | 'imac_monitor' 
  | 'ipad_tablet' 
  | 'iphone_alert' 
  | 'cube_platform' 
  | 'pill_badge' 
  | 'icon_grid';

export interface ThemeColors {
  fill: string;
  stroke: string;
  font: string;
  cardFill: string;
  cardStroke: string;
  cardFont: string;
}

export const THEME_PALETTES: Record<ColumnTheme, ThemeColors> = {
  slate: {
    fill: '#F8FAFC',
    stroke: '#CBD5E1',
    font: '#0F172A',
    cardFill: '#E2E8F0',
    cardStroke: '#94A3B8',
    cardFont: '#1E293B'
  },
  blue: {
    fill: '#EFF6FF',
    stroke: '#60A5FA',
    font: '#1E3A8A',
    cardFill: '#FFFFFF',
    cardStroke: '#3B82F6',
    cardFont: '#1E293B'
  },
  green: {
    fill: '#F0FDF4',
    stroke: '#4ADE80',
    font: '#14532D',
    cardFill: '#FFFFFF',
    cardStroke: '#64748B',
    cardFont: '#1E293B'
  },
  amber: {
    fill: '#FEFCF7',
    stroke: '#F59E0B',
    font: '#78350F',
    cardFill: '#FFFFFF',
    cardStroke: '#D97706',
    cardFont: '#1E293B'
  },
  purple: {
    fill: '#FAF5FF',
    stroke: '#C084FC',
    font: '#581C87',
    cardFill: '#FFFFFF',
    cardStroke: '#9333EA',
    cardFont: '#1E293B'
  },
  red: {
    fill: '#FEF2F2',
    stroke: '#F87171',
    font: '#7F1D1D',
    cardFill: '#FEFCF7',
    cardStroke: '#DC2231',
    cardFont: '#7F1D1D'
  }
};

/**
 * Returns Draw.io style string for outer column containers
 */
export function getColumnContainerStyle(theme: ColumnTheme): string {
  const colors = THEME_PALETTES[theme] || {
    fill: '#F1F5F9',
    stroke: '#64748B',
    font: '#0F172A',
    cardFill: '#FFFFFF',
    cardStroke: '#94A3B8',
    cardFont: '#1E293B'
  };
  return `rounded=1;whiteSpace=wrap;html=1;fillColor=${colors.fill};gradientColor=#FFFFFF;gradientDirection=north;strokeColor=${colors.stroke};strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=${colors.font};shadow=1;`;
}

/**
 * Returns Draw.io style string for a specific node stencil
 */
export function getNodeStencilStyle(stencil: StencilType, theme: ColumnTheme, customStroke?: string): string {
  const colors = THEME_PALETTES[theme] || THEME_PALETTES.slate;

  switch (stencil) {
    case 'cube_platform':
      return `shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#DBEAFE;gradientColor=#EFF6FF;gradientDirection=south;strokeColor=#2563EB;strokeWidth=3;size=20;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#1E3A8A;shadow=1;`;
    
    case 'imac_monitor':
      return `shape=mxgraph.mockup.containers.monitor;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${customStroke || colors.cardStroke};strokeWidth=2;fontColor=${colors.cardFont};verticalAlign=top;padding=12;shadow=1;`;
    
    case 'ipad_tablet':
      return `shape=mxgraph.mockup.containers.tablet;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${customStroke || colors.cardStroke};strokeWidth=2;fontColor=${colors.cardFont};padding=12;shadow=1;`;
    
    case 'standard_card':
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${customStroke || colors.cardStroke};strokeWidth=1.5;fontColor=${colors.cardFont};shadow=1;`;
    
    case 'iphone_alert':
      return `shape=mxgraph.ios7.misc.iphone;whiteSpace=wrap;html=1;fillColor=#FEFCF7;strokeColor=#DC2231;strokeWidth=3;fontColor=#1E293B;padding=15;shadow=1;`;
    
    case 'pill_badge':
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;shadow=1;`;
    
    case 'icon_grid':
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${colors.cardStroke};strokeWidth=1.5;fontColor=${colors.cardFont};`;
    
    default:
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;fontColor=#1E293B;`;
  }
}

/**
 * Generates rich HTML content label for a node based on its stencil type
 */
export function generateStencilHtmlLabel(
  stencil: StencilType,
  title: string,
  subtitle?: string,
  contentHtml?: string,
  icons?: string[]
): string {
  const safeTitle = title || '';
  const safeSubtitle = subtitle ? `<br><span style="font-size:11px;color:#64748B;font-weight:normal;">${subtitle}</span>` : '';
  const safeContent = contentHtml ? `<br><br>${contentHtml}` : '';

  switch (stencil) {
    case 'cube_platform':
      return `<b style="font-size:14px;">${safeTitle}</b>${safeSubtitle}${safeContent}`;

    case 'imac_monitor': {
      const iconTags = icons && icons.length > 0
        ? icons.map(url => `<img src="${url}" width="44" height="34" style="vertical-align:middle;margin:0 4px;">`).join('')
        : '';
      const iconContainer = iconTags ? `<br><br><div style="text-align:center;">${iconTags}</div>` : '';
      return `<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}${iconContainer}${safeContent}`;
    }

    case 'ipad_tablet': {
      const iconTags = icons && icons.length > 0
        ? icons.map(url => `<img src="${url}" width="32" height="32" style="vertical-align:middle;margin:0 4px;">`).join('')
        : '';
      const iconContainer = iconTags ? `<br><br><div style="text-align:center;">${iconTags}</div>` : '';
      return `<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}${iconContainer}${safeContent}`;
    }

    case 'iphone_alert':
      return `<div style="color:#DC2231;font-size:13px;line-height:1.4;"><b style="font-size:14px;">${safeTitle}</b><br><br><b style="font-size:13px;">CRITICAL ADVISORY:</b><br>${subtitle || contentHtml || safeTitle || 'Critical Advisory Alert'}</div>`;

    case 'pill_badge':
      return `<b style="font-size:11px;">${safeTitle}</b>`;

    case 'icon_grid':
      return `<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}${safeContent || `
        <table style="width:100%;text-align:center;font-size:11px;border:none;margin-top:6px;">
          <tr><td>⚡<br><b>Component Tier A</b></td><td>🛡️<br><b>Security Mesh</b></td></tr>
          <tr><td style="padding-top:10px;">📊<br><b>Telemetry Hub</b></td><td style="padding-top:10px;">💾<br><b>Data Storage</b></td></tr>
        </table>
      `}`;

    case 'standard_card':
    default: {
      let iconPrefix = '';
      if (icons && icons.length > 0) {
        iconPrefix = `<img src="${icons[0]}" width="28" height="28" style="float:left;margin-right:8px;vertical-align:middle;">`;
      }
      return `${iconPrefix}<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}${safeContent}`;
    }
  }
}

/**
 * Returns the Draw.io <mxlibrary> JSON string representing the PromptCanvas Enterprise Stencils
 * for injection into Draw.io left sidebar palettes.
 */
export function getPromptCanvasEnterpriseStencilsXml(): string {
  const stencils = [
    {
      title: "PDF Badge",
      w: 36,
      h: 42,
      xml: '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="&lt;b style=&quot;color:#FFFFFF;font-size:11px;&quot;&gt;PDF&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2231;strokeColor=none;fontColor=#FFFFFF;arcSize=20;shadow=1;" vertex="1" parent="1"><mxGeometry width="36" height="42" as="geometry"/></mxCell></root></mxGraphModel>'
    },
    {
      title: "PPT Badge",
      w: 36,
      h: 42,
      xml: '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="&lt;b style=&quot;color:#FFFFFF;font-size:11px;&quot;&gt;PPT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EA580C;strokeColor=none;fontColor=#FFFFFF;arcSize=20;shadow=1;" vertex="1" parent="1"><mxGeometry width="36" height="42" as="geometry"/></mxCell></root></mxGraphModel>'
    },
    {
      title: "3D Isometric Cube Container",
      w: 340,
      h: 480,
      xml: '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="&lt;b style=&quot;font-size:14px;color:#1E3A8A;&quot;&gt;Core ITACS Platform&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;font-weight:normal;color:#3B82F6;&quot;&gt;(Powered by Gemini Enterprise)&lt;/span&gt;" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#DBEAFE;gradientColor=#EFF6FF;gradientDirection=south;strokeColor=#2563EB;strokeWidth=3;size=20;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#1E3A8A;padding=15;shadow=1;" vertex="1" parent="1"><mxGeometry width="340" height="480" as="geometry"/></mxCell></root></mxGraphModel>'
    },
    {
      title: "Analyst Workspace User Node",
      w: 280,
      h: 110,
      xml: '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="&lt;table style=&quot;width:100%;border:none;text-align:left;margin-top:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:55px;font-size:38px;text-align:center;vertical-align:middle;&quot;&gt;👩‍💻&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;&quot;&gt;&lt;b style=&quot;font-size:13px;color:#1E293B;&quot;&gt;User Node&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;Analyst Workspace&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Asset Analysis Profile&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;padding=10;shadow=1;" vertex="1" parent="1"><mxGeometry width="280" height="110" as="geometry"/></mxCell></root></mxGraphModel>'
    },
    {
      title: "Strategic Priority Advisory Alert",
      w: 280,
      h: 107,
      xml: '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="&lt;div style=&quot;color:#DC2231;font-size:13px;line-height:1.4;text-align:center;&quot;&gt;&lt;div style=&quot;background:#FEE2E2;color:#991B1B;font-size:11px;font-weight:bold;padding:2px 6px;border-radius:4px;margin-bottom:6px;display:inline-block;&quot;&gt;🚨 STRATEGIC ADVISORY ALERT&lt;/div&gt;&lt;br&gt;&lt;b style=&quot;font-size:14px;color:#7F1D1D;&quot;&gt;Review Drug Launch Strategy&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#991B1B;background:#FEF2F2;padding:2px 8px;border-radius:999px;border:1px solid #F87171;display:inline-block;margin-top:4px;&quot;&gt;Alert ID: #T-731&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1;fontColor=#7F1D1D;padding=8;arcSize=8;" vertex="1" parent="1"><mxGeometry width="280" height="107" as="geometry"/></mxCell></root></mxGraphModel>'
    },
    {
      title: "5 Functional Areas Card Grid",
      w: 280,
      h: 210,
      xml: '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;5 Functional Areas Card&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;table style=&quot;width:100%;text-align:center;font-size:11px;border-collapse:separate;border-spacing:6px;margin-top:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🔍&lt;br&gt;&lt;b&gt;Market Research&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🩺&lt;br&gt;&lt;b&gt;Medical Affairs&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;💰&lt;br&gt;&lt;b&gt;Market Access&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;⚖️&lt;br&gt;&lt;b&gt;Outcomes Research&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🧠&lt;br&gt;&lt;b&gt;Competitive Intelligence&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;fontColor=#1E293B;verticalAlign=top;padding=10;shadow=1;" vertex="1" parent="1"><mxGeometry width="280" height="210" as="geometry"/></mxCell></root></mxGraphModel>'
    }
  ];

  return `<mxlibrary>${JSON.stringify(stencils)}</mxlibrary>`;
}
