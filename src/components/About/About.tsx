import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link as ScrollLink } from "react-scroll/modules";
import * as THREE from "three";
import AI3DElement from "../AI3DElement/AI3DElement";
import "./About.css";

const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Initialize 3D geometric shapes for About section
  useEffect(() => {
    if (!canvasRef.current || !isInView) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
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

    camera.position.z = 8;
    camera.position.y = 2;
    camera.position.x = 2;

    // Create geometric shapes representing skills/tech
    const shapes: THREE.Mesh[] = [];
    
    // Java cube
    const javaGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const javaMaterial = new THREE.MeshPhongMaterial({
      color: 0xed8b00,
      transparent: true,
      opacity: 0.9,
      emissive: 0xed8b00,
      emissiveIntensity: 0.3
    });
    const javaCube = new THREE.Mesh(javaGeometry, javaMaterial);
    javaCube.position.set(-3, 1, 0);
    javaCube.rotation.x = Math.PI / 4;
    javaCube.rotation.y = Math.PI / 4;
    scene.add(javaCube);
    shapes.push(javaCube);

    // Spring Boot sphere
    const springGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const springMaterial = new THREE.MeshPhongMaterial({
      color: 0x6db33f,
      transparent: true,
      opacity: 0.9,
      emissive: 0x6db33f,
      emissiveIntensity: 0.3
    });
    const springSphere = new THREE.Mesh(springGeometry, springMaterial);
    springSphere.position.set(0, 1, 0);
    scene.add(springSphere);
    shapes.push(springSphere);

    // React/JS tetrahedron
    const reactGeometry = new THREE.TetrahedronGeometry(0.7);
    const reactMaterial = new THREE.MeshPhongMaterial({
      color: 0x61dafb,
      transparent: true,
      opacity: 0.9,
      emissive: 0x61dafb,
      emissiveIntensity: 0.3
    });
    const reactTetra = new THREE.Mesh(reactGeometry, reactMaterial);
    reactTetra.position.set(3, 1, 0);
    scene.add(reactTetra);
    shapes.push(reactTetra);

    // Docker container (box with top)
    const dockerGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.6);
    const dockerMaterial = new THREE.MeshPhongMaterial({
      color: 0x0db7ed,
      transparent: true,
      opacity: 0.9,
      emissive: 0x0db7ed,
      emissiveIntensity: 0.3
    });
    const dockerBox = new THREE.Mesh(dockerGeometry, dockerMaterial);
    dockerBox.position.set(-1.5, -1, 0);
    scene.add(dockerBox);
    shapes.push(dockerBox);

    // Kubernetes icon (octahedron)
    const k8sGeometry = new THREE.OctahedronGeometry(0.6);
    const k8sMaterial = new THREE.MeshPhongMaterial({
      color: 0x326ce5,
      transparent: true,
      opacity: 0.9,
      emissive: 0x326ce5,
      emissiveIntensity: 0.3
    });
    const k8sOcta = new THREE.Mesh(k8sGeometry, k8sMaterial);
    k8sOcta.position.set(1.5, -1, 0);
    scene.add(k8sOcta);
    shapes.push(k8sOcta);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x58a6ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001;
        shape.rotation.y += 0.01 + index * 0.002;
        
        // Floating animation
        shape.position.y += Math.sin(frame * 2 + index) * 0.002;
        
        // Pulsing glow
        const pulse = (Math.sin(frame * 3 + index) + 1) / 2;
        (shape.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2 + pulse * 0.2;
      });

      // Rotate camera slightly
      camera.position.x = 2 + Math.sin(frame * 0.5) * 0.5;
      camera.position.y = 2 + Math.cos(frame * 0.3) * 0.3;
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
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
    };
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const experienceStats = [
    { value: "3+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "M.S.", label: "Computer Science" },
  ];

  return (
    <section id="about" className="about-section story-section" ref={sectionRef}>
      {/* Story Mode Chapter Header */}
      <motion.div
        className="story-chapter-header-section"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="story-chapter-title">📖 CHAPTER I</div>
        <div className="story-chapter-subtitle">The Journey Begins</div>
        <div className="story-chapter-divider"></div>
      </motion.div>

      {/* AI 3D Element in background */}
      <AI3DElement className="about-ai-element" />
      
      {/* 3D Geometric Shapes Canvas */}
      <canvas ref={canvasRef} className="about-3d-canvas" />

      {/* Animated background */}
      <div className="about-animated-bg">
        <div className="about-bg-shape shape-1"></div>
        <div className="about-bg-shape shape-2"></div>
        <div className="about-bg-shape shape-3"></div>
      </div>

      <div className="about-wrapper">
        <motion.div
          className="about-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Content Side */}
          <motion.div
            className="about-content"
            variants={itemVariants}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-header"
            >
              <span className="about-badge">About Me</span>
              <h2 className="about-heading">
                Building <span className="about-highlight">Innovative Solutions</span>
              </h2>
              <div className="about-underline"></div>
            </motion.div>

            <motion.div
              className="about-text-content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
          <p className="about-text">
            I'm a <span className="highlight">Java Full Stack Developer</span> with over 3 years of experience designing and deploying scalable, cloud-native backend systems. I specialize in <span className="highlight">Spring Boot, Hibernate, REST/SOAP APIs</span>, and containerized microservices using <span className="highlight">Docker and Kubernetes</span>.
          </p>

          <p className="about-text">
            I've built and maintained high-performance backend platforms for leading organizations like <span className="highlight">Citigroup, Bloomin' Brands, and Renault Nissan</span>. My work includes integrating <span className="highlight">OAuth 2.0 authentication</span>, implementing <span className="highlight">CI/CD pipelines</span> using Jenkins and GitHub Actions, and optimizing relational and NoSQL databases.
          </p>

          <p className="about-text">
                I'm currently pursuing my Master's in Computer Science at <span className="highlight">Florida Institute of Technology</span>, and I'm <span className="highlight">actively seeking full-time opportunities</span> in software engineering and DevOps. If you're interested in collaborating or hiring, feel free to{" "}
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
            </motion.div>

            {/* Experience Stats */}
            <motion.div
              className="about-stats"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {experienceStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="about-stat-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="about-image-wrapper"
            variants={imageVariants}
          >
            <motion.div
              className="about-image-container"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="about-image-glow"></div>
              <img
                src="/WhatsApp Image 2025-11-15 at 19.09.04.jpeg"
                alt="Tharun Motipalli - Computer Science Student and Developer"
                className="about-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "/gamer.png") {
                    target.src = "/gamer.png";
                  }
                }}
              />
              <div className="about-image-border"></div>
            </motion.div>

            {/* Floating tech badges around image */}
            <motion.div
              className="about-tech-badges"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <motion.div
                className="tech-badge"
                style={{ top: "10%", left: "-20%" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              >
                Java
              </motion.div>
              <motion.div
                className="tech-badge"
                style={{ top: "50%", right: "-20%" }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                React
              </motion.div>
              <motion.div
                className="tech-badge"
                style={{ bottom: "10%", left: "-20%" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                AWS
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
