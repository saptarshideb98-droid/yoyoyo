import test from 'node:test';
import assert from 'node:assert/strict';
import { doctors } from '../data/doctors';
import { diagnosticCategories } from '../data/tests';
import { config } from '../config';
import {
  getKolkataDateParts,
  getConsultingTodayDoctors,
  getNextConsultationDates,
  validateIndianMobile,
  generateRequestId,
  filterDoctors,
  getDoctorInitials,
  buildAppointmentSummary,
  buildCommunicationLinks,
  buildUpiLink,
} from './clinicLogic';

test('Master Doctor List contains all 14 doctors with consultation fees and schedules', () => {
  assert.equal(doctors.length, 14);
  for (const doc of doctors) {
    assert.ok(doc.consultationFee && doc.consultationFee.length > 0);
    assert.ok(doc.daysLabel && doc.daysLabel.length > 0);
  }
});

test('Diagnostic & Clinical Services catalogue contains all 5 categories with trilingual items and zero currency symbols', () => {
  assert.equal(diagnosticCategories.length, 5);
  const categoryTitles = diagnosticCategories.map((c) => c.title.en);
  assert.deepEqual(categoryTitles, [
    'BLOOD TESTS',
    'URINE TESTS',
    'STOOL TESTS',
    'SONOGRAPHY',
    'OTHER DIAGNOSTIC SERVICES',
  ]);

  const jsonPayload = JSON.stringify(diagnosticCategories);
  assert.equal(jsonPayload.includes('₹'), false);
  assert.equal(jsonPayload.includes('Rs.'), false);
  assert.equal(jsonPayload.includes('INR'), false);

  for (const cat of diagnosticCategories) {
    assert.ok(cat.investigations.length >= 5);
    assert.ok(cat.title.en && cat.title.hi && cat.title.bn);
  }
});

test('Official UPI configuration matches HDFC Bank SmartHub VYAPAR QR details', () => {
  assert.equal(config.upi.enabled, true);
  assert.equal(config.upi.id, 'Vyapar.173291024121@hdfcbank');
  assert.equal(config.upi.payeeName, 'MAZUMDER MEDICAL HALL');
  assert.equal(config.upi.merchantId, '36559219');
  assert.ok(config.upi.qrImage.includes('WhatsApp_Image_2026-11-02'));
});

test('getKolkataDateParts computes Asia/Kolkata weekday, nthWeekdayOfMonth, and YYMMDD accurately', () => {
  // 2026-11-14T10:00:00Z is the 2nd Saturday of November 2026 in Asia/Kolkata
  const secondSatUtc = new Date('2026-11-14T10:00:00Z');
  const parts = getKolkataDateParts(secondSatUtc);
  assert.equal(parts.weekdayCode, 'SAT');
  assert.equal(parts.nthWeekdayOfMonth, 2);
  assert.equal(parts.isoDate, '2026-11-14');
  assert.equal(parts.yymmdd, '261114');
});

test('getConsultingTodayDoctors sorts by start time, puts missing times last, and respects 2nd & 4th Saturday', () => {
  // 2026-11-01T10:00:00Z is Sunday in Asia/Kolkata
  const sundayUtc = new Date('2026-11-01T10:00:00Z');
  const availableSunday = getConsultingTodayDoctors(doctors, sundayUtc);

  // Dr. Sridham Sutradhar starts at 11:00 AM (660m) -> should be first on Sunday
  assert.equal(availableSunday[0].name, 'Dr. Sridham Sutradhar');

  const firstWithoutTimeIdx = availableSunday.findIndex((d) => !d.time);
  const lastWithTimeIdx = availableSunday
    .map((d) => Boolean(d.time))
    .lastIndexOf(true);
  assert.ok(lastWithTimeIdx < firstWithoutTimeIdx);

  // Dr. Pankaj Kanti Das (2nd & 4th Saturday) should be available on 2nd Saturday (2026-11-14), not 1st Saturday (2026-11-07)
  const firstSatUtc = new Date('2026-11-07T10:00:00Z');
  const secondSatUtc = new Date('2026-11-14T10:00:00Z');
  assert.equal(
    getConsultingTodayDoctors(doctors, firstSatUtc).some(
      (d) => d.id === 'dr-pankaj-kanti-das'
    ),
    false
  );
  assert.equal(
    getConsultingTodayDoctors(doctors, secondSatUtc).some(
      (d) => d.id === 'dr-pankaj-kanti-das'
    ),
    true
  );
});

test('getNextConsultationDates returns 6 valid consultation dates including 2nd & 4th Saturday schedules', () => {
  const pankajDoc = doctors.find((d) => d.id === 'dr-pankaj-kanti-das')!;
  const mondayUtc = new Date('2026-11-02T08:00:00Z');
  const pankajSlots = getNextConsultationDates(pankajDoc, 6, mondayUtc);
  assert.equal(pankajSlots.length, 6);
  // 2nd and 4th Saturdays of Nov 2026 are 2026-11-14 and 2026-11-28
  assert.equal(pankajSlots[0].isoDate, '2026-11-14');
  assert.equal(pankajSlots[1].isoDate, '2026-11-28');

  const visitingDoc = doctors.find((d) => d.id === 'dr-muslima-ferdous-khan')!;
  assert.equal(getNextConsultationDates(visitingDoc, 6, mondayUtc).length, 0);
});

test('validateIndianMobile validates 10-digit numbers starting with 6-9 and optional +91 prefix', () => {
  assert.equal(validateIndianMobile('8486966659').valid, true);
  assert.equal(validateIndianMobile('+91 70021 73638').valid, true);
  assert.equal(validateIndianMobile('5486966659').valid, false);
});

test('generateRequestId produces MMH-YYMMDD-XXXX format', () => {
  const mondayUtc = new Date('2026-11-02T08:00:00Z');
  const reqId = generateRequestId(mondayUtc);
  assert.match(reqId, /^MMH-261102-[A-Z0-9]{4}$/);
});

test('filterDoctors matches name, aliases, speciality, and conditions including Bengali text', () => {
  const byCondition = filterDoctors(doctors, {
    query: 'Sciatica',
    category: 'All',
    availableTodayOnly: false,
    todayCode: 'MON',
  });
  assert.equal(byCondition.length, 1);
  assert.equal(byCondition[0].name, 'Dr. Sridham Sutradhar');

  const byBengali = filterDoctors(doctors, {
    query: 'কিডনি',
    category: 'All',
    availableTodayOnly: false,
    todayCode: 'MON',
  });
  assert.equal(byBengali.length, 1);
  assert.equal(byBengali[0].name, 'Dr. Pankaj Kanti Das');

  const byNewDoctor = filterDoctors(doctors, {
    query: 'Faruk Ahmed Laskar',
    category: 'All',
    availableTodayOnly: false,
    todayCode: 'MON',
  });
  assert.equal(byNewDoctor.length, 1);
  assert.equal(byNewDoctor[0].consultationFee, '₹500');
});

test('buildAppointmentSummary includes updated schedule and consultation fee in payload', () => {
  const summary = buildAppointmentSummary({
    requestId: 'MMH-261102-TEST',
    doctorName: 'Dr. Sridham Sutradhar',
    doctorCategory: 'Neurosurgery',
    doctorSchedule: 'Every Sunday · From 11:00 AM',
    consultationFee: '₹600',
    preferredDate: 'Sun, 8 Nov',
    isApproximateDate: false,
    patientName: 'Rahul Das',
    mobile: '+91 98765 43210',
  });
  assert.ok(summary.includes('Schedule / Timing: Every Sunday · From 11:00 AM'));
  assert.ok(summary.includes('Consultation Fee: ₹600'));
});

test('getDoctorInitials and URL builders work accurately', () => {
  assert.equal(getDoctorInitials('Dr. Faruk Ahmed Laskar'), 'FL');
  assert.equal(getDoctorInitials('Dr. Ismat Ahmed'), 'IA');

  const links = buildCommunicationLinks({
    whatsappNumber: '917002173638',
    email: 'mazumdermedicalhall7@gmail.com',
    smsNumber: '+917002173638',
    subject: 'Test Subject',
    message: 'Hello clinic',
  });
  assert.equal(
    links.whatsappUrl,
    'https://wa.me/917002173638?text=Hello%20clinic'
  );

  const upi = buildUpiLink({
    id: 'clinic@upi',
    payeeName: 'MAZUMDER Medical Hall',
    amount: 500,
    note: 'Doctor consultation',
  });
  assert.equal(
    upi,
    'upi://pay?pa=clinic@upi&pn=MAZUMDER%20Medical%20Hall&am=500&cu=INR&tn=Doctor%20consultation'
  );
});
