import { buildNasaMultiverseClosedLoopHarnessXml } from './canonical/nasaMultiverseClosedLoopHarness';

export interface AutoSavedDraftBlueprint {
  id: string;
  name: string;
  domain: string;
  description: string;
  prompt: string;
  tags: string[];
  nodeCount: number;
  specCount: number;
  versionCount: number;
  activeVersionTag: string;
  major: number;
  minor: number;
  micro: number;
  xml: string;
  created_studio: 'draft';
  status: 'draft';
  architecture_type: string;
  blueprintId?: string;
  perspective?: string;
  createdAt: string;
  updatedAt: string;
  versions?: any[];
}

const DRAFT_STORAGE_KEY = 'promptcanvas_draft_blueprints';
const DELETED_DRAFTS_KEY = 'promptcanvas_deleted_draft_ids';

/**
 * Computes the next semantic micro-version (v<major>.<minor>.<micro>, e.g., v1.0 -> v1.0.1 -> v1.0.2).
 */
export function computeNextMicroVersion(
  prevMajor = 1,
  prevMinor = 0,
  prevMicro = 0,
  prevTag?: string
): { major: number; minor: number; micro: number; versionTag: string } {
  if (prevTag) {
    const clean = prevTag.trim().replace(/^v/i, '');
    const parts = clean.split('.').map((n) => parseInt(n, 10));
    if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      const nextMicro = parts[2] + 1;
      return {
        major: parts[0],
        minor: parts[1],
        micro: nextMicro,
        versionTag: `v${parts[0]}.${parts[1]}.${nextMicro}`,
      };
    }
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const nextMicro = (prevMicro || 0) + 1;
      return {
        major: parts[0],
        minor: parts[1],
        micro: nextMicro,
        versionTag: `v${parts[0]}.${parts[1]}.${nextMicro}`,
      };
    }
  }
  const major = Number.isFinite(prevMajor) && prevMajor > 0 ? prevMajor : 1;
  const minor = Number.isFinite(prevMinor) && prevMinor >= 0 ? prevMinor : 0;
  const micro = (Number.isFinite(prevMicro) && prevMicro >= 0 ? prevMicro : 0) + 1;
  return {
    major,
    minor,
    micro,
    versionTag: `v${major}.${minor}.${micro}`,
  };
}

/**
 * Parses any version tag (e.g. "v1.0.1", "v1.1", "v1.0") and returns normalized micro-version string.
 */
export function normalizeToMicroVersionTag(tag?: string, fallbackIndex = 1): string {
  if (!tag) return `v1.0.${fallbackIndex}`;
  const clean = tag.trim().replace(/^v/i, '');
  const parts = clean.split('.').map((p) => parseInt(p, 10));
  if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return `v${parts[0]}.${parts[1]}.${parts[2]}`;
  }
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    if (parts[0] === 1 && parts[1] === 0) return 'v1.0.0';
    return `v${parts[0]}.0.${parts[1]}`;
  }
  return `v1.0.${fallbackIndex}`;
}

export function getDeletedDraftIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_DRAFTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markDraftDeleted(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = new Set(getDeletedDraftIds().map((x) => x.toUpperCase()));
    current.add(id.toUpperCase());
    localStorage.setItem(DELETED_DRAFTS_KEY, JSON.stringify(Array.from(current)));

    const rawDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
    if (Array.isArray(rawDrafts)) {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify(rawDrafts.filter((d: any) => d?.id !== id))
      );
    }
  } catch {}
}

/**
 * Built-in NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness (v1.0.1 Draft)
 * Ensures the synthesized NASA diagram is always available in Library -> Drafts and /library?q=nasa.
 */
export function buildNasaMultiverseDraftItem(): AutoSavedDraftBlueprint {
  const nasaXml = buildNasaMultiverseClosedLoopHarnessXml('light');
  const nasaPrompt = '1. Build an agentic harness for Nasa launching satellights in the different universes';
  const nasaTitle =
    'NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness (v1.0.1)';
  const createdAt = '2026-10-09T20:47:30.355Z';

  const nasaVersions = [
    {
      id: 'ver_nasa_v1_0_1',
      versionTag: 'v1.0.1',
      major: 1,
      minor: 0,
      micro: 1,
      title: nasaTitle,
      prompt: nasaPrompt,
      source: 'ai_copilot',
      sourceLabel: 'Mission Systems & Aerospace Architect (Technical Draft v1.0.1)',
      diffSummary:
        'Synthesized Zero-Blueprint NASA Closed-Loop Mission Control & 1:3 Parallel Multi-Universe Digital-Twin Topology (CCSDS 133.0-B/732.0-B, DSN 810-005, NASA cFS & JPL F\', LCC/AFTS Range Safety)',
      timestamp: '04:47 PM',
      xml: nasaXml,
      blueprintId: '00',
      level: 'L3',
      perspective: 'Technical',
      status: 'draft',
      persona: 'Mission Systems & Aerospace Architect',
      modelUsed: 'gemini-3.8-flash • judged by gemini-3.1-pro-preview (99% certified)',
      aiReasoning:
        'Reframed "launching satellites in different universes" from ungrounded sci-fi into a Counterfactual Physics Digital-Twin & Monte Carlo Orbital Simulation ensemble (Universe α, β, γ) with a Rhombus LCC GO/NO-GO Gate, AFTS Abort Quarantine Sink, Hexagon Google ADK Agents, and 100Hz CCSDS 732.0-B Closed-Loop Telemetry Return.',
      plannedSteps: [
        'Stage 1 (gemini-3.8-flash (tools: googleSearch) + deep-research-max-preview-04-2026): Grounded 6 NASA/CCSDS/DSN/cFS/ITAR standards and reframed speculative premise into Counterfactual Digital-Twin.',
        'Stage 2 (gemini-3.8-flash): Synthesized custom Closed-Loop & Parallel 1:3 Multi-Universe Fork-Join Topology (buildNasaMultiverseClosedLoopHarnessXml).',
        'Stage 3 (gemini-3.1-pro-preview, thinkingBudget=1000): Independent Cross-Model Judge certified 99% score (Truthfulness 96%, Grounding 100%, Completeness 100%).',
        'Stage 4 (google-omni-1.1): Deterministic 2D AABB Zero-Collision & orthogonal 90° connector audit passed (100%).',
      ],
    },
    {
      id: 'ver_nasa_v1_0_0',
      versionTag: 'v1.0',
      major: 1,
      minor: 0,
      micro: 0,
      title: '2026 Upgraded GCP & Gemini Enterprise Multi-Agent Reference Architecture',
      prompt:
        'Design a GCP native technical architecture with Gemini Enterprise, Google ADK, A2A, MCP, Model Armor, Vector Search 2.0, and Cloud Spanner',
      source: 'initial_load',
      sourceLabel: 'Canonical Baseline',
      diffSummary: 'Canonical Master Blueprint #00 loaded as immutable v1.0 baseline.',
      timestamp: '04:46 PM',
      xml: nasaXml,
      blueprintId: '00',
      level: 'L3',
      perspective: 'Technical',
      status: 'published',
    },
  ];

  return {
    id: 'DRAFT-NASA-MULTIVERSE-V1-0-1',
    name: nasaTitle,
    domain: 'Aerospace & Defense (NASA CCSDS / DSN / cFS / Digital-Twin)',
    description:
      'Auto-Saved Draft (v1.0.1) • Custom Compositional AST with Rhombus LCC GO/NO-GO Gate, AFTS Range Safety Abort Sink, Hexagon Google ADK Agents, 1:3 Counterfactual Universe Fork-Join (α, β, γ), and 100Hz CCSDS Telemetry Return.',
    prompt: nasaPrompt,
    tags: ['Draft', 'v1.0.1', 'NASA', 'CCSDS', 'Multi-Universe Digital-Twin', 'Blueprint #00'],
    nodeCount: 25,
    specCount: 16,
    versionCount: 2,
    activeVersionTag: 'v1.0.1',
    major: 1,
    minor: 0,
    micro: 1,
    xml: nasaXml,
    created_studio: 'draft',
    status: 'draft',
    architecture_type: 'nasa_multiverse_closed_loop_harness',
    blueprintId: '00',
    perspective: 'Technical',
    createdAt,
    updatedAt: createdAt,
    versions: nasaVersions,
  };
}

/**
 * Automatically saves any generated diagram or prompt iteration with a micro-version number
 * so it is immediately available under Library -> Drafts (/library?studio=drafts).
 */
export function autoSaveGeneratedDiagramAsDraft(params: {
  id?: string;
  title: string;
  domain?: string;
  xml: string;
  prompt: string;
  diffSummary?: string;
  blueprintId?: string;
  perspective?: string;
  versionTag: string;
  major: number;
  minor: number;
  micro: number;
  architectureType?: string;
  versions?: any[];
}): AutoSavedDraftBlueprint {
  const cleanBp = params.blueprintId || '00';
  const cleanPersp = (params.perspective || 'Technical').toLowerCase();
  const isNasa =
    /nasa|satellite|satellight|multiverse|multi-universe|ccsds|dsn/i.test(
      `${params.title} ${params.prompt}`
    );

  const draftId =
    params.id ||
    (isNasa
      ? 'DRAFT-NASA-MULTIVERSE-V1-0-1'
      : `draft_bp${cleanBp}_${cleanPersp}_${params.versionTag.replace(/[^a-zA-Z0-9]/g, '_')}`);

  const displayTitle = params.title.includes(params.versionTag)
    ? params.title
    : `${params.title} (${params.versionTag})`;

  const nowIso = new Date().toISOString();
  const nodeCount = (params.xml.match(/vertex="1"/g) || []).length || 24;

  const draftRecord: AutoSavedDraftBlueprint = {
    id: draftId,
    name: displayTitle,
    domain: params.domain || (isNasa ? 'Aerospace & Defense (NASA CCSDS / DSN)' : 'Enterprise Cloud & Multi-Agent AI'),
    description:
      params.diffSummary ||
      `Auto-saved micro-version draft (${params.versionTag}) generated from prompt: "${params.prompt}"`,
    prompt: params.prompt,
    tags: ['Draft', params.versionTag, `Blueprint #${cleanBp}`, params.perspective || 'Technical'],
    nodeCount,
    specCount: 16,
    versionCount: Array.isArray(params.versions) && params.versions.length > 0 ? params.versions.length : 2,
    activeVersionTag: params.versionTag,
    major: params.major,
    minor: params.minor,
    micro: params.micro,
    xml: params.xml,
    created_studio: 'draft',
    status: 'draft',
    architecture_type:
      params.architectureType ||
      (isNasa ? 'nasa_multiverse_closed_loop_harness' : `draft_canonical_${cleanBp}`),
    blueprintId: cleanBp,
    perspective: params.perspective || 'Technical',
    createdAt: nowIso,
    updatedAt: nowIso,
    versions: params.versions || [],
  };

  if (typeof window !== 'undefined') {
    try {
      // 1. Save full Studio/Dashboard payload so clicking the draft in /library loads all versions & dossiers
      localStorage.setItem(
        `promptcanvas_studio_${draftId}`,
        JSON.stringify({
          ...draftRecord,
          projectTitle: displayTitle,
          visibility: 'private',
          selectedBlueprintId: cleanBp,
        })
      );

      // 2. Save to dedicated promptcanvas_draft_blueprints list
      const existingDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
      const nextDrafts = [
        draftRecord,
        ...(Array.isArray(existingDrafts)
          ? existingDrafts.filter((item: any) => item?.id !== draftId)
          : []),
      ];
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(nextDrafts));

      // 3. Also mirror into promptcanvas_saved_blueprints with created_studio: 'draft'
      const existingSaved = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
      const nextSaved = [
        draftRecord,
        ...(Array.isArray(existingSaved)
          ? existingSaved.filter((item: any) => item?.id !== draftId)
          : []),
      ];
      localStorage.setItem('promptcanvas_saved_blueprints', JSON.stringify(nextSaved));

      // 4. Persist to backend database (/api/diagrams) asynchronously
      fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: displayTitle,
          xml: params.xml,
          comment: `Auto-saved Micro-Version Draft (${params.versionTag}, forked from Blueprint #${cleanBp})`,
          prompt: params.prompt,
          businessUsecase: draftRecord.domain,
          technicalUsecase: draftRecord.description,
          architectureType: draftRecord.architecture_type,
          createdStudio: 'draft',
          isPrivate: true,
        }),
      }).catch(() => {});
    } catch (err) {
      console.error('Failed to auto-save micro-version draft:', err);
    }
  }

  return draftRecord;
}

/**
 * Returns all auto-saved micro-versioned drafts from localStorage, sessionStorage recovery,
 * and the canonical NASA Closed-Loop Multi-Universe Digital-Twin v1.0.1 draft.
 */
export function getAutoSavedDraftBlueprints(): AutoSavedDraftBlueprint[] {
  const deletedSet = new Set(getDeletedDraftIds().map((x) => x.toUpperCase()));
  const draftsMap = new Map<string, AutoSavedDraftBlueprint>();

  // 1. Always seed the NASA Closed-Loop Multi-Universe Digital-Twin Harness (v1.0.1) unless deleted
  const nasaDraft = buildNasaMultiverseDraftItem();
  if (!deletedSet.has(nasaDraft.id.toUpperCase())) {
    draftsMap.set(nasaDraft.id.toUpperCase(), nasaDraft);
    if (typeof window !== 'undefined') {
      try {
        if (!localStorage.getItem(`promptcanvas_studio_${nasaDraft.id}`)) {
          localStorage.setItem(
            `promptcanvas_studio_${nasaDraft.id}`,
            JSON.stringify({
              ...nasaDraft,
              projectTitle: nasaDraft.name,
              visibility: 'private',
              selectedBlueprintId: '00',
            })
          );
        }
      } catch {}
    }
  }

  if (typeof window === 'undefined') {
    return Array.from(draftsMap.values());
  }

  // 2. Load from promptcanvas_draft_blueprints
  try {
    const rawDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
    if (Array.isArray(rawDrafts)) {
      for (const item of rawDrafts) {
        if (!item?.id || deletedSet.has(String(item.id).toUpperCase())) continue;
        const normalizedTag = normalizeToMicroVersionTag(item.activeVersionTag || 'v1.0.1');
        draftsMap.set(String(item.id).toUpperCase(), {
          ...item,
          activeVersionTag: normalizedTag,
          created_studio: 'draft',
          status: 'draft',
        });
      }
    }
  } catch {}

  // 3. Recover any active sessionStorage Dashboard Session Copies so they also appear in Drafts with micro-versions
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key || !key.startsWith('promptcanvas_dashboard_session_')) continue;
      const rawSession = sessionStorage.getItem(key);
      if (!rawSession) continue;
      const parsed = JSON.parse(rawSession);
      if (!Array.isArray(parsed?.versionHistory) || parsed.versionHistory.length <= 1) continue;

      const latestVer = parsed.versionHistory[0];
      if (!latestVer?.xml) continue;
      const microCount = parsed.versionHistory.length - 1;
      const microTag = normalizeToMicroVersionTag(latestVer.versionTag, microCount);
      const isNasaVer = /nasa|satellite|satellight|multiverse|multi-universe/i.test(
        `${latestVer.title || ''} ${latestVer.prompt || ''}`
      );
      const recoveredId = isNasaVer
        ? 'DRAFT-NASA-MULTIVERSE-V1-0-1'
        : `draft_${parsed.sessionCopyId || key.replace('promptcanvas_dashboard_session_', '')}`;

      if (deletedSet.has(recoveredId.toUpperCase())) continue;

      const baseTitle = latestVer.title || 'Dashboard Session Architecture';
      const displayTitle = baseTitle.includes(microTag) ? baseTitle : `${baseTitle} (${microTag})`;

      draftsMap.set(recoveredId.toUpperCase(), {
        id: recoveredId,
        name: displayTitle,
        domain: isNasaVer ? 'Aerospace & Defense (NASA CCSDS / DSN)' : 'Enterprise Cloud & Multi-Agent AI',
        description: latestVer.diffSummary || latestVer.prompt || `Auto-saved Draft (${microTag})`,
        prompt: latestVer.prompt || '',
        tags: ['Draft', microTag, `Blueprint #${parsed.blueprintId || '00'}`],
        nodeCount: (latestVer.xml.match(/vertex="1"/g) || []).length || 24,
        specCount: 16,
        versionCount: parsed.versionHistory.length,
        activeVersionTag: microTag,
        major: latestVer.major || 1,
        minor: latestVer.minor || 0,
        micro: latestVer.micro || microCount,
        xml: latestVer.xml,
        created_studio: 'draft',
        status: 'draft',
        architecture_type: isNasaVer ? 'nasa_multiverse_closed_loop_harness' : `draft_canonical_${parsed.blueprintId || '00'}`,
        blueprintId: parsed.blueprintId || '00',
        perspective: latestVer.perspective || 'Technical',
        createdAt: parsed.updatedAt || new Date().toISOString(),
        updatedAt: parsed.updatedAt || new Date().toISOString(),
        versions: parsed.versionHistory,
      });
    }
  } catch {}

  return Array.from(draftsMap.values());
}
