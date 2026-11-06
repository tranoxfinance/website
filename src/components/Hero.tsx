import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Stamp } from "@/components/ui/Stamp";
import { StoreBadges } from "@/components/StoreBadges";
import { LiveRateCard } from "@/components/LiveRateCard";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroProps {
  lang: Locale;
  dict: Dictionary["hero"];
  badges: Dictionary["storeBadges"];
  rate: string | null;
  rateLabel: string;
}

export function Hero({ lang, dict, badges, rate, rateLabel }: HeroProps) {
  return (
    <section className="relative isolate -mt-16 overflow-hidden bg-navy">
      <Container className="grid items-center gap-16 pb-28 pt-32 sm:pb-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:pt-40">
        <div className="animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          <Stamp>{dict.tagline}</Stamp>
          <h1 className="mt-6 font-display text-[3.4rem] uppercase leading-[1.04] text-white sm:text-7xl lg:text-8xl">
            {dict.headlineSegments.map((segment) =>
              "style" in segment && segment.style ? (
                <span
                  key={segment.text}
                  className="inline-block -rotate-2 bg-green px-2 text-navy sm:px-3"
                >
                  {segment.text}
                </span>
              ) : (
                <span key={segment.text}>{segment.text}</span>
              ),
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {dict.subtitle}
          </p>
          <StoreBadges dict={badges} invert className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:120ms] lg:mr-0">
          <div className="animate-float-slow">
            <Image
              src={dict.image.src}
              alt={dict.image.alt}
              width={dict.image.width}
              height={dict.image.height}
              sizes="(min-width: 640px) 384px, 90vw"
              priority
              className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] dark:hidden"
            />
            <Image
              src={dict.image.darkSrc}
              alt={dict.image.alt}
              width={dict.image.width}
              height={dict.image.height}
              sizes="(min-width: 640px) 384px, 90vw"
              priority
              className="hidden h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] dark:block"
            />
          </div>
          {rate ? (
            <LiveRateCard
              label={rateLabel}
              rate={rate}
              locale={lang}
              size="md"
              className="absolute -bottom-14 -left-2 sm:-left-28"
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
