import Image from "next/image";
import { Stamp } from "@/components/ui/Stamp";
import { BadgeCheck, Check } from "lucide-react";
import { Flag } from "@/components/Flag";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/Reveal";
import { TranoxMark } from "@/components/TranoxMark";
import type { Dictionary } from "@/i18n/dictionaries";

const STAGGER_MS = 80;

export function AboutUs({ dict }: { dict: Dictionary["about"] }) {
  const { registry } = dict;
  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <dl className="grid grid-cols-2 gap-y-10 border-y border-border py-10 lg:grid-cols-4 lg:py-14">
            {dict.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * STAGGER_MS} className="pr-6">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-7xl leading-none text-brand sm:text-8xl lg:text-9xl">
                  {fact.value}
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
          <Reveal className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
            <div>
              <Pill>{dict.storyTag}</Pill>
            </div>
            <p className="max-w-5xl text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {dict.p2}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal>
            <Pill>{dict.valuesTag}</Pill>
          </Reveal>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {dict.values.map((value, index) => (
              <Reveal
                as="li"
                key={value.title}
                delay={index * STAGGER_MS}
                className="flex flex-col gap-16 rounded-3xl bg-surface p-8 sm:gap-24 sm:p-10"
              >
                <span className="font-display text-8xl leading-none text-brand sm:text-9xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {value.title}
                  </h2>
                  <p className="mt-3 text-md leading-relaxed text-ink-soft">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="overflow-hidden bg-navy py-20 text-white sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="min-w-0">
            <Stamp>{registry.tag}</Stamp>
            <h2 className="mt-6 font-display text-6xl uppercase leading-[0.95] sm:text-7xl lg:text-8xl">
              {registry.heading}
            </h2>
            <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {registry.points.map((point) => (
                <li key={point} className="flex items-center gap-4 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green text-navy">
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </span>
                  <span className="text-lg font-semibold leading-snug sm:text-xl">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={STAGGER_MS * 2} className="min-w-0">
            <figure className="relative isolate mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl lg:mr-0">
              <Image
                src={registry.photo.src}
                alt={registry.photo.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="-z-20 object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy from-30% via-navy/70 via-55% to-transparent to-80%"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                    <TranoxMark className="h-9 w-9" />
                    {registry.cardTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1.5 text-xs font-bold text-navy">
                    <BadgeCheck className="h-4 w-4" strokeWidth={2.25} />
                    {registry.status}
                  </span>
                </div>
                <dl className="mt-6 space-y-4">
                  {registry.rows.map((row) => (
                    <div key={row.label}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
                        {row.label}
                      </dt>
                      <dd className="mt-1 flex items-center gap-2 break-all font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
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
