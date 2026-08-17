'use client';

import { useEffect, useState } from 'react';
import CodeWindow from './CodeWindow';

const stack = ['C# / .NET', 'SQL Server', 'Azure', 'Power BI', 'React', 'TypeScript'];

const Hero = () => {
  // Page-load reveal: the hero is above the fold, so it animates on mount
  // rather than on scroll. One tick after paint so the transition actually runs.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(id);
  }, []);

  const reveal = loaded ? 'is-revealed' : '';

  return (
    <section
      id="home"
      data-tone="dark"
      className="atmos gridlines gl-dark relative isolate overflow-hidden bg-ink text-white"
    >
      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-between pt-24 pb-0 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* ---- Statement ---- */}
          <div className="lg:col-span-6 2xl:col-span-7">
            <div
              data-reveal="fade"
              className={`${reveal} mb-8 flex flex-wrap items-center gap-x-5 gap-y-2`}
              style={{ ['--reveal-delay' as string]: '80ms' }}
            >
              <span className="eyebrow text-accent">Elyas Noui</span>
              <span aria-hidden className="hidden h-px w-10 bg-white/25 sm:block" />
              <span className="eyebrow text-white/55">Software Engineer</span>
              <span aria-hidden className="hidden h-px w-10 bg-white/25 sm:block" />
              <span className="eyebrow text-white/55">London, UK</span>
            </div>

            <h1 className={`display-xl ${reveal} max-w-[13ch] text-balance`}>
              {['Automation', 'for systems', 'that'].map((lineText, i) => (
                <span className="line-mask" key={lineText}>
                  <span style={{ ['--reveal-delay' as string]: `${160 + i * 90}ms` }}>
                    {lineText}
                  </span>
                </span>
              ))}
              <span className="line-mask">
                <span
                  className="text-accent"
                  style={{ ['--reveal-delay' as string]: '430ms' }}
                >
                  can&apos;t fail.
                </span>
              </span>
            </h1>

            <div
              data-reveal=""
              className={`${reveal} mt-9`}
              style={{ ['--reveal-delay' as string]: '560ms' }}
            >
              <p className="lede measure text-white/65">
                I&apos;m a Software Engineer at{' '}
                <span className="text-white">Lloyds Banking Group</span>, building
                automation workflows across upstream and downstream trading systems —
                with{' '}
                <a
                  href="https://www.xceptor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-accent"
                >
                  Xceptor
                </a>
                , .NET and SQL Server underneath.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-between gap-6 bg-white px-7 py-4 text-sm font-semibold tracking-tight text-ink transition-colors duration-300 hover:bg-accent hover:text-white sm:justify-start"
                >
                  Selected work
                  <svg
                    className="arrow-nudge h-3.5 w-3.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M2 12 12 2M5 2h7v7" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-between gap-6 border border-white/25 px-7 py-4 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:border-white hover:bg-white/5 sm:justify-start"
                >
                  Get in touch
                  <svg
                    className="arrow-nudge h-3.5 w-3.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M2 12 12 2M5 2h7v7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ---- Technical showcase ---- */}
          <div
            data-reveal=""
            className={`${reveal} lg:col-span-6 2xl:col-span-5`}
            style={{ ['--reveal-delay' as string]: '340ms' }}
          >
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <span className="eyebrow text-white/40">Currently compiling</span>
              <span className="eyebrow text-white/25">01 — 01</span>
            </div>
            <CodeWindow />
          </div>
        </div>

        {/* ---- Metadata rail: bridges the statement and the code block ---- */}
        <div className="mt-12 border-t border-white/10 lg:mt-12">
          <div className="flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="eyebrow text-white/70">
                Available for new opportunities
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="eyebrow text-white/35">Core stack</span>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#profile"
              className="group hidden items-center gap-3 text-white/45 transition-colors duration-300 hover:text-white lg:flex"
              aria-label="Scroll to profile"
            >
              <span className="eyebrow">Scroll</span>
              <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-3 animate-bounce bg-accent" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
