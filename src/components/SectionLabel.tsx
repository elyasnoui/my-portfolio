import Reveal from './Reveal';

type SectionLabelProps = {
  index: string;
  title: string;
  tone?: 'light' | 'dark';
  meta?: string;
};

/**
 * The repeated section marker: index, rule, title. Used by every section so the
 * page reads as one system rather than a stack of unrelated blocks.
 */
const SectionLabel = ({ index, title, tone = 'light', meta }: SectionLabelProps) => {
  const rule = tone === 'dark' ? 'bg-white/20' : 'bg-ink/20';
  const dim = tone === 'dark' ? 'text-white/55' : 'text-mute';
  const strong = tone === 'dark' ? 'text-white' : 'text-ink';
  const accent = tone === 'dark' ? 'text-accent' : 'text-accent-ink';

  return (
    <Reveal as="div" variant="fade" className="flex items-center gap-4 sm:gap-6">
      <span className={`eyebrow ${accent}`}>{index}</span>
      <span aria-hidden className={`h-px w-8 shrink-0 sm:w-14 ${rule}`} />
      <span className={`eyebrow ${strong}`}>{title}</span>
      {meta && (
        <>
          <span aria-hidden className={`hidden h-px flex-1 sm:block ${rule}`} />
          <span className={`eyebrow hidden shrink-0 sm:block ${dim}`}>{meta}</span>
        </>
      )}
    </Reveal>
  );
};

export default SectionLabel;
