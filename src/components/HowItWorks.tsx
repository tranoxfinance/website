"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { WorldDotMap } from "@/components/WorldDotMap";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const STEP_MS = 4200;

export function HowItWorks({ dict }: { dict: Dictionary["how"] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const stepCount = dict.steps.length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setActive(stepCount - 1));
      return () => cancelAnimationFrame(frame);
    }
    const id = setInterval(() => setActive((s) => (s + 1) % stepCount), STEP_MS);
    return () => clearInterval(id);
  }, [inView, stepCount]);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-navy py-14 text-white sm:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <WorldDotMap className="mask-fade-x absolute left-1/2 top-1/2 h-[85%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div className="absolute -right-16 -top-16 hidden h-64 w-64 rounded-full bg-gold/25 blur-3xl sm:block" />
        <div className="absolute -bottom-20 left-10 hidden h-64 w-64 rounded-full bg-brand/20 blur-3xl sm:block" />
      </div>
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {dict.tag}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.heading}
            </h2>
          </div>
        </Reveal>

        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-10 sm:grid-cols-3"
        >
          {dict.steps.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <Reveal key={step.title} delay={i * 90}>
                <div className="flex flex-col items-start">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={dict.stepAria.replace("{step}", String(i + 1))}
                    className={cn(
                      "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition-colors duration-500",
                      isActive || isDone
                        ? "bg-brand text-white"
                        : "border border-white/20 text-white/50",
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </button>

                  <h3
                    className={cn(
                      "mt-4 text-lg font-bold transition-colors duration-500",
                      isActive ? "text-brand" : "text-white/70",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed transition-colors duration-500",
                      isActive ? "text-white/65" : "text-white/40",
                    )}
                  >
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
