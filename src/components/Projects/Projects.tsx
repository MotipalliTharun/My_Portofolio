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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobile(mobile);
      updateScrollButtons();
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [projects, isMobile]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-wrapper">
        {isMobile && canScrollLeft && (
          <button className="scroll-btn left" onClick={scrollLeft}>
            ‹
          </button>
        )}

        <div
          className={`projects-scroll ${isMobile ? "single-card" : ""}`}
          ref={scrollRef}
        >
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="projects-card"
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

        {isMobile && canScrollRight && (
          <button className="scroll-btn right" onClick={scrollRight}>
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
