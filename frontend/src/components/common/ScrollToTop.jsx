/**
 * ScrollToTop - Scrolls window to top on route change
 * Also renders a back-to-top button
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <FiArrowUp />
          <style jsx>{`
            .back-to-top {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              z-index: 500;
              width: 44px;
              height: 44px;
              background: var(--accent);
              color: white;
              border: none;
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
              cursor: pointer;
              box-shadow: var(--shadow-accent);
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
