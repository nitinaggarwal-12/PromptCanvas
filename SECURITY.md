# PromptCanvas — Security Policy & Threat Model (`v3.3.0`)

Welcome to the **PromptCanvas** Security Architecture Specification. This document defines trust boundaries, threat models, API route guards, input sanitization protocols, database security invariants, and workstation execution policies for AI agents and developers.

---

## 1. Security Invariants & Trust Boundaries

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 UNTRUSTED ZONE: CLIENT                                  │
│  User Prompts · Web Form Inputs · Uploaded Raster Images · Browser Storage              │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
                                             │ HTTP POST / API Calls
                                             ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    TRUST BOUNDARY 1: UNIVERSAL API ROUTE GUARD                          │
│  14 Next.js 16 AI Route Handlers guarded via enforceGeminiRouteGuard (apiRouteGuard.ts) │
│  • IP Rate Limiting  • Payload Caps (< 5MB)  • Prompt Injection Scrubbing               │
│  • 4-Category Conversational Non-Mutation Gate (checkConversationalOrNonMutationIntent) │
│  • X-PromptCanvas-AI-Stack Response Header Attribution                                  │
└──────────────────────┬───────────────────────────────────────────────┬──────────────────┘
                       │                                               │
                       ▼                                               ▼
┌─────────────────────────────────────────────┐ ┌─────────────────────────────────────────┐
│     TRUST BOUNDARY 2: 5-TIER AI ENGINE      │ │       TRUST BOUNDARY 3: DATABASE        │
│  Google Omni 1.1 · Gemini 3.1 Pro & 3.8     │ │  SQLite (dev.db) / PostgreSQL           │
│  • Centralized in src/lib/geminiConfig.ts   │ │  • Parameterized queries only           │
│  • Output XML structure gating              │ │  • PRAGMA foreign_keys = ON             │
│  • Zero deprecated / third-party LLM leaks  │ │  • Integer boolean type normalization   │
└──────────────────────┬──────────────────────┘ └─────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               TRUST BOUNDARY 4: XML / SVG                               │
│  Draw.io Graph Model, DiagramViewerRenderSafe & Headless Chrome Rendering Engine        │
│  • Strict XML entity escaping (&amp;, &lt;, &gt;) • SVG XSS attribute filtering         │
│  • Zero external HTTP image/CDN loading           • Local RFC 2397 SVG embedding only   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Threat Model & Mitigation Protocols

### 2.1 Stored XSS & XML External Entity (XXE) Injection
- **Threat**: Malicious user inputs or prompt injection payloads attempting to inject `<script>`, `onload=`, `javascript:`, or external entity references (`<!ENTITY ... SYSTEM ...>`) into the Draw.io XML graph model.
- **Mitigation**:
  1. **Fast-XML-Parser / Entity Sanitizer**: All raw XML passes through `src/lib/preflightAuditEngine.ts`. Dangerous HTML tags (`<script>`, `<iframe>`, `<object>`, `<embed>`) and DOM event handlers are stripped.
  2. **Entity Escaping**: Text inside XML attributes is strictly entity-encoded (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`).
  3. **Zero External Icon CDNs**: Diagrams must NEVER fetch external resources (e.g. `https://api.iconify.design/...`). Only local RFC 2397 `data:image/svg+xml` URIs from audited internal libraries (`gcpIcons.ts`, `sapIcons.ts`) are permitted.

### 2.2 LLM Prompt Injection, Conversational Mutation & Content Boundary Escape
- **Threat**: User prompts designed to bypass architectural constraints, trigger unintended diagram mutations on casual chat inputs (`"Hi"`, `"thanks"`, `"help"`), or generate un-enveloped raw XML.
- **Mitigation**:
  1. **Universal Route Guard (`src/lib/apiRouteGuard.ts`)**: All 14 AI-invoking API routes enforce `enforceGeminiRouteGuard`, validating request sizes, rate limits, and scrubbing prompt injection markers (`IGNORE PREVIOUS INSTRUCTIONS`, `<script>`).
  2. **4-Category Conversational Non-Mutation Gate (`src/lib/intentGuard.ts`)**: Intercepts greetings, capability queries, courtesies, and short ambiguous phrases ($\le 2$ words) across `/api/generate`, `/api/compose`, `/api/diagrams/customize`, `/api/research-infographic`, and `/api/infographic-blueprint`, returning `isConversationalPlainText: true` with zero canvas mutation.
  3. **Strict Envelope Gating & Self-Healing**: The generation pipeline rejects any response that does not contain a valid `<mxfile><diagram><mxGraphModel>` document structure and repairs coordinate collisions via `preflightAuditEngine.ts`.

### 2.3 SQL Injection & Dual-Database Safeguards
- **Threat**: Arbitrary SQL execution or data corruption across SQLite (`dev.db`) and PostgreSQL (`pg`).
- **Mitigation**:
  1. **Parameterized Queries Exclusively**: Never concatenate raw strings or user input into SQL statements. Use parameterized queries (`$1, $2` or `?`).
  2. **SQLite Foreign Key Enforcement**: Always execute `PRAGMA foreign_keys = ON;` on SQLite connection initialization to mirror PostgreSQL relational integrity.
  3. **Dual-Engine Type Compatibility**: SQLite stores booleans as integers (`0` / `1`), while PostgreSQL uses native `boolean` (`true` / `false`). The database adapter (`src/lib/db.ts`) handles bidirectional type casting to prevent query failures.
  4. **Migration Safety**: Always use `ADD COLUMN IF NOT EXISTS` syntax across both engines.

---

## 3. Secret Management & Environment Hygiene

- **Zero Client-Side Secret Leakage**:
  - Gemini API keys (`GEMINI_API_KEY`), database credentials (`DATABASE_URL`), and mailer keys (`RESEND_API_KEY`) must strictly reside on server-side runtime processes.
  - Never prefix sensitive environment variables with `NEXT_PUBLIC_`.
- **Git & Cloud Build Hygiene**:
  - Both `.gitignore` and `.gcloudignore` strictly exclude `.env`, `.env.local`, `dev.db`, `scratch/`, and temporary browser cache directories (`.chrome_profile_*`).

---

## 4. Workstation Sandbox & Executable Safety (Santa Security Policy)

On managed developer workstations (macOS):
- **Bypass Santa Policy Blocks**:
  - Never execute unverified third-party binaries or default `Google Chrome for Testing` packages, which trigger macOS Santa security policy execution blocks.
  - Puppeteer scripts MUST explicitly target the Google-signed Chrome binary (`executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'`) with an isolated `userDataDir` in `/tmp` and `--password-store=basic`.
- **Google Cloud Run & BeyondCorp Isolation**:
  - Deployments to **Google Cloud Run** (`project: ramp-portal-dev`, `region: us-west1`, `https://promptcanvas-248990048888.cr.gclb.goog`) enforce mandatory resource attribution (`CLOUDSDK_METRICS_ENVIRONMENT="datacloud.antigravity"`) and BeyondCorp IAP perimeter protection.
  - Do not execute unverified third-party CLI binaries directly on local macOS workstations.
