import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AppShowcase } from "@/components/AppShowcase";
import { AboutUs } from "@/components/AboutUs";
import { LiveRates } from "@/components/LiveRates";
import { WhoItsFor } from "@/components/WhoItsFor";
import { WhyTranox } from "@/components/WhyTranox";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustBar } from "@/components/TrustBar";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    alternates: localeAlternates(lang, "/"),
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Tranox",
    description: dict.jsonLd.description,
    url: `https://tranoxfinance.com/${lang}`,
    inLanguage: lang,
    areaServed: [...dict.jsonLd.areaServed],
    currenciesAccepted: "NGN, XOF",
    slogan: dict.jsonLd.slogan,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <Hero dict={dict.hero} badges={dict.storeBadges} />
        <Features dict={dict.features} />
        <AboutUs dict={dict.about} />
        <LiveRates lang={lang} dict={dict.liveRates} />
        <WhoItsFor dict={dict.whoFor} />
        <AppShowcase dict={dict.showcase} />
        <WhyTranox dict={dict.why} />
        <HowItWorks dict={dict.how} />
        <TrustBar dict={dict.trust} />
        <Faq dict={dict.faq} />
        <CtaBanner dict={dict.cta} badges={dict.storeBadges} />
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
