const express = require('express');
const router = express.Router();
const { getArrivals } = require('../services/realtime');

// GET /api/realtime/:stopId — real-time arrivals for a stop
router.get('/:stopId', async (req, res) => {
  try {
    const data = await getArrivals(req.params.stopId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch real-time data', detail: err.message });
  }
});

module.exports = router;
