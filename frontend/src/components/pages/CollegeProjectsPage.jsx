/**
 * College Projects Page
 * Dambar Ojha's academic / college project showcase
 * Projects are hardcoded here and merged with any API projects
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiGithub, FiExternalLink, FiUsers, FiAward, FiBookOpen, FiCalendar, FiStar } from 'react-icons/fi';
import api from '../../utils/api';

// ─── Dambar's hardcoded college projects ─────────────────────────────────────
const DAMBAR_PROJECTS = [
  {
    _id: 'local-1',
    title: 'Patient Appointment Booking System',
    description:
      'A full-stack Single Page Application for booking and managing medical appointments. Patients can register, browse available doctors, book time slots, and track their appointment history. Doctors get a dashboard to view, accept, or cancel bookings. Built with a React frontend, Express REST API, MongoDB for persistence, and JWT-based authentication for secure access.',
    shortDescription:
      'Full-stack SPA for booking and managing medical appointments with React, Express, and MongoDB.',
    techStack: ['React', 'Express', 'MongoDB', 'SASS', 'Node.js', 'JWT'],
    category: 'fullstack',
    type: 'college',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/MacSteyn/WEB_403_Patient_Appointment_Booking_System.git',
    demoUrl: null,
    course: 'WEB 403 — Web Development',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
        alt: 'Patient Appointment Booking System',
        isPrimary: true,
      },
    ],
    role: 'Full Stack Developer',
    teamSize: 1,
  },
  {
    _id: 'local-2',
    title: 'Splashes Swimming Lessons',
    description:
      'A clean, responsive multi-section website for a swimming school called Splashes. The site showcases swimming programs, lesson types (beginner, intermediate, advanced), locations, instructor bios, a pricing table, and social media links. Built with React and SASS for a polished, mobile-first presentation that works beautifully on all screen sizes.',
    shortDescription:
      'Responsive React website for a swimming school — programs, locations, and social media showcase.',
    techStack: ['React', 'HTML', 'CSS', 'SASS', 'Responsive Design'],
    category: 'frontend',
    type: 'college',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/MacSteyn/Splashes.git',
    demoUrl: null,
    course: 'Web Design & Development',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80',
        alt: 'Splashes Swimming Lessons Website',
        isPrimary: true,
      },
    ],
    role: 'Frontend Developer',
    teamSize: 1,
  },
];

// ─── Card Component ───────────────────────────────────────────────────────────
const CollegeProjectCard = ({ project, index }) => (
  <motion.article
    className="college-card"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="college-card-inner">
      {/* Image */}
      <div className="college-img-wrapper">
        <img
          src={
            project.images?.[0]?.url ||
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'
          }
          alt={project.title}
          className="college-img"
          loading="lazy"
        />
        {project.grade && (
          <div className="grade-badge">
            <FiAward /> {project.grade}
          </div>
        )}
        {project.featured && (
          <div className="featured-ribbon">
            <FiStar size={10} /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="college-content">
        {/* Course / semester tags */}
        <div className="college-meta-row">
          {project.course && (
            <span className="course-tag">
              <FiBookOpen size={11} /> {project.course}
            </span>
          )}
          {project.semester && (
            <span className="semester-tag">
              <FiCalendar size={11} /> {project.semester}
            </span>
          )}
        </div>

        <h2 className="college-title">{project.title}</h2>
        <p className="college-desc">{project.description}</p>

        {/* Info grid — only renders cells that have data */}
        {(project.collegeName || project.role || project.teamSize) && (
          <div className="college-info-grid">
            {project.collegeName && (
              <div className="info-cell">
                <span className="info-label">Institution</span>
                <span className="info-value">{project.collegeName}</span>
              </div>
            )}
            {project.role && (
              <div className="info-cell">
                <span className="info-label">My Role</span>
                <span className="info-value">{project.role}</span>
              </div>
            )}
            {project.teamSize && (
              <div className="info-cell">
                <span className="info-label">Team Size</span>
                <span className="info-value">
                  <FiUsers style={{ display: 'inline', marginRight: 4 }} />
                  {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tech stack */}
        <div className="college-tech">
          <span className="tech-label">Technologies Used:</span>
          <div className="tech-list">
            {project.techStack?.map(tech => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="college-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-custom"
            >
              <FiGithub /> View Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-custom"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>

    <style jsx>{`
      .college-card {
        border-radius: var(--radius-xl);
        overflow: hidden;
        border: 1px solid var(--border-color);
        background: var(--bg-card);
        box-shadow: var(--shadow-sm);
        transition: box-shadow var(--transition-base), transform var(--transition-base);
        margin-bottom: 2rem;
      }

      .college-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
      }

      .college-card-inner {
        display: grid;
        grid-template-columns: 400px 1fr;
      }

      .college-img-wrapper {
        position: relative;
        overflow: hidden;
      }

      .college-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
        min-height: 280px;
      }

      .college-card:hover .college-img {
        transform: scale(1.04);
      }

      .grade-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        background: rgba(255, 77, 0, 0.9);
        color: white;
        padding: 0.35rem 0.75rem;
        border-radius: var(--radius-full);
        font-size: 0.78rem;
        font-weight: 700;
        backdrop-filter: blur(8px);
      }

      .featured-ribbon {
        position: absolute;
        top: 16px;
        left: 0;
        background: var(--accent-2);
        color: white;
        padding: 0.28rem 1rem 0.28rem 0.75rem;
        font-size: 0.72rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
      }

      .college-content {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .college-meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .course-tag,
      .semester-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-full);
        letter-spacing: 0.04em;
      }

      .course-tag {
        background: rgba(107, 78, 255, 0.1);
        color: var(--accent-2);
        border: 1px solid rgba(107, 78, 255, 0.2);
      }

      .semester-tag {
        background: var(--bg-secondary);
        color: var(--text-muted);
        border: 1px solid var(--border-color);
      }

      .college-title {
        font-family: var(--font-display);
        font-size: 1.4rem;
        font-weight: 800;
        margin-bottom: 0.75rem;
        color: var(--text-primary);
        line-height: 1.2;
      }

      .college-desc {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.75;
        margin-bottom: 1.25rem;
        flex: 1;
      }

      .college-info-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
        margin-bottom: 1.25rem;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
      }

      .info-cell {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .info-label {
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .info-value {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .college-tech {
        margin-bottom: 1.5rem;
      }

      .tech-label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--text-muted);
        display: block;
        margin-bottom: 0.5rem;
      }

      .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }

      .college-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      @media (max-width: 900px) {
        .college-card-inner {
          grid-template-columns: 1fr;
        }
        .college-img {
          min-height: 220px;
          max-height: 280px;
        }
        .college-info-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `}</style>
  </motion.article>
);

// ─── Page Component ───────────────────────────────────────────────────────────
const CollegeProjectsPage = () => {
  const [apiProjects, setApiProjects] = useState([]);

  // Try to fetch from API; silently fall back if backend isn't running
  useEffect(() => {
    api
      .get('/projects/college')
      .then(res => {
        // Exclude any API projects whose title matches a hardcoded one (avoid duplicates)
        const hardcodedTitles = new Set(DAMBAR_PROJECTS.map(p => p.title.toLowerCase()));
        const unique = (res.data.data || []).filter(
          p => !hardcodedTitles.has(p.title.toLowerCase())
        );
        setApiProjects(unique);
      })
      .catch(() => {
        // Backend not available — that's fine, hardcoded projects still show
      });
  }, []);

  // Hardcoded projects always appear first
  const allProjects = [...DAMBAR_PROJECTS, ...apiProjects];

  const techCount = [...new Set(allProjects.flatMap(p => p.techStack))].length;
  const featuredCount = allProjects.filter(p => p.featured).length;
  const courseCount = [...new Set(allProjects.map(p => p.course).filter(Boolean))].length;

  return (
    <>
      <Helmet>
        <title>College Projects — Dambar Ojha</title>
        <meta
          name="description"
          content="Dambar Ojha's college and academic projects — full-stack apps, responsive websites, and coursework built while learning web development."
        />
      </Helmet>

      <div style={{ paddingTop: 80 }}>
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <section className="section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label">Academic Work</p>
              <h1 className="section-title">College Projects</h1>
              <p className="section-subtitle">
                Real projects I built while learning full stack development at college.
                Each one challenged me to grow — from wiring up REST APIs to crafting
                pixel-perfect responsive UIs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Stats Bar ───────────────────────────────────────────────── */}
        <div className="college-stats-bar">
          <div className="container">
            <div className="college-stats">
              <div className="cstat">
                <strong>{allProjects.length}</strong>
                <span>Projects</span>
              </div>
              <div className="cstat">
                <strong>{techCount}+</strong>
                <span>Technologies</span>
              </div>
              <div className="cstat">
                <strong>{featuredCount}</strong>
                <span>Featured</span>
              </div>
              <div className="cstat">
                <strong>{courseCount}</strong>
                <span>Courses</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Projects List ────────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            {allProjects.map((project, i) => (
              <CollegeProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .college-stats-bar {
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          padding: 1.5rem 0;
        }

        .college-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
        }

        .cstat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .cstat strong {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--accent);
        }

        .cstat span {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .college-stats {
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default CollegeProjectsPage;
