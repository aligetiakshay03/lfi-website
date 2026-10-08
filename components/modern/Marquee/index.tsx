"use client";
import React from "react";

type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Seamless CSS marquee: the track is rendered twice and translated by -50%,
 * so the loop never visibly resets. Pauses on hover/focus; edges fade via mask.
 */
const Marquee = ({ children, duration = 40, reverse = false, className = "", ariaLabel }: MarqueeProps) => (
  <div
    className={`lf-marquee ${reverse ? "lf-marquee--reverse" : ""} ${className}`}
    style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    role="region"
    aria-label={ariaLabel}
  >
    <div className="lf-marquee__track">
      <div className="lf-marquee__group">{children}</div>
      <div className="lf-marquee__group" aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
