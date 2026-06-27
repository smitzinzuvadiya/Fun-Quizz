import { useCoins } from '../hooks/useCoins';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

export function CoinBadge() {
  const { coins } = useCoins();

  return (
    <div className="flex items-center gap-1.5 bg-white text-black font-bold px-2   rounded-full shadow-sm">
      <span className="text-sm tracking-wide flex justify-center  items-center ">
        <span className='text-xl'>🪙</span> {coins}
      </span>
    </div>
  );
}
