"use client";

import { useEffect, useMemo, useState } from "react";

export interface HeadlineSegment {
  text: string;
  style?: string;
}

const STYLE_CLASSES: Record<string, string> = {
  brand: "text-brand",
  gradient: "gradient-text animate-gradient",
};

const SPEED = 42;

interface TypewriterHeadlineProps {
  segments: readonly HeadlineSegment[];
  className?: string;
}

export function TypewriterHeadline({
  segments,
  className,
}: TypewriterHeadlineProps) {
  const total = useMemo(
    () => segments.reduce((sum, s) => sum + s.text.length, 0),
    [segments],
  );
  const starts = useMemo(() => {
    const arr: number[] = [];
    let acc = 0;
    for (const s of segments) {
      arr.push(acc);
      acc += s.text.length;
    }
    return arr;
  }, [segments]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setCount(total));
      return () => cancelAnimationFrame(frame);
    }
    let c = 0;
    const id = setInterval(() => {
      c += 1;
      setCount(c);
      if (c >= total) clearInterval(id);
    }, SPEED);
    return () => clearInterval(id);
  }, [total]);

  const done = count >= total;

  return (
    <h1 className={className}>
      {segments.map((s, i) => {
        const start = starts[i];
        const show = Math.max(0, Math.min(s.text.length, count - start));
        const active = !done && count >= start && count < start + s.text.length;
        return (
          <span key={i} className={s.style ? STYLE_CLASSES[s.style] : undefined}>
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
