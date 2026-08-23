import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

export default function Projects({ data }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, rotateY: 15 },
    show: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="projects" className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-4 px-4 -mx-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              viewport={{ once: false, amount: 0.3 }}
              className="snap-center shrink-0 w-[85vw] md:w-[420px] group relative bg-background/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Optional glowing orb behind card on hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="p-8 flex-1 flex flex-col z-10 relative">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/5"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-6">
                    {project.description}
                  </p>

                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-6">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} title={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
