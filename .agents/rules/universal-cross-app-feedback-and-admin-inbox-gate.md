---
trigger: model_decision
description: Use when building, auditing, or modifying headers, navigation bars, or feedback routes across all 8 core web apps (GantryPulse, PromptCanvas, ge-blogs, Demoes-GE, ScoreX, AskAIOCE, ideas-mining, zyvoriq) to enforce Rule 58 top-corner Give Feedback to nitinagga@google.com icon, modal, and Admin-Only Inbox (/admin/feedback).
---

# Universal Cross-App Feedback Email Icon, Modal & Admin-Only Inbox Gate (`Rule 58`)

Across all 8 core web applications (`GantryPulse`, `PromptCanvas`, `ge-blogs`, `Demoes-GE`, `ScoreX`, `AskAIOCE`, `ideas-mining`, and `zyvoriq`):

1. **Top-Corner Email Feedback Trigger (`[data-testid="give-feedback-email-icon-btn"]`)**:
   - Every primary navigation header must expose an envelope/email icon button in the top-right action bar with exact attributes `title="Give Feedback to nitinagga@google.com"` and `aria-label="Give Feedback to nitinagga@google.com"` (`data-testid="give-feedback-email-tooltip"`).
2. **Streamlined Feedback Capture Modal (`[data-testid="give-feedback-modal"]`)**:
   - Clicking the top-corner email button opens an accessible light-theme modal (`bg-white`, `border-slate-200`, rendered or portaled at `document.body`) capturing Category, Priority, Optional Sender Name & Email, Required Feedback Message (`[data-testid="feedback-message-textarea"]`), and Auto-Captured App/Route/Viewport metadata.
3. **Triple-Backed Real Persistence & Live Notification (`POST /api/feedback/submit`)**:
   - Submissions persist to:
     1. App-local JSON store (`.local_backup/user_feedback.json` or `reports/user_feedback.json`)
     2. Unified Cross-App Feedback Ledger (`~/.gemini/config/unified_feedback_store.json`)
     3. Live Google Sheet (`1iPv52nblJISD7WNeEe3m4VovG_JS1qh79MYftMxrnhY`, tab `User_Feedback_Inbox`) via server-side OAuth `refresh_token`, plus Drive API v3 comment notification (`+nitinagga@google.com`) and 1-click Gmail Compose fallback.
4. **Admin-Only Feedback Inbox Page (`/admin/feedback` / `?page=admin-feedback`)**:
   - Accessible only to `nitinagga@google.com` (verified via BeyondCorp IAP `X-Goog-Authenticated-User-Email` in production or localhost / `X-Feedback-Admin-Email: nitinagga@google.com` in local verification).
   - Supports Cross-App vs. Current-App scope toggle, Category/Priority/Status filters, search, status triage (`New` / `In Review` / `Resolved` / `Archived`), deletion, and zero synthetic/dummy rows (`Rule 58D`).
