import React from 'react';
import {
  Pill,
  MessageCircle,
  Phone,
  CheckCircle2,
  HeartHandshake,
  ShieldPlus,
  Microscope,
} from 'lucide-react';
import { config } from '../config';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { DimensionalCard } from './DimensionalCard';

export const PharmacyAndCommitment: React.FC = () => {
  const { t } = useAppPreferences();
  const primaryPhone = config.phones[0];
  const pharmacyWhatsappHref = `https://wa.me/${
    config.whatsappNumber
  }?text=${encodeURIComponent(
    'Hello, I would like to check availability of these medicines:'
  )}`;

  const commitments = [
    {
      label: t.commitment.accurateDiagnosis,
      icon: Microscope,
    },
    {
      label: t.commitment.personalizedCare,
      icon: HeartHandshake,
    },
    {
      label: t.commitment.betterHealth,
      icon: ShieldPlus,
    },
    {
      label: t.commitment.advancedTechnology,
      icon: CheckCircle2,
    },
  ];

  return (
    <>
      {/* Section 10: Pharmacy */}
      <section
        id="pharmacy"
        aria-labelledby="pharmacy-heading"
        className="py-12 sm:py-16 bg-slate-100/70 dark:bg-[#071020] border-t border-slate-200 dark:border-cyan-500/20 transition-colors"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <DimensionalCard
            enableTilt={false}
            glowColor="emerald"
            className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-6 sm:p-8 lg:p-10 shadow-[0_12px_32px_rgba(2,8,23,0.14)]"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Pill className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="pharmacy-heading"
                    className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2"
                  >
                    {t.pharmacy.title}
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t.pharmacy.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto">
                <a
                  href={pharmacyWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm sm:text-base transition-all whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.pharmacy.sendOnWhatsapp}</span>
                </a>

                {primaryPhone && (
                  <a
                    href={primaryPhone.tel}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-medium text-sm sm:text-base transition-all whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t.pharmacy.call}</span>
                  </a>
                )}
              </div>
            </div>
          </DimensionalCard>
        </div>
      </section>

      {/* Section 11: Our Commitment */}
      <section
        aria-labelledby="commitment-heading"
        className="py-12 sm:py-16 bg-white dark:bg-[#050B16] border-t border-slate-200 dark:border-cyan-500/20 transition-colors"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2
              id="commitment-heading"
              className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white"
            >
              {t.commitment.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {commitments.map((item) => {
              const IconComponent = item.icon;
              return (
                <DimensionalCard
                  key={item.label}
                  glowColor="cyan"
                  className="rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#0A162C] p-6"
                >
                  <div className="flex flex-col items-center text-center justify-center min-h-[120px]">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#060E1E] border border-cyan-500/30 text-sky-600 dark:text-cyan-300 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <p className="font-heading text-lg text-slate-900 dark:text-white">
                      {item.label}
                    </p>
                  </div>
                </DimensionalCard>
              );
            })}
          </div>

          <p className="text-center font-heading text-xl sm:text-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-300 dark:via-cyan-300 dark:to-sky-300 bg-clip-text text-transparent">
            {t.commitment.closingLine}
          </p>
        </div>
      </section>
    </>
  );
};
