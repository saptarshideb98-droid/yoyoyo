import { LanguageCode } from '../data/tests';

export interface Translations {
  nav: {
    doctors: string;
    book: string;
    tests: string;
    pay: string;
    contact: string;
    bookAppointment: string;
    call: string;
    whatsapp: string;
    whatsappUs: string;
    language: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    resetDefaults: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
    bookAppointment: string;
    bookTest: string;
    callNow: string;
    consultingToday: string;
    istLabel: string;
    feeLabel: string;
    timeConfirm: string;
    viewAllDoctors: string;
    moreToday: string;
    timingsNote: string;
    noConsultingToday: string;
    doctorsCountLabel: string;
    doctorsCountSub: string;
    specialitiesCountLabel: string;
    specialitiesCountSub: string;
    underOneRoofTitle: string;
    underOneRoofSub: string;
    quickBookDoctor: string;
    quickBookTest: string;
    quickPayUpi: string;
    quickContact: string;
  };
  doctors: {
    title: string;
    subtitle: string;
    showing: string;
    of: string;
    specialists: string;
    searchPlaceholder: string;
    availableToday: string;
    allFilter: string;
    noMatchTitle: string;
    noMatchSub: string;
    showAllDoctors: string;
    feePrefix: string;
    consultationFee: string;
    areasOfExpertise: string;
    conditionsTreated: string;
    showFewer: string;
    moreItems: string;
    viewConditions: string;
    bookAppointment: string;
    timePleaseCall: string;
  };
  tests: {
    title: string;
    subtitle: string;
    bookAnAppointment: string;
    searchPlaceholder: string;
    allCategories: string;
    investigationsCount: string;
    availableInvestigations: string;
    viewDetails: string;
    bookThisTest: string;
    enquireWhatsapp: string;
    callNow: string;
    checkAvailability: string;
    selectedForEnquiry: string;
    selectForEnquiry: string;
    selectedTestsBar: string;
    proceedToEnquiry: string;
    clearSelection: string;
    modalPreparationTitle: string;
    modalIncludedTitle: string;
    modalClose: string;
    needDifferentTest: string;
  };
  book: {
    title: string;
    subtitle: string;
    howItWorksTitle: string;
    step1: string;
    step2: string;
    step3: string;
    emergencyNote: string;
    tabDoctor: string;
    tabTest: string;
    doctorLabel: string;
    scheduleLabel: string;
    consultationFeeLabel: string;
    preferredDate: string;
    preferredDateApprox: string;
    confirmVisitDateNote: string;
    preferredTime: string;
    morning: string;
    afternoon: string;
    evening: string;
    patientName: string;
    patientNamePlaceholder: string;
    mobileNumber: string;
    mobilePlaceholder: string;
    age: string;
    agePlaceholder: string;
    reasonForVisit: string;
    optional: string;
    reasonPlaceholder: string;
    reasonHint: string;
    selectedTestsLabel: string;
    additionalInvestigationsLabel: string;
    prescribingDoctor: string;
    prescribingDoctorPlaceholder: string;
    additionalMessage: string;
    additionalMessagePlaceholder: string;
    prescriptionHelper: string;
    consentText: string;
    submitDoctorRequest: string;
    submitTestRequest: string;
    submitting: string;
    requestReceivedTitle: string;
    requestIncompleteTitle: string;
    requestIncompleteSub: string;
    clinicWillConfirm: string;
    requestSummaryLabel: string;
    sendOnWhatsapp: string;
    sendByEmail: string;
    sendBySms: string;
    messageOnWhatsapp: string;
    startAnotherRequest: string;
    editRequestDetails: string;
    payForThisRequest: string;
  };
  pay: {
    title: string;
    subtitle: string;
    scanToPayTitle: string;
    scanToPayInstruction: string;
    upiIdLabel: string;
    copyUpiId: string;
    copied: string;
    downloadQr: string;
    payUsingUpi: string;
    payeeNameLabel: string;
    merchantIdLabel: string;
    paymentDetailsTitle: string;
    linkedEnquiryLabel: string;
    amountLabel: string;
    payingForLabel: string;
    purposeDoctor: string;
    purposeTest: string;
    purposeMedicines: string;
    purposeOther: string;
    patientNameLabel: string;
    mobileLabel: string;
    utrTitle: string;
    utrLabel: string;
    utrPlaceholder: string;
    sendPaymentVerification: string;
    verificationSubmittedBanner: string;
    manualVerificationWarning: string;
    acceptedAppsNote: string;
  };
  pharmacy: {
    title: string;
    description: string;
    sendOnWhatsapp: string;
    call: string;
  };
  commitment: {
    title: string;
    accurateDiagnosis: string;
    personalizedCare: string;
    betterHealth: string;
    advancedTechnology: string;
    closingLine: string;
  };
  contact: {
    title: string;
    subtitle: string;
    clinicAddress: string;
    tapToCall: string;
    emailLabel: string;
    hoursLabel: string;
    pleaseCallTimings: string;
    getDirections: string;
    sendMessageTitle: string;
    sendMessageSub: string;
    yourName: string;
    messageLabel: string;
    messagePlaceholder: string;
    whatsappBtn: string;
    smsBtn: string;
    emailBtn: string;
  };
  footer: {
    quickLinks: string;
    contactUs: string;
    disclaimer: string;
    rightsReserved: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    nav: {
      doctors: 'Doctors',
      book: 'Book',
      tests: 'Diagnostics',
      pay: 'Make Payment',
      contact: 'Contact',
      bookAppointment: 'Book Appointment',
      call: 'Call',
      whatsapp: 'WhatsApp',
      whatsappUs: 'WhatsApp Us',
      language: 'Language',
      theme: 'Appearance',
      lightMode: 'Light',
      darkMode: 'Dark',
      resetDefaults: 'Reset to Default',
    },
    hero: {
      tagline: 'Your Health, Our Priority',
      subtitle:
        'Specialist consultations, diagnostic tests and pharmacy care together on N.S. Road, Hailakandi.',
      bookAppointment: 'Book Appointment',
      bookTest: 'Book a Test',
      callNow: 'Call Now',
      consultingToday: 'Consulting today',
      istLabel: 'Hailakandi (IST)',
      feeLabel: 'Fee',
      timeConfirm: 'Time: please call to confirm',
      viewAllDoctors: 'View all doctors',
      moreToday: 'more today',
      timingsNote: 'Timings can change, please confirm by phone.',
      noConsultingToday:
        "Please call the clinic to check today's doctor schedule.",
      doctorsCountLabel: 'Doctors',
      doctorsCountSub: 'Visiting and regular specialists',
      specialitiesCountLabel: 'Specialities',
      specialitiesCountSub: 'Multi-speciality clinical care',
      underOneRoofTitle: 'Pharmacy and diagnostics under one roof',
      underOneRoofSub: 'Consultations, lab tests and medicines',
      quickBookDoctor: 'Book a Doctor',
      quickBookTest: 'Book a Test',
      quickPayUpi: 'Make Payment (UPI)',
      quickContact: 'Contact Us',
    },
    doctors: {
      title: 'Our Doctors',
      subtitle:
        'All consultations take place at MAZUMDER Medical Hall, N.S. Road, Hailakandi.',
      showing: 'Showing',
      of: 'of',
      specialists: 'specialists',
      searchPlaceholder:
        'Search by doctor name, speciality or condition (e.g. Diabetes, Child, Skin)...',
      availableToday: 'Available today',
      allFilter: 'All',
      noMatchTitle: 'No matching doctors found',
      noMatchSub:
        'Try clearing your search or switching the speciality filter.',
      showAllDoctors: 'Show all doctors',
      feePrefix: 'Fee',
      consultationFee: 'Consultation Fee',
      areasOfExpertise: 'Areas of Expertise:',
      conditionsTreated: 'Conditions Treated:',
      showFewer: 'Show fewer details',
      moreItems: 'more',
      viewConditions: 'View treated conditions',
      bookAppointment: 'Book Appointment',
      timePleaseCall: 'Time: please call to confirm',
    },
    tests: {
      title: 'Diagnostic & Clinical Services',
      subtitle:
        'Comprehensive laboratory investigations, sonography, and clinical diagnostic procedures at N.S. Road, Hailakandi.',
      bookAnAppointment: 'Book an Appointment',
      searchPlaceholder:
        'Search any blood test, urine test, sonography, ECG, endoscopy...',
      allCategories: 'All Categories',
      investigationsCount: 'Investigations',
      availableInvestigations: 'Available Investigations & Procedures:',
      viewDetails: 'View Details',
      bookThisTest: 'Book This Test',
      enquireWhatsapp: 'Enquire on WhatsApp',
      callNow: 'Call Now',
      checkAvailability: 'Check Availability',
      selectedForEnquiry: 'Selected for Enquiry',
      selectForEnquiry: 'Select for Multi-Test Enquiry',
      selectedTestsBar: 'test(s) selected for enquiry',
      proceedToEnquiry: 'Proceed to Book / Enquire',
      clearSelection: 'Clear',
      modalPreparationTitle: 'Preparation & Guidance',
      modalIncludedTitle: 'Investigations in this Category',
      modalClose: 'Close',
      needDifferentTest:
        'Need a different investigation? Call or WhatsApp us to check availability.',
    },
    book: {
      title: 'Book an Appointment or Diagnostic Enquiry',
      subtitle:
        'Submit your appointment or diagnostic test enquiry below. Our team will contact you to confirm the timing.',
      howItWorksTitle: 'How booking works',
      step1: 'Send your enquiry or appointment request.',
      step2: 'The clinic confirms availability and timing by phone or WhatsApp.',
      step3: 'Visit the clinic at the confirmed time.',
      emergencyNote:
        'Online requests are for appointments and test enquiries only, not emergencies. In an emergency call 112 (emergency) or 108 (ambulance), or go to the nearest hospital.',
      tabDoctor: 'Doctor Appointment',
      tabTest: 'Diagnostic Test Enquiry',
      doctorLabel: 'Doctor',
      scheduleLabel: 'Schedule:',
      consultationFeeLabel: 'Consultation Fee:',
      preferredDate: 'Preferred Date',
      preferredDateApprox: 'Preferred Date (approximate)',
      confirmVisitDateNote: 'The clinic will confirm the exact visit date.',
      preferredTime: 'Preferred Time',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      patientName: 'Patient Name',
      patientNamePlaceholder: 'Enter patient full name',
      mobileNumber: 'Contact Number',
      mobilePlaceholder: '10-digit mobile number',
      age: 'Age',
      agePlaceholder: 'Yrs',
      reasonForVisit: 'Reason for visit / Additional Message',
      optional: '(optional)',
      reasonPlaceholder: 'Short note (e.g. routine check-up, follow-up)',
      reasonHint: 'Please do not share detailed confidential medical history here.',
      selectedTestsLabel: 'Selected Test Category / Categories',
      additionalInvestigationsLabel: 'Selected Specific Investigations',
      prescribingDoctor: 'Prescribing Doctor',
      prescribingDoctorPlaceholder: "Doctor's name",
      additionalMessage: 'Additional Message / Specific Tests',
      additionalMessagePlaceholder:
        'List specific tests from your prescription or any question for our lab team',
      prescriptionHelper:
        "Please bring your doctor's prescription if you have one. Some tests require fasting; our team will guide you when confirming your enquiry.",
      consentText:
        'I agree to be contacted on this number regarding my enquiry. Submitting an enquiry does not automatically confirm an appointment until accepted by the clinic.',
      submitDoctorRequest: 'Submit Appointment Request',
      submitTestRequest: 'Submit Diagnostic Enquiry',
      submitting: 'Preparing enquiry...',
      requestReceivedTitle:
        'Enquiry Submitted — Pending Clinic Confirmation',
      requestIncompleteTitle:
        'Enquiry Summary Ready — Send to Clinic to Complete',
      requestIncompleteSub:
        'Please note: Your enquiry is recorded below, and an appointment is confirmed only after our clinic team accepts and confirms it with you. Tap WhatsApp, Email, or SMS below to send your enquiry.',
      clinicWillConfirm:
        'The clinic will review your enquiry and confirm by phone or WhatsApp.',
      requestSummaryLabel: 'Enquiry Summary',
      sendOnWhatsapp: 'Send on WhatsApp',
      sendByEmail: 'Send by Email',
      sendBySms: 'Send by SMS',
      messageOnWhatsapp: 'Message us on WhatsApp',
      startAnotherRequest: 'Submit another enquiry',
      editRequestDetails: 'Edit enquiry details',
      payForThisRequest: 'Proceed to Make Payment (UPI)',
    },
    pay: {
      title: 'Make Payment',
      subtitle:
        'Scan the official HDFC Bank SmartHub Vyapar QR code or use our verified UPI ID to make a payment.',
      scanToPayTitle: 'Scan to Pay with Any UPI App',
      scanToPayInstruction:
        'Open Google Pay, PhonePe, Paytm, BHIM, or your bank UPI app and scan the official QR code below, or copy the UPI ID.',
      upiIdLabel: 'Official Clinic UPI ID',
      copyUpiId: 'Copy UPI ID',
      copied: 'Copied!',
      downloadQr: 'Download QR Code',
      payUsingUpi: 'Pay Using UPI App',
      payeeNameLabel: 'Merchant Name',
      merchantIdLabel: 'Merchant ID',
      paymentDetailsTitle: 'Associate Payment with Booking / Enquiry',
      linkedEnquiryLabel: 'Linked Enquiry / Booking Reference (optional)',
      amountLabel: 'Amount (₹)',
      payingForLabel: 'Paying For',
      purposeDoctor: 'Doctor Consultation',
      purposeTest: 'Diagnostic / Lab Test',
      purposeMedicines: 'Pharmacy / Medicines',
      purposeOther: 'Other Clinical Service',
      patientNameLabel: 'Patient Name',
      mobileLabel: 'Contact Number',
      utrTitle: 'Submit UPI Transaction Reference for Manual Verification',
      utrLabel: 'UPI Transaction Reference / UTR Number (optional)',
      utrPlaceholder: 'Enter 12-digit UPI Ref / UTR number after payment',
      sendPaymentVerification: 'Send Payment Details on WhatsApp for Verification',
      verificationSubmittedBanner:
        'Note: Submitting a reference or screenshot does not automatically mark payment as completed. Our clinic administrator manually verifies every transaction against the bank statement.',
      manualVerificationWarning:
        'Important Verification Policy: Payments are not marked successful automatically upon clicking a button. Every UPI transfer is verified manually by the authorized administrator of MAZUMDER Medical Hall.',
      acceptedAppsNote:
        'Supported on Google Pay, PhonePe, Paytm, BHIM, RuPay, and all UPI-enabled banking apps.',
    },
    pharmacy: {
      title: 'Pharmacy',
      description:
        'Medicines and healthcare essentials at N.S. Road. Send your prescription or medicine list on WhatsApp to check availability.',
      sendOnWhatsapp: 'Send on WhatsApp',
      call: 'Call',
    },
    commitment: {
      title: 'Our Commitment',
      accurateDiagnosis: 'Accurate Diagnosis',
      personalizedCare: 'Personalized Care',
      betterHealth: 'Better Health',
      advancedTechnology: 'Advanced Technology',
      closingLine: 'Your Health Is Our Commitment.',
    },
    contact: {
      title: 'Visit and Contact',
      subtitle:
        'Find us on N.S. Road, Hailakandi or reach out by phone, WhatsApp, SMS or email.',
      clinicAddress: 'Clinic Address',
      tapToCall: 'Tap a number to call the clinic:',
      emailLabel: 'Email',
      hoursLabel: 'Hours',
      pleaseCallTimings: 'Please call to confirm timings',
      getDirections: 'Get Directions',
      sendMessageTitle: 'Send us a message',
      sendMessageSub:
        'Type your question below and choose how you would like to send it.',
      yourName: 'Your name',
      messageLabel: 'Message',
      messagePlaceholder:
        'Write your enquiry about doctor timings, diagnostic tests or medicine availability...',
      whatsappBtn: 'WhatsApp',
      smsBtn: 'SMS',
      emailBtn: 'Email',
    },
    footer: {
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      disclaimer:
        'Information on this website is for general guidance and does not replace professional medical advice. Doctor schedules can change, so please confirm by phone.',
      rightsReserved: 'All rights reserved.',
    },
  },
  hi: {
    nav: {
      doctors: 'डॉक्टर',
      book: 'बुकिंग',
      tests: 'जांच सेवाएं',
      pay: 'भुगतान करें',
      contact: 'संपर्क',
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      call: 'कॉल करें',
      whatsapp: 'व्हाट्सएप',
      whatsappUs: 'व्हाट्सएप करें',
      language: 'भाषा',
      theme: 'मोड',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
      resetDefaults: 'डिफ़ॉल्ट रीसेट करें',
    },
    hero: {
      tagline: 'आपका स्वास्थ्य, हमारी प्राथमिकता',
      subtitle:
        'एन.एस. रोड, हैलाकांडी में विशेषज्ञ डॉक्टर परामर्श, डायग्नोस्टिक जांच और फार्मेसी सेवाएं एक ही स्थान पर।',
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      bookTest: 'जांच बुक करें',
      callNow: 'अभी कॉल करें',
      consultingToday: 'आज उपलब्ध डॉक्टर',
      istLabel: 'हैलाकांडी (IST)',
      feeLabel: 'शुल्क',
      timeConfirm: 'समय: कृपया फोन कर पुष्टि करें',
      viewAllDoctors: 'सभी डॉक्टर देखें',
      moreToday: 'अन्य आज उपलब्ध',
      timingsNote: 'समय बदल सकता है, कृपया फोन करके पुष्टि करें।',
      noConsultingToday:
        'आज के डॉक्टर समय की जानकारी के लिए कृपया क्लिनिक में कॉल करें।',
      doctorsCountLabel: 'डॉक्टर',
      doctorsCountSub: 'विशेषज्ञ और नियमित चिकित्सक',
      specialitiesCountLabel: 'विशेषज्ञताएं',
      specialitiesCountSub: 'मल्टी-स्पेशियलिटी चिकित्सा देखभाल',
      underOneRoofTitle: 'फार्मेसी और डायग्नोस्टिक्स एक ही छत के नीचे',
      underOneRoofSub: 'परामर्श, लैब जांच और दवाइयां',
      quickBookDoctor: 'डॉक्टर बुक करें',
      quickBookTest: 'जांच बुक करें',
      quickPayUpi: 'UPI भुगतान करें',
      quickContact: 'संपर्क करें',
    },
    doctors: {
      title: 'हमारे डॉक्टर',
      subtitle:
        'सभी परामर्श MAZUMDER Medical Hall, एन.एस. रोड, हैलाकांडी में होते हैं।',
      showing: 'दिखाए जा रहे हैं',
      of: 'कुल',
      specialists: 'विशेषज्ञों में से',
      searchPlaceholder:
        'डॉक्टर का नाम, विशेषज्ञता या बीमारी खोजें (जैसे Diabetes, Child, Skin)...',
      availableToday: 'आज उपलब्ध',
      allFilter: 'सभी',
      noMatchTitle: 'कोई डॉक्टर नहीं मिला',
      noMatchSub: 'कृपया अपनी खोज साफ़ करें या अन्य श्रेणी चुनें।',
      showAllDoctors: 'सभी डॉक्टर दिखाएं',
      feePrefix: 'शुल्क',
      consultationFee: 'परामर्श शुल्क',
      areasOfExpertise: 'विशेषज्ञता के क्षेत्र:',
      conditionsTreated: 'उपचारित रोग:',
      showFewer: 'कम विवरण दिखाएं',
      moreItems: 'और देखें',
      viewConditions: 'उपचारित रोग देखें',
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      timePleaseCall: 'समय: कृपया फोन कर पुष्टि करें',
    },
    tests: {
      title: 'डायग्नोस्टिक और क्लिनिकल सेवाएं',
      subtitle:
        'एन.एस. रोड, हैलाकांडी में रक्त जांच, मूत्र/मल जांच, सोनोग्राफी, ईसीजी और एंडोस्कोपी सेवाएं।',
      bookAnAppointment: 'अपॉइंटमेंट बुक करें',
      searchPlaceholder:
        'कोई भी रक्त जांच, यूरिन टेस्ट, सोनोग्राफी, ECG, एंडोस्कोपी खोजें...',
      allCategories: 'सभी श्रेणियां',
      investigationsCount: 'जांच सेवाएं',
      availableInvestigations: 'उपलब्ध जांच और प्रक्रियाएं:',
      viewDetails: 'विवरण देखें',
      bookThisTest: 'यह जांच बुक करें',
      enquireWhatsapp: 'व्हाट्सएप पर पूछें',
      callNow: 'अभी कॉल करें',
      checkAvailability: 'उपलब्धता जांचें',
      selectedForEnquiry: 'पूछताछ के लिए चयनित',
      selectForEnquiry: 'चयन करें',
      selectedTestsBar: 'जांच पूछताछ के लिए चयनित',
      proceedToEnquiry: 'बुकिंग / पूछताछ फॉर्म खोलें',
      clearSelection: 'साफ़ करें',
      modalPreparationTitle: 'तैयारी और निर्देश',
      modalIncludedTitle: 'इस श्रेणी में उपलब्ध जांच',
      modalClose: 'बंद करें',
      needDifferentTest:
        'किसी अन्य जांच की आवश्यकता है? उपलब्धता जानने के लिए हमें कॉल या व्हाट्सएप करें।',
    },
    book: {
      title: 'अपॉइंटमेंट या डायग्नोस्टिक जांच पूछताछ',
      subtitle:
        'नीचे अपना अनुरोध भेजें। हमारी क्लिनिक टीम फोन या व्हाट्सएप द्वारा समय की पुष्टि करेगी।',
      howItWorksTitle: 'बुकिंग कैसे काम करती है',
      step1: 'अपना अनुरोध या जांच पूछताछ भेजें।',
      step2: 'क्लिनिक फोन या व्हाट्सएप द्वारा समय की पुष्टि करता है।',
      step3: 'पुष्टि किए गए समय पर क्लिनिक पधारें।',
      emergencyNote:
        'ऑनलाइन अनुरोध केवल अपॉइंटमेंट और जांच पूछताछ के लिए हैं, आपातकाल के लिए नहीं। आपातकालीन स्थिति में 112 या 108 पर कॉल करें या नजदीकी अस्पताल जाएं।',
      tabDoctor: 'डॉक्टर अपॉइंटमेंट',
      tabTest: 'डायग्नोस्टिक जांच पूछताछ',
      doctorLabel: 'डॉक्टर',
      scheduleLabel: 'समय-सारणी:',
      consultationFeeLabel: 'परामर्श शुल्क:',
      preferredDate: 'पसंदीदा तारीख',
      preferredDateApprox: 'पसंदीदा तारीख (अनुमानित)',
      confirmVisitDateNote: 'क्लिनिक द्वारा दौरे की तारीख की पुष्टि की जाएगी।',
      preferredTime: 'पसंदीदा समय',
      morning: 'सुबह (Morning)',
      afternoon: 'दोपहर (Afternoon)',
      evening: 'शाम (Evening)',
      patientName: 'मरीज का नाम',
      patientNamePlaceholder: 'मरीज का पूरा नाम लिखें',
      mobileNumber: 'मोबाइल नंबर',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
      age: 'उम्र',
      agePlaceholder: 'वर्ष',
      reasonForVisit: 'परामर्श का कारण / अतिरिक्त संदेश',
      optional: '(वैकल्पिक)',
      reasonPlaceholder: 'संक्षिप्त विवरण (जैसे सामान्य जांच, फॉलो-अप)',
      reasonHint: 'कृपया यहां विस्तृत गोपनीय मेडिकल हिस्ट्री साझा न करें।',
      selectedTestsLabel: 'चयनित जांच श्रेणी',
      additionalInvestigationsLabel: 'चयनित विशेष जांच',
      prescribingDoctor: 'डॉक्टर का नाम (पर्चा)',
      prescribingDoctorPlaceholder: 'सलाह देने वाले डॉक्टर का नाम',
      additionalMessage: 'अतिरिक्त संदेश / विशेष जांच के नाम',
      additionalMessagePlaceholder:
        'पर्चे से विशेष जांच का नाम या अपना प्रश्न यहां लिखें',
      prescriptionHelper:
        'यदि आपके पास डॉक्टर का पर्चा है तो कृपया साथ लाएं। कुछ जांचों के लिए खाली पेट रहना आवश्यक है; हमारी टीम पुष्टि करते समय मार्गदर्शन करेगी।',
      consentText:
        'मैं अपने अनुरोध के संबंध में इस नंबर पर संपर्क किए जाने के लिए सहमत हूं। केवल अनुरोध भेजने से अपॉइंटमेंट स्वतः कन्फर्म नहीं होता जब तक क्लिनिक इसकी पुष्टि न करे।',
      submitDoctorRequest: 'अपॉइंटमेंट अनुरोध भेजें',
      submitTestRequest: 'जांच पूछताछ भेजें',
      submitting: 'अनुरोध तैयार किया जा रहा है...',
      requestReceivedTitle: 'अनुरोध प्राप्त हुआ — क्लिनिक पुष्टि की प्रतीक्षा',
      requestIncompleteTitle:
        'आपका अनुरोध विवरण तैयार है — पूरा करने के लिए नीचे भेजें',
      requestIncompleteSub:
        'कृपया ध्यान दें: यह केवल एक पूछताछ अनुरोध है। जब तक क्लिनिक टीम फोन या व्हाट्सएप पर पुष्टि नहीं करती, तब तक अपॉइंटमेंट कन्फर्म नहीं माना जाएगा।',
      clinicWillConfirm:
        'क्लिनिक फोन या व्हाट्सएप द्वारा आपके समय की पुष्टि करेगा।',
      requestSummaryLabel: 'अनुरोध विवरण',
      sendOnWhatsapp: 'व्हाट्सएप पर भेजें',
      sendByEmail: 'ईमेल द्वारा भेजें',
      sendBySms: 'SMS द्वारा भेजें',
      messageOnWhatsapp: 'व्हाट्सएप पर संदेश भेजें',
      startAnotherRequest: 'नया अनुरोध शुरू करें',
      editRequestDetails: 'विवरण संपादित करें',
      payForThisRequest: 'UPI भुगतान अनुभाग पर जाएं',
    },
    pay: {
      title: 'ऑनलाइन भुगतान करें (UPI QR)',
      subtitle:
        'आधिकारिक HDFC Bank SmartHub Vyapar QR कोड स्कैन करें या हमारी सत्यापित UPI ID का उपयोग करें।',
      scanToPayTitle: 'स्कैन करें और भुगतान करें (Scan to Pay)',
      scanToPayInstruction:
        'Google Pay, PhonePe, Paytm, BHIM या किसी भी बैंक UPI ऐप से नीचे दिए गए आधिकारिक QR कोड को स्कैन करें।',
      upiIdLabel: 'आधिकारिक क्लिनिक UPI ID',
      copyUpiId: 'UPI ID कॉपी करें',
      copied: 'कॉपी हो गया!',
      downloadQr: 'QR कोड डाउनलोड करें',
      payUsingUpi: 'UPI ऐप से भुगतान करें',
      payeeNameLabel: 'मर्चेंट का नाम',
      merchantIdLabel: 'मर्चेंट आईडी',
      paymentDetailsTitle: 'बुकिंग / पूछताछ के साथ भुगतान विवरण जोड़ें',
      linkedEnquiryLabel: 'बुकिंग / अनुरोध आईडी (वैकल्पिक)',
      amountLabel: 'राशि (₹)',
      payingForLabel: 'भुगतान का उद्देश्य',
      purposeDoctor: 'डॉक्टर परामर्श',
      purposeTest: 'डायग्नोस्टिक / लैब जांच',
      purposeMedicines: 'फार्मेसी / दवाइयां',
      purposeOther: 'अन्य सेवा',
      patientNameLabel: 'मरीज का नाम',
      mobileLabel: 'मोबाइल नंबर',
      utrTitle: 'सत्यापन के लिए UPI ट्रांजेक्शन रेफरेंस (UTR) भेजें',
      utrLabel: 'UPI ट्रांजेक्शन आईडी / UTR नंबर (वैकल्पिक)',
      utrPlaceholder: 'भुगतान के बाद 12 अंकों का UTR नंबर दर्ज करें',
      sendPaymentVerification: 'सत्यापन के लिए व्हाट्सएप पर भुगतान विवरण भेजें',
      verificationSubmittedBanner:
        'नोट: केवल बटन दबाने या स्क्रीनशॉट भेजने से भुगतान स्वतः सफल नहीं माना जाता। क्लिनिक प्रशासन द्वारा बैंक खाते से मैन्युअल रूप से भुगतान की पुष्टि की जाती है।',
      manualVerificationWarning:
        'महत्वपूर्ण सूचना: किसी भी भुगतान की पुष्टि अधिकृत व्यवस्थापक (Administrator) द्वारा मैन्युअल सत्यापन के बाद ही की जाती है।',
      acceptedAppsNote:
        'Google Pay, PhonePe, Paytm, BHIM, RuPay और सभी UPI ऐप्स स्वीकार्य हैं।',
    },
    pharmacy: {
      title: 'फार्मेसी (Pharmacy)',
      description:
        'एन.एस. रोड में दवाइयां और स्वास्थ्य संबंधी आवश्यक सामग्री। दवाइयों की उपलब्धता जानने के लिए व्हाट्सएप पर अपना पर्चा भेजें।',
      sendOnWhatsapp: 'व्हाट्सएप पर भेजें',
      call: 'कॉल करें',
    },
    commitment: {
      title: 'हमारी प्रतिबद्धता',
      accurateDiagnosis: 'Accurate Diagnosis',
      personalizedCare: 'Personalized Care',
      betterHealth: 'Better Health',
      advancedTechnology: 'Advanced Technology',
      closingLine: 'Your Health Is Our Commitment.',
    },
    contact: {
      title: 'पता और संपर्क',
      subtitle:
        'एन.एस. रोड, हैलाकांडी में हमसे मिलें या फोन, व्हाट्सएप, SMS या ईमेल द्वारा संपर्क करें।',
      clinicAddress: 'क्लिनिक का पता',
      tapToCall: 'क्लिनिक में कॉल करने के लिए नंबर पर टैप करें:',
      emailLabel: 'ईमेल',
      hoursLabel: 'समय',
      pleaseCallTimings: 'कृपया समय की पुष्टि के लिए कॉल करें',
      getDirections: 'दिशा-निर्देश प्राप्त करें (Google Maps)',
      sendMessageTitle: 'हमें संदेश भेजें',
      sendMessageSub:
        'नीचे अपना प्रश्न लिखें और चुनें कि आप इसे कैसे भेजना चाहते हैं।',
      yourName: 'आपका नाम',
      messageLabel: 'संदेश',
      messagePlaceholder:
        'डॉक्टर के समय, डायग्नोस्टिक जांच या दवाइयों की उपलब्धता के बारे में अपना प्रश्न लिखें...',
      whatsappBtn: 'व्हाट्सएप',
      smsBtn: 'SMS',
      emailBtn: 'ईमेल',
    },
    footer: {
      quickLinks: 'त्वरित लिंक',
      contactUs: 'संपर्क करें',
      disclaimer:
        'इस वेबसाइट पर दी गई जानकारी सामान्य मार्गदर्शन के लिए है और यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है। डॉक्टर का समय बदल सकता है, कृपया फोन द्वारा पुष्टि करें।',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
    },
  },
  bn: {
    nav: {
      doctors: 'ডাক্তারবৃন্দ',
      book: 'বুকিং',
      tests: 'ডায়াগনস্টিকস',
      pay: 'পেমেন্ট করুন',
      contact: 'যোগাযোগ',
      bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      call: 'কল করুন',
      whatsapp: 'হোয়াটসঅ্যাপ',
      whatsappUs: 'হোয়াটসঅ্যাপ করুন',
      language: 'ভাষা',
      theme: 'থিম',
      lightMode: 'লাইট',
      darkMode: 'ডার্ক',
      resetDefaults: 'ডিফল্ট রিসেট করুন',
    },
    hero: {
      tagline: 'আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার',
      subtitle:
        'হাইলাকান্দির এন.এস. রোডে বিশেষজ্ঞ ডাক্তারের পরামর্শ, ডায়াগনস্টিক পরীক্ষা এবং ফার্মেসি পরিষেবা একই ছাদের নিচে।',
      bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      bookTest: 'টেস্ট বুক করুন',
      callNow: 'এখনই কল করুন',
      consultingToday: 'আজ উপস্থিত ডাক্তারবৃন্দ',
      istLabel: 'হাইলাকান্দি (IST)',
      feeLabel: 'ফি',
      timeConfirm: 'সময়: ফোনে নিশ্চিত করুন',
      viewAllDoctors: 'সব ডাক্তার দেখুন',
      moreToday: 'জন আরও আজ উপলব্ধ',
      timingsNote: 'সময় পরিবর্তন হতে পারে, অনুগ্রহ করে ফোনে নিশ্চিত করুন।',
      noConsultingToday:
        'আজকের ডাক্তারদের সময়সূচী জানতে অনুগ্রহ করে ক্লিনিকে কল করুন।',
      doctorsCountLabel: 'জন ডাক্তার',
      doctorsCountSub: 'বিশেষজ্ঞ এবং নিয়মিত চিকিৎসক',
      specialitiesCountLabel: 'টি বিভাগ',
      specialitiesCountSub: 'মাল্টি-স্পেশালিটি চিকিৎসা সেবা',
      underOneRoofTitle: 'ফার্মেসি এবং ডায়াগনস্টিকস একই ছাদের নিচে',
      underOneRoofSub: 'ডাক্তার পরামর্শ, ল্যাব টেস্ট ও ওষুধ',
      quickBookDoctor: 'ডাক্তার বুক করুন',
      quickBookTest: 'টেস্ট বুক করুন',
      quickPayUpi: 'UPI পেমেন্ট করুন',
      quickContact: 'যোগাযোগ করুন',
    },
    doctors: {
      title: 'আমাদের ডাক্তারবৃন্দ',
      subtitle:
        'সকল পরামর্শ MAZUMDER Medical Hall, এন.এস. রোড, হাইলাকান্দিতে অনুষ্ঠিত হয়।',
      showing: 'দেখানো হচ্ছে',
      of: 'মোট',
      specialists: 'জন বিশেষজ্ঞের মধ্যে',
      searchPlaceholder:
        'ডাক্তারের নাম, বিভাগ বা রোগের নাম দিয়ে খুঁজুন (যেমন Diabetes, Child, Skin)...',
      availableToday: 'আজ উপলব্ধ',
      allFilter: 'সকল বিভাগ',
      noMatchTitle: 'কোনো ডাক্তার পাওয়া যায়নি',
      noMatchSub: 'অনুগ্রহ করে আপনার সার্চ পরিবর্তন করুন বা সব বিভাগ দেখুন।',
      showAllDoctors: 'সব ডাক্তার দেখান',
      feePrefix: 'ফি',
      consultationFee: 'পরামর্শ ফি',
      areasOfExpertise: 'বিশেষজ্ঞতার ক্ষেত্রসমূহ:',
      conditionsTreated: 'চিকিৎসাকৃত রোগসমূহ:',
      showFewer: 'সংক্ষিপ্ত করুন',
      moreItems: 'টি আরও',
      viewConditions: 'চিকিৎসাকৃত রোগ দেখুন',
      bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      timePleaseCall: 'সময়: অনুগ্রহ করে ফোনে নিশ্চিত করুন',
    },
    tests: {
      title: 'ডায়াগনস্টিক ও ক্লিনিক্যাল পরিষেবা',
      subtitle:
        'এন.এস. রোড, হাইলাকান্দিতে রক্ত পরীক্ষা, প্রস্রাব ও মল পরীক্ষা, সোনোগ্রাফি, ইসিজি এবং এন্ডোস্কোপি পরিষেবা।',
      bookAnAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      searchPlaceholder:
        'যেকোনো রক্ত পরীক্ষা, ইউরিন টেস্ট, সোনোগ্রাফি, ECG বা এন্ডোস্কোপি খুঁজুন...',
      allCategories: 'সকল বিভাগ',
      investigationsCount: 'টি পরীক্ষা',
      availableInvestigations: 'উপলব্ধ পরীক্ষা এবং পদ্ধতিসমূহ:',
      viewDetails: 'বিস্তারিত দেখুন',
      bookThisTest: 'এই টেস্ট বুক করুন',
      enquireWhatsapp: 'হোয়াটসঅ্যাপে জানুন',
      callNow: 'এখনই কল করুন',
      checkAvailability: 'উপলব্ধতা যাচাই করুন',
      selectedForEnquiry: 'অনুসন্ধানের জন্য নির্বাচিত',
      selectForEnquiry: 'নির্বাচন করুন',
      selectedTestsBar: 'টি পরীক্ষা অনুসন্ধানের জন্য নির্বাচিত',
      proceedToEnquiry: 'বুকিং / অনুসন্ধান ফর্মে যান',
      clearSelection: 'মুছে ফেলুন',
      modalPreparationTitle: 'প্রস্তুতি ও নির্দেশিকা',
      modalIncludedTitle: 'এই বিভাগের অন্তর্ভুক্ত পরীক্ষাসমূহ',
      modalClose: 'বন্ধ করুন',
      needDifferentTest:
        'অন্য কোনো পরীক্ষার প্রয়োজন? উপলব্ধতা জানতে আমাদের কল বা হোয়াটসঅ্যাপ করুন।',
    },
    book: {
      title: 'অ্যাপয়েন্টমেন্ট বা ডায়াগনস্টিক টেস্ট অনুসন্ধান',
      subtitle:
        'নিচে আপনার অনুরোধ জমা দিন। আমাদের ক্লিনিক টিম ফোন বা হোয়াটসঅ্যাপের মাধ্যমে সময় নিশ্চিত করবে।',
      howItWorksTitle: 'বুকিং প্রক্রিয়া',
      step1: 'আপনার অনুরোধ বা টেস্ট অনুসন্ধান পাঠান।',
      step2: 'ক্লিনিক ফোন বা হোয়াটসঅ্যাপে সময় নিশ্চিত করবে।',
      step3: 'নিশ্চিতকৃত সময়ে ক্লিনিকে আসুন।',
      emergencyNote:
        'অনলাইন অনুরোধ শুধুমাত্র অ্যাপয়েন্টমেন্ট এবং টেস্ট অনুসন্ধানের জন্য, জরুরি অবস্থার জন্য নয়। জরুরি অবস্থায় ১১২ বা ১০৮ নম্বরে কল করুন অথবা নিকটস্থ হাসপাতালে যান।',
      tabDoctor: 'ডাক্তার অ্যাপয়েন্টমেন্ট',
      tabTest: 'ডায়াগনস্টিক টেস্ট অনুসন্ধান',
      doctorLabel: 'ডাক্তার',
      scheduleLabel: 'সময়সূচী:',
      consultationFeeLabel: 'পরামর্শ ফি:',
      preferredDate: 'পছন্দের তারিখ',
      preferredDateApprox: 'পছন্দের তারিখ (আনুমানিক)',
      confirmVisitDateNote: 'ক্লিনিক আপনার সাক্ষাতের তারিখ নিশ্চিত করবে।',
      preferredTime: 'পছন্দের সময়',
      morning: 'সকাল (Morning)',
      afternoon: 'দুপুর (Afternoon)',
      evening: 'সন্ধ্যা (Evening)',
      patientName: 'রোগীর নাম',
      patientNamePlaceholder: 'রোগীর সম্পূর্ণ নাম লিখুন',
      mobileNumber: 'মোবাইল নম্বর',
      mobilePlaceholder: '১০ সংখ্যার মোবাইল নম্বর',
      age: 'বয়স',
      agePlaceholder: 'বছর',
      reasonForVisit: 'পরামর্শের কারণ / অতিরিক্ত বার্তা',
      optional: '(ঐচ্ছিক)',
      reasonPlaceholder: 'সংক্ষিপ্ত নোট (যেমন রুটিন চেক-আপ, ফলো-আপ)',
      reasonHint: 'অনুগ্রহ করে এখানে বিস্তারিত গোপনীয় চিকিৎসা ইতিহাস লিখবেন না।',
      selectedTestsLabel: 'নির্বাচিত টেস্ট বিভাগ',
      additionalInvestigationsLabel: 'নির্বাচিত নির্দিষ্ট পরীক্ষাসমূহ',
      prescribingDoctor: 'প্রেসক্রাইবিং ডাক্তার',
      prescribingDoctorPlaceholder: 'ডাক্তারের নাম',
      additionalMessage: 'অতিরিক্ত বার্তা / নির্দিষ্ট পরীক্ষার নাম',
      additionalMessagePlaceholder:
        'প্রেসক্রিপশন থেকে নির্দিষ্ট পরীক্ষার নাম বা আপনার প্রশ্ন লিখুন',
      prescriptionHelper:
        'ডাক্তারের প্রেসক্রিপশন থাকলে অনুগ্রহ করে সাথে আনুন। কিছু পরীক্ষার জন্য খালি পেটে থাকা প্রয়োজন; আমাদের টিম নিশ্চিত করার সময় আপনাকে গাইড করবে।',
      consentText:
        'আমার অনুরোধের বিষয়ে এই নম্বরে যোগাযোগ করার জন্য আমি সম্মত। শুধুমাত্র অনুসন্ধান জমা দিলেই অ্যাপয়েন্টমেন্ট নিশ্চিত হয় না যতক্ষণ না ক্লিনিক তা গ্রহণ করে।',
      submitDoctorRequest: 'অ্যাপয়েন্টমেন্ট অনুরোধ পাঠান',
      submitTestRequest: 'টেস্ট অনুসন্ধান পাঠান',
      submitting: 'অনুরোধ তৈরি হচ্ছে...',
      requestReceivedTitle:
        'অনুসন্ধান জমা হয়েছে — ক্লিনিকের নিশ্চিতকরণের অপেক্ষায়',
      requestIncompleteTitle:
        'অনুসন্ধানের বিবরণ প্রস্তুত — সম্পূর্ণ করতে নিচে পাঠান',
      requestIncompleteSub:
        'অনুগ্রহ করে লক্ষ্য করুন: এটি একটি অনুসন্ধান অনুরোধ মাত্র। ক্লিনিক টিম ফোন বা হোয়াটসঅ্যাপে নিশ্চিত করার পরেই অ্যাপয়েন্টমেন্ট চূড়ান্ত হবে।',
      clinicWillConfirm:
        'ক্লিনিক ফোন বা হোয়াটসঅ্যাপের মাধ্যমে আপনার সময় নিশ্চিত করবে।',
      requestSummaryLabel: 'অনুরোধের বিবরণ',
      sendOnWhatsapp: 'হোয়াটসঅ্যাপে পাঠান',
      sendByEmail: 'ইমেইলে পাঠান',
      sendBySms: 'SMS-এ পাঠান',
      messageOnWhatsapp: 'হোয়াটসঅ্যাপে মেসেজ করুন',
      startAnotherRequest: 'নতুন অনুরোধ করুন',
      editRequestDetails: 'বিবরণ সম্পাদনা করুন',
      payForThisRequest: 'UPI পেমেন্ট বিভাগে যান',
    },
    pay: {
      title: 'অনলাইন পেমেন্ট করুন (UPI QR)',
      subtitle:
        'অফিসিয়াল HDFC Bank SmartHub Vyapar QR কোড স্ক্যান করুন অথবা আমাদের যাচাইকৃত UPI ID ব্যবহার করুন।',
      scanToPayTitle: 'স্ক্যান করে পেমেন্ট করুন (Scan to Pay)',
      scanToPayInstruction:
        'Google Pay, PhonePe, Paytm, BHIM বা যেকোনো ব্যাংক UPI অ্যাপ খুলে নিচের অফিসিয়াল QR কোডটি স্ক্যান করুন অথবা UPI ID কপি করুন।',
      upiIdLabel: 'অফিসিয়াল ক্লিনিক UPI ID',
      copyUpiId: 'UPI ID কপি করুন',
      copied: 'কপি হয়েছে!',
      downloadQr: 'QR কোড ডাউনলোড করুন',
      payUsingUpi: 'UPI অ্যাপ দিয়ে পেমেন্ট করুন',
      payeeNameLabel: 'মার্চেন্টের নাম',
      merchantIdLabel: 'মার্চেন্ট আইডি',
      paymentDetailsTitle: 'বুকিং / অনুসন্ধানের সাথে পেমেন্ট যুক্ত করুন',
      linkedEnquiryLabel: 'লিঙ্কড বুকিং / অনুসন্ধান আইডি (ঐচ্ছিক)',
      amountLabel: 'পরিমাণ (₹)',
      payingForLabel: 'পেমেন্টের উদ্দেশ্য',
      purposeDoctor: 'ডাক্তার পরামর্শ',
      purposeTest: 'ডায়াগনস্টিক / ল্যাব টেস্ট',
      purposeMedicines: 'ফার্মেসি / ওষুধ',
      purposeOther: 'অন্যান্য পরিষেবা',
      patientNameLabel: 'রোগীর নাম',
      mobileLabel: 'মোবাইল নম্বর',
      utrTitle: 'যাচাইকরণের জন্য UPI ট্রানজেকশন রেফারেন্স (UTR) পাঠান',
      utrLabel: 'UPI ট্রানজেকশন রেফারেন্স / UTR নম্বর (ঐচ্ছিক)',
      utrPlaceholder: 'পেমেন্টের পর ১২ সংখ্যার UTR নম্বর লিখুন',
      sendPaymentVerification:
        'যাচাইকরণের জন্য হোয়াটসঅ্যাপে পেমেন্টের বিবরণ পাঠান',
      verificationSubmittedBanner:
        'দ্রষ্টব্য: শুধুমাত্র বাটনে ক্লিক করলে বা স্ক্রিনশট পাঠালে পেমেন্ট স্বয়ংক্রিয়ভাবে সফল হিসেবে চিহ্নিত হয় না। ক্লিনিক অ্যাডমিনিস্ট্রেটর ব্যাংক স্টেটমেন্টের সাথে প্রতিটি পেমেন্ট ম্যানুয়ালি যাচাই করেন।',
      manualVerificationWarning:
        'গুরুত্বপূর্ণ যাচাইকরণ নীতি: কোনো পেমেন্ট স্বয়ংক্রিয়ভাবে নিশ্চিত করা হয় না। MAZUMDER Medical Hall-এর অনুমোদিত প্রশাসক দ্বারা প্রতিটি লেনদেন ম্যানুয়ালি যাচাই করা হয়।',
      acceptedAppsNote:
        'Google Pay, PhonePe, Paytm, BHIM, RuPay এবং সকল UPI অ্যাপ সমর্থিত।',
    },
    pharmacy: {
      title: 'ফার্মেসি (Pharmacy)',
      description:
        'এন.এস. রোডে ওষুধ এবং স্বাস্থ্যসেবা সামগ্রী। ওষুধের প্রাপ্যতা জানতে আপনার প্রেসক্রিপশন বা ওষুধের তালিকা হোয়াটসঅ্যাপে পাঠান।',
      sendOnWhatsapp: 'হোয়াটসঅ্যাপে পাঠান',
      call: 'কল করুন',
    },
    commitment: {
      title: 'আমাদের অঙ্গীকার',
      accurateDiagnosis: 'Accurate Diagnosis',
      personalizedCare: 'Personalized Care',
      betterHealth: 'Better Health',
      advancedTechnology: 'Advanced Technology',
      closingLine: 'Your Health Is Our Commitment.',
    },
    contact: {
      title: 'ঠিকানা ও যোগাযোগ',
      subtitle:
        'এন.এস. রোড, হাইলাকান্দিতে আমাদের ক্লিনিকে আসুন অথবা ফোন, হোয়াটসঅ্যাপ, SMS বা ইমেইলে যোগাযোগ করুন।',
      clinicAddress: 'ক্লিনিকের ঠিকানা',
      tapToCall: 'ক্লিনিকে কল করতে নম্বরে ট্যাপ করুন:',
      emailLabel: 'ইমেইল',
      hoursLabel: 'সময়সূচী',
      pleaseCallTimings: 'সময় জানতে অনুগ্রহ করে কল করুন',
      getDirections: 'দিকনির্দেশ পান (Google Maps)',
      sendMessageTitle: 'আমাদের বার্তা পাঠান',
      sendMessageSub:
        'নিচে আপনার প্রশ্ন লিখুন এবং কীভাবে পাঠাতে চান তা নির্বাচন করুন।',
      yourName: 'আপনার নাম',
      messageLabel: 'বার্তা',
      messagePlaceholder:
        'ডাক্তারের সময়, ডায়াগনস্টিক টেস্ট বা ওষুধের প্রাপ্যতা সম্পর্কে আপনার প্রশ্ন লিখুন...',
      whatsappBtn: 'হোয়াটসঅ্যাপ',
      smsBtn: 'SMS',
      emailBtn: 'ইমেইল',
    },
    footer: {
      quickLinks: 'দ্রুত লিঙ্ক',
      contactUs: 'যোগাযোগ করুন',
      disclaimer:
        'এই ওয়েবসাইটের তথ্য শুধুমাত্র সাধারণ নির্দেশনার জন্য এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়। ডাক্তারদের সময়সূচী পরিবর্তিত হতে পারে, তাই অনুগ্রহ করে ফোনে নিশ্চিত করুন।',
      rightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
    },
  },
};
