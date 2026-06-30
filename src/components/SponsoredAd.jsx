import { useEffect } from 'react';

export function SponsoredAd() {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense initialization error", e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center bg-transparent px-[20px] py-4 mb-4">
      {/* Real Google Ad */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1553074689080777"
        data-ad-slot="9558391435"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
}
