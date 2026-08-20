'use client';

import React from 'react';
import RawDiagramViewer from './DiagramViewerRenderSafe';
import {
  BLUEPRINT_KNOWLEDGE_MATRIX,
  getBlueprintMetadataById,
} from '@/lib/blueprintKnowledgeMatrix';
import { getTemplateTitle, normalizeArchitectureId } from '@/lib/architectureTypes';

type DiagramViewerProps = React.ComponentProps<typeof RawDiagramViewer>;

const NOTATION_SENSITIVE_IDS = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance',
]);

function FlowLegend({ notationSensitive, dark }: { notationSensitive: boolean; dark: boolean }) {
  const textClass = dark ? 'text-slate-300' : 'text-slate-600';
  if (notationSensitive) {
    return (
      <div className={`flex items-center gap-3 text-[10px] font-semibold ${textClass}`}>
        <span className="whitespace-nowrap">Notation-native connectors preserved</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 text-[10px] font-semibold ${textClass}`}>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="inline-block h-0.5 w-7 bg-blue-600" /> Primary / data
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="inline-block w-7 border-t-2 border-dashed border-slate-500" /> Response / async
      </span>
      <span className="hidden xl:flex items-center gap-1.5 whitespace-nowrap">
        <span className="inline-block w-7 border-t-2 border-dotted border-emerald-600" /> Governance / control
      </span>
    </div>
  );
}

function GoogleCloudMark() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label="Google Cloud aligned">
      <span className="h-2.5 w-2.5 rounded-full bg-[#4285F4]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#EA4335]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FBBC05]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#34A853]" />
    </span>
  );
}

export default function DiagramViewerVisual(props: DiagramViewerProps) {
  const rawId = String(props.diagramId || props.diagramType || '');
  const candidateId = rawId.replace(/^bp_/, '');
  const looksLikeCatalogBlueprint =
    rawId.startsWith('bp_') || /^(P\d-|IND-|ARCH-)/i.test(candidateId);
  const blueprint = looksLikeCatalogBlueprint
    ? getBlueprintMetadataById(candidateId)
    : null;

  // Keep user-created/freeform diagrams untouched. Batch 2 chrome is a catalog contract.
  if (!blueprint) {
    return <RawDiagramViewer {...props} />;
  }

  const blueprintIndex = BLUEPRINT_KNOWLEDGE_MATRIX.findIndex(
    (item) => item.combinedId === blueprint.combinedId,
  );
  const blueprintNumber = blueprintIndex >= 0 ? blueprintIndex + 1 : null;
  const normalizedArchitectureId = normalizeArchitectureId(blueprint.combinedId);
  const notationSensitive = NOTATION_SENSITIVE_IDS.has(normalizedArchitectureId);
  const dark = props.bgTheme === 'dark';

  const title = blueprint.diagramName || getTemplateTitle(blueprint.combinedId);
  const subtitle = blueprint.uiCardDesc || blueprint.phaseGoal || props.description || '';
  const capabilityPills = [
    blueprint.domain,
    blueprint.abstractionLevel,
    blueprint.stackLayer,
    blueprint.phaseName,
  ].filter((value): value is string => Boolean(value));
  const services = Array.isArray(blueprint.coreGcpServices)
    ? blueprint.coreGcpServices.slice(0, 5)
    : [];

  const shell = dark
    ? 'bg-slate-950 border-slate-700'
    : 'bg-white border-slate-300';
  const header = dark
    ? 'bg-slate-900 border-slate-700'
    : 'bg-gradient-to-r from-white via-slate-50 to-blue-50 border-slate-200';
  const footer = dark
    ? 'bg-slate-900 border-slate-700'
    : 'bg-slate-50 border-slate-200';
  const titleClass = dark ? 'text-white' : 'text-slate-950';
  const bodyClass = dark ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`w-full h-full min-h-0 flex flex-col overflow-hidden rounded-xl border shadow-xl ${shell}`}>
      <header className={`shrink-0 border-b px-3 md:px-5 py-2.5 ${header}`}>
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <GoogleCloudMark />
            {blueprintNumber && (
              <span className="shrink-0 rounded-md bg-blue-600 px-2 py-1 text-[10px] font-black tracking-wide text-white">
                {blueprintNumber} OF {BLUEPRINT_KNOWLEDGE_MATRIX.length}
              </span>
            )}
            <div className="min-w-0">
              <div className={`truncate text-sm md:text-base font-black tracking-tight ${titleClass}`}>
                {title}
              </div>
              {subtitle && (
                <div className={`hidden md:block max-w-[1100px] truncate text-[10.5px] leading-4 ${bodyClass}`}>
                  {subtitle}
                </div>
              )}
            </div>
          </div>
          <span className="hidden lg:inline-flex shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-700">
            Master Blueprint
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {capabilityPills.map((pill) => (
            <span
              key={pill}
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold ${
                dark
                  ? 'border-slate-600 bg-slate-800 text-slate-200'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <RawDiagramViewer {...props} />
      </div>

      <footer className={`shrink-0 border-t px-3 md:px-5 py-2 ${footer}`}>
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="hidden lg:flex min-w-0 items-center gap-1.5 overflow-hidden">
            <span className={`shrink-0 text-[9px] font-black uppercase tracking-wider ${bodyClass}`}>
              Core services
            </span>
            {services.map((service) => (
              <span
                key={service}
                className={`max-w-[165px] truncate rounded-md border px-2 py-1 text-[9px] font-semibold ${
                  dark
                    ? 'border-slate-700 bg-slate-950 text-slate-300'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
                title={service}
              >
                {service}
              </span>
            ))}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-4">
            <FlowLegend notationSensitive={notationSensitive} dark={dark} />
            <span className={`hidden md:flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wider ${bodyClass}`}>
              <GoogleCloudMark /> Google Cloud aligned
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
