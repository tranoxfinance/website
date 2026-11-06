import { BadgeCheck } from "lucide-react";
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
                <dd className="tabular text-6xl font-bold leading-none tracking-[-0.04em] text-brand sm:text-7xl lg:text-8xl">
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
            <p className="max-w-5xl text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">
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
                <span className="tabular text-7xl font-bold leading-none tracking-[-0.04em] text-brand sm:text-8xl">
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

      <section className="bg-surface py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Pill>{registry.tag}</Pill>
            <h2 className="mt-6 text-5xl font-bold leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl">
              {registry.heading}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{registry.sub}</p>
          </Reveal>

          <Reveal delay={STAGGER_MS * 2} className="min-w-0">
            <figure className="mx-auto max-w-md -rotate-2 rounded-3xl border border-border-strong bg-card p-7 shadow-lift transition-transform duration-500 hover:rotate-0 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <TranoxMark className="h-11 w-11" />
                  <figcaption className="text-sm font-semibold uppercase tracking-[0.08em] text-ink-soft">
                    {registry.cardTitle}
                  </figcaption>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-soft px-3 py-1.5 text-xs font-bold text-ink">
                  <BadgeCheck className="h-4 w-4 text-success" strokeWidth={2.25} />
                  {registry.status}
                </span>
              </div>
              <dl className="mt-8 divide-y divide-dashed divide-border-strong">
                {registry.rows.map((row) => (
                  <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                    <dt className="text-sm text-muted">{row.label}</dt>
                    <dd className="break-all font-mono text-lg font-semibold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
