import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';
import { QuestionCard } from '../components/QuestionCard';
import { CoinBadge } from '../components/CoinBadge';
import { useCoins } from '../hooks/useCoins';
import { useAds } from '../hooks/useAds';
import { useAudio } from '../hooks/useAudio';
import { AdPopup } from '../components/AdPopup';
import { PrizeRankPopup } from '../components/PrizeRankPopup';
import { XMarkIcon, ArrowLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import quizLogo from '../assets/quiz3.png';
import { playRewardAd } from '../utils/adHelper';
import { SponsoredSquareAd } from '../components/SponsoredSquareAd';

export function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addCoins, coins } = useCoins();
  const { playSound } = useAudio();
  const { shouldShowAd, dismissAd, registerQuestionAnswered, showAd } = useAds();

  const [category, setCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => parseInt(sessionStorage.getItem(`quiz_idx_${categoryId}`) || '0', 10));
  const [correctAnswers, setCorrectAnswers] = useState(() => parseInt(sessionStorage.getItem(`quiz_corr_${categoryId}`) || '0', 10));
  const [points, setPoints] = useState(() => parseInt(sessionStorage.getItem(`quiz_pts_${categoryId}`) || '0', 10));
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isStarted, setIsStarted] = useState(() => sessionStorage.getItem(`quiz_active_${categoryId}`) === 'true');
  const [answerHistory, setAnswerHistory] = useState(() => JSON.parse(sessionStorage.getItem(`quiz_hist_${categoryId}`) || '[]'));
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [showNotEnoughCoinsPopup, setShowNotEnoughCoinsPopup] = useState(false);
  const [showQuitConfirmPopup, setShowQuitConfirmPopup] = useState(false);
  const [extraTimeCounter, setExtraTimeCounter] = useState(0);
  const [trigger5050, setTrigger5050] = useState(0);
  const [triggerAudience, setTriggerAudience] = useState(0);
  const [triggerFreeze, setTriggerFreeze] = useState(0);
  const [triggerFlip, setTriggerFlip] = useState(0);
  const [flippedQuestion, setFlippedQuestion] = useState(null);
  const [usedLifelines, setUsedLifelines] = useState(() => JSON.parse(sessionStorage.getItem(`quiz_lifelines_${categoryId}`) || '[]'));
  const [isAdLoading, setIsAdLoading] = useState(false);
  const adOnCloseActionRef = useRef(null);

  const clearQuizSession = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setPoints(0);
    setAnswerHistory([]);
    setUsedLifelines([]);

    sessionStorage.removeItem(`quiz_active_${categoryId}`);
    sessionStorage.removeItem(`quiz_idx_${categoryId}`);
    sessionStorage.removeItem(`quiz_corr_${categoryId}`);
    sessionStorage.removeItem(`quiz_pts_${categoryId}`);
    sessionStorage.removeItem(`quiz_hist_${categoryId}`);
    sessionStorage.removeItem(`quiz_lifelines_${categoryId}`);
    sessionStorage.removeItem(`quiz_shuffled_${categoryId}`);
  };

  useEffect(() => {
    sessionStorage.setItem(`quiz_active_${categoryId}`, isStarted);
    sessionStorage.setItem(`quiz_idx_${categoryId}`, currentQuestionIndex);
    sessionStorage.setItem(`quiz_corr_${categoryId}`, correctAnswers);
    sessionStorage.setItem(`quiz_pts_${categoryId}`, points);
    sessionStorage.setItem(`quiz_hist_${categoryId}`, JSON.stringify(answerHistory));
    sessionStorage.setItem(`quiz_lifelines_${categoryId}`, JSON.stringify(usedLifelines));
  }, [isStarted, currentQuestionIndex, correctAnswers, points, answerHistory, usedLifelines, categoryId]);

  const handleAdClose = () => {
    dismissAd();
    if (adOnCloseActionRef.current === 'home') {
      navigate('/promo-home');
    } else if (adOnCloseActionRef.current === 'add_time_and_continue') {
      setExtraTimeCounter(prev => prev + 1);
    } else if (adOnCloseActionRef.current === 'apply_5050') {
      setTrigger5050(prev => prev + 1);
      setUsedLifelines(prev => [...prev, '5050']);
    } else if (adOnCloseActionRef.current === 'apply_audience') {
      setTriggerAudience(prev => prev + 1);
      setUsedLifelines(prev => [...prev, 'audience']);
    } else if (adOnCloseActionRef.current === 'apply_freeze') {
      setTriggerFreeze(prev => prev + 1);
      setUsedLifelines(prev => [...prev, 'freeze']);
    } else if (adOnCloseActionRef.current === 'apply_flip') {
      setTriggerFlip(prev => prev + 1);
      setUsedLifelines(prev => [...prev, 'flip']);
    } else if (adOnCloseActionRef.current === 'claim_free_coins_200') {
      addCoins(200);
    }
    adOnCloseActionRef.current = null;
  };

  const handleUseLifeline = (type, method) => {
    if (type === '5050') {
      if (method === 'free') {
        if (isAdLoading) return;
        setIsAdLoading(true);
        playRewardAd({
          adName: 'quiz_lifeline_5050',
          onRewardGranted: () => {
            setIsAdLoading(false);
            setTrigger5050(prev => prev + 1);
            setUsedLifelines(prev => [...prev, '5050']);
          },
          onAdDismissed: () => setIsAdLoading(false),
          onAdError: () => setIsAdLoading(false)
        });
      } else if (method === 'coins') {
        // Assume deduct coins logic here, for now just apply
        setTrigger5050(prev => prev + 1);
        setUsedLifelines(prev => [...prev, '5050']);
      }
    } else if (type === 'audience') {
      if (method === 'free') {
        if (isAdLoading) return;
        setIsAdLoading(true);
        playRewardAd({
          adName: 'quiz_lifeline_audience',
          onRewardGranted: () => {
            setIsAdLoading(false);
            setTriggerAudience(prev => prev + 1);
            setUsedLifelines(prev => [...prev, 'audience']);
          },
          onAdDismissed: () => setIsAdLoading(false),
          onAdError: () => setIsAdLoading(false)
        });
      } else if (method === 'coins') {
        // Assume deduct coins logic here, for now just apply
        setTriggerAudience(prev => prev + 1);
        setUsedLifelines(prev => [...prev, 'audience']);
      }
    } else if (type === 'freeze') {
      if (method === 'free') {
        if (isAdLoading) return;
        setIsAdLoading(true);
        playRewardAd({
          adName: 'quiz_lifeline_freeze',
          onRewardGranted: () => {
            setIsAdLoading(false);
            setTriggerFreeze(prev => prev + 1);
            setUsedLifelines(prev => [...prev, 'freeze']);
          },
          onAdDismissed: () => setIsAdLoading(false),
          onAdError: () => setIsAdLoading(false)
        });
      } else if (method === 'coins') {
        setTriggerFreeze(prev => prev + 1);
        setUsedLifelines(prev => [...prev, 'freeze']);
      }
    } else if (type === 'flip') {
      if (method === 'free') {
        if (isAdLoading) return;
        setIsAdLoading(true);
        playRewardAd({
          adName: 'quiz_lifeline_flip',
          onRewardGranted: () => {
            setIsAdLoading(false);
            setTriggerFlip(prev => prev + 1);
            setUsedLifelines(prev => [...prev, 'flip']);
          },
          onAdDismissed: () => setIsAdLoading(false),
          onAdError: () => setIsAdLoading(false)
        });
      } else if (method === 'coins') {
        setTriggerFlip(prev => prev + 1);
        setUsedLifelines(prev => [...prev, 'flip']);
      }
    }
  };

  useEffect(() => {
    const foundCategory = quizData.categories.find((c) => c.id === categoryId);
    if (foundCategory) {
      const storedShuffled = sessionStorage.getItem(`quiz_shuffled_${categoryId}`);
      if (storedShuffled) {
        setCategory({ ...foundCategory, questions: JSON.parse(storedShuffled) });
      } else {
        const shuffled = [...foundCategory.questions].sort(() => Math.random() - 0.5);
        sessionStorage.setItem(`quiz_shuffled_${categoryId}`, JSON.stringify(shuffled));
        setCategory({ ...foundCategory, questions: shuffled });
      }
    } else {
      navigate('/promo-home');
    }
  }, [categoryId, navigate]);

  // Handle the flip question trigger
  useEffect(() => {
    if (triggerFlip > 0) {
      // Find a random question from other categories
      const otherCategories = quizData.categories.filter(c => c.id !== categoryId);
      if (otherCategories.length > 0) {
        const randomCat = otherCategories[Math.floor(Math.random() * otherCategories.length)];
        const randomQ = randomCat.questions[Math.floor(Math.random() * randomCat.questions.length)];
        setFlippedQuestion(randomQ);
      }
    }
  }, [triggerFlip, categoryId]);

  if (!category) return null;

  const currentQuestion = flippedQuestion || category.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / category.questions.length) * 100;

  const handleTimeOut = () => {
    setShowResultPopup('timeout');
  };

  const handleAnswer = (isCorrect) => {
    setFlippedQuestion(null); // Reset flipped question on answer

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
    setShowQuitConfirmPopup(true);
  };

  const confirmQuit = () => {
    setShowQuitConfirmPopup(false);
    clearQuizSession();
    navigate('/');
  };

  const winAmount = category.name.length * 15000 + 50000;
  const entryFee = category.entryFee || (category.name.length * 5);

  const handleStartQuiz = () => {
    if (coins >= entryFee) {
      addCoins(-entryFee);
      localStorage.setItem('last_quiz_correct', '0');
      localStorage.setItem('last_quiz_questions', '0');
      localStorage.setItem('last_quiz_wrong', '0');
      localStorage.setItem('last_quiz_score', '0');
      setIsStarted(true);
    } else {
      setShowNotEnoughCoinsPopup(true);
    }
  };

  if (!isStarted) {
    return (
      <div className="pt-[68px] h-full overflow-y-auto no-scrollbar bg-[#7A61FE] animate-in fade-in duration-300 relative">
        <header className="fixed top-0 left-0 right-0 w-full z-[100] bg-[#7A61FE] flex justify-between items-center px-[20px] py-4 shadow-md">
          <div className="flex items-center gap-1">
            <button onClick={() => navigate('/promo-home')} className="p-1 -ml-2 hover:bg-white/10 rounded-full transition-colors shrink-0">
              <ArrowLeftIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </button>
            <span className="flex items-center gap-2">
              <img src={quizLogo} alt="PlayQuiz" className="h-10 object-contain rounded-xl" />
            </span>
          </div>
          <CoinBadge />
        </header>

        <div className="min-h-full flex flex-col mt-4">

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
                onClick={handleStartQuiz}
                className="w-full bg-[#4a3f91] text-white font-bold text-[18px] py-4 rounded-[28px] shadow-sm hover:bg-[#3d3275] active:scale-95 transition-all"
              >
                Join Quiz
              </button>
              <button
                onClick={handleStartQuiz}
                className="w-full bg-[#F59E0B] text-white font-bold text-[18px] py-4 rounded-[28px] shadow-sm hover:bg-[#D97706] active:scale-95 transition-all"
              >
                Play as Guest
              </button>
            </div>

            {/* Ad Space Placeholder */}
            <div className="flex flex-col items-center justify-center w-[calc(100%+24px)] -mx-3 my-auto min-h-[250px]">
              {/* TODO: Insert your ad code in this space */}
              <div className="w-full h-full min-h-[250px] flex flex-col items-center justify-center bg-gray-50/50">
                <SponsoredSquareAd />
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3 px-1 mt-auto pt-4 pb-2 shrink-0">
              <button
                onClick={() => setShowPrizePopup(true)}
                className="flex-1 border-[1.5px] border-[#E2E8F0] text-[#4a3f91] font-bold text-[15px] py-3.5 rounded-[16px] hover:bg-gray-50 active:scale-95 transition-all"
              >
                View Prize
              </button>
              <button
                onClick={() => navigate('/rules')}
                className="flex-1 border-[1.5px] border-[#E2E8F0] text-[#4a3f91] font-bold text-[15px] py-3.5 rounded-[16px] hover:bg-gray-50 active:scale-95 transition-all"
              >
                Contest Rules
              </button>
            </div>
          </div>
        </div>
        <PrizeRankPopup isOpen={showPrizePopup} onClose={() => setShowPrizePopup(false)} />
        <AdPopup isOpen={shouldShowAd} onClose={handleAdClose} adContext="quiz" />
        {showNotEnoughCoinsPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-sm bg-white rounded-[32px] p-6 text-center relative overflow-hidden shadow-2xl border border-gray-100">
              <button
                onClick={() => setShowNotEnoughCoinsPopup(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-20"
              >
                <XMarkIcon className="w-6 h-6" strokeWidth={2.5} />
              </button>

              <div className="relative z-10 flex flex-col items-center pt-2 pb-2">
                <div className="text-[60px] mb-2 drop-shadow-md">🪙</div>
                <h2 className="text-[#0B0629] text-[24px] font-black mb-2 tracking-tight">
                  Not Enough Coins!
                </h2>
                <p className="text-gray-500 font-medium text-[15px] mb-6 leading-relaxed">
                  You don't have enough coins to join this quiz. Get 200 free coins by watching a short ad!
                </p>

                <button
                  onClick={() => {
                    if (isAdLoading) return;
                    setIsAdLoading(true);
                    setShowNotEnoughCoinsPopup(false);
                    playRewardAd({
                      adName: 'quiz_claim_200',
                      onRewardGranted: () => {
                        setIsAdLoading(false);
                        addCoins(200);
                      },
                      onAdDismissed: () => setIsAdLoading(false),
                      onAdError: () => setIsAdLoading(false)
                    });
                  }}
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-black text-[18px] py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                  </svg>
                  Claim 200 Coins
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pt-6 h-full flex flex-col px-[8px] pb-6 animate-in slide-in-from-right duration-300 relative overflow-y-auto overflow-x-hidden no-scrollbar bg-[#7A61FE]">

      {/* Background decorations for active quiz */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full border-[1.5px] border-white/10 pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-100px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"></div>

      <AdPopup isOpen={shouldShowAd} onClose={handleAdClose} adContext="quiz" />

      {/* Header with Back Arrow for Active Quiz */}
      <header className="flex justify-between items-center w-full relative z-10 px-2 mt-2">
        <button onClick={handleQuit} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors shrink-0">
          <ArrowLeftIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
      </header>

      <div className="flex flex-col items-center mb-6 mt-1 relative z-10 text-white">
        <span className="font-extrabold text-[16px] uppercase opacity-95 mb-1">{category.name}</span>
        <h1 className="text-[24px] md:text-[24px] font-black flex items-center justify-center gap-1.5 leading-none">
          Play and Win {winAmount} <span className="text-[#FBBF24] text-[22px]">🪙</span>
        </h1>
      </div>

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

      <main className="flex flex-col relative z-20 w-full mt-2">
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
          isAdOpen={shouldShowAd || isAdLoading}
          onUseLifeline={handleUseLifeline}
          trigger5050={trigger5050}
          triggerAudience={triggerAudience}
          triggerFreeze={triggerFreeze}
          triggerFlip={triggerFlip}
          usedLifelines={usedLifelines}
        />
      </main>

      <div className="w-full text-center mt-4 text-white font-bold text-lg md:text-xl relative z-10">
        Your score : {points}
      </div>

      {/* Result / Time Over Popup */}
      {showResultPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#6D4AFF] rounded-[32px] p-6 text-center relative overflow-hidden shadow-2xl border border-white/10">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 border-[1px] border-white/5 rounded-full blur-[1px] -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 border-[1px] border-white/5 rounded-full blur-[1px] -ml-10 -mb-10 pointer-events-none"></div>

            <button
              onClick={() => {
                setShowResultPopup(false);
                clearQuizSession();
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
                    clearQuizSession();
                    adOnCloseActionRef.current = 'home';
                    showAd();
                  } else {
                    if (isAdLoading) return;
                    setIsAdLoading(true);
                    playRewardAd({
                      adName: 'quiz_extra_time',
                      onRewardGranted: () => {
                        setIsAdLoading(false);
                        setExtraTimeCounter(prev => prev + 1);
                      },
                      onAdDismissed: () => setIsAdLoading(false),
                      onAdError: () => setIsAdLoading(false)
                    });
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
                    clearQuizSession();
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

      {/* Quit Confirmation Popup */}
      {showQuitConfirmPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#6D4AFF] rounded-[32px] p-6 text-center relative overflow-hidden shadow-2xl border border-white/10">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 border-[1px] border-white/5 rounded-full blur-[1px] -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 border-[1px] border-white/5 rounded-full blur-[1px] -ml-10 -mb-10 pointer-events-none"></div>

            <h2 className="text-white text-[28px] font-black mb-2 tracking-tight relative z-10 mt-2">
              Quit Quiz?
            </h2>
            <p className="text-white/90 font-medium text-[15px] mb-8 leading-relaxed relative z-10 px-2">
              Are you sure you want to quit? Your progress will be lost.
            </p>

            <div className="flex flex-col gap-3 relative z-10">
              <button
                onClick={() => setShowQuitConfirmPopup(false)}
                className="w-full bg-[#F59E0B] text-white font-black text-[18px] py-3.5 rounded-[20px] shadow-lg hover:bg-[#D97706] active:scale-95 transition-all"
              >
                No, Continue Playing
              </button>
              <button
                onClick={confirmQuit}
                className="w-full bg-white/20 text-white font-bold text-[16px] py-3.5 rounded-[20px] hover:bg-white/30 active:scale-95 transition-all"
              >
                Yes, Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
