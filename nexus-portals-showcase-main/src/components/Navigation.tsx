import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate nav on load
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 glass-card border-0 border-b border-glass-border/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-light tracking-wider">
              <span className="text-gradient">KHUSHVEER</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-link"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('#contact')}
                className="glass-button"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div 
            ref={mobileMenuRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glass-card border-l border-glass-border/30"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-light text-gradient">MILAD</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-lg nav-link"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="w-full mt-8 glass-button text-center"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;