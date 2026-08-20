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
    year: "2024 - Present",
    role: "Bachelor of Science (hons) in Information Technology",
    organization: "University of Moratuwa",
    description: "Building a strong foundation in Information Technology with a focus on software development, Artificial Intelligence, Cloud Solutions, DevOps, and emerging technologies.",
    skills: ["Software Engineering", "Cloud Systems", "AI/ML"],
    status: "in_progress"
  },
  {
    year: "Next Milestone",
    role: "Full-Stack / Cloud Engineering Role",
    organization: "Open for Opportunities",
    description: "Actively seeking software engineering roles & internships focused on full-stack web platforms, cloud architecture, and AI-driven solutions.",
    skills: ["Full-Stack", "AWS", "System Design"],
    status: "pending"
  }
];


