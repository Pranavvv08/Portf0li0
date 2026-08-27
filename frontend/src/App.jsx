import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Threads from './components/ui/Threads';
import { fetchPortfolioContent } from './lib/api';
import SmoothScroll from './components/SmoothScroll';

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-lg font-medium">Loading portfolio...</p>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioContent()
      .then(setData)
      .catch((err) => {
        console.error('Failed to fetch portfolio data:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <p className="text-5xl">⚠️</p>
          <h2 className="text-2xl font-bold text-foreground">Backend Unavailable</h2>
          <p className="text-muted-foreground">
            Could not connect to the API server. Make sure the backend is running at{' '}
            <code className="text-primary">{import.meta.env.VITE_API_URL || 'http://localhost:5000'}</code>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <main>
        <div className="relative overflow-hidden">
          <Hero data={data.hero} />
          <About data={data.about} />
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Threads
              amplitude={10}
              distance={0}
              enableMouseInteraction
            />
          </div>

          <div className="relative z-10">
            <Skills data={data.skills} />

            <Projects data={data.projects} />

            <Education
              education={data.education}
              certifications={data.certifications}
            />

            <Courses data={data.courses} />
          </div>

          <Contact data={data.contact} />
        </div>

      </main>
    </div>
    </SmoothScroll>
  );
}

export default App;
