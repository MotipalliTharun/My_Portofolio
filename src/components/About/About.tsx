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
            I'm a <span className="highlight">Java Full Stack Developer</span> with over 3 years of experience designing and deploying scalable, cloud-native backend systems. I specialize in <span className="highlight">Spring Boot, Hibernate, REST/SOAP APIs</span>, and containerized microservices using <span className="highlight">Docker and Kubernetes</span>.
          </p>
          <br />

          <p className="about-text">
            I've built and maintained high-performance backend platforms for leading organizations like <span className="highlight">Citigroup, Bloomin' Brands, and Renault Nissan</span>. My work includes integrating <span className="highlight">OAuth 2.0 authentication</span>, implementing <span className="highlight">CI/CD pipelines</span> using Jenkins and GitHub Actions, and optimizing relational and NoSQL databases.
          </p>
          <br />

          <p className="about-text">
            I'm currently pursuing my Master’s in Computer Science at <span className="highlight">Florida Institute of Technology</span>, and I’m <span className="highlight">actively seeking full-time opportunities</span> in software engineering and DevOps. If you're interested in collaborating or hiring, feel free to{" "}
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
