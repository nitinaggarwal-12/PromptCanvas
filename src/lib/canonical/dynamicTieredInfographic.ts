/**
 * Universal Dynamic 4-Tier Architectural Infographic Generator
 *
 * Implements Rule 41: Anti-Static-Spoofing & Layout Archetype vs. Subject Domain Separation Law.
 * Features deep specialized domain synthesis for the 6 Frontier Agentic AI Sub-Domains:
 *   1. Teacher-Student LLM Distillation, RLVR (GRPO) & Cascade Routing
 *   2. Test-Time Compute Scaling, System-2 Search & Process Reward Models (PRM)
 *   3. Multimodal VLM Computer-Use & Autonomous Browser/GUI Agents
 *   4. Agentic Security: Dual-LLM Privilege Separation & Indirect Prompt Injection Defense
 *   5. Durable Long-Horizon Agent Execution, Checkpointing & Time-Travel Replay
 *   6. Agentic FinOps, Prefix KV-Caching & Speculative Decoding
 * Plus universal domain synthesis for any arbitrary user topic.
 */

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface TierSpec {
  num: string;
  title: string;
  subtitle: string;
  primaryColor: string;
  lightBg: string;
  borderColor: string;
  cards: { title: string; badge: string; bullets: string[] }[];
  gateTitle: string;
  gatePassLabel: string;
  bottomRuleText: string;
}

/**
 * Extracts a clean subject title and synthesizes 4 domain-specific architectural tiers
 * tailored to the user's prompt topic, with deep domain presets for Agentic AI sub-disciplines.
 */
export function buildDynamicInfographicTiers(prompt: string): {
  headerTitle: string;
  headerSubtitle: string;
  footerText: string;
  tiers: TierSpec[];
} {
  const pLower = prompt.toLowerCase();
  const cleanPrompt = prompt
    .replace(/\b(create|generate|build|draw|make|show|an?|the|diagram|infographic|tiered|architecture|for|of|about|on)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const subjectTopic = cleanPrompt.length > 2 ? cleanPrompt : 'Enterprise Domain Architecture';
  const upperTopic = subjectTopic.toUpperCase();

  // 0. AGENT AI SUB-DOMAIN: Agentic Skill Engineering (skills.md / SKILL.md) in Business Workflows
  if (/skills?\.md|\bskill\b.*workflow|\bworkflow\b.*\bskill\b|skill engineering|agentic skill/i.test(pLower)) {
    return {
      headerTitle: `${upperTopic} — AGENTIC SKILL (SKILLS.MD) & BUSINESS WORKFLOW ARCHITECTURE`,
      headerSubtitle: `Semantic Intent Triggering, Lazy Context Loading, Procedural Playbook DAG Execution, Harness Guardrails & Self-Healing Verification`,
      footerText: `AGENTIC SKILL LIFECYCLE | 01 INTENT & LAZY LOAD • 02 PROCEDURAL PLAYBOOK DAG • 03 HARNESS & QUALITY GATE • 04 SKILL FLYWHEEL`,
      tiers: [
        {
          num: '01',
          title: 'SEMANTIC INTENT TRIGGER & LAZY CONTEXT LOADING',
          subtitle: 'Zero-bloat skill discovery and just-in-time domain context injection into the agent window',
          primaryColor: '#2563EB',
          lightBg: '#EFF6FF',
          borderColor: '#93C5FD',
          cards: [
            {
              title: 'YAML Frontmatter Trigger Index',
              badge: 'DISCOVERY',
              bullets: [
                'Lightweight metadata (`name`, `description`, `triggers`)',
                'Matches business event (e.g. RFP arrival, invoice anomaly)',
                'Keeps idle context window 95% free of unused instructions'
              ]
            },
            {
              title: 'Just-In-Time (Lazy) Skill Loader',
              badge: 'CONTEXT LOAD',
              bullets: [
                'Loads full `SKILL.md` playbook only when triggered',
                'Mounts required reference templates & JSON schemas',
                'Injects domain-specific few-shot golden examples'
              ]
            },
            {
              title: 'Input Contract & Precondition Check',
              badge: 'VALIDATION',
              bullets: [
                'Validates business payload against strict Zod/JSON schema',
                'Verifies required API credentials & tenant permissions',
                'Rejects incomplete requests with actionable missing-field prompts'
              ]
            }
          ],
          gateTitle: 'Preconditions Met?',
          gatePassLabel: 'Skill Context Mounted',
          bottomRuleText: 'Rule 01: Never stuff all business SOPs into the global system prompt—register lightweight triggers and lazy-load `SKILL.md` on demand.'
        },
        {
          num: '02',
          title: 'PROCEDURAL PLAYBOOK & DETERMINISTIC TOOL DAG',
          subtitle: 'Step-by-step domain execution combining LLM reasoning with deterministic scripts and MCP APIs',
          primaryColor: '#7C3AED',
          lightBg: '#F5F3FF',
          borderColor: '#C4B5FD',
          cards: [
            {
              title: 'Deterministic Execution DAG',
              badge: 'PLAYBOOK',
              bullets: [
                'Explicit ordered steps (Step 1: Extract -> Step 2: Reconcile)',
                'Bans ad-hoc guessing via strict domain decision trees',
                'Separates LLM synthesis steps from deterministic math/SQL'
              ]
            },
            {
              title: 'Bundled Helper Scripts (`scripts/`)',
              badge: 'AUTOMATION',
              bullets: [
                'Offloads brittle regex/math/parsing to Python/TS scripts',
                'Executes reproducible CLI commands inside sandbox',
                'Guarantees 100% deterministic calculation accuracy'
              ]
            },
            {
              title: 'Enterprise MCP & API Connectors',
              badge: 'INTEGRATION',
              bullets: [
                'Invokes typed ERP/CRM/Database tools via MCP protocol',
                'Enforces idempotency keys on all state-mutating calls',
                'Captures structured JSON audit trails per tool hop'
              ]
            }
          ],
          gateTitle: 'DAG Steps Complete?',
          gatePassLabel: 'Draft Deliverable Ready',
          bottomRuleText: 'Rule 02: Offload deterministic math, SQL queries, and schema transformations to bundled scripts (`scripts/`) rather than raw LLM token generation.'
        },
        {
          num: '03',
          title: 'HARNESS GUARDRAILS & CLOSED-LOOP VERIFICATION GATE',
          subtitle: 'Automated pre/post-tool hooks and self-healing quality verification before business sign-off',
          primaryColor: '#EA580C',
          lightBg: '#FFF7ED',
          borderColor: '#FDBA74',
          cards: [
            {
              title: 'Lifecycle Harness (`hooks.json`)',
              badge: 'HARNESS',
              bullets: [
                '`PreToolUse` blocks unauthorized PII/financial mutations',
                '`PostToolUse` validates schema & compliance invariants',
                '`Stop` hook blocks completion until verification passes'
              ]
            },
            {
              title: 'Automated Verification Script',
              badge: 'QUALITY GATE',
              bullets: [
                'Runs dedicated skill verifier (`verify_skill_output.ts`)',
                'Checks cross-field financial/regulatory reconciliation',
                'Asserts zero hallucinated citations or ungrounded claims'
              ]
            },
            {
              title: 'Autonomous Self-Healing Loop',
              badge: 'REMEDIATION',
              bullets: [
                'Feeds verification failure diffs back into the agent',
                'Autonomously repairs schema/calculation defects (max 3x)',
                'Escalates to Human-in-the-Loop (HITL) only if unresolved'
              ]
            }
          ],
          gateTitle: 'Passed Quality Gate?',
          gatePassLabel: 'Certified Business Output',
          bottomRuleText: 'Rule 03: Every business skill MUST include an executable verification command that the `Stop` hook runs before returning results.'
        },
        {
          num: '04',
          title: 'ENTERPRISE KNOWLEDGE FLYWHEEL & SKILL EVOLUTION',
          subtitle: 'Continuous learning from human edits and lockstep governance synchronization',
          primaryColor: '#059669',
          lightBg: '#ECFDF5',
          borderColor: '#6EE7B7',
          cards: [
            {
              title: 'Business Deliverable Syndication',
              badge: 'DELIVERY',
              bullets: [
                'Publishes certified artifact (PDF/Docx/Slide/ERP update)',
                'Attaches cryptographic provenance & confidence scorecard',
                'Notifies stakeholders via Slack/Teams/Email webhooks'
              ]
            },
            {
              title: 'Human-in-the-Loop Delta Capture',
              badge: 'FEEDBACK',
              bullets: [
                'Diffs human reviewer edits against agent draft output',
                'Extracts root-cause domain edge cases from human overrides',
                'Appends new edge-case rules to `SKILL.md` (`amendment_log`)'
              ]
            },
            {
              title: 'Lockstep Governance Sync',
              badge: 'GOVERNANCE',
              bullets: [
                'Synchronizes updated `SKILL.md` across repo & global hub',
                'Updates regression eval dataset with newly solved cases',
                'Maintains SHA-256 lockstep across all agent workers'
              ]
            }
          ],
          gateTitle: 'Synced to Skill Hub?',
          gatePassLabel: 'Flywheel Upgraded',
          bottomRuleText: 'Rule 04: Whenever a human corrects an agent output in production, capture the diff and codify the new invariant into `skills.md` / `SKILL.md`.'
        }
      ]
    };
  }

  // 1. AGENT AI SUB-DOMAIN: Teacher-Student Distillation, RLVR (GRPO) & Cascade Routing
  if (/distill|rlvr|grpo|teacher.*student|student.*teacher|slm\b/i.test(pLower)) {
    return {
      headerTitle: `${upperTopic} — TEACHER-STUDENT DISTILLATION & RLVR ARCHITECTURE`,
      headerSubtitle: `Frontier Teacher Trajectory Synthesis, Verifiable Reward Filtering (RLVR/GRPO), SFT/DPO Distillation & Low-Latency Student Cascade`,
      footerText: `AGENTIC AI DISTILLATION STACK | 01 CASCADE ROUTING • 02 TEACHER SYNTHESIS • 03 RLVR VERIFIABLE REWARDS • 04 STUDENT SERVING`,
      tiers: [
        {
          num: '01',
          title: 'SEMANTIC CASCADE ROUTER & INTENT TRIAGE',
          subtitle: 'Dynamic confidence routing between fast Student SLMs and frontier Teacher LLMs',
          primaryColor: '#2563EB',
          lightBg: '#EFF6FF',
          borderColor: '#93C5FD',
          cards: [
            {
              title: 'Semantic Complexity Classifier',
              badge: 'ROUTER',
              bullets: [
                'Sub-10ms embedding intent & difficulty scoring',
                'Routes 80%+ routine queries to Student SLM',
                'Escalates multi-hop reasoning to Frontier Teacher'
              ]
            },
            {
              title: 'Prefix KV-Cache & Prompt Store',
              badge: 'CACHING',
              bullets: [
                'Shared system prompt & tool definition KV-cache',
                'Deduplicates recurring context window prefixes',
                'Cuts Time-To-First-Token (TTFT) by 65%'
              ]
            },
            {
              title: 'Hard-Negative Mining Sink',
              badge: 'TELEMETRY',
              bullets: [
                'Captures low-confidence Student fallbacks',
                'Logs user edits, retries & tool execution errors',
                'Feeds hard prompts into Teacher synthesis queue'
              ]
            }
          ],
          gateTitle: 'Confidence >= 0.85?',
          gatePassLabel: 'Fast Student Path',
          bottomRuleText: 'Rule 01: Never invoke a 100B+ Teacher model for tasks a distilled 8B Student SLM solves with >= 0.85 verified confidence.'
        },
        {
          num: '02',
          title: 'FRONTIER TEACHER REASONING & TRAJECTORY SYNTHESIS',
          subtitle: 'High-compute System-2 teacher generation of golden reasoning chains and tool trajectories',
          primaryColor: '#7C3AED',
          lightBg: '#F5F3FF',
          borderColor: '#C4B5FD',
          cards: [
            {
              title: 'Frontier Teacher Ensemble',
              badge: 'TEACHER LLM',
              bullets: [
                'Gemini 2.5 Pro / Claude 3.7 Sonnet high-reasoning',
                'Generates explicit Chain-of-Thought (CoT) traces',
                'Synthesizes multi-step MCP tool invocation DAGs'
              ]
            },
            {
              title: 'Best-of-N Trajectory Rollouts',
              badge: 'EXPLORATION',
              bullets: [
                'Samples N=8 diverse reasoning paths per prompt',
                'Explores alternative code & SQL query formulations',
                'Pairs positive winners with rejected contrast pairs'
              ]
            },
            {
              title: 'Synthetic Curriculum Expander',
              badge: 'DATA GEN',
              bullets: [
                'Mutates edge-case constraints & schema variations',
                'Balances domain coverage across rare failure modes',
                'Strips teacher identity hallucinations & boilerplate'
              ]
            }
          ],
          gateTitle: 'Reasoning Complete?',
          gatePassLabel: 'Candidate Trajectories',
          bottomRuleText: 'Rule 02: Harvest full intermediate reasoning traces and tool call ASTs from the Teacher, not just final surface answers.'
        },
        {
          num: '03',
          title: 'VERIFIABLE REWARD FILTERING (RLVR / GRPO)',
          subtitle: 'Execution-grounded deterministic verification filtering out hallucinated trajectories',
          primaryColor: '#EA580C',
          lightBg: '#FFF7ED',
          borderColor: '#FDBA74',
          cards: [
            {
              title: 'Deterministic Execution Sandbox',
              badge: 'RLVR VERIFIER',
              bullets: [
                'Compiles generated code (`tsc --noEmit` / unit tests)',
                'Executes SQL/GraphQL against schema sandboxes',
                'Assigns binary verifiable reward (R = +1.0 or 0.0)'
              ]
            },
            {
              title: 'Group Relative Policy Optimization',
              badge: 'GRPO ALIGNMENT',
              bullets: [
                'Computes group-normalized advantage across rollouts',
                'Eliminates separate critic model memory overhead',
                'Penalizes verbose CoT token bloat & formatting drift'
              ]
            },
            {
              title: 'SFT & DPO Dataset Curator',
              badge: 'CURATION',
              bullets: [
                'Packs verified (Prompt, CoT, Tool AST) golden tuples',
                'Constructs Direct Preference Optimization (DPO) pairs',
                'Enforces strict contamination & PII redaction gates'
              ]
            }
          ],
          gateTitle: 'Passed Sandbox Tests?',
          gatePassLabel: 'Verified Golden Set',
          bottomRuleText: 'Rule 03: Never distill unverified Teacher outputs—every training trajectory must pass deterministic compiler or sandbox execution.'
        },
        {
          num: '04',
          title: 'DISTILLED STUDENT SLM SERVING & CONTINUOUS EVAL',
          subtitle: 'High-throughput quantized Student deployment with online drift detection',
          primaryColor: '#059669',
          lightBg: '#ECFDF5',
          borderColor: '#6EE7B7',
          cards: [
            {
              title: 'Distilled Student SLM / VLM',
              badge: 'STUDENT MODEL',
              bullets: [
                'Fine-tuned Gemini 2.5 Flash / Gemma 3 12B / LoRA',
                'FP8 / AWQ quantization on vLLM / TensorRT-LLM',
                '10x lower latency & 15x lower token cost vs Teacher'
              ]
            },
            {
              title: 'Speculative Decoding Engine',
              badge: 'ACCELERATION',
              bullets: [
                'Draft-target speculative token verification',
                '300+ tokens/sec streaming output throughput',
                'Strict JSON Schema grammar-constrained decoding'
              ]
            },
            {
              title: 'Online Shadow Eval & Drift Loop',
              badge: 'OBSERVABILITY',
              bullets: [
                'Async 5% shadow traffic re-scored by Teacher Judge',
                'Monitors KL-divergence & domain accuracy regression',
                'Triggers automated weekly LoRA distillation refresh'
              ]
            }
          ],
          gateTitle: 'Parity >= 98% Teacher?',
          gatePassLabel: 'Live Student Production',
          bottomRuleText: 'Rule 04: Continuously shadow-test the Student SLM against the Teacher on 5% live traffic to catch distribution drift early.'
        }
      ]
    };
  }

  // 2. AGENT AI SUB-DOMAIN: Test-Time Compute Scaling, System-2 Search & Process Reward Models (PRM)
  if (/test-time|system\s*2|mcts|process reward|prm\b|tree of thought|search.*reason/i.test(pLower)) {
    return {
      headerTitle: `${upperTopic} — TEST-TIME COMPUTE & SYSTEM-2 REASONING`,
      headerSubtitle: `Adaptive Compute Allocation, Tree-of-Thoughts Search (MCTS), Process Reward Models (PRM) & Verifier Consensus`,
      footerText: `TEST-TIME COMPUTE SCALING | 01 ADAPTIVE BUDGET • 02 TREE SEARCH (MCTS) • 03 PROCESS REWARD (PRM) • 04 CONSENSUS SYNTHESIS`,
      tiers: [
        {
          num: '01',
          title: 'ADAPTIVE COMPUTE BUDGET & DIFFICULTY ROUTER',
          subtitle: 'Allocating inference thinking tokens dynamically based on task complexity',
          primaryColor: '#2563EB',
          lightBg: '#EFF6FF',
          borderColor: '#93C5FD',
          cards: [
            {
              title: 'Task Complexity Estimator',
              badge: 'TRIAGE',
              bullets: [
                'Classifies query depth (System-1 fast vs System-2 deep)',
                'Assigns thinking token budget (1K to 32K tokens)',
                'Sets branching factor (B) and search depth (D)'
              ]
            },
            {
              title: 'Problem Decomposer & Planner',
              badge: 'DECOMPOSITION',
              bullets: [
                'Breaks multi-constraint goal into verifiable sub-goals',
                'Formulates explicit formal constraints & invariants',
                'Initializes root state for tree search exploration'
              ]
            },
            {
              title: 'Context & Tool State Snapshot',
              badge: 'STATE INIT',
              bullets: [
                'Captures immutable workspace & AST state snapshot',
                'Prepares forkable sandbox environments for rollouts',
                'Loads domain-specific verification rubrics'
              ]
            }
          ],
          gateTitle: 'Requires System-2 Search?',
          gatePassLabel: 'Allocate Thinking Budget',
          bottomRuleText: 'Rule 01: Scale inference-time compute dynamically—spend 80% of thinking tokens on the hardest 20% reasoning bottlenecks.'
        },
        {
          num: '02',
          title: 'PARALLEL TREE-OF-THOUGHTS & MCTS EXPLORATION',
          subtitle: 'Branching search across alternative reasoning steps and hypothesis trees',
          primaryColor: '#7C3AED',
          lightBg: '#F5F3FF',
          borderColor: '#C4B5FD',
          cards: [
            {
              title: 'Monte Carlo Tree Search (MCTS)',
              badge: 'SEARCH ENGINE',
              bullets: [
                'Balances Exploitation (UCB1) vs Exploration of steps',
                'Expands parallel candidate reasoning branches',
                'Backpropagates step value scores up the search tree'
              ]
            },
            {
              title: 'Self-Correction & Backtracking',
              badge: 'REFLECTION',
              bullets: [
                'Detects dead-end contradictions & compiler errors',
                'Prunes low-probability reasoning subtrees early',
                'Backtracks to last verified intermediate checkpoint'
              ]
            },
            {
              title: 'Diverse Temperature Rollouts',
              badge: 'SAMPLING',
              bullets: [
                'Executes parallel rollouts across varied temperatures',
                'Combines symbolic tool execution with neural reasoning',
                'Generates candidate solution proofs & code diffs'
              ]
            }
          ],
          gateTitle: 'Valid Branch Found?',
          gatePassLabel: 'Candidate Step Tree',
          bottomRuleText: 'Rule 02: Never rely on greedy single-path decoding for complex reasoning; explore parallel branches and backtrack on failure.'
        },
        {
          num: '03',
          title: 'PROCESS REWARD MODEL (PRM) STEP VERIFICATION',
          subtitle: 'Fine-grained step-by-step mathematical and logical verification',
          primaryColor: '#EA580C',
          lightBg: '#FFF7ED',
          borderColor: '#FDBA74',
          cards: [
            {
              title: 'Process Reward Model (PRM)',
              badge: 'STEP SCORER',
              bullets: [
                'Scores every intermediate step P(correct | step_i)',
                'Pinpoints exact line where reasoning diverged',
                'Outperforms Outcome Reward Models (ORM) on credit assignment'
              ]
            },
            {
              title: 'Formal & Symbolic Verifiers',
              badge: 'HARD CHECK',
              bullets: [
                'Executes type-checkers, SMT solvers & unit test harnesses',
                'Validates geometric AABB collision & schema invariants',
                'Assigns zero score to any step violating hard constraints'
              ]
            },
            {
              title: 'Critique & Refinement Generator',
              badge: 'CRITIC',
              bullets: [
                'Synthesizes targeted diagnostic feedback on failed steps',
                'Feeds error trace back into MCTS expansion node',
                'Iterates until step score exceeds threshold (0.95)'
              ]
            }
          ],
          gateTitle: 'All Steps Score >= 0.95?',
          gatePassLabel: 'PRM Certified Path',
          bottomRuleText: 'Rule 03: Verify intermediate reasoning steps with a Process Reward Model (PRM) rather',
        },
        {
          num: '04',
          title: 'MAJORITY VOTING, CONSENSUS & FINAL SYNTHESIS',
          subtitle: 'Weighted ensemble aggregation and verifiable output delivery',
          primaryColor: '#059669',
          lightBg: '#ECFDF5',
          borderColor: '#6EE7B7',
          cards: [
            {
              title: 'PRM-Weighted Majority Voting',
              badge: 'CONSENSUS',
              bullets: [
                'Clusters semantically equivalent final answers',
                'Weights each trajectory by cumulative PRM step score',
                'Selects highest-confidence consensus solution'
              ]
            },
            {
              title: 'Explanation & Proof Compiler',
              badge: 'DELIVERY',
              bullets: [
                'Strips pruned search branches & dead-end traces',
                'Synthesizes clean, auditable step-by-step proof',
                'Attaches verifiable execution logs & test badges'
              ]
            },
            {
              title: 'Trajectory Memory Archival',
              badge: 'FLYWHEEL',
              bullets: [
                'Stores solved System-2 trajectories in Episodic Memory',
                'Feeds verified hard solutions into future RLVR training',
                'Amortizes search cost across recurring problem classes'
              ]
            }
          ],
          gateTitle: 'Consensus Verified?',
          gatePassLabel: 'System-2 Certified Output',
          bottomRuleText: 'Rule 04: Archive verified System-2 search trajectories into episodic memory so future similar queries resolve in System-1 time.'
        }
      ]
    };
  }

  // 3. AGENT AI SUB-DOMAIN: Multimodal VLM Computer-Use & Autonomous Browser/GUI Agents
  if (/vlm\b|computer use|browser agent|gui agent|set-of-marks|multimodal.*agent|vision.*agent/i.test(pLower)) {
    return {
      headerTitle: `${upperTopic} — MULTIMODAL VLM & COMPUTER-USE AGENT ARCHITECTURE`,
      headerSubtitle: `Visual Viewport Perception (Set-of-Marks), DOM/Accessibility Fusion, Sandboxed Coordinate Action Loop & Visual QA`,
      footerText: `VLM COMPUTER-USE STACK | 01 VISUAL PERCEPTION • 02 SPATIAL GROUNDING • 03 SANDBOXED GUI ACTION • 04 VISUAL QA LOOP`,
      tiers: [
        {
          num: '01',
          title: 'MULTIMODAL VIEWPORT PERCEPTION & SOM TAGGING',
          subtitle: 'High-resolution visual screenshot capture fused with live DOM & Accessibility trees',
          primaryColor: '#2563EB',
          lightBg: '#EFF6FF',
          borderColor: '#93C5FD',
          cards: [
            {
              title: '2x Retina Viewport Capture',
              badge: 'VISION INPUT',
              bullets: [
                'Captures live headless Chrome / OS desktop framebuffer',
                'Detects visual modals, canvas renders & SVG viewports',
                'Handles dynamic animations via settling synchronization'
              ]
            },
            {
              title: 'Set-of-Marks (SoM) Overlay Engine',
              badge: 'SOM TAGGING',
              bullets: [
                'Projects numbered bounding-box badges [1..N] onto UI elements',
                'Maps visual badge IDs to exact DOM selectors & coordinates',
                'Eliminates raw pixel coordinate hallucination in VLMs'
              ]
            },
            {
              title: 'DOM & AXTree Structural Fusion',
              badge: 'HYBRID STATE',
              bullets: [
                'Extracts filtered Accessibility Tree (AXTree) hierarchy',
                'Captures computed CSS visibility, z-index & bounding rects',
                'Provides dual visual + semantic state to the VLM planner'
              ]
            }
          ],
          gateTitle: 'Viewport Settled & Tagged?',
          gatePassLabel: 'Grounded Visual State',
          bottomRuleText: 'Rule 01: Always fuse 2x Retina screenshots with Set-of-Marks (SoM) bounding tags so the VLM selects discrete element IDs, not guessed pixels.'
        },
        {
          num: '02',
          title: 'VLM SPATIAL GROUNDING & ACTION PLANNING',
          subtitle: 'Multimodal reasoning over UI state transitions and step-by-step action synthesis',
          primaryColor: '#7C3AED',
          lightBg: '#F5F3FF',
          borderColor: '#C4B5FD',
          cards: [
            {
              title: 'Multimodal VLM Planner',
              badge: 'GEMINI 2.5 PRO VLM',
              bullets: [
                'Reasons jointly over goal prompt, SoM screenshot & AXTree',
                'Predicts expected visual state transition after action',
                'Outputs structured action AST (`click(#42)`, `type(#15, text)`)'
              ]
            },
            {
              title: 'Obstacle & Modal Interceptor',
              badge: 'RESILIENCE',
              bullets: [
                'Identifies cookie banners, auth walls & blocking overlays',
                'Generates pre-requisite dismiss actions automatically',
                'Prevents click interception by transparent z-index masks'
              ]
            },
            {
              title: 'Coordinate & Selector Resolver',
              badge: 'GROUNDING',
              bullets: [
                'Translates SoM ID `[#42]` to center `(x, y)` and DOM node',
                'Verifies target element is within viewport scroll bounds',
                'Computes smooth scroll trajectory if target is off-screen'
              ]
            }
          ],
          gateTitle: 'Action Safe & Grounded?',
          gatePassLabel: 'Verified Action AST',
          bottomRuleText: 'Rule 02: Prefer direct DOM-level clicks (`el.click()`) over raw mouse coordinates whenever an overlay mask could intercept physical clicks.'
        },
        {
          num: '03',
          title: 'SANDBOXED BROWSER / OS EXECUTION HARNESS',
          subtitle: 'Deterministic CDP / OS-level execution with settling delays and network guards',
          primaryColor: '#EA580C',
          lightBg: '#FFF7ED',
          borderColor: '#FDBA74',
          cards: [
            {
              title: 'Chrome DevTools Protocol (CDP)',
              badge: 'EXECUTION',
              bullets: [
                'Dispatches hardware-synthesized mouse, keyboard & drag events',
                'Intercepts network XHR/Fetch responses & console errors',
                'Enforces isolated ephemeral browser profile sandboxing'
              ]
            },
            {
              title: '800ms Settling Synchronization',
              badge: 'TIMING GUARD',
              bullets: [
                'Injects mandatory 800ms settling delay after state clicks',
                'Waits for React hydration, CSS transitions & iframe renders',
                'Uses Node-level timeouts across full page reloads'
              ]
            },
            {
              title: 'Privilege & Origin Perimeter',
              badge: 'SECURITY',
              bullets: [
                'Blocks unauthorized external domain navigation & downloads',
                'Requires explicit HITL confirmation for destructive submits',
                'Logs full video/screenshot trajectory audit trail'
              ]
            }
          ],
          gateTitle: 'Action Executed Cleanly?',
          gatePassLabel: 'Post-Action Frame Ready',
          bottomRuleText: 'Rule 03: Always enforce an 800ms synchronization delay after UI interactions before capturing the verification screenshot.'
        },
        {
          num: '04',
          title: 'VISUAL REGRESSION & FORENSIC QA AUDITOR',
          subtitle: 'Closed-loop multimodal diffing and autonomous self-healing remediation',
          primaryColor: '#059669',
          lightBg: '#ECFDF5',
          borderColor: '#6EE7B7',
          cards: [
            {
              title: 'Omni Multimodal Forensic Judge',
              badge: 'VISUAL QA',
              bullets: [
                'Compares Before vs After screenshots for expected delta',
                'Inspects live SVG/DOM bounding boxes for label collisions',
                'Verifies zero blank canvases, broken images or error toasts'
              ]
            },
            {
              title: 'Pixelmatch & Layout Drift Gate',
              badge: 'REGRESSION',
              bullets: [
                'Computes pixel-by-pixel structural similarity score',
                'Asserts container aspect ratios (16:9 widescreen parity)',
                'Flags any overlapping text or clipped header borders'
              ]
            },
            {
              title: 'Autonomous Self-Healing Loop',
              badge: 'REMEDIATION',
              bullets: [
                'Automatically diagnoses root cause of visual defects',
                'Adjusts CSS/XML layout coordinates and re-renders',
                'Loops autonomously until 100% zero-defect certification'
              ]
            }
          ],
          gateTitle: 'Zero Visual Defects?',
          gatePassLabel: 'Certified Visual Artifact',
          bottomRuleText: 'Rule 04: Never certify a UI or diagram based solely on HTTP 200 status codes—physically inspect the rendered screenshot and DOM bounding boxes.'
        }
      ]
    };
  }

  // 4. GENERIC / UNIVERSAL ENTERPRISE TOPIC (Default 4-Tier Synthesis for ANY other topic)
  return {
    headerTitle: `${upperTopic} — 4-TIER ARCHITECTURAL INFOGRAPHIC`,
    headerSubtitle: `End-to-End Ingestion, Governance Harness, Validation Loop & Knowledge Graph Topology for ${subjectTopic}`,
    footerText: `ARCHITECTURAL SYNTHESIS: ${upperTopic} | TIERED INFOGRAPHIC BLUEPRINT (01 INGESTION • 02 HARNESS • 03 VALIDATION • 04 GRAPH)`,
    tiers: [
      {
        num: '01',
        title: 'SOURCE INGESTION & CONTEXT LAYER',
        subtitle: `What the ${subjectTopic} system ingests, normalizes & contextualizes`,
        primaryColor: '#2563EB',
        lightBg: '#EFF6FF',
        borderColor: '#93C5FD',
        cards: [
          {
            title: `${subjectTopic} Data Sources`,
            badge: 'INGESTION',
            bullets: [
              `Primary ${subjectTopic} payloads & schemas`,
              'Real-time streaming & batch API endpoints',
              'Multi-format structural normalization'
            ]
          },
          {
            title: 'Context & Schema Registry',
            badge: 'CONTEXT',
            bullets: [
              'Canonical entity & metadata definitions',
              'Semantic context window boundaries',
              'Versioned schema contracts & lineage'
            ]
          },
          {
            title: 'Access & Identity Perimeter',
            badge: 'SECURITY',
            bullets: [
              'Role-based access control (RBAC / ABAC)',
              'Field-level encryption & PII redaction',
              'Cryptographic provenance verification'
            ]
          }
        ],
        gateTitle: 'Schema & Context Valid?',
        gatePassLabel: 'Verified Context',
        bottomRuleText: `Rule 01: Enforce strict ${subjectTopic} schema contracts at ingestion before downstream processing.`
      },
      {
        num: '02',
        title: 'ORCHESTRATION HARNESS & POLICY ENGINE',
        subtitle: `Standing guardrails, tools, and execution policies around ${subjectTopic}`,
        primaryColor: '#7C3AED',
        lightBg: '#F5F3FF',
        borderColor: '#C4B5FD',
        cards: [
          {
            title: `${subjectTopic} Policy Harness`,
            badge: 'HARNESS',
            bullets: [
              'Deterministic compliance & policy rules',
              'Automated pre-execution invariant checks',
              'Zero-bypass operational boundaries'
            ]
          },
          {
            title: 'Tooling & Connector Mesh',
            badge: 'ORCHESTRATION',
            bullets: [
              'Typed synchronous & async service adapters',
              'Idempotent transaction execution',
              'Circuit-breaker & rate-limiting armor'
            ]
          },
          {
            title: 'Telemetry & Audit Logging',
            badge: 'OBSERVABILITY',
            bullets: [
              'Immutable execution trace logs',
              'Real-time latency & SLA monitoring',
              'Forensic anomaly detection alerts'
            ]
          }
        ],
        gateTitle: 'Policy Harness Passed?',
        gatePassLabel: 'Compliant Execution',
        bottomRuleText: `Rule 02: Execute all ${subjectTopic} operations inside a policy-enforced harness with full audit telemetry.`
      },
      {
        num: '03',
        title: 'AUTONOMOUS VALIDATION & FEEDBACK LOOP',
        subtitle: `Continuous verification, reconciliation & self-healing loop for ${subjectTopic}`,
        primaryColor: '#EA580C',
        lightBg: '#FFF7ED',
        borderColor: '#FDBA74',
        cards: [
          {
            title: 'Automated Quality Gate',
            badge: 'VERIFICATION',
            bullets: [
              'Multi-stage semantic & structural validation',
              'Automated drift & regression detection',
              'Deterministic pass/fail quality rubrics'
            ]
          },
          {
            title: 'Self-Healing Reconciliation',
            badge: 'REMEDIATION',
            bullets: [
              'Closed-loop error diagnosis & retry',
              'Automated state rollback on violation',
              'Quarantine queue for unresolvable exceptions'
            ]
          },
          {
            title: 'Continuous Optimization',
            badge: 'FEEDBACK',
            bullets: [
              'Feedback telemetry back to ingestion layer',
              'Adaptive threshold & rule refinement',
              'Continuous throughput & accuracy tuning'
            ]
          }
        ],
        gateTitle: 'Quality SLA Certified?',
        gatePassLabel: 'Certified Output',
        bottomRuleText: `Rule 03: Every ${subjectTopic} state transition must pass closed-loop validation or trigger autonomous self-healing.`
      },
      {
        num: '04',
        title: 'SEMANTIC KNOWLEDGE GRAPH & CONSUMPTION',
        subtitle: `Connected entity topology, cross-domain intelligence & consumer APIs for ${subjectTopic}`,
        primaryColor: '#059669',
        lightBg: '#ECFDF5',
        borderColor: '#6EE7B7',
        cards: [
          {
            title: `${subjectTopic} Knowledge Graph`,
            badge: 'GRAPH',
            bullets: [
              'Connected entity & relationship topology',
              'Cross-domain semantic link resolution',
              'High-speed graph traversal & querying'
            ]
          },
          {
            title: 'Intelligence & Analytics Hub',
            badge: 'INSIGHTS',
            bullets: [
              'Real-time executive KPI dashboards',
              'Predictive topology & impact analysis',
              'AI-ready grounded retrieval (RAG / GraphRAG)'
            ]
          },
          {
            title: 'Enterprise Consumer APIs',
            badge: 'DELIVERY',
            bullets: [
              'Low-latency GraphQL, REST & event streams',
              'Multi-tenant partner & ecosystem syndication',
              'SLA-backed enterprise data products'
            ]
          }
        ],
        gateTitle: 'Published to Graph?',
        gatePassLabel: 'Live in Production',
        bottomRuleText: `Rule 04: Expose certified ${subjectTopic} intelligence via connected knowledge graph APIs and real-time event streams.`
      }
    ]
  };
}

export interface InfographicSpec {
  headerTitle: string;
  headerSubtitle: string;
  footerText: string;
  tiers: TierSpec[];
}

export function renderInfographicSpecToXml(spec: InfographicSpec): string {
  const cells: string[] = [];

  // 1. Top Widescreen Header Banner
  cells.push(`
    <mxCell id="header_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=2;arcSize=6;" vertex="1" parent="1">
      <mxGeometry x="30" y="20" width="1540" height="72" as="geometry" />
    </mxCell>
    <mxCell id="header_title" value="${escapeXml(spec.headerTitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=20;fontStyle=1;fontColor=#F8FAFC;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
      <mxGeometry x="50" y="26" width="1100" height="32" as="geometry" />
    </mxCell>
    <mxCell id="header_subtitle" value="${escapeXml(spec.headerSubtitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontStyle=0;fontColor=#38BDF8;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
      <mxGeometry x="50" y="56" width="1100" height="24" as="geometry" />
    </mxCell>
    <mxCell id="header_badge" value="4-TIER ARCHITECTURAL INFOGRAPHIC" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#38BDF8;fontSize=11;fontStyle=1;arcSize=50;" vertex="1" parent="1">
      <mxGeometry x="1260" y="36" width="290" height="36" as="geometry" />
    </mxCell>
  `);

  const startY = 108;
  const tierHeight = 192;
  const tierGap = 14;

  spec.tiers.forEach((tier, idx) => {
    const y = startY + idx * (tierHeight + tierGap);

    // Dashed Tier Enclave Container
    cells.push(`
      <mxCell id="tier_bg_${idx}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${tier.lightBg};strokeColor=${tier.borderColor};strokeWidth=2;dashed=1;dashPattern=6 4;arcSize=4;" vertex="1" parent="1">
        <mxGeometry x="30" y="${y}" width="1540" height="${tierHeight}" as="geometry" />
      </mxCell>
    `);

    // Left Numbered Spine Badge (01..04)
    cells.push(`
      <mxCell id="tier_spine_${idx}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${tier.primaryColor};strokeColor=none;arcSize=8;" vertex="1" parent="1">
        <mxGeometry x="44" y="${y + 14}" width="220" height="${tierHeight - 28}" as="geometry" />
      </mxCell>
      <mxCell id="tier_num_${idx}" value="TIER ${tier.num}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=12;fontStyle=1;fontColor=#E2E8F0;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
        <mxGeometry x="60" y="${y + 26}" width="188" height="22" as="geometry" />
      </mxCell>
      <mxCell id="tier_title_${idx}" value="${escapeXml(tier.title)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=14;fontStyle=1;fontColor=#FFFFFF;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
        <mxGeometry x="60" y="${y + 50}" width="188" height="48" as="geometry" />
      </mxCell>
      <mxCell id="tier_sub_${idx}" value="${escapeXml(tier.subtitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=10.5;fontStyle=0;fontColor=#F1F5F9;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
        <mxGeometry x="60" y="${y + 104}" width="188" height="64" as="geometry" />
      </mxCell>
    `);

    // 3 Domain Cards inside the tier
    const cardStartX = 284;
    const cardWidth = 315;
    const cardGap = 18;
    const cardHeight = 124;

    tier.cards.forEach((card, cIdx) => {
      const cx = cardStartX + cIdx * (cardWidth + cardGap);
      const cy = y + 14;

      const bulletHtml = card.bullets
        .map(b => `<li style="margin-bottom:3px;">${escapeXml(b)}</li>`)
        .join('');

      const cardHtml = `<div style="font-family:Inter,sans-serif;text-align:left;padding:6px 10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:12.5px;font-weight:700;color:#0F172A;">${escapeXml(card.title)}</span>
          <span style="font-size:9px;font-weight:700;color:${tier.primaryColor};background:${tier.lightBg};border:1px solid ${tier.borderColor};padding:1px 6px;border-radius:10px;">${escapeXml(card.badge)}</span>
        </div>
        <ul style="margin:0;padding-left:15px;font-size:10.5px;color:#334155;line-height:1.35;">
          ${bulletHtml}
        </ul>
      </div>`;

      cells.push(`
        <mxCell id="tier_${idx}_card_${cIdx}" value="${escapeXml(cardHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${tier.borderColor};strokeWidth=1.5;verticalAlign=top;align=left;arcSize=6;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="${cx}" y="${cy}" width="${cardWidth}" height="${cardHeight}" as="geometry" />
        </mxCell>
      `);

      // Horizontal connector arrow between cards
      if (cIdx < tier.cards.length - 1) {
        cells.push(`
          <mxCell id="tier_${idx}_edge_${cIdx}" value="" style="edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${tier.primaryColor};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_${idx}_card_${cIdx}" target="tier_${idx}_card_${cIdx + 1}">
            <mxGeometry relative="1" as="geometry" />
          </mxCell>
        `);
      }
    });

    // Right-rail Governance Decision Gate Rhombus
    const gateX = 1300;
    const gateY = y + 26;
    cells.push(`
      <mxCell id="tier_${idx}_gate" value="${escapeXml(tier.gateTitle)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${tier.primaryColor};strokeWidth=2;fontColor=#0F172A;fontSize=10.5;fontStyle=1;" vertex="1" parent="1">
        <mxGeometry x="${gateX}" y="${gateY}" width="130" height="96" as="geometry" />
      </mxCell>
      <mxCell id="tier_${idx}_gate_edge" value="" style="edgeStyle=none;html=1;strokeColor=${tier.primaryColor};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_${idx}_card_2" target="tier_${idx}_gate">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
      <mxCell id="tier_${idx}_pass_pill" value="✓ ${escapeXml(tier.gatePassLabel)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${tier.primaryColor};strokeColor=none;fontColor=#FFFFFF;fontSize=10;fontStyle=1;arcSize=50;" vertex="1" parent="1">
        <mxGeometry x="1446" y="${gateY + 32}" width="110" height="32" as="geometry" />
      </mxCell>
      <mxCell id="tier_${idx}_pass_edge" value="" style="edgeStyle=none;html=1;strokeColor=${tier.primaryColor};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_${idx}_gate" target="tier_${idx}_pass_pill">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `);

    // Bottom Standing Rule / Actionable Prompt Bar per Tier
    cells.push(`
      <mxCell id="tier_${idx}_rule_bar" value="⚡ ${escapeXml(tier.bottomRuleText)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${tier.borderColor};strokeWidth=1.5;align=left;spacingLeft=14;fontSize=11;fontStyle=1;fontColor=#0F172A;arcSize=16;" vertex="1" parent="1">
        <mxGeometry x="284" y="${y + 146}" width="1272" height="34" as="geometry" />
      </mxCell>
    `);

    // Vertical spine flow connector between tiers
    if (idx < spec.tiers.length - 1) {
      cells.push(`
        <mxCell id="spine_flow_${idx}" value="" style="edgeStyle=none;html=1;strokeColor=#475569;strokeWidth=2.5;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_spine_${idx}" target="tier_spine_${idx + 1}">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      `);
    }
  });

  // Bottom Footer Pill
  const footerY = startY + spec.tiers.length * (tierHeight + tierGap) + 4;
  cells.push(`
    <mxCell id="footer_pill" value="${escapeXml(spec.footerText)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=11;fontStyle=1;arcSize=50;" vertex="1" parent="1">
      <mxGeometry x="30" y="${footerY}" width="1540" height="36" as="geometry" />
    </mxCell>
  `);

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas Dynamic Tiered Infographic Engine" version="24.0.0" type="device">
  <diagram id="dynamic_tiered_infographic" name="Tiered Architectural Infographic">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="980" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export function generateDynamicTieredInfographicXml(prompt: string): string {
  return renderInfographicSpecToXml(buildDynamicInfographicTiers(prompt));
}

