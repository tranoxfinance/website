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
    <section className="relative flex flex-1 items-center justify-center overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/70 via-background to-background" />
        <div className="absolute inset-0 grid-bg mask-fade-y opacity-50" />
      </div>

      <div className="flex flex-col items-center px-5 text-center">
        <Logo href={`/${locale}`} />
        <span className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          404
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t.heading}
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          {t.message}
        </p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-soft transition active:translate-y-px"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
