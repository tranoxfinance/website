import Image from "next/image";
import { STAGGER_MS } from "@/lib/motion";
import { BigNumber } from "@/components/ui/BigNumber";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BadgeCheck, Check } from "lucide-react";
import { Flag } from "@/components/Flag";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { TranoxMark } from "@/components/TranoxMark";
import type { Dictionary } from "@/i18n/dictionaries";

export function AboutUs({ dict }: { dict: Dictionary["about"] }) {
  const { registry } = dict;
  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <dl className="grid grid-cols-2 gap-y-10 py-10 lg:grid-cols-4 lg:py-14">
            {dict.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * STAGGER_MS} className="pr-6">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <BigNumber size="xl">{fact.value}</BigNumber>
                </dd>
                <dd className="mt-4 max-w-[13rem] text-md leading-snug text-ink-soft">
                  {fact.label}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="max-w-5xl text-3xl font-semibold leading-boxed text-ink sm:text-5xl lg:text-6xl">
              {dict.p2}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <ul className="grid gap-4 lg:grid-cols-3">
            {dict.values.map((value, index) => (
              <Reveal
                as="li"
                key={value.title}
                delay={index * STAGGER_MS}
                className="rounded-panel bg-surface p-8 sm:p-10"
              >
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">{value.title}</h2>
                <p className="mt-3 text-md leading-relaxed text-ink-soft">{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="overflow-hidden bg-navy py-20 text-white sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="min-w-0">
            <DisplayHeading title={registry.heading} size="xl" invert />
            <ul className="mt-10 space-y-5">
              {registry.points.map((point) => (
                <li key={point} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green text-navy">
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </span>
                  <span className="text-lg font-semibold leading-snug sm:text-xl">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={STAGGER_MS * 2} className="min-w-0">
            <figure className="relative isolate mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-panel lg:mr-0">
              <Image
                src={registry.photo.src}
                alt={registry.photo.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="-z-20 object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy from-30% via-navy/65 via-55% to-transparent to-80%"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-3 text-xs font-bold text-on-dark">
                    <TranoxMark className="h-9 w-9" />
                    {registry.cardTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green">
                    <BadgeCheck className="h-4 w-4" strokeWidth={2.25} />
                    {registry.status}
                  </span>
                </div>
                <dl className="mt-6 space-y-4">
                  {registry.rows.map((row) => (
                    <div key={row.label}>
                      <dt className="text-xs font-semibold text-on-dark-muted">
                        {row.label}
                      </dt>
                      <dd className="mt-1 flex items-center gap-2 break-all font-display text-2xl leading-tight text-white sm:text-3xl">
                        {row.flag ? <Flag country="CI" className="h-6 w-6 shrink-0" /> : null}
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
