/**
 * Safe, theme-aware Markdown-to-HTML formatter for architecture Q&A & advisory text
 */
export function renderMarkdownToHtml(md: string, theme: 'light' | 'dark' = 'dark'): string {
  if (!md) return '';
  const isLight = theme === 'light';

  // 1. Basic HTML sanitization
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Headings
  const h4Class = isLight 
    ? "text-xs font-black text-slate-900 mt-3 mb-1 flex items-center gap-1.5"
    : "text-xs font-black text-white mt-3 mb-1 flex items-center gap-1.5";
  const h3Class = isLight 
    ? "text-sm font-extrabold text-teal-800 mt-3.5 mb-1.5 pb-1 border-b border-slate-200 flex items-center gap-1.5"
    : "text-sm font-extrabold text-teal-400 mt-3.5 mb-1.5 pb-1 border-b border-slate-800 flex items-center gap-1.5";
  const h2Class = isLight 
    ? "text-base font-black text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-300"
    : "text-base font-black text-white mt-4 mb-2 pb-1 border-b border-slate-700";

  html = html.replace(/^#### (.*$)/gim, `<h4 class="${h4Class}">$1</h4>`);
  html = html.replace(/^### (.*$)/gim, `<h3 class="${h3Class}">$1</h3>`);
  html = html.replace(/^## (.*$)/gim, `<h2 class="${h2Class}">$1</h2>`);

  // 3. Bold & Italic
  const strongClass = isLight ? "text-slate-950 font-bold" : "text-white font-bold";
  const emClass = isLight ? "text-slate-600 italic" : "text-slate-400 italic";
  html = html.replace(/\*\*(.*?)\*\*/g, `<strong class="${strongClass}">$1</strong>`);
  html = html.replace(/\*(.*?)\*/g, `<em class="${emClass}">$1</em>`);

  // 4. Code Pills
  const codeClass = isLight
    ? "bg-slate-100 text-teal-800 px-1 py-0.5 rounded font-mono text-[10px] font-semibold border border-slate-200"
    : "bg-slate-900 text-teal-300 px-1 py-0.5 rounded font-mono text-[10px] font-semibold border border-slate-800";
  html = html.replace(/`(.*?)`/g, `<code class="${codeClass}">$1</code>`);

  // 5. Numbered Lists
  const liClass = isLight ? "text-slate-700 text-xs ml-4 list-decimal my-1 leading-relaxed" : "text-slate-300 text-xs ml-4 list-decimal my-1 leading-relaxed";
  html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, `<li class="${liClass}">$2</li>`);

  // 6. Bullet Lists
  const bulletClass = isLight ? "text-slate-700 text-xs ml-4 list-disc my-1 leading-relaxed" : "text-slate-300 text-xs ml-4 list-disc my-1 leading-relaxed";
  html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, `<li class="${bulletClass}">$1</li>`);

  // 7. Horizontal Rules
  const hrClass = isLight ? "border-t border-slate-200 my-2.5" : "border-t border-slate-800 my-2.5";
  html = html.replace(/^---$/gim, `<hr class="${hrClass}" />`);

  // 8. Paragraphs
  const pClass = isLight ? "text-slate-700 text-xs leading-relaxed my-1.5" : "text-slate-300 text-xs leading-relaxed my-1.5";
  const lines = html.split('\n\n');
  const parsed = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<hr') ||
      trimmed.startsWith('<div')
    ) {
      return trimmed;
    }
    return `<p class="${pClass}">${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return parsed.join('\n');
}
