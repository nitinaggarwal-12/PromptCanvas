import { NextResponse } from 'next/server';
import { getAuthenticatedUser, hashPassword, verifyPassword } from '@/lib/auth';
import { getUserById, updateUserPassword, updateUserProfile, logUserEvent } from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const sessionUser = await getAuthenticatedUser();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    const fullUser = await getUserById(sessionUser.id);
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    const userAgent = request.headers.get('user-agent');

    // 1. Handle profile name update
    let updatedUser = fullUser;
    if (name !== undefined && name !== fullUser.name) {
      const result = await updateUserProfile(fullUser.id, name || null);
      if (result) updatedUser = result;
      await logUserEvent(fullUser.id, 'PROFILE_UPDATE', ipAddress, userAgent);
    }

    // 2. Handle password update if requested
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password is required to set a new password.' }, { status: 400 });
      }

      if (typeof newPassword !== 'string' || newPassword.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters long.' }, { status: 400 });
      }

      const isCurrentValid = verifyPassword(currentPassword, fullUser.password_hash, fullUser.salt);
      if (!isCurrentValid) {
        return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 });
      }

      const { hash, salt } = hashPassword(newPassword);
      await updateUserPassword(fullUser.id, hash, salt);
      await logUserEvent(fullUser.id, 'PASSWORD_CHANGE', ipAddress, userAgent);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        created_at: updatedUser.created_at,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
