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
    id: 'distributed-systems',
    title: 'Distributed Systems & Microservices',
    category: 'Architecture',
    description:
      'Exploring consensus algorithms, message queues, state synchronization, and low-latency API transport protocols.',
    technologies: ['RabbitMQ / SQS', 'gRPC & Protocol Buffers', 'Redis Caching', 'Event Sourcing'],
    keyOutcome:
      'Understanding high-throughput event processing and fault-tolerant distributed data storage.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Security Engineering',
    description:
      'Practical security research, vulnerability assessment, penetration testing techniques, and OWASP Top 10 defense.',
    technologies: ['Kali Linux', 'Wireshark', 'Burp Suite', 'Web Security Auditing', 'Identity & Auth Hardening'],
    keyOutcome:
      'Diploma qualification in Cyber Security & Ethical Hacking applied to secure web application design.',
  },
  {
    id: 'edge-computing',
    title: 'Hardware & Embedded IoT Systems',
    category: 'Hardware Systems',
    description:
      'Building micro-controller based software integrated solutions using Raspberry Pi, ESP32, and custom sensors.',
    technologies: ['Raspberry Pi 4', 'ESP32 Microcontrollers', 'RFID Sensors', 'Python Edge Scripts', 'RGB LED Panels'],
    keyOutcome:
      'Engineered physical hardware-connected smart target gallery & interactive card game hardware systems.',
  },
];
