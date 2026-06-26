import React, { useState, useEffect } from 'react';

export function QuestionCard({ 
  question, 
  onAnswer, 
  headerText,
  showNumbers = false,
  currentIndex = 0,
  totalQuestions = 0,
  showFooter = false,
  answerHistory = [],
  onTimeOut,
  extraTimeCounter = 0,
  isAdOpen = false
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswering(false);
    // Timer no longer resets here so it's a global 30s for the whole quiz
  }, [question]);

  const hasTimedOutRef = React.useRef(false);

  useEffect(() => {
    if (timeLeft > 0) {
      hasTimedOutRef.current = false;
    }
  }, [timeLeft]);

  // Listen for extra time triggers
  useEffect(() => {
    if (extraTimeCounter > 0) {
      setTimeLeft(prev => prev + 15);
    }
  }, [extraTimeCounter]);

  // Timer logic for showFooter mode
  useEffect(() => {
    if (!showFooter || isAdOpen) return;
    
    if (timeLeft === 0) {
      if (onTimeOut && !isAnswering && !hasTimedOutRef.current) {
        hasTimedOutRef.current = true;
        onTimeOut();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showFooter, timeLeft, onTimeOut, isAnswering, isAdOpen]);

  const handleOptionClick = (option) => {
    if (isAnswering) return;

    setSelectedOption(option);
    setIsAnswering(true);

    const isCorrect = option === question.correctAnswer;

    // Auto-advance after delay
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  const getOptionClass = (option) => {
    if (!isAnswering) {
      return "bg-[#6D4AFF] hover:bg-[#5b21b6] text-white";
    }

    if (option === question.correctAnswer) {
      return "bg-[#34A853] text-white font-bold shadow-md";
    }

    if (option === selectedOption && option !== question.correctAnswer) {
      return "bg-[#EA4335] text-white shadow-md animate-[shake_0.4s_ease-in-out]";
    }

    return "bg-[#6D4AFF] text-white opacity-40";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Outer Card with Header (Optional) */}
      {headerText && !showNumbers && (
        <div className="w-full max-w-md bg-[#7A61FE] rounded-t-2xl pt-6 px-4 pb-2 text-center text-white relative overflow-hidden">
          {/* Subtle decorative curves in header */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
          <h2 className="text-xl font-bold px-4 leading-tight mb-4 z-10 relative">
            {headerText}
          </h2>
        </div>
      )}

      {/* Inner White Card for Question & Options */}
      <div className={`w-full max-w-md bg-white ${headerText && !showNumbers ? 'rounded-b-2xl' : 'rounded-3xl'} p-4 md:p-6 shadow-sm`}>
        
        {/* Question Numbers Header */}
        {showNumbers && totalQuestions > 0 && (
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-6 pb-2">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              let circleClass = "bg-[#f8fafc] text-[#94a3b8]"; // Unanswered
              if (idx < answerHistory.length) {
                circleClass = answerHistory[idx] ? "bg-[#7ede84] text-white" : "bg-[#ff94a5] text-white";
              } else if (idx === currentIndex) {
                circleClass = "bg-[#0B0629] text-white shadow-md";
              }
              return (
                <div 
                  key={idx}
                  className={`w-[38px] h-[38px] shrink-0 flex items-center justify-center rounded-full text-[16px] font-black ${circleClass}`}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>
        )}

        {/* Question Bubble */}
        <div className="bg-[#F3F4F6] rounded-2xl p-5 md:p-6 mb-6 flex items-center justify-center">
          <h3 className="text-lg md:text-xl font-black text-[#0B0629] text-center leading-snug">
            {question.question}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswering}
              className={`w-full py-4 px-3 rounded-2xl text-center text-sm md:text-base font-bold transition-all duration-200 shadow-sm flex items-center justify-center min-h-[60px] ${getOptionClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Footer for Timer & Lifeline */}
        {showFooter && (
          <div className="flex justify-between items-center mt-6 pt-2">
            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#6D4AFF]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="text-[#0B0629] font-black text-[15px]">{timeLeft} Sec</span>
            </div>
            
            <button className="border border-gray-200 rounded-full px-4 py-2 bg-white text-[#6D4AFF] font-bold text-[13px] tracking-wide uppercase hover:bg-gray-50 transition-colors">
              Use Lifeline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
