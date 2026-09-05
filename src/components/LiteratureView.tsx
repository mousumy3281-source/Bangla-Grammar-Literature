import React, { useState, useMemo } from 'react';
import { 
  LITERATURE_ERAS, 
  PROMINENT_AUTHORS, 
  FAMOUS_CHARACTERS, 
  LITERARY_PERIODICALS, 
  FAMOUS_LITERARY_QUOTES, 
  LITERATURE_QUIZ 
} from '../data/literatureData';
import { AuthorProfile, LiteratureEra } from '../types';
import { 
  BookOpen, 
  History, 
  Sparkles, 
  Search, 
  Quote, 
  Newspaper, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Copy, 
  Check, 
  ChevronRight, 
  Users, 
  GraduationCap, 
  HelpCircle,
  Clock,
  BookmarkCheck
} from 'lucide-react';

interface LiteratureViewProps {
  initialSearch?: string;
}

type SubTab = 'eras' | 'authors' | 'characters' | 'magazines' | 'quotes' | 'quiz';

export const LiteratureView: React.FC<LiteratureViewProps> = ({ initialSearch = '' }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('eras');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedEra, setSelectedEra] = useState<LiteratureEra | 'all'>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorProfile | null>(PROMINENT_AUTHORS[0]);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFilter, setQuizFilter] = useState<LiteratureEra | 'all'>('all');

  // Filtered authors
  const filteredAuthors = useMemo(() => {
    return PROMINENT_AUTHORS.filter(author => {
      const matchesEra = selectedEra === 'all' || author.era === selectedEra;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        author.name.toLowerCase().includes(q) ||
        (author.titleOrHonorific && author.titleOrHonorific.toLowerCase().includes(q)) ||
        (author.penName && author.penName.toLowerCase().includes(q)) ||
        author.works.some(w => w.titles.some(t => t.toLowerCase().includes(q)));
      return matchesEra && matchesSearch;
    });
  }, [selectedEra, searchQuery]);

  // Filtered characters
  const filteredCharacters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FAMOUS_CHARACTERS;
    return FAMOUS_CHARACTERS.filter(char => 
      char.character.toLowerCase().includes(q) ||
      char.work.toLowerCase().includes(q) ||
      char.author.toLowerCase().includes(q) ||
      char.significance.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered magazines
  const filteredMagazines = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return LITERARY_PERIODICALS;
    return LITERARY_PERIODICALS.filter(mag => 
      mag.name.toLowerCase().includes(q) ||
      mag.editor.toLowerCase().includes(q) ||
      mag.significance.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered quotes
  const filteredQuotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FAMOUS_LITERARY_QUOTES;
    return FAMOUS_LITERARY_QUOTES.filter(quote => 
      quote.quote.toLowerCase().includes(q) ||
      quote.author.toLowerCase().includes(q) ||
      quote.source.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Quiz questions filtered
  const activeQuizList = useMemo(() => {
    if (quizFilter === 'all') return LITERATURE_QUIZ;
    return LITERATURE_QUIZ.filter(q => q.era === quizFilter);
  }, [quizFilter]);

  const currentQuestion = activeQuizList[currentQuizIndex] || activeQuizList[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < activeQuizList.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
  };

  const handleCopyQuote = (quote: string, id: string) => {
    navigator.clipboard.writeText(`"${quote}"`);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  return (
    <div id="literature-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              বাংলা সাহিত্য পরিক্রমা
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              বাংলা সাহিত্যের ইতিহাস, কালজয়ী স্রষ্টা ও সাহিত্যসম্ভার
            </h1>
            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed">
              চর্যাপদের প্রাচীনতম পদ থেকে শুরু করে মধ্যযুগের মঙ্গলকাব্য ও আধুনিক যুগের মহাকাব্য, রবীন্দ্র-নজরুল সাহিত্য এবং মুক্তিযুদ্ধভিত্তিক সাহিত্যকর্মের এক অনন্য প্রামাণ্য কোষ।
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xl font-extrabold text-amber-300">৩টি যুগ</div>
              <div className="text-[11px] text-amber-100">প্রাচীন, মধ্য ও আধুনিক</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xl font-extrabold text-amber-300">{PROMINENT_AUTHORS.length}+ জন</div>
              <div className="text-[11px] text-amber-100">কালজয়ী সাহিত্যিক</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xl font-extrabold text-amber-300">{FAMOUS_CHARACTERS.length}+ টি</div>
              <div className="text-[11px] text-amber-100">অমর সাহিত্য চরিত্র</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xl font-extrabold text-amber-300">{LITERATURE_QUIZ.length}+ টি</div>
              <div className="text-[11px] text-amber-100">বিসিএস ও ভর্তি প্রশ্ন</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            id="subtab-eras"
            onClick={() => setActiveSubTab('eras')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeSubTab === 'eras'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>যুগ ও ইতিহাস</span>
          </button>

          <button
            id="subtab-authors"
            onClick={() => setActiveSubTab('authors')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeSubTab === 'authors'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>প্রধান সাহিত্যিক ও সৃষ্টি</span>
          </button>

          <button
            id="subtab-characters"
            onClick={() => setActiveSubTab('characters')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeSubTab === 'characters'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>অমর চরিত্র ও গ্রন্থ</span>
          </button>

          <button
            id="subtab-magazines"
            onClick={() => setActiveSubTab('magazines')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeSubTab === 'magazines'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>পত্র-পত্রিকা ও আন্দোলন</span>
          </button>

          <button
            id="subtab-quotes"
            onClick={() => setActiveSubTab('quotes')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeSubTab === 'quotes'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>কালজয়ী উক্তি</span>
          </button>

          <button
            id="subtab-quiz"
            onClick={() => setActiveSubTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeSubTab === 'quiz'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>সাহিত্য কুইজ ({LITERATURE_QUIZ.length})</span>
          </button>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[200px] sm:min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কবি, উপন্যাস, চরিত্র বা উক্তি খুঁজুন..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. যুগ ও ইতিহাস (Eras & History) Tab */}
      {/* ========================================================= */}
      {activeSubTab === 'eras' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LITERATURE_ERAS.map((era) => (
              <div 
                key={era.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:scale-110"></div>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {era.era}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {era.timeRange}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-900 transition">
                    {era.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {era.overview}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                    পরীক্ষায় বারবার আসা তথ্যাবলী:
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {era.examPointers.slice(0, 3).map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-600">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Timeline Sections */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-800" />
              যুগভিত্তিক গভীর পর্যালোচনা ও ঐতিহাসিক নিদর্শন
            </h2>

            {LITERATURE_ERAS.map((era) => (
              <div key={`detail-${era.id}`} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{era.era}</span>
                    <h3 className="text-lg font-bold text-slate-900">{era.title} ({era.timeRange})</h3>
                  </div>
                  <span className="text-xs px-3 py-1 bg-slate-100 rounded-lg text-slate-600 font-medium">
                    বিসিএস ও বিশ্ববিদ্যালয় ভর্তি স্পেশাল
                  </span>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/60 text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    ঐতিহাসিক পটভূমি ও প্রামাণিক আবিষ্কার:
                  </div>
                  {era.historicalSignificance}
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {era.keyHighlights.map((hl, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-amber-800 text-white flex items-center justify-center text-[11px] font-bold">
                          {i + 1}
                        </span>
                        {hl.heading}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {hl.description}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-1">
                        {hl.worksOrWriters.map((item, j) => (
                          <span key={j} className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exam Pointers Full */}
                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    {era.era}-র অবশ্য জ্ঞাত বিসিএস ও চাকরির পরীক্ষার পয়েন্টারসমূহ
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {era.examPointers.map((pointer, k) => (
                      <div key={k} className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pointer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. প্রধান সাহিত্যিক ও গ্রন্থাবলী (Authors & Masterpieces) */}
      {/* ========================================================= */}
      {activeSubTab === 'authors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Author Selector */}
          <div className="lg:col-span-4 space-y-3">
            
            {/* Era Filter Pill */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {(['all', 'প্রাচীন যুগ', 'মধ্যযুগ', 'আধুনিক যুগ'] as const).map((eraOpt) => (
                <button
                  key={eraOpt}
                  onClick={() => setSelectedEra(eraOpt)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    selectedEra === eraOpt
                      ? 'bg-amber-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {eraOpt === 'all' ? 'সকল যুগ' : eraOpt}
                </button>
              ))}
            </div>

            {/* Author List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
              {filteredAuthors.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  কোনো সাহিত্যিক পাওয়া যায়নি। অনুসন্ধান পরিমার্জন করুন।
                </div>
              ) : (
                filteredAuthors.map((author) => {
                  const isSelected = selectedAuthor?.id === author.id;
                  return (
                    <button
                      key={author.id}
                      onClick={() => setSelectedAuthor(author)}
                      className={`w-full text-left p-3.5 flex items-start gap-3 transition ${
                        isSelected 
                          ? 'bg-amber-50/90 text-amber-950 border-l-4 border-l-amber-800'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shrink-0 border border-amber-200 shadow-xs">
                        {author.avatarIcon || '✍️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-sm truncate">{author.name}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium shrink-0">
                            {author.era}
                          </span>
                        </div>
                        <p className="text-xs text-amber-800 font-medium truncate mt-0.5">
                          {author.titleOrHonorific}
                        </p>
                        {author.penName && (
                          <p className="text-[11px] text-slate-500 truncate">
                            ছদ্মনাম: {author.penName}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Selected Author Full Dossier */}
          <div className="lg:col-span-8">
            {selectedAuthor ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                
                {/* Author Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl border border-amber-300 shadow-sm">
                      {selectedAuthor.avatarIcon || '📜'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-slate-900">{selectedAuthor.name}</h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-200">
                          {selectedAuthor.era}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-amber-800 mt-0.5">
                        {selectedAuthor.titleOrHonorific}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>জীবনকাল: {selectedAuthor.birthDeath}</span>
                        {selectedAuthor.penName && (
                          <>
                            <span>•</span>
                            <span>ছদ্মনাম: <strong className="text-slate-700">{selectedAuthor.penName}</strong></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Summary */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedAuthor.summary}
                </div>

                {/* Key Contributions */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    মূল সাহিত্যিক অবদান ও যুগান্তকারী কীর্তি
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedAuthor.keyContributions.map((contrib, i) => (
                      <div key={i} className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50 text-xs text-amber-950">
                        <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{contrib}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categorized Masterpieces */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    বিখ্যাত গ্রন্থাবলী ও সৃষ্টিকর্ম
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedAuthor.works.map((cat, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                          <span>{cat.category}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                            {cat.titles.length} টি
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.titles.map((title, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-xs px-2.5 py-1 rounded-md bg-white text-slate-800 border border-slate-200/90 font-medium shadow-2xs hover:border-amber-400 hover:text-amber-900 transition"
                            >
                              {title}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Famous Characters Created */}
                {selectedAuthor.famousCharacters && selectedAuthor.famousCharacters.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      এই সাহিত্যিকের অবিস্মরণীয় চরিত্রসমূহ
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAuthor.famousCharacters.map((char, cIdx) => (
                        <span key={cIdx} className="text-xs px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium">
                          👤 {char}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Famous Quotes */}
                {selectedAuthor.famousQuotes && selectedAuthor.famousQuotes.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-amber-600" />
                      কালজয়ী অমর পঙ্‌ক্তি
                    </h3>
                    <div className="space-y-2">
                      {selectedAuthor.famousQuotes.map((quote, qIdx) => (
                        <div key={qIdx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 italic flex items-center justify-between gap-3">
                          <span>{quote}</span>
                          <button
                            onClick={() => handleCopyQuote(quote, `auth-q-${qIdx}`)}
                            className="text-slate-400 hover:text-slate-700 p-1 rounded shrink-0 transition"
                            title="উক্তিটি কপি করুন"
                          >
                            {copiedQuoteId === `auth-q-${qIdx}` ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BCS / Exam Focused Facts */}
                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 space-y-2.5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    বিসিএস ও প্রতিযোগিতামূলক পরীক্ষার গুরুত্বপূর্ণ নোট
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedAuthor.examImportantFacts.map((fact, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                বাম পাশের তালিকা থেকে যেকোনো সাহিত্যিক নির্বাচন করুন।
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* 3. অমর চরিত্র ও গ্রন্থ (Famous Characters) */}
      {/* ========================================================= */}
      {activeSubTab === 'characters' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-800" />
              বাংলা সাহিত্যের অমর ও কালজয়ী চরিত্র তালিকা ({filteredCharacters.length})
            </h2>
            <span className="text-xs text-slate-500">
              চরিত্রের নাম, সাহিত্যকর্ম ও তাৎপর্য
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCharacters.map((char) => (
              <div 
                key={char.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-amber-800 px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
                      {char.genre}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">
                      {char.character}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-800">{char.work}</div>
                    <div className="text-[11px] text-slate-500">রচয়িতা: {char.author}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                  {char.significance}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. পত্র-পত্রিকা ও আন্দোলন (Literary Periodicals) */}
      {/* ========================================================= */}
      {activeSubTab === 'magazines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-amber-800" />
              বাংলা সাহিত্যের দিকনির্দেশক সাময়িকী ও পত্রিকা ({filteredMagazines.length})
            </h2>
            <span className="text-xs text-slate-500">
              ভাষা আন্দোলন ও বুদ্ধির মুক্তি
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMagazines.map((mag) => (
              <div 
                key={mag.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      প্রতিষ্ঠা: {mag.establishedYear}
                    </span>
                    <Newspaper className="w-4 h-4 text-amber-700" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{mag.name}</h3>
                  <div className="text-xs text-amber-800 font-medium">
                    সম্পাদক: <strong>{mag.editor}</strong>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mag.significance}
                  </p>
                </div>

                {mag.notableContributors && (
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <strong className="text-slate-700">প্রধান লেখকবৃন্দ:</strong> {mag.notableContributors}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. কালজয়ী উক্তি (Quotes) */}
      {/* ========================================================= */}
      {activeSubTab === 'quotes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Quote className="w-4 h-4 text-amber-800" />
              বাংলা সাহিত্যের অমর পঙ্‌ক্তি ও কালজয়ী উক্তি ({filteredQuotes.length})
            </h2>
            <span className="text-xs text-slate-500">
              ক্লিক করে কপি করুন
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuotes.map((qItem) => (
              <div 
                key={qItem.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Quote className="w-5 h-5 text-amber-700/60" />
                    <button
                      onClick={() => handleCopyQuote(qItem.quote, qItem.id)}
                      className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                      title="উক্তিটি কপি করুন"
                    >
                      {copiedQuoteId === qItem.id ? (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> কপি হয়েছে
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <blockquote className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    "{qItem.quote}"
                  </blockquote>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-amber-900">{qItem.author}</strong>
                    <span className="text-slate-500"> — {qItem.source}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{qItem.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. সাহিত্য কুইজ ও প্রস্তুতি (Quiz & Self-Assessment) */}
      {/* ========================================================= */}
      {activeSubTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Quiz Header & Era Selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                {currentQuizIndex + 1}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  প্রশ্ন {currentQuizIndex + 1} / {activeQuizList.length}
                </div>
                <div className="text-xs text-slate-800 font-medium">
                  সঠিক উত্তর: <strong className="text-emerald-600 font-bold">{quizScore}</strong>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-1">
              {(['all', 'প্রাচীন যুগ', 'মধ্যযুগ', 'আধুনিক যুগ'] as const).map((filterOpt) => (
                <button
                  key={filterOpt}
                  onClick={() => {
                    setQuizFilter(filterOpt);
                    setCurrentQuizIndex(0);
                    setSelectedOption(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    quizFilter === filterOpt
                      ? 'bg-amber-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filterOpt === 'all' ? 'সকল যুগ' : filterOpt}
                </button>
              ))}
            </div>
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              {/* Question metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-200">
                  {currentQuestion.era} • {currentQuestion.topic}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  কাঠিন্য: {currentQuestion.difficulty}
                </span>
              </div>

              {/* Question text */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;
                  const showResult = isAnswerSubmitted;

                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
                  if (isSelected && !showResult) {
                    btnStyle = 'bg-amber-50 text-amber-950 border-amber-600 ring-2 ring-amber-600/20';
                  } else if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 text-emerald-950 border-emerald-500 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 text-rose-950 border-rose-500';
                    } else {
                      btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  const bengaliOptionsPrefix = ['ক', 'খ', 'গ', 'ঘ'];

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {bengaliOptionsPrefix[idx]}
                        </span>
                        <span className="text-xs sm:text-sm">{opt}</span>
                      </div>
                      {showResult && (
                        <div>
                          {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                          {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-3.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  নতুন করে শুরু
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedOption === null}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm ${
                      selectedOption !== null
                        ? 'bg-amber-800 hover:bg-amber-900 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    উত্তর যাচাই করুন
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuizIndex >= activeQuizList.length - 1}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>পরবর্তী প্রশ্ন</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Explanation Box */}
              {isAnswerSubmitted && (
                <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-200/80 space-y-1.5 text-xs sm:text-sm animate-fadeIn">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    ব্যাখ্যা ও অতিরিক্ত তথ্য:
                  </div>
                  <p className="text-amber-950 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};
