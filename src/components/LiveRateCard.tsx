import { Flag } from "@/components/Flag";
import { cn } from "@/lib/utils";

const RATE_DECIMALS = 4;

interface LiveRateCardProps {
  label: string;
  rate: string;
  locale: string;
  size?: "md" | "lg";
  className?: string;
}

export function LiveRateCard({ label, rate, locale, size = "lg", className }: LiveRateCardProps) {
  const value = new Intl.NumberFormat(locale, {
    minimumFractionDigits: RATE_DECIMALS,
    maximumFractionDigits: RATE_DECIMALS,
  }).format(Number(rate));
  const flagClass = size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : "h-7 w-7 sm:h-8 sm:w-8";

  return (
    <div className={cn("inline-block rotate-1 bg-card text-ink shadow-lift", size === "lg" ? "p-6 sm:p-7" : "p-5", className)}>
      <p className="text-sm font-bold text-ink-soft">{label}</p>
      <p
        className={cn(
          "tabular mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-display leading-none text-ink",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        <Flag country="NG" className={flagClass} />
        <span>1 NGN =</span>
        <Flag country="CI" className={flagClass} />
        <span>{value} XOF</span>
      </p>
    </div>
  );
}
