# PromptCanvas — Quality Eval Harness

**Purpose:** produce the numbers in Section 5 of the investment memo, and stop
model upgrades from silently degrading output quality.

**Design constraint that matters most:** the harness must be able to say
*"we got worse."* A harness that can only produce favourable numbers is
marketing with a test runner attached, and a reviewer will spot it in one
question. Everything below is built so that a regression is visible and blocking.

---

## 1. What we are measuring

Three separable things. Conflating them is the most common failure in LLM eval work.

| Layer | Question | Method | Cost | Runs |
|---|---|---|---|---|
| **L1 — Mechanical** | Is the output structurally valid? | Deterministic checks (existing validator) | free | every commit |
| **L2 — Semantic** | Does the diagram contain the right things, connected the right way? | Assertion-based, per-prompt | free | every commit |
| **L3 — Judgment** | Would an architect ship this to a customer? | Human raters; LLM-as-judge as a *proxy only* | expensive | weekly + pre-release |

L1 is what the repo already tests. **L1 passing tells you nothing about product
quality** — a perfectly valid diagram of the wrong architecture scores 100%.
The current golden-pipeline test lives entirely at L1/L2 boundary; the memo
needs L3, and L3 is where the credibility is.

---

## 2. Corpus design

### 2.1 Sourcing — the part that must not be shortcut

Prompts must come from **real engagements**, not from your imagination of what a
CE would type. Self-authored prompts unconsciously encode what the system
already handles well, which inflates every number downstream.

Sources, in priority order:
1. Production prompt logs (you already persist prompts — sample from them).
2. CE-submitted prompts collected via a one-question form: *"paste an
   architecture you had to draw in the last month."*
3. Customer RFP / SOW extracts, redacted.

**Target: 200 prompts.** Below ~120 the confidence intervals are too wide to
claim a delta against baseline; above ~300 the human rating cost becomes the
bottleneck.

### 2.2 Stratification

Sample deliberately across axes so a weak stratum can't hide inside a good average:

| Axis | Strata |
|---|---|
| Complexity | ≤8 nodes / 9–20 / 21+ |
| Domain | HCLS, fintech, retail, generic SaaS, data platform |
| Diagram type | system architecture, sequence, data flow, deployment, swimlane |
| Cloud | GCP-only, hybrid, multi-cloud, cloud-agnostic |
| Prompt quality | precise / vague / contradictory / under-specified |

That last row matters more than it looks. Real CE prompts are vague. A harness
built only on well-formed prompts measures a system nobody uses.

### 2.3 Held-out split

- **Dev set (60%)** — visible during development, used for iteration.
- **Locked set (40%)** — sealed, used only for release numbers and the memo.

Prompt-engineering against the locked set is the fastest way to produce numbers
that don't survive contact with users. Enforce with a directory ACL or a
separate private repo, not with discipline.

### 2.4 Record schema

```jsonc
// evals/corpus/<id>.json
{
  "id": "hcls-042",
  "prompt": "…verbatim, unedited…",
  "source": "production_log | ce_submitted | rfp",
  "collected_at": "2026-08-14",
  "strata": {
    "complexity": "medium",
    "domain": "hcls",
    "diagram_type": "system_architecture",
    "cloud": "gcp",
    "prompt_quality": "vague"
  },
  "split": "dev | locked",

  // L2 assertions — written by a human once, reused forever
  "expect": {
    "must_contain": ["Cloud Healthcare API", "FHIR store", "BigQuery"],
    "must_connect": [["FHIR store", "BigQuery"]],
    "must_not_contain": ["S3", "DynamoDB"],
    "min_nodes": 6,
    "max_nodes": 24,
    "must_group": ["VPC", "project boundary"]
  },

  "notes": "PHI path must be visually distinct — check at L3"
}
```

Authoring `expect` blocks for 200 prompts is roughly 2–3 days of architect time.
It is the single highest-leverage investment in this whole plan: it converts L3
judgment into L2 automation permanently.

---

## 3. Rubric (L3)

Five dimensions, 1–5, rated **blind** — rater must not know which system produced
the artifact.

| # | Dimension | 1 | 3 | 5 |
|---|---|---|---|---|
| **C** | **Correctness** — components and relationships match the described architecture | Fundamentally wrong | Right shape, notable errors | Accurate |
| **P** | **Completeness** — nothing material missing, nothing invented | Major omissions or hallucinated services | Minor gaps | Complete, no invention |
| **L** | **Layout** — readability, crossings, grouping, hierarchy | Unreadable | Readable, needs cleanup | Publication-clean |
| **B** | **Branding & convention** — correct GCP iconography, naming, conventions | Wrong/absent icons | Mixed | Correct throughout |
| **S** | **Ship-readiness** — *binary*: would you put this in front of a customer with **zero** edits? | — | — | yes / no |

**Headline metric: `S` — zero-edit ship rate.** One number, brutally honest,
immediately legible to a reviewer. C/P/L/B exist to diagnose *why* S is low.

### 3.1 Rater protocol

- **3 raters**, all practising architects, none of them you.
- Blind to system identity; artifacts randomised and stripped of watermarks.
- Rate the **rendered PNG**, not the XML — that's what users judge.
- Report **inter-rater agreement** (Krippendorff's α or Fleiss' κ). If α < 0.6,
  your rubric is ambiguous — fix the rubric before trusting any number from it.
  Publishing scores without an agreement figure is the tell of an unserious eval.

### 3.2 LLM-as-judge

Useful for weekly signal, **not** for the memo. Rules:
- Calibrate against human ratings on ≥50 artifacts; report the correlation.
- Never use the same model family being evaluated as its own judge.
- If human/judge correlation < 0.7, the judge is decoration — drop it.

---

## 4. Baselines — non-negotiable

Absolute numbers persuade nobody. `S = 62%` is meaningless until it sits beside
a baseline. Run the identical corpus through:

| Baseline | Why it's in the set |
|---|---|
| **B0** — Gemini → mxGraph XML directly, one prompt, no pipeline | Proves Pipeline V2 earns its complexity. **If PromptCanvas doesn't clearly beat B0, you don't have a product — you have a wrapper.** This is the result you most need and most want to avoid running. |
| **B1** — Gemini → Mermaid → render | The cheap alternative a skeptic will name |
| **B2** — best external tool (Eraser DiagramGPT / Lucid AI) | The competitive answer |
| **B3** — human architect, timed | Establishes the ceiling and the time-saved claim |
| **B4** — PromptCanvas V1 (legacy pipeline) | Shows V2 was worth building |

Every baseline goes through the *same* rubric, *same* raters, *same* blinding.

---

## 5. Metrics to report

**Primary**
- Zero-edit ship rate (`S`), with 95% CI, PromptCanvas vs. each baseline
- Mean C / P / L / B with CI
- Median time-to-review-ready artifact vs. B3 (human)

**Secondary**
- Validator first-pass rate (pre-repair) and post-repair rate
- Repair-loop invocation rate and mean iterations
- p50 / p95 / p99 end-to-end latency
- Cost per generation (tokens × price + compute)
- Failure taxonomy: % hallucinated services, % missing components, % layout-unusable, % XML-invalid

**Per-stratum breakdown is mandatory.** A 62% aggregate hiding 20% on "vague
prompts, 21+ nodes" is the actual product problem, and aggregate reporting
conceals it.

---

## 6. Repository layout

```
evals/
  corpus/
    dev/       *.json          # 120 records
    locked/    *.json          # 80 records, ACL-restricted
  baselines/
    b0_gemini_direct.ts
    b1_mermaid.ts
    b2_external/               # manual capture, checked-in artifacts
    b3_human/                  # timings + artifacts
    b4_pipeline_v1.ts
  runners/
    run.ts                     # corpus → artifacts (parallel, cached)
    score_l1.ts                # reuse src/lib/validate/validator.ts
    score_l2.ts                # assertions vs. logical graph, pre-render
    score_l3_judge.ts          # LLM proxy
  rating-ui/                   # blind rating tool; exports CSV
  results/
    <iso-date>_<model-id>_<git-sha>.json
  report.ts                    # results → markdown + CI verdict
```

### Implementation notes specific to this codebase

- **Score L2 against the logical graph, not the XML.** `src/lib/graph/schema.ts`
  is the natural assertion surface — node/edge assertions there are stable across
  renderer changes. Asserting on mxGraph XML couples your eval to `render/drawio-xml.ts`
  and will produce false regressions on every styling change.
- **Reuse `src/lib/validate/validator.ts`** for L1 rather than reimplementing.
  Note that `bin/validate-cli.ts` currently targets `scratch/golden/*.xml`, a path
  absent from the repo — that CI step is a no-op today and must be repointed at
  `evals/results/` as part of this work.
- **Pin every run** to `{ model_id, git_sha, feature_flags, temperature, seed }`
  in the result filename and payload. Without this you cannot attribute a
  regression to a model bump vs. a code change, which is the harness's main job.
- **Cache generations** keyed on `(prompt_id, model_id, git_sha, flags)`. A full
  200-prompt sweep across 5 baselines is ~1,000 generations; without caching,
  iteration becomes unaffordable and the harness quietly stops being run.
- **Temperature 0 where supported, and 3 runs per prompt regardless.** Report
  variance. Non-determinism at fixed temperature is itself a finding worth stating.

---

## 7. CI gate

Two tiers — the distinction keeps the fast loop fast.

**Per-PR (~2 min):** L1 + L2 on a fixed 30-prompt smoke subset from `dev`.
Blocks merge on any L2 regression.

**Nightly on `main` (~30 min):** full `dev` set, L1 + L2 + LLM judge. Posts a
delta table against the last green run.

**Model-bump gate — the important one.** Any change to `GEMINI_MODEL_ID` or a
prompt file under `src/prompts/` triggers the full `dev` sweep and **blocks merge**
unless:
- L2 assertion pass rate ≥ previous − 2pp, and
- LLM-judge mean composite ≥ previous − 0.15, and
- validator first-pass rate ≥ previous − 3pp

Right now `gemini-3.6-flash` is hardcoded and every upgrade is an uncontrolled
quality event. This gate is what converts a model bump from a leap of faith into
a measured decision — and it's the single most defensible engineering artifact
you can show a reviewer.

**Release gate:** locked set + full human rating. Runs at most monthly.

---

## 8. Build sequence

| Wk | Deliverable | Done when |
|---|---|---|
| 1 | Corpus v0 — 60 prompts from production logs, stratified, `expect` blocks authored | 60 records validate against schema |
| 1 | `run.ts` + `score_l1.ts` + `score_l2.ts` | Full dev sweep runs end-to-end, cached |
| 2 | B0 and B4 baselines | First honest delta table exists |
| 2 | Per-PR CI gate live | A deliberately broken prompt fails CI |
| 3 | Corpus → 200, locked split sealed | ACL enforced |
| 3 | Blind rating UI + rater onboarding | 3 raters trained, α measured on pilot of 20 |
| 4 | B1–B3 baselines | All five baselines rated |
| 4 | First full human-rated run on locked set | **Section 5 of the memo is fillable** |
| 5 | Model-bump gate + nightly | Gate demonstrably blocks a synthetic regression |
| 6 | LLM judge calibrated | Human/judge correlation reported |

---

## 9. How this fails

Named in advance, because each of these has killed a real eval effort:

1. **Corpus authored by the builder.** Guarantees flattering numbers. Mitigate: ≥70% from production logs or third-party CEs.
2. **Locked set leaks into iteration.** Mitigate: ACL, not discipline.
3. **Rubric ambiguity.** Mitigate: measure α, publish it, fix the rubric if it's low.
4. **Harness stops being run** because a sweep costs an afternoon. Mitigate: caching + the 30-prompt smoke tier.
5. **L1 pass rate reported as if it were quality.** Mitigate: never report L1 without S beside it.
6. **B0 wins and the result gets buried.** Mitigate: decide *now* that B0 is published either way. If a single well-prompted Gemini call matches Pipeline V2, that is the most valuable thing this harness could tell you — it saves you a year of building the wrong moat.
