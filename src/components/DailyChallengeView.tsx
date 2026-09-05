import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Share2, 
  Lightbulb, 
  HelpCircle,
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  DAILY_CHALLENGES, 
  getDailyChallengeForDate, 
  getDateKey, 
  formatBengaliDate, 
  toBengaliDigits, 
  loadUserStreakState, 
  recordDailyCompletion 
} from '../data/dailyChallengesData';
import { DailyChallengeQuestion, UserStreakState } from '../types';

interface DailyChallengeViewProps {
  onNavigateToTopic?: (topic: string) => void;
  onStreakUpdate?: (streak: number) => void;
}

export const DailyChallengeView: React.FC<DailyChallengeViewProps> = ({ 
  onNavigateToTopic,
  onStreakUpdate 
}) => {
  const todayKey = getDateKey();
  const todayChallenge = getDailyChallengeForDate(todayKey);
  const formattedToday = formatBengaliDate(new Date());

  // User streak state
  const [streakState, setStreakState] = useState<UserStreakState>(loadUserStreakState());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  
  // Archive/Practice mode state
  const [activeTab, setActiveTab] = useState<'today' | 'archive' | 'badges'>('today');
  const [archiveSelectedQuestion, setArchiveSelectedQuestion] = useState<DailyChallengeQuestion | null>(null);
  const [archiveAnswerSubmitted, setArchiveAnswerSubmitted] = useState<boolean>(false);
  const [archiveSelectedOption, setArchiveSelectedOption] = useState<number | null>(null);
  const [archiveSearch, setArchiveSearch] = useState<string>('');
  const [archiveTopicFilter, setArchiveTopicFilter] = useState<string>('all');

  // Next challenge countdown
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  // Synchronize streak on mount
  useEffect(() => {
    const current = loadUserStreakState();
    setStreakState(current);
    if (onStreakUpdate) {
      onStreakUpdate(current.currentStreak);
    }

    // Check if today is already answered
    const todayAnswer = current.completedHistory[todayKey];
    if (todayAnswer) {
      setSelectedOption(todayAnswer.selectedOption);
    }
  }, [todayKey, onStreakUpdate]);

  // Countdown timer until midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diffMs = tomorrow.getTime() - now.getTime();

      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeUntilNext(
        `${toBengaliDigits(String(hours).padStart(2, '0'))}:${toBengaliDigits(String(minutes).padStart(2, '0'))}:${toBengaliDigits(String(seconds).padStart(2, '0'))}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const isTodayCompleted = Boolean(streakState.completedHistory[todayKey]);
  const todayRecord = streakState.completedHistory[todayKey];

  // Submit Answer for Today's Challenge
  const handleSubmitAnswer = () => {
    if (selectedOption === null || isTodayCompleted) return;

    const isCorrect = selectedOption === todayChallenge.correctIndex;
    const updated = recordDailyCompletion(todayChallenge.id, selectedOption, isCorrect, todayKey);
    setStreakState(updated);
    if (onStreakUpdate) {
      onStreakUpdate(updated.currentStreak);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: isCorrect ? 90 : 40,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  };

  // Copy streak sharing text
  const handleCopyStreak = () => {
    const text = `🔥 বাংলা ব্যাকরণ অ্যাপে আমার দৈনিক অনুশীলনের স্ট্রিক: ${toBengaliDigits(streakState.currentStreak)} দিন! মোট সমাধান: ${toBengaliDigits(streakState.totalCompleted)}টি প্রশ্ন। আপনিও যোগ দিন!`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    });
  };

  // 7-day strip calculation
  const getSevenDaysStrip = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dKey = getDateKey(d);
      const weekdayNames = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
      const dayName = weekdayNames[d.getDay()];
      const dayNumber = toBengaliDigits(d.getDate());
      const isToday = i === 0;
      const record = streakState.completedHistory[dKey];
      days.push({
        dateKey: dKey,
        dayName,
        dayNumber,
        isToday,
        isCompleted: Boolean(record),
        isCorrect: record?.isCorrect
      });
    }
    return days;
  };

  const weekStrip = getSevenDaysStrip();

  // Filtered archive questions
  const filteredArchive = DAILY_CHALLENGES.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(archiveSearch.toLowerCase()) ||
                          q.topic.toLowerCase().includes(archiveSearch.toLowerCase()) ||
                          q.explanation.toLowerCase().includes(archiveSearch.toLowerCase());
    const matchesTopic = archiveTopicFilter === 'all' || q.topic === archiveTopicFilter;
    return matchesSearch && matchesTopic;
  });

  // Unique topics
  const uniqueTopics = ['all', ...Array.from(new Set(DAILY_CHALLENGES.map((q) => q.topic)))];

  // Badges milestones
  const badges = [
    {
      id: 'badge-1',
      title: 'ব্যাকরণ শিক্ষানবিস',
      reqStreak: 3,
      desc: 'টানা ৩ দিন ব্যাকরণ চর্চা সম্পন্ন করুন',
      icon: '🌱'
    },
    {
      id: 'badge-2',
      title: 'ব্যাকরণপ্রেমী',
      reqStreak: 7,
      desc: 'টানা ১ সপ্তাহ (৭ দিন) স্ট্রিক রক্ষা করুন',
      icon: '🔥'
    },
    {
      id: 'badge-3',
      title: 'ব্যাকরণ সাধক',
      reqStreak: 14,
      desc: 'টানা ১৪ দিন দৈনিক চ্যালেঞ্জ সমাধান করুন',
      icon: '⭐'
    },
    {
      id: 'badge-4',
      title: 'ব্যাকরণ বিশারদ',
      reqStreak: 30,
      desc: 'টানা ১ মাস (৩০ দিন) জ্ঞান চর্চার অনন্য নজির',
      icon: '👑'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-2">
            <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-bounce" />
            <span>দৈনিক ব্যাকরণ অনুশীলন ও স্ট্রিক</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            দৈনিক ব্যাকরণ চ্যালেঞ্জ (Daily Challenge)
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            প্রতিদিন নতুন ১টি ব্যাকরণ প্রশ্নের সমাধান করুন, স্ট্রিক অটুট রাখুন এবং ব্যাকরণের গভীরে প্রবেশ করুন।
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-200/80 p-1 rounded-xl self-start md:self-auto text-xs sm:text-sm font-medium">
          <button
            id="tab-daily-today"
            onClick={() => setActiveTab('today')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${
              activeTab === 'today'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            আজকের চ্যালেঞ্জ
          </button>
          <button
            id="tab-daily-archive"
            onClick={() => setActiveTab('archive')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${
              activeTab === 'archive'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            চ্যালেঞ্জ আর্কাইভ ({toBengaliDigits(DAILY_CHALLENGES.length)})
          </button>
          <button
            id="tab-daily-badges"
            onClick={() => setActiveTab('badges')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${
              activeTab === 'badges'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            অর্জন ও ব্যাজ
          </button>
        </div>
      </div>

      {/* Streak Summary & Metric Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Streak Counter */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-15">
            <Flame className="w-28 h-28" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-100">
              চলতি স্ট্রিক (Streak)
            </span>
            <span className="p-1.5 rounded-lg bg-white/20 text-white">
              <Flame className="w-4 h-4 fill-white" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black">
              {toBengaliDigits(streakState.currentStreak)}
            </span>
            <span className="text-orange-100 text-sm font-medium">দিন একটানা</span>
          </div>
          <p className="text-xs text-orange-100/90 mt-2">
            {isTodayCompleted 
              ? '✓ আজকের চ্যালেঞ্জ সম্পন্ন!' 
              : 'আজকের প্রশ্ন সমাধান করে স্ট্রিক বাড়ান'}
          </p>
        </div>

        {/* Longest Record */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              সর্বোচ্চ রেকর্ড
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Trophy className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">
              {toBengaliDigits(streakState.longestStreak)}
            </span>
            <span className="text-slate-500 text-sm font-medium">দিন</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            ব্যক্তিগত সেরা ধারাবাহিকতা
          </p>
        </div>

        {/* Total Solved */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              মোট সমাধান
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">
              {toBengaliDigits(streakState.totalCompleted)}
            </span>
            <span className="text-slate-500 text-sm font-medium">
              / সঠিক {toBengaliDigits(streakState.totalCorrect)}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            সঠিকতার হার:{' '}
            {streakState.totalCompleted > 0
              ? `${toBengaliDigits(Math.round((streakState.totalCorrect / streakState.totalCompleted) * 100))}%`
              : '০%'}
          </p>
        </div>

        {/* Points & XP */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              ব্যাকরণ স্কোর (XP)
            </span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-700">
              {toBengaliDigits(streakState.points)}
            </span>
            <span className="text-slate-500 text-sm font-medium">পয়েন্ট</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            প্রতিদিন অংশ নিলে বোনাস XP
          </p>
        </div>
      </div>

      {/* 7-Day Weekly Streak Tracker */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">বিগত ৭ দিনের স্ট্রিক ট্র্যাকার</span>
          </div>
          <span className="text-xs text-slate-500">
            আজকের তারিখ: <strong className="text-slate-700">{formattedToday.fullDateText}</strong>
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {weekStrip.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border text-center transition ${
                day.isToday
                  ? day.isCompleted
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                    : 'border-orange-400 bg-orange-50/40 ring-2 ring-orange-200'
                  : day.isCompleted
                  ? 'border-slate-200 bg-slate-50'
                  : 'border-slate-200 bg-white opacity-80'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-500 mb-1">{day.dayName}</span>
              <span className="text-sm font-bold text-slate-800 mb-2">{day.dayNumber}</span>
              
              {day.isCompleted ? (
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : day.isToday ? (
                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center animate-pulse">
                  <Flame className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">
                  -
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TAB 1: TODAY'S CHALLENGE */}
      {activeTab === 'today' && (
        <div className="space-y-6">
          {/* Main Challenge Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            {/* Header banner of question */}
            <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                  {todayChallenge.topic}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                  todayChallenge.difficulty === 'সহজ' 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                    : todayChallenge.difficulty === 'মাঝারি'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                }`}>
                  {todayChallenge.difficulty}
                </span>
                {todayChallenge.badge && (
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-semibold hidden sm:inline-block">
                    {todayChallenge.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>পরবর্তী প্রশ্ন: {timeUntilNext}</span>
                </span>
              </div>
            </div>

            {/* Question Body */}
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">
                  আজকের প্রশ্ন
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {todayChallenge.question}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {todayChallenge.options.map((option, idx) => {
                  const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === todayChallenge.correctIndex;

                  let buttonStyles = 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';

                  if (isTodayCompleted) {
                    if (isCorrectAnswer) {
                      buttonStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-200';
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonStyles = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
                    } else {
                      buttonStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    buttonStyles = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold ring-2 ring-emerald-200';
                  }

                  return (
                    <button
                      key={idx}
                      id={`today-opt-${idx}`}
                      disabled={isTodayCompleted}
                      onClick={() => setSelectedOption(idx)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${buttonStyles} ${
                        isTodayCompleted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition ${
                        isTodayCompleted
                          ? isCorrectAnswer
                            ? 'bg-emerald-600 text-white'
                            : isSelected
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                          : isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {optionLetters[idx]}
                      </span>
                      <span className="text-sm sm:text-base">{option}</span>
                      
                      {isTodayCompleted && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto shrink-0" />
                      )}
                      {isTodayCompleted && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-500 ml-auto shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  {!isTodayCompleted && (
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>{showHint ? 'ইঙ্গিত লুকান' : 'ইঙ্গিত / ক্লু দেখুন'}</span>
                    </button>
                  )}
                  {todayChallenge.topic && onNavigateToTopic && (
                    <button
                      type="button"
                      onClick={() => onNavigateToTopic(todayChallenge.topic)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 transition"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{todayChallenge.topic} পাঠ দেখুন</span>
                    </button>
                  )}
                </div>

                {!isTodayCompleted ? (
                  <button
                    id="submit-daily-challenge"
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-md transition ${
                      selectedOption !== null
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>উত্তর জমা দিন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopyStreak}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition border border-slate-200"
                    >
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{copiedMessage ? 'কপি হয়েছে!' : 'স্ট্রিক শেয়ার করুন'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hint Accordion */}
              {showHint && !isTodayCompleted && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-sm animate-fadeIn">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-semibold block mb-1">স্মৃতি সহায়ক ইঙ্গিত:</strong>
                      <p className="text-xs sm:text-sm text-amber-800">
                        {todayChallenge.mnemonicTip || todayChallenge.grammarRule}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Completion & Explanation Card */}
              {isTodayCompleted && (
                <div className="mt-8 pt-6 border-t border-slate-200 space-y-5 animate-fadeIn">
                  {/* Status Banner */}
                  <div className={`p-4 rounded-2xl flex items-center justify-between gap-4 ${
                    todayRecord?.isCorrect
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        todayRecord?.isCorrect ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {todayRecord?.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-base">
                          {todayRecord?.isCorrect ? 'অভিনন্দন! আপনার উত্তর সঠিক হয়েছে।' : 'ভালো চেষ্টা! সঠিক নিয়মটি নিচে দেখে নিন।'}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {todayRecord?.isCorrect 
                            ? 'আজকের চ্যালেঞ্জ সমাপ্ত হয়েছে এবং +৩০ পয়েন্ট যোগ হয়েছে!' 
                            : 'অনুশীলন চালিয়ে যান, আগামীকাল আরও একটি নতুন প্রশ্ন অপেক্ষা করছে।'}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        স্ট্রিক: {toBengaliDigits(streakState.currentStreak)} দিন
                      </span>
                    </div>
                  </div>

                  {/* Deep Grammatical Breakdown */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>বিশদ ব্যাকরণগত ব্যাখ্যা ও নিয়ম</span>
                    </h4>
                    
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {todayChallenge.explanation}
                    </p>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800">
                      <strong className="text-emerald-700 block mb-1">ব্যাকরণ সূত্র:</strong>
                      {todayChallenge.grammarRule}
                    </div>

                    {todayChallenge.mnemonicTip && (
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>শর্টকাট মেমোরি টিপ:</strong> {todayChallenge.mnemonicTip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Practice Suggestion */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                আজকের প্রশ্ন শেষ? আরও চ্যালেঞ্জ অনুশীলন করতে চান?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                চ্যালেঞ্জ আর্কাইভে রয়েছে মোট {toBengaliDigits(DAILY_CHALLENGES.length)}টি মানসম্মত ব্যাকরণ প্রশ্ন।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('archive')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition shrink-0"
            >
              আর্কাইভ ব্রাউজ করুন
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHIVE & PRACTICE MODE */}
      {activeTab === 'archive' && (
        <div className="space-y-6">
          {/* Active Question Modal / Inspector if selected */}
          {archiveSelectedQuestion && (
            <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-lg mb-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {archiveSelectedQuestion.topic}
                  </span>
                  <span className="text-xs text-slate-500">
                    চ্যালেঞ্জ #{toBengaliDigits(archiveSelectedQuestion.dayNumber || 1)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setArchiveSelectedQuestion(null);
                    setArchiveAnswerSubmitted(false);
                    setArchiveSelectedOption(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  বন্ধ করুন
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {archiveSelectedQuestion.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {archiveSelectedQuestion.options.map((opt, idx) => {
                  const letters = ['ক', 'খ', 'গ', 'ঘ'];
                  const isSelected = archiveSelectedOption === idx;
                  const isCorrect = idx === archiveSelectedQuestion.correctIndex;

                  let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                  if (archiveAnswerSubmitted) {
                    if (isCorrect) style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                    else if (isSelected) style = 'bg-rose-50 border-rose-400 text-rose-900';
                    else style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  } else if (isSelected) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={archiveAnswerSubmitted}
                      onClick={() => setArchiveSelectedOption(idx)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm transition ${style}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-white border text-xs font-bold flex items-center justify-center shrink-0">
                        {letters[idx]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!archiveAnswerSubmitted ? (
                <button
                  disabled={archiveSelectedOption === null}
                  onClick={() => setArchiveAnswerSubmitted(true)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                    archiveSelectedOption !== null
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  উত্তর যাচাই করুন
                </button>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 animate-fadeIn">
                  <div className="font-semibold text-emerald-800">
                    ব্যাখ্যা: {archiveSelectedQuestion.explanation}
                  </div>
                  <div className="text-slate-600">
                    সূত্র: {archiveSelectedQuestion.grammarRule}
                  </div>
                  {archiveSelectedQuestion.mnemonicTip && (
                    <div className="text-amber-800 font-medium">
                      টিপ: {archiveSelectedQuestion.mnemonicTip}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setArchiveAnswerSubmitted(false);
                      setArchiveSelectedOption(null);
                    }}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 mt-2 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>আবার চেষ্টা করুন</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <input
              type="text"
              value={archiveSearch}
              onChange={(e) => setArchiveSearch(e.target.value)}
              placeholder="আর্কাইভে প্রশ্ন বা টপিক খুঁজুন..."
              className="w-full sm:w-72 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-slate-500 shrink-0">টপিক:</span>
              {uniqueTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setArchiveTopicFilter(topic)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    archiveTopicFilter === topic
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {topic === 'all' ? 'সবগুলো' : topic}
                </button>
              ))}
            </div>
          </div>

          {/* Question List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArchive.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setArchiveSelectedQuestion(item);
                  setArchiveAnswerSubmitted(false);
                  setArchiveSelectedOption(null);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold group-hover:bg-emerald-50 group-hover:text-emerald-800 transition">
                      {item.topic}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      প্রশ্ন #{toBengaliDigits(index + 1)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-2 mb-3">
                    {item.question}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>কাঠিন্য: {item.difficulty}</span>
                  <span className="text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    অনুশীলন করুন →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BADGES & MILESTONES */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              আপনার স্ট্রিক মাইলফলক ও অর্জিত ব্যাজ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              নিয়মিত ব্যাকরণ অনুশীলনে আপনার অগ্রগতি ট্র্যাক করুন এবং নতুন পদক অর্জন করুন।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge) => {
                const isUnlocked = streakState.longestStreak >= badge.reqStreak;
                const progressPercent = Math.min(
                  100,
                  Math.round((streakState.longestStreak / badge.reqStreak) * 100)
                );

                return (
                  <div
                    key={badge.id}
                    className={`p-5 rounded-2xl border transition relative flex flex-col justify-between ${
                      isUnlocked
                        ? 'bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">
                        {badge.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-4">
                        {badge.desc}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                        <span>{isUnlocked ? '✓ আনলক হয়েছে' : 'অগ্রগতি'}</span>
                        <span>
                          {toBengaliDigits(streakState.longestStreak)} / {toBengaliDigits(badge.reqStreak)} দিন
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isUnlocked ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Grammar Quote */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base text-slate-100">
                প্রতিদিন অনুশীলনের গুরুত্ব
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                "ভাষার রূপ প্রকৃতি ও নিয়মাবলী দীর্ঘস্থায়ী স্মৃতিতে রূপান্তর করতে প্রতিদিন মাত্র ২ মিনিটের চর্চাও অভাবনীয় পরিবর্তন আনে। সন্ধির সূত্র হোক কিংবা সমাসের জটিল ব্যাসবাক্য — নিয়মিত অনুশীলনেই আসে ব্যাকরণের পরিপূর্ণ দখল।"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
