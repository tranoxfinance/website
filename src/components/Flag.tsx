import { cn } from "@/lib/utils";

interface FlagProps {
  country: "NG" | "CI";
  className?: string;
}

export function Flag({ country, className }: FlagProps) {
  return (
    <span
      className={cn(
        "inline-flex overflow-hidden rounded-full ring-1 ring-black/10",
        className,
      )}
      role="img"
      aria-label={country === "NG" ? "Nigeria" : "Ivory Coast"}
    >
      <svg viewBox="0 0 9 6" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {country === "NG" ? (
          <>
            <rect width="9" height="6" fill="#ffffff" />
            <rect width="3" height="6" fill="#008751" />
            <rect x="6" width="3" height="6" fill="#008751" />
          </>
        ) : (
          <>
            <rect width="9" height="6" fill="#ffffff" />
            <rect width="3" height="6" fill="#f77f00" />
            <rect x="6" width="3" height="6" fill="#009e60" />
          </>
        )}
      </svg>
    </span>
  );
}
