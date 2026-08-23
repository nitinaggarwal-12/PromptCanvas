'use client';

import React, { useEffect } from 'react';
import { DollarSign, X, TrendingDown, Server, ShieldCheck, Cpu, Database, Cloud } from 'lucide-react';
import { CloudCostReport } from '../../lib/cost/cloudCostEstimator';

interface CloudCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  costReport: CloudCostReport | null;
}

export function CloudCostModal({ isOpen, onClose, costReport }: CloudCostModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !costReport) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-dark border border-panel-border rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-panel-border flex items-center justify-between bg-panel-dark/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-accent">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Monthly Infrastructure Cost Estimate (Infracost Engine)
              </h3>
              <p className="text-xs text-slate-400">
                Live GCP / AWS Resource Estimation for <span className="text-teal-accent font-semibold">{costReport.diagramName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-panel-border/50 bg-panel-dark/20">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-panel-border">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Monthly</span>
            <span className="text-2xl font-extrabold text-teal-accent mt-1 block">
              ${costReport.totalMonthlyCostUsd.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ mo</span>
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-panel-border">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Annual</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">
              ${costReport.totalAnnualCostUsd.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ yr</span>
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-panel-border">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cloud Ecosystem</span>
            <span className="text-base font-extrabold text-cyan-400 mt-2 block flex items-center gap-1.5">
              <Cloud className="w-4 h-4" />
              {costReport.provider} Topology ({costReport.items.length} Billable Nodes)
            </span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Granular Resource Pricing Breakdown
            </h4>
          </div>

          <div className="border border-panel-border rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-panel-dark/60 text-[11px] font-bold text-slate-400 uppercase border-b border-panel-border">
                  <th className="py-2.5 px-4">Cloud Resource</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Tier & Configuration</th>
                  <th className="py-2.5 px-4 text-right">Est. Monthly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border/40 text-xs">
                {costReport.items.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{item.resourceName}</td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-teal-300 border border-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{item.pricingTierDescription}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-accent">
                      ${item.totalMonthlyCostUsd.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cost Recommendation Alert */}
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-teal-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed">
              {costReport.savingsRecommendation}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-panel-border flex justify-end bg-panel-dark/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            Close Cost Estimator
          </button>
        </div>
      </div>
    </div>
  );
}
