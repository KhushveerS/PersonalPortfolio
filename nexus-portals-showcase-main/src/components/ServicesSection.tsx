import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, CloudArrowUp, Robot, BracketsCurly, LinuxLogo } from "phosphor-react";
import AnimatedBackground from "./AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Service cards animation
      gsap.fromTo(
        ".service-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          filter: "blur(10px)",
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
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      title: "Deployment",
      description:
        "Experienced in deploying web applications seamlessly using platforms like Heroku and Netlify, ensuring scalability and reliability.",
      icon: <CloudArrowUp size={40} weight="duotone" />,
    },
    {
      id: 2,
      title: "API Integration",
      description:
        "Proficient in integrating RESTful APIs and GraphQL for efficient communication, enhancing web application functionality.",
      icon: <BracketsCurly size={40} weight="duotone" />,
    },
    {
      id: 3,
      title: "Web Automation",
      description:
        "Skilled in web automation using Selenium, streamlining tasks and enhancing efficiency through script automation.",
      icon: <Robot size={40} weight="duotone" />,
    },
    {
      id: 4,
      title: "Linux System",
      description:
        "Strong knowledge of Linux systems, commands, and environment setup for development and deployment.",
      icon: <LinuxLogo size={40} weight="duotone" />,
    },
    {
      id: 5,
      title: "AI Engineer",
      description:
        "Experienced in building AI solutions using deep learning, LLMs, and data-driven techniques with frameworks like TensorFlow, PyTorch, and LangChain.",
      icon: <Robot size={40} weight="duotone" />,
    },
    {
      id: 6,
      title: "Programming Languages",
      description:
        "Hands-on experience in Java, Python, C++, and JavaScript with strong problem-solving and algorithmic skills.",
      icon: <Code size={40} weight="duotone" />,
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="relative min-h-screen py-20">
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
          My <span className="text-gradient">Skills & Expertise</span>
        </h2>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <div key={service.id} className="service-card p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4 text-neon-cyan">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
