import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ArticleViewer from "../ArticleViewer/ArticleViewer";
import "./Blog.css";

interface BlogPost {
  date: string;
  title: string;
  description: string;
  link: string;
  category: string;
  readTime: string;
  image?: string;
  content?: string;
  author?: string;
  tags?: string[];
}

const blogPosts: BlogPost[] = [
  {
    date: "Jul 15, 2025",
    title: "Building Scalable Microservices with Spring Boot",
    description:
      "A comprehensive step-by-step guide on designing and deploying scalable microservices architecture using Spring Boot, Docker, and Kubernetes. Learn best practices for service communication, configuration management, and monitoring.",
    link: "#",
    category: "Backend",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    author: "Tharun Motipalli",
    tags: ["Spring Boot", "Microservices", "Docker", "Kubernetes", "Architecture"],
    content: `# Building Scalable Microservices with Spring Boot

In today's cloud-native world, microservices architecture has become the de facto standard for building scalable and maintainable applications. This comprehensive guide will walk you through designing and deploying microservices using Spring Boot.

## Why Microservices?

Microservices architecture offers several advantages:

- **Scalability**: Scale individual services independently based on demand
- **Technology Diversity**: Use the best technology for each service
- **Fault Isolation**: Failures in one service don't crash the entire system
- **Team Autonomy**: Different teams can work on different services

## Key Components

### 1. Service Discovery

Implementing service discovery is crucial for microservices communication. We use Spring Cloud Eureka for service registration and discovery.

\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
\`\`\`

### 2. API Gateway

An API Gateway acts as a single entry point for all client requests, routing them to appropriate microservices.

### 3. Configuration Management

Centralized configuration using Spring Cloud Config ensures consistent settings across all services.

## Best Practices

1. **Database per Service**: Each microservice should have its own database
2. **API Versioning**: Maintain backward compatibility with versioned APIs
3. **Circuit Breakers**: Implement resilience patterns to handle failures gracefully
4. **Distributed Tracing**: Monitor requests across service boundaries

## Conclusion

Building microservices with Spring Boot requires careful planning and understanding of distributed systems concepts. Start small, iterate, and continuously improve your architecture based on real-world requirements.`
  },
  {
    date: "Jun 30, 2025",
    title: "Automating CI/CD Pipelines with Jenkins & Kubernetes",
    description:
      "Discover how to streamline deployment workflows using Jenkins, Maven, and Kubernetes for cloud-native applications. Includes real-world examples, troubleshooting tips, and optimization strategies.",
    link: "#",
    category: "DevOps",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    author: "Tharun Motipalli",
    tags: ["Jenkins", "CI/CD", "Kubernetes", "DevOps", "Automation"],
    content: `# Automating CI/CD Pipelines with Jenkins & Kubernetes

Continuous Integration and Continuous Deployment (CI/CD) are essential practices in modern software development. This article explores how to set up robust CI/CD pipelines using Jenkins and Kubernetes.

## Setting Up Jenkins

Jenkins is an open-source automation server that helps automate the parts of software development related to building, testing, and deploying.

### Jenkinsfile Example

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
\`\`\`

## Kubernetes Integration

Deploying to Kubernetes involves creating manifests and applying them through Jenkins pipelines.

## Best Practices

- Use pipeline-as-code
- Implement proper secrets management
- Set up monitoring and alerting
- Practice blue-green deployments`
  },
  {
    date: "May 18, 2025",
    title: "Optimizing Database Access with Hibernate and SQL",
    description:
      "Advanced tips and techniques for improving performance and reliability in Java backend services using Hibernate ORM. Cover query optimization, caching strategies, and complex SQL query patterns.",
    link: "#",
    category: "Backend",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    author: "Tharun Motipalli",
    tags: ["Hibernate", "SQL", "Performance", "Optimization", "Java"],
    content: `# Optimizing Database Access with Hibernate and SQL

Performance optimization is crucial for backend services. This article covers advanced techniques for optimizing database access using Hibernate ORM.

## Query Optimization

### Use HQL and Criteria API Effectively

\`\`\`java
@Query("SELECT u FROM User u WHERE u.email = :email")
User findByEmail(@Param("email") String email);
\`\`\`

## Caching Strategies

### First-Level Cache
Hibernate's session-level cache improves performance by reducing database hits.

### Second-Level Cache
Configure second-level caching for frequently accessed entities.

## N+1 Problem

Always be aware of the N+1 query problem and use fetch joins to solve it.

\`\`\`java
@Query("SELECT u FROM User u JOIN FETCH u.orders")
List<User> findAllWithOrders();
\`\`\`

## Conclusion

Proper optimization requires understanding both Hibernate and SQL. Profile your queries and monitor performance metrics regularly.`
  },
];

const Blog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleReadArticle = (article: BlogPost) => {
    setSelectedArticle(article);
    setIsViewerOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedArticle(null);
    document.body.style.overflow = "unset";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section id="blog" className="blog-section story-section" ref={sectionRef}>
        {/* Story Mode Chapter Header */}
        <motion.div
          className="story-chapter-header-section"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="story-chapter-title">📚 CHAPTER IV</div>
          <div className="story-chapter-subtitle">Knowledge Shared</div>
          <div className="story-chapter-divider"></div>
        </motion.div>
        <div className="blog-wrapper">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="blog-header"
          >
            <span className="blog-badge">Latest Articles</span>
            <h2 className="blog-heading">
              Insights & <span className="blog-highlight">Technical Blog</span>
            </h2>
            <p className="blog-subtitle">
              Sharing knowledge on full-stack development, cloud architecture, and DevOps practices
            </p>
          </motion.div>

          <motion.div
            className="blog-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                className="blog-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="blog-card-image">
                  <img src={post.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80`} alt={post.title} />
                  <div className="blog-card-overlay">
                    <span className="blog-category">{post.category}</span>
                  </div>
                </div>

                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <time className="blog-date">{post.date}</time>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>

                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.description}</p>

                  <div className="blog-card-footer">
                    <button
                      onClick={() => handleReadArticle(post)}
                      className="blog-read-more"
                    >
                      Read Article
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="blog-cta"
          >
            <p>Want to read more articles?</p>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="blog-cta-link">
              Visit My Blog →
            </a>
          </motion.div>
        </div>
      </section>

      {selectedArticle && (
        <ArticleViewer
          article={selectedArticle}
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
};

export default Blog;
