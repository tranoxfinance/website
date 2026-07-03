"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeCookieName, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = {
  "en-NG": "EN",
  "fr-CI": "FR",
};

interface LocaleSwitcherProps {
  lang: Locale;
  ariaLabel: string;
  className?: string;
  onNavigate?: () => void;
}

export function LocaleSwitcher({
  lang,
  ariaLabel,
  className,
  onNavigate,
}: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "flex items-center gap-0.5 rounded-full p-1 ring-1 ring-border",
        className,
      )}
    >
      {locales.map((locale) => {
        const isActive = locale === lang;
        const target = pathname.replace(/^\/[^/]+/, `/${locale}`) || `/${locale}`;
        return (
          <Link
            key={locale}
            href={target}
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              document.cookie = `${localeCookieName}=${locale};path=/;max-age=31536000;samesite=lax`;
              onNavigate?.();
            }}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
              isActive
                ? "bg-brand text-white"
                : "text-ink-soft hover:text-brand",
            )}
          >
            {LABELS[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
