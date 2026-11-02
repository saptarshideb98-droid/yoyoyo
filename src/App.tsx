import { useState, useMemo } from 'react';
import { doctors } from './data/doctors';
import { diagnosticTests } from './data/tests';
import {
  getKolkataDateParts,
  getConsultingTodayDoctors,
} from './utils/clinicLogic';
import { AppPreferencesProvider } from './i18n/AppPreferencesContext';
import { CinematicIntroOverlay } from './components/CinematicIntroOverlay';
import { Header } from './components/Header';
import { QuickContactBar } from './components/QuickContactBar';
import { HeroSection } from './components/HeroSection';
import { DoctorsSection } from './components/DoctorsSection';
import {
  BookSection,
  BookingTab,
  LinkedPaymentContext,
} from './components/BookSection';
import { TestsSection } from './components/TestsSection';
import { PaySection } from './components/PaySection';
import { PharmacyAndCommitment } from './components/PharmacyAndCommitment';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function AppShell() {
  const { weekdayCode: todayCode, nthWeekdayOfMonth } = useMemo(
    () => getKolkataDateParts(),
    []
  );
  const consultingToday = useMemo(
    () => getConsultingTodayDoctors(doctors),
    []
  );

  const [bookingTab, setBookingTab] = useState<BookingTab>('doctor');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    doctors[0]?.id ?? ''
  );
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([
    diagnosticTests[0]?.id ?? 'blood-tests',
  ]);
  const [selectedInvestigationNames, setSelectedInvestigationNames] = useState<
    string[]
  >([]);
  const [linkedPaymentContext, setLinkedPaymentContext] =
    useState<LinkedPaymentContext | null>(null);

  const scrollToBookSection = () => {
    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookDoctor = (doctorId?: string) => {
    setBookingTab('doctor');
    if (doctorId) {
      setSelectedDoctorId(doctorId);
    }
    scrollToBookSection();
  };

  const handleBookTest = (categoryId?: string, investigationName?: string) => {
    setBookingTab('test');
    if (categoryId) {
      setSelectedTestIds((prev) =>
        prev.includes(categoryId) ? prev : [...prev, categoryId]
      );
    }
    if (investigationName) {
      setSelectedInvestigationNames((prev) =>
        prev.includes(investigationName) ? prev : [...prev, investigationName]
      );
    }
    scrollToBookSection();
  };

  const handleToggleTestId = (testId: string) => {
    setSelectedTestIds((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const handleToggleInvestigation = (
    categoryId: string,
    investigationName: string
  ) => {
    setSelectedInvestigationNames((prev) =>
      prev.includes(investigationName)
        ? prev.filter((name) => name !== investigationName)
        : [...prev, investigationName]
    );
    setSelectedTestIds((prev) =>
      prev.includes(categoryId) ? prev : [...prev, categoryId]
    );
  };

  const handleClearSelectedInvestigations = () => {
    setSelectedInvestigationNames([]);
  };

  const handleOpenAppointmentForm = () => {
    setBookingTab('test');
    scrollToBookSection();
  };

  const handleLinkPaymentContext = (ctx: LinkedPaymentContext) => {
    setLinkedPaymentContext(ctx);
    const payEl = document.getElementById('pay');
    if (payEl) {
      payEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#050B16] text-slate-700 dark:text-slate-200 transition-colors overflow-x-hidden">
      {/* Cinematic Opening Brand & 3D Emblem Reveal (Non-blocking, skippable) */}
      <CinematicIntroOverlay />

      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-cyan-600 focus:text-white focus:font-medium focus:text-sm"
      >
        Skip to main content
      </a>

      {/* 1. Header */}
      <Header onBookClick={() => handleBookDoctor()} />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {/* 3. Hero (with 3D Molecular Helix), 4. Trust strip, 5. Quick actions */}
        <HeroSection
          allDoctors={doctors}
          consultingToday={consultingToday}
          onBookDoctor={handleBookDoctor}
          onBookTest={() => handleBookTest()}
        />

        {/* 6. Our Doctors */}
        <DoctorsSection
          doctors={doctors}
          todayCode={todayCode}
          nthWeekdayOfMonth={nthWeekdayOfMonth}
          onSelectDoctorForBooking={(docId) => handleBookDoctor(docId)}
        />

        {/* 7. Book (two tabs) */}
        <BookSection
          activeTab={bookingTab}
          onTabChange={setBookingTab}
          doctors={doctors}
          tests={diagnosticTests}
          selectedDoctorId={selectedDoctorId}
          onSelectDoctorId={setSelectedDoctorId}
          selectedTestIds={selectedTestIds}
          onToggleTestId={handleToggleTestId}
          selectedInvestigationNames={selectedInvestigationNames}
          onToggleInvestigation={handleToggleInvestigation}
          onLinkPaymentContext={handleLinkPaymentContext}
        />

        {/* 8. Diagnostic & Clinical Services */}
        <TestsSection
          tests={diagnosticTests}
          selectedTestIds={selectedTestIds}
          selectedInvestigationNames={selectedInvestigationNames}
          onBookSpecificTest={handleBookTest}
          onToggleInvestigation={handleToggleInvestigation}
          onClearSelectedInvestigations={handleClearSelectedInvestigations}
          onOpenAppointmentForm={handleOpenAppointmentForm}
        />

        {/* 9. Make Payment (Official UPI QR Code) */}
        <PaySection linkedContext={linkedPaymentContext} />

        {/* 10. Pharmacy & 11. Our Commitment */}
        <PharmacyAndCommitment />

        {/* 12. Visit and Contact */}
        <ContactSection />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* 2. Quick-contact bar (fixed bottom bar on mobile, floating WhatsApp on desktop) */}
      <QuickContactBar onBookClick={() => handleBookDoctor()} />
    </div>
  );
}

export default function App() {
  return (
    <AppPreferencesProvider>
      <AppShell />
    </AppPreferencesProvider>
  );
}
