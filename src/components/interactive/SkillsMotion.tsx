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
          className="group relative flex flex-col rounded-2xl cyber-glass-card p-6 transition-all duration-300 shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <div className="space-y-2 mb-4 pb-4 border-b border-cyan-500/15">
            <h3 className="text-base font-bold tracking-tight text-slate-100 flex items-center justify-between">
              <span className="group-hover:text-cyan-300 transition-colors">{category.title}</span>
              <span className="font-mono text-[10px] text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                {category.skills.length} items
              </span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {category.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-200"
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

