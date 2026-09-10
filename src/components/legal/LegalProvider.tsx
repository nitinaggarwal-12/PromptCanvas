'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Shield, Cookie, FileText, Scale, X, Check, Sliders, ExternalLink } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | 'cookies' | null;

interface LegalContextType {
  openLegalModal: (type: LegalModalType) => void;
  closeLegalModal: () => void;
  cookieConsent: CookiePreferences;
  updateCookieConsent: (prefs: CookiePreferences) => void;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  telemetry: boolean;
  hasInteracted: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: true,
  telemetry: true,
  hasInteracted: false,
};

const LegalContext = createContext<LegalContextType>({
  openLegalModal: () => {},
  closeLegalModal: () => {},
  cookieConsent: defaultPreferences,
  updateCookieConsent: () => {},
});

export const useLegal = () => useContext(LegalContext);

export function LegalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);
  const [cookieConsent, setCookieConsent] = useState<CookiePreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('promptcanvas_cookie_consent');
      if (stored) {
        setCookieConsent(JSON.parse(stored));
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const updateCookieConsent = (prefs: CookiePreferences) => {
    const updated = { ...prefs, hasInteracted: true };
    setCookieConsent(updated);
    try {
      localStorage.setItem('promptcanvas_cookie_consent', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to persist cookie consent:', e);
    }
    setShowBanner(false);
    if (activeModal === 'cookies') {
      setActiveModal(null);
    }
  };

  const handleAcceptAll = () => {
    updateCookieConsent({
      essential: true,
      analytics: true,
      telemetry: true,
      hasInteracted: true,
    });
  };

  const handleRejectNonEssential = () => {
    updateCookieConsent({
      essential: true,
      analytics: false,
      telemetry: false,
      hasInteracted: true,
    });
  };

  return (
    <LegalContext.Provider
      value={{
        openLegalModal: (type) => setActiveModal(type),
        closeLegalModal: () => setActiveModal(null),
        cookieConsent,
        updateCookieConsent,
      }}
    >
      {children}

      {/* 1. Sleek, Compact Cookie Consent Toast (Bottom-Right, Zero Screen Obstruction) */}
      {showBanner && (
        <aside 
          aria-label="Cookie consent banner"
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-sm sm:max-w-[420px] w-[calc(100vw-24px)]"
        >
          <div className="bg-[#0B111E]/95 border border-slate-700/80 rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-xl text-slate-200 space-y-2.5">
            {/* Header Row: Icon, Title, Badge, Dismiss Button */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Cookie className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-semibold text-white truncate">
                  Privacy &amp; Cookie Preferences
                </h4>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  GDPR
                </span>
              </div>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0 cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss cookie preferences"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Concise Explanatory Text */}
            <p className="text-[11px] text-slate-400 leading-snug">
              We use telemetry tokens to optimize Draw.io rendering and secure Vertex AI sessions. No prompt data is shared with external ad networks.
            </p>

            {/* Compact Action Buttons */}
            <div className="flex items-center justify-end gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setActiveModal('cookies')}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700/80 transition flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-slate-400" />
                <span>Customize</span>
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700/80 transition cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold shadow-md shadow-blue-500/20 transition flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3 h-3" />
                <span>Accept All</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Interactive Legal Modals */}
      {activeModal && (
        <LegalModalContainer
          activeModal={activeModal}
          onClose={() => setActiveModal(null)}
          onSelectModal={(type) => setActiveModal(type)}
          cookieConsent={cookieConsent}
          onSaveCookies={updateCookieConsent}
        />
      )}
    </LegalContext.Provider>
  );
}

// ------------------------------------------------------------------------------
// Legal Modal Container & Content Views
// ------------------------------------------------------------------------------
function LegalModalContainer({
  activeModal,
  onClose,
  onSelectModal,
  cookieConsent,
  onSaveCookies,
}: {
  activeModal: LegalModalType;
  onClose: () => void;
  onSelectModal: (type: LegalModalType) => void;
  cookieConsent: CookiePreferences;
  onSaveCookies: (prefs: CookiePreferences) => void;
}) {
  const [localCookies, setLocalCookies] = useState<CookiePreferences>(cookieConsent);

  const tabs = [
    { id: 'disclaimer', label: 'AI Architecture Disclaimer', icon: Shield },
    { id: 'privacy', label: 'Privacy Policy', icon: FileText },
    { id: 'terms', label: 'Terms of Service', icon: Scale },
    { id: 'cookies', label: 'Cookie Settings', icon: Cookie },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">PromptCanvas Enterprise Trust & Legal Center</h3>
              <p className="text-[11px] text-slate-400">Compliance, Data Sovereignty, and AI Governance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-slate-800 bg-slate-900/80 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectModal(tab.id as LegalModalType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-xs leading-relaxed font-sans">
          
          {/* VIEW: DISCLAIMER */}
          {activeModal === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-1">
                <div className="font-semibold text-xs flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  AI Synthesis & Engineering Pre-Flight Notice
                </div>
                <p className="text-[11px] text-amber-200/80">
                  Diagrams, network CIDR topologies, and Living Specifications emitted by PromptCanvas are generated via multimodal generative AI (Google Vertex AI / Gemini). They serve as reference architectures and require formal review by certified Solutions Architects before deployment into production VPCs.
                </p>
              </div>

              <h4 className="text-sm font-bold text-white">1. Technical Accuracy & Cloud Quota Disclosures</h4>
              <p>
                While PromptCanvas enforces 100% collision-free geometric layout rules and authentic Google Cloud Platform iconography, live infrastructure deployments are subject to account-level GCP quota limits (e.g. TPU v5e/v5p allocations, Cloud Spanner processing units, Cloud Interconnect fiber provisioning).
              </p>

              <h4 className="text-sm font-bold text-white">2. Trademark & Google Cloud Attribution</h4>
              <p>
                Google Cloud, Google Cloud Platform, Vertex AI, Cloud Spanner, BigQuery, GKE Autopilot, and all associated service logos are trademarks of Google LLC. PromptCanvas is an independent architecture synthesis platform and is not officially operated by Google LLC.
              </p>

              <h4 className="text-sm font-bold text-white">3. Zero Liability for Deployment Incidents</h4>
              <p>
                PromptCanvas and its authors disclaim all warranties and liability for outages, cloud billing overages, or compliance breaches resulting from the direct execution of generated Terraform manifests without prior staging validation.
              </p>
            </div>
          )}

          {/* VIEW: PRIVACY POLICY */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Enterprise Privacy & Data Sovereignty Policy</h4>
              <p className="text-slate-400">Last updated: September 2026 • Governing Law: EU GDPR, CCPA, and ISO/IEC 27001</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-white text-xs">Zero Model Retraining</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Proprietary architecture prompts are NEVER used to train foundational AI models.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-white text-xs">FIPS 140-3 Encryption</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">All sessions, snapshots, and specifications encrypted at rest and in transit (TLS 1.3).</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-white text-xs">Local-First Storage</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Working diagram ASTs reside in client-side localStorage and isolated tenant boundaries.</div>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white">1. Information We Process</h4>
              <p>
                We process text prompts submitted to synthesize diagrams, user-configured architectural metadata, and telemetry tokens strictly necessary to maintain active session state and render Draw.io XML graphs.
              </p>

              <h4 className="text-sm font-bold text-white">2. Your Data Protection Rights</h4>
              <p>
                Under GDPR and CCPA, you have the right to request deletion of all locally cached session histories, export living specification artifacts (PRD, HLD, STRIDE, IaC), and restrict non-essential telemetry.
              </p>
            </div>
          )}

          {/* VIEW: TERMS OF SERVICE */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Terms of Service & Acceptable Use</h4>
              <p className="text-slate-400">Effective Date: September 2026</p>

              <h4 className="text-sm font-bold text-white">1. Intellectual Property & Artifact Ownership</h4>
              <p>
                You retain 100% full intellectual property ownership of all architecture diagrams, Draw.io XML files, Living Specification documents, and Terraform IaC manifests generated within PromptCanvas. You are free to commit, publish, and deploy these assets into commercial and open-source codebases.
              </p>

              <h4 className="text-sm font-bold text-white">2. Prohibited Uses</h4>
              <p>
                You agree not to use PromptCanvas to synthesize malicious attack vectors, circumvent cloud service rate limits, or reverse engineer proprietary safety filters.
              </p>
            </div>
          )}

          {/* VIEW: COOKIE SETTINGS */}
          {activeModal === 'cookies' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white">Granular Cookie & Telemetry Preferences</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure which data tokens are stored locally on your device.
                </p>
              </div>

              <div className="space-y-3">
                {/* Essential */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5 pr-4">
                    <div className="font-semibold text-white text-xs flex items-center gap-2">
                      Essential Core Cookies
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">Always Active</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Required to persist Draw.io XML canvas state, version timelines, and session IDs.
                    </p>
                  </div>
                  <input type="checkbox" checked disabled className="h-4 w-4 rounded accent-blue-600 opacity-60 cursor-not-allowed" />
                </div>

                {/* Analytics */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5 pr-4">
                    <div className="font-semibold text-white text-xs">Performance & Viewport Analytics</div>
                    <p className="text-[11px] text-slate-400">
                      Helps us profile Core Web Vitals and optimize rendering across ultra-wide desktop monitors.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localCookies.analytics}
                    onChange={(e) => setLocalCookies({ ...localCookies, analytics: e.target.checked })}
                    className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Telemetry */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5 pr-4">
                    <div className="font-semibold text-white text-xs">AI Architecture Compiler Telemetry</div>
                    <p className="text-[11px] text-slate-400">
                      Enables real-time prompt-to-AST token streaming and collision-free auto-healing heuristics.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localCookies.telemetry}
                    onChange={(e) => setLocalCookies({ ...localCookies, telemetry: e.target.checked })}
                    className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => onSaveCookies({ essential: true, analytics: true, telemetry: true, hasInteracted: true })}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                >
                  Enable All
                </button>
                <button
                  onClick={() => onSaveCookies(localCookies)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
          <div>© 2026 PromptCanvas. All rights reserved. Google Cloud is a trademark of Google LLC.</div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
