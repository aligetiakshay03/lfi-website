"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./insights.module.scss";

type Post = {
  heading?: string | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  createdAt?: string | null;
  _sys?: { filename?: string | null } | null;
};

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const formatDate = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

/** Blogs open on-site; news items link to the original external article (as on the live site). */
const hrefFor = (p: Post) =>
  p.heading === "Blog" ? `/company/blog/${encodeURIComponent(p._sys?.filename || "")}` : p.url || "/company/news-and-articles";

/** Insights & Updates — the official featured blogs/news, as an editorial lead + list. */
const Insights = ({ posts }: { posts: Array<{ blogList?: Post | null } | null> | null | undefined }) => {
  const list = (posts || []).map((p) => p?.blogList).filter((p): p is Post => !!p?.title && !!p?.image);
  if (!list.length) return null;
  const [lead, ...rest] = list;
  const external = (p: Post) => p.heading !== "Blog" && !!p.url;

  return (
    <section className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-insights-title">
      <div className="lf-container">
        <div className={styles.head}>
          <div>
            <Reveal>
              <p className="lf-eyebrow">
                <span className="lf-eyebrow__num">10</span> Insights
              </p>
            </Reveal>
            <AnimatedText as="h2" text="Insights & Updates" highlight={["Updates"]} className={`lf-h2 ${styles.title}`} />
          </div>
          <Reveal delay={120}>
            <Link href="/company/news-and-articles" className="lf-link-arrow">
              <span>News &amp; Articles</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <Reveal className={styles.leadWrap}>
            <Link
              href={hrefFor(lead)}
              target={external(lead) ? "_blank" : undefined}
              rel={external(lead) ? "noopener noreferrer" : undefined}
              className={styles.lead}
            >
              <div className={styles.leadMedia}>
                <Image src={lead.image!} alt="" fill sizes="(max-width: 1024px) 100vw, 55vw" className={styles.img} />
              </div>
              <div className={styles.meta}>
                <span className={styles.tag}>{lead.heading}</span>
                <span>{formatDate(lead.createdAt)}</span>
              </div>
              <h3 className={styles.leadTitle}>{lead.title}</h3>
              <span className={styles.arrow}>
                <Arrow />
              </span>
            </Link>
          </Reveal>

          <ul className={styles.list}>
            {rest.map((p, i) => (
              <Reveal as="li" key={p.title} delay={120 + i * 120}>
                <Link
                  href={hrefFor(p)}
                  target={external(p) ? "_blank" : undefined}
                  rel={external(p) ? "noopener noreferrer" : undefined}
                  className={styles.row}
                >
                  <div className={styles.rowMedia}>
                    <Image src={p.image!} alt="" fill sizes="(max-width: 1024px) 40vw, 18vw" className={styles.img} />
                  </div>
                  <div className={styles.rowBody}>
                    <div className={styles.meta}>
                      <span className={styles.tag}>{p.heading}</span>
                      <span>{formatDate(p.createdAt)}</span>
                    </div>
                    <h3 className={styles.rowTitle}>{p.title}</h3>
                    <span className={styles.arrow}>
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Insights;
