import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";

interface Project {
  name: string;
  description: string;
  html_url: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  topics?: string[];
  homepage?: string;
}

interface EnhancedProject extends Project {
  techStack?: string[];
  features?: string[];
  metrics?: {
    stars?: number;
    forks?: number;
    contributors?: number;
  };
  category?: string;
  status?: "active" | "archived" | "completed";
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<EnhancedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<EnhancedProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<EnhancedProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Enhanced project data with additional details
  const enhancedProjectData: Record<string, Partial<EnhancedProject>> = {
    "Patient_Management_System": {
      techStack: ["Spring Boot", "gRPC", "Kafka", "Docker", "Kubernetes", "PostgreSQL", "AWS"],
      features: [
        "Microservices architecture with gRPC communication",
        "Event-driven design using Apache Kafka",
        "JWT-based authentication & Spring Security",
        "Containerized deployment on AWS",
        "CI/CD pipelines with Jenkins"
      ],
      category: "Backend",
      status: "active",
      metrics: {
        contributors: 3
      }
    },
    "My_Portofolio": {
      techStack: ["React", "TypeScript", "Vite", "Framer Motion", "CSS3"],
      features: [
        "Responsive design with modern UI/UX",
        "Animated components with Framer Motion",
        "Interactive chatbot with workflow capabilities",
        "GitHub API integration for live project data"
      ],
      category: "Frontend",
      status: "active"
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/MotipalliTharun/repos?sort=updated&per_page=10`
        );
        const data = await response.json();
        
        const projectList: EnhancedProject[] = data.map((repo: any) => {
          const enhanced = enhancedProjectData[repo.name] || {};
          return {
            name: repo.name,
            description: repo.description || "A professional software development project.",
            html_url: repo.html_url,
            language: repo.language || "Multiple",
            stargazers_count: repo.stargazers_count || 0,
            forks_count: repo.forks_count || 0,
            updated_at: repo.updated_at,
            topics: repo.topics || [],
            homepage: repo.homepage,
            techStack: enhanced.techStack || [repo.language || "JavaScript"].filter(Boolean),
            features: enhanced.features || ["Production-ready code", "Well-documented", "Scalable architecture"],
            category: enhanced.category || "Full Stack",
            status: enhanced.status || "active",
            metrics: {
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              contributors: enhanced.metrics?.contributors || 1
            }
          };
        });
        
        setProjects(projectList);
        setFilteredProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category?.toLowerCase() === selectedFilter.toLowerCase()));
    }
  }, [selectedFilter, projects]);

  const openModal = (project: EnhancedProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const getTechIcon = (tech: string) => {
    const icons: Record<string, string> = {
      "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      "Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
      "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    };
    return icons[tech] || icons["JavaScript"];
  };

  const categories = ["all", "Backend", "Frontend", "Full Stack"];

  if (isLoading) {
    return (
      <section id="projects" className="projects-container">
        <div className="projects-loading">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-container story-section">
      {/* Story Mode Chapter Header */}
      <motion.div
        className="story-chapter-header-section"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="story-chapter-title">🏗️ CHAPTER III</div>
        <div className="story-chapter-subtitle">Tales of Creation</div>
        <div className="story-chapter-divider"></div>
      </motion.div>
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="projects-title">Featured Projects</h2>
        <p className="projects-subtitle">
          A collection of my best work showcasing expertise in full-stack development, cloud architecture, and DevOps
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="projects-filters"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedFilter === category ? "active" : ""}`}
            onClick={() => setSelectedFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="projects-grid">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              className="projects-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openModal(project)}
            >
              <div className="project-header">
                <div className="project-status-badge" data-status={project.status}>
                  {project.status}
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-category">{project.category}</p>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tech-stack">
                {project.techStack?.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="tech-badge" title={tech}>
                    {tech}
                  </span>
                ))}
                {project.techStack && project.techStack.length > 4 && (
                  <span className="tech-badge">+{project.techStack.length - 4}</span>
                )}
              </div>

              <div className="project-metrics">
                <div className="metric">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                  </svg>
                  <span>{project.metrics?.stars || 0}</span>
                </div>
                <div className="metric">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  </svg>
                  <span>{project.metrics?.forks || 0}</span>
                </div>
                <div className="metric">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    <path fillRule="evenodd" d="M0 7.75C0 3.366 3.366 0 7.75 0S15.5 3.366 15.5 7.75c0 4.384-3.366 7.75-7.75 7.75S0 12.134 0 7.75zm7.75-6.25a6.25 6.25 0 100 12.5 6.25 6.25 0 000-12.5z" />
                  </svg>
                  <span>{project.metrics?.contributors || 1}</span>
                </div>
              </div>

              <div className="project-actions">
                <button className="project-btn-primary">View Details</button>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-secondary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>

              <div className="modal-header">
                <h2>{selectedProject.name}</h2>
                <div className="modal-badges">
                  <span className="modal-badge" data-category={selectedProject.category}>
                    {selectedProject.category}
                  </span>
                  <span className="modal-badge" data-status={selectedProject.status}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              <p className="modal-description">{selectedProject.description}</p>

              <div className="modal-section">
                <h3>Technologies Used</h3>
                <div className="modal-tech-grid">
                  {selectedProject.techStack?.map((tech, idx) => (
                    <div key={idx} className="modal-tech-item">
                      <img
                        src={getTechIcon(tech)}
                        alt={tech}
                        className="tech-icon"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3>Key Features</h3>
                <ul className="features-list">
                  {selectedProject.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-metrics">
                <div className="modal-metric">
                  <span className="metric-value">{selectedProject.metrics?.stars || 0}</span>
                  <span className="metric-label">Stars</span>
                </div>
                <div className="modal-metric">
                  <span className="metric-value">{selectedProject.metrics?.forks || 0}</span>
                  <span className="metric-label">Forks</span>
                </div>
                <div className="modal-metric">
                  <span className="metric-value">{selectedProject.metrics?.contributors || 1}</span>
                  <span className="metric-label">Contributors</span>
                </div>
              </div>

              <div className="modal-actions">
                <a
                  href={selectedProject.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-primary"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View on GitHub
                </a>
                {selectedProject.homepage && (
                  <a
                    href={selectedProject.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn modal-btn-secondary"
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
                      <path fillRule="evenodd" d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 101.708 1.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
