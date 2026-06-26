import { useCoins } from '../hooks/useCoins';
import { TrophyIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

export function Profile() {
  const { coins } = useCoins();
  const totalCompleted = parseInt(localStorage.getItem('quiz_total_completed') || '0', 10);
  const totalCorrect = parseInt(localStorage.getItem('quiz_total_correct') || '0', 10);

  return (
    <div className="pt-8 animate-in fade-in duration-500 flex flex-col h-full bg-[#7A61FE]">
      <header className="mb-6 flex-shrink-0 px-[20px]">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Profile</h1>
      </header>
      
      <div className="flex-1 bg-[#5b21b6] rounded-t-[32px] pt-6 flex flex-col relative shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.3)]">
        <main className="flex-1 flex flex-col px-[20px] pb-6 overflow-y-auto">
          <div className="bg-surface rounded-[24px] p-6 shadow-sm flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <SparklesIcon className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-on-surface">Quiz Master</h2>
            <p className="text-sm font-medium text-on-surface-variant">Keep learning to level up!</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-surface rounded-[16px] p-5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-3 text-secondary">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <p className="text-sm text-on-surface-variant font-medium mb-1">Total Coins</p>
              <p className="text-2xl font-black text-on-surface">{coins}</p>
            </div>
            
            <div className="bg-surface rounded-[16px] p-5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                <ListIcon className="w-6 h-6" />
              </div>
              <p className="text-sm text-on-surface-variant font-medium mb-1">Quizzes Done</p>
              <p className="text-2xl font-black text-on-surface">{totalCompleted}</p>
            </div>
          </div>

          <div className="bg-surface rounded-[16px] p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant font-medium">Correct Answers</p>
                <p className="text-xl font-black text-on-surface">{totalCorrect}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ListIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
  );
}
