import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Lightning,
  Globe,
  Cpu 
} from 'phosphor-react';
import profileAvatar from '@/assets/profile-avatar.png';
import AnimatedBackground from './AnimatedBackground';
import { GitBranch, GitBranchPlusIcon, GitCommit, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current, 
        {
          opacity: 0,
          x: -100,
          rotation: -10,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills staggered animation
      gsap.fromTo(".skill-icon",
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { icon: Globe, name: 'HTML5', color: 'text-orange-400', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5' },
    { icon: Palette, name: 'CSS3', color: 'text-blue-400', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { icon: Code, name: 'JavaScript', color: 'text-yellow-400', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { icon: Code, name: 'TypeScript', color: 'text-blue-500', url: 'https://www.typescriptlang.org/docs/' },
    { icon: Lightning, name: 'React', color: 'text-cyan-400', url: 'https://react.dev/learn' },
    { icon: Leaf, name: 'Tailwind CSS', color: 'text-emerald-400', url: 'https://tailwindcss.com/' },
    { icon: Rocket, name: 'GSAP', color: 'text-green-400', url: 'https://gsap.com/docs/v3/' },
    { icon: Cpu, name: 'Node.js', color: 'text-green-500', url: 'https://nodejs.org/docs/latest/api/' },
    { icon: Globe, name: 'Vite', color: 'text-purple-400', url: 'https://vite.dev/' },
    { icon: GitBranch, name: 'Git', color: 'text-rose-400', url: 'https://git-scm.com/doc' }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20"
    >
      <AnimatedBackground 
        mode="snow" 
        density={0.38} 
        colors={["#ffffff", "#f472b6", "#22d3ee", "#a78bfa", "#34d399"]}
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Image container */}
              <div className="relative glass-card p-8 rounded-full border-2 border-neon-cyan/30 group-hover:border-neon-cyan/60 transition-all duration-500 group-hover:scale-105">
                <img 
                  src={profileAvatar}
                  alt="Khushveer - Web Developer"
                  className="w-full h-full object-cover rounded-full filter group-hover:brightness-110 transition-all duration-500"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-cyan rounded-full blur-sm opacity-70 float-element"></div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-neon-purple rounded-full blur-sm opacity-50 float-delayed"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                     I'm an AI Engineer and Web Developer passionate about building intelligent applications that combine automation, data-driven insights, and seamless user experiences.
                </p>
                <p>
                  With expertise in frameworks like React, deep learning libraries such as TensorFlow and PyTorch, and modern tools like LangChain and GSAP, I create solutions that bridge the gap between AI and interactive web technologies.
                 </p>
                <p>
                   My mission is to design and engineer systems that are not only visually engaging but also scalable, efficient, and powered by the latest advancements in artificial intelligence.
                </p>
              </div>

            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-light mb-6 text-gradient-purple">
                Tech Stack
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {skills.map((skill, index) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-icon glass-card p-4 text-center group hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <skill.icon
                      size={32}
                      className={`mx-auto mb-2 ${skill.color} group-hover:scale-125 transition-transform duration-300`}
                    />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {skill.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;