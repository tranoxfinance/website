import { Container } from "@/components/ui/Container";
import { STAGGER_MS } from "@/lib/motion";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function WhyTranox({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section className="bg-navy py-20 text-white sm:py-28">
      <Container>
        <Reveal>
          <DisplayHeading title={dict.heading} invert />
        </Reveal>

        <ul className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {dict.items.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.title}
              delay={index * STAGGER_MS}
            >
              <h3 className=" text-2xl font-bold sm:text-3xl">
                {benefit.title}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-on-dark-muted">{benefit.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
