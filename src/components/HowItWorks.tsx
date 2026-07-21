import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { WorldDotMap } from "@/components/WorldDotMap";
import type { Dictionary } from "@/i18n/dictionaries";

export function HowItWorks({ dict }: { dict: Dictionary["how"] }) {
  return (
    <section id="how-it-works" className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 text-white sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 overflow-hidden sm:h-96">
              <WorldDotMap className="mask-fade-x absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40" />
            </div>
            <div className="absolute -right-16 -top-16 hidden h-64 w-64 rounded-full bg-gold/25 blur-3xl sm:block" />
            <div className="absolute -bottom-20 left-10 hidden h-64 w-64 rounded-full bg-brand/20 blur-3xl sm:block" />
          </div>

          <div className="relative">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {dict.tag}
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {dict.heading}
                </h2>
              </div>
            </Reveal>

            <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-14 sm:grid-cols-3">
              {dict.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <div className="flex flex-col items-start">
                    <div className="relative aspect-[590/493] w-full">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(min-width: 640px) 300px, 80vw"
                        className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.4)]"
                      />
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
