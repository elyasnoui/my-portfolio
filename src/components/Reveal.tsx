'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Tag to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  /** 'rise' translates upward, 'fade' only fades (use for masked headings). */
  variant?: 'rise' | 'fade';
  /** How much of the element must be visible before revealing. */
  threshold?: number;
  id?: string;
};

/**
 * Scroll-triggered reveal built on IntersectionObserver — no animation
 * dependency, transform/opacity only, and a no-op under reduced motion.
 * The observer disconnects after the first reveal so nothing runs on scroll.
 */
const Reveal = ({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'rise',
  threshold = 0.15,
  id,
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(true);
      return;
    }

    // Anything already on screen at mount is revealed straight away — covers
    // above-the-fold content and a page hydrated after the user has scrolled.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      id={id}
      ref={ref}
      data-reveal={variant === 'fade' ? 'fade' : ''}
      className={`${revealed ? 'is-revealed' : ''} ${className}`.trim()}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
