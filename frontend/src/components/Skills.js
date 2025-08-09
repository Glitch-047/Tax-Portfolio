import React, { useState, useEffect } from 'react';
import { BarChart3, Code2, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { skills } from '../mockData';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector('#skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const categoryIcons = {
    'Analysis': BarChart3,
    'Software': Code2,
    'Finance': TrendingUp,
    'Leadership': Users
  };

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
            Skills & Expertise
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Comprehensive skill set across financial analysis, technology, and leadership
          </p>
        </div>

        {/* Skills Grid */}
        <div 
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {skills.map((skillCategory, index) => {
            const IconComponent = categoryIcons[skillCategory.category] || BarChart3;
            
            return (
              <Card 
                key={index}
                className="border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-md group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 
                      className="text-lg font-normal tracking-tight"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {skillCategory.category}
                    </h3>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="relative"
                        onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700"
                            style={{ fontFamily: 'Archivo, sans-serif' }}
                          >
                            {skill}
                          </span>
                        </div>
                        
                        {/* Skill Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full bg-black transition-all duration-700 delay-${skillIndex * 100} ${
                              isVisible ? 'translate-x-0' : '-translate-x-full'
                            }`}
                            style={{ 
                              width: `${85 + Math.random() * 15}%`,
                              transform: hoveredSkill === `${index}-${skillIndex}` ? 'scaleY(1.5)' : 'scaleY(1)'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Skills Section */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 
            className="text-xl font-normal tracking-tight mb-6 text-gray-900"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Additional Competencies
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Regulatory Compliance',
              'Due Diligence',
              'Mergers & Acquisitions',
              'Financial Reporting',
              'Stakeholder Management',
              'Cross-functional Collaboration',
              'Market Research',
              'Investment Banking',
              'Wealth Management',
              'Corporate Finance'
            ].map((skill, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-300 cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-800 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Looking for expertise in financial analysis or strategic planning?
          </p>
          <button
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300 rounded-md"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Let's Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;