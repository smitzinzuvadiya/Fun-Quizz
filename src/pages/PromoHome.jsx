import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CoinBadge } from '../components/CoinBadge';
import quizLogo from '../assets/quiz3.png';
import { CategoryCard } from '../components/CategoryCard';
import { AdPopup } from '../components/AdPopup';
import quizData from '../data/quizData.json';
import { useAds } from '../hooks/useAds';

import { PromoCard } from '../components/PromoCard';

export function PromoHome() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', ...quizData.categories.map(c => c.name)];

  const { shouldShowAd, dismissAd } = useAds();

  const filteredCategories = selectedFilter === 'All'
    ? quizData.categories
    : quizData.categories.filter(c => c.name === selectedFilter);

  return (
    <>
      <AdPopup isOpen={shouldShowAd} onClose={dismissAd} />
      <div className="pt-[68px] animate-in fade-in duration-500 flex flex-col h-full bg-[#7A61FE]">
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#7A61FE] flex justify-between items-center px-[20px] py-4 shadow-md">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={quizLogo} alt="PlayQuiz" className="h-10 object-contain rounded-xl" />
            </Link>
          </div>
          <CoinBadge />
        </header>

        <PromoCard />

        {/* Ad Placement Container */}
        <div className="w-full mb-6 flex justify-center flex-shrink-0">
          <div className="w-full min-h-[250px] bg-white/10 flex flex-col items-center justify-center text-white/60 shadow-inner relative overflow-hidden p-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Advertisement</span>
            {/* 
              TODO: Insert your Ad code here 
              Example:
              <ins className="adsbygoogle"
                   style={{ display: 'block', width: '100%', height: '250px' }}
                   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                   data-ad-slot="XXXXXXXXXX"
                   data-ad-format="rectangle"
                   data-full-width-responsive="true"></ins>
            */}
            <span className="text-xs mt-auto">Ad Space (Responsive Square)</span>
          </div>
        </div>

        {/* Dark Purple Container for Contests */}
        <div className="flex-1 bg-[#5b21b6] rounded-t-[32px] pt-6 flex flex-col relative shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.3)]">
          {/* Top Notch Decor */}
          <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#5b21b6] rounded-t-[20px]">
            <div className="w-2 h-2 rounded-full bg-white/20 mx-auto mt-1"></div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex overflow-x-auto no-scrollbar gap-3 mb-6 pb-2 px-[20px] flex-shrink-0">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`whitespace-nowrap flex-shrink-0 flex items-center justify-center h-9 px-5 rounded-full font-bold text-sm transition-all border-2 ${selectedFilter === filter
                  ? 'bg-[#7A61FE] text-white border-transparent shadow-md'
                  : 'bg-transparent border-white/30 text-white hover:bg-white/10'
                  }`}
              >
                {filter === 'All' ? 'CONTESTS' : filter.toUpperCase()}
              </button>
            ))}
          </div>

          <main className="flex-1 flex flex-col gap-4 px-[20px] pb-6 overflow-y-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) : (
              <div className="text-center text-white/70 font-medium py-10">
                No contests found.
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
