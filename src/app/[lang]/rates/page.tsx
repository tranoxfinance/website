import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { AreaChart } from "@/components/AreaChart";
import { hasLocale, localeAlternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getPublicRateHistory,
  buildRateTicks,
  type RateHistory,
  type RateRange,
} from "@/lib/fx-rates";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/PageHero";
import { FactBand } from "@/components/FactBand";
import { Reveal } from "@/components/Reveal";
import { Flag } from "@/components/Flag";
import { LiveRateCard } from "@/components/LiveRateCard";

const RANGES: RateRange[] = ["1d", "1w", "1m", "3m", "1y"];
const FACT_STAGGER_MS = 80;
const COUNTRY: Record<RateHistory["from"], "NG" | "CI"> = { NGN: "NG", XOF: "CI" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return {
    title: dict.ratesPage.metaTitle,
    description: dict.ratesPage.metaDescription,
    alternates: localeAlternates(lang, "/rates"),
  };
}

function tickOptions(range: RateRange): Intl.DateTimeFormatOptions {
  return range === "1d"
    ? { hour: "2-digit", minute: "2-digit" }
    : { month: "short", day: "numeric" };
}

interface RateCardProps {
  lang: Locale;
  label: string;
  history: RateHistory;
  chartAria: string;
  scale: number;
}

function RateCard({ lang, label, history, chartAria, scale }: RateCardProps) {
  const changePercent = history.changePercent ? Number(history.changePercent) : 0;
  const Trend =
    changePercent > 0 ? TrendingUp : changePercent < 0 ? TrendingDown : Minus;
  const trendClass =
    changePercent > 0
      ? "text-success"
      : changePercent < 0
        ? "text-danger"
        : "text-ink-soft";

  const numberFormat = new Intl.NumberFormat(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  const data = history.points.map((point) => Number(point.rate));
  const labels = buildRateTicks(
    history.points.map((point) => point.time),
    lang,
    tickOptions(history.range),
  );

  return (
    <div className="overflow-hidden rounded-3xl bg-surface p-7 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Flag country={COUNTRY[history.from]} className="h-8 w-8" />
            <Flag country={COUNTRY[history.to]} className="h-8 w-8" />
          </span>
          <p className="text-sm font-semibold text-ink-soft">{label}</p>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-semibold",
            trendClass,
          )}
        >
          <Trend className="h-4 w-4" strokeWidth={2} />
          {changePercent > 0 ? "+" : ""}
          {history.changePercent ?? "0.00"}%
        </div>
      </div>
      <p className="tabular mt-4 font-display text-6xl leading-none text-ink sm:text-8xl">
        {numberFormat.format(Number(history.current) * scale)}
      </p>

      <div className="mt-8 h-[200px] w-full sm:h-[240px]">
        {data.length > 1 ? (
          <AreaChart data={data} labels={labels} ariaLabel={chartAria} />
        ) : null}
      </div>
    </div>
  );
}

export default async function RatesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ range?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const resolvedSearchParams = await searchParams;
  const range: RateRange = RANGES.includes(
    resolvedSearchParams.range as RateRange,
  )
    ? (resolvedSearchParams.range as RateRange)
    : "1d";

  const t = dict.ratesPage;
  const [ngnToXof, xofToNgn] = await Promise.all([
    getPublicRateHistory("NGN", "XOF", range),
    getPublicRateHistory("XOF", "NGN", range),
  ]);

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} overlay />
      <main className="flex-1">
        <PageHero tag={t.tag} title={t.heading} sub={t.sub} photo={t.photo}>
          {ngnToXof ? (
            <LiveRateCard
              label={t.liveLabel}
              rate={ngnToXof.current}
              locale={lang}
              className="mt-8"
            />
          ) : null}
        </PageHero>
        <FactBand items={dict.factBand} label={t.tag} />

        <section className="py-16 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-5xl uppercase leading-none text-ink sm:text-7xl">
                {t.tag}
              </h2>
              <nav
                aria-label={t.tag}
                className="grid w-full grid-cols-5 gap-1 rounded-full bg-surface p-1 sm:inline-flex sm:w-auto"
              >
                {RANGES.map((r) => (
                  <Link
                    key={r}
                    href={r === "1d" ? `/${lang}/rates` : `/${lang}/rates?range=${r}`}
                    aria-current={r === range ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2.5 text-center text-sm font-bold transition sm:px-5",
                      r === range ? "bg-navy text-white" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {t.rangeLabels[r]}
                  </Link>
                ))}
              </nav>
            </div>

            {ngnToXof && xofToNgn ? (
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                <RateCard
                  lang={lang}
                  label={t.ngnToXofLabel}
                  history={ngnToXof}
                  chartAria={t.chartAriaNgn}
                  scale={1000}
                />
                <RateCard
                  lang={lang}
                  label={t.xofToNgnLabel}
                  history={xofToNgn}
                  chartAria={t.chartAriaXof}
                  scale={1000}
                />
              </div>
            ) : (
              <p className="mt-10 rounded-3xl bg-surface p-10 text-center text-lg text-ink-soft">
                {t.unavailable}
              </p>
            )}
            <p className="mt-5 text-xs leading-relaxed text-muted">{t.disclaimer}</p>
          </Container>
        </section>

        <section className="pb-4">
          <Container>
            <ul className="grid gap-4 lg:grid-cols-3">
              {t.facts.map((fact, index) => (
                <Reveal
                  as="li"
                  key={fact.title}
                  delay={index * FACT_STAGGER_MS}
                  className="flex flex-col gap-16 rounded-3xl bg-surface p-8 sm:gap-24 sm:p-10"
                >
                  <span className="font-display text-8xl leading-none text-brand sm:text-9xl">
                    {fact.value}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-ink">{fact.title}</h3>
                    <p className="mt-2 text-md leading-relaxed text-ink-soft">{fact.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
