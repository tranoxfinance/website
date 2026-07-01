"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const HOLD_MS = 700;
const FADE_MS = 450;

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    document.body.style.overflow = "hidden";
    const fadeTimer = setTimeout(() => setFading(true), HOLD_MS);
    const hideTimer = setTimeout(() => setVisible(false), HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-[450ms] ease-out motion-reduce:hidden",
        fading ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="absolute h-16 w-48 rounded-full gradient-glow blur-xl sm:h-20 sm:w-56"
        />
        <img
          src="/tranox-logo.svg"
          alt=""
          className={cn(
            "relative h-10 w-auto animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both] transition-transform duration-[450ms] ease-out sm:h-12",
            fading ? "scale-95" : "scale-100",
          )}
        />
      </div>
    </div>
  );
}
