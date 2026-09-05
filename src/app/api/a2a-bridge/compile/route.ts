import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const A2A_GATEWAY_URL = process.env.A2A_GATEWAY_URL || 'http://127.0.0.1:8090';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const xml = body.drawio_xml || body.xml;

    if (!xml) {
      return NextResponse.json(
        { detail: "Missing 'drawio_xml' or 'xml' in request body." },
        { status: 400 }
      );
    }

    const gatewayRes = await fetch(`${A2A_GATEWAY_URL}/api/promptcanvas/compile-to-dag`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        drawio_xml: xml,
        target_protocol: body.target_protocol || 'a2a.v1.0.0',
        enforce_ast_sanitization: body.enforce_ast_sanitization ?? true,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!gatewayRes.ok) {
      const errDetail = await gatewayRes.text();
      return NextResponse.json(
        { detail: `A2A Gateway responded with ${gatewayRes.status}: ${errDetail}` },
        { status: gatewayRes.status }
      );
    }

    const compiledDag = await gatewayRes.json();
    return NextResponse.json(compiledDag);
  } catch (err: any) {
    console.error('[A2A Bridge Proxy Error]', err);
    return NextResponse.json(
      {
        detail: `Could not reach A2A Enterprise Gateway at ${A2A_GATEWAY_URL}. Ensure the FastAPI gateway is running (.venv/bin/python -m uvicorn portal.app:app --host 127.0.0.1 --port 8090). Error: ${err.message}`,
      },
      { status: 502 }
    );
  }
}
