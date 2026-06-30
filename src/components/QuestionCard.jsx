import React, { useState, useEffect } from 'react';
import { Lifeline5050Popup } from './Lifeline5050Popup';
import { LifelineAudiencePopup } from './LifelineAudiencePopup';
import { LifelineFreezeTimerPopup } from './LifelineFreezeTimerPopup';
import { LifelineFlipQuestionPopup } from './LifelineFlipQuestionPopup';

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
  isAdOpen = false,
  onUseLifeline,
  trigger5050 = 0,
  triggerAudience = 0,
  triggerFreeze = 0,
  triggerFlip = 0,
  usedLifelines = []
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showLifelines, setShowLifelines] = useState(false);
  const [is5050PopupOpen, setIs5050PopupOpen] = useState(false);
  const [isAudiencePopupOpen, setIsAudiencePopupOpen] = useState(false);
  const [isFreezePopupOpen, setIsFreezePopupOpen] = useState(false);
  const [isFlipPopupOpen, setIsFlipPopupOpen] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [lastTriggered5050, setLastTriggered5050] = useState(0);
  
  const [audiencePollData, setAudiencePollData] = useState(null);
  const [lastTriggeredAudience, setLastTriggeredAudience] = useState(0);

  const [isTimerFrozen, setIsTimerFrozen] = useState(false);
  const [lastTriggeredFreeze, setLastTriggeredFreeze] = useState(0);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswering(false);
    setHiddenOptions([]);
    setAudiencePollData(null);
    setIsTimerFrozen(false); // Unpause timer on next question
    // Timer no longer resets here so it's a global 30s for the whole quiz
  }, [question]);

  // Handle 50:50 Lifeline logic when triggered
  useEffect(() => {
    if (trigger5050 > lastTriggered5050) {
      const wrongOptions = question.options.filter(o => o !== question.correctAnswer);
      const toHide = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
      setHiddenOptions(toHide);
      setIs5050PopupOpen(false);
      setLastTriggered5050(trigger5050);
    }
  }, [trigger5050, lastTriggered5050, question]);

  // Handle Audience Poll logic
  useEffect(() => {
    if (triggerAudience > lastTriggeredAudience) {
      const availableOptions = question.options.filter(o => !hiddenOptions.includes(o));
      const newPollData = {};
      
      // Assign 60-80% to correct answer
      const correctScore = Math.floor(Math.random() * 21) + 60;
      let remainingScore = 100 - correctScore;
      
      const wrongOptions = availableOptions.filter(o => o !== question.correctAnswer);
      
      wrongOptions.forEach((opt, index) => {
        if (index === wrongOptions.length - 1) {
          newPollData[opt] = remainingScore;
        } else {
          const score = Math.floor(Math.random() * (remainingScore - wrongOptions.length + index + 1));
          newPollData[opt] = score;
          remainingScore -= score;
        }
      });
      
      newPollData[question.correctAnswer] = correctScore;
      
      // We animate the width from 0 to target, so start with 0 for all
      const initialData = {};
      availableOptions.forEach(opt => initialData[opt] = 0);
      setAudiencePollData(initialData);
      
      // Then set the actual data after a tiny delay to trigger CSS transition
      setTimeout(() => {
        setAudiencePollData(newPollData);
      }, 50);

      setIsAudiencePopupOpen(false);
      setLastTriggeredAudience(triggerAudience);
    }
  }, [triggerAudience, lastTriggeredAudience, question, hiddenOptions]);

  // Handle Freeze Timer logic
  useEffect(() => {
    if (triggerFreeze > lastTriggeredFreeze) {
      setIsTimerFrozen(true);
      setIsFreezePopupOpen(false);
      setLastTriggeredFreeze(triggerFreeze);
    }
  }, [triggerFreeze, lastTriggeredFreeze]);

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

  const isAnyPopupOpen = is5050PopupOpen || isAudiencePopupOpen || isFreezePopupOpen || isFlipPopupOpen;

  // Timer logic for showFooter mode
  useEffect(() => {
    if (!showFooter || isAdOpen || isTimerFrozen || isAnyPopupOpen) return;
    
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
  }, [showFooter, timeLeft, onTimeOut, isAnswering, isAdOpen, isTimerFrozen, isAnyPopupOpen]);

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
      <div className={`w-full max-w-md bg-white ${headerText && !showNumbers ? 'rounded-b-2xl' : 'rounded-3xl'} p-3 md:p-5 shadow-sm`}>
        
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
        <div className="bg-[#F3F4F6] rounded-[20px] p-5 md:p-6 mb-6 flex items-center justify-center min-h-[100px]">
          <h3 className="text-[17px] md:text-[19px] font-extrabold text-[#111827] text-center leading-[1.4] px-1">
            {question.question}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          {question.options.map((option, index) => {
            const isHidden = hiddenOptions.includes(option);
            const audiencePollPercentage = audiencePollData ? audiencePollData[option] : null;
            
            const isCorrect = option === question.correctAnswer;
            
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswering || isHidden}
                className={`relative overflow-hidden w-full py-[18px] px-3 rounded-[16px] text-[15px] md:text-[16px] font-bold transition-all duration-200 shadow-sm flex items-center justify-center min-h-[58px] ${getOptionClass(option)}`}
              >
                {audiencePollData && !isHidden && audiencePollPercentage !== undefined && (
                  <div 
                    className={`absolute left-0 top-0 bottom-0 z-0 transition-all duration-1000 ease-out ${isCorrect ? 'bg-[#34A853]' : 'bg-gradient-to-r from-[#a855f7] to-[#ef4444]'}`}
                    style={{ width: `${audiencePollPercentage || 0}%` }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-between w-full px-2">
                  <span className="flex-1 text-center">{isHidden ? "" : option}</span>
                  {audiencePollData && !isHidden && audiencePollPercentage !== undefined && (
                    <span className="ml-2 opacity-90">{audiencePollPercentage}%</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer for Timer & Lifeline */}
        {showFooter && (
          <div className="flex flex-col mt-4 pt-1 gap-4">
            <div className="flex justify-between items-center">
              <div className={`flex items-center gap-2 border ${isTimerFrozen ? 'border-[#38bdf8] bg-[#f0f9ff]' : 'border-gray-200 bg-white'} rounded-full px-4 py-2.5 transition-colors duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 ${isTimerFrozen ? 'text-[#0284c7]' : 'text-[#6D4AFF]'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className={`font-extrabold text-[15px] ${isTimerFrozen ? 'text-[#0369a1]' : 'text-[#0B0629]'}`}>{timeLeft} Sec</span>
                {isTimerFrozen && (
                  <span className="ml-1 text-[#0284c7] font-bold text-[12px] uppercase animate-pulse">Paused</span>
                )}
              </div>
              
              <button 
                onClick={() => setShowLifelines(!showLifelines)}
                className="border border-gray-200 rounded-full px-5 py-2.5 bg-white text-[#6D4AFF] font-bold text-[14px] tracking-wide uppercase hover:bg-gray-50 transition-colors"
              >
                {showLifelines ? "Close" : "Use Lifeline"}
              </button>
            </div>

            {/* Lifelines Panel */}
            {showLifelines && (
              <div className="grid grid-cols-4 gap-2 pt-3 pb-1 animate-in slide-in-from-top-2 fade-in duration-200">
                {/* 50:50 */}
                <button 
                  onClick={() => {
                    if (usedLifelines.includes('5050')) return;
                    setShowLifelines(false);
                    setIs5050PopupOpen(true);
                  }}
                  disabled={usedLifelines.includes('5050')}
                  className={`flex flex-col items-center gap-2 hover:opacity-80 transition-opacity ${usedLifelines.includes('5050') ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                >
                  <div className="w-[68px] h-[68px] rounded-full bg-[#6D4AFF] flex items-center justify-center shadow-md">
                    <span className="text-white font-extrabold text-[15px] tracking-widest">50:50</span>
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium">50:50</span>
                </button>

                {/* Audience Poll */}
                <button 
                  onClick={() => {
                    if (usedLifelines.includes('audience')) return;
                    setShowLifelines(false);
                    setIsAudiencePopupOpen(true);
                  }}
                  disabled={usedLifelines.includes('audience')}
                  className={`flex flex-col items-center gap-2 hover:opacity-80 transition-opacity ${usedLifelines.includes('audience') ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                >
                  <div className="w-[68px] h-[68px] rounded-full bg-[#6D4AFF] flex items-center justify-center shadow-md border-[2px] border-white/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 18V12M8 18V9M12 18V5M16 18V10M20 18V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 21H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap">Audience Poll</span>
                </button>

                {/* Freeze Timer */}
                <button 
                  onClick={() => {
                    if (usedLifelines.includes('freeze')) return;
                    setShowLifelines(false);
                    setIsFreezePopupOpen(true);
                  }}
                  disabled={usedLifelines.includes('freeze')}
                  className={`flex flex-col items-center gap-2 hover:opacity-80 transition-opacity ${usedLifelines.includes('freeze') ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                >
                  <div className="w-[68px] h-[68px] rounded-full bg-[#6D4AFF] flex items-center justify-center shadow-md">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.5 6L18 4.5M7.5 6L6 4.5M10 2L14 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 9V17M9 13H15M10 10.5L14 15.5M14 10.5L10 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap">Freeze Timer</span>
                </button>

                {/* Flip Question */}
                <button 
                  onClick={() => {
                    if (usedLifelines.includes('flip')) return;
                    setShowLifelines(false);
                    setIsFlipPopupOpen(true);
                  }}
                  disabled={usedLifelines.includes('flip')}
                  className={`flex flex-col items-center gap-2 hover:opacity-80 transition-opacity ${usedLifelines.includes('flip') ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                >
                  <div className="w-[68px] h-[68px] rounded-full bg-[#6D4AFF] flex items-center justify-center shadow-md">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap">Flip Question</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Lifeline5050Popup 
        isOpen={is5050PopupOpen} 
        onClose={() => setIs5050PopupOpen(false)} 
        onUseFree={() => {
          setIs5050PopupOpen(false);
          if (onUseLifeline) onUseLifeline('5050', 'free');
        }}
        onUseCoins={() => {
          setIs5050PopupOpen(false);
          if (onUseLifeline) onUseLifeline('5050', 'coins');
        }}
      />

      <LifelineAudiencePopup 
        isOpen={isAudiencePopupOpen} 
        onClose={() => setIsAudiencePopupOpen(false)} 
        onUseFree={() => {
          setIsAudiencePopupOpen(false);
          if (onUseLifeline) onUseLifeline('audience', 'free');
        }}
        onUseCoins={() => {
          setIsAudiencePopupOpen(false);
          if (onUseLifeline) onUseLifeline('audience', 'coins');
        }}
      />
      
      <LifelineFreezeTimerPopup 
        isOpen={isFreezePopupOpen} 
        onClose={() => setIsFreezePopupOpen(false)} 
        onUseFree={() => {
          setIsFreezePopupOpen(false);
          if (onUseLifeline) onUseLifeline('freeze', 'free');
        }}
        onUseCoins={() => {
          setIsFreezePopupOpen(false);
          if (onUseLifeline) onUseLifeline('freeze', 'coins');
        }}
      />
      
      <LifelineFlipQuestionPopup 
        isOpen={isFlipPopupOpen} 
        onClose={() => setIsFlipPopupOpen(false)} 
        onUseFree={() => {
          setIsFlipPopupOpen(false);
          if (onUseLifeline) onUseLifeline('flip', 'free');
        }}
        onUseCoins={() => {
          setIsFlipPopupOpen(false);
          if (onUseLifeline) onUseLifeline('flip', 'coins');
        }}
      />
    </div>
  );
}
