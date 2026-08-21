export type BadgeVariant = 'default' | 'outline';

const base =
  'inline-flex items-center rounded-control border px-2.5 py-0.5 text-xs font-medium';

/**
 * Both variants are theme-agnostic: alphas of --accent and --foreground
 * invert with the theme on their own, so a filled badge is a faint wash of
 * the text colour in either direction rather than a tinted chip.
 */
const variants: Record<BadgeVariant, string> = {
  default: 'border-border bg-accent/[0.06] text-foreground',
  outline: 'border-border bg-transparent text-muted-foreground',
};

export function badgeClass({
  variant = 'default',
  className = '',
}: {
  variant?: BadgeVariant;
  className?: string;
} = {}): string {
  return [base, variants[variant], className].filter(Boolean).join(' ');
}
