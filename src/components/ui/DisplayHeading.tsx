import { Stamp } from "@/components/ui/Stamp";
import { cn } from "@/lib/utils";

interface DisplayHeadingProps {
  tag: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}

export function DisplayHeading({
  tag,
  title,
  sub,
  align = "left",
  invert = false,
  className,
}: DisplayHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-4xl text-center", className)}>
      <Stamp>{tag}</Stamp>
      <h2
        className={cn(
          "mt-6 font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl",
          invert ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
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
