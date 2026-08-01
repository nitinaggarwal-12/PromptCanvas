export const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || 'gemini-3.6-flash';

export type GenConfigKind = 'generate' | 'edit' | 'repair' | 'audit' | 'narrative';

export function getGenConfig(kind: GenConfigKind) {
  switch (kind) {
    case 'repair':
      return {
        thinkingConfig: {
          thinkingBudget: 100, // Minimal thinking budget for mechanical repair calls
        },
      };
    case 'generate':
    case 'edit':
    case 'audit':
    case 'narrative':
    default:
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Modest thinking budget for creative architectural generation calls
        },
      };
  }
}
