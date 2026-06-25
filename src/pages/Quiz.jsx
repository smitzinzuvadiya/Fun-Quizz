import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';
import { QuestionCard } from '../components/QuestionCard';
import { CoinBadge } from '../components/CoinBadge';
import { useCoins } from '../hooks/useCoins';
import { useAds } from '../hooks/useAds';
import { useAudio } from '../hooks/useAudio';
import { AdPopup } from '../components/AdPopup';
import { XMarkIcon } from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';

export function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addCoins } = useCoins();
  const { playSound } = useAudio();
  const { shouldShowAd, dismissAd, registerQuestionAnswered } = useAds();

  const [category, setCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  useEffect(() => {
    const foundCategory = quizData.categories.find((c) => c.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
    } else {
      navigate('/');
    }
  }, [categoryId, navigate]);

  if (!category) return null;

  const currentQuestion = category.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / category.questions.length) * 100;

  const handleAnswer = (isCorrect) => {
    registerQuestionAnswered(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCoinsEarned((prev) => prev + 10);
      addCoins(10);
      playSound('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FBBF24', '#F97316']
      });
      // Update local storage stats for total correct answers
      const currentCorrect = parseInt(localStorage.getItem('quiz_total_correct') || '0', 10);
      localStorage.setItem('quiz_total_correct', (currentCorrect + 1).toString());
    } else {
      playSound('incorrect');
    }

    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz finished
      playSound('complete');
      const currentCompleted = parseInt(localStorage.getItem('quiz_total_completed') || '0', 10);
      localStorage.setItem('quiz_total_completed', (currentCompleted + 1).toString());

      // Store session results to pass to Result page via localStorage or state
      // For simplicity we will pass via navigate state
      navigate('/result', { state: { score: score + (isCorrect ? 1 : 0), coinsEarned: coinsEarned + (isCorrect ? 10 : 0), totalQuestions: category.questions.length, categoryId: category.id } });
    }
  };

  const handleQuit = () => {
    navigate('/');
  };

  return (
    <div className="h-full flex flex-col pt-6 px-[20px] pb-8 animate-in slide-in-from-right duration-300">
      <AdPopup isOpen={shouldShowAd} onClose={dismissAd} adContext={adContext} />

      <header className="flex justify-between items-center mb-6">
        <button onClick={handleQuit} className="p-2 rounded-full bg-surface-variant hover:bg-outline-variant transition-colors">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <span className="font-bold text-lg opacity-80">{category.name}</span>
        <CoinBadge />
      </header>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-bold text-on-surface-variant mb-2">
          <span>Question {currentQuestionIndex + 1}</span>
          <span>{category.questions.length}</span>
        </div>
        <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-tertiary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col justify-center">
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      </main>
    </div>
  );
}
