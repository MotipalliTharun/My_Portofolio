import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

interface HeaderProps {
  onOpenStoryMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenStoryMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'intro' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Blog', to: 'blog' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="nav">
        <motion.div
          className="nav-title"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="tag">&lt;</span>
          <span className="name">THARUN_MOTIPALLI</span>
          <span className="tag">/&gt;</span>
          <motion.span
            className="nav-cursor"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            _
          </motion.span>
        </motion.div>

        {/* Hamburger menu for mobile */}
        <input
          type="checkbox"
          id="menu-toggle"
          className="menu-toggle"
          checked={isMenuOpen}
          onChange={(e) => setIsMenuOpen(e.target.checked)}
        />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <a
                href={`#${link.to}`}
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-link-number">{String(index + 1).padStart(2, '0')}</span>
                {link.name}
              </a>
            </motion.li>
          ))}
          {onOpenStoryMode && (
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 + 0.1, duration: 0.5 }}
            >
              <button
                type="button"
                className="nav-link nav-link-story"
                onClick={() => {
                  onOpenStoryMode();
                  setIsMenuOpen(false);
                }}
              >
                <span className="nav-link-number">SM</span>
                Story Mode
              </button>
            </motion.li>
          )}
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
          >
            <a
              href="/Tharun_Motipalli_Resume.pdf"
              className="resume-button"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </motion.li>
        </ul>
      </nav>

      {/* Star Wars style scan line */}
      <motion.div
        className="header-scanline"
        animate={{ y: ['0vh', '100vh', '0vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </motion.header>
  );
};

export default Header;
