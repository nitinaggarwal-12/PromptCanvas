import { NextResponse } from 'next/server';
import { GOOGLE_OAUTH_SCOPES, isValidGoogleOAuthClientId } from '@/lib/googleDriveDirectOpen';

export const dynamic = 'force-dynamic';

/**
 * Public, non-secret runtime configuration for the "Open with Google Slides / Docs" handoff.
 *
 * The OAuth Web Client ID is read at request time from the Cloud Run environment
 * (`GOOGLE_OAUTH_CLIENT_ID`), so it can be rotated with
 * `gcloud run services update promptcanvas --update-env-vars GOOGLE_OAUTH_CLIENT_ID=...`
 * without rebuilding the image. OAuth client IDs are public identifiers (no secret involved —
 * the browser token flow is bound to the authorized JavaScript origins instead).
 */
export async function GET() {
  const rawClientId = (
    process.env.GOOGLE_OAUTH_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ||
    ''
  ).trim();
  const clientId = isValidGoogleOAuthClientId(rawClientId) ? rawClientId : '';

  return NextResponse.json(
    {
      configured: clientId.length > 0,
      clientId,
      scopes: GOOGLE_OAUTH_SCOPES,
      flow: 'google-identity-services-token-client',
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
