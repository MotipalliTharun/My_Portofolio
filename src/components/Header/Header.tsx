import React, { useEffect, useState } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <div className="nav-title">
          <span className="tag">&lt;</span>
          <span className="name">Tharun Motipalli</span>
          <span className="tag">/&gt;</span>
        </div>

        {/* Hamburger menu for mobile */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <ul className="nav-links">
          <li><a href="#intro" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#skills" className="nav-link">Skills</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#blog" className="nav-link">Blog</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
          <li>
            <a 
              href="src\components\Header\Tharun_Motipalli_Resume.pdf" 
              className="resume-button"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
