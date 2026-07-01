import { Zap, LockKeyhole, ArrowLeftRight, Radar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

const BENEFITS = [
  {
    icon: Zap,
    title: "Instant payout, either direction",
    body: "Send from Nigeria or Ivory Coast and your recipient is paid in minutes.",
    pulse: true,
  },
  {
    icon: LockKeyhole,
    title: "Locked-in rates",
    body: "Your rate is fixed the moment you confirm. The payout never changes after you send.",
  },
  {
    icon: ArrowLeftRight,
    title: "Send and receive both ways",
    body: "One account works in both directions across the corridor, with no extra setup.",
  },
  {
    icon: Radar,
    title: "Live tracking, end to end",
    body: "Follow every transfer with clear status from the moment you confirm until it lands.",
  },
];

export function WhyTranox() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Why us
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Why senders prefer Tranox
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Speed, certainty, and a rate you can trust, every time you send
              across the corridor.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-3xl gap-x-12 gap-y-12 sm:grid-cols-2">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 80}>
                <div className="group flex flex-col items-start">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-transform duration-300 group-hover:-translate-y-1">
                    {benefit.pulse ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-brand/25 animate-pulse-ring"
                      />
                    ) : null}
                    <Icon className="relative h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {benefit.body}
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
