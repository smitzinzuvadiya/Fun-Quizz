import { useState, useEffect } from 'react';

export function QuestionCard({ question, onAnswer }) {
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
      return "bg-surface border-2 border-surface-variant hover:border-primary/50 text-on-surface";
    }

    if (option === question.correctAnswer) {
      return "bg-[#E6F4EA] border-2 border-[#34A853] text-[#137333] font-bold";
    }

    if (option === selectedOption && option !== question.correctAnswer) {
      return "bg-[#FCE8E6] border-2 border-[#EA4335] text-[#A50E0E] animate-[shake_0.4s_ease-in-out]";
    }

    return "bg-surface border-2 border-surface-variant opacity-50";
  };

  return (
    <div className="w-full">
      <div className="bg-surface rounded-2xl p-4 shadow-sm mb-4 min-h-[100px] flex items-center justify-center">
        <h2 className="text-lg font-bold text-center leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswering}
            className={`w-full py-3 px-4 rounded-xl text-left transition-all duration-200 ${getOptionClass(option)}`}
          >
            <span className="font-semibold mr-3 opacity-50">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
