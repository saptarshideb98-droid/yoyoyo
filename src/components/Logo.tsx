import React, { useId } from 'react';
import { config, isConfiguredValue } from '../config';

interface LogoProps {
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ compact = false }) => {
  const uid = useId().replace(/:/g, '');
  const ringGradId = `mmhRingGrad-${uid}`;
  const crossGradId = `mmhCrossGrad-${uid}`;

  if (isConfiguredValue(config.logoUrl)) {
    return (
      <img
        src={config.logoUrl}
        alt={config.name}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        className={compact ? 'h-9 w-auto object-contain' : 'h-11 w-auto object-contain'}
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* Illuminated 3D-inspired medical emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={compact ? 34 : 42}
          height={compact ? 34 : 42}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id={ringGradId} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id={crossGradId} x1="11" y1="11" x2="33" y2="33" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle
            cx="22"
            cy="22"
            r="20"
            className="fill-slate-100 dark:fill-[#09182E]"
            stroke={`url(#${ringGradId})`}
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r="15.5"
            stroke="#38BDF8"
            strokeWidth="1.25"
            strokeDasharray="2.5 2.5"
            strokeOpacity="0.75"
          />
          <path
            d="M19 11.5H25V19H32.5V25H25V32.5H19V25H11.5V19H19V11.5Z"
            fill={`url(#${crossGradId})`}
          />
          <rect x="19.75" y="19.75" width="4.5" height="4.5" rx="1" fill="#38BDF8" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className="font-sans font-bold tracking-[0.14em] bg-gradient-to-r from-[#0B5D3F] via-[#0284C7] to-[#0D9488] dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-300 bg-clip-text text-transparent text-sm sm:text-base">
          MAZUMDER
        </span>
        <span className="font-sans font-semibold tracking-[0.08em] text-slate-900 dark:text-slate-100 text-[11px] sm:text-xs mt-0.5">
          MEDICAL HALL
        </span>
        <span className="font-sans font-medium tracking-[0.1em] text-slate-500 dark:text-cyan-300/75 text-[8.5px] sm:text-[9px] mt-0.5">
          HAILAKANDI, ASSAM
        </span>
      </div>
    </div>
  );
};
