import type { StaticImageData } from 'next/image';
import lloydsLogo from '@/resources/logos/lloyds.png';
import brightNetworkLogo from '@/resources/logos/bright-network.png';
import cityLogo from '@/resources/logos/city-university.png';

export interface ExperienceEntry {
  id: string;
  kind: 'Role' | 'Internship' | 'Education';
  title: string;
  organisation: string;
  organisationHref?: string;
  period: string;
  current?: boolean;
  summary: string;
  tags: string[];
  /** Renders with the external-link treatment used for the Xceptor platform. */
  linkedTag?: { label: string; href: string };
  /** Official mark of the organisation — shown on a light chip on the dark timeline. */
  logo?: StaticImageData;
}

/** Career, earliest last — read as a narrative from the top. */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'lloyds',
    kind: 'Role',
    title: 'Technical Application Specialist / Software Engineer',
    organisation: 'Lloyds Banking Group',
    period: 'Aug 2022 — Present',
    current: true,
    summary:
      'Developed and maintained automation workflows using Xceptor for upstream/downstream trading systems. Led implementation of MI file extracts optimised for Power BI ingestion and achieved ~70% uptick in STP rates for trade confirmations through enhanced match rules.',
    tags: ['.NET', 'C#', 'Azure', 'Power BI', 'SQL Server', 'Agile'],
    linkedTag: { label: 'Xceptor', href: 'https://www.xceptor.com' },
    logo: lloydsLogo,
  },
  {
    id: 'bright-network',
    kind: 'Internship',
    title: 'Technology Internship Experience',
    organisation: 'Bright Network',
    period: 'Dec 2020 — Jan 2021',
    summary:
      'Outlined the project lifecycle for designing a fictitious facial recognition implementation for a large UK bank’s online banking platform. Experienced agile project management and learned how scrum teams operate within sprints to produce high-quality software.',
    tags: ['Agile', 'Project Management', 'Scrum', 'Banking Systems', 'Team Collaboration'],
    logo: brightNetworkLogo,
  },
  {
    id: 'city',
    kind: 'Education',
    title: 'BSc (Hons) Computer Science with Games Technology',
    organisation: "City St George's, University of London",
    period: 'Sep 2019 — Jul 2022',
    summary:
      'Achieved 2:1 Honours degree with modules including Programming in C++/Java, Data Structures and Algorithms, Object-Oriented Analysis and Design, and Database and Web Development. Built a strong foundation in computer science fundamentals and software engineering principles.',
    tags: ['C++', 'Java', 'Data Structures', 'Algorithms', 'OOP', 'Database Design', 'Web Development'],
    logo: cityLogo,
  },
];
