import React from "react";
import "./Intro.css";

const Intro: React.FC = () => {
  return (
    <section id="intro" className="intro-container">
      <div className="intro-content">
        <h1>
          Hi, I'm <span className="highlight">Tharun Motipalli</span>
        </h1>
        <h2 className="typing-effect">Full Stack Developer & DevOps Engineer</h2>
<p>
  Passionate about building scalable applications, optimizing cloud infrastructure,  
  and automating workflows to enhance development efficiency and reliability.
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
