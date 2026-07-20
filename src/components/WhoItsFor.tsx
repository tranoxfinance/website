import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function WhoItsFor({ dict }: { dict: Dictionary["whoFor"] }) {
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

        <div className="mx-auto mt-16 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((persona, index) => (
            <Reveal key={persona.title} delay={index * 80}>
              <div className="flex flex-col items-start">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={persona.image.src}
                    alt={persona.image.alt}
                    width={400}
                    height={300}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 300px, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {persona.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {persona.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
