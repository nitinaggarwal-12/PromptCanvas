'use client';

import React, { useState, useEffect } from 'react';
import { Mail, User, HelpCircle, MessageSquare, X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: { name?: string | null; email?: string } | null;
}

const REASON_OPTIONS = [
  'Feature Request & Enhancements',
  'Custom Enterprise Architecture Integration',
  'Bug Report or Technical Issue',
  'AI System Prompt & RAG Feedback',
  'General Inquiry / Collaboration',
];

export function ContactUsModal({ isOpen, onClose, currentUser }: ContactUsModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(REASON_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Name is a mandatory field.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('A valid email address is mandatory.');
      return;
    }
    if (!reason.trim()) {
      setErrorMsg('Please select a reason for contacting.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your message details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          reason,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setMessage('');
        onClose();
      }, 2500);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Error submitting contact form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0b101d] border border-panel-border/80 rounded-2xl p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-accent">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Contact Creator</h3>
              <p className="text-xs text-slate-400">Direct channel to the PromptCanvas creator & engineering team</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Confirmation Card */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Thank you for reaching out! Your message has been directly dispatched to the creator.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-lg font-medium">
                {errorMsg}
              </div>
            )}

            {/* Mandatory Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-accent" />
                <span>Your Name <span className="text-rose-400">*</span></span>
              </label>
              <input
                id="contact-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/20"
              />
            </div>

            {/* Mandatory Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-accent" />
                <span>Your Email Address <span className="text-rose-400">*</span></span>
              </label>
              <input
                id="contact-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/20"
              />
            </div>

            {/* Mandatory Reason Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-teal-accent" />
                <span>Reason for Communication <span className="text-rose-400">*</span></span>
              </label>
              <select
                id="contact-reason-select"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/20 cursor-pointer"
              >
                {REASON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0b101d] text-white py-1">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Mandatory Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-teal-accent" />
                <span>Message Details <span className="text-rose-400">*</span></span>
              </label>
              <textarea
                id="contact-message-textarea"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, request, or issue in detail..."
                className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/20 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-panel-border/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-contact-form-btn"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
