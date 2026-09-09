"use client";

import { useEffect, useState } from "react";

export function uiScale(): number {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth > 1440) {
    return Math.min(1.4, window.innerWidth / 1440);
  }
  return 1;
}

export function useUiScale(): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(uiScale());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}
