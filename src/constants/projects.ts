import type { StaticImageData } from 'next/image';
import desktopRender from '@/resources/renders/desktop.png';
import mobileRender from '@/resources/renders/mobile.png';

export type ProjectStatus = 'Live' | 'In preparation';

export interface Project {
  id: string;
  index: string;
  title: string;
  /** Short, honest description — no invented outcomes. */
  description: string;
  disciplines: string[];
  status: ProjectStatus;
  href?: string;
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
    href: 'https://github.com/elyasnoui/my-portfolio',
    scale: 'feature',
    glyph: 'grid',
    renders: { desktop: desktopRender, mobile: mobileRender },
  },
  {
    id: 'inbox-copilot',
    index: '02',
    title: 'Inbox Copilot',
    description:
      'An Outlook assistant in progress — an ASP.NET Core API behind a Next.js client, running on seeded demo data while the Microsoft Graph and Azure OpenAI integrations are built. Source is public.',
    disciplines: ['C#', 'ASP.NET Core', 'Next.js', 'TypeScript'],
    status: 'In preparation',
    href: 'https://github.com/elyasnoui/inbox-copilot',
    scale: 'feature',
    glyph: 'flow',
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
