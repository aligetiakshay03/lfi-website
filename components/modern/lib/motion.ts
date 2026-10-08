"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers GSAP plugins once, on the client only. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/**
 * Recomputes every ScrollTrigger once late layout inputs settle (web fonts, images,
 * stylesheets injected after hydration), so pin distances and starts stay correct.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const refresh = () => ScrollTrigger.refresh();
    const timers = [300, 1200].map((ms) => window.setTimeout(refresh, ms));
    (document as any).fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("load", refresh);
    };
  }, []);
}

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True for devices without a fine pointer (touch) — used to disable parallax. */
export function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches
  );
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
