"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./backToTop.module.scss";

const R = 26;
const C = 2 * Math.PI * R;

/** Back-to-top control with a scroll-progress ring and percentage. */
const BackToTop = () => {
  // Ring and percentage are written straight to the DOM so scrolling never re-renders React;
  // only the visibility flip goes through state.
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<SVGCircleElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;
    let lastPct = -1;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const pct = Math.round(progress * 100);
      if (barRef.current) barRef.current.style.strokeDashoffset = String(C * (1 - progress));
      if (pct !== lastPct) {
        lastPct = pct;
        if (pctRef.current) pctRef.current.textContent = `${pct}%`;
        // Only on a whole-percent change: rewriting the label every frame makes
        // screen readers announce the button continuously.
        btnRef.current?.setAttribute("aria-label", `Back to top (${pct}% scrolled)`);
      }
      setVisible(progress > 0.04);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`${styles.btn} ${visible ? styles.visible : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top (0% scrolled)"
      tabIndex={visible ? 0 : -1}
    >
      <svg className={styles.ring} viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r={R} className={styles.track} />
        <circle ref={barRef} cx="30" cy="30" r={R} className={styles.bar} style={{ strokeDasharray: C, strokeDashoffset: C }} />
      </svg>
      <span className={styles.inner} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span ref={pctRef} className={styles.pct}>0%</span>
      </span>
      <span className={styles.label} aria-hidden="true">
        Back to top
      </span>
    </button>
  );
};

export default BackToTop;
