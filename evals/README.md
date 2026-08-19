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

### Baseline: `templates/master_blueprints/xml/` (151 files)

| Finding | Count |
|---|---|
| Distinct diagrams | **57** |
| EMPTY templates | **26** |
| DUPLICATE files | **68** |
| MISNAMED templates | **13** |
| Geometrically clean **and** non-empty | **6 / 151** |

Notable: `13/14_tech_data_lakehouse_gcp` is built from Amazon S3, Kinesis,
Redshift, Glue and Lake Formation. `IND-HR-06_workforce_talent_ai`,
`IND-RETAIL-04_omnichannel_ecommerce_retail`, `P4-APP-L-08_serverless_eda_architecture`
and `tech_serverless_gcp` are one identical IoT/EDA diagram under four names.

The 26 empty templates appear in adjacent index pairs (`24_` and `25_`, `25_` and
`26_`, …), which points at an off-by-one in whatever wrote this directory rather
than 26 independent authoring mistakes. Fix the generator, not the files.

### Catalog counts do not reconcile

Landing page says 50 · `masterBuilders/` has 50 · `templateCategories.ts` defines
55 · `all_master_templates.json` holds 42 · this directory has 151 files
representing 57 distinct diagrams. Five numbers for one catalog.

### On the allowlist

`evals/template-integrity-allowlist.json` records all 107 current violations so
the gate can be enabled today and ratcheted down. Every entry is a known defect,
not an approved exception. Remove entries as templates are fixed; never re-add one.

### Fixed in this change

`score_geometry.ts` previously scored a 0-node file as `clean`. With 26 empty
templates in the corpus that inflated the clean rate from a true 6/151 to 32/151.
Empty now fails the clean predicate.
