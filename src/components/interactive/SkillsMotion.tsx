import { useState } from 'react';
import { motion } from 'motion/react';
import type { SkillCategory } from '@/data/skills';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SkillsMotionProps {
  categories: SkillCategory[];
}

// Brand color dot and label configuration per skill
const skillBrandConfig: Record<string, { dotColor: string; label?: string }> = {
  // Frontend
  React: { dotColor: '#3b82f6', label: 'React.js' },
  'Next.js': { dotColor: '#ffffff', label: 'Next.js' },
  TypeScript: { dotColor: '#3178c6', label: 'TypeScript' },
  JavaScript: { dotColor: '#f7df1e', label: 'JavaScript' },
  HTML: { dotColor: '#e34f26', label: 'HTML5' },
  CSS: { dotColor: '#264de4', label: 'CSS3 / SCSS' },
  'Tailwind CSS': { dotColor: '#38bdf8', label: 'Tailwind CSS' },
  Astro: { dotColor: '#ff5d01', label: 'Astro' },

  // Backend
  Python: { dotColor: '#ffde57', label: 'Python' },
  FastAPI: { dotColor: '#059669', label: 'FastAPI' },
  'REST APIs': { dotColor: '#818cf8', label: 'REST APIs' },
  GraphQL: { dotColor: '#e535ab', label: 'GraphQL' },
  'Node.js': { dotColor: '#22c55e', label: 'Node.js' },

  // Cloud & Serverless
  AWS: { dotColor: '#f97316', label: 'AWS Cloud' },
  'AWS Amplify': { dotColor: '#ff9900', label: 'AWS Amplify' },
  'AWS AppSync': { dotColor: '#ff9900', label: 'AWS AppSync' },
  DynamoDB: { dotColor: '#3b82f6', label: 'DynamoDB' },
  Cognito: { dotColor: '#60a5fa', label: 'AWS Cognito' },
  'Amazon Bedrock': { dotColor: '#f43f5e', label: 'Amazon Bedrock' },

  // Database
  MongoDB: { dotColor: '#10b981', label: 'MongoDB' },
  PostgreSQL: { dotColor: '#38bdf8', label: 'PostgreSQL' },

  // Tools & DevOps
  Git: { dotColor: '#f05032', label: 'Git & GitHub' },
  GitHub: { dotColor: '#ffffff', label: 'GitHub' },
  Docker: { dotColor: '#0ea5e9', label: 'Docker' },
  Vercel: { dotColor: '#ffffff', label: 'Vercel' },
};

const defaultDotColor = '#3b82f6';

// Category Icon & Accent Mapping
const categoryMeta: Record<string, { emoji: string; color: string }> = {
  Frontend: { emoji: '🎨', color: 'from-blue-500/20 via-blue-600/10 to-transparent' },
  Backend: { emoji: '⚙️', color: 'from-blue-500/20 via-indigo-500/10 to-transparent' },
  'Cloud & Serverless': { emoji: '☁️', color: 'from-blue-500/20 via-sky-500/10 to-transparent' },
  Database: { emoji: '🗄️', color: 'from-blue-500/20 via-teal-500/10 to-transparent' },
  'Tools & DevOps': { emoji: '🛠️', color: 'from-blue-500/20 via-indigo-500/10 to-transparent' },
};

export function SkillsMotion({ categories }: SkillsMotionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const total = categories.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6 space-y-8">
      {/* 3D Carousel Stage */}
      <div className="relative w-full h-[470px] sm:h-[490px] flex items-center justify-center perspective-[1200px] overflow-hidden sm:overflow-visible">

        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous Category"
          className="absolute left-2 sm:left-4 z-40 p-3 rounded-full bg-slate-950/80 text-blue-400 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 hover:scale-110 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next Category"
          className="absolute right-2 sm:right-4 z-40 p-3 rounded-full bg-slate-950/80 text-blue-400 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 hover:scale-110 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Cards Carousel Container */}
        <div className="relative w-[340px] sm:w-[480px] h-full flex items-center justify-center">
          {categories.map((category, idx) => {
            // Calculate circular offset relative to activeIndex
            let diff = idx - activeIndex;
            if (diff > Math.floor(total / 2)) diff -= total;
            if (diff < -Math.floor(total / 2)) diff += total;

            const isActive = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            // Positioning & 3D styling based on offset position
            let xOffset = '0%';
            let scale = 1;
            let rotateY = 0;
            let rotateZ = 0;
            let opacity = 0;
            let zIndex = 0;
            let filter = 'brightness(1)';

            if (isActive) {
              xOffset = '0%';
              scale = 1.05;
              rotateY = 0;
              rotateZ = 0;
              opacity = 1;
              zIndex = 30;
              filter = 'brightness(1)';
            } else if (isLeft) {
              xOffset = '-75%';
              scale = 0.84;
              rotateY = 22;
              rotateZ = -4;
              opacity = 0.65;
              zIndex = 10;
              filter = 'brightness(0.75)';
            } else if (isRight) {
              xOffset = '75%';
              scale = 0.84;
              rotateY = -22;
              rotateZ = 4;
              opacity = 0.65;
              zIndex = 10;
              filter = 'brightness(0.75)';
            } else {
              xOffset = diff < 0 ? '-140%' : '140%';
              scale = 0.6;
              opacity = 0;
              zIndex = 0;
            }

            const meta = categoryMeta[category.title] || { emoji: '⚡', color: 'from-blue-500/20 to-transparent' };

            return (
              <motion.div
                key={category.title}
                initial={false}
                animate={{
                  x: xOffset,
                  scale,
                  rotateY,
                  rotateZ,
                  opacity,
                  zIndex,
                  filter,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 1, 0.5, 1],
                }}
                onClick={() => {
                  if (isLeft || isRight) {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-full h-[400px] sm:h-[420px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl transition-shadow duration-300 ${isLeft || isRight ? 'cursor-pointer hover:opacity-90' : ''
                  } ${isActive
                    ? 'bg-[#070b21]/95 border-2 border-blue-500/80 shadow-[0_0_40px_rgba(59,130,246,0.3)]'
                    : 'bg-[#06091d]/90 border border-slate-700/60 shadow-xl'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Ambient Top Card Accent Glow */}
                <div className={`absolute top-0 left-0 right-0 h-28 rounded-t-3xl bg-gradient-to-b ${meta.color} pointer-events-none`} />

                {/* Card Header: Emoji/Icon + Title */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{meta.emoji}</span>
                      <h3 className="text-xl font-extrabold tracking-tight text-white">
                        {category.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-blue-300 bg-slate-900/90 px-3 py-1 rounded-full border border-blue-500/30">
                      {category.skills.length} items
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Technology Badges Matrix */}
                <div className="relative z-10 my-auto flex flex-wrap gap-2.5 pt-2">
                  {category.skills.map((skill) => {
                    const conf = skillBrandConfig[skill] || { dotColor: defaultDotColor, label: skill };
                    return (
                      <div
                        key={skill}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0e1438]/90 border border-slate-700/70 text-slate-100 text-xs sm:text-sm font-semibold shadow-md hover:border-blue-400/60 hover:scale-105 transition-all"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: conf.dotColor, color: conf.dotColor }}
                        />
                        <span>{conf.label || skill}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Card Footer Indicator */}
                <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-blue-400">CATEGORY // 0{idx + 1}</span>
                  {isActive && <span className="text-blue-300 font-bold">● ACTIVE VIEW</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Circular Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2.5 pt-2">
        {categories.map((c, idx) => (
          <button
            key={c.title}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to category ${c.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex
                ? 'w-8 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
