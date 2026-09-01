'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, Sparkles, X, Building2, Zap, Shield, Cpu, Activity, Globe, Tag, Layers } from 'lucide-react';

export interface DomainOption {
  id: string;
  name: string;
  prefix?: string;
  icon?: string;
  category?: string;
  description?: string;
}

export interface PromptOption {
  id: string;
  label: string;
  prompt: string;
  domainId: string;
  domainName: string;
  category: string;
  icon: string;
  tags: string[];
}

export const EXTENDED_DOMAIN_OPTIONS: DomainOption[] = [
  { id: 'biopharma', name: 'Bio-Pharma Precision Oncology & Regulatory AI', prefix: 'NOVACURA', icon: '🧬', category: 'Life Sciences', description: 'FDA 21 CFR Part 11, GxP, Genomics, Spanner Knowledge Graph' },
  { id: 'fintech', name: 'FinTech Autonomous Wealth & High-Speed Payments', prefix: 'NEXUSFIN', icon: '💳', category: 'Financial Services', description: 'ISO 20022, sub-5ms Fraud, Spanner Double-Entry Ledger' },
  { id: 'manufacturing', name: 'Smart Manufacturing & Industrial IoT Digital Twin', prefix: 'SYNACTIVE', icon: '🏭', category: 'Industrial & IoT', description: 'SCADA, PLC Telemetry, MQTT, Digital Twin Simulation' },
  { id: 'retail', name: 'Omnichannel Retail & Intelligent Supply Chain', prefix: 'OMNIVUE', icon: '🛍️', category: 'Commerce & Logistics', description: 'Inventory Mesh, Dynamic Pricing, Event-Driven Fulfillment' },
  { id: 'saas', name: 'Enterprise SaaS Multi-Tenant Cloud Platform', prefix: 'AETHER', icon: '🏢', category: 'Enterprise Software', description: 'Tenant Sharding, SOC 2 Type II, Distributed Redis Caching' },
  { id: 'healthcare', name: 'Healthcare & Clinical EHR Interoperability (FHIR / HL7)', prefix: 'HEALTHPULSE', icon: '🩺', category: 'Life Sciences', description: 'HIPAA, HL7/FHIR Ingestion, Apigee X Medical Gateway' },
  { id: 'energy', name: 'Clean Energy, Smart Grid & Battery Storage (BESS / V2G)', prefix: 'VOLTGRID', icon: '⚡', category: 'Energy & Utilities', description: 'OCPP 2.0.1, BESS Battery Load Balancing, Microgrid V2G' },
  { id: 'automotive', name: 'Automotive & Connected Autonomous Fleet (V2X / ADAS)', prefix: 'AUTODRIVE', icon: '🚗', category: 'Mobility & Aerospace', description: 'V2X Mesh, Telematics Gateway, ADAS Computer Vision' },
  { id: 'telecom', name: 'Telecommunications & 5G Core Network Slicing (O-RAN)', prefix: 'TELCOMESH', icon: '📡', category: 'Telecommunications', description: '5G Core, O-RAN Fronthaul, MEC Low-Latency Slicing' },
  { id: 'defense', name: 'Aerospace, Defense & Mission Cloud (DO-178C / ITAR)', prefix: 'AEROSHIELD', icon: '🛡️', category: 'Mobility & Aerospace', description: 'DO-178C, ITAR Sovereign Perimeter, Disconnected Tactical Edge' },
  { id: 'cybersecurity', name: 'Zero-Trust Cybersecurity & SOC SecOps (SIEM / SOAR)', prefix: 'CYBERSHIELD', icon: '🔒', category: 'Security & Governance', description: 'Chronicle SIEM, Gemini Threat SOAR, VPC Service Perimeters' },
  { id: 'media', name: 'Media Streaming, 4K Live Transcoding & CDN Edge', prefix: 'STREAMWAVE', icon: '🎬', category: 'Media & Entertainment', description: 'Low-Latency HLS, WebRTC, Cloud CDN Edge Transcoding' },
  { id: 'govtech', name: 'GovTech & Sovereign Public Sector Cloud', prefix: 'CIVICCLOUD', icon: '🏛️', category: 'Security & Governance', description: 'FedRAMP High, CJIS Compliance, Sovereign Data Residency' },
  { id: 'supplychain', name: 'Global Supply Chain & Medallion Cold-Chain Lakehouse', prefix: 'LOGISMESH', icon: '📦', category: 'Commerce & Logistics', description: 'Cold-Chain IoT, Medallion Lakehouse, RFID Geofencing' },
  { id: 'insurtech', name: 'InsurTech Actuarial Risk Modeling & Claims Vision AI', prefix: 'INSURVUE', icon: '📑', category: 'Financial Services', description: 'Automated FNOL Claims Vision, Actuarial Monte Carlo Risk' },
  { id: 'robotics', name: 'Autonomous Robotics, Fleet Swarms & Warehouse AGVs', prefix: 'ROBOSWARM', icon: '🤖', category: 'Industrial & IoT', description: 'ROS2 Bridge, Ultra-Wideband Indoor Fleet Swarm, AGV Routing' },
];

export const EXTENDED_PROMPT_LIBRARY: PromptOption[] = [
  // Bio-Pharma & Healthcare
  {
    id: 'bio-1',
    label: 'FDA 21 CFR Part 11 Adverse Event Triage',
    prompt: 'Automated pharmacovigilance adverse event triage with Gemini 2.5 Flash reasoning, GxP audit ledgers, and human-in-the-loop safety board review.',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology',
    category: 'Life Sciences',
    icon: '🧬',
    tags: ['FDA', '21 CFR Part 11', 'GxP', 'Safety', 'Vertex AI'],
  },
  {
    id: 'bio-2',
    label: 'Clinical Genomics Knowledge Graph',
    prompt: 'Multi-hop precision oncology knowledge graph on Cloud Spanner Graph with ScaNN 768-dim vector embeddings and variant calling pipelines.',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology',
    category: 'Life Sciences',
    icon: '🔬',
    tags: ['Genomics', 'Spanner Graph', 'ScaNN', 'Variant Calling'],
  },
  {
    id: 'bio-3',
    label: 'GxP Audit Ledger & Sovereign Cloud',
    prompt: 'Sovereign GxP audit trail with Assured Workloads, immutable WORM cloud buckets, and Vertex AI grounded medical reasoning.',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology',
    category: 'Life Sciences',
    icon: '🛡️',
    tags: ['GxP', 'Assured Workloads', 'WORM', 'Sovereignty'],
  },
  {
    id: 'bio-4',
    label: 'Real-Time Patient Telemetry Stream',
    prompt: 'Sub-15ms vital sign telemetry ingestion with Dataflow CDC, BigQuery BigLake Iceberg lakehouse, and emergency alert escalation.',
    domainId: 'healthcare',
    domainName: 'Healthcare & Clinical EHR',
    category: 'Life Sciences',
    icon: '📊',
    tags: ['Telemetry', 'Dataflow', 'BigLake', 'Iceberg', 'CDC'],
  },
  {
    id: 'bio-5',
    label: 'FHIR / HL7 Clinical Interoperability Hub',
    prompt: 'Enterprise FHIR R4 and HL7 v2 clinical data exchange gateway using Apigee X, Cloud Healthcare API, and HIPAA consent tracking.',
    domainId: 'healthcare',
    domainName: 'Healthcare & Clinical EHR',
    category: 'Life Sciences',
    icon: '🩺',
    tags: ['FHIR', 'HL7', 'HIPAA', 'Apigee X', 'EHR'],
  },

  // FinTech & Banking
  {
    id: 'fin-1',
    label: 'ISO 20022 Sub-5ms Fraud Detection',
    prompt: 'High-throughput banking transaction monitoring with Flink stream clustering, sub-5ms pre-trade risk evaluation, and automated SAR filing.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'Financial Services',
    icon: '💳',
    tags: ['ISO 20022', 'Fraud Detection', 'Sub-5ms', 'Flink', 'SAR'],
  },
  {
    id: 'fin-2',
    label: 'Autonomous Wealth Portfolio Rebalancer',
    prompt: 'Multi-asset portfolio rebalancing engine with Monte Carlo simulations on Vertex AI and Cloud Spanner dual-entry ledger.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'Financial Services',
    icon: '📈',
    tags: ['Wealth', 'Portfolio', 'Monte Carlo', 'Spanner', 'Vertex'],
  },
  {
    id: 'fin-3',
    label: 'Cross-Border Real-Time Settlement Hub',
    prompt: 'Distributed FX settlement ledger with ISO 20022 XML transformation, SWIFT GPI tracking, and multi-region active-active failover.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'Financial Services',
    icon: '🌐',
    tags: ['Settlement', 'SWIFT', 'FX', 'Active-Active', 'ISO 20022'],
  },
  {
    id: 'fin-4',
    label: 'KYC & AML Graph Forensics Network',
    prompt: 'Graph-based money laundering ring detection using Cloud Spanner Graph GQL, BigQuery ML, and sanctions list screening.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'Financial Services',
    icon: '🔍',
    tags: ['AML', 'KYC', 'Spanner Graph', 'GQL', 'Sanctions'],
  },

  // Industrial, Robotics & IoT
  {
    id: 'iot-1',
    label: 'Smart Manufacturing & Industrial IoT Digital Twin',
    prompt: 'SCADA PLC MQTT telemetry ingestion with BigQuery time-series analytics, digital twin physics simulation, and automated edge dispatch.',
    domainId: 'manufacturing',
    domainName: 'Smart Manufacturing & IoT',
    category: 'Industrial & IoT',
    icon: '🏭',
    tags: ['SCADA', 'MQTT', 'Digital Twin', 'Edge Computing'],
  },
  {
    id: 'aero-3',
    label: 'Autonomous Warehouse AGV Fleet Swarm',
    prompt: 'Industrial AGV mobile robot orchestration with ultra-wideband indoor localization, collision prevention, and ROS2 bridging.',
    domainId: 'robotics',
    domainName: 'Autonomous Robotics & AGVs',
    category: 'Industrial & IoT',
    icon: '🤖',
    tags: ['Robotics', 'ROS2', 'AGV', 'Fleet Swarm', 'Indoor UWB'],
  },

  // Clean Energy & Smart Grids
  {
    id: 'energy-1',
    label: 'Smart EV Microgrid & BESS Battery Storage',
    prompt: 'Decentralized EV fast-charging network with OCPP 2.0.1, dynamic BESS battery storage load balancing, and V2G energy trading.',
    domainId: 'energy',
    domainName: 'Clean Energy & Smart Grid',
    category: 'Energy & Utilities',
    icon: '⚡',
    tags: ['EV Charging', 'OCPP 2.0.1', 'BESS', 'V2G', 'Microgrid'],
  },
  {
    id: 'energy-2',
    label: 'Renewable Solar & Wind Power Forecasting',
    prompt: 'AI-driven renewable power generation forecasting with BigQuery ML, weather radar API ingestion, and automated grid curtailment.',
    domainId: 'energy',
    domainName: 'Clean Energy & Smart Grid',
    category: 'Energy & Utilities',
    icon: '☀️',
    tags: ['Solar', 'Wind', 'BigQuery ML', 'Curtailment', 'Weather API'],
  },

  // Retail, E-Commerce & Supply Chain
  {
    id: 'retail-1',
    label: 'Omnichannel Real-Time Inventory & Order Mesh',
    prompt: 'High-speed multi-warehouse inventory allocation with Kafka Event Streams, Redis caching, and event-driven dynamic fulfillment routing.',
    domainId: 'retail',
    domainName: 'Omnichannel Retail',
    category: 'Commerce & Logistics',
    icon: '🛍️',
    tags: ['Inventory', 'Kafka', 'Redis', 'Fulfillment', 'Real-Time'],
  },
  {
    id: 'retail-2',
    label: 'Cold-Chain Pharma Logistics IoT Tracking',
    prompt: 'Global temperature-monitored vaccine distribution with cellular IoT sensors, geofencing, and automated deviation ticketing.',
    domainId: 'supplychain',
    domainName: 'Global Supply Chain & Lakehouse',
    category: 'Commerce & Logistics',
    icon: '📦',
    tags: ['Cold-Chain', 'IoT', 'Geofencing', 'Vaccine', 'Sensors'],
  },

  // Cybersecurity & Zero Trust
  {
    id: 'cyber-1',
    label: 'Zero-Trust Sovereign Security Perimeter',
    prompt: 'Assured Workloads zero-trust architecture with Workload Identity Federation, Cloud KMS HSM keys, and VPC Service Perimeters.',
    domainId: 'cybersecurity',
    domainName: 'Zero-Trust Cybersecurity',
    category: 'Security & Governance',
    icon: '🔒',
    tags: ['Zero-Trust', 'VPC Service Perimeters', 'CMEK', 'Workload Identity'],
  },
  {
    id: 'cyber-2',
    label: 'Autonomous SOC SecOps & SIEM / SOAR Hub',
    prompt: 'Real-time security telemetry ingestion with Chronicle SIEM, Gemini automated threat investigation, and SOAR response playbooks.',
    domainId: 'cybersecurity',
    domainName: 'Zero-Trust Cybersecurity',
    category: 'Security & Governance',
    icon: '🛡️',
    tags: ['Chronicle SIEM', 'SOAR', 'SecOps', 'Threat Hunting'],
  },

  // Enterprise SaaS & AI Agent Swarms
  {
    id: 'ai-1',
    label: 'Vertex AI Multi-Agent Cognitive Swarm',
    prompt: 'Multi-agent ReAct orchestration platform with Gemini 2.5 Flash, Tool-use protocols, Redis semantic cache, and ScaNN vector grounding.',
    domainId: 'saas',
    domainName: 'Enterprise SaaS Cloud Platform',
    category: 'Enterprise Software',
    icon: '🧠',
    tags: ['Multi-Agent', 'Gemini 2.5', 'Tool Protocol', 'ScaNN', 'Redis'],
  },
  {
    id: 'ai-2',
    label: 'Enterprise Multi-Tenant SaaS Sharded Engine',
    prompt: 'Enterprise SaaS platform with isolated tenant database sharding, dynamic IAM policy federation, and SOC 2 Type II audit telemetry.',
    domainId: 'saas',
    domainName: 'Enterprise SaaS Cloud Platform',
    category: 'Enterprise Software',
    icon: '🏢',
    tags: ['Multi-Tenant', 'Sharding', 'SOC 2', 'IAM Federation'],
  }
];

// =========================================================================
// PROJECT & USE CASE CURATED PRESETS & SEARCHABLE DROPDOWNS
// =========================================================================

export interface ProjectPreset {
  id: string;
  name: string;
  category: string;
  domainId: string;
  domainName: string;
  icon: string;
  description: string;
  useCases: string[];
}

export const CURATED_PROJECT_PRESETS: ProjectPreset[] = [
  // 1. Life Sciences & Bio-Pharma
  {
    id: 'proj_biopharma_clinical',
    name: 'Bio-Pharma Clinical Trials AI Platform',
    category: 'Life Sciences',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology & Regulatory AI',
    icon: '🧬',
    description: 'Precision oncology research, genomics mapping & GxP trial ledgers',
    useCases: [
      'FDA 21 CFR Part 11 Adverse Event Triage',
      'Clinical Genomics Knowledge Graph (ScaNN + Spanner Graph)',
      'GxP Multi-Region Sovereign Audit Trail (WORM Storage)',
      'Multi-Site Clinical Trial Protocol Compliance Validator'
    ]
  },
  {
    id: 'proj_biopharma_discovery',
    name: 'Molecular Discovery & Compound Screening Grid',
    category: 'Life Sciences',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology & Regulatory AI',
    icon: '🔬',
    description: 'High-throughput chemical library docking and protein modeling',
    useCases: [
      'High-Throughput Compound Vector Similarity Search',
      'AlphaFold Protein Structure Prediction Pipeline',
      'Distributed Molecular Docking Compute Grid on GKE',
      'Candidate Molecule Toxicity ML Scoring Engine'
    ]
  },

  // 2. Financial Services & FinTech
  {
    id: 'proj_fintech_wealth',
    name: 'Autonomous Wealth & Portfolio Management',
    category: 'Financial Services',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth & High-Speed Payments',
    icon: '📈',
    description: 'Algorithmic multi-asset trading, automated rebalancing & risk modeling',
    useCases: [
      'Sub-5ms Pre-Trade Fraud Detection & Risk Scoring',
      'Monte Carlo Multi-Asset Portfolio Simulation Engine',
      'Automated Tax-Loss Harvesting & Rebalancing Ledger',
      'Real-Time Market Depth & WebSocket Telemetry Stream'
    ]
  },
  {
    id: 'proj_fintech_payments',
    name: 'Global Real-Time Payments & Settlement Ledger',
    category: 'Financial Services',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth & High-Speed Payments',
    icon: '💳',
    description: 'ISO 20022 cross-border rails, Spanner double-entry & SWIFT tracking',
    useCases: [
      'ISO 20022 Cross-Border Payment Transformation Gateway',
      'Multi-Region Cloud Spanner Double-Entry Ledger',
      'SWIFT GPI Real-Time Settlement & Tracking Hub',
      'PCI-DSS Level 1 Enclave Vault & Tokenization Service'
    ]
  },

  // 3. Commerce & Logistics
  {
    id: 'proj_retail_omnichannel',
    name: 'Omnichannel Commerce & Order Orchestration',
    category: 'Commerce & Logistics',
    domainId: 'retail',
    domainName: 'Omnichannel Retail & Intelligent Supply Chain',
    icon: '🛍️',
    description: 'Real-time storefront checkout, inventory mesh & personalized recommendations',
    useCases: [
      'Real-Time Order Ingestion & Fraud Scoring Mesh',
      'Sub-Second Multi-Warehouse Inventory Reservation',
      'Vertex AI ScaNN Semantic Product Search & Recommendations',
      'Flash Sale Distributed Cart Synchronization on Memorystore'
    ]
  },
  {
    id: 'proj_retail_supplychain',
    name: 'Global Supply Chain & Cold-Chain Lakehouse',
    category: 'Commerce & Logistics',
    domainId: 'supplychain',
    domainName: 'Global Supply Chain & Medallion Cold-Chain Lakehouse',
    icon: '📦',
    description: 'IoT temperature sensors, RFID tracking & dynamic logistics routing',
    useCases: [
      'Cold-Chain IoT Cellular Telemetry & Excursion Alerting',
      'Medallion Lakehouse Cold-Chain Analytics (BigLake + Iceberg)',
      'Dynamic Carrier Rate & Multi-Leg Logistics Optimization',
      'RFID Geofence Ingestion & Automated Delivery Receipts'
    ]
  },

  // 4. Industrial & IoT
  {
    id: 'proj_mfg_digitaltwin',
    name: 'Smart Factory & Industrial IoT Digital Twin',
    category: 'Industrial & IoT',
    domainId: 'manufacturing',
    domainName: 'Smart Manufacturing & Industrial IoT Digital Twin',
    icon: '🏭',
    description: 'SCADA PLC MQTT ingestion, machine health telemetry & predictive maintenance',
    useCases: [
      'SCADA PLC Telemetry Ingestion via MQTT & Pub/Sub',
      'Machine Digital Twin Real-Time Physics Telemetry Stream',
      'Edge Computer Vision Defect QC Inspection on Cloud Run Edge',
      'Equipment Vibration Anomaly Detection & Predictive Maintenance'
    ]
  },
  {
    id: 'proj_mfg_robotics',
    name: 'Autonomous AGV & Warehouse Robotics Swarm',
    category: 'Industrial & IoT',
    domainId: 'robotics',
    domainName: 'Autonomous Robotics, Fleet Swarms & Warehouse AGVs',
    icon: '🤖',
    description: 'Ultra-wideband AGV localization, fleet collision avoidance & ROS2 dispatch',
    useCases: [
      'Ultra-Wideband Indoor AGV Fleet Localization Mesh',
      'ROS2 Industrial Mobile Robot Swarm Orchestrator',
      'Dynamic Pallet Route Optimization & Traffic Management',
      'Automated Robot Battery Depot Dispatch & Maintenance'
    ]
  },

  // 5. Enterprise Software & AI
  {
    id: 'proj_saas_multitenant',
    name: 'Enterprise Multi-Tenant Cloud Platform',
    category: 'Enterprise Software',
    domainId: 'saas',
    domainName: 'Enterprise SaaS Multi-Tenant Cloud Platform',
    icon: '🏢',
    description: 'Sharded microservices, dynamic tenant isolation & SOC 2 compliance',
    useCases: [
      'Isolated Tenant Database Sharding on Cloud SQL / Spanner',
      'Distributed Redis Semantic Caching & Multi-Region Session Mesh',
      'SOC 2 Type II Event-Driven Immutable Audit Trail',
      'Cloud Armor API Rate Limiting & Enterprise OAuth Federation'
    ]
  },
  {
    id: 'proj_saas_agents',
    name: 'Vertex AI Enterprise Agentic Copilot Swarm',
    category: 'Enterprise Software',
    domainId: 'saas',
    domainName: 'Enterprise SaaS Multi-Tenant Cloud Platform',
    icon: '🧠',
    description: 'Multi-agent ReAct tool calling, semantic prompt caching & ScaNN grounding',
    useCases: [
      'Multi-Agent ReAct Tool Orchestrator with Gemini 2.5 Flash',
      'Enterprise Knowledge Base Grounding on Vertex Vector Search',
      'Context Window Prompt Caching & Token Reduction Pipeline',
      'Enterprise Role-Based Access Control (RBAC) & PII Redaction'
    ]
  },

  // 6. Security & Governance
  {
    id: 'proj_security_soc',
    name: 'Zero-Trust Cybersecurity & SOC SecOps Platform',
    category: 'Security & Governance',
    domainId: 'cybersecurity',
    domainName: 'Zero-Trust Cybersecurity & SOC SecOps (SIEM / SOAR)',
    icon: '🔒',
    description: 'Chronicle SIEM ingestion, Gemini automated SOAR playbooks & VPC perimeters',
    useCases: [
      'Chronicle SIEM Real-Time Ingestion & Threat Graph Analysis',
      'Gemini AI SOAR Playbook Automation & Auto-Remediation',
      'VPC Service Perimeters & Zero-Trust BeyondCorp Ingress',
      'Endpoint XDR Telemetry & Behavioral Anomaly Detection'
    ]
  },
  {
    id: 'proj_security_govtech',
    name: 'Sovereign Public Sector & GovTech Cloud',
    category: 'Security & Governance',
    domainId: 'govtech',
    domainName: 'GovTech & Sovereign Public Sector Cloud',
    icon: '🏛️',
    description: 'FedRAMP High compliant citizen portal, sovereign data residency & KMS',
    useCases: [
      'FedRAMP High Identity Verification & Citizen Access Portal',
      'Cross-Agency Secure Interoperability Data Bus',
      'Citizen Form Document AI Extraction & Auto-Validation',
      'Assured Workloads Sovereign Boundary & CJIS Encryption'
    ]
  },

  // 7. Energy & Utilities
  {
    id: 'proj_energy_grid',
    name: 'Clean Energy Smart Grid & Battery Storage Mesh',
    category: 'Energy & Utilities',
    domainId: 'energy',
    domainName: 'Clean Energy, Smart Grid & Battery Storage (BESS / V2G)',
    icon: '⚡',
    description: 'OCPP 2.0.1 EV fast charging, BESS battery management & V2G trading',
    useCases: [
      'Smart Grid SCADA & OCPP 2.0.1 Fast-Charging Ingestion',
      'BESS Battery Storage Load Balancing & Peak Shaving Mesh',
      'Microgrid V2G Bidirectional Energy Trading Dispatcher',
      'AI Renewable Solar & Wind Power Generation Forecasting'
    ]
  },

  // 8. Healthcare & Clinical Interoperability
  {
    id: 'proj_healthcare_ehr',
    name: 'Clinical EHR & Health Interoperability Gateway',
    category: 'Life Sciences',
    domainId: 'healthcare',
    domainName: 'Healthcare & Clinical EHR Interoperability (FHIR / HL7)',
    icon: '🩺',
    description: 'HIPAA compliant FHIR R4 ingestion, ICU telemetry & medical imaging AI',
    useCases: [
      'FHIR R4 & HL7 v2 Clinical Ingestion Gateway on Apigee X',
      'Sub-15ms ICU Patient Telemetry Streaming on Dataflow',
      'HIPAA Medical Diagnostic Image Classification on Vertex AI',
      'Automated Insurance Prior Authorization & Clinical Rules Engine'
    ]
  }
];

// ==========================================
// 1. Searchable Dynamic Prompt Suggestions Dropdown (Blueprints)
// ==========================================
export function SearchablePromptSuggestionsDropdown({
  onSelectPrompt,
  selectedDomainId,
  isLight = false,
}: {
  onSelectPrompt: (prompt: PromptOption) => void;
  selectedDomainId?: string;
  isLight?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(EXTENDED_PROMPT_LIBRARY.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return EXTENDED_PROMPT_LIBRARY.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        p.label.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.domainName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }).sort((a, b) => {
      // Prioritize selected domain if available
      if (selectedDomainId) {
        if (a.domainId === selectedDomainId && b.domainId !== selectedDomainId) return -1;
        if (b.domainId === selectedDomainId && a.domainId !== selectedDomainId) return 1;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedDomainId]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
          isOpen ? 'ring-2 ring-teal-500 border-teal-500' : ''
        } ${
          isLight
            ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="truncate">
            {searchQuery ? `Filtering: "${searchQuery}"` : 'Select from 20+ Curated Architecture Blueprints...'}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover / Dropdown Menu - Wide & Generous with Full Names */}
      {isOpen && (
        <div
          className={`absolute left-0 w-[420px] sm:w-[500px] max-w-[94vw] top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[480px] ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-400/30'
              : 'bg-[#0F172A] border-slate-800 shadow-2xl shadow-black/80'
          }`}
        >
          {/* Search Header */}
          <div className={`p-3 border-b flex items-center gap-2.5 shrink-0 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architecture blueprints (e.g. fraud, kafka, spanner, zero-trust, rag)..."
              className={`w-full bg-transparent text-xs focus:outline-none placeholder-slate-400 ${isLight ? 'text-slate-900' : 'text-white'}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className={`px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scrollable List of Prompts with Full Multi-Line Titles & Descriptions */}
          <div className={`flex-1 overflow-y-auto p-2 space-y-2 divide-y ${
            isLight ? 'divide-slate-100' : 'divide-slate-800/60'
          }`}>
            {filteredPrompts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching blueprints found for &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredPrompts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectPrompt(item);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1.5 cursor-pointer group ${
                    isLight
                      ? 'hover:bg-teal-50/80 text-slate-800'
                      : 'hover:bg-teal-950/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold text-xs group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      <span className="text-base shrink-0">{item.icon}</span>
                      <span className="leading-snug">{item.label}</span>
                    </div>
                    {item.domainId === selectedDomainId && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0">
                        Active Domain
                      </span>
                    )}
                  </div>

                  <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed whitespace-normal break-words">
                    {item.prompt}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 mt-0.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9.5px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Searchable Enterprise Domain Flavor Dropdown
// ==========================================
export function SearchableDomainFlavorDropdown({
  selectedDomainId,
  onSelectDomain,
  isLight = false,
}: {
  selectedDomainId: string;
  onSelectDomain: (domain: DomainOption) => void;
  isLight?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeDomain = useMemo(() => {
    return (
      EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === selectedDomainId) || EXTENDED_DOMAIN_OPTIONS[0]
    );
  }, [selectedDomainId]);

  const groupedDomains = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = EXTENDED_DOMAIN_OPTIONS.filter(
      (d) =>
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        (d.prefix && d.prefix.toLowerCase().includes(q)) ||
        (d.category && d.category.toLowerCase().includes(q)) ||
        (d.description && d.description.toLowerCase().includes(q))
    );

    const groups: { [key: string]: DomainOption[] } = {};
    filtered.forEach((d) => {
      const cat = d.category || 'Other Industry Sectors';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(d);
    });
    return groups;
  }, [searchQuery]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
          isOpen ? 'ring-2 ring-teal-500 border-teal-500' : ''
        } ${
          isLight
            ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-teal-800'
            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-teal-400'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-sm shrink-0">{activeDomain.icon || '🏢'}</span>
          <span className="truncate">{activeDomain.name}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover / Dropdown Menu - Wide with Full Names */}
      {isOpen && (
        <div
          className={`absolute left-0 w-[380px] sm:w-[440px] max-w-[94vw] top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[460px] ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-400/30'
              : 'bg-[#0F172A] border-slate-800 shadow-2xl shadow-black/80'
          }`}
        >
          {/* Search Header */}
          <div className={`p-3 border-b flex items-center gap-2.5 shrink-0 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 16+ enterprise domain flavors..."
              className={`w-full bg-transparent text-xs focus:outline-none placeholder-slate-400 ${isLight ? 'text-slate-900' : 'text-white'}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grouped Domain List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {Object.keys(groupedDomains).length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching domain found for &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              Object.entries(groupedDomains).map(([category, domains]) => (
                <div key={category} className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-1">
                    <Layers className="w-3 h-3 text-teal-500" />
                    <span>{category}</span>
                  </div>

                  <div className="space-y-1 pt-0.5">
                    {domains.map((domain) => {
                      const isSelected = domain.id === selectedDomainId;
                      return (
                        <button
                          key={domain.id}
                          type="button"
                          onClick={() => {
                            onSelectDomain(domain);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? isLight
                              ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                              : 'bg-teal-950/60 text-teal-300 font-bold border border-teal-800'
                              : isLight
                              ? 'hover:bg-slate-50 text-slate-700'
                              : 'hover:bg-slate-900 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span className="text-base shrink-0 mt-0.5">{domain.icon || '🏢'}</span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold leading-snug whitespace-normal break-words">
                                {domain.name}
                              </div>
                              {domain.description && (
                                <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5 whitespace-normal break-words">
                                  {domain.description}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 mt-1">
                            {isSelected && <Check className="w-4 h-4 text-teal-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. Searchable Project Dropdown with Domain Categorization & Full Names
// ==========================================
export interface SearchableProjectDropdownProps {
  value: string;
  selectedDomainId?: string;
  onChange: (projectName: string, domainId?: string) => void;
  isLight?: boolean;
}

export function SearchableProjectDropdown({
  value,
  selectedDomainId,
  onChange,
  isLight = false,
}: SearchableProjectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const groupedProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = CURATED_PROJECT_PRESETS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.domainName.toLowerCase().includes(q) ||
        p.useCases.some((u) => u.toLowerCase().includes(q))
    );

    // Group by category, sorting selected domain's category first
    const groups: { [key: string]: ProjectPreset[] } = {};
    filtered.forEach((p) => {
      const cat = p.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });

    // Reorder so current domain's category is at the top
    const ordered: { [key: string]: ProjectPreset[] } = {};
    if (selectedDomainId) {
      const matchingDomain = EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === selectedDomainId);
      if (matchingDomain && groups[matchingDomain.category || '']) {
        ordered[`✨ Recommended for Active Domain (${matchingDomain.category})`] = groups[matchingDomain.category || ''];
      }
    }

    Object.entries(groups).forEach(([cat, list]) => {
      const matchingDomain = selectedDomainId ? EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === selectedDomainId) : null;
      if (!matchingDomain || cat !== matchingDomain.category) {
        ordered[cat] = list;
      }
    });

    return ordered;
  }, [searchQuery, selectedDomainId]);

  const handleSelect = (name: string, domainId?: string) => {
    onChange(name, domainId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const isExactMatch = CURATED_PROJECT_PRESETS.some(
    (p) => p.name.toLowerCase() === searchQuery.toLowerCase().trim()
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery('');
        }}
        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer text-left ${
          isOpen ? 'ring-2 ring-teal-500 border-teal-500' : ''
        } ${
          isLight
            ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-900'
            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-white'
        }`}
      >
        <span className="truncate">{value || 'Select or type project...'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover / Dropdown Menu - Wide with Full Names & Category Headers */}
      {isOpen && (
        <div
          className={`absolute left-0 w-[380px] sm:w-[440px] max-w-[94vw] top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[460px] ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-400/30'
              : 'bg-[#0F172A] border-slate-800 shadow-2xl shadow-black/80'
          }`}
        >
          {/* Search Header */}
          <div className={`p-3 border-b flex items-center gap-2 shrink-0 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  e.preventDefault();
                  handleSelect(searchQuery.trim());
                }
              }}
              placeholder="Search or type custom enterprise project..."
              className={`w-full bg-transparent text-xs focus:outline-none placeholder-slate-400 ${isLight ? 'text-slate-900' : 'text-white'}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Custom Create Option if Search Query is Present */}
          {searchQuery.trim() && !isExactMatch && (
            <button
              type="button"
              onClick={() => handleSelect(searchQuery.trim())}
              className={`w-full text-left px-3 py-2.5 text-xs font-bold flex items-center gap-2 border-b cursor-pointer transition-colors ${
                isLight
                  ? 'bg-teal-50 hover:bg-teal-100/70 text-teal-800 border-slate-200'
                  : 'bg-teal-950/50 hover:bg-teal-900/60 text-teal-300 border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span className="truncate">Create custom project: &ldquo;{searchQuery.trim()}&rdquo;</span>
            </button>
          )}

          {/* Grouped Preset Options List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {Object.keys(groupedProjects).length === 0 && !searchQuery.trim() ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No preset projects available.
              </div>
            ) : (
              Object.entries(groupedProjects).map(([categoryHeader, projects]) => (
                <div key={categoryHeader} className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-1">
                    <Building2 className="w-3 h-3 text-teal-500" />
                    <span>{categoryHeader}</span>
                  </div>

                  <div className="space-y-1 pt-0.5">
                    {projects.map((preset) => {
                      const isSelected = preset.name.toLowerCase() === value.toLowerCase();
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelect(preset.name, preset.domainId)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? isLight
                                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                                : 'bg-teal-950/60 text-teal-300 font-bold border border-teal-800'
                              : isLight
                              ? 'hover:bg-slate-50 text-slate-700'
                              : 'hover:bg-slate-900 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span className="text-base shrink-0 mt-0.5">{preset.icon || '📁'}</span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold leading-snug whitespace-normal break-words">
                                {preset.name}
                              </div>
                              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5 whitespace-normal break-words">
                                {preset.description}
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 mt-1">
                            {isSelected && <Check className="w-4 h-4 text-teal-500 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. Searchable Use Case Dropdown with Dynamic Project Scoping & Full Names
// ==========================================
export interface SearchableUseCaseDropdownProps {
  value: string;
  projectName?: string;
  selectedDomainId?: string;
  onChange: (useCaseName: string) => void;
  isLight?: boolean;
}

export function SearchableUseCaseDropdown({
  value,
  projectName = '',
  selectedDomainId,
  onChange,
  isLight = false,
}: SearchableUseCaseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Curated use cases grouped dynamically by project/domain
  const groupedUseCases = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    // 1. Identify matched project or domain
    const matchedProject = CURATED_PROJECT_PRESETS.find(
      (p) =>
        p.name.toLowerCase() === projectName.toLowerCase() ||
        (projectName && (p.name.toLowerCase().includes(projectName.toLowerCase()) || projectName.toLowerCase().includes(p.name.toLowerCase())))
    );

    const groups: { [key: string]: { name: string; description?: string }[] } = {};

    if (matchedProject) {
      const activeCases = matchedProject.useCases
        .filter((u) => !q || u.toLowerCase().includes(q))
        .map((u) => ({ name: u, description: `Tailored for ${matchedProject.name}` }));
      
      if (activeCases.length > 0) {
        groups[`✨ Specific Workloads for ${matchedProject.name}`] = activeCases;
      }
    } else if (selectedDomainId) {
      const domainProjects = CURATED_PROJECT_PRESETS.filter((p) => p.domainId === selectedDomainId);
      const domainCases = domainProjects
        .flatMap((p) => p.useCases.map((u) => ({ name: u, description: p.name })))
        .filter((item) => !q || item.name.toLowerCase().includes(q));
      
      if (domainCases.length > 0) {
        const domainName = EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === selectedDomainId)?.name || 'Active Domain';
        groups[`✨ Recommended for Active Domain (${domainName.split(' ')[0]})`] = domainCases;
      }
    }

    // Add all other categories
    CURATED_PROJECT_PRESETS.forEach((preset) => {
      if (matchedProject && preset.id === matchedProject.id) return;
      const catKey = `${preset.icon || '📁'} ${preset.category} — ${preset.name}`;
      const filteredCases = preset.useCases
        .filter((u) => !q || u.toLowerCase().includes(q))
        .map((u) => ({ name: u, description: preset.name }));

      if (filteredCases.length > 0) {
        groups[catKey] = filteredCases;
      }
    });

    return groups;
  }, [searchQuery, projectName, selectedDomainId]);

  const handleSelect = (name: string) => {
    onChange(name);
    setIsOpen(false);
    setSearchQuery('');
  };

  const isExactMatch = Object.values(groupedUseCases)
    .flatMap((list) => list.map((i) => i.name.toLowerCase()))
    .includes(searchQuery.toLowerCase().trim());

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery('');
        }}
        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer text-left ${
          isOpen ? 'ring-2 ring-teal-500 border-teal-500' : ''
        } ${
          isLight
            ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-900'
            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-white'
        }`}
      >
        <span className="truncate">{value || 'Select or type use case...'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover / Dropdown Menu - Wide with Full Names & Scoped Workloads */}
      {isOpen && (
        <div
          className={`absolute left-0 w-[400px] sm:w-[460px] max-w-[94vw] top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[460px] ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-400/30'
              : 'bg-[#0F172A] border-slate-800 shadow-2xl shadow-black/80'
          }`}
        >
          {/* Search Header */}
          <div className={`p-3 border-b flex items-center gap-2 shrink-0 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  e.preventDefault();
                  handleSelect(searchQuery.trim());
                }
              }}
              placeholder="Search or type custom workload use case..."
              className={`w-full bg-transparent text-xs focus:outline-none placeholder-slate-400 ${isLight ? 'text-slate-900' : 'text-white'}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Custom Create Option */}
          {searchQuery.trim() && !isExactMatch && (
            <button
              type="button"
              onClick={() => handleSelect(searchQuery.trim())}
              className={`w-full text-left px-3 py-2.5 text-xs font-bold flex items-center gap-2 border-b cursor-pointer transition-colors ${
                isLight
                  ? 'bg-teal-50 hover:bg-teal-100/70 text-teal-800 border-slate-200'
                  : 'bg-teal-950/50 hover:bg-teal-900/60 text-teal-300 border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span className="truncate">Use custom use case: &ldquo;{searchQuery.trim()}&rdquo;</span>
            </button>
          )}

          {/* Scoped and Grouped Use Cases List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {Object.keys(groupedUseCases).length === 0 && !searchQuery.trim() ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching use cases found.
              </div>
            ) : (
              Object.entries(groupedUseCases).map(([header, cases]) => (
                <div key={header} className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-1">
                    <Tag className="w-3 h-3 text-teal-500" />
                    <span>{header}</span>
                  </div>

                  <div className="space-y-1 pt-0.5">
                    {cases.map((useCase) => {
                      const isSelected = useCase.name.toLowerCase() === value.toLowerCase();
                      return (
                        <button
                          key={useCase.name}
                          type="button"
                          onClick={() => handleSelect(useCase.name)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? isLight
                                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                                : 'bg-teal-950/60 text-teal-300 font-bold border border-teal-800'
                              : isLight
                              ? 'hover:bg-slate-50 text-slate-700'
                              : 'hover:bg-slate-900 text-slate-300'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold leading-snug whitespace-normal break-words">
                              {useCase.name}
                            </div>
                            {useCase.description && (
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 whitespace-normal break-words">
                                {useCase.description}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0 mt-1">
                            {isSelected && <Check className="w-4 h-4 text-teal-500 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
