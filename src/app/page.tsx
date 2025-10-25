import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Experience Section */}
        <Experience />
        
        {/* Projects Section */}
        <section id="projects" className="relative py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 right-40 w-72 h-72 bg-cyan-400/7 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute bottom-40 left-40 w-64 h-64 bg-teal-400/8 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              <span className="relative inline-block">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 blur-sm opacity-50">
                  PROJECTS
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  PROJECTS
                </span>
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Showcasing innovative solutions and technical expertise across various domains
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Web Applications', 'API Development', 'Cloud Solutions'].map((project, index) => (
                <div key={project} className="bg-gray-800/40 border border-cyan-400/20 rounded-lg p-8 shadow-[0_0_25px_rgba(34,197,94,0.1)] hover:shadow-[0_0_35px_rgba(34,197,94,0.2)] transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-green-400/20 rounded-lg mb-6 mx-auto flex items-center justify-center">
                    <div className="w-8 h-8 bg-cyan-400 rounded opacity-60"></div>
                  </div>
                  <h3 className="text-cyan-400 font-bold text-xl mb-4">{project}</h3>
                  <p className="text-gray-400">Portfolio showcase coming soon...</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="relative py-20 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-32 left-1/4 w-80 h-80 bg-emerald-400/6 rounded-full blur-3xl animate-pulse delay-300"></div>
            <div className="absolute bottom-32 right-1/4 w-72 h-72 bg-green-300/7 rounded-full blur-3xl animate-pulse delay-900"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              <span className="relative inline-block">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 blur-sm opacity-50">
                  SKILLS
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  SKILLS
                </span>
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Comprehensive technical expertise across modern development stacks
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: 'Backend', skills: ['.NET', 'C#', 'ASP.NET Core'] },
                { category: 'Frontend', skills: ['Blazor', 'React', 'TypeScript'] },
                { category: 'Database', skills: ['SQL Server', 'Entity Framework'] },
                { category: 'Tools', skills: ['Azure', 'Git', 'Docker'] }
              ].map((skillGroup, index) => (
                <div key={skillGroup.category} className="bg-gray-800/30 border border-emerald-400/20 rounded-lg p-6 shadow-[0_0_20px_rgba(34,197,94,0.08)]">
                  <h3 className="text-emerald-400 font-bold text-lg mb-4">{skillGroup.category}</h3>
                  <div className="space-y-2">
                    {skillGroup.skills.map((skill) => (
                      <div key={skill} className="text-gray-300 text-sm bg-gray-700/50 px-3 py-1 rounded border border-green-400/10">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-950 via-slate-950 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 bg-lime-400/6 rounded-full blur-3xl animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-400/8 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              <span className="relative inline-block">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 blur-sm opacity-50">
                  GET IN TOUCH
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  GET IN TOUCH
                </span>
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let&apos;s create something amazing together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: '📧', label: 'Email', value: 'elyas.noui@example.com' },
                { icon: '💼', label: 'LinkedIn', value: '/in/elyasnoui' },
                { icon: '🔗', label: 'GitHub', value: '/elyasnoui' }
              ].map((contact, index) => (
                <div key={contact.label} className="bg-gray-800/40 border border-lime-400/20 rounded-lg p-6 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-300">
                  <div className="text-2xl mb-3">{contact.icon}</div>
                  <h3 className="text-lime-400 font-bold mb-2">{contact.label}</h3>
                  <p className="text-gray-300 text-sm">{contact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
