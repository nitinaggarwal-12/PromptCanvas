import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../src/app/api/chat/route';

describe('POST /api/chat', () => {
  it('returns 400 when prompt is empty or missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: '' })
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Prompt is required');
  });

  it('generates deterministic advisory response with gaps and suggestions when GEMINI_API_KEY is not set', async () => {
    const sampleXml = `<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="node_lb" value="Cloud Load Balancing" vertex="1" parent="1"/><mxCell id="node_run" value="Cloud Run Service" vertex="1" parent="1"/><mxCell id="node_sql" value="Cloud SQL Postgres" vertex="1" parent="1"/></root></mxGraphModel>`;

    const req = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'what missing in this architecture',
        diagramName: 'Web Tier Architecture',
        architectureType: 'Microservices',
        xmlContent: sampleXml
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.answer).toBeDefined();
    expect(data.answer).toContain('Principal Architecture Advisory');
    expect(data.suggestions.length).toBeGreaterThan(0);
    // Should detect missing WAF and cache
    expect(data.identifiedGaps.some((g: string) => g.includes('Cloud Armor'))).toBe(true);
    expect(data.suggestions.some((s: any) => s.label.includes('Cloud Armor'))).toBe(true);
  });
});
