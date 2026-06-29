import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';
import { useCoins } from '../hooks/useCoins';
import { SponsoredSquareAd } from '../components/SponsoredSquareAd';
import { QuestionCard } from '../components/QuestionCard';
import { WrongAnswerPopup } from '../components/WrongAnswerPopup';
import { AdPopup } from '../components/AdPopup';
import confetti from 'canvas-confetti';
import { playRewardAd } from '../utils/adHelper';

export function LandingQuiz() {
  const navigate = useNavigate();
  const { markLandingSeen, incrementAdsWatched } = useCoins();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);

  const questions = [
    {
      id: "q1",
      question: "Who is widely known as the 'God of Cricket'?",
      options: ["Virat Kohli", "MS Dhoni", "Sachin Tendulkar", "Ricky Ponting"],
      correctAnswer: "Sachin Tendulkar"
    },
    {
      id: "q2",
      question: "Which country won the first Cricket World Cup in 1975?",
      options: ["India", "West Indies", "Australia", "England"],
      correctAnswer: "West Indies"
    }
  ];

  const proceedToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      markLandingSeen();
      navigate('/welcome');
    }
  };

  const handleAnswer = (isCorrect) => {
    setLastAnswerCorrect(isCorrect);
    // If answering the last question correctly, show confetti
    if (currentQuestionIndex === questions.length - 1 && isCorrect) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6D28D9', '#FBBF24', '#F97316']
      });
    }

    // Always show the popup
    setShowWrongPopup(true);
  };

  const handleWrongAnswerClose = () => {
    setShowWrongPopup(false);
    proceedToNext();
  };

  const [isAdLoading, setIsAdLoading] = useState(false);

  const handleWrongAnswerClaim = () => {
    if (isAdLoading) return;
    setIsAdLoading(true);
    setShowWrongPopup(false);
    playRewardAd({
      adName: "landing_claim",
      onRewardGranted: () => {
        setIsAdLoading(false);
        incrementAdsWatched();
        proceedToNext();
      },
      onAdDismissed: () => {
        setIsAdLoading(false);
        proceedToNext();
      },
      onAdError: () => {
        setIsAdLoading(false);
        proceedToNext();
      }
    });
  };

  const handleAdClose = () => {
    setShowAdPopup(false);
    incrementAdsWatched();
    proceedToNext();
  };

  return (
    <>
      <WrongAnswerPopup
        isOpen={showWrongPopup}
        isCorrect={lastAnswerCorrect}
        onClose={handleWrongAnswerClose}
        onClaim={handleWrongAnswerClaim}
        isAdLoading={isAdLoading}
      />
      <AdPopup
        isOpen={showAdPopup}
        onClose={handleAdClose}
      />

      <div className="h-full flex flex-col pt-4 px-[20px] pb-2 animate-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar bg-[#7A61FE]">
        <SponsoredSquareAd />

        <main className="flex-1 flex flex-col items-center mt-4 pb-8 space-y-6">
          <QuestionCard
            key={questions[currentQuestionIndex].id}
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            headerText={`Question ${currentQuestionIndex + 1} of 2 - Win 200 Coins`}
          />

          <div className="w-full max-w-md bg-white/15 backdrop-blur-sm rounded-3xl p-6 text-white text-left">
            <h2 className="text-2xl font-bold mb-6">Discover Fun Quizzes</h2>

            <ul className="space-y-6">
              {[
                "Expand your expertise through our exclusive and wide-ranging quiz topics.",
                "A widest and coolest collection of fun and engaging quizzes entertains you.",
                "The completion of each quiz contest boosts your knowledge and self-confidence.",
                "A large number of players from across the globe rely on us to have an immersive quiz experience.",
                "Major categories you discover here include Business, Finance, Sports, Knowledge and more.",
                "Challenge players worldwide and enhance your abilities."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-sm md:text-base font-medium leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
