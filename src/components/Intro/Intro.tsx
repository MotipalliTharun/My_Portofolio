import React from "react";
import "./Intro.css";

const Intro: React.FC = () => {
  return (
    <section className="intro-container">
      <div className="intro-content">
        <h1>
          Hi, I'm <span className="highlight">Tharun Motipalli</span>
        </h1>
        <h2 className="typing-effect">Software Developer & Aerospace Engineer</h2>
        <p>
          Passionate about building innovative solutions, blending technology
          with aerodynamics, and crafting seamless user experiences.
        </p>
        <div className="intro-buttons">
          <a href="#projects" className="btn primary-btn">
            View Projects
          </a>
          <a href="#contact" className="btn secondary-btn">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
