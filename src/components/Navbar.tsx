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

const BAR_INSET = "px-3 sm:px-8";
const BAR_PADDING = "p-1 sm:p-2";
const BAR_ROW = "flex h-12 items-center justify-between gap-2 pl-2";
const MENU_BUTTON =
  "flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-border transition hover:bg-surface cursor-pointer";

interface NavbarProps {
  lang: Locale;
  dict: Dictionary["nav"];
}

export function Navbar({ lang, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const hrefFor = (hash: string) => (isHome ? hash : `/${lang}${hash}`);
  const pageLinks = [
    { href: hrefFor("#how-it-works"), label: dict.howItWorks },
    { href: `/${lang}/rates`, label: dict.liveRates },
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/careers`, label: dict.careers },
    { href: `/${lang}/news`, label: dict.news },
    { href: hrefFor("#faq"), label: dict.faq },
  ];
  const isActivePage = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

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
    <header className="sticky top-0 z-50 pt-2">
      <Container className={BAR_INSET}>
        <div
          className={cn(
            "rounded-2xl bg-background ring-1 ring-border transition-shadow duration-300 lg:bg-background/80 lg:backdrop-blur-lg",
            BAR_PADDING,
            scrolled && "shadow-soft",
          )}
        >
          <nav className={BAR_ROW}>
            <Logo
              href={`/${lang}`}
              ariaLabel={dict.homeAria}
              className="shrink-0"
            />

            <div className="hidden items-center xl:flex">
              {pageLinks.map((page) => {
                const isActive = isActivePage(page.href);
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors hover:text-brand",
                      isActive ? "text-brand" : "text-ink-soft",
                    )}
                  >
                    {page.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-2.5 bottom-1 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <LocaleSwitcher lang={lang} ariaLabel={dict.languageAria} />
              <ThemeToggle ariaLabel={dict.toggleTheme} />
              <Button
                href={hrefFor("#get-started")}
                size="sm"
                className="whitespace-nowrap"
              >
                {dict.downloadApp}
              </Button>
            </div>

            <div className="flex items-center xl:hidden">
              <button
                type="button"
                aria-label={dict.openMenu}
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className={MENU_BUTTON}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </Container>

      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background pt-2 transition-transform duration-300 ease-out xl:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <Container className={BAR_INSET}>
          <div className={BAR_PADDING}>
            <div className={BAR_ROW}>
              <Logo
                href={`/${lang}`}
                ariaLabel={dict.homeAria}
                className="shrink-0"
                onClick={() => setOpen(false)}
              />
              <button
                type="button"
                aria-label={dict.closeMenu}
                onClick={() => setOpen(false)}
                className={MENU_BUTTON}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>

        <Container className="flex flex-1 flex-col">
          <nav className="mt-3 flex flex-col gap-1">
            {pageLinks.map((page) => {
              const isActive = isActivePage(page.href);
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-lg font-semibold transition active:bg-brand-soft",
                    isActive ? "text-brand" : "text-ink",
                  )}
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
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
