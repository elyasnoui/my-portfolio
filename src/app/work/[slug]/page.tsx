import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import CaseStudyBody from '@/components/CaseStudyBody';
import { caseStudies, caseStudyBySlug } from '@/constants/caseStudies';

// Every study is known at build time, so each becomes a static page.
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(props: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};

  const title = `${study.title} — Elyas Noui`;
  return {
    title,
    description: study.lede,
    openGraph: { title, description: study.lede, type: 'article' },
  };
}

export default async function CaseStudyPage(props: PageProps<'/work/[slug]'>) {
  const { slug } = await props.params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* The site's main nav is a set of hash links into the single-page layout, which
          means nothing on a standalone route. A back link is the honest equivalent. */}
      <header className="border-b border-white/10 bg-ink text-paper">
        <div className="shell flex items-center justify-between py-5">
          <Link href="/" className="font-mono text-[0.6875rem] tracking-[0.2em] text-paper/60 uppercase transition-colors hover:text-paper">
            Elyas Noui
          </Link>
          <Link href="/#projects" className="link-underline text-sm font-semibold text-accent">
            All work
          </Link>
        </div>
      </header>

      <main id="main">
        <article>
          {/* Masthead — dark, matching the hero's tone so a study reads as part of the site. */}
          <header data-tone="dark" className="gridlines gl-dark relative bg-ink text-paper">
            <div className="shell relative z-10 py-20 lg:py-28">
              <p className="eyebrow text-paper/50">{study.project}</p>
              <h1 className="display-lg mt-6 max-w-[20ch] text-balance">{study.title}</h1>
              <p className="lede measure mt-8 text-white/65">{study.lede}</p>

              <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
                {study.stack.map((item) => (
                  <li key={item} className="font-mono text-[0.6875rem] text-paper/45">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <div data-tone="light" className="bg-paper text-ink">
            <div className="shell py-16 lg:py-24">
              <CaseStudyBody sections={study.sections} />

              <aside className="mt-16 border-t border-ink/12 pt-10">
                <p className="eyebrow text-mute">What generalises</p>
                <p className="display-sm measure mt-4 text-balance">{study.takeaway}</p>

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {study.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm font-semibold whitespace-nowrap text-accent-ink"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
