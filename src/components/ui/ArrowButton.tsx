import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex h-16 items-center justify-between gap-4 whitespace-nowrap rounded-full bg-green pl-6 pr-2 text-lg font-bold text-navy transition hover:brightness-105 sm:pl-7";

interface ArrowButtonContentProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  leading?: LucideIcon;
  motion?: "right" | "down" | "turn";
}

const motions = {
  right: "group-hover:translate-x-0.5",
  down: "group-hover:translate-y-0.5",
  turn: "group-hover:rotate-45",
};

function Content({ children, icon: Icon = ArrowRight, leading: Leading, motion = "right" }: ArrowButtonContentProps) {
  return (
    <>
      <span className="flex items-center gap-3">
        {Leading ? <Leading className="h-5 w-5" strokeWidth={2.25} /> : null}
        {children}
      </span>
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300",
          motions[motion],
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </span>
    </>
  );
}

type ArrowLinkProps = ArrowButtonContentProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string };

export function ArrowLink({ children, icon, leading, motion, className, ...rest }: ArrowLinkProps) {
  return (
    <a className={cn(base, className)} {...rest}>
      <Content icon={icon} leading={leading} motion={motion}>
        {children}
      </Content>
    </a>
  );
}

type ArrowSubmitProps = ArrowButtonContentProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function ArrowSubmit({ children, icon, leading, motion, className, ...rest }: ArrowSubmitProps) {
  return (
    <button
      className={cn(base, "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60", className)}
      {...rest}
    >
      <Content icon={icon} leading={leading} motion={motion}>
        {children}
      </Content>
    </button>
  );
}
