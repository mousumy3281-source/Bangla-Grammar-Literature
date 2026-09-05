import React from 'react';
import { BookOpen, Compass, Search, HelpCircle, Sparkles, Layers, Award, Flame, BookMarked } from 'lucide-react';

export type ActiveTab = 'lessons' | 'challenge' | 'literature' | 'analyzer' | 'sandhi-samas' | 'karak' | 'quiz' | 'flashcards';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  aiStatus: boolean;
  streakCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  aiStatus,
  streakCount = 0
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg backdrop-blur">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('lessons')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-md border border-emerald-400/30">
              বা
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">বাংলা ব্যাকরণ</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                  Grammar Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                সহজ ব্যাখ্যা • দৈনিক চ্যালেঞ্জ • কুইজ • বাক্য বিশ্লেষণ
              </p>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              id="global-grammar-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সন্ধি, সমাস, কারক বা যেকোনো শব্দ খুঁজুন..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Right Action Badges (Daily Streak & AI Tool) */}
          <div className="flex items-center gap-2">
            {/* Daily Streak Top Pill */}
            <button
              id="header-daily-streak-btn"
              onClick={() => setActiveTab('challenge')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeTab === 'challenge'
                  ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                  : 'bg-orange-500/15 text-orange-300 border-orange-500/30 hover:bg-orange-500/25'
              }`}
              title="দৈনিক চ্যালেঞ্জ ও স্ট্রিক"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>{streakCount > 0 ? `${streakCount} দিন` : 'চ্যালেঞ্জ'}</span>
            </button>

            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                activeTab === 'analyzer' 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">AI বাক্য পরীক্ষক</span>
              <span className="sm:hidden">AI টুল</span>
              {aiStatus && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="AI সক্রিয়"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/90 border-t border-slate-800/70 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 py-2">
          
          <button
            id="tab-lessons"
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'lessons'
                ? 'bg-emerald-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>পাঠ্যসূচী ও নিয়মাবলী</span>
          </button>

          <button
            id="tab-challenge"
            onClick={() => setActiveTab('challenge')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'challenge'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-orange-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400/80 animate-pulse" />
            <span>দৈনিক চ্যালেঞ্জ</span>
            {streakCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/30 text-orange-200 font-bold">
                {streakCount}🔥
              </span>
            )}
          </button>

          <button
            id="tab-literature"
            onClick={() => setActiveTab('literature')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'literature'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-amber-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-400" />
            <span>বাংলা সাহিত্য</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              নতুন
            </span>
          </button>

          <button
            id="tab-analyzer"
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'analyzer'
                ? 'bg-emerald-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>বাক্য বিশ্লেষণ ও AI শিক্ষক</span>
          </button>

          <button
            id="tab-sandhi-samas"
            onClick={() => setActiveTab('sandhi-samas')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'sandhi-samas'
                ? 'bg-emerald-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-teal-400" />
            <span>সন্ধি ও সমাস ডিরেক্টরি</span>
          </button>

          <button
            id="tab-karak"
            onClick={() => setActiveTab('karak')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'karak'
                ? 'bg-emerald-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>কারক ও বিভক্তি গাইড</span>
          </button>

          <button
            id="tab-quiz"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'quiz'
                ? 'bg-emerald-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span>কুইজ ও পরীক্ষা</span>
          </button>

          <button
            id="tab-flashcards"
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-emerald-600/90 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>বাগধারা ও ফ্ল্যাশ কার্ড</span>
          </button>

        </div>
      </div>
    </header>
  );
};
