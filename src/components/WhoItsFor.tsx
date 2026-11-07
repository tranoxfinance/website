import Image from "next/image";
import { blurProps } from "@/lib/blurData";
import { STAGGER_MS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function WhoItsFor({ dict }: { dict: Dictionary["whoFor"] }) {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <DisplayHeading title={dict.heading} sub={dict.sub} />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((persona, index) => (
            <Reveal
              key={persona.title}
              delay={index * STAGGER_MS}
              className="group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-panel bg-navy p-6"
            >
              <Image
                src={persona.image.src}
                {...blurProps(persona.image.src)}
                alt={persona.image.alt}
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 from-15% via-navy/40 via-40% to-transparent"
              />
              <DisplayHeading as="h3" title={persona.title} size="sm" invert />
              <p className="mt-3 text-sm leading-relaxed text-on-dark">{persona.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
