import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/providers/Providers";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hüseyin DOL | Portfolio",
  description: "Hüseyin DOL'un kişisel portfolio sitesi",
  keywords: [
    "Hüseyin DOL",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, MySQL, PostgreSQL, Docker, Kubernetes",
  ],
  authors: [{ name: "Hüseyin DOL" }],
  creator: "Hüseyin DOL",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://next.huseyindol.site",
    title: "Hüseyin DOL | Portfolio",
    description: "Hüseyin DOL'un kişisel portfolio sitesi",
    siteName: "Hüseyin DOL Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Hüseyin DOL | Portfolio",
    description: "Hüseyin DOL'un kişisel portfolio sitesi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
