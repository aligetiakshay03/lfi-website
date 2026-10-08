"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./approach.module.scss";

type Card = { icon?: string | null; title?: string | null };

type Props = {
  howWeWork?: { heading?: string | null; title?: string | null; description?: string | null; cardsData?: Array<Card | null> | null } | null;
  exploration?: { heading?: string | null; title?: string | null; cardsData?: Array<Card | null> | null } | null;
  index?: string;
};

const AUTO_MS = 3800;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const clean = (t: string) => t.replace(/-\s+/, "-");

/**
 * Our Approach — the four official "How we work" principles as a compact 2×2 grid.
 * The active principle rotates while in view (hover/focus takes over) with a progress bar;
 * "A recipe for success" follows as a single row of numbered cards.
 */
const Approach = ({ howWeWork, exploration, index }: Props) => {
  const steps = (howWeWork?.cardsData || []).filter((c): c is Card => !!c?.title);
  const recipe = (exploration?.cardsData || []).filter((c): c is Card => !!c?.title);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || steps.length < 2) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, inView, active, steps.length]);

  if (!steps.length) return null;

  return (
    <section ref={ref} className={`${styles.section} lf-white`} data-header-theme="light" aria-labelledby="lf-approach-title">
      <div className={`lf-container ${styles.grid}`}>
        <div className={styles.intro}>
          <Reveal>
            <p className="lf-eyebrow">
              {index && <span className="lf-eyebrow__num">{index}</span>} Our Approach
            </p>
          </Reveal>
          <AnimatedText as="h2" text={howWeWork?.title || "Our Approach"} highlight={["iteration"]} className={`lf-h2 ${styles.title}`} />
          {howWeWork?.description && (
            <Reveal delay={120}>
              <p className={`lf-body lf-muted-light ${styles.desc}`}>{howWeWork.description}</p>
            </Reveal>
          )}
          <Reveal delay={180}>
            <Link href="/company/our-approach" className="lf-btn lf-btn--dark">
              <span>Our Approach</span>
              <span className="lf-btn__arrow">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        </div>

        <ol className={styles.steps} onMouseLeave={() => setAuto(true)}>
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <Reveal as="li" key={s.title} delay={i * 90} className={styles.stepSlot}>
                <button
                  type="button"
                  className={`lf-card ${isActive ? "lf-card--dark" : ""} ${styles.step}`}
                  aria-pressed={isActive}
                  onMouseEnter={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  onFocus={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.stepTop}>
                    <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                    {s.icon && (
                      <span className={styles.stepIcon}>
                        <Image src={s.icon} alt="" width={30} height={30} />
                      </span>
                    )}
                  </span>
                  <span className={styles.stepTitle}>{clean(s.title!)}</span>
                  <span className={styles.stepBar} aria-hidden="true">
                    <span className={isActive && auto && inView ? styles.stepBarRun : ""} style={{ "--dur": `${AUTO_MS}ms` } as React.CSSProperties} />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ol>
      </div>

      {recipe.length > 0 && (
        <div className={`lf-container ${styles.recipe}`}>
          <div className={styles.recipeHead}>
            <p className="lf-eyebrow">{exploration?.heading}</p>
            <AnimatedText as="h3" text={exploration?.title || ""} highlight={["success"]} className={`lf-h3 ${styles.recipeTitle}`} />
          </div>
          <ol className={styles.timeline}>
            {recipe.map((r, i) => (
              <Reveal as="li" key={i} delay={i * 110} className={styles.timelineItem}>
                <span className={styles.timelineNum}>{String(i + 1).padStart(2, "0")}</span>
                <p className={styles.timelineText}>{r.title}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default Approach;
