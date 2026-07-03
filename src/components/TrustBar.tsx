import { Eye, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const ICONS = [Eye, ShieldCheck, Users];

export function TrustBar({ dict }: { dict: Dictionary["trust"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {dict.tag}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {dict.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {dict.sub}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-x-12 gap-y-12 sm:grid-cols-3">
          {dict.pillars.map((pillar, index) => {
            const Icon = ICONS[index];
            return (
              <Reveal key={pillar.title} delay={index * 80}>
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
