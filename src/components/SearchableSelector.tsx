'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, Sparkles, X, Building2, Zap, Shield, Cpu, Activity, Globe } from 'lucide-react';

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
  { id: 'retail', name: 'Omnichannel Retail & Intelligent Supply Chain', prefix: 'OMNIVUE', icon: '🛍️', category: 'Commerce', description: 'Inventory Mesh, Dynamic Pricing, Event-Driven Fulfillment' },
  { id: 'saas', name: 'Enterprise SaaS Multi-Tenant Cloud Platform', prefix: 'AETHER', icon: '🏢', category: 'Enterprise Software', description: 'Tenant Sharding, SOC 2 Type II, Distributed Redis Caching' },
  { id: 'healthcare', name: 'Healthcare & Clinical EHR Interoperability (FHIR / HL7)', prefix: 'HEALTHPULSE', icon: '🩺', category: 'Life Sciences', description: 'HIPAA, HL7/FHIR Ingestion, Apigee X Medical Gateway' },
  { id: 'energy', name: 'Clean Energy, Smart Grid & Battery Storage (BESS / V2G)', prefix: 'VOLTGRID', icon: '⚡', category: 'Energy & Utilities', description: 'OCPP 2.0.1, BESS Battery Load Balancing, Microgrid V2G' },
  { id: 'automotive', name: 'Automotive & Connected Autonomous Fleet (V2X / ADAS)', prefix: 'AUTODRIVE', icon: '🚗', category: 'Mobility', description: 'V2X Mesh, Telematics Gateway, ADAS Computer Vision' },
  { id: 'telecom', name: 'Telecommunications & 5G Core Network Slicing (O-RAN)', prefix: 'TELCOMESH', icon: '📡', category: 'Telecommunications', description: '5G Core, O-RAN Fronthaul, MEC Low-Latency Slicing' },
  { id: 'defense', name: 'Aerospace, Defense & Mission Cloud (DO-178C / ITAR)', prefix: 'AEROSHIELD', icon: '🛡️', category: 'Aerospace & Gov', description: 'DO-178C, ITAR Sovereign Perimeter, Disconnected Tactical Edge' },
  { id: 'cybersecurity', name: 'Zero-Trust Cybersecurity & SOC SecOps (SIEM / SOAR)', prefix: 'CYBERSHIELD', icon: '🔒', category: 'Security', description: 'Chronicle SIEM, Gemini Threat SOAR, VPC Service Perimeters' },
  { id: 'media', name: 'Media Streaming, 4K Live Transcoding & CDN Edge', prefix: 'STREAMWAVE', icon: '🎬', category: 'Media & Entertainment', description: 'Low-Latency HLS, WebRTC, Cloud CDN Edge Transcoding' },
  { id: 'govtech', name: 'GovTech & Sovereign Public Sector Cloud', prefix: 'CIVICCLOUD', icon: '🏛️', category: 'Public Sector', description: 'FedRAMP High, CJIS Compliance, Sovereign Data Residency' },
  { id: 'supplychain', name: 'Global Supply Chain & Medallion Cold-Chain Lakehouse', prefix: 'LOGISMESH', icon: '📦', category: 'Logistics', description: 'Cold-Chain IoT, Medallion Lakehouse, RFID Geofencing' },
  { id: 'insurtech', name: 'InsurTech Actuarial Risk Modeling & Claims Vision AI', prefix: 'INSURVUE', icon: '📑', category: 'Insurance', description: 'Automated FNOL Claims Vision, Actuarial Monte Carlo Risk' },
  { id: 'robotics', name: 'Autonomous Robotics, Fleet Swarms & Warehouse AGVs', prefix: 'ROBOSWARM', icon: '🤖', category: 'Robotics', description: 'ROS2 Bridge, Ultra-Wideband Indoor Fleet Swarm, AGV Routing' },
];

export const EXTENDED_PROMPT_LIBRARY: PromptOption[] = [
  // Bio-Pharma & Healthcare
  {
    id: 'bio-1',
    label: 'FDA 21 CFR Part 11 Adverse Event Triage',
    prompt: 'Automated pharmacovigilance adverse event triage with Gemini 2.5 Flash reasoning, GxP audit ledgers, and human-in-the-loop safety board review.',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology',
    category: 'Bio-Pharma & Healthcare',
    icon: '🧬',
    tags: ['FDA', '21 CFR Part 11', 'GxP', 'Safety', 'Vertex AI'],
  },
  {
    id: 'bio-2',
    label: 'Clinical Genomics Knowledge Graph',
    prompt: 'Multi-hop precision oncology knowledge graph on Cloud Spanner Graph with ScaNN 768-dim vector embeddings and variant calling pipelines.',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology',
    category: 'Bio-Pharma & Healthcare',
    icon: '🔬',
    tags: ['Genomics', 'Spanner Graph', 'ScaNN', 'Variant Calling'],
  },
  {
    id: 'bio-3',
    label: 'GxP Audit Ledger & Sovereign Cloud',
    prompt: 'Sovereign GxP audit trail with Assured Workloads, immutable WORM cloud buckets, and Vertex AI grounded medical reasoning.',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology',
    category: 'Bio-Pharma & Healthcare',
    icon: '🛡️',
    tags: ['GxP', 'Assured Workloads', 'WORM', 'Sovereignty'],
  },
  {
    id: 'bio-4',
    label: 'Real-Time Patient Telemetry Stream',
    prompt: 'Sub-15ms vital sign telemetry ingestion with Dataflow CDC, BigQuery BigLake Iceberg lakehouse, and emergency alert escalation.',
    domainId: 'healthcare',
    domainName: 'Healthcare & Clinical EHR',
    category: 'Bio-Pharma & Healthcare',
    icon: '📊',
    tags: ['Telemetry', 'Dataflow', 'BigLake', 'Iceberg', 'CDC'],
  },
  {
    id: 'bio-5',
    label: 'FHIR / HL7 Clinical Interoperability Hub',
    prompt: 'Enterprise FHIR R4 and HL7 v2 clinical data exchange gateway using Apigee X, Cloud Healthcare API, and HIPAA consent tracking.',
    domainId: 'healthcare',
    domainName: 'Healthcare & Clinical EHR',
    category: 'Bio-Pharma & Healthcare',
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
    category: 'FinTech & Banking',
    icon: '💳',
    tags: ['ISO 20022', 'Fraud Detection', 'Sub-5ms', 'Flink', 'SAR'],
  },
  {
    id: 'fin-2',
    label: 'Autonomous Wealth Portfolio Rebalancer',
    prompt: 'Multi-asset portfolio rebalancing engine with Monte Carlo simulations on Vertex AI and Cloud Spanner dual-entry ledger.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'FinTech & Banking',
    icon: '📈',
    tags: ['Wealth', 'Portfolio', 'Monte Carlo', 'Spanner', 'Vertex'],
  },
  {
    id: 'fin-3',
    label: 'Cross-Border Real-Time Settlement Hub',
    prompt: 'Distributed FX settlement ledger with ISO 20022 XML transformation, SWIFT GPI tracking, and multi-region active-active failover.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'FinTech & Banking',
    icon: '🌐',
    tags: ['Settlement', 'SWIFT', 'FX', 'Active-Active', 'ISO 20022'],
  },
  {
    id: 'fin-4',
    label: 'KYC & AML Graph Forensics Network',
    prompt: 'Graph-based money laundering ring detection using Cloud Spanner Graph GQL, BigQuery ML, and sanctions list screening.',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth',
    category: 'FinTech & Banking',
    icon: '🔍',
    tags: ['AML', 'KYC', 'Spanner Graph', 'GQL', 'Sanctions'],
  },

  // Aerospace, Defense & Autonomous UTM
  {
    id: 'aero-1',
    label: 'AeroNode 5G Drone Airspace UTM',
    prompt: 'Nationwide drone delivery network with real-time 5G UTM airspace telemetry, ADS-B collision avoidance, and FAA Part 135 flight logs.',
    domainId: 'defense',
    domainName: 'Aerospace, Defense & Mission Cloud',
    category: 'Aerospace & Robotics',
    icon: '🚁',
    tags: ['Drone UTM', '5G', 'FAA Part 135', 'ADS-B', 'Telemetry'],
  },
  {
    id: 'aero-2',
    label: 'Mission-Critical Tactical Edge Defense Cloud',
    prompt: 'DO-178C and ITAR compliant tactical edge command cloud with disconnected-mode synchronization and sovereign KMS encryption.',
    domainId: 'defense',
    domainName: 'Aerospace, Defense & Mission Cloud',
    category: 'Aerospace & Robotics',
    icon: '🛡️',
    tags: ['ITAR', 'DO-178C', 'Tactical Edge', 'Defense', 'Air-Gapped'],
  },
  {
    id: 'aero-3',
    label: 'Autonomous Warehouse AGV Fleet Swarm',
    prompt: 'Industrial AGV mobile robot orchestration with ultra-wideband indoor localization, collision prevention, and ROS2 bridging.',
    domainId: 'robotics',
    domainName: 'Autonomous Robotics & AGVs',
    category: 'Aerospace & Robotics',
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
    category: 'Retail & Supply Chain',
    icon: '🛍️',
    tags: ['Inventory', 'Kafka', 'Redis', 'Fulfillment', 'Real-Time'],
  },
  {
    id: 'retail-2',
    label: 'Cold-Chain Pharma Logistics IoT Tracking',
    prompt: 'Global temperature-monitored vaccine distribution with cellular IoT sensors, geofencing, and automated deviation ticketing.',
    domainId: 'supplychain',
    domainName: 'Global Supply Chain & Lakehouse',
    category: 'Retail & Supply Chain',
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
    category: 'Cybersecurity & SecOps',
    icon: '🔒',
    tags: ['Zero-Trust', 'VPC Service Perimeters', 'CMEK', 'Workload Identity'],
  },
  {
    id: 'cyber-2',
    label: 'Autonomous SOC SecOps & SIEM / SOAR Hub',
    prompt: 'Real-time security telemetry ingestion with Chronicle SIEM, Gemini automated threat investigation, and SOAR response playbooks.',
    domainId: 'cybersecurity',
    domainName: 'Zero-Trust Cybersecurity',
    category: 'Cybersecurity & SecOps',
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
    category: 'AI & SaaS Architecture',
    icon: '🧠',
    tags: ['Multi-Agent', 'Gemini 2.5', 'Tool Protocol', 'ScaNN', 'Redis'],
  },
  {
    id: 'ai-2',
    label: 'Enterprise Multi-Tenant SaaS Sharded Engine',
    prompt: 'Enterprise SaaS platform with isolated tenant database sharding, dynamic IAM policy federation, and SOC 2 Type II audit telemetry.',
    domainId: 'saas',
    domainName: 'Enterprise SaaS Cloud Platform',
    category: 'AI & SaaS Architecture',
    icon: '🏢',
    tags: ['Multi-Tenant', 'Sharding', 'SOC 2', 'IAM Federation'],
  },
  {
    id: 'media-1',
    label: 'Global Edge CDN & 4K Live Video Transcoding',
    prompt: 'Low-latency media streaming pipeline with WebRTC ingest, Cloud Transcoder API, and 4K HLS distribution across Cloud CDN.',
    domainId: 'media',
    domainName: 'Media Streaming & CDN Edge',
    category: 'AI & SaaS Architecture',
    icon: '🎬',
    tags: ['WebRTC', 'Cloud CDN', '4K HLS', 'Transcoder API'],
  },
];

// ==========================================
// 1. Searchable Dynamic Prompt Suggestions Dropdown
// ==========================================
export function SearchablePromptSuggestionsDropdown({
  onSelectPrompt,
  isLight = false,
}: {
  onSelectPrompt: (prompt: PromptOption) => void;
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
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
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
            {searchQuery ? `Filtering: "${searchQuery}"` : 'Select from 20+ Curated Architecture Prompts...'}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover / Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[460px] ${
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
              placeholder="Search prompts (e.g. drone, fraud, fhir, kafka, spanner, zero-trust)..."
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

          {/* Scrollable List of Prompts */}
          <div className={`flex-1 overflow-y-auto p-2 space-y-1.5 divide-y ${
            isLight ? 'divide-slate-100' : 'divide-slate-800/60'
          }`}>
            {filteredPrompts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching prompts found for &ldquo;{searchQuery}&rdquo;.
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
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
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

  const filteredDomains = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return EXTENDED_DOMAIN_OPTIONS;
    return EXTENDED_DOMAIN_OPTIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        (d.prefix && d.prefix.toLowerCase().includes(q)) ||
        (d.category && d.category.toLowerCase().includes(q)) ||
        (d.description && d.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
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

      {/* Popover / Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[420px] ${
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
              placeholder="Search 16+ enterprise domain flavors (e.g. biotech, fintech, iot, defense)..."
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

          {/* Scrollable Domain List */}
          <div className={`flex-1 overflow-y-auto p-2 space-y-1.5 divide-y ${
            isLight ? 'divide-slate-100' : 'divide-slate-800/60'
          }`}>
            {filteredDomains.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching domain found for &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredDomains.map((domain) => {
                const isSelected = domain.id === selectedDomainId;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => {
                      onSelectDomain(domain);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? isLight
                        ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                        : 'bg-teal-950/60 text-teal-300 font-bold border border-teal-800'
                        : isLight
                        ? 'hover:bg-slate-50 text-slate-700'
                        : 'hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{domain.icon || '🏢'}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate flex items-center gap-2">
                          <span>{domain.name}</span>
                        </div>
                        {domain.description && (
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {domain.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-500" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
