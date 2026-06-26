export function SponsoredSquareAd() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-transparent mb-6">
      <div className="w-full bg-transparent py-1 flex items-center justify-center">
        <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Sponsored</span>
      </div>

      {/* 
        TODO: Replace the placeholder div below with your real ad code (e.g., Google AdSense <ins> tag) 
        Example (Square / Rectangle Ad):
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '300px', height: '250px' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}

      <div className="w-full h-[250px] bg-white border border-white/50 flex flex-col items-center justify-center text-slate-800 shadow-sm mt-1 rounded-lg">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Advertisement</span>
      </div>
    </div>
  );
}
