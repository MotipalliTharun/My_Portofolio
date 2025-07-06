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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/MotipalliTharun/repos`
        );
        const data = await response.json();
        const projectList = data.slice(0, 5).map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description is available.",
          html_url: repo.html_url,
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Update scroll buttons visibility
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Update on scroll
  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;

    updateScrollButtons();

    current.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      current.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [projects]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-wrapper">
        {canScrollLeft && (
          <button
            className="scroll-btn left"
            onClick={scrollLeft}
            aria-label="Scroll projects left"
          >
            ‹
          </button>
        )}
        <div className="projects-scroll" ref={scrollRef}>
          {projects.map((project, index) => (
            <div
              className="projects-card"
              key={project.name}
              style={{ "--delay": `${index * 0.15}s` } as React.CSSProperties}
            >
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button-small"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            className="scroll-btn right"
            onClick={scrollRight}
            aria-label="Scroll projects right"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
