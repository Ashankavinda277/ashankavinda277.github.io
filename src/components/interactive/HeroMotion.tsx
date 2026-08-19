import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode } from 'react';

interface HeroMotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function HeroMotion({ children, delay = 0, className = '' }: HeroMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
