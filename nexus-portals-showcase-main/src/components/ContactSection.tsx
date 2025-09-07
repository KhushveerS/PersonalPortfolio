import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spline background animation
      gsap.fromTo(splineRef.current,
        {
          opacity: 0,
          scale: 1.1,
          filter: "blur(20px)"
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          y: 100,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social icons staggered animation
      gsap.fromTo(".social-icon",
        {
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate button on submit
    gsap.to(".submit-button", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Here you would handle the form submission
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const socialLinks = [
    {
      icon: GithubLogo,
      name: 'GitHub',
      url: 'https://github.com/KhushveerS',
      color: 'hover:text-neon-cyan'
    },
    {
      icon: LinkedinLogo,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/khushveer-singh-b6b888286/',
      color: 'hover:text-neon-blue'
    },
    {
      icon: EnvelopeSimple,
      name: 'Email',
      url: 'khushveersingh645@gmail.com',
      color: 'hover:text-neon-purple'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
    >
      {/* Background Spline 3D - Positioned on right */}
      <div 
        ref={splineRef}
        className="absolute right-0 top-0 w-1/2 h-full hidden lg:block"
      >
        <iframe 
          src='https://my.spline.design/holographicearthwithdynamiclines-WCA79CoGAATaIviVw8xzNJCo/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Mobile background - subtle overlay */}
      <div className="absolute inset-0 lg:hidden">
        <iframe 
          src='https://my.spline.design/holographicearthwithdynamiclines-WCA79CoGAATaIviVw8xzNJCo/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full opacity-30"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 lg:bg-gradient-to-r lg:from-background/80 lg:via-background/60 lg:to-transparent backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:max-w-4xl">
        <div className="lg:max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-light mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's discuss your next project and create something amazing together.
            </p>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef}
            className="glass-card p-8 md:p-12 max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="futuristic-input"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="futuristic-input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="futuristic-input resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                className="submit-button w-full hero-button group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Send Message
                  <PaperPlaneTilt 
                    size={20} 
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                  />
                </span>
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Or connect with me on</p>
            <div className="flex justify-center space-x-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon glass-card p-4 text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-neon`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;