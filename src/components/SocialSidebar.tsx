'use client';

import { useEffect, useState } from 'react';
import { socialLinksData } from '@/constants/socialLinks';
import SocialIcon from './SocialIcon';

/**
 * Fixed social rail. The page alternates between dark and light environments,
 * so the rail reads the tone of whichever section is crossing the viewport
 * midpoint and recolours itself to stay legible.
 */
const SocialSidebar = () => {
  const [tone, setTone] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-tone]'));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        const next = hit?.target.getAttribute('data-tone');
        if (next === 'dark' || next === 'light') setTone(next);
      },
      // A thin band at the viewport midpoint — where the rail actually sits.
      // Must stay non-zero height or the observer never reports an intersection.
      { rootMargin: '-49% 0px -49% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isDark = tone === 'dark';

  return (
    <aside
      aria-label="Social links"
      className="fixed left-[max(1.25rem,calc((100vw-var(--shell-max))/2+1.25rem))] top-1/2 z-40 hidden -translate-y-1/2 min-[1390px]:block"
    >
      <ul className="flex flex-col items-center gap-1">
        {socialLinksData.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`group relative flex h-10 w-10 items-center justify-center transition-colors duration-500 ${
                isDark ? 'text-white/60 hover:text-accent' : 'text-mute hover:text-accent-ink'
              }`}
            >
              <SocialIcon name={link.name} className="relative z-10 h-[18px] w-[18px]" />

              {/* Tooltip */}
              <span
                className={`pointer-events-none absolute left-full ml-2 -translate-x-1 border px-3 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                  isDark
                    ? 'border-white/15 bg-ink-soft text-white'
                    : 'border-ink/12 bg-paper-pure text-ink'
                }`}
              >
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <span
        aria-hidden
        className={`mx-auto mt-4 block h-20 w-px transition-colors duration-500 ${
          isDark ? 'bg-white/20' : 'bg-ink/20'
        }`}
      />
    </aside>
  );
};

export default SocialSidebar;
