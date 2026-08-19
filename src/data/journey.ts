export interface JourneyItem {
  year: string;
  role: string;
  organization: string;
  description: string;
  skills: string[];
}

export const journeyTimeline: JourneyItem[] = [
  {
    year: "2023 — Present",
    role: "BSc (Hons) in Information Technology",
    organization: "Undergraduate IT Degree",
    description: "Developing strong technical expertise in Information Technology with a focus on full-stack web development, AWS cloud infrastructure, database architecture, and artificial intelligence integration.",
    skills: ["React", "Next.js", "TypeScript", "AWS", "Python", "Docker"]
  },
  {
    year: "2024 — Present",
    role: "Full-Stack & Cloud Engineering Projects",
    organization: "Independent Development",
    description: "Building production-grade web systems including HRMS management portals, cloud serverless applications with AWS Amplify & Bedrock AI, and interactive developer tools.",
    skills: ["FastAPI", "DynamoDB", "AWS Amplify", "GraphQL", "Bedrock AI"]
  }
];
