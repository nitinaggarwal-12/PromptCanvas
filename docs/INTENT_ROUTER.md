# PromptCanvas Intent Router Specification & Architecture

The **PromptCanvas Intent Router** replaces legacy fallback-by-elimination routing with deliberate intent classification for untyped prompts.

---

## 🏛️ 4-Stage Router Architecture

```
User Prompt
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ Stage 1: Explicit ArchitectureType or Trigger Phrase Match  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    Yes ──────┴────── No
                     │                 │
                     ▼                 ▼
          [Template Backbone]    ┌──────────────────────────────┐
                                 │ Stage 2: Intent Classifier   │
                                 │ (gemini-2.5-flash)           │
                                 └──────────────┬───────────────┘
                                                │
                                                ▼
                                  ┌───────────────────────────┐
                                  │ Confidence Evaluation     │
                                  └─────────────┬─────────────┘
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 ▼                              ▼                              ▼
        Confidence >= 0.8              0.6 <= Conf < 0.8               Confidence < 0.6
      (Specific Template)              (Freeform V2)                 (Needs Disambiguation)
                 │                              │                              │
                 ▼                              ▼                              ▼
      [High-Conf Template]           [V2 Freeform Pipeline]         [Disambiguation Chips UI]
```

---

## 🔍 Router Stages

### Stage 1: Explicit Signals & Trigger Phrases (26 Production Google Cloud Blueprints vs. Zero-Template Closed-Loop Default)
- **Stage 1A: Canonical Google Cloud Reference Blueprints (`26/26` Certified)**:
  - Triggered when the user selects or requests one of the 26 production Google Cloud reference blueprints (`#78` Official Google Cloud Architecture Center Hub-and-Spoke, `#00` 2026 Upgraded GCP & Gemini Enterprise Native Architecture, `#35`–`#50` 16 Reference Architectures, or `#67`–`#74` 8 Official Google Cloud Brand Light 7-Layer Operational & Agentic Flow Blueprints).
  - Routes deterministically to the immutable canonical master XML (`src/lib/canonical/canonicalTemplates.ts`).
- **Stage 1B: Zero-Template / Custom Prompt Closed-Loop Semantic Synthesis (`Rule 53`)**:
  - When a user submits an open-ended or custom prompt on a Blank Canvas (`data-blank-canvas="true"`) or without selecting a canonical template, `executeGcpPromptModification` (`src/lib/gcpCoPilotModifier.ts`) and `synthesizePromptDrivenDiagramXml` (`src/lib/promptDrivenDiagramSynthesizer.ts`) route directly to `buildUniversalClosedLoopDomainHarnessXml` (`31` vertices, `26` edges, `shape=rhombus` safety gate, `shape=hexagon` ADK agents, 1:3 parallel counterfactual swimlanes, `shape=cylinder3` Spanner/Bigtable, `#0D9488` closed-loop return highway).
- **Stage 1C: Dynamic Clause-Driven Architecture & Flowchart Synthesis (`Rule 46`)**:
  - Bespoke domain architecture prompts in `/dashboard` and `/studio` route to `adaptSavedGoogleCloudTemplateToPrompt` (`src/lib/promptDrivenDiagramSynthesizer.ts`), extracting 4 domain clauses (`extractPromptDomainClauses`) and populating Tier 3, Tier 4, and Tier 5 node cards with word-safe two-line wrapping (`formatTwoLineCardClause`).
  - Bespoke flowchart prompts route to `generateLogicalFlowchartDrawioXml` (`src/lib/promptDrivenDiagramSynthesizer.ts`), dynamically populating `[1]`, `[1a]`, `[2] ◆ Decision Gate`, `[2b]`, `[3]`, `[3a]`, and Tier 1–3 swimlane headers.

### Stage 2: Architectural Decision Engine (`src/lib/geminiArchitecturalDecisionEngine.ts`)
- Invokes `gemini-2.5-flash` (with fallback to `gemini-2.5-flash`) with discrete `thinkingConfig: { thinkingLevel: 'LOW' | 'MEDIUM' | 'HIGH' }` (`Law 16 / Rule 55`) to classify perspective (`Conceptual`, `Logical`, `Technical`, `Process`), abstraction level (`L1`–`L4`), and recommended blueprint ID among the 26 production Google Cloud blueprints.
- **Constraints & Thresholds**:
  - `TEMPLATE_CONFIDENCE_THRESHOLD = 0.8`
  - `FREEFORM_CONFIDENCE_THRESHOLD = 0.6`
  - Single retry fallback on network/timeout error before returning deterministic fallback decision (never throws).

### Stage 3: Conversational Non-Mutation Gate (`src/lib/intentGuard.ts`)
- Intercepts standalone greetings (`"hi"`), capability queries, courtesies (`"thanks"`), and `<= 2`-word ambiguous inputs with zero canvas mutation and zero version increment (`Law 3`).

### Stage 4: Speculative-Premise Reframing & Grounding Certification (`src/lib/truthfulnessGroundingEngine.ts`)
- Flags speculative premises (`REFRAMED_SPECULATIVE_PREMISE`) and reframes them into verifiable **Counterfactual Digital-Twin / Monte Carlo Simulation Sandboxes** while enforcing fail-closed audit scoring (`0%` on Blank Canvas, `<= 30%` on `< 6`-vertex stubs).

---

## 🧠 Authoritative 5-Tier Google / Gemini / DeepMind Model Selection (`src/lib/geminiConfig.ts` — `v3.3.0`)

| Tier | Role & Engineering Surface | Canonical Model Identifier |
| :--- | :--- | :--- |
| **Tier 0** | Chief Architecture SME Director & Multimodal Forensic Audit Gate | `gemini-2.5-pro` |
| **Tier 1** | Deep Reasoning, 6-Dimension Domain Research, Vision Decompilation & 16 Living Specs | `gemini-2.5-pro` |
| **Tier 2** | High-Speed Interactive Copilot, Intent Classifier (<2.5s), 4-Category Non-Mutation Gate & Prompt Enhancer | `gemini-2.5-flash` |
| **Tier 3** | Real-Time Bidirectional Voice & Video Canvas Co-Pilot | `gemini-2.5-flash` |
| **Tier 4** | Generative Media & Vector Grounding (Video, Audio, Image, TTS, Embeddings) | `veo-3.0-generate-preview` • `lyria-002` • `gemini-2.5-flash-image` • `gemini-2.5-flash-preview-tts` • `text-embedding-005` |

---

## 🛡️ Error & Fallback Contract

1. **Classifier Failure/Timeout**: If the classifier model fails, times out (>2500ms), or receives invalid JSON, it retries once. If it fails again, it returns `null`.
2. **Deterministic Fallback**: When classification returns `null`, the router falls back to Pipeline V2 freeform generation (`runV2Pipeline`). It **never** throws an unhandled exception into the route handler.

