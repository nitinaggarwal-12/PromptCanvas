'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
  autoIncrement?: boolean;
}

export function VisitorCounter({
  className = '',
  autoIncrement = true,
}: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isIncrementing, setIsIncrementing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const hasIncrementedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function recordAndFetchVisit() {
      try {
        if (autoIncrement && !hasIncrementedRef.current) {
          hasIncrementedRef.current = true;
          setIsIncrementing(true);
          const res = await fetch('/api/visitors', {
            method: 'POST',
            cache: 'no-store',
          });
          const data = await res.json();
          if (isMounted && typeof data.count === 'number') {
            setCount(data.count);
          }
          setTimeout(() => {
            if (isMounted) setIsIncrementing(false);
          }, 1200);
        } else {
          const res = await fetch('/api/visitors', {
            method: 'GET',
            cache: 'no-store',
          });
          const data = await res.json();
          if (isMounted && typeof data.count === 'number') {
            setCount(data.count);
          }
        }
      } catch (err) {
        console.error('Failed to load visitor counter:', err);
        if (isMounted && count === null) {
          setCount(0);
        }
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    recordAndFetchVisit();

    // Periodic live sync every 45 seconds to keep visitor count refreshed
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/visitors', {
          method: 'GET',
          cache: 'no-store',
        });
        const data = await res.json();
        if (isMounted && typeof data.count === 'number') {
          setCount(data.count);
        }
      } catch (e) {
        // Silent catch for background sync
      }
    }, 45000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [autoIncrement]);

  return (
    <div
      id="portal-visitor-counter"
      title="Live Portal Visitors — Increments whenever someone visits PromptCanvas"
      className={`group relative inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-slate-900/85 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white text-xs font-semibold shadow-sm transition-all duration-200 cursor-default select-none shrink-0 ${className}`}
    >
      {/* Live Active Beacon */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </span>

      {/* Users Icon */}
      <Users className={`w-3.5 h-3.5 text-teal-400 transition-transform duration-300 group-hover:scale-110 ${isIncrementing ? 'animate-bounce' : ''}`} />

      {/* Visitor Count Display */}
      {isLoaded && count !== null ? (
        <div className="flex items-center gap-1.5 font-mono tracking-tight">
          <span
            className={`font-bold text-white transition-all duration-300 ${
              isIncrementing ? 'text-teal-300 scale-105' : 'text-slate-100'
            }`}
          >
            {count.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-slate-400 hidden sm:inline group-hover:text-teal-300/80 transition-colors">
            Visitors
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-12 bg-slate-800 rounded animate-pulse" />
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            Visitors
          </span>
        </div>
      )}

      {/* Increment subtle glow indicator */}
      {isIncrementing && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-90" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-300" />
        </span>
      )}
    </div>
  );
}
export default VisitorCounter;
