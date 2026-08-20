import typography from '@tailwindcss/typography';

/** Wraps a token so Tailwind can compose opacity modifiers onto it. */
const c = (v) => `hsl(var(${v}) / <alpha-value>)`;

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
        },
        destructive: {
          DEFAULT: c('--destructive'),
          foreground: c('--destructive-foreground'),
        },
        border: c('--border'),
        input: c('--input'),
        ring: c('--ring'),
      },
      borderRadius: {
        control: '8px',
        card: '12px',
      },
      boxShadow: {
        overlay: '0 16px 48px -12px hsl(240 6% 10% / 0.18)',
      },
      scale: {
        102: '1.02',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
