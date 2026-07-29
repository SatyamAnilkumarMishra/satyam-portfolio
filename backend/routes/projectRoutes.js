import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects.' });
  }
});

export default router;
