import { Sun, Moon } from 'lucide-react';

/**
 * Astro renders this at build time, so it cannot know the visitor's theme.
 * Rather than gating on a `mounted` flag — which flashes a skeleton on every
 * load — both icons are rendered and the `dark:` variant picks one. That is
 * correct at first paint with no JS and no hydration mismatch.
 */
export function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !root.classList.contains('dark');
    root.classList.toggle('dark', nextDark);
    root.style.colorScheme = nextDark ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      /* storage unavailable (private mode) — the toggle still applies visually */
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  );
}
