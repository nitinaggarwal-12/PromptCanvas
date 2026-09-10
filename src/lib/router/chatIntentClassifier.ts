export type ChatIntentType = 'greeting' | 'identity' | 'conversational' | 'question' | 'mutation';

export interface ChatIntentResult {
  isQuestion: boolean;
  intent: ChatIntentType;
  confidence: number;
  reason: string;
}

/**
 * 🧠 Classifies a user chat/prompt message into either:
 * - 'greeting' (Casual user greeting: "hi", "hello", "hey there", "good morning")
 * - 'identity' (Identity & capability queries: "who are you", "who r u", "what can you do", "help")
 * - 'conversational' (Courtesy & acknowledgments: "thanks", "thank you", "cool", "got it")
 * - 'question' (Advisory & Q&A analysis: "what missing in this architecture", "explain data flow", "is this secure?")
 * - 'mutation' (Diagram structure refactoring: "add Cloud Armor", "replace BigQuery with Spanner", "connect Pub/Sub to Cloud Run")
 */
export function classifyChatIntent(prompt: string): ChatIntentResult {
  if (!prompt || typeof prompt !== 'string') {
    return {
      isQuestion: true,
      intent: 'conversational',
      confidence: 1.0,
      reason: 'Empty prompt'
    };
  }

  const clean = prompt.trim();
  const lower = clean.toLowerCase();
  const stripped = lower.replace(/[!?.,;:"']/g, '').trim();
  const words = stripped.split(/\s+/).filter(Boolean);

  // 1. Casual Greetings Check
  const greetings = [
    'hi',
    'hello',
    'hey',
    'howdy',
    'hola',
    'sup',
    'yo',
    'greetings',
    'hi there',
    'hello there',
    'hey there',
    'good morning',
    'good afternoon',
    'good evening',
    'good day',
    'hiya',
    'heyy',
    'heyyy'
  ];

  if (
    greetings.includes(stripped) ||
    (words.length <= 3 && (words[0] === 'hi' || words[0] === 'hello' || words[0] === 'hey'))
  ) {
    return {
      isQuestion: true,
      intent: 'greeting',
      confidence: 0.99,
      reason: 'User greeting'
    };
  }

  // 2. Identity & Capabilities Inquiry
  const identityPhrases = [
    'who are you',
    'who r you',
    'who r u',
    'who are u',
    'what are you',
    'what is this',
    'what can you do',
    'what do you do',
    'what are your capabilities',
    'how do i use this',
    'how does this tool work',
    'what is your name',
    'introduce yourself',
    'help',
    'help me',
    'who made you'
  ];

  if (
    identityPhrases.some(p => stripped === p || stripped.startsWith(p)) ||
    (stripped.startsWith('who') && (stripped.includes('you') || stripped.includes(' u')))
  ) {
    return {
      isQuestion: true,
      intent: 'identity',
      confidence: 0.98,
      reason: 'Identity or capability inquiry'
    };
  }

  // 3. Courtesy & Acknowledgment
  const conversationalPhrases = [
    'thanks',
    'thank you',
    'thx',
    'thank u',
    'appreciate it',
    'many thanks',
    'ok',
    'okay',
    'cool',
    'great',
    'awesome',
    'nice',
    'good',
    'perfect',
    'got it',
    'sounds good',
    'understood',
    'bye',
    'goodbye',
    'see ya',
    'cya'
  ];

  if (conversationalPhrases.includes(stripped)) {
    return {
      isQuestion: true,
      intent: 'conversational',
      confidence: 0.98,
      reason: 'Courtesy or acknowledgment'
    };
  }

  // 4. Direct Question Mark Check
  const hasQuestionMark = clean.endsWith('?');

  // 5. Strong Question / Inquiry Phrases
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

  // 6. Polite Imperative Mutations: "Can you add/create/remove/replace X?"
  const politeMutation = (
    lower.startsWith('can you add') ||
    lower.startsWith('can you create') ||
    lower.startsWith('can you remove') ||
    lower.startsWith('can you replace') ||
    lower.startsWith('please add') ||
    lower.startsWith('please create') ||
    lower.startsWith('please remove') ||
    lower.startsWith('please replace')
  );

  if (politeMutation) {
    return {
      isQuestion: false,
      intent: 'mutation',
      confidence: 0.9,
      reason: 'Polite imperative mutation request'
    };
  }

  // 7. Question Starter Words / Prefixes
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

  if (firstWordMatch || hasQuestionMark) {
    return {
      isQuestion: true,
      intent: 'question',
      confidence: 0.9,
      reason: hasQuestionMark ? 'Ends with question mark' : 'Begins with question starter word'
    };
  }

  // 8. Imperative Action Starters (Strong Mutation Indicators)
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

  if (startsWithMutation) {
    return {
      isQuestion: false,
      intent: 'mutation',
      confidence: 0.95,
      reason: 'Starts with imperative mutation verb'
    };
  }

  // 9. Analysis keywords check
  const analysisKeywords = ['analysis', 'recommendation', 'opinion', 'assessment', 'audit', 'critique', 'feedback', 'gap'];
  if (analysisKeywords.some(kw => lower.includes(kw))) {
    return {
      isQuestion: true,
      intent: 'question',
      confidence: 0.8,
      reason: 'Contains architectural assessment keyword'
    };
  }

  // 10. Safeguard: Short non-mutation inputs (<= 2 words) without mutation verbs
  const mutationKeywords = ['add', 'remove', 'delete', 'connect', 'wire', 'replace', 'swap', 'scale', 'split', 'merge'];
  if (words.length <= 2 && !words.some(w => mutationKeywords.includes(w))) {
    return {
      isQuestion: true,
      intent: 'conversational',
      confidence: 0.75,
      reason: 'Short ambiguous input without mutation verbs'
    };
  }

  // Default to mutation for longer descriptive refactoring prompts
  return {
    isQuestion: false,
    intent: 'mutation',
    confidence: 0.7,
    reason: 'Standard architecture refactoring request'
  };
}
