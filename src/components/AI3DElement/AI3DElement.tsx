import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import "./AI3DElement.css";

interface AI3DElementProps {
  scrollProgress?: number;
  className?: string;
}

const AI3DElement: React.FC<AI3DElementProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const { scrollYProgress } = useScroll();
  
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.9, 1]);

  useEffect(() => {
    if (!canvasRef.current) return;

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

    camera.position.z = 5;
    camera.position.y = 0;
    camera.position.x = 0;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create AI Neural Network - Connected Nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    
    // Create nodes in a neural network pattern
    const layers = 4;
    const nodesPerLayer = [3, 5, 4, 2];
    const spacing = 1.5;
    const layerSpacing = 2;

    nodesPerLayer.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: layerIndex === 0 ? 0x58a6ff : layerIndex === layers - 1 ? 0x10b981 : 0x8b5cf6,
          transparent: true,
          opacity: 0.9
        });
        const node = new THREE.Mesh(geometry, material);
        
        const yPos = ((count - 1) * spacing) / 2 - (i * spacing);
        const xPos = (layerIndex - (layers - 1) / 2) * layerSpacing;
        
        node.position.set(xPos, yPos, 0);
        scene.add(node);
        nodes.push(node);

        // Create connections to previous layer
        if (layerIndex > 0) {
          const prevLayerNodes = nodes.slice(
            nodesPerLayer.slice(0, layerIndex - 1).reduce((a, b) => a + b, 0),
            nodesPerLayer.slice(0, layerIndex).reduce((a, b) => a + b, 0)
          );

          prevLayerNodes.forEach(prevNode => {
            const points = [];
            points.push(prevNode.position.clone());
            points.push(node.position.clone());
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
              color: 0x58a6ff,
              transparent: true,
              opacity: 0.3
            });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connections.push(line);
          });
        }
      }
    });

    // Store references for animation
    meshRef.current = nodes[0]; // Use first node as reference

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const light1 = new THREE.PointLight(0x58a6ff, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x10b981, 1, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;

      // Animate nodes - pulsing effect
      nodes.forEach((node, index) => {
        const pulse = Math.sin(frame * 2 + index * 0.5) * 0.1 + 1;
        node.scale.set(pulse, pulse, pulse);
        const glow = (Math.sin(frame * 2 + index * 0.5) + 1) / 2;
        (node.material as THREE.MeshBasicMaterial).opacity = 0.6 + glow * 0.4;
      });

      // Animate connections - data flow effect
      connections.forEach((line, index) => {
        const flow = (Math.sin(frame * 3 + index * 0.1) + 1) / 2;
        (line.material as THREE.LineBasicMaterial).opacity = 0.1 + flow * 0.3;
      });

      // Rotate entire network slowly
      nodes.forEach(node => {
        node.rotation.y += 0.001;
      });

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

    // Update transform on scroll
    const unsubscribeY = rotationY.on("change", (latest) => {
      if (nodes.length > 0) {
        nodes.forEach(node => {
          node.rotation.y = latest;
        });
      }
    });

    const unsubscribeScale = scale.on("change", (latest) => {
      if (nodes.length > 0) {
        nodes.forEach((node, index) => {
          const baseScale = 0.15; // Original scale
          const newScale = baseScale * latest;
          node.scale.set(newScale, newScale, newScale);
        });
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribeY?.();
      unsubscribeScale?.();
      if (renderer) {
        renderer.dispose();
      }
      nodes.forEach(node => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) (node.material as THREE.Material).dispose();
      });
      connections.forEach(line => {
        if (line.geometry) line.geometry.dispose();
        if (line.material) (line.material as THREE.Material).dispose();
      });
    };
  }, [rotationY, scale]);

  return (
    <motion.div 
      className={`ai-3d-element ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="ai-canvas" />
      <div className="ai-glow"></div>
    </motion.div>
  );
};

export default AI3DElement;

