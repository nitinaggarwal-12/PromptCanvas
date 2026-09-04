# PromptCanvas — Security Policy & Threat Model

Welcome to the **PromptCanvas** Security Architecture Specification. This document defines trust boundaries, threat models, input sanitization protocols, database security invariants, and workstation execution policies for AI agents and developers.

---

## 1. Security Invariants & Trust Boundaries

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 UNTRUSTED ZONE: CLIENT                                  │
│  User Prompts · Web Form Inputs · Uploaded Files · Browser Storage                      │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
                                             │ HTTP POST / API Calls (Validated via Zod)
                                             ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                  TRUST BOUNDARY 1: API                                  │
│  Next.js 16 Route Handlers (/api/generate, /api/diagrams, /api/export)                  │
│  • Input schema validation (Zod)  • Rate limiting  • Request size guards (< 5MB)        │
└──────────────────────┬───────────────────────────────────────────────┬──────────────────┘
                       │                                               │
                       ▼                                               ▼
┌─────────────────────────────────────────────┐ ┌─────────────────────────────────────────┐
│          TRUST BOUNDARY 2: LLM ENGINE       │ │       TRUST BOUNDARY 3: DATABASE        │
│  Gemini 2.5 / 3.7 API                       │ │  SQLite (dev.db) / PostgreSQL           │
│  • Prompt injection containment             │ │  • Parameterized queries only           │
│  • Output XML structure gating              │ │  • PRAGMA foreign_keys = ON             │
│  • Zero-knowledge data transmission         │ │  • Integer boolean type normalization   │
└──────────────────────┬──────────────────────┘ └─────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               TRUST BOUNDARY 4: XML / SVG                               │
│  Draw.io Graph Model & Headless Chrome Rendering Engine                                 │
│  • Strict XML entity escaping (&amp;, &lt;, &gt;) • SVG XSS attribute filtering         │
│  • Zero external HTTP image/CDN loading           • Local static asset embedding only   │
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

### 2.2 LLM Prompt Injection & Content Boundary Escape
- **Threat**: User prompts designed to bypass architectural constraints, leak system prompt instructions, or generate un-enveloped raw XML.
- **Mitigation**:
  1. **Strict Envelope Gating**: The generation pipeline rejects any response that does not contain a valid `<mxfile><diagram><mxGraphModel>` document structure.
  2. **Deterministic Preflight Healing**: Even if the LLM emits malformed coordinates or unescaped characters, the preflight engine (`evaluateStudio3Quality`) repairs the geometry autonomously before rendering.

### 2.3 SQL Injection & Dual-Database Safeguards
- **Threat**: Arbitrary SQL execution or data corruption across SQLite (`dev.db`) and PostgreSQL (`pg`).
- **Mitigation**:
  1. **Parameterized Queries Exclusively**: Never concatenate raw strings or user input into SQL statements. Use parameterized queries ($1, $2 or ?).
  2. **SQLite Foreign Key Enforcement**: Always execute `PRAGMA foreign_keys = ON;` on SQLite connection initialization to mirror PostgreSQL relational integrity.
  3. **Dual-Engine Type Compatibility**: SQLite stores booleans as integers (`0` / `1`), while PostgreSQL uses native `boolean` (`true` / `false`). The database adapter (`src/lib/db.ts`) handles bidirectional type casting to prevent query failures.
  4. **Migration Safety**: Always use `ADD COLUMN IF NOT EXISTS` syntax across both engines.

---

## 3. Secret Management & Environment Hygiene

- **Zero Client-Side Secret Leakage**:
  - Gemini API keys (`GEMINI_API_KEY`), database credentials (`DATABASE_URL`), and mailer keys (`RESEND_API_KEY`) must strictly reside on server-side runtime processes.
  - Never prefix sensitive environment variables with `NEXT_PUBLIC_`.
- **Git Hygiene**:
  - The repository `.gitignore` strictly excludes `.env`, `.env.local`, `dev.db`, `scratch/`, and temporary browser cache directories (`.chrome_profile_*`).

---

## 4. Workstation Sandbox & Executable Safety (Santa Security Policy)

On managed developer workstations (macOS):
- **Bypass Santa Policy Blocks**:
  - Never execute unverified third-party binaries or default `Google Chrome for Testing` packages, which trigger macOS Santa security policy execution blocks.
  - Puppeteer scripts MUST explicitly target the Google-signed Chrome binary:
    ```javascript
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    ```
- **Railway CLI Workstation Isolation**:
  - Do not execute raw `railway` CLI binaries directly on local macOS workstations. Use Railway REST APIs, Cloudtop (`rw nitinagga.c.googlers.com`), or live HTTP curl polling.
