import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const ITEM_STAGGER_MS = 60;

export function Trust({ dict }: { dict: Dictionary["trust"] }) {
  return (
    <section id="trust" className="bg-navy py-16 text-white sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            {dict.tag}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {dict.heading}
          </h2>
        </Reveal>

        <dl className="mt-12 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * ITEM_STAGGER_MS}
              className="border-b border-white/15 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                {item.label}
              </dt>
              <dd className="mt-3 text-lg font-semibold leading-snug">{item.value}</dd>
              <dd className="mt-2 text-sm leading-relaxed text-white/70">{item.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
