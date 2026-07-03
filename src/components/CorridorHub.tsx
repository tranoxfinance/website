import { Landmark, Wallet, Banknote } from "lucide-react";
import { Flag } from "@/components/Flag";
import { TranoxMark } from "@/components/TranoxMark";
import type { Dictionary } from "@/i18n/dictionaries";

type PayoutLabels = Dictionary["about"]["payouts"];

const HUB = { x: 30, y: 50 };
const NG = { x: 30, y: 9 };
const CI = { x: 30, y: 91 };
const LEAF_X = 66;

function path(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mx} ${from.y} ${mx} ${to.y} ${to.x} ${to.y}`;
}

export function CorridorHub({ labels }: { labels: PayoutLabels }) {
  const payouts = [
    { icon: Landmark, label: labels.bank, y: 30 },
    { icon: Wallet, label: labels.wallet, y: 50 },
    { icon: Banknote, label: labels.cash, y: 70 },
  ];

  return (
    <div className="relative mx-auto mt-5 aspect-[5/4] w-full max-w-[14rem]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        <line
          x1={NG.x}
          y1={NG.y}
          x2={CI.x}
          y2={CI.y}
          className="stroke-brand/60"
          strokeWidth={0.9}
          strokeLinecap="round"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: "draw 1s ease-out forwards",
          }}
        />
        {payouts.map((p, i) => (
          <path
            key={p.label}
            d={path(HUB, { x: LEAF_X, y: p.y })}
            fill="none"
            className="stroke-white/30"
            strokeWidth={0.7}
            strokeLinecap="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: `draw 0.8s ease-out ${500 + i * 140}ms forwards`,
            }}
          />
        ))}
      </svg>

      <Node x={NG.x} y={NG.y}>
        <Flag country="NG" className="h-8 w-8 ring-2 ring-white/15" />
      </Node>

      <Node x={CI.x} y={CI.y}>
        <Flag country="CI" className="h-8 w-8 ring-2 ring-white/15" />
      </Node>

      <Node x={HUB.x} y={HUB.y}>
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lift">
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/40"
          />
          <TranoxMark className="relative h-7 w-7" />
        </span>
      </Node>

      {payouts.map((p) => {
        const Icon = p.icon;
        return (
          <Node key={p.label} x={LEAF_X} y={p.y} anchor="left">
            <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 py-1 pl-1.5 pr-2.5 backdrop-blur-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Icon className="h-3 w-3" strokeWidth={2} />
              </span>
              <span className="text-[11px] font-semibold text-white/80">
                {p.label}
              </span>
            </span>
          </Node>
        );
      })}
    </div>
  );
}

function Node({
  x,
  y,
  anchor = "center",
  children,
}: {
  x: number;
  y: number;
  anchor?: "center" | "left";
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute whitespace-nowrap"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform:
          anchor === "left"
            ? "translate(0, -50%)"
            : "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  );
}
