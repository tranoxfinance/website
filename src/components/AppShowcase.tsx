import { Bell, ListChecks, Radar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { PhoneDemo } from "@/components/PhoneDemo";

const POINTS = [
  {
    icon: Radar,
    title: "Track every transfer live",
    body: "Follow each payment from sent to delivered with real-time status.",
  },
  {
    icon: ListChecks,
    title: "Saved recipients",
    body: "Pay the same people in seconds without re-entering their details.",
  },
  {
    icon: Bell,
    title: "Rate alerts",
    body: "Get notified the moment the rate moves in your favour.",
  },
];

export function AppShowcase() {
  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            The app
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your money, in your pocket
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
            Send, track, and manage every cross-border transfer from one clean
            app, built for the Nigeria–Ivory Coast corridor.
          </p>

          <ul className="mt-8 space-y-5">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <point.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="#get-started" size="lg">
              Get the app
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex justify-center lg:justify-end">
            <div className="origin-top scale-[0.78] -mb-28 sm:mb-0 sm:scale-100">
              <PhoneDemo className="max-w-[300px]" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
