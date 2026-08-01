import { SystemModel } from '../extract';

export interface ProvenanceText {
  text: string;
  sourceRefs: string[];
}

export interface TableRow {
  cells: string[];
  sourceRefs: string[];
}

export interface SectionContent {
  sectionId: string;
  title?: string;
  paragraphs: ProvenanceText[];
  bullets: ProvenanceText[];
  table?: {
    headers: string[];
    rows: TableRow[];
  };
  todoGuidance?: string;
}

export type DerivationMapperFn = (model: SystemModel, sectionId?: string) => SectionContent;
