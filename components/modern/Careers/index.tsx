"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import { getGsap } from "../lib/motion";
import styles from "./careers.module.scss";

type Props = {
  home?: { title?: string | null; description?: string | null; actionButton?: { text?: string | null; url?: string | null } | null } | null;
  media?: { status?: string | null; title?: string | null; description?: string | null } | null;
  images?: Array<{ image?: string | null } | null> | null;
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Careers — official copy over a drifting mosaic of the official team photography. */
const Careers = ({ home, media, images }: Props) => {
  const photos = (images || []).map((i) => i?.image).filter((s): s is string => !!s);
  const sectionRef = useRef<HTMLElement>(null);
  const colRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tweens = colRefs.current.filter(Boolean).map((col, i) =>
        gsap.fromTo(
          col,
          { yPercent: i % 2 ? -4 : 6 },
          {
            yPercent: i % 2 ? 8 : -10,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          }
        )
      );
      return () => tweens.forEach((t) => t.scrollTrigger?.kill());
    });
    return () => mm.revert();
  }, []);

  const columns = [photos.slice(0, 2), photos.slice(2, 4), photos.slice(4, 6)].filter((c) => c.length);

  return (
    <section ref={sectionRef} className={`${styles.section}`} data-header-theme="dark" aria-labelledby="lf-careers-title">
      <div className={styles.mosaic} aria-hidden="true">
        {columns.map((col, i) => (
          <div
            key={i}
            ref={(el) => {
              colRefs.current[i] = el;
            }}
            className={styles.col}
          >
            {col.map((src) => (
              <div key={src} className={styles.photo}>
                <Image src={src} alt="" fill sizes="(max-width: 1024px) 50vw, 28vw" className={styles.photoImg} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={`lf-container ${styles.inner}`}>
        <Reveal>
          <p className="lf-eyebrow">
            <span className="lf-eyebrow__num">11</span> {home?.title ? home.title.charAt(0) + home.title.slice(1).toLowerCase() : "Careers"}
          </p>
        </Reveal>
        <AnimatedText
          as="h2"
          text={(home?.description || "Ready for an extraordinary work experience?").trim()}
          highlight={["extraordinary"]}
          className={`lf-h2 ${styles.title}`}
        />
        {media?.title && (
          <Reveal delay={120} className={styles.media}>
            <p className={styles.mediaTitle}>{media.title}</p>
            {media.description && <p className="lf-body lf-muted-dark">{media.description}</p>}
          </Reveal>
        )}
        {home?.actionButton?.url && (
          <Reveal delay={200}>
            <Link href={home.actionButton.url} className={`lf-btn ${styles.cta}`}>
              <span>{home.actionButton.text || "Join Us"}</span>
              <span className="lf-btn__arrow">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Careers;
