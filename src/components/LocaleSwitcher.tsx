"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flag } from "@/components/Flag";
import { locales, localeCookieName, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const FLAGS: Record<Locale, "NG" | "CI"> = {
  "en-NG": "NG",
  "fr-CI": "CI",
};

const NAMES: Record<Locale, string> = {
  "en-NG": "English (Nigeria)",
  "fr-CI": "Français (Côte d'Ivoire)",
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
            aria-label={NAMES[locale]}
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              document.cookie = `${localeCookieName}=${locale};path=/;max-age=31536000;samesite=lax`;
              onNavigate?.();
            }}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all",
              isActive
                ? "ring-2 ring-brand"
                : "opacity-45 grayscale-[35%] hover:opacity-100 hover:grayscale-0",
            )}
          >
            <span aria-hidden className="flex h-5 w-5">
              <Flag country={FLAGS[locale]} className="h-5 w-5" />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
