import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/auth', () => ({
  getAuthenticatedUser: vi.fn().mockResolvedValue(null),
}));

import { getAuthenticatedUser } from '@/lib/auth';
import { DELETE as deleteSingleDiagram } from '@/app/api/diagrams/[id]/route';
import { DELETE as deleteQueryDiagram } from '@/app/api/diagrams/route';
import { POST as batchDeleteDiagrams } from '@/app/api/diagrams/batch-delete/route';
import {
  GET as getOauthConfig,
  extractAuthenticatedGoogleEmail,
} from '@/app/api/google-workspace/oauth-config/route';

describe('P0 Security & Auth Guards', () => {
  beforeEach(() => {
    vi.mocked(getAuthenticatedUser).mockResolvedValue(null);
  });

  it('rejects unauthenticated DELETE /api/diagrams/[id] with 401', async () => {
    const req = new Request('http://127.0.0.1:3000/api/diagrams/some-id', { method: 'DELETE' });
    const res = await deleteSingleDiagram(req, { params: Promise.resolve({ id: 'some-id' }) });
    expect(res.status).toBe(401);
  });

  it('rejects unauthenticated DELETE /api/diagrams?id=... with 401', async () => {
    const req = new Request('http://127.0.0.1:3000/api/diagrams?id=some-id', { method: 'DELETE' });
    const res = await deleteQueryDiagram(req);
    expect(res.status).toBe(401);
  });

  it('rejects unauthenticated POST /api/diagrams/batch-delete with 401', async () => {
    const req = new Request('http://127.0.0.1:3000/api/diagrams/batch-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: ['diag-1'] }),
    });
    const res = await batchDeleteDiagrams(req);
    expect(res.status).toBe(401);
  });

  it('never leaks raw server Drive OAuth access tokens from GET /api/google-workspace/oauth-config', async () => {
    const req = new NextRequest('http://127.0.0.1:3000/api/google-workspace/oauth-config');
    const res = await getOauthConfig(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.sessionToken).toBeNull();
    expect(typeof data.hasServerBridge).toBe('boolean');
  });

  it('ignores spoofable x-forwarded-email header and only trusts Cloud IAP x-goog-authenticated-user-email', () => {
    const spoofedReq = new NextRequest('http://127.0.0.1:3000/api/google-workspace/oauth-config', {
      headers: { 'x-forwarded-email': 'victim@example.com' },
    });
    expect(extractAuthenticatedGoogleEmail(spoofedReq)).toBeUndefined();

    const iapReq = new NextRequest('http://127.0.0.1:3000/api/google-workspace/oauth-config', {
      headers: { 'x-goog-authenticated-user-email': 'accounts.google.com:real@example.com' },
    });
    expect(extractAuthenticatedGoogleEmail(iapReq)).toBe('real@example.com');
  });
});
