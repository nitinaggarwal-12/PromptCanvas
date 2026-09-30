import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { resolveAccessRequest, recordChangelogEntry } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT /api/access-requests/[id] - Approve or Deny access request
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (status !== 'Approved' && status !== 'Denied') {
      return NextResponse.json({ error: 'Status must be either "Approved" or "Denied".' }, { status: 400 });
    }

    const resolved = await resolveAccessRequest(id, user.id, status);

    await recordChangelogEntry({
      event_category: 'STATUS_CHANGED',
      actor_id: user.id,
      actor_name: user.name || user.email,
      actor_email: user.email,
      actor_role: user.global_role || 'Owner',
      entity_type: 'AccessRequest',
      entity_id: id,
      entity_name: `Access Request #${id.slice(0, 8)}`,
      field_changed: 'status',
      old_value: 'Pending',
      new_value: status,
      summary: `${user.name || user.email} changed Access Request #${id.slice(0, 8)} status from "Pending" to "${status}" in UI and synced to Google Sheet [Tracker!E:E].`,
      source: 'UI',
      sheet_row_ref: 'Tracker!E:E',
    });

    return NextResponse.json({
      success: true,
      accessRequest: resolved,
    });
  } catch (error: unknown) {
    console.error('Error resolving access request:', error);
    const msg = error instanceof Error ? error.message : 'Failed to resolve access request.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

