"use client";
import React from "react";
import Image from "next/image";
import type { AiCategoryId, AiProduct } from "../../../utils/data/lfiAi";
import { getCategory } from "../../../utils/data/lfiAi";
import styles from "./aiVisual.module.scss";

/** Brand-palette tone per capability area. */
const TONE: Record<AiCategoryId, string> = {
  conversational: styles.toneOrange,
  banking: styles.toneNavy,
  telecom: styles.toneBlue,
  insurance: styles.toneCharcoal,
  operations: styles.toneIvory,
  talent: styles.toneSand,
};

/**
 * Editorial product tile. Products with an official lfiai.com logo show it on a
 * plate (light for light-toned panels, premium glass for framed); others show
 * the full product name as typography on a brand-toned panel with a soft arc.
 */
const AiVisual = ({ product, compact = false }: { product: AiProduct; compact?: boolean }) => {
  const cat = getCategory(product.category);
  return (
    <div className={`${styles.visual} ${TONE[product.category]} ${compact ? styles.compact : ""}`} aria-hidden="true">
      <span className={styles.arc} />
      <span className={styles.arcSmall} />
      {product.logo ? (
        <div className={`${styles.logo} ${product.logo.plate === "framed" ? styles.logoFramed : ""}`}>
          <div className={styles.logoPad}>
            <Image src={product.logo.src} alt={`${product.name} logo`} fill sizes="(max-width: 900px) 70vw, 420px" className={styles.logoImg} />
          </div>
        </div>
      ) : (
        <span className={styles.productName}>{product.name}</span>
      )}
      <span className={styles.caption}>
        <span className={styles.captionDot} />
        {cat.short}
      </span>
    </div>
  );
};

export default AiVisual;
