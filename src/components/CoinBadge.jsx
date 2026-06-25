import { useCoins } from '../hooks/useCoins';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

export function CoinBadge() {
  const { coins } = useCoins();

  return (
    <div className="flex items-center gap-1.5 bg-secondary text-on-secondary-fixed font-bold px-3 py-1.5 rounded-full shadow-sm">
      <CurrencyDollarIcon className="w-5 h-5 text-white" />
      <span className="text-sm tracking-wide">{coins}</span>
    </div>
  );
}
