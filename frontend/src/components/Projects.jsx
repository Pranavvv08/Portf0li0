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
    <section id="projects" className="py-24 overflow-hidden">
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
              className="snap-center shrink-0 w-[85vw] md:w-[400px] group relative bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 flex-1 flex flex-col z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-secondary rounded-full"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                </div>

                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="line-clamp-2" title={bullet}>{bullet}</li>
                    ))}
                  </ul>

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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
