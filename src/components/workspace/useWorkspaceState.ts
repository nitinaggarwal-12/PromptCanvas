'use client';

import { useState, useCallback } from 'react';
import { rearrangeDiagramForAspectRatio } from '@/lib/aspectRatioLayout';

export interface Diagram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersion[];
  architecture_type?: string | null;
  is_private?: boolean | number | null;
}

export interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
  prompt?: string | null;
  ai_reasoning?: string | null;
  business_usecase?: string | null;
  technical_usecase?: string | null;
  architecture_type?: string | null;
  graph_json?: string | null;
}

export function useWorkspaceState() {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [activeDiagram, setActiveDiagram] = useState<Diagram | null>(null);
  const [activeVersion, setActiveVersion] = useState<DiagramVersion | null>(null);
  const [previewVersion, setPreviewVersion] = useState<DiagramVersion | null>(null);
  const [bgTheme, setBgTheme] = useState<'dark' | 'light'>('dark');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('16:9');
  const [customRatioW, setCustomRatioW] = useState<number>(16);
  const [customRatioH, setCustomRatioH] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'workspace' | 'gallery'>('workspace');

  const handleAspectRatioChange = useCallback(
    (ratioId: string, customW?: number, customH?: number) => {
      setSelectedAspectRatio(ratioId);
      if (customW) setCustomRatioW(customW);
      if (customH) setCustomRatioH(customH);

      const targetVersion = previewVersion || activeVersion;
      if (targetVersion && targetVersion.xml_content) {
        const reOrganizedXml = rearrangeDiagramForAspectRatio(
          targetVersion.xml_content,
          ratioId,
          customW,
          customH
        );

        if (previewVersion) {
          setPreviewVersion((prev) => (prev ? { ...prev, xml_content: reOrganizedXml } : null));
        }
        if (activeVersion) {
          setActiveVersion((prev) => (prev ? { ...prev, xml_content: reOrganizedXml } : null));
        }
      }
    },
    [previewVersion, activeVersion]
  );

  return {
    diagrams,
    setDiagrams,
    activeDiagram,
    setActiveDiagram,
    activeVersion,
    setActiveVersion,
    previewVersion,
    setPreviewVersion,
    bgTheme,
    setBgTheme,
    selectedAspectRatio,
    setSelectedAspectRatio,
    customRatioW,
    customRatioH,
    handleAspectRatioChange,
    isGenerating,
    setIsGenerating,
    activeTab,
    setActiveTab,
  };
}
