import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../hooks/useCoins';

export function PromoCard() {
  const navigate = useNavigate();
  const { coins } = useCoins();
  
  const totalCompleted = parseInt(localStorage.getItem('quiz_total_completed') || '0', 10);
  const totalCorrect = parseInt(localStorage.getItem('last_quiz_correct') || '0', 10);
  const totalQuestions = parseInt(localStorage.getItem('last_quiz_questions') || '0', 10);
  const totalWrong = parseInt(localStorage.getItem('last_quiz_wrong') || '0', 10);
  const totalScore = parseInt(localStorage.getItem('last_quiz_score') || '0', 10);
  
  // Dummy rank since there is no backend leaderboards
  const rank = totalQuestions === 0 ? '1000+' : (totalCompleted > 0 ? Math.max(1, 100 - totalCompleted * 2) : '1000+');

  return (
    <div className="px-[20px] mb-6 flex-shrink-0 relative z-10">
      <div className="bg-white rounded-[32px] relative p-3 flex flex-col shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>

        {/* Purple Banner */}
        <div className="bg-[#6D4AFF] rounded-[32px] px-4 py-6 flex flex-col items-center text-center text-white mb-4 relative overflow-hidden shrink-0">
          {/* Background decorations */}
          <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full border border-white/10"></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full bg-white/5"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="mb-2 relative">
              <span className="text-[60px] drop-shadow-md">🏆</span>
              <span className="absolute top-0 right-0 text-xl animate-bounce">🎊</span>
              <span className="absolute top-4 left-0 text-lg animate-pulse">🎉</span>
            </div>
            
            <h3 className="text-[20px] font-bold mb-3 tracking-wide">Well Played</h3>
            
            <div className="bg-[#4ade80] rounded-[16px] px-8 py-3 mb-3 shadow-md">
              <span className="text-white text-[32px] font-black leading-none drop-shadow-sm">{totalScore}</span>
            </div>
            
            <p className="text-[18px] font-bold mb-4 tracking-wide">Your score</p>
            
            <p className="text-[14px] font-medium mb-1.5 opacity-90">
              The winner will be declared @ 6:30 pm
            </p>
            <p className="text-[14px] font-bold">
              With this score, you can win <span className="text-white font-black ml-1">1500</span> <span className="text-[#FBBF24]">🪙</span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-[#ffe4e6] rounded-[24px] py-4 px-2 mb-4 flex justify-between items-center shadow-inner">
          <div className="flex flex-col items-center flex-1">
            <span className="text-[#641926] text-[22px] font-black">{rank}</span>
            <span className="text-[#9f4556] text-[13px] font-bold">Rank</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-[#fecdd3]">
            <span className="text-[#641926] text-[22px] font-black">{totalQuestions}</span>
            <span className="text-[#9f4556] text-[13px] font-bold">Total</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-[#fecdd3]">
            <span className="text-[#641926] text-[22px] font-black">{totalCorrect}</span>
            <span className="text-[#9f4556] text-[13px] font-bold">Correct</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-[#fecdd3]">
            <span className="text-[#641926] text-[22px] font-black">{totalWrong}</span>
            <span className="text-[#9f4556] text-[13px] font-bold">Wrong</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-1 mb-2 shrink-0">
          <button 
            onClick={() => navigate('/quiz/sport')}
            className="flex-1 bg-[#4a3f91] text-white font-bold text-[16px] py-3.5 rounded-[24px] shadow-sm hover:bg-[#3d3275] active:scale-95 transition-all"
          >
            Join Quiz
          </button>
          <button 
            onClick={() => navigate('/quiz/sport')}
            className="flex-1 bg-[#F59E0B] text-white font-bold text-[16px] py-3.5 rounded-[24px] shadow-sm hover:bg-[#D97706] active:scale-95 transition-all"
          >
            Play as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
