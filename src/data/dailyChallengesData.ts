import { DailyChallengeQuestion, UserStreakState } from '../types';

export const DAILY_CHALLENGES: DailyChallengeQuestion[] = [
  {
    id: 'daily-1',
    dayNumber: 1,
    topic: 'সন্ধি',
    difficulty: 'মাঝারি',
    badge: 'বিসিএস ও ভর্তি পরীক্ষা',
    question: '"বৃষ্টি" শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি?',
    options: ['বৃষ + তি', 'বৃষ্ + তি', 'বৃত্ + তি', 'বৃষ + টি'],
    correctIndex: 1,
    grammarRule: 'ব্যঞ্জনসন্ধির নিয়ম: মূর্ধন্য-ষ (ষ্)-এর পর ত বা থ থাকলে ত স্থানে ট এবং থ স্থানে ঠ হয়। যেমন: বৃষ্ + তি = বৃষ্টি, কৃষ্ + তি = কৃষ্টি।',
    explanation: 'সঠিক সন্ধি বিচ্ছেদ হলো "বৃষ্ + তি"। এখানে ষ্ ধ্বনির প্রভাবে পরবর্তী "ত" পরিবর্তিত হয়ে "ট" এ পরিণত হয়েছে।',
    mnemonicTip: 'মনে রাখুন: ষ্ + ত = ষ্ট এবং ষ্ + থ = ষ্ঠ (যেমন: সষ্ + থ = ষষ্ঠ)।'
  },
  {
    id: 'daily-2',
    dayNumber: 2,
    topic: 'সমাস',
    difficulty: 'মাঝারি',
    badge: 'এইচএসসি ও বিশ্ববিদ্যালয়',
    question: '"কাজলকালো" কোন সমাসের দৃষ্টান্ত?',
    options: ['উপমিত কর্মধারয়', 'উপমান কর্মধারয়', 'রূপক কর্মধারয়', 'মধ্যপদলোপী কর্মধারয়'],
    correctIndex: 1,
    grammarRule: 'উপমান ও উপমিত চেনার নিয়ম: সাধারণ গুণের উল্লেখ থাকলে এবং তুলনাটি সত্য বা দৃশ্যমান হলে তা উপমান কর্মধারয়। আর সাধারণ গুণের উল্লেখ না থাকলে ও তুলনাটি কাল্পনিক মনে হলে তা উপমিত।',
    explanation: '"কাজলের ন্যায় কালো = কাজলকালো"। এখানে "কাজল" হলো উপমান এবং "কালো" হলো তাদের মধ্যকার সাধারণ গুণ (বাস্তবেই কাজল কালো হয়)। তাই এটি উপমান কর্মধারয় সমাস।',
    mnemonicTip: 'শর্টকাট: তুলনা যদি বাস্তব সত্য হয় (কাজল সত্যিই কালো, বক সত্যিই ধার্মিক) তবে উপমান; আর অবাস্তব বা কল্পনা হলে (মুখ চাঁদের ন্যায়) উপমিত।'
  },
  {
    id: 'daily-3',
    dayNumber: 3,
    topic: 'কারক ও বিভক্তি',
    difficulty: 'সহজ',
    badge: 'বোর্ড পরীক্ষা',
    question: '"কাননে কুসুম-কলি সকলি ফুটিল" — এখানে "কাননে" কোন কারকে কোন বিভক্তি?',
    options: ['অধিকরণে সপ্তমী', 'অপাদানে সপ্তমী', 'করণে সপ্তমী', 'কর্মে সপ্তমী'],
    correctIndex: 0,
    grammarRule: 'অধিকরণ কারকের নিয়ম: ক্রিয়া সম্পাদনের স্থান, সময় বা আধারকে অধিকরণ কারক বলে। স্থান নির্দেশ করলে তা স্থানাধিকরণ বা ভাবাধিকরণ।',
    explanation: '"কাননে" মানে বাগানে বা বনে। এটি ফুল ফোটার স্থান বা আধার নির্দেশ করছে। কানন শব্দের সাথে "এ" বিভক্তি যুক্ত থাকায় এটি অধিকরণে সপ্তমী বিভক্তি।',
    mnemonicTip: 'কোথায় ফুটল? → কাননে (স্থান বোঝাচ্ছে = অধিকরণ)।'
  },
  {
    id: 'daily-4',
    dayNumber: 4,
    topic: 'ণ-ত্ব ও ষ-ত্ব বিধান',
    difficulty: 'মাঝারি',
    badge: 'বিসিএস ও প্রাথমিক শিক্ষক',
    question: 'নিচের কোন শব্দটিতে স্বভাবতই "ণ" বসেছে?',
    options: ['তৃণ', 'লাবণ্য', 'কারণ', 'বর্ণ'],
    correctIndex: 1,
    grammarRule: 'স্বভাবতই ণ হওয়ার নিয়ম: যেসব শব্দে ঋ, র, ষ ছাড়া স্বাভাবিকভাবেই মূর্ধন্য ণ হয়। যেমন: চাণক্য মাণিক্য গণ, বাণিজ্য লবণ মণ, বেণু বীণা কঙ্কণ কণিকা...',
    explanation: '"লাবণ্য" শব্দে কোনো ঋ, র, ষ ধ্বনি না থাকা সত্ত্বেও স্বভাবতই মূর্ধন্য-ণ ব্যবহৃত হয়েছে। বিপরীতে তৃণ (ঋ-কারের পর), কারণ (র-এর পর), এবং বর্ণ (রেফ-এর পর) নিয়মানুযায়ী ণ হয়েছে।',
    mnemonicTip: 'চাণক্য মাণিক্য গণ ছড়াটি মনে রাখুন: "বাণিজ্য লবণ মণ, বেণু বীণা কঙ্কণ কণিকা, কল্যাণ শোণিত মণি, স্থাণু গুণ পুণ্য বেণী, ফণী বিপণি গণিকা, আপন লাবণ্য বাণী..."'
  },
  {
    id: 'daily-5',
    dayNumber: 5,
    topic: 'ধ্বনি ও বর্ণ',
    difficulty: 'সহজ',
    badge: 'মৌলিক ব্যাকরণ',
    question: 'বাংলা বর্ণমালায় কোন ধ্বনি দুটিকে "তাড়নজাত ধ্বনি" বলা হয়?',
    options: ['য এবং য়', 'ড় এবং ঢ়', 'র এবং ল', 'শ এবং ষ'],
    correctIndex: 1,
    grammarRule: 'জিহ্বার ডগা দিয়ে ওপরের মাড়িতে বা দন্তমূলে দ্রুত আঘাত বা তাড়না করে উচ্চারিত ধ্বনিকে তাড়নজাত ধ্বনি বলে।',
    explanation: 'বাংলায় "ড়" এবং "ঢ়" হলো তাড়নজাত ধ্বনি। অন্যদিকে "র" হলো কম্পনজাত এবং "ল" হলো পার্শ্বিক ধ্বনি।',
    mnemonicTip: 'তাড়না বা ধাক্কা দেয়: ড় এবং ঢ়। কাঁপন দেয়: র। পাশ দিয়ে বাতাস বের হয়: ল।'
  },
  {
    id: 'daily-6',
    dayNumber: 6,
    topic: 'সমাস',
    difficulty: 'কঠিন',
    badge: 'বিসিএস প্রিলিমিনারি',
    question: '"পলান্ন" শব্দের সঠিক ব্যাসবাক্য কোনটি?',
    options: ['পল ও অন্ন', 'পল মিশ্রিত অন্ন', 'পলের জন্য অন্ন', 'পল রূপ অন্ন'],
    correctIndex: 1,
    grammarRule: 'মধ্যপদলোপী কর্মধারয়: যে কর্মধারয় সমাসে ব্যাসবাক্যের মধ্যস্থিত ব্যাখ্যামূলক পদ সমস্ত পদে লোপ পায়।',
    explanation: '"পল মিশ্রিত অন্ন = পলান্ন" (পল অর্থ মাংস)। ব্যাসবাক্যের মধ্যবর্তী "মিশ্রিত" পদটি লোপ পাওয়ায় এটি মধ্যপদলোপী কর্মধারয় সমাস।',
    mnemonicTip: 'মাংস মিশ্রিত ভাতকে প্রাচীন বাংলায় পলান্ন বলা হতো; মাঝের "মিশ্রিত" শব্দ বাদ পড়েছে।'
  },
  {
    id: 'daily-7',
    dayNumber: 7,
    topic: 'পদ প্রকরণ',
    difficulty: 'মাঝারি',
    badge: 'বিশ্ববিদ্যালয় ভর্তি',
    question: '"সততা সর্বোৎকৃষ্ট পন্থা" — এখানে "সততা" কোন প্রকারের বিশেষ্য?',
    options: ['নামবাচক', 'গুণবাচক', 'ভাববাচক', 'জাতিবাচক'],
    correctIndex: 1,
    grammarRule: 'গুণবাচক বিশেষ্যের নিয়ম: যে বিশেষ্য পদ দ্বারা কোনো বস্তুর দোষ বা গুণের নাম বোঝায় (ব্যক্তি নয়, গুণের নাম)। যেমন: সততা, মধুরতা, তারুণ্য, স্বাস্থ্য।',
    explanation: '"সততা" হলো একটি মানবিক গুণ বা চারিত্রিক বৈশিষ্ট্যের নাম। তাই এটি গুণবাচক বিশেষ্য। (ভাববাচক কাজের নাম বোঝায়, যেমন: গমন, ভোজন)।',
    mnemonicTip: 'সৎ হলো বিশেষণ; কিন্তু তার স্বভাব বা গুণের নাম "সততা" হলো গুণবাচক বিশেষ্য।'
  },
  {
    id: 'daily-8',
    dayNumber: 8,
    topic: 'শুদ্ধ বানান ও প্রয়োগ',
    difficulty: 'মাঝারি',
    badge: 'বিসিএস ও ব্যাংক জব',
    question: 'নিচের কোন বানানগুচ্ছের সবগুলো বানানই শুদ্ধ?',
    options: [
      'প্রতিযোগীতা, সহযোগীতা',
      'প্রতিযোগিতা, সহযোগিতা',
      'প্রতियोगীতা, সহযোহিতা',
      'প্রতিজোগিতা, সহযগীতা'
    ],
    correctIndex: 1,
    grammarRule: 'বানানের নিয়ম: ঈ-কারান্ত শব্দের শেষে "-তা" বা "-ত্ব" প্রত্যয় যুক্ত হলে পূর্ববর্তী দীর্ঘ-ঈ হ্রস্ব-ই তে পরিণত হয়।',
    explanation: 'প্রতিযোগী + তা = প্রতিযোগিতা; সহযোগী + তা = সহযোগিতা; স্থায়ী + ত্ব = স্থায়িত্ব। তাই হ্রস্ব-ই কার দিয়ে "প্রতিযোগিতা, সহযোগিতা" শুদ্ধ।',
    mnemonicTip: '"তা" বা "ত্ব" জুড়লে দীর্ঘ ঈ পালিয়ে হ্রস্ব ই হয়ে যায়!'
  },
  {
    id: 'daily-9',
    dayNumber: 9,
    topic: 'সন্ধি',
    difficulty: 'সহজ',
    badge: 'বোর্ড পরীক্ষা',
    question: '"ইত্যাদি" শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি?',
    options: ['ইৎ + আদি', 'ইতি + আদি', 'ইত + আদি', 'ইত্যা + দি'],
    correctIndex: 1,
    grammarRule: 'স্বরসন্ধির নিয়ম: ই বা ঈ-কারের পর ই/ঈ ভিন্ন অন্য স্বরবর্ণ থাকলে ই/ঈ স্থানে "য" বা "য-ফলা" হয়। যেমন: ইতি + আদি = ইত্যাদি।',
    explanation: 'ইতি শব্দের শেষের হ্রস্ব "ই" এবং আদি শব্দের শুরুর "আ" মিলে "য-ফলা + আ-কার" হয়েছে (ইতি + আদি = ইত্যাদি)।',
    mnemonicTip: 'ই + আ = যা (প্রতি + এক = প্রত্যেক, যদি + অপি = যদ্যপি)।'
  },
  {
    id: 'daily-10',
    dayNumber: 10,
    topic: 'কারক ও বিভক্তি',
    difficulty: 'মাঝারি',
    badge: 'বিসিএস প্রিলিমিনারি',
    question: '"মেঘে বৃষ্টি হয়" — এখানে "মেঘে" কোন কারকে কোন বিভক্তি?',
    options: ['অধিকরণে সপ্তমী', 'অপাদানে সপ্তমী', 'করণে সপ্তমী', 'কর্তায় সপ্তমী'],
    correctIndex: 1,
    grammarRule: 'অপাদান কারকের নিয়ম: যা থেকে কোনো কিছু জাত, বিচ্যুত, উৎপন্ন, পতিত, গৃহীত বা উৎপন্ন হয়।',
    explanation: 'মেঘ হতে বৃষ্টি উৎপন্ন বা পতিত হয়। উৎস বা উৎপত্তি বোঝাচ্ছে বলে এটি অপাদান কারক এবং "এ" বিভক্তি যুক্ত থাকায় অপাদানে সপ্তমী বিভক্তি।',
    mnemonicTip: 'মেঘ থেকে বৃষ্টি আসে (উৎস বোঝাচ্ছে) → অপাদান।'
  },
  {
    id: 'daily-11',
    dayNumber: 11,
    topic: 'বাক্য প্রকরণ',
    difficulty: 'সহজ',
    badge: 'এইচএসসি বাংলা ২য়',
    question: '"যদিও তিনি দরিদ্র, তবুও তিনি চরিত্রবান" — এটি কোন ধরনের বাক্য?',
    options: ['সরল বাক্য', 'যৌগিক বাক্য', 'জটিল বা মিশ্র বাক্য', 'প্রশ্নবোধক বাক্য'],
    correctIndex: 2,
    grammarRule: 'জটিল বা মিশ্র বাক্য: যে বাক্যে একটি প্রধান খণ্ডবাক্যের ওপর এক বা একাধিক আশ্রিত বাক্য পরস্পর সাপেক্ষভাবে যুক্ত থাকে (যেমন: যদিও-তবুও, যে-সে, যখন-তখন)।',
    explanation: 'এখানে "যদিও... তবুও" সাপেক্ষ যোজক ব্যবহৃত হয়েছে এবং একটি খণ্ডবাক্য অপরটির ওপর নির্ভরশীল, তাই এটি মিশ্র বা জটিল বাক্য।',
    mnemonicTip: 'যদি-তবে, যদিও-তবুও, যে-সে জোড়ায় জোড়ায় থাকলে তা নিশ্চিত জটিল বাক্য।'
  },
  {
    id: 'daily-12',
    dayNumber: 12,
    topic: 'উপসর্গ',
    difficulty: 'সহজ',
    badge: 'ভর্তি পরীক্ষা',
    question: 'নিচের কোন চারটি উপসর্গ বাংলা এবং তৎসম উভয় প্রকারেই পাওয়া যায়?',
    options: ['আ, সু, বি, নি', 'প্র, পরা, অপ, সং', 'অ, অনা, কু, অজ', 'দর, না, নিম, ফি'],
    correctIndex: 0,
    grammarRule: 'চারটি উপসর্গ বাংলা ও সংস্কৃত উভয় ব্যাকরণেই রয়েছে: আ, সু, বি, নি (আ-সু-বি-নি)।',
    explanation: '"আ, সু, বি, নি" — এই চারটি উপসর্গ খাঁটি বাংলা শব্দেও বসে (যেমন: আকাজ, সুনজর, বিভুঁই, নিখুঁত) আবার তৎসম শব্দেও বসে (যেমন: আকণ্ঠ, সুতীক্ষ্ণ, বিজ্ঞান, নির্ণয়)।',
    mnemonicTip: 'মুখস্থ টেকনিক: "আ-সু-বি-নি" এই চারজন দুই রাজ্যেই (বাংলা ও তৎসম) রাজত্ব করে।'
  },
  {
    id: 'daily-13',
    dayNumber: 13,
    topic: 'বাগধারা',
    difficulty: 'সহজ',
    badge: 'বিসিএস ও শিক্ষক নিবন্ধন',
    question: '"ঢাকের কাঠি" বাগধারাটির প্রকৃত অর্থ কী?',
    options: ['বাদক', 'তোষামোদকারী বা মোসাহেব', 'বিদ্বেষী ব্যক্তি', 'অকর্মণ্য মানুষ'],
    correctIndex: 1,
    grammarRule: 'ঢাক বাজানোর কাঠি যেমন ঢাকির ইঙ্গিতে নাচে, তেমনি যে ব্যক্তি অন্যের মন জুগিয়ে তোষামোদ করে তাকে "ঢাকের কাঠি" বলা হয়।',
    explanation: '"ঢাকের কাঠি" অর্থ খোশামোদে বা তোষামোদকারী ব্যক্তি। এর সমার্থক আরেকটি বাগধারা হলো "খয়ের খাঁ"।',
    mnemonicTip: 'ঢাকের কাঠি = যে সবসময় তেল মারে বা তোষামোদ করে।'
  },
  {
    id: 'daily-14',
    dayNumber: 14,
    topic: 'এককথায় প্রকাশ',
    difficulty: 'মাঝারি',
    badge: 'বিশ্ববিদ্যালয় ভর্তি',
    question: '"যা পূর্বে দেখা যায়নি" — এককথায় প্রকাশ কী হবে?',
    options: ['অদৃষ্টপূর্ব', 'অশ্রুতপূর্ব', 'অভূতপূর্ব', 'দৃষ্টপূর্ব'],
    correctIndex: 0,
    grammarRule: 'দৃষ্ট = দেখা, শ্রুত = শোনা, ভূত = হওয়া। অতএব দেখা যায়নি = অদৃষ্টপূর্ব।',
    explanation: '"যা পূর্বে দেখা যায়নি" = অদৃষ্টপূর্ব। যা পূর্বে শোনা যায়নি = অশ্রুতপূর্ব। যা পূর্বে ঘটেনি বা হয়নি = অভূতপূর্ব।',
    mnemonicTip: 'দৃষ্টি থেকে অদৃষ্টপূর্ব (দেখা), শ্রবণ থেকে অশ্রুতপূর্ব (শোনা), ভূত থেকে অভূতপূর্ব (ঘটা)।'
  },
  {
    id: 'daily-15',
    dayNumber: 15,
    topic: 'সমাস',
    difficulty: 'কঠিন',
    badge: 'বিসিএস লিখিত ও প্রিলিমিনারি',
    question: '"দশ আনন যার = দশানন" এটি কোন সমাস?',
    options: ['দ্বিগু সমাস', 'সংখ্যাবাচক বহুব্রীহি', 'দ্বন্দ্ব সমাস', 'তৎপুরুষ সমাস'],
    correctIndex: 1,
    grammarRule: 'সংখ্যাবাচক বহুব্রীহি: পূর্বপদ সংখ্যাবাচক এবং পরপদ বিশেষ্য হয়েও যদি সমস্ত পদে অন্য কোনো ব্যক্তি বা বস্তুকে বোঝায়।',
    explanation: 'দশানন বললে সংখ্যা ১০ বা আনন (মুখ) প্রধান না বুঝিয়ে লঙ্কার রাজা রাবণকে বোঝায়। তাই এটি সংখ্যাবাচক বহুব্রীহি সমাস।',
    mnemonicTip: 'পূর্বপদে সংখ্যা থাকলে যদি সমাহার বোঝায় তবে দ্বিগু (চৌরস্তা); কিন্তু অন্য তৃতীয় কাউকে বোঝালে বহুব্রীহি (দশানন = রাবণ, সেতার = বাদ্যযন্ত্রবিশেষ)।'
  },
  {
    id: 'daily-16',
    dayNumber: 16,
    topic: 'কারক ও বিভক্তি',
    difficulty: 'সহজ',
    badge: 'বোর্ড পরীক্ষা',
    question: '"টাকায় কিনা হয়" — এখানে "টাকায়" কোন কারকে কোন বিভক্তি?',
    options: ['করণে সপ্তমী', 'কর্মে সপ্তমী', 'অপাদানে সপ্তমী', 'কর্তায় সপ্তমী'],
    correctIndex: 0,
    grammarRule: 'করণ কারক: ক্রিয়া সম্পাদনের মাধ্যম, উপকরণ বা সহায়ক উপাদানকে করণ কারক বলে।',
    explanation: 'টাকা দিয়ে বা টাকার সাহায্যে সব কাজ সিদ্ধ হয়। সহায়ক মাধ্যম হওয়ায় এটি করণ কারক এবং "য়" বিভক্তি যুক্ত থাকায় করণে সপ্তমী।',
    mnemonicTip: 'কিসের দ্বারা / কিসের সাহায্যে কাজ হচ্ছে? → টাকা দিয়ে (করণ)।'
  },
  {
    id: 'daily-17',
    dayNumber: 17,
    topic: 'সন্ধি',
    difficulty: 'মাঝারি',
    badge: 'বিসিএস ও প্রাথমিক সহকারী',
    question: '"ষোড়শ" শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি?',
    options: ['ষট্ + দশ', 'ষড় + দশ', 'ষোড় + শ', 'ষোঃ + দশ'],
    correctIndex: 0,
    grammarRule: 'নিপাতনে সিদ্ধ বা বিশেষ নিয়মে ব্যঞ্জনসন্ধি: ষট্ + দশ = ষোড়শ।',
    explanation: 'ষট্ (ছয়) + দশ (দশ) মিলে ষোড়শ (ষোল)। এটি নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধির একটি অতি গুরুত্বপূর্ণ উদাহরণ।',
    mnemonicTip: 'নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি: ষট্ + দশ = ষোড়শ, আ + চর্য = আশ্চর্য, গো + অক্ষ = গবাক্ষ।'
  },
  {
    id: 'daily-18',
    dayNumber: 18,
    topic: 'ণ-ত্ব ও ষ-ত্ব বিধান',
    difficulty: 'মাঝারি',
    badge: 'এইচএসসি ও ভর্তি',
    question: 'নিচের কোন শব্দটিতে স্বভাবতই "ষ" হয়েছে?',
    options: ['আষাঢ়', 'কৃষক', 'বৃষ্টি', 'দৃষ্টি'],
    correctIndex: 0,
    grammarRule: 'স্বভাবতই ষ হওয়ার নিয়ম: কোনো ব্যাকরণগত নিয়ম বা কার-চিহ্ন ছাড়াই যেসব শব্দে সর্বদা মূর্ধন্য ষ ব্যবহৃত হয়।',
    explanation: '"আষাঢ়" শব্দে কোনো নিয়ম ছাড়াই স্বভাবতই মূর্ধন্য-ষ বসেছে। অন্যগুলোতে ঋ-কার (কৃষক, বৃষ্টি, দৃষ্টি) বা নির্দিষ্ট সূত্রের কারণে ষ হয়েছে।',
    mnemonicTip: 'স্বভাবতই ষ যুক্ত শব্দ: ষড়ঋতু, আষাঢ়, পাষাণ, ঔষধ, ঊষা, কষায়, পৌষ, কলুষ।'
  },
  {
    id: 'daily-19',
    dayNumber: 19,
    topic: 'ধ্বনি ও বর্ণ',
    difficulty: 'সহজ',
    badge: 'মৌলিক ব্যাকরণ',
    question: 'বাংলায় "পরাশ্রয়ী বর্ণ" কয়টি?',
    options: [' ২টি', '৩টি', '৪টি', '৫টি'],
    correctIndex: 1,
    grammarRule: 'যে বর্ণগুলো অন্য কোনো বর্ণের আশ্রয় ছাড়া স্বাধীনভাবে শব্দে ব্যবহৃত হতে পারে না, তাদের পরাশ্রয়ী বর্ণ বলে।',
    explanation: 'বাংলা বর্ণমালায় পরাশ্রয়ী বর্ণ ৩টি:  অনুস্বর ( ং ), বিসর্গ ( ঃ ) এবং চন্দ্রবিন্দু ( ঁ )।',
    mnemonicTip: 'সবসময় অন্যের কাঁধে চড়ে থাকে ৩টি বর্ণ: ং , ঃ , ঁ ।'
  },
  {
    id: 'daily-20',
    dayNumber: 20,
    topic: 'পদ প্রকরণ',
    difficulty: 'মাঝারি',
    badge: 'বিশ্ববিদ্যালয় ভর্তি',
    question: '"মরি মরি! কী সুন্দর সকাল!" — এখানে "মরি মরি" কোন ধরনের অব্যয়?',
    options: ['অনন্বয়ী অব্যয়', 'অনুকার অব্যয়', 'সমুচ্চয়ী অব্যয়', 'পদান্বয়ী অব্যয়'],
    correctIndex: 0,
    grammarRule: 'অনন্বয়ী অব্যয়: যে অব্যয় পদ বাক্যের অন্যান্য পদের সাথে সরাসরি অন্বিত না হয়ে মনের হর্ষ, বিষাদ, বিস্ময়, বা আবেগ প্রকাশ করে।',
    explanation: '"মরি মরি" দ্বারা তীব্র উচ্ছ্বাস ও বিস্ময় প্রকাশ পেয়েছে, যা বাক্যের অন্য পদের সাথে ব্যাকরণগত সম্বন্ধহীন; তাই এটি অনন্বয়ী অব্যয়।',
    mnemonicTip: 'মনের আবেগ, আনন্দ বা দুঃখের বিশেষ ধ্বনি (ছি ছি, হায় হায়, মরি মরি, শাবাশ) = অনন্বয়ী অব্যয়।'
  },
  {
    id: 'daily-21',
    dayNumber: 21,
    topic: 'সমাস',
    difficulty: 'মাঝারি',
    badge: 'বিসিএস প্রিলিমিনারি',
    question: '"মনমাঝি" এর সঠিক ব্যাসবাক্য ও সমাস কোনটি?',
    options: [
      'মন রূপ মাঝি = রূপক কর্মধারয়',
      'মনের মাঝি = ষষ্ঠী তৎপুরুষ',
      'মন ও মাঝি = দ্বন্দ্ব সমাস',
      'মন যে মাঝি = সাধারণ কর্মধারয়'
    ],
    correctIndex: 0,
    grammarRule: 'রূপক কর্মধারয়: উপমান ও উপমেয়ের মধ্যে অভেদ বা একত্ব কল্পনা করা হলে রূপক কর্মধারয় সমাস হয়। ব্যাসবাক্যে "রূপ" শব্দ বসে।',
    explanation: 'মন এবং মাঝির মধ্যে কোনো ব্যবধান না রেখে এক কল্পনা করা হয়েছে: "মন রূপ মাঝি = মনমাঝি"। এটি রূপক কর্মধারয় সমাস।',
    mnemonicTip: 'অদৃশ্য অদৃশ্যমান ভাবের সাথে দৃশ্যমান রূপকের অভেদ মিলন: মন রূপ মাঝি, বিষাদ রূপ সিন্ধু, জ্ঞান রূপ আলোক।'
  },
  {
    id: 'daily-22',
    dayNumber: 22,
    topic: 'কারক ও বিভক্তি',
    difficulty: 'কঠিন',
    badge: 'বিসিএস ও জুডিশিয়ারি',
    question: '"সূর্যোদয়ে অন্ধকার দূরীভূত হয়" — এখানে "সূর্যোদয়ে" কোন কারক?',
    options: ['ভাবাধিকরণ', 'কালাধিকরণ', 'স্থানাধিকরণ', 'অপাদান কারক'],
    correctIndex: 0,
    grammarRule: 'ভাবাধিকরণের নিয়ম: একটি ক্রিয়ার প্রভাবে বা উপস্থিতিতে অন্য একটি ক্রিয়া সম্পন্ন হলে প্রথম ক্রিয়াবাচক পদটিকে ভাবাধিকরণ বলে। একে ল্যাটিন মতে Locative Absolute বলা হয়।',
    explanation: 'সূর্য ওঠার কারণে অন্ধকার দূরীভূত হচ্ছে (ক্রিয়া পরম্পরা)। তাই "সূর্যোদয়ে" ভাবাধিকরণে সপ্তমী বিভক্তি।',
    mnemonicTip: 'একটি ঘটনার প্রভাবে আরেকটি ঘটনা ঘটা (যেমন: সূর্যোদয়ে অন্ধকার দূর, কান্নায় শোক কমে) = ভাবাধিকরণ সপ্তমী।'
  },
  {
    id: 'daily-23',
    dayNumber: 23,
    topic: 'শুদ্ধ বানান ও প্রয়োগ',
    difficulty: 'সহজ',
    badge: 'বোর্ড ও চাকরির পরীক্ষা',
    question: 'নিচের কোন বাক্যটি শুদ্ধ?',
    options: [
      'সকল ছাত্রগণ উপস্থিত ছিল।',
      'সকল ছাত্র উপস্থিত ছিল।',
      'সব ছাত্রগণ উপস্থিত ছিল।',
      'সকল ছাত্রবৃন্দগণ উপস্থিত ছিল।'
    ],
    correctIndex: 1,
    grammarRule: 'বচনের বাহুল্য দোষ বর্জনের নিয়ম: একই সাথে দুটি বহুবচনবোধক শব্দ বা প্রত্যয় ব্যবহার করা ব্যাকরণসম্মত নয়।',
    explanation: '"সকল" নিজেই বহুবচন, তার সাথে আবার "গণ" যুক্ত করলে বাহুল্য দোষ ঘটে। তাই শুদ্ধ রূপ: "সকল ছাত্র উপস্থিত ছিল" অথবা "ছাত্রগণ উপস্থিত ছিল"।',
    mnemonicTip: 'এক বাক্যে ডাবল বহুবচন নিষিদ্ধ! সকল ছাত্রগণ (ভুল) → সকল ছাত্র (শুদ্ধ)।'
  },
  {
    id: 'daily-24',
    dayNumber: 24,
    topic: 'সন্ধি',
    difficulty: 'মাঝারি',
    badge: 'এইচএসসি ও ভর্তি',
    question: '"গায়ক" শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি?',
    options: ['গৈ + অক', 'গা + অক', 'গে + অক', 'গা + য়ক'],
    correctIndex: 0,
    grammarRule: 'স্বরসন্ধির নিয়ম: ঐ-কারের পর অন্য স্বরবর্ণ থাকলে ঐ স্থানে "আয়্" হয়। যেমন: গৈ + অক = গায়ক, নৈ + অক = নায়ক।',
    explanation: 'গৈ + অক = গায়ক (ঐ + অ = আয়)। অনুরূপভাবে এ-কারের পর অ থাকলে অয় হয় (নে + অন = নয়ন)।',
    mnemonicTip: 'ঐ + অক = য়ক (নায়ক = নৈ + অক, গায়ক = গৈ + অক)।'
  },
  {
    id: 'daily-25',
    dayNumber: 25,
    topic: 'এককথায় প্রকাশ',
    difficulty: 'সহজ',
    badge: 'বিসিএস ও শিক্ষক নিবন্ধন',
    question: '"যার কোনো উপায় নেই" — এককথায় প্রকাশ কী হবে?',
    options: ['নিরুপায়', 'অনন্যোপায়', 'অসহায়', 'উপায়হীন'],
    correctIndex: 1,
    grammarRule: 'অনন্য (অন্য কোনো) + উপায় = অনন্যোপায় (যার আর অন্য কোনো উপায় অবশিষ্ট নেই)।',
    explanation: '"যার কোনো উপায় নেই" বা অন্য কোনো উপায় যার নেই = অনন্যোপায়।',
    mnemonicTip: 'অনন্য + উপায় = অনন্যোপায়।'
  },
  {
    id: 'daily-26',
    dayNumber: 26,
    topic: 'ধ্বনি ও বর্ণ',
    difficulty: 'মাঝারি',
    badge: 'মৌলিক ব্যাকরণ',
    question: 'নিচের কোন বর্ণগুলো "উষ্ম ধ্বনি বা শিষ ধ্বনি"?',
    options: ['শ, ষ, স, হ', 'ক, খ, গ, ঘ', 'ট, ঠ, ড, ঢ', 'য, র, ল, ব'],
    correctIndex: 0,
    grammarRule: 'উষ্ম ধ্বনি: যেসব ধ্বনি উচ্চারণের সময় বাতাস মুখবিবরে ঘর্ষণ বা শিস দেওয়ার মতো শব্দ সৃষ্টি করে বের হয়ে যায়।',
    explanation: 'বাংলায় "শ, ষ, স, হ" এই চারটি হলো উষ্ম বা শিষ ধ্বনি। এদের মধ্যে প্রথম তিনটি অঘোষ এবং হ হলো ঘোষ উষ্মধ্বনি।',
    mnemonicTip: 'শিস দিতে যেমন বাতাস লাগে, তেমনি শ, ষ, স, হ হলো শিষ বা উষ্ম বর্ণ।'
  },
  {
    id: 'daily-27',
    dayNumber: 27,
    topic: 'সমাস',
    difficulty: 'সহজ',
    badge: 'বোর্ড পরীক্ষা',
    question: '"হাট-বাজার" কোন সমাসের উদাহরণ?',
    options: ['সমার্থক দ্বন্দ্ব', 'বিপরীতার্থক দ্বন্দ্ব', 'মিলনার্থক দ্বন্দ্ব', 'অলুক দ্বন্দ্ব'],
    correctIndex: 0,
    grammarRule: 'সমার্থক দ্বন্দ্ব: সমাসবদ্ধ দুটি পদের অর্থ একই বা সমার্থক হলে তাকে সমার্থক দ্বন্দ্ব সমাস বলে।',
    explanation: 'হাট এবং বাজার মূলত একই অর্থ বহন করে (হাট ও বাজার = হাট-বাজার)। তাই এটি সমার্থক দ্বন্দ্ব সমাস।',
    mnemonicTip: 'একই অর্থযুক্ত দুটি শব্দ মিলে গঠিত দ্বন্দ্ব: হাট-বাজার, ঘর-দুয়ার, বই-পুস্তক, চিঠি-পত্র।'
  },
  {
    id: 'daily-28',
    dayNumber: 28,
    topic: 'কারক ও বিভক্তি',
    difficulty: 'মাঝারি',
    badge: 'বিশ্ববিদ্যালয় ভর্তি',
    question: '"জ্ঞানে অজ্ঞানের অন্ধকার দূর হয়" — এখানে "জ্ঞানে" কোন কারকে কোন বিভক্তি?',
    options: ['করণে সপ্তমী', 'অপাদানে সপ্তমী', 'অধিকরণে সপ্তমী', 'কর্মে সপ্তমী'],
    correctIndex: 0,
    grammarRule: 'করণ কারক: যে উপায়ে বা যার দ্বারা ক্রিয়া সিদ্ধ হয়। জ্ঞান হলো অন্ধকার দূর করার মাধ্যম বা হাতিয়ার।',
    explanation: 'জ্ঞানের দ্বারা অজ্ঞানের অন্ধকার দূর হয়। মাধ্যম নির্দেশ করায় এটি করণ কারক এবং "এ" বিভক্তি যুক্ত থাকায় করণে সপ্তমী।',
    mnemonicTip: 'অন্ধকার দূর করার উপকরণ বা উপায় কী? → জ্ঞান (করণ)।'
  },
  {
    id: 'daily-29',
    dayNumber: 29,
    topic: 'বাগধারা',
    difficulty: 'সহজ',
    badge: 'বিসিএস প্রিলিমিনারি',
    question: '"আটকপালে" বাগধারাটির বিপরীত বাগধারা কোনটি?',
    options: ['একাদশে বৃহস্পতি', 'কপাল পোড়া', 'অদৃষ্টের পরিহাস', 'ডুমুরের ফুল'],
    correctIndex: 0,
    grammarRule: '"আটকপালে" অর্থ হতভাগ্য বা মন্দভাগ্য। এর বিপরীত সৌভাগ্যবান বোঝাতে "একাদশে বৃহস্পতি" ব্যবহৃত হয়।',
    explanation: 'আটকপালে = দুর্ভাগ্য। অপরদিকে একাদশে বৃহস্পতি = সৌভাগ্যের বিষয়। তাই এটি সঠিক বিপরীত ভাব প্রকাশ করে।',
    mnemonicTip: 'আটকপালে = দুর্ভাগা; একাদশে বৃহস্পতি = সৌভাগ্যের চূড়ায়।'
  },
  {
    id: 'daily-30',
    dayNumber: 30,
    topic: 'ণ-ত্ব ও ষ-ত্ব বিধান',
    difficulty: 'কঠিন',
    badge: 'বিসিএস ও শিক্ষক নিবন্ধন',
    question: 'নিচের কোন শব্দটিতে ণ-ত্ব বিধানের নিয়মানুযায়ী "ণ" হয়েছে?',
    options: ['কল্যাণ', 'কারণ', 'পুণ্য', 'বাণিজ্য'],
    correctIndex: 1,
    grammarRule: 'ণ-ত্ব বিধানের সাধারণ নিয়ম: একই শব্দের মধ্যে ঋ, র, ষ এর পর স্বরবর্ণ, ক-বর্গ, প-বর্গ বা য, য়, হ, ং থাকলে পরবর্তী ন মূর্ধন্য ণ হয়।',
    explanation: '"কারণ" শব্দে "র" এর পর আ-কার এবং তারপর নিয়মানুযায়ী "ণ" হয়েছে। কিন্তু কল্যাণ, পুণ্য, বাণিজ্য — এই তিনটি শব্দে কোনো নিয়ম ছাড়াই স্বভাবতই মূর্ধন্য-ণ হয়।',
    mnemonicTip: 'র-এর পর স্বরবর্ণ থাকলে ণ বসে: কা + র + ণ = কারণ (নিয়মবদ্ধ)। অন্যগুলো স্বভাবতই ণ।'
  },
  {
    id: 'daily-31',
    dayNumber: 31,
    topic: 'বাক্য প্রকরণ',
    difficulty: 'মাঝারি',
    badge: 'এইচএসসি ও বিশ্ববিদ্যালয়',
    question: '"বিদ্বান হলেও তার অহংকার নেই" — এটি কোন ধরনের বাক্য?',
    options: ['সরল বাক্য', 'যৌগিক বাক্য', 'জটিল বাক্য', 'নাস্ত্যর্থক বাক্য'],
    correctIndex: 0,
    grammarRule: 'সরল বাক্য: যে বাক্যে একটিমাত্র কর্তা (উদ্দেশ্য) এবং একটিমাত্র সমাপিকা ক্রিয়া (বিধেয়) থাকে।',
    explanation: 'এখানে কোনো সংযোজক অব্যয় বা আশ্রিত বাক্য নেই, একটিমাত্র প্রধান সমাপিকা ক্রিয়া "নেই" রয়েছে। তাই এটি সরল বাক্য। (যৌগিক করলে হবে: "তিনি বিদ্বান, কিন্তু অহংকারী নন")।',
    mnemonicTip: 'একটিমাত্র সমাপিকা ক্রিয়া থাকলে নির্দ্বিধায় সরল বাক্য।'
  }
];

// Helper to convert English digits to Bengali digits
export function toBengaliDigits(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => {
      const parsed = parseInt(char, 10);
      return isNaN(parsed) ? char : bnDigits[parsed];
    })
    .join('');
}

// Bengali month names
const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর'
];

const BENGALI_WEEKDAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার'
];

// Format Date to "শনিবার, ৫ সেপ্টেম্বর, ২০২৬"
export function formatBengaliDate(dateObj: Date = new Date()): {
  weekday: string;
  day: string;
  month: string;
  year: string;
  fullDateText: string;
} {
  const weekday = BENGALI_WEEKDAYS[dateObj.getDay()];
  const day = toBengaliDigits(dateObj.getDate());
  const month = BENGALI_MONTHS[dateObj.getMonth()];
  const year = toBengaliDigits(dateObj.getFullYear());

  return {
    weekday,
    day,
    month,
    year,
    fullDateText: `${weekday}, ${day} ${month}, ${year}`
  };
}

// Get standard date key (YYYY-MM-DD)
export function getDateKey(dateObj: Date = new Date()): string {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Determine yesterday's date string
export function getYesterdayDateKey(todayObj: Date = new Date()): string {
  const yesterday = new Date(todayObj);
  yesterday.setDate(yesterday.getDate() - 1);
  return getDateKey(yesterday);
}

// Deterministically pick daily challenge for any given date string
export function getDailyChallengeForDate(dateKey: string): DailyChallengeQuestion {
  // Hash the dateKey string to select an index deterministically
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const positiveIndex = Math.abs(hash) % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[positiveIndex];
}

// Local Storage Key
export const STREAK_STORAGE_KEY = 'bangla_grammar_user_streak';

export const DEFAULT_USER_STREAK: UserStreakState = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  totalCompleted: 0,
  totalCorrect: 0,
  points: 0,
  completedHistory: {}
};

// Load Streak State from LocalStorage
export function loadUserStreakState(): UserStreakState {
  try {
    const saved = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!saved) return DEFAULT_USER_STREAK;
    const parsed = JSON.parse(saved);

    // Verify if streak has lapsed (more than 1 day missed)
    const todayKey = getDateKey();
    const yesterdayKey = getYesterdayDateKey();

    if (parsed.lastCompletedDate) {
      if (parsed.lastCompletedDate !== todayKey && parsed.lastCompletedDate !== yesterdayKey) {
        // Streak is broken
        return {
          ...parsed,
          currentStreak: 0
        };
      }
    }

    return parsed;
  } catch (e) {
    return DEFAULT_USER_STREAK;
  }
}

// Save Streak State to LocalStorage
export function saveUserStreakState(state: UserStreakState): void {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save streak state to localStorage', e);
  }
}

// Record a completed daily challenge
export function recordDailyCompletion(
  questionId: string,
  selectedOption: number,
  isCorrect: boolean,
  dateKey: string = getDateKey()
): UserStreakState {
  const current = loadUserStreakState();

  // If already answered for this date, do not duplicate streak increment
  if (current.completedHistory[dateKey]) {
    return current;
  }

  const yesterdayKey = getYesterdayDateKey();
  let nextStreak = 1;

  if (current.lastCompletedDate === yesterdayKey) {
    nextStreak = current.currentStreak + 1;
  } else if (current.lastCompletedDate === dateKey) {
    nextStreak = current.currentStreak;
  } else {
    nextStreak = 1;
  }

  const newLongest = Math.max(current.longestStreak, nextStreak);
  const earnedPoints = (isCorrect ? 30 : 15) + (nextStreak > 1 ? nextStreak * 5 : 0);

  const updated: UserStreakState = {
    currentStreak: nextStreak,
    longestStreak: newLongest,
    lastCompletedDate: dateKey,
    totalCompleted: current.totalCompleted + 1,
    totalCorrect: current.totalCorrect + (isCorrect ? 1 : 0),
    points: current.points + earnedPoints,
    completedHistory: {
      ...current.completedHistory,
      [dateKey]: {
        questionId,
        selectedOption,
        isCorrect,
        timestamp: Date.now()
      }
    }
  };

  saveUserStreakState(updated);
  return updated;
}
