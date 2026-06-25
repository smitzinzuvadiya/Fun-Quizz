import { useState, useEffect } from 'react';

export function QuestionCard({ question, onAnswer, headerText }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswering(false);
  }, [question]);

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
      return "bg-[#62FAE3] hover:bg-[#40D4C0] text-slate-900";
    }

    if (option === question.correctAnswer) {
      return "bg-[#34A853] text-white font-bold shadow-md";
    }

    if (option === selectedOption && option !== question.correctAnswer) {
      return "bg-[#EA4335] text-white shadow-md animate-[shake_0.4s_ease-in-out]";
    }

    return "bg-[#62FAE3] text-slate-900 opacity-40";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Outer Card with Header (Optional) */}
      {headerText && (
        <div className="w-full max-w-md bg-[#62FAE3] rounded-t-2xl pt-6 px-4 pb-2 text-center text-slate-900 relative overflow-hidden">
          {/* Subtle decorative curves in header */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
          <h2 className="text-xl font-bold px-4 leading-tight mb-4 z-10 relative">
            {headerText}
          </h2>
        </div>
      )}

      {/* Inner White Card for Question & Options */}
      <div className={`w-full max-w-md bg-white ${headerText ? 'rounded-b-2xl' : 'rounded-2xl'} p-5 shadow-sm`}>
        {/* Question Bubble */}
        <div className="bg-[#F3F4F6] rounded-xl p-5 mb-6 flex items-center justify-center border border-gray-100">
          <h3 className="text-base md:text-lg font-extrabold text-slate-800 text-center leading-relaxed tracking-wide">
            {question.question}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswering}
              className={`w-full py-3 px-2 rounded-xl text-center text-sm font-bold transition-all duration-200 shadow-sm flex items-center justify-center min-h-[50px] ${getOptionClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
