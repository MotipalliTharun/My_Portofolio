import React, { useEffect, useState, useRef } from "react";
import "./Projects.css";

interface Project {
  name: string;
  description: string;
  html_url: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/MotipalliTharun/repos`);
        const data = await response.json();
        const projectList = data.slice(0, 5).map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description  is available.",
          html_url: repo.html_url,
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <div className="projects-scroll" ref={scrollRef}>
          {projects.map((project, index) => (
            <div className="projects-card" key={index}>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
    </section>
  );
};

export default Projects;
