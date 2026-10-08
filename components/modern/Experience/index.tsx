"use client";
import React from "react";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import Counter from "../Counter";
import styles from "./experience.module.scss";

/** Official credentials (footer memberships/ISO logos and recognition content). */
const RIBBON = ["ISO 27001:2022", "Great Place to Work Certified", "FT Africa’s fastest-growing 2023", "NASSCOM member"];

type Stat = { time?: string | null; suffix?: string | null; description?: string | null };

type Props = {
  data:
    | { status?: string | null; title?: string | null; description?: string | null; analytics?: Array<Stat | null> | null }
    | null
    | undefined;
};

/** Our Journey — official figures, counted up as the section enters the viewport. */
const Experience = ({ data }: Props) => {
  const stats = (data?.analytics || []).filter((s): s is Stat => !!s?.time);
  const yearsMatch = data?.title?.match(/^(\d+)\s+(.*)$/);

  return (
    <section className={`${styles.section} lf-dark`} data-header-theme="dark" aria-labelledby="lf-journey-title">
      <div className={styles.bgNum} aria-hidden="true">
        {yearsMatch?.[1]}
      </div>
      <div className={`lf-container ${styles.grid}`}>
        <div className={styles.head}>
          <Reveal>
            <p className="lf-eyebrow">
              <span className="lf-eyebrow__num">08</span> {data?.status ? data.status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) : "Our journey"}
            </p>
          </Reveal>
          {yearsMatch ? (
            <h2 id="lf-journey-title" className={`lf-h2 ${styles.title}`}>
              <span className={styles.years}>
                <Counter value={Number(yearsMatch[1])} duration={1600} />
              </span>{" "}
              <AnimatedText as="span" text={yearsMatch[2]} highlight={["Excellence"]} />
            </h2>
          ) : (
            <AnimatedText as="h2" text={data?.title || ""} className={`lf-h2 ${styles.title}`} />
          )}
          {data?.description && (
            <Reveal delay={120}>
              <p className="lf-lead lf-muted-dark">{data.description}</p>
            </Reveal>
          )}
        </div>

        <dl className={styles.stats}>
          {stats.map((s, i) => (
            <Reveal key={s.description} delay={i * 110} className={styles.stat}>
              <dt className={styles.statValue}>
                <Counter value={Number(s.time)} suffix={s.suffix || ""} duration={1800 + i * 150} />
              </dt>
              <dd className={styles.statLabel}>{s.description}</dd>
              <span className={styles.statLine} aria-hidden="true" />
            </Reveal>
          ))}
        </dl>
      </div>
      <div className={`lf-container ${styles.ribbonWrap}`}>
        <Reveal variant="scale">
          <p className="lf-ribbon">
            {RIBBON.map((r, i) => (
              <React.Fragment key={r}>
                {i > 0 && <span className="lf-ribbon__dot" aria-hidden="true" />}
                <span>{r}</span>
              </React.Fragment>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
