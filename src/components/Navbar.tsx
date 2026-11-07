"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface NavbarProps {
  lang: Locale;
  dict: Dictionary["nav"];
  overlay?: boolean;
}

export function Navbar({ lang, dict, overlay = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const hrefFor = (hash: string) => (isHome ? hash : `/${lang}${hash}`);
  const homeHref = `/${lang}`;
  const pageLinks = [
    { href: homeHref, label: dict.home },
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/rates`, label: dict.liveRates },
    { href: `/${lang}/careers`, label: dict.careers },
    { href: `/${lang}/news`, label: dict.news },
  ];
  const onDark = overlay && !scrolled;
  const isActivePage = (href: string) =>
    pathname === href ||
    (href !== homeHref && pathname.startsWith(`${href}/`));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-background border-b border-border shadow-soft"
            : "border-b border-transparent",
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-4">
            <Logo href={`/${lang}`} ariaLabel={dict.homeAria} light={onDark} />

            <div className="hidden items-center gap-2 lg:flex">
              {pageLinks.map((page) => {
                const isActive = isActivePage(page.href);
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative px-3 py-2 text-sm font-medium transition-colors",
                      onDark
                        ? isActive
                          ? "text-white"
                          : "text-on-dark hover:text-white"
                        : isActive
                          ? "text-brand hover:text-brand"
                          : "text-ink-soft hover:text-brand",
                    )}
                  >
                    {page.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out",
                        onDark ? "bg-white" : "bg-brand",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <LocaleSwitcher
                lang={lang}
                ariaLabel={dict.languageAria}
                className={cn(onDark && "ring-on-dark-line")}
              />
              <ThemeToggle
                ariaLabel={dict.toggleTheme}
                className={cn(onDark && "text-white ring-on-dark-line hover:text-white hover:ring-on-dark")}
              />
              <Button href={hrefFor("#get-started")} size="sm">
                {dict.downloadApp}
              </Button>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                type="button"
                aria-label={dict.openMenu}
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full ring-1 transition cursor-pointer",
                  onDark
                    ? "text-white ring-on-dark-line hover:bg-on-dark-fill"
                    : "text-ink ring-border hover:bg-surface",
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </Container>
      </div>

      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Logo
              href={`/${lang}`}
              ariaLabel={dict.homeAria}
              onClick={() => setOpen(false)}
            />
            <button
              type="button"
              aria-label={dict.closeMenu}
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink ring-1 ring-border transition hover:bg-surface cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </Container>

        <Container className="flex flex-1 flex-col">
          <nav className="mt-6 flex flex-col gap-1">
            {pageLinks.map((page) => {
              const isActive = isActivePage(page.href);
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-lg font-semibold transition active:bg-brand-soft",
                    isActive ? "text-brand" : "text-ink",
                  )}
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <LocaleSwitcher
              lang={lang}
              ariaLabel={dict.languageAria}
              className="w-fit"
              onNavigate={() => setOpen(false)}
            />
            <ThemeToggle
              variant="row"
              label={dict.appearance}
              ariaLabel={dict.toggleTheme}
            />
            <Button
              href={hrefFor("#get-started")}
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {dict.downloadApp}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
