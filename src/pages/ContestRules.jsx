import { useNavigate } from 'react-router-dom';
import { SponsoredSquareAd } from '../components/SponsoredSquareAd';
import { CoinBadge } from '../components/CoinBadge';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import quizLogo from '../assets/quiz3.png';

export function ContestRules() {
  const navigate = useNavigate();

  return (
    <div className="pt-[68px] h-full w-full bg-[#7A61FE] animate-in fade-in duration-500 overflow-y-auto no-scrollbar relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#7A61FE] flex justify-between items-center px-[20px] py-4 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-white p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="flex items-center gap-2">
            <img src={quizLogo} alt="PlayQuiz" className="h-10 object-contain rounded-xl" />
          </h1>
        </div>
        <CoinBadge />
      </header>

      {/* Scrollable Content */}
      <div className="pb-8 pt-4">
        <div className="relative z-10 flex flex-col w-full max-w-md mx-auto space-y-6 px-4">

          {/* Rules Card */}
          <div className="bg-white rounded-[32px] relative px-6 py-8 flex flex-col shadow-xl w-full">
            {/* Top Notch */}
            <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#7A61FE] rounded-full"></div>

            <h1 className="text-2xl font-extrabold text-black mb-6 tracking-tight">
              Contest Rules!
            </h1>

            <ul className="space-y-4 text-sm font-medium text-gray-700 leading-relaxed">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>The winners of each quiz will be decided as per the performances given by the users during the quiz contest.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>For each quiz, the winners will be declared at a fixed time.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>There will be only 60 seconds to answer a quiz. Try to attempt all 20 questions.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>Each quiz comes with 4 options and out of them there will be only 1 answer.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>You will get 25 points for every right answer.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>While, each wrong answer minus your 10 points.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>In case of getting stuck meanwhile, feel free to opt for the lifelines.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <p>You can employ each lifeline only once during each quiz contest. Either opt for watching an ad for a few seconds to apply the lifeline for free or use the given amount of coins from your coin bank.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                <div className="w-full">
                  <p className="mb-3">Four Lifeline are as follows:</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                      <p><strong className="font-bold">Audience Poll</strong> – The intelligence of the smart audience makes a way to find the right answer out of 4 options.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                      <p><strong className="font-bold">50:50</strong> – When opt for it, the two incorrect answers displayed on the screen will be eliminated immediately.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                      <p><strong className="font-bold">Freezer Time</strong> – This way you can place a pause on the ongoing timer for 30 seconds while allowing yourself get some extra time to answer the question.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#7A61FE] shrink-0 mt-1.5"></div>
                      <p><strong className="font-bold">Flip Question</strong> – This option will help replace the current question with a new one.</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Ad Space */}
          <div className="pt-2">
            <SponsoredSquareAd />
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 mt-4 mb-4 text-white text-sm font-semibold underline decoration-white/50 underline-offset-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors">Terms & Conditions</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors">Privacy policy</a>
          </div>

        </div>
      </div>
    </div>
  );
}
