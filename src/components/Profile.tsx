import Counter from './Counter';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { totalDisciplines, totalSkills } from '@/constants/skills';

/** Years since the Lloyds Banking Group role began (Aug 2022). */
const yearsSince = (year: number, monthIndex: number) => {
  const now = new Date();
  let years = now.getFullYear() - year;
  if (now.getMonth() < monthIndex) years -= 1;
  return years;
};

const disciplines = [
  'Workflow automation',
  'Trading systems integration',
  'Financial data processing',
  'MI extracts & reporting',
  'Backend engineering (.NET)',
];

const Profile = () => {
  const years = yearsSince(2022, 7);

  const metrics = [
    { value: years, pad: 2, label: 'Years in industry', note: 'Lloyds Banking Group, since Aug 2022' },
    { value: 70, prefix: '~', suffix: '%', label: 'STP uptick', note: 'Trade confirmations, via enhanced match rules' },
    { value: totalSkills, pad: 2, label: 'Technologies', note: 'Tracked across five disciplines' },
    { value: totalDisciplines, pad: 2, label: 'Disciplines', note: 'From platform automation to frontend' },
  ];

  return (
    <section id="profile" data-tone="light" className="gridlines gl-light relative bg-paper text-ink">
      <div className="shell section-y relative z-10">
        <SectionLabel index="01" title="Profile" tone="light" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal as="div" className="lg:col-span-7">
            <h2 className="display-lg">
              I work where financial operations meet software — turning manual,
              fragile processes into{' '}
              <span className="text-accent-ink">automation that runs unattended</span>.
            </h2>
          </Reveal>

          <Reveal as="div" delay={120} className="lg:col-span-5 lg:pt-4">
            <p className="body-copy text-mute">
              I&apos;m a Software Engineer at Lloyds Banking Group, working on the
              Xceptor platform to build and maintain automation workflows across
              upstream and downstream trading systems. Day to day that means .NET and
              C# services, SQL Server, MI extracts feeding Power BI, and match rules
              that decide whether a trade confirmation clears on its own.
            </p>
            <p className="body-copy mt-5 text-mute">
              Before that: a Computer Science degree at City St George&apos;s,
              University of London, and a technology internship with Bright Network.
              I&apos;m based in London and open to remote collaboration.
            </p>

            <ul className="mt-8 border-t border-paper-line">
              {disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="flex items-center gap-4 border-b border-paper-line py-3"
                >
                  <span aria-hidden className="h-1 w-1 shrink-0 bg-accent-ink" />
                  <span className="text-sm font-medium tracking-tight">{discipline}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Metrics — typographic, not cards. */}
        <div className="mt-16 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal
              as="div"
              key={metric.label}
              delay={i * 90}
              className="border-b border-ink/15 py-8 sm:border-b-0 sm:py-10 lg:border-r lg:border-ink/15 lg:pr-8 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8"
            >
              <span className="metric block text-ink">
                <Counter
                  value={metric.value}
                  pad={metric.pad}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </span>
              <span className="eyebrow mt-5 block text-accent-ink">{metric.label}</span>
              <span className="mt-2 block max-w-[26ch] text-xs leading-relaxed text-mute">
                {metric.note}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
