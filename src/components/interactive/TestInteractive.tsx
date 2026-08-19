import { useState } from 'react';
import { Terminal, CheckCircle2 } from 'lucide-react';

export function TestInteractive() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="p-4 rounded-lg border border-border bg-card/50 text-sm font-mono flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Terminal className="w-4 h-4 text-accent" />
        <span>React Integration Status:</span>
        <span className="text-foreground font-semibold">Active</span>
      </div>
      <button
        onClick={() => setClicked(!clicked)}
        className="px-3 py-1 text-xs rounded bg-muted hover:bg-muted/80 text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <CheckCircle2 className={`w-3.5 h-3.5 ${clicked ? 'text-accent' : 'text-muted-foreground'}`} />
        <span>{clicked ? 'Hydrated & Interactive!' : 'Click to test state'}</span>
      </button>
    </div>
  );
}
