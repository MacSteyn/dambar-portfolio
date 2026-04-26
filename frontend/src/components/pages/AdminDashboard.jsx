/**
 * Admin Dashboard
 * CRUD interface for projects and messages
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiLayers,
  FiMail, FiStar, FiGrid, FiX, FiSave
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

/* ── Project Form Modal ─────────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose, onSave }) => {
  const isEdit = !!project?._id;
  const [form, setForm] = useState({
    title: '', description: '', shortDescription: '', techStack: '',
    category: 'web', type: 'personal', githubUrl: '', demoUrl: '',
    featured: false, status: 'completed', course: '', semester: '',
    collegeName: '', teamSize: 1, role: '', grade: '',
    imageUrl: '',
    ...project,
    techStack: project?.techStack?.join(', ') || '',
    imageUrl: project?.images?.[0]?.url || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.techStack) {
      toast.error('Title, description, and tech stack are required'); return;
    }
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      images: form.imageUrl ? [{ url: form.imageUrl, alt: form.title, isPrimary: true }] : (project?.images || []),
      teamSize: Number(form.teamSize) || 1,
    };
    delete payload.imageUrl;
    await onSave(payload, isEdit);
  };

  const fields = [
    { name: 'title', label: 'Title *', type: 'text', placeholder: 'My Awesome Project' },
    { name: 'shortDescription', label: 'Short Description', type: 'text', placeholder: 'One-liner (max 200 chars)' },
    { name: 'githubUrl', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/...' },
    { name: 'demoUrl', label: 'Demo URL', type: 'url', placeholder: 'https://...' },
    { name: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://...' },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Project' : 'Add New Project'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-grid">
            {fields.map(f => (
              <div className="form-field" key={f.name} style={{ gridColumn: f.name === 'title' || f.name === 'shortDescription' ? 'span 2' : undefined }}>
                <label>{f.label}</label>
                <input name={f.name} type={f.type} value={form[f.name] || ''} onChange={handleChange} placeholder={f.placeholder} />
              </div>
            ))}

            <div className="form-field" style={{ gridColumn: 'span 2' }}>
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the project..." rows={4} />
            </div>

            <div className="form-field" style={{ gridColumn: 'span 2' }}>
              <label>Tech Stack * (comma-separated)</label>
              <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {['web','mobile','ai-ml','backend','fullstack','other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-field">
              <label>Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {['personal','college','freelance','open-source'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {['completed','in-progress','archived'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-field featured-check">
              <label className="checkbox-label">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                <span>Mark as Featured</span>
              </label>
            </div>

            {/* College-only fields */}
            {form.type === 'college' && (
              <>
                {[
                  { name: 'course', label: 'Course', placeholder: 'Final Year Project' },
                  { name: 'semester', label: 'Semester', placeholder: '8th Semester' },
                  { name: 'collegeName', label: 'College Name', placeholder: 'ABC Engineering College' },
                  { name: 'role', label: 'Your Role', placeholder: 'Full Stack Developer' },
                  { name: 'grade', label: 'Grade', placeholder: 'A+' },
                ].map(f => (
                  <div className="form-field" key={f.name}>
                    <label>{f.label}</label>
                    <input name={f.name} value={form[f.name] || ''} onChange={handleChange} placeholder={f.placeholder} />
                  </div>
                ))}
                <div className="form-field">
                  <label>Team Size</label>
                  <input name="teamSize" type="number" min="1" value={form.teamSize} onChange={handleChange} />
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline-custom" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary-custom">
              <FiSave /> {isEdit ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>

        <style jsx>{`
          .modal-backdrop {
            position: fixed; inset: 0; background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px); display: flex; align-items: center;
            justify-content: center; z-index: 2000; padding: 1rem; overflow-y: auto;
          }
          .modal-panel {
            background: var(--bg-card); border: 1px solid var(--border-color);
            border-radius: var(--radius-xl); width: 100%; max-width: 700px;
            max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-xl);
          }
          .modal-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); position: sticky; top: 0;
            background: var(--bg-card); z-index: 1;
          }
          .modal-header h2 { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; }
          .modal-close {
            width: 36px; height: 36px; border: 1px solid var(--border-color); background: transparent;
            border-radius: var(--radius-md); cursor: pointer; display: flex; align-items: center;
            justify-content: center; font-size: 1.1rem; color: var(--text-secondary);
            transition: all var(--transition-fast);
          }
          .modal-close:hover { background: var(--bg-secondary); }
          .modal-form { padding: 2rem; }
          .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          .form-field label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.35rem; }
          .form-field input, .form-field textarea, .form-field select {
            width: 100%; padding: 0.7rem 0.875rem; background: var(--bg-secondary);
            border: 1.5px solid var(--border-color); border-radius: var(--radius-md);
            font-family: var(--font-body); font-size: 0.88rem; color: var(--text-primary); outline: none;
            transition: all var(--transition-base);
          }
          .form-field input:focus, .form-field textarea:focus, .form-field select:focus {
            border-color: var(--accent); box-shadow: 0 0 0 3px rgba(255,77,0,0.1);
          }
          .form-field textarea { resize: vertical; }
          .checkbox-label {
            display: flex !important; align-items: center; gap: 0.5rem; cursor: pointer;
            flex-direction: row !important;
          }
          .checkbox-label input { width: auto; }
          .featured-check { display: flex; align-items: flex-end; padding-bottom: 0.1rem; }
          .modal-footer {
            display: flex; justify-content: flex-end; gap: 0.75rem;
            padding: 1.5rem 2rem; border-top: 1px solid var(--border-color);
            position: sticky; bottom: 0; background: var(--bg-card);
          }
          @media (max-width: 600px) { .modal-grid { grid-template-columns: 1fr; } }
        `}</style>
      </motion.div>
    </div>
  );
};

/* ── Admin Dashboard ─────────────────────────────────────────────────────────── */
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProject, setModalProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'projects') {
        const res = await api.get('/projects?limit=50');
        setProjects(res.data.data);
      } else {
        const res = await api.get('/contact');
        setMessages(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (payload, isEdit) => {
    try {
      if (isEdit) {
        const res = await api.put(`/projects/${payload._id}`, payload);
        setProjects(p => p.map(proj => proj._id === payload._id ? res.data.data : proj));
        toast.success('Project updated!');
      } else {
        const res = await api.post('/projects', payload);
        setProjects(p => [res.data.data, ...p]);
        toast.success('Project created!');
      }
      setModalOpen(false);
      setModalProject(null);
    } catch (err) {
      toast.error(err.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(p => p.filter(proj => proj._id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out'); };

  const openCreate = () => { setModalProject(null); setModalOpen(true); };
  const openEdit = (project) => { setModalProject(project); setModalOpen(true); };

  return (
    <>
      <Helmet><title>Admin Dashboard — Portfolio</title></Helmet>

      <div className="admin-page">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-logo">⚡ Admin Panel</div>
          <nav className="sidebar-nav">
            {[
              { key: 'projects', label: 'Projects', icon: <FiLayers /> },
              { key: 'messages', label: 'Messages', icon: <FiMail /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className={`sidebar-btn ${tab === key ? 'active' : ''}`}
                onClick={() => setTab(key)}
              >
                {icon} {label}
              </button>
            ))}
          </nav>
          <button className="sidebar-logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* Main */}
        <main className="admin-main">
          <div className="admin-topbar">
            <div>
              <h1 className="admin-title">
                {tab === 'projects' ? 'Projects' : 'Messages'}
              </h1>
              <p className="admin-subtitle">
                {tab === 'projects'
                  ? `${projects.length} projects total`
                  : `${messages.filter(m => m.status === 'unread').length} unread messages`}
              </p>
            </div>
            {tab === 'projects' && (
              <motion.button
                className="btn-primary-custom"
                onClick={openCreate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiPlus /> Add Project
              </motion.button>
            )}
          </div>

          {loading ? (
            <div className="admin-loading">
              {[1,2,3,4].map(i => (
                <div key={i} className="skeleton" style={{ height: 72, marginBottom: '0.75rem', borderRadius: 12 }} />
              ))}
            </div>
          ) : tab === 'projects' ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <motion.tr
                      key={project._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="admin-table-row"
                    >
                      <td className="td-title">
                        <div className="proj-thumb">
                          <img
                            src={project.images?.[0]?.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100'}
                            alt=""
                          />
                          <span>{project.title}</span>
                        </div>
                      </td>
                      <td><span className="type-pill">{project.type}</span></td>
                      <td><span className="cat-pill">{project.category}</span></td>
                      <td><span className={`status-badge ${project.status}`}>{project.status}</span></td>
                      <td>{project.featured ? <FiStar style={{ color: 'var(--accent)' }} /> : '—'}</td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn edit" onClick={() => openEdit(project)} aria-label="Edit">
                            <FiEdit2 />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(project._id)} aria-label="Delete">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {projects.length === 0 && (
                <div className="empty-msg">No projects yet. Click "Add Project" to create one.</div>
              )}
            </div>
          ) : (
            <div className="messages-list">
              {messages.map(msg => (
                <motion.div
                  key={msg._id}
                  className={`message-card card-modern ${msg.status === 'unread' ? 'unread' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="msg-header">
                    <div>
                      <strong>{msg.name}</strong>
                      <a href={`mailto:${msg.email}`} className="msg-email">{msg.email}</a>
                    </div>
                    <div className="msg-meta">
                      <span className={`status-badge ${msg.status}`}>{msg.status}</span>
                      <span className="msg-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="msg-subject"><strong>{msg.subject}</strong></p>
                  <p className="msg-body">{msg.message}</p>
                </motion.div>
              ))}
              {messages.length === 0 && (
                <div className="empty-msg">No messages yet.</div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProjectModal
            project={modalProject}
            onClose={() => { setModalOpen(false); setModalProject(null); }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .admin-page {
          display: flex;
          min-height: 100vh;
          background: var(--bg-secondary);
        }

        .admin-sidebar {
          width: 220px;
          background: var(--bg-card);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
        }

        .sidebar-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1rem;
          color: var(--text-primary);
          padding: 0 0.5rem;
          margin-bottom: 2rem;
        }

        .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }

        .sidebar-btn {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.65rem 0.875rem; border: none; background: transparent;
          border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.9rem;
          font-weight: 500; color: var(--text-secondary); cursor: pointer;
          transition: all var(--transition-fast); text-align: left;
        }

        .sidebar-btn:hover { background: var(--bg-secondary); color: var(--text-primary); }
        .sidebar-btn.active { background: rgba(255,77,0,0.1); color: var(--accent); font-weight: 600; }

        .sidebar-logout {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.65rem 0.875rem; border: none; background: transparent;
          border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.9rem;
          color: var(--text-muted); cursor: pointer; transition: all var(--transition-fast);
        }
        .sidebar-logout:hover { color: #ef4444; background: rgba(239,68,68,0.08); }

        .admin-main {
          flex: 1;
          margin-left: 220px;
          padding: 2rem;
          min-height: 100vh;
        }

        .admin-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .admin-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .admin-subtitle { font-size: 0.85rem; color: var(--text-muted); }

        .admin-loading { margin-top: 1rem; }

        /* Table */
        .admin-table-wrap {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          padding: 0.875rem 1rem;
          background: var(--bg-secondary);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table-row td {
          padding: 0.875rem 1rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .admin-table-row:last-child td { border-bottom: none; }
        .admin-table-row:hover td { background: var(--bg-secondary); }

        .proj-thumb {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .proj-thumb img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }

        .proj-thumb span { font-weight: 600; color: var(--text-primary); }

        .type-pill {
          padding: 0.2rem 0.6rem;
          background: rgba(107,78,255,0.1);
          color: var(--accent-2);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .cat-pill {
          padding: 0.2rem 0.6rem;
          background: var(--bg-secondary);
          color: var(--text-muted);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: capitalize;
          border: 1px solid var(--border-color);
        }

        .action-btns { display: flex; gap: 0.35rem; }

        .action-btn {
          width: 32px; height: 32px; border: 1px solid var(--border-color);
          border-radius: var(--radius-sm); background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .action-btn.edit:hover { background: rgba(107,78,255,0.1); color: var(--accent-2); border-color: var(--accent-2); }
        .action-btn.delete:hover { background: rgba(239,68,68,0.1); color: #ef4444; border-color: #ef4444; }

        /* Messages */
        .messages-list { display: flex; flex-direction: column; gap: 1rem; }

        .message-card {
          padding: 1.25rem;
          border-radius: var(--radius-lg);
        }

        .message-card.unread { border-left: 3px solid var(--accent); }

        .msg-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .msg-header strong { display: block; font-weight: 600; color: var(--text-primary); }

        .msg-email {
          font-size: 0.82rem;
          color: var(--accent);
          text-decoration: none;
        }

        .msg-meta { display: flex; align-items: center; gap: 0.75rem; }

        .msg-date { font-size: 0.78rem; color: var(--text-muted); }

        .msg-subject { font-size: 0.9rem; margin-bottom: 0.35rem; color: var(--text-primary); }

        .msg-body { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }

        .empty-msg { text-align: center; padding: 3rem; color: var(--text-muted); }

        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-main { margin-left: 0; padding: 1rem; }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
