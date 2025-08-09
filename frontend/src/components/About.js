import React, { useState, useEffect } from 'react';
import { Award, Users, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { personalInfo, about } from '../mockData';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('#about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Briefcase,
      label: "Experience",
      value: about.experience,
      description: "Years in Finance"
    },
    {
      icon: Users,
      label: "Clients Served",
      value: about.clientsServed,
      description: "Institutional & Corporate"
    },
    {
      icon: TrendingUp,
      label: "Projects Completed",
      value: about.projectsCompleted,
      description: "Financial Analyses"
    },
    {
      icon: Award,
      label: "Certifications",
      value: about.certifications.length,
      description: "Professional Credentials"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 
            className="text-4xl md:text-5xl font-normal tracking-tight mb-6"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            About
          </h2>
          <div className="w-24 h-px bg-black mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Bio */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <h3 
                className="text-2xl font-normal tracking-tight mb-6 text-gray-900"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                Professional Summary
              </h3>
              <p 
                className="text-base leading-relaxed text-gray-700 mb-6"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                {about.summary}
              </p>
            </div>

            {/* Certifications */}
            <div>
              <h4 
                className="text-lg font-normal tracking-tight mb-4 text-gray-900"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                Professional Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.certifications.map((cert, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <p 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  <span className="font-medium">Email:</span> {personalInfo.email}
                </p>
                <p 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  <span className="font-medium">Location:</span> {personalInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div 
            className={`transition-all duration-1000 delay-400 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={index}
                  className="border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <stat.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <div 
                      className="text-2xl font-normal tracking-tight mb-2 text-gray-900"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-sm font-medium text-gray-900 mb-1"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {stat.label}
                    </div>
                    <div 
                      className="text-xs text-gray-500"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;