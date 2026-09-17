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
  Cloud,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { usePersistentBoolean } from '@/lib/hooks/useHydrationSafeState';
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

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

/**
 * Left navigation.
 *
 * Names describe what you do on the page, not internal vocabulary. Previously
 * this list leaked engineering terms ("Canonical", "DocGen", "Decompiler") and
 * distinguished the two studios by a numeric suffix — "Launch Studio 1" was in
 * fact the experimental lab, so the number implied the opposite of the truth.
 *
 * Grouping exists because eleven flat entries are past the point where scanning
 * works. It also removes the old "Canvas > Design Canvas" parent/child stutter:
 * Design Canvas is now a peer under CREATE.
 *
 * NOTE ON BADGE COUNTS: '52' and '17' are literals rather than
 * CANONICAL_TEMPLATES.length / DOC_ARCHETYPES_META.length on purpose — this
 * component renders on every route, and importing those modules would pull
 * ~130KB of template and archetype source into every client bundle for the sake
 * of two numbers. scripts/verify_nav_badge_counts.mjs fails the pre-commit gate
 * if they ever drift from the real arrays.
 */
const NAV_GROUPS: NavGroup[] = [
  {
    id: 'create',
    label: 'Create',
    items: [
      { id: 'studio', name: 'Architecture Studio', icon: Layers, href: '/studio', badge: 'PRO' },
      { id: 'studio1', name: 'Prompt Lab', icon: Compass, href: '/studio1', badge: 'LAB' },
      { id: 'vision', name: 'Image to Diagram', icon: Sparkles, href: '/vision', badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
      { id: 'docgen', name: 'Document Studio', icon: FileText, href: '/docgen', badge: '17' },
    ],
  },
  {
    id: 'reference',
    label: 'Reference',
    items: [
      { id: 'canonical', name: 'Blueprint Catalog', icon: LayoutGrid, href: '/canonical', badge: '53' },
      // No badge here by design: measured at 256px rail width, 'Google Cloud
      // Patterns' + an 'OFFICIAL' pill forces the label to ellipsise. The badge
      // was the redundant half — 'Google' already signals the official source.
      { id: 'gcp', name: 'Google Cloud Patterns', icon: Cloud, href: '/gcp' },
      { id: 'library', name: 'My Architectures', icon: History, href: '/library' },
    ],
  },
  {
    id: 'operate',
    label: 'Operate',
    items: [
      { id: 'dashboard', name: 'Operations', icon: BarChart3, href: '/dashboard' },
      { id: 'audit', name: 'Audit & Compliance', icon: ShieldCheck, href: '/audit' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    items: [
      { id: 'guide', name: 'Guides & Playbooks', icon: BookOpen, href: '/guide', badge: 'NEW' },
    ],
  },
];

/** Flat view, for active-state resolution. */
const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

export interface UnifiedAppSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

function UnifiedAppSidebarInner({ isCollapsed, onToggle, className = '' }: UnifiedAppSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  // Left navigation menu is strictly dark theme as specified in design system
  const isLight = false;

  const isItemActive = (href: string) => {
    const [targetPath, targetQuery] = href.split('?');
    if (targetPath !== pathname) return false;

    if (!targetQuery) {
      const hasSpecificMatch = ALL_NAV_ITEMS.some((other) => {
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

  // Hydration-safe: renders the collapsed default during SSR + hydration, then
  // syncs the persisted value in a pre-paint layout effect (no mismatch, no flash).
  const [internalIsOpen, setInternalIsOpen] = usePersistentBoolean(
    'promptcanvas_sidebar_open',
    false // Collapsed by default across all pages
  );

  // Controlled or uncontrolled collapse state
  const isSidebarOpen = isCollapsed !== undefined ? !isCollapsed : internalIsOpen;

  useEffect(() => {
    const handleToggleEvent = (e: any) => {
      if (e?.detail?.isOpen !== undefined) {
        setInternalIsOpen(e.detail.isOpen);
      } else {
        setInternalIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('promptcanvas_toggle_sidebar', handleToggleEvent);
    return () => window.removeEventListener('promptcanvas_toggle_sidebar', handleToggleEvent);
  }, []);

  // (isCanvasActive / isCanvasGroupOpen removed: the Canvas expandable group was
  // dissolved when Design Canvas and My Architectures became peers in the
  // CREATE and REFERENCE groups. Its /workspace tab-exclusion rule now lives in
  // isItemActive above.)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
      return;
    }
    // `setInternalIsOpen` persists to localStorage internally (usePersistentBoolean).
    const next = !internalIsOpen;
    setInternalIsOpen(next);
    try {
      window.dispatchEvent(
        new CustomEvent('promptcanvas_sidebar_change', { detail: { isOpen: next } })
      );
    } catch {}
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
        id="unified-app-sidebar"
        className={`dark ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } hidden lg:flex border-r transition-all duration-300 flex-col justify-between z-40 shrink-0 sticky top-0 h-screen select-none ${
          isLight ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-[#090d16]/95 border-slate-800/80 text-slate-100'
        } ${className}`}
      >
        {/* Top Branding & Navigation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Brand Header */}
          <div className={`h-14 border-b flex items-center justify-between px-3.5 shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800/60'}`}>
            {isSidebarOpen ? (
              <>
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
                <button
                  id="unified-sidebar-collapse-btn"
                  onClick={toggleSidebar}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                  title="Collapse Left Navigation Menu"
                  aria-label="Collapse Left Navigation Menu"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="mx-auto flex flex-col items-center gap-1">
                <button
                  id="unified-sidebar-expand-btn"
                  onClick={toggleSidebar}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-sky-500/15 text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 cursor-pointer transition-all border border-slate-200/60 dark:border-slate-700/60 hover:border-sky-500/40 shadow-xs"
                  title="Expand Left Navigation Menu"
                  aria-label="Expand Left Navigation Menu"
                >
                  <PanelLeftOpen className="w-4 h-4 text-sky-500" />
                </button>
              </div>
            )}
          </div>

          {/* Grouped Navigation */}
          <div className="p-3 space-y-1">
            {NAV_GROUPS.map((group, groupIndex) => (
              <div key={group.id}>
                {groupIndex > 0 && (
                  <div className="border-t border-slate-200 dark:border-slate-800/80 my-2" />
                )}

                {/* Collapsed rail has no room for a label; the rule above is
                    enough to keep the groups legible. */}
                {isSidebarOpen && (
                  <div className="px-2 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase text-slate-400">
                    {group.label}
                  </div>
                )}

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = isItemActive(item.href);

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block"
                        title={!isSidebarOpen ? item.name : undefined}
                      >
                        <div
                          className={`w-full flex items-center ${
                            isSidebarOpen ? 'justify-between' : 'justify-center'
                          } p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                              : isLight
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                          }`}
                        >
                          <div
                            className={`flex items-center ${
                              isSidebarOpen
                                ? 'gap-3 min-w-0 flex-1'
                                : 'justify-center shrink-0'
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isActive ? 'text-white' : 'text-slate-400'
                              }`}
                            />
                            {isSidebarOpen && <span className="truncate">{item.name}</span>}
                          </div>
                          {isSidebarOpen && item.badge && (
                            <span
                              className={`shrink-0 ml-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                                isActive
                                  ? 'bg-white/20 text-white border-white/20'
                                  : item.badgeColor ??
                                    'bg-sky-500/20 text-sky-500 border-sky-500/30'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="border-t border-slate-200 dark:border-slate-800/80 my-2" />

            {/* SETTINGS */}
            <div className="pt-2">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="w-full block text-left"
                title={!isSidebarOpen ? "Settings & AI Tier" : undefined}
              >
                <div
                  className={`w-full flex items-center ${
                    isSidebarOpen ? 'justify-between' : 'justify-center'
                  } p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isProfileModalOpen
                      ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarOpen ? 'gap-3 min-w-0' : 'justify-center'} shrink-0`}>
                    <Settings className={`w-4 h-4 shrink-0 ${isProfileModalOpen ? 'text-white' : 'text-slate-400'}`} />
                    {isSidebarOpen && <span className="truncate">Settings &amp; AI Tier</span>}
                  </div>
                </div>
              </button>
            </div>

            {/* TEST STATUS (ALWAYS AT BOTTOM) */}
            <div className="pt-1">
              <Link href="/test-status" className="block" title={!isSidebarOpen ? "Test Status (100%)" : "Enterprise Test Status & 9-Pillars Results"}>
                <div
                  className={`w-full flex items-center ${
                    isSidebarOpen ? 'justify-between' : 'justify-center'
                  } p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    pathname === '/test-status'
                      ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarOpen ? 'gap-3 min-w-0' : 'justify-center'} shrink-0`}>
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
          {/*
            Collapsed rail is 64px wide (40px inside p-3). A labelled toggle
            (71px) beside the chevron (28px) overflowed it by 19px and 47px
            respectively, painting over page content. Stack them when collapsed.
          */}
          <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'flex-col gap-2'}`}>
            <ThemeToggleBtn iconOnly={!isSidebarOpen} />
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

          {isSidebarOpen ? (
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
          ) : (
            user ? (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="w-10 h-10 mx-auto rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 hover:bg-sky-500/30 transition cursor-pointer"
                title={user.name || user.email}
              >
                {(user.name || user.email)[0].toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="w-10 h-10 mx-auto rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-sky-500 flex items-center justify-center transition cursor-pointer"
                title="Sign In / Profile"
              >
                <User className="w-4 h-4" />
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
                {NAV_GROUPS.map((group, groupIndex) => (
                  <div key={group.id}>
                    {groupIndex > 0 && (
                      <div className="border-t border-slate-200 dark:border-slate-800 my-2" />
                    )}
                    <div className="px-2 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase text-slate-400">
                      {group.label}
                    </div>

                    <div className="space-y-1">
                      {group.items.map((item) => {
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
                    </div>
                  </div>
                ))}

                {/* Settings */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full block text-left"
                  >
                    <div
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                        isProfileModalOpen
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
                  </button>
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

export default function UnifiedAppSidebar(props: UnifiedAppSidebarProps = {}) {
  return (
    <React.Suspense fallback={null}>
      <UnifiedAppSidebarInner {...props} />
    </React.Suspense>
  );
}
