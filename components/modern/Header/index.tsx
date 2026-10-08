"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { tinaField, useTina } from "tinacms/dist/react";
import { INavbar } from "../../../interfaces/navbar";
import Logo from "../Logo";
import MobileMenu from "./MobileMenu";
import { aiCategories, featuredAiProducts, productsByCategory } from "../../../utils/data/lfiAi";
import styles from "./header.module.scss";

export type NavChild = {
  label: string;
  href?: string | null;
  icon?: string | null;
  description?: string | null;
  openInNewTab?: boolean | null;
  children?: Array<{ label: string; href?: string | null } | null> | null;
};

export type NavItem = {
  label: string;
  href?: string | null;
  description?: string | null;
  coverImage?: string | null;
  children?: Array<NavChild | null> | null;
  kind?: "ai";
  tinaSource?: any;
};

export const AI_NAV_ITEM: NavItem = {
  label: "AI & Analytics",
  href: "/ai-analytics",
  kind: "ai",
  description: "Live, working demonstrations of LFI AI and advanced analytics.",
};

/** Official navigation from Tina, with AI & Analytics inserted after Industries. */
export function buildNavItems(links: any[] | null | undefined): NavItem[] {
  const items: NavItem[] = (links || [])
    .filter(Boolean)
    .map((l: any) => ({ ...l, tinaSource: l }));
  const industriesIndex = items.findIndex((i) => i.label.toLowerCase() === "industries");
  items.splice(industriesIndex >= 0 ? industriesIndex + 1 : items.length, 0, AI_NAV_ITEM);
  return items;
}

/** First path segment an item "owns", used for the active indicator. */
function sectionOf(item: NavItem): string | null {
  const hrefs: string[] = [];
  if (item.href) hrefs.push(item.href);
  item.children?.forEach((c) => c?.href && hrefs.push(c.href));
  const internal = hrefs.find((h) => h.startsWith("/"));
  if (!internal) return null;
  return "/" + internal.split("/").filter(Boolean)[0];
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chevron = () => (
  <svg className={styles.chevron} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Dropdown panels                                                     */
/* ------------------------------------------------------------------ */

const PanelIntro = ({ item }: { item: NavItem }) => (
  <div className={styles.panelIntro}>
    {item.coverImage && (
      <div className={styles.panelCover}>
        <Image src={item.coverImage} alt="" fill sizes="280px" loading="eager" className={styles.panelCoverImg} />
      </div>
    )}
    <p className={styles.panelEyebrow}>{item.label}</p>
    {item.description && <p className={styles.panelDesc}>{item.description}</p>}
    {item.href && (
      <Link href={item.href} className={styles.panelMore}>
        <span>Explore {item.label}</span>
        <Arrow />
      </Link>
    )}
  </div>
);

const ListPanel = ({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) => (
  <div className={styles.panelInner}>
    <PanelIntro item={item} />
    <ul className={styles.panelList} data-count={item.children?.length}>
      {item.children?.filter(Boolean).map((child, i) => (
        <li key={child!.label} style={{ "--i": i } as React.CSSProperties}>
          <Link
            href={child!.href || "#"}
            target={child!.openInNewTab ? "_blank" : undefined}
            rel={child!.openInNewTab ? "noopener noreferrer" : undefined}
            className={styles.panelLink}
            onClick={onNavigate}
            data-tina-field={tinaField(child as any, "label")}
          >
            {child!.icon && (
              <span className={styles.panelIcon}>
                <Image src={child!.icon} alt="" width={22} height={22} loading="eager" />
              </span>
            )}
            <span className={styles.panelText}>
              <span className={styles.panelLabel}>{child!.label}</span>
              {child!.description && <span className={styles.panelSub}>{child!.description}</span>}
            </span>
            <span className={styles.panelArrow}>
              <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ColumnsPanel = ({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) => (
  <div className={styles.panelInner}>
    <PanelIntro item={{ ...item, href: item.href || "/services" }} />
    <div className={styles.panelColumns}>
      {item.children?.filter(Boolean).map((group, i) => (
        <div key={group!.label} className={styles.panelColumn} style={{ "--i": i } as React.CSSProperties}>
          <Link href={group!.href || "#"} className={styles.panelGroupTitle} onClick={onNavigate}>
            {group!.icon && <Image src={group!.icon} alt="" width={18} height={18} loading="eager" />}
            {group!.label}
          </Link>
          {group!.children && group!.children.length > 0 && (
            <ul>
              {group!.children.filter(Boolean).map((leaf) => (
                <li key={leaf!.label}>
                  <Link href={leaf!.href || "#"} className={styles.panelLeaf} onClick={onNavigate}>
                    {leaf!.label.replace(/\s+/g, " ").trim()}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
);

const AiPanel = ({ onNavigate }: { onNavigate: () => void }) => {
  const [active, setActive] = useState(aiCategories[0].id);
  const products = productsByCategory(active).slice(0, 4);
  return (
    <div className={`${styles.panelInner} ${styles.aiPanel}`}>
      <div className={styles.aiIntro}>
        <p className={styles.panelEyebrow}>AI &amp; Analytics</p>
        <p className={styles.panelDesc}>
          Live, working demonstrations of Linkfields AI and advanced analytics across banking, telecom, insurance and more.
        </p>
        <div className={styles.aiLogos}>
          {featuredAiProducts
            .filter((p) => p.logo?.plate === "light")
            .slice(0, 3)
            .map((p) => (
              <span key={p.id} className={styles.aiLogoChip}>
                <Image src={p.logo!.src} alt={p.name} width={96} height={64} loading="eager" />
              </span>
            ))}
        </div>
        <Link href="/ai-analytics" className={styles.panelMore} onClick={onNavigate}>
          <span>Explore AI &amp; Analytics</span>
          <Arrow />
        </Link>
      </div>
      <ul className={styles.aiCats} role="list">
        {aiCategories.map((cat, i) => (
          <li key={cat.id} style={{ "--i": i } as React.CSSProperties}>
            <Link
              href={`/ai-analytics?category=${cat.id}`}
              className={`${styles.aiCat} ${active === cat.id ? styles.aiCatActive : ""}`}
              onMouseEnter={() => setActive(cat.id)}
              onFocus={() => setActive(cat.id)}
              onClick={onNavigate}
            >
              <span className={styles.aiCatNum}>{String(i + 1).padStart(2, "0")}</span>
              {cat.short}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.aiProducts} key={active}>
        {products.map((p, i) => (
          <a
            key={p.id}
            href={p.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aiProduct}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className={styles.aiProductName}>{p.name}</span>
            <span className={styles.aiProductCta}>
              View demo <Arrow />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

const Header = (props: { navBar: INavbar }) => {
  const { data } = useTina(props.navBar);
  const navbar = data.navbar;
  const items = useMemo(() => buildNavItems(navbar.links as any[]), [navbar.links]);
  const pathname = usePathname() || "/";

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  // Legacy pages have no themed sections; keep a backdrop there so the menu stays legible.
  const [unthemed, setUnthemed] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number; visible: boolean }>({ x: 0, w: 0, visible: false });

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<number>();

  const activeIndex = useMemo(() => {
    if (pathname === "/") return -1;
    return items.findIndex((item) => {
      const section = sectionOf(item);
      return section && section !== "/" && pathname.startsWith(section);
    });
  }, [items, pathname]);

  // Compress on scroll, hide on fast downward scroll, and adopt the theme of the section under the header.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setCompact(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      setHidden(y > 480 && y > lastY + 2 && openIndex === null && !mobileOpen);
      if (y < lastY - 2) setHidden(false);
      lastY = y;
      const probeY = (headerRef.current?.offsetHeight || 72) / 2;
      const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
      let next: "dark" | "light" = "dark";
      let found = false;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          next = (s.dataset.headerTheme as any) || "dark";
          found = true;
        }
      });
      setTheme(next);
      setUnthemed(!found);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [openIndex, mobileOpen, pathname]);

  // Close menus on route change.
  useEffect(() => {
    setOpenIndex(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes the open dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const moveIndicator = useCallback((index: number | null) => {
    const list = navRef.current;
    if (!list || index === null || index < 0) {
      setIndicator((s) => ({ ...s, visible: false }));
      return;
    }
    const el = list.children[index] as HTMLElement | undefined;
    const link = el?.firstElementChild as HTMLElement | null;
    if (!el || !link) return;
    // Sit under the label text, not the padded hit area.
    const pad = parseFloat(getComputedStyle(link).paddingLeft) || 0;
    setIndicator({ x: el.offsetLeft + pad, w: el.offsetWidth - pad * 2, visible: true });
  }, []);

  const restIndex = openIndex ?? (activeIndex >= 0 ? activeIndex : null);
  useEffect(() => {
    moveIndicator(restIndex);
  }, [restIndex, moveIndicator, compact]);

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 140);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const openItem = openIndex !== null ? items[openIndex] : null;
  const onNavigate = () => setOpenIndex(null);

  return (
    <>
      <header
        ref={headerRef}
        className={[
          styles.header,
          compact ? styles.compact : "",
          unthemed ? styles.solid : "",
          hidden ? styles.hidden : "",
          theme === "light" && !mobileOpen ? styles.light : styles.dark,
          openItem ? styles.menuOpen : "",
        ].join(" ")}
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
      >
        {/* Announcement bar — official Linkfields lines (Our Journey title, hero headline). */}
        <div className={styles.announce}>
          <span ref={progressRef} className={styles.progress} aria-hidden="true" />
          <div className={styles.announceInner}>
            <span className={styles.announceLeft}>16 years of Delivering Excellence</span>
            <span className={styles.announceRight}>Driving Innovation and Transformation</span>
          </div>
        </div>

        <div className={styles.bar}>
          <Link href="/" className={styles.logo} aria-label="Linkfields Innovations — home" data-tina-field={tinaField(navbar, "logo")}>
            <Logo className={styles.logoSvg} />
          </Link>

          <nav aria-label="Main" className={styles.nav}>
            <ul ref={navRef} className={styles.navList} onMouseLeave={() => moveIndicator(restIndex)}>
              {items.map((item, index) => {
                const hasPanel = item.kind === "ai" || (item.children && item.children.length > 0);
                const isActive = index === activeIndex;
                const common = {
                  className: `${styles.navLink} ${isActive ? styles.navLinkActive : ""} ${openIndex === index ? styles.navLinkOpen : ""}`,
                  style: { "--i": index } as React.CSSProperties,
                  onMouseEnter: () => {
                    cancelClose();
                    moveIndicator(index);
                    setOpenIndex(hasPanel ? index : null);
                  },
                  "data-tina-field": item.tinaSource ? tinaField(item.tinaSource, "label") : undefined,
                };
                return (
                  <li key={item.label} className={styles.navItem}>
                    {hasPanel ? (
                      <button
                        type="button"
                        aria-expanded={openIndex === index}
                        aria-haspopup="true"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        onFocus={() => moveIndicator(index)}
                        {...common}
                      >
                        {item.label}
                        {item.kind === "ai" && <span className={styles.aiDot} aria-hidden="true" />}
                        <Chevron />
                      </button>
                    ) : (
                      <Link href={item.href || "#"} {...common}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <span
                className={styles.indicator}
                aria-hidden="true"
                style={{ transform: `translateX(${indicator.x}px)`, width: indicator.w, opacity: indicator.visible ? 1 : 0 }}
              />
            </ul>
          </nav>

          {navbar.btn?.href && (
            <Link href={navbar.btn.href} className={styles.cta} data-tina-field={tinaField(navbar, "btn")}>
              <span>{navbar.btn.label}</span>
              <Arrow />
            </Link>
          )}

          <button
            type="button"
            className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="lf-mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>

        {/* Dropdown panel */}
        <div className={`${styles.panel} ${openItem ? styles.panelOpen : ""}`} onMouseEnter={cancelClose} aria-hidden={!openItem}>
          {openItem && (
            <div className={styles.panelWrap} key={openItem.label}>
              {openItem.kind === "ai" ? (
                <AiPanel onNavigate={onNavigate} />
              ) : openItem.children?.some((c) => c?.children && c.children.length > 0) ? (
                <ColumnsPanel item={openItem} onNavigate={onNavigate} />
              ) : (
                <ListPanel item={openItem} onNavigate={onNavigate} />
              )}
            </div>
          )}
        </div>
      </header>

      <div className={`${styles.scrim} ${openItem ? styles.scrimOn : ""}`} onClick={() => setOpenIndex(null)} aria-hidden="true" />

      <MobileMenu
        open={mobileOpen}
        items={items}
        cta={navbar.btn}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
};

export default Header;
