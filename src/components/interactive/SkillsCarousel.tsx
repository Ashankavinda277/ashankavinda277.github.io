import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, type TargetAndTransition } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { SkillCategory } from '@/data/skills';
import { badgeClass } from '@/components/ui/badgeStyles';
import { buttonClass } from '@/components/ui/buttonStyles';

type Slot = 'active' | 'left' | 'right' | 'offLeft' | 'offRight';

type SlotState = TargetAndTransition;

const SLOTS: Record<Slot, SlotState> = {
  active: { x: '0%', scale: 1.05, rotateY: 0, rotateZ: 0, opacity: 1, zIndex: 30 },
  left: { x: '-75%', scale: 0.84, rotateY: 20, rotateZ: -3, opacity: 1, zIndex: 10 },
  right: { x: '75%', scale: 0.84, rotateY: -20, rotateZ: 3, opacity: 1, zIndex: 10 },
  offLeft: { x: '-140%', scale: 0.6, rotateY: 24, rotateZ: -3, opacity: 0, zIndex: 0 },
  offRight: { x: '140%', scale: 0.6, rotateY: -24, rotateZ: 3, opacity: 0, zIndex: 0 },
};

/**
 * Side cards recede by converging toward the section background rather than
 * toward black. Scrim tinted with surface works cleanly across themes.
 */
const SCRIM: Record<Slot, number> = {
  active: 0,
  left: 0.45,
  right: 0.45,
  offLeft: 0.55,
  offRight: 0.55,
};

function slotFor(index: number, activeIndex: number, total: number): Slot {
  let diff = index - activeIndex;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;

  if (diff === 0) return 'active';
  if (diff === -1) return 'left';
  if (diff === 1) return 'right';
  return diff < 0 ? 'offLeft' : 'offRight';
}

/** Monochrome SVG brand marks rendered in currentColor (14px height) */
function SkillIcon({ name }: { name: string }) {
  const n = name.toLowerCase();

  if (n.includes('react')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (n.includes('next.js')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15V9l7 8V9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (n.includes('typescript') || n === 'ts') {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 9h4m-2 0v7M14 9h3v3.5a2.5 2.5 0 0 1-5 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (n.includes('javascript') || n === 'js') {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M10 16.5v-3a1.5 1.5 0 0 0-3 0M14 16.5c1.5 0 2.5-1 2.5-2.5s-1-2-2.5-2c-1.5 0-2.5-1-2.5-2.5S12.5 7 14 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (n.includes('python')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2c-3.3 0-4 1.5-4 3.5V8h8V5.5C16 3.5 15.3 2 12 2zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8z" />
        <path d="M12 22c3.3 0 4-1.5 4-3.5V16H8v2.5c0 2 0.7 3.5 4 3.5zM16 16v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2h8z" />
        <circle cx="10" cy="5" r="0.75" fill="currentColor" />
        <circle cx="14" cy="19" r="0.75" fill="currentColor" />
      </svg>
    );
  }
  if (n.includes('tailwind')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 6c-2.7 0-4.5 1.3-5.4 4 1-1.3 2.1-1.8 3.4-1.3 1.5.6 2.2 2.3 3.3 4 1.7 2.7 3.7 4.3 6.7 4.3 2.7 0 4.5-1.3 5.4-4-1 1.3-2.1 1.8-3.4 1.3-1.5-.6-2.2-2.3-3.3-4C17.7 7.7 15.7 6 12 6z" />
      </svg>
    );
  }
  if (n.includes('docker')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13.5C3 17 6 19 12 19s9-2 9-5.5c0-1.5-1-2.5-2.5-2.5H3.5C3 11 3 12 3 13.5z" />
        <rect x="5" y="8" width="3" height="3" rx="0.5" />
        <rect x="9" y="8" width="3" height="3" rx="0.5" />
        <rect x="13" y="8" width="3" height="3" rx="0.5" />
        <rect x="9" y="4" width="3" height="3" rx="0.5" />
      </svg>
    );
  }
  if (n.includes('git')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="9" r="2" />
        <circle cx="6" cy="18" r="2" />
        <path d="M6 8v8M6 18c3 0 5-2 5-5V9c0-3 3-5 5-5" strokeLinecap="round" />
      </svg>
    );
  }
  if (n.includes('aws') || n.includes('bedrock') || n.includes('amplify') || n.includes('appsync')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.5 19C20 19 22 17 22 14.5C22 12.2 20.3 10.3 18 10C17.5 6.5 14.5 4 11 4C7.5 4 4.5 6.5 4 10C1.7 10.3 0 12.2 0 14.5C0 17 2 19 4.5 19H17.5Z" />
      </svg>
    );
  }
  if (n.includes('database') || n.includes('dynamodb') || n.includes('mongodb')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 5v14c0 1.66-4.03 3-9 3s-9-1.34-9-3V5M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      </svg>
    );
  }
  if (n.includes('fastapi') || n.includes('graphql') || n.includes('rest')) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }

  // Default code mark
  return (
    <svg className="h-3.5 w-3.5 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

interface SkillsCarouselProps {
  categories: SkillCategory[];
}

export function SkillsCarousel({ categories }: SkillsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = categories.length;
  if (total === 0) return null;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  // Auto-play timer with pause on hover/focus
  useEffect(() => {
    if (!isAutoPlaying || isHovered || shouldReduceMotion) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isHovered, shouldReduceMotion, total]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const flatten = (s: SlotState): SlotState =>
    shouldReduceMotion ? { ...s, rotateY: 0, rotateZ: 0 } : s;

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : ({ type: 'spring', stiffness: 220, damping: 22 } as const);

  const activeCategory = categories[activeIndex];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Skill categories"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mx-auto w-full space-y-6"
    >
      {/* Category selector pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        {categories.map((cat, idx) => {
          const isActive = idx === activeIndex;
          return (
            <motion.button
              key={cat.title}
              type="button"
              onClick={() => setActiveIndex(idx)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'border border-transparent bg-accent text-accent-foreground shadow-card'
                  : 'border border-border bg-card text-muted-foreground hover:border-border-hover hover:text-foreground'
              }`}
            >
              {cat.title}
            </motion.button>
          );
        })}
      </div>

      {/* 3D Coverflow Container */}
      <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden sm:h-[410px]">
        <div
          className="relative h-[330px] w-[310px] sm:h-[350px] sm:w-[460px]"
          style={{ perspective: '1400px' }}
        >
          {categories.map((category, idx) => {
            const slot = slotFor(idx, activeIndex, total);
            const isActive = slot === 'active';
            const isOff = slot === 'offLeft' || slot === 'offRight';
            const state = flatten(SLOTS[slot]);

            return (
              <motion.button
                key={category.title}
                type="button"
                initial={state}
                animate={state}
                transition={transition}
                whileHover={
                  isActive
                    ? { scale: 1.07, transition: { duration: 0.2 } }
                    : { scale: 0.88, transition: { duration: 0.2 } }
                }
                onClick={() => setActiveIndex(idx)}
                inert={isOff}
                aria-current={isActive || undefined}
                aria-label={isActive ? undefined : `Show ${category.title} skills`}
                className={`absolute inset-0 flex flex-col rounded-card border bg-card p-6 text-left transition-shadow sm:p-8 ${
                  isActive
                    ? 'cursor-default border-border-hover shadow-card-lg'
                    : isOff
                      ? 'pointer-events-none border-border'
                      : 'cursor-pointer border-border shadow-card hover:border-border-hover'
                }`}
              >
                <span className="flex min-h-0 flex-1 flex-col" aria-hidden={!isActive || undefined}>
                  <span className="flex items-start justify-between gap-3 border-b border-border pb-3">
                    <span className="block text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {category.title}
                    </span>
                    <span className={badgeClass({ variant: 'outline', className: 'shrink-0 font-mono' })}>
                      {category.skills.length} skills
                    </span>
                  </span>

                  <span className="mt-3 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </span>

                  {/* Skill Badges with interactive hover animation & monochrome brand marks */}
                  <span className="my-auto flex flex-wrap gap-2 pt-4">
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={isActive ? { scale: 1.08, y: -2 } : {}}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className={`${badgeClass()} inline-flex items-center gap-1.5 transition-colors hover:border-foreground/40 hover:bg-muted hover:text-foreground`}
                      >
                        <SkillIcon name={skill} />
                        <span>{skill}</span>
                      </motion.span>
                    ))}
                  </span>
                </span>

                {/* Depth scrim overlay for side cards */}
                <motion.span
                  aria-hidden="true"
                  /* bg-surface, not bg-background: side cards recede by
                     converging toward the colour of the section they sit in,
                     and the Skills section is bg-surface. Tinting toward
                     --background instead left the scrim slightly off, so the
                     peeks read as dimmed rather than distant. */
                  className="pointer-events-none absolute inset-0 z-10 rounded-card bg-surface"
                  initial={{ opacity: SCRIM[slot] }}
                  animate={{ opacity: SCRIM[slot] }}
                  transition={transition}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Controls & Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous category"
          className={buttonClass({ variant: 'secondary', size: 'sm', className: 'px-2.5 hover:scale-105 transition-transform' })}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Pagination Indicator Dots */}
        <div className="flex items-center gap-2">
          {categories.map((category, idx) => (
            <button
              key={category.title}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${category.title}`}
              aria-current={idx === activeIndex || undefined}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-8 bg-foreground'
                  : 'w-2.5 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next category"
          className={buttonClass({ variant: 'secondary', size: 'sm', className: 'px-2.5 hover:scale-105 transition-transform' })}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          title={isAutoPlaying ? 'Pause rotation' : 'Start rotation'}
          aria-label={isAutoPlaying ? 'Pause rotation' : 'Start rotation'}
          className="ml-2 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground"
        >
          {isAutoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {activeCategory ? `${activeCategory.title}, ${activeIndex + 1} of ${total}` : ''}
      </div>
    </div>
  );
}
