const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProjects, getProject, createProject,
  updateProject, deleteProject, getCollegeProjects
} = require('../controllers/projectController');

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('techStack').isArray({ min: 1 }).withMessage('At least one technology required'),
  body('githubUrl').optional().isURL().withMessage('Invalid GitHub URL'),
  body('demoUrl').optional().isURL().withMessage('Invalid demo URL'),
];

router.get('/', getProjects);
router.get('/college', getCollegeProjects);
router.get('/:id', getProject);
router.post('/', protect, projectValidation, createProject);
router.put('/:id', protect, projectValidation, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
