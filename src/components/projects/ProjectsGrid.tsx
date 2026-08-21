import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { buttonClass } from '../ui/buttonStyles';

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  shortDescription?: string | undefined;
  technologies: string[];
  category: string;
  year: string | number;
  image?: string | undefined;
  github?: string | undefined;
  demo?: string | undefined;
}

interface ProjectsGridProps {
  projects: ProjectItem[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={buttonClass({
              variant: selectedCategory === category ? 'primary' : 'ghost',
              size: 'sm',
            })}
          >
            {category}
          </button>
        ))}
      </div>

      {/*
        No data-reveal here: the category filter re-renders this grid on the
        client, and the sitewide reveal system only scans the DOM once at
        load. A card mounted after that scan would inherit the CSS's
        opacity:0 starting state with nothing left to animate it in — a
        pile-of-invisible-cards bug, not a decoration.
      */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </div>
  );
}
