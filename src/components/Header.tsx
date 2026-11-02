import React, { useState } from 'react';
import {
  Phone,
  Menu,
  X,
  Calendar,
  Sun,
  Moon,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { config } from '../config';
import { LanguageCode } from '../data/tests';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { Logo } from './Logo';

interface HeaderProps {
  onBookClick: () => void;
}

const LANGUAGES: Array<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
];

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    resetPreferences,
    t,
  } = useAppPreferences();

  const primaryPhone = config.phones[0];

  const navItems = [
    { label: t.nav.doctors, href: '#doctors' },
    { label: t.nav.book, href: '#book' },
    { label: t.nav.tests, href: '#tests' },
    { label: t.nav.pay, href: '#pay' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleMobileNav = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#050B16]/95 border-b border-slate-200 dark:border-cyan-500/20 shadow-[0_4px_24px_rgba(2,8,23,0.12)] transition-colors">
      <div className="max-w-[1200px] mx-auto px-2.5 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-1.5 md:gap-5">
        {/* Left: Brand Logo */}
        <a
          href="#"
          className="inline-flex items-center shrink-0 rounded-lg focus-visible:outline-2"
          aria-label={`${config.name} Home`}
        >
          <div className="md:hidden">
            <Logo compact />
          </div>
          <div className="hidden md:block">
            <Logo />
          </div>
        </a>

        {/* Center: Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm xl:text-base font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 hover:underline underline-offset-8 decoration-2 decoration-cyan-400 transition-colors py-2 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Language Switcher, Theme Toggle, Phone & Book Button */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {/* Language Segmented Selector */}
          <div
            role="group"
            aria-label={t.nav.language}
            className="inline-flex items-center p-1 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-100/90 dark:bg-[#0A162C]"
          >
            {LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  aria-pressed={active}
                  className={`px-2.5 py-1.5 min-h-[34px] rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? `${t.nav.theme}: ${t.nav.lightMode}`
                : `${t.nav.theme}: ${t.nav.darkMode}`
            }
            title={
              theme === 'dark'
                ? `${t.nav.theme}: ${t.nav.lightMode}`
                : `${t.nav.theme}: ${t.nav.darkMode}`
            }
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[42px] rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] text-slate-800 dark:text-slate-100 hover:border-cyan-400 dark:hover:bg-[#102242] text-xs font-medium transition-colors whitespace-nowrap"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="hidden xl:inline">{t.nav.lightMode}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true" />
                <span className="hidden xl:inline">{t.nav.darkMode}</span>
              </>
            )}
          </button>

          {/* Reset to Default button when non-default language or theme is active */}
          {(language !== 'en' || theme !== 'dark') && (
            <button
              type="button"
              onClick={resetPreferences}
              title={t.nav.resetDefaults}
              aria-label={t.nav.resetDefaults}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {primaryPhone && (
            <a
              href={primaryPhone.tel}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 min-h-[42px] rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#0A162C] text-sky-700 dark:text-cyan-300 hover:border-cyan-400 font-medium text-xs transition-colors whitespace-nowrap shrink-0"
              aria-label={`Call clinic at ${primaryPhone.display}`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">{primaryPhone.display}</span>
            </a>
          )}

          <a
            href="#book"
            onClick={() => onBookClick()}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-[0_6px_20px_rgba(6,182,212,0.28)] transition-all whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.nav.bookAppointment}</span>
          </a>
        </div>

        {/* Mobile Quick Controls (Theme + Menu Button) */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          {/* Compact Language Switcher on Mobile */}
          <div
            role="group"
            aria-label={t.nav.language}
            className="inline-flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-cyan-500/25 bg-slate-100 dark:bg-[#0A162C]"
          >
            {LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  aria-pressed={active}
                  className={`px-1.5 py-1 min-h-[30px] rounded-md text-[10px] font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.nav.lightMode : t.nav.darkMode}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-cyan-500/25 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0A162C]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-dropdown"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-cyan-500/25 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#0A162C] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Width Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="md:hidden bg-white dark:bg-[#050B16] border-b border-slate-200 dark:border-cyan-500/25 px-4 pt-2 pb-5 shadow-lg"
        >
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileNav}
                className="py-3 px-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:text-cyan-500 flex items-center justify-between min-h-[44px]"
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Language & Appearance Controls inside Mobile Dropdown */}
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {t.nav.language} / {t.nav.theme}
                </span>
              </span>

              <button
                type="button"
                onClick={resetPreferences}
                className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-cyan-400 hover:underline py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.nav.resetDefaults}</span>
              </button>
            </div>

            {primaryPhone && (
              <a
                href={primaryPhone.tel}
                onClick={handleMobileNav}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-sky-50 dark:bg-[#0A162C] text-sky-700 dark:text-cyan-300 font-medium text-sm tabular-nums"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  {t.nav.call} {primaryPhone.display}
                </span>
              </a>
            )}
            <a
              href="#book"
              onClick={() => {
                handleMobileNav();
                onBookClick();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium text-sm"
            >
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.nav.bookAppointment}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
