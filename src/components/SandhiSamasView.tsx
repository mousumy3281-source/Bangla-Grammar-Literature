import React, { useState } from 'react';
import { SANDHI_DATABASE } from '../data/sandhiData';
import { SAMAS_DATABASE } from '../data/samasData';
import { Search, Compass, BookCheck, Sparkles, Filter } from 'lucide-react';

export const SandhiSamasView: React.FC<{ initialSearch?: string }> = ({ initialSearch = '' }) => {
  const [subTab, setSubTab] = useState<'sandhi' | 'samas'>('sandhi');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSandhiType, setSelectedSandhiType] = useState<string>('all');
  const [selectedSamasType, setSelectedSamasType] = useState<string>('all');

  // Interactive Sandhi Practice State
  const [practiceWordIndex, setPracticeWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const practiceItems = SANDHI_DATABASE.slice(0, 10);
  const currentPractice = practiceItems[practiceWordIndex];

  const handleCheckPractice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    // Normalize spacing and '+' symbols
    const cleanUser = userAnswer.replace(/\s+/g, '').replace('+', ' + ');
    const cleanSplit = currentPractice.split.replace(/\s+/g, '').replace('+', ' + ');

    if (cleanUser.toLowerCase() === cleanSplit.toLowerCase()) {
      setPracticeFeedback({
        correct: true,
        message: `চমৎকার! সঠিক হয়েছে: ${currentPractice.split} (${currentPractice.formula})`
      });
    } else {
      setPracticeFeedback({
        correct: false,
        message: `সঠিক উত্তর হলো: "${currentPractice.split}" (${currentPractice.formula})`
      });
    }
  };

  const handleNextPractice = () => {
    setUserAnswer('');
    setPracticeFeedback(null);
    setPracticeWordIndex((prev) => (prev + 1) % practiceItems.length);
  };

  // Filtered Sandhi
  const filteredSandhi = SANDHI_DATABASE.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.word.includes(searchTerm) ||
      item.split.includes(searchTerm) ||
      item.explanation.includes(searchTerm);
    const matchesType = selectedSandhiType === 'all' || item.type === selectedSandhiType;
    return matchesSearch && matchesType;
  });

  // Filtered Samas
  const filteredSamas = SAMAS_DATABASE.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.word.includes(searchTerm) ||
      item.byasbakya.includes(searchTerm) ||
      item.meaning.includes(searchTerm) ||
      item.trick.includes(searchTerm);
    const matchesType = selectedSamasType === 'all' || item.type === selectedSamasType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header & Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-teal-600" />
              সন্ধি ও সমাস কোষ (Directory)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              শতধিক বহুল ব্যবহৃত সন্ধি বিচ্ছেদ এবং ব্যাসবাক্য সহ সমাস নির্ণয়ের সহজ সংকলন।
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-auto">
            <button
              id="subtab-sandhi"
              onClick={() => {
                setSubTab('sandhi');
                setSearchTerm('');
              }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                subTab === 'sandhi'
                  ? 'bg-white text-emerald-900 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সন্ধি বিচ্ছেদ ({SANDHI_DATABASE.length})
            </button>
            <button
              id="subtab-samas"
              onClick={() => {
                setSubTab('samas');
                setSearchTerm('');
              }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                subTab === 'samas'
                  ? 'bg-white text-emerald-900 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সমাস ও ব্যাসবাক্য ({SAMAS_DATABASE.length})
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3 pt-4 border-t border-slate-100">
          
          <div className="md:col-span-7 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                subTab === 'sandhi'
                  ? 'শব্দ (যেমন: পরীক্ষা, দিগন্ত) বা নিয়ম দিয়ে খুঁজুন...'
                  : 'শব্দ (যেমন: সিংহাসন, মনমাঝি) বা ব্যাসবাক্য দিয়ে খুঁজুন...'
              }
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>

          {/* Type Dropdown / Filters */}
          <div className="md:col-span-5 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {subTab === 'sandhi' ? (
              <select
                value={selectedSandhiType}
                onChange={(e) => setSelectedSandhiType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">সব ধরনের সন্ধি</option>
                <option value="স্বরসন্ধি">স্বরসন্ধি</option>
                <option value="ব্যঞ্জনসন্ধি">ব্যঞ্জনসন্ধি</option>
                <option value="বিসর্গসন্ধি">বিসর্গসন্ধি</option>
                <option value="নিপাতনে সিদ্ধ">নিপাতনে সিদ্ধ সন্ধি</option>
              </select>
            ) : (
              <select
                value={selectedSamasType}
                onChange={(e) => setSelectedSamasType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">সব ধরনের সমাস</option>
                <option value="দ্বন্দ্ব">দ্বন্দ্ব সমাস</option>
                <option value="কর্মধারয়">কর্মধারয় সমাস</option>
                <option value="তৎপুরুষ">তৎপুরুষ সমাস</option>
                <option value="বহুব্রীহি">বহুব্রীহি সমাস</option>
                <option value="দ্বিগু">দ্বিগু সমাস</option>
                <option value="অব্যয়ীভাব">অব্যয়ীভাব সমাস</option>
                <option value="প্রাদি ও নিত্য">প্রাদি ও নিত্য সমাস</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Mini Interactive Practice Widget for Sandhi */}
      {subTab === 'sandhi' && (
        <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200 rounded-xl p-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                সন্ধি বিচ্ছেদ অনুশীলন (ইন্টারেক্টিভ)
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  "{currentPractice.word}"
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-medium">
                  {currentPractice.type}
                </span>
              </div>
            </div>

            <form onSubmit={handleCheckPractice} className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="যেমন: বিদ্যা + আলয়"
                className="px-3 py-1.5 text-sm bg-white border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition"
              >
                যাচাই করুন
              </button>
              <button
                type="button"
                onClick={handleNextPractice}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition"
              >
                পরবর্তী শব্দ
              </button>
            </form>
          </div>

          {practiceFeedback && (
            <div
              className={`mt-3 p-2.5 rounded-lg text-xs font-medium border ${
                practiceFeedback.correct
                  ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
                  : 'bg-amber-100/70 border-amber-300 text-amber-950'
              }`}
            >
              {practiceFeedback.message}
            </div>
          )}
        </div>
      )}

      {/* Main Grid Display */}
      {subTab === 'sandhi' ? (
        <div>
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <span>প্রদর্শিত হচ্ছে {filteredSandhi.length}টি সন্ধি বিচ্ছেদ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSandhi.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition hover:border-teal-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-base font-bold text-slate-900 tracking-wide">
                      {item.word}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      item.type === 'স্বরসন্ধি'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.type === 'ব্যঞ্জনসন্ধি'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : item.type === 'বিসর্গসন্ধি'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  {/* Split Formula */}
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 my-2">
                    <div className="text-sm font-semibold text-teal-900">
                      = {item.split}
                    </div>
                    {item.formula && (
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        সূত্র: {item.formula}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>

          {filteredSandhi.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              "{searchTerm}" সম্পর্কিত কোনো সন্ধি পাওয়া যায়নি।
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <span>প্রদর্শিত হচ্ছে {filteredSamas.length}টি সমাস ও ব্যাসবাক্য</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSamas.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition hover:border-emerald-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-base font-bold text-slate-900">
                      {item.word}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.type} সমাস
                    </span>
                  </div>

                  {/* Byasbakya */}
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 my-2">
                    <div className="text-xs text-slate-500">ব্যাসবাক্য:</div>
                    <div className="text-sm font-semibold text-emerald-800">
                      {item.byasbakya}
                    </div>
                    {item.meaning && (
                      <div className="text-[11px] text-slate-500 mt-1">
                        অর্থ: {item.meaning}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-xs bg-amber-50/70 text-amber-950 p-2 rounded border border-amber-200/70">
                  <span className="font-semibold text-amber-900">চেনার টেকনিক: </span>
                  {item.trick}
                </div>
              </div>
            ))}
          </div>

          {filteredSamas.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              "{searchTerm}" সম্পর্কিত কোনো সমাস পাওয়া যায়নি।
            </div>
          )}
        </div>
      )}

    </div>
  );
};
