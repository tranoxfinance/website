import { cn } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}

export function Pill({ children, invert = false, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium uppercase tracking-label",
        invert ? "border-white/35 text-white" : "border-ink/30 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
