import React, { useState, useMemo } from 'react';
import {
  Droplet,
  FlaskConical,
  Microscope,
  Waves,
  Activity,
  Stethoscope,
  ClipboardList,
  Phone,
  MessageCircle,
  Search,
  X,
  Eye,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Square,
} from 'lucide-react';
import { config } from '../config';
import {
  diagnosticCategories,
  DiagnosticCategory,
  DiagnosticInvestigationItem,
  DiagnosticTest,
  TestIconName,
} from '../data/tests';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { DimensionalCard } from './DimensionalCard';

interface TestsSectionProps {
  tests: DiagnosticTest[];
  selectedTestIds: string[];
  selectedInvestigationNames: string[];
  onBookSpecificTest: (categoryId: string, investigationName?: string) => void;
  onToggleInvestigation: (categoryId: string, investigationName: string) => void;
  onClearSelectedInvestigations: () => void;
  onOpenAppointmentForm: () => void;
}

const renderTestIcon = (icon: TestIconName) => {
  switch (icon) {
    case 'droplet':
      return <Droplet className="w-5 h-5" aria-hidden="true" />;
    case 'beaker':
      return <FlaskConical className="w-5 h-5" aria-hidden="true" />;
    case 'microscope':
      return <Microscope className="w-5 h-5" aria-hidden="true" />;
    case 'waves':
      return <Waves className="w-5 h-5" aria-hidden="true" />;
    case 'activity':
      return <Activity className="w-5 h-5" aria-hidden="true" />;
    case 'stethoscope':
      return <Stethoscope className="w-5 h-5" aria-hidden="true" />;
    case 'clipboard-list':
    default:
      return <ClipboardList className="w-5 h-5" aria-hidden="true" />;
  }
};

export const TestsSection: React.FC<TestsSectionProps> = ({
  selectedTestIds,
  selectedInvestigationNames,
  onBookSpecificTest,
  onToggleInvestigation,
  onClearSelectedInvestigations,
  onOpenAppointmentForm,
}) => {
  const { language, t } = useAppPreferences();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<string>('all');
  const [detailModalTarget, setDetailModalTarget] = useState<{
    category: DiagnosticCategory;
    investigation?: DiagnosticInvestigationItem;
  } | null>(null);

  const primaryPhone = config.phones[0];

  const filteredCatalogue = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return diagnosticCategories
      .filter((cat) =>
        activeCategoryFilter === 'all' ? true : cat.id === activeCategoryFilter
      )
      .map((cat) => {
        if (!q) {
          return {
            category: cat,
            matchingInvestigations: cat.investigations,
          };
        }

        const catMatches =
          cat.title.en.toLowerCase().includes(q) ||
          cat.title.hi.toLowerCase().includes(q) ||
          cat.title.bn.toLowerCase().includes(q) ||
          cat.description.en.toLowerCase().includes(q) ||
          cat.description.hi.toLowerCase().includes(q) ||
          cat.description.bn.toLowerCase().includes(q);

        const matchingInvestigations = cat.investigations.filter(
          (inv) =>
            inv.name.en.toLowerCase().includes(q) ||
            inv.name.hi.toLowerCase().includes(q) ||
            inv.name.bn.toLowerCase().includes(q) ||
            inv.summary.en.toLowerCase().includes(q) ||
            inv.summary.hi.toLowerCase().includes(q) ||
            inv.summary.bn.toLowerCase().includes(q)
        );

        return {
          category: cat,
          matchingInvestigations:
            catMatches && matchingInvestigations.length === 0
              ? cat.investigations
              : matchingInvestigations,
          isMatch: catMatches || matchingInvestigations.length > 0,
        };
      })
      .filter((item) => ('isMatch' in item ? item.isMatch : true));
  }, [searchQuery, activeCategoryFilter]);

  const buildWhatsappEnquiryLink = (testTitle: string) =>
    `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
      `Hello ${config.name}, I would like to enquire about / check availability for: ${testTitle}`
    )}`;

  return (
    <section
      id="tests"
      aria-labelledby="tests-heading"
      className="py-12 sm:py-16 bg-slate-100/80 dark:bg-[#071020] border-y border-slate-200 dark:border-cyan-500/20 scroll-mt-16 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header + Prominent Book an Appointment Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              id="tests-heading"
              className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white"
            >
              {t.tests.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5 max-w-2xl">
              {t.tests.subtitle}
            </p>
          </div>

          <a
            href="#book"
            onClick={() => onOpenAppointmentForm()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium text-sm sm:text-base shadow-[0_8px_24px_rgba(6,182,212,0.28)] transition-all shrink-0 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.tests.bookAnAppointment}</span>
          </a>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-4 sm:p-5 mb-8 shadow-[0_12px_32px_rgba(2,8,23,0.14)] space-y-4">
          <div className="relative">
            <label htmlFor="diagnostic-test-search" className="sr-only">
              {t.tests.searchPlaceholder}
            </label>
            <Search
              className="w-4 h-4 text-slate-400 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="diagnostic-test-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.tests.searchPlaceholder}
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear test search"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div
            role="group"
            aria-label="Filter diagnostic categories"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1"
          >
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              aria-pressed={activeCategoryFilter === 'all'}
              className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 border ${
                activeCategoryFilter === 'all'
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white border-cyan-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#060E1E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400'
              }`}
            >
              {t.tests.allCategories}
            </button>

            {diagnosticCategories.map((cat) => {
              const active = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  aria-pressed={active}
                  className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 border ${
                    active
                      ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white border-cyan-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#060E1E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400'
                  }`}
                >
                  {cat.shortTitle[language]}
                </button>
              );
            })}
          </div>

          {/* Multi-test selection summary bar when visitor selects multiple tests */}
          {selectedInvestigationNames.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="tabular-nums">
                    {selectedInvestigationNames.length}
                  </strong>{' '}
                  {t.tests.selectedTestsBar}:{' '}
                  <span className="text-slate-700 dark:text-slate-300 font-normal">
                    {selectedInvestigationNames.join(', ')}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClearSelectedInvestigations}
                  className="px-3 py-1.5 min-h-[38px] rounded-xl border border-slate-200 dark:border-cyan-500/25 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#102242]"
                >
                  {t.tests.clearSelection}
                </button>
                <a
                  href="#book"
                  onClick={() => onOpenAppointmentForm()}
                  className="px-4 py-2 min-h-[38px] inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-xs sm:text-sm font-medium"
                >
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.tests.proceedToEnquiry}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Catalogue Categories & Individual Investigations (No prices anywhere) */}
        <div className="space-y-8 mb-8">
          {filteredCatalogue.map(({ category, matchingInvestigations }) => {
            const isCategorySelected = selectedTestIds.includes(category.id);

            return (
              <DimensionalCard
                as="article"
                key={category.id}
                enableTilt={false}
                glowColor="cyan"
                className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-7 shadow-[0_12px_32px_rgba(2,8,23,0.14)]"
              >
                {/* Category Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 mb-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-sky-500/15 border border-cyan-500/30 text-sky-700 dark:text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                      {renderTestIcon(category.icon)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-xl sm:text-2xl text-slate-900 dark:text-white">
                          {category.title[language]}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 dark:text-cyan-300/80">
                          · {category.investigations.length}{' '}
                          {t.tests.investigationsCount}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {category.description[language]}
                      </p>
                    </div>
                  </div>

                  {/* Category-Level Functional Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setDetailModalTarget({ category })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-[#060E1E] hover:border-cyan-400 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      <Eye className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />
                      <span>{t.tests.viewDetails}</span>
                    </button>

                    <a
                      href="#book"
                      onClick={() => onBookSpecificTest(category.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[42px] rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs sm:text-sm font-medium transition-all whitespace-nowrap"
                    >
                      <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t.tests.bookThisTest}</span>
                    </a>

                    <a
                      href={buildWhatsappEnquiryLink(category.shortTitle.en)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-medium transition-all whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t.tests.enquireWhatsapp}</span>
                    </a>

                    {primaryPhone && (
                      <a
                        href={primaryPhone.tel}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-sky-50 dark:bg-[#060E1E] text-sky-700 dark:text-cyan-300 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{t.tests.callNow}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Individual Investigations Grid inside Category */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-cyan-300/80 mb-3">
                    {t.tests.availableInvestigations}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {matchingInvestigations.map((inv) => {
                      const isSelected = selectedInvestigationNames.includes(
                        inv.name.en
                      );

                      return (
                        <div
                          key={inv.id}
                          className={`rounded-xl border p-4 flex flex-col justify-between gap-3 transition-all ${
                            isSelected || isCategorySelected
                              ? 'border-cyan-500 bg-sky-50/70 dark:bg-[#0E2140] shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                              : 'border-slate-200 dark:border-cyan-500/20 bg-slate-50/70 dark:bg-[#060E1E] hover:border-cyan-400/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="min-w-0">
                              <h4 className="font-heading text-base text-slate-900 dark:text-white leading-snug">
                                {inv.name[language]}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                                {inv.summary[language]}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                onToggleInvestigation(category.id, inv.name.en)
                              }
                              aria-pressed={isSelected}
                              title={
                                isSelected
                                  ? t.tests.selectedForEnquiry
                                  : t.tests.selectForEnquiry
                              }
                              aria-label={`${t.tests.selectForEnquiry}: ${inv.name[language]}`}
                              className="p-1.5 rounded-lg text-sky-600 dark:text-cyan-400 hover:bg-white dark:hover:bg-[#0A162C] shrink-0"
                            >
                              {isSelected ? (
                                <CheckSquare
                                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Square
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          </div>

                          {/* Investigation-level working buttons: View Details, Book This Test, Check Availability, Enquire on WhatsApp, Call Now */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-slate-200 dark:border-slate-800">
                            <button
                              type="button"
                              onClick={() =>
                                setDetailModalTarget({
                                  category,
                                  investigation: inv,
                                })
                              }
                              className="px-2.5 py-1.5 min-h-[34px] rounded-lg border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0A162C] text-slate-800 dark:text-slate-200 hover:border-cyan-400 text-[11px] sm:text-xs font-medium transition-colors"
                            >
                              {t.tests.viewDetails}
                            </button>

                            <a
                              href="#book"
                              onClick={() =>
                                onBookSpecificTest(category.id, inv.name.en)
                              }
                              className="px-2.5 py-1.5 min-h-[34px] inline-flex items-center rounded-lg bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-[11px] sm:text-xs font-medium transition-all"
                            >
                              {t.tests.bookThisTest}
                            </a>

                            <a
                              href={buildWhatsappEnquiryLink(inv.name.en)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 min-h-[34px] inline-flex items-center rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white text-[11px] sm:text-xs font-medium transition-colors"
                            >
                              {t.tests.checkAvailability}
                            </a>

                            <a
                              href={buildWhatsappEnquiryLink(inv.name.en)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 min-h-[34px] inline-flex items-center rounded-lg border border-emerald-500/25 bg-white dark:bg-[#0A162C] text-emerald-700 dark:text-emerald-300 hover:border-emerald-400 text-[11px] sm:text-xs font-medium transition-colors"
                            >
                              {t.tests.enquireWhatsapp}
                            </a>

                            {primaryPhone && (
                              <a
                                href={primaryPhone.tel}
                                className="px-2.5 py-1.5 min-h-[34px] inline-flex items-center rounded-lg border border-sky-500/25 bg-white dark:bg-[#0A162C] text-sky-700 dark:text-cyan-300 hover:border-cyan-400 text-[11px] sm:text-xs font-medium transition-colors"
                              >
                                {t.tests.callNow}
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DimensionalCard>
            );
          })}
        </div>

        {/* Footer callout below catalogue */}
        <div className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
            {t.tests.needDifferentTest}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {primaryPhone && (
              <a
                href={primaryPhone.tel}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-[#060E1E] text-sky-700 dark:text-cyan-300 text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{primaryPhone.display}</span>
              </a>
            )}
            <a
              href={buildWhatsappEnquiryLink('Diagnostic Investigation')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.nav.whatsappUs}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Accessible View Details Modal */}
      {detailModalTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="test-detail-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/75 flex items-center justify-center p-4"
          onClick={() => setDetailModalTarget(null)}
        >
          <div
            className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/30 max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold text-sky-600 dark:text-cyan-400">
                  {detailModalTarget.category.shortTitle[language]}
                </p>
                <h3
                  id="test-detail-modal-title"
                  className="font-heading text-xl text-slate-900 dark:text-white mt-0.5"
                >
                  {detailModalTarget.investigation
                    ? detailModalTarget.investigation.name[language]
                    : detailModalTarget.category.title[language]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalTarget(null)}
                aria-label={t.tests.modalClose}
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-cyan-500/30 inline-flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p>
                {detailModalTarget.investigation
                  ? detailModalTarget.investigation.summary[language]
                  : detailModalTarget.category.details[language]}
              </p>

              <div className="bg-slate-50 dark:bg-[#060E1E] rounded-xl p-4 border border-slate-200 dark:border-cyan-500/20">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                  {t.tests.modalPreparationTitle}
                </p>
                <p className="text-xs sm:text-sm">
                  {detailModalTarget.investigation
                    ? detailModalTarget.investigation.preparation[language]
                    : detailModalTarget.category.preparationNote[language]}
                </p>
              </div>

              {!detailModalTarget.investigation && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {t.tests.modalIncludedTitle}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    {detailModalTarget.category.investigations.map((inv) => (
                      <li key={inv.id} className="flex items-start gap-1.5">
                        <span className="text-cyan-500">•</span>
                        <span>{inv.name[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#book"
                  onClick={() => {
                    onBookSpecificTest(
                      detailModalTarget.category.id,
                      detailModalTarget.investigation?.name.en
                    );
                    setDetailModalTarget(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-xs sm:text-sm font-medium"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{t.tests.bookThisTest}</span>
                </a>

                <a
                  href={buildWhatsappEnquiryLink(
                    detailModalTarget.investigation
                      ? detailModalTarget.investigation.name.en
                      : detailModalTarget.category.shortTitle.en
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{t.tests.enquireWhatsapp}</span>
                </a>

                {primaryPhone && (
                  <a
                    href={primaryPhone.tel}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-xl border border-slate-200 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-300 text-xs sm:text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>{t.tests.callNow}</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setDetailModalTarget(null)}
                className="px-3.5 py-2 min-h-[40px] rounded-xl border border-slate-200 dark:border-cyan-500/30 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                {t.tests.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
