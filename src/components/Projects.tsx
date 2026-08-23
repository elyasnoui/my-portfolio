import DeviceShowcase from './DeviceShowcase';
import ProjectGlyph from './ProjectGlyph';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { projects, type Project } from '@/constants/projects';

const ArrowIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <path d="M2 12 12 2M5 2h7v7" />
  </svg>
);

const ProjectEntry = ({ project }: { project: Project }) => {
  const isFeature = project.scale === 'feature';
  const isLive = project.status === 'Live';

  const badges = (
    <>
      <span className="eyebrow absolute left-5 top-5 text-mute">{project.index}</span>
      <span
        className={`eyebrow absolute right-5 top-5 flex items-center gap-2 ${
          isLive ? 'text-accent-ink' : 'text-mute'
        }`}
      >
        {isLive && <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" />}
        {project.status}
      </span>
    </>
  );

  const body = (
    <>
      {/* Visual — real screenshots in device frames where they exist,
          otherwise the abstract glyph. */}
      {project.renders ? (
        // No overflow-hidden here: the devices lift on hover and their
        // shadows need to render outside the stage. Each frame clips its
        // own image internally, so nothing escapes.
        <div className="relative border border-ink/12 bg-paper-pure px-5 pt-14 pb-8 sm:px-10 lg:px-14 lg:pt-16 lg:pb-10">
          {badges}
          <DeviceShowcase
            desktop={project.renders.desktop}
            mobile={project.renders.mobile}
            desktopAlt={`${project.title} — desktop layout`}
            mobileAlt={`${project.title} — mobile layout`}
          />
        </div>
      ) : (
        <div
          className={`relative overflow-hidden border border-ink/12 bg-paper-pure ${
            isFeature ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]'
          }`}
        >
          <ProjectGlyph
            variant={project.glyph}
            className="absolute inset-0 h-full w-full text-ink/45 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.04]"
          />

          {badges}

          {isLive && (
            <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center border border-ink/15 bg-paper-pure text-ink transition-colors duration-500 group-hover:border-accent-ink group-hover:bg-accent-ink group-hover:text-white">
              <ArrowIcon className="arrow-nudge h-3.5 w-3.5" />
            </span>
          )}
        </div>
      )}

      {/* Caption */}
      <div
        className={`mt-6 grid gap-4 ${
          isFeature ? 'lg:grid-cols-12 lg:gap-8' : ''
        }`}
      >
        <div className={isFeature ? 'lg:col-span-6' : ''}>
          <h3
            className={`${isFeature ? 'display-md' : 'display-sm'} text-balance transition-colors duration-500 group-hover:text-accent-ink`}
          >
            {project.title}
          </h3>
        </div>
        <div className={isFeature ? 'lg:col-span-6 lg:pt-1' : ''}>
          <p className="body-copy max-w-[52ch] text-mute">{project.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {project.disciplines.map((discipline) => (
              <li key={discipline} className="font-mono text-[0.6875rem] text-mute">
                {discipline}
              </li>
            ))}
          </ul>
          {project.href && (
            <span className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink">
              View source
              <ArrowIcon className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className = 'group block w-full';

  return project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
};

const Projects = () => {
  return (
    <section id="projects" data-tone="light" className="gridlines gl-light relative bg-paper text-ink">
      <div className="shell section-y relative z-10">
        <SectionLabel
          index="03"
          title="Selected work"
          meta={`${projects.length} entries`}
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal as="div" className="lg:col-span-7">
            <h2 className="display-lg max-w-[16ch]">
              Some work ships publicly. Most of it ships inside a bank.
            </h2>
          </Reveal>
          <Reveal as="div" delay={120} className="lg:col-span-5 lg:pt-3">
            <p className="body-copy text-mute">
              Most of what I build sits inside a bank, so it can&apos;t be published.
              These are the areas I work across — case studies are being written up
              and will land here as they clear.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12 lg:mt-24 lg:gap-y-24">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              as="div"
              delay={project.scale === 'standard' ? (i % 2) * 120 : 0}
              className={project.scale === 'feature' ? 'md:col-span-12' : 'md:col-span-6'}
            >
              <ProjectEntry project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
