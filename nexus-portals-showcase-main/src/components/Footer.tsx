import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Copyright } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer slide up animation
      gsap.fromTo(footerRef.current,
        {
          opacity: 0,
          y: 60,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 100%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to(".footer-particle", {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative glass-card border-0 border-t border-glass-border/30 mt-20"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-particle absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan/40 rounded-full blur-sm"></div>
        <div className="footer-particle absolute top-1/2 right-1/3 w-3 h-3 bg-neon-purple/30 rounded-full blur-sm"></div>
        <div className="footer-particle absolute bottom-1/3 left-1/2 w-2 h-2 bg-neon-blue/40 rounded-full blur-sm"></div>
        <div className="footer-particle absolute top-3/4 right-1/4 w-4 h-4 bg-neon-pink/20 rounded-full blur-sm"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light tracking-wider mb-4">
              <span className="text-gradient">KHUSHVEER</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-gradient-purple">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground nav-link transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-gradient-purple">
              Get in Touch
            </h4>
            <div className="space-y-2 text-muted-foreground">
              <p>khushveersingh645@gmail.com</p>
              <p>Available for freelance work</p>
              <p className="text-sm">
                Based in Bengaluru, KA, INDIA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Copyright size={16} />
              <span>2025 Khushveer Singh. All rights reserved.</span>
            </div>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;