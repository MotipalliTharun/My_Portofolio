import React from 'react';
import './Skills.css';

const skills = [
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-heading">
        Skills
        <hr className="skills-underline" />
      </h2>
      <p className="skills-description">
        I specialize in building modern, scalable, and user-friendly applications using the latest technologies. Here are some of the tools and technologies I work with:
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