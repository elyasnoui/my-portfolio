import type { StaticImageData } from 'next/image';
import desktopRender from '@/resources/renders/desktop.png';
import mobileRender from '@/resources/renders/mobile.png';
import inboxDesktopRender from '@/resources/renders/inbox-copilot-desktop.png';
import inboxMobileRender from '@/resources/renders/inbox-copilot-mobile.png';

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
    id: 'inbox-copilot',
    index: '02',
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
    id: 'web-applications',
    index: '03',
    title: 'Web Applications',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['React', 'TypeScript', 'Blazor'],
    status: 'In preparation',
    scale: 'standard',
    glyph: 'nodes',
  },
  {
    id: 'api-development',
    index: '04',
    title: 'API Development',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['C#', 'ASP.NET Core', 'SQL Server'],
    status: 'In preparation',
    scale: 'standard',
    glyph: 'grid',
  },
  {
    id: 'cloud-solutions',
    index: '05',
    title: 'Cloud Solutions',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['Azure', 'Azure DevOps', 'CI/CD'],
    status: 'In preparation',
    scale: 'feature',
    glyph: 'stack',
  },
];
