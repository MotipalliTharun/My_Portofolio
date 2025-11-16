import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Link as ScrollLink } from "react-scroll/modules";
import "./ArticleViewer.css";

interface Article {
  date: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string;
  author: string;
  tags: string[];
}

interface ArticleViewerProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="article-viewer-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Navigation Bar */}
          <motion.header
            className="article-navbar"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="article-navbar-content">
              <ScrollLink
                to="blog"
                smooth={true}
                offset={-100}
                onClick={onClose}
                className="article-back-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Back to Blog</span>
              </ScrollLink>

              <div className="article-navbar-title">Article</div>

              <button
                className="article-close-nav"
                onClick={onClose}
                aria-label="Close article"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.header>

          {/* Main Article Content */}
          <div className="article-viewer-container">
            <div className="article-viewer-content">
              {/* Article Header */}
              <motion.header
                className="article-header"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <time className="article-date">{article.date}</time>
                  <span className="article-read-time">{article.readTime}</span>
                </div>

                <h1 className="article-title">{article.title}</h1>
                
                <p className="article-description">{article.description}</p>

                <div className="article-author-section">
                  <div className="article-author">
                    <div className="author-avatar">
                      <span>TM</span>
                    </div>
                    <div className="author-info">
                      <span className="author-name">{article.author}</span>
                      <span className="author-role">Full Stack Developer</span>
                    </div>
                  </div>
                </div>
              </motion.header>

              {/* Article Body */}
              <motion.article
                className="article-body"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </motion.article>

              {/* Article Footer */}
              <motion.footer
                className="article-footer"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="article-tags">
                  <span className="tags-label">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <span key={index} className="article-tag">{tag}</span>
                  ))}
                </div>

                <div className="article-share">
                  <span className="share-label">Share this article:</span>
                  <div className="share-buttons">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-button"
                      aria-label="Share on Twitter"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-button"
                      aria-label="Share on LinkedIn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div className="article-navigation">
                  <ScrollLink
                    to="blog"
                    smooth={true}
                    offset={-100}
                    onClick={onClose}
                    className="article-nav-link"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    <span>Back to All Articles</span>
                  </ScrollLink>
                </div>
              </motion.footer>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleViewer;
