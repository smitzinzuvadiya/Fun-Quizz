import { createContext, useEffect, useState } from 'react';

export const CoinsContext = createContext();

export function CoinsProvider({ children }) {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('quiz_coins');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [hasClaimedBonus, setHasClaimedBonus] = useState(() => {
    return localStorage.getItem('quiz_welcome_bonus_claimed') === 'true';
  });

  const [hasSeenLanding, setHasSeenLanding] = useState(() => {
    return localStorage.getItem('quiz_seen_landing') === 'true';
  });

  const [adsWatchedInLanding, setAdsWatchedInLanding] = useState(() => {
    const saved = localStorage.getItem('quiz_ads_watched');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('quiz_coins', coins.toString());
  }, [coins]);

  const claimWelcomeBonus = (amount = 200) => {
    setCoins((prev) => prev + amount);
    setHasClaimedBonus(true);
    localStorage.setItem('quiz_welcome_bonus_claimed', 'true');
  };

  const incrementAdsWatched = () => {
    setAdsWatchedInLanding((prev) => {
      const newVal = prev + 1;
      localStorage.setItem('quiz_ads_watched', newVal.toString());
      return newVal;
    });
  };

  const markLandingSeen = () => {
    setHasSeenLanding(true);
    localStorage.setItem('quiz_seen_landing', 'true');
  };

  const addCoins = (amount) => {
    setCoins((prev) => prev + amount);
  };

  const spendCoins = (amount) => {
    setCoins((prev) => Math.max(0, prev - amount));
  };

  return (
    <CoinsContext.Provider value={{ 
      coins, 
      addCoins, 
      spendCoins, 
      hasClaimedBonus, 
      claimWelcomeBonus, 
      hasSeenLanding, 
      markLandingSeen,
      adsWatchedInLanding,
      incrementAdsWatched
    }}>
      {children}
    </CoinsContext.Provider>
  );
}
