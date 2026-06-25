// Replace placeholder with real Google AdSense code once available.
// No other file needs to change — just paste the AdSense script in index.html and the <ins> tag here.

export function AdSlot() {
  return (
    <div className="w-[300px] h-[250px] mx-auto bg-surface-variant border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant rounded-lg">
      <span className="text-sm font-bold uppercase tracking-widest mb-2 opacity-50">Advertisement</span>
      <p className="text-xs text-center px-4 opacity-60">
        Google AdSense 300x250 placeholder
      </p>
      {/* TODO: Replace this div with real AdSense <ins> tag + script once ad code is available */}
      {/* Example:
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '300px', height: '250px' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  );
}
