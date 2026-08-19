import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Server, Workflow, Layers, Network, Cpu, CheckCircle2 } from 'lucide-react';

export interface ExplorationTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'Active Focus' | 'In Progress' | 'Exploring';
  progress: number;
  color: {
    badge: string;
    border: string;
    glow: string;
    text: string;
    bgIcon: string;
    bar: string;
  };
  technologies: string[];
  keyOutcome: string;
}

const topics: ExplorationTopic[] = [
  {
    id: 'ai-apps',
    title: 'AI-Powered Applications',
    category: 'Artificial Intelligence',
    description: 'Integrating foundation models (Amazon Bedrock, LLM action groups, OpenAPI tools) directly into enterprise software workflows.',
    status: 'Active Focus',
    progress: 85,
    color: {
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      border: 'hover:border-purple-500/60',
      glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
      text: 'group-hover:text-purple-300',
      bgIcon: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      bar: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    technologies: ['Amazon Bedrock', 'Claude 3.5', 'OpenAPI Action Groups', 'LangChain', 'Prompt Engineering'],
    keyOutcome: 'Building automated AI worklog analysis & chatbot assistants for HRMS systems.',
  },
  {
    id: 'cloud-arch',
    title: 'Cloud & Serverless Systems',
    category: 'Cloud Infrastructure',
    description: 'Designing resilient multi-tier cloud applications using AWS services and single-table DynamoDB data models.',
    status: 'In Progress',
    progress: 75,
    color: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      border: 'hover:border-amber-500/60',
      glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      text: 'group-hover:text-amber-300',
      bgIcon: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      bar: 'bg-gradient-to-r from-amber-500 to-orange-500',
    },
    technologies: ['AWS Amplify Gen 2', 'AppSync GraphQL', 'DynamoDB', 'AWS Cognito', 'Lambda Functions'],
    keyOutcome: 'Architecting scalable serverless backends with zero server maintenance overhead.',
  },
  {
    id: 'devops-automation',
    title: 'DevOps & Automation Pipelines',
    category: 'Systems & CI/CD',
    description: 'Building continuous integration/deployment pipelines, container orchestration with Docker, and automated code checks.',
    status: 'In Progress',
    progress: 70,
    color: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      border: 'hover:border-emerald-500/60',
      glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      text: 'group-hover:text-emerald-300',
      bgIcon: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    },
    technologies: ['Docker Containerization', 'GitHub Actions', 'AWS CodePipeline', 'ESLint / Prettier CI'],
    keyOutcome: 'Automating build, test, and release workflows with multi-environment deployment target safety.',
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems & Microservices',
    category: 'Architecture',
    description: 'Exploring consensus algorithms, message queues, state synchronization, and low-latency API transport protocols.',
    status: 'Exploring',
    progress: 60,
    color: {
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      border: 'hover:border-cyan-500/60',
      glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      text: 'group-hover:text-cyan-300',
      bgIcon: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      bar: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    },
    technologies: ['RabbitMQ / SQS', 'gRPC & Protocol Buffers', 'Redis Caching', 'Event Sourcing'],
    keyOutcome: 'Understanding high-throughput event processing and fault-tolerant distributed data storage.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Security Engineering',
    description: 'Practical security research, vulnerability assessment, penetration testing techniques, and OWASP top 10 defense.',
    status: 'Active Focus',
    progress: 80,
    color: {
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      border: 'hover:border-rose-500/60',
      glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
      text: 'group-hover:text-rose-300',
      bgIcon: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      bar: 'bg-gradient-to-r from-rose-500 to-red-500',
    },
    technologies: ['Kali Linux', 'Wireshark', 'Burp Suite', 'Web Sec Auditing', 'Identity & Auth Hardening'],
    keyOutcome: 'Diploma qualification in Cyber Security & Ethical Hacking applied to secure web application design.',
  },
  {
    id: 'edge-computing',
    title: 'Hardware & Embedded IoT Systems',
    category: 'Hardware Systems',
    description: 'Building micro-controller based software integrated solutions using Raspberry Pi, ESP32, and custom sensors.',
    status: 'Exploring',
    progress: 65,
    color: {
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      border: 'hover:border-indigo-500/60',
      glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]',
      text: 'group-hover:text-indigo-300',
      bgIcon: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      bar: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    },
    technologies: ['Raspberry Pi 4', 'ESP32 Microcontrollers', 'RFID Sensors', 'Python Edge Scripts', 'RGB LED Panels'],
    keyOutcome: 'Engineered physical hardware-connected smart target gallery & interactive card game hardware systems.',
  },
];

const iconMap: Record<string, typeof Sparkles> = {
  'ai-apps': Sparkles,
  'cloud-arch': Server,
  'devops-automation': Workflow,
  'distributed-systems': Layers,
  cybersecurity: Network,
  'edge-computing': Cpu,
};

export function ExploringInteractive() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('ai-apps');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const statuses = ['All', 'Active Focus', 'In Progress', 'Exploring'];

  const filteredTopics = statusFilter === 'All' 
    ? topics 
    : topics.filter((t) => t.status === statusFilter);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId) ?? topics[0]!;
  const SelectedIcon = iconMap[selectedTopic.id] || Sparkles;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Interactive Status Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
              statusFilter === s
                ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-[#070b21] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {s === 'All' ? '🌟 All Domains' : s}
          </button>
        ))}
      </div>

      {/* Main Grid: 6 Interactive Colorful Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const IconComponent = iconMap[topic.id] || Sparkles;
          const isSelected = selectedTopicId === topic.id;

          return (
            <motion.div
              key={topic.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`group relative flex flex-col justify-between rounded-3xl p-6 bg-[#070b21]/90 border transition-all duration-300 cursor-pointer ${
                topic.color.border
              } ${topic.color.glow} ${
                isSelected
                  ? 'border-blue-500/80 shadow-xl shadow-blue-600/10 ring-1 ring-blue-500/30'
                  : 'border-slate-800 hover:scale-[1.02]'
              }`}
            >
              <div>
                {/* Header: Icon + Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${topic.color.bgIcon}`}
                  >
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${topic.color.badge}`}
                  >
                    {topic.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold text-slate-100 transition-colors mb-2 ${topic.color.text}`}>
                  {topic.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {topic.description}
                </p>
              </div>

              {/* Progress & Quick Details */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Exploration Depth</span>
                  <span className="font-bold text-slate-200">{topic.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${topic.color.bar}`}
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Card Deep-Dive Detail View */}
      <AnimatePresence mode="wait">
        {selectedTopic && (
          <motion.div
            key={selectedTopic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#070b21] border border-blue-500/30 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Subtle Ambient Background Light */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${selectedTopic.color.bgIcon}`}>
                  <SelectedIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                    {selectedTopic.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                    {selectedTopic.title}
                  </h4>
                </div>
              </div>

              <span className={`self-start sm:self-center px-3.5 py-1 rounded-full text-xs font-mono font-bold border ${selectedTopic.color.badge}`}>
                {selectedTopic.status}
              </span>
            </div>

            {/* Key Technologies Tags */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                Primary Technologies & Frameworks
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedTopic.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono font-medium shadow-sm hover:border-blue-500/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Outcome / Applied Project Context */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-slate-300 block">Practical Application Outcome</span>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {selectedTopic.keyOutcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
