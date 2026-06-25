import { useContext } from 'react';
import { CoinsContext } from '../context/CoinsContext';

export function useCoins() {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
}
