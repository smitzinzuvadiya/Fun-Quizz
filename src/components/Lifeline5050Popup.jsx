import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function Lifeline5050Popup({ isOpen, onClose, onUseFree, onUseCoins }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full rounded-t-[32px] pt-8 pb-10 px-6 relative flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Notch container to blend with top */}
        <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#6D4AFF] rounded-full"></div>

        {/* Floating 50:50 Circle */}
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-[#4a3f91] flex items-center justify-center shadow-lg border-[3px] border-[#7A61FE]">
          <span className="text-white font-black text-[15px] tracking-widest">50:50</span>
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6D4AFF] hover:bg-gray-100 p-1 rounded-full transition-colors z-10"
        >
          <XMarkIcon className="w-6 h-6 stroke-[3]" />
        </button>

        <h2 className="text-2xl font-black text-black text-center mt-10 mb-3 tracking-tight">Use 50:50 Lifeline</h2>
        
        <p className="text-center text-[#4B5563] font-medium text-[16px] leading-relaxed mb-8 px-4">
          The 50-50 will be paused for 30 seconds to allow more time to answer the question.
        </p>

        <div className="flex gap-4">
          <button 
            onClick={onUseFree}
            className="flex-1 bg-[#6D4AFF] hover:bg-[#5b21b6] text-white font-bold py-[18px] text-[16px] rounded-[24px] shadow-sm transition-colors active:scale-95"
          >
            Use for Free
          </button>
          <button 
            onClick={onUseCoins}
            className="flex-1 bg-[#6D4AFF] hover:bg-[#5b21b6] text-white font-bold py-[18px] text-[16px] rounded-[24px] shadow-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
          >
            Use For 20 <span className="text-[18px] leading-none">🪙</span>
          </button>
        </div>

      </div>
    </div>
  );
}
