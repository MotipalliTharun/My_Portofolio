import React from "react";
import "./Blog.css";

interface BlogPost {
  date: string;
  title: string;
  description: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    date: "Jul 15, 2025",
    title: "Building Scalable Microservices with Spring Boot",
    description:
      "A step-by-step guide on designing and deploying scalable microservices architecture using Spring Boot and Docker.",
    link: "#",
  },
  {
    date: "Jun 30, 2025",
    title: "Automating CI/CD Pipelines with Jenkins & Kubernetes",
    description:
      "How I streamlined deployment workflows using Jenkins, Maven, and Kubernetes for cloud-native applications.",
    link: "#",
  },
  {
    date: "May 18, 2025",
    title: "Optimizing Database Access with Hibernate and SQL",
    description:
      "Tips and techniques for improving performance and reliability in Java backend services using Hibernate ORM and complex SQL queries.",
    link: "#",
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="blog-container">
      <h2 className="blog-title">Recent Blog Posts</h2>
      <div className="blog-content">
        {blogPosts.map((post, index) => (
          <div className="blog-item" key={index}>
            <span className="blog-date">{post.date}</span>
            <h3 className="blog-heading">{post.title}</h3>
            <p className="blog-description">{post.description}</p>
            <a href={post.link} className="blog-link" target="_blank" rel="noopener noreferrer">
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
