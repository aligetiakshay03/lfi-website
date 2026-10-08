"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import { MAP_DOTS } from "../../../utils/data/landDots";
import { OFFICE_GEO, OFFICE_LINKS } from "../../../utils/data/offices";
import styles from "./presence.module.scss";

type Office = {
  country?: string | null;
  building?: string | null;
  landmark?: string | null;
  city?: string | null;
  pinCode?: string | null;
};

type Props = {
  data: { status?: string | null; title?: string | null; locationCard?: Array<Office | null> | null } | null | undefined;
};

// Equirectangular projection over lon -170..180, lat 72..-56 (the populated band).
const W = 1000;
const H = 366;
const px = (lon: number) => ((lon + 170) / 350) * W;
const py = (lat: number) => ((72 - lat) / 128) * H;

/** Tidy the CMS address fragments (they carry trailing commas/spaces). */
const clean = (s?: string | null) => (s || "").replace(/\s+/g, " ").replace(/,\s*$/, "").trim();

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Our Global Presence — dotted world map (Natural Earth land) with the five official offices,
 * animated routes between them, and an aligned office panel. Hovering either side syncs both.
 */
const GlobalPresence = ({ data }: Props) => {
  const offices = (data?.locationCard || []).filter((o): o is Office => !!o?.country);
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // One path draws every land dot (zero-length segments with round caps).
  const dotsPath = useMemo(() => {
    let d = "";
    for (let i = 0; i < MAP_DOTS.length; i += 2) d += `M${px(MAP_DOTS[i + 1]).toFixed(1)} ${py(MAP_DOTS[i]).toFixed(1)}h0`;
    return d;
  }, []);

  const geo = Object.fromEntries(OFFICE_GEO.map((o) => [o.country, o]));
  const routes = OFFICE_LINKS.map(([a, b]) => {
    const A = geo[a];
    const B = geo[b];
    const x1 = px(A.lon);
    const y1 = py(A.lat);
    const x2 = px(B.lon);
    const y2 = py(B.lat);
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - dist * 0.28;
    return { key: `${a}-${b}`, from: a, to: b, d: `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}` };
  });

  if (!offices.length) return null;
  const activeCountry = offices[active]?.country;

  return (
    <section className={`${styles.section} lf-dark`} data-header-theme="dark" aria-labelledby="lf-presence-title">
      <div className="lf-container">
        <div className={styles.head}>
          <div>
            <Reveal>
              <p className="lf-eyebrow">{data?.status || "Our Global Presence"}</p>
            </Reveal>
            <AnimatedText as="h2" text={data?.title || ""} highlight={["globally"]} className={`lf-h2 ${styles.title}`} />
          </div>
          <Reveal delay={120} className={styles.stats}>
            <div>
              <span className={styles.statNum}>{offices.length}</span>
              <span className={styles.statLabel}>countries</span>
            </div>
            <div>
              <span className={styles.statNum}>2008</span>
              <span className={styles.statLabel}>established in South Africa</span>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" className={styles.stage}>
          <div className={styles.mapWrap}>
            <svg
              className={styles.map}
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label="World map showing Linkfields offices in South Africa, India, the USA, the UAE and Australia"
            >
              <defs>
                <linearGradient id="lfRoute" x1="0" x2="1">
                  <stop offset="0" stopColor="#FF7800" stopOpacity="0.15" />
                  <stop offset="0.5" stopColor="#FF7800" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#FF9A3D" stopOpacity="0.25" />
                </linearGradient>
                <radialGradient id="lfMapGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#FF7800" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#FF7800" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path d={dotsPath} className={styles.land} />

              {routes.map((r, i) => {
                const lit = r.from === activeCountry || r.to === activeCountry;
                return (
                  <g key={r.key}>
                    <path d={r.d} className={`${styles.route} ${lit ? styles.routeLit : ""}`} style={{ "--i": i } as React.CSSProperties} pathLength={1} />
                    {animate && (
                      <circle r="2.6" className={styles.traveller}>
                        <animateMotion dur={`${4.5 + i * 0.7}s`} repeatCount="indefinite" path={r.d} />
                      </circle>
                    )}
                  </g>
                );
              })}

              {OFFICE_GEO.map((o) => {
                const idx = offices.findIndex((x) => x.country === o.country);
                const isActive = idx === active;
                const x = px(o.lon);
                const y = py(o.lat);
                const labelLeft = o.lon > 100;
                return (
                  <g
                    key={o.country}
                    className={`${styles.marker} ${isActive ? styles.markerActive : ""}`}
                    transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                    onMouseEnter={() => idx >= 0 && setActive(idx)}
                  >
                    <circle r="26" fill="url(#lfMapGlow)" className={styles.markerGlow} />
                    <circle r="9" className={styles.markerPulse} />
                    <circle r="4.6" className={styles.markerDot} />
                    <g transform={`translate(${labelLeft ? -12 : 12} -12)`}>
                      <rect
                        x={labelLeft ? -(o.country.length * 7.2 + 18) : 0}
                        y="-11"
                        width={o.country.length * 7.2 + 18}
                        height="22"
                        rx="11"
                        className={styles.labelBg}
                      />
                      <text x={labelLeft ? -9 : 9} y="4" textAnchor={labelLeft ? "end" : "start"} className={styles.labelText}>
                        {o.country}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className={styles.panel}>
            <p className={styles.panelHead}>
              <span className="lf-tag">Linkfields / Offices</span>
              <span className={styles.panelCount}>
                {String(active + 1).padStart(2, "0")} / {String(offices.length).padStart(2, "0")}
              </span>
            </p>
            <ul className={styles.offices}>
              {offices.map((o, i) => (
                <li key={o.country}>
                  <button
                    type="button"
                    className={`${styles.office} ${i === active ? styles.officeActive : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                  >
                    <span className={styles.officeNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.officeBody}>
                      <span className={styles.country}>{o.country}</span>
                      <address className={styles.address}>
                        {clean(o.building)} {clean(o.landmark)}, {clean(o.city)}
                        {o.pinCode && o.country !== "UAE" ? ` ${o.pinCode}` : ""}
                      </address>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <Link href="/contact-us" className="lf-link-arrow">
              <span>Contact us</span>
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GlobalPresence;
