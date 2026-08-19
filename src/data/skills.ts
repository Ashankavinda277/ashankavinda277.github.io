export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'Building responsive, modern user interfaces with type safety and optimized render cycles.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    description: 'Engineering robust server-side APIs, microservices, and asynchronous data pipelines.',
    skills: ['Python', 'FastAPI', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Cloud & Serverless',
    description: 'Leveraging cloud platforms and serverless architectures for scalable infrastructure.',
    skills: ['AWS', 'AWS Amplify', 'AWS AppSync', 'DynamoDB', 'Cognito', 'Amazon Bedrock'],
  },
  {
    title: 'Database',
    description: 'Designing single-table and relational document stores for fast query throughput.',
    skills: ['DynamoDB', 'MongoDB'],
  },
  {
    title: 'Tools & DevOps',
    description: 'Version control workflows, containerization, and automated developer tooling.',
    skills: ['Git', 'GitHub', 'Docker'],
  },
];
