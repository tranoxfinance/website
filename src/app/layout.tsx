import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileActionBar } from "@/components/MobileActionBar";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://tranox.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tranox — Instant money transfers between Nigeria and Ivory Coast",
    template: "%s · Tranox",
  },
  description:
    "Send money both ways between Nigeria (NGN) and Ivory Coast (XOF) in minutes. Transparent rates, low fees, bank-grade security. Fast. Secure. Global.",
  keywords: [
    "Nigeria to Ivory Coast transfer",
    "NGN to XOF",
    "XOF to NGN",
    "send money to Ivory Coast",
    "cross-border payments Africa",
    "Tranox",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Tranox — Cross-border transfers between Nigeria and Ivory Coast",
    description:
      "Bidirectional NGN ↔ XOF transfers in minutes. Transparent rates, low fees, bank-grade security.",
    siteName: "Tranox",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tranox — NGN ↔ XOF cross-border transfers",
    description:
      "Send money both ways between Nigeria and Ivory Coast in minutes. Fast. Secure. Global.",
  },
};

const themeScript = `(function(){try{var e=document.documentElement;e.classList.add('js');var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':m;if(d)e.classList.add('dark');e.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink pb-[4.75rem] lg:pb-0">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ScrollToTop />
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
