import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../mockData';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = (type) => {
    switch (type) {
      case 'email':
        window.open(`mailto:${personalInfo.email}`, '_blank');
        break;
      case 'linkedin':
        window.open(personalInfo.linkedin, '_blank');
        break;
      case 'github':
        window.open(personalInfo.github, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <div 
          className={`space-y-8 transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Name */}
          <h1 
            className="text-6xl md:text-8xl font-normal tracking-tight leading-none"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            {personalInfo.name}
          </h1>

          {/* Title */}
          <h2 
            className="text-xl md:text-2xl font-normal tracking-wide text-gray-700"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            {personalInfo.title}
          </h2>

          {/* Subtitle */}
          <p 
            className="text-base md:text-lg font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            {personalInfo.subtitle}
          </p>

          {/* Location */}
          <p 
            className="text-sm text-gray-500 tracking-wider"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            {personalInfo.location}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button 
              onClick={() => handleContact('email')}
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300 px-8 py-3"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => handleContact('linkedin')}
                variant="outline"
                size="icon"
                className="border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              
              <Button 
                onClick={() => handleContact('github')}
                variant="outline"
                size="icon"
                className="border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}
        >
          <button
            onClick={scrollToAbout}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <ArrowDown className="w-6 h-6 text-gray-400 animate-bounce group-hover:text-black transition-colors" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-30"></div>
      <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-30"></div>
    </section>
  );
};

export default Hero;