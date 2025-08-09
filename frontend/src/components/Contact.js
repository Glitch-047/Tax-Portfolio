import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { personalInfo } from '../mockData';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

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

    const element = document.querySelector('#contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      description: "Best for detailed inquiries"
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      description: "Available 9 AM - 6 PM EST"
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: null,
      description: "Open to remote collaboration"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo.linkedin,
      color: "hover:text-blue-600"
    },
    {
      icon: Github,
      label: "GitHub",
      href: personalInfo.github,
      color: "hover:text-gray-800"
    }
  ];

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
            Get In Touch
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Ready to discuss your financial strategy or investment needs? Let's connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div 
            className={`lg:col-span-1 space-y-6 transition-all duration-1000 delay-200 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 
              className="text-2xl font-normal tracking-tight mb-6"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Contact Information
            </h3>

            {contactMethods.map((method, index) => (
              <Card key={index} className="border-gray-200 hover:border-black transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <method.icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="font-medium text-gray-900 mb-1"
                        style={{ fontFamily: 'Archivo, sans-serif' }}
                      >
                        {method.label}
                      </h4>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-gray-600 hover:text-black transition-colors"
                          style={{ fontFamily: 'Archivo, sans-serif' }}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p 
                          className="text-gray-600"
                          style={{ fontFamily: 'Archivo, sans-serif' }}
                        >
                          {method.value}
                        </p>
                      )}
                      <p 
                        className="text-sm text-gray-500 mt-1"
                        style={{ fontFamily: 'Archivo, sans-serif' }}
                      >
                        {method.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Links */}
            <div className="pt-6">
              <h4 
                className="text-lg font-normal tracking-tight mb-4"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                Connect Online
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`border-gray-300 text-gray-600 hover:border-black ${social.color} transition-all duration-300`}
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <social.icon className="w-4 h-4" />
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-600 hover:border-black hover:text-black transition-all duration-300"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = personalInfo.resumeUrl;
                    link.download = 'Alexandra-Sterling-Resume.pdf';
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`lg:col-span-2 transition-all duration-1000 delay-400 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <h3 
                  className="text-2xl font-normal tracking-tight"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  Send a Message
                </h3>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  I'd love to hear about your project or opportunity.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What's this about?"
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell me more about your project or inquiry..."
                      rows={5}
                      className="border-gray-300 focus:border-black resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300 py-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;