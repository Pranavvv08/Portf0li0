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
    <section id="courses" className="py-24 relative z-10 overflow-hidden">
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
              className="snap-center shrink-0 w-[85vw] md:w-[350px] bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm font-medium text-primary mb-4">{course.instructor}</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                "{course.takeaway}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
