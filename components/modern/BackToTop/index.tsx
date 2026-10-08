"use client";
import React, { useEffect, useState } from "react";
import styles from "./backToTop.module.scss";

const R = 26;
const C = 2 * Math.PI * R;

/** Back-to-top control with a scroll-progress ring and percentage. */
const BackToTop = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
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

  const visible = progress > 0.04;
  const pct = Math.round(progress * 100);

  return (
    <button
      type="button"
      className={`${styles.btn} ${visible ? styles.visible : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={`Back to top (${pct}% scrolled)`}
      tabIndex={visible ? 0 : -1}
    >
      <svg className={styles.ring} viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r={R} className={styles.track} />
        <circle cx="30" cy="30" r={R} className={styles.bar} style={{ strokeDasharray: C, strokeDashoffset: C * (1 - progress) }} />
      </svg>
      <span className={styles.inner} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.pct}>{pct}%</span>
      </span>
      <span className={styles.label} aria-hidden="true">
        Back to top
      </span>
    </button>
  );
};

export default BackToTop;
