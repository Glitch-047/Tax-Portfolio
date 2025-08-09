import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { testimonials } from '../mockData';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

    const element = document.querySelector('#testimonials');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
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
            Client Testimonials
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Trusted by industry leaders and institutional clients
          </p>
        </div>

        {/* Main Testimonial */}
        <div 
          className={`transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="border-gray-200 shadow-lg bg-white max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Quote className="w-8 h-8 text-gray-600" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      className="w-5 h-5 fill-black text-black"
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote 
                  className="text-xl md:text-2xl leading-relaxed text-gray-800 mb-8 max-w-3xl mx-auto"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Client Photo and Info */}
                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-gray-200"
                  />
                  <div className="text-center">
                    <h4 
                      className="text-lg font-medium text-gray-900 mb-1"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p 
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {testimonials[currentTestimonial].position}
                    </p>
                    <p 
                      className="text-gray-500 text-sm font-medium"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div 
          className={`flex justify-center items-center gap-6 mt-8 transition-all duration-1000 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="icon"
            className="border-gray-300 text-gray-600 hover:border-black hover:text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-black w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={goToNext}
            variant="outline"
            size="icon"
            className="border-gray-300 text-gray-600 hover:border-black hover:text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* All Testimonials Preview */}
        <div 
          className={`grid md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-600 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-md ${
                index === currentTestimonial ? 'ring-2 ring-black' : ''
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h5 
                      className="text-sm font-medium text-gray-900"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {testimonial.name}
                    </h5>
                    <p 
                      className="text-xs text-gray-600"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p 
                  className="text-sm text-gray-600 leading-relaxed line-clamp-3"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  {testimonial.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;