import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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

const RANGES: RateRange[] = ["1d", "1w", "1m", "3m", "1y"];

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
    <div className="overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink-soft">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-ink">
            {numberFormat.format(Number(history.current) * scale)}
          </p>
        </div>
        <div
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold",
            trendClass,
          )}
        >
          <Trend className="h-4 w-4" strokeWidth={2} />
          {changePercent > 0 ? "+" : ""}
          {history.changePercent ?? "0.00"}%
        </div>
      </div>

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

  const [ngnToXof, xofToNgn] = await Promise.all([
    getPublicRateHistory("NGN", "XOF", range),
    getPublicRateHistory("XOF", "NGN", range),
  ]);

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <Container className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {dict.ratesPage.tag}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {dict.ratesPage.heading}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              {dict.ratesPage.sub}
            </p>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {RANGES.map((r) => (
                <Link
                  key={r}
                  href={r === "1d" ? `/${lang}/rates` : `/${lang}/rates?range=${r}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    r === range
                      ? "bg-brand text-white"
                      : "bg-surface text-ink-soft hover:text-ink",
                  )}
                >
                  {dict.ratesPage.rangeLabels[r]}
                </Link>
              ))}
            </div>

            {ngnToXof && xofToNgn ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <RateCard
                  lang={lang}
                  label={dict.ratesPage.ngnToXofLabel}
                  history={ngnToXof}
                  chartAria={dict.ratesPage.chartAriaNgn}
                  scale={1000}
                />
                <RateCard
                  lang={lang}
                  label={dict.ratesPage.xofToNgnLabel}
                  history={xofToNgn}
                  chartAria={dict.ratesPage.chartAriaXof}
                  scale={1000}
                />
              </div>
            ) : (
              <p className="mt-8 rounded-3xl border border-border bg-card p-9 text-center text-ink-soft">
                {dict.ratesPage.unavailable}
              </p>
            )}

            <p className="mt-6 text-xs leading-relaxed text-muted">
              {dict.ratesPage.disclaimer}
            </p>

            <div className="mt-10">
              <Button href={`/${lang}#get-started`} size="lg">
                {dict.ratesPage.cta}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
