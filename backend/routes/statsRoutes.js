import express from 'express';
import Analytics from '../models/Analytics.js';

const router = express.Router();

// GET /api/stats/visit - Record site visit & return updated count
router.post('/visit', async (req, res) => {
  try {
    let stat = await Analytics.findOne({ metricName: 'site_views' });
    if (!stat) {
      stat = await Analytics.create({ metricName: 'site_views', value: 1 });
    } else {
      stat.value += 1;
      stat.lastUpdated = new Date();
      await stat.save();
    }
    res.json({ success: true, visits: stat.value });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update visit metrics.' });
  }
});

// GET /api/stats - Get analytics summary
router.get('/', async (req, res) => {
  try {
    const stat = await Analytics.findOne({ metricName: 'site_views' });
    res.json({ success: true, visits: stat ? stat.value : 0 });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve stats.' });
  }
});

export default router;
