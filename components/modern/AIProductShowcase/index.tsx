"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import AiVisual from "../AiVisual";
import {
  AiCategoryId,
  aiCategories,
  aiIntro,
  getCategory,
  productsByCategory,
} from "../../../utils/data/lfiAi";
import styles from "./aiShowcase.module.scss";

const AUTO_MS = 6500;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const External = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3H3v10h10v-3M9 2h5v5M14 2 7 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Props = {
  /** Section number shown in the eyebrow (homepage storytelling order). */
  index?: string;
  /** Hide the "explore the catalogue" link when already on the catalogue page. */
  showCatalogueLink?: boolean;
  headingLevel?: "h1" | "h2";
  /** Section heading; defaults to the portfolio name. */
  title?: string;
  /** Hide the portfolio intro (e.g. when the page hero already shows it). */
  showIntro?: boolean;
};

/** AI & Analytics: category navigation, featured product and product rail (data: lfiai.com). */
const AIProductShowcase = ({
  index = "06",
  showCatalogueLink = true,
  headingLevel = "h2",
  title = "LFI AI & Analytics",
  showIntro = true,
}: Props) => {
  const [category, setCategory] = useState<AiCategoryId>(aiCategories[0].id);
  const products = useMemo(() => productsByCategory(category), [category]);
  const [selected, setSelected] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || products.length < 2) return;
    const id = window.setTimeout(() => setSelected((s) => (s + 1) % products.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, inView, selected, products.length]);

  // Keep the selected rail item in view (horizontal scroll only — never moves the page).
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.children[selected] as HTMLElement | undefined;
    if (!rail || !el) return;
    const left = el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2;
    rail.scrollTo({ left, behavior: "smooth" });
  }, [selected, category]);

  const chooseCategory = (id: AiCategoryId) => {
    setCategory(id);
    setSelected(0);
  };

  const product = products[selected] || products[0];
  const cat = getCategory(category);

  return (
    <section ref={sectionRef} className={`${styles.section} lf-dark`} data-header-theme="dark" aria-labelledby="lf-ai-title" id="ai-analytics">
      <div className="lf-grid-bg" aria-hidden="true" />
      <div className={styles.aurora} aria-hidden="true" />

      <div className={`lf-container ${styles.inner}`}>
        <div className={styles.head}>
          <div>
            <Reveal>
              <p className="lf-eyebrow">
                <span className="lf-eyebrow__num">{index}</span> AI &amp; Analytics
              </p>
            </Reveal>
            <AnimatedText
              as={headingLevel}
              text={title}
              highlight={["AI", "demos"]}
              className={`lf-h2 ${styles.title}`}
              immediate={headingLevel === "h1"}
            />
          </div>
          {showIntro && (
            <Reveal delay={120} className={styles.intro}>
              <p className="lf-body lf-muted-dark">{aiIntro.description}</p>
            </Reveal>
          )}
        </div>

        {/* Category navigation */}
        <Reveal delay={80}>
          <div className={styles.cats} role="tablist" aria-label="AI & Analytics categories">
            {aiCategories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === category}
                className={`${styles.cat} ${c.id === category ? styles.catActive : ""}`}
                onClick={() => {
                  setAuto(false);
                  chooseCategory(c.id);
                }}
              >
                <span className={styles.catNum}>{String(i + 1).padStart(2, "0")}</span>
                <span>{c.short}</span>
                <span className={styles.catCount}>{productsByCategory(c.id).length}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Featured product */}
        {product && (
          <div className={styles.feature}>
            <div className={styles.featureCopy} key={`copy-${product.id}`} aria-live="polite">
              <p className={styles.featureCat}>{cat.label}</p>
              <h3 className={`lf-h3 ${styles.featureName}`}>{product.name}</h3>
              {product.description && <p className={`lf-body ${styles.featureDesc}`}>{product.description}</p>}
              <ul className={styles.tags} aria-label="Tags">
                {product.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className={styles.featureCtas}>
                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="lf-btn">
                  <span>
                    View Demo <span className="sr-only">of {product.name} (opens in a new tab)</span>
                  </span>
                  <span className="lf-btn__arrow">
                    <External />
                  </span>
                </a>
                {showCatalogueLink && (
                  <Link href={`/ai-analytics?category=${category}`} className="lf-link-arrow">
                    <span>Explore the catalogue</span>
                    <Arrow />
                  </Link>
                )}
              </div>
            </div>

            <div className={styles.featureVisual}>
              <AiVisual key={product.id} product={product} />
              <span className={styles.featureIndex}>
                {String(selected + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}

        {/* Product rail */}
        <div ref={railRef} className={styles.rail} key={`rail-${category}`} role="tablist" aria-label={`${cat.short} products`}>
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === selected}
              className={`${styles.railItem} ${i === selected ? styles.railItemActive : ""}`}
              onClick={() => {
                setAuto(false);
                setSelected(i);
              }}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.railNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.railName}>{p.name}</span>
              <span className={styles.railTags}>{p.tags.slice(0, 2).join(" · ")}</span>
              <span className={styles.railBar} aria-hidden="true">
                <span
                  className={i === selected && auto && inView ? styles.railBarRun : ""}
                  style={{ "--dur": `${AUTO_MS}ms` } as React.CSSProperties}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIProductShowcase;
