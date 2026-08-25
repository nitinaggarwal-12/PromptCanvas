/**
 * Document Section Hierarchy & Granular Editing Engine
 * Supports section-level Edit, Save, Delete, Clone, Add, Move, and Hierarchy Promotion/Demotion
 */

export interface DocumentSection {
  id: string;
  level: 1 | 2 | 3; // 1 = # (Document Title), 2 = ## (Chapter / Parent Level), 3 = ### (Sub-section / Leaf Level)
  title: string;
  rawHeader: string;
  content: string; // Markdown text inside this section
}

/**
 * Parses raw markdown text into structured hierarchical sections
 */
export function parseDocumentIntoSections(markdown: string): DocumentSection[] {
  if (!markdown || typeof markdown !== 'string') return [];

  const lines = markdown.split('\n');
  const sections: DocumentSection[] = [];

  let currentSection: DocumentSection | null = null;
  let accumulatedLines: string[] = [];

  const flushCurrentSection = () => {
    if (currentSection) {
      currentSection.content = accumulatedLines.join('\n').trim();
      sections.push(currentSection);
      accumulatedLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for header levels: #, ##, ###
    const h1Match = line.match(/^#\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h1Match || h2Match || h3Match) {
      flushCurrentSection();

      let level: 1 | 2 | 3 = 1;
      let title = '';

      if (h1Match) {
        level = 1;
        title = h1Match[1].trim();
      } else if (h2Match) {
        level = 2;
        title = h2Match[1].trim();
      } else if (h3Match) {
        level = 3;
        title = h3Match[1].trim();
      }

      currentSection = {
        id: `sec_${i}_${level}_${Math.random().toString(36).substring(2, 7)}`,
        level,
        title,
        rawHeader: line,
        content: '',
      };
    } else {
      if (currentSection) {
        accumulatedLines.push(line);
      } else {
        accumulatedLines.push(line);
      }
    }
  }

  flushCurrentSection();

  if (sections.length === 0 && markdown.trim()) {
    sections.push({
      id: `sec_0_2_${Math.random().toString(36).substring(2, 7)}`,
      level: 2,
      title: 'Executive Specification',
      rawHeader: '## Executive Specification',
      content: markdown.trim(),
    });
  }

  return sections;
}

/**
 * Reconstructs full markdown text from structured sections
 */
export function reconstructDocumentFromSections(sections: DocumentSection[]): string {
  return sections
    .map((sec) => {
      const headerPrefix = '#'.repeat(sec.level);
      const header = `${headerPrefix} ${sec.title}`;
      if (!sec.content) return header;
      return `${header}\n\n${sec.content}`;
    })
    .join('\n\n')
    .trim();
}

/**
 * Updates content and title of a specific section
 */
export function updateSection(
  sections: DocumentSection[],
  sectionId: string,
  newTitle: string,
  newContent: string
): DocumentSection[] {
  return sections.map((sec) => {
    if (sec.id !== sectionId) return sec;
    return {
      ...sec,
      title: newTitle.trim() || sec.title,
      content: newContent.trim(),
      rawHeader: `${'#'.repeat(sec.level)} ${newTitle.trim() || sec.title}`,
    };
  });
}

/**
 * Deletes a specific section
 */
export function deleteSection(sections: DocumentSection[], sectionId: string): DocumentSection[] {
  return sections.filter((sec) => sec.id !== sectionId);
}

/**
 * Clones / duplicates a section immediately after itself
 */
export function cloneSection(sections: DocumentSection[], sectionId: string): DocumentSection[] {
  const targetIdx = sections.findIndex((s) => s.id === sectionId);
  if (targetIdx === -1) return sections;

  const target = sections[targetIdx];
  const cloned: DocumentSection = {
    id: `sec_${Date.now()}_${target.level}_${Math.random().toString(36).substring(2, 7)}`,
    level: target.level,
    title: `${target.title} (Copy)`,
    rawHeader: `${'#'.repeat(target.level)} ${target.title} (Copy)`,
    content: target.content,
  };

  const next = [...sections];
  next.splice(targetIdx + 1, 0, cloned);
  return next;
}

/**
 * Inserts a brand new section after target
 */
export function insertNewSectionAfter(
  sections: DocumentSection[],
  targetSectionId: string,
  level: 1 | 2 | 3 = 2,
  title: string = 'New Architectural Chapter',
  content: string = '* Add specifications, tables, or requirements here.'
): DocumentSection[] {
  const targetIdx = sections.findIndex((s) => s.id === targetSectionId);
  const newSec: DocumentSection = {
    id: `sec_${Date.now()}_${level}_${Math.random().toString(36).substring(2, 7)}`,
    level,
    title,
    rawHeader: `${'#'.repeat(level)} ${title}`,
    content,
  };

  if (targetIdx === -1) {
    return [...sections, newSec];
  }

  const next = [...sections];
  next.splice(targetIdx + 1, 0, newSec);
  return next;
}

/**
 * Moves section up in document order
 */
export function moveSectionUp(sections: DocumentSection[], sectionId: string): DocumentSection[] {
  const idx = sections.findIndex((s) => s.id === sectionId);
  if (idx <= 0) return sections;

  const next = [...sections];
  const [removed] = next.splice(idx, 1);
  next.splice(idx - 1, 0, removed);
  return next;
}

/**
 * Moves section down in document order
 */
export function moveSectionDown(sections: DocumentSection[], sectionId: string): DocumentSection[] {
  const idx = sections.findIndex((s) => s.id === sectionId);
  if (idx === -1 || idx >= sections.length - 1) return sections;

  const next = [...sections];
  const [removed] = next.splice(idx, 1);
  next.splice(idx + 1, 0, removed);
  return next;
}

/**
 * Promotes (higher parent level: 3->2, 2->1) or demotes (leaf level: 1->2, 2->3)
 */
export function changeSectionHierarchy(
  sections: DocumentSection[],
  sectionId: string,
  direction: 'promote' | 'demote'
): DocumentSection[] {
  return sections.map((sec) => {
    if (sec.id !== sectionId) return sec;

    let newLevel = sec.level;
    if (direction === 'promote' && sec.level > 1) {
      newLevel = (sec.level - 1) as 1 | 2 | 3;
    } else if (direction === 'demote' && sec.level < 3) {
      newLevel = (sec.level + 1) as 1 | 2 | 3;
    }

    return {
      ...sec,
      level: newLevel,
      rawHeader: `${'#'.repeat(newLevel)} ${sec.title}`,
    };
  });
}
