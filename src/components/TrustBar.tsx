import { Eye, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    icon: Eye,
    title: "Transparency first",
    body: "Every rate and fee is shown in full before you confirm. No hidden markups, no surprise deductions.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and regulated",
    body: "Encrypted end to end and operated with licensed partners, so every transfer is handled with care.",
  },
  {
    icon: Users,
    title: "Built for West Africa",
    body: "Designed around how people and businesses actually send and receive across the Nigeria–Ivory Coast corridor.",
  },
];

export function TrustBar() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Our mission
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Making cross-border money simple
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              We are building Tranox to move money between Nigeria and Ivory
              Coast quickly, transparently, and safely, for everyone.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-x-12 gap-y-12 sm:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 80}>
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
