"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import styles from "./company.module.scss";

type Block = { status?: string | null; title?: string | null; description?: string | null; imageURL?: string | null } | null | undefined;
type VisionCard = { logo?: string | null; heading?: string | null; content?: string | null } | null;

type Props = {
  story: Block;
  csr: Block;
  visionCards?: Array<VisionCard> | null;
  subheading?: string | null;
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Company — Our Story (editorial split), then Vision, Mission and CSR as a staggered
 * composition of layered cards. All copy is the official About Us content.
 */
const CompanyStory = ({ story, csr, visionCards, subheading }: Props) => {
  const cards = (visionCards || []).filter((c): c is NonNullable<VisionCard> => !!c?.heading);
  const trio = [
    ...cards.map((c, i) => ({ key: c.heading!, tag: "Linkfields / Purpose", title: c.heading!, text: c.content || "", icon: c.logo, tone: i === 0 ? "dark" : "white" })),
    ...(csr?.title ? [{ key: "csr", tag: `Linkfields / ${csr.status || "CSR"}`, title: csr.title, text: csr.description || "", icon: null, tone: "orange" }] : []),
  ];

  return (
    <section className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-company-title">
      <div className="lf-container">
        <div className={styles.story}>
          <div className={styles.storyCopy}>
            <Reveal>
              <p className="lf-eyebrow">
                <span className="lf-eyebrow__num">07</span> Company
              </p>
            </Reveal>
            {subheading && (
              <Reveal delay={60}>
                <p className={styles.sub}>{subheading}</p>
              </Reveal>
            )}
            <AnimatedText as="h2" text={story?.title || "About Us"} highlight={["efficient", "future"]} className={`lf-h2 ${styles.title}`} />
            {story?.description && (
              <Reveal delay={120}>
                <p className={`lf-body lf-muted-light ${styles.body}`}>{story.description}</p>
              </Reveal>
            )}
            <Reveal delay={180}>
              <Link href="/company/about-us" className="lf-btn">
                <span>About Us</span>
                <span className="lf-btn__arrow">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          </div>
          {story?.imageURL && (
            <Reveal variant="mask" className={styles.storyVisual}>
              <Image src={story.imageURL} alt="Linkfields Innovations — our story" fill sizes="(max-width: 1024px) 100vw, 50vw" className={styles.storyImg} />
              <span className={`lf-tag ${styles.storyTag}`}>{story?.status || "Our story"} / Since 2008</span>
            </Reveal>
          )}
        </div>

        {trio.length > 0 && (
          <div className={styles.trio}>
            {trio.map((c, i) => (
              <Reveal key={c.key} delay={i * 140} className={styles.trioSlot}>
                <article className={`lf-card ${c.tone === "dark" ? "lf-card--dark" : c.tone === "orange" ? "lf-card--orange" : ""} ${styles.trioCard}`}>
                  <div className={styles.trioTop}>
                    {c.icon ? (
                      <span className={styles.trioIcon}>
                        <Image src={c.icon} alt="" width={26} height={26} />
                      </span>
                    ) : (
                      <span className={styles.trioIcon}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                    <span className="lf-tag">{c.tag}</span>
                  </div>
                  <h3 className={styles.trioTitle}>{c.title}</h3>
                  <p className={styles.trioText}>{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyStory;
