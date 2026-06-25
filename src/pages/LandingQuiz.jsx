import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../hooks/useCoins';
import { SponsoredSquareAd } from '../components/SponsoredSquareAd';
import { QuestionCard } from '../components/QuestionCard';
import confetti from 'canvas-confetti';

export function LandingQuiz() {
  const navigate = useNavigate();
  const { markLandingSeen } = useCoins();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const handleAnswer = (isCorrect) => {
    // If answering the second question, show confetti if correct
    if (currentQuestionIndex === questions.length - 1 && isCorrect) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6D28D9', '#FBBF24', '#F97316']
      });
    } else if (currentQuestionIndex === questions.length - 1 && !isCorrect) {
      // Even if incorrect on the second question, we can show a small effect
      // Or just let it be. We will just show it when correct for now.
    }

    // Auto-advance after giving them a moment to see the feedback
    const delay = currentQuestionIndex === questions.length - 1 ? 1500 : 1000;
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        markLandingSeen();
        navigate('/welcome');
      }
    }, delay);
  };

  return (
    <div className="h-full flex flex-col pt-4 px-[20px] pb-2 animate-in slide-in-from-right duration-300 overflow-hidden bg-white">
      <SponsoredSquareAd />

      <main className="flex-1 flex flex-col items-center justify-center mt-4">
        <QuestionCard
          key={questions[currentQuestionIndex].id}
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          headerText={`Question ${currentQuestionIndex + 1} of 2 - Win 200 Coins`}
        />
      </main>
    </div>
  );
}
