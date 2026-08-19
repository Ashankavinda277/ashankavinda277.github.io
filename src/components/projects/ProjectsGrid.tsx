import { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

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
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border/40">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === category
                ? 'bg-foreground text-background font-semibold shadow-sm'
                : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const summary = project.shortDescription || project.description;
          return (
            <article
              key={project.slug}
              className="group relative flex flex-col rounded-xl border border-border/70 bg-card/60 hover:bg-card hover:border-accent/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="relative w-full h-48 sm:h-52 bg-muted/40 overflow-hidden border-b border-border/50">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted/30 text-muted-foreground font-mono text-xs">
                    <span>/{project.slug}</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-accent-muted text-accent border border-accent/20 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 font-mono text-xs text-muted-foreground bg-background/80 backdrop-blur-md px-2 py-0.5 rounded border border-border/50">
                  {project.year}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
                    <a href={`/projects/${project.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0 z-10" aria-hidden="true"></span>
                      {project.title}
                    </a>
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                  {summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-muted text-foreground/90 border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-muted-foreground self-center">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {(project.github || project.demo) && (
                  <div className="flex items-center gap-3 pt-3 border-t border-border/30 text-xs font-mono text-muted-foreground z-20 relative">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent flex items-center gap-1 transition-colors ml-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
