'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, ShieldAlert, FileCheck, HelpCircle, Network } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

export default function TermsOfServicePage() {
  const { isLight } = useTheme();

  return (
    <div className={`min-h-screen font-sans ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-200'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-sm hover:opacity-80 transition-opacity">
            <Network className="w-5 h-5 text-teal-500" />
            <span className={isLight ? 'text-slate-900' : 'text-white'}>PROMPT CANVAS</span>
          </Link>
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Canvas
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className={`p-8 md:p-12 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Terms of Service & EULA
              </h1>
              <p className="text-sm text-slate-400">Last Updated: August 2026</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              This Agreement is a legally binding contract between you (&ldquo;User&rdquo;) and PromptCanvas (operated by Nitin Aggarwal) (&ldquo;Company,&rdquo; &ldquo;We,&rdquo; or &ldquo;Us&rdquo;) governing your access to the PromptCanvas portal.
            </p>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <FileCheck className="w-5 h-5 text-teal-500" />
                1. License & Usage
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Subject to your compliance with these terms, Company grants you a limited, non-exclusive, revocable license to use the Service to generate architectural and business diagrams from text prompts. You retain ownership of your input prompts and the generated outputs (e.g., Draw.io XML, SVG, PNG exports).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <ShieldAlert className="w-5 h-5 text-teal-500" />
                2. Acceptable Use
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>Reverse engineer, scrape, or attempt to extract the source code or AI pipelines of the Service.</li>
                <li>Use the Service to generate illegal, malicious, or unauthorized content.</li>
                <li>Use the generated diagrams to build a competing text-to-diagram service.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                3. Disclaimers & No Professional Warranty
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                THE SERVICE AND ALL GENERATED DIAGRAMS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND. COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT GENERATED ARCHITECTURES ARE ACCURATE, SECURE, OR COMPLIANT WITH REGULATORY STANDARDS.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                4. Limitation of Liability
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY OR ITS OPERATOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <HelpCircle className="w-5 h-5 text-teal-500" />
                5. Contact & Jurisdiction
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
