import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const STAGGER_MS = 80;

export function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-last flex items-end justify-center overflow-hidden rounded-[2rem] bg-brand pt-8 lg:order-first">
          <Image
            src={dict.image.src}
            alt={dict.image.alt}
            width={dict.image.width}
            height={dict.image.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-[112%] max-w-none"
          />
        </Reveal>

        <div>
          <Reveal>
            <DisplayHeading tag={dict.tag} title={dict.heading} sub={dict.sub} />
          </Reveal>
          <ol className="mt-10 border-t border-ink">
            {dict.items.map((feature, index) => (
              <Reveal
                as="li"
                key={feature.title}
                delay={index * STAGGER_MS}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 border-b border-border-strong py-6 sm:grid-cols-[6rem_1fr]"
              >
                <span className="font-display text-5xl leading-none text-brand sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
