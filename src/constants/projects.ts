import type { StaticImageData } from 'next/image';
import desktopRender from '@/resources/renders/desktop.png';
import mobileRender from '@/resources/renders/mobile.png';
import inboxDesktopRender from '@/resources/renders/inbox-copilot-desktop.png';
import inboxMobileRender from '@/resources/renders/inbox-copilot-mobile.png';
import venueDesktopRender from '@/resources/renders/venuecompliant-desktop.png';
import venueMobileRender from '@/resources/renders/venuecompliant-mobile.png';

export type ProjectStatus = 'Live' | 'In preparation';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  /** Short, honest description — no invented outcomes. */
  description: string;
  disciplines: string[];
  status: ProjectStatus;
  /**
   * Destinations for this entry. The first also makes the whole card clickable;
   * any others render beside it as ordinary links.
   */
  links?: ProjectLink[];
  /**
   * Slug of a write-up on this site. When present it takes over as the card's own
   * destination, since keeping a reader here beats sending them to GitHub.
   */
  caseStudy?: string;
  /** 'feature' spans the full grid, 'standard' pairs up two-across. */
  scale: 'feature' | 'standard';
  /** Selects the abstract graphic drawn for this entry. */
  glyph: 'grid' | 'flow' | 'stack' | 'nodes';
  /** Real screenshots, shown in device frames instead of the abstract glyph. */
  renders?: { desktop: StaticImageData; mobile: StaticImageData };
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    index: '01',
    title: 'This Portfolio',
    description:
      'The site you are reading — designed and built from scratch with Next.js, React and Tailwind CSS. Source is public.',
    disciplines: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    status: 'Live',
    links: [{ label: 'View source', href: 'https://github.com/elyasnoui/my-portfolio' }],
    scale: 'feature',
    glyph: 'grid',
    renders: { desktop: desktopRender, mobile: mobileRender },
  },
  {
    id: 'venuecompliant',
    index: '02',
    title: 'VenueCompliant',
    description:
      'A Martyn’s Law compliance tool for UK venues, built ahead of the Act’s spring 2027 enforcement. A free checker decides whether a premises or an event falls in scope and at which tier; the paid product composes the four written procedures the Act requires, tracks staff awareness against them and reminds a venue to review them. Documents are assembled from a cited block library by attribute rather than by venue type, so fifteen kinds of venue share one library instead of fifteen — and there is deliberately no language model anywhere in the generation path. Closed-source.',
    disciplines: ['Next.js', 'React', 'TypeScript', 'Postgres', 'Stripe', 'Vercel'],
    status: 'Live',
    links: [{ label: 'Visit the site', href: 'https://venuecompliant.com' }],
    scale: 'feature',
    glyph: 'grid',
    renders: { desktop: venueDesktopRender, mobile: venueMobileRender },
    caseStudy: 'documents-as-evidence',
  },
  {
    id: 'inbox-copilot',
    index: '03',
    title: 'Inbox Copilot',
    description:
      'An Outlook assistant — an ASP.NET Core API behind a Next.js client, reading mail and calendars through Microsoft Graph and calling Azure OpenAI to summarise threads, draft replies and propose meeting times. The public demo runs on seeded mailbox data; the AI responses are generated live. Source is public.',
    disciplines: [
      'C#',
      'ASP.NET Core',
      'Microsoft Graph',
      'Azure OpenAI',
      'Next.js',
      'TypeScript',
    ],
    status: 'Live',
    links: [
      { label: 'View live demo', href: 'https://inbox-copilot-five.vercel.app' },
      { label: 'View source', href: 'https://github.com/elyasnoui/inbox-copilot' },
    ],
    scale: 'feature',
    glyph: 'flow',
    renders: { desktop: inboxDesktopRender, mobile: inboxMobileRender },
    caseStudy: 'model-reliability',
  },
  {
    id: 'tessera',
    index: '04',
    title: 'Tessera',
    description:
      'A data reconciliation platform — pipelines are configured, not coded: a step registry and a typed expression language drive a designer whose editors are generated from each step’s own parameter schema, not hand-written per step type. Ingests two feeds, applies validated rules, and produces a break queue with stable identities across reruns. Runs on SQLite or SQL Server behind the same EF Core model. Not yet public — the product is closed-source by design; the three libraries it consumes (expression engine, tabular parsing, resumable batch processing) are extracted as open-source packages.',
    disciplines: ['C#', 'ASP.NET Core', 'Blazor Server', 'EF Core', 'SQL Server', 'Docker'],
    status: 'In preparation',
    scale: 'feature',
    glyph: 'nodes',
    caseStudy: 'break-identity',
  },
  {
    id: 'web-applications',
    index: '05',
    title: 'Web Applications',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['React', 'TypeScript', 'Blazor'],
    status: 'In preparation',
    scale: 'standard',
    glyph: 'nodes',
  },
  {
    id: 'api-development',
    index: '06',
    title: 'API Development',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['C#', 'ASP.NET Core', 'SQL Server'],
    status: 'In preparation',
    scale: 'standard',
    glyph: 'grid',
  },
  {
    id: 'cloud-solutions',
    index: '07',
    title: 'Cloud Solutions',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['Azure', 'Azure DevOps', 'CI/CD'],
    status: 'In preparation',
    scale: 'feature',
    glyph: 'stack',
  },
];
