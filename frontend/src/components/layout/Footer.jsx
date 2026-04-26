/**
 * Footer Component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiCode, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();
  const socials = [
    { icon: <FiGithub />, href: 'https://github.com/MacSteyn', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/dambar-ojha-19b106235/', label: 'LinkedIn' },
    { icon: <FiTwitter />, href: 'https://twitter.com/yourhandle', label: 'Twitter' },
    { icon: <FiMail />, href: 'mailto:hello@yourdomain.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon"><FiCode /></span>
              <span>dev<span style={{ color: 'var(--accent)' }}>.</span>folio</span>
            </Link>
            <p>Building digital experiences that matter. Open to opportunities and collaborations.</p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                {[['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/college-projects', 'College Projects'], ['/contact', 'Contact']].map(([path, label]) => (
                  <li key={path}><Link to={path}>{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-grid">
              {socials.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-btn"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} devfolio. All rights reserved.</p>
          <p className="footer-credit">
            Made with <FiHeart style={{ color: 'var(--accent)', display: 'inline' }} /> using React & Node.js
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 4rem 0 2rem;
        }

        .footer-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--accent);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.7;
          max-width: 300px;
        }

        .footer-col h4, .footer-social h4 {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.5rem; }
        .footer-col a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }
        .footer-col a:hover { color: var(--accent); }

        .social-grid {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 1rem;
          transition: all var(--transition-base);
          text-decoration: none;
        }

        .social-btn:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
