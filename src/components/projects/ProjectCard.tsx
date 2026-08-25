import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { badgeClass } from '../ui/badgeStyles';
import { normalizeRepos, type GithubField } from '@/lib/repos';

export interface ProjectCardProps {
  title: string;
  description: string;
  shortDescription?: string | undefined;
  technologies: string[];
  category: string;
  year: string | number;
  slug: string;
  image?: string | undefined;
  github?: GithubField;
  demo?: string | undefined;
}

/**
 * Single source of truth for the project card, rendered from both the Astro
 * homepage (statically, with no client directive) and the React /projects grid.
 */
export function ProjectCard({
  title,
  description,
  shortDescription,
  technologies,
  category,
  year,
  slug,
  image,
  github,
  demo,
}: ProjectCardProps) {
  const summary = shortDescription || description;
  const visibleTech = technologies.slice(0, 4);
  const overflowCount = technologies.length - visibleTech.length;

  /*
   * One repo keeps the original bare icon in the footer row. Several get a
   * labelled row of their own underneath, because two identical Octocats
   * side by side tell the reader nothing about which is which.
   */
  const repos = normalizeRepos(github);
  const singleRepo = repos.length === 1 ? repos[0] : undefined;
  const labelledRepos = repos.length > 1 ? repos : [];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-card shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-border-hover hover:shadow-card-lg">
      <div className="relative h-48 w-full overflow-hidden border-b border-border bg-muted sm:h-52">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-center">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{category}</span>
            <span aria-hidden="true">·</span>
            <span>{year}</span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground">
            <a href={`/projects/${slug}`} className="focus:outline-none">
              {/* Stretches the link over the whole card without nesting anchors. */}
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {title}
            </a>
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span key={tech} className={badgeClass()}>
              {tech}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="self-center text-xs text-muted-foreground">
              +{overflowCount}
            </span>
          )}
        </div>

        <div className="z-20 space-y-3 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <a
              href={`/projects/${slug}`}
              className="link-underline inline-flex items-center gap-1 font-medium text-link"
            >
              <span>View Details</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="flex items-center gap-2">
              {singleRepo && (
                <a
                  href={singleRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-control border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  title="GitHub Repository"
                  aria-label={`${title} — GitHub repository`}
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-control border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  title="Live Demo"
                  aria-label={`${title} — live demo`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {labelledRepos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {labelledRepos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-control border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-border-hover hover:bg-muted hover:text-foreground"
                  aria-label={`${title} — ${repo.label} repository`}
                >
                  <Github className="h-3 w-3 shrink-0" />
                  <span>{repo.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
