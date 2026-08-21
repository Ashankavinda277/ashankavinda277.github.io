import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { ExplorationTopic } from '@/data/exploring';
import { badgeClass } from '@/components/ui/badgeStyles';

interface ExploringPanelProps {
  topics: ExplorationTopic[];
}

/** Body of one topic. Rendered in the desktop side panel and in the mobile accordion. */
function TopicDetail({ topic, centered = false }: { topic: ExplorationTopic; centered?: boolean }) {
  return (
    <>
      <p
        className={`max-w-2xl text-base leading-relaxed text-muted-foreground ${
          centered ? 'mx-auto text-center' : ''
        }`}
      >
        {topic.description}
      </p>

      <ul
        className={`mt-5 flex max-w-2xl flex-wrap gap-2 ${
          centered ? 'mx-auto justify-center' : ''
        }`}
      >
        {topic.technologies.map((tech) => (
          <li key={tech}>
            <span className={badgeClass({ variant: 'outline' })}>{tech}</span>
          </li>
        ))}
      </ul>

      {centered ? (
        /* mt-auto, not mt-5: in the desktop card this pins the outcome to the
           bottom edge so a short topic fills the card the tall tab rail sets,
           instead of leaving a void beneath it. */
        <p className="mx-auto mt-auto max-w-xl border-t border-border pt-6 text-center text-sm leading-relaxed text-muted-foreground">
          {topic.keyOutcome}
        </p>
      ) : (
        <p className="mt-5 border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground">
          {topic.keyOutcome}
        </p>
      )}
    </>
  );
}

export function ExploringPanel({ topics }: ExploringPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = topics.length;
  if (total === 0) return null;

  const active = topics[activeIndex];

  const enter = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.28, ease: [0.25, 1, 0.5, 1] as const },
      };

  // Roving tabindex: Up/Down moves selection and focus within the tab list.
  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = (activeIndex + 1) % total;
    else if (e.key === 'ArrowUp') next = (activeIndex - 1 + total) % total;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = total - 1;
    if (next === null) return;

    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* ---------- Mobile: accordion ---------- */}
      <div className="divide-y divide-border border-y border-border md:hidden">
        {topics.map((topic, idx) => {
          const isOpen = idx === activeIndex;
          return (
            <div key={topic.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`exploring-acc-${topic.id}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="min-w-0">
                    <span
                      className={`block text-sm ${isOpen ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      {topic.category}
                    </span>
                    <span className="mt-1 block text-base font-semibold text-foreground">
                      {topic.title}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-foreground' : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </h3>

              {isOpen && (
                <motion.div
                  id={`exploring-acc-${topic.id}`}
                  role="region"
                  aria-label={topic.title}
                  className="pb-6"
                  {...enter}
                >
                  <TopicDetail topic={topic} />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------- Desktop: master–detail ---------- */}
      <div className="hidden gap-10 md:grid md:grid-cols-[minmax(0,260px)_1fr] lg:gap-16">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Exploration topics"
          onKeyDown={handleTabKeyDown}
          className="flex flex-col border-l border-border"
        >
          {topics.map((topic, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={topic.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`exploring-tab-${topic.id}`}
                aria-selected={isActive}
                aria-controls="exploring-tabpanel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                className={`-ml-px flex cursor-pointer items-baseline gap-3 border-l py-3.5 pl-5 pr-3 text-left transition-all duration-200 ${
                  isActive
                    ? 'border-foreground bg-accent/[0.06] text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xs tabular-nums ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">{topic.category}</span>
                  <span className={`mt-0.5 block text-sm ${isActive ? 'font-medium' : ''}`}>
                    {topic.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {active && (
          <div
            role="tabpanel"
            id="exploring-tabpanel"
            aria-labelledby={`exploring-tab-${active.id}`}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            {/* Keyed so switching topics remounts and replays the enter transition.
                h-full + flex-col lets the detail fill the height the tab rail
                sets, which is what closes the empty gap under short topics. */}
            <motion.div
              key={active.id}
              {...enter}
              className="flex h-full flex-col rounded-card border border-border bg-card p-8 text-center shadow-card lg:p-10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">{active.category}</p>
              <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {active.title}
              </h3>
              <div className="mt-5 flex flex-1 flex-col">
                <TopicDetail topic={active} centered />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
