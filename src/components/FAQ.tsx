"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Which directions can I send money?",
    a: "Tranox supports both directions of the corridor: send Nigerian Naira (NGN) to recipients in Ivory Coast as West African CFA francs (XOF), and send XOF from Ivory Coast to recipients in Nigeria as NGN.",
  },
  {
    q: "How fast do transfers arrive?",
    a: "The large majority of transfers are paid out within minutes. Timing can vary slightly depending on the recipient's bank or mobile-money provider, and you can track the status live at every step.",
  },
  {
    q: "How are the exchange rate and fees calculated?",
    a: "You always see the exact exchange rate and a single transparent fee before you confirm. The rate is locked the moment you confirm, so the amount your recipient receives never changes after you send.",
  },
  {
    q: "How do I fund a transfer?",
    a: "You can fund transfers by bank transfer, debit card, or mobile money, depending on your country. Recipients can be paid into a bank account, a mobile wallet, or via cash pickup.",
  },
  {
    q: "Is Tranox secure and regulated?",
    a: "Yes. Tranox operates under regulatory oversight in each market with full KYC and AML programs. Funds are safeguarded with regulated partners, and every transaction is encrypted and monitored for fraud.",
  },
  {
    q: "Are there limits on how much I can send?",
    a: "Transfer limits apply per transaction and depend on your verification level. Higher limits unlock once your account is fully verified, and you can reach out to support if you need to move larger amounts.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                FAQ
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Questions, answered
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Everything you need to know before your first transfer.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="text-sm font-bold text-ink">
                  Still have questions?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Our support team is here to help, every day of the week.
                </p>
                <a
                  href="#contacts"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand"
                >
                  Contact support
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3 lg:col-span-3">
            {FAQS.map((item, index) => {
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
