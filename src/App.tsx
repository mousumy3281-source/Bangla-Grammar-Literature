import { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { LessonsView } from './components/LessonsView';
import { SandhiSamasView } from './components/SandhiSamasView';
import { KarakView } from './components/KarakView';
import { SentenceAnalyzerView } from './components/SentenceAnalyzerView';
import { QuizView } from './components/QuizView';
import { FlashcardsView } from './components/FlashcardsView';
import { DailyChallengeView } from './components/DailyChallengeView';
import { LiteratureView } from './components/LiteratureView';
import { loadUserStreakState } from './data/dailyChallengesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aiStatus, setAiStatus] = useState<boolean>(true);
  const [streakCount, setStreakCount] = useState<number>(() => {
    return loadUserStreakState().currentStreak;
  });

  // Check health and AI availability
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.aiEnabled === 'boolean') {
          setAiStatus(data.aiEnabled);
        }
      })
      .catch(() => {
        setAiStatus(false);
      });
  }, []);

  const handleOpenQuiz = (_topic: string) => {
    setActiveTab('quiz');
  };

  const handleOpenSandhiSamas = () => {
    setActiveTab('sandhi-samas');
  };

  const handleNavigateTopicFromChallenge = (topic: string) => {
    if (topic.includes('সন্ধি') || topic.includes('সমাস')) {
      setActiveTab('sandhi-samas');
    } else if (topic.includes('কারক') || topic.includes('বিভক্তি')) {
      setActiveTab('karak');
    } else {
      setSearchQuery(topic);
      setActiveTab('lessons');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        aiStatus={aiStatus}
        streakCount={streakCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'lessons' && (
          <LessonsView
            searchQuery={searchQuery}
            onOpenQuiz={handleOpenQuiz}
            onOpenSandhiSamas={handleOpenSandhiSamas}
            onOpenDailyChallenge={() => setActiveTab('challenge')}
            onOpenLiterature={() => setActiveTab('literature')}
          />
        )}

        {activeTab === 'challenge' && (
          <DailyChallengeView
            onNavigateToTopic={handleNavigateTopicFromChallenge}
            onStreakUpdate={(streak) => setStreakCount(streak)}
          />
        )}

        {activeTab === 'literature' && (
          <LiteratureView initialSearch={searchQuery} />
        )}

        {activeTab === 'analyzer' && (
          <SentenceAnalyzerView aiStatus={aiStatus} />
        )}

        {activeTab === 'sandhi-samas' && (
          <SandhiSamasView initialSearch={searchQuery} />
        )}

        {activeTab === 'karak' && (
          <KarakView />
        )}

        {activeTab === 'quiz' && (
          <QuizView />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              বা
            </div>
            <span className="font-semibold text-slate-200">বাংলা ব্যাকরণ অ্যাপ (Bangla Grammar App)</span>
            <span>•</span>
            <span>প্রমিত বাংলা ব্যাকরণ সহায়িকা</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <button onClick={() => setActiveTab('lessons')} className="hover:text-white transition">পাঠ্যসূচী</button>
            <button onClick={() => setActiveTab('challenge')} className="hover:text-white transition text-orange-400 font-medium">দৈনিক চ্যালেঞ্জ</button>
            <button onClick={() => setActiveTab('literature')} className="hover:text-white transition text-amber-400 font-medium">বাংলা সাহিত্য</button>
            <button onClick={() => setActiveTab('sandhi-samas')} className="hover:text-white transition">সন্ধি-সমাস</button>
            <button onClick={() => setActiveTab('karak')} className="hover:text-white transition">কারক</button>
            <button onClick={() => setActiveTab('analyzer')} className="hover:text-white transition">AI পরীক্ষক</button>
            <button onClick={() => setActiveTab('quiz')} className="hover:text-white transition">কুইজ</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
