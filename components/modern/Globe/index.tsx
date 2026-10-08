"use client";
import React, { useEffect, useRef } from "react";
import { GLOBE_DOTS } from "../../../utils/data/landDots";
import { OFFICE_GEO, OFFICE_LINKS } from "../../../utils/data/offices";
import { isCoarsePointer, prefersReducedMotion } from "../lib/motion";

type Vec = [number, number, number];

const DEG = Math.PI / 180;

/** Unit-sphere cartesian coordinates (y up, z towards viewer at lon=0). */
const toXYZ = (lat: number, lon: number): Vec => {
  const la = lat * DEG;
  const lo = lon * DEG;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};

/** Spherical interpolation between two unit vectors. */
const slerp = (a: Vec, b: Vec, t: number): Vec => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-6) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
};

/**
 * Dotted land globe on canvas (Natural Earth land data), with Linkfields office markers
 * and great-circle arcs between them. Rotates slowly, follows the pointer slightly,
 * pauses offscreen, and renders a single still frame for reduced motion.
 */
const Globe = ({ className = "", initialLon = 42 }: { className?: string; initialLon?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots: Vec[] = [];
    for (let i = 0; i < GLOBE_DOTS.length; i += 2) dots.push(toXYZ(GLOBE_DOTS[i] / 10, GLOBE_DOTS[i + 1] / 10));
    const offices = OFFICE_GEO.map((o) => ({ ...o, v: toXYZ(o.lat, o.lon) }));
    const byName = Object.fromEntries(offices.map((o) => [o.country, o]));
    const arcs = OFFICE_LINKS.map(([a, b], i) => {
      const pa = byName[a].v;
      const pb = byName[b].v;
      const pts: Vec[] = [];
      const steps = 48;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const p = slerp(pa, pb, t);
        const lift = 1 + Math.sin(Math.PI * t) * 0.18; // raise the arc above the surface
        pts.push([p[0] * lift, p[1] * lift, p[2] * lift]);
      }
      return { pts, offset: i * 0.21 };
    });

    const reduced = prefersReducedMotion();
    const coarse = isCoarsePointer();
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let lon = initialLon;
    let last = performance.now();
    let targetX = 0;
    let targetY = 0;
    let px = 0;
    let py = 0;
    const tilt = 16 * DEG;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(performance.now());
    };

    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!reduced) lon -= dt * 0.0045; // ~80s per revolution, west-to-east like the real Earth
      px += (targetX - px) * 0.05;
      py += (targetY - py) * 0.05;

      const R = Math.min(W, H) * 0.42;
      const cx = W / 2 + px * 10;
      const cy = H / 2 + py * 8;
      const ry = -(lon + px * 6) * DEG; // rotation around y
      const rx = tilt + py * 4 * DEG; // tilt around x
      const cyR = Math.cos(ry);
      const syR = Math.sin(ry);
      const cxR = Math.cos(rx);
      const sxR = Math.sin(rx);
      const project = (v: Vec) => {
        const x1 = v[0] * cyR + v[2] * syR;
        const z1 = -v[0] * syR + v[2] * cyR;
        const y2 = v[1] * cxR - z1 * sxR;
        const z2 = v[1] * sxR + z1 * cxR;
        return [cx + x1 * R, cy - y2 * R, z2] as const;
      };

      ctx.clearRect(0, 0, W, H);

      // Atmosphere + sphere body
      const halo = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.35);
      halo.addColorStop(0, "rgba(255,120,0,0.10)");
      halo.addColorStop(0.5, "rgba(45,88,192,0.06)");
      halo.addColorStop(1, "rgba(45,88,192,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fill();

      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(40,58,96,0.55)");
      body.addColorStop(1, "rgba(10,17,34,0.9)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(226,232,240,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Graticule (a few meridians/parallels) — faint, front side only
      ctx.strokeStyle = "rgba(226,232,240,0.06)";
      ctx.lineWidth = 0.8;
      const line = (pts: Vec[]) => {
        let pen = false;
        ctx.beginPath();
        for (const v of pts) {
          const [x, y, z] = project(v);
          if (z > 0) {
            if (!pen) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
      };
      for (let la = -60; la <= 60; la += 30) {
        const pts: Vec[] = [];
        for (let lo = -180; lo <= 180; lo += 6) pts.push(toXYZ(la, lo));
        line(pts);
      }
      for (let lo = -180; lo < 180; lo += 30) {
        const pts: Vec[] = [];
        for (let la = -84; la <= 84; la += 6) pts.push(toXYZ(la, lo));
        line(pts);
      }

      // Land dots — size/alpha by depth, faint on the far side
      const size = Math.max(1, R / 230);
      ctx.fillStyle = "rgba(226,232,240,0.9)";
      for (const v of dots) {
        const [x, y, z] = project(v);
        if (z < -0.05) continue;
        ctx.globalAlpha = z > 0 ? 0.25 + z * 0.6 : 0.08;
        const s = size * (0.75 + Math.max(0, z) * 0.45);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // Arcs with a travelling highlight
      const t = now / 1000;
      for (const a of arcs) {
        const head = ((t * 0.18 + a.offset) % 1.4) - 0.2;
        ctx.lineWidth = 1.3;
        for (let i = 1; i < a.pts.length; i++) {
          const p0 = project(a.pts[i - 1]);
          const p1 = project(a.pts[i]);
          if (p0[2] < -0.1 || p1[2] < -0.1) continue;
          const f = i / a.pts.length;
          const glow = reduced ? 0 : Math.max(0, 1 - Math.abs(f - head) * 6);
          ctx.strokeStyle = `rgba(255,${120 + Math.round(glow * 60)},0,${0.28 + glow * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(p0[0], p0[1]);
          ctx.lineTo(p1[0], p1[1]);
          ctx.stroke();
        }
      }

      // Office markers with pulse
      for (const o of offices) {
        const [x, y, z] = project(o.v);
        if (z < 0) continue;
        const pulse = reduced ? 0.5 : (t * 0.7 + o.lon / 90) % 1;
        ctx.strokeStyle = `rgba(255,120,0,${(1 - pulse) * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, 4 + pulse * 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#ff7800";
        ctx.beginPath();
        ctx.arc(x, y, 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Orbit ring with a satellite
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-18 * DEG);
      ctx.strokeStyle = "rgba(255,120,0,0.22)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.22, R * 0.36, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      const sa = t * 0.35;
      const sx = Math.cos(sa) * R * 1.22;
      const sy = Math.sin(sa) * R * 0.36;
      // hide the satellite while it passes behind the globe
      if (!(Math.sin(sa) < 0 && Math.abs(sx) < R * 0.92)) {
        ctx.fillStyle = "#ffb066";
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!coarse && !reduced) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [initialLon]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Globe showing Linkfields offices in South Africa, India, the USA, the UAE and Australia"
    />
  );
};

export default Globe;
