import { cn } from "@/lib/utils";

interface StampProps {
  children: React.ReactNode;
  className?: string;
}

export function Stamp({ children, className }: StampProps) {
  return (
    <span
      className={cn(
        "inline-block -rotate-3 bg-white px-3 py-1.5 font-display text-lg uppercase leading-none text-navy sm:text-xl",
        className,
      )}
    >
      {children}
    </span>
  );
}
