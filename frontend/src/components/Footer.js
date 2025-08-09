import React from 'react';
import { Mail, Phone, Linkedin, Github, Heart, Download } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleContact = (type) => {
    switch (type) {
      case 'email':
        window.open(`mailto:${personalInfo.email}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${personalInfo.phone}`, '_blank');
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Alexandra-Sterling-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand/Contact */}
          <div className="space-y-6">
            <div>
              <h3 
                className="text-2xl font-normal tracking-tight mb-2"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                {personalInfo.name}
              </h3>
              <p 
                className="text-gray-400 text-sm"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                {personalInfo.title}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleContact('email')}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                {personalInfo.email}
              </button>
              
              <button
                onClick={() => handleContact('phone')}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                <Phone className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                {personalInfo.phone}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleContact('linkedin')}
                variant="outline"
                size="icon"
                className="border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => handleContact('github')}
                variant="outline"
                size="icon"
                className="border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </Button>

              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 
              className="text-lg font-normal tracking-tight"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Quick Links
            </h4>
            
            <nav className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Blog', href: '#blog' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-300 hover:text-white transition-colors text-sm group"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  <span className="group-hover:translate-x-1 inline-block transition-transform">
                    {link.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Services/Specializations */}
          <div className="space-y-6">
            <h4 
              className="text-lg font-normal tracking-tight"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Specializations
            </h4>
            
            <div className="space-y-3">
              {[
                'Investment Strategy',
                'Risk Management',
                'Portfolio Analysis',
                'Financial Modeling',
                'ESG Investing',
                'Market Research'
              ].map((service, index) => (
                <div
                  key={index}
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span style={{ fontFamily: 'Archivo, sans-serif' }}>
                © {currentYear} {personalInfo.name}. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <button 
                className="hover:text-white transition-colors"
                style={{ fontFamily: 'Archivo, sans-serif' }}
                onClick={() => alert('Privacy policy details would go here.')}
              >
                Privacy Policy
              </button>
              <button 
                className="hover:text-white transition-colors"
                style={{ fontFamily: 'Archivo, sans-serif' }}
                onClick={() => alert('Terms of service details would go here.')}
              >
                Terms of Service
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              <span className="text-sm">Back to Top</span>
              <div className="w-6 h-6 border border-gray-600 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <div className="w-2 h-2 border-t border-r border-gray-400 group-hover:border-white transform rotate-[-45deg] translate-y-0.5 transition-colors"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </footer>
  );
};

export default Footer;