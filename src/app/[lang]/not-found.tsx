"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";

const copy: Record<Locale, { heading: string; message: string; cta: string }> = {
  "en-NG": {
    heading: "Page not found",
    message: "The page you're looking for doesn't exist or may have moved.",
    cta: "Back to home",
  },
  "fr-CI": {
    heading: "Page introuvable",
    message: "La page que vous recherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = hasLocale(segment) ? segment : defaultLocale;
  const t = copy[locale];

  return (
    <section className="flex flex-1 items-center justify-center py-24">

      <div className="flex flex-col items-center px-5 text-center">
        <Logo href={`/${locale}`} />
        <p className="mt-10 font-display text-6xl leading-none text-brand">404</p>
        <h1 className="mt-6 text-4xl font-bold text-ink sm:text-6xl">
          {t.heading}
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          {t.message}
        </p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-md font-semibold text-white transition hover:brightness-125"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
