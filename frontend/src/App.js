import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

// Background animation component
const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
      
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/5 to-transparent animate-pulse-slow" />
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-white text-black relative">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Header />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section id="blog">
            <Blog />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;