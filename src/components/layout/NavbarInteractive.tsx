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
        className="inline-flex items-center gap-1.5 rounded-control border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
        aria-label="Open Command Palette"
        title="Open Command Palette (Cmd+K / Ctrl+K)"
      >
        <Command className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">⌘K</span>
      </button>

      {/* Theme Switcher Button */}
      <ThemeToggle />

      {/* Mobile Drawer Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-control text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 flex flex-col border-b border-border bg-background/95 p-6 shadow-overlay backdrop-blur-lg md:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-border py-3 text-sm text-muted-foreground transition-colors hover:text-foreground last:border-none"
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
