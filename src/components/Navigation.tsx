'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Profile', href: '#profile' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('#home');

  // Scroll state + reading progress, batched into one rAF-throttled listener.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(top > 40);
      setProgress(max > 0 ? Math.min(top / max, 1) : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlights the section currently occupying the viewport.
  useEffect(() => {
    const ids = ['#home', ...navItems.map((i) => i.href)];
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => el !== null);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header
      // No backdrop-filter while the menu is open: it would turn the header
      // into the containing block for the fixed menu below and collapse it.
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        isMenuOpen
          ? 'border-b border-white/10 bg-ink'
          : isScrolled
            ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Reading progress hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-opacity duration-500"
        style={{ transform: `scaleX(${progress})`, opacity: isScrolled ? 1 : 0 }}
      />

      <nav className="shell" aria-label="Primary">
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-8">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 text-white"
            onClick={close}
          >
            <span className="font-display text-base font-extrabold tracking-tight">
              Elyas Noui
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 translate-y-[-1px] bg-accent transition-transform duration-500 group-hover:rotate-45"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative block px-3.5 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 bottom-1 h-px origin-right bg-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
            <li className="ml-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border border-white/25 px-4 py-2 text-[0.8125rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
              >
                Hire me
                <svg
                  className="arrow-nudge h-3 w-3"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path d="M2 12 12 2M5 2h7v7" />
                </svg>
              </a>
            </li>
          </ul>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex items-center gap-3 p-2 text-white md:hidden"
          >
            <span className="eyebrow">{isMenuOpen ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="fixed inset-x-0 top-[var(--nav-h)] z-40 h-[calc(100svh-var(--nav-h))] overflow-y-auto bg-ink md:hidden"
      >
        <div className="shell flex min-h-full flex-col justify-between py-10">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.name} className="border-b border-white/10">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline justify-between gap-4 py-5 text-white"
                >
                  <span className="display-sm">{item.name}</span>
                  <span className="eyebrow text-white/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="#contact"
              onClick={close}
              className="flex items-center justify-between gap-6 bg-accent px-6 py-4 text-sm font-semibold text-ink"
            >
              Hire me
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M2 12 12 2M5 2h7v7" />
              </svg>
            </a>
            <p className="eyebrow mt-6 text-white/55">London, UK — Available for work</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
