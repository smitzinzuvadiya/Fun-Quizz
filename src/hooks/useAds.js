import { useState, useCallback } from 'react';

// Trigger an ad every 2 questions
const AD_INTERVAL = 2;

export function useAds() {
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [questionsAnsweredInSession, setQuestionsAnsweredInSession] = useState(0);

  const registerQuestionAnswered = useCallback(() => {
    setQuestionsAnsweredInSession((prev) => prev + 1);
  }, []);

  const dismissAd = useCallback(() => {
    setShouldShowAd(false);
  }, []);

  const showAd = useCallback(() => {
    setShouldShowAd(true);
  }, []);

  return {
    shouldShowAd,
    registerQuestionAnswered,
    dismissAd,
    showAd
  };
}
