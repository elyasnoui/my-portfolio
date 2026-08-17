'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pad the rendered number to this many digits. */
  pad?: number;
  durationMs?: number;
  className?: string;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up when scrolled into view. Renders the final value during SSR so the
 * number is correct without JS, and resets before first paint on the client so
 * there is no flash of the finished figure.
 */
const Counter = ({
  value,
  prefix = '',
  suffix = '',
  pad = 0,
  durationMs = 1100,
  className = '',
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    setDisplay(0);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setDisplay(Math.round(easeOut(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {pad ? String(display).padStart(pad, '0') : display}
      {suffix}
    </span>
  );
};

export default Counter;
