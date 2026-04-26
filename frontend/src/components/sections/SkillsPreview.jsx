/**
 * Skills Preview Section (Home Page)
 * Animated skill pills grouped by category
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';

const fallbackSkills = [
  { name: 'React', category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
  { name: 'Next.js', category: 'frontend', color: '#000' },
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'Express.js', category: 'backend', color: '#888' },
  { name: 'Python', category: 'backend', color: '#3776AB' },
  { name: 'MongoDB', category: 'database', color: '#47A248' },
  { name: 'PostgreSQL', category: 'database', color: '#336791' },
  { name: 'Docker', category: 'devops', color: '#2496ED' },
  { name: 'Git', category: 'tools', color: '#F05032' },
  { name: 'AWS', category: 'devops', color: '#FF9900' },
  { name: 'Tailwind', category: 'frontend', color: '#06B6D4' },
  { name: 'Figma', category: 'tools', color: '#F24E1E' },
  { name: 'Redis', category: 'database', color: '#DC382D' },
  { name: 'GraphQL', category: 'backend', color: '#E10098' },
];

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Tools',
};

const SkillsPreview = () => {
  const [skills, setSkills] = useState(fallbackSkills);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    api.get('/skills')
      .then(res => { if (res.data.data?.length) setSkills(res.data.data); })
      .catch(() => {}); // use fallback silently
  }, []);

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)];
  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section className="section skills-preview-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="sp-header"
        >
          <p className="section-label">What I Use</p>
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">
            The tools, frameworks, and technologies I work with on a daily basis.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="sp-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`sp-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div className="sp-grid" layout>
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="sp-pill"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              viewport={{ once: true }}
            >
              <span
                className="sp-dot"
                style={{ background: skill.color || 'var(--accent)' }}
              />
              <span className="sp-name">{skill.name}</span>
              {skill.proficiency && (
                <span className="sp-level">{skill.proficiency}%</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="sp-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/about" className="btn-outline-custom">
            View Full Profile <FiArrowRight />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .sp-header { margin-bottom: 2.5rem; }

        .sp-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .sp-filter-btn {
          padding: 0.4rem 1rem;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-full);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .sp-filter-btn:hover { border-color: var(--accent); color: var(--accent); }
        .sp-filter-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }

        .sp-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-bottom: 2.5rem;
        }

        .sp-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-card);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-full);
          cursor: default;
          transition: all var(--transition-base);
          box-shadow: var(--shadow-sm);
        }

        .sp-pill:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-md);
        }

        .sp-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .sp-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .sp-level {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          padding-left: 0.25rem;
          border-left: 1px solid var(--border-color);
          padding-right: 0;
        }

        .sp-cta {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default SkillsPreview;
