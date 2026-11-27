'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layers, Plus } from 'lucide-react';
import Link from 'next/link';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import AppHeader, { btnClass } from '@/components/AppHeader';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { useTheme } from '@/lib/themeContext';
import ArchitectureTemplateBrowser from '@/components/ArchitectureTemplateBrowser';
import {
  ARCHITECTURE_TEMPLATE_LEVELS,
  ARCHITECTURE_TEMPLATE_TYPES,
  ArchitectureTemplateLevel,
  ArchitectureTemplateType,
} from '@/lib/templates/certifiedArchitectureTemplates';

function TemplatesBrowserWithQueryParams() {
  const searchParams = useSearchParams();

  const rawLevel = searchParams.get('level') || 'All';
  const initialLevel: 'All' | ArchitectureTemplateLevel = ARCHITECTURE_TEMPLATE_LEVELS.includes(
    rawLevel as ArchitectureTemplateLevel
  )
    ? (rawLevel as ArchitectureTemplateLevel)
    : 'All';

  const rawType = searchParams.get('type') || 'All';
  const initialType: 'All' | ArchitectureTemplateType = ARCHITECTURE_TEMPLATE_TYPES.includes(
    rawType as ArchitectureTemplateType
  )
    ? (rawType as ArchitectureTemplateType)
    : 'All';

  const initialExpanded = searchParams.get('id') || searchParams.get('template');

  return (
    <ArchitectureTemplateBrowser
      mode="page"
      initialLevel={initialLevel}
      initialType={initialType}
      initialExpandedTemplateId={initialExpanded}
    />
  );
}

export default function TemplatesPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#070a13] text-slate-100'
      }`}
    >
      <UnifiedAppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          icon={Layers}
          tone="blue"
          title="Templates"
          badge="84 Certified · 53 Tier 1 Primary · 31 Tier 2 Restyled · 4K + SVG + Draw.io"
          actions={
            <>
              <Link href="/dashboard?new=true" className={btnClass('primary')}>
                <Plus className="w-3.5 h-3.5" />
                <span>New Diagram from Template</span>
              </Link>
              <ThemeToggleBtn id="templates-theme-toggle" />
            </>
          }
        />

        <main className="flex-1 p-4 md:p-6 max-w-[1640px] w-full mx-auto space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              Enterprise Google Cloud Architecture Templates (L200–L400)
            </h2>
            <p className={`text-xs md:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Filter dynamically across <strong>Level (L200, L300, L400)</strong>, <strong>Type</strong>,{' '}
              <strong>Diagram Kind</strong>, and <strong>Use Case</strong>. Every template includes{' '}
              <strong>True 4K UHD PNG (3840×2160)</strong>, <strong>Standalone Vector SVG</strong>, and{' '}
              <strong>Native .drawio XML</strong> downloads, full-screen inspection, and 1-click isolated Diagram ID cloning.
            </p>
          </div>

          <Suspense fallback={<ArchitectureTemplateBrowser mode="page" />}>
            <TemplatesBrowserWithQueryParams />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
