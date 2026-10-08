"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { NavItem } from "./index";
import { aiCategories } from "../../../utils/data/lfiAi";
import styles from "./header.module.scss";

type Props = {
  open: boolean;
  items: NavItem[];
  cta?: { label: string; href: string } | null;
  onClose: () => void;
};

const Plus = ({ open }: { open: boolean }) => (
  <span className={`${styles.mPlus} ${open ? styles.mPlusOpen : ""}`} aria-hidden="true">
    <span />
    <span />
  </span>
);

/** Full-screen mobile navigation. Sections expand as accordions; links stagger in. */
const MobileMenu = ({ open, items, cta, onClose }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const subLinks = (item: NavItem): Array<{ label: string; href: string; external?: boolean }> => {
    if (item.kind === "ai") {
      return [
        { label: "Explore AI & Analytics", href: "/ai-analytics" },
        ...aiCategories.map((c) => ({ label: c.short, href: `/ai-analytics?category=${c.id}` })),
      ];
    }
    const links: Array<{ label: string; href: string; external?: boolean }> = [];
    if (item.href) links.push({ label: `All ${item.label}`, href: item.href });
    item.children?.forEach((c) => {
      if (c?.href) links.push({ label: c.label, href: c.href, external: !!c.openInNewTab });
    });
    return links;
  };

  return (
    <div
      id="lf-mobile-menu"
      className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className={styles.mobileInner}>
        <ul className={styles.mList}>
          {items.map((item, i) => {
            const links = subLinks(item);
            const hasSub = item.kind === "ai" || (item.children && item.children.length > 0);
            const isOpen = expanded === item.label;
            return (
              <li key={item.label} className={styles.mItem} style={{ "--i": i } as React.CSSProperties}>
                {hasSub ? (
                  <>
                    <button
                      type="button"
                      className={styles.mTop}
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      tabIndex={open ? 0 : -1}
                    >
                      <span className={styles.mNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.mLabel}>
                        {item.label}
                        {item.kind === "ai" && <span className={styles.aiDot} aria-hidden="true" />}
                      </span>
                      <Plus open={isOpen} />
                    </button>
                    <div className={`${styles.mSub} ${isOpen ? styles.mSubOpen : ""}`}>
                      <ul>
                        {links.map((l) => (
                          <li key={l.label + l.href}>
                            <Link
                              href={l.href}
                              onClick={onClose}
                              target={l.external ? "_blank" : undefined}
                              rel={l.external ? "noopener noreferrer" : undefined}
                              tabIndex={open && isOpen ? 0 : -1}
                            >
                              {l.label.replace(/\s+/g, " ").trim()}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href || "#"} className={styles.mTop} onClick={onClose} tabIndex={open ? 0 : -1}>
                    <span className={styles.mNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.mLabel}>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className={styles.mFoot} style={{ "--i": items.length } as React.CSSProperties}>
          {cta?.href && (
            <Link href={cta.href} className="lf-btn" onClick={onClose} tabIndex={open ? 0 : -1}>
              <span>{cta.label}</span>
            </Link>
          )}
          <a href="mailto:info@linkfields.com" className={styles.mMail} tabIndex={open ? 0 : -1}>
            info@linkfields.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
