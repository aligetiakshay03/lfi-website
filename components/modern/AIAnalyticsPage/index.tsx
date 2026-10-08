"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedText from "../AnimatedText";
import Reveal from "../Reveal";
import Counter from "../Counter";
import AiVisual from "../AiVisual";
import AIProductShowcase from "../AIProductShowcase";
import { AiCategoryId, LFI_AI_URL, aiCategories, aiIntro, aiProducts, getCategory } from "../../../utils/data/lfiAi";
import styles from "./aiPage.module.scss";

type Filter = "all" | AiCategoryId;

const External = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3H3v10h10v-3M9 2h5v5M14 2 7 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Search = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** /ai-analytics — the LFI AI portfolio as a native Linkfields capability page. */
const AIAnalyticsPage = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  // Deep links from the navigation: /ai-analytics?category=<id>
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("category");
    if (cat && aiCategories.some((c) => c.id === cat)) {
      setFilter(cat as AiCategoryId);
      document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const setAndSync = (next: Filter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url.toString());
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return aiProducts.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!q) return true;
      const hay = [p.name, p.description || "", getCategory(p.category).label, ...p.tags].join(" ").toLowerCase();
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [filter, query]);

  const industries = new Set(aiProducts.flatMap((p) => p.tags).filter((t) => ["Banking", "Telecom", "Insurance", "Retail", "Manufacturing", "Energy", "HR"].includes(t)));

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={`${styles.hero} lf-dark`} data-header-theme="dark">
        <div className="lf-grid-bg" aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`lf-container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <nav aria-label="Breadcrumb" className={styles.crumbs}>
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">AI &amp; Analytics</span>
            </nav>
            <AnimatedText as="h1" text="AI & Analytics" highlight={["Analytics"]} className={`lf-h1 ${styles.title}`} immediate delay={200} />
            <p className={`lf-lead ${styles.lead}`}>{aiIntro.description}</p>
            <div className={styles.heroCtas}>
              <a href="#catalogue" className="lf-btn">
                <span>Browse live demos</span>
              </a>
              <a href={LFI_AI_URL} target="_blank" rel="noopener noreferrer" className="lf-btn lf-btn--ghost">
                <span>lfiai.com</span>
                <span className="lf-btn__arrow">
                  <External />
                </span>
              </a>
            </div>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroLogo}>
              <Image src="/images/lfiai/lfiai-logo.png" alt="LFI AI" width={1601} height={801} priority />
            </div>
            <dl className={styles.stats}>
              <div>
                <dt>
                  <Counter value={aiProducts.length} />
                </dt>
                <dd>demonstrations</dd>
              </div>
              <div>
                <dt>
                  <Counter value={aiCategories.length} />
                </dt>
                <dd>capability areas</dd>
              </div>
              <div>
                <dt>
                  <Counter value={industries.size} />
                </dt>
                <dd>industries covered</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Featured experience */}
      <AIProductShowcase index="01" title="Featured demos" showIntro={false} showCatalogueLink={false} />

      {/* Catalogue */}
      <section id="catalogue" className={`${styles.catalogue} lf-light`} data-header-theme="light" aria-labelledby="lf-catalogue-title">
        <div className="lf-container">
          <div className={styles.catHead}>
            <div>
              <Reveal>
                <p className="lf-eyebrow">
                  <span className="lf-eyebrow__num">02</span> Catalogue
                </p>
              </Reveal>
              <AnimatedText as="h2" text="Every live demo" highlight={["live"]} className={`lf-h2 ${styles.catTitle}`} />
            </div>
            <label className={styles.search}>
              <Search />
              <span className="sr-only">Search the catalogue</span>
              <input type="search" placeholder="Search products, industries, technologies" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>

          <div className={styles.filters} role="toolbar" aria-label="Filter by category">
            {[{ id: "all" as Filter, short: "All" }, ...aiCategories.map((c) => ({ id: c.id as Filter, short: c.short }))].map((c) => {
              const count = c.id === "all" ? aiProducts.length : aiProducts.filter((p) => p.category === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={filter === c.id}
                  className={`${styles.filter} ${filter === c.id ? styles.filterActive : ""}`}
                  onClick={() => setAndSync(c.id)}
                >
                  {c.short}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <p className={styles.resultCount} aria-live="polite">
            {results.length} {results.length === 1 ? "demo" : "demos"}
            {filter !== "all" ? ` in ${getCategory(filter).label}` : ""}
            {query ? ` matching “${query}”` : ""}
          </p>

          <ul className={styles.grid} key={`${filter}-${query}`}>
            {results.map((p, i) => (
              <li key={p.id} className={styles.card} style={{ "--i": Math.min(i, 12) } as React.CSSProperties}>
                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                  <div className={styles.cardVisual}>
                    <AiVisual product={p} compact />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardCat}>{getCategory(p.category).short}</span>
                    <h3 className={styles.cardName}>{p.name}</h3>
                    {p.description && <p className={styles.cardDesc}>{p.description}</p>}
                    <div className={styles.cardFoot}>
                      <span className={styles.cardTags}>{p.tags.join(" · ")}</span>
                      <span className={styles.cardCta}>
                        View Demo <External />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {results.length === 0 && (
            <div className={styles.empty}>
              <p>No demos match “{query}”.</p>
              <button
                type="button"
                className="lf-link-arrow"
                onClick={() => {
                  setQuery("");
                  setAndSync("all");
                }}
              >
                <span>Clear search and filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.cta} lf-dark`} data-header-theme="dark">
        <div className={`lf-container ${styles.ctaInner}`}>
          <AnimatedText as="h2" text="Let's connect over a virtual coffee" highlight={["coffee"]} className="lf-h2" />
          <Link href="/contact-us" className="lf-btn">
            <span>Contact us</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AIAnalyticsPage;
