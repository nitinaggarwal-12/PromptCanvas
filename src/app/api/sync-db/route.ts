import { NextRequest, NextResponse } from 'next/server';
import { syncDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const expectedKey = process.env.GEMINI_API_KEY;

    if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { diagrams, versions } = body;

    if (!Array.isArray(diagrams) || !Array.isArray(versions)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await syncDatabase(diagrams, versions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error syncing database:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
