export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  headline: string;
  bio: string;
  description: string;
  ogImage: string;
  location: string;
  email: string;
  availability: {
    status: boolean;
    text: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Ashan Kavinda",
  initials: "AK",
  role: "FULL-STACK DEVELOPER",
  headline: "I build digital experiences that solve real problems.",
  bio: "I'm an IT undergraduate who enjoys turning ideas into useful software. I work across frontend, backend and cloud technologies, with a particular interest in building scalable web applications.",
  description: "Personal developer portfolio and minimal workspace for Ashan Kavinda — Full-Stack Developer & IT Undergraduate.",
  ogImage: "/images/og-cover.png",
  location: "Sri Lanka",
  email: "ashan.kavinda@example.com",
  availability: {
    status: true,
    text: "Available for new projects & learning opportunities",
  },
};
