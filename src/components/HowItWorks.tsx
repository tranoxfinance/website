import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const STAGGER_MS = 90;

export function HowItWorks({ dict }: { dict: Dictionary["how"] }) {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <DisplayHeading tag={dict.tag} title={dict.heading} />
        </Reveal>

        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {dict.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * STAGGER_MS}
              className="flex flex-col overflow-hidden rounded-3xl bg-surface"
            >
              <div className="relative aspect-[590/493] w-full bg-brand-soft">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-contain p-6"
                />
              </div>
              <div className="flex items-start gap-5 p-7 sm:p-8">
                <span className="font-display text-7xl leading-none text-brand">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
