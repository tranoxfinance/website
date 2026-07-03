"use client";

import { useEffect, useState } from "react";
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
}

export function Navbar({ lang, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const hrefFor = (hash: string) => (isHome ? hash : `/${lang}${hash}`);

  useEffect(() => {
    const ids = dict.links.map((link) => link.hash.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const line = window.scrollY + 120;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dict.links]);

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
            <Logo href={`/${lang}`} ariaLabel={dict.homeAria} />

            <div className="hidden items-center gap-2 lg:flex">
              {dict.links.map((link) => {
                const isActive = activeId === link.hash.slice(1);
                return (
                  <a
                    key={link.hash}
                    href={hrefFor(link.hash)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative px-3 py-2 text-sm font-medium transition-colors hover:text-brand",
                      isActive ? "text-brand" : "text-ink-soft",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <LocaleSwitcher lang={lang} ariaLabel={dict.languageAria} />
              <ThemeToggle ariaLabel={dict.toggleTheme} />
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
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink ring-1 ring-border transition hover:bg-surface cursor-pointer"
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
          "fixed inset-0 z-50 flex flex-col bg-background transition-transform duration-300 ease-out lg:hidden",
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
            {dict.links.map((link) => {
              const isActive = activeId === link.hash.slice(1);
              return (
                <a
                  key={link.hash}
                  href={hrefFor(link.hash)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-lg font-semibold transition active:bg-brand-soft",
                    isActive ? "text-brand" : "text-ink",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 py-6">
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
