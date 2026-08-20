import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

export default function Education({ education, certifications }) {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {education.map((edu, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 rounded-full bg-background" />
                  </div>

                  {/* Content box */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-card border rounded-2xl shadow-sm group-hover:shadow-md transition-shadow group-hover:border-primary/50 relative">
                    <h4 className="font-bold text-lg mb-1">{edu.degree}</h4>
                    <p className="text-primary font-medium text-sm mb-2">{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span className="bg-secondary px-2 py-1 rounded-md">{edu.period}</span>
                      <span className="font-medium text-foreground">{edu.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="justify-center flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.a
                  key={index}
                  href={cert.link || '#'}
                  target={cert.link ? '_blank' : undefined}
                  rel={cert.link ? 'noreferrer' : undefined}
                  whileHover={{ scale: 1.02 }}
                  className="block p-5 bg-card border rounded-2xl flex gap-4 items-start shadow-sm hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-2 opacity-80">{cert.date}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
