import Script from 'next/script'

const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SV ?? '6'

/**
 * Hotjar — heatmap & oturum kaydı (ziyaretçilerin sayfada nerelere odaklandığını izleme).
 *
 * Yalnızca NEXT_PUBLIC_HOTJAR_ID set edilmişse yüklenir; aksi halde hiçbir şey render etmez.
 * Script `afterInteractive` ile yüklenir → ilk boyamayı (LCP) bloklamaz.
 */
export function HotjarAnalytics() {
  if (!HOTJAR_ID) return null

  return (
    <Script id="hotjar-init" strategy="afterInteractive">
      {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
    </Script>
  )
}
