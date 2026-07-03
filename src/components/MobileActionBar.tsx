"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Route, HelpCircle, Download } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface MobileActionBarProps {
  lang: Locale;
  dict: Dictionary["mobileBar"];
}

export function MobileActionBar({ lang, dict }: MobileActionBarProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const [active, setActive] = useState("");

  const tabs = [
    { label: dict.home, icon: Home, id: "" },
    { label: dict.howItWorks, icon: Route, id: "how-it-works" },
    { label: dict.faq, icon: HelpCircle, id: "faq" },
  ];

  useEffect(() => {
    if (!isHome) return;
    const ids = ["how-it-works", "faq"];
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.5;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <nav
      aria-label={dict.quickActions}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-1 px-3 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          const isTop = tab.id === "";
          const href = tab.id
            ? isHome
              ? `#${tab.id}`
              : `/${lang}#${tab.id}`
            : isHome
              ? "#"
              : `/${lang}`;

          const handleClick = (
            event: React.MouseEvent<HTMLAnchorElement>,
          ) => {
            if (isTop && isHome) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          };

          return (
            <a
              key={tab.label}
              href={href}
              onClick={handleClick}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors active:bg-surface",
                isActive ? "text-brand" : "text-ink-soft",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              {tab.label}
            </a>
          );
        })}

        <Link
          href={isHome ? "#get-started" : `/${lang}#get-started`}
          className="ml-1 flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-soft transition active:translate-y-px"
        >
          <Download className="h-4 w-4" strokeWidth={2} />
          {dict.getApp}
        </Link>
      </div>
    </nav>
  );
}
