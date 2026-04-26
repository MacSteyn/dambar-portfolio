/**
 * About Page
 * Bio, skills, experience, and resume
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { FiDownload, FiMapPin, FiCalendar, FiAward, FiBriefcase } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const skills = [
  { name: 'React / Next.js', level: 62, color: '#61DAFB' },
  { name: 'Node.js / Express', level: 58, color: '#68A063' },
  { name: 'MongoDB / SQL', level: 73, color: '#47A248' },
  { name: 'Python / Flask', level: 70, color: '#3776AB' },
];

const timeline = [
  {
    year: '2025 – Present',
    title: 'Full Stack Developer',
    desc: 'Learning to build scalable web applications.',
    type: 'work',
  },
  {
    year: '2024 – 2024',
    title: 'Cybersecurity Intern',
    org: 'Prodigy InfoTech',
    desc: 'Developed Key Encryption Algorithms, Learned about Caesar Cipher and image encryption algorithms.',
    type: 'work',
  },
  {
    year: '2022 – 2026',
    title: 'BSIT (Bachelor of Science in Information Technology)',
    org: 'Westcliff University',
    desc: ' Specialized in Cybersecurity and Web Technologies.',
    type: 'edu',
  },
];

const SkillBar = ({ name, level, color, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <style jsx>{`
        .skill-bar-item { margin-bottom: 1.25rem; }
        .skill-bar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .skill-name { font-weight: 500; font-size: 0.9rem; color: var(--text-primary); }
        .skill-percent { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); }
        .skill-bar-track {
          height: 6px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
        }
      `}</style>
    </div>
  );
};

const AboutPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>About — Dambar Ojha | Full Stack Developer (Learning)</title>
        <meta name="description" content="Learn about Dambar Ojha — a passionate learner on the full stack development journey." />
      </Helmet>

      <div className="about-page">
        {/* Page Header */}
        <section className="page-header section">
          <div className="container">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <p className="section-label">Who I Am</p>
              <h1 className="section-title">About Me</h1>
              <p className="section-subtitle">
                A passionate developer with a love for building elegant, performant web applications
                and creating experiences that make people's lives easier.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="section">
          <div className="container">
            <div className="about-grid">
              {/* Left: Avatar + Info */}
              <motion.div
                className="about-avatar-col"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="about-avatar-wrapper">
                  <img
                    src="https://avatars.githubusercontent.com/MacSteyn"
                    alt="Dambar Ojha"
                    className="about-avatar"
                    loading="lazy"
                  />
                  <div className="avatar-status">
                    <span className="status-dot" />
                    Open to Work
                  </div>
                </div>

                <div className="about-info-card glass-card">
                  <div className="info-row">
                    <FiMapPin className="info-icon" />
                    <span>Los Angeles, CA</span>
                  </div>
                  <div className="info-row">
                    <FiCalendar className="info-icon" />
                    <span>Currently Learning</span>
                  </div>
                  <div className="info-row">
                    <FiBriefcase className="info-icon" />
                    <span>Full Stack Dev (in progress)</span>
                  </div>
                  <div className="info-row">
                    <FiAward className="info-icon" />
                    <span>React · Node.js · MongoDB</span>
                  </div>
                </div>

                <a href="/resume.pdf" download className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center' }}>
                  <FiDownload /> Download Resume
                </a>
              </motion.div>

              {/* Right: Bio Text */}
              <motion.div
                className="about-bio-col"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="about-bio-title">
                  Hey, I'm Dambar —<br /><span className="gradient-text">learning to build the web</span>
                </h2>

                <div className="about-bio-text">
                  <p>
                    I'm <strong>Dambar Ojha</strong>, a passionate learner currently diving deep into
                    Full Stack Development. I'm exploring the complete web development ecosystem —
                    from designing responsive UIs in React to building REST APIs with Node.js and
                    storing data in MongoDB.
                  </p>
                  <p>
                    Every project I build teaches me something new. I enjoy the challenge of
                    connecting the frontend and backend together and watching something come
                    to life in the browser. I'm focused on writing clean, readable code and
                    understanding how things work under the hood.
                  </p>
                  <p>
                    When I'm not coding, I'm watching tutorials, reading docs, or experimenting
                    with new ideas. I believe consistent practice and building real projects is
                    the fastest path to becoming a great developer.
                  </p>
                </div>

                {/* Skills */}
                <div className="skills-section">
                  <h3>Technical Proficiency</h3>
                  <div className="skills-grid">
                    {skills.map((skill, i) => (
                      <SkillBar key={skill.name} {...skill} index={i} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section timeline-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="section-label">My Journey</p>
              <h2 className="section-title">Experience & Education</h2>
            </motion.div>

            <div className="timeline" ref={ref}>
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className={`timeline-item ${item.type}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className="timeline-dot">
                    {item.type === 'work' ? <FiBriefcase /> : <FiAward />}
                  </div>
                  <div className="timeline-content card-modern">
                    <span className="timeline-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <h4>{item.org}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div className="timeline-line" />
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page { padding-top: 80px; }

        .page-header { background: var(--bg-secondary); }

        .about-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 4rem;
          align-items: start;
        }

        .about-avatar-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .about-avatar {
          width: 100%;
          border-radius: var(--radius-xl);
          aspect-ratio: 1;
          object-fit: cover;
          box-shadow: var(--shadow-lg);
        }

        .avatar-status {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-3);
          box-shadow: var(--shadow-md);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-3);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--accent-3);
          animation: pulse-glow 2s infinite;
        }

        .about-info-card {
          padding: 1.25rem;
          margin-bottom: 1rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .info-row:last-child { border-bottom: none; }
        .info-icon { color: var(--accent); flex-shrink: 0; }

        .about-bio-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.15;
        }

        .about-bio-text p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .skills-section {
          margin-top: 2.5rem;
        }

        .skills-section h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Timeline */
        .timeline-section {
          background: var(--bg-secondary);
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 3rem auto 0;
          padding: 0 1rem;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-color);
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-right: calc(50% + 2rem);
          position: relative;
          margin-bottom: 2.5rem;
        }

        .timeline-item:nth-child(even) {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: calc(50% + 2rem);
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 1rem;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.9rem;
          z-index: 2;
          box-shadow: var(--shadow-accent);
        }

        .timeline-content {
          padding: 1.5rem;
          max-width: 320px;
        }

        .timeline-year {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          font-weight: 600;
        }

        .timeline-content h3 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0.35rem 0 0.2rem;
        }

        .timeline-content h4 {
          font-size: 0.85rem;
          color: var(--accent-2);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .timeline-content p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-avatar-col { max-width: 340px; margin: 0 auto; }
          .timeline-item,
          .timeline-item:nth-child(even) {
            justify-content: flex-start;
            padding: 0 0 0 3.5rem;
          }
          .timeline-line { left: 20px; }
          .timeline-dot { left: 20px; }
          .timeline-content { max-width: 100%; }
        }
      `}</style>
    </>
  );
};

export default AboutPage;
