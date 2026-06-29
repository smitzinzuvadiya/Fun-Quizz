// Replace placeholder with real Google AdSense code once available.
// No other file needs to change — just paste the AdSense script in index.html and the <ins> tag here.

import { useEffect } from 'react';

export function AdSlot() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="w-full mx-auto bg-surface-variant flex flex-col items-center justify-center text-on-surface-variant rounded-lg overflow-hidden">
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', minWidth: '300px', height: '250px' }}
           data-ad-client="ca-pub-1553074689080777"
           data-ad-slot="9558391435"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
