import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const { isUserSuperAdmin } = await import('@/lib/db');
    const isSuper = isUserSuperAdmin(user);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        global_role: isSuper ? 'Super-Admin' : user.global_role || 'Author',
        is_super_admin: isSuper,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
