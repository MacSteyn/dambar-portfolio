/**
 * Contact Controller
 * Handles contact form submissions and email notifications
 */

const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ─── Submit Contact Form ──────────────────────────────────────────────────────
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Save to DB
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // Send notification email (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        // Email to portfolio owner
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
          to: process.env.EMAIL_USER,
          subject: `[Portfolio] New Message: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #6366f1;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td>${name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td>${subject}</td></tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          `,
        });

        // Auto-reply to sender
        await transporter.sendMail({
          from: `"Your Portfolio" <${process.env.EMAIL_FROM}>`,
          to: email,
          subject: 'Thanks for reaching out! I\'ll get back to you soon.',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hi ${name}! 👋</h2>
              <p>Thank you for reaching out. I've received your message and will get back to you within 24-48 hours.</p>
              <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
                <strong>Your message:</strong>
                <p style="white-space: pre-wrap; color: #666;">${message}</p>
              </div>
              <p style="color: #999; font-size: 14px;">Best regards</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: "Your message has been sent! I'll get back to you soon.",
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET All Messages (Admin) ─────────────────────────────────────────────────
exports.getMessages = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};

    const total = await Contact.countDocuments(query);
    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, data: messages });
  } catch (error) {
    next(error);
  }
};

// ─── UPDATE Message Status (Admin) ───────────────────────────────────────────
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};
