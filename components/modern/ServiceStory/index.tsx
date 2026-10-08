"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import { getGsap, prefersReducedMotion } from "../lib/motion";
import { itInfraService, serviceIntros } from "../../../utils/data/homeVisuals";
import styles from "./services.module.scss";

type ServiceTab = {
  TabName?: string | null;
  tabImage?: string | null;
  title?: string | null;
  description?: string | null;
  url?: string | null;
};

type NavService = {
  label: string;
  href?: string | null;
  children?: Array<{ label: string; href?: string | null } | null> | null;
};

type Props = {
  data:
    | {
        mainTitle?: string | null;
        mainDesc?: string | null;
        button?: { labelText?: string | null; url?: string | null } | null;
        serviceTabs?: Array<ServiceTab | null> | null;
      }
    | null
    | undefined;
  /** Official "Services" navigation children — the source of truth for sub-service links. */
  navServices?: Array<NavService | null> | null;
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Sticky scroll story: the visual stays pinned while the active service, its image,
 * copy and progress change with scroll (GSAP ScrollTrigger, desktop). On small screens
 * it becomes a tap/swipe story without pinning.
 */
const ServiceStory = ({ data, navServices }: Props) => {
  const tabs = [...(data?.serviceTabs || []).filter((t): t is ServiceTab => !!t?.TabName), itInfraService as ServiceTab];
  const services = tabs.map((t) => {
    const url = t.url || "";
    const nav = navServices?.find((n) => n?.href === url);
    const intro = serviceIntros[url];
    return {
      name: t.TabName!.trim(),
      title: t.title || t.TabName!,
      tagline: intro?.tagline || t.description || "",
      intro: intro?.intro || t.description || "",
      image: t.tabImage || "",
      url,
      subs: (nav?.children || [])
        .filter((c): c is { label: string; href: string } => !!c?.href)
        .map((c) => ({ label: c.label.replace(/\s+/g, " ").trim(), href: c.href })),
    };
  });

  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<any>(null);
  const n = services.length;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || n < 2) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 0.38 * (n - 1)}`,
        pin,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.floor(self.progress * n * 0.9999));
          setActive((cur) => (cur === idx ? cur : idx));
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      triggerRef.current = st;
      return () => {
        triggerRef.current = null;
        st.kill();
      };
    });
    return () => mm.revert();
  }, [n]);

  const goTo = (i: number) => {
    const st = triggerRef.current;
    if (st && !prefersReducedMotion()) {
      const y = st.start + ((i + 0.5) / n) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      setActive(i);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${(i + 1) / n})`;
    }
  };

  if (!n) return null;
  const current = services[active];

  return (
    <section ref={sectionRef} className={`${styles.section} lf-dark`} data-header-theme="dark" aria-labelledby="lf-services-title">
      <div ref={pinRef} className={styles.pin}>
        <div className={`lf-container ${styles.inner}`}>
          <div className={styles.intro}>
            <Reveal>
              <p className="lf-eyebrow">
                <span className="lf-eyebrow__num">04</span> Services
              </p>
            </Reveal>
            <AnimatedText as="h2" text={data?.mainTitle || "Our Services"} highlight={["Services"]} className={`lf-h2 ${styles.title}`} />
            {data?.mainDesc && (
              <Reveal delay={120}>
                <p className={`lf-body lf-muted-dark ${styles.mainDesc}`}>{data.mainDesc}</p>
              </Reveal>
            )}
            {data?.button?.url && (
              <Reveal delay={200}>
                <Link href={data.button.url} className="lf-btn lf-btn--ghost">
                  <span>{data.button.labelText || "Our Approach"}</span>
                  <span className="lf-btn__arrow">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            )}
          </div>

          <Reveal variant="mask" className={styles.visual}>
            {services.map((s, i) => (
              <div key={s.name} className={`${styles.layer} ${i === active ? styles.layerActive : ""} ${i < active ? styles.layerPast : ""}`}>
                {s.image && <Image src={s.image} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className={styles.layerImg} />}
              </div>
            ))}
            <div className={styles.shade} />
            <div className={styles.caption} key={active} aria-live="polite">
              <span className={styles.captionNum}>
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <h3 className={`lf-h3 ${styles.captionTitle}`}>{current.title}</h3>
              <p className={`lf-serif ${styles.captionTagline}`}>{current.tagline}</p>
              <p className={styles.captionIntro}>{current.intro}</p>
              <div className={styles.captionLinks}>
                {current.subs.slice(0, 5).map((sub) => (
                  <Link key={sub.href + sub.label} href={sub.href} className={styles.subLink}>
                    {sub.label}
                  </Link>
                ))}
                <Link href={current.url} className="lf-link-arrow">
                  <span>Explore {current.name}</span>
                  <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className={`lf-container ${styles.navWrap}`}>
          <div className={styles.progress} aria-hidden="true">
            <span ref={progressRef} />
          </div>
          <ol className={styles.nav}>
            {services.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  className={`${styles.navBtn} ${i === active ? styles.navBtnActive : ""}`}
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className={styles.navNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.navLabel}>{s.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ServiceStory;
