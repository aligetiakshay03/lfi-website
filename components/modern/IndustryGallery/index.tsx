"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./industries.module.scss";

type Industry = {
  title?: string | null;
  description?: string | null;
  backgroundImage?: string | null;
  actionButton?: { text?: string | null; url?: string | null } | null;
};

type Props = {
  industries: Array<Industry | null> | null | undefined;
  intro?: string;
};

const GAP = 18;
/** Marquee drift, in px per ms. */
const SPEED = 0.035;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Horizontal industry experience: the track holds two identical sets and drifts
 * continuously so it loops seamlessly. Pointer drag, arrow keys and hover each
 * take over from the drift; the card nearest the reading line becomes active.
 */
const IndustryGallery = ({ industries, intro }: Props) => {
  const items = (industries || []).filter((i): i is Industry => !!i?.title);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pointerRef = useRef({ id: -1, x: 0, dragging: false });
  const offsetRef = useRef(0);
  const periodRef = useRef(0);
  const pausedRef = useRef(false);
  const draggedRef = useRef(false);
  // Imperative handle so the JSX handlers can drive the rail without re-running the effect.
  const apiRef = useRef<{ evaluate: () => void; nudge: (dx: number) => void } | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!section || !track || !rail) return;
    const firstSet = track.firstElementChild as HTMLElement | null;
    if (!firstSet) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Card geometry is measured once per resize; the frame loop then works purely
    // from these numbers, so it never reads layout on a frame.
    let centers: number[] = [];
    let focusPoint = 0;
    let step = 0;

    const paint = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const wrap = (value: number) => {
      const period = periodRef.current;
      if (period <= 0) return 0;
      return -(((-value % period) + period) % period);
    };

    const measure = () => {
      const nextPeriod = firstSet.getBoundingClientRect().width;
      if (nextPeriod <= 0) return;
      if (Math.abs(nextPeriod - periodRef.current) >= 0.5) {
        // Hold the visual position when the period changes (resize, late fonts).
        const progress = periodRef.current ? -offsetRef.current / periodRef.current : 0;
        periodRef.current = nextPeriod;
        offsetRef.current = -(((progress % 1) + 1) % 1) * nextPeriod;
      }
      // Paint first, so the rects below reflect the offset we are about to subtract.
      paint();
      const railLeft = rail.getBoundingClientRect().left;
      const cards = Array.from(firstSet.querySelectorAll<HTMLElement>("[data-industry-index]"));
      centers = cards.map((card) => {
        const bounds = card.getBoundingClientRect();
        return bounds.left - railLeft - offsetRef.current + bounds.width / 2;
      });
      focusPoint = rail.clientWidth * 0.38;
      step = cards.length ? cards[0].getBoundingClientRect().width + GAP : nextPeriod;
    };

    const syncActive = () => {
      if (!centers.length) return;
      const period = periodRef.current;
      let nearestIndex = 0;
      let nearestDistance = Infinity;
      centers.forEach((center, index) => {
        // Two identical sets ride the track; test both so the wrap point stays seamless.
        const here = Math.abs(center + offsetRef.current - focusPoint);
        const cloned = Math.abs(center + offsetRef.current + period - focusPoint);
        const distance = Math.min(here, cloned);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
      setActive((current) => (current === nearestIndex ? current : nearestIndex));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${centers.length > 1 ? nearestIndex / (centers.length - 1) : 1})`;
      }
    };

    let frame = 0;
    let lastTime = 0;
    let lastSync = 0;
    let running = false;
    let onScreen = false;

    const animate = (time: number) => {
      if (!running) return;
      if (lastTime && periodRef.current > 0) {
        const elapsed = Math.min(time - lastTime, 40);
        offsetRef.current = wrap(offsetRef.current - elapsed * SPEED);
      }
      lastTime = time;
      paint();
      if (time - lastSync >= 120) {
        syncActive();
        lastSync = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    // The loop exists only while the rail is actually drifting on screen. Off-screen,
    // in a hidden tab, while paused (hover/drag/keyboard) or under reduced motion it is
    // stopped outright rather than spinning.
    const evaluate = () => {
      const shouldRun = onScreen && !document.hidden && !pausedRef.current && !reducedMotion.matches;
      if (shouldRun === running) return;
      running = shouldRun;
      if (shouldRun) {
        lastTime = 0;
        frame = window.requestAnimationFrame(animate);
      } else {
        window.cancelAnimationFrame(frame);
      }
    };

    const nudge = (dx: number) => {
      offsetRef.current = wrap(offsetRef.current + dx);
      paint();
      syncActive();
    };

    apiRef.current = { evaluate, nudge };

    const onKeyDown = (event: KeyboardEvent) => {
      const by: Record<string, number> = {
        ArrowLeft: step,
        ArrowRight: -step,
        PageUp: step * 2,
        PageDown: -step * 2,
      };
      const dx = by[event.key];
      if (dx === undefined) return;
      event.preventDefault();
      nudge(dx);
    };

    // Pausing on any focus would strand the marquee whenever a drag leaves the rail
    // focused, so only a keyboard focus pauses it.
    const onFocus = () => {
      let keyboard = true;
      try {
        keyboard = rail.matches(":focus-visible");
      } catch {
        /* older engines: treat any focus as keyboard focus */
      }
      if (!keyboard) return;
      pausedRef.current = true;
      evaluate();
    };
    const onBlur = () => {
      if (pointerRef.current.dragging) return;
      pausedRef.current = false;
      evaluate();
    };

    const observer = new ResizeObserver(() => {
      measure();
      syncActive();
    });
    observer.observe(firstSet);
    observer.observe(rail);

    const visibility = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        evaluate();
      },
      { rootMargin: "200px 0px" }
    );
    visibility.observe(section);

    reducedMotion.addEventListener("change", evaluate);
    document.addEventListener("visibilitychange", evaluate);
    rail.addEventListener("keydown", onKeyDown);
    rail.addEventListener("focus", onFocus);
    rail.addEventListener("blur", onBlur);

    measure();
    syncActive();

    return () => {
      apiRef.current = null;
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      reducedMotion.removeEventListener("change", evaluate);
      document.removeEventListener("visibilitychange", evaluate);
      rail.removeEventListener("keydown", onKeyDown);
      rail.removeEventListener("focus", onFocus);
      rail.removeEventListener("blur", onBlur);
      track.style.transform = "";
    };
  }, [items.length]);

  if (!items.length) return null;
  const shown = hovered ?? active;
  // A synthesized mouseenter on touch would pause the marquee for good, since the
  // matching mouseleave never arrives.
  const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return (
    <section ref={sectionRef} className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-industries-title">
      <div className={`lf-container ${styles.head}`}>
        <div>
          <Reveal>
            <p className="lf-eyebrow">
              <span className="lf-eyebrow__num">05</span> Industries
            </p>
          </Reveal>
          <AnimatedText as="h2" text="Industries" className={`lf-h2 ${styles.title}`} />
        </div>
        {intro && (
          <Reveal delay={120} className={styles.introWrap}>
            <p className="lf-body lf-muted-light">{intro}</p>
          </Reveal>
        )}
      </div>

      <div
        ref={railRef}
        className={styles.rail}
        role="group"
        tabIndex={0}
        aria-label="Industries — drag, or use the arrow keys, to explore"
        onMouseEnter={() => {
          if (!canHover()) return;
          pausedRef.current = true;
          apiRef.current?.evaluate();
        }}
        onMouseLeave={() => {
          if (!canHover()) return;
          setHovered(null);
          if (pointerRef.current.dragging) return;
          pausedRef.current = false;
          apiRef.current?.evaluate();
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          pointerRef.current = { id: event.pointerId, x: event.clientX, dragging: true };
          draggedRef.current = false;
          pausedRef.current = true;
          apiRef.current?.evaluate();
          railRef.current?.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const pointer = pointerRef.current;
          if (!pointer.dragging || pointer.id !== event.pointerId) return;
          const delta = event.clientX - pointer.x;
          if (Math.abs(delta) > 3) draggedRef.current = true;
          pointer.x = event.clientX;
          apiRef.current?.nudge(delta);
        }}
        onPointerUp={(event) => {
          if (pointerRef.current.id !== event.pointerId) return;
          pointerRef.current.dragging = false;
          pointerRef.current.id = -1;
          pausedRef.current = event.pointerType === "mouse" && event.currentTarget.matches(":hover");
          apiRef.current?.evaluate();
        }}
        onPointerCancel={() => {
          pointerRef.current.dragging = false;
          pointerRef.current.id = -1;
          pausedRef.current = false;
          apiRef.current?.evaluate();
        }}
        onClickCapture={(event) => {
          if (draggedRef.current) {
            event.preventDefault();
            event.stopPropagation();
            draggedRef.current = false;
          }
        }}
      >
        <div ref={trackRef} className={styles.track}>
          {[false, true].map((isClone) => (
            <div key={isClone ? "clone" : "original"} className={styles.group} aria-hidden={isClone || undefined}>
              {items.map((ind, i) => {
                const url = ind.actionButton?.url || "#";
                const isActive = i === shown;
                return (
                  <article
                    key={`${ind.title}-${isClone ? "clone" : "original"}`}
                    data-industry-index={i}
                    className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Link href={url} className={styles.cardLink} tabIndex={isClone ? -1 : undefined} aria-label={`${ind.title} — ${ind.actionButton?.text || "Read more"}`}>
                      <div className={styles.media}>
                        {ind.backgroundImage && (
                          <Image
                            src={ind.backgroundImage}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 80vw, 36vw"
                            className={styles.img}
                          />
                        )}
                        <div className={styles.shade} />
                      </div>
                      <div className={styles.body}>
                        <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                        <h3 className={styles.name}>{ind.title}</h3>
                        <div className={styles.more}>
                          <p className={styles.desc}>{ind.description?.trim()}</p>
                          <span className={styles.read}>
                            {ind.actionButton?.text || "Read more"} <Arrow />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
              <div className={`lf-card lf-card--orange ${styles.endCard}`}>
                <p className="lf-serif">We have rich experience in your industry.</p>
                <Link href="/industries" className="lf-btn" tabIndex={isClone ? -1 : undefined}>
                  <span>All industries</span>
                  <span className="lf-btn__arrow">
                    <Arrow />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`lf-container ${styles.foot}`}>
        <span className={styles.count}>
          <strong>{String(shown + 1).padStart(2, "0")}</strong> / {String(items.length).padStart(2, "0")}
        </span>
        <div className={styles.bar} aria-hidden="true">
          <span ref={barRef} />
        </div>
        <span className={styles.hint}>Drag or use arrow keys</span>
      </div>
    </section>
  );
};

export default IndustryGallery;
