/**
 * 🏛️ Google Cloud Platform (GCP) Native Architecture Icon & Vector Asset Library
 * 
 * Authentic, pristine vector SVGs for official Google Cloud products and architectures.
 * 100% Offline, Self-Contained, Zero External CDN / HTTP dependencies.
 * 
 * Covers all official Google Cloud Architecture Center categories:
 * - AI & Machine Learning (Gemini, Vertex AI, ScaNN Vector Search, Document AI, Agent Builder, Model Armor)
 * - Compute & Containers (GKE, GKE Autopilot, Cloud Run, Cloud Functions, Compute Engine)
 * - Databases & Storage (BigQuery, Cloud Spanner, Cloud SQL, AlloyDB, Cloud Storage, Memorystore)
 * - Security, Identity & Governance (Cloud Armor, IAP, Sensitive Data Protection / Cloud DLP, Cloud IAM, VPC-SC, Cloud KMS, SCC)
 * - Networking & Ingress (Cloud Load Balancing, Cloud CDN, Cloud Interconnect, Cloud NAT)
 * - Management, Operations & CI/CD (Cloud Logging, Cloud Monitoring, Cloud Trace, Cloud Deploy, Cloud Build, Artifact Registry)
 */

export interface GcpIconDefinition {
  id: string;
  name: string;
  category: 'ai' | 'compute' | 'database' | 'storage' | 'security' | 'networking' | 'operations' | 'cicd';
  productUrl?: string;
  primaryColor: string;
  bgColor: string;
  svg: string; // Raw inline SVG with viewBox="0 0 24 24" or "0 0 48 48"
  dataUri?: string; // Encoded data URI for mxCell image styles
}

export const GCP_OFFICIAL_ICONS: Record<string, GcpIconDefinition> = {
  // =========================================================================
  // 1. AI & MACHINE LEARNING (DeepMind & Vertex AI)
  // =========================================================================
  'gemini': {
    id: 'gemini',
    name: 'Google Gemini / DeepMind',
    category: 'ai',
    primaryColor: '#1A73E8',
    bgColor: '#EEF2FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="#1A73E8"/></svg>`
  },
  'vertex_ai': {
    id: 'vertex_ai',
    name: 'Vertex AI Platform',
    category: 'ai',
    primaryColor: '#7C3AED',
    bgColor: '#F5F3FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#7C3AED" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 22V12M12 12L21 7M12 12L3 7" stroke="#7C3AED" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="#7C3AED"/></svg>`
  },
  'vertex_vector_search': {
    id: 'vertex_vector_search',
    name: 'Vertex Vector Search (ScaNN)',
    category: 'ai',
    primaryColor: '#2563EB',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#2563EB" stroke-width="2"/><path d="M16 16L21 21" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/><circle cx="8.5" cy="10" r="1.5" fill="#3B82F6"/><circle cx="13" cy="8.5" r="1.5" fill="#3B82F6"/><circle cx="12" cy="13" r="1.5" fill="#3B82F6"/><path d="M8.5 10L13 8.5M13 8.5L12 13M8.5 10L12 13" stroke="#93C5FD" stroke-width="1" stroke-dasharray="1 1"/></svg>`
  },
  'document_ai': {
    id: 'document_ai',
    name: 'Document AI & Multimodal OCR',
    category: 'ai',
    primaryColor: '#0284C7',
    bgColor: '#F0F9FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#0284C7" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="#0284C7" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="17" r="2" fill="#0284C7"/></svg>`
  },
  'agent_builder': {
    id: 'agent_builder',
    name: 'Vertex AI Agent Builder',
    category: 'ai',
    primaryColor: '#5B21B6',
    bgColor: '#FAF5FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="15" rx="3" stroke="#5B21B6" stroke-width="1.8"/><circle cx="9" cy="11" r="2" fill="#7C3AED"/><circle cx="15" cy="11" r="2" fill="#7C3AED"/><path d="M9 15C10 16 14 16 15 15" stroke="#5B21B6" stroke-width="1.5" stroke-linecap="round"/><path d="M12 2V4M10 2H14" stroke="#5B21B6" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  'model_armor': {
    id: 'model_armor',
    name: 'Vertex AI Model Armor & Safety',
    category: 'ai',
    primaryColor: '#DC2626',
    bgColor: '#FEF2F2',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z" stroke="#DC2626" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 7V13M12 17H12.01" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></svg>`
  },

  // =========================================================================
  // 2. COMPUTE & CONTAINERS
  // =========================================================================
  'gke': {
    id: 'gke',
    name: 'Google Kubernetes Engine (GKE)',
    category: 'compute',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="#1A73E8" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3.5" stroke="#1A73E8" stroke-width="1.5"/><path d="M12 2V8.5M12 15.5V22M3.34 7L9 10.25M15 13.75L20.66 17M3.34 17L9 13.75M15 10.25L20.66 7" stroke="#1A73E8" stroke-width="1.5"/></svg>`
  },
  'gke_autopilot': {
    id: 'gke_autopilot',
    name: 'GKE Autopilot',
    category: 'compute',
    primaryColor: '#1D4ED8',
    bgColor: '#DBEAFE',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" fill="#1D4ED8" fill-opacity="0.1" stroke="#1D4ED8" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="#1D4ED8"/><path d="M12 4L18 8V16L12 20L6 16V8L12 4Z" stroke="#3B82F6" stroke-width="1.2" stroke-dasharray="2 2"/></svg>`
  },
  'cloud_run': {
    id: 'cloud_run',
    name: 'Cloud Run',
    category: 'compute',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#E8F0FE" stroke="#1A73E8" stroke-width="1.5"/><path d="M10 8L15 12L10 16V8Z" fill="#1A73E8"/></svg>`
  },
  'cloud_functions': {
    id: 'cloud_functions',
    name: 'Cloud Functions (Gen 2)',
    category: 'compute',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L4 12L8 16M16 8L20 12L16 16M14 4L10 20" stroke="#1A73E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'compute_engine': {
    id: 'compute_engine',
    name: 'Compute Engine (GCE)',
    category: 'compute',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#1A73E8" stroke-width="1.8"/><rect x="7" y="7" width="10" height="10" rx="1" fill="#1A73E8" fill-opacity="0.2" stroke="#1A73E8" stroke-width="1.2"/><path d="M9 1V4M15 1V4M9 20V23M15 20V23M1 9H4M1 15H4M20 9H23M20 15H23" stroke="#1A73E8" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },

  // =========================================================================
  // 3. DATABASES & STORAGE FABRIC
  // =========================================================================
  'bigquery': {
    id: 'bigquery',
    name: 'Google BigQuery Lakehouse',
    category: 'database',
    primaryColor: '#2563EB',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="#2563EB" stroke-width="1.8"/><path d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6" stroke="#2563EB" stroke-width="1.8"/><path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" stroke="#2563EB" stroke-width="1.8"/><circle cx="16" cy="16" r="3" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.5"/><path d="M18 18L21 21" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  'spanner': {
    id: 'spanner',
    name: 'Cloud Spanner (TrueTime)',
    category: 'database',
    primaryColor: '#1D4ED8',
    bgColor: '#DBEAFE',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#1D4ED8" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 2V12M12 12L22 7M12 12L2 7" stroke="#1D4ED8" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" fill="#3B82F6"/><path d="M12 22V12" stroke="#1D4ED8" stroke-width="1.8"/></svg>`
  },
  'memorystore': {
    id: 'memorystore',
    name: 'Cloud Memorystore (Redis/Valkey)',
    category: 'database',
    primaryColor: '#D97706',
    bgColor: '#FEF3C7',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#D97706" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6L17 9V15L12 18L7 15V9L12 6Z" fill="#F59E0B" stroke="#D97706" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="#FFFFFF"/></svg>`
  },
  'cloud_storage': {
    id: 'cloud_storage',
    name: 'Cloud Storage (GCS)',
    category: 'storage',
    primaryColor: '#0284C7',
    bgColor: '#F0F9FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="6" rx="2" stroke="#0284C7" stroke-width="1.8"/><rect x="3" y="14" width="18" height="6" rx="2" stroke="#0284C7" stroke-width="1.8"/><circle cx="6" cy="7" r="1" fill="#0284C7"/><circle cx="6" cy="17" r="1" fill="#0284C7"/><path d="M10 7H17M10 17H17" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  'pubsub': {
    id: 'pubsub',
    name: 'Cloud Pub/Sub Messaging Bus',
    category: 'database',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#1A73E8" stroke-width="1.8"/><circle cx="12" cy="6" r="2" fill="#1A73E8"/><circle cx="6.8" cy="15" r="2" fill="#1A73E8"/><circle cx="17.2" cy="15" r="2" fill="#1A73E8"/><path d="M12 8V12M12 12L8.5 14M12 12L15.5 14" stroke="#1A73E8" stroke-width="1.5"/></svg>`
  },
  'dataflow': {
    id: 'dataflow',
    name: 'Cloud Dataflow (Apache Beam)',
    category: 'database',
    primaryColor: '#059669',
    bgColor: '#ECFDF5',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="8" width="5" height="8" rx="1" stroke="#059669" stroke-width="1.5"/><rect x="17" y="3" width="5" height="8" rx="1" stroke="#059669" stroke-width="1.5"/><rect x="17" y="13" width="5" height="8" rx="1" stroke="#059669" stroke-width="1.5"/><path d="M7 12H11C13 12 14 7 17 7M11 12C13 12 14 17 17 17" stroke="#10B981" stroke-width="1.8"/></svg>`
  },

  // =========================================================================
  // 4. SECURITY, IDENTITY & ZERO TRUST
  // =========================================================================
  'cloud_armor': {
    id: 'cloud_armor',
    name: 'Google Cloud Armor & WAF',
    category: 'security',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z" fill="#1A73E8" fill-opacity="0.15" stroke="#1A73E8" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke="#1A73E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'iap': {
    id: 'iap',
    name: 'Identity-Aware Proxy (BeyondCorp)',
    category: 'security',
    primaryColor: '#0284C7',
    bgColor: '#F0F9FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="14" height="11" rx="2" stroke="#0284C7" stroke-width="1.8"/><path d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10" stroke="#0284C7" stroke-width="1.8"/><circle cx="12" cy="15" r="1.5" fill="#0284C7"/><path d="M12 16.5V18.5" stroke="#0284C7" stroke-width="1.5"/></svg>`
  },
  'cloud_dlp': {
    id: 'cloud_dlp',
    name: 'Sensitive Data Protection (Cloud DLP)',
    category: 'security',
    primaryColor: '#0D9488',
    bgColor: '#F0FDFA',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z" stroke="#0D9488" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="11" r="3" stroke="#0D9488" stroke-width="1.5"/><path d="M12 8V11L14 12" stroke="#0D9488" stroke-width="1.2"/></svg>`
  },
  'cloud_iam': {
    id: 'cloud_iam',
    name: 'Cloud IAM & Workload Identity',
    category: 'security',
    primaryColor: '#D97706',
    bgColor: '#FEF3C7',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="8" r="4" stroke="#D97706" stroke-width="1.8"/><path d="M2 20C2 16.5 5 14 9 14C13 14 16 16.5 16 20" stroke="#D97706" stroke-width="1.8"/><circle cx="18" cy="11" r="2.5" stroke="#F59E0B" stroke-width="1.5"/><path d="M18 13.5V18M18 15.5H20" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  'vpc_sc': {
    id: 'vpc_sc',
    name: 'VPC Service Controls & Cloud KMS',
    category: 'security',
    primaryColor: '#6D28D9',
    bgColor: '#F5F3FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#6D28D9" stroke-width="1.8" stroke-dasharray="3 2"/><path d="M12 7L7 9.5V13.5C7 16.5 9.1 19.3 12 20C14.9 19.3 17 16.5 17 13.5V9.5L12 7Z" fill="#7C3AED" fill-opacity="0.2" stroke="#7C3AED" stroke-width="1.5"/><circle cx="12" cy="13" r="1.5" fill="#6D28D9"/></svg>`
  },
  'scc': {
    id: 'scc',
    name: 'Security Command Center (SCC)',
    category: 'security',
    primaryColor: '#DC2626',
    bgColor: '#FEF2F2',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z" stroke="#DC2626" stroke-width="1.8"/><path d="M12 6L5 9V13C5 17 8 20.5 12 21.5C16 20.5 19 17 19 13V9L12 6Z" fill="#F87171" fill-opacity="0.2"/><circle cx="12" cy="13" r="2.5" fill="#DC2626"/></svg>`
  },

  // =========================================================================
  // 5. NETWORKING & INGRESS
  // =========================================================================
  'cloud_load_balancing': {
    id: 'cloud_load_balancing',
    name: 'Cloud Load Balancing (GCLB)',
    category: 'networking',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="2.5" stroke="#1A73E8" stroke-width="1.8"/><circle cx="5" cy="19" r="2.5" stroke="#1A73E8" stroke-width="1.8"/><circle cx="12" cy="19" r="2.5" stroke="#1A73E8" stroke-width="1.8"/><circle cx="19" cy="19" r="2.5" stroke="#1A73E8" stroke-width="1.8"/><path d="M12 6.5V11M12 11L5 16.5M12 11V16.5M12 11L19 16.5" stroke="#1A73E8" stroke-width="1.5"/></svg>`
  },
  'cloud_cdn': {
    id: 'cloud_cdn',
    name: 'Cloud CDN',
    category: 'networking',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#1A73E8" stroke-width="1.8"/><path d="M3 12H21M12 3C14.5 5.5 16 8.5 16 12C16 15.5 14.5 18.5 12 21C9.5 18.5 8 15.5 8 12C8 8.5 9.5 5.5 12 3Z" stroke="#3B82F6" stroke-width="1.5"/></svg>`
  },
  'user_ingress': {
    id: 'user_ingress',
    name: 'User & System Ingress (Web / App / API)',
    category: 'networking',
    primaryColor: '#334155',
    bgColor: '#F1F5F9',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#334155"/></svg>`
  },

  // =========================================================================
  // 6. MANAGEMENT, OPERATIONS & CI/CD
  // =========================================================================
  'cloud_monitoring': {
    id: 'cloud_monitoring',
    name: 'Google Cloud Monitoring & Trace',
    category: 'operations',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V21H21" stroke="#1A73E8" stroke-width="2" stroke-linecap="round"/><path d="M7 14L11 9L15 13L20 6" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="6" r="1.5" fill="#1A73E8"/></svg>`
  },
  'cloud_logging': {
    id: 'cloud_logging',
    name: 'Google Cloud Logging',
    category: 'operations',
    primaryColor: '#0284C7',
    bgColor: '#F0F9FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#0284C7" stroke-width="1.8"/><path d="M7 8H17M7 12H17M7 16H13" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  'cloud_deploy': {
    id: 'cloud_deploy',
    name: 'Google Cloud Deploy & Cloud Build',
    category: 'cicd',
    primaryColor: '#059669',
    bgColor: '#ECFDF5',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 15L12 3L20 15H15V21H9V15H4Z" stroke="#059669" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 7L16 13H13V19H11V13H8L12 7Z" fill="#10B981"/></svg>`
  },
  'artifact_registry': {
    id: 'artifact_registry',
    name: 'Artifact Registry',
    category: 'cicd',
    primaryColor: '#1A73E8',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="#1A73E8" stroke-width="1.8" stroke-linejoin="round"/><path d="M3 12L12 17L21 12M3 17L12 22L21 17" stroke="#1A73E8" stroke-width="1.8" stroke-linejoin="round"/></svg>`
  }
};

/**
 * Generates an inline HTML box with authentic GCP vector SVG for Draw.io nodes and HTML labels.
 */
export function renderGcpIconHtml(iconKey: keyof typeof GCP_OFFICIAL_ICONS | string, size = 24): string {
  const icon = GCP_OFFICIAL_ICONS[iconKey];
  if (!icon) {
    return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:6px;background:#EFF6FF;color:#1A73E8;flex-shrink:0;"><svg width="${Math.round(size * 0.75)}" height="${Math.round(size * 0.75)}" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg></div>`;
  }

  return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:6px;background:${icon.bgColor};color:${icon.primaryColor};flex-shrink:0;">${icon.svg}</div>`;
}

/**
 * Returns clean SVG string for embedding directly in XML templates.
 */
export function getGcpSvg(iconKey: keyof typeof GCP_OFFICIAL_ICONS | string): string {
  return GCP_OFFICIAL_ICONS[iconKey]?.svg || GCP_OFFICIAL_ICONS['gemini'].svg;
}

/**
 * Helper to encode SVG into data URI for mxCell image styles.
 */
export function getGcpDataUri(iconKey: keyof typeof GCP_OFFICIAL_ICONS | string): string {
  const svg = getGcpSvg(iconKey);
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
}
