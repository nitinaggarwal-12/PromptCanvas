import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  getGcsStateBucket,
  saveDiagramBundleToGcs,
  loadDiagramBundleFromGcs,
  listDiagramIdsFromGcs,
} from '@/lib/gcsDiagramStore';

describe('GCS Diagram Persistence Store', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('stays disabled during Vitest runs so offline tests never hit GCP metadata or GCS', async () => {
    expect(getGcsStateBucket()).toBeNull();
    const saved = await saveDiagramBundleToGcs({
      diagram: { id: 'test-1234', name: 'Test' },
      versions: [],
    });
    expect(saved).toBe(false);
    const loaded = await loadDiagramBundleFromGcs('test-1234');
    expect(loaded).toBeNull();
    const ids = await listDiagramIdsFromGcs();
    expect(ids).toEqual([]);
  });
});
