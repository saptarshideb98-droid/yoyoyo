import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { config, isConfiguredValue } from '../config';
import { Logo } from './Logo';
import { useAppPreferences } from '../i18n/AppPreferencesContext';

export const Footer: React.FC = () => {
  const { t } = useAppPreferences();
  const validLicences = config.licences.filter((lic) => isConfiguredValue(lic));
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#040914] border-t border-slate-200 dark:border-cyan-500/20 pt-10 pb-24 md:pb-12 text-sm text-slate-600 dark:text-slate-300 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Short Address */}
          <div className="md:col-span-5 space-y-3">
            <Logo />
            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 pt-1">
              <MapPin
                className="w-4 h-4 text-emerald-600 dark:text-cyan-400 shrink-0 mt-1"
                aria-hidden="true"
              />
              <span>{config.address}</span>
            </p>
            {validLicences.length > 0 && (
              <div className="pt-1 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                {validLicences.map((lic) => (
                  <p key={lic}>{lic}</p>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-heading text-base text-slate-900 dark:text-white">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#doctors"
                  className="hover:text-sky-600 dark:hover:text-cyan-300 hover:underline py-1 inline-block"
                >
                  {t.nav.doctors}
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="hover:text-sky-600 dark:hover:text-cyan-300 hover:underline py-1 inline-block"
                >
                  {t.nav.book}
                </a>
              </li>
              <li>
                <a
                  href="#tests"
                  className="hover:text-sky-600 dark:hover:text-cyan-300 hover:underline py-1 inline-block"
                >
                  {t.nav.tests}
                </a>
              </li>
              <li>
                <a
                  href="#pay"
                  className="hover:text-sky-600 dark:hover:text-cyan-300 hover:underline py-1 inline-block"
                >
                  {t.nav.pay}
                </a>
              </li>
              <li>
                <a
                  href="#pharmacy"
                  className="hover:text-sky-600 dark:hover:text-cyan-300 hover:underline py-1 inline-block"
                >
                  {t.pharmacy.title}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-sky-600 dark:hover:text-cyan-300 hover:underline py-1 inline-block"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-heading text-base text-slate-900 dark:text-white">
              {t.footer.contactUs}
            </h3>
            <div className="space-y-2">
              {config.phones.map((phone) => (
                <p key={phone.raw}>
                  <a
                    href={phone.tel}
                    className="inline-flex items-center gap-2 text-sky-600 dark:text-cyan-300 hover:underline font-medium tabular-nums py-0.5"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{phone.display}</span>
                  </a>
                </p>
              ))}
              {isConfiguredValue(config.email) && (
                <p>
                  <a
                    href={`mailto:${config.email}`}
                    className="inline-flex items-center gap-2 text-sky-600 dark:text-cyan-300 hover:underline break-all py-0.5"
                  >
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{config.email}</span>
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mandatory Footer Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-500 dark:text-slate-400">
          <p>{t.footer.disclaimer}</p>
          <p>
            &copy; {currentYear} {config.name}. {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};
