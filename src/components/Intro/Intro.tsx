import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./Intro.css";

const Intro: React.FC = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <section id="intro" className="intro-container">
      {/* Background Animation */}
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 2, random: true },
            move: { speed: 1, direction: "none", outMode: "out" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
      />

      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Hi, I'm <span className="highlight">Tharun Motipalli</span>
        </motion.h1>

        <motion.h2
          className="typing-effect"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          Full Stack Developer & DevOps Engineer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Passionate about building scalable applications, optimizing cloud
          infrastructure, and automating workflows to enhance development
          efficiency and reliability.
        </motion.p>

        <motion.div
          className="intro-buttons"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a href="#projects" className="btn primary-btn">
            View Projects
          </a>
          <a href="#contact" className="btn secondary-btn">
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
