export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  affiliation: string;
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
  role: "Full-Stack Developer",
  affiliation: "3rd Year IT Undergraduate, University of Moratuwa",
  headline: "I build digital experiences that solve real problems.",
  bio: "I'm an IT undergraduate who enjoys turning ideas into useful software. I work across frontend, backend and cloud technologies, with a particular interest in building scalable web applications.",
  description: "Personal developer portfolio and minimal workspace for Ashan Kavinda — Full-Stack Developer & IT Undergraduate.",
  ogImage: "/images/og-cover.png",
  location: "Sri Lanka",
  email: "ashankavinda277@gmail.com",
  availability: {
    status: true,
    text: "Available for new opportunities",
  },
};
