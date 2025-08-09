import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { blogPosts } from '../mockData';

const Blog = () => {
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
      { threshold: 0.2 }
    );

    const element = document.querySelector('#blog');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleReadMore = (post) => {
    // Mock blog post detail view
    alert(`Opening blog post: ${post.title}\n\nExcerpt: ${post.excerpt}\n\nThis would normally navigate to the full blog post.`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            Insights & Articles
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Thoughts on finance, market trends, and investment strategies
          </p>
        </div>

        {/* Featured Post */}
        <div 
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {blogPosts.length > 0 && (
            <Card className="border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="aspect-video md:aspect-square overflow-hidden">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <Badge 
                      variant="outline"
                      className="border-gray-300 text-gray-600 mb-4"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {blogPosts[0].category}
                    </Badge>
                    <h3 
                      className="text-2xl md:text-3xl font-normal tracking-tight mb-4 group-hover:text-gray-600 transition-colors"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {blogPosts[0].title}
                    </h3>
                    <p 
                      className="text-gray-600 leading-relaxed mb-6"
                      style={{ fontFamily: 'Archivo, sans-serif' }}
                    >
                      {blogPosts[0].excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blogPosts[0].date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleReadMore(blogPosts[0])}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:border-black hover:text-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Other Posts */}
        <div 
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {blogPosts.slice(1).map((post, index) => (
            <Card 
              key={post.id}
              className="border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleReadMore(post)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge 
                    variant="outline"
                    className="border-gray-300 text-gray-600 text-xs"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                </div>
                
                <h4 
                  className="text-lg font-normal tracking-tight mb-3 group-hover:text-gray-600 transition-colors"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  {post.title}
                </h4>
                
                <p 
                  className="text-gray-600 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Posts Button */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 hover:border-black hover:text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
            onClick={() => alert('View all blog posts functionality coming soon!')}
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;