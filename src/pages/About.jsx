import { useState } from "react";
import Footer from "../components/Footer";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="container about-wrapper">
        <h2>About Clothzy</h2>
        <p>
          Clothzy is a rising fashion brand that brings trendy, comfortable, and affordable clothing to every doorstep. 
          We believe fashion should empower everyone, and we strive for quality in every piece.
        </p>

        {/* 🎯 Mission & Policies */}
        <div className="about-values">
          <div className="value-card">
            <h4>🎯 Our Mission</h4>
            <p>
              To redefine everyday fashion with affordable, quality, and trend-setting styles delivered at your doorstep.
            </p>
          </div>
          <div className="value-card">
            <h4>🔄 7-Day Replacement</h4>
            <p>
              If you're not satisfied, initiate a return within 7 days. We guarantee easy replacements.
            </p>
          </div>
          <div className="value-card">
            <h4>🔐 Secure Payments</h4>
            <p>Transactions are encrypted and 100% safe with trusted payment gateways.</p>
          </div>
          <div className="value-card">
            <h4>📞 24/7 Support</h4>
            <p>We’re always here to help you with your order, anytime.</p>
          </div>
        </div>

        {/* 🏢 Business Info */}
        <div className="business-info">
          <h3>Our Address</h3>
          <p><strong>Clothzy Pvt. Ltd.</strong></p>
          <p>123 Fashion Street, Connaught Place, New Delhi - 110001</p>
          <p>Email: support@clothzy.com</p>
          <p>Phone: +91-9876543210</p>
        </div>

        {/* 🌍 Google Map */}
        <div className="map-wrapper">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14004.171589037093!2d77.214928!3d28.630089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36b0c9d5c1%3A0x13201bc15708b08e!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1659804283279!5m2!1sen!2sin"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            style={{ border: "0", borderRadius: "10px", marginTop: "20px" }}
          ></iframe>
        </div>

        {/* 💬 Contact Us */}
        <div className="contact-form-section">
          <h3>Contact Us</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
            ></textarea>
            <button className="btn">Send Message</button>
          </form>
        </div>

        {/* ❓ FAQ Section */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li><strong>Q: How long does delivery take?</strong><br />A: 3–5 business days.</li>
            <li><strong>Q: Do you ship internationally?</strong><br />A: Currently, only within India.</li>
            <li><strong>Q: How can I return an item?</strong><br />A: Email support within 7 days of delivery.</li>
            <li><strong>Q: Is my payment safe?</strong><br />A: Yes. All transactions are encrypted and secure.</li>
          </ul>
        </div>

        {/* 💬 Testimonials */}
        <div className="testimonial-section">
          <h3>What Our Customers Say</h3>
          <blockquote>“Clothzy’s quality and fit are amazing. I love the variety too!” – Priya S.</blockquote>
          <blockquote>“Fast delivery and responsive customer service. Highly recommend!” – Rohit M.</blockquote>
        </div>
      </div>

      <Footer />
    </>
  );
}
