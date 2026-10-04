'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Share2,
  Copy,
  Check,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Boxes,
  X,
  Code,
  Sparkles,
} from 'lucide-react';

interface EnterpriseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  docArchetype: string;
  docMarkdown?: string;
  isLight: boolean;
}

export default function EnterpriseSyncModal({
  isOpen,
  onClose,
  projectTitle,
  docArchetype,
  docMarkdown = '',
  isLight,
}: EnterpriseSyncModalProps) {
  const [activeTab, setActiveTab] = useState<'jira' | 'confluence' | 'github' | 'webhook'>('jira');
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isSendingWebhook, setIsSendingWebhook] = useState<boolean>(false);
  const [webhookStatusMsg, setWebhookStatusMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const extractedHeadings = useMemo(() => {
    const headings: string[] = [];
    const lines = (docMarkdown || '').split('\n');
    for (const line of lines) {
      const m = line.match(/^#{1,3}\s+(.+)$/);
      if (m) {
        const clean = m[1].replace(/[*_`~]/g, '').trim();
        if (clean.length >= 4 && clean.length <= 80 && !headings.includes(clean)) {
          headings.push(clean);
        }
      }
      if (headings.length >= 8) break;
    }
    if (headings.length === 0) {
      return [
        `${projectTitle} — Core System Topology & Boundaries`,
        `${projectTitle} — Service Interfaces & API Contracts`,
        `${projectTitle} — Stateful Storage & Data Governance`,
        `${projectTitle} — Security Controls & IAM Perimeter`,
        `${projectTitle} — Observability, SLOs & Failover Readiness`,
      ];
    }
    return headings;
  }, [docMarkdown, projectTitle]);

  if (!isOpen) return null;

  const isoDate = new Date().toISOString().split('T')[0];

  // Generate Jira Epics & User Stories grounded in extracted document headings
  const jiraRows = extractedHeadings
    .map(
      (heading, idx) =>
        `| Story | ${heading} | ${idx < 2 ? 'High' : 'Medium'} | ${idx % 2 === 0 ? 5 : 3} | Verify ${heading} implementation against ${docArchetype.toUpperCase()} specification |`
    )
    .join('\n');

  const jiraPayload = `h1. [EPIC] ${projectTitle} (${docArchetype.toUpperCase()} Implementation)
*Generated Date:* ${isoDate}
*Specification Archetype:* ${docArchetype.toUpperCase()}

h2. Synchronized Epics & Stories (Derived from Active Document Sections)
|| Issue Type || Summary || Priority || Story Points || Acceptance Criteria ||
${jiraRows}
`;

  // Generate Confluence wiki format grounded in active document
  const confluencePayload = `h1. ${projectTitle} - Architecture Specification
*Document Type:* ${docArchetype.toUpperCase()} Specification
*Review Status:* DRAFT — PENDING ARCHITECTURE REVIEW BOARD (ARB) SIGN-OFF
*Export Date:* ${isoDate}

----

h2. 1. Document Sections Included
${extractedHeadings.map((h, i) => `* ${i + 1}. ${h}`).join('\n')}

h2. 2. Architectural Specification Excerpt
{code:title=Architecture Specification|theme=Midnight}
${(docMarkdown || `# ${projectTitle}`).slice(0, 1500)}${docMarkdown.length > 1500 ? '\n...' : ''}
{code}

h2. 3. Governance Review Checklist
|| Role || Reviewer || Target Date || Status ||
| Chief Architect | TBD | ${isoDate} | ( ) PENDING REVIEW |
| Security Reviewer | TBD | ${isoDate} | ( ) PENDING REVIEW |
| SRE / Operations | TBD | ${isoDate} | ( ) PENDING REVIEW |
`;

  // Generate GitHub PRD Issue template grounded in extracted document headings
  const githubChecklist = extractedHeadings.map((h) => `- [ ] Implement & verify: ${h}`).join('\n');
  const githubPayload = `---
name: "${docArchetype.toUpperCase()}: ${projectTitle}"
about: Formal architecture and product implementation tracking issue
title: "[ARCH] ${projectTitle}"
labels: ["architecture", "spec", "${docArchetype.toLowerCase()}"]
assignees: []
---

## 🎯 System Objective
Implementation of **${projectTitle}** derived from the **${docArchetype.toUpperCase()}** specification (${isoDate}).

## 📋 Section-by-Section Implementation Checklist
${githubChecklist}
`;

  const getActivePayload = () => {
    switch (activeTab) {
      case 'jira':
        return jiraPayload;
      case 'confluence':
        return confluencePayload;
      case 'github':
        return githubPayload;
      case 'webhook':
        return JSON.stringify(
          {
            project: projectTitle,
            archetype: docArchetype,
            timestamp: new Date().toISOString(),
            sections: extractedHeadings,
            specMarkdownExcerpt: (docMarkdown || '').slice(0, 800),
          },
          null,
          2
        );
      default:
        return jiraPayload;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActivePayload());
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const handleDispatchWebhook = async () => {
    const trimmed = webhookUrl.trim();
    if (!trimmed || !/^https?:\/\/[^\s]+$/i.test(trimmed) || trimmed.includes('...')) {
      setWebhookStatusMsg({
        ok: false,
        text: 'Please enter a valid http:// or https:// destination webhook URL.',
      });
      return;
    }

    setIsSendingWebhook(true);
    setWebhookStatusMsg(null);
    try {
      const response = await fetch(trimmed, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: getActivePayload(),
      });
      if (response.ok) {
        setWebhookStatusMsg({
          ok: true,
          text: `Webhook delivered (HTTP ${response.status})`,
        });
      } else {
        setWebhookStatusMsg({
          ok: false,
          text: `Endpoint returned HTTP ${response.status} (${response.statusText || 'Error'})`,
        });
      }
    } catch (err: any) {
      setWebhookStatusMsg({
        ok: false,
        text: `Webhook network error: ${err?.message || 'Unable to reach destination endpoint'}`,
      });
    } finally {
      setIsSendingWebhook(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#070A13] border-slate-800 text-white'
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black truncate max-w-md">
                  Enterprise Webhook &amp; Toolchain Export
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  Jira &bull; Confluence &bull; GitHub
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Section-Grounded Export for Jira Backlogs, Confluence Wiki, and GitHub Issue Templates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1 px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto text-xs font-bold">
          {[
            { id: 'jira', label: 'Jira Epics & Stories', icon: Boxes },
            { id: 'confluence', label: 'Confluence Wiki Page', icon: FileText },
            { id: 'github', label: 'GitHub PRD Issues', icon: Code },
            { id: 'webhook', label: 'Custom Webhook Dispatcher', icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'webhook' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-600 dark:text-sky-400 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> HTTP POST Webhook Dispatcher
                </div>
                <p>
                  Sends a live HTTP POST request with the JSON specification payload below to your configured endpoint.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">
                  Destination Webhook URL:
                </label>
                <input
                  type="url"
                  placeholder="https://hooks.slack.com/services/T000/B000/X000"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono outline-none ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">
                  Payload JSON:
                </label>
                <pre className="p-4 rounded-2xl bg-[#0B111E] text-teal-300 font-mono text-xs overflow-x-auto border border-slate-800">
                  {getActivePayload()}
                </pre>
              </div>

              <div className="flex items-center justify-between pt-2 gap-3">
                {webhookStatusMsg ? (
                  <span
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      webhookStatusMsg.ok ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {webhookStatusMsg.ok ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{webhookStatusMsg.text}</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Enter a valid endpoint URL to dispatch</span>
                )}

                <button
                  onClick={handleDispatchWebhook}
                  disabled={isSendingWebhook}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md hover:scale-[1.02] transition-transform cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingWebhook ? 'Dispatching...' : 'Dispatch Webhook Now'}</span>
                </button>
              </div>
            </div>
          ) : (
            <pre className="p-4 rounded-2xl bg-[#0B111E] text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {getActivePayload()}
            </pre>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-xs text-slate-400">
          <span>Formatted for native import into Jira, Confluence, and GitHub</span>
          <span className="font-mono text-[11px]">JSON &bull; Storage Format &bull; Markdown</span>
        </div>
      </div>
    </div>
  );
}
