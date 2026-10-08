"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { IFooter } from "../../../interfaces/footer";
import { BRAND_ICONS } from "../../SocialBrandIcons";
import Logo from "../Logo";
import styles from "./footer.module.scss";

const socials = [
  {
    label: "LinkedIn",
    brand: "linkedin",
    href: "https://www.linkedin.com/company/40661516/admin/feed/posts",
  },
  {
    label: "X",
    brand: "x",
    href: "https://x.com/LinkfieldsI",
  },
  {
    label: "YouTube",
    brand: "youtube",
    href: "https://www.youtube.com/channel/UCiSaCEnC7Gtu7YkanoA6mpg",
  },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Modern footer — official Tina footer content (memberships, ISO, link columns, legal). */
const Footer = (props: { footerData: IFooter }) => {
  const { data } = useTina(props.footerData);
  const footer = data.footer;
  const sections = (footer.sections || []).filter(Boolean) as any[];
  const logoSections = sections.filter((s) => s.logos?.length);
  const linkSections = sections.filter((s) => s.links?.length);
  const email = footer.bottomFooterLinks?.link || "info@linkfields.com";

  return (
    <footer className={styles.footer} data-header-theme="dark">
      <div className={`lf-container ${styles.top}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Linkfields Innovations — home">
            <Logo />
          </Link>
          <a href={`mailto:${email}`} className={styles.mail} data-tina-field={tinaField(footer.bottomFooterLinks as any, "link")}>
            <span>{email}</span>
            <Arrow />
          </a>
          <div className={styles.socials}>
            {socials.map((s) => {
              const brand = BRAND_ICONS[s.brand];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Linkfields on ${s.label}`}
                  className={styles.socialLink}
                  style={{ "--brand-glow": brand.glow } as React.CSSProperties}
                >
                  <span className={styles.socialIcon}>{brand.svg}</span>
                </a>
              );
            })}
            <a href="https://www.goodfirms.co/company/linkfields-innovations" target="_blank" rel="noopener noreferrer" aria-label="Linkfields on GoodFirms">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.goodfirms.co/badges/icon/white-goodfirms-icon.svg" alt="" width={18} height={18} />
            </a>
          </div>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {linkSections.map((section) => (
            <div key={section.title} className={styles.column} data-tina-field={tinaField(section, "title")}>
              <h2 className={styles.colTitle}>{section.title}</h2>
              <ul>
                {section.links.filter(Boolean).map((link: any) => (
                  <li key={link.label}>
                    <Link href={link.link || "#"} className={styles.colLink}>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {logoSections.length > 0 && (
        <div className={`lf-container ${styles.badges}`}>
          {logoSections.map((section) => (
            <div key={section.title} className={styles.badgeGroup} data-tina-field={tinaField(section, "title")}>
              <h2 className={styles.colTitle}>{section.title}</h2>
              <div className={styles.badgeRow}>
                {section.logos.filter(Boolean).map((logo: any) => (
                  <span key={logo.image} className={styles.badge}>
                    <Image
                      src={logo.image}
                      alt={`${section.title} logo`}
                      width={Math.round(((logo.width || 120) * 64) / (logo.height || 111))}
                      height={64}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.wordmark} aria-hidden="true">
        linkfields
      </div>

      <div className={`lf-container ${styles.bottom}`}>
        <span>© Copyright {new Date().getFullYear()} Linkfields. All Rights Reserved</span>
        <ul>
          {footer.bottomFooterLinks?.aboutCompanyLinks?.filter(Boolean).map((l: any) => (
            <li key={l.label}>
              <Link href={l.link || "#"}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
