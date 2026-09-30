import type { Block, CaseStudySection } from '@/constants/caseStudies';

/**
 * Renders a case study's body from structured blocks rather than raw markup, so the
 * content stays data and the typography stays consistent across every study.
 */
const CaseStudyBody = ({ sections }: { sections: CaseStudySection[] }) => (
  <div className="grid gap-14 lg:gap-20">
    {sections.map((section, index) => (
      /* `min-w-0` on every grid child, all the way down to the scroll box below:
         an auto track sizes to its content's minimum, so without it one long
         unbroken line inside a code block widens the whole page rather than
         scrolling within itself. */
      <section key={section.heading} className="grid min-w-0 gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-4">
          {/* Numbered so a reader can see the shape of the argument at a glance. */}
          <span className="eyebrow text-mute">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="display-sm mt-3 text-balance">{section.heading}</h2>
        </div>

        <div className="grid min-w-0 gap-5 lg:col-span-8">
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </section>
    ))}
  </div>
);

const BlockView = ({ block }: { block: Block }) => {
  switch (block.kind) {
    case 'para':
      return <p className="body-copy max-w-[62ch] text-mute">{block.text}</p>;

    case 'code':
      // Wide content scrolls inside its own box rather than widening the page.
      //
      // The width limit sits on the wrapper, not the <pre>: `ch` resolves against the
      // element's own font, so 62ch inside a monospace block is materially narrower than
      // 62ch of body text and the column edges would not line up.
      return (
        <div className="min-w-0 max-w-[62ch]">
          <pre className="overflow-x-auto border border-ink/12 bg-ink-soft p-4 text-paper">
            <code className="font-mono text-[0.75rem] leading-relaxed whitespace-pre">
              {block.code}
            </code>
          </pre>
        </div>
      );

    case 'list':
      return (
        <ul className="grid max-w-[62ch] gap-3">
          {block.items.map((item) => (
            <li key={item} className="body-copy flex gap-3 text-mute">
              <span aria-hidden className="mt-[0.6em] h-px w-4 flex-shrink-0 bg-accent-ink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'compare':
      // Nearly every bug in these studies was two readings of one fact disagreeing;
      // showing them stacked makes the contradiction the point rather than a detail.
      return (
        <figure className="m-0 max-w-[62ch] border border-ink/12">
          {block.rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4 ${
                i > 0 ? 'border-t border-ink/12' : ''
              }`}
            >
              <span className="font-mono text-[0.6875rem] text-mute">{row.label}</span>
              <span className="font-mono text-[0.75rem] text-ink">{row.value}</span>
            </div>
          ))}
          {block.caption && (
            <figcaption className="border-t border-ink/12 px-4 py-2 text-[0.75rem] text-mute">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'callout':
      return (
        <p className="body-copy max-w-[62ch] border-l-2 border-accent-ink pl-5 font-medium text-ink">
          {block.text}
        </p>
      );
  }
};

export default CaseStudyBody;
