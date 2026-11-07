import { Smartphone, ListChecks, Radar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { CorridorMap } from "@/components/CorridorMap";
import type { Dictionary } from "@/i18n/dictionaries";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

const ICONS = [Radar, ListChecks, Smartphone];

export function AppShowcase({ dict }: { dict: Dictionary["showcase"] }) {
  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <DisplayHeading title={dict.heading} sub={dict.sub} />

          <ul className="mt-10 space-y-7">
            {dict.points.map((point, index) => {
              const Icon = ICONS[index];
              return (
                <li key={point.title} className="flex gap-5">
                  <Icon className="mt-1 h-7 w-7 shrink-0 text-brand" strokeWidth={1.75} />
                  <div>
                    <h3 className="text-xl font-bold text-ink">{point.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-soft">
                      {point.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <Button href="#get-started" variant="navy" size="lg" className="rounded-full">
              {dict.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex justify-center lg:justify-end">
            <CorridorMap
              ariaLabel={dict.mapAria}
              nigeriaLabel={dict.nigeria}
              ivoryCoastLabel={dict.ivoryCoast}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
