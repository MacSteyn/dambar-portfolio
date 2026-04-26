/**
 * 404 Not Found Page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFoundPage = () => (
  <>
    <Helmet><title>404 — Page Not Found</title></Helmet>
    <div className="nf-page">
      <motion.div
        className="nf-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nf-code">404</div>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="nf-actions">
          <button onClick={() => window.history.back()} className="btn-outline-custom">
            <FiArrowLeft /> Go Back
          </button>
          <Link to="/" className="btn-primary-custom">
            <FiHome /> Home
          </Link>
        </div>
      </motion.div>

      <style jsx>{`
        .nf-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--bg-primary);
        }

        .nf-content {
          text-align: center;
          max-width: 480px;
        }

        .nf-code {
          font-family: var(--font-display);
          font-size: clamp(6rem, 20vw, 10rem);
          font-weight: 800;
          line-height: 1;
          background: var(--gradient-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .nf-content h1 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .nf-content p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .nf-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  </>
);

export default NotFoundPage;
