import React from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="contact-heading">Get in Touch</h1>
        <p className="contact-description">
          Have a question or want to work together? Feel free to reach out!
        </p>
        <form className="contact-form">
          <div className="form-group">
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea
              id="message"
              placeholder="Your Message"
              rows={5}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;