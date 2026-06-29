import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CoinBadge } from '../components/CoinBadge';
import quizLogo from '../assets/quiz3.png';
import { CategoryCard } from '../components/CategoryCard';
import { AdPopup } from '../components/AdPopup';
import quizData from '../data/quizData.json';
import { useAds } from '../hooks/useAds';
import { useCoins } from '../hooks/useCoins';
import { useRef } from 'react';
import { SponsoredSquareAd } from '../components/SponsoredSquareAd';
import { playRewardAd } from '../utils/adHelper';


export function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', ...quizData.categories.map(c => c.name)];

  const { shouldShowAd, dismissAd, showAd } = useAds();
  const { addCoins } = useCoins();

  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [showFreeCoinsBtn, setShowFreeCoinsBtn] = useState(true);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const adOnCloseActionRef = useRef(null);



  const handleAdClose = () => {
    dismissAd();
    if (adOnCloseActionRef.current === 'free_coins') {
      addCoins(100);
    }
    adOnCloseActionRef.current = null;
  };

  const filteredCategories = selectedFilter === 'All'
    ? quizData.categories
    : quizData.categories.filter(c => c.name === selectedFilter);

  return (
    <>
      <AdPopup isOpen={shouldShowAd} onClose={handleAdClose} />
      <div className="pt-[68px] animate-in fade-in duration-500 flex flex-col h-full bg-[#7A61FE] overflow-x-hidden relative">
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#7A61FE] flex justify-between items-center px-[20px] py-4 shadow-md">
          <div>
            <h1 className="flex items-center gap-2">
              <img src={quizLogo} alt="PlayQuiz" className="h-10 " />
            </h1>
          </div>
          <CoinBadge />
        </header>


        {/* Ad Placement Container */}
        <div className="w-full mb-6 flex justify-center flex-shrink-0">
          <div className="w-full min-h-[250px] bg-white/10 flex flex-col items-center justify-center text-white/60 shadow-inner relative overflow-hidden p-4">
            <SponsoredSquareAd></SponsoredSquareAd>
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

            {/* SEO Information Section */}
            <div className="mt-8 bg-white/10 rounded-2xl p-5 text-white shadow-inner border border-white/10 relative overflow-hidden">
              {/* Subtle background element */}
              <div className="absolute top-[-50px] right-[-50px] w-32 h-32 rounded-full border border-white/5 pointer-events-none"></div>

              <h2 className="text-xl font-bold mb-2">Play Online Quiz Contest</h2>
              <h3 className="text-lg font-semibold mb-3">Play and Learn with Exciting Online Quizzes</h3>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Quiz is the finest platform to discover knowledge, fun and interactive learning at one place. Apart from providing quiz contests for free, we are proud to help participants challenge themselves irrespective of what age group they belong to. Our free online quizzes are meant to all – whether you a trivia fan seeking to test your knowledge or a student who aims at improving their academic skills.
              </p>

              <div className={`transition-all duration-500 overflow-hidden ${isInfoExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <h4 className="font-bold mb-2 mt-4">Explore a Wide Range of Quizzes</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Our exclusive and widest collection of quizzes based on different topics like geography, pop culture, science, history and more makes us different from others. We have something for everyone ranging from those who love playing mind-boggling riddles to the ones for whom participating in multiple-choice challenges is the best thing to do.
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Answer questions about labyrinths, codes and other ancient puzzles types in history quiz questions. Challenge your intellectuality by solving brain teasers. Do not forget to dive into our extensive variety of cricket quizzes if you are an ardent cricket fan. Soccer lovers can check out our soccer quizzes to improve their knowledge about their favorite players and teams.
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Connecting with us ensures keep you away from the unwanted boredom and have a stress-free life. The best part is that every curious mind can find something important and interesting – whether you are a lover of interactive picture quizzes, trivia challenges or enjoy playing word games.
                </p>

                <h4 className="font-bold mb-2">Interactive Learning for All</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Being a leader in this industry we understand that how important it is to consider both entertainment and education simultaneously. Staying with us helps improve your knowledge through encouraging and interactive quiz contests.
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Each quiz does not allow test your skills, but it also rewards you with some coins, which you can use further to enrol into other free quizzes. Our real-time online quizzes are designed to take your knowledge to a new level. Also get the freedom to track your progress when you move forward from one level to another.
                </p>

                <h4 className="font-bold mb-2">Why Choose Quiz?</h4>
                <ul className="text-sm text-white/80 leading-relaxed mb-4 list-disc pl-5">
                  <li className="mb-1"><span className="font-semibold text-white">Diverse Quiz Collection:</span> We are happy to offer a wide array of quizzes ranging from general knowledge to educational subjects, and they are perfect for all, including kids, students and grown-ups.</li>
                  <li className="mb-1"><span className="font-semibold text-white">User-Friendly Experience:</span> It is very easy and simple to navigate our quizzes, which make it suitable for learners of all ages.</li>
                  <li className="mb-1"><span className="font-semibold text-white">Global Competition:</span> Worldwide quiz contests are available here to challenge your skills against other players and earn recognition.</li>
                </ul>

                <h4 className="font-bold mb-2">Join the Quiz Community Today!</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Why you need to wait anymore? All you need to do is just sign up our platform for free and allow yourself to join the world's largest quiz-playing communities. We guarantee you to learn and entertainment at a single place.
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-2">
                  It will be great to discover new topics and subjects every day, compete with players worldwide and learn how much knowledge you have about a particular topic.
                </p>
              </div>

              <div className="flex justify-center mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                  className="text-white font-bold text-[15px] hover:text-white/80 transition-colors"
                >
                  {isInfoExpanded ? 'View Less' : 'View More'}
                </button>
              </div>

              <div className="flex justify-center gap-6 mt-8 mb-2">
                <Link to="/terms" className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-2">Terms & Conditions</Link>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-2">Privacy policy</a>
              </div>
            </div>
          </main>
        </div>

        {/* Floating Get Free Coins Button */}
        {showFreeCoinsBtn && (
          <button
            disabled={isAdLoading}
            onClick={() => {
              if (isAdLoading) return;
              setIsAdLoading(true);
              playRewardAd({
                adName: 'home_free_coins',
                onRewardGranted: () => {
                  setIsAdLoading(false);
                  addCoins(100);
                },
                onAdDismissed: () => {
                  setIsAdLoading(false);
                },
                onAdError: () => {
                  setIsAdLoading(false);
                }
              });
            }}
            className="fixed bottom-16 right-6 w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full shadow-2xl flex flex-col items-center justify-center border-[3px] border-[#FDE68A] hover:scale-105 active:scale-95 transition-transform z-40 animate-bounce disabled:opacity-50"
            style={{ boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.5), 0 8px 10px -6px rgba(245, 158, 11, 0.5)' }}
          >
            <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center mb-1 border border-blue-400/50 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
              </svg>
            </div>
            <span className="text-white font-black text-[9px] leading-tight text-center tracking-wider drop-shadow-md">GET FREE<br />COINS</span>
            {/* Small decorative stars */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
            <div className="absolute bottom-4 left-2 w-1 h-1 bg-white rounded-full opacity-60"></div>
          </button>
        )}
      </div>
    </>
  );
}
