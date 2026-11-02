import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  Phone,
  X,
  ChevronDown,
  ChevronUp,
  IndianRupee,
} from 'lucide-react';
import { config } from '../config';
import {
  Doctor,
  DOCTOR_CATEGORIES,
  WeekdayCode,
} from '../data/doctors';
import {
  filterDoctors,
  getDoctorInitials,
  isDoctorAvailableOnDay,
} from '../utils/clinicLogic';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { DimensionalCard } from './DimensionalCard';

interface DoctorsSectionProps {
  doctors: Doctor[];
  todayCode: WeekdayCode;
  nthWeekdayOfMonth: number;
  onSelectDoctorForBooking: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  doctors,
  todayCode,
  nthWeekdayOfMonth,
  onSelectDoctorForBooking,
}) => {
  const { t } = useAppPreferences();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );

  const primaryPhone = config.phones[0];

  const filteredDoctors = useMemo(
    () =>
      filterDoctors(doctors, {
        query: searchQuery,
        category: selectedCategory,
        availableTodayOnly,
        todayCode,
        nthWeekdayOfMonth,
      }),
    [
      doctors,
      searchQuery,
      selectedCategory,
      availableTodayOnly,
      todayCode,
      nthWeekdayOfMonth,
    ]
  );

  const toggleExpandCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setAvailableTodayOnly(false);
  };

  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="py-12 sm:py-16 bg-slate-100/70 dark:bg-[#071020] border-y border-slate-200 dark:border-cyan-500/20 scroll-mt-16 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              id="doctors-heading"
              className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white"
            >
              {t.doctors.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5">
              {t.doctors.subtitle}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-cyan-300/80">
            {t.doctors.showing}{' '}
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {filteredDoctors.length}
            </span>{' '}
            {t.doctors.of}{' '}
            <span className="tabular-nums">{doctors.length}</span>{' '}
            {t.doctors.specialists}
          </p>
        </div>

        {/* Filter Controls: Search Box + Available Today Toggle + Category Chips */}
        <div className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-4 sm:p-5 mb-8 shadow-[0_12px_32px_rgba(2,8,23,0.12)]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
            {/* Search input */}
            <div className="relative flex-1">
              <label htmlFor="doctor-search" className="sr-only">
                {t.doctors.searchPlaceholder}
              </label>
              <Search
                className="w-4 h-4 text-slate-400 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="doctor-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.doctors.searchPlaceholder}
                className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Available Today Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={availableTodayOnly}
              onClick={() => setAvailableTodayOnly((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-2.5 px-4 py-2.5 min-h-[44px] rounded-xl border font-medium text-sm transition-all shrink-0 ${
                availableTodayOnly
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-[#060E1E] border-slate-200 dark:border-cyan-500/25 text-slate-700 dark:text-slate-200 hover:border-cyan-400'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  availableTodayOnly
                    ? 'bg-white'
                    : 'bg-emerald-500 dark:bg-emerald-400'
                }`}
                aria-hidden="true"
              />
              <span>{t.doctors.availableToday}</span>
            </button>
          </div>

          {/* Horizontal Scrollable Speciality Filter Chips */}
          <div
            role="group"
            aria-label="Filter doctors by speciality"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {(['All', ...DOCTOR_CATEGORIES] as const).map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#060E1E] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#102242] border border-transparent dark:border-cyan-500/20'
                  }`}
                >
                  {category === 'All' ? t.doctors.allFilter : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-8 sm:p-12 text-center">
            <p className="font-heading text-xl text-slate-900 dark:text-white mb-2">
              {t.doctors.noMatchTitle}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
              {t.doctors.noMatchSub}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-medium text-sm transition-colors"
            >
              {t.doctors.showAllDoctors}
            </button>
          </div>
        ) : (
          /* Doctor Cards Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredDoctors.map((doc) => {
              const isExpanded = Boolean(expandedCards[doc.id]);
              const isToday = isDoctorAvailableOnDay(
                doc,
                todayCode,
                nthWeekdayOfMonth
              );
              const initials = getDoctorInitials(doc.name);
              const expertiseList = doc.expertise ?? [];
              const conditionsList = doc.conditions ?? [];

              const visibleSpecialities = isExpanded
                ? expertiseList
                : expertiseList.slice(0, 3);
              const hiddenSpecialitiesCount = Math.max(
                0,
                expertiseList.length - 3
              );

              const hasExtraDetails =
                expertiseList.length > 3 ||
                conditionsList.length > 0 ||
                Boolean(doc.titleBengali);

              return (
                <DimensionalCard
                  as="article"
                  key={doc.id}
                  glowColor="cyan"
                  className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_28px_rgba(2,8,23,0.12)]"
                >
                  <div>
                    {/* Top Row: Speciality Pill + Consultation Fee Badge + Initials Avatar */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-500/15 border border-sky-500/25 text-sky-700 dark:text-sky-300 font-semibold text-xs">
                          {doc.category}
                        </span>
                        <span
                          aria-label={`${t.doctors.consultationFee}: ${doc.consultationFee}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold text-xs tabular-nums"
                        >
                          <IndianRupee
                            className="w-3 h-3 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {t.doctors.feePrefix}: {doc.consultationFee}
                          </span>
                        </span>
                        {isToday && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-400/30 font-medium text-xs">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"
                              aria-hidden="true"
                            />
                            {t.doctors.availableToday}
                          </span>
                        )}
                      </div>

                      <div
                        aria-hidden="true"
                        className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500/15 to-emerald-500/15 border border-cyan-500/30 text-sky-800 dark:text-cyan-300 font-heading font-semibold text-sm flex items-center justify-center shrink-0"
                      >
                        {initials}
                      </div>
                    </div>

                    {/* Doctor Name */}
                    <h3 className="font-heading text-xl text-slate-900 dark:text-white leading-snug">
                      {doc.name}
                    </h3>

                    {/* Title & Qualifications */}
                    <p className="text-xs sm:text-sm font-medium text-sky-700 dark:text-cyan-300 mt-0.5">
                      {doc.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {doc.qualifications}
                    </p>

                    {/* Institution & Designation */}
                    {(doc.designation || doc.institution || doc.regNo) && (
                      <div className="mt-1.5 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {doc.designation && <p>{doc.designation}</p>}
                        {doc.institution && <p>{doc.institution}</p>}
                        {doc.regNo && <p>{doc.regNo}</p>}
                      </div>
                    )}

                    {/* Consultation Days, Timing & Fee Box */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#060E1E] border border-slate-200 dark:border-cyan-500/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                        <Calendar
                          className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{doc.daysLabel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Clock
                          className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {doc.time ? doc.time : t.doctors.timePleaseCall}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-slate-800 text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {t.doctors.consultationFee}
                        </span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-300 tabular-nums">
                          {doc.consultationFee}
                        </span>
                      </div>
                    </div>

                    {/* Expertise list */}
                    {expertiseList.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                          {t.doctors.areasOfExpertise}
                        </p>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {visibleSpecialities.map((spec) => (
                            <li key={spec} className="flex items-start gap-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Expandable Conditions & Bengali Note */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-fade-rise">
                        {conditionsList.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                              {t.doctors.conditionsTreated}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {conditionsList.map((cond) => (
                                <span
                                  key={cond}
                                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#060E1E] text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-cyan-500/20"
                                >
                                  {cond}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {doc.titleBengali && (
                          <p
                            lang="bn"
                            className="font-bengali text-xs sm:text-sm text-slate-800 dark:text-cyan-200 bg-cyan-50/70 dark:bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/25"
                          >
                            {doc.titleBengali}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Expand / Collapse Trigger */}
                    {hasExtraDetails && (
                      <button
                        type="button"
                        onClick={() => toggleExpandCard(doc.id)}
                        aria-expanded={isExpanded}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-cyan-400 hover:underline py-1"
                      >
                        {isExpanded ? (
                          <>
                            <span>{t.doctors.showFewer}</span>
                            <ChevronUp
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                          </>
                        ) : (
                          <>
                            <span>
                              {hiddenSpecialitiesCount > 0
                                ? `+${hiddenSpecialitiesCount} ${t.doctors.moreItems}`
                                : t.doctors.viewConditions}
                            </span>
                            <ChevronDown
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
                    <a
                      href="#book"
                      onClick={() => onSelectDoctorForBooking(doc.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium text-sm transition-all shadow-xs"
                    >
                      <Calendar
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{t.doctors.bookAppointment}</span>
                    </a>

                    {primaryPhone && (
                      <a
                        href={primaryPhone.tel}
                        aria-label={`Call clinic to enquire about ${doc.name}`}
                        className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] rounded-xl border border-slate-200 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-300 hover:bg-sky-50 dark:hover:bg-[#102242] transition-colors shrink-0"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </DimensionalCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
