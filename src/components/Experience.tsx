import Image from 'next/image';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { experienceEntries } from '@/constants/experience';

const Experience = () => {
  return (
    <section
      id="experience"
      data-tone="dark"
      className="gridlines gl-dark relative bg-ink text-white"
    >
      <div className="shell section-y relative z-10">
        <SectionLabel
          index="02"
          title="Career"
          tone="dark"
          meta={`${experienceEntries.length} entries`}
        />

        <Reveal as="div" className="mt-12 lg:mt-16">
          <h2 className="display-lg max-w-[16ch]">
            A short career, spent close to the systems that matter.
          </h2>
        </Reveal>

        <ol className="mt-16 border-t border-white/15 lg:mt-24">
          {experienceEntries.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.id}
              delay={i * 100}
              className="group border-b border-white/15"
            >
              <article className="relative grid grid-cols-1 gap-6 py-10 transition-colors duration-500 lg:grid-cols-12 lg:gap-8 lg:py-12">
                {/* Accent rule that extends on hover */}
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />

                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4 lg:block">
                    <span className="eyebrow text-accent">{entry.period}</span>
                    <span aria-hidden className="h-px w-6 bg-white/20 lg:hidden" />
                    <span className="eyebrow block text-white/55 lg:mt-3">
                      {entry.kind}
                      {entry.current && (
                        <span className="ml-3 inline-flex items-center gap-2 text-white/70">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                          </span>
                          Current
                        </span>
                      )}
                    </span>
                  </div>

                  {entry.logo && (
                    // Decorative: the organisation name is already set as text
                    // beside it, so the mark itself carries no unique info.
                    <span
                      aria-hidden
                      className="mt-5 inline-flex h-10 items-center border border-ink/10 bg-white px-3 lg:h-16 lg:px-5"
                    >
                      <Image
                        src={entry.logo}
                        alt=""
                        className="h-6 w-auto object-contain lg:h-10"
                        sizes="(min-width: 1024px) 220px, 140px"
                      />
                    </span>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <h3 className="display-sm text-balance text-white transition-colors duration-500 group-hover:text-accent">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium tracking-tight text-white/55">
                    {entry.organisation}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <p className="body-copy text-white/60">{entry.summary}</p>

                  <ul className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    {entry.tags.map((tag) => (
                      <li key={tag} className="font-mono text-[0.6875rem] text-white/55">
                        {tag}
                      </li>
                    ))}
                    {entry.linkedTag && (
                      <li className="font-mono text-[0.6875rem]">
                        <a
                          href={entry.linkedTag.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-accent"
                        >
                          {entry.linkedTag.label} ↗
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
