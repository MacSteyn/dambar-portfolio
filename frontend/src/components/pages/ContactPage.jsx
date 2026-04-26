/**
 * Contact Page
 * Contact form with frontend validation, animations, and social links
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import {
  FiSend, FiMail, FiMapPin, FiLinkedin,
  FiGithub, FiTwitter, FiCheckCircle, FiClock
} from 'react-icons/fi';
import api from '../../utils/api';

const initialForm = { name: '', email: '', subject: '', message: '' };

const validate = (data) => {
  const errs = {};
  if (!data.name.trim()) errs.name = 'Name is required';
  else if (data.name.length > 100) errs.name = 'Max 100 characters';
  if (!data.email.trim()) errs.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'Enter a valid email';
  if (!data.subject.trim()) errs.subject = 'Subject is required';
  if (!data.message.trim()) errs.message = 'Message is required';
  else if (data.message.trim().length < 10) errs.message = 'At least 10 characters';
  return errs;
};

const contactDetails = [
  { icon: <FiMail />, label: 'Email', value: 'hello@yourdomain.com', href: 'mailto:hello@yourdomain.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Your City, Country', href: null },
  { icon: <FiClock />, label: 'Response Time', value: 'Within 24–48 hours', href: null },
];

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/MacSteyn', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/dambar-ojha-19b106235/', label: 'LinkedIn' },
  { icon: <FiTwitter />, href: 'https://twitter.com/yourhandle', label: 'Twitter' },
];

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await api.post('/contact', form);
      setSent(true);
      setForm(initialForm);
      toast.success('Message sent! I\'ll get back to you soon.');
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Your Name | Full Stack Developer</title>
        <meta name="description" content="Get in touch with me for freelance work, collaborations, or just to say hello." />
      </Helmet>

      <div className="contact-page">
        {/* Header */}
        <section className="page-header section">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="section-label">Get In Touch</p>
              <h1 className="section-title">Let's Work Together</h1>
              <p className="section-subtitle">
                Have a project in mind? Looking to hire? Or just want to say hi?
                My inbox is always open — I'll get back to you within 24–48 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section">
          <div className="container">
            <div className="contact-grid">

              {/* Left: Info Panel */}
              <motion.div
                className="contact-info"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="info-header">
                  <h2>Contact Information</h2>
                  <p>Reach out through any of these channels.</p>
                </div>

                <div className="contact-details">
                  {contactDetails.map(({ icon, label, value, href }) => (
                    <div key={label} className="contact-detail-item">
                      <span className="detail-icon">{icon}</span>
                      <div>
                        <span className="detail-label">{label}</span>
                        {href
                          ? <a href={href} className="detail-value link">{value}</a>
                          : <span className="detail-value">{value}</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>

                <div className="contact-socials">
                  <p className="social-heading">Find me online</p>
                  <div className="social-row">
                    {socials.map(({ icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="contact-social-btn"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {icon}
                        <span>{label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Decorative blob */}
                <div className="info-blob" aria-hidden="true" />
              </motion.div>

              {/* Right: Form */}
              <motion.div
                className="contact-form-wrapper"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      className="success-screen"
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="success-icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
                      >
                        <FiCheckCircle />
                      </motion.div>
                      <h3>Message Sent!</h3>
                      <p>Thanks for reaching out. I'll get back to you within 24–48 hours.</p>
                      <button
                        className="btn-outline-custom"
                        onClick={() => setSent(false)}
                        style={{ marginTop: '1.5rem' }}
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      className="contact-form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="form-title">Send a Message</h2>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="name">Full Name *</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            className={errors.name ? 'error' : ''}
                          />
                          {errors.name && <span id="name-error" className="error-msg" role="alert">{errors.name}</span>}
                        </div>

                        <div className="form-field">
                          <label htmlFor="email">Email Address *</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={errors.email ? 'error' : ''}
                          />
                          {errors.email && <span className="error-msg" role="alert">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="form-field">
                        <label htmlFor="subject">Subject *</label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Project Inquiry / Collaboration / Other"
                          className={errors.subject ? 'error' : ''}
                        />
                        {errors.subject && <span className="error-msg" role="alert">{errors.subject}</span>}
                      </div>

                      <div className="form-field">
                        <label htmlFor="message">
                          Message *
                          <span className="char-count">{form.message.length}/5000</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, timeline, budget..."
                          rows={6}
                          maxLength={5000}
                          className={errors.message ? 'error' : ''}
                        />
                        {errors.message && <span className="error-msg" role="alert">{errors.message}</span>}
                      </div>

                      <motion.button
                        type="submit"
                        className="btn-primary-custom submit-btn"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                      >
                        {loading ? (
                          <span className="loading-dots">
                            <span /><span /><span />
                          </span>
                        ) : (
                          <><FiSend /> Send Message</>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .contact-page { padding-top: 80px; }
        .page-header { background: var(--bg-secondary); }

        .contact-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Info Panel */
        .contact-info {
          background: var(--accent);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .info-blob {
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
          bottom: -100px;
          right: -80px;
          pointer-events: none;
        }

        .info-header { margin-bottom: 2rem; position: relative; z-index: 1; }
        .info-header h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
        }
        .info-header p { color: rgba(255,255,255,0.7); font-size: 0.9rem; }

        .contact-details { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem; position: relative; z-index: 1; }

        .contact-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .detail-icon {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.15);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .detail-label {
          display: block;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.15rem;
          font-weight: 600;
        }

        .detail-value {
          font-size: 0.9rem;
          color: white;
          font-weight: 500;
        }

        .detail-value.link {
          text-decoration: none;
          transition: opacity 0.15s;
        }

        .detail-value.link:hover { opacity: 0.8; }

        .social-heading {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.6);
          font-weight: 600;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .social-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-social-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          background: rgba(255,255,255,0.12);
          border-radius: var(--radius-md);
          color: white;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: background var(--transition-fast);
        }

        .contact-social-btn:hover { background: rgba(255,255,255,0.2); color: white; }

        /* Form */
        .contact-form-wrapper {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          box-shadow: var(--shadow-sm);
        }

        .form-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1.75rem;
          color: var(--text-primary);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-field { margin-bottom: 1.25rem; position: relative; }

        .form-field label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }

        .char-count { font-weight: 400; color: var(--text-muted); font-size: 0.78rem; }

        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--text-primary);
          transition: all var(--transition-base);
          outline: none;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          border-color: var(--accent);
          background: var(--bg-card);
          box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.1);
        }

        .form-field input.error,
        .form-field textarea.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder { color: var(--text-muted); }

        .form-field textarea { resize: vertical; min-height: 140px; }

        .error-msg {
          display: block;
          margin-top: 0.3rem;
          font-size: 0.75rem;
          color: #ef4444;
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 0.9rem;
          font-size: 1rem;
        }

        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

        /* Loading dots */
        .loading-dots { display: flex; gap: 4px; align-items: center; }
        .loading-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          animation: bounce 1.2s infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Success screen */
        .success-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 2rem;
          min-height: 380px;
        }

        .success-icon {
          font-size: 4rem;
          color: var(--accent-3);
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        .success-screen h3 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .success-screen p {
          color: var(--text-secondary);
          max-width: 320px;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-info { order: 1; }
          .social-row { flex-direction: row; flex-wrap: wrap; }
          .contact-social-btn { flex: 1; min-width: 140px; justify-content: center; }
        }

        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-form-wrapper { padding: 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default ContactPage;
