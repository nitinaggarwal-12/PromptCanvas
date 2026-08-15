import { describe, it, expect } from 'vitest';
import { getVisitorCount, incrementVisitorCount } from '@/lib/db';

describe('Visitor Counter Unit Tests', () => {
  it('should get current visitor count and increment sequentially', async () => {
    const count1 = await getVisitorCount();
    expect(typeof count1).toBe('number');
    expect(count1).toBeGreaterThanOrEqual(1284);

    const count2 = await incrementVisitorCount(1);
    expect(count2).toBe(count1 + 1);

    const count3 = await incrementVisitorCount(2);
    expect(count3).toBe(count2 + 2);

    const currentCount = await getVisitorCount();
    expect(currentCount).toBe(count3);
  });
});
