import React from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll/modules";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/motipalli-tharun/",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: "#0a66c2"
    },
    {
      name: "GitHub",
      url: "https://github.com/MotipalliTharun",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      color: "#ffffff"
    },
    {
      name: "Email",
      url: "mailto:motipallitharupf@gmail.com",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      color: "#ea4335"
    }
  ];

  const quickLinks = [
    { name: "Home", to: "intro" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Blog", to: "blog" },
    { name: "Contact", to: "contact" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer id="footer" className="footer story-section" role="contentinfo">
      {/* Story Mode Chapter Header */}
      <motion.div
        className="story-chapter-header-section"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="story-chapter-title">🌟 EPILOGUE</div>
        <div className="story-chapter-subtitle">The Journey Continues</div>
        <div className="story-chapter-divider"></div>
      </motion.div>
      <div className="footer-background">
        <div className="footer-bg-shape shape-1"></div>
        <div className="footer-bg-shape shape-2"></div>
      </div>

      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Footer Main Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <h2 className="footer-title">Tharun Motipalli</h2>
            <p className="footer-description">
              Full-Stack Developer specializing in Java, Spring Boot, and cloud-native applications. Building scalable solutions with modern technologies.
            </p>
            <div className="footer-socials">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? "_blank" : undefined}
                  rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="footer-social-link"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--social-color': link.color } as React.CSSProperties}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-links" variants={itemVariants}>
            <h3 className="footer-links-title">Quick Links</h3>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    offset={-100}
                    spy={true}
                    className="footer-link"
                  >
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-contact" variants={itemVariants}>
            <h3 className="footer-contact-title">Get In Touch</h3>
            <div className="footer-contact-info">
              <a href="mailto:motipallitharupf@gmail.com" className="footer-contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>motipallitharupf@gmail.com</span>
              </a>
              <div className="footer-contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Melbourne, FL, USA</span>
              </div>
              <div className="footer-contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          variants={itemVariants}
        >
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copy">
              &copy; {currentYear} Tharun Motipalli. All rights reserved.
            </p>
            <p className="footer-built-with">
              Built with <span className="heart">❤️</span> using React, TypeScript & Three.js
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
