"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

export function Faq({
  dict,
  items,
}: {
  dict: Dictionary["faq"];
  items: FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {dict.tag}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {dict.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {dict.sub}
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="text-sm font-bold text-ink">{dict.stillTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {dict.stillBody}
                </p>
                <a
                  href="#contacts"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand"
                >
                  {dict.contact}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3 lg:col-span-3">
            {items.map((item, index) => {
              const isOpen = open === index;
              return (
                <Reveal key={item.q} delay={index * 60}>
                  <div
                    className={cn(
                      "rounded-2xl border bg-card transition-colors duration-300",
                      isOpen
                        ? "border-brand/40 shadow-soft"
                        : "border-border hover:border-border-strong",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span
                        className={cn(
                          "text-[15px] font-semibold transition-colors duration-300 sm:text-base",
                          isOpen ? "text-brand" : "text-ink",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                          isOpen
                            ? "rotate-180 bg-brand text-white"
                            : "bg-brand-soft text-brand",
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={cn(
                            "px-5 pb-5 text-[15px] leading-relaxed text-ink-soft transition-transform duration-300 ease-out sm:px-6",
                            isOpen ? "translate-y-0" : "-translate-y-1",
                          )}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
