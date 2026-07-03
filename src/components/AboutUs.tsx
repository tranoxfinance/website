import { Globe2, BadgeCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CorridorHub } from "@/components/CorridorHub";
import type { Dictionary } from "@/i18n/dictionaries";

const ICONS = [Globe2, BadgeCheck, HeartHandshake];

export function AboutUs({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {dict.tag}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {dict.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {dict.p1}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {dict.p2}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-blob rounded-full bg-brand/25 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {dict.corridorTag}
              </p>

              <CorridorHub labels={dict.payouts} />

              <p className="mt-7 text-xl font-bold leading-snug">
                {dict.corridorHeading}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {dict.corridorBody}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {dict.values.map((value, index) => {
            const Icon = ICONS[index];
            return (
              <Reveal
                key={value.title}
                delay={index * 90}
                className="group bg-card p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {value.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
