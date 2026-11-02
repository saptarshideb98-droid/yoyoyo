import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Smartphone,
  MessageCircle,
  Download,
  QrCode,
  ShieldAlert,
} from 'lucide-react';
import { config } from '../config';
import { buildUpiLink } from '../utils/clinicLogic';
import { useAppPreferences } from '../i18n/AppPreferencesContext';
import { LinkedPaymentContext } from './BookSection';
import { DimensionalCard } from './DimensionalCard';

interface PaySectionProps {
  linkedContext?: LinkedPaymentContext | null;
}

export const PaySection: React.FC<PaySectionProps> = ({ linkedContext }) => {
  const { t } = useAppPreferences();
  const [amount, setAmount] = useState('500');
  const [purpose, setPurpose] = useState('Doctor Consultation');
  const [linkedRefId, setLinkedRefId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [utr, setUtr] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync linked booking/enquiry context when user clicks "Proceed to Make Payment"
  useEffect(() => {
    if (!linkedContext) return;
    if (linkedContext.requestId) setLinkedRefId(linkedContext.requestId);
    if (linkedContext.purpose) setPurpose(linkedContext.purpose);
    if (linkedContext.amount) setAmount(linkedContext.amount);
    if (linkedContext.patientName) setPatientName(linkedContext.patientName);
    if (linkedContext.mobile) setMobile(linkedContext.mobile);
  }, [linkedContext]);

  const numericAmount = Math.max(1, Number(amount) || 1);
  const upiNoteParts = [purpose];
  if (linkedRefId.trim()) upiNoteParts.push(linkedRefId.trim());
  if (patientName.trim()) upiNoteParts.push(patientName.trim());
  const upiNote = upiNoteParts.join(' - ');

  const upiUri = buildUpiLink({
    id: config.upi.id,
    payeeName: config.upi.payeeName,
    amount: numericAmount,
    note: upiNote,
  });

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(config.upi.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement('textarea');
      el.value = config.upi.id;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappPaymentVerificationHref = (() => {
    const lines = [
      `UPI Payment Verification Request - ${config.name}`,
      `UPI ID Paid To: ${config.upi.id}`,
      `Amount: ₹${numericAmount}`,
      `Paying For: ${purpose}`,
    ];
    if (linkedRefId.trim()) {
      lines.push(`Linked Enquiry / Request ID: ${linkedRefId.trim()}`);
    }
    if (patientName.trim()) {
      lines.push(`Patient Name: ${patientName.trim()}`);
    }
    if (mobile.trim()) {
      lines.push(`Mobile: ${mobile.trim()}`);
    }
    if (utr.trim()) {
      lines.push(`UPI Transaction Ref (UTR): ${utr.trim()}`);
    }
    lines.push(
      `Please verify and confirm my payment manually against the clinic account.`
    );
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  })();

  return (
    <section
      id="pay"
      aria-labelledby="pay-heading"
      className="py-12 sm:py-16 bg-white dark:bg-[#050B16] scroll-mt-16 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <h2
            id="pay-heading"
            className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white"
          >
            {t.pay.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5">
            {t.pay.subtitle}
          </p>
        </div>

        <DimensionalCard
          enableTilt={false}
          glowColor="cyan"
          className="bg-white dark:bg-[#0A162C] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-7 shadow-[0_14px_36px_rgba(2,8,23,0.16)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Official Uploaded QR Code, UPI ID, Copy, Download QR, Scan to Pay & Pay Using UPI */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-[#060E1E] rounded-2xl border border-slate-200 dark:border-cyan-500/25 p-5 sm:p-6 flex flex-col items-center text-center space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-cyan-300">
                <QrCode className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.pay.scanToPayTitle}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm">
                {t.pay.scanToPayInstruction}
              </p>

              {/* Official Uploaded HDFC Bank SmartHub Vyapar QR Code — Unmodified, Undistorted, Uncropped */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm w-full max-w-[310px] mx-auto">
                <img
                  src={config.upi.qrImage}
                  alt={`Official UPI QR Code for ${config.upi.payeeName} (${config.upi.id})`}
                  width={773}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain rounded-lg mx-auto"
                />
              </div>

              {/* Merchant & Official UPI ID Box */}
              <div className="w-full bg-white dark:bg-[#0A162C] rounded-xl border border-slate-200 dark:border-cyan-500/25 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {t.pay.payeeNameLabel}:{' '}
                    <strong className="text-slate-900 dark:text-white">
                      {config.upi.payeeName}
                    </strong>
                  </span>
                  <span>
                    {t.pay.merchantIdLabel}:{' '}
                    <strong className="font-mono text-slate-900 dark:text-white">
                      {config.upi.merchantId}
                    </strong>
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-left min-w-0">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.pay.upiIdLabel}
                    </p>
                    <p
                      id="official-upi-id"
                      className="font-mono font-semibold text-xs sm:text-sm text-slate-900 dark:text-cyan-200 break-all"
                    >
                      {config.upi.id}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyUpiId}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl bg-sky-50 dark:bg-cyan-500/15 border border-cyan-500/30 text-sky-700 dark:text-cyan-300 hover:bg-sky-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-xs font-semibold transition-colors shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.pay.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.pay.copyUpiId}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons: Pay Using UPI App & Download QR Code */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={upiUri}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm transition-all"
                >
                  <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.pay.payUsingUpi}</span>
                </a>

                <a
                  href={config.upi.qrImage}
                  download="MAZUMDER-Medical-Hall-Official-UPI-QR.jpeg"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0A162C] hover:border-cyan-400 text-slate-900 dark:text-white font-medium text-xs sm:text-sm transition-colors"
                >
                  <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.pay.downloadQr}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Associate Payment with Booking/Enquiry + Optional UTR Reference + Manual Verification Notice */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="font-heading text-lg sm:text-xl text-slate-900 dark:text-white mb-3.5">
                  {t.pay.paymentDetailsTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="upi-amount"
                      className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                    >
                      {t.pay.amountLabel}{' '}
                      <span className="text-emerald-600 dark:text-cyan-400">
                        *
                      </span>
                    </label>
                    <input
                      id="upi-amount"
                      type="number"
                      min={1}
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-base font-medium tabular-nums focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="upi-purpose"
                      className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                    >
                      {t.pay.payingForLabel}
                    </label>
                    <select
                      id="upi-purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Doctor Consultation">
                        {t.pay.purposeDoctor}
                      </option>
                      <option value="Diagnostic / Lab Test">
                        {t.pay.purposeTest}
                      </option>
                      <option value="Pharmacy / Medicines">
                        {t.pay.purposeMedicines}
                      </option>
                      <option value="Other Clinical Service">
                        {t.pay.purposeOther}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="upi-patient-name"
                      className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                    >
                      {t.pay.patientNameLabel}
                    </label>
                    <input
                      id="upi-patient-name"
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Full name"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="upi-mobile"
                      className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                    >
                      {t.pay.mobileLabel}
                    </label>
                    <input
                      id="upi-mobile"
                      type="tel"
                      inputMode="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none tabular-nums"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="upi-linked-ref"
                    className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                  >
                    {t.pay.linkedEnquiryLabel}
                  </label>
                  <input
                    id="upi-linked-ref"
                    type="text"
                    value={linkedRefId}
                    onChange={(e) => setLinkedRefId(e.target.value)}
                    placeholder="e.g. MMH-261102-XXXX"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional UTR Reference & Manual Verification Submission */}
              <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-heading text-lg text-slate-900 dark:text-white">
                  {t.pay.utrTitle}
                </h3>

                <div>
                  <label
                    htmlFor="upi-utr"
                    className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                  >
                    {t.pay.utrLabel}
                  </label>
                  <input
                    id="upi-utr"
                    type="text"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    placeholder={t.pay.utrPlaceholder}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-cyan-500/25 bg-slate-50 dark:bg-[#060E1E] text-slate-900 dark:text-white text-sm sm:text-base font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <a
                  href={whatsappPaymentVerificationHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium text-sm sm:text-base transition-all"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.pay.sendPaymentVerification}</span>
                </a>

                {/* Strict Manual Verification Policy Notice */}
                <div className="bg-sky-50 dark:bg-[#060E1E] rounded-xl border border-slate-200 dark:border-cyan-500/25 p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert
                      className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p>{t.pay.manualVerificationWarning}</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.pay.acceptedAppsNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DimensionalCard>
      </div>
    </section>
  );
};
