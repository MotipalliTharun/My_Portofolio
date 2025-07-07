import React from 'react';
import './Skills.css';

const skills = [
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' }, // no official hibernate icon, reused Java
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'AWS', logo: '\icons8-aws-logo-50.png' },
  { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
  { name: 'Maven', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-heading">
        Skills
        <hr className="skills-underline" />
      </h2>
      <p className="skills-description">
        I specialize in building scalable, secure, and cloud-native applications. My toolkit includes backend development with Java and Spring Boot, container orchestration with Kubernetes, and CI/CD automation with Jenkins and Maven. Additionally, I have solid experience in frontend frameworks and database management.
      </p>
      <div className="skills-scroll-container">
        <div className="skills-scroll">
          {skills.map((skill, index) => (
            <div className="skill-card" key={`${skill.name}-${index}`}>
              <img src={skill.logo} alt={skill.name} className="skill-logo" />
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
          {skills.map((skill, index) => (
            <div className="skill-card" key={`${skill.name}-${index}-2`}>
              <img src={skill.logo} alt={skill.name} className="skill-logo" />
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
