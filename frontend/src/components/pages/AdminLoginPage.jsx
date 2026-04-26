/**
 * Admin Login Page
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login — Portfolio</title></Helmet>
      <div className="admin-login-page">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-header">
            <div className="login-icon"><FiLock /></div>
            <h1>Admin Access</h1>
            <p>Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <div className="input-icon-wrap">
                <FiMail className="field-icon" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@portfolio.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrap">
                <FiLock className="field-icon" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(p => !p)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-primary-custom login-btn"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </motion.button>
          </form>
        </motion.div>

        <style jsx>{`
          .admin-login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-secondary);
            padding: 2rem;
          }

          .login-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
            padding: 2.5rem;
            width: 100%;
            max-width: 400px;
            box-shadow: var(--shadow-lg);
          }

          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .login-icon {
            width: 56px;
            height: 56px;
            background: var(--accent);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            margin: 0 auto 1rem;
          }

          .login-header h1 {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
          }

          .login-header p { color: var(--text-muted); font-size: 0.9rem; }

          .form-field { margin-bottom: 1.25rem; }
          .form-field label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 0.4rem;
          }

          .input-icon-wrap { position: relative; }
          .field-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
          }

          .input-icon-wrap input {
            width: 100%;
            padding: 0.8rem 1rem 0.8rem 2.75rem;
            background: var(--bg-secondary);
            border: 1.5px solid var(--border-color);
            border-radius: var(--radius-md);
            font-family: var(--font-body);
            font-size: 0.92rem;
            color: var(--text-primary);
            outline: none;
            transition: all var(--transition-base);
          }

          .input-icon-wrap input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.1);
          }

          .toggle-pass {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-muted);
            font-size: 1rem;
            padding: 0;
            transition: color var(--transition-fast);
          }

          .toggle-pass:hover { color: var(--text-primary); }

          .login-btn {
            width: 100%;
            justify-content: center;
            padding: 0.875rem;
            margin-top: 0.5rem;
          }

          .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        `}</style>
      </div>
    </>
  );
};

export default AdminLoginPage;
