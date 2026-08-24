import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TextReveal from './ui/TextReveal';
import Orb from './ui/Orb';

export default function Hero({ data }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60">
        <Orb
          hoverIntensity={2}
          rotateOnHover
          hue={260}
          forceHoverState={false}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Open to new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">{data.name}</span>
          </motion.h1>

          <TextReveal
            text={data.taglines[1]}
            className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium justify-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center"
          >
            {data.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto"
            >
              Download Resume <Download className="ml-2 h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-6 pt-8"
          >
            <a href="https://github.com/Pranavvv08" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaGithub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/pranavsasank/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaLinkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:palivelapranavsasank99@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
