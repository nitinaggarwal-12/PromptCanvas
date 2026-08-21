# PromptCanvas Canonical Architecture Taxonomy v1.1 — Adaptive Architecture Composition Extension

**Status:** Canonical Extension to `docs/ARCHITECTURE_TAXONOMY_V1.md`

This extension formalizes how PromptCanvas composes architecture diagrams from the semantic model before rendering. It is intended to be merged into the master taxonomy as part of the v1.1 consolidation.

## 1. Core principle

The rendered image is never the architecture source of truth. The source of truth is the semantic architecture graph:

`Requirement → Capability → Architecture Family → Pattern / Variant → L1/L2/L3 → Visual Grammar → Component Groups → Components → Relationships → Technology Bindings → Controls / NFRs → Evidence`

A diagram is a projection of that graph. Deleting a visible box must not be treated as deleting architecture metadata unless the user explicitly removes the semantic object from the architecture.

## 2. Adaptive Architecture Composition

PromptCanvas MUST allow users to choose which architecture content is included before diagram generation or regeneration.

The composition hierarchy is:

`Architecture Family → Visual Grammar → Level → Component Groups → Components → Relationships`

Component selection is semantic. After any inclusion, exclusion, collapse, or expansion change, PromptCanvas MUST validate dependencies and automatically rebuild layout, grouping, edge routing, labels, annotations, numbering, legends, and whitespace.

The expected result is a diagram that looks intentionally designed for the selected content, not a diagram with visible holes where elements were deleted.

## 3. Selection granularity

PromptCanvas SHOULD expose three levels of selection:

| Selection level | Example | Primary use |
| --- | --- | --- |
| Component Group / Section | Security, Data, AI, Observability | Fast customization |
| Component | API Gateway, Vector Store, Agent Runtime | Detailed architecture control |
| Relationship / Flow | App → Pub/Sub, Agent → MCP Tool | Advanced architecture editing |

The default generation experience SHOULD emphasize group and component selection. Relationship editing belongs in the advanced semantic editor.

## 4. Component necessity classification

Every component or component group SHOULD support one of these canonical classifications:

| Classification | Meaning | Generator behavior |
| --- | --- | --- |
| Mandatory | Required for the selected architecture family / pattern to remain semantically valid | Prevent removal or require explicit architecture reclassification |
| Recommended | Strongly expected for a production-quality design | Selected by default; user may remove with advisory |
| Conditional | Required only when a trigger condition is true | Automatically selected when its condition is satisfied |
| Optional | Useful enrichment but not required for architectural validity | User-controlled |

Example for a RAG architecture:

- **Mandatory:** user/query, retrieval, knowledge source, model, grounded response
- **Recommended:** embedding/indexing, citations, guardrails
- **Conditional:** reranker, GraphRAG, multimodal parser, HITL, cache
- **Optional:** advanced feedback analytics, FinOps overlay, specialized evaluation dashboard

If removal of a mandatory component invalidates the selected architecture, PromptCanvas SHOULD explain the implication and offer an architecture-family or pattern change rather than silently producing an invalid diagram.

Example:

> Removing Retrieval would make this no longer a valid RAG architecture. Switch to a generic GenAI application architecture instead?

## 5. Component visibility states

Component groups and components MUST support three visual states:

| State | Meaning | Example |
| --- | --- | --- |
| Expanded | Render individual child components | Pub/Sub + Dataflow + Datastream + Batch Loader |
| Collapsed | Render a single semantic aggregate | Ingestion Services |
| Hidden | Exclude the object from the current view | No ingestion section in this projection |

Collapse and Hide are different operations. Collapse preserves the capability in the view at a higher abstraction. Hide removes it from that view while retaining it in the semantic architecture model unless explicitly deleted.

This mechanism SHOULD be the primary bridge between L1, L2, and L3.

Typical behavior:

- **L1:** capability-level objects are naturally collapsed
- **L2:** logical services/components are moderately expanded
- **L3:** implementation resources and technology bindings are expanded where relevant

## 6. Dependency semantics

Every semantic architecture object MAY declare relationship constraints using canonical dependency types:

- `requires`
- `required_by`
- `recommended_with`
- `conditional_on`
- `conflicts_with`
- `replaces`
- `supersedes`
- `contains`
- `parent_of`
- `connects_to`
- `depends_on`
- `produces`
- `consumes`
- `protected_by`
- `observed_by`
- `deployed_on`

PromptCanvas MUST validate the graph after user selection.

Examples:

- Private Service Connect may require a VPC, private endpoint, and private DNS/resolution path.
- MCP Tool Gateway may require an agent runtime, tool registry, authentication/authorization, and tool contract.
- A production-facing application may conditionally require observability when `environment=production`.
- Multi-region active-passive may require health detection, replication, failover routing, and a recovery procedure.

If a user removes a selected object's prerequisite, PromptCanvas MUST either remove or downgrade dependent objects, offer a replacement, or flag the architecture as incomplete.

## 7. Auto-layout contract after composition changes

After any composition change, the renderer MUST recalculate at least:

1. Group/container dimensions
2. Row and column allocation
3. Node alignment and distribution
4. Edge routing and reconnect points
5. Flow numbering
6. Boundary sizes and labels
7. Annotation placement
8. Legend contents
9. Diagram title/subtitle metadata where affected
10. Whitespace and visual balance

The renderer MUST NOT leave orphan edges, empty containers, dangling labels, broken numbering, or unexplained whitespace.

## 8. Composition presets

PromptCanvas SHOULD provide predefined selection presets that modify semantic inclusion and abstraction before rendering:

| Preset | Intent |
| --- | --- |
| Minimal | Core architecture only |
| Recommended | Core + expected security and operational essentials |
| Comprehensive | All relevant architecture domains and supporting concerns |
| Executive | L1-relevant capabilities, boundaries, outcomes, and major flows |
| Production | Core + security + reliability + observability + deployment + operational readiness |
| Security Review | Trust, identity, controls, threats, data classification, audit and assurance |
| Cost Review | Workloads, shared services, metering, cost allocation and optimization |

Presets are starting configurations, not separate architecture families.

## 9. Example: Deployment Architecture

For Visual Grammar 16 — Deployment Architecture, common component groups include:

- Users / Channels
- Edge / Ingress
- Application Runtime
- Integration
- AI / Agent Runtime
- Data
- Security
- Observability
- CI/CD
- HA / DR
- External Systems

A user could select:

**Required for this view**
- Application Runtime
- AI / Agent Runtime
- Data
- Security

**Optional for this view**
- CI/CD
- Observability
- External Systems

**Excluded for this view**
- HA / DR
- FinOps

PromptCanvas then generates a new balanced deployment topology from the selected graph. It does not generate the comprehensive layout and simply hide the excluded boxes.

## 10. Example: RAG Architecture

A RAG composition may be represented semantically as:

`User → Query Processing → Retrieval → Knowledge Index → Context Assembly → Model → Grounded Response`

Supporting groups may include ingestion, parsing, embedding, reranking, citations, guardrails, evaluation, HITL, observability and cost controls.

At L1, those may collapse to:

`User → AI Experience → Enterprise Knowledge → Grounded AI Response`

At L2, ingestion/retrieval/generation services are exposed.

At L3, actual indexes, models, stores, endpoints, IAM bindings, policies, retry thresholds and deployment resources may be exposed.

The semantic graph remains the same architecture object across those projections.

## 11. User interaction model

Recommended generation flow:

`Intent → Architecture Family → Pattern/Variant → Level → Visual Grammar → Component Selection → Dependency Validation → Technology Binding → Layout → Render`

The user interface SHOULD provide an **Include in Diagram** control before generation with group-level checkboxes and an **Advanced** expansion for individual components.

Example:

- [x] Users / Channels
- [x] Supervisor Agent
- [x] Specialist Agents
- [x] Shared Memory
- [x] Tool Integration
- [x] Security / Guardrails
- [x] HITL
- [ ] Observability
- [ ] FinOps
- [ ] DR / Resilience

## 12. Semantic persistence

The saved architecture model SHOULD persist, at minimum:

```text
nodes
component_groups
relationships
constraints
selection_state
visibility_state
architecture_family
pattern_variant
level
visual_grammar
technology_bindings
industry_reference
nfrs
controls
traceability
```

`selection_state` controls whether an object participates in the current composition.

`visibility_state` controls `expanded | collapsed | hidden` for the current projection.

These are view-state properties and MUST NOT destroy canonical semantic metadata.

## 13. Editing after generation

Manual editing remains supported, but it should operate on semantic objects rather than pixels whenever possible.

Deleting a component in the editor SHOULD trigger one of these actions:

1. Hide from current view
2. Collapse parent group
3. Remove from architecture model

The product SHOULD ask or infer the intended semantic operation instead of treating every visual deletion as permanent architectural deletion.

When a component is removed from the architecture model, PromptCanvas MUST revalidate dependencies and rerender affected views.

## 14. L1/L2/L3 relationship to composition

The architecture level determines semantic depth, while composition determines relevance.

**L1 — Conceptual / Executive**
- Show actors, outcomes, capabilities, domains, systems, trust/enterprise boundaries and major exchanges.
- Prefer collapsed component groups.
- Avoid detailed vendor resources and implementation configuration.

**L2 — Logical / Solution**
- Show logical services, responsibilities, integrations, data stores, orchestration, security zones and architecture patterns.
- Expand groups selectively.
- Vendor product families may appear when solution decisions are known, but configuration remains abstract.

**L3 — Physical / Implementation**
- Show actual runtime resources, regions/zones, protocols, endpoints, topics/queues, schemas, IAM/service accounts, network constructs and configuration details relevant to implementation.
- Expand selected groups to implementation depth.

Changing L1/L2/L3 MUST NOT simply add more boxes. It changes the permitted semantic detail of each selected object.

## 15. Visual grammar interaction

The selected visual grammar defines *how* selected semantic objects are expressed. Component composition does not override grammar semantics.

Examples:

- ERD: selected entities/relationships are relaid out with valid cardinality and keys.
- Network: selected zones/subnets/connectivity are rerouted with network semantics.
- Sequence: excluded participants remove their messages and the remaining interaction is renumbered.
- Swimlane: excluded roles remove lanes and activities are reflowed.
- Deployment: excluded runtime groups remove resources and deployment boundaries resize.
- RAG: excluded optional stages cause the knowledge flow to reconnect through the remaining valid stages.

## 16. Industry-reference interaction

Industry reference architectures act as accelerators that provide domain-specific default components, actors, data objects, controls and systems.

They do not override canonical family or visual grammar semantics.

Composition pipeline:

`Universal Canonical Taxonomy → Industry Reference Architecture → Use Case/Product Context → L1/L2/L3 → Visual Grammar → Component Selection → Technology Binding`

Industry-provided components MUST use the same Mandatory / Recommended / Conditional / Optional classifications and Expanded / Collapsed / Hidden states.

## 17. Generator validity rules

A generated diagram is valid only when:

- all Mandatory semantic objects required by the chosen family/pattern are represented or intentionally abstracted by a valid collapsed parent;
- all visible relationships have valid endpoints;
- required dependencies are satisfied;
- selected objects comply with the selected L1/L2/L3 depth;
- the chosen visual grammar can legally represent the selected objects;
- technology bindings do not redefine the architecture family;
- removed components do not leave orphan controls, labels or flows;
- auto-layout has successfully rerouted and rebalanced the view.

## 18. Product principle

**Users choose what matters. PromptCanvas preserves architectural validity and automatically rebuilds a clean, balanced diagram.**

This capability is named **Adaptive Architecture Composition** and should be treated as a canonical PromptCanvas behavior rather than a presentation-only feature.
