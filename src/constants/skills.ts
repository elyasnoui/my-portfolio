export type Proficiency = 'Expert' | 'Advanced' | 'Intermediate' | 'Learning';

export interface Skill {
  name: string;
  experience: string;
  proficiency: Proficiency;
  description: string;
  link?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Daily Work Stack',
    subtitle: 'Technologies I use professionally at Lloyds Banking Group',
    skills: [
      { name: '.NET Framework', experience: '3+ years', proficiency: 'Expert', description: 'Core development platform for enterprise applications' },
      { name: 'C#', experience: '3+ years', proficiency: 'Expert', description: 'Primary programming language for backend development' },
      { name: 'SQL Server', experience: '3+ years', proficiency: 'Advanced', description: 'Database management and complex query optimization' },
      { name: 'Power BI', experience: '2+ years', proficiency: 'Advanced', description: 'MI reporting and data visualization for trading systems' },
      { name: 'Azure', experience: '2+ years', proficiency: 'Intermediate', description: 'Cloud infrastructure and DevOps pipelines' },
    ],
  },
  {
    title: 'Specialised Expertise',
    subtitle: 'Domain-specific tools and platforms',
    skills: [
      {
        name: 'Xceptor',
        experience: '2+ years',
        proficiency: 'Expert',
        description: 'Automation workflows for upstream/downstream trading systems',
        link: 'https://www.xceptor.com',
      },
      { name: 'Trading Systems Integration', experience: '2+ years', proficiency: 'Advanced', description: 'Achieved ~70% uptick in STP rates through enhanced match rules' },
      { name: 'Workflow Automation', experience: '2+ years', proficiency: 'Advanced', description: 'End-to-end process automation and optimization' },
      { name: 'Financial Data Processing', experience: '2+ years', proficiency: 'Advanced', description: 'Trade confirmations and regulatory reporting' },
    ],
  },
  {
    title: 'Development Tools',
    subtitle: 'Core development and collaboration tools',
    skills: [
      { name: 'Git', experience: '3+ years', proficiency: 'Advanced', description: 'Version control and collaborative development' },
      { name: 'Azure DevOps', experience: '2+ years', proficiency: 'Intermediate', description: 'CI/CD pipelines and project management' },
      { name: 'Visual Studio', experience: '3+ years', proficiency: 'Advanced', description: 'Primary IDE for .NET development' },
      { name: 'SSMS', experience: '3+ years', proficiency: 'Advanced', description: 'Database administration and query development' },
    ],
  },
  {
    title: 'Personal Projects',
    subtitle: 'Technologies I explore in side projects and learning',
    skills: [
      { name: 'React', experience: '1+ years', proficiency: 'Intermediate', description: 'Frontend development for personal portfolio projects' },
      { name: 'Next.js', experience: '6+ months', proficiency: 'Learning', description: 'Full-stack framework for modern web applications' },
      { name: 'TypeScript', experience: '1+ years', proficiency: 'Intermediate', description: 'Type-safe JavaScript for larger applications' },
      { name: 'Tailwind CSS', experience: '1+ years', proficiency: 'Intermediate', description: 'Utility-first CSS framework for rapid UI development' },
    ],
  },
  {
    title: 'Professional Skills',
    subtitle: 'Methodologies and soft skills developed through experience',
    skills: [
      { name: 'Agile/Scrum', experience: '3+ years', proficiency: 'Advanced', description: 'Sprint planning, stand-ups, and iterative development' },
      { name: 'Requirements Analysis', experience: '2+ years', proficiency: 'Intermediate', description: 'Translating business needs into technical solutions' },
      { name: 'Code Review', experience: '2+ years', proficiency: 'Advanced', description: 'Maintaining code quality and knowledge sharing' },
      { name: 'Technical Documentation', experience: '3+ years', proficiency: 'Advanced', description: 'Creating clear documentation for complex systems' },
    ],
  },
];

export const proficiencyLegend: { level: Proficiency; meaning: string }[] = [
  { level: 'Expert', meaning: 'Daily use, mentor others' },
  { level: 'Advanced', meaning: 'Confident, complex projects' },
  { level: 'Intermediate', meaning: 'Solid foundation, improving' },
  { level: 'Learning', meaning: 'Actively developing skills' },
];

export const totalSkills = skillCategories.reduce(
  (sum, category) => sum + category.skills.length,
  0
);

export const totalDisciplines = skillCategories.length;
