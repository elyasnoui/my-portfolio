import { socialLinksData } from '@/constants/socialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'GitHub':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        );
      case 'Email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'WhatsApp':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-slate-950 to-black border-t border-green-400/20 overflow-hidden">
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand/About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="relative inline-block">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-40">
                  ELYAS NOUI
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                  ELYAS NOUI
                </span>
              </span>
            </h3>
            <p className="text-gray-300 mb-4 max-w-md leading-relaxed">
              Technical Application Specialist at <span className="text-green-400 font-semibold">Lloyds Banking Group</span>. 
              Specializing in automation workflows and trading systems integration with expertise in{' '}
              <a href="https://www.xceptor.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Xceptor</a>.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['.NET', 'C#', 'SQL Server', 'Power BI', 'Azure'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800/50 text-green-400 rounded border border-green-400/20 text-xs font-mono shadow-[0_0_5px_rgba(34,197,94,0.2)]"
                >
                  {tech}
                </span>
              ))}
              {/* Special Xceptor Tag */}
              <a
                href="https://www.xceptor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded border border-purple-400/30 text-xs font-mono shadow-[0_0_5px_rgba(147,51,234,0.3)] hover:shadow-[0_0_8px_rgba(147,51,234,0.5)] hover:border-purple-400/50 transition-all duration-300"
              >
                Xceptor
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Connect With Me</h3>
            <div className="space-y-3 text-gray-300">
              {socialLinksData.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  {getSocialIcon(link.name)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-green-400/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 sm:mb-0">
              {socialLinksData.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
            <div className="text-gray-400 text-sm">
              © {currentYear} Elyas Noui. Crafted with{' '}
              <span className="text-green-400 animate-pulse mr-1">💚</span>
              {' '}
              <a
                href="https://github.com/elyasnoui/my-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 hover:text-emerald-400 hover:bg-green-400/20 rounded border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] group"
              >
                <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium pl-1" style={{paddingTop: '2px'}}>View Source Code</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;