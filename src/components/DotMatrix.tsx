'use client';

import { useEffect, useRef } from 'react';

/* Grid + dot geometry, all in CSS pixels. */
const DESKTOP_SPACING = 36;
const MOBILE_SPACING = 28;
const MAX_DOTS = 1800;

const DOT_RADIUS = 1.15;
const MAX_SCALE = 3.2;
const SPRITE_PAD = 1;
const R_MAX = DOT_RADIUS * MAX_SCALE;
const SPRITE_HALF = R_MAX + SPRITE_PAD;

/* Motion */
const FLOAT_AMP = 3;
const BASE_ALPHA = 0.22;
const HOVER_RADIUS = 160;
const HOVER_PUSH = 9;
const EASE = 0.12;

type DotMatrixProps = {
  className?: string;
  base?: string;
  accent?: string;
};

/**
 * A field of dots that drifts slowly, and blooms outward under the cursor.
 *
 * Drawn on a single canvas rather than as DOM nodes — a few hundred elements
 * with per-frame transforms would thrash layout. Dots are stamped from a
 * pre-rendered sprite at device resolution, so per-frame work is one
 * `drawImage` per dot with no path building.
 *
 * Decorative: `aria-hidden`, `pointer-events-none`, static under reduced
 * motion, and idle while the section is off-screen or the tab is hidden.
 */
const DotMatrix = ({
  className = '',
  base = '#ffffff',
  accent = '#ff5a1f',
}: DotMatrixProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const host = canvas.parentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');

    let dpr = 1;
    let width = 0;
    let height = 0;
    let spacing = DESKTOP_SPACING;
    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = 0;

    let baseSprite: HTMLCanvasElement | null = null;
    let accentSprite: HTMLCanvasElement | null = null;

    let frame = 0;
    let running = false;
    let visible = true;

    const pointer = { x: -9999, y: -9999, strength: 0, target: 0 };

    const makeSprite = (color: string) => {
      const span = Math.max(2, Math.ceil(SPRITE_HALF * 2 * dpr));
      const sprite = document.createElement('canvas');
      sprite.width = span;
      sprite.height = span;
      const sctx = sprite.getContext('2d');
      if (sctx) {
        sctx.fillStyle = color;
        sctx.beginPath();
        sctx.arc(span / 2, span / 2, R_MAX * dpr, 0, Math.PI * 2);
        sctx.fill();
      }
      return sprite;
    };

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, width, height);

      pointer.strength += (pointer.target - pointer.strength) * EASE;
      const influence = pointer.strength;
      const interactive = influence > 0.01;
      const hoverR2 = HOVER_RADIUS * HOVER_RADIUS;

      const t = elapsed * 0.001;
      const driftA = t * 0.6;
      const driftB = t * 0.45;

      for (let row = 0; row < rows; row++) {
        const baseY = originY + row * spacing;

        for (let col = 0; col < cols; col++) {
          const phase = col * 0.32 + row * 0.24;
          const wave = Math.sin(driftA + phase);

          let x = originX + col * spacing + wave * FLOAT_AMP;
          let y = baseY + Math.cos(driftB + phase * 0.8) * FLOAT_AMP;

          // Gentle shimmer so the field reads as alive rather than printed.
          let alpha = BASE_ALPHA * (0.6 + 0.4 * (wave * 0.5 + 0.5));
          let radius = DOT_RADIUS;
          let tint = 0;

          if (interactive) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d2 = dx * dx + dy * dy;

            if (d2 < hoverR2) {
              const d = Math.sqrt(d2) || 0.0001;
              const falloff = 1 - d / HOVER_RADIUS;
              // smoothstep, so the bloom has no hard edge
              const k = falloff * falloff * (3 - 2 * falloff) * influence;

              radius = DOT_RADIUS * (1 + (MAX_SCALE - 1) * k);
              const push = k * HOVER_PUSH;
              x += (dx / d) * push;
              y += (dy / d) * push;
              alpha += (1 - alpha) * k * 0.9;
              tint = k;
            }
          }

          const size = (2 * SPRITE_HALF * radius) / R_MAX;
          const left = x - size / 2;
          const top = y - size / 2;

          if (baseSprite && tint < 0.99) {
            ctx.globalAlpha = alpha * (1 - tint);
            ctx.drawImage(baseSprite, left, top, size, size);
          }
          if (accentSprite && tint > 0.01) {
            ctx.globalAlpha = alpha * tint;
            ctx.drawImage(accentSprite, left, top, size, size);
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    const render = (time: number) => {
      if (!running) return;
      draw(time);
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (running || reducedMotion.matches || !visible) return;
      running = true;
      frame = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      spacing = width < 640 ? MOBILE_SPACING : DESKTOP_SPACING;
      // Thin the field out rather than let huge viewports balloon the dot count.
      while (
        (Math.ceil(width / spacing) + 2) * (Math.ceil(height / spacing) + 2) >
        MAX_DOTS
      ) {
        spacing += 2;
      }

      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;
      originX = (width - (cols - 1) * spacing) / 2;
      originY = (height - (rows - 1) * spacing) / 2;

      baseSprite = makeSprite(base);
      accentSprite = makeSprite(accent);

      // Paint one frame immediately so there is never a blank first paint.
      draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.target = 1;
    };

    const onPointerLeave = () => {
      pointer.target = 0;
    };

    const onMotionChange = () => {
      stop();
      layout();
      start();
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    layout();

    const resizeObserver = new ResizeObserver(() => {
      layout();
    });
    resizeObserver.observe(canvas);

    // Only pauses the loop when the section is reported off-screen; if the
    // observer never fires, the animation simply keeps running.
    let intersectionObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          if (visible) start();
          else stop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);
    }

    if (finePointer.matches && host) {
      host.addEventListener('pointermove', onPointerMove, { passive: true });
      host.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onMotionChange);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      if (host) {
        host.removeEventListener('pointermove', onPointerMove);
        host.removeEventListener('pointerleave', onPointerLeave);
      }
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, [base, accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default DotMatrix;
