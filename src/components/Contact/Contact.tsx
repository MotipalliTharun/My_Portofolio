import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import "./Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Scroll animations are handled by Framer Motion

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      label: "Email",
      value: "tharun.motipalli@example.com",
      link: "mailto:tharun.motipalli@example.com",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      label: "Phone",
      value: "+1 (321) 555-0123",
      link: "tel:+13215550123",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      label: "LinkedIn",
      value: "linkedin.com/in/tharunmotipalli",
      link: "https://linkedin.com",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      label: "GitHub",
      value: "github.com/MotipalliTharun",
      link: "https://github.com/MotipalliTharun",
    },
  ];

  return (
    <section id="contact" className="contact-section story-section" ref={sectionRef}>
      {/* Story Mode Chapter Header */}
      <motion.div
        className="story-chapter-header-section"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="story-chapter-title">📧 CHAPTER V</div>
        <div className="story-chapter-subtitle">The Call to Adventure</div>
        <div className="story-chapter-divider"></div>
      </motion.div>
      <div className="contact-wrapper">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="contact-header"
        >
          <span className="contact-badge">Get In Touch</span>
          <h2 className="contact-heading">
            Let's Build Something <span className="contact-highlight">Amazing</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-group">
              <label htmlFor="name">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className={`submit-button ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </motion.button>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="submit-success"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Message sent successfully!
              </motion.div>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="contact-info-header">
              <h3>Contact Information</h3>
              <p>Feel free to reach out through any of these channels</p>
            </div>

            <div className="contact-items">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="contact-item"
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.05, x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="contact-item-icon">{method.icon}</div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">{method.label}</span>
                    <span className="contact-item-value">{method.value}</span>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="contact-item-arrow"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </motion.a>
              ))}
            </div>

            <div className="contact-availability">
              <div className="availability-indicator">
                <span className="availability-dot"></span>
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
