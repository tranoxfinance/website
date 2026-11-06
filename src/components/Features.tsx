import Image from "next/image";
import { STAGGER_MS } from "@/lib/motion";
import { BigNumber, padIndex } from "@/components/ui/BigNumber";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { PayoutLogos } from "@/components/PayoutLogos";
import type { Dictionary } from "@/i18n/dictionaries";

interface FeaturesProps {
  dict: Dictionary["features"];
}

function Point({
  index,
  title,
  body,
  delay,
}: {
  index: number;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal as="li" delay={delay} className="border-t-2 border-ink pt-6">
      <BigNumber>{padIndex(index)}</BigNumber>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-lg leading-relaxed text-ink-soft">{body}</p>
    </Reveal>
  );
}

export function Features({ dict }: FeaturesProps) {
  const [first, second, third] = dict.items;
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <DisplayHeading tag={dict.tag} title={dict.heading} />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:pb-2">{dict.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-12">
          <ol className="order-2 flex flex-col gap-10 lg:order-1 lg:justify-between">
            <Point index={0} title={first.title} body={first.body} delay={0} />
            <Point index={1} title={second.title} body={second.body} delay={STAGGER_MS} />
          </ol>

          <Reveal
            delay={STAGGER_MS}
            className="relative order-1 aspect-[4/5] overflow-hidden rounded-panel bg-brand lg:order-2"
          >
            <Image
              src={dict.image.src}
              alt={dict.image.alt}
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover object-bottom"
            />
          </Reveal>

          <ol start={3} className="order-3 flex flex-col gap-10 lg:justify-between">
            <Point index={2} title={third.title} body={third.body} delay={STAGGER_MS * 2} />
            <Reveal as="li" delay={STAGGER_MS * 3} className="list-none rounded-3xl bg-navy p-7 text-white">
              <DisplayHeading as="p" title={dict.payout.title} size="sm" invert />
              <PayoutLogos bankLabel={dict.payout.bank} className="mt-5" />
            </Reveal>
          </ol>
        </div>
      </Container>
    </section>
  );
}
