import { motion, useReducedMotion } from 'motion/react';
import type { SkillCategory } from '@/data/skills';

interface SkillsMotionProps {
  categories: SkillCategory[];
}

export function SkillsMotion({ categories }: SkillsMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {categories.map((category) => (
        <motion.div
          key={category.title}
          variants={cardVariants}
          className="group relative flex flex-col rounded-xl border border-border/70 bg-card p-6 hover:border-accent/40 hover:bg-card/90 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-accent/5"
        >
          <div className="space-y-2 mb-4 pb-4 border-b border-border/40">
            <h3 className="text-base font-bold tracking-tight text-foreground flex items-center justify-between">
              <span>{category.title}</span>
              <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40">
                {category.skills.length} items
              </span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {category.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono bg-muted/60 text-foreground/90 border border-border/60 hover:border-accent/50 hover:bg-accent-muted hover:text-accent transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
