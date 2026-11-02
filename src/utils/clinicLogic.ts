import { Doctor, WeekdayCode } from '../data/doctors';

const WEEKDAY_MAP: Record<string, WeekdayCode> = {
  Sun: 'SUN',
  Mon: 'MON',
  Tue: 'TUE',
  Wed: 'WED',
  Thu: 'THU',
  Fri: 'FRI',
  Sat: 'SAT',
};

export interface KolkataDateParts {
  year: string;
  month: string;
  day: string;
  dayOfMonth: number;
  nthWeekdayOfMonth: number;
  weekdayCode: WeekdayCode;
  isoDate: string;
  yymmdd: string;
}

export function getKolkataDateParts(now: Date = new Date()): KolkataDateParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  const parts = formatter.formatToParts(now);
  let year = '';
  let month = '';
  let day = '';
  let weekdayShort = 'Mon';

  for (const part of parts) {
    if (part.type === 'year') year = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'day') day = part.value;
    if (part.type === 'weekday') weekdayShort = part.value;
  }

  const weekdayCode: WeekdayCode = WEEKDAY_MAP[weekdayShort] ?? 'MON';
  const dayOfMonth = Number(day) || 1;
  const nthWeekdayOfMonth = Math.ceil(dayOfMonth / 7);
  const isoDate = `${year}-${month}-${day}`;
  const yymmdd = `${year.slice(-2)}${month}${day}`;

  return {
    year,
    month,
    day,
    dayOfMonth,
    nthWeekdayOfMonth,
    weekdayCode,
    isoDate,
    yymmdd,
  };
}

export function isDoctorAvailableOnDay(
  doctor: Doctor,
  weekdayCode: WeekdayCode,
  nthWeekdayOfMonth?: number
): boolean {
  if (!doctor.days || doctor.days.length === 0) return false;
  if (!doctor.days.includes(weekdayCode)) return false;
  if (doctor.nthWeekdays && doctor.nthWeekdays.length > 0) {
    if (typeof nthWeekdayOfMonth !== 'number') return false;
    return doctor.nthWeekdays.includes(nthWeekdayOfMonth);
  }
  return true;
}

export function getConsultingTodayDoctors(
  doctorsList: Doctor[],
  now: Date = new Date()
): Doctor[] {
  const { weekdayCode, nthWeekdayOfMonth } = getKolkataDateParts(now);
  return doctorsList
    .filter((doc) =>
      isDoctorAvailableOnDay(doc, weekdayCode, nthWeekdayOfMonth)
    )
    .sort((a, b) => {
      const aHasTime = typeof a.startMinutes === 'number';
      const bHasTime = typeof b.startMinutes === 'number';
      if (aHasTime && bHasTime) {
        return (a.startMinutes as number) - (b.startMinutes as number);
      }
      if (aHasTime && !bHasTime) return -1;
      if (!aHasTime && bHasTime) return 1;
      return 0;
    });
}

export interface ConsultationDateSlot {
  isoDate: string;
  label: string;
  weekdayCode: WeekdayCode;
  isToday: boolean;
}

export function getNextConsultationDates(
  doctor: Doctor,
  count = 6,
  now: Date = new Date()
): ConsultationDateSlot[] {
  if (!doctor.days || doctor.days.length === 0) {
    return [];
  }

  const slots: ConsultationDateSlot[] = [];
  const startParts = getKolkataDateParts(now);
  // Create a UTC noon anchor corresponding to the Kolkata calendar date so adding 24h steps cleanly across days
  const baseUtcNoon = new Date(
    Date.UTC(
      Number(startParts.year),
      Number(startParts.month) - 1,
      Number(startParts.day),
      12,
      0,
      0
    )
  );

  const labelFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  // Search up to 120 days ahead so monthly/bi-monthly schedules (e.g. 2nd & 4th Saturday) also yield 6 slots
  for (let offset = 0; offset < 120 && slots.length < count; offset++) {
    const candidate = new Date(baseUtcNoon.getTime() + offset * 86400000);
    const weekdayShort = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      weekday: 'short',
    }).format(candidate);
    const weekdayCode = WEEKDAY_MAP[weekdayShort] ?? 'MON';
    const candidateDayOfMonth = candidate.getUTCDate();
    const candidateNthWeekday = Math.ceil(candidateDayOfMonth / 7);

    if (isDoctorAvailableOnDay(doctor, weekdayCode, candidateNthWeekday)) {
      const yyyy = candidate.getUTCFullYear();
      const mm = String(candidate.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(candidateDayOfMonth).padStart(2, '0');
      const isoDate = `${yyyy}-${mm}-${dd}`;
      const formatted = labelFormatter.format(candidate);
      slots.push({
        isoDate,
        label: offset === 0 ? `Today (${formatted})` : formatted,
        weekdayCode,
        isToday: offset === 0,
      });
    }
  }

  return slots;
}

export function getDateBoundsKolkata(
  daysAhead = 30,
  now: Date = new Date()
): { minDate: string; maxDate: string } {
  const startParts = getKolkataDateParts(now);
  const baseUtcNoon = new Date(
    Date.UTC(
      Number(startParts.year),
      Number(startParts.month) - 1,
      Number(startParts.day),
      12,
      0,
      0
    )
  );
  const maxCandidate = new Date(baseUtcNoon.getTime() + daysAhead * 86400000);
  const yyyy = maxCandidate.getUTCFullYear();
  const mm = String(maxCandidate.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(maxCandidate.getUTCDate()).padStart(2, '0');
  return {
    minDate: startParts.isoDate,
    maxDate: `${yyyy}-${mm}-${dd}`,
  };
}

export function getDoctorInitials(name: string): string {
  const withoutPrefix = name.replace(/^Dr\.?\s*/i, '').trim();
  const parts = withoutPrefix.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'DR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0][0] ?? 'D';
  const last = parts[parts.length - 1][0] ?? 'R';
  return `${first}${last}`.toUpperCase();
}

export interface DoctorFilterOptions {
  query: string;
  category: string;
  availableTodayOnly: boolean;
  todayCode: WeekdayCode;
  nthWeekdayOfMonth?: number;
}

export function filterDoctors(
  doctorsList: Doctor[],
  options: DoctorFilterOptions
): Doctor[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  return doctorsList.filter((doc) => {
    if (options.category !== 'All' && doc.category !== options.category) {
      return false;
    }

    if (
      options.availableTodayOnly &&
      !isDoctorAvailableOnDay(
        doc,
        options.todayCode,
        options.nthWeekdayOfMonth
      )
    ) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableFields: string[] = [
      doc.name,
      ...(doc.aliases ?? []),
      doc.category,
      doc.specialtyBadge ?? '',
      doc.title,
      doc.titleBengali ?? '',
      doc.qualifications,
      doc.institution ?? '',
      doc.designation ?? '',
      doc.daysLabel,
      doc.consultationFee,
      ...(doc.expertise ?? []),
      ...(doc.conditions ?? []),
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(normalizedQuery)
    );
  });
}

export interface MobileValidationResult {
  valid: boolean;
  cleaned: string;
  error?: string;
}

export function validateIndianMobile(input: string): MobileValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      valid: false,
      cleaned: '',
      error: 'Please enter a 10-digit mobile number.',
    };
  }

  const compact = trimmed.replace(/[\s-]/g, '');
  let digits = compact;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    return {
      valid: false,
      cleaned: digits,
      error:
        'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9 (optional +91 prefix).',
    };
  }

  return {
    valid: true,
    cleaned: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
  };
}

export function generateRequestId(
  now: Date = new Date(),
  customSuffix?: string
): string {
  const { yymmdd } = getKolkataDateParts(now);
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = customSuffix ?? '';
  if (!suffix || suffix.length !== 4) {
    suffix = '';
    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * alphabet.length);
      suffix += alphabet[idx];
    }
  }
  return `MMH-${yymmdd}-${suffix.toUpperCase()}`;
}

export interface AppointmentRequestInput {
  requestId: string;
  doctorName: string;
  doctorCategory: string;
  doctorSchedule?: string;
  consultationFee?: string;
  preferredDate: string;
  isApproximateDate: boolean;
  patientName: string;
  mobile: string;
  age?: string;
  reason?: string;
}

export function buildAppointmentSummary(input: AppointmentRequestInput): string {
  const lines = [
    `Appointment Request - MAZUMDER Medical Hall`,
    `Request ID: ${input.requestId}`,
    `Doctor: ${input.doctorName} (${input.doctorCategory})`,
  ];
  if (input.doctorSchedule && input.doctorSchedule.trim()) {
    lines.push(`Schedule / Timing: ${input.doctorSchedule.trim()}`);
  }
  if (input.consultationFee && input.consultationFee.trim()) {
    lines.push(`Consultation Fee: ${input.consultationFee.trim()}`);
  }
  lines.push(
    `Preferred Date${input.isApproximateDate ? ' (approximate)' : ''}: ${input.preferredDate}`,
    `Patient Name: ${input.patientName}`,
    `Mobile: ${input.mobile}`
  );
  if (input.age && input.age.trim()) {
    lines.push(`Age: ${input.age.trim()}`);
  }
  if (input.reason && input.reason.trim()) {
    lines.push(`Reason for visit: ${input.reason.trim()}`);
  }
  lines.push(`Please confirm my appointment timing.`);
  return lines.join('\n');
}

export interface TestRequestInput {
  requestId: string;
  tests: string[];
  preferredDate: string;
  preferredTime?: string;
  patientName: string;
  mobile: string;
  age?: string;
  prescribingDoctor?: string;
  notes?: string;
}

export function buildTestSummary(input: TestRequestInput): string {
  const lines = [
    `Diagnostic Test Request - MAZUMDER Medical Hall`,
    `Request ID: ${input.requestId}`,
    `Test(s): ${input.tests.join(', ')}`,
    `Preferred Date: ${input.preferredDate}`,
  ];
  if (input.preferredTime && input.preferredTime.trim()) {
    lines.push(`Preferred Time: ${input.preferredTime.trim()}`);
  }
  lines.push(`Patient Name: ${input.patientName}`);
  lines.push(`Mobile: ${input.mobile}`);
  if (input.age && input.age.trim()) {
    lines.push(`Age: ${input.age.trim()}`);
  }
  if (input.prescribingDoctor && input.prescribingDoctor.trim()) {
    lines.push(`Prescribing Doctor: ${input.prescribingDoctor.trim()}`);
  }
  if (input.notes && input.notes.trim()) {
    lines.push(`Notes: ${input.notes.trim()}`);
  }
  lines.push(`Please confirm my diagnostic test request.`);
  return lines.join('\n');
}

export function buildCommunicationLinks(params: {
  whatsappNumber: string;
  email: string;
  smsNumber: string;
  subject: string;
  message: string;
}): {
  whatsappUrl: string;
  mailtoUrl: string;
  smsUrl: string;
} {
  const encodedMsg = encodeURIComponent(params.message);
  const encodedSubj = encodeURIComponent(params.subject);
  return {
    whatsappUrl: `https://wa.me/${params.whatsappNumber}?text=${encodedMsg}`,
    mailtoUrl: `mailto:${params.email}?subject=${encodedSubj}&body=${encodedMsg}`,
    smsUrl: `sms:${params.smsNumber}?&body=${encodedMsg}`,
  };
}

export function buildUpiLink(params: {
  id: string;
  payeeName: string;
  amount: number | string;
  note: string;
}): string {
  const cleanAmount = Number(params.amount);
  const formattedAmount =
    Number.isFinite(cleanAmount) && cleanAmount >= 1
      ? cleanAmount.toFixed(2).replace(/\.00$/, '')
      : '1';
  return `upi://pay?pa=${params.id}&pn=${encodeURIComponent(
    params.payeeName
  )}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent(params.note)}`;
}
