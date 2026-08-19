# Personal Developer Workspace — Ashan Kavinda

A modern, high-impact, data-driven developer portfolio built with **Astro**, **TypeScript**, **React**, **Tailwind CSS**, **MDX**, and **Motion**. Designed with a dark **Tech Cyber Glow & Data Network** aesthetic.

---

## 🛠️ Technology Stack

- **Framework**: [Astro v5](https://astro.build/) (Static Site Generation + Hydrated Islands)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Islands**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content Engine**: Astro Content Collections & [MDX](https://mdxjs.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) (Automated via GitHub Actions)

---

## ✨ Major Features

1. **Tech Cyber Glow Design**: Deep navy dark mode with glowing cyan (`#00F0FF`) and purple (`#A855F7`) neon gradients, glassmorphism cards, and circuit network grid visuals.
2. **Data-Driven MDX Content Collections**: Projects are managed purely as `.mdx` files in `src/content/projects/`. Adding a file generates dynamic case study routes (`/projects/[slug]`), project listing cards, and homepage featured highlights automatically.
3. **Command Palette (`Cmd+K` / `Ctrl+K`)**: Keyboard-driven search modal for instant site navigation.
4. **Contact System**: Cyber-styled contact form with honeypot bot protection.
5. **Production & SEO Ready**: Includes `@astrojs/sitemap`, Open Graph social previews, JSON-LD (`schema.org/Person`) structured data, custom 404 page, and `robots.txt`.

---

## 📂 Project Architecture

```
d:/Projects/Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow for GitHub Pages
├── public/
│   ├── favicon.svg          # Minimal AK vector favicon
│   ├── robots.txt           # Search engine crawler instructions
│   └── resume.pdf           # Downloadable resume document
├── src/
│   ├── components/
│   │   ├── blog/            # Blog UI (BlogCard)
│   │   ├── interactive/     # React Islands (CommandPalette, ContactForm, ThemeToggle, SkillsMotion)
│   │   ├── layout/          # Layout UI (Navbar, Footer, NavbarInteractive)
│   │   ├── projects/        # Project UI (ProjectCard, ProjectsGrid)
│   │   ├── sections/        # Homepage sections (Hero, SelectedWork, About, Skills, CurrentlyExploring, Articles, Journey, Evolution, Contact)
│   │   └── ui/              # Reusable Astro primitives (Container, Button, SectionHeading, Badge)
│   ├── content/
│   │   ├── blog/            # MDX Blog Posts
│   │   └── projects/        # MDX Case Studies
│   ├── data/                # Data stores (site.ts, social.ts, skills.ts, journey.ts)
│   ├── layouts/             # Master Page Layouts (BaseLayout.astro, ProjectLayout.astro)
│   ├── pages/
│   │   ├── blog/            # Blog routes
│   │   ├── projects/        # Project routes
│   │   ├── 404.astro        # Custom 404 Error page
│   │   └── index.astro      # Master homepage
│   └── content.config.ts    # Zod schema validation for Content Collections
├── .env.example             # Template environment variables
├── astro.config.mjs         # Astro plugins (React, MDX, Tailwind, Sitemap)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.x or v20.x or v22.x)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/Ashankavinda277/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local dev server
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## 🐙 Deploying to GitHub Pages (Automated GitHub Actions)

The repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Steps to Deploy to GitHub Pages:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy update"
   git push origin main
   ```
2. **Enable GitHub Pages in Repository Settings**:
   * Go to your repository on GitHub: `https://github.com/Ashankavinda277/portfolio`
   * Click **Settings** → **Pages** (left sidebar under Code and automation).
   * Under **Build and deployment → Source**, select **GitHub Actions**.
3. **Automatic Deployment**:
   * Whenever you push to the `main` branch, GitHub Actions will automatically compile the site and deploy it to GitHub Pages.

---

## 📄 License

MIT © [Ashan Kavinda](https://github.com/Ashankavinda277).

