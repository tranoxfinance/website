"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  onDark?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function Logo({ className, href = "/", onClick }: LogoProps) {
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
      aria-label="Tranox home"
      className={cn(
        "inline-flex items-center rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className,
      )}
    >
      <img
        src="/tranox-logo.svg"
        alt="Tranox"
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
