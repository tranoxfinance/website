import Image from "next/image";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { TypewriterHeadline } from "@/components/TypewriterHeadline";
import { Flag } from "@/components/Flag";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface HeroProps {
  dict: Dictionary["hero"];
  badges: Dictionary["storeBadges"];
}

const ACTIVITY_START_MS = 900;
const ACTIVITY_STEP_MS = 550;

const ACTIVITY_LAYOUT = [
  { position: "top-[16%] -left-3 sm:-left-20 lg:-left-28", amount: "text-ink" },
  { position: "top-[40%] -right-3 sm:-right-14 lg:-right-10", amount: "text-brand" },
  { position: "top-[64%] -left-1 sm:-left-12 lg:-left-20", amount: "text-ink" },
];

function ActivityBadge({ index }: { index: number }) {
  if (index === 0) return <Flag country="NG" className="h-9 w-9" />;
  if (index === 1) return <Flag country="CI" className="h-9 w-9" />;
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
      <Lock className="h-4 w-4" strokeWidth={2} />
    </span>
  );
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
          <div className="relative w-full max-w-[19rem] animate-float-slow sm:max-w-sm">
            <Image
              src={dict.image.src}
              alt={dict.image.alt}
              width={dict.image.width}
              height={dict.image.height}
              sizes="(min-width: 640px) 384px, 304px"
              priority
              className="h-auto w-full drop-shadow-[0_40px_60px_rgba(10,22,38,0.25)] dark:hidden"
            />
            <Image
              src={dict.image.darkSrc}
              alt={dict.image.alt}
              width={dict.image.width}
              height={dict.image.height}
              sizes="(min-width: 640px) 384px, 304px"
              priority
              className="hidden h-auto w-full drop-shadow-[0_40px_60px_rgba(10,22,38,0.25)] dark:block"
            />

            <ul aria-hidden>
              {dict.activity.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "absolute flex w-72 animate-notify-in items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lift backdrop-blur-md",
                    ACTIVITY_LAYOUT[index].position,
                  )}
                  style={{
                    animationDelay: `${ACTIVITY_START_MS + index * ACTIVITY_STEP_MS}ms`,
                  }}
                >
                  <ActivityBadge index={index} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="truncate text-2xs text-muted">{item.meta}</p>
                  </div>
                  <p
                    className={cn(
                      "tabular shrink-0 text-xs font-bold",
                      ACTIVITY_LAYOUT[index].amount,
                    )}
                  >
                    {item.amount}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
