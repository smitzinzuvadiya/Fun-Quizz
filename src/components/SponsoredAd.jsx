export function SponsoredAd() {
  return (
    <div className="w-full flex justify-center bg-gray-50 py-4 mb-4 border-b border-gray-200">
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

      <div className="w-full max-w-[336px] h-[280px] bg-surface-variant border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant rounded-lg">
        <span className="text-sm font-bold uppercase tracking-widest mb-2 opacity-50">Advertisement</span>
        <p className="text-xs text-center px-4 opacity-60">
          Ad placement reserved.<br />
          Insert ad code here.
        </p>
      </div>
    </div>
  );
}
