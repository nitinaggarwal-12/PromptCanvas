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
                                 │ (gemini-3.5-flash-lite)     │
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

### Stage 1: Explicit Signals & Trigger Phrases
- If `architectureType` is explicitly provided in the request body (e.g., via workspace dropdown or disambiguation chip click), the router immediately selects that template backbone.
- If the prompt matches known `TEMPLATE_TRIGGER_PHRASES` (e.g., `"entity relationship diagram"`, `"sequence diagram"`, `"unified system view"`), it routes deterministically to the matching template backbone.

### Stage 2: Intent Classifier Module (`src/lib/router/intentClassifier.ts`)
- Runs for untyped prompts when `LAYOUT_ENGINE_V2` is enabled.
- Invokes `gemini-3.5-flash-lite` (or configured model) with a build-time prompt embedding all 22 diagram template options and `whenToUse` descriptions.
- **Constraints & Thresholds**:
  - `TEMPLATE_CONFIDENCE_THRESHOLD = 0.8`
  - `FREEFORM_CONFIDENCE_THRESHOLD = 0.6`
  - `CLASSIFIER_TIMEOUT_MS = 2500` (enforced via `AbortController`)
  - Validates output using Zod schema (`IntentClassificationSchema`).
  - Single retry fallback on network/timeout error before returning `null` (never throws).

### Stage 3: Disambiguation Chips UI (`src/components/workspace/DiagramTypeSelector.tsx`)
- Triggered when classifier confidence is `< 0.6` (Ambiguous Classification).
- API returns HTTP 200 with `needsDisambiguation: true` and a list of `suggestedTypes`.
- Workspace displays a modal presenting one-tap chips for the suggested diagram types.
- Clicking a chip re-submits the prompt with explicit `architectureType`, immediately routing to Stage 1.

### Stage 4: Stated Assumptions Banner (`src/components/workspace/AssumptionBanner.tsx`)
- Triggered when diagram is generated with stated assumptions or alternative template recommendations.
- Renders a dismissible top banner on the canvas displaying:
  - Stated assumptions (e.g., `⚡ Assumption: GCP cloud provider`, `⚡ Assumption: REST microservices`).
  - Clickable alternative template pills allowing 1-tap switching.

---

## 🛡️ Error & Fallback Contract

1. **Classifier Failure/Timeout**: If the classifier model fails, times out (>2500ms), or receives invalid JSON, it retries once. If it fails again, it returns `null`.
2. **Deterministic Fallback**: When classification returns `null`, the router falls back to Pipeline V2 freeform generation (`runV2Pipeline`). It **never** throws an unhandled exception into the route handler.
