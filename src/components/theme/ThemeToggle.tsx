"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "row";
  label?: string;
}

export function ThemeToggle({
  className,
  variant = "icon",
  label = "Appearance",
}: ThemeToggleProps) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  function toggle() {
    const next = !isDark();
    const el = document.documentElement;
    el.classList.toggle("dark", next);
    el.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      void 0;
    }
    window.dispatchEvent(new Event("themechange"));
  }

  const glyphs = (
    <>
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          mounted && dark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          mounted && dark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0",
        )}
      />
    </>
  );

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle dark mode"
        aria-pressed={dark}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-ink-soft transition active:bg-surface cursor-pointer",
          className,
        )}
      >
        <span className="text-sm font-medium">{label}</span>
        <span className="relative flex h-6 w-6 items-center justify-center text-ink">
          {glyphs}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full text-ink-soft ring-1 ring-border transition hover:text-brand hover:ring-brand/40 cursor-pointer",
        className,
      )}
    >
      {glyphs}
    </button>
  );
}
