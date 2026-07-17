const API_URL = process.env.TRANOX_API_URL;

export type RateCurrency = "NGN" | "XOF";
export type RateRange = "1d" | "1w" | "1m" | "3m" | "1y";

export interface RateHistoryPoint {
  time: string;
  rate: string;
}

export interface RateHistory {
  from: RateCurrency;
  to: RateCurrency;
  range: RateRange;
  current: string;
  open: string | null;
  high: string | null;
  low: string | null;
  change: string | null;
  changePercent: string | null;
  points: RateHistoryPoint[];
}

export async function getPublicRateHistory(
  from: RateCurrency,
  to: RateCurrency,
  range: RateRange,
): Promise<RateHistory | null> {
  if (!API_URL) return null;
  try {
    const url = `${API_URL}/public/fx-rates/history?from=${from}&to=${to}&range=${range}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as RateHistory;
  } catch {
    return null;
  }
}

export function buildRateTicks(
  times: string[],
  locale: string,
  options?: Intl.DateTimeFormatOptions,
) {
  const formatter = new Intl.DateTimeFormat(
    locale,
    options ?? { hour: "2-digit", minute: "2-digit" },
  );
  const tickCount = 4;
  const lastIndex = times.length - 1;
  if (lastIndex < 1) return times.map((time) => formatter.format(new Date(time)));

  const tickIndices = new Set<number>();
  for (let i = 0; i < tickCount; i++) {
    tickIndices.add(Math.round((i * lastIndex) / (tickCount - 1)));
  }
  return times.map((time, i) =>
    tickIndices.has(i) ? formatter.format(new Date(time)) : "",
  );
}
