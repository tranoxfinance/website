import { Stamp } from "@/components/ui/Stamp";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizes: Record<Size, string> = {
  sm: "text-3xl",
  md: "text-4xl sm:text-5xl",
  lg: "text-5xl sm:text-6xl lg:text-7xl",
  xl: "text-6xl sm:text-7xl lg:text-8xl",
};

interface DisplayHeadingProps {
  title: string;
  tag?: string;
  sub?: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: Size;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}

export function DisplayHeading({
  title,
  tag,
  sub,
  as: Heading = "h2",
  size = "lg",
  align = "left",
  invert = false,
  className,
}: DisplayHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-4xl text-center", className)}>
      {tag ? <Stamp className="mb-6">{tag}</Stamp> : null}
      <Heading
        className={cn(
          "font-display uppercase leading-display",
          sizes[size],
          invert ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {sub ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
            invert ? "text-white/80" : "text-ink-soft",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
