import { useState, useEffect } from 'react';
import { Menu, X, Command } from 'lucide-react';
import { ThemeToggle } from '../interactive/ThemeToggle';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarInteractiveProps {
  navItems: NavItem[];
}

export function NavbarInteractive({ navItems }: NavbarInteractiveProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <div className="flex items-center gap-2">
      {/* Command Palette Trigger Button (Desktop & Mobile) */}
      <button
        onClick={handleOpenCommandPalette}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-mono transition-all duration-200 cursor-pointer"
        aria-label="Open Command Palette"
        title="Open Command Palette (Cmd+K / Ctrl+K)"
      >
        <Command className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px]">⌘K</span>
      </button>

      {/* Theme Switcher Button */}
      <ThemeToggle />

      {/* Mobile Drawer Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 bg-background/95 backdrop-blur-lg border-b border-border p-6 shadow-xl md:hidden z-50 flex flex-col space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 transition-colors border-b border-border/30 last:border-none"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
