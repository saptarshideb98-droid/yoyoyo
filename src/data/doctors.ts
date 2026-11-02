export type WeekdayCode = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export type DoctorCategory =
  | 'General Medicine'
  | 'Paediatrics'
  | 'Gynaecology'
  | 'Orthopaedics'
  | 'Dermatology'
  | 'ENT'
  | 'Dental'
  | 'Neurosurgery'
  | 'Urology'
  | 'Psychiatry';

export const DOCTOR_CATEGORIES: DoctorCategory[] = [
  'General Medicine',
  'Paediatrics',
  'Gynaecology',
  'Orthopaedics',
  'Dermatology',
  'ENT',
  'Dental',
  'Neurosurgery',
  'Urology',
  'Psychiatry',
];

export const EVERY_DAY: WeekdayCode[] = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

export interface Doctor {
  id: string;
  name: string;
  aliases?: string[];
  category: DoctorCategory;
  specialtyBadge?: string;
  title: string;
  titleBengali?: string;
  qualifications: string;
  institution?: string;
  designation?: string;
  experience?: string;
  regNo?: string;
  badge?: string;
  days: WeekdayCode[];
  /** Optional Nth weekday of the month filter, e.g. [2, 4] for 2nd & 4th Saturday */
  nthWeekdays?: number[];
  daysLabel: string;
  time?: string;
  /** Start time in minutes from midnight (Asia/Kolkata) for sorting Consulting Today */
  startMinutes?: number;
  scheduleNote?: string;
  consultationFee: string;
  expertise: string[];
  conditions?: string[];
  photoUrl?: string;
}

export const doctors: Doctor[] = [
  {
    id: 'dr-pankaj-kanti-das',
    name: 'Dr. Pankaj Kanti Das',
    aliases: ['Dr. Pankaj Kanti Dey'],
    category: 'Urology',
    title: 'Urologist, Andrologist & Renal Transplant Surgeon',
    titleBengali: 'কিডনি ও মূত্র রোগ বিশেষজ্ঞ',
    qualifications: 'MBBS, MS, MCh (Urology), Gold Medalist',
    institution:
      'Institute of Post Graduate Medical Education & Research and SSKM Hospital',
    regNo: 'Regn. No. 22651 (AMC)',
    days: ['SAT'],
    nthWeekdays: [2, 4],
    daysLabel: '2nd & 4th Saturday',
    scheduleNote: '2nd & 4th Saturday (please call to confirm timing)',
    consultationFee: '₹700',
    expertise: [
      'Kidney stones | কিডনির পাথর',
      'Prostate and bladder tumour or cancer | প্রোস্টেট ও মূত্রাশয়ে টিউমার বা ক্যান্সার',
      'Urinary obstruction or infection, hernia | প্রস্রাবের বাধা বা সংক্রমণ, হার্নিয়া',
      'Kidney tumour and cyst | কিডনি টিউমার ও সিস্ট',
      'Prostate problems | প্রোস্টেট সমস্যা',
      'All other bladder problems | মূত্রাশয়ের অন্যান্য সব ধরনের সমস্যা',
      'Kidney or urinary cancer | কিডনি বা ইউরিনারি ক্যান্সার',
      'Kidney stone and infection | কিডনি স্টোন ও ইনফেকশন',
    ],
  },
  {
    id: 'dr-saptarshi-deshmukh',
    name: 'Dr. Saptarshi Deshmukh',
    category: 'Orthopaedics',
    title: 'Bone & Joint Specialist',
    qualifications: 'MBBS, MS (Ortho)',
    institution: 'Silchar Medical College',
    days: ['SUN'],
    daysLabel: 'Every Sunday',
    time: 'From 1:00 PM',
    startMinutes: 13 * 60,
    consultationFee: '₹500',
    expertise: [
      'Bones',
      'Joints',
      'Ligaments',
      'Tendons',
      'Muscles & Nerves',
      'Fractures',
      'Sports Injuries',
      'Arthritis',
      'Joint Replacement',
    ],
  },
  {
    id: 'dr-sarada-mazumdar',
    name: 'Dr. Sarada Mazumder',
    aliases: ['Dr. Sarada Mazumdar'],
    category: 'Paediatrics',
    title: 'Child Specialist',
    qualifications: 'MBBS, DCH, MD (Pediatrics)',
    institution: 'Assam Medical College, Dibrugarh',
    days: ['SUN'],
    daysLabel: 'Every Sunday',
    time: 'From 5:00 PM',
    startMinutes: 17 * 60,
    consultationFee: '₹500',
    expertise: [],
  },
  {
    id: 'dr-jabir-amin',
    name: 'Dr. Jabir Amin',
    category: 'Dental',
    title: 'Oral & Dental Surgeon',
    qualifications: 'BDS (Regional Dental College, Guwahati)',
    experience: '10+ years of experience',
    days: ['WED', 'SAT'],
    daysLabel: 'Wednesday & Saturday',
    consultationFee: '₹500',
    expertise: [
      'Full exams & X-ray',
      'Dental cleaning',
      'Fillings, RCT, Extractions',
      'Full and partial dentures',
      'Crowns & Bridges',
    ],
  },
  {
    id: 'dr-sandip-roy',
    name: 'Dr. Sandip Roy',
    category: 'Dermatology',
    title: 'Dermatology Specialist (Skin, Hair, Nail & Leprosy)',
    qualifications: 'MBBS (Guwahati Medical College), MD (Dermatology)',
    institution: 'Assam Medical College, Dibrugarh',
    days: ['SUN'],
    daysLabel: 'Every Sunday',
    consultationFee: '₹500',
    expertise: [
      'Skin, Hair & Nail Disorders',
      'Acne, Scars & Anti-Aging',
      'Psoriasis & Eczema',
      'Fungal & Bacterial Infections',
      'Skin Cancer',
      'Mucous Membrane Diseases',
      'Leprosy & Related Conditions',
    ],
  },
  {
    id: 'dr-sridham-sutradhar',
    name: 'Dr. Sridham Sutradhar',
    category: 'Neurosurgery',
    title: 'Neuro Super Specialist',
    qualifications:
      'MBBS, MS, MCh (Neurosurgery), Fellowship in Endoscopic Brain & Spine Surgery',
    designation:
      'Chief Consultant & Head, Department of Neurosurgery, Arogya Hospital',
    regNo: 'REG AMC 21736',
    days: ['SUN'],
    daysLabel: 'Every Sunday',
    time: 'From 11:00 AM',
    startMinutes: 11 * 60,
    consultationFee: '₹600',
    expertise: [
      'Head Injury',
      'Spine Injury',
      'Back Pain / Sciatica',
      'Neck Pain',
      'Brain Tumor',
      'Headache / Migraine',
      'Stroke / Paralysis',
      'Epilepsy / Seizure Disorder',
      'Hydrocephalus',
      'Tubercular Meningitis',
      'Vertigo / Tinnitus',
      'Peripheral Neuropathy',
      'Cerebral Aneurysm',
    ],
  },
  {
    id: 'dr-tirthankar-dey',
    name: 'Dr. Thirthankar Das',
    aliases: ['Dr. Tirthankar Dey', 'Dr. Thinthankar Das'],
    category: 'General Medicine',
    title: 'Senior Medical & Health Officer',
    qualifications: 'MBBS, MD (Medicine), SMCH',
    regNo: 'REGD NO. 19418 (AMC)',
    days: ['WED'],
    daysLabel: 'Every Wednesday',
    consultationFee: '₹500',
    expertise: [
      'Diabetes',
      'Hypertension',
      'Cholesterol',
      'Thyroid diseases',
      'Fever',
      'Arthritis',
      'Nerve diseases',
      'Sexual dysfunction',
      'Sleep disturbance',
      'Gas',
      'Liver diseases',
      'Medical emergencies (please call first)',
    ],
  },
  {
    id: 'dr-amlan-jyoti',
    name: 'Dr. Amlan Jyoti Nath',
    aliases: ['Dr. Amlan Jyoti'],
    category: 'ENT',
    title: 'ENT cum Head & Neck Surgeon',
    qualifications: 'MBBS, MS',
    designation: 'Senior Resident, Silchar Medical College',
    badge: 'ENT Endoscopy Available',
    days: ['WED', 'FRI'],
    daysLabel: 'Every Wednesday & Friday',
    consultationFee: '₹500',
    expertise: [
      'ENT Endoscopy (Nose, Throat, Larynx)',
      'Hearing Test & Hearing Loss Management',
      'Ear Infection & Ear Pain Treatment',
      'Sinusitis & Nasal Polyps Management',
      'Allergy Treatment',
      'Thyroid Disorders Treatment',
      'Head & Neck Mass Evaluation & Treatment',
      'Modern Medical & Surgical Management',
    ],
    conditions: [
      'Hearing loss, ear infections, balance disorders, nerve issues',
      'Sinusitis, allergies, nasal polyps, skull-base tumour',
      'Sore throats, hoarseness, GERD, swallowing disorders, vocal cord issues',
      'Head and neck: cancers, thyroid disorders, tonsil and neck masses, complex surgeries including reconstructive face/neck surgery, sinus procedures and ear tube placement',
    ],
  },
  {
    id: 'dr-tausif-md-sr-mazumder',
    name: 'Dr. Tousif MD SR Mazumder',
    aliases: ['Dr. Tausif Md S.R Mazumder'],
    category: 'General Medicine',
    title: 'Medicine & Diabetes Specialist',
    qualifications: 'MBBS, MD (Medicine)',
    institution: 'Silchar Medical College & Hospital',
    regNo: 'Reg. No. 27806 (Assam Medical Council)',
    days: ['SUN'],
    daysLabel: 'Every Sunday',
    consultationFee: '₹500',
    expertise: [
      'Diabetes',
      'Gas',
      'Liver diseases',
      'Hypertension',
      'Cholesterol',
      'Arthritis',
      'Kidney diseases',
      'Nerve diseases',
      'Thyroid disorder',
      'Fever profile',
      'Infectious disease',
    ],
  },
  {
    id: 'dr-gulshan-nazara',
    name: 'Dr. Gulsan Najara',
    aliases: ['Dr. Gulshan Nazara'],
    category: 'Gynaecology',
    title: 'Obstetrics & Gynaecology',
    qualifications: 'MBBS, MOBG',
    designation: 'M&H.O-1, S.K. Roy Civil Hospital, Hailakandi',
    days: EVERY_DAY,
    daysLabel: 'Everyday',
    time: 'From 1:00 PM',
    startMinutes: 13 * 60,
    consultationFee: '₹400',
    expertise: [],
  },
  {
    id: 'dr-muslima-ferdous-khan',
    name: 'Dr. Muslima Ferdous Khan',
    category: 'Gynaecology',
    title: 'Gynaecologist & Laparoscopic Surgeon (visiting from Guwahati)',
    qualifications:
      'MBBS, MS, DNB (Obstetrics and Gynaecology), Fellowship in OBS',
    regNo: 'Regd no. 25158 (AMC)',
    days: [],
    daysLabel: 'Visiting (Once a month / By Appointment)',
    scheduleNote:
      'Visiting (Once a month / By Appointment). Please call or WhatsApp for the next visit date.',
    consultationFee: 'On Inquiry / Standard',
    expertise: [
      'High Risk Pregnancy Care',
      'Normal & Caesarean Delivery',
      'Infertility Evaluation & Treatment',
      'PCOS / PCOD Management',
      'Menstrual Disorders',
      'Adolescent Gynaecology',
      'Menopause Management',
      'Family Planning & Contraception',
      'Cervical Screening (PAP Smear)',
      'Fibroids, Ovarian Cysts, Endometriosis',
      'Minimally Invasive Laparoscopic Surgeries',
      "Comprehensive Women's Health Care",
    ],
  },
  {
    id: 'dr-sanket-kanoo',
    name: 'Dr. Sanket Kanoo',
    category: 'Psychiatry',
    title: 'Consultant Psychiatrist (De-addiction)',
    qualifications: 'MBBS, MD (GMCH), Guwahati',
    days: EVERY_DAY,
    daysLabel: 'Everyday',
    time: 'From 1:00 PM',
    startMinutes: 13 * 60,
    consultationFee: '₹500',
    expertise: [
      'Depression',
      'Anxiety',
      'Schizophrenia',
      'Bipolar disorder',
      'Addictions',
      'Sleep disorders',
      'Difficulty managing or controlling emotions',
      'Complex, intense or long-term mental health conditions',
      'Mental disorders associated with the nervous system',
    ],
  },
  {
    id: 'dr-faruk-ahmed-laskar',
    name: 'Dr. Faruk Ahmed Laskar',
    category: 'General Medicine',
    specialtyBadge: 'Medical Consultant',
    title: 'Consultant Physician',
    qualifications: 'Medical Consultation',
    days: EVERY_DAY,
    daysLabel: 'Everyday',
    consultationFee: '₹500',
    expertise: [],
  },
  {
    id: 'dr-ismat-ahmed',
    name: 'Dr. Ismat Ahmed',
    category: 'General Medicine',
    specialtyBadge: 'Medical Consultant',
    title: 'Consultant Physician',
    qualifications: 'Medical Consultation',
    days: EVERY_DAY,
    daysLabel: 'Everyday',
    consultationFee: '₹500',
    expertise: [],
  },
];
