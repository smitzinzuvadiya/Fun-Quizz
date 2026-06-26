import { XMarkIcon } from '@heroicons/react/24/outline';

export function WrongAnswerPopup({ isOpen, onClose, onClaim, isCorrect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[340px] overflow-hidden bg-[#7A61FE] rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Decorative background lines/circles similar to image */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute w-[180%] h-[150%] border-[1px] border-white/40 rounded-[100%] top-[-10%] right-[-70%]"></div>
          <div className="absolute w-[120%] h-[120%] border-[1px] border-white/30 rounded-[100%] top-[10%] right-[-40%]"></div>
          <div className="absolute w-[70%] h-[70%] border-[1px] border-white/20 rounded-[100%] top-[30%] right-[0%]"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6 font-bold" />
        </button>

        <div className="relative z-10 flex flex-col items-center px-6 pb-8 pt-12 text-center">
          {/* Treasure / Icon placeholder */}
          <div className="text-[70px] leading-none mb-6 relative animate-bounce filter drop-shadow-xl flex items-center justify-center">
            🏆<span className="absolute -bottom-2 -right-4 text-4xl">🪙</span><span className="absolute -bottom-4 -left-2 text-3xl">💰</span>
          </div>

          <h2 className="text-[40px] font-black text-white tracking-tight mb-1 leading-none">
            {isCorrect ? 'Great!' : 'Oops!'}
          </h2>
          
          <h3 className={`text-[26px] font-black mb-4 ${isCorrect ? 'text-[#62FAE3]' : 'text-[#FBBF24]'}`}>
            {isCorrect ? 'Right answer' : 'Wrong answer'}
          </h3>
          
          <p className="text-white text-[16px] font-bold mb-8 leading-snug px-2">
            You're one step away from 100 coins - just watch a ad!
          </p>

          <button 
            onClick={onClaim}
            className="w-full py-[14px] px-6 bg-[#FBBF24] hover:bg-[#F59E0B] text-white font-black text-2xl rounded-full flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-[0_8px_0_0_#D97706] active:shadow-[0_0px_0_0_#D97706] active:translate-y-[8px]"
          >
            <div className="bg-[#4C1D95] rounded px-1.5 py-1 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                 <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
               </svg>
            </div>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}
