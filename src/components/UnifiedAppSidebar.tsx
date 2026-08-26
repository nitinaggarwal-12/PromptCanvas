'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Network,
  LayoutGrid,
  FileText,
  History,
  BarChart3,
  ShieldCheck,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  User,
  Menu,
  X,
  Compass,
  Layers
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';

interface SubNavItem {
  id: string;
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export default function UnifiedAppSidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptcanvas_sidebar_open');
        if (saved !== null) return saved === 'true';
      } catch {}
    }
    return true;
  });

  const isStudioRoute = 
    pathname.startsWith('/studio') || 
    pathname.startsWith('/diagen') || 
    pathname.startsWith('/docgen') || 
    pathname.startsWith('/diablueprint') || 
    pathname.startsWith('/docblueprint');

  const [isStudioExpanded, setIsStudioExpanded] = useState<boolean>(true);

  // Auto-expand if active route is under studio
  useEffect(() => {
    if (isStudioRoute) {
      setIsStudioExpanded(true);
    }
  }, [pathname, isStudioRoute]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('promptcanvas_sidebar_open', String(next));
        } catch {}
      }
      return next;
    });
  };

  // Auth fetch
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* 1. DESKTOP COLLAPSIBLE SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } hidden lg:flex border-r transition-all duration-300 flex-col justify-between z-40 shrink-0 sticky top-0 h-screen select-none ${
          isLight ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-[#090d16]/95 border-slate-800/80 text-slate-100'
        }`}
      >
        {/* Top Branding & CTAs */}
        <div className="overflow-y-auto no-scrollbar">
          {/* Brand Header */}
          <div className={`h-16 border-b flex items-center justify-between px-4 shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800/60'}`}>
            {isSidebarOpen ? (
              <Link href="/studio" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className={`w-full h-full rounded-[6px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#070a13]'}`}>
                    <Sparkles className="w-4 h-4 text-sky-500" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-extrabold tracking-wider text-xs uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>Prompt Canvas</span>
                  <span className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold tracking-wider">Architecture Studio</span>
                </div>
              </Link>
            ) : (
              <Link href="/studio" className="mx-auto" title="Prompt Canvas Architecture Studio">
                <Sparkles className="w-5 h-5 text-sky-500 hover:scale-110 transition-transform" />
              </Link>
            )}

            {isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Creation Action CTA */}
          <div className={`p-3 border-b relative shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800/50'}`}>
            <Link
              href="/diagen?new=true"
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black transition-all shadow-md hover:shadow-sky-500/20 text-xs cursor-pointer ${
                !isSidebarOpen && 'p-2'
              }`}
              title="Launch DiaGen AI Architecture Studio"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              {isSidebarOpen && <span>Launch DiaGen</span>}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {/* 1. Design Canvas */}
            <Link href="/workspace" className="block">
              <div
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathname === '/workspace' && !pathname.includes('tab=')
                    ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Network className={`w-4 h-4 shrink-0 ${pathname === '/workspace' ? 'text-white' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span className="truncate">Design Canvas</span>}
                </div>
              </div>
            </Link>

            {/* 2. Studio [Expandable Hub] */}
            <div className="space-y-1 pt-1">
              <div
                onClick={() => {
                  if (!isSidebarOpen) {
                    setIsSidebarOpen(true);
                    setIsStudioExpanded(true);
                  } else {
                    setIsStudioExpanded(!isStudioExpanded);
                  }
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer select-none ${
                  pathname === '/studio'
                    ? isLight
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 shadow-sm'
                      : 'bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 shadow-sm'
                    : isStudioRoute
                    ? isLight
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'bg-slate-900/80 text-white font-bold'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Link href="/studio" onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 min-w-0 flex-1">
                  <Sparkles className={`w-4 h-4 shrink-0 ${isStudioRoute ? 'text-indigo-500' : 'text-indigo-400'}`} />
                  {isSidebarOpen && (
                    <span className="truncate tracking-wide flex items-center gap-1.5">
                      <span>Studio</span>
                    </span>
                  )}
                </Link>

                {isSidebarOpen && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[8.5px] font-mono font-black px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
                      HUB
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsStudioExpanded(!isStudioExpanded);
                      }}
                      className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isStudioExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                )}
              </div>

              {/* Studio Sub-Menu Accordion */}
              {isSidebarOpen && isStudioExpanded && (
                <div className={`ml-3 pl-2.5 border-l space-y-1 py-1 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  isLight ? 'border-indigo-200' : 'border-indigo-500/30'
                }`}>
                  {/* DiaGen */}
                  <Link href="/diagen" className="block">
                    <div
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                        pathname.startsWith('/diagen')
                          ? 'bg-teal-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-teal-50/60'
                          : 'text-slate-300 hover:text-white hover:bg-teal-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Layers className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith('/diagen') ? 'text-white' : 'text-teal-500'}`} />
                        <span className="truncate">DiaGen</span>
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        pathname.startsWith('/diagen') ? 'bg-white/20 text-white' : 'bg-teal-500/15 text-teal-600 dark:text-teal-300'
                      }`}>
                        AI
                      </span>
                    </div>
                  </Link>

                  {/* DocGen */}
                  <Link href="/docgen" className="block">
                    <div
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                        pathname.startsWith('/docgen')
                          ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-indigo-50/60'
                          : 'text-slate-300 hover:text-white hover:bg-indigo-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith('/docgen') ? 'text-white' : 'text-indigo-500'}`} />
                        <span className="truncate">DocGen</span>
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        pathname.startsWith('/docgen') ? 'bg-white/20 text-white' : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300'
                      }`}>
                        17
                      </span>
                    </div>
                  </Link>

                  {/* DiaBluePrint */}
                  <Link href="/diablueprint" className="block">
                    <div
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                        pathname.startsWith('/diablueprint') || pathname.startsWith('/canonical')
                          ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-sky-50/60'
                          : 'text-slate-300 hover:text-white hover:bg-sky-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <LayoutGrid className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith('/diablueprint') ? 'text-white' : 'text-sky-500'}`} />
                        <span className="truncate">DiaBluePrint</span>
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        pathname.startsWith('/diablueprint') ? 'bg-white/20 text-white' : 'bg-sky-500/15 text-sky-600 dark:text-sky-300'
                      }`}>
                        50
                      </span>
                    </div>
                  </Link>

                  {/* DocBluePrint */}
                  <Link href="/docblueprint" className="block">
                    <div
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                        pathname.startsWith('/docblueprint')
                          ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60'
                          : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith('/docblueprint') ? 'text-white' : 'text-emerald-500'}`} />
                        <span className="truncate">DocBluePrint</span>
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        pathname.startsWith('/docblueprint') ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300'
                      }`}>
                        17
                      </span>
                    </div>
                  </Link>

                  {/* Projects & Versions */}
                  <Link href="/history" className="block">
                    <div
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                        pathname.startsWith('/history')
                          ? 'bg-amber-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'
                          : 'text-slate-300 hover:text-white hover:bg-amber-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <History className={`w-3.5 h-3.5 shrink-0 ${pathname.startsWith('/history') ? 'text-white' : 'text-amber-500'}`} />
                        <span className="truncate">Projects &amp; Versions</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Operations Dashboard */}
            <Link href="/dashboard" className="block pt-1">
              <div
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BarChart3 className={`w-4 h-4 shrink-0 ${pathname.startsWith('/dashboard') ? 'text-white' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span className="truncate">Operations Dashboard</span>}
                </div>
              </div>
            </Link>

            {/* 4. Security Audit */}
            <Link href="/audit" className="block">
              <div
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathname.startsWith('/audit')
                    ? 'bg-rose-600 text-white font-extrabold shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ShieldCheck className={`w-4 h-4 shrink-0 ${pathname.startsWith('/audit') ? 'text-white' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span className="truncate">Security Audit &amp; CIS</span>}
                </div>
              </div>
            </Link>

            {/* 5. User Guides & Playbooks */}
            <Link href="/guide" className="block">
              <div
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathname.startsWith('/guide')
                    ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Compass className={`w-4 h-4 shrink-0 ${pathname.startsWith('/guide') ? 'text-white' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span className="truncate">User Guides &amp; Playbooks</span>}
                </div>
                {isSidebarOpen && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-500 border border-sky-500/30">
                    NEW
                  </span>
                )}
              </div>
            </Link>

            {/* 6. Settings */}
            <Link href="/workspace?tab=settings" className="block">
              <div
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathname.includes('tab=settings')
                    ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Settings className={`w-4 h-4 shrink-0 ${pathname.includes('tab=settings') ? 'text-white' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span className="truncate">Settings &amp; AI Tier</span>}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Sidebar: Theme & Profile */}
        <div className={`p-3 border-t space-y-2 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800/60 bg-slate-950/40'}`}>
          <div className="flex items-center justify-between">
            <ThemeToggleBtn />
            {!isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {isSidebarOpen && (
            user ? (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition cursor-pointer ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-900' : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold flex items-center justify-center text-xs shrink-0">
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{user.name || user.email}</p>
                    <p className="text-[10px] text-sky-600 dark:text-sky-400 font-mono">{user.is_guest ? 'Guest Session' : 'Verified Enterprise'}</p>
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-sky-800' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-sky-300'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Profile</span>
              </button>
            )
          )}
        </div>
      </aside>

      {/* 2. MOBILE FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-40 p-3 rounded-2xl bg-sky-600 text-white shadow-xl shadow-sky-500/30 flex items-center justify-center cursor-pointer"
        title="Open Navigation Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* 3. MOBILE SLIDE-OUT DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-72 h-full flex flex-col justify-between border-r shadow-2xl p-4 ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#090d16] border-slate-800 text-white'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shadow-md flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs uppercase tracking-wider block">Prompt Canvas</span>
                    <span className="text-[9px] text-sky-500 font-semibold">Enterprise AI</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block"
                    >
                      <div
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                          isActive
                            ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                            : isLight
                            ? 'text-slate-700 hover:bg-slate-100'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <ThemeToggleBtn />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (user) setIsProfileModalOpen(true);
                  else setIsAuthOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{user ? user.name || user.email : 'Sign In'}</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          if (user) setUser({ ...user, ...updated });
        }}
        onLogout={async () => {
          try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            setIsProfileModalOpen(false);
          } catch {}
        }}
      />

      {/* Auth / Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          fetch('/api/auth/me')
            .then((res) => res.json())
            .then((data) => {
              if (data.authenticated && data.user) setUser(data.user);
            })
            .catch(() => {});
          setIsAuthOpen(false);
        }}
      />
    </>
  );
}
