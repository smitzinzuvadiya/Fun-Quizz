import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function LifelineAudiencePopup({ isOpen, onClose, onUseFree, onUseCoins }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full rounded-t-[32px] pt-8 pb-10 px-6 relative flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Notch container to blend with top */}
        <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#6D4AFF] rounded-full"></div>

        {/* Floating Audience Circle */}
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-[#4a3f91] flex items-center justify-center shadow-lg border-[3px] border-[#7A61FE]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="3" height="5" stroke="white" strokeWidth="1.5" />
            <rect x="10.5" y="6" width="3" height="10" stroke="white" strokeWidth="1.5" />
            <rect x="16" y="13" width="3" height="3" stroke="white" strokeWidth="1.5" />
            <path d="M5 21C5 19.8954 5.89543 19 7 19C8.10457 19 9 19.8954 9 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7" cy="18" r="1" fill="white" />
            <path d="M10 21C10 19.8954 10.8954 19 12 19C13.1046 19 14 19.8954 14 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="18" r="1" fill="white" />
            <path d="M15 21C15 19.8954 15.8954 19 17 19C18.1046 19 19 19.8954 19 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="17" cy="18" r="1" fill="white" />
          </svg>
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6D4AFF] hover:bg-gray-100 p-1 rounded-full transition-colors z-10"
        >
          <XMarkIcon className="w-6 h-6 stroke-[3]" />
        </button>

        <h2 className="text-2xl font-black text-black text-center mt-10 mb-3 tracking-tight">Use Audience Poll Lifeline</h2>
        
        <p className="text-center text-[#4B5563] font-medium text-[16px] leading-relaxed mb-8 px-4">
          The audience poll be paused for 30 seconds to allow more time to answer the question.
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
