"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, ShieldCheck, Sparkles, Clock3 } from "lucide-react";
import { Flag } from "@/components/Flag";
import { cn } from "@/lib/utils";
import { TranoxMark } from "@/components/TranoxMark";

const STEP_COUNT = 4;
const STEP_MS = 2600;

const W = 300;
const H = 600;
const D = 22;

function Edge({
  style,
  vertical,
}: {
  style: React.CSSProperties;
  vertical?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 rounded-[8px]"
      style={{
        ...style,
        background: vertical
          ? "linear-gradient(90deg,#0b1220,#41506b 50%,#0b1220)"
          : "linear-gradient(180deg,#0b1220,#41506b 50%,#0b1220)",
      }}
    />
  );
}

export function PhoneDemo({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setStep(3));
      return () => cancelAnimationFrame(frame);
    }
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEP_COUNT);
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("relative [perspective:1800px]", className)}>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,var(--color-brand)_0%,transparent_60%)] opacity-30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-6 top-10 -z-10 hidden h-40 w-40 animate-blob rounded-full bg-green/40 blur-3xl sm:block"
      />
      <div
        aria-hidden
        className="absolute -left-8 bottom-12 -z-10 hidden h-40 w-40 animate-blob rounded-full bg-gold/40 blur-3xl [animation-delay:3s] sm:block"
      />

      <div
        aria-hidden
        className="absolute -bottom-2 left-1/2 -z-10 h-12 w-60 -translate-x-1/2 rounded-[50%] bg-black/30 blur-2xl dark:bg-black/50"
      />

      <div className="animate-float-slow [transform-style:preserve-3d]">
        <div
          className={cn(
            "relative mx-auto [transform-style:preserve-3d]",
            spin ? "phone-spin" : "[transform:rotateY(-18deg)_rotateX(3deg)]",
          )}
          style={{ width: W, height: H }}
        >
          <Edge
            vertical
            style={{ width: D, height: H - 56, marginLeft: -D / 2, marginTop: -(H - 56) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)` }}
          />
          <Edge
            vertical
            style={{ width: D, height: H - 56, marginLeft: -D / 2, marginTop: -(H - 56) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }}
          />
          <Edge
            style={{ width: W - 56, height: D, marginLeft: -(W - 56) / 2, marginTop: -D / 2, transform: `rotateX(90deg) translateZ(${H / 2}px)` }}
          />
          <Edge
            style={{ width: W - 56, height: D, marginLeft: -(W - 56) / 2, marginTop: -D / 2, transform: `rotateX(-90deg) translateZ(${H / 2}px)` }}
          />

          <div
            className="phone-face absolute left-1/2 top-1/2 rounded-[2.8rem] border border-white/15 bg-gradient-to-b from-slate-800 to-slate-950 p-2.5 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.65)] ring-1 ring-black/40"
            style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transform: `translateZ(${D / 2}px)` }}
          >
            <div className="absolute left-1/2 top-3.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

            <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-white via-white to-[#eef4ff]">
              <ScreenChrome />

              <div className="relative h-[calc(100%-3.25rem)]">
                <Screen active={step === 0}>
                  <AmountScreen />
                </Screen>
                <Screen active={step === 1}>
                  <ReviewScreen />
                </Screen>
                <Screen active={step === 2}>
                  <ProcessingScreen />
                </Screen>
                <Screen active={step === 3}>
                  <SuccessScreen />
                </Screen>
              </div>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {Array.from({ length: STEP_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === step ? "w-5 bg-[#0d8fd2]" : "w-1.5 bg-slate-300",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <PhoneBack />
        </div>
      </div>
    </div>
  );
}

function PhoneBack() {
  return (
    <div
      className="phone-face absolute left-1/2 top-1/2 overflow-hidden rounded-[2.8rem] border border-white/10 bg-gradient-to-br from-[#1a2742] via-[#0c1627] to-[#060c18] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.65)] ring-1 ring-black/40"
      style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transform: `rotateY(180deg) translateZ(${D / 2}px)` }}
    >
      <div className="relative h-full">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.08)_45%,transparent_60%)]"
        />

        <div className="absolute left-6 top-6 grid h-24 w-24 grid-cols-2 gap-2 rounded-3xl bg-black/50 p-2.5 ring-1 ring-white/10 backdrop-blur">
          <Lens />
          <Lens />
          <Lens />
          <span className="flex items-center justify-center">
            <span className="h-3 w-3 rounded-full bg-amber-100/80 shadow-[0_0_8px_rgba(255,240,200,0.6)]" />
          </span>
        </div>

        <div className="absolute right-7 top-9 h-3 w-3 rounded-full bg-white/10 ring-1 ring-white/15" />

        <div className="flex h-full flex-col items-center justify-center gap-5">
          <TranoxMark className="h-24 w-24 opacity-95 drop-shadow-[0_8px_24px_rgba(13,143,210,0.5)]" />
          <span className="text-2xl font-bold tracking-tight text-white/90">
            Tranox
          </span>
        </div>

        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
          Fast · Secure · Global
        </span>
      </div>
    </div>
  );
}

function Lens() {
  return (
    <span className="flex items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-black ring-2 ring-white/10">
      <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#3a4a66] to-[#0a1120] ring-1 ring-white/20">
        <span className="block h-1.5 w-1.5 translate-x-1 translate-y-1 rounded-full bg-[#6ea8ff]/40" />
      </span>
    </span>
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
        "absolute inset-0 px-5 pt-3 transition-all duration-700 ease-out",
        active
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

function ScreenChrome() {
  return (
    <div className="flex items-center justify-between px-5 pt-4 text-[11px] font-semibold text-slate-900">
      <span className="tabular">9:41</span>
      <div className="flex items-center gap-1.5 text-slate-700">
        <span className="h-2.5 w-4 rounded-[2px] bg-slate-800" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
        <span className="h-2.5 w-5 rounded-[3px] border border-slate-800" />
      </div>
    </div>
  );
}

function AppHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d8fd2] text-xs font-bold text-white">
          T
        </span>
        <span className="text-sm font-bold text-slate-900">{title}</span>
      </div>
      <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#0d8fd2] to-[#95c015]" />
    </div>
  );
}

function AmountScreen() {
  return (
    <div>
      <AppHeader title="Send money" />
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-[11px] font-medium text-slate-400">You send</span>
        <div className="mt-1 flex items-center justify-between">
          <span className="tabular text-2xl font-bold text-slate-900">
            ₦100,000
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
            <Flag country="NG" className="h-5 w-5" />
            <span className="text-xs font-bold text-slate-700">NGN</span>
          </span>
        </div>
      </div>

      <div className="relative my-2 flex justify-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#0d8fd2] text-white shadow-md">
          <ArrowRight className="h-4 w-4 rotate-90" />
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-[11px] font-medium text-slate-400">
          Recipient gets
        </span>
        <div className="mt-1 flex items-center justify-between">
          <span className="tabular text-2xl font-bold text-[#95c015]">
            35,646
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
            <Flag country="CI" className="h-5 w-5" />
            <span className="text-xs font-bold text-slate-700">XOF</span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-[11px] text-slate-500">
        <span>Rate</span>
        <span className="tabular font-semibold text-slate-700">
          1 NGN = 0.3565 XOF
        </span>
      </div>

      <TapButton label="Continue" />
    </div>
  );
}

function ReviewScreen() {
  return (
    <div>
      <AppHeader title="Review transfer" />
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <Flag country="CI" className="h-11 w-11" />
        <div>
          <div className="text-sm font-bold text-slate-900">Aïcha Koné</div>
          <div className="text-[11px] text-slate-400">Abidjan · Wave wallet</div>
        </div>
      </div>

      <dl className="mt-3 space-y-2.5 rounded-2xl border border-slate-200 bg-white p-4 text-[12px] shadow-sm">
        <Line label="They receive" value="CFA 35,646" strong />
        <Line label="Transfer fee" value="₦900" />
        <Line label="Rate" value="0.3565" />
        <div className="h-px bg-slate-100" />
        <Line label="Total to pay" value="₦100,900" strong />
      </dl>

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#f0f7de] px-3.5 py-2.5 text-[11px] font-medium text-[#95c015]">
        <ShieldCheck className="h-4 w-4" />
        Rate locked · arrives in minutes
      </div>

      <TapButton label="Slide to send" />
    </div>
  );
}

function ProcessingScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center pb-10">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#0d8fd2]/30" />
        <span className="absolute inset-0 rounded-full border-4 border-slate-100" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#0d8fd2]" />
        <Sparkles className="h-8 w-8 text-[#0d8fd2]" />
      </div>
      <p className="mt-6 text-sm font-bold text-slate-900">Sending securely</p>
      <p className="mt-1 text-[11px] text-slate-400">Encrypting your transfer…</p>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center pb-10 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#95c015]/12">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#95c015]/30" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#95c015] shadow-lg shadow-[#95c015]/40">
          <Check className="h-9 w-9 text-white" strokeWidth={3} />
        </span>
      </div>
      <p className="mt-6 text-lg font-bold text-slate-900">Money sent</p>
      <p className="mt-1 tabular text-2xl font-bold text-[#95c015]">
        CFA 35,646
      </p>
      <p className="mt-1 text-[12px] text-slate-500">to Aïcha Koné · Abidjan</p>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600">
        <Clock3 className="h-3.5 w-3.5" /> Delivered in 1m 12s
      </span>
    </div>
  );
}

function Line({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={cn("text-slate-400", strong && "font-semibold text-slate-600")}>
        {label}
      </dt>
      <dd
        className={cn(
          "tabular font-semibold text-slate-900",
          strong && "text-sm",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function TapButton({ label }: { label: string }) {
  return (
    <div className="relative mt-4">
      <div className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0d8fd2] to-[#0a72a8] text-sm font-bold text-white shadow-lg shadow-[#0d8fd2]/30">
        {label}
        <ArrowRight className="h-4 w-4" />
      </div>
      <span className="absolute -bottom-1 right-6 h-7 w-7 animate-pulse-ring rounded-full bg-white/50" />
      <span className="absolute -bottom-1 right-8 h-4 w-4 rounded-full border-2 border-slate-700/60 bg-white/80" />
    </div>
  );
}
