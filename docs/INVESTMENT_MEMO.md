# PromptCanvas — Investment Memo

> **STATUS: DRAFT SKELETON.** Every `<<FILL>>` is a number or claim that must be
> sourced before this goes to any reviewer. An unfilled field is not a gap in the
> template — it is a gap in the evidence, and reviewers will find it.
>
> Target length when complete: **2 pages**. If it runs longer, the thesis isn't sharp yet.

---

## 1. The ask

**What we want:** `<<FILL: headcount / sponsorship / infra funding / OSS-release approval / all of the above — be specific and singular>>`

**What it costs:** `<<FILL: engineering months + monthly run cost>>`

**What it returns:** `<<FILL: CE hours saved per quarter, and/or influenced GCP consumption>>`

**Decision requested by:** `<<FILL: date>>`

---

## 2. Problem

Pre-sales architecture artifacts are hand-built in draw.io, slide by slide, per customer.

| Evidence | Value | Source |
|---|---|---|
| CEs in scope (HCLS / broader) | `<<FILL>>` | `<<FILL>>` |
| Hours per architecture artifact | `<<FILL>>` | `<<FILL: survey n=?>>` |
| Artifacts per CE per quarter | `<<FILL>>` | `<<FILL>>` |
| Total hours/quarter at stake | `<<FILL>>` | derived |

> Do not assert these from intuition. A 15-person survey with a stated `n` is
> credible; a round number with no source is the first thing challenged.

**Why it matters beyond time saved:** `<<FILL: e.g. artifact quality variance across CEs, speed-to-first-architecture in a deal cycle, deals where the diagram is the deliverable that unblocks the technical win>>`

---

## 3. Why existing options don't solve it

Name them and be fair — reviewers know these tools.

| Option | Why it falls short | Evidence |
|---|---|---|
| draw.io manual | Time cost; no reuse of prior architectures | `<<FILL>>` |
| Gemini → mxGraph XML directly | LLM coordinate prediction produces unusable layout | `<<FILL: your own before/after, quantified>>` |
| Eraser DiagramGPT / Lucid AI / Mermaid | `<<FILL>>` | `<<FILL: run them on your eval set>>` |
| Google Cloud Architecture Diagramming tool | `<<FILL>>` | `<<FILL>>` |

---

## 4. What PromptCanvas is (one paragraph, no feature list)

`<<FILL: the wedge in one sentence. Recommended framing — "a CE describes a customer
architecture in prose and gets a review-ready, GCP-branded draw.io diagram plus the
supporting narrative in under 10 minutes.">>`

**Technical thesis — why this works where naive LLM approaches fail:**

Pipeline V2 separates *semantics* from *geometry*. Gemini produces a logical
architecture graph (what exists, how it connects); `elkjs` computes layout
deterministically; a renderer emits mxGraph XML; a pre-render validator with a
repair loop catches geometry and container violations before the user ever sees them.

**The defensible asset is the curated blueprint corpus + validator, not the model call.**
`<<FILL: corpus size, how blueprints are reviewed, who owns them>>`

---

## 5. Evidence of quality ← *the section that decides this*

**Eval methodology:** `<<FILL: N prompts sampled from real engagements, k-point rubric,
r independent architect raters, blind to system>>`

| Metric | PromptCanvas | Gemini direct | `<<other baseline>>` |
|---|---|---|---|
| Ships without edits | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |
| Mean architect rating (1–5) | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |
| Validator pass rate, first attempt | `<<FILL>>` | n/a | n/a |
| Median time to review-ready artifact | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |
| p50 / p95 generation latency | `<<FILL>>` | — | — |
| Cost per generation | `<<FILL>>` | — | — |

**Known quality failure modes (state them yourself):** `<<FILL>>`

---

## 6. Evidence of adoption

| Metric | Current | 90-day target |
|---|---|---|
| CEs who generated ≥1 diagram | `<<FILL>>` | `<<FILL>>` |
| Weekly active CEs | `<<FILL>>` | `<<FILL>>` |
| Activation: signup → first **export** | `<<FILL>>` | `<<FILL>>` |
| 7-day return rate | `<<FILL>>` | `<<FILL>>` |
| Customer engagements where an artifact was used | `<<FILL>>` | `<<FILL>>` |

**Named references:** `<<FILL: 3 CEs, quotable, with the deal context>>`

> A visitor counter is not adoption. If these numbers can't be produced today,
> instrumenting them is the highest-priority work item in Section 9.

---

## 7. GCP tie-in

`<<FILL: which Vertex/Gemini SKUs this drives; whether the tool itself runs on
Cloud Run + Cloud SQL/AlloyDB + Vertex; influenced consumption in engagements
where it was used>>`

A tool that generates GCP architectures should itself be a GCP consumption story.
Today it runs on `<<FILL: current state>>`. Target state: `<<FILL>>`.

---

## 8. Risk register — write the objections before they're raised

| Risk | Severity | Mitigation | Owner |
|---|---|---|---|
| **Bus factor** — 65k LOC, one contributor; `workspace/page.tsx` alone is 9.6k lines | High | `<<FILL: decomposition plan, second maintainer, handover doc>>` | `<<FILL>>` |
| **Customer data sensitivity** — architecture prompts are commercially sensitive; retention, deletion, DLP, Vertex vs public API not yet documented | High | `<<FILL: data-handling one-pager + security review>>` | `<<FILL>>` |
| **Infra posture** — third-party hosting, homegrown auth, in-memory rate limiter (breaks on >1 instance) | High | `<<FILL: Cloud Run + IAP/SSO + Secret Manager + shared-state rate limiting>>` | `<<FILL>>` |
| **IP / OSS** — public repo of a Google-customer-facing tool; assignment and release approval unresolved | High | `<<FILL: route through the appropriate internal review before the funding decision>>` | `<<FILL>>` |
| **Model dependency** — model ID hardcoded; each upgrade is an uncontrolled quality event | Med | `<<FILL: model abstraction + regression eval gate on every bump>>` | `<<FILL>>` |
| **Commoditization** — Gemini/draw.io may ship this natively | Med | Corpus + validator as the moat; `<<FILL>>` | `<<FILL>>` |
| **No migrations** — schema is inline `CREATE TABLE IF NOT EXISTS`; no rollback path | Med | `<<FILL: adopt a migration tool>>` | `<<FILL>>` |
| **Scope sprawl** — Terraform export, IaC compiler, cost modelling, simulation, tech radar, compose/PRD generation, 40+ master builders | Med | Freeze surface area to the wedge; roadmap the rest | `<<FILL>>` |

---

## 9. 90-day plan

| # | Milestone | Exit criterion (measurable) | Week |
|---|---|---|---|
| 1 | Eval harness live | `<<FILL: N-prompt corpus, rubric, baselines, CI-gated>>` | `<<FILL>>` |
| 2 | Product analytics instrumented | Activation + retention funnel reportable | `<<FILL>>` |
| 3 | Design-partner cohort | `<<FILL>>` CEs, `<<FILL>>` live engagements | `<<FILL>>` |
| 4 | Google-native infra migration | Cloud Run + Vertex + SSO; data posture doc signed off | `<<FILL>>` |
| 5 | CI hardened | build + lint + golden-geometry gate all green and non-vacuous | `<<FILL>>` |
| 6 | Enablement kit | 3 persona demo scripts + recorded walkthrough + feedback loop | `<<FILL>>` |
| 7 | Maintainability | `workspace/page.tsx` decomposed; migrations adopted; second maintainer onboarded | `<<FILL>>` |

**Kill criteria — what would make us stop:** `<<FILL: e.g. if weekly-active CEs < X at day 90, or if quality delta vs. baseline < Y, we sunset and open-source the corpus>>`

> Naming kill criteria raises credibility more than any optimistic projection.

---

## 10. Appendix

- Architecture: [`docs/ARCHITECTURE_AFTER.md`](./ARCHITECTURE_AFTER.md) · [`docs/ARCHITECTURE_BEFORE.md`](./ARCHITECTURE_BEFORE.md) · [`docs/INTENT_ROUTER.md`](./INTENT_ROUTER.md)
- Eval corpus + scoring: `<<FILL: link>>`
- Data-handling posture: `<<FILL: link>>`
- Demo recording: `<<FILL: link>>`

---

### Drafting rules

1. Anything unfilled at review time is read as "doesn't exist." Cut the row or get the number.
2. No adjectives doing the work of evidence — "world-class," "premium," "seamless" are all deletable.
3. Section 5 and Section 6 carry the decision. Sections 1–4 exist to make them legible.
4. Two pages. Everything else goes in the appendix.
