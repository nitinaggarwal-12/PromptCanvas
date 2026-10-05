/**
 * Canonical public origin for user-facing deep links (share links, admin links, exports).
 *
 * Verified working Google BeyondCorp endpoint for this service lives in project
 * `ramp-portal-dev` (#248990048888, us-west1). Never fall back to legacy `*.run.app`
 * hosts or `localhost` in production-rendered links.
 */
export const CANONICAL_PUBLIC_APP_ORIGIN = 'https://promptcanvas-248990048888.cr.gclb.goog';

export function getPublicAppOrigin(): string {
  if (typeof window !== 'undefined' && window.location && /^https?:/.test(window.location.origin)) {
    return window.location.origin;
  }
  const configured = process.env.NEXT_PUBLIC_APP_ORIGIN;
  if (configured && /^https?:\/\//.test(configured)) {
    return configured.replace(/\/$/, '');
  }
  return CANONICAL_PUBLIC_APP_ORIGIN;
}
