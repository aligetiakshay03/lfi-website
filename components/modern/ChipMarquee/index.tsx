"use client";
import React from "react";
import Marquee from "../Marquee";
import styles from "./chipMarquee.module.scss";

type Chip = { label: string; href?: string };

const Chevron = () => (
  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true">
    <path d="M2 1.5 5.5 5 2 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Orange strip of chained chips (the official solutions/services line-up) that loops
 * continuously; a dark badge chip marks the end of each cycle.
 */
const ChipMarquee = ({ start, chips, badge, ariaLabel }: { start: string; chips: Chip[]; badge: string; ariaLabel: string }) => (
  <div className={styles.strip}>
    <Marquee duration={46} ariaLabel={ariaLabel} className={styles.marquee}>
      <span className={styles.start}>{start}</span>
      {chips.map((c) =>
        c.href ? (
          <a key={c.label} href={c.href} className={styles.chip}>
            {c.label}
            <Chevron />
          </a>
        ) : (
          <span key={c.label} className={styles.chip}>
            {c.label}
            <Chevron />
          </span>
        )
      )}
      <span className={styles.badge}>{badge}</span>
      <span className={styles.slash} aria-hidden="true">
        {"//"}
      </span>
    </Marquee>
  </div>
);

export default ChipMarquee;
