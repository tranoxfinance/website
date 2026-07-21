import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { StoreBadges } from "@/components/StoreBadges";
import { WorldDotMap } from "@/components/WorldDotMap";
import type { Dictionary } from "@/i18n/dictionaries";

interface CtaBannerProps {
  dict: Dictionary["cta"];
  badges: Dictionary["storeBadges"];
}

export function CtaBanner({ dict, badges }: CtaBannerProps) {
  return (
    <section id="get-started" className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-7 py-12 sm:px-12 sm:py-14">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 overflow-hidden sm:h-96">
                <WorldDotMap className="mask-fade-x absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40" />
              </div>
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
              <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
            </div>

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {dict.tag}
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {dict.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                  {dict.body}
                </p>
              </div>

              <StoreBadges dict={badges} className="shrink-0" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
