/**
 * Home Page
 * Hero, highlights, and featured projects
 */

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiStar, FiCode, FiLayers, FiZap } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

const FeaturedProjects = lazy(() => import('../sections/FeaturedProjects'));
const SkillsPreview = lazy(() => import('../sections/SkillsPreview'));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stats = [
  { label: 'Projects Built', value: '5+', icon: <FiCode /> },
  { label: 'Technologies', value: '10+', icon: <FiLayers /> },
  { label: 'Years Coding', value: '3+', icon: <FiZap /> },

];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dambar Ojha — Full Stack Developer (Learning)</title>
        <meta name="description" content="Hi, I'm Dambar Ojha — learning Full Stack Development. Exploring React, Node.js, and modern web technologies." />
      </Helmet>

      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />
        </div>

        <div className="container hero-container">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div className="hero-badge" variants={itemVariants}>
              <span className="badge-dot" />
              <span>Available for opportunities</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 className="hero-title" variants={itemVariants}>
              Hi, I'm{' '}
              <span className="hero-name gradient-text">Dambar Ojha</span>
              <br />
              <TypeAnimation
                sequence={[
                  'Learning Full Stack Dev', 2000,
                  'Exploring React & Node.js', 2000,
                  'Building Cool Projects', 2000,
                  'Growing Every Day', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="hero-type"
              />
            </motion.h1>

            {/* Description */}
            <motion.p className="hero-desc" variants={itemVariants}>
              I'm <strong>Dambar Ojha</strong> — currently learning Full Stack Development and building
              projects with React, Node.js, and MongoDB. Passionate about turning ideas into real,
              working web applications one line of code at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/projects" className="btn-primary-custom">
                View My Work <FiArrowRight />
              </Link>
              <a href="/resume.pdf" download className="btn-outline-custom">
                <FiDownload /> Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div className="hero-socials" variants={itemVariants}>
              <a href="https://github.com/MacSteyn" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/dambar-ojha-19b106235/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <span className="social-divider" />
              <span className="social-label">Connect with me</span>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hero-avatar-ring">
              <div className="hero-avatar-inner float-animation">
                <img
                  src="https://avatars.githubusercontent.com/MacSteyn"
                  alt="Dambar Ojha"
                  className="hero-avatar-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="float-badge badge-top"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiCode />
              <span>Full Stack Learner</span>
            </motion.div>

            <motion.div
              className="float-badge badge-bottom"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <FiZap />
              <span>React + Node.js</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="container stats-container">
            {stats.map(({ label, value, icon }) => (
              <div key={label} className="stat-item">
                <span className="stat-icon">{icon}</span>
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Featured Projects ─────────────────────────────────────────── */}
      <Suspense fallback={<div className="section container"><div className="skeleton" style={{ height: 300, borderRadius: 20 }} /></div>}>
        <FeaturedProjects />
      </Suspense>

      {/* ─── Skills Preview ───────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <SkillsPreview />
      </Suspense>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: var(--gradient-hero);
          pointer-events: none;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
        }

        .hero-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(107, 78, 255, 0.3) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          animation: float 8s ease-in-out infinite;
        }

        .hero-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 77, 0, 0.25) 0%, transparent 70%);
          bottom: 50px;
          right: -50px;
          animation: float 6s ease-in-out infinite reverse;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%);
        }

        .hero-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(0, 200, 150, 0.1);
          border: 1px solid rgba(0, 200, 150, 0.2);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--accent-3);
          margin-bottom: 1.5rem;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-3);
          border-radius: 50%;
          animation: pulse-glow 2s infinite;
          box-shadow: 0 0 6px var(--accent-3);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.05;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .hero-name { display: block; }

        .hero-type {
          color: var(--accent);
          font-family: var(--font-display);
        }

        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 480px;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .hero-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .social-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 1rem;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .social-link:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-2px);
        }

        .social-divider {
          width: 1px;
          height: 20px;
          background: var(--border-color);
          margin: 0 0.25rem;
        }

        .social-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Avatar */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-avatar-ring {
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent));
          padding: 3px;
          animation: spin-slow 10s linear infinite;
        }

        .hero-avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: var(--bg-primary);
          padding: 6px;
        }

        .hero-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .float-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          box-shadow: var(--shadow-md);
        }

        .badge-top { top: 20px; right: -20px; }
        .badge-bottom { bottom: 30px; left: -20px; }

        /* Stats */
        .stats-row {
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 2rem 0;
          position: relative;
          z-index: 1;
        }

        .stats-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .stat-icon {
          font-size: 1.25rem;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-visual { order: -1; }
          .hero-avatar-ring { width: 260px; height: 260px; }
          .hero-actions { justify-content: center; }
          .hero-socials { justify-content: center; }
          .hero-badge { display: inline-flex; }
          .stats-container { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .stats-container { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .float-badge { display: none; }
        }
      `}</style>
    </>
  );
};

export default HomePage;
