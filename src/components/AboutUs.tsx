import { Globe2, BadgeCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CorridorHub } from "@/components/CorridorHub";

const VALUES = [
  {
    icon: Globe2,
    title: "Built for the corridor",
    body: "We focus on one route and do it exceptionally well: money moving between Nigeria and Ivory Coast, in both directions.",
  },
  {
    icon: BadgeCheck,
    title: "Trust by design",
    body: "Licensed partners, locked-in rates, and end-to-end tracking mean every transfer is safe, transparent, and accountable.",
  },
  {
    icon: HeartHandshake,
    title: "People first",
    body: "Behind every transfer is a family, a business, a plan. We build for the people who depend on money arriving on time.",
  },
];

export function AboutUs() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                About us
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Connecting West Africa, one transfer at a time
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Tranox was born from a simple frustration: sending money between
                Nigeria and Ivory Coast was slow, expensive, and opaque. We set
                out to fix it with a single, focused product.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Today we move money across the NGN–XOF corridor in minutes, at a
                rate you can see before you confirm. No hidden fees, no surprise
                deductions, no waiting days to know if it arrived. Just fast,
                fair transfers that families and businesses can rely on.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-blob rounded-full bg-brand/25 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                The corridor we serve
              </p>

              <CorridorHub />

              <p className="mt-7 text-xl font-bold leading-snug">
                Nigeria and Ivory Coast, linked in real time.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                One route, mastered end to end so your money never gets lost in a
                maze of intermediaries.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal
                key={value.title}
                delay={index * 90}
                className="group bg-card p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {value.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
