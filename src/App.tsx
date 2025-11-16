import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/StoryMode.global.css';
import Header from './components/Header/Header.tsx';
import About from './components/About/About.tsx';
import Skills from './components/Skills/Skills.tsx';
import Projects from './components/Projects/Projects.tsx';
import Contact from './components/Contact/Contact.tsx';
import Footer from './components/Footer/Footer.tsx';
import Blog from './components/Blog/Blog.tsx';
import Intro from './components/Intro/Intro.tsx';
import Chatbot from './components/Chatbot/Chatbot.tsx';
import StoryMode from './components/StoryMode/StoryMode.tsx';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('intro');

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'about', 'skills', 'projects', 'blog', 'contact', 'footer'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterSelect = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <div className="App story-mode-app">
      <StoryMode currentSection={currentSection} onChapterSelect={handleChapterSelect} />
      <Header />
      <Intro />
      <About />
      <Skills />
      <Blog/>
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;