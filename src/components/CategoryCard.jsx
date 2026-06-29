import { Link } from 'react-router-dom';
import { TrophyIcon, UserIcon, PlayIcon } from '@heroicons/react/24/solid';

export function CategoryCard({ category }) {
  // Generate stable numbers based on category name length
  const winAmount = category.name.length * 15000 + 50000;
  const usersPlaying = category.name.length * 400 + 1200;
  const entryFee = category.entryFee || (category.name.length * 5);

  return (
    <div className="bg-white rounded-[24px] p-3.5 shadow-sm border border-transparent flex gap-3.5 relative overflow-hidden">
      {/* LIVE tag */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF3B30]"></span>
        <span className="text-[11px] font-black text-[#FF3B30] tracking-wide">LIVE</span>
      </div>

      {/* Left Icon Area */}
      <div className="flex flex-col items-center mt-1 min-w-[86px] w-[86px]">
        <div className="w-[86px] h-[86px] rounded-[20px] bg-[#EDEFF6] flex items-center justify-center text-[45px] mb-2.5">
          {category.icon}
        </div>
        <span className="text-[11px] font-black text-[#5A6A85] uppercase text-center leading-[1.2] tracking-wider w-full px-1">
          {category.name}
        </span>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col pt-1 pb-1 relative">
        <h3 className="text-[16px] font-black text-black mb-2 pr-14 leading-tight flex items-center gap-1.5">
          Play and Win {winAmount} <span className="text-[#FBBF24] text-[18px]">🪙</span>
        </h3>

        <div className="text-[13.5px] text-[#718096] font-semibold space-y-[5px]">
          <div className="flex items-center gap-2">
            <TrophyIcon className="w-4 h-4 text-[#A0AEC0]" />
            <span>Contest Ends @ 6:30 pm</span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-[#A0AEC0]" />
            <span><strong className="text-black font-black">{usersPlaying}</strong> Users Playing</span>
          </div>
          <div className="flex items-center gap-2">
            <PlayIcon className="w-4 h-4 text-[#A0AEC0]" />
            <span>Entry: {entryFee}</span>
          </div>
        </div>

        {/* Play Button */}
        <div className="absolute bottom-[-8px] right-[-4px]">
          <Link
            to={`/quiz/${category.id}`}
            className="bg-[#7A61FE] text-white text-[13px] font-black px-5 py-1.5 rounded-full flex items-center gap-1 hover:bg-[#6D28D9] transition-colors shadow-md active:scale-95"
          >
            PLAY
            <PlayIcon className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
