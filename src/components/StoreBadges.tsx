import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface StoreBadgesProps {
  dict: Dictionary["storeBadges"];
  className?: string;
  invert?: boolean;
}

export function StoreBadges({ dict, className, invert = false }: StoreBadgesProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-gold">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        {dict.development}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {[dict.appStore, dict.googlePlay].map((badge) => (
          <div key={badge.src} className="flex flex-col items-center gap-1.5">
            <a
              href="#"
              aria-label={badge.label}
              className="inline-block cursor-not-allowed opacity-60 transition hover:opacity-50"
            >
              <Image
                src={badge.src}
                alt={badge.label}
                width={badge.width}
                height={badge.height}
                unoptimized
                priority
                className="h-11 w-[150px] object-fill"
              />
            </a>
            <span className={cn("text-2xs font-medium", invert ? "text-on-dark-muted" : "text-ink-soft")}>
              {dict.comingSoon}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
