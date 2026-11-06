"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AmbientVideoProps {
  src: string;
  className?: string;
}

export function AmbientVideo({ src, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    video.play().catch(() => undefined);
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="auto"
      aria-hidden
      className={cn("motion-reduce:hidden", className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
