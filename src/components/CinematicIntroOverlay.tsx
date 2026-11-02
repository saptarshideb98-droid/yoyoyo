import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { config } from '../config';

export const CinematicIntroOverlay: React.FC = () => {
  const [phase, setPhase] = useState<'entering' | 'exiting' | 'hidden'>(() => {
    if (typeof window === 'undefined') return 'hidden';
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;
    if (prefersReduced) return 'hidden';
    try {
      if (sessionStorage.getItem('mmh_intro_seen') === '1') {
        return 'hidden';
      }
    } catch {
      // ignore storage errors
    }
    return 'entering';
  });

  useEffect(() => {
    if (phase === 'hidden') return;
    try {
      sessionStorage.setItem('mmh_intro_seen', '1');
    } catch {
      // ignore
    }
    const exitTimer = window.setTimeout(() => {
      setPhase('exiting');
    }, 950);
    const hideTimer = window.setTimeout(() => {
      setPhase('hidden');
    }, 1400);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [phase]);

  if (phase === 'hidden') return null;

  const dismissNow = () => {
    setPhase('hidden');
  };

  return (
    <div
      role="dialog"
      aria-label={`${config.name} Digital Experience`}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040914] text-white px-4 transition-opacity duration-450 ${
        phase === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient radial cyan/blue backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(6, 182, 212, 0.22) 0%, rgba(15, 102, 179, 0.12) 38%, rgba(4, 9, 20, 0.98) 75%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        {/* 3D Dimensional Emblem Reveal */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-cyan-400/35 animate-spin"
            style={{ animationDuration: '9s' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-2 rounded-full border border-sky-400/25"
          />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/25 via-sky-500/20 to-emerald-500/25 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.35)]">
            <svg
              width="36"
              height="36"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="22"
                cy="22"
                r="19"
                stroke="#38BDF8"
                strokeWidth="1.75"
                strokeDasharray="3 3"
              />
              <path
                d="M19 11.5H25V19H32.5V25H25V32.5H19V25H11.5V19H19V11.5Z"
                fill="#10B981"
              />
              <rect
                x="19.5"
                y="19.5"
                width="5"
                height="5"
                rx="1"
                fill="#38BDF8"
              />
            </svg>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/50 text-cyan-300 text-xs font-medium tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Precision Healthcare &amp; Diagnostics</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-wide text-white">
          {config.name}
        </h2>
        <p className="text-xs sm:text-sm text-cyan-200/80 tracking-[0.16em] uppercase mt-1.5">
          {config.shortAddress}
        </p>

        <button
          type="button"
          onClick={dismissNow}
          className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/35 bg-slate-900/80 hover:bg-slate-800 text-cyan-200 text-xs font-medium transition-colors"
        >
          <span>Enter Experience</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
