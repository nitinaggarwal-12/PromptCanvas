"use client";

import React, { useState } from "react";
import { 
  Copy, 
  Check, 
  Code, 
  Table as TableIcon, 
  Terminal, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Database, 
  FileText,
  AlertCircle,
  Info,
  CheckCircle2
} from "lucide-react";

interface RichSpecRendererProps {
  content: string;
}

export function RichSpecRenderer({ content }: RichSpecRendererProps) {
  const blocks = parseMarkdownToBlocks(content);

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased max-w-none">
      {blocks.map((block, idx) => (
        <RenderBlock key={idx} block={block} />
      ))}
    </div>
  );
}

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullet-list"; items: string[] }
  | { type: "numbered-list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; variant: "note" | "tip" | "warning" | "security"; title: string; text: string }
  | { type: "divider" };

function parseMarkdownToBlocks(raw: string): Block[] {
  const lines = raw.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^(\*\*\*|---|___)$/.test(line.trim())) {
      blocks.push({ type: "divider" });
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const language = line.trim().replace(/^```/, "").trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: "code",
        language,
        code: codeLines.join("\n")
      });
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "h1", text: line.replace(/^#\s+/, "") });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") });
      i++;
      continue;
    }
    if (line.startsWith("#### ")) {
      blocks.push({ type: "h4", text: line.replace(/^####\s+/, "") });
      i++;
      continue;
    }

    if (line.trim().startsWith(">")) {
      const calloutLines: string[] = [];
      let variant: "note" | "tip" | "warning" | "security" = "note";
      let title = "Note";

      while (i < lines.length && lines[i].trim().startsWith(">")) {
        const cleaned = lines[i].replace(/^>\s?/, "");
        if (cleaned.includes("[!NOTE]") || cleaned.includes("[!INFO]")) {
          variant = "note";
          title = "Architecture Note";
        } else if (cleaned.includes("[!TIP]") || cleaned.includes("[!RECOMMENDATION]")) {
          variant = "tip";
          title = "Best Practice & Recommendation";
        } else if (cleaned.includes("[!WARNING]") || cleaned.includes("[!CAUTION]")) {
          variant = "warning";
          title = "Critical Warning";
        } else if (cleaned.includes("[!SECURITY]") || cleaned.includes("[!COMPLIANCE]")) {
          variant = "security";
          title = "Security & Compliance Guardrail";
        } else {
          calloutLines.push(cleaned);
        }
        i++;
      }
      blocks.push({
        type: "callout",
        variant,
        title,
        text: calloutLines.join(" ").trim()
      });
      continue;
    }

    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split("|")
          .slice(1, -1)
          .map(h => h.trim());
        const rows = tableLines
          .slice(2)
          .map(rowLine =>
            rowLine
              .split("|")
              .slice(1, -1)
              .map(cell => cell.trim())
          );
        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    if (/^(\s*[-*]\s+)/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^(\s*[-*]\s+)/.test(lines[i])) {
        items.push(lines[i].replace(/^(\s*[-*]\s+)/, "").trim());
        i++;
      }
      blocks.push({ type: "bullet-list", items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "numbered-list", items });
      continue;
    }

    if (line.trim().length > 0) {
      const pLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().length > 0 &&
        !lines[i].startsWith("#") &&
        !lines[i].startsWith("```") &&
        !lines[i].startsWith(">") &&
        !lines[i].trim().startsWith("|") &&
        !/^(\s*[-*]\s+)/.test(lines[i]) &&
        !/^\s*\d+\.\s+/.test(lines[i])
      ) {
        pLines.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: "paragraph", text: pLines.join(" ") });
      continue;
    }

    i++;
  }

  return blocks;
}

function formatInlineText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="font-mono text-[11px] bg-slate-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function RenderBlock({ block }: { block: Block }) {
  const [copied, setCopied] = useState(false);

  switch (block.type) {
    case "h1":
      return (
        <h1 className="text-2xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-2 mt-6 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-blue-600 rounded-sm inline-block"></span>
          <span>{block.text}</span>
        </h1>
      );

    case "h2":
      return (
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mt-6 pb-1 border-b border-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-indigo-600 rounded-sm inline-block"></span>
          <span>{block.text}</span>
        </h2>
      );

    case "h3":
      return (
        <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-4 text-blue-900 flex items-center gap-1.5">
          <span className="w-1 h-3 bg-emerald-500 rounded-sm inline-block"></span>
          <span>{block.text}</span>
        </h3>
      );

    case "h4":
      return (
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-3">
          {block.text}
        </h4>
      );

    case "paragraph":
      return (
        <p className="text-xs leading-relaxed text-slate-700 font-normal">
          {formatInlineText(block.text)}
        </p>
      );

    case "bullet-list":
      return (
        <ul className="space-y-1.5 my-2 pl-2">
          {block.items.map((item, idx) => (
            <li key={idx} className="text-xs leading-relaxed text-slate-700 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <span>{formatInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered-list":
      return (
        <ol className="space-y-1.5 my-2 pl-1">
          {block.items.map((item, idx) => (
            <li key={idx} className="text-xs leading-relaxed text-slate-700 flex items-start gap-2">
              <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded px-1 shrink-0">
                {idx + 1}
              </span>
              <span>{formatInlineText(item)}</span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="my-4 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {block.headers.map((h, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2.5 font-bold text-slate-900 uppercase tracking-wider text-[10px] font-mono"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {block.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={rIdx % 2 === 0 ? "bg-white hover:bg-slate-50/80" : "bg-slate-50/50 hover:bg-slate-50/80"}
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 text-slate-700 leading-normal">
                        {formatInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "code":
      return (
        <div className="my-4 rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-lg">
          <div className="bg-slate-800/90 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-2">
                {block.language}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(block.code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] font-semibold rounded flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-100 overflow-x-auto leading-relaxed whitespace-pre">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "callout": {
      const getCalloutStyles = () => {
        switch (block.variant) {
          case "warning":
            return {
              bg: "bg-amber-50 border-amber-200 text-amber-900",
              icon: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            };
          case "security":
            return {
              bg: "bg-purple-50 border-purple-200 text-purple-900",
              icon: <ShieldAlert className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            };
          case "tip":
            return {
              bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            };
          default:
            return {
              bg: "bg-blue-50 border-blue-200 text-blue-900",
              icon: <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            };
        }
      };

      const style = getCalloutStyles();

      return (
        <div className={`p-4 rounded-xl border flex items-start gap-3 my-3 shadow-sm ${style.bg}`}>
          {style.icon}
          <div className="space-y-1 text-xs">
            <div className="font-bold tracking-tight">{block.title}</div>
            <div className="leading-relaxed opacity-90">{formatInlineText(block.text)}</div>
          </div>
        </div>
      );
    }

    case "divider":
      return <hr className="border-slate-200 my-6" />;

    default:
      return null;
  }
}
