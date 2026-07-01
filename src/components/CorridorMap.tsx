"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Flag } from "@/components/Flag";
import { cn } from "@/lib/utils";
import {
  VB_W,
  VB_H,
  NG_ID,
  CI_ID,
  NG_POINTS,
  CI_POINTS,
  NG_LABEL,
  CI_LABEL,
  COUNTRIES,
  type Point,
} from "@/lib/mapPaths";

const ORANGE = "#ff9a3c";

const PAIRS = [
  { ng: "₦100,000", ci: "CFA 35,646" },
  { ng: "₦50,000", ci: "CFA 17,823" },
  { ng: "₦250,000", ci: "CFA 89,100" },
  { ng: "₦139,200", ci: "CFA 50,000" },
  { ng: "₦334,080", ci: "CFA 120,000" },
  { ng: "₦69,600", ci: "CFA 25,000" },
];

interface Tx {
  id: number;
  from: Point;
  to: Point;
  ngToCi: boolean;
  ng: string;
  ci: string;
  born: number;
}

const LIFE = 2600;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pct(x: number, y: number) {
  return { left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%` };
}

export function CorridorMap({ className }: { className?: string }) {
  const [animate, setAnimate] = useState(false);
  const [txs, setTxs] = useState<Tx[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!animate) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const ngToCi = Math.random() < 0.5;
      const from = pick(ngToCi ? NG_POINTS : CI_POINTS);
      const to = pick(ngToCi ? CI_POINTS : NG_POINTS);
      const pair = pick(PAIRS);
      const id = nextId.current++;
      const now = Date.now();
      setTxs((prev) => [
        ...prev.filter((t) => now - t.born < LIFE),
        { id, from, to, ngToCi, ng: pair.ng, ci: pair.ci, born: now },
      ]);
      timer = setTimeout(tick, 650 + Math.random() * 850);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [animate]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[480/540] w-full max-w-[17rem] sm:max-w-xl",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute left-[26%] top-[42%] -z-10 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-green)_0%,transparent_65%)] opacity-20 blur-2xl"
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-full w-full"
        role="img"
        aria-label="Real-time transfers flowing between Nigeria and Ivory Coast"
      >
        <g className="stroke-background" strokeWidth={0.7}>
          {COUNTRIES.map((c) =>
            c.id === NG_ID || c.id === CI_ID ? null : (
              <path key={c.id} d={c.d} className="fill-ink/15" />
            ),
          )}
        </g>

        {COUNTRIES.filter((c) => c.id === NG_ID || c.id === CI_ID).map((c) => (
          <path
            key={`fill-${c.id}`}
            d={c.d}
            className={c.id === NG_ID ? "fill-green/80 stroke-green" : "fill-brand/80 stroke-brand"}
            strokeWidth={0.5}
          />
        ))}

        {txs.map((t) => {
          const mx = (t.from[0] + t.to[0]) / 2;
          const my = Math.min(t.from[1], t.to[1]) - 46;
          const d = `M ${t.from[0]} ${t.from[1]} Q ${mx} ${my} ${t.to[0]} ${t.to[1]}`;
          return (
            <path
              key={t.id}
              d={d}
              pathLength={1}
              fill="none"
              stroke={ORANGE}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray="1 1"
              style={{ animation: "tx-draw 2.4s ease-out both" }}
            />
          );
        })}
      </svg>

      {txs.map((t) => (
        <div key={t.id}>
          <Glow point={t.from} delay={0} />
          <Glow point={t.to} delay={620} />
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={pct(t.from[0], t.from[1] - 28)}
          >
            <div
              className="flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[9px] font-semibold text-ink shadow-lift sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]"
              style={{ animation: "tx-card 2.4s ease-out both" }}
            >
              <span className="tabular">{t.ci}</span>
              {t.ngToCi ? (
                <ArrowLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3" style={{ color: ORANGE }} />
              ) : (
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" style={{ color: ORANGE }} />
              )}
              <span className="tabular">{t.ng}</span>
            </div>
          </div>
        </div>
      ))}

      <CityTag country="CI" name="Ivory Coast" point={CI_LABEL} side="left" />
      <CityTag country="NG" name="Nigeria" point={NG_LABEL} side="right" />
    </div>
  );
}

function Glow({ point, delay }: { point: Point; delay: number }) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={pct(point[0], point[1])}
    >
      <div
        className="h-12 w-12 rounded-full sm:h-20 sm:w-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,160,70,0.55) 0%, rgba(255,154,60,0.22) 38%, transparent 72%)",
          filter: "blur(6px)",
          animation: `tx-glow 1.6s ease-out ${delay}ms both`,
        }}
      />
    </div>
  );
}

function CityTag({
  country,
  name,
  point,
  side,
}: {
  country: "NG" | "CI";
  name: string;
  point: { x: number; y: number };
  side: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "absolute flex translate-y-3 items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1 shadow-soft sm:gap-2 sm:rounded-xl sm:px-2.5 sm:py-1.5",
        side === "left" ? "-translate-x-[88%]" : "-translate-x-[12%]",
      )}
      style={{ left: `${(point.x / VB_W) * 100}%`, top: `${(point.y / VB_H) * 100}%` }}
    >
      <Flag country={country} className="h-4 w-4 sm:h-6 sm:w-6" />
      <span className="text-[10px] font-bold text-ink sm:text-xs">{name}</span>
    </div>
  );
}
