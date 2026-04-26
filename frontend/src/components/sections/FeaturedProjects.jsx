/**
 * Featured Projects Section (Home Page)
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import api from '../../utils/api';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects?featured=true&limit=3')
      .then(res => setProjects(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section featured-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A handpicked selection of projects I'm proud of — from concept to deployment.
          </p>
        </motion.div>

        <div className="featured-grid">
          {loading
            ? [1, 2, 3].map(i => (
                <div key={i} className="card-modern" style={{ overflow: 'hidden', borderRadius: 20 }}>
                  <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 0 }} />
                  <div style={{ padding: '1.25rem' }}>
                    <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: '0.75rem' }} />
                    <div className="skeleton" style={{ height: 20, width: '80%', marginBottom: '0.5rem' }} />
                    <div className="skeleton" style={{ height: 14, marginBottom: '0.25rem' }} />
                    <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  </div>
                </div>
              ))
            : projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  className="featured-card card-modern"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="fc-img-wrap">
                    <img
                      src={project.images?.[0]?.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="fc-overlay">
                      <div className="fc-links">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="fc-link-btn" onClick={e => e.stopPropagation()} aria-label="GitHub">
                            <FiGithub />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="fc-link-btn" onClick={e => e.stopPropagation()} aria-label="Demo">
                            <FiExternalLink />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="fc-featured-pill"><FiStar /> Featured</div>
                  </div>

                  <div className="fc-body">
                    <span className="fc-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription || project.description.slice(0, 110) + '…'}</p>
                    <div className="fc-tags">
                      {project.techStack?.slice(0, 4).map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
          }
        </div>

        <motion.div
          className="view-all-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/projects" className="btn-outline-custom">
            View All Projects <FiArrowRight />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .featured-section { background: var(--bg-secondary); }
        .section-header { margin-bottom: 3rem; }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .featured-card { border-radius: var(--radius-lg); overflow: hidden; }

        .fc-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
        }

        .fc-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .featured-card:hover .fc-img-wrap img { transform: scale(1.05); }

        .fc-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .featured-card:hover .fc-overlay { opacity: 1; }

        .fc-links { display: flex; gap: 0.75rem; }

        .fc-link-btn {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-size: 1.1rem;
          text-decoration: none;
          transition: all var(--transition-spring);
        }

        .fc-link-btn:hover { background: var(--accent); color: white; transform: scale(1.1); }

        .fc-featured-pill {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: var(--accent);
          color: white;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 600;
        }

        .fc-body { padding: 1.25rem; }

        .fc-category {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-2);
          font-weight: 600;
          display: block;
          margin-bottom: 0.4rem;
        }

        .fc-body h3 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .fc-body p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1rem;
        }

        .fc-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

        .view-all-wrap {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
