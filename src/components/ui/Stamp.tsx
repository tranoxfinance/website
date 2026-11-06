import { cn } from "@/lib/utils";

interface StampProps {
  children: React.ReactNode;
  className?: string;
}

export function Stamp({ children, className }: StampProps) {
  return (
    <span
      className={cn(
        "inline-block -rotate-3 bg-green px-4 py-2 font-display text-xl uppercase leading-none text-navy sm:text-2xl",
        className,
      )}
    >
      {children}
    </span>
  );
}
