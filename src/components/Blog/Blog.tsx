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
    date: "Feb 09, 2025",
    title: "How I Built My Portfolio 🚀",
    description: "A breakdown of how I developed my personal website using React, Node.js, and MongoDB.",
    link: "#",
  },
  {
    date: "Jan 22, 2025",
    title: "Exploring Flutter for App Development",
    description: "Building a Flutter app similar to DigiFarmer to enhance smart farming solutions.",
    link: "#",
  },
  {
    date: "Dec 10, 2024",
    title: "Software Reliability in Aviation",
    description: "A deep dive into Airbus' Fly-By-Wire system and the role of n-version programming.",
    link: "#",
  },
];

const Blog: React.FC = () => {
  return (
    <section className="blog-container">
      <h2 className="blog-title">Recent Blog Posts</h2>
      <div className="blog-content">
        {blogPosts.map((post, index) => (
          <div className="blog-item" key={index}>
            <span className="blog-date">{post.date}</span>
            <h3 className="blog-heading">{post.title}</h3>
            <p className="blog-description">{post.description}</p>
            <a href={post.link} className="blog-link">
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
