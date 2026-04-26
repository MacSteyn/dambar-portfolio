/**
 * Project Model
 * Handles both regular and college projects
 */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (v) => v.length > 0,
        message: 'At least one technology is required',
      },
    },
    category: {
      type: String,
      enum: ['web', 'mobile', 'ai-ml', 'backend', 'fullstack', 'other'],
      default: 'web',
    },
    type: {
      type: String,
      enum: ['personal', 'college', 'freelance', 'open-source'],
      default: 'personal',
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: 'Project screenshot' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
    demoUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
    // College project specific fields
    course: { type: String, trim: true },
    semester: { type: String, trim: true },
    collegeName: { type: String, trim: true },
    teamSize: { type: Number, min: 1, default: 1 },
    role: { type: String, trim: true },
    grade: { type: String, trim: true },

    // Metadata
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'archived'],
      default: 'completed',
    },
    startDate: { type: Date },
    endDate: { type: Date },
    tags: [{ type: String, trim: true }],
    order: { type: Number, default: 0 }, // For manual sorting
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: duration
projectSchema.virtual('duration').get(function () {
  if (!this.startDate || !this.endDate) return null;
  const months = Math.round(
    (this.endDate - this.startDate) / (1000 * 60 * 60 * 24 * 30)
  );
  return months < 1 ? '< 1 month' : `${months} month${months > 1 ? 's' : ''}`;
});

// Indexes for better query performance
projectSchema.index({ type: 1, featured: -1, order: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ techStack: 1 });

module.exports = mongoose.model('Project', projectSchema);
