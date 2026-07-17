import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { AreaChart } from "@/components/AreaChart";
import { getPublicRateHistory, buildRateTicks } from "@/lib/fx-rates";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface LiveRatesProps {
  lang: Locale;
  dict: Dictionary["liveRates"];
}

export async function LiveRates({ lang, dict }: LiveRatesProps) {
  const [ngnToXof, xofToNgn] = await Promise.all([
    getPublicRateHistory("NGN", "XOF", "1d"),
    getPublicRateHistory("XOF", "NGN", "1d"),
  ]);

  if (!ngnToXof || !xofToNgn || ngnToXof.points.length < 2) return null;

  const current = Number(ngnToXof.current);
  const changePercent = ngnToXof.changePercent
    ? Number(ngnToXof.changePercent)
    : 0;
  const Trend = changePercent > 0 ? TrendingUp : changePercent < 0 ? TrendingDown : Minus;
  const trendClass =
    changePercent > 0
      ? "text-success"
      : changePercent < 0
        ? "text-danger"
        : "text-ink-soft";

  const data = ngnToXof.points.map((point) => Number(point.rate));
  const labels = buildRateTicks(
    ngnToXof.points.map((point) => point.time),
    lang,
  );

  const numberFormat = new Intl.NumberFormat(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {dict.tag}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {dict.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {dict.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-ink-soft">
                  {dict.pairLabel}
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-ink">
                  1,000 NGN ≈ {numberFormat.format(current * 1000)} XOF
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  1,000 XOF ≈ {numberFormat.format(Number(xofToNgn.current) * 1000)} NGN
                </p>
              </div>

              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold",
                  trendClass,
                )}
              >
                <Trend className="h-4 w-4" strokeWidth={2} />
                {changePercent > 0 ? "+" : ""}
                {ngnToXof.changePercent ?? "0.00"}%
                <span className="font-normal text-ink-soft">{dict.rangeLabel}</span>
              </div>
            </div>

            <div className="mt-8 h-[180px] w-full sm:h-[220px]">
              <AreaChart data={data} labels={labels} ariaLabel={dict.chartAria} />
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted">
              {dict.disclaimer}
            </p>

            <Link
              href={`/${lang}/rates`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-hover"
            >
              {dict.moreLink}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
