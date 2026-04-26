/**
 * Projects Page
 * Full project showcase with filtering, search, and CRUD UI
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiGithub, FiExternalLink, FiStar, FiFilter } from 'react-icons/fi';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const categories = ['all', 'fullstack', 'frontend', 'backend', 'ai-ml', 'mobile'];

const ProjectCard = ({ project, onEdit, onDelete, isAdmin }) => (
  <motion.div
    className="project-card card-modern"
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.3 }}
  >
    <div className="project-img-wrapper">
      <img
        src={project.images?.[0]?.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'}
        alt={project.title}
        className="project-img"
        loading="lazy"
      />
      <div className="project-overlay">
        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link-btn" aria-label="GitHub">
              <FiGithub />
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="proj-link-btn" aria-label="Live Demo">
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>
      {project.featured && (
        <div className="featured-badge">
          <FiStar /> Featured
        </div>
      )}
    </div>

    <div className="project-body">
      <div className="project-meta">
        <span className="proj-category">{project.category}</span>
        <span className={`status-badge ${project.status}`}>{project.status}</span>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.shortDescription || project.description.slice(0, 120) + '...'}</p>

      <div className="project-tags">
        {project.techStack?.slice(0, 4).map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
        {project.techStack?.length > 4 && (
          <span className="tech-tag">+{project.techStack.length - 4}</span>
        )}
      </div>

      {isAdmin && (
        <div className="project-admin-actions">
          <button onClick={() => onEdit(project)} className="admin-btn edit">Edit</button>
          <button onClick={() => onDelete(project._id)} className="admin-btn delete">Delete</button>
        </div>
      )}
    </div>

    <style jsx>{`
      .project-card {
        cursor: pointer;
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      .project-img-wrapper {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16/9;
      }

      .project-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .project-card:hover .project-img { transform: scale(1.05); }

      .project-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity var(--transition-base);
      }

      .project-card:hover .project-overlay { opacity: 1; }

      .project-links { display: flex; gap: 0.75rem; }

      .proj-link-btn {
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

      .proj-link-btn:hover { background: var(--accent); color: white; transform: scale(1.1); }

      .featured-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        background: var(--accent);
        color: white;
        padding: 0.25rem 0.6rem;
        border-radius: var(--radius-full);
        font-size: 0.72rem;
        font-weight: 600;
      }

      .project-body { padding: 1.25rem; }

      .project-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .proj-category {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--accent-2);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .project-title {
        font-family: var(--font-display);
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      .project-desc {
        font-size: 0.85rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .project-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

      .project-admin-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-color);
      }

      .admin-btn {
        flex: 1;
        padding: 0.4rem;
        border: none;
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .admin-btn.edit { background: rgba(107, 78, 255, 0.1); color: var(--accent-2); }
      .admin-btn.edit:hover { background: var(--accent-2); color: white; }
      .admin-btn.delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
      .admin-btn.delete:hover { background: #ef4444; color: white; }
    `}</style>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="project-card card-modern" style={{ overflow: 'hidden' }}>
    <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 0 }} />
    <div style={{ padding: '1.25rem' }}>
      <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: '0.75rem' }} />
      <div className="skeleton" style={{ height: 20, width: '80%', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ height: 14, marginBottom: '0.25rem' }} />
      <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: '1rem' }} />
      <div style={{ display: 'flex', gap: '0.35rem' }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 24, width: 60, borderRadius: 20 }} />)}
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { isAdmin } = useAuth();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.set('category', activeCategory);
      if (search) params.set('search', search);
      const res = await api.get(`/projects?${params.toString()}`);
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search]);

  useEffect(() => {
    const timer = setTimeout(fetchProjects, 300);
    return () => clearTimeout(timer);
  }, [fetchProjects]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    setProjects(prev => prev.filter(p => p._id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Projects — Your Name | Full Stack Developer</title>
        <meta name="description" content="Browse my portfolio of web development projects built with React, Node.js, and modern technologies." />
      </Helmet>

      <div className="projects-page">
        {/* Header */}
        <section className="page-header section">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="section-label">My Work</p>
              <h1 className="section-title">Projects</h1>
              <p className="section-subtitle">
                A curated collection of my work — from solo experiments to collaborative builds.
                Each project represents a unique challenge and learning experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Search */}
        <section className="section" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
          <div className="container">
            <div className="filter-bar">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search projects"
                />
              </div>

              <div className="category-filters">
                <FiFilter className="filter-icon" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === 'all' ? 'All' : cat.replace('-', '/')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section" style={{ paddingTop: '1rem' }}>
          <div className="container">
            {loading ? (
              <div className="projects-grid">
                {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <p>No projects found. Try adjusting your filters.</p>
              </div>
            ) : (
              <motion.div className="projects-grid" layout>
                <AnimatePresence>
                  {projects.map(project => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onDelete={handleDelete}
                      isAdmin={isAdmin}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        .projects-page { padding-top: 80px; }
        .page-header { background: var(--bg-secondary); }

        .filter-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 240px;
          max-width: 320px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-box input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.75rem;
          background: var(--bg-card);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-full);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-primary);
          outline: none;
          transition: all var(--transition-base);
        }

        .search-box input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.1);
        }

        .category-filters {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .filter-icon { color: var(--text-muted); margin-right: 0.25rem; }

        .filter-btn {
          padding: 0.4rem 1rem;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-full);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-transform: capitalize;
        }

        .filter-btn:hover { border-color: var(--accent); color: var(--accent); }
        .filter-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 4rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .filter-bar { flex-direction: column; align-items: flex-start; }
          .search-box { max-width: 100%; }
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default ProjectsPage;
