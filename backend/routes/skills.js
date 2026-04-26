const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Skill = require('../models/Skill');

// GET all skills
router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
    res.json({ success: true, data: skills, grouped });
  } catch (error) { next(error); }
});

// POST create skill (admin)
router.post('/', protect, async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) { next(error); }
});

// PUT update skill (admin)
router.put('/:id', protect, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (error) { next(error); }
});

// DELETE skill (admin)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) { next(error); }
});

module.exports = router;
