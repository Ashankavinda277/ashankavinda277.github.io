export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Core languages I work in day to day, with a strong bias toward type safety.',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C', ],
  },
  {
    title: 'Frontend',
    description: 'Building responsive, modern user interfaces with type safety and optimized render cycles.',
    skills: ['React', 'Next.js', 'Astro', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    description: 'Engineering robust server-side APIs, microservices, and asynchronous data pipelines.',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Cloud & Serverless',
    description: 'Leveraging AWS and serverless architectures for scalable, event-driven infrastructure.',
    skills: ['AWS', 'Lambda', 'AppSync', 'Amplify', 'Cognito', 'SQS', 'SES', 'Bedrock', 'Vercel'],
  },
  {
    title: 'Database',
    description: 'Modeling data across single-table NoSQL and relational schemas for fast query throughput.',
    skills: ['DynamoDB', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Tools & Design',
    description: 'Version control workflows, containerization, and design-to-code handoff.',
    skills: ['Git', 'Docker', 'vitest','Figma'],
  },
]
