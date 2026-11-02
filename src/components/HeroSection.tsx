import React from 'react';
import {
  Calendar,
  FlaskConical,
  Phone,
  Stethoscope,
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { config } from '../config';
import { Doctor } from '../data/doctors';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { DimensionalCard } from './DimensionalCard';
import { MedicalHelix3D } from './MedicalHelix3D';

interface HeroSectionProps {
  allDoctors: Doctor[];
  consultingToday: Doctor[];
  onBookDoctor: (doctorId?: string) => void;
  onBookTest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  allDoctors,
  consultingToday,
  onBookDoctor,
  onBookTest,
}) => {
  const { t } = useAppPreferences();
  const primaryPhone = config.phones[0];
  const topConsultingToday = consultingToday.slice(0, 4);
  const totalDoctorsCount = allDoctors.length;
  const totalSpecialitiesCount = new Set(allDoctors.map((d) => d.category)).size;

  return (
    <div>
      {/* Section 3: Cinematic Futuristic 3D Hero */}
      <section
        aria-labelledby="hero-heading"
        className="hero-medical-pattern border-b border-slate-200 dark:border-cyan-500/20 py-10 sm:py-14 lg:py-16 transition-colors relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left column: Headline, sub-text, CTA buttons, and Live Consulting Today strip */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/60 text-sky-800 dark:text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" aria-hidden="true" />
                <span>
                  {config.name} · {config.shortAddress}
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-heading text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.12] text-slate-900 dark:text-white mb-4"
              >
                <span className="bg-gradient-to-r from-slate-900 via-sky-800 to-teal-700 dark:from-white dark:via-cyan-200 dark:to-emerald-300 bg-clip-text text-transparent">
                  {t.hero.tagline}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl mb-7 leading-relaxed">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-7">
                <a
                  href="#book"
                  onClick={() => onBookDoctor()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-base shadow-[0_8px_28px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.hero.bookAppointment}</span>
                </a>

                <a
                  href="#book"
                  onClick={() => onBookTest()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-base shadow-[0_8px_24px_rgba(14,165,233,0.28)] transition-all hover:-translate-y-0.5"
                >
                  <FlaskConical className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.hero.bookTest}</span>
                </a>

                {primaryPhone && (
                  <a
                    href={primaryPhone.tel}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-xl border border-slate-300 dark:border-cyan-500/30 bg-white/90 dark:bg-[#0B182E] hover:border-cyan-400 text-slate-900 dark:text-cyan-200 font-medium text-sm sm:text-base transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />
                    <span>{t.hero.callNow}</span>
                  </a>
                )}
              </div>

              {/* Compact Consulting Today Live Clinical HUD Card */}
              <DimensionalCard
                glowColor="emerald"
                enableTilt={false}
                className="rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-white/95 dark:bg-[#091529]/95 p-4 sm:p-5 shadow-[0_12px_32px_rgba(2,8,23,0.25)]"
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0"
                      aria-hidden="true"
                    />
                    <h2 className="font-heading text-base sm:text-lg text-slate-900 dark:text-white">
                      {t.hero.consultingToday}
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-cyan-300/80">
                    {t.hero.istLabel}
                  </span>
                </div>

                {topConsultingToday.length > 0 ? (
                  <ul className="divide-y divide-slate-200/70 dark:divide-slate-800/80 my-1">
                    {topConsultingToday.map((doc) => (
                      <li key={doc.id} className="py-2.5">
                        <button
                          type="button"
                          onClick={() => onBookDoctor(doc.id)}
                          className="w-full text-left group flex items-start justify-between gap-3 rounded-lg py-0.5 focus-visible:outline-2"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors text-sm truncate">
                              {doc.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {doc.category} · {t.hero.feeLabel}:{' '}
                              {doc.consultationFee}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                              <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                              {doc.time ? doc.time : t.hero.timeConfirm}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-4 text-sm text-slate-600 dark:text-slate-300">
                    {t.hero.noConsultingToday}
                  </p>
                )}

                <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <a
                    href="#doctors"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-600 dark:text-cyan-300 hover:underline"
                  >
                    <span>
                      {t.hero.viewAllDoctors}
                      {consultingToday.length > 4
                        ? ` (+${consultingToday.length - 4} ${t.hero.moreToday})`
                        : ''}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t.hero.timingsNote}
                  </span>
                </div>
              </DimensionalCard>
            </div>

            {/* Right column: Futuristic 3D Visual Centrepiece (DNA & Molecular Diagnostics) */}
            <div className="lg:col-span-6">
              <MedicalHelix3D />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Trust Strip (Three calm figures with 1px dividers) */}
      <section
        aria-label="Clinic overview highlights"
        className="border-b border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#071020] transition-colors"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-cyan-500/15">
            <div className="py-5 md:px-6 first:md:pl-0 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                  {totalDoctorsCount} {t.hero.doctorsCountLabel}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t.hero.doctorsCountSub}
                </p>
              </div>
            </div>

            <div className="py-5 md:px-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-cyan-500/10 border border-cyan-500/25 text-sky-700 dark:text-cyan-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                  {totalSpecialitiesCount} {t.hero.specialitiesCountLabel}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t.hero.specialitiesCountSub}
                </p>
              </div>
            </div>

            <div className="py-5 md:px-6 last:md:pr-0 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-500/25 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                  {t.hero.underOneRoofTitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t.hero.underOneRoofSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Dimensional 3D Quick Actions Grid */}
      <section
        aria-label="Quick navigation actions"
        className="py-8 sm:py-10 bg-slate-50 dark:bg-[#050B16] transition-colors"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            <DimensionalCard
              glowColor="emerald"
              className="rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] shadow-sm"
            >
              <a
                href="#book"
                onClick={() => onBookDoctor()}
                className="group p-4 sm:p-5 flex flex-col justify-between min-h-[116px] h-full focus-visible:outline-2"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Stethoscope className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="font-heading text-base sm:text-lg text-slate-900 dark:text-white">
                    {t.hero.quickBookDoctor}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </DimensionalCard>

            <DimensionalCard
              glowColor="blue"
              className="rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] shadow-sm"
            >
              <a
                href="#book"
                onClick={() => onBookTest()}
                className="group p-4 sm:p-5 flex flex-col justify-between min-h-[116px] h-full focus-visible:outline-2"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <FlaskConical className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="font-heading text-base sm:text-lg text-slate-900 dark:text-white">
                    {t.hero.quickBookTest}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </DimensionalCard>

            {config.upi.enabled && (
              <DimensionalCard
                glowColor="cyan"
                className="rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] shadow-sm"
              >
                <a
                  href="#pay"
                  className="group p-4 sm:p-5 flex flex-col justify-between min-h-[116px] h-full focus-visible:outline-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <CreditCard className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-heading text-base sm:text-lg text-slate-900 dark:text-white">
                      {t.hero.quickPayUpi}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </DimensionalCard>
            )}

            <DimensionalCard
              glowColor="blue"
              className="rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] shadow-sm"
            >
              <a
                href="#contact"
                className="group p-4 sm:p-5 flex flex-col justify-between min-h-[116px] h-full focus-visible:outline-2"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="font-heading text-base sm:text-lg text-slate-900 dark:text-white">
                    {t.hero.quickContact}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </DimensionalCard>
          </div>
        </div>
      </section>
    </div>
  );
};
