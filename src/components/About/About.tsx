import React from "react";
import { Link as ScrollLink } from "react-scroll/modules";
import "./About.css";

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-heading">
            About
            <hr className="about-underline" />
          </h2>
          <p className="about-text">
            I'm a <span className="highlight">Full-Stack Developer</span> with a passion for building innovative and user-centric solutions. I thrive in agile environments and love solving real-world problems through code. My expertise lies in creating high-quality, scalable applications that deliver exceptional user experiences.
          </p>
          <br />
          <p className="about-text">
            I have a strong foundation in both front-end and back-end development, with experience in technologies like React, Node.js, Python, and SQL. I'm also deeply interested in <span className="highlight">Cyber Security</span> and continuously strive to enhance my skills in this domain.
          </p>
          <br />
          <p className="about-text">
            I'm currently exploring new opportunities and{" "}
            <span className="highlight">open to collaborations</span>. If you'd like to work together or just say hello, feel free to{" "}
            <ScrollLink
              smooth={true}
              offset={-100}
              spy={true}
              to="contact"
              className="contact-link"
            >
              get in touch!
            </ScrollLink>
          </p>
        </div>
        <div className="about-image-placeholder">
          <img src="src/assets/gamer.png" alt="About Me" className="about-image" />
        </div>
      </div>
    </section>
  );
};

export default About;