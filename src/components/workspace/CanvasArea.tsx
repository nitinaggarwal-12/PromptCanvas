'use client';

import React from 'react';
import DiagramViewer from '@/components/DiagramViewer';
import { AspectRatioSelector } from '@/components/AspectRatioSelector';

interface CanvasAreaProps {
  xml: string;
  diagramId?: string;
  versionId?: string;
  aspectRatioId: string;
  onAspectRatioChange: (ratioId: string, customW?: number, customH?: number) => void;
  bgTheme: 'dark' | 'light';
  useCaseName?: string;
  diagramType?: string;
  description?: string;
  customRatioW?: number;
  customRatioH?: number;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  xml,
  diagramId,
  versionId,
  aspectRatioId,
  onAspectRatioChange,
  bgTheme,
  useCaseName,
  diagramType,
  description,
  customRatioW,
  customRatioH,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#0B0F17] overflow-hidden relative">
      {/* Aspect Ratio Toolbar Header */}
      <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Aspect Ratio:</span>
          <AspectRatioSelector
            selectedRatio={aspectRatioId}
            onChangeRatio={onAspectRatioChange}
            customWidth={customRatioW}
            customHeight={customRatioH}
          />
        </div>
      </div>

      {/* Main Diagram Viewer Viewport */}
      <div className="flex-1 w-full h-full relative">
        <DiagramViewer
          xml={xml}
          diagramId={diagramId}
          versionId={versionId}
          aspectRatioId={aspectRatioId}
          bgTheme={bgTheme}
          useCaseName={useCaseName}
          diagramType={diagramType}
          description={description}
        />
      </div>
    </div>
  );
};
