"use client";

import { gsap } from "./gsap";
import { DURATION, EASE } from "./motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrambleText(
  element: HTMLElement,
  targetText: string,
  duration = DURATION.scrambleDuration
): gsap.core.Tween {
  if (prefersReducedMotion()) {
    element.textContent = targetText;
    const dummy = { p: 1 };
    return gsap.to(dummy, { p: 1, duration: 0 });
  }

  const state = { progress: 0 };
  const len = targetText.length;

  return gsap.to(state, {
    progress: 1,
    duration,
    ease: "power1.out",
    onUpdate: () => {
      const lockedChars = Math.floor(state.progress * len);
      let output = "";

      for (let i = 0; i < len; i++) {
        const char = targetText[i];
        if (char === " " || char === "\n" || char === "\t") {
          output += char;
        } else if (i < lockedChars) {
          output += char;
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      element.textContent = output;
    },
    onComplete: () => {
      element.textContent = targetText;
    },
  });
}

export function cursorChase(
  onUpdate: (x: number, y: number, opacity: number) => void
): () => void {
  let targetX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  let targetY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
  let currentX = targetX;
  let currentY = targetY;
  let opacity = 0;
  let hasMoved = false;

  const handlePointerMove = (e: PointerEvent) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!hasMoved) {
      hasMoved = true;
      currentX = targetX;
      currentY = targetY;
      opacity = 1;
    }
  };

  const handlePointerLeave = () => {
    opacity = 0;
  };

  const handlePointerEnter = () => {
    if (hasMoved) opacity = 1;
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  document.addEventListener("mouseleave", handlePointerLeave);
  document.addEventListener("mouseenter", handlePointerEnter);

  const tickerFunc = () => {
    const ease = prefersReducedMotion() ? 1 : 0.22;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    onUpdate(currentX, currentY, opacity);
  };

  gsap.ticker.add(tickerFunc);

  return () => {
    window.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("mouseleave", handlePointerLeave);
    document.removeEventListener("mouseenter", handlePointerEnter);
    gsap.ticker.remove(tickerFunc);
  };
}

export function liquidFillTimeline({
  fill,
  label,
  from,
  to,
}: {
  fill: HTMLElement;
  label: HTMLElement;
  from: { top: number; left: number; bottom: number; width: number };
  to: { top: number; left: number; bottom: number; width: number };
}): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(
    fill,
    {
      top: `${from.top}px`,
      left: `${from.left}px`,
      bottom: `${from.bottom}px`,
      width: `${from.width}px`,
      borderRadius: "9999px",
    },
    {
      top: `${to.top}px`,
      left: `${to.left}px`,
      bottom: `${to.bottom}px`,
      width: `${to.width}px`,
      borderRadius: "9999px",
      duration: 0.38,
      ease: EASE.liquid,
    },
    0
  );

  tl.to(
    label,
    {
      color: "#ffffff",
      duration: 0.25,
      ease: "power2.out",
    },
    0.05
  );

  return tl;
}
