import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../interactive/ThemeToggle';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  navItems: NavItem[];
}

export function NavbarInteractive({ navItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="flex items-center gap-3">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Mobile Menu Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Slide-down / Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-background/95 backdrop-blur-xl md:hidden flex flex-col p-6 border-t border-border/60">
          <nav className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-mono font-medium text-muted-foreground hover:text-foreground hover:translate-x-1 py-2 transition-all flex items-center justify-between border-b border-border/30"
              >
                <span>{item.label}</span>
                <span className="text-xs text-accent font-mono">/&gt;</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-border/40 text-xs font-mono text-muted-foreground space-y-2">
            <p className="text-foreground font-semibold">Minimal Developer Workspace</p>
            <p>Ashan Kavinda — Full-Stack Developer</p>
          </div>
        </div>
      )}
    </div>
  );
}
