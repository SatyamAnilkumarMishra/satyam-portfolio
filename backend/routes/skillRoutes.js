import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

// GET /api/skills - Fetch all skill categories
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skills.' });
  }
});

export default router;
