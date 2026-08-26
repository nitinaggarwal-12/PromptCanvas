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

interface NavItem {
  id: string;
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'workspace', name: 'Design Canvas', icon: Network, href: '/workspace' },
  { id: 'canonical', name: 'Canonical Blueprints', icon: Sparkles, href: '/canonical', badge: '50' },
  { id: 'docgen', name: 'DocGen & Specifications', icon: FileText, href: '/docgen', badge: '17' },
  { id: 'history', name: 'Historical Canvases & Docs', icon: History, href: '/history' },
  { id: 'dashboard', name: 'Operations Dashboard', icon: BarChart3, href: '/dashboard' },
  { id: 'audit', name: 'Security Audit', icon: ShieldCheck, href: '/workspace?tab=audit' },
  { id: 'guide', name: 'User Guide & Playbooks', icon: BookOpen, href: '/guide', badge: 'NEW' },
  { id: 'settings', name: 'Settings & AI Tier', icon: Settings, href: '/workspace?tab=settings' },
];

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
        <div>
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

          {/* Creation Action CTA */}
          <div className={`p-3 border-b relative shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800/50'}`}>
            <Link
              href="/workspace?new=true"
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black transition-all shadow-md hover:shadow-sky-500/20 text-xs cursor-pointer ${
                !isSidebarOpen && 'p-2'
              }`}
              title="Create New Architecture with AI Prompt"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              {isSidebarOpen && <span>New Architecture</span>}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/workspace'
                  ? pathname === '/workspace' && !pathname.includes('tab=')
                  : pathname.startsWith(item.href);

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
