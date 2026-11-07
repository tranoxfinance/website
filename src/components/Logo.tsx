"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  onDark?: boolean;
  className?: string;
  href?: string;
  ariaLabel?: string;
  onClick?: () => void;
  light?: boolean;
}

export function Logo({
  className,
  href = "/",
  ariaLabel = "Tranox",
  onClick,
  light = false,
}: LogoProps) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === pathname) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className,
      )}
    >
      <img
        src="/tranox-logo.svg"
        alt="Tranox"
        className={cn(
          "h-8 w-auto transition-[filter] duration-300 sm:h-9",
          light && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
