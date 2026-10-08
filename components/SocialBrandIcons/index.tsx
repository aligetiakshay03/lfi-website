import React from "react";

/**
 * Official social brand marks shared by every social-media
 * section on the site (contact banner + footer) so both
 * locations use the exact same assets, colors and proportions.
 * Paths are the established brand-accurate glyphs also used
 * in the site's iconography.
 *
 * The X mark uses currentColor so each section can give it the
 * right treatment: black on the banner's light chip, white on
 * the footer's dark glass circle. YouTube/LinkedIn carry their
 * official brand fills directly.
 */
export const BRAND_ICONS: Record<string, { glow: string; color: string; svg: React.ReactNode }> = {
  x: {
    glow: "rgba(11, 11, 15, 0.45)",
    color: "#0B0B0F",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.83-6.32L5.27 21H2.2l7.17-8.2L1.8 3h6.33l4.37 5.78L17.53 3Zm-1.08 16.2h1.7L7.2 4.72H5.38L16.45 19.2Z" />
      </svg>
    ),
  },
  youtube: {
    glow: "rgba(255, 0, 0, 0.5)",
    color: "#FF0000",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#FF0000" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8Z" />
        <path fill="#FFFFFF" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
      </svg>
    ),
  },
  linkedin: {
    glow: "rgba(10, 102, 194, 0.55)",
    color: "#0A66C2",
    svg: (
      <svg viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4V9.75Z" />
      </svg>
    ),
  },
};

/** Resolve a platform title ("X", "TWITTER", "YouTube", …) to its official brand mark. */
export const brandIconFor = (title: string | undefined | null) => {
  const key = (title || "").toLowerCase().trim();
  if (key === "x" || key === "twitter") return BRAND_ICONS.x;
  return BRAND_ICONS[key];
};
