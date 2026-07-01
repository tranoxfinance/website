"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Smartphone,
  IdCard,
  ScanFace,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Flag } from "@/components/Flag";
import { cn } from "@/lib/utils";

const STEP_MS = 4200;

const STEPS = [
  {
    title: "Create your account",
    body: "Sign up in minutes and verify your identity once. KYC is built in and reusable across every transfer.",
  },
  {
    title: "Set the amount",
    body: "Enter how much to send in NGN or XOF and see the exact rate, fee, and payout before you confirm.",
  },
  {
    title: "Recipient gets paid",
    body: "Money lands in a bank account or mobile wallet in minutes, with live tracking from start to finish.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);

  const onTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    setActive((s) =>
      dx < 0 ? Math.min(s + 1, STEPS.length - 1) : Math.max(s - 1, 0),
    );
  };

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
      const frame = requestAnimationFrame(() => setActive(2));
      return () => cancelAnimationFrame(frame);
    }
    const id = setInterval(() => setActive((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-navy py-14 text-white sm:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -right-16 -top-16 hidden h-64 w-64 rounded-full bg-gold/25 blur-3xl sm:block" />
        <div className="absolute -bottom-20 left-10 hidden h-64 w-64 rounded-full bg-brand/20 blur-3xl sm:block" />
      </div>
      <Container className="relative">
        <div
          ref={ref}
          className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-20"
        >
          <div>
            <Reveal>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                How it works
              </span>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Send across borders in three simple steps.
              </h2>
            </Reveal>

            <ol className="relative mt-10">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <li key={step.title} className="relative flex gap-5 pb-7 last:pb-0">
                  {i < STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-5 top-11 bottom-3 w-px bg-white/12"
                    >
                      <span
                        className={cn(
                          "block h-full w-full origin-top bg-green transition-transform duration-700 ease-out",
                          isDone ? "scale-y-100" : "scale-y-0",
                        )}
                      />
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show step ${i + 1}`}
                    className={cn(
                      "relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition-colors duration-500",
                      isActive || isDone
                        ? "bg-brand text-white"
                        : "border border-white/20 text-white/50",
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </button>

                  <div className="pt-1">
                    <h3
                      className={cn(
                        "text-lg font-bold transition-colors duration-500",
                        isActive ? "text-brand" : "text-white/70",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-sm text-sm leading-relaxed transition-colors duration-500",
                        isActive ? "text-white/65" : "text-white/40",
                      )}
                    >
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
            </ol>
          </div>

          <Reveal delay={120}>
            <div
              className="flex flex-col items-center lg:items-end"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Phone active={active} />
              <p className="mt-4 text-xs text-white/40 lg:hidden">
                Swipe or tap a step to explore
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Phone({ active }: { active: number }) {
  return (
    <div className="w-[240px] rounded-[2.2rem] border border-white/10 bg-slate-900 p-2 shadow-lift">
      <div className="relative h-[460px] overflow-hidden rounded-[1.9rem] bg-white">
        <div className="flex items-center justify-between px-5 pt-4 text-[11px] font-semibold text-slate-900">
          <span className="tabular">9:41</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="h-2.5 w-4 rounded-[2px] bg-slate-800" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
            <span className="h-2.5 w-5 rounded-[3px] border border-slate-800" />
          </div>
        </div>

        <div className="relative h-[calc(100%-3rem)]">
          <Screen active={active === 0}>
            <CreateAccountScreen active={active === 0} />
          </Screen>
          <Screen active={active === 1}>
            <AmountScreen />
          </Screen>
          <Screen active={active === 2}>
            <DeliveredScreen />
          </Screen>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === active ? "w-5 bg-brand" : "w-1.5 bg-slate-200",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Screen({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 px-5 pt-4 transition-opacity duration-500 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {children}
    </div>
  );
}

function ScreenTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-[15px] font-bold text-slate-900">{children}</h4>
  );
}

function CreateAccountScreen({ active }: { active: boolean }) {
  const checks = [
    { icon: Smartphone, label: "Phone number" },
    { icon: IdCard, label: "Identity (BVN)" },
    { icon: ScanFace, label: "Face scan" },
  ];
  return (
    <div>
      <ScreenTitle>Create account</ScreenTitle>

      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand">
          AO
        </div>
        <p className="mt-3 text-sm font-bold text-slate-900">Adunni O.</p>
        <p className="text-[11px] text-slate-400">Lagos, Nigeria</p>
      </div>

      <div className="mt-5 space-y-2.5">
        {checks.map((c, i) => (
          <div
            key={c.label}
            className="flex items-center gap-3 border-b border-slate-100 pb-2.5 last:border-0"
            style={{
              transition: "opacity 500ms ease, transform 500ms ease",
              transitionDelay: `${i * 140}ms`,
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <c.icon className="h-4 w-4 text-slate-400" />
            <span className="text-[13px] font-medium text-slate-700">
              {c.label}
            </span>
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-green text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmountScreen() {
  return (
    <div>
      <ScreenTitle>Send money</ScreenTitle>

      <div className="rounded-2xl bg-slate-50 p-4">
        <span className="text-[11px] font-medium text-slate-400">You send</span>
        <div className="mt-1 flex items-center justify-between">
          <span className="tabular text-2xl font-bold text-slate-900">
            ₦100,000
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1">
            <Flag country="NG" className="h-5 w-5" />
            <span className="text-xs font-bold text-slate-700">NGN</span>
          </span>
        </div>
      </div>

      <div className="relative my-2 flex justify-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-brand text-white">
          <ArrowRight className="h-4 w-4 rotate-90" />
        </span>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <span className="text-[11px] font-medium text-slate-400">
          Recipient gets
        </span>
        <div className="mt-1 flex items-center justify-between">
          <span className="tabular text-2xl font-bold text-green">35,646</span>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1">
            <Flag country="CI" className="h-5 w-5" />
            <span className="text-xs font-bold text-slate-700">XOF</span>
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-400">
        <span>Rate</span>
        <span className="tabular font-semibold text-slate-600">
          1 NGN = 0.3565 XOF
        </span>
      </div>

      <div className="mt-5 flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-bold text-white">
        Confirm transfer
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}

function DeliveredScreen() {
  const track = ["Sent", "Processing", "Delivered"];
  return (
    <div className="flex h-full flex-col">
      <div className="mt-2 flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green text-white">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <p className="mt-4 text-base font-bold text-slate-900">
          Money delivered
        </p>
        <p className="tabular mt-1 text-2xl font-bold text-green">CFA 35,646</p>
        <p className="mt-1 text-[12px] text-slate-400">
          to Aïcha Koné · Abidjan
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {track.map((label) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[13px] font-medium text-slate-700">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-auto pb-2 text-center text-[11px] text-slate-400">
        Delivered in 1m 12s
      </p>
    </div>
  );
}
