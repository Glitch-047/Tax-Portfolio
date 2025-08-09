import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { projects } from '../mockData';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');

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

    const element = document.querySelector('#projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleProjectClick = (project) => {
    // Mock project detail view
    alert(`Viewing details for: ${project.title}\n\nDescription: ${project.description}\n\nImpact: ${project.impact}`);
  };

  return (
    <section className="py-24 px-6 bg-gray-50">
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
            Projects
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            A selection of my most impactful financial analysis and strategy projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              className={`${
                filter === category
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:border-black hover:text-black'
              } transition-all duration-300`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="group border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <CardContent className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-normal tracking-tight mb-2 group-hover:text-gray-600 transition-colors"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </div>

                {/* Project Description */}
                <p 
                  className="text-gray-600 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Impact */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span 
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: 'Archivo, sans-serif' }}
                  >
                    Impact: {project.impact}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all duration-300 px-8 py-3"
            onClick={() => alert('View all projects functionality coming soon!')}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;