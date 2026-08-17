import { socialLinksData } from '@/constants/socialLinks';
import SocialIcon from './SocialIcon';

const navLinks = [
  { name: 'Profile', href: '#profile' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const stack = ['.NET', 'C#', 'SQL Server', 'Power BI', 'Azure'];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="gridlines gl-dark relative overflow-hidden bg-ink text-white">
      <div className="shell relative z-10 pt-20 pb-10 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Bio */}
          <div className="lg:col-span-5">
            <p className="eyebrow text-accent">Elyas Noui</p>
            <p className="body-copy mt-5 max-w-[44ch] text-white/60">
              Technical Application Specialist at{' '}
              <span className="text-white">Lloyds Banking Group</span>. Specialising in
              automation workflows and trading systems integration, with expertise in{' '}
              <a
                href="https://www.xceptor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-accent"
              >
                Xceptor
              </a>
              .
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
              {stack.map((tech) => (
                <li key={tech} className="font-mono text-[0.6875rem] text-white/55">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="eyebrow text-white/55">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="link-underline text-sm font-medium tracking-tight text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="lg:col-span-4">
            <p className="eyebrow text-white/55">Connect</p>
            <ul className="mt-5 space-y-3">
              {socialLinksData.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="group flex items-center gap-4 text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    <SocialIcon name={link.name} className="h-4 w-4 shrink-0" />
                    <span className="link-underline">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized signature */}
        <div className="mt-20 lg:mt-28" aria-hidden>
          <span className="block font-display text-[clamp(3rem,15.5vw,14rem)] leading-[0.8] font-extrabold tracking-[-0.05em] text-white/10 select-none">
            ELYAS NOUI
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/55">
            © {currentYear} Elyas Noui. Built with Next.js, React and Tailwind CSS.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="https://github.com/elyasnoui/my-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-xs font-medium text-white/60 transition-colors duration-300 hover:text-accent"
            >
              <SocialIcon name="GitHub" className="h-3.5 w-3.5" />
              <span className="link-underline">View source code</span>
            </a>

            <a
              href="#home"
              className="group inline-flex items-center gap-2.5 text-xs font-medium text-white/60 transition-colors duration-300 hover:text-white"
            >
              Back to top
              <svg
                className="h-3 w-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M7 12V2M2 7l5-5 5 5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
