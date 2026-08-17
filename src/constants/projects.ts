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
  },
  {
    id: 'web-applications',
    index: '02',
    title: 'Web Applications',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['React', 'TypeScript', 'Blazor'],
    status: 'In preparation',
    scale: 'standard',
    glyph: 'nodes',
  },
  {
    id: 'api-development',
    index: '03',
    title: 'API Development',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['C#', 'ASP.NET Core', 'SQL Server'],
    status: 'In preparation',
    scale: 'standard',
    glyph: 'flow',
  },
  {
    id: 'cloud-solutions',
    index: '04',
    title: 'Cloud Solutions',
    description: 'Portfolio showcase coming soon.',
    disciplines: ['Azure', 'Azure DevOps', 'CI/CD'],
    status: 'In preparation',
    scale: 'feature',
    glyph: 'stack',
  },
];
