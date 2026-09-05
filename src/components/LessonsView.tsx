import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../data/lessons';
import { GrammarLesson } from '../types';
import { BookOpen, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Flame, BookMarked } from 'lucide-react';

interface LessonsViewProps {
  searchQuery?: string;
  onOpenQuiz?: (topic: string) => void;
  onOpenSandhiSamas?: () => void;
  onOpenDailyChallenge?: () => void;
  onOpenLiterature?: () => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  searchQuery = '',
  onOpenQuiz,
  onOpenSandhiSamas,
  onOpenDailyChallenge,
  onOpenLiterature
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(GRAMMAR_LESSONS[0].id);

  // Filter lessons if there's an active search query
  const filteredLessons = GRAMMAR_LESSONS.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q) ||
      l.shortDesc.toLowerCase().includes(q) ||
      l.content.introduction.toLowerCase().includes(q)
    );
  });

  const activeLesson: GrammarLesson =
    filteredLessons.find((l) => l.id === selectedLessonId) || filteredLessons[0] || GRAMMAR_LESSONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Search status notice if filtered */}
      {searchQuery && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900 flex items-center justify-between">
          <span>
            অনুসন্ধান ফলাফল: <strong>"{searchQuery}"</strong> (পাওয়া গেছে {filteredLessons.length}টি অধ্যায়)
          </span>
          <span className="text-xs text-emerald-700">সকল অধ্যায় দেখতে সার্চ ফিল্ড পরিষ্কার করুন</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Lesson Topics */}
        <div className="lg:col-span-4 space-y-3">
          {/* Daily Challenge Quick Banner */}
          {onOpenDailyChallenge && (
            <div
              id="sidebar-daily-challenge-banner"
              onClick={onOpenDailyChallenge}
              className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-3.5 text-white shadow-sm cursor-pointer hover:shadow-md transition flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-white fill-white animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-100">
                    দৈনিক চ্যালেঞ্জ
                  </div>
                  <div className="text-xs font-semibold text-white group-hover:underline">
                    আজকের প্রশ্ন সমাধান করুন →
                  </div>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium shrink-0">
                স্ট্রিক রক্ষা করুন
              </span>
            </div>
          )}

          {/* Bangla Literature Quick Banner */}
          {onOpenLiterature && (
            <div
              id="sidebar-literature-banner"
              onClick={onOpenLiterature}
              className="bg-gradient-to-r from-amber-800 to-stone-800 rounded-xl p-3.5 text-white shadow-sm cursor-pointer hover:shadow-md transition flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <BookMarked className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-200">
                    বাংলা সাহিত্য কোষ
                  </div>
                  <div className="text-xs font-semibold text-white group-hover:underline">
                    চর্যাপদ, রবীন্দ্র-নজরুল ও বিসিএস প্রস্তুতি →
                  </div>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 font-medium shrink-0">
                নতুন অধ্যায়
              </span>
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-1 mb-2">
              ব্যাকরণ অধ্যায়সমূহ ({filteredLessons.length})
            </h2>

            <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isSelected = lesson.id === activeLesson?.id;
                return (
                  <button
                    key={lesson.id}
                    id={`lesson-item-${lesson.id}`}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-left p-3 rounded-lg transition border flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {lesson.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {lesson.importance}
                      </span>
                    </div>

                    <h3 className="font-semibold text-sm leading-snug text-slate-900 mt-1">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {lesson.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Main Content: Detailed Chapter Content */}
        <div className="lg:col-span-8">
          {activeLesson ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              
              {/* Chapter Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {activeLesson.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200">
                    {activeLesson.badge}
                  </span>
                  <span className="text-xs text-slate-500 ml-auto">
                    প্রয়োজনীয়তা: {activeLesson.importance}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {activeLesson.title}
                </h1>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  {activeLesson.shortDesc}
                </p>
              </div>

              {/* Introduction */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h3 className="text-sm font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  ভূমিকা ও মূল ধারণা
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  {activeLesson.content.introduction}
                </p>
              </div>

              {/* Key Definitions */}
              {activeLesson.content.keyDefinitions?.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    সংজ্ঞা ও পারিভাষিক অর্থ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeLesson.content.keyDefinitions.map((def, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200"
                      >
                        <h4 className="text-sm font-semibold text-emerald-800 mb-1">
                          {def.term}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-600">
                          {def.definition}
                        </p>
                        {def.example && (
                          <div className="mt-2 text-xs font-medium text-slate-700 bg-white p-2 rounded border border-slate-100">
                            যেমন: <span className="text-emerald-700">{def.example}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Rules with Formulas & Examples */}
              {activeLesson.content.rules?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    নিয়মাবলী ও দৃষ্টান্ত
                  </h3>

                  <div className="space-y-4">
                    {activeLesson.content.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden"
                      >
                        <div className="bg-slate-100/70 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">
                            {rule.ruleNumber ? `নিয়ম ${rule.ruleNumber}: ` : ''}
                            {rule.title}
                          </span>
                          {rule.formula && (
                            <span className="text-xs font-mono bg-emerald-100/80 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                              {rule.formula}
                            </span>
                          )}
                        </div>

                        <div className="p-4 space-y-3">
                          <p className="text-xs sm:text-sm text-slate-700">
                            {rule.explanation}
                          </p>

                          {/* Examples Grid / Table */}
                          <div className="bg-slate-50 rounded-lg border border-slate-200/80 overflow-hidden">
                            <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                              {rule.examples.map((eg, eIdx) => (
                                <div
                                  key={eIdx}
                                  className="px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-emerald-50/40 transition"
                                >
                                  <span className="font-medium text-slate-900">
                                    {eg.input}
                                  </span>
                                  {eg.output && (
                                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 inline" />
                                      {eg.output}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shortcut Tricks (ম্যাজিক শর্টকাট টেকনিক) */}
              {activeLesson.content.shortcutTricks && activeLesson.content.shortcutTricks.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-xl p-4 border border-amber-200">
                  <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    পরীক্ষার শর্টকাট টেকনিক (স্মৃতি সহায়ক)
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                    {activeLesson.content.shortcutTricks.map((trick, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{trick}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Exceptions */}
              {activeLesson.content.commonExceptions && activeLesson.content.commonExceptions.length > 0 && (
                <div className="bg-rose-50/70 rounded-xl p-4 border border-rose-200">
                  <h3 className="text-sm font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    নিয়ম বহির্ভূত ও গুরুত্বপূর্ণ ব্যতিক্রম
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-rose-950">
                    {activeLesson.content.commonExceptions.map((ex, exIdx) => (
                      <li key={exIdx} className="flex items-start gap-2">
                        <span className="font-bold text-rose-600">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  অধ্যায়টি সম্পূর্ণ পড়েছেন? আপনার প্রস্তুতি যাচাই করতে এখনই কুইজে অংশ নিন।
                </div>

                <div className="flex items-center gap-2">
                  {(activeLesson.id === 'sandhi' || activeLesson.id === 'samas') && onOpenSandhiSamas && (
                    <button
                      onClick={onOpenSandhiSamas}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100 transition"
                    >
                      {activeLesson.id === 'sandhi' ? 'সন্ধি ডিরেক্টরি দেখুন' : 'সমাস ডিরেক্টরি দেখুন'}
                    </button>
                  )}
                  {onOpenQuiz && (
                    <button
                      onClick={() => onOpenQuiz(activeLesson.category)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition"
                    >
                      এই অধ্যায়ের কুইজ দিন
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              কোনো অধ্যায় পাওয়া যায়নি। সার্চ পরিবর্তন করুন।
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
