import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';

interface HeroMotionProps {
  role: string;
  headline: string;
  bio: string;
  availabilityText: string;
  workHref?: string;
  contactHref?: string;
}

export function HeroMotion({
  role,
  headline,
  bio,
  availabilityText,
  workHref = '#work',
  contactHref = '#contact',
}: HeroMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-4xl"
    >
      {/* Availability Status Badge */}
      <motion.div variants={itemVariants} className="inline-flex items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-accent-muted text-accent border border-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span>{availabilityText}</span>
        </div>
      </motion.div>

      {/* Role Kicker & Headline */}
      <div className="space-y-4">
        <motion.p
          variants={itemVariants}
          className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground"
        >
          {role}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal pt-2"
        >
          {bio}
        </motion.p>
      </div>

      {/* CTA Actions */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-4 pt-2"
      >
        <a
          href={workHref}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer group"
        >
          <span>View My Work</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>

        <a
          href={contactHref}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-muted/40 hover:border-foreground/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>Contact Me</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
