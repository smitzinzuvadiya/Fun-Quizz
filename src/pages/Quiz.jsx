import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';
import { QuestionCard } from '../components/QuestionCard';
import { CoinBadge } from '../components/CoinBadge';
import { useCoins } from '../hooks/useCoins';
import { useAds } from '../hooks/useAds';
import { useAudio } from '../hooks/useAudio';
import { AdPopup } from '../components/AdPopup';
import { XMarkIcon, ArrowLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addCoins, coins } = useCoins();
  const { playSound } = useAudio();
  const { shouldShowAd, dismissAd, registerQuestionAnswered, showAd } = useAds();

  const [category, setCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [points, setPoints] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [extraTimeCounter, setExtraTimeCounter] = useState(0);
  const adOnCloseActionRef = useRef(null);

  const handleAdClose = () => {
    dismissAd();
    if (adOnCloseActionRef.current === 'home') {
      navigate('/promo-home');
    } else if (adOnCloseActionRef.current === 'add_time_and_continue') {
      setExtraTimeCounter(prev => prev + 1);
    }
    adOnCloseActionRef.current = null;
  };

  useEffect(() => {
    const foundCategory = quizData.categories.find((c) => c.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
    } else {
      navigate('/promo-home');
    }
  }, [categoryId, navigate]);

  if (!category) return null;

  const currentQuestion = category.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / category.questions.length) * 100;

  const handleTimeOut = () => {
    setShowResultPopup('timeout');
  };

  const handleAnswer = (isCorrect) => {
    registerQuestionAnswered(isCorrect);
    setAnswerHistory(prev => [...prev, isCorrect]);

    // Update total questions answered
    const currentTotalQ = parseInt(localStorage.getItem('quiz_total_questions') || '0', 10);
    localStorage.setItem('quiz_total_questions', (currentTotalQ + 1).toString());

    let newPoints = points;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setCoinsEarned((prev) => prev + 10);
      addCoins(10);
      playSound('correct');
      newPoints += 10;
      
      const currentTotalCorrect = parseInt(localStorage.getItem('quiz_total_correct') || '0', 10);
      localStorage.setItem('quiz_total_correct', (currentTotalCorrect + 1).toString());

      const currentTotalScore = parseInt(localStorage.getItem('quiz_total_score') || '0', 10);
      localStorage.setItem('quiz_total_score', (currentTotalScore + 10).toString());
    } else {
      playSound('incorrect');
      newPoints = Math.max(0, newPoints - 5);
      
      const currentTotalWrong = parseInt(localStorage.getItem('quiz_total_wrong') || '0', 10);
      localStorage.setItem('quiz_total_wrong', (currentTotalWrong + 1).toString());
      
      const currentTotalScore = parseInt(localStorage.getItem('quiz_total_score') || '0', 10);
      localStorage.setItem('quiz_total_score', Math.max(0, currentTotalScore - 5).toString());
    }
    setPoints(newPoints);

    // Update last quiz stats for the home page PromoCard
    const sessionCorrect = correctAnswers + (isCorrect ? 1 : 0);
    const sessionTotal = currentQuestionIndex + 1;
    localStorage.setItem('last_quiz_correct', sessionCorrect.toString());
    localStorage.setItem('last_quiz_questions', sessionTotal.toString());
    localStorage.setItem('last_quiz_wrong', (sessionTotal - sessionCorrect).toString());
    localStorage.setItem('last_quiz_score', newPoints.toString());

    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz finished
      playSound('complete');
      const currentCompleted = parseInt(localStorage.getItem('quiz_total_completed') || '0', 10);
      localStorage.setItem('quiz_total_completed', (currentCompleted + 1).toString());

      // Show result popup for completion
      setShowResultPopup('complete');
    }
  };

  const handleQuit = () => {
    navigate('/');
  };

  const winAmount = category.name.length * 15000 + 50000;
  const entryFee = category.name.length * 5;

  if (!isStarted) {
    return (
      <div className="h-full overflow-y-auto no-scrollbar bg-[#7A61FE] animate-in fade-in duration-300">
        <div className="min-h-full flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center px-5 pt-6 pb-4 text-white shrink-0">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/promo-home')} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeftIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </button>

              <div
                className="flex items-center text-[28px] font-black tracking-tight text-white"
                style={{ textShadow: '-1.5px 0 0 #00ffff, 1.5px 0 0 #ff00ff' }}
              >
                Quizz
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-md border border-white/20 shadow-inner">
                <span className="text-[#FBBF24] text-sm">🪙</span>
                <span className="font-bold text-sm tracking-wide">{coins}</span>
              </div>
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <BellIcon className="w-6 h-6 text-white" strokeWidth={2} />
              </button>
            </div>
          </header>

          {/* Main Card */}
          <div className="flex-1 bg-white rounded-[32px] m-2 mb-4 relative p-3 flex flex-col shadow-2xl">
            {/* Notch */}
            <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>

            {/* Purple Banner */}
            <div className="bg-[#6D4AFF] rounded-[32px] px-4 py-8 flex flex-col items-center text-center text-white mb-8 relative overflow-hidden shrink-0">
              {/* Background decorations */}
              <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full border border-white/10"></div>
              <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full border border-white/10"></div>

              <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full bg-white/5"></div>
              <div className="absolute bottom-[-70px] left-[-70px] w-[180px] h-[180px] rounded-full bg-white/5"></div>

              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-[88px] h-[88px] bg-white rounded-[24px] flex items-center justify-center text-[48px] mb-4 text-black shadow-sm">
                  {category.icon}
                </div>
                <p className="text-[13px] font-medium uppercase tracking-wide mb-3">{category.name}</p>

                <h2 className="text-[24px] font-black mb-3 flex items-center justify-center gap-1.5 leading-none tracking-tight">
                  Play and Win {winAmount} <span className="text-[#FBBF24] text-[20px]">🪙</span>
                </h2>

                <p className="text-[14px] mb-1.5">
                  <span className="font-bold">60</span> seconds to answer all questions.
                </p>
                <p className="text-[14px] mb-5 flex items-center justify-center gap-1">
                  Entry fee <span className="font-bold ml-1">{entryFee}</span> <span className="text-[#FBBF24] text-[14px]">🪙</span>
                </p>

                <p className="text-[14px] font-medium text-white px-2 leading-relaxed max-w-[280px]">
                  Join and collect your coins! It's completely free and secure!
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 px-2 shrink-0 mb-6">
              <button
                onClick={() => setIsStarted(true)}
                className="w-full bg-[#4a3f91] text-white font-bold text-[18px] py-4 rounded-[28px] shadow-sm hover:bg-[#3d3275] active:scale-95 transition-all"
              >
                Join Quiz
              </button>
              <button
                onClick={() => setIsStarted(true)}
                className="w-full bg-[#F59E0B] text-white font-bold text-[18px] py-4 rounded-[28px] shadow-sm hover:bg-[#D97706] active:scale-95 transition-all"
              >
                Play as Guest
              </button>
            </div>

            {/* Ad Space Placeholder */}
            <div className="flex flex-col items-center justify-center w-full -mx-3 my-auto min-h-[250px]">
              {/* TODO: Insert your ad code in this space */}
              <div className="w-[calc(100%+24px)] h-full min-h-[250px] flex flex-col items-center justify-center bg-gray-50/50">
                <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Ad Space</span>
                <span className="text-gray-300 text-xs mt-1">Insert code here</span>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3 px-1 mt-auto pt-4 pb-2 shrink-0">
              <button className="flex-1 border-[1.5px] border-[#E2E8F0] text-[#4a3f91] font-bold text-[15px] py-3.5 rounded-[16px] hover:bg-gray-50 active:scale-95 transition-all">
                View Prize
              </button>
              <button className="flex-1 border-[1.5px] border-[#E2E8F0] text-[#4a3f91] font-bold text-[15px] py-3.5 rounded-[16px] hover:bg-gray-50 active:scale-95 transition-all">
                Contest Rules
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pt-8 px-[16px] pb-6 animate-in slide-in-from-right duration-300 relative overflow-hidden bg-[#7A61FE]">
      {/* Background decorations for active quiz */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full border-[1.5px] border-white/10 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-100px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"></div>
      <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"></div>

      <AdPopup isOpen={shouldShowAd} onClose={handleAdClose} adContext="quiz" />

      <header className="flex flex-col items-center mb-6 relative z-10 text-white">
        <span className="font-extrabold text-[13px] tracking-[0.15em] uppercase opacity-90 mb-2">{category.name} QUIZ</span>
        <h1 className="text-[26px] md:text-[28px] font-black flex items-center justify-center gap-1.5 leading-none">
          Play and Win {winAmount} <span className="text-[#FBBF24] text-[22px]">🪙</span>
        </h1>
      </header>

      {/* Score indicators */}
      <div className="flex justify-between items-center w-full px-2 mb-2 text-[18px] font-black relative z-10">
        <div className="flex items-center gap-2 text-[#4ade80]">
          <div className="w-4 h-1.5 bg-[#4ade80] rounded-full"></div>
          {correctAnswers}
        </div>
        <div className="flex items-center gap-2 text-[#f87171]">
          <div className="w-4 h-1.5 bg-[#f87171] rounded-full"></div>
          {currentQuestionIndex - correctAnswers}
        </div>
      </div>

      <main className="flex-1 flex flex-col relative z-10">
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          showNumbers={true}
          currentIndex={currentQuestionIndex}
          totalQuestions={category.questions.length}
          showFooter={true}
          answerHistory={answerHistory}
          onTimeOut={handleTimeOut}
          extraTimeCounter={extraTimeCounter}
          isAdOpen={shouldShowAd}
        />
      </main>

      <div className="w-full text-center mt-4 text-white font-bold text-lg md:text-xl relative z-10">
        Your score : {points}
      </div>

      {/* Result / Time Over Popup */}
      {showResultPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#6D4AFF] rounded-[32px] p-6 text-center relative overflow-hidden shadow-2xl border border-white/10">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 border-[1px] border-white/5 rounded-full blur-[1px] -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 border-[1px] border-white/5 rounded-full blur-[1px] -ml-10 -mb-10 pointer-events-none"></div>

            <button
              onClick={() => {
                setShowResultPopup(false);
                adOnCloseActionRef.current = 'home';
                showAd();
              }}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10 flex flex-col items-center pt-2 pb-2">
              <div className="w-[140px] h-[140px] mb-2 relative">
                <video
                  src="/chest.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>

              <h2 className="text-white text-[28px] font-black mb-1 tracking-tight">
                {showResultPopup === 'complete' ? 'Congrats!' : 'Oops!'}
              </h2>
              <h3 className="text-[#FBBF24] text-[32px] font-black mb-8 tracking-tight">
                {showResultPopup === 'complete' ? 'Quiz Complete' : 'Time Over'}
              </h3>

              <button
                onClick={() => {
                  setShowResultPopup(false);
                  if (showResultPopup === 'complete') {
                    adOnCloseActionRef.current = 'home';
                    showAd();
                  } else {
                    adOnCloseActionRef.current = 'add_time_and_continue';
                    showAd();
                  }
                }}
                className="w-full max-w-[240px] bg-[#F59E0B] hover:bg-[#D97706] text-white font-black text-[22px] py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95 mb-6"
              >
                {showResultPopup !== 'complete' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#0B0629]">
                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                  </svg>
                )}
                Continue
              </button>

              {showResultPopup === 'timeout' && (
                <button
                  onClick={() => {
                    setShowResultPopup(false);
                    adOnCloseActionRef.current = 'home';
                    showAd();
                  }}
                  className="text-white/70 hover:text-white font-bold text-[16px] transition-colors mb-2 relative z-20 cursor-pointer"
                >
                  Cancel and End Quiz
                </button>
              )}

              <p className="text-white/90 text-sm font-medium px-4 leading-relaxed mt-2">
                {showResultPopup === 'complete'
                  ? 'Great job finishing the quiz! Click continue to go home.'
                  : 'Click on video ad to get more 15 seconds and continue quiz.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
