import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Courses({ data }) {
  if (!data || data.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    show: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="courses" className="py-16 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Courses & Learnings</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <p className="text-muted-foreground max-w-2xl text-lg">
            A deeper dive into the specific coursework and resources that have shaped my technical foundation and intuition.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-4 px-4 -mx-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.map((course, index) => (
            <motion.div
              key={index}
              variants={item}
              viewport={{ once: false, amount: 0.3 }}
              className="snap-center shrink-0 w-[85vw] md:w-[420px] relative bg-background/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 group flex flex-col overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">{course.title}</h3>
                <p className="text-sm font-semibold text-primary/80 mb-6 uppercase tracking-wider">{course.instructor}</p>
                <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-5 relative">
                  <span className="absolute -top-3 -left-2 text-4xl text-primary/30 font-serif">"</span>
                  <p className="text-muted-foreground/90 leading-relaxed text-sm italic relative z-10 pl-2">
                    {course.takeaway}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
