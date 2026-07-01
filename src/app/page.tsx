import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AppShowcase } from "@/components/AppShowcase";
import { AboutUs } from "@/components/AboutUs";
import { WhyTranox } from "@/components/WhyTranox";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustBar } from "@/components/TrustBar";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Tranox",
  description:
    "Bidirectional money transfers between Nigeria (NGN) and Ivory Coast (XOF). Fast, secure, transparent cross-border payments.",
  url: "https://tranox.com",
  areaServed: ["Nigeria", "Ivory Coast"],
  currenciesAccepted: "NGN, XOF",
  slogan: "Fast. Secure. Global.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <AboutUs />
        <AppShowcase />
        <WhyTranox />
        <HowItWorks />
        <TrustBar />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
