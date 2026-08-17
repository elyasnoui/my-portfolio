import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import TechMarquee from '@/components/TechMarquee';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navigation />
      <SocialSidebar />

      {/*
        Environment rhythm: dark hero → light profile → dark career →
        light work → accent band → dark capability → light contact → dark footer.
      */}
      <main id="main">
        <Hero />
        <Profile />
        <Experience />
        <Projects />
        <TechMarquee />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
