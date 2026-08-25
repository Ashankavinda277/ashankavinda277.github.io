export interface ExplorationTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  keyOutcome: string;
}

export const explorationTopics: ExplorationTopic[] = [
  {
    id: 'ai-apps',
    title: 'AI-Powered Applications',
    category: 'Artificial Intelligence',
    description:
      'Integrating foundation models (Amazon Bedrock, LLM action groups, OpenAPI tools) directly into enterprise software workflows.',
    technologies: ['Amazon Bedrock', 'Claude', 'OpenAPI Action Groups', 'LangChain', 'Prompt Engineering'],
    keyOutcome: 'Building automated AI worklog analysis & chatbot assistants for HRMS systems.',
  },
  {
    id: 'cloud-arch',
    title: 'Cloud & Serverless Systems',
    category: 'Cloud Infrastructure',
    description:
      'Designing resilient multi-tier cloud applications using AWS services and single-table DynamoDB data models.',
    technologies: ['AWS Amplify Gen 2', 'AppSync GraphQL', 'DynamoDB', 'AWS Cognito', 'Lambda Functions'],
    keyOutcome: 'Architecting scalable serverless backends with zero server maintenance overhead.',
  },
  {
    id: 'devops-automation',
    title: 'DevOps & Automation Pipelines',
    category: 'Systems & CI/CD',
    description:
      'Building continuous integration/deployment pipelines, container orchestration with Docker, and automated code checks.',
    technologies: ['Docker Containerization', 'GitHub Actions', 'AWS CodePipeline', 'ESLint / Prettier CI'],
    keyOutcome:
      'Automating build, test, and release workflows with multi-environment deployment target safety.',
  },
  {
    id: 'edge-computing',
    title: 'Hardware & Embedded IoT Systems',
    category: 'Hardware Systems',
    description:
      'Building micro-controller based software integrated solutions using Raspberry Pi, ESP32, and custom sensors.',
    technologies: ['Arduino', 'ESP32 Microcontrollers', 'BPW34', 'FSR', 'RGB LED Panels'],
    keyOutcome:
      'Engineered physical hardware-connected smart target gallery & interactive card game hardware systems.',
  },
];
