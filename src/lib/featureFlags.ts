/**
 * Feature Flag helper for Pipeline V2 layout engine A/B comparison.
 */

export function isLayoutEngineV2Enabled(requestBody?: any, requestUrl?: string, headers?: Headers): boolean {
  // 1. Per-request override in body
  if (requestBody && typeof requestBody === 'object') {
    if (requestBody.layoutEngineV2 === true || requestBody.layoutEngineV2 === 'true' || requestBody.layoutEngineV2 === '1') {
      return true;
    }
    if (requestBody.layoutEngineV2 === false || requestBody.layoutEngineV2 === 'false' || requestBody.layoutEngineV2 === '0') {
      return false;
    }
  }

  // 2. Per-request query param
  if (requestUrl) {
    try {
      const url = new URL(requestUrl);
      const q = url.searchParams.get('layoutEngineV2');
      if (q === 'true' || q === '1') return true;
      if (q === 'false' || q === '0') return false;
    } catch {
      // Ignore URL parse errors
    }
  }

  // 3. Header override
  if (headers) {
    const h = headers.get('x-layout-engine-v2');
    if (h === 'true' || h === '1') return true;
    if (h === 'false' || h === '0') return false;
  }

  // 4. Environment variable fallback
  const envVal = process.env.LAYOUT_ENGINE_V2;
  return envVal === 'true' || envVal === '1';
}
