/**
 * Navbar Component
 * Responsive navigation with dark mode toggle and scroll effects
 */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiCode } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/college-projects', label: 'College' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-icon"><FiCode /></span>
            <span className="logo-text">dev<span className="logo-accent">.</span>folio</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links desktop">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end={path === '/'}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <Link to="/contact" className="nav-cta btn-primary-custom">
              Hire Me
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {navLinks.map(({ path, label }, i) => (
                <motion.li
                  key={path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink to={path} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end={path === '/'}>
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar-custom {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all 0.3s ease;
        }

        .navbar-custom.scrolled {
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          padding: 0.75rem 0;
          box-shadow: var(--shadow-sm);
        }

        .nav-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--text-primary);
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
          font-size: 1rem;
        }

        .logo-accent { color: var(--accent); }

        .nav-links.desktop {
          display: flex;
          list-style: none;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          display: block;
          padding: 0.5rem 0.85rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-full);
          transition: all var(--transition-base);
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .nav-link.active { color: var(--accent); font-weight: 600; }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .theme-toggle {
          width: 38px;
          height: 38px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-card);
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 1rem;
          transition: all var(--transition-base);
        }

        .theme-toggle:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .nav-cta { font-size: 0.85rem; padding: 0.55rem 1.25rem; }

        .hamburger {
          display: none;
          width: 38px;
          height: 38px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-card);
          border-radius: var(--radius-md);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-size: 1.2rem;
        }

        .mobile-menu {
          position: fixed;
          top: 72px;
          left: 1rem;
          right: 1rem;
          z-index: 999;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1rem;
          box-shadow: var(--shadow-lg);
        }

        .mobile-menu ul { list-style: none; }

        .mobile-nav-link {
          display: block;
          padding: 0.75rem 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: var(--bg-secondary);
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .nav-links.desktop { display: none; }
          .hamburger { display: flex; }
          .nav-cta { display: none; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
