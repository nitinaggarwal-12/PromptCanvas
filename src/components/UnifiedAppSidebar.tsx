'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
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
  Plus,
  User,
  Menu,
  X,
  Compass,
  Layers,
  Activity,
  Zap
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';

interface NavItem {
  id: string;
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const CANONICAL_NAV_ITEMS: NavItem[] = [
  { id: 'studio3', name: 'Launch Studio 3', icon: Zap, href: '/studio3', badge: 'CONTENT' },
  { id: 'studio2', name: 'Launch Studio 2', icon: Sparkles, href: '/studio2', badge: 'PRO' },
  { id: 'studio1', name: 'Launch Studio 1', icon: Compass, href: '/studio1', badge: 'LAB' },
  { id: 'studio', name: 'Launch Studio', icon: Layers, href: '/studio', badge: 'PRO' },
  { id: 'canonical', name: 'Canonical Blueprints', icon: Sparkles, href: '/canonical', badge: '50' },
  { id: 'docgen', name: 'DocGen & Specifications', icon: FileText, href: '/docgen', badge: '17' },
  { id: 'dashboard', name: 'Canonical Dashboard', icon: BarChart3, href: '/dashboard' },
  { id: 'audit', name: 'Security Audit', icon: ShieldCheck, href: '/audit' },
  { id: 'guide', name: 'User Guide & Playbooks', icon: BookOpen, href: '/guide', badge: 'NEW' },
];

const CANVAS_SUB_ITEMS: NavItem[] = [
  { id: 'design_canvas', name: 'Design Canvas', icon: Network, href: '/workspace' },
  { id: 'canvas_history', name: 'All History', icon: History, href: '/history' },
  { id: 'studio2_history', name: 'Studio 2 Canvases', icon: Sparkles, href: '/history?studio=studio2' },
  { id: 'studio1_history', name: 'Studio 1 Canvases', icon: Layers, href: '/history?studio=studio1' },
];

function UnifiedAppSidebarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const isItemActive = (href: string) => {
    const [targetPath, targetQuery] = href.split('?');
    if (targetPath !== pathname) return false;
    if (!targetQuery) {
      const hasSpecificMatch = CANONICAL_NAV_ITEMS.some((other) => {
        if (other.href === href) return false;
        const [oPath, oQuery] = other.href.split('?');
        if (oPath !== pathname || !oQuery) return false;
        const oParams = new URLSearchParams(oQuery);
        for (const [k, v] of oParams.entries()) {
          if (searchParams.get(k) === v) return true;
        }
        return false;
      });
      return !hasSpecificMatch;
    }
    const params = new URLSearchParams(targetQuery);
    for (const [k, v] of params.entries()) {
      if (searchParams.get(k) !== v) return false;
    }
    return true;
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptcanvas_sidebar_open');
        if (saved !== null) return saved === 'true';
      } catch {}
    }
    return true;
  });

  const isCanvasActive = (pathname === '/workspace' && searchParams.get('tab') !== 'audit' && searchParams.get('tab') !== 'settings') || pathname.startsWith('/history');
  const [isCanvasGroupOpen, setIsCanvasGroupOpen] = useState<boolean>(true);

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
        {/* Top Branding & Navigation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Brand Header */}
          <div className={`h-16 border-b flex items-center justify-between px-4 shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800/60'}`}>
            {isSidebarOpen ? (
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className={`w-full h-full rounded-[6px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#070a13]'}`}>
                    <Sparkles className="w-4 h-4 text-sky-500" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-extrabold tracking-wider text-xs uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>Prompt Canvas</span>
                  <span className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold tracking-wider">Enterprise AI</span>
                </div>
              </Link>
            ) : (
              <Link href="/" className="mx-auto" title="Prompt Canvas Enterprise AI">
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

          {/* Canonical Suite Navigation */}
          <div className="p-3 space-y-1">
            <div className="px-2 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase text-slate-400">
              {isSidebarOpen ? 'Canonical Suite' : '•••'}
            </div>

            {CANONICAL_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link key={item.id} href={item.href} className="block">
                  <div
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    </div>
                    {isSidebarOpen && item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-sky-500/20 text-sky-500 border border-sky-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            {/* DIVIDER: CANVAS SUITE */}
            <div className="pt-3 pb-1">
              <div className="border-t border-slate-200 dark:border-slate-800/80 my-1" />
            </div>

            {/* DEDICATED CANVAS EXPANDABLE BUTTON / GROUP */}
            <div className="space-y-1">
              <div
                onClick={() => setIsCanvasGroupOpen(!isCanvasGroupOpen)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCanvasActive
                    ? isLight
                      ? 'bg-sky-50 border border-sky-200 text-sky-900'
                      : 'bg-sky-950/40 border border-sky-800/60 text-sky-300'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
                title="Design Canvas Workspace & History"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Network className={`w-4 h-4 shrink-0 ${isCanvasActive ? 'text-sky-500' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span className="truncate font-black">Canvas</span>}
                </div>
                {isSidebarOpen && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                      EDIT
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isCanvasGroupOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Sub-Items belonging exclusively to Canvas */}
              {isSidebarOpen && isCanvasGroupOpen && (
                <div className="pl-4 space-y-1 pt-0.5 border-l-2 border-slate-200 dark:border-slate-800 ml-4 animate-in fade-in slide-in-from-top-1 duration-150">
                  {CANVAS_SUB_ITEMS.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive =
                      sub.href === '/workspace'
                        ? pathname === '/workspace' && !pathname.includes('tab=')
                        : pathname.startsWith(sub.href);

                    return (
                      <Link key={sub.id} href={sub.href} className="block">
                        <div
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isSubActive
                              ? 'bg-sky-600 text-white font-black shadow-xs'
                              : isLight
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-white' : 'text-slate-400'}`} />
                            <span className="truncate">{sub.name}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SETTINGS */}
            <div className="pt-2">
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

            {/* TEST STATUS (ALWAYS AT BOTTOM) */}
            <div className="pt-1">
              <Link href="/test-status" className="block">
                <div
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    pathname === '/test-status'
                      ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  title="Enterprise Test Status & 9-Pillars Results"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Activity className={`w-4 h-4 shrink-0 ${pathname === '/test-status' ? 'text-white' : 'text-emerald-500'}`} />
                    {isSidebarOpen && <span className="truncate">Test Status</span>}
                  </div>
                  {isSidebarOpen && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        pathname === '/test-status'
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      100%
                    </span>
                  )}
                </div>
              </Link>
            </div>
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

              <div className="py-4 space-y-1.5 overflow-y-auto max-h-[70vh]">
                <div className="px-2 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase text-slate-400">
                  Canonical Suite
                </div>

                {CANONICAL_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = isItemActive(item.href);

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

                {/* Mobile Canvas Section */}
                <div className="pt-2">
                  <div className="border-t border-slate-200 dark:border-slate-800 my-2" />
                  <div className="px-2 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase text-slate-400">
                    Canvas Suite
                  </div>
                  <div className="space-y-1 pl-1">
                    {CANVAS_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive =
                        sub.href === '/workspace'
                          ? pathname === '/workspace' && !pathname.includes('tab=')
                          : pathname.startsWith(sub.href);

                      return (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block"
                        >
                          <div
                            className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold ${
                              isSubActive
                                ? 'bg-sky-600 text-white font-bold'
                                : isLight
                                ? 'text-slate-600 hover:bg-slate-100'
                                : 'text-slate-400 hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <SubIcon className="w-3.5 h-3.5" />
                              <span>{sub.name}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Settings */}
                <div className="pt-2">
                  <Link
                    href="/workspace?tab=settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <div
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                        pathname.includes('tab=settings')
                          ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4" />
                        <span>Settings &amp; AI Tier</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Test Status */}
                <div className="pt-1">
                  <Link
                    href="/test-status"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <div
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                        pathname === '/test-status'
                          ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span>Test Status</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        100%
                      </span>
                    </div>
                  </Link>
                </div>
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

export default function UnifiedAppSidebar() {
  return (
    <React.Suspense fallback={null}>
      <UnifiedAppSidebarInner />
    </React.Suspense>
  );
}
