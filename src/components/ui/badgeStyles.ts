export type BadgeVariant = 'default' | 'outline';

const base =
  'inline-flex items-center rounded-control border px-2.5 py-0.5 text-xs font-medium';

const variants: Record<BadgeVariant, string> = {
  default: 'border-border bg-muted text-foreground',
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
