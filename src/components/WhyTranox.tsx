import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const STAGGER_MS = 80;

export function WhyTranox({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section className="bg-navy py-20 text-white sm:py-28">
      <Container>
        <Reveal>
          <DisplayHeading tag={dict.tag} title={dict.heading} sub={dict.sub} invert />
        </Reveal>

        <ol className="mt-14 grid border-t border-white/20 sm:grid-cols-2">
          {dict.items.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.title}
              delay={index * STAGGER_MS}
              className="border-b border-white/20 py-10 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
            >
              <span className="font-display text-7xl leading-none text-green sm:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                {benefit.title}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-white/75">{benefit.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
