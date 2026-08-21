import typography from '@tailwindcss/typography';

/** Wraps a token so Tailwind can compose opacity modifiers onto it. */
const c = (v) => `hsl(var(${v}) / <alpha-value>)`;

/** Scales a shadow alpha by the active theme's --shadow-strength. */
const a = (base) => `calc(var(--shadow-strength) * ${base})`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: c('--background'),
        surface: c('--surface'),
        foreground: c('--foreground'),
        muted: {
          DEFAULT: c('--muted'),
          foreground: c('--muted-foreground'),
        },
        card: {
          DEFAULT: c('--card'),
          foreground: c('--card-foreground'),
        },
        accent: {
          DEFAULT: c('--accent'),
          foreground: c('--accent-foreground'),
          2: c('--accent-2'),
        },
        link: c('--link'),
        destructive: {
          DEFAULT: c('--destructive'),
          foreground: c('--destructive-foreground'),
        },
        /*
         * Four-step border ramp. With no hue to spend, the border is what
         * carries hierarchy and interaction state, so each step is a real
         * utility rather than an alpha guess at the call site:
         *   border-border-subtle  dividers inside a surface
         *   border-border         the default 1px edge
         *   border-border-hover   what an interactive edge brightens to
         *   border-input          controls that must read as affordances
         */
        border: {
          DEFAULT: c('--border'),
          subtle: c('--border-subtle'),
          hover: c('--border-hover'),
        },
        input: c('--input'),
        ring: c('--ring'),
      },
      borderRadius: {
        control: '8px',
        card: '12px',
      },
      boxShadow: {
        /*
         * --shadow-color is pure black in both themes now, so the per-theme
         * difference comes from --shadow-strength instead: every alpha below
         * is a base value scaled by it (0.6 on light, 2.5 on dark). That is
         * what lets one shadow definition stay subtle on a near-white page
         * and still out-darken a near-black one, which a shadow must do to
         * register at all.
         *
         * Two layers each — a tight contact shadow plus a wide ambient one —
         * which is what separates a card from its background convincingly.
         */
        overlay: `0 16px 48px -12px hsl(var(--shadow-color) / ${a(0.28)})`,
        card: `0 1px 2px 0 hsl(var(--shadow-color) / ${a(0.08)}), 0 6px 16px -4px hsl(var(--shadow-color) / ${a(0.14)})`,
        'card-lg': `0 2px 4px 0 hsl(var(--shadow-color) / ${a(0.1)}), 0 16px 32px -8px hsl(var(--shadow-color) / ${a(0.22)})`,
      },
      scale: {
        102: '1.02',
      },
      keyframes: {
        'glow-breathe': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'glow-breathe': 'glow-breathe 8s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
