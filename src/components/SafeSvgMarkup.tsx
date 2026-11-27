'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const FORBIDDEN_SVG_TAGS = new Set([
  'script',
  'foreignobject',
  'iframe',
  'object',
  'embed',
  'applet',
  'meta',
  'link',
  'base',
]);

/**
 * Sanitizes a parsed DOM subtree in-place by stripping executable elements,
 * inline event handlers (`on*`), and unsafe URI schemes (`javascript:`, `vbscript:`, `data:text/html`).
 */
export function sanitizeParsedDomSubtree(root: Element): void {
  const queue: Element[] = [root];
  while (queue.length > 0) {
    const el = queue.pop()!;
    const tagLower = el.tagName.toLowerCase();
    if (el !== root && FORBIDDEN_SVG_TAGS.has(tagLower)) {
      el.remove();
      continue;
    }

    const attrNames = el.getAttributeNames();
    for (const attr of attrNames) {
      const lowerAttr = attr.toLowerCase();
      const val = (el.getAttribute(attr) || '').trim();
      if (lowerAttr.startsWith('on')) {
        el.removeAttribute(attr);
        continue;
      }
      if (
        (lowerAttr === 'href' || lowerAttr === 'xlink:href' || lowerAttr === 'src' || lowerAttr === 'formaction') &&
        /^(?:javascript:|vbscript:|data:text\/html)/i.test(val)
      ) {
        el.removeAttribute(attr);
        continue;
      }
      if (lowerAttr === 'style' && /expression\s*\(|javascript:|url\s*\(\s*['"]?\s*javascript:/i.test(val)) {
        el.removeAttribute(attr);
      }
    }

    for (const child of Array.from(el.children)) {
      queue.push(child);
    }
  }
}

interface SafeSvgMarkupProps {
  svg: string;
  className?: string;
  testId?: string;
  ariaHidden?: boolean;
}

/**
 * Renders vector `<svg>` markup safely via `DOMParser` + strict subtree sanitization
 * without using `innerHTML` or `dangerouslySetInnerHTML`.
 */
export function SafeSvgMarkup({ svg, className, testId, ariaHidden }: SafeSvgMarkupProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.replaceChildren();
    if (!svg || typeof DOMParser === 'undefined') return;

    const trimmed = svg
      .replace(/^(?:\s*<\?xml[\s\S]*?\?>|\s*<!DOCTYPE[\s\S]*?>|\s*<!--[\s\S]*?-->)+/i, '')
      .trim();
    if (!trimmed.toLowerCase().startsWith('<svg')) return;

    try {
      const xmlDoc = new DOMParser().parseFromString(trimmed, 'image/svg+xml');
      let svgEl: Element | null =
        xmlDoc.documentElement &&
        xmlDoc.documentElement.tagName.toLowerCase() === 'svg' &&
        !xmlDoc.querySelector('parsererror')
          ? xmlDoc.documentElement
          : null;

      // Fallback to inert HTML5 parser when SVG markup omits `xmlns` or includes HTML5 named entities (e.g., `&bull;`, `&rarr;`)
      if (!svgEl) {
        const htmlDoc = new DOMParser().parseFromString(trimmed, 'text/html');
        svgEl = htmlDoc.body?.querySelector('svg') || null;
      }

      if (!svgEl || svgEl.tagName.toLowerCase() !== 'svg') {
        return;
      }
      sanitizeParsedDomSubtree(svgEl);
      host.replaceChildren(document.importNode(svgEl, true));
    } catch {
      host.replaceChildren();
    }
  }, [svg]);

  return <div ref={hostRef} data-testid={testId} className={className} aria-hidden={ariaHidden} />;
}
