import { useLocation, useNavigate } from 'react-router-dom';
import { CurrencyDollarIcon, ArrowPathIcon, ListBulletIcon } from '@heroicons/react/24/solid';

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, coinsEarned, totalQuestions, categoryId } = location.state || { score: 0, coinsEarned: 0, totalQuestions: 10, categoryId: '' };

  return (
    <div className="h-full flex flex-col justify-center px-[20px] pb-8 animate-in zoom-in-95 duration-500">
      <div className="bg-surface rounded-[24px] p-8 shadow-sm text-center">
        <h1 className="text-3xl font-black mb-2 text-primary">Quiz Complete!</h1>
        <p className="text-on-surface-variant font-medium mb-8">Great job finishing the quiz.</p>

        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-surface-variant">
            {/* Simple simulated circular progress visually by overlaying */}
            <div className="absolute inset-0 rounded-full border-8 border-primary" style={{ clipPath: `polygon(50% 50%, 50% 0, ${score >= totalQuestions/2 ? '100% 0, 100% 100%, 0 100%, 0 0, 50% 0' : '100% 0, 100% 50%'})`, opacity: 0.2 }}></div>
            <div className="text-center">
              <span className="text-4xl font-black">{score}</span>
              <span className="text-xl font-bold text-on-surface-variant">/{totalQuestions}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 bg-secondary/10 py-3 rounded-xl">
          <span className="font-bold text-on-surface-variant">You Earned:</span>
          <div className="flex items-center gap-1 font-black text-secondary text-xl">
            +{coinsEarned} <CurrencyDollarIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate(`/quiz/${categoryId}`)}
            className="w-full bg-primary text-slate-900 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            <ArrowPathIcon className="w-6 h-6" /> Try Again
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-surface-variant text-on-surface font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-outline-variant transition-colors active:scale-[0.98]"
          >
            <ListBulletIcon className="w-6 h-6" /> Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
}
