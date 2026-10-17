import { Bell, ListChecks, Radar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { CorridorMap } from "@/components/CorridorMap";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [Radar, ListChecks, Bell];

export function AppShowcase({ dict }: { dict: Dictionary["showcase"] }) {
  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow={dict.tag}
            title={dict.heading}
            description={dict.sub}
            descriptionClassName="max-w-lg"
          />

          <ul className="mt-8 space-y-5">
            {dict.points.map((point, index) => {
              const Icon = ICONS[index];
              return (
                <li key={point.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {point.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <Button href="#get-started" size="lg">
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
