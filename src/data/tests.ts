export type LanguageCode = 'en' | 'hi' | 'bn';

export type TestIconName =
  | 'droplet'
  | 'beaker'
  | 'microscope'
  | 'waves'
  | 'activity'
  | 'stethoscope'
  | 'clipboard-list';

export type DiagnosticCategoryId =
  | 'blood-tests'
  | 'urine-tests'
  | 'stool-tests'
  | 'sonography'
  | 'other-diagnostic-services';

export interface LocalizedText {
  en: string;
  hi: string;
  bn: string;
}

export interface DiagnosticInvestigationItem {
  id: string;
  categoryId: DiagnosticCategoryId;
  name: LocalizedText;
  summary: LocalizedText;
  preparation: LocalizedText;
}

export interface DiagnosticCategory {
  id: DiagnosticCategoryId;
  icon: TestIconName;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  details: LocalizedText;
  preparationNote: LocalizedText;
  investigations: DiagnosticInvestigationItem[];
}

/** Legacy-compatible flat test interface used by quick selectors */
export interface DiagnosticTest {
  id: string;
  categoryId: DiagnosticCategoryId;
  name: string;
  nameLocalized: LocalizedText;
  description: string;
  descriptionLocalized: LocalizedText;
  preparationLocalized: LocalizedText;
  icon: TestIconName;
  investigations: DiagnosticInvestigationItem[];
}

export const diagnosticCategories: DiagnosticCategory[] = [
  {
    id: 'blood-tests',
    icon: 'droplet',
    title: {
      en: 'BLOOD TESTS',
      hi: 'रक्त जांच (Blood Tests)',
      bn: 'রক্ত পরীক্ষা (Blood Tests)',
    },
    shortTitle: {
      en: 'Blood Tests',
      hi: 'रक्त जांच',
      bn: 'রক্ত পরীক্ষা',
    },
    description: {
      en: 'CBC, Haemoglobin, ESR, Blood Grouping, Platelet Count, Blood Sugar (FBS, PPBS, RBS), HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, Vitamin B12, Vitamin D, Iron Profile, CRP, Dengue, Malaria, Widal, Hepatitis Screening, and other commonly available blood investigations.',
      hi: 'सीबीसी, हीमोग्लोबिन, ईएसआर, ब्लड ग्रुपिंग, प्लेटलेट काउंट, ब्लड शुगर (FBS, PPBS, RBS), HbA1c, लिपिड प्रोफाइल, लिवर फंक्शन टेस्ट, किडनी फंक्शन टेस्ट, थायरॉइड प्रोफाइल, विटामिन B12, विटामिन D, आयरन प्रोफाइल, सीआरपी, डेंगू, मलेरिया, विडाल, हेपेटाइटिस स्क्रीनिंग और अन्य सामान्य रक्त जांच।',
      bn: 'সিবিসি (CBC), হিমোগ্লোবিন, ইএসআর, ব্লাড গ্রুপিং, প্লেটলেট কাউন্ট, ব্লাড সুগার (FBS, PPBS, RBS), HbA1c, লিপিড প্রোফাইল, লিভার ফাংশন টেস্ট, কিডনি ফাংশন টেস্ট, থাইরয়েড প্রোফাইল, ভিটামিন B12, ভিটামিন D, আয়রন প্রোফাইল, সিআরপি, ডেঙ্গু, ম্যালেরিয়া, উইডাল, হেপাটাইটিস স্ক্রিনিং এবং অন্যান্য রক্ত পরীক্ষা।',
    },
    details: {
      en: 'Routine and specialized haematology, biochemistry, hormone, vitamin, and infectious disease blood sample investigations conducted as advised by your consulting doctor.',
      hi: 'चिकित्सक की सलाह के अनुसार सामान्य और विशेष हीमैटोलॉजी, बायोकेमिस्ट्री, हार्मोन, विटामिन और संक्रमण संबंधी रक्त जांच।',
      bn: 'চিকিৎসকের পরামর্শ অনুযায়ী রুটিন এবং বিশেষ হেমাটোলজি, বায়োকেমিস্ট্রি, হরমোন, ভিটামিন এবং সংক্রমণ সংক্রান্ত রক্ত পরীক্ষা।',
    },
    preparationNote: {
      en: 'Some blood tests (such as Fasting Blood Sugar and Lipid Profile) require 8–12 hours of fasting. Our clinic team will guide you when confirming your request.',
      hi: 'कुछ रक्त जांचों (जैसे फास्टिंग ब्लड शुगर और लिपिड प्रोफाइल) के लिए 8–12 घंटे खाली पेट रहना आवश्यक है। हमारी टीम पुष्टि करते समय आपको मार्गदर्शन देगी।',
      bn: 'কিছু রক্ত পরীক্ষার (যেমন ফাস্টিং ব্লাড সুগার এবং লিপিড প্রোফাইল) জন্য ৮–১২ ঘণ্টা খালি পেটে থাকা প্রয়োজন। আমাদের টিম বুকিং নিশ্চিত করার সময় আপনাকে জানিয়ে দেবে।',
    },
    investigations: [
      {
        id: 'blood-cbc',
        categoryId: 'blood-tests',
        name: { en: 'CBC (Complete Blood Count)', hi: 'सीबीसी (CBC - पूर्ण रक्त गणना)', bn: 'সিবিসি (CBC - কমপ্লিট ব্লাড কাউন্ট)' },
        summary: { en: 'Complete blood count evaluating red cells, white cells, haemoglobin and platelets.', hi: 'लाल रक्त कोशिकाओं, श्वेत रक्त कोशिकाओं, हीमोग्लोबिन और प्लेटलेट्स की जांच।', bn: 'লোহিত রক্তকণিকা, শ্বেত রক্তকণিকা, হিমোগ্লোবিন ও প্লেটলেটের সম্পূর্ণ পরীক্ষা।' },
        preparation: { en: 'No special fasting required unless combined with fasting tests.', hi: 'विशेष उपवास की आवश्यकता नहीं है।', bn: 'বিশেষ খালি পেটে থাকার প্রয়োজন নেই।' },
      },
      {
        id: 'blood-haemoglobin',
        categoryId: 'blood-tests',
        name: { en: 'Haemoglobin (Hb)', hi: 'हीमोग्लोबिन (Haemoglobin)', bn: 'হিমোগ্লোবিন (Haemoglobin)' },
        summary: { en: 'Blood haemoglobin level assessment for anaemia screening and monitoring.', hi: 'एनीमिया जांच और निगरानी के लिए रक्त में हीमोग्लोबिन स्तर की जांच।', bn: 'রক্তস্বল্পতা নির্ণয় ও পর্যবেক্ষণের জন্য হিমোগ্লোবিন পরীক্ষা।' },
        preparation: { en: 'Sample can be given at any time during clinic hours.', hi: 'क्लिनिक समय के दौरान कभी भी नमूना दिया जा सकता है।', bn: 'ক্লিনিক চলাকালীন যেকোনো সময় নমুনা দেওয়া যাবে।' },
      },
      {
        id: 'blood-esr',
        categoryId: 'blood-tests',
        name: { en: 'ESR (Erythrocyte Sedimentation Rate)', hi: 'ईएसआर (ESR)', bn: 'ইএসআর (ESR)' },
        summary: { en: 'Blood test to evaluate inflammation as advised by your physician.', hi: 'चिकित्सक की सलाह अनुसार सूजन का पता लगाने के लिए रक्त जांच।', bn: 'চিকিৎসকের পরামর্শ অনুযায়ী শরীরে প্রদাহ নির্ণয়ের রক্ত পরীক্ষা।' },
        preparation: { en: 'No fasting required.', hi: 'उपवास की आवश्यकता नहीं है।', bn: 'খালি পেটে থাকার প্রয়োজন নেই।' },
      },
      {
        id: 'blood-grouping',
        categoryId: 'blood-tests',
        name: { en: 'Blood Grouping & Rh Typing', hi: 'ब्लड ग्रुपिंग (ABO और Rh)', bn: 'ব্লাড গ্রুপিং (ABO এবং Rh)' },
        summary: { en: 'Determination of ABO blood group and Rh factor.', hi: 'ABO ब्लड ग्रुप और Rh फैक्टर की पहचान।', bn: 'ABO ব্লাড গ্রুপ এবং Rh ফ্যাক্টর নির্ণয়।' },
        preparation: { en: 'No fasting required.', hi: 'उपवास की आवश्यकता नहीं है।', bn: 'খালি পেটে থাকার প্রয়োজন নেই।' },
      },
      {
        id: 'blood-platelet',
        categoryId: 'blood-tests',
        name: { en: 'Platelet Count', hi: 'प्लेटलेट काउंट (Platelet Count)', bn: 'প্লেটলেট কাউন্ট (Platelet Count)' },
        summary: { en: 'Evaluation of blood platelet count for fever and clotting assessment.', hi: 'बुखार और रक्त के थक्के की जांच के लिए प्लेटलेट काउंट।', bn: 'জ্বর ও রক্ত জমাট বাঁধার ক্ষমতা মূল্যায়নের জন্য প্লেটলেট পরীক্ষা।' },
        preparation: { en: 'No fasting required.', hi: 'उपवास की आवश्यकता नहीं है।', bn: 'খালি পেটে থাকার প্রয়োজন নেই।' },
      },
      {
        id: 'blood-sugar',
        categoryId: 'blood-tests',
        name: { en: 'Blood Sugar (FBS, PPBS, RBS)', hi: 'ब्लड शुगर (FBS, PPBS, RBS)', bn: 'ব্লাড সুগার (FBS, PPBS, RBS)' },
        summary: { en: 'Fasting, Post-Prandial, and Random blood glucose testing for diabetes care.', hi: 'मधुमेह जांच के लिए फास्टिंग (खाली पेट), भोजन के बाद (PPBS) और रैंडम ब्लड शुगर।', bn: 'ডায়াবেটিস পরীক্ষার জন্য খালি পেটে (FBS), খাওয়ার পরে (PPBS) এবং র্যান্ডম ব্লাড সুগার।' },
        preparation: { en: 'FBS requires 8–10 hours overnight fasting; PPBS is taken 2 hours after a meal.', hi: 'FBS के लिए 8–10 घंटे खाली पेट; PPBS भोजन के 2 घंटे बाद।', bn: 'FBS-এর জন্য ৮–১০ ঘণ্টা খালি পেটে; PPBS খাবারের ২ ঘণ্টা পরে।' },
      },
      {
        id: 'blood-hba1c',
        categoryId: 'blood-tests',
        name: { en: 'HbA1c (Glycated Haemoglobin)', hi: 'एचबीए1सी (HbA1c)', bn: 'এইচবিএ১সি (HbA1c)' },
        summary: { en: 'Measures average blood glucose control over the past 2 to 3 months.', hi: 'पिछले 2 से 3 महीनों के औसत ब्लड शुगर स्तर की जांच।', bn: 'গত ২ থেকে ৩ মাসের গড় রক্তের শর্করার মাত্রা নির্ণয়।' },
        preparation: { en: 'Can be done without fasting.', hi: 'बिना उपवास के किया जा सकता है।', bn: 'খালি পেটে না থেকেও করা যায়।' },
      },
      {
        id: 'blood-lipid',
        categoryId: 'blood-tests',
        name: { en: 'Lipid Profile', hi: 'लिपिड प्रोफाइल (Lipid Profile)', bn: 'লিপিড প্রোফাইল (Lipid Profile)' },
        summary: { en: 'Cholesterol, Triglycerides, HDL, LDL and VLDL assessment.', hi: 'कोलेस्ट्रॉल, ट्राइग्लिसराइड्स, HDL और LDL की जांच।', bn: 'কোলেস্টেরল, ট্রাইগ্লিসারাইড, HDL এবং LDL পরীক্ষা।' },
        preparation: { en: '10–12 hours overnight fasting is usually recommended.', hi: '10–12 घंटे रात भर का उपवास अनुशंसित है।', bn: 'সাধারণত ১০–১২ ঘণ্টা খালি পেটে থাকা বাঞ্ছনীয়।' },
      },
      {
        id: 'blood-lft',
        categoryId: 'blood-tests',
        name: { en: 'Liver Function Test (LFT)', hi: 'लिवर फंक्शन टेस्ट (LFT)', bn: 'লিভার ফাংশন টেস্ট (LFT)' },
        summary: { en: 'Bilirubin, SGOT, SGPT, Alkaline Phosphatase and liver protein panel.', hi: 'बिलीरुबिन, SGOT, SGPT और लिवर प्रोटीन की जांच।', bn: 'বিলিরুবিন, SGOT, SGPT এবং লিভার প্রোটিন প্যানেল পরীক্ষা।' },
        preparation: { en: 'Please follow your doctor’s advice regarding fasting.', hi: 'उपवास के संबंध में अपने डॉक्टर की सलाह का पालन करें।', bn: 'খালি পেটে থাকার বিষয়ে আপনার ডাক্তারের পরামর্শ অনুসরণ করুন।' },
      },
      {
        id: 'blood-kft',
        categoryId: 'blood-tests',
        name: { en: 'Kidney Function Test (KFT)', hi: 'किडनी फंक्शन टेस्ट (KFT)', bn: 'কিডনি ফাংশন টেস্ট (KFT)' },
        summary: { en: 'Urea, Creatinine, Uric Acid and electrolytes evaluation for renal health.', hi: 'यूरिया, क्रिएटिनिन, यूरिक एसिड और इलेक्ट्रोलाइट्स की जांच।', bn: 'ইউরিয়া, ক্রিয়েটিনিন, ইউরিক অ্যাসিড এবং ইলেকট্রোলাইট পরীক্ষা।' },
        preparation: { en: 'Can be collected as advised by your doctor.', hi: 'डॉक्टर की सलाह अनुसार नमूना लिया जाता है।', bn: 'ডাক্তারের পরামর্শ অনুযায়ী নমুনা নেওয়া হয়।' },
      },
      {
        id: 'blood-thyroid',
        categoryId: 'blood-tests',
        name: { en: 'Thyroid Profile (T3, T4, TSH)', hi: 'थायरॉइड प्रोफाइल (T3, T4, TSH)', bn: 'থাইরয়েড প্রোফাইল (T3, T4, TSH)' },
        summary: { en: 'Comprehensive thyroid hormone evaluation (T3, T4, TSH).', hi: 'थायरॉइड हार्मोन (T3, T4, TSH) की संपूर्ण जांच।', bn: 'থাইরয়েড হরমোন (T3, T4, TSH) পরীক্ষা।' },
        preparation: { en: 'Morning sample preferred as advised by your doctor.', hi: 'सुबह का नमूना उपयुक्त रहता है।', bn: 'সকালের নমুনা দেওয়া সুবিধাজনক।' },
      },
      {
        id: 'blood-vit-b12-d',
        categoryId: 'blood-tests',
        name: { en: 'Vitamin B12, Vitamin D & Iron Profile', hi: 'विटामिन B12, विटामिन D और आयरन प्रोफाइल', bn: 'ভিটামিন B12, ভিটামিন D এবং আয়রন প্রোফাইল' },
        summary: { en: 'Nutritional deficiency and nerve/bone health blood panels.', hi: 'पोषण की कमी, नसों और हड्डियों के स्वास्थ्य के लिए रक्त जांच।', bn: 'পুষ্টির ঘাটতি এবং স্নায়ু ও হাড়ের স্বাস্থ্যের জন্য রক্ত পরীক্ষা।' },
        preparation: { en: 'Our team will guide you on sample timing when confirming.', hi: 'हमारी टीम पुष्टि करते समय आपको समय की जानकारी देगी।', bn: 'আমাদের টিম নিশ্চিত করার সময় আপনাকে সময় জানিয়ে দেবে।' },
      },
      {
        id: 'blood-fever-infectious',
        categoryId: 'blood-tests',
        name: { en: 'CRP, Dengue, Malaria, Widal & Hepatitis Screening', hi: 'सीआरपी, डेंगू, मलेरिया, विडाल और हेपेटाइटिस स्क्रीनिंग', bn: 'সিআরপি, ডেঙ্গু, ম্যালেরিয়া, উইডাল এবং হেপাটাইটিস স্ক্রিনিং' },
        summary: { en: 'Fever profile, infection markers (CRP) and viral/bacterial screening tests.', hi: 'बुखार प्रोफाइल, संक्रमण मार्कर (CRP) और वायरल/बैक्टीरियल जांच।', bn: 'জ্বর প্রোফাইল, সংক্রমণ মার্কার (CRP) এবং ভাইরাল/ব্যাকটেরিয়াল স্ক্রিনিং পরীক্ষা।' },
        preparation: { en: 'No fasting required.', hi: 'उपवास की आवश्यकता नहीं है।', bn: 'খালি পেটে থাকার প্রয়োজন নেই।' },
      },
      {
        id: 'blood-other',
        categoryId: 'blood-tests',
        name: { en: 'Other Commonly Available Blood Investigations', hi: 'अन्य उपलब्ध रक्त जांच', bn: 'অন্যান্য উপলব্ধ রক্ত পরীক্ষা' },
        summary: { en: 'Share your doctor’s prescription on WhatsApp or call us to check any specific blood test.', hi: 'किसी भी विशेष रक्त जांच के लिए व्हाट्सएप पर पर्चा भेजें या कॉल करें।', bn: 'যেকোনো নির্দিষ্ট রক্ত পরীক্ষার জন্য হোয়াটসঅ্যাপে প্রেসক্রিপশন পাঠান বা কল করুন।' },
        preparation: { en: 'Please bring your doctor’s prescription.', hi: 'कृपया डॉक्टर का पर्चा साथ लाएं।', bn: 'অনুগ্রহ করে ডাক্তারের প্রেসক্রিপশন সাথে আনুন।' },
      },
    ],
  },
  {
    id: 'urine-tests',
    icon: 'beaker',
    title: {
      en: 'URINE TESTS',
      hi: 'मूत्र जांच (Urine Tests)',
      bn: 'প্রস্রাব পরীক্ষা (Urine Tests)',
    },
    shortTitle: {
      en: 'Urine Tests',
      hi: 'मूत्र जांच',
      bn: 'প্রস্রাব পরীক্ষা',
    },
    description: {
      en: 'Urine Routine Examination, Urine Microscopy, Urine Culture, Urine Albumin, Urine Protein, Urine Sugar, Pregnancy Test, and other available urine investigations.',
      hi: 'यूरिन रूटीन जांच, यूरिन माइक्रोस्कोपी, यूरिन कल्चर, यूरिन एल्बुमिन, यूरिन प्रोटीन, यूरिन शुगर, प्रेग्नेंसी टेस्ट और अन्य उपलब्ध मूत्र जांच।',
      bn: 'ইউরিন রুটিন পরীক্ষা, ইউরিন মাইক্রোস্কোপি, ইউরিন কালচার, ইউরিন অ্যালবুমিন, ইউরিন প্রোটিন, ইউরিন সুগার, প্রেগন্যান্সি টেস্ট এবং অন্যান্য উপলব্ধ প্রস্রাব পরীক্ষা।',
    },
    details: {
      en: 'Complete physical, chemical, microscopic, and microbiological examination of urine samples for urinary tract, kidney, metabolic, and pregnancy assessment.',
      hi: 'मूत्र पथ, किडनी, मेटाबोलिक और गर्भावस्था मूल्यांकन के लिए मूत्र के नमूनों की भौतिक, रासायनिक, सूक्ष्मदर्शी और कल्चर जांच।',
      bn: 'মূত্রনালী, কিডনি, মেটাবলিক এবং গর্ভাবস্থা মূল্যায়নের জন্য প্রস্রাবের নমুনার সম্পূর্ণ রুটিন, মাইক্রোস্কোপিক এবং কালচার পরীক্ষা।',
    },
    preparationNote: {
      en: 'Collect a clean mid-stream urine sample in a sterile container provided by the clinic.',
      hi: 'क्लिनिक द्वारा दिए गए साफ कंटेनर में मध्य-धारा (mid-stream) मूत्र का नमूना दें।',
      bn: 'ক্লিনিক থেকে প্রদত্ত জীবাণুমুক্ত পাত্রে পরিষ্কার মিড-স্ট্রিম প্রস্রাবের নমুনা সংগ্রহ করুন।',
    },
    investigations: [
      {
        id: 'urine-routine',
        categoryId: 'urine-tests',
        name: { en: 'Urine Routine Examination', hi: 'यूरिन रूटीन जांच (Urine Routine)', bn: 'ইউরিন রুটিন পরীক্ষা (Urine Routine)' },
        summary: { en: 'Routine physical and chemical examination of urine sample.', hi: 'मूत्र की सामान्य भौतिक और रासायनिक जांच।', bn: 'প্রস্রাবের রুটিন রাসায়নিক ও ভৌত পরীক্ষা।' },
        preparation: { en: 'Use a clean, sterile sample container.', hi: 'स्वच्छ स्टेराइल कंटेनर का उपयोग करें।', bn: 'জীবাণুমুক্ত পাত্র ব্যবহার করুন।' },
      },
      {
        id: 'urine-microscopy',
        categoryId: 'urine-tests',
        name: { en: 'Urine Microscopy', hi: 'यूरिन माइक्रोस्कोपी (Urine Microscopy)', bn: 'ইউরিন মাইক্রোস্কোপি (Urine Microscopy)' },
        summary: { en: 'Microscopic examination of urine sediment for pus cells, RBCs, casts, and crystals.', hi: 'मवाद कोशिकाओं, लाल रक्त कोशिकाओं और क्रिस्टल के लिए मूत्र की सूक्ष्मदर्शी जांच।', bn: 'পুঁজ কোষ, লোহিত রক্তকণিকা এবং ক্রিস্টালের জন্য প্রস্রাবের মাইক্রোস্কোপিক পরীক্ষা।' },
        preparation: { en: 'Clean mid-stream urine sample.', hi: 'स्वच्छ मिड-स्ट्रीम मूत्र नमूना।', bn: 'পরিষ্কার মিড-স্ট্রিম প্রস্রাবের নমুনা।' },
      },
      {
        id: 'urine-culture',
        categoryId: 'urine-tests',
        name: { en: 'Urine Culture', hi: 'यूरिन कल्चर (Urine Culture)', bn: 'ইউরিন কালচার (Urine Culture)' },
        summary: { en: 'Identifies urinary tract infection bacteria and antibiotic sensitivity.', hi: 'मूत्र पथ के संक्रमण (UTI) के बैक्टीरिया और एंटीबायोटिक संवेदनशीलता की जांच।', bn: 'মূত্রনালীর সংক্রমণ (UTI) ও অ্যান্টিবায়োটিক সংবেদনশীলতা নির্ণয়।' },
        preparation: { en: 'Mid-stream morning sample in a sterile container is preferred.', hi: 'स्टेराइल कंटेनर में सुबह का नमूना उपयुक्त है।', bn: 'জীবাণুমুক্ত পাত্রে সকালের নমুনা দেওয়া উত্তম।' },
      },
      {
        id: 'urine-albumin',
        categoryId: 'urine-tests',
        name: { en: 'Urine Albumin', hi: 'यूरिन एल्बुमिन (Urine Albumin)', bn: 'ইউরিন অ্যালবুমিন (Urine Albumin)' },
        summary: { en: 'Screens for urinary albumin excretion to evaluate kidney function.', hi: 'किडनी कार्यप्रणाली के मूल्यांकन के लिए यूरिन एल्बुमिन की जांच।', bn: 'কিডনির কার্যকারিতা মূল্যায়নের জন্য প্রস্রাবে অ্যালবুমিন পরীক্ষা।' },
        preparation: { en: 'Standard clean urine sample.', hi: 'सामान्य स्वच्छ मूत्र नमूना।', bn: 'সাধারণ পরিষ্কার প্রস্রাবের নমুনা।' },
      },
      {
        id: 'urine-protein',
        categoryId: 'urine-tests',
        name: { en: 'Urine Protein', hi: 'यूरिन प्रोटीन (Urine Protein)', bn: 'ইউরিন প্রোটিন (Urine Protein)' },
        summary: { en: 'Detects and measures protein levels in urine.', hi: 'मूत्र में प्रोटीन के स्तर की जांच।', bn: 'প্রস্রাবে প্রোটিনের মাত্রা নির্ণয়।' },
        preparation: { en: 'Standard clean urine sample.', hi: 'सामान्य स्वच्छ मूत्र नमूना।', bn: 'সাধারণ পরিষ্কার প্রস্রাবের নমুনা।' },
      },
      {
        id: 'urine-sugar',
        categoryId: 'urine-tests',
        name: { en: 'Urine Sugar', hi: 'यूरिन शुगर (Urine Sugar)', bn: 'ইউরিন সুগার (Urine Sugar)' },
        summary: { en: 'Checks for glucose presence in urine sample.', hi: 'मूत्र के नमूने में ग्लूकोज (शुगर) की उपस्थिति की जांच।', bn: 'প্রস্রাবের নমুনায় গ্লুকোজ (সুগার) পরীক্ষা।' },
        preparation: { en: 'Fasting or post-meal sample as advised by your doctor.', hi: 'डॉक्टर की सलाह अनुसार खाली पेट या भोजन के बाद का नमूना।', bn: 'ডাক্তারের পরামর্শ অনুযায়ী খালি পেটে বা খাওয়ার পরের নমুনা।' },
      },
      {
        id: 'urine-pregnancy',
        categoryId: 'urine-tests',
        name: { en: 'Pregnancy Test (Urine)', hi: 'प्रेग्नेंसी टेस्ट (गर्भावस्था जांच)', bn: 'প্রেগন্যান্সি টেস্ট (গর্ভাবস্থা পরীক্ষা)' },
        summary: { en: 'Urine hCG test for early pregnancy detection.', hi: 'प्रारंभिक गर्भावस्था का पता लगाने के लिए यूरिन hCG जांच।', bn: 'প্রাথমিক গর্ভাবস্থা নির্ণয়ের জন্য ইউরিন hCG পরীক্ষা।' },
        preparation: { en: 'First morning urine sample is recommended for best accuracy.', hi: 'सुबह का पहला मूत्र नमूना सबसे सटीक परिणाम देता है।', bn: 'সঠিক ফলাফলের জন্য সকালের প্রথম প্রস্রাবের নমুনা বাঞ্ছনীয়।' },
      },
    ],
  },
  {
    id: 'stool-tests',
    icon: 'microscope',
    title: {
      en: 'STOOL TESTS',
      hi: 'मल जांच (Stool Tests)',
      bn: 'মল পরীক্ষা (Stool Tests)',
    },
    shortTitle: {
      en: 'Stool Tests',
      hi: 'मल जांच',
      bn: 'মল পরীক্ষা',
    },
    description: {
      en: 'Stool Routine Examination, Stool Microscopy, Occult Blood, Stool Culture, and Ova and Parasite Examination.',
      hi: 'स्टूल रूटीन जांच, स्टूल माइक्रोस्कोपी, ओकल्ट ब्लड, स्टूल कल्चर, और ओवा एवं पैरासाइट (परजीवी) जांच।',
      bn: 'স্টুল রুটিন পরীক্ষা, স্টুল মাইক্রোস্কোপি, অকাল্ট ব্লাড, স্টুল কালচার এবং ওভা ও প্যারাসাইট (পরজীবী) পরীক্ষা।',
    },
    details: {
      en: 'Diagnostic stool examinations for digestive health, infection, occult bleeding, and parasitic screening as prescribed by your physician.',
      hi: 'पाचन स्वास्थ्य, संक्रमण, छिपे हुए रक्तस्राव (Occult Blood) और परजीवी जांच के लिए मल परीक्षण।',
      bn: 'হজমের স্বাস্থ্য, সংক্রমণ, অকাল্ট ব্লিডিং এবং পরজীবী নির্ণয়ের জন্য মল পরীক্ষা।',
    },
    preparationNote: {
      en: 'Collect sample in a clean, dry container provided by the laboratory.',
      hi: 'प्रयोगशाला द्वारा दिए गए साफ और सूखे कंटेनर में नमूना एकत्र करें।',
      bn: 'ল্যাবরেটরি থেকে দেওয়া পরিষ্কার ও শুকনো পাত্রে নমুনা সংগ্রহ করুন।',
    },
    investigations: [
      {
        id: 'stool-routine',
        categoryId: 'stool-tests',
        name: { en: 'Stool Routine Examination', hi: 'स्टूल रूटीन जांच (Stool Routine)', bn: 'স্টুল রুটিন পরীক্ষা (Stool Routine)' },
        summary: { en: 'Physical and chemical routine examination of stool sample.', hi: 'मल के नमूने की भौतिक और रासायनिक रूटीन जांच।', bn: 'মলের নমুনার রুটিন পরীক্ষা।' },
        preparation: { en: 'Use a clean, dry specimen container.', hi: 'स्वच्छ और सूखे कंटेनर का उपयोग करें।', bn: 'পরিষ্কার ও শুকনো নমুনা পাত্র ব্যবহার করুন।' },
      },
      {
        id: 'stool-microscopy',
        categoryId: 'stool-tests',
        name: { en: 'Stool Microscopy', hi: 'स्टूल माइक्रोस्कोपी (Stool Microscopy)', bn: 'স্টুল মাইক্রোস্কোপি (Stool Microscopy)' },
        summary: { en: 'Microscopic examination of stool for pus cells, RBCs, and cellular elements.', hi: 'मवाद कोशिकाओं, लाल रक्त कोशिकाओं और अन्य तत्वों के लिए मल की सूक्ष्मदर्शी जांच।', bn: 'পুঁজ কোষ, লোহিত রক্তকণিকা এবং অন্যান্য উপাদানের জন্য মলের মাইক্রোস্কোপিক পরীক্ষা।' },
        preparation: { en: 'Fresh sample in a clean container.', hi: 'स्वच्छ कंटेनर में ताजा नमूना।', bn: 'পরিষ্কার পাত্রে তাজা নমুনা।' },
      },
      {
        id: 'stool-occult-blood',
        categoryId: 'stool-tests',
        name: { en: 'Occult Blood (Stool)', hi: 'ओकल्ट ब्लड टेस्ट (Occult Blood)', bn: 'অকাল্ট ব্লাড টেস্ট (Occult Blood)' },
        summary: { en: 'Detects microscopic blood in stool for gastrointestinal evaluation.', hi: 'पाचन तंत्र की जांच के लिए मल में सूक्ष्म रक्त का पता लगाना।', bn: 'পাচনতন্ত্রের মূল্যায়নের জন্য মলে সূক্ষ্ম রক্তের উপস্থিতি পরীক্ষা।' },
        preparation: { en: 'Follow any dietary instructions advised by your doctor.', hi: 'अपने डॉक्टर द्वारा बताए गए आहार निर्देशों का पालन करें।', bn: 'আপনার ডাক্তারের দেওয়া খাদ্যতালিকাগত নির্দেশাবলী অনুসরণ করুন।' },
      },
      {
        id: 'stool-culture',
        categoryId: 'stool-tests',
        name: { en: 'Stool Culture', hi: 'स्टूल कल्चर (Stool Culture)', bn: 'স্টুল কালচার (Stool Culture)' },
        summary: { en: 'Microbiological culture to identify bacterial enteric infections.', hi: 'आंतों के जीवाणु संक्रमण की पहचान के लिए माइक्रोबायोलॉजिकल कल्चर।', bn: 'অন্ত্রের ব্যাকটেরিয়া সংক্রমণ শনাক্ত করতে মাইক্রোবায়োলজিক্যাল কালচার।' },
        preparation: { en: 'Fresh sample in a sterile container.', hi: 'स्टेराइल कंटेनर में ताजा नमूना।', bn: 'জীবাণুমুক্ত পাত্রে তাজা নমুনা।' },
      },
      {
        id: 'stool-ova-parasite',
        categoryId: 'stool-tests',
        name: { en: 'Ova and Parasite Examination', hi: 'ओवा और पैरासाइट (परजीवी) जांच', bn: 'ওভা ও প্যারাসাইট (পরজীবী) পরীক্ষা' },
        summary: { en: 'Microscopic check for intestinal ova, cysts, and parasites.', hi: 'आंतों के परजीवी (Ova/Cyst) की सूक्ष्म जांच।', bn: 'অন্ত্রের পরজীবী (Ova/Cyst) পরীক্ষা।' },
        preparation: { en: 'Fresh sample in a clean specimen container.', hi: 'स्वच्छ कंटेनर में ताजा नमूना।', bn: 'পরিষ্কার পাত্রে তাজা নমুনা।' },
      },
    ],
  },
  {
    id: 'sonography',
    icon: 'waves',
    title: {
      en: 'SONOGRAPHY',
      hi: 'सोनोग्राफी / अल्ट्रासाउंड (Sonography)',
      bn: 'সোনোগ্রাফি / আল্ট্রাসাউন্ড (Sonography)',
    },
    shortTitle: {
      en: 'Sonography',
      hi: 'सोनोग्राफी',
      bn: 'সোনোগ্রাফি',
    },
    description: {
      en: 'Whole Abdomen, Upper Abdomen, Lower Abdomen, Pelvis, KUB, Pregnancy Ultrasound, Thyroid Ultrasound, and other available ultrasound examinations.',
      hi: 'होल एब्डोमेन (पूरा पेट), अपर एब्डोमेन, लोअर एब्डोमेन, पेल्विस, केयूबी (KUB), प्रेग्नेंसी अल्ट्रासाउंड, थायरॉइड अल्ट्रासाउंड और अन्य उपलब्ध अल्ट्रासाउंड जांच।',
      bn: 'হোল অ্যাবডোমেন (সম্পূর্ণ পেট), আপার অ্যাবডোমেন, লোয়ার অ্যাবডোমেন, পেলভিস, কেইউবি (KUB), প্রেগন্যান্সি আল্ট্রাসাউন্ড, থাইরয়েড আল্ট্রাসাউন্ড এবং অন্যান্য আল্ট্রাসাউন্ড পরীক্ষা।',
    },
    details: {
      en: 'Diagnostic ultrasound imaging (including 3D sonography) for abdominal organs, kidneys, pelvis, pregnancy care, and thyroid evaluation.',
      hi: 'पेट के अंगों, किडनी, पेल्विस, गर्भावस्था देखभाल और थायरॉइड मूल्यांकन के लिए डायग्नोस्टिक अल्ट्रासाउंड इमेजिंग (3D सोनोग्राफी सहित)।',
      bn: 'পেটের অঙ্গ, কিডনি, পেলভিস, গর্ভাবস্থার যত্ন এবং থাইরয়েড মূল্যায়নের জন্য ডায়াগনস্টিক আল্ট্রাসাউন্ড ইমেজিং (3D সোনোগ্রাফি সহ)।',
    },
    preparationNote: {
      en: 'Abdominal scans may require fasting, and pelvic/KUB scans may require a full urinary bladder. Please bring your doctor’s prescription and call us to confirm preparation steps.',
      hi: 'पेट के अल्ट्रासाउंड के लिए खाली पेट और पेल्विस/KUB स्कैन के लिए भरा हुआ मूत्राशय आवश्यक हो सकता है। कृपया डॉक्टर का पर्चा साथ लाएं।',
      bn: 'পেটের আল্ট্রাসাউন্ডের জন্য খালি পেট এবং পেলভিস/KUB স্ক্যানের জন্য ভরা মূত্রাশয় প্রয়োজন হতে পারে। অনুগ্রহ করে ডাক্তারের প্রেসক্রিপশন সাথে আনুন।',
    },
    investigations: [
      {
        id: 'usg-whole-abdomen',
        categoryId: 'sonography',
        name: { en: 'Whole Abdomen Ultrasound', hi: 'होल एब्डोमेन (पूरा पेट) अल्ट्रासाउंड', bn: 'হোল অ্যাবডোমেন (সম্পূর্ণ পেট) আল্ট্রাসাউন্ড' },
        summary: { en: 'Comprehensive ultrasound imaging of upper and lower abdominal organs.', hi: 'ऊपरी और निचले पेट के सभी प्रमुख अंगों की अल्ट्रासाउंड जांच।', bn: 'উপরের ও নিচের পেটের অঙ্গসমূহের সম্পূর্ণ আল্ট্রাসাউন্ড।' },
        preparation: { en: 'Fasting and full bladder instructions will be confirmed by our team.', hi: 'उपवास और भरे मूत्राशय संबंधी निर्देश हमारी टीम द्वारा बताए जाएंगे।', bn: 'খালি পেট ও ভরা মূত্রাশয়ের নির্দেশাবলী আমাদের টিম জানিয়ে দেবে।' },
      },
      {
        id: 'usg-upper-abdomen',
        categoryId: 'sonography',
        name: { en: 'Upper Abdomen Ultrasound', hi: 'अपर एब्डोमेन (ऊपरी पेट) अल्ट्रासाउंड', bn: 'আপার অ্যাবডোমেন (উপরের পেট) আল্ট্রাসাউন্ড' },
        summary: { en: 'Ultrasound imaging of liver, gallbladder, biliary tract, pancreas, and spleen.', hi: 'लिवर, पित्ताशय, अग्न्याशय और तिल्ली की अल्ट्रासाउंड जांच।', bn: 'লিভার, গলব্লাডার, অগ্ন্যাশয় এবং প্লীহার আল্ট্রাসাউন্ড।' },
        preparation: { en: '6–8 hours fasting is typically recommended.', hi: 'सामान्यतः 6–8 घंटे खाली पेट रहना आवश्यक है।', bn: 'সাধারণত ৬–৮ ঘণ্টা খালি পেটে থাকা প্রয়োজন।' },
      },
      {
        id: 'usg-lower-abdomen',
        categoryId: 'sonography',
        name: { en: 'Lower Abdomen Ultrasound', hi: 'लोअर एब्डोमेन (निचला पेट) अल्ट्रासाउंड', bn: 'লোয়ার অ্যাবডোমেন (তলপেট) আল্ট্রাসাউন্ড' },
        summary: { en: 'Evaluation of lower abdominal and pelvic structures.', hi: 'निचले पेट और पेल्विक संरचनाओं की जांच।', bn: 'তলপেট এবং পেলভিক অঙ্গের মূল্যায়ন।' },
        preparation: { en: 'Full urinary bladder is typically required.', hi: 'सामान्यतः भरा हुआ मूत्राशय आवश्यक होता है।', bn: 'সাধারণত মূত্রাশয় ভরা থাকা প্রয়োজন।' },
      },
      {
        id: 'usg-pelvis',
        categoryId: 'sonography',
        name: { en: 'Pelvis Ultrasound', hi: 'पेल्विस अल्ट्रासाउंड (Pelvis Ultrasound)', bn: 'পেলভিস আল্ট্রাসাউন্ড (Pelvis Ultrasound)' },
        summary: { en: 'Detailed ultrasound imaging of pelvic organs and uterus/adnexa or prostate.', hi: 'पेल्विक अंगों (गर्भाशय/अंडाशय या प्रोस्टेट) का अल्ट्रासाउंड।', bn: 'পেলভিক অঙ্গসমূহের বিস্তারিত আল্ট্রাসাউন্ড পরীক্ষা।' },
        preparation: { en: 'A full urinary bladder is required before the scan.', hi: 'स्कैन से पहले भरा हुआ मूत्राशय आवश्यक है।', bn: 'স্ক্যান করার আগে মূত্রাশয় ভরা থাকা প্রয়োজন।' },
      },
      {
        id: 'usg-kub',
        categoryId: 'sonography',
        name: { en: 'KUB (Kidney, Ureter, Bladder) Ultrasound', hi: 'केयूबी (KUB - किडनी, यूरेटर, ब्लैडर) अल्ट्रासाउंड', bn: 'কেইউবি (KUB - কিডনি, ইউরেটার, ব্লাডার) আল্ট্রাসাউন্ড' },
        summary: { en: 'Evaluation of kidneys, ureters, urinary bladder, and prostate.', hi: 'किडनी, मूत्रवाहिनी और मूत्राशय की विस्तृत जांच।', bn: 'কিডনি, মূত্রনালী এবং মূত্রাশয়ের আল্ট্রাসাউন্ড পরীক্ষা।' },
        preparation: { en: 'Drink water to maintain a full bladder before the scan.', hi: 'स्कैन से पहले मूत्राशय भरा रखने के लिए पानी पिएं।', bn: 'স্ক্যানের আগে মূত্রাশয় ভরা রাখতে জল পান করুন।' },
      },
      {
        id: 'usg-pregnancy',
        categoryId: 'sonography',
        name: { en: 'Pregnancy Ultrasound', hi: 'प्रेग्नेंसी अल्ट्रासाउंड (गर्भावस्था सोनोग्राफी)', bn: 'প্রেগন্যান্সি আল্ট্রাসাউন্ড (গর্ভাবস্থা সোনোগ্রাফি)' },
        summary: { en: 'Obstetric ultrasound imaging as prescribed by your gynaecologist.', hi: 'स्त्री रोग विशेषज्ञ की सलाह अनुसार गर्भावस्था अल्ट्रासाउंड जांच।', bn: 'স্ত্রীরোগ বিশেষজ্ঞের পরামর্শ অনুযায়ী গর্ভাবস্থার আল্ট্রাসাউন্ড পরীক্ষা।' },
        preparation: { en: 'Please bring your doctor’s prescription and valid ID as per statutory norms.', hi: 'कृपया नियमों के अनुसार डॉक्टर का पर्चा और वैध पहचान पत्र साथ लाएं।', bn: 'সরকারি নিয়ম অনুযায়ী ডাক্তারের প্রেসক্রিপশন এবং বৈধ পরিচয়পত্র সাথে আনুন।' },
      },
      {
        id: 'usg-thyroid',
        categoryId: 'sonography',
        name: { en: 'Thyroid Ultrasound', hi: 'थायरॉइड अल्ट्रासाउंड (Thyroid Ultrasound)', bn: 'থাইরয়েড আল্ট্রাসাউন্ড (Thyroid Ultrasound)' },
        summary: { en: 'High-resolution neck and thyroid gland sonography.', hi: 'गर्दन और थायरॉइड ग्रंथि की सोनोग्राफी जांच।', bn: 'ঘাড় এবং থাইরয়েড গ্রন্থির সোনোগ্রাফি পরীক্ষা।' },
        preparation: { en: 'No fasting required for thyroid ultrasound.', hi: 'थायरॉइड अल्ट्रासाउंड के लिए उपवास की आवश्यकता नहीं है।', bn: 'থাইরয়েড আল্ট্রাসাউন্ডের জন্য খালি পেটে থাকার প্রয়োজন নেই।' },
      },
    ],
  },
  {
    id: 'other-diagnostic-services',
    icon: 'activity',
    title: {
      en: 'OTHER DIAGNOSTIC SERVICES',
      hi: 'अन्य डायग्नोस्टिक सेवाएं (Other Diagnostic Services)',
      bn: 'অন্যান্য ডায়াগনস্টিক পরিষেবা (Other Diagnostic Services)',
    },
    shortTitle: {
      en: 'Other Diagnostic Services',
      hi: 'अन्य डायग्नोस्टिक सेवाएं',
      bn: 'অন্যান্য ডায়াগনস্টিক পরিষেবা',
    },
    description: {
      en: 'ECG (12-Lead), ENT Endoscopy, Diagnostic Nasal Endoscopy, Flexible Laryngoscopy, and Uroflowmetry (Flowmetry).',
      hi: 'ईसीजी (12-Lead ECG), ईएनटी एंडोस्कोपी, डायग्नोस्टिक नेज़ल एंडोस्कोपी, फ्लेक्सिबल लैरींगोस्कोपी और यूरोफ्लोमेट्री (Flowmetry)।',
      bn: 'ইসিজি (12-Lead ECG), ইএনটি এন্ডোস্কোপি, ডায়াগনস্টিক ন্যাজাল এন্ডোস্কোপি, ফ্লেক্সিবল ল্যারিঙ্গোস্কোপি এবং ইউরোফ্লোমেট্রি (Flowmetry)।',
    },
    details: {
      en: 'Specialized cardiac, ENT endoscopic, and urological diagnostic procedures performed at the clinic.',
      hi: 'क्लिनिक में की जाने वाली विशेष कार्डियक (ECG), ईएनटी एंडोस्कोपी और यूरोलॉजी (Uroflowmetry) जांच सेवाएं।',
      bn: 'ক্লিনিকে সম্পন্ন বিশেষ কার্ডিয়াক (ECG), ইএনটি এন্ডোস্কোপি এবং ইউরোলজি (Uroflowmetry) ডায়াগনস্টিক পরীক্ষা।',
    },
    preparationNote: {
      en: 'Prior appointment or schedule confirmation is recommended for endoscopy and uroflowmetry procedures.',
      hi: 'एंडोस्कोपी और यूरोफ्लोमेट्री जांच के लिए पूर्व समय की पुष्टि करना अनुशंसित है।',
      bn: 'এন্ডোস্কোপি এবং ইউরোফ্লোমেট্রি পরীক্ষার জন্য আগে থেকে সময় নিশ্চিত করে নেওয়া বাঞ্ছনীয়।',
    },
    investigations: [
      {
        id: 'diag-ecg-12-lead',
        categoryId: 'other-diagnostic-services',
        name: { en: 'ECG (12-Lead)', hi: 'ईसीजी (12-Lead ECG)', bn: 'ইসিজি (12-Lead ECG)' },
        summary: { en: '12-Lead Electrocardiogram to record the heart’s electrical activity and rhythm.', hi: 'हृदय की विद्युत गतिविधि और लय को रिकॉर्ड करने के लिए 12-लीड इलेक्ट्रोकार्डियोग्राम।', bn: 'হৃদপিণ্ডের বৈদ্যুতিক কার্যকলাপ ও ছন্দ রেকর্ড করার জন্য ১২-লিড ইলেকট্রোকার্ডিওগ্রাম।' },
        preparation: { en: 'No fasting required; wear comfortable clothing.', hi: 'उपवास की आवश्यकता नहीं; आरामदायक कपड़े पहनें।', bn: 'খালি পেটে থাকার প্রয়োজন নেই; আরামদায়ক পোশাক পরিধান করুন।' },
      },
      {
        id: 'diag-ent-endoscopy',
        categoryId: 'other-diagnostic-services',
        name: { en: 'ENT Endoscopy', hi: 'ईएनटी एंडोस्कोपी (ENT Endoscopy)', bn: 'ইএনটি এন্ডোস্কোপি (ENT Endoscopy)' },
        summary: { en: 'Comprehensive endoscopic examination of ear, nose, and throat passages.', hi: 'कान, नाक और गले की विस्तृत एंडोस्कोपिक जांच।', bn: 'কান, নাক ও গলার সম্পূর্ণ এন্ডোস্কোপিক পরীক্ষা।' },
        preparation: { en: 'Done by our ENT specialist at the clinic.', hi: 'हमारे ईएनटी विशेषज्ञ द्वारा क्लिनिक में किया जाता है।', bn: 'আমাদের ইএনটি বিশেষজ্ঞের দ্বারা ক্লিনিকে করা হয়।' },
      },
      {
        id: 'diag-nasal-endoscopy',
        categoryId: 'other-diagnostic-services',
        name: { en: 'Diagnostic Nasal Endoscopy', hi: 'डायग्नोस्टिक नेज़ल एंडोस्कोपी (Nasal Endoscopy)', bn: 'ডায়াগনস্টিক ন্যাজাল এন্ডোস্কোপি (Nasal Endoscopy)' },
        summary: { en: 'Detailed visual examination of nasal passages and sinus openings for sinusitis, polyps, or allergy.', hi: 'साइनस, पॉलीप्स या एलर्जी के लिए नाक के मार्ग की विस्तृत जांच।', bn: 'সাইনোসাইটিস, পলিপ বা অ্যালার্জির জন্য নাকের ভেতরের পথের বিস্তারিত পরীক্ষা।' },
        preparation: { en: 'Please confirm timing with our clinic team.', hi: 'कृपया हमारी क्लिनिक टीम से समय की पुष्टि करें।', bn: 'অনুগ্রহ করে আমাদের ক্লিনিক টিমের সাথে সময় নিশ্চিত করুন।' },
      },
      {
        id: 'diag-flexible-laryngoscopy',
        categoryId: 'other-diagnostic-services',
        name: { en: 'Flexible Laryngoscopy', hi: 'फ्लेक्सिबल लैरींगोस्कोपी (Flexible Laryngoscopy)', bn: 'ফ্লেক্সিবল ল্যারিঙ্গোস্কোপি (Flexible Laryngoscopy)' },
        summary: { en: 'Examination of the throat, larynx, and vocal cords for hoarseness or swallowing concerns.', hi: 'आवाज में बदलाव या निगलने में परेशानी के लिए गले और स्वर रज्जु (vocal cords) की जांच।', bn: 'গলার স্বর পরিবর্তন বা গিলতে সমস্যার জন্য গলা, ল্যারিংস ও ভোকাল কর্ড পরীক্ষা।' },
        preparation: { en: 'Please confirm timing prior to your visit.', hi: 'कृपया आने से पहले समय की पुष्टि करें।', bn: 'আসার আগে অনুগ্রহ করে সময় নিশ্চিত করুন।' },
      },
      {
        id: 'diag-uroflowmetry',
        categoryId: 'other-diagnostic-services',
        name: { en: 'Uroflowmetry (Flowmetry)', hi: 'यूरोफ्लोमेट्री (Uroflowmetry / Flowmetry)', bn: 'ইউরোফ্লোমেট্রি (Uroflowmetry / Flowmetry)' },
        summary: { en: 'Diagnostic measurement of urine flow rate for urinary obstruction or prostate evaluation.', hi: 'मूत्र प्रवाह में रुकावट या प्रोस्टेट मूल्यांकन के लिए मूत्र प्रवाह दर की जांच।', bn: 'প্রস্রাবের বাধা বা প্রোস্টেট মূল্যায়নের জন্য প্রস্রাবের প্রবাহের হার পরীক্ষা।' },
        preparation: { en: 'Requires a comfortably full bladder at the time of the test.', hi: 'जांच के समय मूत्राशय भरा होना आवश्यक है।', bn: 'পরীক্ষার সময় মূত্রাশয় স্বাভাবিকভাবে ভরা থাকা প্রয়োজন।' },
      },
    ],
  },
];

export const diagnosticTests: DiagnosticTest[] = diagnosticCategories.map(
  (cat) => ({
    id: cat.id,
    categoryId: cat.id,
    name: cat.shortTitle.en,
    nameLocalized: cat.shortTitle,
    description: cat.description.en,
    descriptionLocalized: cat.description,
    preparationLocalized: cat.preparationNote,
    icon: cat.icon,
    investigations: cat.investigations,
  })
);
