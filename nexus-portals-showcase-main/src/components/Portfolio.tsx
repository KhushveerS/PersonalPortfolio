import { useEffect, useState } from 'react';
import Preloader from './Preloader';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      
      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;