import { motion } from 'framer-motion';

export default function About({ data }) {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-muted-foreground leading-relaxed whitespace-pre-wrap"
          >
            {data.description}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6">Quick Facts</h3>
            <ul className="space-y-4">
              {data.quickFacts.map((fact, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-xl mr-3">{fact.split(' ')[0]}</span>
                  <span className="text-muted-foreground">{fact.split(' ').slice(1).join(' ')}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
