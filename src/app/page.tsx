import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import SocialSidebar from '@/components/SocialSidebar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SocialSidebar />
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
        <Skills />
        
        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
