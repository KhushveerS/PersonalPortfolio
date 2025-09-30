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
      title: "Advanced AI Agent Search",
      description: "A sophisticated multi-source research agent that combines web search, social media analysis, and AI synthesis. Built with LangGraph and Google Gemini.",
      image: "/images/projects/ai-agent-search.png",
      tech: ["LangGraph", "Python", "Google Gemini", "Socket.io"],
      category: "Search Engine",
      github: "https://github.com/KhushveerS/Advanced-AI-Agent-Search"
    },
    {
      id: 2,
      title: "AI-FINANCAL-ASSISTANT",
      description: " The assistant provides real-time data insights across stocks, crypto, and forex markets, combined with AI-driven analytics for financial health, risk assessment, and market sentiment.",
      image: "/images/projects/ai-finacal-assistant.png",
      tech: ["React", "Weights", "Alpha Vantage", "TypeScript"],
      category: "AI Assistant",
      github: "https://github.com/KhushveerS/AI-FINANCAL-ASSISTANT"
    },
    {
      id: 3,
      title: "Quantitative Trading",
      description: "Pairs Trading With Python on pair of Stationary and Non-Stationary Stocks",
      image: "/images/projects/quantitative-trading.png",
      tech: ["Python", "Numpy", "TimeSeries", "Candlestick Pattern"],
      category: "Finance",
      github: "https://github.com/KhushveerS/Pairs-Trading-With-Python"
    },
    {
      id: 4,
      title: "Advance Coding Platform",
      description: "A comprehensive platform for practicing Data Structures & Algorithms and Competitive Programming problems from LeetCode and Codeforces..",
      image: "/images/projects/coding_platform.png",
      tech: ["React", "LeetCode GraphQL API","Codeforces REST API","Node.js", "OpenAI"],
      category: "AI",
      github: "https://github.com/KhushveerS/ADVANCED_AI_CODING_PLATFORM"
    },
     {
      id: 5,
      title: "Vexel Quiz App",
      description: "An interactive quiz platform enhanced with AI capabilities, designed to provide personalized, intelligent, and engaging learning experiences.",
      image: "/images/projects/Quiz-app.png",
      tech: ["React", "Gemini API","NodeJs","TypeScript","Vite"],
      category: "Web App + AI",
      github: "https://github.com/KhushveerS/QUIZ_PLATFORM"
    },
    
    {
      id: 6,
      title: "Global Watch",
      description: "A lightweight, offline-capable climate and weather web app with unique insights:Commute Comfort Score,AC Efficiency Advisor,UV Index,Time slider",
      image: "/images/projects/climate-app2.png",
      tech: ["JavaScript", "Restful API","CSS","HTML"],
      category: "Web App",
      github: "https://github.com/KhushveerS/climate-app"
    },
   
    {
      id: 7,
      title: "OS PLAYGORUNG",
      description: "A operational system project to visualize the various concepts of operating system.",
      image: "/images/projects/os.png",
      tech: ["Java","OS","Threads","Synchronization"],
      category: "Operating System",
      github: "https://github.com/KhushveerS/OS-PLAYGROUND"
    },
    {
      id: 8,
      title: "Chat AI App",
      description: "A modern AI-powered chat application built with Stream Chat, Google Gemini, and web search capabilities.",
      image: "/images/projects/chat-ai-app.png",
      tech: ["Node.js", "Stream Chat","Google Gemini","React",  "TypeScript", "Vite"],
      category: "Web App",
      github: "https://github.com/KhushveerS/ai-chat-app-with-gemini"
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
                  {project.image && project.image !== "/api/placeholder/400/250" ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ display: project.image && project.image !== "/api/placeholder/400/250" ? 'none' : 'flex' }}
                  >
                    <span className="text-4xl font-light text-muted-foreground">
                      {project.id}
                    </span>
                  </div>
                </div>
                
                
               {/* Overlay */}
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ArrowSquareOut 
                size={24} 
                className="text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" 
                />
              </a>
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
                <a  href={project.github} target="_blank"  rel="noopener noreferrer" 
                     className="flex items-center gap-2 text-sm text-gradient hover:gap-3 transition-all duration-300"
                 >
                     View Project
                     <ArrowRight size={14} />
                 </a>

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