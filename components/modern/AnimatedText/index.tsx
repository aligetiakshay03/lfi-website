"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type AnimatedTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Words (case-insensitive) rendered with the accent treatment. */
  highlight?: string[];
  /** Start immediately (hero) instead of waiting to scroll into view. */
  immediate?: boolean;
  /** Base delay in ms. */
  delay?: number;
  /** Delay between visual lines in ms. */
  lineStagger?: number;
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Line-by-line headline reveal. Words are measured after layout and grouped by
 * their rendered line, so each visual line slides up out of a mask together —
 * this survives any viewport width without hard-coding line breaks.
 */
const AnimatedText = ({
  text,
  as = "h2",
  className = "",
  highlight = [],
  immediate = false,
  delay = 0,
  lineStagger = 110,
}: AnimatedTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(/\s+/).filter(Boolean);
  const accents = highlight.map((w) => w.toLowerCase());

  // Assign each word its line index so words sharing a line animate together.
  useIsoLayoutEffect(() => {
    const node = ref.current;
    // Load-time text staggers by word index (server-rendered), so it never re-times after hydration.
    if (!node || immediate) return;
    const assign = () => {
      const spans = Array.from(node.querySelectorAll<HTMLElement>("[data-word]"));
      let line = -1;
      let lastTop = -Infinity;
      spans.forEach((span) => {
        const top = span.offsetTop;
        if (Math.abs(top - lastTop) > 4) {
          line += 1;
          lastTop = top;
        }
        span.style.setProperty("--line", String(line));
      });
    };
    assign();
    const ro = new ResizeObserver(assign);
    ro.observe(node);
    // Web fonts change line wrapping once loaded.
    (document as any).fonts?.ready?.then(assign);
    return () => ro.disconnect();
  }, [text, immediate]);

  useEffect(() => {
    // Immediate (hero) text animates with pure CSS on load — it must not wait for hydration.
    if (immediate) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`lf-split ${immediate ? "lf-split--auto" : visible ? "is-in" : ""} ${className}`}
      style={{ "--split-delay": `${delay}ms`, "--split-stagger": `${lineStagger}ms` } as React.CSSProperties}
      aria-label={text}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^\p{L}\p{N}&'-]/gu, "").toLowerCase();
        const isAccent = accents.includes(clean);
        return (
          <React.Fragment key={`${word}-${i}`}>
            <span className="lf-split__mask" aria-hidden="true">
              <span
                data-word
                className={`lf-split__word ${isAccent ? "lf-split__word--accent" : ""}`}
                style={{ "--w": i } as React.CSSProperties}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

export default AnimatedText;
