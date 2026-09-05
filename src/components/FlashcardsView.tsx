import React, { useState } from 'react';
import { FLASHCARD_DATABASE } from '../data/flashcardsData';
import { FlashCardItem } from '../types';
import { HelpCircle, RotateCw, CheckCircle, ChevronLeft, ChevronRight, Shuffle, Sparkles } from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [cards, setCards] = useState<FlashCardItem[]>(FLASHCARD_DATABASE);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  const categories = ['সকল', 'বাগধারা', 'এককথায় প্রকাশ', 'ণ-ত্ব ও ষ-ত্ব', 'উপসর্গ'];

  const filteredCards = selectedCategory === 'সকল'
    ? cards
    : cards.filter((c) => c.category === selectedCategory);

  const activeCards = filteredCards.length > 0 ? filteredCards : FLASHCARD_DATABASE;
  const currentCard: FlashCardItem = activeCards[currentIndex] || activeCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % activeCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + activeCards.length) % activeCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleToggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              স্মৃতি সহায়ক ফ্ল্যাশ কার্ড (Flashcards)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              বাগধারা, এককথায় প্রকাশ, এবং ণ-ত্ব ও ষ-ত্ব বিধানের ছন্দ সহজে মনে রাখার ইন্টারেক্টিভ কার্ড।
            </p>
          </div>

          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            শাফল করুন (Shuffle)
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Component */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-2">
          <span>কার্ড {currentIndex + 1} / {activeCards.length}</span>
          <span className="text-purple-700 font-medium">
            আয়ত্তে এসেছে: {masteredIds.size} টি
          </span>
        </div>

        {/* The Flip Card */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 rounded-2xl border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between shadow-xs ${
            isFlipped
              ? 'bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 border-purple-300'
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}
        >
          {/* Top category & status indicator */}
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              {currentCard.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              {isFlipped ? 'সামনের দিক দেখতে ক্লিক করুন' : 'উত্তর দেখতে কার্ডে ক্লিক করুন'}
            </span>
          </div>

          {/* Card Body */}
          <div className="my-auto py-6 text-center space-y-3">
            {!isFlipped ? (
              <>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  শব্দ / প্রশ্ন
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 leading-normal">
                  {currentCard.front}
                </div>
                {currentCard.hint && (
                  <p className="text-xs text-slate-500 italic max-w-md mx-auto pt-2">
                    ইঙ্গিত: {currentCard.hint}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="text-xs font-semibold text-purple-700 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  অর্থ / উত্তর
                </div>
                <div className="text-xl sm:text-2xl font-bold text-purple-950 leading-relaxed whitespace-pre-line">
                  {currentCard.back}
                </div>
                {currentCard.exampleSentence && (
                  <div className="mt-3 bg-white/80 p-3 rounded-xl border border-purple-100 text-xs text-slate-700 max-w-lg mx-auto">
                    <span className="font-semibold text-purple-900">বাক্যে প্রয়োগ: </span>
                    {currentCard.exampleSentence}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom Flip Tip */}
          <div className="text-center text-[11px] text-slate-400">
            {isFlipped ? 'উত্তরটি মনে রাখতে পেরেছেন?' : 'কার্ড উল্টাতে যেকোনো স্থানে চাপুন'}
          </div>
        </div>

        {/* Controls: Prev, Next, Mastered */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs transition"
          >
            <ChevronLeft className="w-4 h-4" />
            পূর্ববর্তী
          </button>

          <button
            onClick={() => handleToggleMastered(currentCard.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
              masteredIds.has(currentCard.id)
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${masteredIds.has(currentCard.id) ? 'text-emerald-600' : 'text-slate-400'}`} />
            {masteredIds.has(currentCard.id) ? 'মুখস্থ হয়েছে' : 'মুখস্থ হিসেবে চিহ্নিত করুন'}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs transition"
          >
            পরবর্তী
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
