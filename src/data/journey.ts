export interface JourneyItem {
  year: string;
  role: string;
  organization: string;
  description: string;
  skills: string[];
  status?: 'completed' | 'in_progress' | 'pending';
}

export const journeyTimeline: JourneyItem[] = [
  {
    year: "2023 — Present",
    role: "BSc (Hons) in Information Technology",
    organization: "Undergraduate IT Degree",
    description: "Developing strong technical expertise in Information Technology with a focus on full-stack web development, AWS cloud infrastructure, database architecture, and artificial intelligence integration.",
    skills: ["React", "Next.js", "TypeScript", "AWS", "Python", "Docker"],
    status: "in_progress"
  },
  {
    year: "2024 — Present",
    role: "Full-Stack & Cloud Engineering Projects",
    organization: "Independent Development",
    description: "Building production-grade web systems including HRMS management portals, cloud serverless applications with AWS Amplify & Bedrock AI, and interactive developer tools.",
    skills: ["FastAPI", "DynamoDB", "AWS Amplify", "GraphQL", "Bedrock AI"],
    status: "in_progress"
  },
  {
    year: "Next Milestone",
    role: "Full-Stack / Cloud Engineer Role",
    organization: "Open for Opportunities",
    description: "Actively seeking software engineering roles & internships focused on full-stack development, cloud architecture, and AI-driven solutions.",
    skills: ["Full-Stack", "System Design", "AWS Infrastructure", "CI/CD"],
    status: "pending"
  }
];

