import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import {
  getSuperAdminAllUsers,
  updateUserGlobalRole,
  isUserSuperAdmin,
  getUserById,
  recordChangelogEntry,
  addOrUpdateUserWithChangelog,
} from '@/lib/db';

// GET /api/admin/users - Super-Admin dashboard route listing all users
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !isUserSuperAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden. Super-Admin access required.' }, { status: 403 });
    }

    const users = await getSuperAdminAllUsers();
    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json({ error: 'Failed to fetch admin users list.' }, { status: 500 });
  }
}

// PUT /api/admin/users - Super-Admin update global user role
export async function PUT(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !isUserSuperAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden. Super-Admin access required.' }, { status: 403 });
    }

    const body = await request.json();
    const { userId, globalRole } = body;

    if (!userId || !globalRole || !['Super-Admin', 'Author', 'Member'].includes(globalRole)) {
      return NextResponse.json({ error: 'Invalid user ID or global role.' }, { status: 400 });
    }

    const existingTarget = await getUserById(userId);
    const oldRole = existingTarget?.global_role || 'Author';
    const updatedUser = await updateUserGlobalRole(userId, globalRole);

    await recordChangelogEntry({
      event_category: 'USER_ROLE_CHANGED',
      actor_id: user.id,
      actor_name: user.name || user.email,
      actor_email: user.email,
      actor_role: 'Super-Admin',
      entity_type: 'User',
      entity_id: userId,
      entity_name: `${updatedUser?.name || updatedUser?.email || userId}`,
      field_changed: 'global_role',
      old_value: oldRole,
      new_value: globalRole,
      summary: `${user.name || user.email} changed global role of ${updatedUser?.name || updatedUser?.email} from "${oldRole}" to "${globalRole}" in Admin UI and synced to Google Sheet [Users!D:D].`,
      source: 'UI',
      sheet_row_ref: 'Users!D:D',
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `User role updated to ${globalRole} and synced to Changelog & Google Sheet!`,
    });
  } catch (error: unknown) {
    console.error('Error updating user role:', error);
    const msg = error instanceof Error ? error.message : 'Failed to update user role.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// POST /api/admin/users - Add a new user from Admin UI and sync to Changelog + Google Sheet
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { name, email, role } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const validRole = ['Super-Admin', 'Author', 'Member'].includes(role) ? role : 'Author';
    const actorName = user?.name || body.actorName || 'Nitin Aggarwal';
    const actorEmail = user?.email || body.actorEmail || 'nitin.aggarwal@enterprise-arch.io';

    const result = await addOrUpdateUserWithChangelog({
      name,
      email,
      role: validRole,
      actorName,
      actorEmail,
      actorRole: 'Super-Admin',
      source: 'UI',
    });

    return NextResponse.json({
      success: true,
      user: result.user,
      changelog: result.changelog,
    });
  } catch (error: unknown) {
    console.error('Error adding user:', error);
    const msg = error instanceof Error ? error.message : 'Failed to add user.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

