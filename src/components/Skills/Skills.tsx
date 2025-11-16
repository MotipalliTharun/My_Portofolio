import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import AI3DElement from "../AI3DElement/AI3DElement";
import "./Skills.css";

interface Skill {
  name: string;
  logo: string;
  category: "backend" | "frontend" | "devops" | "database" | "tools";
  proficiency: number;
}

const skills: Skill[] = [
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'backend', proficiency: 95 },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', category: 'backend', proficiency: 90 },
  { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'backend', proficiency: 85 },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend', proficiency: 88 },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend', proficiency: 85 },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'frontend', proficiency: 90 },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend', proficiency: 82 },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'devops', proficiency: 90 },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'devops', proficiency: 85 },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', category: 'devops', proficiency: 88 },
  { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', category: 'devops', proficiency: 85 },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', proficiency: 90 },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', proficiency: 88 },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', proficiency: 85 },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'tools', proficiency: 95 },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'backend', proficiency: 80 },
];

const categories = [
  { name: "All", value: "all" },
  { name: "Backend", value: "backend" },
  { name: "Frontend", value: "frontend" },
  { name: "DevOps", value: "devops" },
  { name: "Database", value: "database" },
  { name: "Tools", value: "tools" },
];

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Filter skills by category
  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Initialize 3D rotating skill icons (desktop only for performance)
  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (!canvasRef.current || !isInView) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    camera.position.z = 12;
    camera.position.y = 0;

    // Create skill icons as 3D spheres/orbs
    const skillOrbs: THREE.Mesh[] = [];
    const radius = 8;
    const count = 12;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const geometry = new THREE.SphereGeometry(0.4, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: i % 4 === 0 ? 0x58a6ff : i % 4 === 1 ? 0x10b981 : i % 4 === 2 ? 0xf59e0b : 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
        emissive: i % 4 === 0 ? 0x58a6ff : i % 4 === 1 ? 0x10b981 : i % 4 === 2 ? 0xf59e0b : 0x8b5cf6,
        emissiveIntensity: 0.3
      });
      
      const orb = new THREE.Mesh(geometry, material);
      orb.position.set(x, 0, z);
      orb.userData.angle = angle;
      scene.add(orb);
      skillOrbs.push(orb);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x58a6ff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;

      // Rotate orbs in orbit
      skillOrbs.forEach((orb, index) => {
        orb.userData.angle += 0.002;
        const radius = 8;
        orb.position.x = Math.cos(orb.userData.angle) * radius;
        orb.position.z = Math.sin(orb.userData.angle) * radius;
        orb.rotation.x += 0.01;
        orb.rotation.y += 0.01;
        
        const pulse = (Math.sin(frame * 3 + index) + 1) / 2;
        (orb.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2 + pulse * 0.2;
      });

      // Rotate camera slightly
      camera.position.x = Math.sin(frame * 0.3) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      skillOrbs.forEach(orb => {
        orb.geometry.dispose();
        (orb.material as THREE.Material).dispose();
      });
    };
  }, [isInView]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      backend: "#ef4444",
      frontend: "#3b82f6",
      devops: "#10b981",
      database: "#8b5cf6",
      tools: "#f59e0b",
    };
    return colors[category] || "#58a6ff";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 18
      }
    }
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      {/* AI 3D Element */}
      <AI3DElement className="skills-ai-element" />
      
      {/* 3D Skill Orbs Canvas */}
      <canvas ref={canvasRef} className="skills-3d-canvas" />

      {/* Animated Background */}
      <div className="skills-animated-bg">
        <div className="skills-bg-shape shape-1"></div>
        <div className="skills-bg-shape shape-2"></div>
      </div>

      <div className="skills-wrapper">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="skills-header"
        >
          <span className="skills-badge">Technical Expertise</span>
          <h2 className="skills-heading">
            Skills & <span className="skills-highlight">Technologies</span>
          </h2>
          <p className="skills-description">
            I specialize in building scalable, secure, and cloud-native applications. My toolkit includes backend development with Java and Spring Boot, container orchestration with Kubernetes, and CI/CD automation with Jenkins.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="skills-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              className={`skill-filter-btn ${selectedCategory === category.value ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.value)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: selectedCategory === category.value ? getCategoryColor(category.value) : undefined
              }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -4,
                transition: { type: "spring", stiffness: 250, damping: 20 }
              }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              style={{
                borderColor: hoveredSkill === skill.name ? getCategoryColor(skill.category) : undefined,
                boxShadow: hoveredSkill === skill.name 
                  ? `0 10px 30px ${getCategoryColor(skill.category)}40` 
                  : undefined
              }}
            >
              <div className="skill-icon-wrapper">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="skill-logo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('placeholder')) {
                      target.src = `https://via.placeholder.com/80x80?text=${skill.name.substring(0, 2)}`;
                    }
                  }}
                />
                <div 
                  className="skill-glow"
                  style={{ 
                    background: `radial-gradient(circle, ${getCategoryColor(skill.category)}40, transparent)`
                  }}
                ></div>
              </div>
              
              <p className="skill-name">{skill.name}</p>
              
              {/* Proficiency Bar */}
              <div className="skill-proficiency">
                <div 
                  className="skill-proficiency-bar"
                  style={{ 
                    width: `${skill.proficiency}%`,
                    background: `linear-gradient(90deg, ${getCategoryColor(skill.category)}, ${getCategoryColor(skill.category)}80)`
                  }}
                ></div>
                <span className="skill-proficiency-text">{skill.proficiency}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
