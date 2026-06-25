import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../hooks/useCoins';
import { StarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { AdPopup } from '../components/AdPopup';
import confetti from 'canvas-confetti';

export function Welcome() {
  const navigate = useNavigate();
  const { claimWelcomeBonus } = useCoins();
  const [showAd, setShowAd] = useState(false);

  const handleGetStarted = () => {
    claimWelcomeBonus();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6D28D9', '#FBBF24', '#F97316']
    });
    setShowAd(true);
  };

  const handleAdClose = () => {
    setShowAd(false);
    navigate('/');
  };

  return (
    <>
      <AdPopup isOpen={showAd} onClose={handleAdClose} />
      <div className="h-full w-full flex flex-col justify-between items-center bg-white px-6 py-12 animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-28 h-28 bg-primary rounded-3xl flex flex-col items-center justify-center mb-6 shadow-lg shadow-primary/30">
          <StarIcon className="w-12 h-12 text-secondary" />
          <span className="text-white font-black text-[10px] tracking-widest mt-1">QUIZLY</span>
        </div>
        <h1 className="text-3xl font-black text-primary mb-2">QuizMaster</h1>
        <p className="text-on-surface-variant font-medium text-lg">Test your knowledge!</p>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center relative pb-8">
        <div className="bg-surface border border-outline-variant/30 rounded-2xl px-6 py-4 flex items-center justify-center gap-4 mb-[-24px] z-10 shadow-sm relative overflow-hidden">
          {/* A slight gradient background to make it pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-primary/5"></div>
          
          <div className="relative z-10 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
             <CurrencyDollarIcon className="w-8 h-8 text-secondary" />
          </div>
          
          <div className="relative z-10">
            <p className="text-xs font-bold text-primary mb-0.5">🎉 Welcome Bonus!</p>
            <p className="text-xl font-black text-secondary">+100 Coins</p>
          </div>
        </div>

        <button 
          onClick={handleGetStarted}
          className="w-full bg-primary text-white font-bold text-xl pt-8 pb-5 rounded-3xl flex justify-center items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
        >
          Get Started 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
    </>
  );
}
