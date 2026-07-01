import Image from "next/image";
import { cn } from "@/lib/utils";

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        Now in development
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col items-center gap-1.5">
          <a
            href="#"
            aria-label="Download on the App Store"
            className="inline-block cursor-not-allowed opacity-60 transition hover:opacity-50"
          >
            <Image
              src="/appstore.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              unoptimized
              priority
              className="h-[46px] w-auto"
            />
          </a>
          <span className="text-[11px] font-medium text-ink-soft">Coming soon</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <a
            href="#"
            aria-label="Get it on Google Play"
            className="inline-block cursor-not-allowed opacity-60 transition hover:opacity-50"
          >
            <Image
              src="/googleplay.svg"
              alt="Get it on Google Play"
              width={155}
              height={46}
              unoptimized
              priority
              className="h-[46px] w-auto"
            />
          </a>
          <span className="text-[11px] font-medium text-ink-soft">Coming soon</span>
        </div>
      </div>
    </div>
  );
}
