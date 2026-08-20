# Phase 3.4 Validation Report — Catalog Differentiation & Notation Fidelity

Date: 2026-08-20
Scope: PromptCanvas 50-blueprint catalog

## Gate result

**PASS — exact catalog dispatch, canonical identity and formal-notation protection.**

## Exact catalog resolution

`src/lib/blueprintExactResolver.ts` defines the catalog as 50 unique canonical blueprint identities.

- 49 canonical IDs map to explicit factories.
- Blueprint #6 (`unified_system_view`) is intentionally handled by the dedicated rebuilt Enterprise Reference Architecture override in `architectureTypesVisual.ts`.
- Catalog previews resolve through exact canonical dispatch before the older substring/alias resolver.
- User-authored/custom-prompt variants retain the legacy flavor/healing path so custom generation behavior is not removed.

This removes the catalog's dependency on the order of broad `id.includes(...)` conditions.

## Canonical identity stamping

Every exact-dispatch catalog output is stamped with:

- a canonical `pc-catalog-id:<canonicalId>` marker, and
- a canonical internal `<diagram id="catalog_<canonicalId>">` identity when an mxfile diagram wrapper is present.

This prevents legacy copied diagram IDs from making distinct catalog cards look identical to downstream validators/history tooling.

## Collision-prone cases locked by regression tests

`src/lib/__tests__/blueprintExactResolver.test.ts` explicitly covers:

- #20 historical `P4-SEC-P-05_tech_agentic_mesh` → Hybrid & Multi-Cloud canonical ID,
- real-time streaming vs manufacturing,
- #39 Equipment Predictive Maintenance vs #42 Smart Factory,
- Incident Triage vs SRE Observability,
- C4 System Context vs C4 Component LLD,
- exactly 50 unique canonical catalog IDs,
- complete exact-factory coverage except the intentional #6 override.

## Formal notation fidelity

The following canonical templates are treated as notation-sensitive:

- ERD,
- UML sequence,
- C4 System Context / Container,
- C4 Component LLD,
- BPMN,
- STRIDE threat model,
- data-lineage/provenance graph.

`src/lib/__tests__/blueprintNotationFidelity.test.ts` verifies that the visual pipeline does not:

- inject generic semantic card icons into notation shapes,
- apply generic card containment transformations to notation geometry,
- force generic orthogonal/block-arrow routing over notation-native connectors.

## Deployment evidence

- Exact catalog resolver activation: `dd0a03f38123744408698420ba34264b73c5a751`.
- Canonical identity stamping: `ddabc59cb262618a30d8c4d5008fdd534f821827`.
- Notation-fidelity regression coverage: `873b74995502fa42d4a83a3c59d22d0b606a3f3e`.
- Railway status for the latest Phase 3.4 commit: **success**.

Next: **Phase 3.5 — Automated Release Hardening & Final Catalog Certification**.
