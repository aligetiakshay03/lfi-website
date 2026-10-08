"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Globe from "../Globe";
import { OFFICE_GEO } from "../../../utils/data/offices";
import AnimatedText from "../AnimatedText";
import { isCoarsePointer, prefersReducedMotion } from "../lib/motion";
import styles from "./hero.module.scss";

type HeroMessage = {
  title?: string | null;
  description?: string | null;
  btn?: { label?: string | null; link?: string | null } | null;
};

type HeroProps = {
  messages: Array<HeroMessage | null> | null | undefined;
};

const ROTATE_MS = 6000;


/** Official Linkfields credentials (footer ISO logos, recognition content, Our Journey). */
const CREDENTIALS = ["ISO 27001:2022 certified", "Great Place to Work certified", "FT fastest-growing 2023", "16 years of excellence"];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Cinematic hero. Headline/copy come from the official hero carousel (Tina: home.HeroSection.services);
 * the first message leads, the remaining official messages rotate in the ticker below.
 */
const Hero = ({ messages }: HeroProps) => {
  const list = (messages || []).filter((m): m is HeroMessage => !!m?.title);
  const lead = list[0];
  const rest = list.slice(1);

  const rootRef = useRef<HTMLElement>(null);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  // Rotate the secondary official messages.
  useEffect(() => {
    if (rest.length < 2 || paused) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % rest.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [rest.length, paused]);

  // Subtle mouse parallax on three depth layers (desktop / fine pointer only).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isCoarsePointer() || prefersReducedMotion()) return;
    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty("--px", cx.toFixed(4));
      root.style.setProperty("--py", cy.toFixed(4));
      frame = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    root.addEventListener("mousemove", onMove);
    return () => {
      root.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!lead) return null;
  const current = rest[tick];

  return (
    <section ref={rootRef} className={`${styles.hero} lf-dark`} data-header-theme="dark" aria-label="Introduction">
      {/* Background: soft warm wash + two large faint arcs (3–5px parallax) */}
      <div className={styles.bgLayer} aria-hidden="true">
        <span className={styles.arcA} />
        <span className={styles.arcB} />
      </div>

      <div className={`lf-container ${styles.inner}`}>
        {/* Foreground copy (2–5px parallax) */}
        <div className={styles.copy}>
          <p className={`lf-eyebrow ${styles.label}`}>Exploring innovation</p>
          <AnimatedText
            as="h1"
            text={lead.title!}
            highlight={["Transformation"]}
            className={`lf-h1 ${styles.title}`}
            immediate
            delay={380}
            lineStagger={130}
          />
          {lead.description && <p className={`lf-lead ${styles.desc}`}>{lead.description}</p>}
          <div className={styles.ctas}>
            {lead.btn?.link && (
              <Link href={lead.btn.link} className="lf-btn">
                <span>{lead.btn.label || "Explore more"}</span>
                <span className="lf-btn__arrow">
                  <Arrow />
                </span>
              </Link>
            )}
            <Link href="/ai-analytics" className="lf-btn lf-btn--ghost">
              <span>Explore AI &amp; Analytics</span>
              <span className="lf-btn__arrow">
                <Arrow />
              </span>
            </Link>
          </div>
          <ul className={styles.creds} aria-label="Recognition">
            {CREDENTIALS.map((c) => (
              <li key={c}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Dotted land globe with the five official offices (slow rotation + pointer parallax) */}
        <div className={styles.visualWrap}>
          <Globe className={styles.globe} />
          <ul className={styles.offices} aria-label="Linkfields offices">
            {OFFICE_GEO.map((o, i) => (
              <li key={o.country} style={{ "--i": i } as React.CSSProperties}>
                <span className={styles.officeDot} />
                {o.country}
              </li>
            ))}
          </ul>
          <div className={styles.visualBadge} aria-hidden="true">
            <span className={styles.visualBadgeNum}>150+</span>
            <span>solutions delivered</span>
          </div>
        </div>
      </div>

      {/* Ticker with the remaining official hero messages */}
      {current && (
        <div
          className={`lf-container ${styles.tickerWrap}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.ticker}>
            <span className={styles.tickerCount}>
              {String(tick + 1).padStart(2, "0")} / {String(rest.length).padStart(2, "0")}
            </span>
            <Link href={current.btn?.link || "/"} className={styles.tickerLink} key={tick}>
              <span className={styles.tickerTitle}>{current.title}</span>
              <span className={styles.tickerDesc}>{current.description}</span>
              <span className={styles.tickerArrow}>
                <Arrow />
              </span>
            </Link>
            <div className={styles.tickerDots} role="tablist" aria-label="Highlights">
              {rest.map((m, i) => (
                <button
                  key={m.title}
                  type="button"
                  role="tab"
                  aria-selected={i === tick}
                  aria-label={m.title || `Highlight ${i + 1}`}
                  className={`${styles.dot} ${i === tick ? styles.dotActive : ""}`}
                  onClick={() => setTick(i)}
                  style={{ "--dur": `${ROTATE_MS}ms` } as React.CSSProperties}
                >
                  <span className={paused ? styles.dotPaused : ""} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
