# Personal Developer Workspace — Ashan Kavinda

A modern, simple, technical, and data-driven developer portfolio built with **Astro**, **TypeScript**, **React**, **Tailwind CSS**, **MDX**, and **Motion**. Designed around the concept of a **Minimal Developer Workspace**.

---

## 🛠️ Technology Stack

- **Framework**: [Astro v5](https://astro.build/) (Static Site Generation + Serverless Islands)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Islands**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content Engine**: Astro Content Collections & [MDX](https://mdxjs.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) (Automated Actions) or [Vercel](https://vercel.com/)

---

## ✨ Major Features

1. **Minimal Workspace Design**: Monochrome dark interface with subtle grid accents and emerald status highlights.
2. **Data-Driven MDX Content Collections**: Projects are managed purely as `.mdx` files in `src/content/projects/`. Adding a file generates dynamic case study routes (`/projects/[slug]`), project listing cards, and homepage featured highlights automatically.
3. **Interactive Terminal Mode**: Switch between GUI Mode and a CLI prompt (`$ whoami`, `$ role`, `$ skills`, `$ projects`, `$ status`).
4. **Command Palette (`Cmd+K` / `Ctrl+K`)**: Keyboard-driven search modal for instant site navigation.
5. **Contact Endpoint**: Accessible contact form with honeypot spam protection, working in both static hosting mode and Vercel serverless mode.
6. **Production & SEO Ready**: Includes `@astrojs/sitemap`, Open Graph social previews, JSON-LD (`schema.org/Person`) structured data, custom 404 page, and `robots.txt`.

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
│   │   ├── interactive/     # React Islands (TerminalMode, CommandPalette, ContactForm, ThemeToggle, SkillsMotion)
│   │   ├── layout/          # Layout UI (Navbar, Footer, NavbarInteractive)
│   │   ├── projects/        # Project UI (ProjectCard, ProjectsGrid)
│   │   ├── sections/        # Homepage sections (Hero, SelectedWork, About, Skills, CurrentlyExploring, TerminalSection, Contact)
│   │   └── ui/              # Reusable Astro primitives (Container, Button, SectionHeading, Badge)
│   ├── content/
│   │   └── projects/        # MDX Case Studies (hrms.mdx, personal-website.mdx, smart-shooting-gallery.mdx, projects.mdx)
│   ├── data/                # Data-driven stores (site.ts, social.ts, skills.ts)
│   ├── layouts/             # Master Page Layouts (BaseLayout.astro, ProjectLayout.astro)
│   ├── pages/
│   │   ├── api/contact.ts   # Serverless API contact endpoint (for Vercel)
│   │   ├── projects/
│   │   │   ├── [...slug].astro  # Dynamic case study route renderer
│   │   │   └── index.astro      # Filterable project index page
│   │   ├── 404.astro        # Custom 404 Error page
│   │   └── index.astro      # Master homepage
│   └── content.config.ts    # Zod schema validation for Content Collections
├── .env.example             # Template environment variables
├── astro.config.mjs         # Astro plugins (React, MDX, Tailwind, Sitemap, Vercel)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.x or v20.x or v22.x)
- npm or pnpm

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
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```
2. **Enable GitHub Pages in Repository Settings**:
   * Go to your repository on GitHub: `https://github.com/Ashankavinda277/portfolio`
   * Click **Settings** → **Pages** (left sidebar under Code and automation).
   * Under **Build and deployment → Source**, select **GitHub Actions**.
3. **Automatic Deployment**:
   * Whenever you push to the `main` branch, GitHub Actions will automatically compile the site and deploy it to `https://Ashankavinda277.github.io/portfolio/` (or your user domain).

---

## 🌐 Deploying to Vercel (Alternative)

### 1. GitHub Repository Setup
1. Push your code to your GitHub repository:
   ```bash
   git push origin main
   ```

### 2. Vercel Project Setup
1. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select repository `Ashankavinda277/portfolio`.
3. Set Framework Preset: **Astro** (automatically detected).
4. Set Build Command: `npm run build`
5. Set Output Directory: `.vercel/output`

### 3. Environment Variables on Vercel
In Vercel **Settings -> Environment Variables**, add:
- `RESEND_API_KEY`: Your Resend API key (from [resend.com](https://resend.com/))
- `CONTACT_EMAIL`: Your destination email address

---

## 📝 Placeholder Replacement Checklist

Before deploying to production, replace the following placeholder values with your exact information:

- [ ] `src/data/site.ts`: Update `email`, `location`, and domain URLs.
- [ ] `src/data/social.ts`: Update `url` links for GitHub, LinkedIn, and Email.
- [ ] `public/resume.pdf`: Replace with your real PDF resume file.
- [ ] `src/content/projects/*.mdx`: Update project GitHub repository URLs, live demo links, and real project screenshots.
- [ ] `astro.config.mjs` & `src/layouts/BaseLayout.astro`: Update `site` domain to your live domain.

---

## 📄 License

MIT © [Ashan Kavinda](https://github.com/Ashankavinda277).
