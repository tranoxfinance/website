import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { TypewriterHeadline } from "@/components/TypewriterHeadline";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroProps {
  dict: Dictionary["hero"];
  badges: Dictionary["storeBadges"];
}

export function Hero({ dict, badges }: HeroProps) {
  return (
    <section className="relative -mt-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/70 via-background to-background" />
        <div className="absolute inset-0 grid-bg mask-fade-y opacity-50" />
        <div className="absolute -right-20 top-0 hidden h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-brand)_0%,transparent_60%)] opacity-[0.12] blur-2xl sm:block" />
        <div className="absolute -left-32 top-40 hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--color-gold)_0%,transparent_60%)] opacity-[0.10] blur-2xl sm:block" />
      </div>

      <Container className="grid items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-36">
        <div className="animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both] max-lg:text-center">
          <TypewriterHeadline
            segments={dict.headlineSegments}
            className="text-[2.7rem] font-bold leading-[1.03] tracking-tight text-ink sm:text-[3.4rem]"
          />

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft max-lg:mx-auto">
            {dict.subtitle}
          </p>

          <div className="mt-8">
            <StoreBadges dict={badges} className="max-lg:justify-center" />
          </div>

          <p className="mt-6 text-sm font-medium text-ink-soft max-lg:text-center">
            {dict.tagline}
          </p>
        </div>

        <div className="animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both] -mt-6 flex justify-center [animation-delay:120ms] sm:-mt-10 lg:justify-end">
          <Image
            src={dict.image.src}
            alt={dict.image.alt}
            width={dict.image.width}
            height={dict.image.height}
            sizes="(min-width: 640px) 384px, 304px"
            priority
            className="h-auto w-full max-w-[19rem] animate-float-slow drop-shadow-[0_40px_60px_rgba(10,22,38,0.25)] sm:max-w-sm dark:hidden"
          />
          <Image
            src={dict.image.darkSrc}
            alt={dict.image.alt}
            width={dict.image.width}
            height={dict.image.height}
            sizes="(min-width: 640px) 384px, 304px"
            priority
            className="hidden h-auto w-full max-w-[19rem] animate-float-slow drop-shadow-[0_40px_60px_rgba(10,22,38,0.25)] sm:max-w-sm dark:block"
          />
        </div>
      </Container>
    </section>
  );
}
