import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import portfolioData from '../../content.json';
import Threads from './components/ui/Threads';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <main>
        <div className="relative overflow-hidden">
          <Hero data={portfolioData.hero} />
          <About data={portfolioData.about} />
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Threads
              amplitude={10}
              distance={0}
              enableMouseInteraction
            />
          </div>

          <div className="relative z-10">
            <Skills data={portfolioData.skills} />

            <Projects data={portfolioData.projects} />

            <Education
              education={portfolioData.education}
              certifications={portfolioData.certifications}
            />
          </div>

          <Contact data={portfolioData.contact} />
        </div>

      </main>
    </div>
  );
}


export default App;
