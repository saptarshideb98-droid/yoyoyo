import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';
import { config, isConfiguredValue } from '../config';
import { buildCommunicationLinks } from '../utils/clinicLogic';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { DimensionalCard } from './DimensionalCard';

export const ContactSection: React.FC = () => {
  const { t } = useAppPreferences();
  const [senderName, setSenderName] = useState('');
  const [messageText, setMessageText] = useState('');

  const encodedMapQuery = encodeURIComponent(config.mapQuery);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedMapQuery}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedMapQuery}&output=embed`;

  const displayHours = isConfiguredValue(config.hours)
    ? config.hours
    : t.contact.pleaseCallTimings;

  const composedMessage = (() => {
    const trimmedMsg = messageText.trim();
    const trimmedName = senderName.trim();
    if (!trimmedMsg && !trimmedName) {
      return `Hello ${config.name}, I have an enquiry.`;
    }
    if (trimmedName && trimmedMsg) {
      return `Hello ${config.name},\nName: ${trimmedName}\nMessage: ${trimmedMsg}`;
    }
    if (trimmedName) {
      return `Hello ${config.name}, my name is ${trimmedName}. I have an enquiry.`;
    }
    return trimmedMsg;
  })();

  const messageLinks = buildCommunicationLinks({
    whatsappNumber: config.whatsappNumber,
    email: config.email,
    smsNumber: config.smsNumber,
    subject: `Enquiry for ${config.name}`,
    message: composedMessage,
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-12 sm:py-16 bg-slate-100/70 dark:bg-[#071020] border-t border-slate-200 dark:border-cyan-500/20 scroll-mt-16 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <h2
            id="contact-heading"
            className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white"
          >
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Top 2-Column Split: Left Address & Phones Card | Right Lazy-Loaded Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Address card, both phone numbers as large tap-to-call buttons, email link, hours, Get Directions */}
          <DimensionalCard
            enableTilt={false}
            glowColor="cyan"
            className="lg:col-span-6 bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-7 shadow-[0_12px_32px_rgba(2,8,23,0.14)]"
          >
            <div className="flex flex-col justify-between h-full space-y-6">
              <div className="space-y-5">
                {/* Address with landmark */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-500/30 text-sky-700 dark:text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-slate-900 dark:text-white">
                      {t.contact.clinicAddress}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 mt-0.5">
                      {config.name}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                      {config.address}
                    </p>
                  </div>
                </div>

                {/* Large tap-to-call buttons for both phone numbers */}
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    {t.contact.tapToCall}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.phones.map((phone) => (
                      <a
                        key={phone.raw}
                        href={phone.tel}
                        className="inline-flex items-center justify-center gap-2.5 px-4 py-3.5 min-h-[48px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-sky-50 dark:bg-[#060E1E] hover:bg-sky-600 dark:hover:bg-cyan-500 text-sky-700 dark:text-cyan-300 hover:text-white dark:hover:text-slate-950 font-semibold text-base transition-colors tabular-nums"
                      >
                        <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{phone.display}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email & Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                  {isConfiguredValue(config.email) && (
                    <div className="flex items-start gap-3">
                      <Mail
                        className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {t.contact.emailLabel}
                        </p>
                        <a
                          href={`mailto:${config.email}`}
                          className="text-sm font-medium text-sky-600 dark:text-cyan-300 hover:underline break-all"
                        >
                          {config.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Clock
                      className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t.contact.hoursLabel}
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {displayHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-medium text-sm sm:text-base transition-all"
                >
                  <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.contact.getDirections}</span>
                </a>
              </div>
            </div>
          </DimensionalCard>

          {/* Right: Google Maps embed in a lazy-loaded iframe */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 overflow-hidden min-h-[300px] sm:min-h-[360px] shadow-[0_12px_32px_rgba(2,8,23,0.14)] flex flex-col">
            <iframe
              title={`Map showing location of ${config.name} on N.S. Road, Hailakandi`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[300px] flex-1 border-0"
            />
          </div>
        </div>

        {/* Below: Send us a message box (optional name, message textarea) with WhatsApp, SMS and Email buttons */}
        <DimensionalCard
          enableTilt={false}
          glowColor="blue"
          className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-7 shadow-[0_12px_32px_rgba(2,8,23,0.14)]"
        >
          <h3 className="font-heading text-xl text-slate-900 dark:text-white mb-1.5">
            {t.contact.sendMessageTitle}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            {t.contact.sendMessageSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
            <div className="md:col-span-4">
              <label
                htmlFor="contact-sender-name"
                className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
              >
                {t.contact.yourName}{' '}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  ({t.book.optional})
                </span>
              </label>
              <input
                id="contact-sender-name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={t.book.patientNamePlaceholder}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-8">
              <label
                htmlFor="contact-message-text"
                className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
              >
                {t.contact.messageLabel}
              </label>
              <textarea
                id="contact-message-text"
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={t.contact.messagePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={messageLinks.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm sm:text-base transition-all"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.contact.whatsappBtn}</span>
            </a>

            <a
              href={messageLinks.smsUrl}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-medium text-sm sm:text-base transition-all"
            >
              <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.contact.smsBtn}</span>
            </a>

            <a
              href={messageLinks.mailtoUrl}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-[#060E1E] hover:border-cyan-400 text-slate-900 dark:text-white font-medium text-sm sm:text-base transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.contact.emailBtn}</span>
            </a>
          </div>
        </DimensionalCard>
      </div>
    </section>
  );
};
