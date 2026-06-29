export const playRewardAd = ({
  adName,
  onRewardGranted,
  onAdStart,
  onAdDismissed,
  onAdError
}) => {
  const AD_TIMEOUT = 5000;
  let adStarted = false;
  let isResolved = false;

  const safeGrant = () => {
    if (isResolved) return;
    isResolved = true;
    onRewardGranted();
  };

  const safeDismiss = () => {
    if (isResolved) return;
    isResolved = true;
    if (onAdDismissed) onAdDismissed();
    else onRewardGranted();
  };

  const safeError = () => {
    if (isResolved) return;
    isResolved = true;
    if (onAdError) onAdError();
    else onRewardGranted();
  };

  const fallbackTimer = setTimeout(() => {
    if (!adStarted) {
      console.warn("Ad never started → redirecting or granting reward anyway");
      safeGrant();
    }
  }, AD_TIMEOUT);

  try {
    if (typeof window.adBreak !== 'function') {
      clearTimeout(fallbackTimer);
      safeGrant();
      return;
    }

    window.adBreak({
      type: "reward",
      name: adName,

      beforeReward: (showAdFn) => showAdFn(),

      beforeAd: () => {
        adStarted = true;
        if (onAdStart) onAdStart();
      },

      adViewed: () => {
        clearTimeout(fallbackTimer);
        safeGrant();
      },

      adDismissed: () => {
        clearTimeout(fallbackTimer);
        safeDismiss();
      },

      adBreakDone: (info) => {
        clearTimeout(fallbackTimer);
        switch (info.breakStatus) {
          case "viewed":
          case "frequencyCapped":
          case "other":
            safeGrant();
            break;
          case "dismissed":
            safeDismiss();
            break;
          case "error":
          case "timeout":
            safeError();
            break;
          default:
            safeGrant();
        }
      },
    });
  } catch (err) {
    console.error("Ad error", err);
    clearTimeout(fallbackTimer);
    safeGrant();
  }
};
