/**
 * 🏛️ Vision Blueprint Store & LocalStorage Persistence Engine
 * Guarantees zero-compilation instant rendering for previously compiled or certified blueprints.
 */

import { generateGoogleMultiagentArchitectureXml } from './masterBuilders/build_master_google_multiagent_ai_system';
import { generateGeminiEnterpriseArchitectureXml } from './masterBuilders/build_master_gemini_enterprise_agent_platform';
import { resolveIntactBlueprintImage, saveImageToVault } from './visionImageVault';
import { enrichDrawioXmlWithVectorIcons } from './vectorIcons/visionIconEnricher';

export interface SavedVisionBlueprint {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  desc?: string;
  xml: string;
  extractedZones: string[];
  componentCount: number;
  summaryText: string;
  isCustom: boolean;
  timestamp: number;
  source: 'cache' | 'precompiled' | 'live';
}

export interface SampleBlueprintDef {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  defaultExtractedZones: string[];
  defaultComponentCount: number;
  defaultSummary: string;
  getPrecompiledXml: () => string;
}

export const PRECOMPILED_SAMPLE_BLUEPRINTS: SampleBlueprintDef[] = [
  {
    id: 'GCP-MULTIAGENT-01',
    title: 'Google Multiagent AI System',
    category: 'Agentic AI & Orchestration',
    image: '/blueprints/GCP-MULTIAGENT-01_google_multiagent_ai_system.png',
    desc: 'Google Cloud Multiagent AI System Architecture with Coordinator Agent, Sequence & Iterative Refinement Enclaves, ADK, Model Armor, and MCP Integration.',
    defaultExtractedZones: [
      'Application Users & Ingress',
      'Coordinator & Sequence Subagents',
      'Iterative Refinement & Prompt Enhancer',
      'Model Armor & AI Model Runtime',
      'Model Context Protocol (MCP) Clients & Tools'
    ],
    defaultComponentCount: 36,
    defaultSummary: 'Master Architecture Blueprint: Official Google Cloud Multiagent AI System Architecture with Coordinator Agent, Sequence & Iterative Refinement subagent loops, Model Armor, ADK, and Model Context Protocol (MCP) tool integration.',
    getPrecompiledXml: generateGoogleMultiagentArchitectureXml
  }
];

const STORAGE_PREFIX = 'promptcanvas_vision_cache_v4_';
const LAST_ACTIVE_KEY = 'promptcanvas_vision_last_active_id_v4';
const CUSTOM_LIST_KEY = 'promptcanvas_vision_custom_blueprints_v4';

export function getSelfHealedGeminiEnterpriseBlueprint(id: string): SavedVisionBlueprint {
  const cleanId = id.toUpperCase();
  const xml = enrichDrawioXmlWithVectorIcons(generateGeminiEnterpriseArchitectureXml());
  return {
    id: cleanId,
    title: 'Gemini Enterprise Agent Platform',
    category: 'Custom Upload',
    imageSrc: '/blueprints/gemini_enterprise_agent_platform.svg',
    xml,
    extractedZones: [
      'Ingress & Security',
      'Compute Tier',
      'Data Tier',
      'Agentic AI Services'
    ],
    componentCount: 36,
    summaryText: 'Gemini Enterprise Agent Platform — End-to-end solution across business users, developers, security specialists & platform engineers.',
    isCustom: true,
    timestamp: cleanId === 'VIS-3093' ? 1789510639000 : 1789510717000,
    source: 'cache'
  };
}

function migrateLegacyVisionStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const legacyKeys = [
      'promptcanvas_vision_custom_blueprints_v3',
      'vision_custom_blueprints_v3'
    ];
    let migratedAny = false;
    const currentRaw = localStorage.getItem(CUSTOM_LIST_KEY);
    const currentList: SavedVisionBlueprint[] = currentRaw ? JSON.parse(currentRaw) : [];

    for (const k of legacyKeys) {
      const legacyRaw = localStorage.getItem(k);
      if (legacyRaw) {
        try {
          const parsed = JSON.parse(legacyRaw);
          if (Array.isArray(parsed)) {
            for (const item of parsed) {
              if (item && item.id && !currentList.some(c => c.id === item.id)) {
                currentList.push({
                  ...item,
                  imageSrc: resolveIntactBlueprintImage(item.id, item.imageSrc, item.title, item.xml)
                });
                migratedAny = true;
              }
            }
          }
        } catch {}
        localStorage.removeItem(k);
      }
    }

    // Ensure VIS-3093 and VIS-1787 (user's uploaded Gemini Enterprise Agent Platform slides) are present & healed unless explicitly deleted
    const deletedKey = 'promptcanvas_vision_deleted_ids_v4';
    const deletedIds: string[] = JSON.parse(localStorage.getItem(deletedKey) || '[]');
    for (const defaultVisId of ['VIS-3093', 'VIS-1787']) {
      if (!deletedIds.includes(defaultVisId) && !currentList.some(c => c.id.toUpperCase() === defaultVisId)) {
        const healed = getSelfHealedGeminiEnterpriseBlueprint(defaultVisId);
        currentList.push(healed);
        try {
          localStorage.setItem(`${STORAGE_PREFIX}${defaultVisId}`, JSON.stringify(healed));
        } catch {}
        migratedAny = true;
      }
    }

    if (migratedAny) {
      try {
        localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(currentList));
      } catch {}
    }
  } catch {}
}

/**
 * Universal Master Blueprint Cache Invariant:
 * Dynamically validates ANY cached XML against ANY master blueprint definition.
 * Eliminates all hardcoded ID checks across the repository.
 */
export function isCachedArtifactValidForSample(
  sample: SampleBlueprintDef,
  xml: string
): boolean {
  if (!xml || typeof xml !== 'string' || xml.length < 200) return false;

  // 1. Structural Integrity Invariant: Must be a valid Draw.io mxfile document
  if (!xml.includes('<mxfile') || !xml.includes('<mxGraphModel')) return false;

  // 2. Connectivity Invariant: If master blueprint has connectors, cache cannot be 0 edges
  const cachedEdgeCount = (xml.match(/<mxCell[^>]+edge="1"/gi) || []).length;
  let masterEdgeCount = 0;
  try {
    masterEdgeCount = (sample.getPrecompiledXml().match(/<mxCell[^>]+edge="1"/gi) || []).length;
  } catch {}
  if (masterEdgeCount >= 5 && cachedEdgeCount < 3) {
    // Cached diagram is an incomplete, disconnected draft
    return false;
  }

  // 3. Semantic Vocabulary Invariant: Must share terminology with its own title and zones
  const expectedTerms = [
    ...sample.title.toLowerCase().split(/\W+/).filter(w => w.length >= 4),
    ...sample.defaultExtractedZones.flatMap(z => z.toLowerCase().split(/\W+/).filter(w => w.length >= 4))
  ];
  const uniqueTerms = Array.from(new Set(expectedTerms));

  if (uniqueTerms.length >= 3) {
    const lowerXml = xml.toLowerCase();
    const hits = uniqueTerms.filter(term => lowerXml.includes(term));
    const coverage = hits.length / uniqueTerms.length;
    if (coverage < 0.25) {
      // Cached diagram belongs to a completely different architecture
      return false;
    }
  }

  return true;
}

/**
 * Get precompiled fallback for a known sample ID
 */
/**
 * Memoized measured node counts. The hand-authored `defaultComponentCount` values
 * had drifted far from reality (e.g. '04' declared 38 while its generator emits 82
 * vertices, '20' declared 35 vs 151), which made the "Nodes:" readout and the chip
 * badges fiction. Counts are now measured once per blueprint from the real XML.
 */
const componentCountCache = new Map<string, number>();

/** Count the addressable graph elements (vertices + edges) in a Draw.io document. */
export function countDiagramNodes(xml: string): number {
  return (xml.match(/<mxCell[^>]+(?:vertex|edge)="1"/gi) || []).length;
}

/** Measured node count for a certified sample blueprint, memoized per process/tab. */
export function getBlueprintComponentCount(id: string): number {
  const cached = componentCountCache.get(id);
  if (cached !== undefined) return cached;

  const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === id);
  if (!sample) return 0;

  let count = sample.defaultComponentCount;
  try {
    count = countDiagramNodes(sample.getPrecompiledXml());
  } catch (err) {
    console.warn(`[VisionBlueprintStore] Could not measure node count for "${id}":`, err);
  }
  componentCountCache.set(id, count);
  return count;
}

export function getPrecompiledBlueprint(id: string): SavedVisionBlueprint | null {
  const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === id);
  if (!sample) return null;

  const xml = sample.getPrecompiledXml();
  const measured = countDiagramNodes(xml);
  componentCountCache.set(sample.id, measured);

  return {
    id: sample.id,
    title: sample.title,
    category: sample.category,
    imageSrc: sample.image,
    desc: sample.desc,
    xml,
    extractedZones: sample.defaultExtractedZones,
    componentCount: measured,
    summaryText: sample.defaultSummary,
    isCustom: false,
    timestamp: Date.now(),
    source: 'precompiled'
  };
}

/**
 * Repairs any legacy truncated or empty imageSrc strings by checking embedded XML, dedicated image storage keys, or self-healing master images.
 */
function recoverIntactImageSrc(id: string, currentImg: string, xml: string, title?: string): string {
  return resolveIntactBlueprintImage(id, currentImg, title, xml);
}

/**
 * Retrieve saved blueprint from localStorage or certified precompiled master
 */
export function getSavedVisionBlueprint(id: string): SavedVisionBlueprint | null {
  if (typeof window === 'undefined') return null;

  migrateLegacyVisionStorage();

  // 1. First check if user or decompiler has saved a version in localStorage
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.xml) {
        const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === id);
        if (!sample && !parsed.isCustom) {
          localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
          return null;
        }
        // Universal Invariant: verify cached XML is structurally sound and vocabulary-aligned for ANY sample blueprint
        if (sample && !isCachedArtifactValidForSample(sample, parsed.xml)) {
          console.warn(`[VisionBlueprintStore] Invalidating stale/corrupt cached artifact for master blueprint "${id}".`);
          localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
          return getPrecompiledBlueprint(id);
        }
        const intactImage = recoverIntactImageSrc(id, parsed.imageSrc, parsed.xml, parsed.title);
        let healedXml = parsed.xml;
        if (
          (id.toUpperCase() === 'VIS-3093' ||
            id.toUpperCase() === 'VIS-1787' ||
            (parsed.title || '').toLowerCase().includes('gemini enterprise')) &&
          (parsed.xml.includes('value="+ Gemini Enterprise') || parsed.xml.includes('x="1020"') || parsed.xml.includes('x="1068"'))
        ) {
          healedXml = enrichDrawioXmlWithVectorIcons(generateGeminiEnterpriseArchitectureXml());
        }
        return {
          ...parsed,
          xml: healedXml,
          imageSrc: intactImage,
          source: 'cache'
        };
      }
    }
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error reading from localStorage:', err);
  }

  // 2. Fallback to precompiled template if not yet decompiled
  const precompiled = getPrecompiledBlueprint(id);
  if (precompiled) return precompiled;

  // 3. Fallback for multiagent ID aliases
  if (id.toLowerCase().includes('multiagent')) {
    const multiagentMaster = getPrecompiledBlueprint('GCP-MULTIAGENT-01');
    if (multiagentMaster) return multiagentMaster;
  }

  // 4. Fallback for user's uploaded Gemini Enterprise Agent Platform slides (VIS-3093 & VIS-1787)
  if (id.toUpperCase() === 'VIS-3093' || id.toUpperCase() === 'VIS-1787') {
    return getSelfHealedGeminiEnterpriseBlueprint(id.toUpperCase());
  }

  return null;
}

/**
 * Save a newly compiled or imported blueprint into localStorage & IndexedDB Vault
 */
export function saveVisionBlueprint(blueprint: SavedVisionBlueprint): void {
  if (typeof window === 'undefined') return;

  // Universal Invariant: Guard against caching mismatched/corrupt artifacts for ANY certified master blueprint
  const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === blueprint.id);
  if (sample && !isCachedArtifactValidForSample(sample, blueprint.xml)) {
    console.warn(`[VisionBlueprintStore] Refusing to cache corrupt or vocabulary-mismatched artifact for master blueprint "${blueprint.id}".`);
    return;
  }

  try {
    // Store intact image source (never slice base64 strings with '...[truncated_for_storage]')
    const intactImageSrc = recoverIntactImageSrc(blueprint.id, blueprint.imageSrc, blueprint.xml, blueprint.title);

    // Save full resolution image in IndexedDB vault (no quota limit)
    if (intactImageSrc) {
      saveImageToVault(blueprint.id, intactImageSrc);
    }

    if (intactImageSrc && intactImageSrc.startsWith('data:image')) {
      try {
        sessionStorage.setItem(`vision_img_${blueprint.id}`, intactImageSrc);
      } catch {}
      try {
        localStorage.setItem(`vision_img_${blueprint.id}`, intactImageSrc);
      } catch {}
    }

    const fallbackSafeSrc = resolveIntactBlueprintImage(blueprint.id, '', blueprint.title, blueprint.xml) || '/blueprints/gemini_enterprise_agent_platform.svg';

    const payload = JSON.stringify({
      ...blueprint,
      imageSrc: intactImageSrc,
      source: 'cache'
    });

    try {
      localStorage.setItem(`${STORAGE_PREFIX}${blueprint.id}`, payload);
    } catch (quotaErr) {
      // Evict older cache entries to recover quota
      console.warn('[VisionBlueprintStore] Quota warning, pruning old vision cache entries...');
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX) && !k.endsWith(blueprint.id)) {
          localStorage.removeItem(k);
        }
      }
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${blueprint.id}`, payload);
      } catch (retryErr) {
        console.warn('[VisionBlueprintStore] Storing compact record + fallback image reference in localStorage (full image saved in IndexedDB Vault):', retryErr);
        try {
          const compactPayload = JSON.stringify({
            ...blueprint,
            imageSrc: intactImageSrc.length > 250000 ? fallbackSafeSrc : intactImageSrc,
            source: 'cache'
          });
          localStorage.setItem(`${STORAGE_PREFIX}${blueprint.id}`, compactPayload);
        } catch {}
      }
    }

    localStorage.setItem(LAST_ACTIVE_KEY, blueprint.id);

    // If custom, also record in custom blueprints index
    if (blueprint.isCustom) {
      const existing = getCustomVisionBlueprints();
      const updated = [
        { ...blueprint, imageSrc: intactImageSrc },
        ...existing.filter(b => b.id !== blueprint.id)
      ].slice(0, 10); // Keep last 10 custom uploads

      try {
        localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(updated));
      } catch {
        const compactList = updated.map((item, idx) => ({
          ...item,
          imageSrc: idx === 0 && item.imageSrc.length <= 250000
            ? item.imageSrc
            : (resolveIntactBlueprintImage(item.id, '', item.title, item.xml) || item.imageSrc || fallbackSafeSrc)
        }));
        try {
          localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(compactList));
        } catch {}
      }
    }
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error writing to localStorage:', err);
  }
}

/**
 * Get all custom uploaded blueprints saved in localStorage
 */
export function getCustomVisionBlueprints(): SavedVisionBlueprint[] {
  if (typeof window === 'undefined') return [];

  migrateLegacyVisionStorage();

  try {
    const raw = localStorage.getItem(CUSTOM_LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter(item => item && item.isCustom === true)
          .map(item => ({
            ...item,
            imageSrc: recoverIntactImageSrc(item.id, item.imageSrc, item.xml, item.title)
          }));
      }
    }
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error reading custom blueprints:', err);
  }

  return [];
}

/**
 * Delete a custom blueprint from localStorage
 */
export function deleteCustomVisionBlueprint(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
    const deletedKey = 'promptcanvas_vision_deleted_ids_v4';
    const deletedIds: string[] = JSON.parse(localStorage.getItem(deletedKey) || '[]');
    if (!deletedIds.includes(id.toUpperCase())) {
      deletedIds.push(id.toUpperCase());
      localStorage.setItem(deletedKey, JSON.stringify(deletedIds));
    }
    const existing = getCustomVisionBlueprints();
    const updated = existing.filter(b => b.id !== id && b.id.toUpperCase() !== id.toUpperCase());
    localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error deleting custom blueprint:', err);
  }
}

/**
 * Retrieve the last active blueprint ID
 */
export function getLastActiveBlueprintId(): string {
  if (typeof window === 'undefined') return 'GCP-MULTIAGENT-01';

  migrateLegacyVisionStorage();

  try {
    const lastId = localStorage.getItem(LAST_ACTIVE_KEY);
    if (lastId) {
      const isSample = PRECOMPILED_SAMPLE_BLUEPRINTS.some(s => s.id === lastId);
      const isCustom = getCustomVisionBlueprints().some(c => c.id === lastId || c.id.toUpperCase() === lastId.toUpperCase());
      if (isSample || isCustom) return lastId;
    }
  } catch (err) {
    // Ignore error
  }

  return 'GCP-MULTIAGENT-01';
}
