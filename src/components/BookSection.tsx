import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  FlaskConical,
  MessageCircle,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  CreditCard,
  X,
} from 'lucide-react';
import { config, isConfiguredValue } from '../config';
import { Doctor } from '../data/doctors';
import { DiagnosticTest, diagnosticCategories } from '../data/tests';
import {
  getNextConsultationDates,
  getDateBoundsKolkata,
  validateIndianMobile,
  generateRequestId,
  buildAppointmentSummary,
  buildTestSummary,
  buildCommunicationLinks,
} from '../utils/clinicLogic';
import { useAppPreferences } from '../i18n/AppPreferencesContext';

export type BookingTab = 'doctor' | 'test';

export interface LinkedPaymentContext {
  requestId: string;
  purpose: string;
  amount?: string;
  patientName: string;
  mobile: string;
}

interface BookSectionProps {
  activeTab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
  doctors: Doctor[];
  tests: DiagnosticTest[];
  selectedDoctorId: string;
  onSelectDoctorId: (id: string) => void;
  selectedTestIds: string[];
  onToggleTestId: (id: string) => void;
  selectedInvestigationNames: string[];
  onToggleInvestigation: (categoryId: string, investigationName: string) => void;
  onLinkPaymentContext: (ctx: LinkedPaymentContext) => void;
}

interface SubmissionOutcome {
  status: 'received' | 'manual_send_required';
  requestId: string;
  summary: string;
  subject: string;
  paymentContext: LinkedPaymentContext;
  errorMessage?: string;
}

export const BookSection: React.FC<BookSectionProps> = ({
  activeTab,
  onTabChange,
  doctors,
  tests,
  selectedDoctorId,
  onSelectDoctorId,
  selectedTestIds,
  onToggleTestId,
  selectedInvestigationNames,
  onToggleInvestigation,
  onLinkPaymentContext,
}) => {
  const { language, t } = useAppPreferences();
  const { minDate, maxDate } = useMemo(() => getDateBoundsKolkata(30), []);

  // Doctor Appointment Tab State
  const [docPreferredDate, setDocPreferredDate] = useState('');
  const [docPatientName, setDocPatientName] = useState('');
  const [docMobile, setDocMobile] = useState('');
  const [docAge, setDocAge] = useState('');
  const [docReason, setDocReason] = useState('');
  const [docConsent, setDocConsent] = useState(false);
  const [docBotcheck, setDocBotcheck] = useState(false);
  const [docErrors, setDocErrors] = useState<Record<string, string>>({});
  const [docSubmitting, setDocSubmitting] = useState(false);
  const [docOutcome, setDocOutcome] = useState<SubmissionOutcome | null>(null);

  // Diagnostic Test Enquiry Tab State
  const [testPreferredDate, setTestPreferredDate] = useState(minDate);
  const [testPreferredTime, setTestPreferredTime] = useState('Morning');
  const [testPatientName, setTestPatientName] = useState('');
  const [testMobile, setTestMobile] = useState('');
  const [testAge, setTestAge] = useState('');
  const [testPrescribingDoc, setTestPrescribingDoc] = useState('');
  const [testNotes, setTestNotes] = useState('');
  const [testConsent, setTestConsent] = useState(false);
  const [testBotcheck, setTestBotcheck] = useState(false);
  const [testErrors, setTestErrors] = useState<Record<string, string>>({});
  const [testSubmitting, setTestSubmitting] = useState(false);
  const [testOutcome, setTestOutcome] = useState<SubmissionOutcome | null>(
    null
  );

  const selectedDoctor = useMemo(
    () => doctors.find((d) => d.id === selectedDoctorId) ?? doctors[0],
    [doctors, selectedDoctorId]
  );

  const validDateChips = useMemo(
    () =>
      selectedDoctor ? getNextConsultationDates(selectedDoctor, 6) : [],
    [selectedDoctor]
  );

  useEffect(() => {
    if (validDateChips.length > 0) {
      setDocPreferredDate(validDateChips[0].label);
    } else {
      setDocPreferredDate(minDate);
    }
    setDocErrors((prev) => {
      if (!prev.preferredDate) return prev;
      const copy = { ...prev };
      delete copy.preferredDate;
      return copy;
    });
  }, [selectedDoctor, validDateChips, minDate]);

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (docBotcheck) return;

    const errors: Record<string, string> = {};
    if (!selectedDoctor) {
      errors.doctor = 'Please select a doctor.';
    }
    if (!docPreferredDate.trim()) {
      errors.preferredDate = 'Please select or enter a preferred date.';
    }
    if (!docPatientName.trim()) {
      errors.patientName = 'Please enter the patient name.';
    }
    const mobileCheck = validateIndianMobile(docMobile);
    if (!mobileCheck.valid) {
      errors.mobile = mobileCheck.error ?? 'Please enter a valid mobile number.';
    }
    if (!docConsent) {
      errors.consent =
        'Please confirm that you agree to be contacted on this number.';
    }

    setDocErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const requestId = generateRequestId();
    const isApproximateDate = validDateChips.length === 0;
    const doctorScheduleText = `${selectedDoctor.daysLabel}${
      selectedDoctor.time ? ` (${selectedDoctor.time})` : ''
    }`;
    const summary = buildAppointmentSummary({
      requestId,
      doctorName: selectedDoctor.name,
      doctorCategory: selectedDoctor.category,
      doctorSchedule: doctorScheduleText,
      consultationFee: selectedDoctor.consultationFee,
      preferredDate: docPreferredDate.trim(),
      isApproximateDate,
      patientName: docPatientName.trim(),
      mobile: mobileCheck.cleaned,
      age: docAge.trim(),
      reason: docReason.trim(),
    });
    const subject = `New appointment request ${requestId}`;

    const numericFeeMatch = selectedDoctor.consultationFee.match(/\d+/);
    const paymentContext: LinkedPaymentContext = {
      requestId,
      purpose: 'Doctor Consultation',
      amount: numericFeeMatch ? numericFeeMatch[0] : '',
      patientName: docPatientName.trim(),
      mobile: mobileCheck.cleaned,
    };
    onLinkPaymentContext(paymentContext);

    if (isConfiguredValue(config.formAccessKey)) {
      setDocSubmitting(true);
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: config.formAccessKey,
            subject,
            from_name: 'MAZUMDER Medical Hall Website',
            request_id: requestId,
            doctor: `${selectedDoctor.name} (${selectedDoctor.category})`,
            doctor_schedule: doctorScheduleText,
            consultation_fee: selectedDoctor.consultationFee,
            preferred_date: docPreferredDate.trim(),
            is_approximate_date: isApproximateDate,
            patient_name: docPatientName.trim(),
            mobile: mobileCheck.cleaned,
            age: docAge.trim(),
            reason: docReason.trim(),
            consent: docConsent,
            botcheck: docBotcheck,
          }),
        });

        if (res.ok) {
          setDocOutcome({
            status: 'received',
            requestId,
            summary,
            subject,
            paymentContext,
          });
        } else {
          setDocOutcome({
            status: 'manual_send_required',
            requestId,
            summary,
            subject,
            paymentContext,
            errorMessage:
              'Online form submission could not be completed right now. Please send your enquiry directly using one of the options below.',
          });
        }
      } catch {
        setDocOutcome({
          status: 'manual_send_required',
          requestId,
          summary,
          subject,
          paymentContext,
          errorMessage:
            'Could not connect to the form service. Please send your enquiry directly using one of the options below.',
        });
      } finally {
        setDocSubmitting(false);
      }
    } else {
      setDocOutcome({
        status: 'manual_send_required',
        requestId,
        summary,
        subject,
        paymentContext,
      });
    }
  };

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (testBotcheck) return;

    const errors: Record<string, string> = {};
    if (
      selectedTestIds.length === 0 &&
      selectedInvestigationNames.length === 0
    ) {
      errors.tests = 'Please select at least one diagnostic test or category.';
    }
    if (!testPreferredDate.trim()) {
      errors.preferredDate = 'Please select a preferred date.';
    }
    if (!testPatientName.trim()) {
      errors.patientName = 'Please enter the patient name.';
    }
    const mobileCheck = validateIndianMobile(testMobile);
    if (!mobileCheck.valid) {
      errors.mobile = mobileCheck.error ?? 'Please enter a valid mobile number.';
    }
    if (!testConsent) {
      errors.consent =
        'Please confirm that you agree to be contacted on this number.';
    }

    setTestErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const selectedCategoryNames = tests
      .filter((tItem) => selectedTestIds.includes(tItem.id))
      .map((tItem) => tItem.name);

    const combinedTests = Array.from(
      new Set([...selectedCategoryNames, ...selectedInvestigationNames])
    );

    const requestId = generateRequestId();
    const summary = buildTestSummary({
      requestId,
      tests: combinedTests,
      preferredDate: testPreferredDate.trim(),
      preferredTime: testPreferredTime,
      patientName: testPatientName.trim(),
      mobile: mobileCheck.cleaned,
      age: testAge.trim(),
      prescribingDoctor: testPrescribingDoc.trim(),
      notes: testNotes.trim(),
    });
    const subject = `New test request ${requestId}`;

    const paymentContext: LinkedPaymentContext = {
      requestId,
      purpose: 'Diagnostic / Lab Test',
      patientName: testPatientName.trim(),
      mobile: mobileCheck.cleaned,
    };
    onLinkPaymentContext(paymentContext);

    if (isConfiguredValue(config.formAccessKey)) {
      setTestSubmitting(true);
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: config.formAccessKey,
            subject,
            from_name: 'MAZUMDER Medical Hall Website',
            request_id: requestId,
            tests: combinedTests.join(', '),
            preferred_date: testPreferredDate.trim(),
            preferred_time: testPreferredTime,
            patient_name: testPatientName.trim(),
            mobile: mobileCheck.cleaned,
            age: testAge.trim(),
            prescribing_doctor: testPrescribingDoc.trim(),
            notes: testNotes.trim(),
            consent: testConsent,
            botcheck: testBotcheck,
          }),
        });

        if (res.ok) {
          setTestOutcome({
            status: 'received',
            requestId,
            summary,
            subject,
            paymentContext,
          });
        } else {
          setTestOutcome({
            status: 'manual_send_required',
            requestId,
            summary,
            subject,
            paymentContext,
            errorMessage:
              'Online form submission could not be completed right now. Please send your enquiry directly using one of the options below.',
          });
        }
      } catch {
        setTestOutcome({
          status: 'manual_send_required',
          requestId,
          summary,
          subject,
          paymentContext,
          errorMessage:
            'Could not connect to the form service. Please send your enquiry directly using one of the options below.',
        });
      } finally {
        setTestSubmitting(false);
      }
    } else {
      setTestOutcome({
        status: 'manual_send_required',
        requestId,
        summary,
        subject,
        paymentContext,
      });
    }
  };

  const renderOutcomePanel = (
    outcome: SubmissionOutcome,
    onReset: () => void
  ) => {
    const links = buildCommunicationLinks({
      whatsappNumber: config.whatsappNumber,
      email: config.email,
      smsNumber: config.smsNumber,
      subject: outcome.subject,
      message: outcome.summary,
    });

    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-sky-500/30 dark:border-cyan-500/40 bg-sky-50/80 dark:bg-[#0A162C] p-5 sm:p-6 space-y-4 shadow-[0_12px_32px_rgba(2,8,23,0.16)]"
      >
        <div className="flex items-start gap-3">
          {outcome.status === 'received' ? (
            <CheckCircle2
              className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
          ) : (
            <AlertCircle
              className="w-6 h-6 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
          )}
          <div>
            <h3 className="font-heading text-xl text-slate-900 dark:text-white">
              {outcome.status === 'received'
                ? t.book.requestReceivedTitle
                : t.book.requestIncompleteTitle}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              {outcome.errorMessage ?? t.book.requestIncompleteSub}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#060E1E] rounded-xl border border-slate-200 dark:border-cyan-500/25 p-4">
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.book.requestSummaryLabel}
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-cyan-300">
              {outcome.requestId}
            </span>
          </div>
          <pre className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
            {outcome.summary}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
          <a
            href={links.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm sm:text-base font-medium transition-all"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.book.sendOnWhatsapp}</span>
          </a>

          <a
            href={links.mailtoUrl}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-sm font-medium transition-all"
          >
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.book.sendByEmail}</span>
          </a>

          <a
            href={links.smsUrl}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#060E1E] hover:border-cyan-400 text-slate-900 dark:text-white text-sm font-medium transition-colors"
          >
            <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.book.sendBySms}</span>
          </a>

          <a
            href="#pay"
            onClick={() => onLinkPaymentContext(outcome.paymentContext)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-sm font-medium transition-colors"
          >
            <CreditCard className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.book.payForThisRequest}</span>
          </a>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t.book.clinicWillConfirm}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-cyan-400 hover:underline py-1"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.book.editRequestDetails}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="py-12 sm:py-16 bg-white dark:bg-[#050B16] scroll-mt-16 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2
            id="book-heading"
            className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white"
          >
            {t.book.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5">
            {t.book.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Side column (above on mobile): 3-step note + emergency disclaimer */}
          <div className="lg:col-span-4 space-y-5 order-1 lg:order-2">
            <div className="bg-slate-50 dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-6 shadow-[0_10px_28px_rgba(2,8,23,0.12)]">
              <h3 className="font-heading text-lg text-slate-900 dark:text-white mb-3.5">
                {t.book.howItWorksTitle}
              </h3>
              <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    1
                  </span>
                  <span>{t.book.step1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    2
                  </span>
                  <span>{t.book.step2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    3
                  </span>
                  <span>{t.book.step3}</span>
                </li>
              </ol>
            </div>

            <div className="bg-sky-50 dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <AlertCircle
                  className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p>{t.book.emergencyNote}</p>
              </div>
            </div>
          </div>

          {/* Main Form Column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-7 shadow-[0_14px_36px_rgba(2,8,23,0.16)]">
              {/* Two Tabs */}
              <div
                role="tablist"
                aria-label="Booking type"
                className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#060E1E] rounded-xl border border-slate-200 dark:border-cyan-500/25 mb-6"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-doctor"
                  aria-selected={activeTab === 'doctor'}
                  aria-controls="panel-doctor"
                  onClick={() => onTabChange('doctor')}
                  className={`inline-flex items-center justify-center gap-2 py-2.5 px-3 min-h-[44px] rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === 'doctor'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.book.tabDoctor}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-test"
                  aria-selected={activeTab === 'test'}
                  aria-controls="panel-test"
                  onClick={() => onTabChange('test')}
                  className={`inline-flex items-center justify-center gap-2 py-2.5 px-3 min-h-[44px] rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === 'test'
                      ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FlaskConical
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t.book.tabTest}</span>
                </button>
              </div>

              {/* TAB 1: Doctor Appointment */}
              {activeTab === 'doctor' && (
                <div
                  id="panel-doctor"
                  role="tabpanel"
                  aria-labelledby="tab-doctor"
                >
                  {docOutcome ? (
                    renderOutcomePanel(docOutcome, () => setDocOutcome(null))
                  ) : (
                    <form
                      onSubmit={handleDoctorSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="doc-botcheck">
                          Do not check this box
                        </label>
                        <input
                          id="doc-botcheck"
                          type="checkbox"
                          name="botcheck"
                          tabIndex={-1}
                          checked={docBotcheck}
                          onChange={(e) => setDocBotcheck(e.target.checked)}
                        />
                      </div>

                      {/* Doctor Select */}
                      <div>
                        <label
                          htmlFor="booking-doctor-select"
                          className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                        >
                          {t.book.doctorLabel}{' '}
                          <span className="text-[#0B5D3F] dark:text-emerald-400">
                            *
                          </span>
                        </label>
                        <select
                          id="booking-doctor-select"
                          value={selectedDoctorId}
                          onChange={(e) => onSelectDoctorId(e.target.value)}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                        >
                          {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name} — {doc.category} ({doc.daysLabel} ·{' '}
                              {t.doctors.feePrefix}: {doc.consultationFee})
                            </option>
                          ))}
                        </select>
                        {selectedDoctor && (
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-[#EEF6F2]/70 dark:bg-[#0B1512] border border-[#D8E3DD] dark:border-[#1F352E] text-xs sm:text-sm text-[#33433D] dark:text-slate-300">
                            <span>
                              <strong className="text-[#0E1F1A] dark:text-slate-100">
                                {t.book.scheduleLabel}
                              </strong>{' '}
                              {selectedDoctor.daysLabel}
                              {selectedDoctor.time
                                ? ` (${selectedDoctor.time})`
                                : ` (${t.doctors.timePleaseCall})`}
                            </span>
                            <span className="font-semibold text-[#0B5D3F] dark:text-emerald-400 tabular-nums">
                              {t.book.consultationFeeLabel}{' '}
                              {selectedDoctor.consultationFee}
                            </span>
                          </div>
                        )}
                        {docErrors.doctor && (
                          <p
                            className="text-xs text-red-700 dark:text-red-400 mt-1"
                            role="alert"
                          >
                            {docErrors.doctor}
                          </p>
                        )}
                      </div>

                      {/* Preferred Date */}
                      {validDateChips.length > 0 ? (
                        <div>
                          <span className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-2">
                            {t.book.preferredDate}{' '}
                            <span className="text-[#0B5D3F] dark:text-emerald-400">
                              *
                            </span>
                          </span>
                          <div
                            role="group"
                            aria-label="Select preferred consultation date"
                            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                          >
                            {validDateChips.map((slot) => {
                              const active = docPreferredDate === slot.label;
                              return (
                                <button
                                  key={slot.isoDate}
                                  type="button"
                                  onClick={() => setDocPreferredDate(slot.label)}
                                  aria-pressed={active}
                                  className={`px-3 py-2.5 min-h-[44px] rounded-xl border text-xs sm:text-sm font-medium transition-colors text-center ${
                                    active
                                      ? 'bg-[#0B5D3F] dark:bg-emerald-600 text-white border-[#0B5D3F] dark:border-emerald-600'
                                      : 'bg-[#EEF6F2]/60 dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-200 border-[#D8E3DD] dark:border-[#1F352E] hover:bg-[#EEF6F2]'
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              );
                            })}
                          </div>
                          {docErrors.preferredDate && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {docErrors.preferredDate}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor="doc-approx-date"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.preferredDateApprox}{' '}
                            <span className="text-[#0B5D3F] dark:text-emerald-400">
                              *
                            </span>
                          </label>
                          <input
                            id="doc-approx-date"
                            type="date"
                            min={minDate}
                            max={maxDate}
                            value={docPreferredDate}
                            onChange={(e) =>
                              setDocPreferredDate(e.target.value)
                            }
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          />
                          <p className="text-xs text-[#5B6B64] dark:text-slate-400 mt-1.5">
                            {t.book.confirmVisitDateNote}
                          </p>
                          {docErrors.preferredDate && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {docErrors.preferredDate}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Patient Name, Mobile, Age */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-5">
                          <label
                            htmlFor="doc-patient-name"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.patientName}{' '}
                            <span className="text-[#0B5D3F] dark:text-emerald-400">
                              *
                            </span>
                          </label>
                          <input
                            id="doc-patient-name"
                            type="text"
                            required
                            value={docPatientName}
                            onChange={(e) => setDocPatientName(e.target.value)}
                            placeholder={t.book.patientNamePlaceholder}
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          />
                          {docErrors.patientName && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {docErrors.patientName}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-5">
                          <label
                            htmlFor="doc-mobile"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.mobileNumber}{' '}
                            <span className="text-[#0B5D3F] dark:text-emerald-400">
                              *
                            </span>
                          </label>
                          <input
                            id="doc-mobile"
                            type="tel"
                            inputMode="tel"
                            required
                            value={docMobile}
                            onChange={(e) => setDocMobile(e.target.value)}
                            placeholder={t.book.mobilePlaceholder}
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none tabular-nums"
                          />
                          {docErrors.mobile && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {docErrors.mobile}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="doc-age"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.age}
                          </label>
                          <input
                            id="doc-age"
                            type="number"
                            min={0}
                            max={120}
                            value={docAge}
                            onChange={(e) => setDocAge(e.target.value)}
                            placeholder={t.book.agePlaceholder}
                            className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none tabular-nums"
                          />
                        </div>
                      </div>

                      {/* Reason for visit */}
                      <div>
                        <label
                          htmlFor="doc-reason"
                          className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1"
                        >
                          {t.book.reasonForVisit}{' '}
                          <span className="text-xs font-normal text-[#5B6B64] dark:text-slate-400">
                            {t.book.optional}
                          </span>
                        </label>
                        <input
                          id="doc-reason"
                          type="text"
                          maxLength={140}
                          value={docReason}
                          onChange={(e) => setDocReason(e.target.value)}
                          placeholder={t.book.reasonPlaceholder}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                        />
                        <p className="text-xs text-[#5B6B64] dark:text-slate-400 mt-1">
                          {t.book.reasonHint}
                        </p>
                      </div>

                      {/* Consent Checkbox */}
                      <div>
                        <label
                          htmlFor="doc-consent"
                          className="flex items-start gap-3 cursor-pointer select-none py-1"
                        >
                          <input
                            id="doc-consent"
                            type="checkbox"
                            checked={docConsent}
                            onChange={(e) => setDocConsent(e.target.checked)}
                            className="mt-1 w-4.5 h-4.5 rounded border-[#D8E3DD] text-[#0B5D3F]"
                          />
                          <span className="text-xs sm:text-sm text-[#33433D] dark:text-slate-300">
                            {t.book.consentText}{' '}
                            <span className="text-[#0B5D3F] dark:text-emerald-400">
                              *
                            </span>
                          </span>
                        </label>
                        {docErrors.consent && (
                          <p
                            className="text-xs text-red-700 dark:text-red-400 mt-1"
                            role="alert"
                          >
                            {docErrors.consent}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={docSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-[#0B5D3F] hover:bg-[#084831] dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-60 text-white font-medium text-base transition-colors"
                        >
                          <Calendar
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {docSubmitting
                              ? t.book.submitting
                              : t.book.submitDoctorRequest}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: Lab / Diagnostic Test Enquiry */}
              {activeTab === 'test' && (
                <div id="panel-test" role="tabpanel" aria-labelledby="tab-test">
                  {testOutcome ? (
                    renderOutcomePanel(testOutcome, () => setTestOutcome(null))
                  ) : (
                    <form
                      onSubmit={handleTestSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="test-botcheck">
                          Do not check this box
                        </label>
                        <input
                          id="test-botcheck"
                          type="checkbox"
                          name="botcheck"
                          tabIndex={-1}
                          checked={testBotcheck}
                          onChange={(e) => setTestBotcheck(e.target.checked)}
                        />
                      </div>

                      <div className="bg-[#EEF4FB] dark:bg-[#101D29] rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] p-3.5 text-xs sm:text-sm text-[#33433D] dark:text-slate-300">
                        {t.book.prescriptionHelper}
                      </div>

                      {/* Test Category Checkboxes */}
                      <div>
                        <span className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-2">
                          {t.book.selectedTestsLabel}{' '}
                          <span className="text-[#0F66B3] dark:text-sky-400">
                            *
                          </span>
                        </span>
                        <div
                          role="group"
                          aria-label="Select diagnostic test categories"
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                        >
                          {tests.map((testItem) => {
                            const checked = selectedTestIds.includes(
                              testItem.id
                            );
                            return (
                              <label
                                key={testItem.id}
                                className={`flex items-center gap-3 p-3 min-h-[44px] rounded-xl border cursor-pointer transition-colors ${
                                  checked
                                    ? 'bg-[#EEF4FB] dark:bg-[#101D29] border-[#0F66B3] dark:border-sky-500 text-[#0E1F1A] dark:text-slate-100'
                                    : 'bg-white dark:bg-[#0B1512] border-[#D8E3DD] dark:border-[#1F352E] text-[#33433D] dark:text-slate-300 hover:bg-[#EEF6F2]/50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => onToggleTestId(testItem.id)}
                                  className="w-4.5 h-4.5 rounded border-[#D8E3DD] text-[#0F66B3]"
                                />
                                <span className="text-sm font-medium">
                                  {testItem.nameLocalized[language]}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Specific Selected Investigations tags if any */}
                        {selectedInvestigationNames.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-[#D8E3DD] dark:border-[#1F352E]">
                            <p className="text-xs font-medium text-[#5B6B64] dark:text-slate-400 mb-2">
                              {t.book.additionalInvestigationsLabel}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedInvestigationNames.map((invName) => {
                                const matchingCat =
                                  diagnosticCategories.find((c) =>
                                    c.investigations.some(
                                      (i) => i.name.en === invName
                                    )
                                  ) ?? diagnosticCategories[0];
                                return (
                                  <span
                                    key={invName}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EEF6F2] dark:bg-[#0B1512] border border-[#D8E3DD] dark:border-[#1F352E] text-xs font-medium text-[#0E1F1A] dark:text-slate-100"
                                  >
                                    <span>{invName}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onToggleInvestigation(
                                          matchingCat.id,
                                          invName
                                        )
                                      }
                                      aria-label={`Remove ${invName}`}
                                      className="text-[#5B6B64] hover:text-red-600"
                                    >
                                      <X
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {testErrors.tests && (
                          <p
                            className="text-xs text-red-700 dark:text-red-400 mt-1"
                            role="alert"
                          >
                            {testErrors.tests}
                          </p>
                        )}
                      </div>

                      {/* Preferred Date & Preferred Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="test-preferred-date"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.preferredDate}{' '}
                            <span className="text-[#0F66B3] dark:text-sky-400">
                              *
                            </span>
                          </label>
                          <input
                            id="test-preferred-date"
                            type="date"
                            min={minDate}
                            max={maxDate}
                            required
                            value={testPreferredDate}
                            onChange={(e) =>
                              setTestPreferredDate(e.target.value)
                            }
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          />
                          {testErrors.preferredDate && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {testErrors.preferredDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="test-preferred-time"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.preferredTime}
                          </label>
                          <select
                            id="test-preferred-time"
                            value={testPreferredTime}
                            onChange={(e) =>
                              setTestPreferredTime(e.target.value)
                            }
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          >
                            <option value="Morning">{t.book.morning}</option>
                            <option value="Afternoon">{t.book.afternoon}</option>
                            <option value="Evening">{t.book.evening}</option>
                          </select>
                        </div>
                      </div>

                      {/* Patient Name, Mobile, Age */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-5">
                          <label
                            htmlFor="test-patient-name"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.patientName}{' '}
                            <span className="text-[#0F66B3] dark:text-sky-400">
                              *
                            </span>
                          </label>
                          <input
                            id="test-patient-name"
                            type="text"
                            required
                            value={testPatientName}
                            onChange={(e) => setTestPatientName(e.target.value)}
                            placeholder={t.book.patientNamePlaceholder}
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          />
                          {testErrors.patientName && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {testErrors.patientName}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-5">
                          <label
                            htmlFor="test-mobile"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.mobileNumber}{' '}
                            <span className="text-[#0F66B3] dark:text-sky-400">
                              *
                            </span>
                          </label>
                          <input
                            id="test-mobile"
                            type="tel"
                            inputMode="tel"
                            required
                            value={testMobile}
                            onChange={(e) => setTestMobile(e.target.value)}
                            placeholder={t.book.mobilePlaceholder}
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none tabular-nums"
                          />
                          {testErrors.mobile && (
                            <p
                              className="text-xs text-red-700 dark:text-red-400 mt-1"
                              role="alert"
                            >
                              {testErrors.mobile}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="test-age"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.age}
                          </label>
                          <input
                            id="test-age"
                            type="number"
                            min={0}
                            max={120}
                            value={testAge}
                            onChange={(e) => setTestAge(e.target.value)}
                            placeholder={t.book.agePlaceholder}
                            className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none tabular-nums"
                          />
                        </div>
                      </div>

                      {/* Prescribing Doctor & Additional Message */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="test-prescribing-doc"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.prescribingDoctor}{' '}
                            <span className="text-xs font-normal text-[#5B6B64] dark:text-slate-400">
                              {t.book.optional}
                            </span>
                          </label>
                          <input
                            id="test-prescribing-doc"
                            type="text"
                            value={testPrescribingDoc}
                            onChange={(e) =>
                              setTestPrescribingDoc(e.target.value)
                            }
                            placeholder={t.book.prescribingDoctorPlaceholder}
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="test-notes"
                            className="block text-sm font-medium text-[#0E1F1A] dark:text-slate-100 mb-1.5"
                          >
                            {t.book.additionalMessage}{' '}
                            <span className="text-xs font-normal text-[#5B6B64] dark:text-slate-400">
                              {t.book.optional}
                            </span>
                          </label>
                          <input
                            id="test-notes"
                            type="text"
                            maxLength={180}
                            value={testNotes}
                            onChange={(e) => setTestNotes(e.target.value)}
                            placeholder={t.book.additionalMessagePlaceholder}
                            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#D8E3DD] dark:border-[#1F352E] bg-white dark:bg-[#0B1512] text-[#0E1F1A] dark:text-slate-100 text-sm sm:text-base focus:border-[#0F66B3] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Consent Checkbox */}
                      <div>
                        <label
                          htmlFor="test-consent"
                          className="flex items-start gap-3 cursor-pointer select-none py-1"
                        >
                          <input
                            id="test-consent"
                            type="checkbox"
                            checked={testConsent}
                            onChange={(e) => setTestConsent(e.target.checked)}
                            className="mt-1 w-4.5 h-4.5 rounded border-[#D8E3DD] text-[#0F66B3]"
                          />
                          <span className="text-xs sm:text-sm text-[#33433D] dark:text-slate-300">
                            {t.book.consentText}{' '}
                            <span className="text-[#0F66B3] dark:text-sky-400">
                              *
                            </span>
                          </span>
                        </label>
                        {testErrors.consent && (
                          <p
                            className="text-xs text-red-700 dark:text-red-400 mt-1"
                            role="alert"
                          >
                            {testErrors.consent}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={testSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-[#0F66B3] hover:bg-[#0C5290] dark:bg-sky-600 dark:hover:bg-sky-500 disabled:opacity-60 text-white font-medium text-base transition-colors"
                        >
                          <FlaskConical
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {testSubmitting
                              ? t.book.submitting
                              : t.book.submitTestRequest}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
