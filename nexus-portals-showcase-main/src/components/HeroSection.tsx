import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3 }); // Start after preloader

    // Animate headline
    tl.fromTo(headlineRef.current,
      {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out"
      }
    );

    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Animate CTA button
    tl.fromTo(ctaRef.current,
      {
        opacity: 0,
        scale: 0.8,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    // Animate Spline container
    tl.fromTo(splineRef.current,
      {
        opacity: 0,
        x: 100,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power2.out"
      },
      "-=1"
    );

    // Floating orbs animation
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Spline 3D */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full"
      >
        <iframe 
          src='https://my.spline.design/orb-QZkRiL0csz0di6m5NgjAqwnl/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb absolute top-1/4 left-1/4 w-32 h-32 bg-neon-cyan/10 rounded-full blur-2xl"></div>
        <div className="glow-orb absolute bottom-1/3 right-1/4 w-40 h-40 bg-neon-purple/10 rounded-full blur-2xl"></div>
        <div className="glow-orb absolute top-1/2 right-1/3 w-24 h-24 bg-neon-blue/10 rounded-full blur-2xl"></div>
        <div className="glow-orb absolute bottom-1/4 left-1/3 w-36 h-36 bg-neon-pink/10 rounded-full blur-2xl"></div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="text-gradient font-light">Khushveer</span>
            <br />
            <span className="text-muted-foreground">Web Developer</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-light leading-relaxed"
          >
            Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
          </p>

          <button 
            ref={ctaRef}
            onClick={scrollToContact}
            className="hero-button group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Hire Me
              <ArrowRight 
                size={20} 
                className="transition-transform group-hover:translate-x-1" 
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;