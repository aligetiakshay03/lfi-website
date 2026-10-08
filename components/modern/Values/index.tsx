"use client";
import React, { useState } from "react";
import Image from "next/image";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./values.module.scss";

type Value = { logo?: string | null; heading?: string | null; content?: string | null };

type Props = {
  eyebrow?: string | null;
  title?: string | null;
  values: Array<Value | null> | null | undefined;
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
              {current.logo && (
                <span className={styles.detailIcon}>
                  <Image src={current.logo} alt="" width={28} height={28} />
                </span>
              )}
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
