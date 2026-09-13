'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Network } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { LegalPageHeader } from '@/components/LegalPageHeader';

export default function PrivacyPolicyPage() {
  const { isLight } = useTheme();

  return (
    <div className={`min-h-screen font-sans ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-200'}`}>
      {/* Header */}
      <LegalPageHeader />

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className={`p-8 md:p-10 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Privacy Policy
              </h1>
              <p className="text-sm text-slate-400">Last Updated: August 2026</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              This Privacy Policy explains how PromptCanvas (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects your information when you use our services.
            </p>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Eye className="w-5 h-5 text-teal-500" />
                1. Information Collection
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li><strong className={isLight ? 'text-slate-900' : 'text-white'}>Input Data:</strong> We collect the text, prompts, and business use cases you input to generate diagrams.</li>
                <li><strong className={isLight ? 'text-slate-900' : 'text-white'}>Usage Data:</strong> We automatically collect standard log data, including IP addresses, browser types, and interaction metrics to maintain Service stability.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Lock className="w-5 h-5 text-teal-500" />
                2. Data Usage & Third-Party AI Providers
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>We process your prompts through enterprise Large Language Model (LLM) APIs to render diagram code.</li>
                <li>We configure our API integrations so that your private prompts and business architectures are not used by external AI providers to train public models.</li>
                <li>We host the Service securely and do not sell your personal data or business use cases to data brokers.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <FileText className="w-5 h-5 text-teal-500" />
                3. Data Security & Retention
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                We use industry-standard security measures to protect your data. We retain your prompts and generated diagrams only as long as necessary to provide the Service. You may request deletion of your data at any time.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                4. Contact
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>PromptCanvas</strong><br />
                Jurisdiction: New Jersey, United States<br />
                LinkedIn: <a href="https://www.linkedin.com/in/nitin-aggarwal-b49786a/" target="_blank" rel="noreferrer" className="text-teal-500 hover:underline">linkedin.com/in/nitin-aggarwal-b49786a</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
