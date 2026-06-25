import { useState, useCallback } from 'react';

// Trigger an ad every 2 questions
const AD_INTERVAL = 2;

export function useAds() {
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [questionsAnsweredInSession, setQuestionsAnsweredInSession] = useState(0);

  const registerQuestionAnswered = useCallback(() => {
    setQuestionsAnsweredInSession((prev) => {
      const newCount = prev + 1;
      if (newCount % AD_INTERVAL === 0) {
        setShouldShowAd(true);
      }
      return newCount;
    });
  }, []);

  const dismissAd = useCallback(() => {
    setShouldShowAd(false);
  }, []);

  return {
    shouldShowAd,
    registerQuestionAnswered,
    dismissAd,
  };
}
