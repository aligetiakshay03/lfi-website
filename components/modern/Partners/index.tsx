"use client";
import React from "react";
import Image from "next/image";
import Marquee from "../Marquee";
import { partners } from "../../../utils/data/homeVisuals";
import styles from "./partners.module.scss";

/** "Our Partners" — official partner logos in a seamless, hover-pausing marquee. */
const Partners = () => (
  <section className={`${styles.partners} lf-white`} data-header-theme="light" aria-labelledby="lf-partners-title">
    <div className={styles.head}>
      <h2 id="lf-partners-title" className="lf-eyebrow">
        Our Partners
      </h2>
    </div>
    <Marquee duration={38} ariaLabel="Linkfields technology partners">
      {partners.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logo}
          aria-label={p.name}
        >
          <Image src={p.logo} alt={p.name} width={140} height={44} loading="eager" className={styles.logoImg} />
        </a>
      ))}
    </Marquee>
  </section>
);

export default Partners;
