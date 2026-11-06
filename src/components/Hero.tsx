import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { AmbientVideo } from "@/components/AmbientVideo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { RateHistory } from "@/lib/fx-rates";

const RATE_DECIMALS = 4;

interface HeroProps {
  lang: Locale;
  dict: Dictionary["hero"];
  badges: Dictionary["storeBadges"];
  rate: RateHistory | null;
}

export function Hero({ lang, dict, badges, rate }: HeroProps) {
  const headline = dict.headlineSegments.map((segment) => segment.text).join("");
  const rateValue = rate
    ? new Intl.NumberFormat(lang, {
        minimumFractionDigits: RATE_DECIMALS,
        maximumFractionDigits: RATE_DECIMALS,
      }).format(Number(rate.current))
    : null;

  return (
    <section className="relative pb-16 pt-28 sm:pb-20 lg:pt-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <h1 className="animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both] text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {headline}
          </h1>

          <div className="animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:120ms]">
            <p className="text-lg leading-relaxed text-ink-soft">{dict.subtitle}</p>
            <div className="mt-7">
              <StoreBadges dict={badges} />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2">
          {dict.cities.map((city, index) => (
            <figure
              key={city.city}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-strong lg:aspect-[16/11]"
            >
              <Image
                src={city.src}
                alt={city.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              {"video" in city && city.video && (
                <AmbientVideo
                  src={city.video}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-16 text-white sm:p-6 sm:pt-20">
                <span className="block text-2xl font-bold tracking-tight sm:text-3xl">
                  {city.city}
                </span>
                <span className="mt-1 block text-sm font-medium text-white/80">
                  {city.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-5">
          {rateValue ? (
            <p className="tabular text-ink">
              <span className="text-sm font-medium text-muted">{dict.rateLabel}</span>
              <span className="ml-3 text-xl font-semibold sm:text-2xl">
                1 NGN = {rateValue} XOF
              </span>
            </p>
          ) : (
            <p className="text-sm font-medium text-ink-soft">{dict.tagline}</p>
          )}
          <Link
            href={`/${lang}/rates`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
          >
            {dict.rateCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
