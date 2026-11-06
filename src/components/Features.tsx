import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Landmark,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Flag } from "@/components/Flag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { RateHistory } from "@/lib/fx-rates";
import { cn } from "@/lib/utils";

type Cards = Dictionary["features"]["cards"];

const PAYOUT_ICONS = [Landmark, Smartphone, Banknote];
const CARD_STAGGER_MS = 90;
const SPARK_WIDTH = 240;
const SPARK_HEIGHT = 72;
const RATE_DECIMALS = 4;

interface FeaturesProps {
  lang: Locale;
  dict: Dictionary["features"];
  rate: RateHistory | null;
}

function Card({
  title,
  body,
  visual,
  className,
  delay,
  children,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  className?: string;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className={cn("h-full min-w-0", className)}>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-soft">
        <div className="flex min-h-36 flex-1 items-center justify-center">
          {visual}
        </div>
        <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
        {children}
      </article>
    </Reveal>
  );
}

function CorridorVisual() {
  return (
    <div aria-hidden className="flex w-full max-w-lg items-center gap-4 sm:gap-6">
      <div className="flex flex-col items-center gap-2">
        <Flag country="NG" className="h-16 w-16 shadow-soft sm:h-20 sm:w-20" />
        <span className="text-sm font-bold text-ink">NGN</span>
      </div>
      <div className="relative mb-7 flex-1 space-y-6">
        <div className="relative">
          <p className="mb-2 text-center text-2xs font-semibold text-muted">NGN → XOF</p>
          <div className="border-t-2 border-dashed border-border-strong" />
          <span className="absolute bottom-0 h-3 w-3 -translate-x-1/2 translate-y-1/2 animate-travel rounded-full bg-brand shadow-glow" />
        </div>
        <div className="relative">
          <div className="border-t-2 border-dashed border-border-strong" />
          <span className="absolute top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-travel rounded-full bg-green shadow-glow-green [animation-delay:1.3s] [animation-direction:reverse]" />
          <p className="mt-2 text-center text-2xs font-semibold text-muted">XOF → NGN</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Flag country="CI" className="h-16 w-16 shadow-soft sm:h-20 sm:w-20" />
        <span className="text-sm font-bold text-ink">XOF</span>
      </div>
    </div>
  );
}

function sparkPath(rate: RateHistory | null) {
  const values = (rate?.points ?? []).map((point) => Number(point.rate));
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = SPARK_WIDTH / (values.length - 1);
  return values
    .map((value, i) => {
      const x = (i * step).toFixed(1);
      const y = (SPARK_HEIGHT - ((value - min) / span) * SPARK_HEIGHT).toFixed(1);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
}

function RatesVisual({
  rate,
  label,
  lang,
}: {
  rate: RateHistory | null;
  label: string;
  lang: Locale;
}) {
  const path = sparkPath(rate);
  return (
    <div className="w-full">
      {rate && (
        <div className="mb-4">
          <p className="text-2xs font-medium text-muted">{label}</p>
          <p className="tabular text-3xl font-bold text-ink">
            {new Intl.NumberFormat(lang, {
              minimumFractionDigits: RATE_DECIMALS,
              maximumFractionDigits: RATE_DECIMALS,
            }).format(Number(rate.current))}
          </p>
        </div>
      )}
      {path && (
        <svg
          aria-hidden
          viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
          preserveAspectRatio="none"
          className="h-16 w-full overflow-visible text-brand"
        >
          <path
            d={path}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={1}
            strokeDashoffset={1}
            className="animate-draw-slow"
          />
        </svg>
      )}
    </div>
  );
}

function FeesVisual({ rows }: { rows: Cards["fees"]["rows"] }) {
  return (
    <dl
      aria-hidden
      className="w-full divide-y divide-border rounded-xl border border-border bg-card px-4 shadow-soft"
    >
      {rows.map((row, index) => (
        <div key={row.label} className="flex items-center justify-between gap-3 py-2.5">
          <dt className="text-xs text-ink-soft">{row.label}</dt>
          <dd
            className={cn(
              "tabular text-sm font-bold",
              index === rows.length - 1 ? "text-brand" : "text-ink",
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function PayoutVisual({ methods }: { methods: string[] }) {
  const chips = [...methods, ...methods];
  return (
    <div aria-hidden className="mask-fade-x w-full overflow-hidden">
      <ul className="flex w-max animate-marquee gap-3 [animation-duration:18s]">
        {chips.map((method, index) => {
          const Icon = PAYOUT_ICONS[index % methods.length];
          return (
            <li
              key={`${method}-${index}`}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-ink shadow-soft"
            >
              <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
              {method}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div aria-hidden className="relative flex h-20 w-20 items-center justify-center">
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/30" />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-brand ring-1 ring-brand/20">
        <ShieldCheck className="h-9 w-9" strokeWidth={1.75} />
      </span>
    </div>
  );
}

export function Features({ lang, dict, rate }: FeaturesProps) {
  const { cards } = dict;
  return (
    <section id="features" className="relative py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={dict.tag}
            title={dict.heading}
            description={dict.sub}
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title={cards.corridor.title}
            body={cards.corridor.body}
            visual={<CorridorVisual />}
            className="sm:col-span-2"
            delay={0}
          />
          <Card
            title={cards.rates.title}
            body={cards.rates.body}
            visual={<RatesVisual rate={rate} label={cards.rates.pair} lang={lang} />}
            delay={CARD_STAGGER_MS}
          >
            <Link
              href={`/${lang}/rates`}
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
            >
              {cards.rates.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Card>
          <Card
            title={cards.fees.title}
            body={cards.fees.body}
            visual={<FeesVisual rows={cards.fees.rows} />}
            delay={CARD_STAGGER_MS * 2}
          />
          <Card
            title={cards.payout.title}
            body={cards.payout.body}
            visual={<PayoutVisual methods={cards.payout.methods} />}
            delay={CARD_STAGGER_MS * 3}
          />
          <Card
            title={cards.security.title}
            body={cards.security.body}
            visual={<SecurityVisual />}
            delay={CARD_STAGGER_MS * 4}
          />
        </div>
      </Container>
    </section>
  );
}
