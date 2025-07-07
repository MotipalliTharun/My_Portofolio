import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <h2 className="footer-title">Tharun Motipalli</h2>
        <p className="footer-description">Full-Stack Developer | Java • React • Spring Boot • MongoDB</p>
        <nav aria-label="Footer Social Links" className="footer-socials">
          <a href="https://www.linkedin.com/in/motipalli-tharun/" target="_blank" rel="noopener noreferrer" className="footer-link">
          LinkedIn
          </a>
          <a href="https://github.com/MotipalliTharun" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <a href="mailto:motipallitharupf@gmail.com.com" className="footer-link">
            Email
          </a>
        </nav>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Tharun Motipalli. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
