import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            onComplete();
          }
        });
      }
    });

    // Animate text appearance
    tl.fromTo(textRef.current, 
      { 
        opacity: 0, 
        y: 50,
        filter: "blur(10px)"
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      }
    );

    // Animate progress bar
    tl.fromTo(progressBarRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 2.5,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Pause before exit
    tl.to({}, { duration: 0.5 });

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-cyan/20 rounded-full blur-3xl float-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-neon-blue/20 rounded-full blur-3xl float-slow"></div>
      </div>
      
      {/* Main Content */}
      <div className="text-center z-10">
        {/* Logo/Name */}
        <div ref={textRef} className="mb-12">
          <h1 className="preloader-text text-5xl md:text-7xl font-extralight tracking-[0.2em] mb-4">
            KHUSHVEER
            <br></br>
            SINGH
          </h1>
          
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 max-w-[90vw] mx-auto">
          <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="loading-progress h-full w-0"
            ></div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground tracking-widest">
            LOADING EXPERIENCE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;