import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getSuperAdminAllUsers, updateUserGlobalRole, isUserSuperAdmin } from '@/lib/db';

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

    const updatedUser = await updateUserGlobalRole(userId, globalRole);
    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `User role updated to ${globalRole}!`,
    });
  } catch (error: unknown) {
    console.error('Error updating user role:', error);
    const msg = error instanceof Error ? error.message : 'Failed to update user role.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
