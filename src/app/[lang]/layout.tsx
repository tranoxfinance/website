import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SplashScreen } from "@/components/SplashScreen";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

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

const siteUrl = "https://tranoxfinance.com";

const ogLocales = { "en-NG": "en_NG", "fr-CI": "fr_CI" } as const;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const meta = dict.metadata;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.titleDefault,
      template: meta.titleTemplate,
    },
    description: meta.description,
    keywords: [...meta.keywords],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${locale}`,
      title: meta.ogTitle,
      description: meta.ogDescription,
      siteName: "Tranox",
      locale: ogLocales[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle,
      description: meta.twitterDescription,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} dark h-full`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-ink pb-[4.75rem] lg:pb-0"
      >
        <script src="/theme-init.js" async />
        <SplashScreen />
        <ScrollToTop />
        {children}
        <MobileActionBar lang={locale} dict={dict.mobileBar} />
        <CookieConsent lang={locale} dict={dict.cookieConsent} />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
