import { skillCategories } from '@/constants/skills';

// Every technology and capability actually listed in the skills data.
const items = skillCategories.flatMap((category) =>
  category.skills.map((skill) => skill.name)
);

/**
 * The accent band between Selected work and Skills. Pure CSS animation on a
 * single transform, duplicated once for a seamless loop, paused on hover and
 * disabled under reduced motion.
 */
const TechMarquee = () => {
  const track = [...items, ...items];

  return (
    <section
      aria-label="Technologies"
      data-tone="light"
      className="marquee-host relative overflow-hidden border-y border-ink/10 bg-accent py-5 text-ink select-none"
    >
      <div className="marquee">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 pr-8 font-display text-sm font-bold tracking-tight whitespace-nowrap sm:text-base"
            aria-hidden={i >= items.length}
          >
            {item}
            <span aria-hidden className="h-1 w-1 rotate-45 bg-ink/50" />
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
