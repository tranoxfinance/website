import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

const ITEM_STAGGER_MS = 60;

export function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="features" className="relative py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow={dict.tag}
              title={dict.heading}
              description={dict.sub}
            />
          </Reveal>

          <ol className="border-b border-border">
            {dict.items.map((feature, index) => (
              <Reveal
                as="li"
                key={feature.title}
                delay={index * ITEM_STAGGER_MS}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-border py-7 sm:grid-cols-[4rem_1fr]"
              >
                <span className="tabular pt-1 text-sm font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-ink-soft">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
