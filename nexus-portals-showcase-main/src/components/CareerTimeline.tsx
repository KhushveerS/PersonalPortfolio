import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  skills: string[];
};

const items: TimelineItem[] = [
  {
    period: '2022 - 2023',
    title: 'Web Developer (Trainee)',
    org: 'Self Learning',
    description:
      'Learned HTML, CSS, JavaScript and React. Built beginner to intermediate projects and learned version control with Git.',
    skills: ['Html', 'Css', 'Javascript', 'React', 'Git']
  },
  {
    period: '2021 - 2022',
    title: 'Intermediate Student',
    org: 'Academic Journey',
    description:
      'Strengthened problem solving and fundamentals while exploring UI design and animations for the web.',
    skills: ['UI', 'Animations', 'Problem Solving']
  },
  {
    period: '2020 - 2021',
    title: 'Beginner',
    org: 'Getting Started',
    description:
      'Discovered a passion for the web and started building small experiments and pages.',
    skills: ['HTML', 'CSS']
  }
];

const CareerTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // animate title
      gsap.fromTo(
        '.timeline-title',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      // grow vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // reveal each card
      gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, filter: 'blur(8px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative min-h-screen py-20">
      <AnimatedBackground mode="snow" density={0.32} colors={["#ffffff", "#a78bfa", "#22d3ee"]} />
      <div className="container mx-auto px-6">
        <h2 className="timeline-title text-4xl md:text-6xl font-light text-center mb-16">
          Career <span className="text-gradient">Timeline</span>
        </h2>

        <div className="relative">
          {/* vertical line */}
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-neon-purple/40 rounded-full" />

          <div className="space-y-16">
            {items.map((item, index) => (
              <div key={item.title + index} className="relative">
                <div className={`timeline-card glass-card max-w-2xl ${
                  index % 2 === 0 ? 'ml-0 md:ml-0 md:mr-auto md:text-left' : 'md:ml-auto md:text-left'
                } p-6 md:p-8 rounded-xl shadow-lg`}>
                  <div className="text-sm text-muted-foreground mb-2">{item.period}</div>
                  <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                  <div className="text-gradient mb-4">{item.org}</div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 bg-muted/20 rounded-full text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>

                {/* node on line */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-4 border-neon-purple" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;


