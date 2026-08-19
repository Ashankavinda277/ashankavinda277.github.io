import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Terminal, Layout, Check, Copy, CornerDownLeft } from 'lucide-react';
import { siteConfig } from '@/data/site';

interface CommandOutput {
  command: string;
  output: string | string[];
}

const DEFAULT_COMMANDS: CommandOutput[] = [
  { command: 'whoami', output: siteConfig.name.toLowerCase().replace(/\s+/g, '-') },
  { command: 'role', output: siteConfig.role.toLowerCase() },
  {
    command: 'skills',
    output: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'AWS'],
  },
  {
    command: 'projects',
    output: ['hrms', 'personal-website', 'smart-shooting-gallery'],
  },
  { command: 'status', output: 'learning + building' },
];

export function TerminalMode() {
  const [activeTab, setActiveTab] = useState<'website' | 'terminal'>('terminal');
  const [history, setHistory] = useState<CommandOutput[]>(DEFAULT_COMMANDS);
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (activeTab === 'terminal' && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    if (trimmed === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          command: 'help',
          output: [
            'Available commands:',
            '  whoami     - Print developer name',
            '  role       - Print current role',
            '  skills     - List core technologies',
            '  projects   - List key portfolio projects',
            '  status     - Show current learning status',
            '  clear      - Clear terminal history',
            '  help       - Display this help message',
          ],
        },
      ]);
      setInputValue('');
      return;
    }

    const matched = DEFAULT_COMMANDS.find((c) => c.command === trimmed);

    if (matched) {
      setHistory((prev) => [...prev, matched]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          output: `Command not found: "${trimmed}". Type "help" for available commands.`,
        },
      ]);
    }

    setInputValue('');
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleCommand(inputValue);
  };

  const handleCopyHistory = () => {
    const text = history
      .map(
        (h) =>
          `$ ${h.command}\n${Array.isArray(h.output) ? h.output.join('\n') : h.output}`
      )
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-border/70 bg-card overflow-hidden shadow-xl">
      {/* Mode Switcher Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
            ashan@workspace:~
          </span>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex items-center p-1 rounded-lg bg-background border border-border/60">
          <button
            onClick={() => setActiveTab('website')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'website'
                ? 'bg-foreground text-background font-medium shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Website Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-foreground text-background font-medium shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Mode</span>
          </button>
        </div>
      </div>

      {/* Mode Content */}
      {activeTab === 'website' ? (
        <div className="p-8 sm:p-12 text-center space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            GUI Mode Active
          </p>
          <h3 className="text-xl font-bold text-foreground">
            Standard Portfolio View Hydrated
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            You are viewing the graphical portfolio interface. Toggle back to Terminal Mode to inspect the CLI workspace.
          </p>
        </div>
      ) : (
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-background/90 text-foreground min-h-[340px] max-h-[500px] overflow-y-auto flex flex-col justify-between space-y-4 select-text">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between pb-3 border-b border-border/30 text-muted-foreground text-xs">
            <span className="text-[11px]">
              Type <code className="text-accent">help</code> or click commands below
            </span>
            <button
              onClick={handleCopyHistory}
              className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
              title="Copy Terminal Logs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Copy Output</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal History Log */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <motion.div
                key={`${item.command}-${idx}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-accent font-bold">$</span>
                  <span className="text-foreground font-semibold">{item.command}</span>
                </div>

                <div className="pl-4 text-muted-foreground leading-relaxed">
                  {Array.isArray(item.output) ? (
                    <ul className="space-y-1">
                      {item.output.map((line, lIdx) => (
                        <li key={lIdx} className="flex items-center gap-2">
                          <span className="text-accent/60">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.output}</p>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Quick Command Pills & Input Prompt */}
          <div className="space-y-3 pt-3 border-t border-border/40">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-muted-foreground">Quick commands:</span>
              {['whoami', 'role', 'skills', 'projects', 'status', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-muted/60 hover:bg-accent-muted hover:text-accent border border-border/40 text-muted-foreground transition-all cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <span className="text-accent font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="type a command..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none font-mono text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Submit command"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
