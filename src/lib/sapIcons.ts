/**
 * Official SAP Ecosystem & Product Vector SVGs and Data URIs.
 * 
 * Provides vector icons for SAP architecture diagrams:
 * - SAP Official Logo & Brand
 * - SAP Joule (Generative AI Copilot)
 * - SAP BTP (Business Technology Platform)
 * - SAP Integration Suite & API Management
 * - SAP Datasphere (Business Data Cloud)
 * - SAP S/4HANA Cloud & On-Premises Core
 * - SAP NetWeaver AS ABAP & ABAP SDK
 * - SAP Cloud Connector (SCC)
 * - SAP HANA In-Memory Database
 * - SAP SaaS Ecosystem (SuccessFactors, Concur, Ariba, CX, Analytics Cloud)
 */

export interface SapIconDefinition {
  id: string;
  name: string;
  category: 'core' | 'ai' | 'btp' | 'data' | 'integration' | 'database' | 'saas';
  primaryColor: string;
  bgColor: string;
  svg: string;
}

export const SAP_OFFICIAL_ICONS: Record<string, SapIconDefinition> = {
  // 1. Official SAP Master Brand Logo
  'sap_logo': {
    id: 'sap_logo',
    name: 'SAP Master Logo',
    category: 'core',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 64 32" width="64" height="32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sap_grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#008FD3"/><stop offset="100%" stop-color="#005B94"/></linearGradient></defs><rect width="64" height="32" rx="3" fill="url(#sap_grad)"/><text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, Arial Black, Arial, sans-serif" font-weight="900" font-size="17" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">SAP</text></svg>`
  },

  // 2. SAP Joule (Generative AI Copilot Diamond)
  'sap_joule': {
    id: 'sap_joule',
    name: 'SAP Joule Copilot',
    category: 'ai',
    primaryColor: '#F59E0B',
    bgColor: '#FEF3C7',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.5 8.5L22 12L15.5 15.5L12 22L8.5 15.5L2 12L8.5 8.5L12 2Z" fill="#F59E0B"/><path d="M12 6L14 10L18 12L14 14L12 18L10 14L6 12L10 10L12 6Z" fill="#FFFFFF"/><circle cx="12" cy="12" r="2.5" fill="#D97706"/></svg>`
  },

  // 3. SAP BTP Core
  'sap_btp': {
    id: 'sap_btp',
    name: 'SAP Business Technology Platform',
    category: 'btp',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" rx="2" fill="#0070F2"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#3B82F6"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#60A5FA"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#93C5FD"/><path d="M7 7H17M7 17H17M7 7V17M17 7V17" stroke="#FFFFFF" stroke-width="1.5"/></svg>`
  },

  // 4. SAP Integration Suite & API Management
  'sap_integration_suite': {
    id: 'sap_integration_suite',
    name: 'SAP Integration Suite',
    category: 'integration',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="12" r="3.5" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><circle cx="18" cy="6" r="3.5" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><circle cx="18" cy="18" r="3.5" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><path d="M9.5 12H12M12 12L14.5 7.5M12 12L14.5 16.5" stroke="#0070F2" stroke-width="2" stroke-linecap="round"/></svg>`
  },

  // 5. SAP Datasphere
  'sap_datasphere': {
    id: 'sap_datasphere',
    name: 'SAP Datasphere',
    category: 'data',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="#0070F2" stroke-width="1.8" fill="#EBF3FC"/><path d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6" stroke="#0070F2" stroke-width="1.8"/><path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" stroke="#0070F2" stroke-width="1.8"/><circle cx="12" cy="12" r="2.5" fill="#0070F2"/></svg>`
  },

  // 6. SAP Cloud Connector (SCC)
  'sap_cloud_connector': {
    id: 'sap_cloud_connector',
    name: 'SAP Cloud Connector',
    category: 'integration',
    primaryColor: '#1E40AF',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="3" stroke="#1E40AF" stroke-width="1.8" fill="#EFF6FF"/><path d="M8 12H16M13 9L16 12L13 15" stroke="#1E40AF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="12" r="1.5" fill="#1E40AF"/></svg>`
  },

  // 7. SAP S/4HANA & AS ABAP
  'sap_s4hana': {
    id: 'sap_s4hana',
    name: 'SAP S/4HANA ERP',
    category: 'core',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#0070F2" stroke-width="2" fill="#0070F2"/><path d="M7 9H17M7 12H17M7 15H13" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><circle cx="15.5" cy="15" r="1.5" fill="#F59E0B"/></svg>`
  },

  // 8. SAP HANA Database
  'sap_hana': {
    id: 'sap_hana',
    name: 'SAP HANA In-Memory DB',
    category: 'database',
    primaryColor: '#38BDF8',
    bgColor: '#0F172A',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="8" ry="2.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5"/><path d="M4 5V19C4 20.38 7.58 21.5 12 21.5C16.42 21.5 20 20.38 20 19V5" stroke="#38BDF8" stroke-width="1.8"/><path d="M4 12C4 13.38 7.58 14.5 12 14.5C16.42 14.5 20 13.38 20 12" stroke="#38BDF8" stroke-width="1.5"/><rect x="8" y="8" width="8" height="3" rx="1" fill="#38BDF8"/></svg>`
  },

  // 9. SAP SuccessFactors
  'sap_successfactors': {
    id: 'sap_successfactors',
    name: 'SAP SuccessFactors',
    category: 'saas',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="7" r="4" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><path d="M4 21C4 16.58 7.58 13 12 13C16.42 13 20 16.58 20 21" stroke="#0070F2" stroke-width="2" stroke-linecap="round"/></svg>`
  },

  // 10. SAP Ariba
  'sap_ariba': {
    id: 'sap_ariba',
    name: 'SAP Ariba',
    category: 'saas',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="14" rx="2" stroke="#0070F2" stroke-width="2" fill="#EBF3FC"/><path d="M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6" stroke="#0070F2" stroke-width="2"/><circle cx="12" cy="13" r="2" fill="#0070F2"/></svg>`
  },

  // 11. SAP Concur
  'sap_concur': {
    id: 'sap_concur',
    name: 'SAP Concur',
    category: 'saas',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#0070F2" stroke-width="1.8" fill="#EBF3FC"/><path d="M7 9L11 13L17 7" stroke="#0070F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 16H17" stroke="#0070F2" stroke-width="1.5"/></svg>`
  },

  // 12. SAP Analytics Cloud (SAC)
  'sap_sac': {
    id: 'sap_sac',
    name: 'SAP Analytics Cloud',
    category: 'saas',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="14" width="4" height="7" rx="1" fill="#0070F2"/><rect x="10" y="9" width="4" height="12" rx="1" fill="#0070F2"/><rect x="17" y="4" width="4" height="17" rx="1" fill="#0070F2"/><path d="M3 11L9 6L15 9L21 3" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/></svg>`
  },

  // 13. SAP Fiori Launchpad
  'sap_fiori': {
    id: 'sap_fiori',
    name: 'SAP Fiori UI5',
    category: 'core',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#0070F2"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#3B82F6"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#60A5FA"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#F59E0B"/><path d="M6.5 6.5H17.5M6.5 17.5H17.5" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/></svg>`
  },

  // 14. SAP API Management & Event Mesh
  'sap_apim': {
    id: 'sap_apim',
    name: 'SAP API Management',
    category: 'integration',
    primaryColor: '#0070F2',
    bgColor: '#EBF3FC',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#0070F2" stroke-width="1.8"/><path d="M8 12H16M12 8V16" stroke="#0070F2" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="#38BDF8"/></svg>`
  },

  // 15. SAP NetWeaver AS ABAP
  'sap_netweaver': {
    id: 'sap_netweaver',
    name: 'SAP NetWeaver AS ABAP',
    category: 'core',
    primaryColor: '#1E40AF',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#1E40AF" stroke-width="1.8" fill="#EFF6FF"/><path d="M7 8H17M7 12H17M7 16H13" stroke="#1E40AF" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="16" r="1.5" fill="#F59E0B"/></svg>`
  },

  // 16. SAP Security, Authorizations & GRC
  'sap_security': {
    id: 'sap_security',
    name: 'SAP Security & GRC',
    category: 'core',
    primaryColor: '#059669',
    bgColor: '#ECFDF5',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z" fill="#10B981" fill-opacity="0.15" stroke="#059669" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },

  // 17. ABAP SDK for Google Cloud
  'sap_abap_sdk': {
    id: 'sap_abap_sdk',
    name: 'ABAP SDK for Google Cloud',
    category: 'integration',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#1A73E8" stroke-width="1.8" fill="#EFF6FF"/><path d="M7 9L11 13L7 17M13 17H17" stroke="#1A73E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },

  // 18. SAP Customer Experience (CX)
  'sap_cx': {
    id: 'sap_cx',
    name: 'SAP Customer Experience',
    category: 'saas',
    primaryColor: '#F59E0B',
    bgColor: '#FEF3C7',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 9H17M7 13H13" stroke="#D97706" stroke-width="2" stroke-linecap="round"/></svg>`
  }
};

/**
 * Returns clean RFC 2397 Data URI for embedding directly in Draw.io mxCell image styles.
 */
export function getSapDataUri(iconKey: keyof typeof SAP_OFFICIAL_ICONS | string): string {
  const cleanKey = String(iconKey || '').trim().toLowerCase();
  const def = SAP_OFFICIAL_ICONS[cleanKey] || SAP_OFFICIAL_ICONS['sap_btp'];
  return `data:image/svg+xml,${encodeURIComponent(def.svg.trim())}`;
}

/**
 * Generates an inline HTML component for Draw.io HTML labels.
 */
export function renderSapIconHtml(iconKey: keyof typeof SAP_OFFICIAL_ICONS | string, size = 24): string {
  const cleanKey = String(iconKey || '').trim().toLowerCase();
  const def = SAP_OFFICIAL_ICONS[cleanKey] || SAP_OFFICIAL_ICONS['sap_btp'];
  const safeSize = Math.max(16, size || 24);
  const scaledSvg = def.svg
    .replace(/\swidth="[^"]*"/, '')
    .replace(/\sheight="[^"]*"/, '')
    .replace(/<svg\b/, `<svg width="${safeSize}" height="${safeSize}"`);
  return `<div data-sap-icon="${cleanKey}" style="display:inline-flex;align-items:center;justify-content:center;width:${safeSize}px;height:${safeSize}px;background:#FFFFFF;flex-shrink:0;">${scaledSvg}</div>`;
}
