import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Setup node DOM mock for iframe & message events
class MockIframe {
  style = {
    position: '',
    left: '',
    top: '',
    width: '',
    height: '',
    border: '',
    visibility: '',
  };
  src = '';
  contentWindow = {
    postMessage: vi.fn(),
  };
}

describe('Phase 1 & 2: Diagram Rasterizer & Export Protocols', () => {
  let originalWindow: any;
  let originalDocument: any;
  let listeners: Set<(event: any) => void>;
  let createdIframes: MockIframe[];

  beforeEach(() => {
    listeners = new Set();
    createdIframes = [];

    originalWindow = (global as any).window;
    originalDocument = (global as any).document;

    (global as any).window = {
      addEventListener: (type: string, cb: (e: any) => void) => {
        if (type === 'message') listeners.add(cb);
      },
      removeEventListener: (type: string, cb: (e: any) => void) => {
        if (type === 'message') listeners.delete(cb);
      },
    };

    (global as any).document = {
      body: {
        contains: (node: any) => createdIframes.includes(node),
        appendChild: (node: any) => {
          createdIframes.push(node);
        },
      },
      createElement: (tag: string) => {
        if (tag === 'iframe') {
          return new MockIframe();
        }
        return {};
      },
    };
  });

  afterEach(() => {
    (global as any).window = originalWindow;
    (global as any).document = originalDocument;
    vi.restoreAllMocks();
  });

  it('exportDiagramPng resolves on valid embed.diagrams.net export message', async () => {
    // Import fresh module
    const { exportDiagramPng } = await import('../../src/lib/export/diagramRaster');
    const xml = '<mxfile><diagram><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>';

    const exportPromise = exportDiagramPng(xml, { scale: 2 });

    expect(createdIframes.length).toBe(1);
    const iframe = createdIframes[0];
    expect(iframe.src).toBe('https://embed.diagrams.net/?embed=1&proto=json&spin=0&ui=min&configure=0');

    // Wait microtask for iframe initialization and listener setup
    await new Promise(r => setTimeout(r, 10));

    // Simulate init event from embed.diagrams.net
    const initEvent = {
      origin: 'https://embed.diagrams.net',
      data: JSON.stringify({ event: 'init' }),
    };
    listeners.forEach(cb => cb(initEvent));

    expect(iframe.contentWindow.postMessage).toHaveBeenCalledTimes(2);
    expect(JSON.parse((iframe.contentWindow.postMessage as any).mock.calls[0][0])).toEqual({
      action: 'load',
      xml: xml,
      autosave: 0,
    });
    expect(JSON.parse((iframe.contentWindow.postMessage as any).mock.calls[1][0])).toEqual({
      action: 'export',
      format: 'png',
      spinKey: '',
      scale: 2,
      transparent: false,
    });

    const expectedDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSU5EUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const exportEvent = {
      origin: 'https://embed.diagrams.net',
      data: JSON.stringify({ event: 'export', format: 'png', data: expectedDataUrl }),
    };
    listeners.forEach(cb => cb(exportEvent));

    const result = await exportPromise;
    expect(result).toBe(expectedDataUrl);
  });

  it('ignores messages from wrong origin (security origin check)', async () => {
    const { exportDiagramPng } = await import('../../src/lib/export/diagramRaster');
    const xml = '<mxfile><diagram><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>';

    const exportPromise = exportDiagramPng(xml);
    const iframe = createdIframes[0];

    // Malicious or third-party origin message should be ignored
    const maliciousEvent = {
      origin: 'https://malicious-site.com',
      data: JSON.stringify({ event: 'init' }),
    };
    listeners.forEach(cb => cb(maliciousEvent));

    expect(iframe.contentWindow.postMessage).not.toHaveBeenCalled();
  });

  it('rejects on hard timeout if export service never responds', async () => {
    vi.useFakeTimers();
    const { exportDiagramPng } = await import('../../src/lib/export/diagramRaster');
    const xml = '<mxfile><diagram><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>';

    const exportPromise = exportDiagramPng(xml);

    vi.advanceTimersByTime(21000);

    await expect(exportPromise).rejects.toThrow('Export service unreachable');
    vi.useRealTimers();
  });

  it('Static Guard Test: ExportDiagramModal contains zero placeholder fingerprints', () => {
    const modalPath = path.join(__dirname, '../../src/components/ExportDiagramModal.tsx');
    const content = fs.readFileSync(modalPath, 'utf8');

    expect(content).not.toContain('Draw.io Architecture Diagram Component Nodes');
    expect(content).not.toContain('fillRect');
    expect(content).not.toContain('ctx.fillStyle =');
    expect(content).toContain('exportDiagramPng');
  });
});
