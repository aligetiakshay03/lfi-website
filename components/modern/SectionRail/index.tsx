"use client";
import React from "react";
import Reveal from "../Reveal";

/**
 * Pill-labelled divider between sections: "LABEL ——• LABEL ——• LABEL".
 * Labels are short official Linkfields terms; the lines draw in on reveal.
 */
const SectionRail = ({ labels, dark = false, className = "" }: { labels: string[]; dark?: boolean; className?: string }) => (
  <div className={`lf-container ${className}`} aria-hidden="true">
    <Reveal variant="fade" className={`lf-rail ${dark ? "lf-rail--dark" : ""}`}>
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          <span className="lf-rail__pill">{label}</span>
          {i < labels.length - 1 && <span className="lf-rail__line" />}
        </React.Fragment>
      ))}
    </Reveal>
  </div>
);

export default SectionRail;
