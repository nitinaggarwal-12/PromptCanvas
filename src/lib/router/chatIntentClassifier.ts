export interface ChatIntentResult {
  isQuestion: boolean;
  intent: 'question' | 'mutation';
  confidence: number;
  reason: string;
}

/**
 * 🧠 Classifies a user chat/prompt message into either:
 * - 'question' (Advisory & Q&A analysis: "what missing in this architecture", "explain data flow", "is this secure?")
 * - 'mutation' (Diagram structure refactoring: "add Cloud Armor", "replace BigQuery with Spanner", "connect Pub/Sub to Cloud Run")
 */
export function classifyChatIntent(prompt: string): ChatIntentResult {
  if (!prompt || typeof prompt !== 'string') {
    return {
      isQuestion: false,
      intent: 'mutation',
      confidence: 1.0,
      reason: 'Empty prompt defaults to mutation'
    };
  }

  const clean = prompt.trim();
  const lower = clean.toLowerCase();

  // 1. Direct Question Mark Check
  const hasQuestionMark = clean.endsWith('?');

  // 2. Strong Question / Inquiry Phrases
  const questionPhrases = [
    'what missing',
    'what is missing',
    'whats missing',
    'what\'s missing',
    'what else is needed',
    'what are the gaps',
    'gap analysis',
    'what is wrong',
    'what are the flaws',
    'what are the risks',
    'what are the bottlenecks',
    'what are the vulnerabilities',
    'how does this work',
    'how does the data flow',
    'how do clients connect',
    'explain this architecture',
    'explain the architecture',
    'explain how',
    'explain why',
    'explain the flow',
    'explain the data flow',
    'explain data flow',
    'explain flow',
    'explain architecture',
    'explain design',
    'tell me about',
    'walk me through',
    'describe the',
    'describe how',
    'describe data flow',
    'review this architecture',
    'review the architecture',
    'audit this architecture',
    'evaluate this design',
    'evaluate the architecture',
    'analyze this architecture',
    'analyze the design',
    'summarize the architecture',
    'summarize the components',
    'is this scalable',
    'is this secure',
    'is this compliant',
    'is this compliant with',
    'pros and cons',
    'pros & cons',
    'trade-offs',
    'tradeoffs',
    'difference between',
    'compare'
  ];

  for (const phrase of questionPhrases) {
    if (lower.includes(phrase)) {
      return {
        isQuestion: true,
        intent: 'question',
        confidence: 0.95,
        reason: `Matched advisory question pattern: "${phrase}"`
      };
    }
  }

  // 3. Question Starter Words / Prefixes
  const questionStarters = [
    'what',
    'why',
    'how',
    'who',
    'which',
    'where',
    'when',
    'is it',
    'is there',
    'are there',
    'can it',
    'does it',
    'should we',
    'could we',
    'would you recommend',
    'explain',
    'describe',
    'clarify',
    'elaborate',
    'summarize',
    'analyze',
    'evaluate',
    'review',
    'audit'
  ];

  const firstWordMatch = questionStarters.some(starter => 
    lower.startsWith(starter + ' ') || lower === starter
  );

  // 4. Imperative Action Starters (Strong Mutation Indicators)
  const mutationStarters = [
    'add ',
    'insert ',
    'create ',
    'build ',
    'connect ',
    'link ',
    'wire ',
    'remove ',
    'delete ',
    'drop ',
    'replace ',
    'swap ',
    'rename ',
    'change ',
    'update ',
    'modify ',
    'refactor ',
    're-architect ',
    'scale ',
    'split ',
    'merge ',
    'convert ',
    'implement '
  ];

  const startsWithMutation = mutationStarters.some(starter => lower.startsWith(starter));

  // If starts with strong mutation verb without question mark, it is a mutation
  if (startsWithMutation && !hasQuestionMark) {
    return {
      isQuestion: false,
      intent: 'mutation',
      confidence: 0.95,
      reason: 'Starts with imperative mutation verb'
    };
  }

  // If has question starter or question mark
  if (firstWordMatch || hasQuestionMark) {
    // Check if user is saying "Can you add/create/remove/replace X?"
    if (
      lower.startsWith('can you add') ||
      lower.startsWith('can you create') ||
      lower.startsWith('can you remove') ||
      lower.startsWith('can you replace') ||
      lower.startsWith('please add') ||
      lower.startsWith('please create') ||
      lower.startsWith('please remove') ||
      lower.startsWith('please replace')
    ) {
      return {
        isQuestion: false,
        intent: 'mutation',
        confidence: 0.85,
        reason: 'Polite imperative mutation request'
      };
    }

    return {
      isQuestion: true,
      intent: 'question',
      confidence: 0.9,
      reason: hasQuestionMark ? 'Ends with question mark' : 'Begins with question starter word'
    };
  }

  // 5. Default check for analysis keywords
  const analysisKeywords = ['analysis', 'recommendation', 'opinion', 'assessment', 'audit', 'critique', 'feedback', 'gap'];
  if (analysisKeywords.some(kw => lower.includes(kw))) {
    return {
      isQuestion: true,
      intent: 'question',
      confidence: 0.75,
      reason: 'Contains architectural assessment keyword'
    };
  }

  // Default to mutation for general text edits / additions
  return {
    isQuestion: false,
    intent: 'mutation',
    confidence: 0.7,
    reason: 'Standard architecture refactoring request'
  };
}
