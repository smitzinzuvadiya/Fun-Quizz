export function SponsoredAd() {
  return (
    <div className="w-full flex justify-center bg-transparent px-[20px] py-4 mb-4">
      {/* 
        TODO: Replace the placeholder div below with your real ad code (e.g., Google AdSense <ins> tag) 
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', minHeight: '250px' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}

      <div className="w-full h-[280px] bg-white border border-white/50 flex flex-col items-center justify-center text-slate-800 rounded-lg shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-2">Advertisement</span>
        <p className="text-xs text-center px-4 opacity-60">
          Ad placement reserved.<br />
          Insert ad code here.
        </p>
      </div>
    </div>
  );
}
