import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// POST /api/contact - Submit contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to process message submission.' });
  }
});

// GET /api/contact - Fetch messages for admin dashboard
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve messages.' });
  }
});

export default router;
