import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#080808]">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
