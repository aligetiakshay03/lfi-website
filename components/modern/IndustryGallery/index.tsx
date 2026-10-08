"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import { getGsap } from "../lib/motion";
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

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Horizontal industry experience. On desktop the section pins and vertical scroll
 * drives the track sideways; the panel nearest the reading line becomes active and
 * reveals its description. On touch/small screens it is a native swipe rail.
 */
const IndustryGallery = ({ industries, intro }: Props) => {
  const items = (industries || []).filter((i): i is Industry => !!i?.title);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!section || !track || !rail) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - rail.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Scroll budget is shorter than the travel distance, so the rail moves briskly.
          end: () => `+=${distance() * 0.6}`,
          pin: true,
          // Explicit: ScrollTrigger disables spacing by default when the parent is a flex container.
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            const idx = Math.round(self.progress * (items.length - 1));
            setActive((cur) => (cur === idx ? cur : idx));
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    // Small screens: derive the active card from native horizontal scroll.
    mm.add("(max-width: 1024px)", () => {
      const onScroll = () => {
        const cards = Array.from(track.children) as HTMLElement[];
        const center = rail.scrollLeft + rail.clientWidth * 0.35;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
        const max = rail.scrollWidth - rail.clientWidth;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? rail.scrollLeft / max : 0})`;
      };
      rail.addEventListener("scroll", onScroll, { passive: true });
      return () => rail.removeEventListener("scroll", onScroll);
    });

    // The pin distance depends on the track's width, which can change after mount
    // (late CSS, web fonts, resize) — refresh the triggers whenever it does.
    let timer = 0;
    let lastWidth = track.scrollWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(track.scrollWidth - lastWidth) < 2) return;
      lastWidth = track.scrollWidth;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(track);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      mm.revert();
    };
  }, [items.length]);

  if (!items.length) return null;
  const shown = hovered ?? active;

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

      <div ref={railRef} className={styles.rail} tabIndex={0} aria-label="Industries — scroll horizontally">
        <div ref={trackRef} className={styles.track}>
          {items.map((ind, i) => {
            const url = ind.actionButton?.url || "#";
            const isActive = i === shown;
            return (
              <article
                key={ind.title}
                className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link href={url} className={styles.cardLink} aria-label={`${ind.title} — ${ind.actionButton?.text || "Read more"}`}>
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
            <Link href="/industries" className="lf-btn">
              <span>All industries</span>
              <span className="lf-btn__arrow">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={`lf-container ${styles.foot}`}>
        <span className={styles.count}>
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className={styles.bar} aria-hidden="true">
          <span ref={barRef} />
        </div>
        <span className={styles.hint}>Scroll to explore</span>
      </div>
    </section>
  );
};

export default IndustryGallery;
