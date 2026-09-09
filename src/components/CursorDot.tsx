"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { CURSOR } from "@/lib/motion";
import { useUiScale } from "@/lib/uiScale";

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scale = useUiScale();
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setActive(true);
    }
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!active || !dot) return;

    document.documentElement.classList.add("cursor-none");

    const dotHalf = (CURSOR.size * scale) / 2;
    const ringHalf = (CURSOR.expandedSize * scale) / 2;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setDotOpacity = gsap.quickSetter(dot, "opacity");

    const setRingX = ring ? gsap.quickSetter(ring, "x", "px") : () => {};
    const setRingY = ring ? gsap.quickSetter(ring, "y", "px") : () => {};
    const setRingOpacity = ring ? gsap.quickSetter(ring, "opacity") : () => {};

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let opacity = 0;
    let hasMoved = false;

    // Fluid pointer listener
    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
        opacity = 1;
      }
    };

    const handlePointerLeave = () => {
      opacity = 0;
      setDotOpacity(0);
      setRingOpacity(0);
    };

    const handlePointerEnter = () => {
      if (hasMoved) {
        opacity = 1;
        setDotOpacity(1);
        setRingOpacity(0.75);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    // Smooth fluid ticker with elegant latency / trailing inertia
    const tickerFunc = () => {
      if (!hasMoved) return;

      // Ultra-responsive cursor tracking with near-zero latency
      const dotEase = 0.92;
      dotX += (targetX - dotX) * dotEase;
      dotY += (targetY - dotY) * dotEase;

      // Swift, tight outer ring following without lag
      const ringEase = 0.62;
      ringX += (targetX - ringX) * ringEase;
      ringY += (targetY - ringY) * ringEase;

      setDotX(dotX - dotHalf);
      setDotY(dotY - dotHalf);
      setDotOpacity(opacity);

      setRingX(ringX - ringHalf);
      setRingY(ringY - ringHalf);
      setRingOpacity(opacity * 0.75);
    };

    gsap.ticker.add(tickerFunc);

    // Hover detection for interactive items
    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, [role='button'], input, textarea, select, [data-interactive]")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
      document.removeEventListener("mouseover", handlePointerOver);
      gsap.ticker.remove(tickerFunc);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [active, scale]);

  if (!active) return null;

  return (
    <>
      {/* Outer subtle fluid cyber ring */}
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-blue-400/50 transition-transform duration-150 ease-out will-change-transform ${
          hovered ? "scale-140 border-blue-400/80 bg-blue-400/15" : "scale-100"
        }`}
        style={{
          width: CURSOR.expandedSize * scale,
          height: CURSOR.expandedSize * scale,
        }}
      />
      {/* Center solid precision dot (Instantaneous 1:1 hardware tracking) */}
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white will-change-transform shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-transform duration-100 ${
          hovered ? "scale-125 bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,1)]" : "scale-100"
        }`}
        style={{
          width: CURSOR.size * scale,
          height: CURSOR.size * scale,
        }}
      />
    </>
  );
}