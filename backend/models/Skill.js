/**
 * Skill Model
 */

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills', 'other'],
      required: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    icon: { type: String }, // Icon name or URL
    color: { type: String, default: '#6366f1' },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
