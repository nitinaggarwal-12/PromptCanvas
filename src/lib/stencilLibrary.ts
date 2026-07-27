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
  const colors = THEME_PALETTES[theme] || THEME_PALETTES.slate;
  return `rounded=1;whiteSpace=wrap;html=1;fillColor=${colors.fill};strokeColor=${colors.stroke};strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=${colors.font};`;
}

/**
 * Returns Draw.io style string for a specific node stencil
 */
export function getNodeStencilStyle(stencil: StencilType, theme: ColumnTheme, customStroke?: string): string {
  const colors = THEME_PALETTES[theme] || THEME_PALETTES.slate;

  switch (stencil) {
    case 'cube_platform':
      return `shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=3;size=20;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#1E3A8A;`;
    
    case 'imac_monitor':
      return `shape=mxgraph.mockup.containers.monitor;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${customStroke || colors.cardStroke};strokeWidth=2;fontColor=${colors.cardFont};verticalAlign=top;padding=12;`;
    
    case 'ipad_tablet':
      return `shape=mxgraph.mockup.containers.tablet;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${customStroke || colors.cardStroke};strokeWidth=2;fontColor=${colors.cardFont};padding=12;`;
    
    case 'standard_card':
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=${colors.cardFill};strokeColor=${customStroke || colors.cardStroke};strokeWidth=1.5;fontColor=${colors.cardFont};`;
    
    case 'iphone_alert':
      return `shape=mxgraph.ios7.misc.iphone;whiteSpace=wrap;html=1;fillColor=#FEFCF7;strokeColor=#DC2231;strokeWidth=3;fontColor=#1E293B;padding=15;`;
    
    case 'pill_badge':
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;`;
    
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
      const monitorIcons = icons && icons.length > 0 ? icons : [
        'https://api.iconify.design/flat-color-icons:sales-performance.svg',
        'https://api.iconify.design/flat-color-icons:combo-chart.svg'
      ];
      const iconTags = monitorIcons.map(url => `<img src="${url}" width="44" height="34" style="vertical-align:middle;margin:0 4px;">`).join('');
      return `<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}<br><br><div style="text-align:center;">${iconTags}</div>${safeContent}`;
    }

    case 'ipad_tablet': {
      const tabletIcons = icons && icons.length > 0 ? icons : [
        'https://api.iconify.design/flat-color-icons:doughnut-chart.svg',
        'https://api.iconify.design/flat-color-icons:bar-chart.svg'
      ];
      const iconTags = tabletIcons.map(url => `<img src="${url}" width="32" height="32" style="vertical-align:middle;margin:0 4px;">`).join('');
      return `<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}<br><br><div style="text-align:center;">${iconTags}</div>${safeContent}`;
    }

    case 'iphone_alert':
      return `<div style="color:#DC2231;font-size:13px;line-height:1.4;"><b style="font-size:14px;">${safeTitle}</b><br><br><b style="font-size:13px;">CRITICAL ADVISORY:</b><br>${subtitle || contentHtml || 'Review Strategic Plan'}</div>`;

    case 'pill_badge':
      return `<b style="font-size:11px;">${safeTitle}</b>`;

    case 'icon_grid':
      return `<b style="font-size:12px;">${safeTitle}</b>${safeSubtitle}${safeContent || `
        <table style="width:100%;text-align:center;font-size:11px;border:none;margin-top:6px;">
          <tr><td>🔍<br><b>Market Research</b></td><td>🩺<br><b>Medical Affairs</b></td></tr>
          <tr><td style="padding-top:10px;">💰<br><b>Market Access</b></td><td style="padding-top:10px;">⚖️<br><b>Outcomes Research</b></td></tr>
          <tr><td colspan="2" style="padding-top:10px;">🧠<br><b>Competitive Intelligence</b></td></tr>
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
