import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Search, Command, ArrowRight, X } from 'lucide-react';
import { socialLinks } from '@/data/social';
import { openMailCompose } from '@/lib/openMail';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Social' | 'Action';
  href: string;
  external?: boolean;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: 'home', label: 'Home', category: 'Navigation', href: '/' },
  { id: 'about', label: 'About', category: 'Navigation', href: '/#about' },
  { id: 'work', label: 'Work', category: 'Navigation', href: '/#projects' },
  { id: 'articles', label: 'Articles', category: 'Navigation', href: '/#articles' },
  { id: 'skills', label: 'Skills', category: 'Navigation', href: '/#skills' },
  { id: 'contact', label: 'Contact', category: 'Navigation', href: '/#contact' },
  { id: 'all-projects', label: 'All Projects', category: 'Navigation', href: '/projects' },
  { id: 'all-articles', label: 'Blog Archive', category: 'Navigation', href: '/blog' },
  ...socialLinks.map((s) => ({
    id: s.name.toLowerCase(),
    label: s.name,
    category: 'Social' as const,
    href: s.url,
    external: s.url.startsWith('http'),
  })),
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for custom trigger event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  const filteredItems = COMMAND_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    if (item.href.startsWith('mailto:')) {
      openMailCompose(item.href);
    } else if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = item.href;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24 bg-background/80 backdrop-blur-sm">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-card border border-border bg-card font-sans shadow-overlay"
            onKeyDown={handleKeyDown}
          >
            {/* Input Search Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-control p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-control px-3 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {item.external ? <span>External</span> : <span>Jump to</span>}
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Keyboard Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded-control border border-border bg-muted px-1.5 py-0.5">↑↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded-control border border-border bg-muted px-1.5 py-0.5">↵</kbd>
                  <span>select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded-control border border-border bg-muted px-1.5 py-0.5">esc</kbd>
                  <span>close</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
