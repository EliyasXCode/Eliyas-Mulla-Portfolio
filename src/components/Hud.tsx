"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { DURATION, EASE } from "@/lib/motion";

export function LiveStatus({
  statusWords = ["BUILDING", "LEARNING", "SHIPPING", "EXPLORING"],
  timeZone = "Asia/Kolkata",
  locationLabel = "Pune / GMT+5:30",
  statusBadge = "Open to work",
}: {
  statusWords?: string[];
  timeZone?: string;
  locationLabel?: string;
  statusBadge?: string;
}) {
  const [time, setTime] = useState<string | null>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phraseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  useEffect(() => {
    const el = phraseRef.current;
    const holdMs = (DURATION.ghostHold + DURATION.indicatorExit * 2) * 1000;
    const id = setInterval(() => {
      const next = () => setPhraseIdx((i) => (i + 1) % statusWords.length);
      if (prefersReducedMotion() || !el) {
        next();
        return;
      }
      gsap.to(el, {
        opacity: 0,
        duration: DURATION.indicatorExit,
        ease: EASE.boot,
        onComplete: () => {
          next();
          gsap.to(el, {
            opacity: 1,
            duration: DURATION.indicatorExit,
            ease: EASE.boot,
          });
        },
      });
    }, holdMs);
    return () => clearInterval(id);
  }, [statusWords.length]);

  return (
    <div className="flex flex-col gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-500">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="tabular-nums text-zinc-300 font-semibold">{time ?? "--:--:--"}</span>
        <span>{locationLabel}</span>
        <span ref={phraseRef} className="text-blue-400 font-medium">
          / {statusWords[phraseIdx]}
        </span>
      </div>
      {statusBadge && (
        <div className="flex items-center gap-2 text-[0.625rem] tracking-[0.2em] text-zinc-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          </span>
          <span className="text-zinc-300">{statusBadge}</span>
        </div>
      )}
    </div>
  );
}

export function CodingSince({ year = "2022" }: { year?: string }) {
  return (
    <div className="text-right font-mono text-[0.625rem] uppercase tracking-[0.2em]">
      <span className="block text-zinc-200 font-semibold text-xs tracking-[0.1em]">{year}</span>
      <span className="block text-zinc-500">Coding since</span>
    </div>
  );
}

export function SystemTelemetry() {
  return (
    <div className="hidden sm:flex items-center gap-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500">
      <span>LAT: 18.5204° N</span>
      <span>LON: 73.8567° E</span>
      <span className="text-blue-400/80">SYS_OK</span>
    </div>
  );
}
