import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../hooks/useCoins';
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
      <div className="h-full w-full flex flex-col bg-[#7A61FE] animate-in fade-in duration-700 overflow-hidden px-4 justify-center relative">
        {/* Background decorative faint shapes if needed */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] rounded-full border border-white/50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[40%] rounded-full border border-white/50"></div>
        </div>

        <div className="bg-white rounded-[32px] relative px-6 py-10 flex flex-col items-center text-center shadow-xl w-full max-w-sm mx-auto z-10">
          {/* Top Notch */}
          <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#7A61FE] rounded-full"></div>

          {/* Coins Video */}
          <video 
            src="/coins.mp4" 
            className="w-[120px] h-[120px] mb-4 mt-2 object-contain" 
            autoPlay 
            loop 
            muted 
            playsInline
          />

          <h1 className="text-[26px] font-extrabold text-black mb-3 leading-tight tracking-tight">
            You have earn 100 coins
          </h1>

          <p className="text-[#6B7280] text-[16px] font-medium mb-8 px-2 leading-relaxed">
            Challenge yourself with more quizzes and earn even more coins!
          </p>

          <button
            onClick={handleGetStarted}
            className="w-full bg-[#5b3eb8] text-white font-bold text-[18px] py-4 rounded-full shadow-md hover:bg-[#4b35b5] active:scale-[0.98] transition-all tracking-wide"
          >
            Play Now
          </button>
        </div>
      </div>
    </>
  );
}
