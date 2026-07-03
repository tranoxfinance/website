import { Wallet, Layers, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const ICONS = [Wallet, Layers, ShieldCheck];

export function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="features" className="relative pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {dict.tag}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {dict.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {dict.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {dict.items.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <Reveal key={feature.title} delay={index * 90}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {feature.body}
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
