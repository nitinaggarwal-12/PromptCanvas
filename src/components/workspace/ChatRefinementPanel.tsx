'use client';

import React from 'react';
import { Send, Sparkles, MessageSquare, Loader2, Bot, User } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  versionNumber?: number;
}

interface ChatRefinementPanelProps {
  messages: ChatMessage[];
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isGenerating: boolean;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

export const ChatRefinementPanel: React.FC<ChatRefinementPanelProps> = ({
  messages,
  inputPrompt,
  setInputPrompt,
  onSendMessage,
  isGenerating,
  suggestions,
  onSelectSuggestion,
}) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  return (
    <div className="flex flex-col h-full bg-[#0F172A] border-r border-slate-800 w-[380px] shrink-0">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">AI Architect Assistant</h2>
            <p className="text-[11px] text-slate-400">Natural Language Architecture Editor</p>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-teal-500/10'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <div className="flex items-center justify-between gap-2 mt-1.5 opacity-60 text-[10px]">
                <span>{msg.timestamp}</span>
                {msg.versionNumber && <span>v{msg.versionNumber}</span>}
              </div>
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {isGenerating && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none flex items-center gap-2 text-xs">
              <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
              <span>Architecting layout & compiling diagram...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      {suggestions.length > 0 && !isGenerating && (
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 flex flex-wrap gap-1.5">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(suggestion)}
              className="px-2.5 py-1 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-teal-300 hover:text-teal-200 border border-slate-800 hover:border-teal-500/40 rounded-full transition-all text-left truncate max-w-full"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={onSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Refine diagram (e.g. 'Add Redis cache connected to API')..."
          disabled={isGenerating}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isGenerating}
          className="p-2.5 bg-teal-400 hover:bg-teal-300 disabled:opacity-40 disabled:hover:bg-teal-400 text-slate-950 rounded-xl transition-all font-bold shrink-0 shadow-sm shadow-teal-500/20"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};
