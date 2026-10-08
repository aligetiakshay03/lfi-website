"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./recognition.module.scss";

type Award = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  actionButton?: { text?: string | null; url?: string | null } | null;
};

const AUTO_MS = 6000;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Recognition — editorial list of official awards; the active entry's badge takes the stage. */
const Recognition = ({ awards }: { awards: Array<Award | null> | null | undefined }) => {
  const list = (awards || []).filter((a): a is Award => !!a?.title);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || list.length < 2) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % list.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, inView, active, list.length]);

  if (!list.length) return null;

  return (
    <section ref={ref} className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-recognition-title">
      <div className={`lf-container ${styles.grid}`}>
        <div className={styles.head}>
          <Reveal>
            <p className="lf-eyebrow">
              <span className="lf-eyebrow__num">09</span> Recognition
            </p>
          </Reveal>
          <AnimatedText as="h2" text="Awards & Recognition" highlight={["Recognition"]} className={`lf-h2 ${styles.title}`} />
        </div>

        <div className={styles.stage} aria-hidden="true">
          {list.map((a, i) => (
            <div key={a.title} className={`${styles.badge} ${i === active ? styles.badgeActive : ""}`}>
              {a.image && <Image src={a.image} alt="" fill sizes="(max-width: 1024px) 60vw, 30vw" className={styles.badgeImg} />}
            </div>
          ))}
          <div className={styles.ring} />
        </div>

        <ol className={styles.list}>
          {list.map((a, i) => {
            const isActive = i === active;
            return (
              <li key={a.title} className={`${styles.item} ${isActive ? styles.itemActive : ""}`}>
                <button
                  type="button"
                  className={styles.itemBtn}
                  aria-expanded={isActive}
                  onClick={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  onMouseEnter={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                >
                  <span className={styles.itemNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.itemTitle}>{a.title}</span>
                </button>
                <div className={styles.itemMore}>
                  <div>
                    <p className={styles.itemDesc}>{a.description}</p>
                    {a.actionButton?.url && (
                      <Link href={a.actionButton.url} className="lf-link-arrow" tabIndex={isActive ? 0 : -1}>
                        <span>{a.actionButton.text || "Read more"}</span>
                        <Arrow />
                      </Link>
                    )}
                  </div>
                </div>
                <span className={styles.itemBar} aria-hidden="true">
                  <span
                    className={isActive && auto && inView ? styles.itemBarRun : ""}
                    style={{ "--dur": `${AUTO_MS}ms` } as React.CSSProperties}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Recognition;
