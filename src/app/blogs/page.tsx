'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Newspaper,
  Sparkles,
  Copy,
  Check,
  Download,
  Printer,
  ExternalLink,
  BookOpen,
  Code2,
  Layers,
  ShieldCheck,
  Network,
  Search,
  Plus,
  Edit3,
  Save,
  FileCode,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Cpu,
  Database,
  GitBranch,
  Sliders,
  X,
  FolderOpen,
  Trash2,
} from 'lucide-react';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { AppHeader, btnClass } from '@/components/AppHeader';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  injectDomainFlavorXml,
} from '@/lib/canonical/canonicalTemplates';
import {
  OFFICIAL_ARCH_CENTER_BLUEPRINTS,
  buildOfficialArchCenterConfigForUseCase,
  compileOfficialArchCenterSvg,
  compileOfficialArchCenterDrawioXml,
} from '@/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';
import { EXTENDED_DOMAIN_OPTIONS } from '@/components/SearchableSelector';
import {
  BLOG_FORMATS,
  BlogFormatId,
  UseCaseBlogPreset,
  GeneratedUseCaseBlog,
  getAllBlogUseCasePresets,
  buildUseCasePresetFromCustomInput,
  generateBlogForUseCase,
} from '@/lib/blogs/useCaseBlogEngine';

interface SavedBlogRecord {
  id: string;
  savedAt: string;
  useCase: UseCaseBlogPreset;
  blog: GeneratedUseCaseBlog;
}

function renderFormattedMarkdownText(md: string) {
  // First split out any multi-line fenced code blocks (```lang ... ```) so \n\n inside code/mermaid is preserved
  const fencedRegex = /(```[a-zA-Z0-9_-]*\n[\s\S]*?```)/g;
  const segments = md.split(fencedRegex);

  const elements: React.ReactNode[] = [];
  let keyCounter = 0;

  for (const segment of segments) {
    if (!segment.trim()) continue;

    if (segment.startsWith('```') && segment.endsWith('```')) {
      const firstNewline = segment.indexOf('\n');
      const lang = segment.slice(3, firstNewline).trim().toLowerCase() || 'text';
      const body = segment.slice(firstNewline + 1, -3).trim();

      if (lang === 'mermaid') {
        const stepLines = body
          .split('\n')
          .map((l) => l.trim())
          .filter(
            (l) =>
              l.includes('->>') ||
              l.includes('-->>') ||
              l.includes('->') ||
              l.startsWith('participant ') ||
              l.startsWith('actor ')
          );
        const hopArrows = stepLines.filter((l) => l.includes('->>') || l.includes('-->>'));

        elements.push(
          <div
            key={`fenced-${keyCounter++}`}
            data-testid="blog-mermaid-sequence-card"
            className="my-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50/70 via-white to-teal-50/50 dark:from-indigo-950/35 dark:via-slate-900/90 dark:to-teal-950/25 p-4 md:p-5 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-indigo-200/70 dark:border-indigo-800/60">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                  5-Hop Cryptographic Context Chain — End-to-End Sequence Trace
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Mermaid Sequence Flow ({hopArrows.length} Verified Transitions)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {hopArrows.map((arrowLine, aIdx) => {
                const parts = arrowLine.split(/(-->>|->>)/);
                const fromActor = parts[0]?.trim() || 'Hop';
                const arrowType = parts[1] || '->>';
                const rest = parts.slice(2).join('').split(':');
                const toActor = rest[0]?.trim() || 'Target';
                const label = rest.slice(1).join(':').trim();
                return (
                  <div
                    key={aIdx}
                    className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex items-start gap-2.5 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#174ea6] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {aIdx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 flex-wrap">
                        <span>{fromActor}</span>
                        <span className="text-slate-400">{arrowType === '-->>' ? '⇢' : '→'}</span>
                        <span className="text-teal-600 dark:text-teal-400">{toActor}</span>
                      </div>
                      <div className="text-slate-700 dark:text-slate-200 font-medium mt-0.5 leading-snug">
                        {label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <details className="mt-3 pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50 text-xs">
              <summary className="cursor-pointer font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600">
                View Raw Mermaid Sequence Diagram Source
              </summary>
              <pre className="mt-2 p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                <code>{body}</code>
              </pre>
            </details>
          </div>
        );
        continue;
      }

      elements.push(
        <div
          key={`fenced-${keyCounter++}`}
          className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0B111E] text-slate-100"
        >
          <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-sky-400 uppercase">
            {lang}
          </div>
          <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
            <code>{body}</code>
          </pre>
        </div>
      );
      continue;
    }

    const blocks = segment.split(/\n\n+/);
    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed || trimmed === '---') continue;

      // Markdown table detection
      if (trimmed.includes('|') && trimmed.split('\n').length >= 2 && trimmed.includes('---')) {
        const lines = trimmed
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        const headerCells = lines[0]
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);
        const bodyLines = lines.slice(2);
        elements.push(
          <div
            key={`blk-${keyCounter++}`}
            className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                  {headerCells.map((hc, hIdx) => (
                    <th key={hIdx} className="py-2.5 px-3.5 font-bold">
                      {renderInlineFormatting(hc)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                {bodyLines.map((rowLine, rIdx) => {
                  const cells = rowLine
                    .split('|')
                    .map((c) => c.trim())
                    .filter(Boolean);
                  return (
                    <tr
                      key={rIdx}
                      className="bg-white dark:bg-slate-900/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2.5 px-3.5 text-slate-700 dark:text-slate-300 align-top">
                          {renderInlineFormatting(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Subheading inside markdown block (### or ####)
      if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
        elements.push(
          <h4
            key={`blk-${keyCounter++}`}
            className="text-base font-bold text-slate-900 dark:text-white mt-5 mb-2 flex items-center gap-2"
          >
            {renderInlineFormatting(trimmed.replace(/^#{3,4}\s+/, ''))}
          </h4>
        );
        continue;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`blk-${keyCounter++}`}
            className="my-3 pl-4 border-l-4 border-blue-500 bg-blue-50/60 dark:bg-blue-950/25 py-2.5 pr-4 rounded-r-xl text-sm text-slate-700 dark:text-slate-200 italic space-y-1"
          >
            {trimmed
              .split('\n')
              .map((l) => l.replace(/^>\s?/, ''))
              .map((lineText, qIdx) => (
                <div key={qIdx}>{renderInlineFormatting(lineText)}</div>
              ))}
          </blockquote>
        );
        continue;
      }

      // Bullet list or numbered list
      const lines = trimmed.split('\n');
      const isBulletList = lines.every((l) => /^(\s*[-*]\s+|\s*\d+\.\s+)/.test(l));
      if (isBulletList) {
        const isOrdered = /^\s*\d+\.\s+/.test(lines[0]);
        const ListTag = isOrdered ? 'ol' : 'ul';
        elements.push(
          <ListTag
            key={`blk-${keyCounter++}`}
            className={`my-3 space-y-2 pl-5 ${
              isOrdered ? 'list-decimal' : 'list-disc'
            } text-sm text-slate-700 dark:text-slate-300 leading-relaxed`}
          >
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^(\s*[-*]\s+|\s*\d+\.\s+)/, '');
              return (
                <li key={lIdx} className="pl-1">
                  {renderInlineFormatting(cleanLine)}
                </li>
              );
            })}
          </ListTag>
        );
        continue;
      }

      elements.push(
        <p
          key={`blk-${keyCounter++}`}
          className="my-3 text-sm md:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed"
        >
          {renderInlineFormatting(trimmed)}
        </p>
      );
    }
  }

  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Parse markdown links, bold, inline code, italics
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);
  return parts.map((part, i) => {
    if (!part) return null;
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
          <ExternalLink className="w-3 h-3 inline shrink-0" />
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono text-xs border border-slate-200 dark:border-slate-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-slate-800 dark:text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function TechnicalBlogStudioContent() {
  const searchParams = useSearchParams();
  const basePresets = useMemo(() => getAllBlogUseCasePresets(), []);

  const [customPresets, setCustomPresets] = useState<UseCaseBlogPreset[]>([]);
  const [libraryPresets, setLibraryPresets] = useState<UseCaseBlogPreset[]>([]);

  const allUseCases = useMemo(
    () => [...customPresets, ...basePresets, ...libraryPresets],
    [customPresets, basePresets, libraryPresets]
  );

  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string>('uc-multimodal-graphrag');
  const [selectedFormatId, setSelectedFormatId] = useState<BlogFormatId>('cloud-arch-center');
  const [viewMode, setViewMode] = useState<'single' | 'compare-all'>('single');
  const [activeWorkflowDiagramTab, setActiveWorkflowDiagramTab] = useState<'high-level' | 'ingestion' | 'search'>('high-level');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Author & Custom Focus state
  const [authorName, setAuthorName] = useState<string>('');
  const [authorRole, setAuthorRole] = useState<string>('');
  const [customFocusNotes, setCustomFocusNotes] = useState<string>('');
  const [showCustomBuilderModal, setShowCustomBuilderModal] = useState<boolean>(false);
  const [showSavedBlogsModal, setShowSavedBlogsModal] = useState<boolean>(false);

  // Custom Use Case Modal fields
  const [newUcTitle, setNewUcTitle] = useState<string>('');
  const [newUcPrompt, setNewUcPrompt] = useState<string>('');
  const [newUcDomainId, setNewUcDomainId] = useState<string>('biopharma');
  const [newUcFormatId, setNewUcFormatId] = useState<BlogFormatId>('cloud-arch-center');

  // Inline section override state
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionText, setEditingSectionText] = useState<string>('');
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, string>>({});
  const [aiEnhancedOverride, setAiEnhancedOverride] = useState<{
    key: string;
    tldrSummary?: string;
    introMarkdown?: string;
  } | null>(null);
  const [isEnhancingAi, setIsEnhancingAi] = useState<boolean>(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedBlogs, setSavedBlogs] = useState<SavedBlogRecord[]>([]);

  // Load query parameters (?useCase=...&format=...&title=...&prompt=...&domain=...)
  useEffect(() => {
    const qUseCase = searchParams.get('useCase');
    const qFormat = searchParams.get('format') as BlogFormatId | null;
    const qTitle = searchParams.get('title');
    const qPrompt = searchParams.get('prompt');
    const qDomain = searchParams.get('domain') || 'enterprise';
    const qTemplate = searchParams.get('template') || '51';

    if (qFormat && BLOG_FORMATS.some((f) => f.id === qFormat)) {
      setSelectedFormatId(qFormat);
    }

    if (qTitle) {
      const customId = `uc-query-${qTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 32)}`;
      const built = buildUseCasePresetFromCustomInput({
        id: customId,
        title: qTitle,
        prompt: qPrompt || qTitle,
        domainId: qDomain,
        templateId: qTemplate,
        defaultFormatId: qFormat && BLOG_FORMATS.some((f) => f.id === qFormat) ? qFormat : 'cloud-arch-center',
      });
      setCustomPresets((prev) => {
        if (prev.some((p) => p.id === customId)) return prev;
        return [built, ...prev];
      });
      setSelectedUseCaseId(customId);
    } else if (qUseCase) {
      setSelectedUseCaseId(qUseCase);
      const found = basePresets.find((p) => p.id === qUseCase);
      if (found && !qFormat) {
        setSelectedFormatId(found.defaultFormatId);
      }
    }
  }, [searchParams, basePresets]);

  // Load saved library architectures and saved blogs from localStorage / API
  useEffect(() => {
    try {
      const rawBlogs = localStorage.getItem('promptcanvas_saved_blogs');
      if (rawBlogs) {
        const parsed = JSON.parse(rawBlogs);
        if (Array.isArray(parsed)) setSavedBlogs(parsed);
      }
    } catch {}

    async function loadLibraryDiagrams() {
      const loadedPresets: UseCaseBlogPreset[] = [];
      const seenNames = new Set<string>();
      try {
        const res = await fetch('/api/diagrams');
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data?.diagrams) ? data.diagrams : Array.isArray(data) ? data : [];
          for (const item of list.slice(0, 8)) {
            const name = (item.name || item.title || '').trim();
            if (!name || seenNames.has(name.toLowerCase())) continue;
            seenNames.add(name.toLowerCase());
            const preset = buildUseCasePresetFromCustomInput({
              id: `lib-${item.id}`,
              title: name,
              prompt: item.prompt || item.description || `Production architecture for ${name}`,
              domainId: item.domain || 'enterprise',
              templateId: '51',
              defaultFormatId: 'cloud-arch-center',
            });
            preset.category = 'Saved Library';
            preset.icon = '🏛️';
            loadedPresets.push(preset);
          }
        }
      } catch {}

      if (loadedPresets.length > 0) {
        setLibraryPresets(loadedPresets);
      }
    }
    loadLibraryDiagrams();
  }, []);

  const activeUseCase = useMemo(() => {
    return allUseCases.find((u) => u.id === selectedUseCaseId) || allUseCases[0];
  }, [allUseCases, selectedUseCaseId]);

  const activeFormatMeta = useMemo(() => {
    return BLOG_FORMATS.find((f) => f.id === selectedFormatId) || BLOG_FORMATS[0];
  }, [selectedFormatId]);

  // Generate current blog deterministically & apply any inline or AI overrides
  const generatedBlog = useMemo(() => {
    const base = generateBlogForUseCase(activeUseCase, selectedFormatId, {
      authorName,
      authorRole,
      customFocusNotes,
    });
    const cacheKey = `${activeUseCase.id}::${selectedFormatId}`;
    const sectionsWithOverrides = base.sections.map((sec, idx) => {
      const overrideKey = `${cacheKey}::${sec.id}`;
      if (sectionOverrides[overrideKey] !== undefined) {
        return { ...sec, markdown: sectionOverrides[overrideKey] };
      }
      if (idx === 0 && aiEnhancedOverride?.key === cacheKey && aiEnhancedOverride.introMarkdown) {
        return { ...sec, markdown: aiEnhancedOverride.introMarkdown };
      }
      return sec;
    });

    const tldr =
      aiEnhancedOverride?.key === cacheKey && aiEnhancedOverride.tldrSummary
        ? aiEnhancedOverride.tldrSummary
        : base.tldrSummary;

    return {
      ...base,
      tldrSummary: tldr,
      subtitle: tldr,
      sections: sectionsWithOverrides,
    };
  }, [activeUseCase, selectedFormatId, authorName, authorRole, customFocusNotes, sectionOverrides, aiEnhancedOverride]);

  // Generate all 3 blogs for Compare-All mode
  const allThreeFormatBlogs = useMemo(() => {
    return BLOG_FORMATS.map((fmt) =>
      generateBlogForUseCase(activeUseCase, fmt.id, {
        authorName,
        authorRole,
        customFocusNotes,
      })
    );
  }, [activeUseCase, authorName, authorRole, customFocusNotes]);

  // Filter use cases for left rail
  const filteredUseCases = useMemo(() => {
    return allUseCases.filter((uc) => {
      const matchesCat =
        selectedCategoryFilter === 'all' ||
        (selectedCategoryFilter === 'geap-ws' && uc.isGeapWorkstreamSeries) ||
        (selectedCategoryFilter === 'featured' && uc.isFeaturedReference) ||
        (selectedCategoryFilter === 'library' && uc.category === 'Saved Library') ||
        uc.domainId === selectedCategoryFilter;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        uc.title.toLowerCase().includes(q) ||
        uc.shortLabel.toLowerCase().includes(q) ||
        uc.domainName.toLowerCase().includes(q) ||
        uc.category.toLowerCase().includes(q) ||
        uc.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [allUseCases, selectedCategoryFilter, searchQuery]);

  // Helper to resolve diagram XML for a templateId + useCase flavor
  const [customTemplateOverrideId, setCustomTemplateOverrideId] = useState<string | null>(null);
  const [archCenterVariantId, setArchCenterVariantId] = useState<string>('auto');
  const [archCenterRenderMode, setArchCenterRenderMode] = useState<'svg' | 'drawio'>('svg');

  const activeSelectorTemplateId =
    customTemplateOverrideId ||
    (activeWorkflowDiagramTab === 'high-level'
      ? activeUseCase.primaryTemplateId
      : activeWorkflowDiagramTab === 'ingestion'
      ? activeUseCase.ingestionTemplateId
      : activeUseCase.searchTemplateId);

  const isOfficialArchCenterActive = String(activeSelectorTemplateId).padStart(2, '0') === '78';

  const activeOfficialArchCenterBp = useMemo(() => {
    if (archCenterVariantId !== 'auto') {
      return (
        OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === archCenterVariantId) ||
        OFFICIAL_ARCH_CENTER_BLUEPRINTS[0]
      );
    }
    if (activeUseCase.archCenterBlueprintVariantId && activeWorkflowDiagramTab === 'high-level') {
      const matched = OFFICIAL_ARCH_CENTER_BLUEPRINTS.find(
        (b) => b.id === activeUseCase.archCenterBlueprintVariantId
      );
      if (matched) return matched;
    }
    return buildOfficialArchCenterConfigForUseCase(activeUseCase, activeWorkflowDiagramTab);
  }, [archCenterVariantId, activeUseCase, activeWorkflowDiagramTab]);

  const activeOfficialArchCenterSvg = useMemo(
    () => compileOfficialArchCenterSvg(activeOfficialArchCenterBp),
    [activeOfficialArchCenterBp]
  );

  const getFlavoredDiagramXml = (templateId: string, captionLabel: string) => {
    const paddedId = String(templateId).padStart(2, '0');
    if (paddedId === '78') {
      return compileOfficialArchCenterDrawioXml(activeOfficialArchCenterBp);
    }
    const tpl =
      CANONICAL_TEMPLATES.find(
        (t) => String(t.id) === String(templateId) || String(t.id) === paddedId
      ) || CANONICAL_TEMPLATES[0];
    if (!tpl) return '';
    let xml =
      typeof tpl.generateXml === 'function'
        ? tpl.generateXml(activeUseCase.domainId, 'light')
        : (tpl as any).xml || '';
    try {
      xml = injectDomainFlavorXml(xml, activeUseCase.domainId);
      xml = injectUseCaseFlavor(xml, `${activeUseCase.shortLabel} — ${captionLabel}`);
    } catch {}
    return xml;
  };

  const activeTemplateMeta = useMemo(() => {
    const padded = String(activeSelectorTemplateId).padStart(2, '0');
    return (
      CANONICAL_TEMPLATES.find(
        (t) => String(t.id) === String(activeSelectorTemplateId) || String(t.id) === padded
      ) || CANONICAL_TEMPLATES[0]
    );
  }, [activeSelectorTemplateId]);

  const activeSelectorXml = useMemo(
    () =>
      getFlavoredDiagramXml(
        activeSelectorTemplateId,
        activeWorkflowDiagramTab === 'high-level'
          ? 'High-Level Multi-Agent Architecture'
          : activeWorkflowDiagramTab === 'ingestion'
          ? 'Sequential Ingestion & MCP Tooling Workflow'
          : 'Hybrid GraphRAG Search & Execution Workflow'
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSelectorTemplateId, activeWorkflowDiagramTab, activeUseCase, activeOfficialArchCenterBp]
  );

  const handleSelectUseCase = (uc: UseCaseBlogPreset) => {
    setSelectedUseCaseId(uc.id);
    setSelectedFormatId(uc.defaultFormatId);
    setCustomTemplateOverrideId(null);
    setArchCenterVariantId('auto');
    setEditingSectionId(null);
  };

  const handleDownloadArchCenterFile = (ext: 'svg' | 'drawio') => {
    const content = ext === 'svg' ? activeOfficialArchCenterSvg : activeSelectorXml;
    const mime = ext === 'svg' ? 'image/svg+xml;charset=utf-8' : 'application/xml;charset=utf-8';
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeOfficialArchCenterBp.id}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const slug = activeUseCase.shortLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blob = new Blob([generatedBlog.fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}-${selectedFormatId}-blog.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadStandaloneHtml = () => {
    const slug = activeUseCase.shortLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${generatedBlog.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; background: #f8fafc; margin: 0; padding: 40px 20px; line-height: 1.65; }
    .container { max-width: 920px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 48px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05); }
    .badge { display: inline-block; background: #eff6ff; color: #1d4ed8; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 999px; border: 1px solid #bfdbfe; margin-bottom: 16px; }
    h1 { font-size: 32px; line-height: 1.25; margin: 0 0 16px; color: #0f172a; }
    h2 { font-size: 22px; margin-top: 36px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; color: #0f172a; }
    h3 { font-size: 18px; margin-top: 28px; color: #1e293b; }
    .tldr { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 20px 0 32px; font-weight: 500; color: #0c4a6e; }
    pre { background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 12px; overflow-x: auto; font-size: 13px; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .meta { font-size: 13px; color: #475569; margin-bottom: 24px; }
    .okf { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px; margin-top: 40px; }
  </style>
</head>
<body>
  <article class="container">
    <div class="badge">${generatedBlog.publicationBadge}</div>
    <h1>${generatedBlog.title}</h1>
    <div class="meta">
      By <strong>${generatedBlog.authors.map((a) => `${a.name} (${a.role})`).join(' & ')}</strong> • ${generatedBlog.publishedDate} • ${generatedBlog.readTimeMinutes} min read
    </div>
    <div class="tldr"><strong>TL;DR:</strong> ${generatedBlog.tldrSummary}</div>
    <figure style="margin: 28px 0; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; background: #f8f9fa;">
      <div style="width: 100%; overflow-x: auto;">${activeOfficialArchCenterSvg}</div>
      <figcaption style="font-size: 12px; color: #475569; margin-top: 8px; text-align: center;">
        <strong>Figure 1 (Blueprint #78):</strong> ${activeOfficialArchCenterBp.title} — ${activeOfficialArchCenterBp.subtitle}
      </figcaption>
    </figure>
    ${generatedBlog.sections
      .map(
        (sec) => `
      <h${sec.level}>${sec.heading}</h${sec.level}>
      <div>${sec.markdown.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</div>
      ${
        sec.codeBlock
          ? `<pre><code>// ${sec.codeBlock.title}\n${sec.codeBlock.code
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')}</code></pre>`
          : ''
      }
    `
      )
      .join('\n')}
    <div class="okf">
      <h3>Open Knowledge Format (OKF v0.1) Executive Synthesis</h3>
      <ul>
        <li><strong>Opportunity Space:</strong> ${generatedBlog.okfSynthesis.opportunity_space}</li>
        <li><strong>Critical Success Factor:</strong> ${generatedBlog.okfSynthesis.critical_success_factor}</li>
        <li><strong>What Happened:</strong> ${generatedBlog.okfSynthesis.what_happened}</li>
        <li><strong>Why It Happened:</strong> ${generatedBlog.okfSynthesis.why_it_happened}</li>
        <li><strong>Strategic Implication:</strong> ${generatedBlog.okfSynthesis.strategic_implication}</li>
      </ul>
    </div>
  </article>
</body>
</html>`;
    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}-${selectedFormatId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveBlogToLibrary = () => {
    const newRecord: SavedBlogRecord = {
      id: `${generatedBlog.id}-${Date.now()}`,
      savedAt: new Date().toLocaleString(),
      useCase: activeUseCase,
      blog: generatedBlog,
    };
    const updated = [newRecord, ...savedBlogs.filter((b) => b.blog.id !== generatedBlog.id)].slice(0, 30);
    setSavedBlogs(updated);
    try {
      localStorage.setItem('promptcanvas_saved_blogs', JSON.stringify(updated));
    } catch {}
    setCopiedKey('saved-blog');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleEnhanceWithGemini = async () => {
    setIsEnhancingAi(true);
    try {
      const res = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useCaseId: activeUseCase.id,
          useCaseTitle: activeUseCase.title,
          useCasePrompt: activeUseCase.summaryPrompt,
          domainId: activeUseCase.domainId,
          templateId: activeUseCase.primaryTemplateId,
          formatId: selectedFormatId,
          authorName,
          authorRole,
          customFocusNotes,
          enhanceWithAi: true,
        }),
      });
      const data = await res.json();
      if (data?.blog) {
        const cacheKey = `${activeUseCase.id}::${selectedFormatId}`;
        setAiEnhancedOverride({
          key: cacheKey,
          tldrSummary: data.blog.tldrSummary,
          introMarkdown: data.blog.sections?.[0]?.markdown,
        });
      }
    } catch {
      // Fallback already handled deterministically
    } finally {
      setIsEnhancingAi(false);
    }
  };

  const handleCreateCustomUseCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUcTitle.trim()) return;
    const customId = `uc-custom-${Date.now()}`;
    const preset = buildUseCasePresetFromCustomInput({
      id: customId,
      title: newUcTitle.trim(),
      prompt: newUcPrompt.trim() || newUcTitle.trim(),
      domainId: newUcDomainId,
      templateId: newUcDomainId === 'biopharma' ? '51' : newUcDomainId === 'cybersecurity' ? '27' : '24',
      defaultFormatId: newUcFormatId,
    });
    setCustomPresets((prev) => [preset, ...prev]);
    setSelectedUseCaseId(customId);
    setSelectedFormatId(newUcFormatId);
    setShowCustomBuilderModal(false);
    setNewUcTitle('');
    setNewUcPrompt('');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#070B14] text-slate-900 dark:text-slate-100">
      <UnifiedAppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          icon={Newspaper}
          tone="indigo"
          title="Technical Blog Studio"
          badge="USE-CASE BLOG ENGINE"
          actions={
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowCustomBuilderModal(true)}
                data-testid="new-custom-use-case-btn"
                className={btnClass('neutral')}
                title="Create a blog from any custom use case or architecture prompt"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-500" />
                <span>Custom Use Case</span>
              </button>

              <button
                onClick={handleEnhanceWithGemini}
                disabled={isEnhancingAi}
                data-testid="enhance-blog-ai-btn"
                className={btnClass('primary')}
                title="Synthesize custom executive intro & TL;DR using Gemini 3.1 Pro"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isEnhancingAi ? 'animate-spin' : ''}`} />
                <span>{isEnhancingAi ? 'Synthesizing...' : '✨ Enhance with Gemini'}</span>
              </button>

              <button
                onClick={() => handleCopyText(generatedBlog.fullMarkdown, 'full-md')}
                data-testid="copy-blog-markdown-btn"
                className={btnClass('neutral')}
              >
                {copiedKey === 'full-md' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied .MD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy .MD</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadMarkdown}
                data-testid="download-blog-md-btn"
                className={btnClass('neutral')}
                title="Download Markdown (.md)"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">.MD</span>
              </button>

              <button
                onClick={handleDownloadStandaloneHtml}
                data-testid="download-blog-html-btn"
                className={btnClass('neutral')}
                title="Download Standalone Publishable HTML (.html)"
              >
                <FileCode className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden sm:inline">.HTML</span>
              </button>

              <button
                onClick={() => window.print()}
                className={btnClass('neutral')}
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleSaveBlogToLibrary}
                data-testid="save-blog-btn"
                className={btnClass(copiedKey === 'saved-blog' ? 'success' : 'neutral')}
              >
                {copiedKey === 'saved-blog' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5 text-teal-500" />
                    <span className="hidden md:inline">Save ({savedBlogs.length})</span>
                  </>
                )}
              </button>

              {savedBlogs.length > 0 && (
                <button
                  onClick={() => setShowSavedBlogsModal(true)}
                  className={btnClass('ghost')}
                  title="View saved blogs"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          }
        />

        {/* Top Publication Format Selector Strip */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B111E]/90 px-4 md:px-8 py-3">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                Publication Style:
              </span>
              {BLOG_FORMATS.map((fmt) => {
                const isSelected = viewMode === 'single' && selectedFormatId === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    data-testid={`format-tab-${fmt.id}`}
                    onClick={() => {
                      setViewMode('single');
                      setSelectedFormatId(fmt.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : 'bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    <span>
                      {fmt.id === 'cloud-arch-center'
                        ? '1️⃣ Cloud Architecture Center'
                        : fmt.id === 'geap-fde-deep-dive'
                        ? '2️⃣ FDE 5-Hop Series (WS1–5)'
                        : fmt.id === 'developers-blog-adk'
                        ? '3️⃣ Developers Blog (Zero-Trust ADK)'
                        : '4️⃣ Cloud Blog (Partner Patterns)'}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {fmt.readTimeMinutes}m
                    </span>
                  </button>
                );
              })}

              <button
                data-testid="format-tab-compare-all"
                onClick={() => setViewMode(viewMode === 'compare-all' ? 'single' : 'compare-all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'compare-all'
                    ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                    : 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30 hover:bg-teal-500/20'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare All 4 Formats</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <a
                href={activeFormatMeta.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Reference Pattern: {activeFormatMeta.badge}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                href={`/dashboard?template=${activeUseCase.primaryTemplateId}`}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700"
              >
                <Network className="w-3.5 h-3.5 text-indigo-500" />
                <span>Open Blueprint #{activeUseCase.primaryTemplateId} in Canvas</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Workspace Split: Left Use Case Catalog + Right Interactive Blog Publication */}
        <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6">
          {/* LEFT RAIL: Use Case Selector & Bylines (3 cols on lg) */}
          <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#0D1526] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Select Use Case ({filteredUseCases.length})</span>
                </h2>
                <button
                  onClick={() => setShowCustomBuilderModal(true)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>New</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search WS1–5, GraphRAG, Zero-Trust, ADK, Biopharma..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'geap-ws', label: '🏛️ GEAP WS1–5 (5)' },
                  { id: 'featured', label: '★ Google Ref (8)' },
                  { id: 'biopharma', label: '🧬 Biopharma' },
                  { id: 'fintech', label: '🏦 FinTech' },
                  { id: 'cybersecurity', label: '🛡️ Cyber' },
                  { id: 'healthcare', label: '🏥 Health' },
                  { id: 'manufacturing', label: '🏭 Industrial' },
                  { id: 'supplychain', label: '🚢 Supply Chain' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    data-testid={`category-pill-${cat.id}`}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Use Case List */}
              <div className="max-h-[480px] overflow-y-auto space-y-2 pr-1">
                {filteredUseCases.map((uc) => {
                  const isActive = uc.id === activeUseCase.id;
                  return (
                    <button
                      key={uc.id}
                      data-testid={`usecase-item-${uc.id}`}
                      onClick={() => handleSelectUseCase(uc)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isActive
                          ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-500 shadow-xs'
                          : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug flex items-center gap-1.5">
                          <span>{uc.icon}</span>
                          <span>{uc.shortLabel}</span>
                        </span>
                        {uc.isGeapWorkstreamSeries ? (
                          <span className="shrink-0 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                            WS1–5 Series
                          </span>
                        ) : uc.isFeaturedReference ? (
                          <span className="shrink-0 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                            Ref Example
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {uc.summaryPrompt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {uc.domainName}
                        </span>
                        <span>Blueprint #{uc.primaryTemplateId}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editorial Customization Card */}
            <div className="bg-white dark:bg-[#0D1526] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Sliders className="w-3.5 h-3.5 text-teal-500" />
                <span>Editorial Bylines & Focus</span>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Lead Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={generatedBlog.authors[0]?.name || 'Nitin Aggarwal / Annie Wang'}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Author Role / Title
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder={generatedBlog.authors[0]?.role || 'Principal AI Field Deployment Engineer'}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Custom Architectural Focus Note
                  </label>
                  <textarea
                    rows={2}
                    value={customFocusNotes}
                    onChange={(e) => setCustomFocusNotes(e.target.value)}
                    placeholder="e.g., Emphasize VPC-SC air-gapped perimeters, Assured Workloads, and sub-100ms Spanner Graph traversal..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs resize-none"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN PANE: Publication Reader or 4-Way Format Comparison (9 cols on lg) */}
          <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {viewMode === 'compare-all' ? (
              <div className="space-y-6" data-testid="compare-all-formats-view">
                <div className="bg-white dark:bg-[#0D1526] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        Side-by-Side Publication Matrix
                      </span>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
                        {activeUseCase.icon} {activeUseCase.title} — All 4 Google Blog Formats
                      </h1>
                    </div>
                    <button
                      onClick={() => setViewMode('single')}
                      className={btnClass('primary')}
                    >
                      Return to Full Single-Format Reader
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {allThreeFormatBlogs.map((b, idx) => {
                      const fmt = BLOG_FORMATS[idx];
                      return (
                        <div
                          key={b.id}
                          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 flex flex-col justify-between gap-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                {fmt.shortName}
                              </span>
                              <span className="text-xs text-slate-400 font-mono">
                                {b.readTimeMinutes} min read
                              </span>
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                              {b.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {b.tldrSummary}
                            </p>
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                              <div className="text-[11px] font-bold uppercase text-slate-400 mb-2">
                                Included Sections ({b.sections.length})
                              </div>
                              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                {b.sections.map((s, sIdx) => (
                                  <li key={s.id} className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                      {sIdx + 1}. {s.heading}
                                      {s.codeBlock ? ` [${s.codeBlock.language.toUpperCase()}]` : ''}
                                      {s.embeddedDiagram ? ` [Diagram #${s.embeddedDiagram.templateId}]` : ''}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                            <a
                              href={fmt.referenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1"
                            >
                              <span>Reference URL</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              onClick={() => {
                                setSelectedFormatId(fmt.id);
                                setViewMode('single');
                              }}
                              className={btnClass('primary')}
                            >
                              Open Full Blog →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* SINGLE BLOG PUBLICATION READER & INTERACTIVE ARCHITECTURAL WORKBENCH */
              <article
                data-testid="blog-article-container"
                className="bg-white dark:bg-[#0D1526] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden"
              >
                {/* Publication Top Banner */}
                <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white px-6 md:px-10 py-8 border-b border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        data-testid="blog-publication-badge"
                        className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30"
                      >
                        {activeFormatMeta.publication}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {activeUseCase.domainName}
                      </span>
                    </div>
                    <a
                      href={generatedBlog.referenceInspirationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="blog-reference-inspiration-link"
                      className="text-xs font-semibold text-sky-300 hover:text-sky-200 underline inline-flex items-center gap-1"
                    >
                      <span>Modeled on: {activeFormatMeta.badge}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h1
                    data-testid="blog-headline"
                    className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight"
                  >
                    {generatedBlog.title}
                  </h1>

                  <p className="mt-3 text-sm md:text-base text-slate-300 max-w-4xl leading-relaxed">
                    {generatedBlog.subtitle}
                  </p>

                  {/* Bylines & Metadata Bar */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                    <div className="flex items-center gap-4 flex-wrap">
                      {generatedBlog.authors.map((auth, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center font-bold text-indigo-200">
                            {auth.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{auth.name}</div>
                            <div className="text-[11px] text-slate-400">{auth.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 font-mono">
                        {generatedBlog.publishedDate} • {generatedBlog.readTimeMinutes} min read
                      </span>
                      {generatedBlog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body Content Container */}
                <div className="p-6 md:p-10 space-y-8">
                  {/* Structured 3-Pillar Executive Summary (Problem • Solution • Outcome) & YAML Frontmatter */}
                  <div
                    data-testid="blog-structured-tldr-box"
                    className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/70 p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Executive Summary & Architectural TL;DR (Problem • Solution • Outcome)</span>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                        STATUS: PUBLISH_READY • 10/10 Breach Gates PASS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs md:text-[13px]">
                      <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-rose-200/80 dark:border-rose-900/50">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                          1. The Production Problem
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.tldrStructured.problem}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-blue-200/80 dark:border-blue-900/50">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                          2. The 5-Hop Hub-and-Spoke Solution
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.tldrStructured.solution}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-900/50">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                          3. Verified FinOps & Security Outcome
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.tldrStructured.outcome}
                        </p>
                      </div>
                    </div>

                    <details className="text-xs pt-1 border-t border-blue-200/60 dark:border-blue-800/60">
                      <summary className="cursor-pointer font-bold text-blue-700 dark:text-blue-300 hover:underline">
                        View Publication YAML Frontmatter & Canonical Diagram Asset Manifest
                      </summary>
                      <pre className="mt-2 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                        <code>{generatedBlog.yamlFrontmatter}</code>
                      </pre>
                    </details>
                  </div>

                  {/* Interactive 3-Tab Multi-Workflow Architecture Selector + 78-Blueprint Picker */}
                  <div
                    data-testid="interactive-architecture-selector"
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 overflow-hidden"
                  >
                    <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-col gap-3">
                      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Network className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                            Interactive Architecture Selector:
                          </span>
                          <span
                            data-testid="active-blueprint-title-badge"
                            className="px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-500/30"
                          >
                            Blueprint #{activeTemplateMeta?.id} — {activeTemplateMeta?.name} ({activeTemplateMeta?.family})
                          </span>
                        </div>

                        {/* Direct 78-Blueprint Template Picker */}
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="blog-blueprint-template-select"
                            className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0"
                          >
                            Choose Template (78):
                          </label>
                          <select
                            id="blog-blueprint-template-select"
                            data-testid="blog-blueprint-template-select"
                            value={String(activeSelectorTemplateId).padStart(2, '0')}
                            onChange={(e) => setCustomTemplateOverrideId(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[320px] truncate cursor-pointer"
                          >
                            {CANONICAL_TEMPLATES.map((t) => (
                              <option key={t.id} value={t.id}>
                                #{t.id} • {t.name} [{t.family}]
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 3 Workflow Tabs + Quick Featured Blueprint Chips */}
                      <div className="flex items-center justify-between gap-2 flex-wrap pt-1 border-t border-slate-200/70 dark:border-slate-700/70">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {[
                            {
                              id: 'high-level' as const,
                              label: `1️⃣ High-Level Topology (#${activeUseCase.primaryTemplateId})`,
                            },
                            {
                              id: 'ingestion' as const,
                              label: `2️⃣ Data Ingestion / MCP Flow (#${activeUseCase.ingestionTemplateId})`,
                            },
                            {
                              id: 'search' as const,
                              label: `3️⃣ Hybrid GraphRAG & Action Flow (#${activeUseCase.searchTemplateId})`,
                            },
                          ].map((tab) => {
                            const isTabActive = !customTemplateOverrideId && activeWorkflowDiagramTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                data-testid={`workflow-diagram-tab-${tab.id}`}
                                onClick={() => {
                                  setCustomTemplateOverrideId(null);
                                  setActiveWorkflowDiagramTab(tab.id);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isTabActive
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                                }`}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">
                            Quick Styles:
                          </span>
                          {[
                            { id: '78', label: '#78 Official Arch Center Hub-Spoke' },
                            { id: '67', label: '#67 7-Layer Icons' },
                            { id: '68', label: '#68 Zero-Trust KMS' },
                            { id: '24', label: '#24 GraphRAG Flow' },
                            { id: '25', label: '#25 MCP/A2A Protocol' },
                            { id: '40', label: '#40 Multi-Agent Platform' },
                            { id: '76', label: '#76 Whiteboard Sketch' },
                            { id: '72', label: '#72 Dark WBS Flow' },
                          ].map((chip) => {
                            const isChipActive =
                              String(activeSelectorTemplateId).padStart(2, '0') === chip.id;
                            return (
                              <button
                                key={chip.id}
                                data-testid={`quick-template-chip-${chip.id}`}
                                onClick={() => setCustomTemplateOverrideId(chip.id)}
                                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                  isChipActive
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-500/20'
                                }`}
                              >
                                {chip.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Official Google Cloud Architecture Center Hub-and-Spoke Variant & Renderer Bar (#78) */}
                      {isOfficialArchCenterActive && (
                        <div
                          data-testid="official-arch-center-variant-bar"
                          className="pt-2 border-t border-blue-300/60 dark:border-blue-800/60 flex flex-col xl:flex-row xl:items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 mr-1">
                              Google Cloud Arch Center Blueprints:
                            </span>
                            <button
                              data-testid="arch-center-variant-auto"
                              onClick={() => setArchCenterVariantId('auto')}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                archCenterVariantId === 'auto'
                                  ? 'bg-[#1a73e8] text-white shadow-xs'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-blue-400'
                              }`}
                            >
                              ✨ Use-Case Adapted (#78)
                            </button>
                            {[
                              { id: 'ws1-multi-tenant-taxonomy-overview', label: '🏛️ WS1.1 Multi-Tenant Taxonomy' },
                              { id: 'ws1-cloud-arch-center-5hop-baseline', label: '🔗 WS1.3 5-Hop Context Chain' },
                              { id: 'ws2-pattern-a-pooled-5hop-architecture', label: '🟡 WS2.1 Pattern A: Pooled 5-Hop' },
                              { id: 'ws2-pattern-a-breach-defense-sequence', label: '🛡️ WS2.5 10-Point Breach Defense' },
                              { id: 'ws3-pattern-b-sovereign-silos-architecture', label: '🔴 WS3.1 Pattern B: Sovereign Silos' },
                              { id: 'ws4-pattern-c-hybrid-psc-and-migration', label: '🌐 WS4.1 Pattern C: Hybrid PSC' },
                              { id: 'ws5-decision-tree-and-agentic-triad', label: '🧭 WS5 Capstone Decision Tree' },
                            ].map((v) => {
                              const isActive = archCenterVariantId === v.id;
                              return (
                                <button
                                  key={v.id}
                                  data-testid={`arch-center-variant-${v.id}`}
                                  onClick={() => setArchCenterVariantId(v.id)}
                                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                    isActive
                                      ? 'bg-[#1a73e8] text-white shadow-xs'
                                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-blue-400'
                                  }`}
                                >
                                  {v.label}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5">
                              <button
                                data-testid="arch-center-mode-svg"
                                onClick={() => setArchCenterRenderMode('svg')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                                  archCenterRenderMode === 'svg'
                                    ? 'bg-[#1a73e8] text-white'
                                    : 'text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                🖼️ 1:1 Official SVG
                              </button>
                              <button
                                data-testid="arch-center-mode-drawio"
                                onClick={() => setArchCenterRenderMode('drawio')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                                  archCenterRenderMode === 'drawio'
                                    ? 'bg-[#1a73e8] text-white'
                                    : 'text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                📐 Interactive Draw.io
                              </button>
                            </div>
                            <button
                              onClick={() => handleDownloadArchCenterFile('svg')}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-blue-600" />
                              <span>.SVG</span>
                            </button>
                            <button
                              onClick={() => handleDownloadArchCenterFile('drawio')}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-indigo-600" />
                              <span>.DRAWIO</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      {isOfficialArchCenterActive && archCenterRenderMode === 'svg' ? (
                        <div
                          data-testid="blog-diagram-canvas-box"
                          className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#f8f9fa] flex items-center justify-center p-2"
                        >
                          <div
                            data-testid="official-arch-center-svg-wrapper"
                            className="w-full max-w-[1100px] mx-auto [&>svg]:w-full [&>svg]:h-auto [&>svg]:block"
                            dangerouslySetInnerHTML={{ __html: activeOfficialArchCenterSvg }}
                          />
                        </div>
                      ) : (
                        <div
                          data-testid="blog-diagram-canvas-box"
                          className="h-[640px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080D1A]"
                        >
                          <DiagramViewerRenderSafe xml={activeSelectorXml} />
                        </div>
                      )}
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
                        <span>
                          <strong>
                            Figure (Blueprint #{activeTemplateMeta?.id} —{' '}
                            {isOfficialArchCenterActive
                              ? `${activeOfficialArchCenterBp.title} ${activeOfficialArchCenterBp.subtitle}`
                              : activeTemplateMeta?.name}
                            ):
                          </strong>{' '}
                          {activeTemplateMeta?.primaryPurpose}
                        </span>
                        <Link
                          href={`/dashboard?template=${activeSelectorTemplateId}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold inline-flex items-center gap-1 shrink-0"
                        >
                          <span>Edit Blueprint #{activeTemplateMeta?.id} in Design Canvas</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Agent Roster & MCP Tooling Strip */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/40 dark:bg-slate-900/30">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-teal-500" />
                        <span>Multi-Agent Orchestration Topology & Registered MCP Tools</span>
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        Root Coordinator: {activeUseCase.rootAgentName}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {activeUseCase.subAgents.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                                {sIdx + 1}. {sub.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono">
                                ADK Sub-Agent
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                              {sub.role}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800">
                            {sub.tools.map((t) => (
                              <code
                                key={t}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono"
                              >
                                {t}()
                              </code>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blog Sections */}
                  <div className="space-y-8 divide-y divide-slate-200 dark:divide-slate-800/80">
                    {generatedBlog.sections.map((sec, idx) => {
                      const overrideKey = `${activeUseCase.id}::${selectedFormatId}::${sec.id}`;
                      const isEditing = editingSectionId === sec.id;

                      return (
                        <section key={sec.id} id={sec.id} className={idx > 0 ? 'pt-8' : ''}>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            {sec.level === 2 ? (
                              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                {sec.heading}
                              </h2>
                            ) : (
                              <h3 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-slate-100">
                                {sec.heading}
                              </h3>
                            )}

                            <button
                              onClick={() => {
                                if (isEditing) {
                                  setEditingSectionId(null);
                                } else {
                                  setEditingSectionId(sec.id);
                                  setEditingSectionText(sec.markdown);
                                }
                              }}
                              className="text-xs font-semibold text-slate-400 hover:text-indigo-500 inline-flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isEditing ? 'Cancel' : 'Edit Section'}</span>
                            </button>
                          </div>

                          {/* Inline Section Editor */}
                          {isEditing ? (
                            <div className="my-3 space-y-2 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-indigo-500/40">
                              <textarea
                                rows={7}
                                value={editingSectionText}
                                onChange={(e) => setEditingSectionText(e.target.value)}
                                className="w-full p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs md:text-sm font-mono"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setEditingSectionId(null)}
                                  className={btnClass('neutral')}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    setSectionOverrides((prev) => ({
                                      ...prev,
                                      [overrideKey]: editingSectionText,
                                    }));
                                    setEditingSectionId(null);
                                  }}
                                  className={btnClass('primary')}
                                >
                                  Save Section Changes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>{renderFormattedMarkdownText(sec.markdown)}</div>
                          )}

                          {/* Runnable Code Block */}
                          {sec.codeBlock && (
                            <div className="my-5 rounded-xl overflow-hidden border border-slate-800 bg-[#0B111E] text-slate-100 shadow-sm">
                              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="font-bold">{sec.codeBlock.title}</span>
                                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] uppercase text-sky-400">
                                    {sec.codeBlock.language}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleCopyText(sec.codeBlock!.code, `code-${sec.id}`)}
                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 inline-flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedKey === `code-${sec.id}` ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy Code</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="p-4 text-xs md:text-[13px] font-mono overflow-x-auto leading-relaxed text-slate-200">
                                <code>{sec.codeBlock.code}</code>
                              </pre>
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>

                  {/* Open Knowledge Format (OKF v0.1) Executive Synthesis Footer */}
                  <div
                    data-testid="blog-okf-synthesis-card"
                    className="mt-10 rounded-2xl border border-teal-500/30 bg-teal-50/40 dark:bg-teal-950/20 p-6"
                  >
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          Open Knowledge Format (OKF v0.1) Executive Synthesis
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                        Verified Provenance
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                        <div className="font-bold text-teal-700 dark:text-teal-300 uppercase text-[11px] mb-1">
                          Opportunity Space
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.okfSynthesis.opportunity_space}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                        <div className="font-bold text-indigo-700 dark:text-indigo-300 uppercase text-[11px] mb-1">
                          Critical Success Factor
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.okfSynthesis.critical_success_factor}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                        <div className="font-bold text-blue-700 dark:text-blue-300 uppercase text-[11px] mb-1">
                          What Happened & Why It Happened
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.okfSynthesis.what_happened} {generatedBlog.okfSynthesis.why_it_happened}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                        <div className="font-bold text-emerald-700 dark:text-emerald-300 uppercase text-[11px] mb-1">
                          Strategic Implication
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {generatedBlog.okfSynthesis.strategic_implication}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-teal-500/20 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-400">Verified Citations:</span>
                      {generatedBlog.okfSynthesis.citations.map((url, cIdx) => (
                        <a
                          key={cIdx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                        >
                          <span>[{cIdx + 1}] {url.replace(/^https?:\/\//, '').slice(0, 48)}...</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )}
          </main>
        </div>
      </div>

      {/* Modal: Create Blog from Custom Use Case */}
      {showCustomBuilderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1526] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Generate Technical Blog from Custom Use Case
                </h3>
              </div>
              <button
                onClick={() => setShowCustomBuilderModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomUseCase} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Use Case Title *
                </label>
                <input
                  type="text"
                  required
                  value={newUcTitle}
                  onChange={(e) => setNewUcTitle(e.target.value)}
                  placeholder="e.g., Autonomous Real-Time Payment Fraud & Sanctions GraphRAG"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Enterprise Domain
                  </label>
                  <select
                    value={newUcDomainId}
                    onChange={(e) => setNewUcDomainId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    {EXTENDED_DOMAIN_OPTIONS.map((dom) => (
                      <option key={dom.id} value={dom.id}>
                        {dom.icon} {dom.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Default Blog Format
                  </label>
                  <select
                    value={newUcFormatId}
                    onChange={(e) => setNewUcFormatId(e.target.value as BlogFormatId)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    {BLOG_FORMATS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.shortName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Architecture Scope & Agent Responsibilities
                </label>
                <textarea
                  rows={4}
                  value={newUcPrompt}
                  onChange={(e) => setNewUcPrompt(e.target.value)}
                  placeholder="Describe the data sources, multi-agent workflow, security guardrails (Cloud KMS, gVisor, Model Armor), and target business outcomes..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomBuilderModal(false)}
                  className={btnClass('neutral')}
                >
                  Cancel
                </button>
                <button type="submit" className={btnClass('primary')}>
                  Generate Technical Blog →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Saved Blogs Library */}
      {showSavedBlogsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1526] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-teal-500" />
                <span>Saved Use-Case Blogs ({savedBlogs.length})</span>
              </h3>
              <button
                onClick={() => setShowSavedBlogsModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto space-y-2.5 pr-1">
              {savedBlogs.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {item.blog.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.blog.publicationBadge} • Saved {item.savedAt}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setCustomPresets((prev) =>
                          prev.some((p) => p.id === item.useCase.id) ? prev : [item.useCase, ...prev]
                        );
                        setSelectedUseCaseId(item.useCase.id);
                        setSelectedFormatId(item.blog.formatId);
                        setShowSavedBlogsModal(false);
                      }}
                      className={btnClass('primary')}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => {
                        const next = savedBlogs.filter((b) => b.id !== item.id);
                        setSavedBlogs(next);
                        try {
                          localStorage.setItem('promptcanvas_saved_blogs', JSON.stringify(next));
                        } catch {}
                      }}
                      className={btnClass('neutral')}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TechnicalBlogStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070B14] text-slate-500 text-sm">
          Loading Technical Blog Studio...
        </div>
      }
    >
      <TechnicalBlogStudioContent />
    </Suspense>
  );
}
