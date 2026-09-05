export type GrammarCategory = 
  | 'ধ্বনি ও বর্ণ'
  | 'সন্ধি'
  | 'সমাস'
  | 'কারক ও বিভক্তি'
  | 'পদ প্রকরণ'
  | 'ণ-ত্ব ও ষ-ত্ব বিধান'
  | 'উপসর্গ ও অনুসর্গ'
  | 'প্রত্যয়'
  | 'বাক্য প্রকরণ'
  | 'বাগধারা ও শব্দভাণ্ডার';

export interface GrammarLesson {
  id: string;
  category: GrammarCategory;
  title: string;
  titleEn: string;
  badge: string;
  shortDesc: string;
  importance: 'প্রাথমিক' | 'মাধ্যমিক' | 'উচ্চতর ও বিসিএস';
  content: {
    introduction: string;
    keyDefinitions: { term: string; definition: string; example?: string }[];
    rules: {
      ruleNumber?: string;
      title: string;
      explanation: string;
      formula?: string;
      examples: { input: string; output?: string; note?: string }[];
    }[];
    shortcutTricks?: string[];
    commonExceptions?: string[];
  };
}

export interface SandhiItem {
  id: string;
  word: string;
  split: string;
  type: 'স্বরসন্ধি' | 'ব্যঞ্জনসন্ধি' | 'বিসর্গসন্ধি' | 'নিপাতনে সিদ্ধ';
  formula: string;
  explanation: string;
}

export interface SamasItem {
  id: string;
  word: string;
  byasbakya: string;
  type: 'দ্বন্দ্ব' | 'কর্মধারয়' | 'তৎপুরুষ' | 'বহুব্রীহি' | 'দ্বিগু' | 'অব্যয়ীভাব' | 'প্রাদি ও নিত্য';
  trick: string;
  meaning: string;
}

export interface KarakGuide {
  id: string;
  name: string;
  nameEn: string;
  questionPrompt: string; // e.g., "ক্রিয়াকে 'কে' বা 'কারা' দিয়ে প্রশ্ন করলে"
  definition: string;
  easyRule: string;
  examples: {
    sentence: string;
    targetWord: string;
    bibhakti: string;
    explanation: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'সহজ' | 'মাঝারি' | 'কঠিন';
}

export interface FlashCardItem {
  id: string;
  category: 'বাগধারা' | 'এককথায় প্রকাশ' | 'ণ-ত্ব ও ষ-ত্ব' | 'উপসর্গ';
  front: string;
  back: string;
  exampleSentence?: string;
  hint?: string;
}

export interface WordAnalysis {
  word: string;
  podo: string;
  karak?: string;
  bibhakti?: string;
  rootOrSandhi?: string;
  note?: string;
}

export interface DailyChallengeQuestion {
  id: string;
  dayNumber?: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  grammarRule: string;
  difficulty: 'সহজ' | 'মাঝারি' | 'কঠিন';
  mnemonicTip?: string;
  badge?: string;
}

export interface UserStreakState {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  totalCompleted: number;
  totalCorrect: number;
  points: number;
  completedHistory: Record<string, {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    timestamp: number;
  }>;
}

export interface SentenceAnalysisResult {
  sentence: string;
  sentenceTypeFormation: string;
  sentenceTypeMeaning?: string;
  overallSummary: string;
  hasErrors?: boolean;
  correctedSentence?: string;
  errorNotes?: string[];
  wordsAnalysis: WordAnalysis[];
  learningTip?: string;
}

// ================= Bangla Literature Types =================
export type LiteratureEra = 'প্রাচীন যুগ' | 'মধ্যযুগ' | 'আধুনিক যুগ';

export interface AuthorProfile {
  id: string;
  name: string;
  nameEn?: string;
  titleOrHonorific: string; // e.g. 'বিশ্বকবি', 'বিদ্রোহী কবি', 'সাহিত্যসম্রাট'
  penName?: string; // e.g. 'ভানুসিংহ ঠাকুর'
  birthDeath: string; // e.g. '১৮৬১ - ১৯৪১'
  era: LiteratureEra;
  avatarIcon?: string;
  summary: string;
  keyContributions: string[];
  works: {
    category: 'উপন্যাস' | 'কাব্যগ্রন্থ' | 'নাটক' | 'ছোটগল্প' | 'প্রবন্ধ' | 'গান ও অন্যান্য';
    titles: string[];
  }[];
  famousQuotes?: string[];
  famousCharacters?: string[];
  examImportantFacts: string[];
}

export interface LiteratureEraInfo {
  id: string;
  era: LiteratureEra;
  timeRange: string;
  title: string;
  overview: string;
  historicalSignificance: string;
  keyHighlights: {
    heading: string;
    description: string;
    worksOrWriters: string[];
  }[];
  examPointers: string[];
}

export interface FamousCharacter {
  id: string;
  character: string;
  work: string;
  genre: string;
  author: string;
  significance: string;
}

export interface LiteraryPeriodical {
  id: string;
  name: string;
  editor: string;
  establishedYear: string;
  significance: string;
  notableContributors?: string;
}

export interface LiteraryQuote {
  id: string;
  quote: string;
  source: string;
  author: string;
  context: string;
}

export interface LiteratureQuizQuestion {
  id: string;
  era: LiteratureEra | 'সাধারণ জ্ঞান';
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'সহজ' | 'মাঝারি' | 'কঠিন';
}
