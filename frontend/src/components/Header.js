import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo, navigationItems } from '../mockData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Alexandra-Sterling-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div 
            className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('#home')}
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            {personalInfo.name.split(' ')[0]}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-normal tracking-wide hover:text-gray-600 transition-colors relative group"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <Button 
              onClick={handleDownload}
              variant="outline" 
              size="sm"
              className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-sm font-normal tracking-wide hover:text-gray-600 transition-colors py-2"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={handleDownload}
                variant="outline" 
                size="sm"
                className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 mt-4"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;