import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import {
  proficiencyLegend,
  skillCategories,
  totalSkills,
  type Proficiency,
} from '@/constants/skills';

/** Proficiency is shown as a four-step meter rather than a coloured pill. */
const proficiencyStep: Record<Proficiency, number> = {
  Learning: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
};

const Meter = ({ level }: { level: Proficiency }) => {
  const step = proficiencyStep[level];
  return (
    <span
      className="flex items-center gap-1"
      role="img"
      aria-label={`${level} — ${step} of 4`}
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-2.5 w-1 ${i <= step ? 'bg-accent' : 'bg-white/15'}`}
        />
      ))}
    </span>
  );
};

const Skills = () => {
  return (
    <section id="skills" data-tone="dark" className="gridlines gl-dark relative bg-ink text-white">
      <div className="shell section-y relative z-10">
        <SectionLabel
          index="04"
          title="Capability"
          tone="dark"
          meta={`${totalSkills} technologies`}
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12">
          <Reveal as="div" className="lg:col-span-7">
            <h2 className="display-lg max-w-[15ch]">
              Organised by how I actually use them.
            </h2>
          </Reveal>
          <Reveal as="div" delay={120} className="lg:col-span-5 lg:pt-3">
            <p className="body-copy text-white/60">
              Not a logo wall. Each technology is grouped by the context it belongs
              to — daily production work, domain platforms, tooling, side projects and
              the ways of working around them — with the experience behind it.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-white/15 lg:mt-24">
          {skillCategories.map((category, categoryIndex) => (
            <Reveal
              as="div"
              key={category.title}
              delay={categoryIndex * 60}
              className="grid grid-cols-1 gap-6 border-b border-white/15 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
            >
              <div className="lg:col-span-4">
                <span className="eyebrow text-accent">
                  {String(categoryIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="display-sm mt-4 text-balance">{category.title}</h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/60">
                  {category.subtitle}
                </p>
              </div>

              <ul className="lg:col-span-8">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group border-t border-white/10 py-4 first:border-t-0 lg:first:border-t lg:py-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                      <h4 className="text-base font-semibold tracking-tight">
                        {skill.link ? (
                          <a
                            href={skill.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline text-accent"
                          >
                            {skill.name} ↗
                          </a>
                        ) : (
                          <span className="transition-colors duration-300 group-hover:text-accent">
                            {skill.name}
                          </span>
                        )}
                      </h4>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[0.6875rem] text-white/55">
                          {skill.experience}
                        </span>
                        <span className="eyebrow hidden w-24 text-white/50 sm:block">
                          {skill.proficiency}
                        </span>
                        <Meter level={skill.proficiency} />
                      </div>
                    </div>
                    <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-white/60">
                      {skill.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Legend */}
        <Reveal as="div" className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          <span className="eyebrow text-white/55">Proficiency key</span>
          {proficiencyLegend.map((entry) => (
            <div key={entry.level} className="flex items-center gap-3">
              <Meter level={entry.level} />
              <span className="text-xs text-white/65">
                <span className="font-semibold text-white/80">{entry.level}</span>
                {' — '}
                {entry.meaning}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
