"use client";

import { useEffect, useRef } from "react";

/* ── Types ── */
interface Star     { x: number; y: number; r: number; a: number; da: number; }
interface Glitter  { x: number; y: number; vx: number; vy: number; r: number; a: number; hue: number; sat: number; life: number; maxLife: number; rot: number; drot: number; type: "diamond"|"spark"|"circle"; }
interface Raindrop { x: number; y: number; l: number; v: number; opacity: number; }
interface Firefly  { x: number; y: number; vx: number; vy: number; r: number; a: number; da: number; hue: number; }

/* ── Golden hue range: 35–55 for gold, 45–65 for champagne ── */
const GOLD_HUES = [38, 42, 45, 50, 54, 58];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Resize canvas to match full viewport ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    /* ─────────────────────────────────────────
       STARS  (220, scattered, twinkling)
    ───────────────────────────────────────── */
    const STAR_COUNT = 220;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      r:  Math.random() * 1.8 + 0.4,
      a:  Math.random(),
      da: (Math.random() * 0.009 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }));

    /* ─────────────────────────────────────────
       GOLDEN GLITTER  (up to 200 at once)
    ───────────────────────────────────────── */
    const GLITTER_MAX = 200;
    const glitters: Glitter[] = [];

    const spawnGlitter = (count = 1) => {
      for (let i = 0; i < count; i++) {
        if (glitters.length >= GLITTER_MAX) break;
        const maxLife = 100 + Math.random() * 120;
        const hue = GOLD_HUES[Math.floor(Math.random() * GOLD_HUES.length)];
        const types: Array<"diamond"|"spark"|"circle"> = ["diamond","diamond","diamond","spark","circle"];
        glitters.push({
          x: Math.random() * W(),
          y: Math.random() * H() + H() * 0.2, // spread from top to bottom
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 1.8 + 0.4),
          r:  Math.random() * 4 + 2,           // 2–6px — much larger than before
          a:  0,
          hue,
          sat: 80 + Math.random() * 20,        // 80–100% saturation
          life: 0,
          maxLife,
          rot:  Math.random() * Math.PI * 2,
          drot: (Math.random() - 0.5) * 0.18,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    /* Pre-populate half the glitters immediately so the page isn't empty on load */
    for (let i = 0; i < 80; i++) {
      spawnGlitter();
      // give them random starting lives so they appear mid-cycle
      if (glitters[i]) glitters[i].life = Math.floor(Math.random() * glitters[i].maxLife * 0.6);
    }

    /* ─────────────────────────────────────────
       RAIN  (250 drops, follows scroll)
    ───────────────────────────────────────── */
    const RAIN_COUNT = 250;
    const raindrops: Raindrop[] = Array.from({ length: RAIN_COUNT }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      l:       Math.random() * 18 + 10,        // length 10–28px
      v:       Math.random() * 7 + 5,          // speed 5–12
      opacity: Math.random() * 0.35 + 0.12,   // 0.12–0.47 — clearly visible
    }));

    /* ─────────────────────────────────────────
       FIREFLIES  (25, cyan-green glow)
    ───────────────────────────────────────── */
    const FIREFLY_COUNT = 25;
    const fireflies: Firefly[] = Array.from({ length: FIREFLY_COUNT }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r:  Math.random() * 3 + 1.5,
      a:  Math.random(),
      da: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      hue: 155 + Math.random() * 70,
    }));

    /* ─────────────────────────────────────────
       DRAW HELPERS
    ───────────────────────────────────────── */

    /** Twinkling star with 4-point sparkle on bright ones */
    const drawStar = (s: Star) => {
      ctx.save();
      ctx.globalAlpha = s.a;
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur  = s.r * 5;
      ctx.shadowColor = "rgba(210,220,255,0.9)";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.r > 1.3 && s.a > 0.55) {
        ctx.strokeStyle = "rgba(220,230,255,0.55)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 3.5, s.y); ctx.lineTo(s.x + s.r * 3.5, s.y);
        ctx.moveTo(s.x, s.y - s.r * 3.5); ctx.lineTo(s.x, s.y + s.r * 3.5);
        ctx.stroke();
      }
      ctx.restore();
    };

    /** Golden glitter — diamond / spark / circle variants */
    const drawGlitter = (g: Glitter) => {
      const progress = g.life / g.maxLife;
      const fadeIn  = progress < 0.15  ? progress / 0.15  : 1;
      const fadeOut = progress > 0.65  ? 1 - (progress - 0.65) / 0.35 : 1;
      const alpha   = Math.max(0, Math.min(1, fadeIn * fadeOut)) * 0.95;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rot);

      const color    = `hsl(${g.hue}, ${g.sat}%, 68%)`;
      const glow     = `hsl(${g.hue}, 100%, 55%)`;
      const highlight = `hsl(${g.hue + 8}, 100%, 88%)`;

      ctx.shadowBlur  = 16;
      ctx.shadowColor = glow;

      if (g.type === "diamond") {
        /* Main diamond */
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, -g.r * 2);
        ctx.lineTo(g.r, 0);
        ctx.lineTo(0,  g.r * 2);
        ctx.lineTo(-g.r, 0);
        ctx.closePath();
        ctx.fill();
        /* Highlight facet */
        ctx.fillStyle = highlight;
        ctx.globalAlpha = alpha * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -g.r * 2);
        ctx.lineTo(g.r, 0);
        ctx.lineTo(0, -g.r * 0.3);
        ctx.closePath();
        ctx.fill();
      } else if (g.type === "spark") {
        /* 4-point star spark */
        ctx.fillStyle = color;
        ctx.beginPath();
        const pts = 4, outer = g.r * 2, inner = g.r * 0.5;
        for (let i = 0; i < pts * 2; i++) {
          const angle  = (i * Math.PI) / pts;
          const radius = i % 2 === 0 ? outer : inner;
          if (i === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          else         ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        /* Glowing circle */
        ctx.fillStyle = highlight;
        ctx.beginPath();
        ctx.arc(0, 0, g.r * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    /** Blue-silver rain streak */
    const drawRain = (x: number, y: number, l: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      const grad = ctx.createLinearGradient(x, y, x - l * 0.12, y + l);
      grad.addColorStop(0, "rgba(120,180,255,0)");
      grad.addColorStop(0.4, "rgba(180,220,255,0.9)");
      grad.addColorStop(1, "rgba(100,170,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.shadowBlur  = 3;
      ctx.shadowColor = "rgba(100,180,255,0.5)";
      ctx.beginPath();
      ctx.moveTo(x,  y);
      ctx.lineTo(x - l * 0.12, y + l);
      ctx.stroke();
      ctx.restore();
    };

    /** Glowing firefly dot */
    const drawFirefly = (f: Firefly, screenY: number) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, f.a * 0.85);
      ctx.fillStyle = `hsl(${f.hue},100%,70%)`;
      ctx.shadowBlur  = 14;
      ctx.shadowColor = `hsl(${f.hue},100%,58%)`;
      ctx.beginPath();
      ctx.arc(f.x, screenY, f.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    /* ─────────────────────────────────────────
       RAF LOOP
    ───────────────────────────────────────── */
    let raf = 0;
    let frame = 0;

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, W(), H());

      /* ── Stars ── */
      for (const s of stars) {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        drawStar(s);
      }

      /* ── Golden Glitter: spawn 3 every 2 frames ── */
      if (frame % 2 === 0) spawnGlitter(3);
      for (let i = glitters.length - 1; i >= 0; i--) {
        const g = glitters[i];
        g.life++;
        if (g.life > g.maxLife) { glitters.splice(i, 1); continue; }
        g.x  += g.vx + Math.sin(g.life * 0.06) * 0.4; // gentle side drift
        g.y  += g.vy;
        g.vy += 0.018;   // light gravity
        g.rot += g.drot;
        g.a   = Math.min(1, g.a + 0.07);

        // Wrap (so glitters always refill the screen)
        if (g.x < -10)    g.x = W() + 10;
        if (g.x > W()+10) g.x = -10;
        // If drifted far off top, reset to bottom
        if (g.y < -50) { g.y = H() + 10; g.vy = -(Math.random() * 1.8 + 0.4); }

        drawGlitter(g);
      }

      /* ── Rain (fixed to viewport) ── */
      for (const d of raindrops) {
        drawRain(d.x, d.y, d.l, d.opacity);
        d.y += d.v;
        // slight lateral drift
        d.x -= d.l * 0.012;
        // reset when off bottom or left
        if (d.y > H() + d.l) {
          d.y = -d.l - Math.random() * 60;
          d.x = Math.random() * W();
        }
        if (d.x < -20) {
          d.x = W() + 20;
          d.y = Math.random() * H() * 0.5;
        }
      }

      /* ── Fireflies ── */
      for (const f of fireflies) {
        f.a += f.da;
        if (f.a <= 0.04 || f.a >= 0.96) {
          f.da *= -1;
          f.vx  = (Math.random() - 0.5) * 0.8;
          f.vy  = (Math.random() - 0.5) * 0.8;
        }
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0) f.x = W();
        if (f.x > W()) f.x = 0;
        if (f.y < 0) f.y = H();
        if (f.y > H()) f.y = 0;
        drawFirefly(f, f.y);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:          0,
        zIndex:         0,
        pointerEvents: "none",
        width:          "100vw",
        height:         "100vh",
      }}
      aria-hidden="true"
    />
  );
}
