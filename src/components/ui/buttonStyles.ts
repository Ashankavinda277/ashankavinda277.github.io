export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * None of these variants carry a `dark:` override any more. In a mirrored
 * monochrome system --accent *is* the foreground, so `bg-accent
 * text-accent-foreground` resolves to black-on-white in light and
 * white-on-black in dark from the same class list — the page inverted, which
 * is exactly what a primary button should be when there is no brand hue to
 * fill it with.
 *
 * Emphasis that a colour would normally provide is spent on weight instead:
 * primary is a solid inversion, secondary is border-only, ghost has no edge
 * at all. Hover moves down that same axis rather than shifting hue —
 * borders brighten toward --border-hover, fills step to --muted.
 */
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-foreground border border-transparent hover:opacity-90 hover:-translate-y-0.5',
  secondary:
    'border border-border bg-transparent text-foreground hover:border-border-hover hover:bg-muted hover:-translate-y-0.5',
  ghost: 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
  /*
   * A link cannot be picked out by colour here, so it is picked out by being
   * dimmer than body text and brightening on hover — the same
   * muted-foreground -> foreground move used for inline links — with a
   * permanent underline doing the identification.
   */
  link: 'bg-transparent text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground hover:decoration-foreground',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
};

export function buttonClass({
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}
