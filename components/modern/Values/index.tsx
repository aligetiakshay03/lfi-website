"use client";
import React, { useState } from "react";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./values.module.scss";

type Value = { logo?: string | null; heading?: string | null; content?: string | null };

type Props = {
  eyebrow?: string | null;
  title?: string | null;
  values: Array<Value | null> | null | undefined;
};

type ValueIconProps = { value: string | null | undefined };

/** Local SVGs keep the value marks visible even when legacy CMS image URLs are unavailable. */
const ValueIcon = ({ value }: ValueIconProps) => {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (value?.toLowerCase()) {
    case "innovation":
      return <svg {...iconProps}><path d="M9 18h6M10 22h4M8.8 14.4A6.5 6.5 0 1 1 15.2 14.4c-.8.7-1.2 1.5-1.2 2.6h-4c0-1.1-.4-1.9-1.2-2.6Z" /></svg>;
    case "courage":
      return <svg {...iconProps}><path d="M6 21V4m0 1h10l-1.8 3L16 11H6" /></svg>;
    case "respect":
      return <svg {...iconProps}><path d="M12 20s-7-3.8-7-9a3.5 3.5 0 0 1 6.2-2.2L12 10l.8-1.2A3.5 3.5 0 0 1 19 11c0 5.2-7 9-7 9Z" /></svg>;
    case "impact":
      return <svg {...iconProps}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="m16.5 7.5 3-3M19.5 4.5v3m0-3h-3" /></svg>;
    case "passion":
      return <svg {...iconProps}><path d="M20 8.5c0 5.7-8 11-8 11S4 14.2 4 8.5A3.8 3.8 0 0 1 11 6.4L12 8l1-1.6a3.8 3.8 0 0 1 7 2.1Z" /></svg>;
    case "ownership":
      return <svg {...iconProps}><path d="m4 12 8-7 8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z" /><path d="M9 21v-6h6v6" /></svg>;
    default:
      // Headings are CMS-editable, so an unknown one still gets a mark rather than an empty disc.
      return <svg {...iconProps}><circle cx="12" cy="12" r="7.5" /><path d="M12 8.5v7M8.5 12h7" /></svg>;
  }
};

/** Our Values — hover/focus/click a value to make it active; number, description and indicator animate. */
const Values = ({ eyebrow, title, values }: Props) => {
  const list = (values || []).filter((v): v is Value => !!v?.heading);
  const [active, setActive] = useState(0);
  if (!list.length) return null;
  const current = list[active];

  return (
    <section className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-values-title">
      <div className={`lf-container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className="lf-eyebrow">{eyebrow || "Our values"}</p>
          </Reveal>
          <AnimatedText as="h2" text={title || "Our values"} highlight={["transformation"]} className={`lf-h2 ${styles.title}`} />

          <div className={styles.detail} aria-live="polite">
            <span className={styles.bigNum} key={`n-${active}`}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <div className={styles.detailBody} key={`d-${active}`}>
              <span className={styles.detailIcon} aria-hidden="true">
                <ValueIcon value={current.heading} />
              </span>
              <h3 className={styles.detailTitle}>{current.heading}</h3>
              <p className={styles.detailText}>{current.content}</p>
            </div>
          </div>
        </div>

        <ul className={styles.list} role="tablist" aria-label="Values">
          {list.map((v, i) => (
            <li key={v.heading}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className={styles.itemNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.itemLabel}>{v.heading}</span>
                <span className={styles.itemLine} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Values;
