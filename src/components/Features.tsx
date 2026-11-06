import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const STAGGER_MS = 80;

export function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <DisplayHeading tag={dict.tag} title={dict.heading} sub={dict.sub} align="center" />
        </Reveal>

        <Reveal
          delay={STAGGER_MS}
          className="mx-auto mt-12 flex max-w-2xl items-end justify-center overflow-hidden rounded-[2rem] bg-brand pt-8 sm:mt-14"
        >
          <Image
            src={dict.image.src}
            alt={dict.image.alt}
            width={dict.image.width}
            height={dict.image.height}
            sizes="(min-width: 768px) 672px, 100vw"
            className="h-auto w-full"
          />
        </Reveal>

        <ol className="mt-12 grid border-t border-ink sm:mt-16 lg:grid-cols-3">
          {dict.items.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={index * STAGGER_MS}
              className="border-b border-border-strong py-8 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="font-display text-6xl leading-none text-brand sm:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">{feature.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-ink-soft">{feature.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
