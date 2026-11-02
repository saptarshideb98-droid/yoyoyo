import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { config } from '../config';
import { useAppPreferences } from '../i18n/AppPreferencesContext';

interface QuickContactBarProps {
  onBookClick: () => void;
}

export const QuickContactBar: React.FC<QuickContactBarProps> = ({
  onBookClick,
}) => {
  const { t } = useAppPreferences();
  const primaryPhone = config.phones[0];
  const whatsappHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hello MAZUMDER Medical Hall, I have an enquiry.'
  )}`;

  return (
    <>
      {/* Below 768px: Fixed bottom bar with three equal buttons: Call, WhatsApp, Book */}
      <div
        role="region"
        aria-label="Quick Contact Actions"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#050B16]/95 border-t border-slate-200 dark:border-cyan-500/25 px-2 py-1.5 shadow-[0_-4px_20px_rgba(2,8,23,0.3)]"
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a
            href={primaryPhone ? primaryPhone.tel : '#contact'}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-2 rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-[#0A162C] text-sky-700 dark:text-cyan-300 font-medium text-xs sm:text-sm whitespace-nowrap"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.nav.call}</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-2 rounded-xl border border-slate-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-[#0A162C] text-emerald-700 dark:text-emerald-300 font-medium text-xs sm:text-sm whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.nav.whatsapp}</span>
          </a>

          <a
            href="#book"
            onClick={() => onBookClick()}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium text-xs sm:text-sm whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.nav.book}</span>
          </a>
        </div>
      </div>

      {/* Desktop: Floating WhatsApp button at the bottom right */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with MAZUMDER Medical Hall on WhatsApp"
          className="inline-flex items-center gap-2.5 px-4 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium text-sm shadow-[0_8px_24px_rgba(6,182,212,0.35)] border border-cyan-300/30 transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.nav.whatsappUs}</span>
        </a>
      </div>
    </>
  );
};
