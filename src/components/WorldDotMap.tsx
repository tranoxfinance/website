import { WORLD_DOTS, WORLD_VB_W, WORLD_VB_H } from "@/lib/worldDots";

export function WorldDotMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WORLD_VB_W} ${WORLD_VB_H}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {WORLD_DOTS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" />
      ))}
    </svg>
  );
}
