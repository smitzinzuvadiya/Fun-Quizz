import { useState, useEffect } from 'react';
import { CoinBadge } from '../components/CoinBadge';
import { QuestionCard } from '../components/QuestionCard';
import { AdPopup } from '../components/AdPopup';
import quizData from '../data/quizData.json';
import { useCoins } from '../hooks/useCoins';
import { useAudio } from '../hooks/useAudio';
import { useAds } from '../hooks/useAds';
import confetti from 'canvas-confetti';

export function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const filters = ['All', ...quizData.categories.map(c => c.name)];

  const { addCoins } = useCoins();
  const { playSound } = useAudio();
  const { shouldShowAd, dismissAd, registerQuestionAnswered } = useAds();

  // Reset question index when filter changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [selectedFilter]);

  const filteredQuestions = selectedFilter === 'All' 
    ? quizData.categories.flatMap(c => c.questions)
    : quizData.categories.find(c => c.name === selectedFilter)?.questions || [];

  const handleAnswer = (isCorrect) => {
    registerQuestionAnswered();

    if (isCorrect) {
      addCoins(10);
      playSound('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FBBF24', '#F97316']
      });
      const currentCorrect = parseInt(localStorage.getItem('quiz_total_correct') || '0', 10);
      localStorage.setItem('quiz_total_correct', (currentCorrect + 1).toString());
    } else {
      playSound('incorrect');
    }
    
    // Advance to next question
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <>
      <AdPopup isOpen={shouldShowAd} onClose={dismissAd} />
      <div className="pb-24 px-[20px] pt-8 animate-in fade-in duration-500 flex flex-col h-full">
      <header className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">Quiz Quest</h1>
          <p className="text-on-surface-variant text-sm font-medium">Test your knowledge!</p>
        </div>
        <CoinBadge />
      </header>

      <h2 className="text-xl font-bold mb-4 flex-shrink-0">Choose a Category</h2>

      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 mb-6 pb-2 -mx-[20px] px-[20px] flex-shrink-0">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`whitespace-nowrap flex-shrink-0 flex items-center justify-center h-10 px-5 rounded-full font-bold text-sm transition-all ${
              selectedFilter === filter 
                ? 'bg-primary text-white shadow-md border border-primary' 
                : 'bg-surface border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <main className="flex-1 flex flex-col justify-center">
        {currentQuestion ? (
          <QuestionCard key={currentQuestion.id} question={currentQuestion} onAnswer={handleAnswer} />
        ) : (
          <div className="text-center text-on-surface-variant font-medium py-10">
            No questions found.
          </div>
        )}
      </main>
    </div>
    </>
  );
}
