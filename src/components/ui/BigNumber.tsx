import { cn } from "@/lib/utils";

type Size = "md" | "lg" | "xl";
type Tone = "brand" | "light" | "navy" | "ink";

const sizes: Record<Size, string> = {
  md: "text-4xl sm:text-5xl",
  lg: "text-5xl sm:text-6xl",
  xl: "text-6xl sm:text-7xl",
};

const tones: Record<Tone, string> = {
  brand: "text-brand",
  light: "text-white",
  navy: "text-navy",
  ink: "text-ink",
};

interface BigNumberProps {
  children: React.ReactNode;
  size?: Size;
  tone?: Tone;
  className?: string;
}

export function BigNumber({ children, size = "lg", tone = "brand", className }: BigNumberProps) {
  return (
    <span className={cn("block font-display leading-none", sizes[size], tones[tone], className)}>
      {children}
    </span>
  );
}

export function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

const badgeSizes = {
  sm: "h-8 w-8 text-md",
  md: "h-12 w-12 text-2xl",
};

export function NumberBadge({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: keyof typeof badgeSizes;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-navy font-display text-white",
        badgeSizes[size],
      )}
    >
      {children}
    </span>
  );
}
