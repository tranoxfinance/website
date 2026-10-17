import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  invert = false,
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
          invert ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 leading-relaxed",
            invert ? "text-md text-white/65" : "text-lg text-ink-soft",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
