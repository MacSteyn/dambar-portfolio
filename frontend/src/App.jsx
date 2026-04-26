/**
 * App.jsx
 * Root component with routing, providers, and layout
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ScrollToTop, BackToTop } from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';

import './styles/global.scss';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./components/pages/HomePage'));
const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage'));
const CollegeProjectsPage = lazy(() => import('./components/pages/CollegeProjectsPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const AdminLoginPage = lazy(() => import('./components/pages/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./components/pages/AdminDashboard'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

// Page loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '60vh', background: 'var(--bg-primary)'
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      border: '3px solid var(--border-color)',
      borderTopColor: 'var(--accent)',
      animation: 'spin 0.7s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Admin routes don't show the main Navbar/Footer
const isAdminRoute = (pathname) => pathname.startsWith('/admin');

const AppLayout = () => {
  const { pathname } = useLocation();
  const admin = isAdminRoute(pathname);

  return (
    <>
      {!admin && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/college-projects" element={<CollegeProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      {!admin && <Footer />}
      {!admin && <BackToTop />}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
              },
              success: { iconTheme: { primary: '#00C896', secondary: 'white' } },
              error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
