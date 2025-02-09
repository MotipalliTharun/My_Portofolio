import React from 'react';
import './App.css';
import Header from './components/Header/Header.tsx';
import About from './components/About/About.tsx';
import Skills from './components/Skills/Skills.tsx';
import Projects from './components/Projects/Projects.tsx';
import Contact from './components/Contact/Contact.tsx';
import Footer from './components/Footer/Footer.tsx';
import Blog from './components/Blog/Blog.tsx';
import Intro from './components/Intro/Intro.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Intro />
      <About />
      <Skills />
      <Blog/>
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;