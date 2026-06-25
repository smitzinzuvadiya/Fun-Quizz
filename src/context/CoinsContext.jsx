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

  useEffect(() => {
    localStorage.setItem('quiz_coins', coins.toString());
  }, [coins]);

  const claimWelcomeBonus = () => {
    setCoins((prev) => prev + 100);
    setHasClaimedBonus(true);
    localStorage.setItem('quiz_welcome_bonus_claimed', 'true');
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
    <CoinsContext.Provider value={{ coins, addCoins, spendCoins, hasClaimedBonus, claimWelcomeBonus, hasSeenLanding, markLandingSeen }}>
      {children}
    </CoinsContext.Provider>
  );
}
