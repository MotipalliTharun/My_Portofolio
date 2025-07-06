import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Intro.css";

const jobTitles = [
  "Java Full Stack Developer",
  "Cloud-Native Application Developer",
  "CI/CD & Kubernetes Specialist",
  "Microservices Backend Engineer"
];

const TYPING_DELAY = 100; // ms between each character
const PAUSE_DELAY = 2000; // pause before switching to next title

const Intro: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
          // Done typing → wait
          setTimeout(() => setIsDeleting(true), PAUSE_DELAY);
        } else {
          // Done deleting → move to next
          setTitleIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
          setCharIndex(0);
          setIsDeleting(false);
        }
      }, PAUSE_DELAY);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="intro" className="intro-container">
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.h1>
          Hi, I'm <span className="highlight">Tharun Motipalli</span>
        </motion.h1>

        <motion.h2 className="typing-effect">
          {displayedText}
          <span className="cursor">|</span>
        </motion.h2>

        <motion.p>
          I build scalable backend systems using Java, Spring Boot, and Docker, integrate cloud-native microservices with Kubernetes and AWS, and streamline DevOps pipelines for high-availability deployments.
        </motion.p>

        <motion.p className="location-info">
          Based in Melbourne, FL | Open to Full-Time & Contract Opportunities
        </motion.p>

        <motion.div className="intro-buttons">
          <a href="#projects" className="btn primary-btn">View Projects</a>
          <a href="#contact" className="btn secondary-btn">Contact Me</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
