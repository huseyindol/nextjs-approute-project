import { Head, Html, Main, NextScript } from 'next/document'

/**
 * App Router'daki root `layout.tsx`'in `<html>/<head>/<body>` iskeleti.
 *
 * NOT: Sayfaya özel meta/title `next/head` (Seo bileşeni) ile verilir — buradaki
 * `<Head>` yalnız her sayfada DEĞİŞMEYEN etiketler içindir (preconnect, favicon).
 */
export default function Document() {
  return (
    <Html lang="tr" suppressHydrationWarning>
      <Head>
        {/* DNS/TLS handshake'i kritik 3rd party kaynaklar için önceden yap */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.huseyindol.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Metadata API'deki icons karşılığı */}
        <link rel="icon" href="/assets/img/favicon.ico" />
        <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/img/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
