import React, { useState } from 'react';
import { QUIZ_DATABASE } from '../data/quizData';
import { QuizQuestion } from '../types';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';

export const QuizView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('সকল');
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_DATABASE);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState<boolean>(false);
  const [aiQuizMsg, setAiQuizMsg] = useState<string | null>(null);

  // Topics for Filter
  const topics = ['সকল', 'সন্ধি', 'সমাস', 'কারক ও বিভক্তি', 'ধ্বনি ও বর্ণ', 'পদ প্রকরণ', 'ণ-ত্ব ও ষ-ত্ব বিধান', 'উপসর্গ', 'বাক্য প্রকরণ', 'বাগধারা', 'এককথায় প্রকাশ'];

  const filteredQuestions = selectedTopic === 'সকল' 
    ? questions 
    : questions.filter((q) => q.topic.includes(selectedTopic) || selectedTopic.includes(q.topic));

  const activeQuestionList = filteredQuestions.length > 0 ? filteredQuestions : QUIZ_DATABASE;
  const currentQuestion: QuizQuestion = activeQuestionList[currentIndex] || activeQuestionList[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestionList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleTopicChange = (t: string) => {
    setSelectedTopic(t);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  // AI Dynamic Quiz Generation
  const handleGenerateAiQuiz = async () => {
    setIsGeneratingAiQuiz(true);
    setAiQuizMsg(null);
    try {
      const res = await fetch('/api/grammar/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic === 'সকল' ? 'বাংলা ব্যাকরণ সার্বিক' : selectedTopic })
      });

      if (!res.ok) throw new Error('কুইজ তৈরিতে সমস্যা হয়েছে');
      const data = await res.json();
      if (Array.isArray(data.quiz) && data.quiz.length > 0) {
        const formatted: QuizQuestion[] = data.quiz.map((q: any, i: number) => ({
          id: `ai-${Date.now()}-${i}`,
          topic: selectedTopic === 'সকল' ? 'AI ব্যাকরণ' : selectedTopic,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation
        }));
        setQuestions(formatted);
        setSelectedTopic(formatted[0].topic);
        handleRestartQuiz();
        setAiQuizMsg('AI দ্বারা নতুন কুইজ তৈরি সফল হয়েছে!');
      }
    } catch (e: any) {
      setAiQuizMsg('AI কুইজ জেনারেট করা যায়নি, ডিফল্ট প্রশ্নাবলী দিয়ে অনুশীলন করুন।');
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Quiz Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              বাংলা ব্যাকরণ অনুশীলন ও কুইজ
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              বিসিএস, বিশ্ববিদ্যালয় ভর্তি ও বোর্ড পরীক্ষার অনুরূপ মানসম্মত প্রশ্নাবলী।
            </p>
          </div>

          <button
            onClick={handleGenerateAiQuiz}
            disabled={isGeneratingAiQuiz}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 shadow-xs transition"
          >
            {isGeneratingAiQuiz ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                AI কুইজ তৈরি হচ্ছে...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI দিয়ে নতুন প্রশ্ন তৈরি
              </>
            )}
          </button>
        </div>

        {aiQuizMsg && (
          <div className="mt-3 p-2 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
            {aiQuizMsg}
          </div>
        )}

        {/* Topic Filters */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-500 mb-2">বিষয়ভিত্তিক কুইজ নির্বাচন:</div>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => handleTopicChange(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  selectedTopic === t
                    ? 'bg-emerald-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          
          {/* Progress Bar & Header */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                বিষয়: {currentQuestion.topic}
              </span>
              <span>
                প্রশ্ন {currentIndex + 1} / {activeQuestionList.length} • স্কোর: {score}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / activeQuestionList.length) * 100}%`
                }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let optionStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-2xs';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                      {['ক', 'খ', 'গ', 'ঘ'][idx] || idx + 1}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Revealed upon answering) */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                সঠিক উত্তরের ব্যাখ্যা ও ব্যাকরণীয় নিয়ম:
              </div>
              <p className="leading-relaxed text-slate-600">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition"
              >
                {currentIndex + 1 < activeQuestionList.length ? (
                  <>
                    পরবর্তী প্রশ্ন
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    ফলাফল দেখুন
                    <Award className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Result Scorecard */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">কুইজ সমাপ্ত হয়েছে!</h2>
            <p className="text-sm text-slate-600 mt-1">
              বিষয়: <span className="font-semibold text-slate-800">{selectedTopic}</span>
            </p>
          </div>

          {/* Score Statistics */}
          <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-3xl font-extrabold text-emerald-700">
              {score} / {activeQuestionList.length}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              সফলতার হার: {Math.round((score / activeQuestionList.length) * 100)}%
            </div>
          </div>

          <div className="text-sm text-slate-600 max-w-md mx-auto">
            {score / activeQuestionList.length >= 0.8
              ? 'অসাধারণ প্রস্তুতি! আপনার ব্যাকরণ দক্ষতা প্রশংসনীয়।'
              : score / activeQuestionList.length >= 0.5
              ? 'ভালো হয়েছে! নিয়মিত অনুশীলনে আরও উন্নতি সম্ভব।'
              : 'আরেকবার পাঠ্যসূচীর নিয়মগুলো পড়ে আবার পরীক্ষা দিন।'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition"
            >
              <RotateCcw className="w-4 h-4" />
              আবার পরীক্ষা দিন
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
