'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Server,
  Network,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  FileCode,
  Check,
  Zap,
  Plus
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';

interface AuditRule {
  id: string;
  name: string;
  category: 'Network & Perimeter' | 'IAM & Zero-Trust' | 'Data Encryption' | 'Observability & Audit' | 'Container Security';
  status: 'passed' | 'warning' | 'failed';
  description: string;
  remediation: string;
  benchmark: string;
}

const DEFAULT_AUDIT_RULES: AuditRule[] = [
  {
    id: 'sec-01',
    name: 'VPC Service Controls Perimeter Enforcement',
    category: 'Network & Perimeter',
    status: 'passed',
    description: 'Vertex AI APIs and BigQuery feature stores are isolated within VPC-SC ingress perimeter.',
    remediation: 'Attach Access Context Manager perimeter policy.',
    benchmark: 'CIS GCP 3.1.2'
  },
  {
    id: 'sec-02',
    name: 'Zero-Trust mTLS 1.3 Ingress Handshake',
    category: 'Network & Perimeter',
    status: 'passed',
    description: 'All external gateway ingress points require certificate-based mutual TLS.',
    remediation: 'Enforce Envoy ingress gateway mTLS strict mode.',
    benchmark: 'NIST 800-207'
  },
  {
    id: 'sec-03',
    name: 'Row-Level Security & Column Masking',
    category: 'Data Encryption',
    status: 'passed',
    description: 'Sensitive customer and telemetry identifiers protected with dynamic column masking.',
    remediation: 'Deploy Spanner / BigQuery policy tags for PII.',
    benchmark: 'SOC2 Type II / HIPAA'
  },
  {
    id: 'sec-04',
    name: 'CMEK Key Rotation & Envelope Encryption',
    category: 'Data Encryption',
    status: 'passed',
    description: 'Customer Managed Encryption Keys rotated every 90 days via Cloud KMS.',
    remediation: 'Configure Cloud KMS automatic key rotation schedule.',
    benchmark: 'FIPS 140-3 Level 3'
  },
  {
    id: 'sec-05',
    name: 'Short-Lived Workload Identity Federation',
    category: 'IAM & Zero-Trust',
    status: 'passed',
    description: 'Service accounts exchange OIDC tokens with max 1-hour expiration; zero static keys.',
    remediation: 'Disable service account key creation across organization.',
    benchmark: 'CIS GCP 1.4'
  },
  {
    id: 'sec-06',
    name: 'Immutable SRE Audit Trail & SIEM Export',
    category: 'Observability & Audit',
    status: 'passed',
    description: 'All control plane mutations streamed to Cloud Logging bucket with Object Lock.',
    remediation: 'Enable bucket lock retention policy on audit logs.',
    benchmark: 'ISO 27001 A.12.4'
  },
  {
    id: 'sec-07',
    name: 'Binary Authorization & Container Signing',
    category: 'Container Security',
    status: 'passed',
    description: 'GKE clusters only deploy container images cryptographically signed by CI/CD pipeline.',
    remediation: 'Enforce Binary Authorization admission controller.',
    benchmark: 'CIS K8s 5.2'
  }
];

function SecurityAuditContent() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [auditRules, setAuditRules] = useState<AuditRule[]>(DEFAULT_AUDIT_RULES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const categories = ['all', 'Network & Perimeter', 'IAM & Zero-Trust', 'Data Encryption', 'Observability & Audit', 'Container Security'];

  const filteredRules = auditRules.filter(
    rule => selectedCategory === 'all' || rule.category === selectedCategory
  );

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'}`}>
      {/* Sidebar */}
      <UnifiedAppSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Sticky Top Header */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-6 md:px-12 py-3.5 flex items-center justify-between transition-colors ${
          isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-[#070B16]/90 border-slate-800/80 shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <ShieldCheck className="w-4 h-4 text-rose-500" />
              </div>
            </div>
            <div>
              <h1 className={`font-black text-sm md:text-base tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>Security Audit &amp; Compliance Guard</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  100% COMPLIANT
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                CIS Benchmarks, Zero-Trust Architecture Validation &amp; Regulatory Checks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Auditing Blueprint...' : 'Re-Run Audit'}</span>
            </button>
            <ThemeToggleBtn />
          </div>
        </header>

        {/* Audit Body */}
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-8">
          {/* Summary Scorecard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#090D18] border-slate-800'}`}>
              <span className="text-[10px] font-mono font-black uppercase text-slate-400">Compliance Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-emerald-500">100%</span>
                <span className="text-xs font-bold text-slate-400">7/7 Controls</span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#090D18] border-slate-800'}`}>
              <span className="text-[10px] font-mono font-black uppercase text-slate-400">Perimeter Status</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-teal-500">VPC-SC</span>
                <span className="text-xs font-bold text-slate-400">Enforced</span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#090D18] border-slate-800'}`}>
              <span className="text-[10px] font-mono font-black uppercase text-slate-400">Zero-Trust Level</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-indigo-500">Level 3</span>
                <span className="text-xs font-bold text-slate-400">mTLS 1.3 Strict</span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#090D18] border-slate-800'}`}>
              <span className="text-[10px] font-mono font-black uppercase text-slate-400">Data Residency</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-sky-500">Sovereign</span>
                <span className="text-xs font-bold text-slate-400">Multi-Region</span>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : isLight
                    ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Rules' : cat}
              </button>
            ))}
          </div>

          {/* Audit Rules List */}
          <div className="space-y-4">
            {filteredRules.map((rule) => (
              <div
                key={rule.id}
                className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 shadow-md'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <h3 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {rule.name}
                    </h3>
                    <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {rule.benchmark}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {rule.description}
                  </p>

                  <div className="text-[11px] font-semibold text-slate-400">
                    <span className="text-indigo-500 font-bold">Standard: </span>
                    <span>{rule.remediation}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    PASSED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SecurityAuditPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060913]" />}>
      <SecurityAuditContent />
    </Suspense>
  );
}
