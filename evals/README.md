# evals/

Measurement, not marketing. See `docs/EVAL_HARNESS.md` for the full design.

## What exists today

| Layer | Status | Entry point |
|---|---|---|
| L1 mechanical (geometry) | **implemented** | `evals/score_geometry.ts` |
| L2 semantic (assertions vs. prompt) | not built | — |
| L3 judgment (blind architect rating) | not built | — |

Only L1 exists. **L1 passing says nothing about whether a diagram is correct** —
a perfectly laid-out picture of the wrong architecture scores clean here.

## Geometry scorer

```bash
npm run eval:geometry -- diagrams/latest/*.xml          # human-readable table
npm run eval:geometry -- --json diagrams/latest/*.xml   # machine-readable
npm run eval:geometry:gate                              # CI gate vs. baseline
```

Metrics: sibling node overlap, edge crossings, label overflow, children escaping
their container. All deterministic — no model, no humans, no API key.

## Baseline as of first run (67 files in `diagrams/latest/`)

| Metric | Value |
|---|---|
| Files scoring clean | **1 / 67 (1.5%)** |
| Node overlaps | 3,423 |
| Edge crossings | 602 |
| Label overflows | 2,190 |
| Children outside container | 2 |

The single clean file is `serverless_web_app__pipeline_v2_graph_layout…` — the
one output produced by the graph-then-layout pipeline. That is the strongest
available evidence that Pipeline V2 works, and that most of this corpus never
went through it.

**Next experiment (one day):** regenerate every corpus file through V2 and
re-score. The delta is a memo-grade number.

## Caveats — read before quoting these figures

- Crossings are straight center-to-center segments; orthogonal routing with
  waypoints will differ. Directional proxy, not ground truth.
- Label overflow is a character-width heuristic, not font metrics.
- Overlap is computed among siblings; a renderer nesting children under flat
  parents will report legitimate containment as overlap.

Validate against rendered PNGs before putting any of these numbers in a document.

---

## Template integrity

```bash
npm run eval:templates        # full report
npm run eval:templates:gate   # CI gate, allowlisted to current state
```

Catches three defects nothing else catches:

- **EMPTY** — zero vertices. Renders blank and passes every geometry and XML
  validator, because there is nothing to fail.
- **DUPLICATE** — multiple filenames resolving to identical node content.
- **MISNAMED** — filename asserts an architecture the node labels don't contain.

### Certified State (`v3.4.0`): `templates/master_blueprints/xml/` (60 files)

| Finding | Count |
|---|---|
| Distinct certified diagrams | **60 / 60** |
| EMPTY templates | **0** |
| DUPLICATE files | **0** |
| MISNAMED templates | **0** |
| Allowlisted exceptions | **0** |

All 60 standalone `.drawio.xml` files in `templates/master_blueprints/xml/` and `templates/master_blueprints/all_master_templates.json` are generated deterministically from `BLUEPRINT_KNOWLEDGE_MATRIX` (`src/lib/blueprintKnowledgeMatrixNormalized.ts`) and `getDefaultXmlForArchitecture` (`src/lib/architectureTypesCertified.ts`).

