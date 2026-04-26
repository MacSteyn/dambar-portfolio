/**
 * Database Seed Script
 * Run: node utils/seed.js
 * Populates DB with sample data for development
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const User = require('../models/User');

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory, payment integration via Stripe, and an admin dashboard. Features include product filtering, cart management, user authentication, and order tracking.',
    shortDescription: 'Full-stack e-commerce with Stripe payments and real-time inventory.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redis'],
    category: 'fullstack',
    type: 'personal',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    images: [{ url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', alt: 'E-commerce screenshot', isPrimary: true }],
    tags: ['fullstack', 'react', 'nodejs', 'mongodb'],
    order: 1,
  },
  {
    title: 'AI Task Manager',
    description: 'An AI-powered task management app that uses GPT-4 to auto-categorize tasks, suggest priorities, and provide smart scheduling. Includes team collaboration, calendar integration, and analytics.',
    shortDescription: 'Smart task manager with AI-powered prioritization and scheduling.',
    techStack: ['React', 'TypeScript', 'OpenAI API', 'Node.js', 'PostgreSQL'],
    category: 'ai-ml',
    type: 'personal',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/ai-tasks',
    demoUrl: 'https://ai-tasks.vercel.app',
    images: [{ url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800', alt: 'Task Manager screenshot', isPrimary: true }],
    tags: ['ai', 'react', 'typescript', 'openai'],
    order: 2,
  },
  {
    title: 'Real-Time Chat App',
    description: 'A scalable real-time chat application with WebSocket support, room management, file sharing, message encryption, and read receipts. Supports both 1-on-1 and group conversations.',
    shortDescription: 'Scalable real-time chat with encryption and file sharing.',
    techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
    category: 'fullstack',
    type: 'personal',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/chat-app',
    images: [{ url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800', alt: 'Chat app screenshot', isPrimary: true }],
    tags: ['websocket', 'react', 'realtime'],
    order: 3,
  },
  // College Projects
  {
    title: 'Smart Campus Navigation System',
    description: 'A mobile-first web app that provides indoor and outdoor navigation for university campuses. Uses graph algorithms (Dijkstra) for shortest path calculation, with real-time crowd density updates and AR-based directional guidance.',
    shortDescription: 'Indoor/outdoor campus navigation using graph algorithms and AR.',
    techStack: ['React', 'Node.js', 'Python', 'OpenCV', 'MongoDB', 'Google Maps API'],
    category: 'mobile',
    type: 'college',
    course: 'Final Year Project (FYP)',
    semester: '8th Semester',
    collegeName: 'ABC Engineering College',
    teamSize: 4,
    role: 'Full Stack Developer & Team Lead',
    grade: 'A+',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/campus-nav',
    demoUrl: 'https://campus-nav-demo.vercel.app',
    images: [{ url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', alt: 'Campus navigation app', isPrimary: true }],
    tags: ['navigation', 'algorithms', 'ar', 'maps'],
    order: 1,
  },
  {
    title: 'Plagiarism Detection System',
    description: 'An NLP-based plagiarism detection system for academic institutions. Uses TF-IDF, cosine similarity, and BERT embeddings to detect both exact and paraphrased plagiarism across a 50,000+ document database.',
    shortDescription: 'NLP-based plagiarism detector with BERT embeddings.',
    techStack: ['Python', 'Flask', 'React', 'BERT', 'scikit-learn', 'PostgreSQL'],
    category: 'ai-ml',
    type: 'college',
    course: 'Data Science & Machine Learning',
    semester: '6th Semester',
    collegeName: 'ABC Engineering College',
    teamSize: 3,
    role: 'ML Engineer',
    grade: 'A',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/plagiarism-detection',
    images: [{ url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800', alt: 'Plagiarism detection', isPrimary: true }],
    tags: ['nlp', 'machine-learning', 'python', 'bert'],
    order: 2,
  },
  {
    title: 'Hospital Management System',
    description: 'A comprehensive hospital management system with modules for patient registration, appointment scheduling, lab reports, billing, and inventory management. Includes role-based access control for doctors, nurses, and admins.',
    shortDescription: 'Comprehensive HMS with patient management and billing.',
    techStack: ['React', 'Node.js', 'MySQL', 'Express', 'JWT', 'Chart.js'],
    category: 'web',
    type: 'college',
    course: 'Database Management Systems',
    semester: '5th Semester',
    collegeName: 'ABC Engineering College',
    teamSize: 5,
    role: 'Frontend Developer',
    grade: 'A',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/hospital-mgmt',
    images: [{ url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800', alt: 'Hospital management', isPrimary: true }],
    tags: ['healthcare', 'mysql', 'react', 'crud'],
    order: 3,
  },
  {
    title: 'Patient Appointment Booking System',
    description: 'A full-stack SPA for booking and managing medical appointments, built with React, Express, MongoDB, and SASS. Provides seamless appointment scheduling, real-time availability management, and patient notifications.',
    shortDescription: 'Full-stack SPA for medical appointment booking and management.',
    techStack: ['React', 'Express', 'MongoDB', 'SASS', 'Node.js', 'JWT'],
    category: 'fullstack',
    type: 'college',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/MacSteyn/WEB_403_Patient_Appointment_Booking_System.git',
    images: [{ url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800', alt: 'Appointment booking system', isPrimary: true }],
    tags: ['healthcare', 'react', 'mongodb', 'appointments'],
    order: 4,
  },
  {
    title: 'Splashes Swimming Lessons',
    description: 'A clean and responsive webpage for Splashes Swimming Lessons. Designed to showcase swimming programs, lesson types, locations, and social media presence—all in a user-friendly format. Features program information, instructor profiles, and easy enrollment.',
    shortDescription: 'Responsive website for swimming lessons showcase and enrollment.',
    techStack: ['React', 'HTML', 'CSS', 'SASS', 'Responsive Design'],
    category: 'web',
    type: 'college',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/MacSteyn/Splashes.git',
    images: [{ url: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800', alt: 'Splashes swimming lessons website', isPrimary: true }],
    tags: ['responsive-design', 'web', 'react', 'portfolio'],
    order: 5,
  },
];

const sampleSkills = [
  // Frontend
  { name: 'React.js', category: 'frontend', proficiency: 92, color: '#61DAFB', featured: true, order: 1 },
  { name: 'TypeScript', category: 'frontend', proficiency: 85, color: '#3178C6', featured: true, order: 2 },
  { name: 'Next.js', category: 'frontend', proficiency: 80, color: '#000000', featured: true, order: 3 },
  { name: 'Vue.js', category: 'frontend', proficiency: 70, color: '#4FC08D', order: 4 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 90, color: '#06B6D4', featured: true, order: 5 },
  { name: 'SASS/SCSS', category: 'frontend', proficiency: 85, color: '#CC6699', order: 6 },
  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 88, color: '#339933', featured: true, order: 1 },
  { name: 'Express.js', category: 'backend', proficiency: 90, color: '#000000', featured: true, order: 2 },
  { name: 'Python', category: 'backend', proficiency: 78, color: '#3776AB', featured: true, order: 3 },
  { name: 'Flask', category: 'backend', proficiency: 72, color: '#000000', order: 4 },
  { name: 'GraphQL', category: 'backend', proficiency: 68, color: '#E10098', order: 5 },
  // Database
  { name: 'MongoDB', category: 'database', proficiency: 88, color: '#47A248', featured: true, order: 1 },
  { name: 'PostgreSQL', category: 'database', proficiency: 80, color: '#336791', featured: true, order: 2 },
  { name: 'MySQL', category: 'database', proficiency: 75, color: '#4479A1', order: 3 },
  { name: 'Redis', category: 'database', proficiency: 65, color: '#DC382D', order: 4 },
  // DevOps & Tools
  { name: 'Docker', category: 'devops', proficiency: 72, color: '#2496ED', featured: true, order: 1 },
  { name: 'Git & GitHub', category: 'tools', proficiency: 92, color: '#F05032', featured: true, order: 1 },
  { name: 'AWS', category: 'devops', proficiency: 65, color: '#FF9900', order: 2 },
  { name: 'Vercel', category: 'devops', proficiency: 85, color: '#000000', order: 3 },
  { name: 'Figma', category: 'tools', proficiency: 75, color: '#F24E1E', order: 2 },
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
    ]);
    console.log('🧹 Cleared existing data');

    // Seed projects
    await Project.insertMany(sampleProjects);
    console.log(`✅ Seeded ${sampleProjects.length} projects`);

    // Seed skills
    await Skill.insertMany(sampleSkills);
    console.log(`✅ Seeded ${sampleSkills.length} skills`);

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@portfolio.com' });
    if (!adminExists) {
      await User.create({
        name: 'Portfolio Admin',
        email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        role: 'admin',
      });
      console.log('✅ Admin user created');
    }

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
