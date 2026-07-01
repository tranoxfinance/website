"use client";

import { useEffect, useState } from "react";

interface Segment {
  text: string;
  className?: string;
}

const SEGMENTS: Segment[] = [
  { text: "Send " },
  { text: "money", className: "text-brand" },
  { text: " across " },
  { text: "borders,", className: "gradient-text animate-gradient" },
  { text: " the moment it matters." },
];

const TOTAL = SEGMENTS.reduce((sum, s) => sum + s.text.length, 0);
const SPEED = 42;

const STARTS = (() => {
  const arr: number[] = [];
  let acc = 0;
  for (const s of SEGMENTS) {
    arr.push(acc);
    acc += s.text.length;
  }
  return arr;
})();

export function TypewriterHeadline({ className }: { className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setCount(TOTAL));
      return () => cancelAnimationFrame(frame);
    }
    let c = 0;
    const id = setInterval(() => {
      c += 1;
      setCount(c);
      if (c >= TOTAL) clearInterval(id);
    }, SPEED);
    return () => clearInterval(id);
  }, []);

  const done = count >= TOTAL;

  return (
    <h1 className={className}>
      {SEGMENTS.map((s, i) => {
        const start = STARTS[i];
        const show = Math.max(0, Math.min(s.text.length, count - start));
        const active = !done && count >= start && count < start + s.text.length;
        return (
          <span key={i} className={s.className}>
            {s.text.slice(0, show)}
            {active ? <Caret /> : null}
            <span className="opacity-0">{s.text.slice(show)}</span>
          </span>
        );
      })}
      {done ? <Caret /> : null}
    </h1>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[0.82em] w-[0.07em] translate-y-[0.06em] rounded-[1px] bg-brand align-baseline [animation:caret-blink_1s_steps(1)_infinite]"
    />
  );
}
