"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import { solutionNames, solutionVisuals } from "../../../utils/data/homeVisuals";
import styles from "./solutions.module.scss";

type Solution = {
  title?: string | null;
  image?: string | null;
  description?: string | null;
  actionButton?: { text?: string | null; url?: string | null } | null;
};

type Props = {
  data: { title?: string | null; subtitle?: string | null; details?: Array<Solution | null> | null } | null | undefined;
};

const AUTO_MS = 7000;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Interactive solution selector: list on the left, featured experience on the right. */
const SolutionSelector = ({ data }: Props) => {
  const solutions = (data?.details || []).filter((s): s is Solution => !!s?.title);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Auto-advance while visible until the visitor interacts.
  useEffect(() => {
    if (!auto || !inView || solutions.length < 2) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % solutions.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, inView, active, solutions.length]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % solutions.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + solutions.length) % solutions.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = solutions.length - 1;
    select(next);
    (listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next])?.focus();
  };

  if (!solutions.length) return null;
  const total = String(solutions.length).padStart(2, "0");
  const current = solutions[active];
  const currentUrl = current.actionButton?.url || "";

  return (
    <section ref={sectionRef} className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-solutions-title">
      <div className="lf-container">
        <div className={styles.head}>
          <Reveal>
            <p className="lf-eyebrow">
              <span className="lf-eyebrow__num">03</span> Solutions
            </p>
          </Reveal>
          <AnimatedText as="h2" text={data?.title || "Our Solutions"} highlight={["Solutions"]} className={`lf-h2 ${styles.title}`} />
          {data?.subtitle && (
            <Reveal delay={120} className={styles.subtitle}>
              <p className="lf-body lf-muted-light" data-tina-field={tinaField(data as any, "subtitle")}>
                {data.subtitle}
              </p>
            </Reveal>
          )}
        </div>

        <div className={styles.body}>
          <div ref={listRef} className={styles.list} role="tablist" aria-orientation="vertical" aria-label="Solutions" onKeyDown={onKeyDown}>
            {solutions.map((s, i) => {
              const url = s.actionButton?.url || "";
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  id={`lf-sol-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="lf-sol-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                  onClick={() => select(i)}
                  onMouseEnter={() => select(i)}
                >
                  <span className={styles.itemNum}>
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                  <span className={styles.itemTitle}>{solutionNames[url] || s.title}</span>
                  <span className={styles.itemArrow}>
                    <Arrow />
                  </span>
                  <span className={styles.itemProgress} aria-hidden="true">
                    <span
                      className={isActive && auto && inView ? styles.itemProgressRun : ""}
                      style={{ "--dur": `${AUTO_MS}ms` } as React.CSSProperties}
                    />
                  </span>
                </button>
              );
            })}
            <Link href="/solutions/erp-solutions" className={`lf-link-arrow ${styles.allLink}`}>
              <span>All ERP solutions</span>
              <Arrow />
            </Link>
          </div>

          <div className={styles.stage} id="lf-sol-panel" role="tabpanel" aria-labelledby={`lf-sol-tab-${active}`}>
            {/* Visual layers crossfade; the active one scales in */}
            <div className={styles.visual}>
              {solutions.map((s, i) => {
                const src = solutionVisuals[s.actionButton?.url || ""];
                if (!src) return null;
                return (
                  <div key={s.title} className={`${styles.visualLayer} ${i === active ? styles.visualLayerActive : ""}`}>
                    <Image src={src} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.visualImg} priority={i === 0} />
                  </div>
                );
              })}
              <div className={styles.visualShade} />
              <span className={`lf-tag ${styles.visualTag}`}>Linkfields / Solution {String(active + 1).padStart(2, "0")}</span>
              <div className={styles.logoPlate} key={`logo-${active}`}>
                {current.image && (
                  <Image src={current.image} alt={`${solutionNames[currentUrl] || current.title} logo`} fill sizes="260px" className={styles.logoImg} />
                )}
              </div>
            </div>

            <div className={styles.detail} key={`detail-${active}`}>
              <span className={styles.detailNum}>
                {String(active + 1).padStart(2, "0")} <span>/ {total}</span>
              </span>
              <h3 className={`lf-h3 ${styles.detailTitle}`}>{solutionNames[currentUrl] || current.title}</h3>
              <p className={`lf-body ${styles.detailDesc}`}>{current.description}</p>
              {currentUrl && (
                <Link href={currentUrl} className="lf-btn lf-btn--dark">
                  <span>
                    {current.actionButton?.text || "Read more"} <span className="sr-only">about {current.title}</span>
                  </span>
                  <span className="lf-btn__arrow">
                    <Arrow />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolutionSelector;
