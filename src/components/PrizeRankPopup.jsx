import { XMarkIcon } from '@heroicons/react/24/outline';

export function PrizeRankPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  const ranks = [
    { rank: 'Rank 1', prize: 4000 },
    { rank: 'Rank 2 - 10', prize: 2000 },
    { rank: 'Rank 11 - 50', prize: 1200 },
    { rank: 'Rank 51 - 200', prize: 600 },
    { rank: 'Rank 201 - 500', prize: 300 },
    { rank: 'Rank 501 - 1000', prize: 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Clickable backdrop to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-[32px] rounded-b-none w-full max-w-md relative animate-in slide-in-from-bottom duration-300 pb-8 pt-8 px-6 max-h-[85vh] overflow-y-auto no-scrollbar shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.3)] mt-8">
        
        {/* Top Bump & Dot */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white" style={{ clipPath: 'ellipse(50% 100% at 50% 100%)' }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#7A61FE] rounded-full"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black tracking-tight">Prize Rank List</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7A61FE] hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Ranks List */}
        <div className="flex flex-col">
          {ranks.map((item, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center py-4 ${index !== ranks.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-[16px] font-semibold text-gray-800">{item.rank}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[18px] font-bold text-black">{item.prize}</span>
                <span className="text-[20px] leading-none drop-shadow-sm">🪙</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
