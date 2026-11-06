import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AboutUs } from "@/components/AboutUs";
import { PageHero } from "@/components/PageHero";
import { PageCta } from "@/components/PageCta";
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
  const dict = await getDictionary(lang);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: localeAlternates(lang, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <PageHero
          tag={dict.about.tag}
          title={dict.about.heading}
          sub={dict.about.p1}
          photo={dict.about.photo}
        />
        <AboutUs dict={dict.about} />
        <PageCta lang={lang} dict={dict.pageCta} />
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
