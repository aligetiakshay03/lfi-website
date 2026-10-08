"use client";
import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  /** Visual style of the entrance. */
  variant?: "up" | "fade" | "mask" | "scale";
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
  style?: React.CSSProperties;
};

/**
 * Reveals its children once they scroll into view. Uses IntersectionObserver and
 * CSS transitions (transform/opacity/clip-path only) so it stays cheap.
 */
const Reveal = ({
  children,
  as = "div",
  className = "",
  delay = 0,
  variant = "up",
  threshold = 0.15,
  style,
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // A fully clipped element never reports as intersecting, so mask reveals watch their parent.
    const target = variant === "mask" ? node.parentElement || node : node;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: variant === "mask" ? 0.05 : threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [threshold, variant]);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`lf-reveal lf-reveal--${variant} ${visible ? "is-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
