/**
 * A project can live in more than one repository (a web client and an API
 * service, say). Frontmatter therefore accepts `github` in two shapes:
 *
 *   github: "https://github.com/you/thing"        # single repo
 *
 *   github:                                       # several, each labelled
 *     - label: "Frontend"
 *       url: "https://github.com/you/thing-web"
 *     - label: "Backend"
 *       url: "https://github.com/you/thing-api"
 *
 * Everything downstream works with the normalized array so neither the card
 * nor the case-study layout has to branch on which shape an entry used.
 */

export interface Repo {
  label: string;
  url: string;
}

export type GithubField = string | Repo[] | undefined;

export function normalizeRepos(github: GithubField): Repo[] {
  if (!github) return [];
  // The bare-string form has no label of its own, so it borrows the wording
  // the case-study button already used for a lone repository.
  if (typeof github === 'string') return [{ label: 'Source Code', url: github }];
  return github;
}
