import { useEffect } from 'react';

export function SponsoredSquareAd() {
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
    <div className="w-full flex flex-col items-center justify-center bg-transparent mb-6">
      <div className="w-full bg-transparent py-1 flex items-center justify-center">
        <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Sponsored</span>
      </div>

      <div className="w-full mt-1 min-h-[250px] overflow-hidden flex justify-center">
        {/* Quiz_NAT */}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-1553074689080777"
             data-ad-slot="9558391435"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
}
