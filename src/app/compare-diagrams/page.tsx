'use client';

import React from 'react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { GCP_MULTIAGENT_CORE } from '@/lib/gcpDialectA';

export default function CompareDiagramsPage() {
  const afterXml = GCP_MULTIAGENT_CORE.generateXml(false);
  const beforeXml = afterXml
    .replace('y="35" width="180"', 'y="60" width="180"')
    .replace('y="35" width="160"', 'y="60" width="160"')
    .replace('padding:0 20px;padding-left:270px;', 'padding:0 16px;')
    .replace(
      'exitX=0.35;exitY=1;entryX=0.35;entryY=0;strokeColor=#0F5132;strokeWidth=1.75;dashed=0;verticalAlign=middle;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;',
      'exitX=0.5;exitY=1;entryX=0.5;entryY=0;strokeColor=#0F5132;strokeWidth=1.75;dashed=0;verticalAlign=middle;labelBackgroundColor=none;'
    )
    .replace(
      '<mxPoint x="-28" y="0" as="offset"/>',
      '<mxPoint x="35" y="0" as="offset"/>'
    )
    .replace(
      'exitX=0.75;exitY=0;entryX=0.75;entryY=1;strokeColor=#475569;strokeWidth=1.75;dashed=1;dashPattern=5 4;verticalAlign=middle;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;" edge="1" parent="1" source="frontend_svc" target="actor_users"><mxGeometry relative="1" as="geometry"><mxPoint x="55" y="0" as="offset"/></mxGeometry>',
      'exitX=1;exitY=0.5;entryX=0.85;entryY=1;strokeColor=#475569;strokeWidth=1.75;dashed=0;verticalAlign=middle;labelBackgroundColor=none;" edge="1" parent="1" source="frontend_svc" target="actor_users"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="380" y="245"/><mxPoint x="380" y="125"/><mxPoint x="273" y="125"/></Array><mxPoint x="0" y="-12" as="offset"/></mxGeometry>'
    );

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 p-8 flex flex-col items-center">
      {/* Header Bar */}
      <div className="w-full max-w-[2800px] text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          Architecture Geometry Healing Audit
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Multi-Agent AI System in Google Cloud — Side-by-Side Comparison
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl mx-auto">
          Isolated diagram-to-diagram visual review: Stepped Dogleg Elimination, Opaque High-Contrast Pill Badges, and Open Corridor Title Relocation.
        </p>
      </div>

      {/* 2-Column Comparison Viewport */}
      <div className="w-full max-w-[2800px] grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* BEFORE PANEL */}
        <div className="bg-[#0F172A] border-2 border-red-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-6 py-4 bg-red-950/40 border-b border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-base font-bold text-red-300">
                🔴 Before: Legacy Architecture Geometry
              </h2>
            </div>
            <span className="px-3 py-1 rounded-md bg-red-600 text-white font-black text-xs uppercase tracking-wider">
              BEFORE
            </span>
          </div>

          {/* Diagram Canvas */}
          <div className="w-full h-[760px] bg-white relative">
            <DiagramViewerRenderSafe
              xml={beforeXml}
              diagramId="gcp_multiagent_before"
              aspectRatioId="16:9"
              bgTheme="light"
              allowFullScaleScroll={false}
            />
          </div>

          {/* Annotation Checklist */}
          <div className="p-5 bg-slate-900/90 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-300">
              <span className="text-red-400 font-bold">❌</span>
              <span><strong>Stepped Dogleg Jog:</strong> "Human-in-the-loop interaction" line took an awkward 3-waypoint detour through x:380, y:245.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <span className="text-red-400 font-bold">❌</span>
              <span><strong>Header Ribbon Collision:</strong> Edge label lacked background and sliced directly over the Google Cloud title.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <span className="text-red-400 font-bold">❌</span>
              <span><strong>Cramped Channel:</strong> Top actor pods sat at y=60, leaving only 25px gap before container boundary.</span>
            </div>
          </div>
        </div>

        {/* AFTER PANEL */}
        <div className="bg-[#0F172A] border-2 border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-6 py-4 bg-emerald-950/40 border-b border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-bold text-emerald-300">
                🟢 After: Healed Production Architecture
              </h2>
            </div>
            <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-black text-xs uppercase tracking-wider">
              AFTER
            </span>
          </div>

          {/* Diagram Canvas */}
          <div className="w-full h-[760px] bg-white relative">
            <DiagramViewerRenderSafe
              xml={afterXml}
              diagramId="gcp_multiagent_after"
              aspectRatioId="16:9"
              bgTheme="light"
              allowFullScaleScroll={false}
            />
          </div>

          {/* Annotation Checklist */}
          <div className="p-5 bg-slate-900/90 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✅</span>
              <span><strong>Straight Parallel Routing:</strong> Direct point-to-point vertical line (exitX:0.75 &rarr; entryX:0.75) with zero zig-zags.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✅</span>
              <span><strong>Opaque Pill & Corridor Shift:</strong> Solid #FFFFFF pill badge + Google Cloud title shifted into 410px open space.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✅</span>
              <span><strong>50px Channel Margin:</strong> Top actor pods raised to y=35, creating generous open vertical channel for labels.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
