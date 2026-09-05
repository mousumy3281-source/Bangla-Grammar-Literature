import React, { useState } from 'react';
import { SentenceAnalysisResult } from '../types';
import { Sparkles, Send, CheckCircle2, AlertTriangle, MessageSquare, BookOpen, Copy, Check, RefreshCw } from 'lucide-react';

const SAMPLE_SENTENCES = [
  'বুলবুলিতে ধান খেয়েছে',
  'ডাক্তার ডাকো',
  'তিলে তৈল হয়',
  'যে পরিশ্রম করে সেই সাফল্য লাভ করে',
  'তিনি অত্যন্ত পণ্ডিত, কিন্তু স্বাস্থ্যে দুর্বল',
  'মেঘ হতে বৃষ্টি উৎপন্ন হয়',
  'সকল ছাত্রগণ উপস্থিত ছিল' // Intentional error to demonstrate detection
];

const POPULAR_QUESTIONS = [
  'কৃৎ প্রত্যয় ও তদ্ধিত প্রত্যয়ের পার্থক্য কী?',
  'স্বভাবতই ণ ও ষ হয় এমন শব্দের তালিকা ও ছন্দ',
  'উপমান ও উপমিত কর্মধারয় সমাস চেনার সহজ উপায় কী?',
  'অপাদান ও অধিকরণ কারকের মধ্যে বিভ্রান্তি দূর করার কৌশল',
  'সাধু ও চলিত রীতির মূল পার্থক্য কী কী?'
];

export const SentenceAnalyzerView: React.FC<{ aiStatus: boolean }> = ({ aiStatus }) => {
  const [activeSubTab, setActiveSubTab] = useState<'analyzer' | 'ask'>('analyzer');

  // Analyzer State
  const [inputSentence, setInputSentence] = useState('বুলবুলিতে ধান খেয়েছে');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SentenceAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Ask AI Tutor State
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [tutorAnswer, setTutorAnswer] = useState<string | null>(null);
  const [tutorError, setTutorError] = useState<string | null>(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  // Handle Sentence Analysis
  const handleAnalyzeSentence = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputSentence.trim()) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/grammar/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: inputSentence.trim() })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'বিশ্লেষণ ব্যর্থ হয়েছে');
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'বিশ্লেষণ সম্পন্ন করা সম্ভব হয়নি।');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Ask Tutor
  const handleAskTutor = async (questionText?: string) => {
    const q = questionText || tutorQuestion;
    if (!q.trim()) return;

    setIsAsking(true);
    setTutorError(null);
    setTutorAnswer(null);

    try {
      const res = await fetch('/api/grammar/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q.trim(), topic: 'বাংলা ব্যাকরণ' })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'উত্তর পেতে সমস্যা হয়েছে');
      }

      const data = await res.json();
      setTutorAnswer(data.answer);
      if (questionText) {
        setTutorQuestion(questionText);
      }
    } catch (err: any) {
      console.error(err);
      setTutorError(err.message || 'প্রশ্নটির উত্তর পাওয়া যায়নি।');
    } finally {
      setIsAsking(false);
    }
  };

  const handleCopyAnswer = () => {
    if (tutorAnswer) {
      navigator.clipboard.writeText(tutorAnswer);
      setCopiedAnswer(true);
      setTimeout(() => setCopiedAnswer(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <h1 className="text-2xl font-bold text-slate-900">
                AI ব্যাকরণ পরীক্ষক ও শিক্ষক (Grammar Assistant)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              যেকোনো বাংলা বাক্যের পুঙ্খানুপুঙ্খ পদ বিশ্লেষণ, কারক নির্ণয়, গঠন ও বানান শুদ্ধিকরণ।
            </p>
          </div>

          {/* Subtabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('analyzer')}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                activeSubTab === 'analyzer'
                  ? 'bg-white text-emerald-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              বাক্য বিশ্লেষণ ও ত্রুটি নির্ণয়
            </button>
            <button
              onClick={() => setActiveSubTab('ask')}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                activeSubTab === 'ask'
                  ? 'bg-white text-emerald-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ব্যাকরণ শিক্ষককে প্রশ্ন করুন
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'analyzer' ? (
        /* Analyzer Tab */
        <div className="space-y-6">
          
          {/* Input Box Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-3">
              যে বাক্যটি বিশ্লেষণ করতে চান সেটি লিখুন:
            </h2>

            <form onSubmit={handleAnalyzeSentence} className="space-y-3">
              <div className="relative">
                <textarea
                  id="sentence-analyzer-input"
                  rows={2}
                  value={inputSentence}
                  onChange={(e) => setInputSentence(e.target.value)}
                  placeholder="যেমন: বুলবুলিতে ধান খেয়েছে / যে পরিশ্রম করে সেই সাফল্য পায়..."
                  className="w-full p-3.5 text-base bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>

              {/* Sample Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-slate-500 font-medium mr-1">নমুনা বাক্য:</span>
                {SAMPLE_SENTENCES.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputSentence(s);
                    }}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    "{s}"
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isAnalyzing || !inputSentence.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 shadow-xs transition"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      বিশ্লেষণ করা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      ব্যাকরণ বিশ্লেষণ শুরু করুন
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Analysis Error */}
          {analysisError && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">বিশ্লেষণে ত্রুটি ঘটেছে:</div>
                <div className="text-xs mt-0.5">{analysisError}</div>
              </div>
            </div>
          )}

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Summary Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      মূল বাক্য
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      "{analysisResult.sentence}"
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      গঠন: {analysisResult.sentenceTypeFormation}
                    </span>
                    {analysisResult.sentenceTypeMeaning && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                        অর্থ: {analysisResult.sentenceTypeMeaning}
                      </span>
                    )}
                  </div>
                </div>

                {/* Overall Explanation */}
                <p className="text-sm leading-relaxed text-slate-700">
                  {analysisResult.overallSummary}
                </p>

                {/* Spelling / Grammar Error Check Box */}
                {analysisResult.hasErrors ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ব্যাকরণিক বা বানান ত্রুটি সনাক্ত হয়েছে!
                    </div>
                    {analysisResult.correctedSentence && (
                      <div className="text-sm">
                        সংশোধিত রূপ: <strong className="text-emerald-800 underline decoration-emerald-500">{analysisResult.correctedSentence}</strong>
                      </div>
                    )}
                    {analysisResult.errorNotes && analysisResult.errorNotes.length > 0 && (
                      <ul className="text-xs space-y-1 list-disc list-inside text-amber-900">
                        {analysisResult.errorNotes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    বাক্যটিতে কোনো বানান বা ব্যাকরণিক অসংগতি পাওয়া যায়নি; এটি প্রমিত ও শুদ্ধ।
                  </div>
                )}
              </div>

              {/* Word-by-Word Grammatical Breakdown (পদ ও কারক বিশ্লেষণ) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  শব্দভিত্তিক পদ প্রকরণ ও কারক বিশ্লেষণ
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResult.wordsAnalysis?.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                        <span className="text-lg font-bold text-slate-900">
                          {w.word}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {w.podo}
                        </span>
                      </div>

                      {w.karak && (
                        <div className="text-xs text-slate-700">
                          <span className="font-semibold text-slate-900">কারক: </span>
                          <span className="text-sky-800 font-medium">{w.karak}</span>
                        </div>
                      )}

                      {w.bibhakti && (
                        <div className="text-xs text-slate-700">
                          <span className="font-semibold text-slate-900">বিভক্তি: </span>
                          <span className="text-purple-800 font-medium">{w.bibhakti}</span>
                        </div>
                      )}

                      {w.rootOrSandhi && (
                        <div className="text-xs text-slate-700">
                          <span className="font-semibold text-slate-900">গঠন/সন্ধি: </span>
                          <span className="font-mono text-slate-600">{w.rootOrSandhi}</span>
                        </div>
                      )}

                      {w.note && (
                        <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                          {w.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Tip */}
              {analysisResult.learningTip && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-950 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">শিক্ষণীয় টিপ: </span>
                    {analysisResult.learningTip}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      ) : (
        /* Ask AI Tutor Tab */
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              বাংলা ব্যাকরণ সম্পর্কিত যেকোনো প্রশ্ন করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              নিয়মাবলী, শর্টকাট টেকনিক, জটিল পদের ব্যাসবাক্য বা যে কোনো ব্যাকরণিক জিজ্ঞাসা লিখুন:
            </p>

            <div className="relative">
              <textarea
                rows={3}
                value={tutorQuestion}
                onChange={(e) => setTutorQuestion(e.target.value)}
                placeholder="যেমন: কৃৎ প্রত্যয় ও তদ্ধিত প্রত্যয়ের মধ্যে পার্থক্য কী? উদাহরণসহ ব্যাখ্যা করুন..."
                className="w-full p-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Popular Questions Chips */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-slate-500 mb-2">জনপ্রিয় প্রশ্নসমূহ:</div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAskTutor(q)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 transition text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleAskTutor()}
                disabled={isAsking || !tutorQuestion.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 shadow-xs transition"
              >
                {isAsking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    উত্তর লেখা হচ্ছে...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    প্রশ্ন পাঠান
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tutor Error */}
          {tutorError && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>{tutorError}</div>
            </div>
          )}

          {/* Tutor Answer */}
          {tutorAnswer && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  শিক্ষকের উত্তর:
                </div>
                <button
                  onClick={handleCopyAnswer}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 transition"
                >
                  {copiedAnswer ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      কপি হয়েছে
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      কপি করুন
                    </>
                  )}
                </button>
              </div>

              <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-sans">
                {tutorAnswer}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
