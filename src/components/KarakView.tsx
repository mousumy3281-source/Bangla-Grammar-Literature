import React, { useState } from 'react';
import { KARAK_GUIDES, BIBHAKTI_TABLE } from '../data/karakData';
import { KarakGuide } from '../types';
import { Layers, HelpCircle, CheckCircle, ArrowRight, Table, Sparkles } from 'lucide-react';

export const KarakView: React.FC = () => {
  const [activeKarakId, setActiveKarakId] = useState<string>(KARAK_GUIDES[0].id);

  // Interactive Karak Finder / Decision helper state
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [finderSentence, setFinderSentence] = useState('পাপ থেকে বিরত হও');
  const [targetWord, setTargetWord] = useState('পাপ থেকে');

  const activeKarak: KarakGuide =
    KARAK_GUIDES.find((k) => k.id === activeKarakId) || KARAK_GUIDES[0];

  const questionOptions = [
    { question: 'কে / কারা ক্রিয়া সম্পাদন করছে?', karak: 'কর্তৃকারক', hint: 'ক্রিয়াপদকে কে/কারা দিয়ে প্রশ্ন' },
    { question: 'কাকে উদ্দেশ্য করে বা কী কাজ করছে?', karak: 'কর্মকারক', hint: 'ক্রিয়াপদকে কী/কাকে দিয়ে প্রশ্ন' },
    { question: 'কী দিয়ে / কিসের সাহায্যে কাজ সম্পন্ন হচ্ছে?', karak: 'করণকারক', hint: 'ক্রিয়াপদকে কী দিয়ে/উপায় দিয়ে প্রশ্ন' },
    { question: 'স্বত্ব চিরতরে ত্যাগ করে কিছু দেওয়া হচ্ছে কি না?', karak: 'সম্প্রদানকারক', hint: 'নিঃস্বার্থ দান বা অর্পণ' },
    { question: 'কোথা থেকে উৎপন্ন / বিচ্যুত / আরম্ভ / ভীত হচ্ছে?', karak: 'অপাদানকারক', hint: 'উৎস, বিচ্যুতি বা ভীতি' },
    { question: 'কোথায় বা কখন ক্রিয়া সম্পন্ন হচ্ছে (স্থান/সময়/বিষয়)?', karak: 'অধিকরণকারক', hint: 'আধার, কাল বা স্থান' }
  ];

  const matchedKarakOption = questionOptions.find((o) => o.question === selectedQuestion);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-sky-600" />
              কারক ও বিভক্তি নির্ণয় গাইড (Karak & Bibhakti)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ক্রিয়াপদের সাথে নামপদের সম্পর্কের বিজ্ঞানসম্মত বিশ্লেষণ ও শর্টকাট সূত্র।
            </p>
          </div>

          <div className="text-xs px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium">
            কারক ৬ প্রকার • বিভক্তি ৭ প্রকার
          </div>
        </div>
      </div>

      {/* Interactive Karak Finder Tool */}
      <div className="bg-gradient-to-br from-sky-50/70 via-indigo-50/50 to-emerald-50/40 rounded-xl border border-sky-200 p-5 shadow-2xs">
        <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-600" />
          ইন্টারেক্টিভ কারক নির্ণয় সহায়ক (Step-by-Step Karak Finder)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          যেকোনো বাক্যের উদ্দিষ্ট শব্দটির ক্ষেত্রে নিচের কোন প্রশ্নটি খাটে তা নির্বাচন করে সহজে কারক চিনুন:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-4">
          {questionOptions.map((opt, idx) => {
            const isSelected = selectedQuestion === opt.question;
            return (
              <button
                key={idx}
                onClick={() => setSelectedQuestion(opt.question)}
                className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-700 shadow-xs font-semibold'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <span>{opt.question}</span>
                <span className={`text-[11px] mt-2 block ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                  {opt.hint}
                </span>
              </button>
            );
          })}
        </div>

        {matchedKarakOption && (
          <div className="bg-white rounded-lg p-4 border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
            <div>
              <div className="text-xs font-semibold text-slate-500">চিহ্নিত কারক:</div>
              <div className="text-lg font-bold text-sky-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                {matchedKarakOption.karak}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                নিয়ম অনুযায়ী: {matchedKarakOption.hint} দ্বারা এই পদটি স্পষ্ট হয়।
              </p>
            </div>
            <button
              onClick={() => {
                const target = KARAK_GUIDES.find((k) => k.name.includes(matchedKarakOption.karak.substring(0, 4)));
                if (target) setActiveKarakId(target.id);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              এই কারকের বিস্তারিত দেখুন
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: 6 Karaks Detailed Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Karak Navigator Buttons */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-1 mb-2">
              ছয় প্রকার কারক
            </h3>

            <div className="space-y-1.5">
              {KARAK_GUIDES.map((karak) => {
                const isSelected = karak.id === activeKarak.id;
                return (
                  <button
                    key={karak.id}
                    id={`karak-tab-${karak.id}`}
                    onClick={() => setActiveKarakId(karak.id)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm">{karak.name}</div>
                    <div className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-1">
                      {karak.questionPrompt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Bibhakti Reference Table Preview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Table className="w-4 h-4 text-sky-600" />
              বিভক্তি তালিকা (সংক্ষিপ্ত)
            </h3>
            <div className="space-y-1.5 text-xs">
              {BIBHAKTI_TABLE.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                  <span className="font-medium text-slate-700">{b.name}</span>
                  <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    {b.signs}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Active Karak Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
            
            <div className="border-b border-slate-100 pb-4">
              <div className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                কারক গাইড
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {activeKarak.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {activeKarak.definition}
              </p>
            </div>

            {/* Question Formula Card */}
            <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-sky-800">
                চেনার মূল প্রশ্ন ও সূত্র:
              </div>
              <div className="text-base font-bold text-sky-950 mt-1">
                "{activeKarak.questionPrompt}"
              </div>
              <div className="text-xs text-sky-900 mt-1.5 bg-white/70 p-2 rounded border border-sky-100 font-medium">
                সহজ নিয়ম: {activeKarak.easyRule}
              </div>
            </div>

            {/* Authentic Sentences with Bibhakti Breakdown */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">
                বাস্তব উদাহরণ ও বিভক্তি বিশ্লেষণ
              </h3>

              <div className="space-y-3">
                {activeKarak.examples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-base font-bold text-slate-900">
                        "{item.sentence}"
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                        {item.bibhakti}
                      </span>
                    </div>

                    <div className="mt-2 text-xs sm:text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">টার্গেট শব্দ: </span>
                      <span className="text-sky-800 font-medium underline decoration-sky-400 decoration-2">
                        {item.targetWord}
                      </span>
                      <p className="mt-1 text-slate-600">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Full Bibhakti Guide Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Table className="w-5 h-5 text-emerald-600" />
              ৭ প্রকার শব্দ বিভক্তির পূর্ণাঙ্গ রূপ
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-semibold">বিভক্তির নাম</th>
                    <th className="p-3 font-semibold">বিভক্তি চিহ্নসমূহ</th>
                    <th className="p-3 font-semibold">উদাহরণ প্রয়োগ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BIBHAKTI_TABLE.map((b, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{b.name}</td>
                      <td className="p-3 font-mono font-medium text-emerald-700">{b.signs}</td>
                      <td className="p-3 text-slate-600">{b.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
