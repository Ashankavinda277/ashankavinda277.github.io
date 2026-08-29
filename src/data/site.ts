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
  resumeUrl: string;
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
  /*
   * Single source for the resume link — the hero icon and the About button
   * both read it, so swapping hosts is a one-line change here.
   *
   * Local file (current): "/resume.pdf", served from public/.
   * Google Drive: use the direct-download form, NOT the /view share link —
   *   https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
   * The FILE_ID is the segment between /d/ and /view in the share URL, and
   * the file must be shared as "Anyone with the link" or visitors hit a
   * Google sign-in wall instead of the download.
   */
  resumeUrl: "https://drive.google.com/file/d/1eZ3Br7PrpzKjpfi3G2hsx3t220gID4et/view?usp=sharing",
  availability: {
    status: true,
    text: "Available for new opportunities",
  },
};
