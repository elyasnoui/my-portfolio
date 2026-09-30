'use client';

import { useEffect, useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import iphoneFrame from '@/resources/renders/iphone-frame.png';

type DeviceShowcaseProps = {
  desktop: StaticImageData;
  mobile: StaticImageData;
  desktopAlt: string;
  mobileAlt: string;
  className?: string;
};

/* The iPhone mockup's transparent screen, found by flood-filling the enclosed
   transparent region of its alpha channel: 389×850 at (19, 14) within the
   427×878 body. Measuring by expanding outward from the centre does NOT work
   here: the Dynamic Island is opaque, so it halts the upward scan and reports a
   screen that starts below it.

   The frame's opaque bezel stops about 2px SHORT of that cutout on every side,
   with a soft antialiased edge in between. So the screenshot must not stop at the
   cutout either: it has to run on underneath until it reaches solid bezel.
   Anything less leaves that soft ring with the page behind it rather than the
   screenshot, which reads as a pale halo just inside the screen's edge — the join
   looks unanchored. Measured outward from the cutout, solid bezel begins at 3px
   on the left and bottom and 4px on the top and right, and runs to 13-16px before
   the phone's outer edge. A 4px overhang sits inside that window on all sides.

   The corners decide the radius, and there the cutout is a squircle rather than
   an arc: its inset from the left edge runs 85, 47, 25, 11, 4, 2, 0 over the
   first 54 rows, where a circular corner would start at 54 and fall away far
   faster. `border-radius` only draws an ellipse, so nothing traces it exactly —
   the corner simply has to stay in the same window the straight edges use, past
   the cutout but not past the bezel.

   Fitting row by row is not enough on its own, and silently leaves the top
   corners leaking: a corner is bounded along both of its edges, so the fit has to
   hold per row AND per column. The four corners differ slightly too, so one
   radius has to satisfy the tightest of them.

   Percentages are per-axis — 15.62% of the box's width, 7.11% of its height — so
   the corner holds its shape at any rendered size. */
const SCREEN = {
  left: '3.513%',
  top: '1.139%',
  width: '92.974%',
  height: '97.722%',
  borderRadius: '15.62% / 7.11%',
};

/** Distance at which proximity reaches zero, as a multiple of device size. */
const FALLOFF = 1.15;
/** Per-frame easing toward the target; lower is smoother and laggier. */
const SMOOTHING = 0.18;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * A desktop render in dark browser chrome beside a mobile render wearing a
 * real iPhone mockup as its cover.
 *
 * Each screenshot is linked to the cursor rather than to a binary :hover —
 * it rises and fades in proportion to how close the pointer is to that
 * device's own centre, so the two respond independently and continuously as
 * the mouse crosses the stage. The 0…1 factor is smoothed in JS and written
 * to a `--prox` custom property; `.proximity-reveal` in globals.css maps it
 * to opacity and translate, and opts out entirely for coarse pointers and
 * reduced motion (see the media query there).
 *
 * Both frames share one height list (`h-48 sm:h-56 lg:h-72 xl:h-80`) so they
 * always match; each derives its own width from that height via aspect-ratio.
 */
const DeviceShowcase = ({
  desktop,
  mobile,
  desktopAlt,
  mobileAlt,
  className = '',
}: DeviceShowcaseProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // No pointer to be near, or motion opted out — the CSS already pins
    // these fully visible, so skip the listener and the loop entirely.
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const targets = [
      { ref: desktopRef, current: 0, target: 0 },
      { ref: mobileRef, current: 0, target: 0 },
    ];

    let frame = 0;
    let visible = true;
    let running = false;

    const step = () => {
      let settled = true;

      for (const t of targets) {
        t.current += (t.target - t.current) * SMOOTHING;
        if (Math.abs(t.target - t.current) > 0.001) settled = false;
        else t.current = t.target;
        t.ref.current?.style.setProperty('--prox', t.current.toFixed(4));
      }

      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const onPointerMove = (event: PointerEvent) => {
      for (const t of targets) {
        const node = t.ref.current;
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const radius = Math.max(rect.width, rect.height) * FALLOFF;
        t.target = smoothstep(Math.min(Math.max(1 - distance / radius, 0), 1));
      }
      start();
    };

    const onPointerLeave = () => {
      for (const t of targets) t.target = 0;
      start();
    };

    // Tracked on the window so a device begins responding as the cursor
    // approaches, rather than snapping when it crosses the stage boundary.
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    // Only ever pauses the loop; if the observer never reports, the effect
    // simply keeps working.
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          if (visible) start();
        },
        { rootMargin: '20% 0px' }
      );
      observer.observe(root);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Sized up to the largest that still fits the stage at every breakpoint:
  // side by side the pair needs (h-36px)×1.6 + h×0.4863 + gap of horizontal
  // room, which is tightest at sm where the row first forms.
  const frameHeight = 'h-52 sm:h-56 md:h-72 lg:h-[22rem] xl:h-[28rem]';

  return (
    <div
      ref={rootRef}
      className={`flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-8 lg:gap-12 ${className}`}
    >
      {/* ---- Desktop in dark browser chrome ---- */}
      <figure className="m-0 shrink-0">
        <div
          className={`flex ${frameHeight} w-fit flex-col overflow-hidden border border-white/10 bg-ink-soft shadow-[0_24px_60px_-36px_rgba(10,10,11,0.55)]`}
        >
          {/* Chrome — dark mode. Traffic lights are coloured at rest so they
              read immediately as close/minimise/maximise. Explicit h-9 so
              the image area below can subtract a known value via calc(). */}
          <div className="flex h-9 shrink-0 items-center gap-3 border-b border-white/10 bg-ink-raised px-3.5">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            {/* Address strip — deliberately unlabelled; the site has no
                published domain to show and inventing one would be a lie. */}
            <span aria-hidden className="h-3.5 flex-1 border border-white/10 bg-black/25" />
          </div>

          {/* Definite height via calc() rather than flex-1: a flex-basis:0%
              column item combined with aspect-ratio did not reliably derive
              a width, collapsing to the chrome bar's intrinsic content. */}
          <div className="relative aspect-[16/10] h-[calc(100%-2.25rem)] overflow-hidden bg-ink">
            <div ref={desktopRef} className="proximity-reveal absolute inset-0">
              <Image
                src={desktop}
                alt={desktopAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 410px, (min-width: 640px) 310px, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <figcaption className="eyebrow mt-4 text-mute">Desktop</figcaption>
      </figure>

      {/* ---- Mobile wearing the iPhone mockup ---- */}
      <figure className="m-0 shrink-0">
        {/* aspect matches the cropped mockup exactly (427×878), so the
            cutout percentages above land on the real screen every time. */}
        <div className={`relative ${frameHeight} aspect-[427/878] w-auto`}>
          {/* Wireframe, inset to the cutout and sitting under the frame.
              bg-ink so any sub-pixel seam at the rounded edge reads as an
              unlit screen rather than as the light section behind it. */}
          <div
            className="absolute overflow-hidden bg-ink"
            style={{
              left: SCREEN.left,
              top: SCREEN.top,
              width: SCREEN.width,
              height: SCREEN.height,
              borderRadius: SCREEN.borderRadius,
            }}
          >
            <div ref={mobileRef} className="proximity-reveal absolute inset-0">
              <Image
                src={mobile}
                alt={mobileAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 150px, (min-width: 1024px) 135px, (min-width: 640px) 105px, 90px"
                className="object-cover"
              />
            </div>
          </div>

          {/* The mockup itself — an alpha cutout over the screen, opaque
              bezel everywhere else, so it masks the wireframe's corners.
              Decorative: the wireframe below carries the alt text. */}
          <Image
            src={iphoneFrame}
            alt=""
            aria-hidden
            fill
            priority={false}
            sizes="(min-width: 1280px) 150px, (min-width: 1024px) 135px, (min-width: 640px) 105px, 90px"
            className="pointer-events-none relative z-10 object-contain"
          />
        </div>
        <figcaption className="eyebrow mt-4 text-center text-mute sm:text-left">
          Mobile
        </figcaption>
      </figure>
    </div>
  );
};

export default DeviceShowcase;
