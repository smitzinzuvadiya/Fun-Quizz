export function SponsoredSquareAd() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white mb-6">
      <div className="w-full bg-[#7A61FE] py-1 flex items-center justify-center">
        <span className="text-white text-[10px] font-bold tracking-widest uppercase">Sponsored</span>
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
      
      <div className="w-full max-w-[300px] h-[250px] bg-surface-variant border border-outline-variant/30 flex flex-col items-center justify-center text-on-surface-variant shadow-sm mt-1">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Advertisement</span>
      </div>
      

    </div>
  );
}
