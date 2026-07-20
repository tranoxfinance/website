import Image from "next/image";
import { Wallet, Layers, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const ICONS = [Wallet, Layers, ShieldCheck];

export function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="features" className="relative py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {dict.tag}
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                {dict.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {dict.sub}
              </p>

              <div className="mt-10 space-y-7">
                {dict.items.map((feature, index) => {
                  const Icon = ICONS[index];
                  return (
                    <div key={feature.title} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-ink">
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {feature.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex justify-center lg:justify-end">
              <Image
                src={dict.image.src}
                alt={dict.image.alt}
                width={dict.image.width}
                height={dict.image.height}
                sizes="(min-width: 512px) 512px, 100vw"
                className="h-auto w-full max-w-lg drop-shadow-[0_40px_60px_rgba(10,22,38,0.25)]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 55%, transparent 97%)",
                  maskImage:
                    "linear-gradient(to bottom, black 55%, transparent 97%)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
