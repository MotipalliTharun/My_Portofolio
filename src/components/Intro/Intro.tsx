import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import AI3DElement from "../AI3DElement/AI3DElement";
import "./Intro.css";

const jobTitles = [
  "Java Full Stack Developer",
  "Cloud-Native Application Developer",
  "CI/CD & Kubernetes Specialist",
  "Microservices Backend Engineer"
];

const TYPING_DELAY = 100;
const PAUSE_DELAY = 2000;

const stats = [
  { value: "3+", label: "Years Experience", icon: "💼" },
  { value: "50+", label: "Projects Completed", icon: "🚀" },
  { value: "M.S.", label: "Computer Science", icon: "🎓" },
  { value: "Full-Time", label: "Seeking Opportunities", icon: "🌐" },
];

const Intro: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing effect
  useEffect(() => {
    const currentTitle = jobTitles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex <= currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, TYPING_DELAY);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, TYPING_DELAY / 2);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), PAUSE_DELAY);
        } else {
          setTitleIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
          setCharIndex(0);
          setIsDeleting(false);
        }
      }, PAUSE_DELAY);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="intro" className="intro-container story-section" ref={containerRef}>
      {/* Story Mode Chapter Header */}
      <motion.div
        className="story-chapter-header-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="story-chapter-title">🎬 PROLOGUE</div>
        <div className="story-chapter-subtitle">The Beginning</div>
        <div className="story-chapter-divider"></div>
      </motion.div>

      {/* AI 3D Element that transforms on scroll */}
      <AI3DElement className="intro-ai-element" />
      
      {/* Animated background elements */}
      <div className="animated-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <motion.div
        className="intro-content"
        style={{ y, opacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="intro-header"
        >
          <motion.span
            className="intro-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            🎓 Student & Developer
          </motion.span>
          <h1 className="intro-title">
            Hi, I'm <span className="highlight">Tharun Motipalli</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="typing-effect">
            {displayedText}
            <span className="cursor">|</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="intro-description">
            I'm a Computer Science graduate student and developer who builds scalable backend systems using Java, Spring Boot, and Docker. I integrate cloud-native microservices with Kubernetes and AWS, and streamline DevOps pipelines for high-availability deployments.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="intro-stats"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="location-info"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          🎓 Master's Student at Florida Institute of Technology | 📍 Based in Melbourne, FL | Seeking Full-Time Opportunities
        </motion.p>

        <motion.div
          className="intro-buttons"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="btn primary-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn secondary-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Contact Me</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Code snippets floating */}
      <div className="code-snippets">
        <div className="code-snippet">{"{ Spring Boot }"}</div>
        <div className="code-snippet">{"< Docker />"}</div>
        <div className="code-snippet">{"Kubernetes"}</div>
        <div className="code-snippet">{"AWS Cloud"}</div>
      </div>
    </section>
  );
};

export default Intro;
