import { NextResponse } from 'next/server';
import { compileXmlToIaC } from '@/lib/iacCompiler';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { xml, title } = body;

    if (!xml || typeof xml !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "xml" is required' },
        { status: 400 }
      );
    }

    const iacResult = compileXmlToIaC(xml, title || 'Enterprise Architecture Platform');

    return NextResponse.json(iacResult);
  } catch (error: any) {
    console.error('[IaC Export Error]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to compile infrastructure-as-code' },
      { status: 500 }
    );
  }
}
