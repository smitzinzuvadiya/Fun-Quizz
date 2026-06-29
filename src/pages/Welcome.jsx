import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../hooks/useCoins';
import { AdPopup } from '../components/AdPopup';
import { SponsoredSquareAd } from '../components/SponsoredSquareAd';
import confetti from 'canvas-confetti';
import { playRewardAd } from '../utils/adHelper';

export function Welcome() {
  const navigate = useNavigate();
  const { claimWelcomeBonus, adsWatchedInLanding } = useCoins();
  const [showAd, setShowAd] = useState(false);

  // Compute bonus amount: base 200 + 100 per ad watched in landing page
  const bonusAmount = 200 + (adsWatchedInLanding * 100);

  const [isAdLoading, setIsAdLoading] = useState(false);

  const handleGetStarted = () => {
    if (isAdLoading) return;
    setIsAdLoading(true);

    claimWelcomeBonus(bonusAmount);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6D28D9', '#FBBF24', '#F97316']
    });
    
    playRewardAd({
      adName: "welcome_play_now",
      onRewardGranted: () => {
        setIsAdLoading(false);
        navigate('/');
      },
      onAdDismissed: () => {
        setIsAdLoading(false);
        navigate('/');
      },
      onAdError: () => {
        setIsAdLoading(false);
        navigate('/');
      }
    });
  };

  const handleAdClose = () => {
    setShowAd(false);
    navigate('/');
  };

  return (
    <>
      <AdPopup isOpen={showAd} onClose={handleAdClose} />
      <div className="h-full w-full flex flex-col bg-[#7A61FE] animate-in fade-in duration-700 overflow-y-auto no-scrollbar px-4 pt-4 pb-8 relative">
        {/* Background decorative faint shapes if needed */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] rounded-full border border-white/50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[40%] rounded-full border border-white/50"></div>
        </div>

        <div className="relative z-10 flex flex-col w-full max-w-md mx-auto space-y-6 mt-2">
          {/* Top Ad Space */}
          <SponsoredSquareAd />

          <div className="bg-white rounded-[32px] relative px-6 py-5 flex flex-col items-center text-center shadow-xl w-full">
            {/* Top Notch */}
            <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#7A61FE] rounded-full"></div>

            {/* Coins Video */}
            <video
              src="/coins.mp4"
              className="w-[100px] h-[100px] mb-4 mt-2 object-contain"
              autoPlay
              loop
              muted
              playsInline
            />

            <h1 className="text-[24px] font-extrabold text-black mb-3 leading-tight tracking-tight">
              You have earn {bonusAmount} coins
            </h1>

            <p className="text-[#6B7280] text-[16px] font-medium mb-8 px-2 leading-relaxed">
              Challenge yourself with more quizzes and earn even more coins!
            </p>

            <button
              onClick={handleGetStarted}
              disabled={isAdLoading}
              className="w-full bg-[#5b3eb8] text-white font-bold text-[18px] py-4 rounded-full shadow-md hover:bg-[#4b35b5] active:scale-[0.98] transition-all tracking-wide disabled:opacity-70"
            >
              {isAdLoading ? "Loading Ad..." : "Play Now"}
            </button>
          </div>

          <div className="w-full bg-white/15 backdrop-blur-sm rounded-3xl p-6 text-white text-left mt-6">
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

          <div className="flex items-center justify-center gap-6 mt-8 mb-4 text-white text-sm font-semibold underline decoration-white/50 underline-offset-4">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="hover:text-white/80 transition-colors">Terms & Conditions</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors">Privacy policy</a>
          </div>
        </div>
      </div>
    </>
  );
}
