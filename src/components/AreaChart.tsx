interface AreaChartProps {
  data: number[];
  labels: string[];
  ariaLabel: string;
}

const W = 560;
const H = 220;
const PAD_X = 12;
const PAD_TOP = 18;
const PAD_BOTTOM = 34;

function buildPoints(data: number[]) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = (W - PAD_X * 2) / (data.length - 1);
  const usableH = H - PAD_TOP - PAD_BOTTOM;
  return data.map((value, i) => ({
    x: PAD_X + i * stepX,
    y: PAD_TOP + usableH - ((value - min) / span) * usableH,
  }));
}

function smoothPath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export function AreaChart({ data, labels, ariaLabel }: AreaChartProps) {
  const points = buildPoints(data);
  const line = smoothPath(points);
  const baseline = H - PAD_BOTTOM;
  const area = `${line} L ${points[points.length - 1].x},${baseline} L ${points[0].x},${baseline} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--color-brand)", stopOpacity: 0.28 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-brand)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={PAD_X}
          x2={W - PAD_X}
          y1={PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * f}
          y2={PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * f}
          className="stroke-border"
          strokeWidth={1}
          strokeDasharray="3 5"
        />
      ))}

      <path d={area} fill="url(#areaFill)" />
      <path
        d={line}
        fill="none"
        className="text-brand"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      <circle cx={last.x} cy={last.y} r={5.5} className="fill-brand" />
      <circle cx={last.x} cy={last.y} r={10} className="fill-brand/20" />

      {labels.map((label, i) =>
        label ? (
          <text
            key={i}
            x={points[i].x}
            y={H - 10}
            textAnchor="middle"
            className="fill-muted text-[11px]"
          >
            {label}
          </text>
        ) : null,
      )}
    </svg>
  );
}
