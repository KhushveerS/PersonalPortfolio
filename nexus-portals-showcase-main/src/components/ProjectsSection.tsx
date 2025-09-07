import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowSquareOut, ArrowRight } from 'phosphor-react';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
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
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects staggered animation
      gsap.fromTo(".project-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Email Platform",
      description: "Revolutionary email service with 3D interfaces and immersive user experience for developers.",
      image: "/api/placeholder/400/250",
      tech: ["React", "Three.js", "TypeScript", "Node.js"],
      category: "Web App"
    },
    {
      id: 2,
      title: "Next-Level Gaming UI",
      description: "Futuristic gaming interface with advanced animations and real-time data visualization.",
      image: "/api/placeholder/400/250",
      tech: ["React", "GSAP", "WebGL", "Socket.io"],
      category: "Gaming"
    },
    {
      id: 3,
      title: "3D Portfolio Showcase",
      description: "Personal portfolio website featuring stunning 3D elements and smooth animations.",
      image: "/api/placeholder/400/250",
      tech: ["React", "Spline", "GSAP", "Tailwind"],
      category: "Portfolio"
    },
    {
      id: 4,
      title: "Gaming Website Platform",
      description: "Modern gaming website with character showcases and interactive elements.",
      image: "/api/placeholder/400/250",
      tech: ["Vue.js", "Three.js", "GSAP", "CSS3"],
      category: "Gaming"
    },
    {
      id: 5,
      title: "Animation Learning Hub",
      description: "Educational platform for learning web animation tools with interactive tutorials.",
      image: "/api/placeholder/400/250",
      tech: ["React", "GSAP", "Lottie", "Firebase"],
      category: "Education"
    },
    {
      id: 6,
      title: "Animated Portfolio Tutorial",
      description: "Step-by-step tutorial series for creating animated portfolio websites.",
      image: "/api/placeholder/400/250",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      category: "Tutorial"
    }
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen py-20"
    >
      <AnimatedBackground 
        mode="snow" 
        density={0.44} 
        colors={["#ffffff", "#f59e0b", "#ef4444", "#10b981", "#3b82f6"]} 
      />
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-light text-center mb-16"
        >
          Featured <span className="text-gradient">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-light text-muted-foreground">
                    {project.id}
                  </span>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowSquareOut 
                    size={24} 
                    className="text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" 
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2 py-1 glass-card text-neon-cyan">
                    {project.category}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-2 py-1 bg-muted/20 rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="flex items-center gap-2 text-sm text-gradient hover:gap-3 transition-all duration-300">
                  View Project
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-16">
          <button className="glass-button text-lg px-8 py-4">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;