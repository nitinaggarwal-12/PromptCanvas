'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Zap, 
  History, 
  FileText, 
  CheckCircle2, 
  Play,
  Network,
  X,
  User,
  Mail,
  Menu,
  LayoutGrid,
  BarChart3
} from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AccessRequestsInbox } from '@/components/AccessRequestsInbox';
import { ContactUsModal } from '@/components/ContactUsModal';
import { VisitorCounter } from '@/components/VisitorCounter';
import { TEMPLATE_CATALOG_ITEMS } from '@/lib/templateCategories';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';

export default function LandingPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsProfileOpen(false);
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const handleLaunchAppClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthMode('signin');
      setIsAuthOpen(true);
    }
  };

  const handleBuildDiagramClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthMode('signup');
      setIsAuthOpen(true);
    }
  };

  const handleExploreAsGuest = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      router.push('/workspace?new=true');
    } catch {
      router.push('/workspace?new=true');
    }
  };

  return (
    <div className={`relative min-h-screen font-sans selection:bg-teal-500/30 selection:text-teal-200 overflow-x-clip transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070a13] text-slate-100'
    }`}>
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0" />

      {/* Header/Navigation */}
      <header className={`sticky top-0 w-full z-50 border-b backdrop-blur-md shrink-0 transition-colors ${
        isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-panel-border/30 bg-[#070a13]/80 text-white'
      }`}>
        <div className="w-full max-w-8xl mx-auto h-16 sm:h-20 px-3 sm:px-6 md:px-12 flex items-center justify-between gap-2 sm:gap-3">
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center shrink-0">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#070a13]'}`}>
                <Network className="w-4 h-4 sm:w-5 sm:h-5 text-teal-accent" />
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-1">
              <span className={`font-extrabold text-sm sm:text-lg tracking-wider bg-clip-text ${
                isLight ? 'text-slate-900 bg-gradient-to-r from-slate-950 to-slate-700' : 'text-white bg-gradient-to-r from-white to-slate-300'
              }`}>
                PROMPT
              </span>
              <span className="font-light text-sm sm:text-lg tracking-wider text-teal-500 hidden min-[380px]:inline">
                CANVAS
              </span>
            </div>
          </Link>

          <nav className={`hidden lg:flex items-center gap-3 xl:gap-4 text-xs font-bold shrink-0 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            <Link href="/canonical" className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
              isLight ? 'hover:bg-slate-100 hover:text-slate-900 text-sky-600' : 'hover:bg-slate-800/80 hover:text-white text-sky-400'
            }`} title="50 High-Contrast Architecture Blueprints">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Canonical Hub</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500/20 text-sky-600 dark:text-sky-300 font-mono font-bold">50</span>
            </Link>

            <Link href="/docgen" className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
              isLight ? 'hover:bg-slate-100 hover:text-slate-900 text-indigo-600' : 'hover:bg-slate-800/80 hover:text-white text-indigo-400'
            }`} title="17 Enterprise Specification Blueprints (BRD, PRD, SDD, TDD)">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>DocGen Hub</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-mono font-bold">17</span>
            </Link>

            <Link href="/guide" className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              isLight ? 'hover:bg-teal-50 text-teal-700 hover:text-teal-900' : 'hover:bg-teal-500/10 text-teal-400 hover:text-teal-300'
            }`} title="Interactive Animated Playbooks & GIFs">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Playbooks &amp; GIFs</span>
            </Link>

            <Link href="/dashboard" className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
              isLight ? 'hover:bg-slate-100 hover:text-slate-900' : 'hover:bg-slate-800/80 hover:text-white'
            }`} title="Operations Telemetry & Workspace Management">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Operations Dashboard</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggleBtn id="landing-theme-toggle-btn" />

            {user ? (
              <>
                <button
                  id="header-user-profile-btn"
                  onClick={() => setIsProfileOpen(true)}
                  className={`hidden sm:flex px-2.5 py-1.5 rounded-lg border text-xs font-semibold items-center gap-2 transition-all ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                      : 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-200'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-[10px]">
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <span className="hidden xl:inline max-w-[100px] truncate text-xs">{user.name || user.email}</span>
                </button>
                <Link
                  id="header-launch-app-btn"
                  href="/docgen"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-slate-950 font-black text-xs tracking-wide transition-all shadow-md shadow-teal-500/20 hover:scale-[1.02] flex items-center gap-1.5"
                >
                  <span>Launch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            ) : (
              <>
                <button
                  id="header-signin-btn"
                  onClick={() => {
                    setAuthMode('signin');
                    setIsAuthOpen(true);
                  }}
                  className={`hidden sm:flex px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <Link
                  id="header-launch-app-btn"
                  href="/docgen"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-slate-950 font-black text-xs tracking-wide transition-all shadow-md shadow-teal-500/20 hover:scale-[1.02] flex items-center gap-1.5"
                >
                  <span>Launch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}

            {/* Mobile Navigation Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className={`lg:hidden p-2 rounded-lg border cursor-pointer ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-teal-400'
              }`}
              title="Toggle Menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {isMobileNavOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#070a13]/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-300">
              <a 
                href="#features" 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 hover:text-teal-400 transition"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 hover:text-teal-400 transition"
              >
                How It Works
              </a>
              <Link 
                href="/canonical" 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-sky-400 font-bold flex items-center justify-between"
              >
                <span>Canonical Architecture Hub</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-sky-500/20 text-sky-300">34 Schemas</span>
              </Link>
              <Link 
                href="/guide" 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-teal-400 font-bold flex items-center justify-between"
              >
                <span>User Guide &amp; GIFs</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-teal-500/20 text-teal-300">Playbooks</span>
              </Link>
              <Link 
                href="/workspace?tab=templates" 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-teal-400 font-bold flex items-center justify-between"
              >
                <span>Templates Matrix</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-teal-500/20 text-teal-300">50 Blueprints</span>
              </Link>
              <a 
                href="#value" 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 hover:text-teal-400 transition"
              >
                Why PromptCanvas
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/workspace?new=true"
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-slate-950 font-black text-xs text-center shadow-md"
              >
                Build First Diagram
              </Link>
              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsContactOpen(true);
                }}
                className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold text-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 md:pt-20 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 text-sm font-semibold tracking-wide animate-pulse">
            <Sparkles className="w-4 h-4" /> Powered by Gemini 3.7 Flash &amp; Draw.io
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Sketch Cloud <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-500">
              Architecture with AI
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Translate complex natural language prompts into professional, multi-tier Draw.io architecture diagrams. Audited for security, version-controlled, and instantly editable.
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full pt-2">
            <Link
              id="hero-build-diagram-btn"
              href="/docgen"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-bold tracking-wide text-center transition-all shadow-xl shadow-teal-500/15 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/workspace?tour=true"
              className={`px-8 py-4 rounded-xl border font-semibold text-center transition-all flex items-center justify-center gap-2 ${
                isLight
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                  : 'bg-slate-800/80 border-slate-700/60 hover:border-teal-500/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4 text-teal-500" />
              <span>Watch Interactive Tour</span>
            </Link>
          </div>

          {/* Quick highlights - Floating capsules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-10 border-t border-panel-border/30 w-full z-10">
            <div className={`rounded-xl p-4 transition-all duration-300 border ${
              isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-white'
            }`}>
              <p className={`text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>100%</p>
              <p className={`text-sm mt-1 font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Interactive Vector SVG</p>
            </div>
            <div className={`rounded-xl p-4 transition-all duration-300 border ${
              isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-white'
            }`}>
              <p className={`text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>&lt; 60s</p>
              <p className={`text-sm mt-1 font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>From Text to Diagram</p>
            </div>
            <div className={`rounded-xl p-4 transition-all duration-300 border ${
              isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-white'
            }`}>
              <p className={`text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Built-in</p>
              <p className={`text-sm mt-1 font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Gemini Security Auditor</p>
            </div>
          </div>
        </div>

        {/* Pixar Graphics Container */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
          {/* Neon Glow Frame behind the picture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-2xl blur-[20px] opacity-30 transform scale-95" />
          
          <div className={`relative rounded-2xl p-2.5 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] max-w-md w-full border ${
            isLight ? 'bg-white border-slate-200' : 'glass-panel-teal border-teal-500/20'
          }`}>
            <Image 
              src="/pixar_robot_architect.jpg" 
              alt="AI Robot Cloud Architect Sketching"
              priority
              width={500}
              height={350}
              className="w-full h-auto rounded-[10px] object-cover border border-teal-500/20"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-2.5 rounded-[10px] bg-gradient-to-t from-[#070a13]/70 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-widest">Sketch Assistant</span>
              <p className="text-sm font-semibold text-white mt-0.5">Meet PromptCanvas, your automated 3D cloud design helper</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section id="value" className={`relative py-24 border-y transition-colors ${
        isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/40 border-panel-border/30'
      }`}>
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3">The Problem & The Cure</h2>
            <p className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Diagramming is critical, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">but building them by hand is a bottleneck.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* The Hard Way */}
            <div className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border ${
              isLight ? 'bg-white border-red-200 shadow-md' : 'glass-panel border-red-500/10'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                  <X className="w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-extrabold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>The Manual Bottleneck</h3>
                <ul className={`space-y-3.5 text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>Dragging, connecting, and formatting 20+ nodes manually in Draw.io takes hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>Keeping static PDF/PNG images synchronized with production system changes is almost impossible.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>Verifying design compliance, network segmentation, and safety requires manual architectural reviews.</span>
                  </li>
                </ul>
              </div>
              <p className="text-base text-red-500 mt-8 font-medium italic">Result: Out-of-date, misaligned diagrams that slow down teams.</p>
            </div>

            {/* The PromptCanvas Way */}
            <div className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border ${
              isLight ? 'bg-white border-teal-300 shadow-md' : 'glass-panel border-teal-500/25'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-accent mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-extrabold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>PromptCanvas Automation</h3>
                <ul className={`space-y-3.5 text-lg ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 dark:text-teal-accent font-bold shrink-0 mt-0.5">✓</span>
                    <span>Describe your stack in natural text. PromptCanvas creates valid, fully-spaced XML layouts in seconds.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 dark:text-teal-accent font-bold shrink-0 mt-0.5">✓</span>
                    <span>Iterate seamlessly. Ask the AI to &quot;add an ALB,&quot; &quot;connect DB to Redis,&quot; or &quot;redesign for GCP.&quot;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 dark:text-teal-accent font-bold shrink-0 mt-0.5">✓</span>
                    <span>Audits are built-in. Let the Gemini security auditor analyze node connections for security risks automatically.</span>
                  </li>
                </ul>
              </div>
              <p className="text-base text-teal-600 dark:text-teal-400 mt-8 font-semibold tracking-wide">Result: High-fidelity, live architecture maps created at the speed of thought.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative py-24 max-w-8xl mx-auto px-6 md:px-12 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3">Product Capabilities</h2>
          <h3 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Designed for Architects, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500">Built with Industrial Safety.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl border ${
            isLight ? 'bg-white border-slate-200 hover:border-teal-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-teal-500/45 text-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-accent mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Prompt-to-Architecture</h4>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Feed raw text prompts detailing databases, runtimes, security layers, or ingress. PromptCanvas renders standard, color-coded diagrams aligned to logical enterprise tiers.
            </p>
          </div>

          {/* Card 2 */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl border ${
            isLight ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-indigo-500/45 text-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Ready-To-Go Templates</h4>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Launch with 10 production-grade blueprints (Data Lakehouse, AWS EKS Microservices, RAG/Gemini AI pipelines, VPC networks) to instantly experiment and validate stacks.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl border ${
            isLight ? 'bg-white border-slate-200 hover:border-purple-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-purple-500/45 text-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Infinite Version History</h4>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Every AI generation or manual update creates a historical snapshot. Compare versions, trace comments, and revert to previous states in one click.
            </p>
          </div>

          {/* Card 4 */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl border ${
            isLight ? 'bg-white border-slate-200 hover:border-teal-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-teal-500/45 text-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-accent mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Gemini Compliance Audit</h4>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Run security compliance reports directly in the app. Gemini audits your drawing&apos;s nodes and edges for single points of failure, unencrypted links, or exposed ports.
            </p>
          </div>

          {/* Card 5 */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl border ${
            isLight ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-indigo-500/45 text-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Interactive 2D Canvas</h4>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Smooth vector-based renderer with panning, scroll-to-zoom, infinite grids, and an interactive side-tree nodes inspector that displays node connections clearly.
            </p>
          </div>

          {/* Card 6 */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl border ${
            isLight ? 'bg-white border-slate-200 hover:border-purple-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-purple-500/45 text-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Pure Open XML Output</h4>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Export designs as fully valid Draw.io XML schemas. Copy, modify, share, or open them in your standard desktop Draw.io client with absolutely no vendor lock-in.
            </p>
          </div>

        </div>
      </section>

      {/* Templates Gallery Section */}
      <section id="templates" className="relative py-24 max-w-8xl mx-auto px-6 md:px-16 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3">Pre-designed Stacks</h2>
          <h3 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Bootstrap with Production-Grade Blueprints
          </h3>
          <p className={`text-lg mt-4 max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Explore 6 spotlighted enterprise architecture stacks below, or launch any of our <strong>50 complete multi-cloud reference blueprints</strong> directly in the interactive studio.
          </p>
          <div className="mt-4">
            <Link
              href="/workspace?tab=templates"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors underline underline-offset-4"
            >
              <span>View All 50 Production Blueprints in Templates Gallery →</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Template 1: AI RAG Pipeline */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between border ${
            isLight ? 'bg-white border-slate-200 hover:border-teal-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-teal-500/45 text-slate-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-accent group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GCP Cloud</span>
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Vertex AI Retrieval-Augmented Generation (RAG)</h4>
              <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Multi-tier pipeline featuring Cloud Run API service, pgvector-enabled Cloud SQL database, Vertex AI Search indexing, and Gemini reasoning engine.
              </p>
            </div>
            <Link
              href="/workspace?modal=create&template=5"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors"
            >
              <span>Launch blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Template 2: Microservices Cluster */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between border ${
            isLight ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-indigo-500/45 text-slate-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Network className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">AWS Cloud</span>
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Kubernetes Microservices Cluster (EKS)</h4>
              <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Elastic Kubernetes Service setup with ALB ingress controller, Amazon API Gateway, EKS worker nodes, DynamoDB state session, and Redis caching.
              </p>
            </div>
            <Link
              href="/workspace?modal=create&template=3"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              <span>Launch blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Template 3: Serverless App */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between border ${
            isLight ? 'bg-white border-slate-200 hover:border-purple-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-purple-500/45 text-slate-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GCP Cloud</span>
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Serverless Web Application</h4>
              <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Global HTTPS Load Balancer with Cloud CDN, Cloud Run compute for microservices, Cloud SQL (PostgreSQL), and Cloud Storage for assets.
              </p>
            </div>
            <Link
              href="/workspace?modal=create&template=1"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors"
            >
              <span>Launch blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Template 4: Data Lakehouse */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between border ${
            isLight ? 'bg-white border-slate-200 hover:border-teal-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-teal-500/45 text-slate-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-accent group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">AWS Cloud</span>
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Modern AWS Data Lakehouse</h4>
              <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Amazon S3 raw/processed tiers, AWS Glue Catalog schema database, Athena ad-hoc serverless querying, Redshift warehouse, and QuickSight BI.
              </p>
            </div>
            <Link
              href="/workspace?modal=create&template=4"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors"
            >
              <span>Launch blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Template 5: Streaming Analytics */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between border ${
            isLight ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-indigo-500/45 text-slate-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <History className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GCP Cloud</span>
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Real-time Streaming Analytics</h4>
              <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Streaming ingestion via Cloud Pub/Sub, serverless stream/batch ETL processing with Cloud Dataflow, BigQuery storage, and Looker visualization dashboards.
              </p>
            </div>
            <Link
              href="/workspace?modal=create&template=2"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              <span>Launch blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Template 6: Event-Driven Microservices */}
          <div className={`rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between border ${
            isLight ? 'bg-white border-slate-200 hover:border-purple-400 shadow-md text-slate-800' : 'glass-panel border-panel-border/40 hover:border-purple-500/45 text-slate-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">AWS Cloud</span>
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Event-Driven Microservices</h4>
              <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Amazon EventBridge bus, decoupling with SQS queues and SNS topics, serverless event handlers via AWS Lambda, and DynamoDB for storage.
              </p>
            </div>
            <Link
              href="/workspace?modal=create&template=6"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors"
            >
              <span>Launch blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className={`relative py-32 border-y transition-colors ${
        isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/40 border-panel-border/30'
      }`}>
        <div className="w-full max-w-8xl mx-auto px-6 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-4">The Workflow</h2>
            <h3 className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Create and Refine in Three Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {/* Desktop workflow connector line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-teal-500/30 via-indigo-500/40 to-teal-500/30 border-t border-dashed border-panel-border/30 z-0" />
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-5 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-[#070a13] font-black text-2xl shadow-lg shadow-teal-500/20 hover:scale-110 transition-all duration-300">
                1
              </div>
              <h4 className={`font-bold text-xl md:text-2xl ${isLight ? 'text-slate-900' : 'text-white'}`}>Select or Input Prompt</h4>
              <p className={`text-base max-w-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Choose a pre-defined architecture template or enter a custom prompt describing your microservices, compute instances, database types, and connectors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-5 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-[#070a13] font-black text-2xl shadow-lg shadow-teal-500/20 hover:scale-110 transition-all duration-300">
                2
              </div>
              <h4 className={`font-bold text-xl md:text-2xl ${isLight ? 'text-slate-900' : 'text-white'}`}>Gemini Generates XML</h4>
              <p className={`text-base max-w-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Our backend compiler calls Gemini 3.6 Flash, generating a valid XML diagram with sequential node numbering, structured tiers, and descriptive connections.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-5 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-[#070a13] font-black text-2xl shadow-lg shadow-teal-500/20 hover:scale-110 transition-all duration-300">
                3
              </div>
              <h4 className={`font-bold text-xl md:text-2xl ${isLight ? 'text-slate-900' : 'text-white'}`}>Audit, Tweak, and Iterate</h4>
              <p className={`text-base max-w-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Audit the security of your diagram instantly. Add new nodes using the chat prompt interface, edit components, or click &quot;Open in New Tab&quot; to edit visually in Draw.io.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="relative py-24 z-10 max-w-6xl mx-auto px-6 text-center">
        <div className={`rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl border ${
          isLight
            ? 'bg-gradient-to-br from-white via-teal-50/50 to-indigo-50/50 border-teal-200 shadow-xl'
            : 'bg-[#090d16] bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_50%)] border-teal-500/20'
        }`}>
          {/* Decorative Grid inside CTA Card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />
          
          <Sparkles className="w-12 h-12 text-teal-500 dark:text-teal-accent mx-auto mb-6 animate-pulse" />
          
          <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Design Compliant Cloud Stacks at the Speed of Thought
          </h2>
          
          <p className={`text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Stop drawing connectors manually. Leverage Gemini AI to build, audit, and version Draw.io architecture diagrams automatically.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/docgen"
              className="px-8 py-4 rounded-xl bg-teal-accent hover:bg-teal-hover text-[#070a13] font-bold tracking-wide transition-all shadow-xl shadow-teal-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Studio Free</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t py-14 transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-950/60 border-panel-border/30 text-slate-400'
      }`}>
        <div className="max-w-8xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-teal-500 dark:text-teal-accent" />
            <span className={`font-extrabold tracking-wider text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>PROMPT CANVAS</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; 2026 Prompt Canvas. Designed with high-fidelity cloud blueprints. Open-source Draw.io XML compatible.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          setIsAuthOpen(false);
          router.push('/workspace');
        }}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={(updatedUser) => {
          setUser(updatedUser);
        }}
        onLogout={handleLogout}
      />

      <ContactUsModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        currentUser={user}
      />

    </div>
  );
}
